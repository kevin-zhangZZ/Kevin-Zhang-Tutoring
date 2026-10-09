// The practice log: what an attempt is, how the log is written into a link and kept on this
// device, where a new attempt goes, and the numbers read off it.
//
// The log is an ordered list, in the order the papers were sat. A date is optional: a paper
// logged without one goes after everything already there, for students who log papers in the
// order they did them and don't care about dates. A dated paper goes just before the first
// dated paper that was sat later.
//
// In a link (?a=20260712-2019-27-55.n-2018-26-52) each attempt is its date (`n` for none), the
// paper year, then one mark per exam, in log order. Links made before dates were optional were
// always dated and sorted, so they read the same.

import { DISTRIBUTIONS, SUBJECTS, type Subject } from '../data.ts'
import { projectYear, type Projection } from '../model.ts'
import { fmtDate, nth } from './dates.ts'

export interface Attempt {
  /** Position in the log (0 = sat first); renumbered whenever the log changes. */
  id: number
  /** YYYY-MM-DD, or null when the student didn't give one. */
  date: string | null
  paper: number
  /** Raw marks, one per exam of the subject. */
  marks: number[]
}

/** An attempt that isn't in the log yet (or is being edited). */
export type Draft = Omit<Attempt, 'id'>

/** The paper years with grade distributions, oldest first. */
export const yearsFor = (subject: Subject) => DISTRIBUTIONS[subject].map(d => d.year)

const renumber = (list: Draft[]): Attempt[] => list.map((a, id) => ({ id, date: a.date, paper: a.paper, marks: a.marks }))

// ── Links ──────────────────────────────────────────────────────────────────────────────────

/** One attempt as it's written in a link: "20260712-2019-27-55", or "n-2019-27-55" undated. */
export function tokenOf(a: Draft): string {
  return [a.date ? a.date.replace(/-/g, '') : 'n', a.paper, ...a.marks].join('-')
}

export function encodeAttempts(list: Draft[]): string {
  return list.map(tokenOf).join('.')
}

/** The log in a link, in its order. Anything that doesn't parse for this subject is skipped. */
export function decodeAttempts(s: string, subject: Subject): Attempt[] {
  const exams = SUBJECTS[subject].exams
  const years = yearsFor(subject)
  const out: Draft[] = []
  for (const part of s.split('.')) {
    const [d, paper, ...marks] = part.split('-')
    if (!/^(\d{8}|n)$/.test(d ?? '') || marks.length !== exams.length || !marks.every(m => /^\d{1,3}$/.test(m))) continue
    const date = d === 'n' ? null : `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6)}`
    const a: Draft = { date, paper: Number(paper), marks: marks.map(Number) }
    if ((date !== null && Number.isNaN(Date.parse(date))) || !years.includes(a.paper) || a.marks.some((m, k) => m > exams[k].rawMax)) continue
    out.push(a)
  }
  return renumber(out)
}

// ── Changing the log ───────────────────────────────────────────────────────────────────────

/** Where an attempt with this date goes: undated at the end, dated before the first dated
 *  attempt sat later (so same-day papers stay in the order they were logged). */
function positionFor(list: Attempt[], date: string | null): number {
  if (date === null) return list.length
  const i = list.findIndex(a => a.date !== null && a.date > date)
  return i < 0 ? list.length : i
}

/** The log with `draft` added, and the position it went to. */
export function insertAttempt(list: Attempt[], draft: Draft): { list: Attempt[]; at: number } {
  const at = positionFor(list, draft.date)
  return { list: renumber([...list.slice(0, at), draft, ...list.slice(at)]), at }
}

/** The log with attempt `id` changed. It keeps its place unless it was given a new date, in which
 *  case it moves as if it had just been added with that date. */
export function replaceAttempt(list: Attempt[], id: number, draft: Draft): { list: Attempt[]; at: number } {
  const old = list[id]
  if (!old) return { list, at: id }
  if (draft.date === null || draft.date === old.date) return { list: renumber(list.map((a, i) => (i === id ? draft : a))), at: id }
  return insertAttempt(renumber(list.filter((_, i) => i !== id)), draft)
}

export function removeAttempt(list: Attempt[], id: number): Attempt[] {
  return renumber(list.filter((_, i) => i !== id))
}

/** "2019 paper from 13 Sept", or "2019 paper (5th logged)" when it has no date. */
export function attemptName(a: Attempt): string {
  return a.date ? `${a.paper} paper from ${fmtDate(a.date)}` : `${a.paper} paper (${nth(a.id + 1)} logged)`
}

export const allDated = (list: Draft[]) => list.every(a => a.date !== null)

// ── A log arriving in a link ───────────────────────────────────────────────────────────────

