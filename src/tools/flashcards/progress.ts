import { useSyncExternalStore } from 'react'

// What a student has done with the flashcards, kept on this device: each card's review
// schedule, starred cards, the daily streak and best Match times. Storage can be blocked
// (private windows, etc.) — everything still works for the visit without it.
//
// Scheduling is a simplified SM-2 (Anki's scheduler before FSRS). Ratings: 0 Again, 1 Hard,
// 2 Good, 3 Easy. A card's interval (days) grows by its ease each time it's rated Good.

export interface CardState {
  /** Days until it's due again; 0 while it's still being learnt. */
  ivl: number
  ease: number
  reps: number
  lapses: number
  /** When it's next due (ms). */
  due: number
}

export interface Progress {
  cards: Record<string, CardState>
  stars: Record<string, true>
  streak: { last: string | null; n: number }
  /** Fastest Match time (ms) for each subject. */
  best: Record<string, number>
}

export type Rating = 0 | 1 | 2 | 3

const KEY = 'fc-progress'
export const DAY = 864e5

const empty = (): Progress => ({ cards: {}, stars: {}, streak: { last: null, n: 0 }, best: {} })

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...empty(), ...JSON.parse(raw) }
  } catch {
    // Blocked or corrupt: start fresh.
  }
  return empty()
}

let state = load()
const listeners = new Set<() => void>()

function commit(next: Progress) {
  state = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Not remembered this time.
  }
  listeners.forEach(l => l())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => { listeners.delete(cb) }
}

/** The saved progress; re-renders whenever any of it changes. */
export function useProgress() {
  return useSyncExternalStore(subscribe, () => state)
}

// ── Days ────────────────────────────────────────────────────────────────────

const dayStr = (t: number) => new Date(t).toLocaleDateString('en-CA')
export const startOfDay = (t: number) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime() }

/** The streak as it stands today: it lapses once a whole day goes by without studying. */
export function liveStreak(p: Progress) {
  const now = Date.now()
  return p.streak.last === dayStr(now) || p.streak.last === dayStr(now - DAY) ? p.streak.n : 0
}

function touchedStreak(p: Progress): Progress['streak'] {
  const now = Date.now(), today = dayStr(now)
  if (p.streak.last === today) return p.streak
  return { last: today, n: p.streak.last === dayStr(now - DAY) ? p.streak.n + 1 : 1 }
}

export function touchStreak() {
  const s = touchedStreak(state)
  if (s !== state.streak) commit({ ...state, streak: s })
}

// ── Cards ───────────────────────────────────────────────────────────────────

export const isNew = (p: Progress, id: string) => !p.cards[id]
export const isDue = (p: Progress, id: string) => !!p.cards[id] && p.cards[id].due <= Date.now()

/** 0–1: how settled a card is, by how far apart its reviews have got (three weeks counts as known). */
const cardMastery = (p: Progress, id: string) => {
  const s = p.cards[id]
  return s ? Math.min(1, Math.max(0.05, s.ivl / 21)) : 0
}

/** Mastery of a set of cards, as a whole percentage. */
export function mastery(p: Progress, ids: string[]) {
  return ids.length ? Math.round((100 * ids.reduce((a, id) => a + cardMastery(p, id), 0)) / ids.length) : 0
}

/** The interval (days) each rating would give the card now. */
export function nextIntervals(p: Progress, id: string): [number, number, number, number] {
  const s = p.cards[id]
  if (!s || s.ivl === 0) return [0, 1, 2, 5]
  const hard = Math.max(1, Math.round(s.ivl * 1.2))
  const good = Math.max(s.ivl + 1, Math.round(s.ivl * s.ease))
  const easy = Math.max(good + 1, Math.round(s.ivl * s.ease * 1.3))
  return [0, hard, good, easy]
}

export const formatInterval = (d: number) => (d === 0 ? 'soon' : d === 1 ? '1 day' : d < 30 ? `${d} days` : `${Math.round(d / 30)} mo`)

export function rate(id: string, g: Rating) {
  const ivl = nextIntervals(state, id)[g]
  const s: CardState = { ...(state.cards[id] ?? { ivl: 0, ease: 2.5, reps: 0, lapses: 0, due: 0 }) }
  const now = Date.now()
  if (g === 0) {
    if (s.reps) s.lapses++
    s.ease = Math.max(1.3, s.ease - 0.2)
    s.ivl = 0
    s.due = now
  } else {
    if (g === 1) s.ease = Math.max(1.3, s.ease - 0.15)
    if (g === 3) s.ease += 0.15
    s.ivl = ivl
    s.due = startOfDay(now) + ivl * DAY
  }
  s.reps++
  commit({ ...state, cards: { ...state.cards, [id]: s }, streak: touchedStreak(state) })
}

/** Puts a card's schedule back as it was (Test's "I was right"). */
export function restoreCard(id: string, prev: CardState | undefined) {
  const cards = { ...state.cards }
  if (prev) cards[id] = prev
  else delete cards[id]
  commit({ ...state, cards })
}

export const cardState = (id: string) => state.cards[id]

export function toggleStar(id: string) {
  const stars = { ...state.stars }
  if (stars[id]) delete stars[id]
  else stars[id] = true
  commit({ ...state, stars })
}

/** Saves a Match time if it's the subject's best. Returns true if it was. */
export function saveBest(subject: string, ms: number) {
  const old = state.best[subject]
  const better = old === undefined || ms < old
  commit({ ...state, best: better ? { ...state.best, [subject]: ms } : state.best, streak: touchedStreak(state) })
  return better
}

export function resetProgress() {
  commit(empty())
}
