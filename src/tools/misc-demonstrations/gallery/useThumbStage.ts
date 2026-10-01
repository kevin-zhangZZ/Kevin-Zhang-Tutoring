import { useEffect, useRef } from 'react'
import { createStage, reducedMotion, type Scene, type Stage, type StageOptions } from '../lib/solid3d.ts'

// Shared plumbing for the gallery's live card thumbnails: a decorative stage that turns slowly
// (the engine pauses it while off screen and keeps it still under reduced motion), plus one number
// that eases between a resting and a hover value while the card is hovered or focused.

const easeInOut = (u: number) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2)

export interface ThumbSpec {
  options: StageOptions
  /** The hover value: rest when the card is idle, hover while it is hovered or focused. */
  rest: number
  hover: number
  /** Tween length in ms (instant under reduced motion). */
  ms: number
  /** The scene for the current hover value. */
  scene: (value: number) => Scene
}

export function useThumbStage(spec: ThumbSpec, active: boolean) {
  const ref = useRef<HTMLDivElement>(null)
  const ctl = useRef<{ to: (v: number) => void } | null>(null)
  const specRef = useRef(spec)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const s = specRef.current
    const stage: Stage = createStage(el, { ...s.options, decorative: true, wheelZoom: false, keyboard: false, doubleTapReset: false })
    let value = s.rest
    stage.render(() => s.scene(value))

    let raf = 0
    ctl.current = {
      to(target: number) {
        cancelAnimationFrame(raf)
        if (target === value) return
        if (reducedMotion()) {
          value = target
          stage.redraw()
          return
        }
        const from = value
        const t0 = performance.now()
        const step = (now: number) => {
          const u = Math.min(1, (now - t0) / s.ms)
          value = from + (target - from) * easeInOut(u)
          stage.redraw()
          if (u < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      },
    }
    return () => {
      cancelAnimationFrame(raf)
      ctl.current = null
      stage.destroy()
    }
  }, [])

  useEffect(() => {
    ctl.current?.to(active ? specRef.current.hover : specRef.current.rest)
  }, [active])

  return ref
}
