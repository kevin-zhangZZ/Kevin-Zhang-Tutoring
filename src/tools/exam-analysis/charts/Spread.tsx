// "How hard is a typical question": every question in view as one dot, stacked in 5% columns
// of its VCAA average — lieflat's stacked units (Dot Cascade). Dots take the difficulty bands'
// colours, each band's share is written over it, and a dashed line marks the median. Click a
// dot to open that question's worked solution, or a column to list its questions below.
//
// It counts questions, not parts: a short answer's score is its parts' average marks over their
// marks (just the parts in view, when a topic is picked). Parts alone would give a saw-tooth —
// a 1-mark part's average comes in steps of 0.1, so it can only ever land in every other bin.

import type { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { questionPath } from '../../worked-solutions/routes'
import type { QuestionMeta } from '../../worked-solutions/data'
import { pct, type Item } from '../model'
import type { ChartCtx } from '../view'
import { BAND_FILL, TipBody, bandOf, useTip, useWidth, type Band } from './common'
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
  { band: 'hard', from: 0, to: HARD_BELOW, name: 'hard' },
  { band: 'medium', from: HARD_BELOW, to: EASY_FROM, name: 'middling' },
  { band: 'easy', from: EASY_FROM, to: 100, name: 'well done' },
]

interface Dot {
  q: QuestionMeta
  label: string
  score: number
  marks: number
}

function short(i: Item): string {
  const code = i.question.code.replace(/\(.*\)\s*$/, '').trim()
  return `${i.year} ${i.exam === 'Exam 1' ? 'E1' : 'E2'} ${code}`
}

