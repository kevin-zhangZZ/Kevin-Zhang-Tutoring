// Building blocks for the interactive diagrams in worked solutions (AUTHORING_GUIDE §15). Every
// widget file in this folder imports from here, never from 'mafs' directly, so the look — axes,
// grid, colours, sliders, labels — is the same on every question.
//
// This module (and mafs with it) is only reached through Explore's lazyWidget, so none of it is
// in the main bundle.

import 'mafs/core.css'
import './kit.css'
import { useContext, useEffect, useId, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { Coordinates, Mafs, Polygon, useTransformContext, vec } from 'mafs'
import Katex from '../../../components/Katex'
import UIToggle, { CHIP_BASE, CHIP_OFF } from '../../../components/ui/Toggle'
import { ExploreTitleContext } from '../exploreContext'

// `Text` is mafs's own: beware that its attach 'n'/'s' are upside down (mafs 0.21 puts 'n' BELOW
// the point). Use `Label` below, which places n/s/e/w the right way round.
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

/** Tick labels: a formatter, or false for none. */
type TickLabels = ((v: number) => string) | false

/** Track an element's width (for sizing an equal-scale plane to fit its column). */
function useWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    setWidth(el.getBoundingClientRect().width)
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(entries => setWidth(entries[0]?.contentRect.width ?? 0))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, width] as const
}

export function Plane({
  x,
  y,
  xStep = 1,
  yStep = 1,
  height = 320,
  minHeight = 200,
  equalScale = false,
  xLabel = 'x',
  yLabel = 'y',
  labels = tick,
  xLabels,
  yLabels,
  children,
  label,
}: {
  /** Accessible name for the graph (screen readers), e.g. "Graph of y = f(x) and its inverse".
   *  Without one, the name is "Interactive graph: " plus the enclosing Explore's title. */
  label?: string
  /** The x-range to show. */
  x: vec.Vector2
  /** The y-range to show. */
  y: vec.Vector2
  xStep?: number
  yStep?: number
  /** The plane's height in px. With `equalScale` this is the maximum: the plane takes the
   *  height that fits the ranges to its width exactly (never below `minHeight`). */
  height?: number
  minHeight?: number
  /** Keep one unit the same length on both axes — needed whenever angles, circles,
   *  perpendicularity or reflection in y = x matter. Otherwise the ranges are stretched to fill
   *  the box. */
  equalScale?: boolean
  /** Axis names, drawn just past the positive end of each axis. '' for none. */
  xLabel?: string
  yLabel?: string
  /** Tick-number formatter for both axes (default `tick`), or false for none. */
  labels?: TickLabels
  /** Override the tick numbers on one axis only — e.g. `yLabels={false}` when a steep curve runs
   *  over the y-axis numbers, or a formatter that skips a value that collides. */
  xLabels?: TickLabels
  yLabels?: TickLabels
  children?: ReactNode
}) {
  const wrap = (f: TickLabels) => (f === false ? false : (v: number) => (Math.abs(v) < 1e-9 ? '' : f(v)))
  const fx = wrap(xLabels === undefined ? labels : xLabels)
  const fy = wrap(yLabels === undefined ? labels : yLabels)

  // Pad the view in proportion to each range, so the axis names past the positive ends and the
  // last tick numbers always have room, whatever the scale.
  const px = 0.07 * (x[1] - x[0])
  const py = 0.08 * (y[1] - y[0])
  const vx: vec.Vector2 = [x[0] - px, x[1] + px]
  const vy: vec.Vector2 = [y[0] - py, y[1] + py]

  // Name the graph after its Explore box's title (rendered text, maths included) unless given a label.
  const exploreTitleId = useContext(ExploreTitleContext)
  const prefixId = useId()
  const named = label === undefined && exploreTitleId
    ? { 'aria-labelledby': `${prefixId} ${exploreTitleId}` }
    : { 'aria-label': label ?? 'Interactive graph' }

  const [ref, width] = useWidth()
  const h = equalScale && width > 0
    ? clamp(Math.round((width * (vy[1] - vy[0])) / (vx[1] - vx[0])), minHeight, height)
    : height

  return (
    // role="group" rather than "img": many planes hold draggable points that must stay reachable.
    <div className="ws-plane" ref={ref} role="group" {...named}>
      {'aria-labelledby' in named && <span id={prefixId} hidden>Interactive graph:</span>}
      <Mafs height={h} viewBox={{ x: vx, y: vy, padding: 0 }} preserveAspectRatio={equalScale ? 'contain' : false} pan={false} zoom={false}>
        <Coordinates.Cartesian xAxis={{ lines: xStep, labels: fx }} yAxis={{ lines: yStep, labels: fy }} subdivisions={false} />
        {/* Axis names past the positive end of each axis, set just off the axis line (which runs
            on into the padding) and clear of the tick numbers (mafs puts those below the x-axis
            and to the right of the y-axis): x above its axis, y to the left of its axis. */}
        {xLabel && y[0] <= 0 && y[1] >= 0 && (
          <Label at={[x[1], 0]} attach="ne" size={14} italic>
            {xLabel}
          </Label>
        )}
        {yLabel && x[0] <= 0 && x[1] >= 0 && (
          <Label at={[0, y[1]]} attach="nw" size={14} italic>
            {yLabel}
          </Label>
        )}
        {children}
      </Mafs>
    </div>
  )
}

