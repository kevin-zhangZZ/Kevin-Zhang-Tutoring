// Pieces every exam-analysis chart shares: its width, the hover/focus tooltip, and colours.

import { useCallback, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { HARD_BELOW, EASY_FROM } from '../../worked-solutions/sidebarModel'
import { TAXONOMY, type AnalysisSubject } from '../taxonomy'

/** The element's current content width, kept up to date as it resizes. */
export function useWidth<T extends HTMLElement>(): [RefObject<T>, number] {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    setWidth(el.clientWidth)
    const ro = new ResizeObserver(entries => setWidth(Math.floor(entries[0].contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, width]
}

// ── Tooltip ────────────────────────────────────────────────────────────────────────────────
// One per chart, positioned inside the chart's relative wrapper. Marks call `show` on pointer
// move and on keyboard focus, so the same details are reachable without a mouse.

interface TipState {
  x: number
  y: number
  content: ReactNode
}

export interface Tip {
  wrapRef: RefObject<HTMLDivElement>
  show: (e: { clientX: number; clientY: number } | { currentTarget: Element }, content: ReactNode) => void
  hide: () => void
  node: ReactNode
}

export function useTip(): Tip {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [tip, setTip] = useState<TipState | null>(null)
  const show = useCallback<Tip['show']>((e, content) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const box = wrap.getBoundingClientRect()
    let cx: number
    let cy: number
    if ('clientX' in e) {
      cx = e.clientX
      cy = e.clientY
    } else {
      const r = e.currentTarget.getBoundingClientRect()
      cx = r.left + r.width / 2
      cy = r.top
    }
    setTip({ x: cx - box.left, y: cy - box.top, content })
  }, [])
  const hide = useCallback(() => setTip(null), [])
  const width = wrapRef.current?.clientWidth ?? 0
  const node = tip ? (
    <div
      role="status"
      className="pointer-events-none absolute z-20 max-w-[260px] rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2.5 py-1.5 text-[12px] leading-snug shadow-lg"
      style={{
        left: Math.min(Math.max(tip.x, 70), Math.max(70, width - 70)),
        top: tip.y - 10,
        transform: 'translate(-50%, -100%)',
      }}
    >
      {tip.content}
    </div>
  ) : null
  return { wrapRef, show, hide, node }
}

/** Tooltip body: the value first and strong, what it is underneath. */
export function TipBody({ value, label, lines }: { value: ReactNode; label: ReactNode; lines?: ReactNode[] }) {
  return (
    <>
      <span className="block font-bold text-[13px]">{value}</span>
      <span className="block opacity-80">{label}</span>
      {lines?.map((l, i) => (
        <span key={i} className="block opacity-70">
          {l}
        </span>
      ))}
    </>
  )
}

// ── Colours ────────────────────────────────────────────────────────────────────────────────

/** A topic's colour follows the topic (its place in the taxonomy), never its rank, so it
 *  keeps its colour however the charts are filtered or sorted. */
export function topicIndex(subject: AnalysisSubject, topic: string): number {
  return Math.max(0, TAXONOMY[subject].findIndex(t => t.id === topic))
}

export function topicColor(subject: AnalysisSubject, topic: string): string {
  return `var(--ea-t${topicIndex(subject, topic) + 1})`
}

export type Band = 'hard' | 'medium' | 'easy'

/** Same cut-offs as the worked-solutions sidebar. */
export function bandOf(score: number): Band {
  const p = score * 100
  return p < HARD_BELOW ? 'hard' : p < EASY_FROM ? 'medium' : 'easy'
}

export const BAND_FILL: Record<Band, string> = {
  hard: 'var(--ea-hard)',
  medium: 'var(--ea-medium)',
  easy: 'var(--ea-easy)',
}

export const BAND_LABEL: Record<Band, string> = {
  hard: `Under ${HARD_BELOW}%`,
  medium: `${HARD_BELOW}–${EASY_FROM - 1}%`,
  easy: `${EASY_FROM}% or more`,
}

/** A point on a two-colour scale, t in 0–1. */
export function mix(lo: string, hi: string, t: number): string {
  const k = Math.round(Math.min(1, Math.max(0, t)) * 100)
  return `color-mix(in oklab, ${hi} ${k}%, ${lo})`
}

/** Difficulty as a colour: 80%+ average is the light end, 20% or less the deep amber end. */
export function heatColor(score: number): string {
  return mix('var(--ea-heat-lo)', 'var(--ea-heat-hi)', (0.8 - score) / 0.6)
}

export function BandKey() {
  return (
    <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
      {(['hard', 'medium', 'easy'] as Band[]).map(b => (
        <span key={b} className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: BAND_FILL[b] }} aria-hidden />
          {BAND_LABEL[b]}
        </span>
      ))}
    </span>
  )
}

/** Rounded-top column path: square at the baseline, 4px round at the top. */
export function vBarPath(x: number, y: number, w: number, h: number, r = 4): string {
  if (h <= 0) return ''
  const rr = Math.min(r, h, w / 2)
  return `M${x},${y + h}V${y + rr}Q${x},${y} ${x + rr},${y}H${x + w - rr}Q${x + w},${y} ${x + w},${y + rr}V${y + h}Z`
}

/** Clean tick values from 0 up to at least `max`. */
export function niceTicks(max: number, count = 4): number[] {
  if (max <= 0) return [0]
  const raw = max / count
  const mag = 10 ** Math.floor(Math.log10(raw))
  const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw) ?? raw
  const ticks: number[] = []
  for (let v = 0; v <= max + step * 0.001; v += step) ticks.push(+v.toFixed(6))
  if (ticks[ticks.length - 1] < max) ticks.push(+(ticks[ticks.length - 1] + step).toFixed(6))
  return ticks
}
