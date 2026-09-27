// Building blocks for the interactive diagrams in worked solutions (AUTHORING_GUIDE §15). Every
// widget file in this folder imports from here, never from 'mafs' directly, so the look — axes,
// grid, colours, sliders, labels — is the same on every question.
//
// This module (and mafs with it) is only reached through Explore's lazyWidget, so none of it is
// in the main bundle.

import 'mafs/core.css'
import './kit.css'
import { useEffect, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { Coordinates, Mafs, Polygon, Text, type vec } from 'mafs'
import Katex from '../../../components/Katex'

export { Circle, Line, MovablePoint, Plot, Point, Polygon, Polyline, Text, Vector, Transform, vec } from 'mafs'
export { default as Katex } from '../../../components/Katex'
/** Inline maths inside a Notice: <M>x = \tfrac12</M>, or <M>{'f^{-1}(x)'}</M> when the TeX has
 *  braces (JSX would read those as an expression). Mixed children are joined into one string. */
export function M({ children }: { children: string | (string | number)[] }) {
  return <Katex tex={Array.isArray(children) ? children.join('') : children} />
}

// The site's colours for graphs (§12.10): the function in sky blue, a second function in orange,
// green for a point where two things agree, red for a line that belongs to no curve.
export const C = {
  f: '#0ea5e9',
  g: '#f97316',
  good: '#16a34a',
  bad: '#ef4444',
  violet: '#8b5cf6',
  guide: '#94a3b8',
  ink: 'var(--mafs-fg)',
} as const

// ---------------------------------------------------------------------------------------------
// The coordinate plane
// ---------------------------------------------------------------------------------------------

/** Tick label for a grid value: integers as is, halves/quarters/thirds as fractions, else 2 dp. */
export function tick(v: number): string {
  const r = Math.round(v)
  if (Math.abs(v - r) < 1e-9) return String(r)
  for (const d of [2, 3, 4]) {
    const n = v * d
    if (Math.abs(n - Math.round(n)) < 1e-9) return `${Math.round(n)}/${d}`
  }
  return v.toFixed(2)
}

export function Plane({
  x,
  y,
  xStep = 1,
  yStep = 1,
  height = 320,
  equalScale = false,
  xLabel = 'x',
  yLabel = 'y',
  labels = tick,
  children,
}: {
  /** The x-range to show. */
  x: vec.Vector2
  /** The y-range to show. */
  y: vec.Vector2
  xStep?: number
  yStep?: number
  height?: number
  /** Keep one unit the same length on both axes — needed whenever angles or reflections in
   *  y = x matter. Otherwise the ranges are stretched to fill the box. */
  equalScale?: boolean
  xLabel?: string
  yLabel?: string
  labels?: ((v: number) => string) | false
  children?: ReactNode
}) {
  const fmt = labels === false ? false : (v: number) => (Math.abs(v) < 1e-9 ? '' : labels(v))
  return (
    <div className="ws-plane">
      <Mafs
        height={height}
        viewBox={{ x, y, padding: 0.2 }}
        preserveAspectRatio={equalScale ? 'contain' : false}
        pan={false}
        zoom={false}
      >
        <Coordinates.Cartesian
          xAxis={{ lines: xStep, labels: fmt }}
          yAxis={{ lines: yStep, labels: fmt }}
          subdivisions={false}
        />
        {/* Axis names on the side away from the tick numbers (mafs puts those below the x-axis
            and right of the y-axis), so they never collide with the last tick. */}
        {y[0] <= 0 && y[1] >= 0 && (
          <Text x={x[1]} y={0} attach="n" attachDistance={8} color={C.ink} size={14} svgTextProps={{ fontStyle: 'italic', className: 'ws-label' }}>
            {xLabel}
          </Text>
        )}
        {x[0] <= 0 && x[1] >= 0 && (
          <Text x={0} y={y[1]} attach="w" attachDistance={8} color={C.ink} size={14} svgTextProps={{ fontStyle: 'italic', className: 'ws-label' }}>
            {yLabel}
          </Text>
        )}
        {children}
      </Mafs>
    </div>
  )
}

/** A text label on the plane with a halo, so it reads over the grid and curves. */
export function Label({
  at,
  children,
  color = C.ink,
  attach = 'ne',
  size = 13,
}: {
  at: vec.Vector2
  children: string
  color?: string
  attach?: 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw'
  size?: number
}) {
  return (
    <Text x={at[0]} y={at[1]} attach={attach} attachDistance={14} color={color} size={size} svgTextProps={{ className: 'ws-label' }}>
      {children}
    </Text>
  )
}

/** The region between two curves over [from, to], shaded. `top` and `bottom` may cross — the
 *  polygon still covers exactly the set between them. */
export function Region({
  top,
  bottom,
  from,
  to,
  color,
  opacity = 0.25,
  samples = 160,
}: {
  top: (x: number) => number
  bottom: (x: number) => number
  from: number
  to: number
  color: string
  opacity?: number
  samples?: number
}) {
  if (to <= from) return null
  const pts: vec.Vector2[] = []
  for (let i = 0; i <= samples; i++) {
    const t = from + ((to - from) * i) / samples
    pts.push([t, top(t)])
  }
  for (let i = samples; i >= 0; i--) {
    const t = from + ((to - from) * i) / samples
    pts.push([t, bottom(t)])
  }
  return <Polygon points={pts} color={color} fillOpacity={opacity} weight={0} strokeOpacity={0} />
}

// ---------------------------------------------------------------------------------------------
// Controls
// ---------------------------------------------------------------------------------------------

export function Controls({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-2.5 mt-3">{children}</div>
}

export function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 0.01,
  format = v => v.toFixed(2),
}: {
  /** TeX for the quantity being changed, e.g. "k" or "x". */
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
  format?: (v: number) => string
}) {
  return (
    <label className="flex items-center gap-3 text-[13px] text-gray-700 dark:text-gray-300">
      <span className="flex-none min-w-[2.5rem]">
        <Katex tex={label} />
      </span>
      <input
        type="range"
        className="ws-slider flex-1 min-w-0 h-6 cursor-pointer"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
      <span className="flex-none w-16 text-right font-display font-semibold tabular-nums text-gray-800 dark:text-gray-100">
        {format(value)}
      </span>
    </label>
  )
}

