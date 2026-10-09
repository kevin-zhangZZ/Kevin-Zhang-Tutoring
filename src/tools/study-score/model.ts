// Study score projection: where would an Exam 1 and Exam 2 mark have placed a student in a
// given year, and what study score does that rank map to?
//
// 1. Each exam's distribution (data.ts) is only known at the 10 grade boundaries. Between them
//    we interpolate in z-space (the normal quantile of the cumulative share), which keeps the
//    curve smooth and gives the open-ended top and bottom grades a sensible tail instead of a
//    flat block. The A+ and UG bands are extended with the slope of the last three boundaries.
// 2. VCAA adds the exams on its GA scale (Exam 1 out of 80, Exam 2 out of 160, so Exam 2 counts
//    double). The two exams aren't independent, and VCAA doesn't publish how they co-vary, so we
//    join them with a Gaussian copula with correlation RHO and find the share of students whose
//    total is below this one.
// 3. Study scores are scaled to a normal distribution with mean 30 and SD 7, capped at 0–50.
//
// SACs are left out: they are moderated against the exam scores, so a student whose SACs track
// their exams keeps the same rank.

import { DISTRIBUTIONS, type ExamDist, type Subject, type YearDist } from './data'

/** Assumed correlation between a student's Exam 1 and Exam 2 ranks. */
export const RHO = 0.8
/** The range of correlations quoted on the page as plausible. */
export const RHO_RANGE: [number, number] = [0.7, 0.9]

export const RAW_MAX = { e1: 40, e2: 80 } as const
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

// ── Both exams ─────────────────────────────────────────────────────────────────────────────

export interface Projection {
  year: number
  /** Share of the state below this student on each exam alone. */
  pctE1: number
  pctE2: number
  /** Share of the state below this student on the combined exam score. */
  pct: number
  /** Unrounded and rounded study score at RHO. */
  exact: number
  score: number
  /** Students who sat Exam 2 that year. */
  cohort: number
  source: string
}

const cache = new Map<string, [Marginal, Marginal]>()
function marginals(subject: Subject, d: YearDist): [Marginal, Marginal] {
  const key = `${subject}-${d.year}`
  let m = cache.get(key)
  if (!m) {
    m = [marginalOf(d.e1), marginalOf(d.e2)]
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

/** One year's projection. Raw marks: Exam 1 out of 40, Exam 2 out of 80. */
export function projectYear(subject: Subject, d: YearDist, rawE1: number, rawE2: number): Projection {
  const x1 = rawE1 * 2
  const x2 = rawE2 * 2
  const [m1, m2] = marginals(subject, d)
  const pct = combinedPct(m1, m2, x1 + x2, RHO)
  const exact = studyScoreOf(pct)
  return {
    year: d.year,
    pctE1: m1.cdf(x1),
    pctE2: m2.cdf(x2),
    pct,
    exact,
    score: Math.round(exact),
    cohort: d.e2.bands.reduce((s, b) => s + b[2], 0),
    source: d.source,
  }
}

/** The same marks in every year, oldest first. */
export function project(subject: Subject, rawE1: number, rawE2: number): Projection[] {
  return DISTRIBUTIONS[subject].map(d => projectYear(subject, d, rawE1, rawE2))
}
