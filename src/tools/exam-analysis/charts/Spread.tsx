// "How hard is a typical question": every question in view, in 5% steps of its VCAA average,
// coloured by the sidebar's difficulty bands, with each band's share written over it and a
// dashed line at the median. Click a bar to list those questions.
//
// It counts questions, not parts: a short answer's score is its parts' average marks over their
// marks (just the parts in view, when a topic is picked). Parts alone would give a saw-tooth —
// a 1-mark part's average comes in steps of 0.1, so it can only ever land in every other bin.

import type { CSSProperties } from 'react'
import { pct, type Item } from '../model'
import type { ChartCtx } from '../view'
import { BAND_FILL, TipBody, bandOf, niceTicks, useTip, useWidth, vBarPath, type Band } from './common'
import { EASY_FROM, HARD_BELOW } from '../../worked-solutions/sidebarModel'

export const BIN_COUNT = 20

export function binOf(score: number): number {
  return Math.min(BIN_COUNT - 1, Math.floor(score * BIN_COUNT + 1e-9))
}

export function binLabel(bin: number): string {
  const lo = bin * 5
  return bin === BIN_COUNT - 1 ? `${lo}–100%` : `${lo}–${lo + 4}%`
}

/** Each question's score from its items in view: summed averages over summed marks. */
export function questionScores(items: Item[]): Map<string, { score: number; marks: number }> {
  const acc = new Map<string, { avg: number; marks: number }>()
  for (const i of items) {
    if (i.avg === null) continue
    const a = acc.get(i.question.id) ?? { avg: 0, marks: 0 }
    a.avg += i.avg
    a.marks += i.marks
    acc.set(i.question.id, a)
  }
  const out = new Map<string, { score: number; marks: number }>()
  for (const [id, a] of acc) if (a.marks) out.set(id, { score: a.avg / a.marks, marks: a.marks })
  return out
}

function medianOf(xs: number[]): number | null {
  if (!xs.length) return null
  const v = [...xs].sort((a, b) => a - b)
  const m = Math.floor(v.length / 2)
  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2
}

/** The section's headline: the median question, and how many are hard. */
export function spreadHeadline(items: Item[]): string {
  const scores = [...questionScores(items).values()].map(q => q.score)
  const med = medianOf(scores)
  if (med === null) return 'Nothing scored in these filters'
  const hard = scores.filter(x => x * 100 < HARD_BELOW).length / scores.length
  const oneIn = hard > 0 && hard < 0.5 ? Math.round(1 / hard) : null
  const tail = oneIn && oneIn <= 10 ? `about 1 in ${oneIn}` : pct(hard)
  return `The typical question averages ${pct(med)}, and ${tail} average${tail.startsWith('about 1') ? 's' : ''} under ${HARD_BELOW}%`
}

const BANDS: { band: Band; from: number; to: number; name: string }[] = [
  { band: 'hard', from: 0, to: HARD_BELOW, name: 'Hard' },
  { band: 'medium', from: HARD_BELOW, to: EASY_FROM, name: 'Middling' },
  { band: 'easy', from: EASY_FROM, to: 100, name: 'Well done' },
]