export function Toggle({ label, checked, onChange }: { label: ReactNode; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={`text-[12.5px] font-semibold px-3 py-1.5 rounded-full border transition-colors ${
        checked
          ? 'bg-emerald-600 border-emerald-600 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-gray-950'
          : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
      }`}
    >
      {label}
    </button>
  )
}

export function Buttons({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>
}

export function PlayButton({ playing, onClick, label = 'Play' }: { playing: boolean; onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
    >
      {playing ? (
        <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden="true"><rect x="2" y="1.5" width="3" height="9" rx="0.6" fill="currentColor" /><rect x="7" y="1.5" width="3" height="9" rx="0.6" fill="currentColor" /></svg>
      ) : (
        <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden="true"><path d="M3 1.5v9l7.5-4.5z" fill="currentColor" /></svg>
      )}
      {playing ? 'Pause' : label}
    </button>
  )
}

/** Animate a number from min to max over `seconds`, driving a slider's state. Returns the play
 *  state and a toggle; call `stop()` when the student grabs the slider themselves. */
export function usePlayer(
  setValue: Dispatch<SetStateAction<number>>,
  { min, max, seconds = 5 }: { min: number; max: number; seconds?: number },
) {
  const [playing, setPlaying] = useState(false)
  const current = useRef(min)
  useEffect(() => {
    if (!playing) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      let done = false
      setValue(v => {
        const next = v + ((max - min) * dt) / seconds
        if (next >= max) {
          done = true
          current.current = max
          return max
        }
        current.current = next
        return next
      })
      if (done) setPlaying(false)
      else raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, min, max, seconds, setValue])
  return {
    playing,
    toggle: (value: number) => {
      if (!playing && value >= max - 1e-9) setValue(min)
      setPlaying(p => !p)
    },
    stop: () => setPlaying(false),
  }
}

/** A row of live values under the graph: "P = (1.20, 0.77)". */
export function Readouts({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-gray-700 dark:text-gray-300">{children}</div>
}

export function Readout({ tex, color }: { tex: string; color?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {color && <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: color }} />}
      <Katex tex={tex} />
    </span>
  )
}

/** The teacher's voice under the diagram: what to notice right now. Pass a different message as
 *  the state changes, so the explanation follows what the student is looking at. */
export function Notice({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'good' | 'warn' }) {
  const toneClass =
    tone === 'good'
      ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100'
      : tone === 'warn'
        ? 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100'
        : 'border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-200'
  return <div className={`rounded-lg border px-3.5 py-2.5 text-[13px] leading-relaxed ${toneClass}`}>{children}</div>
}

/** Several short steps the student can page through, each changing what the diagram shows —
 *  the order a teacher would build the picture up on the board. */
export function useSteps(count: number) {
  const [step, setStep] = useState(0)
  return {
    step,
    setStep,
    next: () => setStep(s => Math.min(count - 1, s + 1)),
    back: () => setStep(s => Math.max(0, s - 1)),
    first: step === 0,
    last: step === count - 1,
  }
}

export function StepNav({
  step,
  count,
  onBack,
  onNext,
}: {
  step: number
  count: number
  onBack: () => void
  onNext: () => void
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onBack}
        disabled={step === 0}
        className="text-[12.5px] font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        ‹ Back
      </button>
      <span className="text-[12px] font-display font-semibold tabular-nums text-gray-400 dark:text-gray-500">
        Step {step + 1} of {count}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={step === count - 1}
        className="text-[12.5px] font-semibold px-3 py-1.5 rounded-full bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
      >
        Next ›
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------------------------
// Numerics
// ---------------------------------------------------------------------------------------------

/** Simpson's rule — for live "area so far" readouts only; the working always shows the exact
 *  antiderivative. */
export function integrate(fn: (x: number) => number, a: number, b: number, n = 200): number {
  if (b === a) return 0
  const m = n % 2 === 0 ? n : n + 1
  const h = (b - a) / m
  let s = fn(a) + fn(b)
  for (let i = 1; i < m; i++) s += fn(a + i * h) * (i % 2 ? 4 : 2)
  return (s * h) / 3
}

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** A number for a live readout: fixed decimals with a real minus sign. */
export function num(v: number, dp = 2): string {
  const s = Math.abs(v) < 0.5 * 10 ** -dp ? (0).toFixed(dp) : v.toFixed(dp)
  return s.replace('-', '−')
}
