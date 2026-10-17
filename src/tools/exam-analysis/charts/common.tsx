// Pieces every exam-analysis chart shares: its width, the hover/focus tooltip, and colours.
// Colour on this page means one thing: grey is the data, amber is "hard" or "marks lost".

import { useCallback, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { HARD_BELOW, EASY_FROM } from '../../worked-solutions/sidebarModel'

/** The element's current content width, kept up to date as it resizes. A callback ref, so it
 *  picks the element up whenever it mounts — including after a chart has first shown a message
 *  in its place (e.g. "pick more than one year") and only later draws. */
export function useWidth<T extends HTMLElement>(): [(el: T | null) => void, number] {
  const [el, setEl] = useState<T | null>(null)
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    if (!el) return
    setWidth(el.clientWidth)
    const ro = new ResizeObserver(entries => setWidth(Math.floor(entries[0].contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [el])
  return [setEl, width]
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

/** A stable pseudo-random 0–1 from a string, so ticks and dots keep their jitter between renders. */
export function hash01(key: string): number {
  let h = 2166136261
  for (let k = 0; k < key.length; k++) h = Math.imul(h ^ key.charCodeAt(k), 16777619)
  return ((h >>> 0) % 1000) / 1000
}

/** Clean axis values from lo to hi, about `count` of them. */
export function niceTicks(lo: number, hi: number, count = 5): number[] {
  const span = Math.max(1e-9, hi - lo)
  const raw = span / count
  const mag = 10 ** Math.floor(Math.log10(raw))
  const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(st => st >= raw) ?? raw
  const out: number[] = []
  for (let v = Math.ceil(lo / step - 1e-9) * step; v <= hi + step * 1e-6; v += step) out.push(+v.toFixed(6))
  return out
}