export function Histogram({ ctx, items }: { ctx: ChartCtx; items: Item[] }) {
  const tip = useTip()
  const [ref, width] = useWidth<HTMLDivElement>()
  const height = 240
  const m = { l: 34, r: 14, t: 40, b: 26 }
  const counts = new Array(BIN_COUNT).fill(0) as number[]
  const marks = new Array(BIN_COUNT).fill(0) as number[]
  const scores = questionScores(items)
  for (const { score, marks: mk } of scores.values()) {
    counts[binOf(score)]++
    marks[binOf(score)] += mk
  }
  const n = scores.size
  const all = [...scores.values()].map(q => q.score)
  const med = medianOf(all)
  const shareIn = (from: number, to: number) => (n ? all.filter(x => x * 100 >= from && x * 100 < (to === 100 ? 101 : to)).length / n : 0)
  const ticks = niceTicks(Math.max(1, ...counts))
  const yMax = ticks[ticks.length - 1]
  const iw = Math.max(10, width - m.l - m.r)
  const ih = height - m.t - m.b
  const bw = iw / BIN_COUNT
  const Y = (v: number) => m.t + ih - (v / yMax) * ih

  return (
    <div>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-2">
        {n} {n === 1 ? 'question' : 'questions'} in view, by VCAA average: an MCQ’s % correct, a short answer’s average mark as a share of its marks. The bands are
        the worked-solutions sidebar’s. Click a bar to list its questions.
      </p>
      <div ref={tip.wrapRef} className="relative">
        <div ref={ref}>
          {width > 0 && (
            <svg width={width} height={height} className="block" role="group" aria-label="Histogram of average scores in 5% steps">
              {ticks.map(t => (
                <g key={t}>
                  <line x1={m.l} x2={width - m.r} y1={Y(t)} y2={Y(t)} stroke={t === 0 ? 'var(--ea-axis)' : 'var(--ea-grid)'} />
                  <text x={m.l - 6} y={Y(t) + 4} textAnchor="end" fontSize={11} className="fill-gray-500 dark:fill-gray-400">
                    {t}
                  </text>
                </g>
              ))}
              {/* Each band's name and share, over a hairline spanning its bins. */}
              {BANDS.map(b => {
                const x0 = m.l + (b.from / 100) * iw + 2
                const x1 = m.l + (b.to / 100) * iw - 2
                const wide = x1 - x0 > 96
                return (
                  <g key={b.band}>
                    <line x1={x0} x2={x1} y1={22} y2={22} strokeWidth={2} strokeLinecap="round" stroke={BAND_FILL[b.band]} />
                    <text x={x0} y={14} fontSize={11.5} className={b.band === 'hard' ? 'fill-amber-700 dark:fill-amber-400' : 'fill-gray-600 dark:fill-gray-300'}>
                      <tspan fontWeight={700}>{pct(shareIn(b.from, b.to))}</tspan>
                      {wide && <tspan dx={4}>{b.name.toLowerCase()}</tspan>}
                    </text>
                  </g>
                )
              })}
              {counts.map((c, k) => {
                const x = m.l + k * bw
                const h = (c / yMax) * ih
                const sel = ctx.focus.bin === k
                const body = <TipBody value={`${c} ${c === 1 ? 'question' : 'questions'}`} label={`Average ${binLabel(k)}`} lines={[`${marks[k]} marks`]} />
                return (
                  <g
                    key={k}
                    className="group cursor-pointer outline-none"
                    tabIndex={c ? 0 : -1}
                    role="button"
                    aria-label={`${binLabel(k)}: ${c} questions`}
                    onClick={() => c && ctx.onBin(k)}
                    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && c && (e.preventDefault(), ctx.onBin(k))}
                    onPointerMove={e => tip.show(e, body)}
                    onPointerLeave={tip.hide}
                    onFocus={e => tip.show(e, body)}
                    onBlur={tip.hide}
                  >
                    <rect x={x} y={m.t} width={bw} height={ih} fill="transparent" strokeWidth={2} className="stroke-transparent group-focus-visible:stroke-blue-500" />
                    {/* Bars rise from the axis on arrival, left to right. */}
                    {h > 0 && (
                      <path
                        className="ea-col"
                        style={{ '--i': k } as CSSProperties}
                        d={vBarPath(x + 1, Y(c), Math.max(1, bw - 2), h)}
                        fill={BAND_FILL[bandOf((k * 5) / 100)]}
                        opacity={ctx.focus.bin !== null && !sel ? 0.35 : 1}
                      />
                    )}
                    {sel && h > 0 && <path d={vBarPath(x + 1, Y(c), Math.max(1, bw - 2), h)} fill="none" strokeWidth={2} className="stroke-gray-900 dark:stroke-white" />}
                  </g>
                )
              })}
              {med !== null && (
                <g pointerEvents="none">
                  <line x1={m.l + med * iw} x2={m.l + med * iw} y1={m.t - 6} y2={m.t + ih} stroke="var(--ea-ref)" strokeDasharray="3 3" />
                  <text x={m.l + med * iw + 5} y={m.t + 4} fontSize={11} fontWeight={600} className="fill-gray-700 dark:fill-gray-200">
                    Median {pct(med)}
                  </text>
                </g>
              )}
              {Array.from({ length: BIN_COUNT / 2 + 1 }, (_, k) => k * 10).map(v => (
                <text
                  key={v}
                  x={m.l + (v / 100) * iw}
                  y={height - 8}
                  textAnchor={v === 0 ? 'start' : v === 100 ? 'end' : 'middle'}
                  fontSize={11}
                  className="fill-gray-500 dark:fill-gray-400"
                >
                  {width < 480 && v % 20 ? '' : `${v}%`}
                </text>
              ))}
            </svg>
          )}
        </div>
        {tip.node}
      </div>
    </div>
  )
}
