// Study score projection: where would a student's exam marks have placed them in a given year,
// and what study score does that rank map to?
//
// 1. Each exam's distribution (data.ts) is only known at the 10 grade boundaries. Between them
//    we interpolate in z-space (the normal quantile of the cumulative share), which keeps the
//    curve smooth and gives the open-ended top and bottom grades a sensible tail instead of a
//    flat block. The A+ and UG bands are extended with the slope of the last three boundaries.
// 2. Methods and Specialist have two exams, which VCAA adds on its GA scale (Exam 1 out of 80,
//    Exam 2 out of 160, so Exam 2 counts double). The two exams aren't independent, and VCAA
//    doesn't publish how they co-vary, so we join them with a Gaussian copula with correlation
//    RHO and find the share of students whose total is below this one. Chemistry has one exam,
//    so its rank is simply the rank on that exam.
// 3. Study scores are scaled to a normal distribution with mean 30 and SD 7, capped at 0–50.
//
// SACs are left out: they are moderated against the exam scores, so a student whose SACs track
// their exams keeps the same rank.

import { DISTRIBUTIONS, SUBJECTS, type ExamDist, type Subject, type YearDist } from './data.ts'

/** Assumed correlation between a student's Exam 1 and Exam 2 ranks. */
export const RHO = 0.8
/** The range of correlations quoted on the page as plausible. */
export const RHO_RANGE: [number, number] = [0.7, 0.9]

export const MEAN = 30
export const SD = 7

// ── Normal distribution ────────────────────────────────────────────────────────────────────

/** Standard normal CDF (Abramowitz & Stegun 7.1.26 via erf, |error| < 1.5e-7). */
export function normCdf(z: number): number {
  if (z === Infinity) return 1
  if (z === -Infinity) return 0
  const x = Math.abs(z) / Math.SQRT2
  const t = 1 / (1 + 0.3275911 * x)
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)
  return z >= 0 ? 0.5 * (1 + y) : 0.5 * (1 - y)
}

/** Inverse standard normal CDF (Acklam's rational approximation, relative error < 1.2e-9). */
export function normInv(p: number): number {
  if (p <= 0) return -Infinity
  if (p >= 1) return Infinity
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239]
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572]
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783]
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416]
  const lo = 0.02425
  if (p < lo) {
    const q = Math.sqrt(-2 * Math.log(p))
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
  }
  if (p > 1 - lo) {
    const q = Math.sqrt(-2 * Math.log(1 - p))
    return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
  }
  const q = p - 0.5
  const r = q * q
  return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
}

// ── One exam ───────────────────────────────────────────────────────────────────────────────

export interface Marginal {
  max: number
  /** z of the share of students at or below a GA score (midpoint convention for whole scores). */
  z: (x: number) => number
  /** Share of students below a GA score, counting half of those on it. */
  cdf: (x: number) => number
  /** Share of students on each whole GA score 0…max. */
  pmf: number[]
  /** z of each whole score's midpoint share, for the copula. */
  zMid: number[]
}

function slopeOf(xs: number[], zs: number[]): number {
  const n = xs.length
  const mx = xs.reduce((s, v) => s + v, 0) / n
  const mz = zs.reduce((s, v) => s + v, 0) / n
  let num = 0
  let den = 0
  for (let i = 0; i < n; i++) {
    num += (xs[i] - mx) * (zs[i] - mz)
    den += (xs[i] - mx) ** 2
  }
  return Math.max(num / den, 1e-3)
}

export function marginalOf(dist: ExamDist): Marginal {
  const total = dist.bands.reduce((s, b) => s + b[2], 0)
  // A boundary sits half a mark above each band's top score: everyone at or below it.
  const xs: number[] = []
  const zs: number[] = []
  let cum = 0
  for (let i = 0; i < dist.bands.length - 1; i++) {
    cum += dist.bands[i][2]
    xs.push(dist.bands[i][1] + 0.5)
    zs.push(normInv(cum / total))
  }
  const n = xs.length
  const loSlope = slopeOf(xs.slice(0, 3), zs.slice(0, 3))
  const hiSlope = slopeOf(xs.slice(n - 3), zs.slice(n - 3))

  const z = (x: number) => {
    if (x <= xs[0]) return zs[0] - (xs[0] - x) * loSlope
    if (x >= xs[n - 1]) return zs[n - 1] + (x - xs[n - 1]) * hiSlope
    let i = 1
    while (xs[i] < x) i++
    const t = (x - xs[i - 1]) / (xs[i] - xs[i - 1])
    return zs[i - 1] + t * (zs[i] - zs[i - 1])
  }
  // Below the bottom of the scale is nobody; above the top is everybody.
  const edge = (x: number) => (x < 0 ? 0 : x > dist.max ? 1 : normCdf(z(x)))
  const pmf: number[] = []
  const zMid: number[] = []
  for (let s = 0; s <= dist.max; s++) {
    const a = edge(s - 0.5)
    const b = edge(s + 0.5)
    pmf.push(b - a)
    zMid.push(normInv((a + b) / 2))
  }
  return { max: dist.max, z, cdf: x => normCdf(z(x)), pmf, zMid }
}

// ── All exams ──────────────────────────────────────────────────────────────────────────────

