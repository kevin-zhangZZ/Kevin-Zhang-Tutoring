// Whether a media query matches now, kept up to date as it changes (a phone rotated, a window
// resized past a breakpoint).

import { useEffect, useState } from 'react'

/** The current answer to `query`, false where matchMedia isn't available. */
export function mediaMatches(query: string): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.(query).matches
}

export function useMedia(query: string): boolean {
  const [on, setOn] = useState(() => mediaMatches(query))
  useEffect(() => {
    const m = window.matchMedia?.(query)
    if (!m) return
    const update = () => setOn(m.matches)
    update()
    m.addEventListener('change', update)
    return () => m.removeEventListener('change', update)
  }, [query])
  return on
}

/** Tailwind's `sm` breakpoint, and the phone widths below it. */
export const WIDE = '(min-width: 640px)'
export const PHONE = '(max-width: 639.98px)'
