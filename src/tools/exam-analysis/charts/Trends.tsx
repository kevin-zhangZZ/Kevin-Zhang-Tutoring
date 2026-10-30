// "Has it changed": lieflat's Dumbbell Queue. Each topic (or subtopic) is a track with a hollow
// dot at its average year in the earlier period and a solid dot at its average year in the
// later one, strung with one bead per mark a year (or per percentage point) of change. The
// periods are before and since the 2023 study design when the years in view span it, else the
// first and second half of the years in view. The biggest move is amber.

import type { CSSProperties } from 'react'
import { STUDY_DESIGN_YEAR, fmt, pct, statOf, type Group } from '../model'
import { isPicked, type ChartCtx } from '../view'
import { TipBody, hash01, niceTicks, useTip, useWidth } from './common'

export type TrendMeasure = 'marks' | 'score'

export interface Periods {
  a: number[]
  b: number[]
  /** True when the split is the study-design change rather than half-way. */
  design: boolean
}

export function periodsOf(years: number[]): Periods | null {
  if (years.length < 2) return null
  const k = years.findIndex(y => y >= STUDY_DESIGN_YEAR)
  if (k > 0) return { a: years.slice(0, k), b: years.slice(k), design: true }
  const half = Math.floor(years.length / 2)
  return { a: years.slice(0, half), b: years.slice(half), design: false }
}

export const span = (ys: number[]) => (ys.length === 1 ? String(ys[0]) : `${ys[0]}–${ys[ys.length - 1]}`)

export interface Track {
  id: string
  label: string
  g: Group | null
  a: number | null
  b: number | null
}

/** A group's value over some years: marks a year, or its marks-weighted average score. */
function valueOver(g: Group, ys: number[], measure: TrendMeasure): number | null {
  const list = g.itemList.filter(i => ys.includes(i.year))
  if (measure === 'marks') return list.reduce((s, i) => s + i.marks, 0) / ys.length
  return statOf(list).score
}

export function tracksOf(ctx: ChartCtx, p: Periods, measure: TrendMeasure): Track[] {
  const out: Track[] = ctx.groups
    .filter(g => g.marks > 0)
    .map(g => ({ id: g.id, label: g.label, g, a: valueOver(g, p.a, measure), b: valueOver(g, p.b, measure) }))
  if (measure === 'marks' && ctx.missing.size) {
    const m = (ys: number[]) => ys.reduce((s, y) => s + (ctx.missing.get(y) ?? 0), 0) / ys.length
    const a = m(p.a)
    const b = m(p.b)
    if (a >= 0.5 || b >= 0.5) out.push({ id: 'missing', label: 'Not in archive', g: null, a, b })
  }
  return out
}

const delta = (t: Track) => (t.a === null || t.b === null ? 0 : t.b - t.a)

/** The track that moved most, among groups with enough marks for their averages to mean much. */
function biggest(ctx: ChartCtx, tracks: Track[]): Track | undefined {
  const total = ctx.groups.reduce((s, g) => s + g.marks, 0)
  const min = Math.max(3, total * 0.02)
  return tracks.filter(t => t.g && t.g.marks >= min && t.a !== null && t.b !== null).sort((x, y) => Math.abs(delta(y)) - Math.abs(delta(x)))[0]
}

/** The section's headline: the biggest move between the two periods. */
export function trendHeadline(ctx: ChartCtx, measure: TrendMeasure): string {
  const p = periodsOf(ctx.years)
  if (!p) return 'Pick more than one year to see what has changed'
  const top = biggest(ctx, tracksOf(ctx, p, measure))
  if (!top) return 'Nothing in these filters'
  const d = delta(top)
  const when = p.design ? `since the ${STUDY_DESIGN_YEAR} study design` : `from ${span(p.a)} to ${span(p.b)}`
  if (measure === 'marks') {
    if (Math.abs(d) < 0.5) return `Little has moved ${when}`
    return `${top.label} has ${d > 0 ? 'gained' : 'lost'} the most ${when}, from ${fmt(Math.round((top.a ?? 0) * 10) / 10)} to ${fmt(Math.round((top.b ?? 0) * 10) / 10)} marks a year`
  }
  if (Math.abs(d) < 0.02) return `Difficulty has barely moved ${when}`
  return `${top.label} has ${d < 0 ? 'got harder' : 'got easier'} the most ${when}, from ${pct(top.a)} to ${pct(top.b)} on average`
}

