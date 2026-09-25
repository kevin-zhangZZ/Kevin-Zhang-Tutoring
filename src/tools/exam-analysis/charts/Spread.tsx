// "How the scores spread out": every question in view, in 5% steps of its VCAA average,
// coloured by the sidebar's difficulty bands. Click a bar to list those questions.
//
// It counts questions, not parts: a short answer's score is its parts' average marks over their
// marks (just the parts in view, when a topic is picked). Parts alone would give a saw-tooth —
// a 1-mark part's average comes in steps of 0.1, so it can only ever land in every other bin.

import type { Item } from '../model'
import type { ChartCtx } from '../view'
import { BAND_FILL, BandKey, TipBody, bandOf, niceTicks, useTip, useWidth, vBarPath } from './common'

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

export function Histogram({ ctx, items }: { ctx: ChartCtx; items: Item[] }) {
  const tip = useTip()
  const [ref, width] = useWidth<HTMLDivElement>()
  const height = 240
  const m = { l: 34, r: 14, t: 10, b: 26 }
  const counts = new Array(BIN_COUNT).fill(0) as number[]
  const marks = new Array(BIN_COUNT).fill(0) as number[]
  const scores = questionScores(items)
  for (const { score, marks: mk } of scores.values()) {
    counts[binOf(score)]++
    marks[binOf(score)] += mk
  }
  const n = scores.size
  const ticks = niceTicks(Math.max(1, ...counts))
  const yMax = ticks[ticks.length - 1]
  const iw = Math.max(10, width - m.l - m.r)
  const ih = height - m.t - m.b
  const bw = iw / BIN_COUNT
  const Y = (v: number) => m.t + ih - (v / yMax) * ih

  return (
    <div>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-2 flex flex-wrap gap-x-4 gap-y-1">
        <span>
          {n} {n === 1 ? 'question' : 'questions'} in view, by VCAA average: an MCQ’s % correct, a short answer’s average mark as a share of its marks. Click a bar
          to list them.
        </span>
        <BandKey />
      </p>
      <div ref={tip.wrapRef} className="relative">
        <div ref={ref}>
          {width > 0 && (
            <svg width={width} height={height} className="block" role="img" aria-label="Histogram of average scores in 5% steps">
              {ticks.map(t => (
                <g key={t}>
                  <line x1={m.l} x2={width - m.r} y1={Y(t)} y2={Y(t)} stroke={t === 0 ? 'var(--ea-axis)' : 'var(--ea-grid)'} />
                  <text x={m.l - 6} y={Y(t) + 4} textAnchor="end" fontSize={11} className="fill-gray-400 dark:fill-gray-500">
                    {t}
                  </text>
                </g>
              ))}
              {counts.map((c, k) => {
                const x = m.l + k * bw
                const h = (c / yMax) * ih
                const sel = ctx.focus.bin === k
                const body = <TipBody value={`${c} ${c === 1 ? 'question' : 'questions'}`} label={`Average ${binLabel(k)}`} lines={[`${marks[k]} marks`]} />
                return (
                  <g
                    key={k}
                    className="cursor-pointer outline-none"
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
                    <rect x={x} y={m.t} width={bw} height={ih} fill="transparent" />
                    {h > 0 && (
                      <path
                        d={vBarPath(x + 1, Y(c), Math.max(1, bw - 2), h)}
                        fill={BAND_FILL[bandOf((k * 5) / 100)]}
                        opacity={ctx.focus.bin !== null && !sel ? 0.35 : 1}
                      />
                    )}
                    {sel && h > 0 && <path d={vBarPath(x + 1, Y(c), Math.max(1, bw - 2), h)} fill="none" strokeWidth={2} className="stroke-gray-900 dark:stroke-white" />}
                  </g>
                )
              })}
              {Array.from({ length: BIN_COUNT / 2 + 1 }, (_, k) => k * 10).map(v => (
                <text
                  key={v}
                  x={m.l + (v / 100) * iw}
                  y={height - 8}
                  textAnchor={v === 0 ? 'start' : v === 100 ? 'end' : 'middle'}
                  fontSize={11}
                  className="fill-gray-400 dark:fill-gray-500"
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