export function Histogram({ ctx, items }: { ctx: ChartCtx; items: Item[] }) {
  const tip = useTip()
  const navigate = useNavigate()
  const [ref, width] = useWidth<HTMLDivElement>()

  const scores = questionScores(items)
  const byId = new Map(items.map(i => [i.question.id, i]))
  const cols: Dot[][] = Array.from({ length: BIN_COUNT }, () => [])
  for (const [id, { score, marks }] of scores) {
    const i = byId.get(id)!
    cols[binOf(score)].push({ q: i.question, label: short(i), score, marks })
  }
  for (const c of cols) c.sort((a, b) => a.score - b.score)
  const n = scores.size
  const all = [...scores.values()].map(q => q.score)
  const med = medianOf(all)
  const shareIn = (from: number, to: number) => (n ? all.filter(x => x * 100 >= from && (to === 100 || x * 100 < to)).length / n : 0)

  // Fit the dots: the largest pitch at which the tallest column, packed `per` dots to a row
  // inside its 5% column, still fits the plot's height.
  const m = { l: 6, r: 6, t: 40, b: 24 }
  const maxH = 236
  const iw = Math.max(100, width - m.l - m.r)
  const cw = iw / BIN_COUNT
  const tallest = Math.max(1, ...cols.map(c => c.length))
  let pitch = 12
  let per = 1
  for (; pitch > 3; pitch -= 0.25) {
    per = Math.max(1, Math.floor((cw - 1) / pitch))
    if (Math.ceil(tallest / per) * pitch <= maxH) break
  }
  // The plot is as tall as the tallest column needs, so a short spread doesn't float.
  const plotH = Math.max(90, Math.min(maxH, Math.ceil(tallest / per) * pitch + 12))
  const height = m.t + plotH + m.b
  const r = Math.max(1.3, pitch / 2 - 0.7)
  const base = m.t + plotH
  const X = (v: number) => m.l + v * iw

  return (
    <div>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-2">
        One dot per question ({n} in view), placed by its VCAA average: an MCQ’s % correct, a short answer’s average mark as a share of its marks.
      </p>
      <div ref={tip.wrapRef} className="relative">
        <div ref={ref}>
          {width > 0 && (
            <svg width={width} height={height} className="block" role="group" aria-label="Every question in view by its average score, in 5% columns">
              {/* Each band's share over a hairline spanning its columns. */}
              {BANDS.map(b => {
                const x0 = X(b.from / 100) + 2
                const x1 = X(b.to / 100) - 2
                return (
                  <g key={b.band}>
                    <line x1={x0} x2={x1} y1={22} y2={22} strokeWidth={2} strokeLinecap="round" stroke={BAND_FILL[b.band]} />
                    <text x={x0} y={14} fontSize={11.5} className={b.band === 'hard' ? 'fill-amber-700 dark:fill-amber-400' : 'fill-gray-600 dark:fill-gray-300'}>
                      <tspan fontWeight={700}>{pct(shareIn(b.from, b.to))}</tspan>
                      {x1 - x0 > 96 && <tspan dx={4}>{b.name}</tspan>}
                    </text>
                  </g>
                )
              })}
              {cols.map((c, k) => {
                const x0 = m.l + k * cw
                const sel = ctx.focus.bin === k
                const dim = ctx.focus.bin !== null && !sel
                const colTip = <TipBody value={`${c.length} ${c.length === 1 ? 'question' : 'questions'}`} label={`Average ${binLabel(k)}`} lines={['Click to list them below']} />
                const inner = Math.min(per, Math.max(1, c.length)) * pitch
                return (
                  <g
                    key={k}
                    className="group outline-none"
                    tabIndex={c.length ? 0 : -1}
                    role="button"
                    aria-label={`${binLabel(k)}: ${c.length} questions`}
                    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && c.length && (e.preventDefault(), ctx.onBin(k))}
                    onFocus={e => tip.show(e, colTip)}
                    onBlur={tip.hide}
                  >
                    <rect
                      x={x0}
                      y={m.t}
                      width={cw}
                      height={plotH}
                      rx={4}
                      className={`cursor-pointer ${sel ? 'fill-gray-100 dark:fill-gray-800' : 'fill-transparent group-hover:fill-gray-50 dark:group-hover:fill-gray-800/50'} stroke-transparent group-focus-visible:stroke-blue-500`}
                      strokeWidth={2}
                      onClick={() => c.length && ctx.onBin(k)}
                      onPointerMove={e => tip.show(e, colTip)}
                      onPointerLeave={tip.hide}
                    />
                    {c.map((d, j) => {
                      const row = Math.floor(j / per)
                      const col = j % per
                      const cx = x0 + (cw - inner) / 2 + col * pitch + pitch / 2
                      const cy = base - row * pitch - pitch / 2
                      const body = <TipBody value={`${pct(d.score)} average`} label={`${d.label} · ${d.marks} ${d.marks === 1 ? 'mark' : 'marks'}`} lines={['Click to open the worked solution']} />
                      return (
                        <circle
                          key={d.q.id}
                          className="ea-pop cursor-pointer hover:stroke-gray-900 dark:hover:stroke-white"
                          style={{ '--d': k * 25 + row * 12 } as CSSProperties}
                          cx={cx}
                          cy={cy}
                          r={r}
                          fill={BAND_FILL[bandOf(d.score)]}
                          strokeWidth={1.5}
                          opacity={dim ? 0.3 : 1}
                          onClick={() => navigate(questionPath(d.q))}
                          onPointerMove={e => (e.stopPropagation(), tip.show(e, body))}
                          onPointerLeave={tip.hide}
                        />
                      )
                    })}
                  </g>
                )
              })}
              <line x1={m.l} x2={width - m.r} y1={base + 2} y2={base + 2} stroke="var(--ea-axis)" />
              {med !== null && (
                <g pointerEvents="none">
                  <line x1={X(med)} x2={X(med)} y1={m.t - 6} y2={base} stroke="var(--ea-ref)" strokeDasharray="3 3" />
                  <text x={X(med) + 5} y={m.t + 4} fontSize={11} fontWeight={600} paintOrder="stroke" stroke="var(--ea-surface)" strokeWidth={3} className="fill-gray-700 dark:fill-gray-200">
                    Median {pct(med)}
                  </text>
                </g>
              )}
              {Array.from({ length: BIN_COUNT / 2 + 1 }, (_, k) => k * 10).map(v => (
                <text
                  key={v}
                  x={X(v / 100)}
                  y={height - 6}
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