export function Dumbbells({ ctx, measure }: { ctx: ChartCtx; measure: TrendMeasure }) {
  const tip = useTip()
  const [ref, width] = useWidth<HTMLDivElement>()
  const p = periodsOf(ctx.years)

  if (!p)
    return (
      <p className="text-[13px] text-gray-500 dark:text-gray-400">
        This compares two stretches of years, so it needs more than one. Widen the years above to see what has changed.
      </p>
    )

  const marks = measure === 'marks'
  const tracks = tracksOf(ctx, p, measure)
    .filter(t => t.a !== null || t.b !== null)
    .sort((x, y) => (marks ? (y.b ?? 0) - (x.b ?? 0) : (x.b ?? 1) - (y.b ?? 1)))
  const big = biggest(ctx, tracks)
  const vals = tracks.flatMap(t => [t.a, t.b]).filter((v): v is number => v !== null)
  const lo = marks ? 0 : Math.max(0, Math.floor((Math.min(...vals) - 0.05) * 10) / 10)
  const hi = marks ? Math.max(5, Math.ceil(Math.max(...vals) / 5) * 5) : Math.min(1, Math.ceil((Math.max(...vals) + 0.05) * 10) / 10)
  const ticks = niceTicks(lo, hi, marks ? 6 : 5)

  const narrow = width < 560
  const labelW = narrow ? 104 : 196
  const X0 = labelW + 14
  const X1 = Math.max(X0 + 120, width - 34)
  const rowH = tracks.length > 12 ? 28 : 34
  const top = 8
  const height = top + tracks.length * rowH + 26
  const x = (v: number) => X0 + ((v - lo) / (hi - lo)) * (X1 - X0)
  const fmtV = (v: number | null) => (v === null ? '—' : marks ? fmt(Math.round(v * 10) / 10) : pct(v))
  const unit = marks ? 1 : 0.01
  const action = ctx.level === 'sub' ? 'list its questions' : 'see its subtopics'

  return (
    <div>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-2 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="inline-flex items-center gap-1.5">
          <svg width={10} height={10} aria-hidden>
            <circle cx={5} cy={5} r={3.6} fill="var(--ea-surface)" stroke="var(--ea-ink)" strokeWidth={1.3} />
          </svg>
          {span(p.a)}
          {p.design ? ', previous study design' : ''}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg width={10} height={10} aria-hidden>
            <circle cx={5} cy={5} r={4} fill="var(--ea-ink)" />
          </svg>
          {span(p.b)}
          {p.design ? `, ${STUDY_DESIGN_YEAR} study design` : ''}
        </span>
        <span>
          {marks ? 'Average marks a year; one bead is one mark a year of change.' : 'Average score; one bead is one percentage point of change.'}
        </span>
      </p>
      <div ref={tip.wrapRef} className="relative">
        <div ref={ref}>
          {width > 0 && (
            <svg width={width} height={height} className="block" role="group" aria-label={`Change from ${span(p.a)} to ${span(p.b)}`}>
              {ticks.map(t => (
                <g key={t}>
                  <line x1={x(t)} x2={x(t)} y1={top} y2={height - 22} stroke="var(--ea-grid)" />
                  <text x={x(t)} y={height - 6} textAnchor="middle" fontSize={11} className="fill-gray-500 dark:fill-gray-400">
                    {marks ? t : `${Math.round(t * 100)}%`}
                  </text>
                </g>
              ))}
              {tracks.map((t, i) => {
                const y = top + i * rowH + rowH / 2
                const hero = t === big && Math.abs(delta(t)) >= (marks ? 0.5 : 0.02)
                const quiet = !t.g
                const xa = t.a === null ? null : x(t.a)
                const xb = t.b === null ? null : x(t.b)
                const d = delta(t)
                const beads = xa !== null && xb !== null ? Math.min(40, Math.round(Math.abs(d) / unit)) : 0
                const picked = t.g ? isPicked(ctx, t.id) : false
                const body = (
                  <TipBody
                    value={`${fmtV(t.a)} → ${fmtV(t.b)}`}
                    label={t.label}
                    lines={[
                      `${marks ? 'Marks a year' : 'Average score'}, ${span(p.a)} then ${span(p.b)}`,
                      quiet ? 'Off-course questions left out of the archive' : `Click to ${action}`,
                    ]}
                  />
                )
                const labelRight = xb !== null && (xa === null || xb >= xa || xb - X0 < 36)
                return (
                  <g
                    key={t.id}
                    role={quiet ? undefined : 'button'}
                    tabIndex={quiet ? undefined : 0}
                    aria-label={`${t.label}: ${fmtV(t.a)} then ${fmtV(t.b)}`}
                    className={`outline-none group ${quiet ? '' : 'cursor-pointer'}`}
                    onClick={quiet ? undefined : () => ctx.onGroup(t.id)}
                    onKeyDown={quiet ? undefined : e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), ctx.onGroup(t.id))}
                    onPointerMove={e => tip.show(e, body)}
                    onPointerLeave={tip.hide}
                    onFocus={e => tip.show(e, body)}
                    onBlur={tip.hide}
                  >
                    <rect
                      x={0}
                      y={y - rowH / 2}
                      width={width}
                      height={rowH}
                      rx={6}
                      className={`fill-transparent ${quiet ? '' : 'group-hover:fill-gray-50 dark:group-hover:fill-gray-800/60 group-focus-visible:fill-gray-50 dark:group-focus-visible:fill-gray-800/60'}`}
                    />
                    <text
                      x={labelW}
                      y={y + 4}
                      textAnchor="end"
                      fontSize={narrow ? 11.5 : 12.5}
                      fontWeight={picked ? 700 : 500}
                      className={picked ? 'fill-gray-900 dark:fill-white' : quiet ? 'fill-gray-500 dark:fill-gray-400' : 'fill-gray-700 dark:fill-gray-300'}
                    >
                      {t.label.length * (narrow ? 6.2 : 6.8) > labelW ? `${t.label.slice(0, Math.floor(labelW / (narrow ? 6.2 : 6.8)) - 1)}…` : t.label}
                    </text>
                    <line x1={X0 - 4} x2={X1 + 4} y1={y} y2={y} stroke="var(--ea-grid)" />
                    {xa !== null &&
                      xb !== null &&
                      Array.from({ length: beads }, (_, k) => {
                        const f = (k + 0.5) / beads
                        return (
                          <circle
                            key={k}
                            className="ea-pop"
                            style={{ '--d': 250 + i * 70 + k * 25 } as CSSProperties}
                            cx={xa + f * (xb - xa)}
                            cy={y + (hash01(`${t.id}:${k}`) - 0.5) * 2.6}
                            r={1.5 + hash01(`${t.id}~${k}`) * 0.8}
                            fill={hero ? 'var(--ea-lost)' : d >= 0 ? 'var(--ea-hair)' : 'var(--ea-axis)'}
                            opacity={hero ? 0.6 : 0.9}
                          />
                        )
                      })}
                    {xa !== null && (
                      <circle
                        className="ea-pop"
                        style={{ '--d': 150 + i * 70 } as CSSProperties}
                        cx={xa}
                        cy={y}
                        r={4.2}
                        fill="var(--ea-surface)"
                        stroke={quiet ? 'var(--ea-ref)' : 'var(--ea-ink)'}
                        strokeWidth={1.4}
                      />
                    )}
                    {xb !== null && (
                      <circle
                        className="ea-pop"
                        style={{ '--d': 450 + i * 70 } as CSSProperties}
                        cx={xb}
                        cy={y}
                        r={4.8}
                        fill={hero ? 'var(--ea-lost)' : quiet ? 'var(--ea-ref)' : 'var(--ea-ink)'}
                      />
                    )}
                    {xb !== null && (
                      <text
                        x={xb + (labelRight ? 9 : -9)}
                        y={y + 4}
                        textAnchor={labelRight ? 'start' : 'end'}
                        fontSize={12}
                        fontWeight={800}
                        className={`tabular-nums ${hero ? 'fill-amber-700 dark:fill-amber-400' : quiet ? 'fill-gray-500 dark:fill-gray-400' : 'fill-gray-900 dark:fill-gray-100'}`}
                      >
                        {fmtV(t.b)}
                      </text>
                    )}
                    {xa !== null && xb !== null && Math.abs(xb - xa) > 30 && (
                      <text
                        x={xa + (labelRight ? -8 : 8)}
                        y={y + 4}
                        textAnchor={labelRight ? 'end' : 'start'}
                        fontSize={10.5}
                        className="tabular-nums fill-gray-400 dark:fill-gray-500"
                      >
                        {fmtV(t.a)}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>
          )}
        </div>
        {tip.node}
      </div>
    </div>
  )
}