export interface Projection {
  year: number
  /** Share of the state below this student on each exam alone. */
  pctExams: number[]
  /** Share of the state below this student on the combined exam score. */
  pct: number
  /** Unrounded and rounded study score at RHO. */
  exact: number
  score: number
  /** Students who sat the (last) exam that year. */
  cohort: number
  source: string
}

const cache = new Map<string, Marginal[]>()
function marginals(subject: Subject, d: YearDist): Marginal[] {
  const key = `${subject}-${d.year}`
  let m = cache.get(key)
  if (!m) {
    m = d.exams.map(marginalOf)
    cache.set(key, m)
  }
  return m
}

/** Share of students whose Exam 1 + Exam 2 GA total is below `total` (half of those level). */
export function combinedPct(m1: Marginal, m2: Marginal, total: number, rho: number): number {
  const k = Math.sqrt(1 - rho * rho)
  let p = 0
  for (let x1 = 0; x1 <= m1.max; x1++) {
    const w = m1.pmf[x1]
    if (w < 1e-12) continue
    const y = total - x1
    const z2 = y < -0.5 ? -Infinity : y > m2.max + 0.5 ? Infinity : m2.z(Math.min(y, m2.max + 0.5))
    p += w * normCdf((z2 - rho * m1.zMid[x1]) / k)
  }
  return p
}

export function studyScoreOf(pct: number): number {
  return Math.min(50, Math.max(0, MEAN + SD * normInv(pct)))
}

/** One year's projection. `raw` is one raw mark per exam (see SUBJECTS for what each is out of). */
export function projectYear(subject: Subject, d: YearDist, raw: number[]): Projection {
  // GA scores are twice the raw marks.
  const xs = raw.map(r => r * 2)
  const ms = marginals(subject, d)
  const pct = ms.length === 1 ? ms[0].cdf(xs[0]) : combinedPct(ms[0], ms[1], xs[0] + xs[1], RHO)
  const exact = studyScoreOf(pct)
  const last = d.exams[d.exams.length - 1]
  return {
    year: d.year,
    pctExams: ms.map((m, i) => m.cdf(xs[i])),
    pct,
    exact,
    score: Math.round(exact),
    cohort: last.bands.reduce((s, b) => s + b[2], 0),
    source: d.source,
  }
}

/** The same marks in every year, oldest first. */
export function project(subject: Subject, raw: number[]): Projection[] {
  return DISTRIBUTIONS[subject].map(d => projectYear(subject, d, raw))
}


// ── Reading the projections ────────────────────────────────────────────────────────────────

/** The headline "typical year" score: the middle of the years' unrounded scores, rounded, so it
 *  is always a whole study score. */
export function typicalOf(rows: Projection[]): number {
  const xs = rows.map(r => r.exact).sort((a, b) => a - b)
  const n = xs.length
  const mid = n % 2 ? xs[(n - 1) / 2] : (xs[n / 2 - 1] + xs[n / 2]) / 2
  return Math.round(mid)
}

/** Raw marks the subject's exams add up to: 120 for every subject today. */
export function totalMax(subject: Subject): number {
  return SUBJECTS[subject].exams.reduce((s, e) => s + e.rawMax, 0)
}

/** A total split across the exams in proportion to each paper's size (60 → 20 + 40). Only the
 *  total changes the projection, so this is just one example split. */
export function splitTotal(subject: Subject, total: number): number[] {
  const exams = SUBJECTS[subject].exams
  const all = totalMax(subject)
  let left = total
  return exams.map((e, i) => {
    if (i === exams.length - 1) return left
    const m = Math.min(e.rawMax, Math.round((total * e.rawMax) / all))
    left -= m
    return m
  })
}

/** Every total from 0 to the maximum, projected in every year; built once per subject. */
const byTotal = new Map<Subject, Projection[][]>()
function projectionsByTotal(subject: Subject): Projection[][] {
  let t = byTotal.get(subject)
  if (!t) {
    t = []
    for (let total = 0; total <= totalMax(subject); total++) t.push(project(subject, splitTotal(subject, total)))
    byTotal.set(subject, t)
  }
  return t
}

export interface MarksNeeded {
  target: number
  /** Smallest total at which the typical-year score reaches the target, or null if none does. */
  typical: number | null
  /** Smallest total reaching the target in each year, oldest first (null: not reached). */
  years: (number | null)[]
  /** The most and least generous years' totals, ignoring years that can't reach it. */
  lo: number | null
  hi: number | null
}

/** The total marks needed for each target study score, typically and in each year. */
export function marksNeeded(subject: Subject, targets: number[]): MarksNeeded[] {
  const t = projectionsByTotal(subject)
  return targets.map(target => {
    const typical = t.findIndex(rows => typicalOf(rows) >= target)
    const years = t[0].map((_, y) => {
      const i = t.findIndex(rows => rows[y].score >= target)
      return i < 0 ? null : i
    })
    const reached = years.filter((v): v is number => v !== null)
    return {
      target,
      typical: typical < 0 ? null : typical,
      years,
      lo: reached.length ? Math.min(...reached) : null,
      hi: reached.length ? Math.max(...reached) : null,
    }
  })
}

/** The rounded study scores full marks projects to across the years: the model's ceiling. */
export function fullMarksRange(subject: Subject): { lo: number; hi: number } {
  const rows = project(subject, SUBJECTS[subject].exams.map(e => e.rawMax))
  const scores = rows.map(r => r.score)
  return { lo: Math.min(...scores), hi: Math.max(...scores) }
}