export type Attach = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw' | 'c'

/** A text label on the plane, with a halo so it reads over the grid and curves. `attach` says
 *  which side of the point the text sits on: 'n' above, 's' below, 'e' right, 'w' left, 'ne'
 *  above-right, …, 'c' centred on it. `gap` is the distance from the point in px. */
export function Label({
  at,
  children,
  color = C.ink,
  attach = 'ne',
  size = 13,
  gap = 7,
  italic = false,
  bold = true,
}: {
  at: vec.Vector2
  children: string | number | (string | number)[]
  color?: string
  attach?: Attach
  size?: number
  gap?: number
  italic?: boolean
  bold?: boolean
}) {
  const { viewTransform, userTransform } = useTransformContext()
  const [px, py] = vec.transform(at, vec.matrixMult(viewTransform, userTransform))
  let dx = 0
  let dy = 0
  let anchor: 'start' | 'middle' | 'end' = 'middle'
  let baseline: 'central' | 'alphabetic' | 'hanging' = 'central'
  if (attach === 'e' || attach === 'ne' || attach === 'se') {
    dx = gap
    anchor = 'start'
  } else if (attach === 'w' || attach === 'nw' || attach === 'sw') {
    dx = -gap
    anchor = 'end'
  }
  if (attach === 'n' || attach === 'ne' || attach === 'nw') {
    dy = -gap
    baseline = 'alphabetic'
  } else if (attach === 's' || attach === 'se' || attach === 'sw') {
    dy = gap
    baseline = 'hanging'
  }
  if (dx && dy) {
    dx *= 0.75
    dy *= 0.75
  }
  return (
    <text
      x={px + dx}
      y={py + dy}
      fontSize={size}
      textAnchor={anchor}
      dominantBaseline={baseline}
      fontStyle={italic ? 'italic' : undefined}
      fontWeight={bold ? 600 : 400}
      className="ws-label"
      style={{ fill: color }}
    >
      {Array.isArray(children) ? children.join('') : children}
    </text>
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
  return <UIToggle label={label} checked={checked} onChange={onChange} />
}

/** A one-shot action — "Go to x = b", "Reset" — styled like an unpressed Toggle. */
export function ActionButton({ label, onClick }: { label: ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`${CHIP_BASE} ${CHIP_OFF}`}>
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

/** True when the student has asked their device for less motion. Read it when a tween starts:
 *  under reduced motion a tween jumps straight to its end state instead of animating. */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

/** Animate a number from min to max over `seconds`, driving a slider's state (under reduced
 *  motion it steps there in a few still frames instead of sweeping). Returns the play
 *  state and a toggle; call `stop()` when the student grabs the slider themselves. */
export function usePlayer(
  setValue: Dispatch<SetStateAction<number>>,
  { min, max, seconds = 5 }: { min: number; max: number; seconds?: number },
) {
  const [playing, setPlaying] = useState(false)
  const current = useRef(min)
  useEffect(() => {
    if (!playing) return
    if (prefersReducedMotion()) {
      // No continuous sweep: step through the range in a few still frames, so the student still
      // sees the values change and can stop on any of them.
      const steps = 6
      const id = setInterval(() => {
        let done = false
        setValue(v => {
          const next = v + (max - min) / steps
          if (next >= max - 1e-9) {
            done = true
            current.current = max
            return max
          }
          current.current = next
          return next
        })
        if (done) setPlaying(false)
      }, Math.max(600, (seconds * 1000) / steps))
      return () => clearInterval(id)
    }
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
      <span className="text-[12px] font-display font-semibold tabular-nums text-gray-500 dark:text-gray-400">
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