/**
 * How a log from a link relates to the one saved on this device:
 * - `same`: identical.
 * - `subset`: every paper in the link is already saved here, and more besides (an old bookmark).
 * - `superset`: the link has every saved paper and more (or nothing is saved here yet).
 * - `clash`: neither contains the other: someone else's log, or both have changed.
 * Papers are matched by date, paper and marks; the same papers in a different order is a clash.
 */
export type LogMatch = 'same' | 'subset' | 'superset' | 'clash'

export function compareLogs(link: Attempt[], saved: Attempt[]): LogMatch {
  if (encodeAttempts(link) === encodeAttempts(saved)) return 'same'
  const count = (xs: Attempt[]) => {
    const m = new Map<string, number>()
    for (const a of xs) m.set(tokenOf(a), (m.get(tokenOf(a)) ?? 0) + 1)
    return m
  }
  const l = count(link)
  const s = count(saved)
  const within = (a: Map<string, number>, b: Map<string, number>) => [...a].every(([k, n]) => (b.get(k) ?? 0) >= n)
  const linkInSaved = within(l, s)
  const savedInLink = within(s, l)
  if (linkInSaved && !savedInLink) return 'subset'
  if (savedInLink && !linkInSaved) return 'superset'
  return 'clash'
}

// ── This device ────────────────────────────────────────────────────────────────────────────

const STORE_KEY = 'study-score-attempts'
const GOAL_KEY = 'study-score-goal'

function readStore(key: string): Record<string, unknown> {
  try {
    const all = JSON.parse(localStorage.getItem(key) ?? '{}')
    return all && typeof all === 'object' ? all : {}
  } catch {
    return {}
  }
}

function writeStore(key: string, subject: Subject, value: unknown) {
  try {
    const all = readStore(key)
    if (value === null) delete all[subject]
    else all[subject] = value
    localStorage.setItem(key, JSON.stringify(all))
  } catch {
    // Private windows and blocked storage: the URL still holds the log.
  }
}

/** This device's log for a subject, encoded as in a link ('' if none). */
export function loadAttempts(subject: Subject): string {
  const v = readStore(STORE_KEY)[subject]
  return typeof v === 'string' ? v : ''
}

export function saveAttempts(subject: Subject, encoded: string) {
  writeStore(STORE_KEY, subject, encoded)
}

/** Goals are whole study scores; above 45 the tool reads too low to aim at. */
export const GOAL_MIN = 20
export const GOAL_MAX = 45

/** A goal from a link or a box, or null if it isn't a whole number from GOAL_MIN to GOAL_MAX. */
export function parseGoal(s: string | null | undefined): number | null {
  if (s == null || s.trim() === '') return null
  const v = Number(s)
  return Number.isInteger(v) && v >= GOAL_MIN && v <= GOAL_MAX ? v : null
}

export function loadGoal(subject: Subject): number | null {
  const v = readStore(GOAL_KEY)[subject]
  return typeof v === 'number' ? parseGoal(String(v)) : null
}

export function saveGoal(subject: Subject, goal: number | null) {
  writeStore(GOAL_KEY, subject, goal)
}

// ── Scores ─────────────────────────────────────────────────────────────────────────────────

export interface Scored extends Attempt {
  proj: Projection
  /** 1 for the first sitting of this paper, 2 for the first retake… */
  sitting: number
}

/** Each attempt projected against the students who sat that paper. */
export function scoreAttempts(subject: Subject, attempts: Attempt[]): Scored[] {
  const seen = new Map<number, number>()
  return attempts.map(a => {
    const sitting = (seen.get(a.paper) ?? 0) + 1
    seen.set(a.paper, sitting)
    const d = DISTRIBUTIONS[subject].find(x => x.year === a.paper)!
    return { ...a, sitting, proj: projectYear(subject, d, a.marks) }
  })
}

/** The Recent Average is the mean of the last WINDOW papers: single papers jump around by a few
 *  points depending on how kind the year was. */
export const WINDOW = 3

const mean = (xs: Scored[]) => xs.reduce((s, a) => s + a.proj.exact, 0) / xs.length

/** The unrounded Recent Average (fewer papers: all of them), or null for an empty log. */
export function recentAverage(scored: Scored[]): number | null {
  return scored.length ? mean(scored.slice(-WINDOW)) : null
}

/** Last WINDOW papers' average minus the first WINDOW's, once the two don't overlap. */
export function changeSinceStart(scored: Scored[]): number | null {
  return scored.length >= 2 * WINDOW ? mean(scored.slice(-WINDOW)) - mean(scored.slice(0, WINDOW)) : null
}

/** The running Recent Average at each paper from the WINDOW-th on. */
export function rollingAverages(scored: Scored[]): { a: Scored; v: number }[] {
  return scored.slice(WINDOW - 1).map((a, i) => ({ a, v: mean(scored.slice(i, i + WINDOW)) }))
}
