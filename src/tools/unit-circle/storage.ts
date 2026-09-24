import { useEffect, useState } from 'react'

// Per-device memory for the Unit Circle: the chosen settings for each mode, and best Test
// scores. Storage can be blocked (private windows, etc.) — everything still works without it.

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback
  } catch {
    return fallback
  }
}

/** useState for a settings object that's remembered on this device under `key`. */
export function useStoredState<T extends object>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => read(key, fallback))
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Not remembered this time.
    }
  }, [key, value])
  return [value, setValue] as const
}

export interface Best {
  score: number
  total: number
  seconds: number
}

const BEST_KEY = 'uc-best'

export function readBest(id: string): Best | undefined {
  return read<Record<string, Best>>(BEST_KEY, {})[id]
}

/** Saves the round if it beats the best for `id` (higher score, then faster). Returns true if it did. */
export function saveBest(id: string, round: Best): boolean {
  const all = read<Record<string, Best>>(BEST_KEY, {})
  const old = all[id]
  const better = !old || round.score > old.score || (round.score === old.score && round.seconds < old.seconds)
  if (!better) return false
  try {
    localStorage.setItem(BEST_KEY, JSON.stringify({ ...all, [id]: round }))
  } catch {
    // Not remembered this time.
  }
  return true
}

/** True on touch screens, where the tests say "Tap" rather than "Click". */
export function useCoarsePointer() {
  const [coarse, setCoarse] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const on = () => setCoarse(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return coarse
}
