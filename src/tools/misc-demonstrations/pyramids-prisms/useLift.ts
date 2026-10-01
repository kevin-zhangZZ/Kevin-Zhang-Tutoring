import { useEffect, useRef, useState } from 'react'
import { reducedMotion } from '../lib/solid3d.ts'

/** How long Lift Off Top takes to raise or lower the top piece. */
export const LIFT_MS = 250

/** Lift Off Top: eases 0 ↔ 1 over LIFT_MS (instantly under reduced motion). Shared by the Lesson
 *  and Explore. */
export function useLift(target: number): number {
  const [t, setT] = useState(target)
  const tRef = useRef(t)
  tRef.current = t
  useEffect(() => {
    const from = tRef.current
    if (from === target) return
    if (reducedMotion()) {
      setT(target)
      return
    }
    let raf = 0
    let t0: number | null = null
    const step = (now: number) => {
      if (t0 === null) t0 = now
      const u = Math.min(1, (now - t0) / LIFT_MS)
      const e = 1 - Math.pow(1 - u, 3)
      setT(from + (target - from) * e)
      if (u < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target])
  return t
}
