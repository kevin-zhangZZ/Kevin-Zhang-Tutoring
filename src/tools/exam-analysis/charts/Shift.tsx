// "Where did the marks move": an alluvial Sankey (lieflat's Aggregate Sankey, one layer per
// year). Each year in view is a column stacking every topic (or subtopic) by its share of that
// year's marks, biggest at the top, and each topic's ribbon runs from year to year — so a band
// that swells, shrinks or overtakes another is a topic gaining or losing ground. A dashed line
// marks the 2023 study design. The headline (and the amber ribbon) is the biggest move between
// the same two periods as the dumbbells; hover a ribbon to follow it, click it to zoom in.

import { useState, type CSSProperties, type ReactNode } from 'react'
import { STUDY_DESIGN_YEAR, pct, topicLabel } from '../model'
import { isPicked, type ChartCtx } from '../view'
import { TipBody, useTip, useWidth } from './common'
import { periodsOf, span, tracksOf, type Track } from './Trends'

interface Flow {
  t: Track
  /** Shares of the marks in each period, 0–1. */
  a: number
  b: number
}

function flowsOf(ctx: ChartCtx): { flows: Flow[]; design: boolean; a: number[]; b: number[] } | null {
  const p = periodsOf(ctx.years)
  if (!p) return null
  const tracks = tracksOf(ctx, p, 'marks')
  const sumA = tracks.reduce((s, t) => s + (t.a ?? 0), 0)
  const sumB = tracks.reduce((s, t) => s + (t.b ?? 0), 0)
  if (!sumA || !sumB) return null
  return { flows: tracks.map(t => ({ t, a: (t.a ?? 0) / sumA, b: (t.b ?? 0) / sumB })), design: p.design, a: p.a, b: p.b }
}

/** Groups with enough marks for their shares to mean much, as the other headlines use. */
function eligible(ctx: ChartCtx, flows: Flow[]): Flow[] {
  const total = ctx.groups.reduce((s, g) => s + g.marks, 0)
  const min = Math.max(3, total * 0.02)
  return flows.filter(f => f.t.g && f.t.g.marks >= min)
}

/** The topic whose share grew most and the one whose share shrank most (each only if it moved by
 *  a point or more) — what the headline names and the chart picks out. */
function moversOf(ctx: ChartCtx, flows: Flow[]): { grew: Flow | null; shrank: Flow | null } {
  const fs = eligible(ctx, flows)
  const grew = [...fs].sort((x, y) => y.b - y.a - (x.b - x.a))[0]
  const shrank = [...fs].sort((x, y) => x.b - x.a - (y.b - y.a))[0]
  return {
    grew: grew && grew.b - grew.a >= 0.01 ? grew : null,
    shrank: shrank && shrank.a - shrank.b >= 0.01 && shrank !== grew ? shrank : null,
  }
}

// The headline names the two topics the chart picks out, in the same colours as their ribbons.
const Grew = ({ children }: { children: ReactNode }) => <span className="text-amber-600 dark:text-amber-400">{children}</span>
const Shrank = ({ children }: { children: ReactNode }) => <span className="text-gray-500 dark:text-gray-400">{children}</span>

/** The section's headline: what took a bigger share of the paper, and what gave it up. */
export function shiftHeadline(ctx: ChartCtx): ReactNode {
  const r = flowsOf(ctx)
  if (!r) return 'Pick more than one year to see where the marks moved'
  if (!eligible(ctx, r.flows).length) return 'Nothing in these filters'
  const { grew, shrank } = moversOf(ctx, r.flows)
  const when = r.design ? `Since the ${STUDY_DESIGN_YEAR} study design` : `From ${span(r.a)} to ${span(r.b)}`
  const whole = ctx.focus.topic ? `${topicLabel(ctx.subject, ctx.focus.topic)}’s marks` : 'the paper'
  if (!grew && !shrank) return `${when}, the share-out of ${whole} has barely shifted`
  const g = grew && (
    <>
      <Grew>{grew.t.label}</Grew> has grown from {pct(grew.a)} to {pct(grew.b)} of {whole}
    </>
  )
  if (grew && shrank)
    return (
      <>
        {when}, {g}, and <Shrank>{shrank.t.label}</Shrank> has shrunk from {pct(shrank.a)} to {pct(shrank.b)}
      </>
    )
  if (grew)
    return (
      <>
        {when}, {g}
      </>
    )
  return (
    <>
      {when}, <Shrank>{shrank!.t.label}</Shrank> has shrunk the most, from {pct(shrank!.a)} to {pct(shrank!.b)} of {whole}
    </>
  )
}

/** Spread label positions at least `gap` apart inside [lo, hi], keeping their order. */
function spread(ys: number[], gap: number, lo: number, hi: number): number[] {
  const out = [...ys]
  for (let k = 1; k < out.length; k++) out[k] = Math.max(out[k], out[k - 1] + gap)
  if (out.length && out[out.length - 1] > hi) {
    out[out.length - 1] = hi
    for (let k = out.length - 2; k >= 0; k--) out[k] = Math.min(out[k], out[k + 1] - gap)
  }
  return out.map(y => Math.max(lo, y))
}

interface Layer {
  id: string
  label: string
  /** A real group (clickable), or the archive's left-out marks. */
  group: boolean
  /** Marks, and share of that year's marks, for each year in view. */
  marks: number[]
  share: number[]
}

function layersOf(ctx: ChartCtx): Layer[] {
  const rows: Omit<Layer, 'share'>[] = ctx.groups
    .filter(g => g.marks > 0)
    .map(g => ({ id: g.id, label: g.label, group: true, marks: ctx.years.map(y => g.itemList.filter(i => i.year === y).reduce((s, i) => s + i.marks, 0)) }))
  const missing = ctx.years.map(y => ctx.missing.get(y) ?? 0)
  if (missing.some(v => v > 0)) rows.push({ id: 'missing', label: 'Not in archive', group: false, marks: missing })
  const totals = ctx.years.map((_, k) => rows.reduce((s, r) => s + r.marks[k], 0))
  return rows.map(r => ({ ...r, share: r.marks.map((v, k) => (totals[k] ? v / totals[k] : 0)) }))
}

export function ShiftSankey({ ctx }: { ctx: ChartCtx }) {
  const tip = useTip()
  const [ref, width] = useWidth<HTMLDivElement>()
  const [hover, setHover] = useState<string | null>(null)
  const r = flowsOf(ctx)

  if (!r || ctx.years.length < 2)
    return (
      <p className="text-[13px] text-gray-500 dark:text-gray-400">
        This follows the marks from year to year, so it needs more than one. Widen the years above to see where the marks moved.
      </p>
    )

  // The two topics the headline names: the biggest gain in amber, the biggest loss in dark grey.
  const movers = moversOf(ctx, r.flows)
  const upId = movers.grew?.t.id
  const downId = movers.shrank?.t.id
  const layers = layersOf(ctx)
  const years = ctx.years
  const nY = years.length

  const narrow = width < 560
  // On a phone the first column keeps just its percentages, so the names at the end have room.
  const leftW = narrow ? 40 : 190
  const nodeW = narrow && nY > 6 ? 2.5 : nY > 8 ? 5 : 7
  const minStep = narrow ? 14 : 24
  const rightW = narrow ? Math.max(70, Math.min(150, width - leftW - nodeW - minStep * (nY - 1))) : 190
  const X0 = leftW
  const X1 = Math.max(X0 + minStep * (nY - 1), width - rightW - nodeW)
  const colX = (k: number) => X0 + (k / (nY - 1)) * (X1 - X0)
  const n = layers.length
  const gap = n > 12 ? 3 : 6
  const top = 34
  const plotH = Math.max(300, Math.min(600, n * 24))
  const unit = plotH - gap * (n - 1)
  const height = top + plotH + 8

  // Each layer's span in each year's column, biggest first; left-out marks always at the bottom.
  const pos = years.map((_, k) => {
    const order = [...layers].sort((a, b) => (a.group ? 0 : 1) - (b.group ? 0 : 1) || b.share[k] - a.share[k])
    const at = new Map<string, [number, number]>()
    let y = top
    for (const l of order) {
      const h = l.share[k] * unit
      at.set(l.id, [y, y + h])
      y += h + gap
    }
    return { order, at }
  })

  const tone = (l: Layer) => (l.id === upId ? 'var(--ea-lost)' : l.id === downId ? 'var(--ea-ink)' : l.group ? 'var(--ea-hair)' : 'var(--ea-missing)')
  const opacityOf = (l: Layer) => {
    if (hover) return hover === l.id ? 0.75 : 0.1
    if (l.group && isPicked(ctx, l.id)) return 0.7
    return l.id === upId ? 0.55 : l.id === downId ? 0.42 : l.group ? 0.3 : 0.4
  }

  const charW = narrow ? 6 : 6.7
  const fit = (s: string, room: number) => (s.length * charW > room ? `${s.slice(0, Math.max(3, Math.floor(room / charW) - 1))}…` : s)
  const labelYs = (k: number) =>
    spread(
      pos[k].order.map(l => {
        const [y0, y1] = pos[k].at.get(l.id)!
        return (y0 + y1) / 2 + 4
      }),
      13,
      top + 8,
      top + plotH,
    )
  const ly = labelYs(0)
  const ry = labelYs(nY - 1)
  const action = ctx.level === 'sub' ? 'list its questions' : 'see its subtopics'
  const designK = years.findIndex(y => y >= STUDY_DESIGN_YEAR)
  const step = (X1 - X0) / (nY - 1)
  const ends = (k: number) => k === 0 || k === nY - 1
  const showYear = (k: number) => step >= 34 || ends(k) || (step >= 20 && (k === designK || k % 2 === 0) && Math.abs(nY - 1 - k) * step >= 34)

  const show = (e: { clientX: number; clientY: number }, l: Layer, k: number) => {
    setHover(l.id)
    tip.show(
      e,
      <TipBody
        value={`${pct(l.share[k])} → ${pct(l.share[k + 1])}`}
        label={`${l.label} · ${years[k]} → ${years[k + 1]}`}
        lines={[`${l.marks[k]} → ${l.marks[k + 1]} marks`, l.group ? `Click to ${action}` : 'Off-course questions left out of the archive']}
      />,
    )
  }
  const hide = () => {
    setHover(null)
    tip.hide()
  }

  return (
    <div>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-2">
        Each year’s marks{ctx.focus.topic ? ` in ${topicLabel(ctx.subject, ctx.focus.topic)}` : ''}, shared out by topic, biggest at the top; a ribbon follows a
        topic from year to year{designK > 0 ? `, and the dashed line is the ${STUDY_DESIGN_YEAR} study design` : ''}.
        {movers.grew && <> <span className="font-semibold text-amber-700 dark:text-amber-400">Amber</span> is the topic that grew most</>}
        {movers.grew && movers.shrank && ';'}
        {movers.shrank && <> <span className="font-semibold text-gray-500 dark:text-gray-400">{movers.grew ? 'grey' : 'Grey'}</span> the one that shrank most</>}
        {(movers.grew || movers.shrank) && '.'} Hover to follow one; click to {action}.
      </p>
      <div ref={tip.wrapRef} className="relative">
        <div ref={ref}>
          {width > 0 && (
            <svg width={width} height={height} className="block" role="group" aria-label={`Share of the marks by topic, year by year, ${span(years)}`} onPointerLeave={hide}>
              {years.map((y, k) =>
                showYear(k) ? (
                  <text
                    key={y}
                    x={colX(k) + nodeW / 2}
                    y={top - 12}
                    textAnchor={k === 0 && narrow ? 'start' : k === nY - 1 && narrow ? 'end' : 'middle'}
                    fontSize={11}
                    fontWeight={y >= STUDY_DESIGN_YEAR ? 700 : 500}
                    className={y >= STUDY_DESIGN_YEAR ? 'fill-gray-800 dark:fill-gray-100' : 'fill-gray-500 dark:fill-gray-400'}
                  >
                    {step < 34 && !ends(k) ? `’${String(y).slice(2)}` : y}
                  </text>
                ) : null,
              )}
              {designK > 0 && (
                <line
                  x1={(colX(designK - 1) + nodeW + colX(designK)) / 2}
                  x2={(colX(designK - 1) + nodeW + colX(designK)) / 2}
                  y1={top - 6}
                  y2={top + plotH}
                  stroke="var(--ea-ref)"
                  strokeDasharray="3 3"
                  pointerEvents="none"
                />
              )}
              {layers.map((l, li) =>
                years.slice(0, -1).map((_, k) => {
                  const [a0, a1] = pos[k].at.get(l.id)!
                  const [b0, b1] = pos[k + 1].at.get(l.id)!
                  const x0 = colX(k) + nodeW
                  const x1 = colX(k + 1)
                  const mid = (x0 + x1) / 2
                  return (
                    <path
                      key={`${l.id}:${k}`}
                      d={`M${x0} ${a0} C${mid} ${a0} ${mid} ${b0} ${x1} ${b0} L${x1} ${b1} C${mid} ${b1} ${mid} ${a1} ${x0} ${a1} Z`}
                      className={`ea-fade transition-[fill-opacity] duration-200 ${l.group ? 'cursor-pointer' : ''}`}
                      style={{ '--d': 80 + k * 50 + li * 12 } as CSSProperties}
                      fill={tone(l)}
                      fillOpacity={opacityOf(l)}
                      onPointerMove={e => show(e, l, k)}
                      onClick={l.group ? () => ctx.onGroup(l.id) : undefined}
                    />
                  )
                }),
              )}
              {years.map((y, k) =>
                pos[k].order.map(l => {
                  const [y0, y1] = pos[k].at.get(l.id)!
                  return (
                    <rect
                      key={`${y}:${l.id}`}
                      className="ea-fade"
                      x={colX(k)}
                      y={y0}
                      width={nodeW}
                      height={Math.max(0.5, y1 - y0)}
                      rx={1.5}
                      fill={l.id === upId ? 'var(--ea-lost)' : l.group ? 'var(--ea-ink)' : 'var(--ea-missing)'}
                      opacity={hover && hover !== l.id ? 0.3 : 1}
                      pointerEvents="none"
                    />
                  )
                }),
              )}
              {/* Keyboard: one focus stop per topic, on its first-year node. */}
              {pos[0].order
                .filter(l => l.group)
                .map(l => {
                  const [y0, y1] = pos[0].at.get(l.id)!
                  return (
                    <rect
                      key={`kb:${l.id}`}
                      x={colX(0) - 2}
                      y={y0 - 1}
                      width={nodeW + 4}
                      height={Math.max(4, y1 - y0 + 2)}
                      rx={3}
                      fill="transparent"
                      className="outline-none focus-visible:stroke-blue-500"
                      strokeWidth={2}
                      tabIndex={0}
                      role="button"
                      aria-label={`${l.label}: ${pct(l.share[0])} of the marks in ${years[0]}, ${pct(l.share[nY - 1])} in ${years[nY - 1]}`}
                      onFocus={() => setHover(l.id)}
                      onBlur={() => setHover(null)}
                      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), ctx.onGroup(l.id))}
                    />
                  )
                })}
              {pos[0].order.map((l, i) => {
                const strong = l.id === upId || l.id === downId || hover === l.id || (l.group && isPicked(ctx, l.id))
                return (
                  <text key={'la' + l.id} x={X0 - 7} y={ly[i]} textAnchor="end" fontSize={narrow ? 11 : 12} className="tabular-nums" pointerEvents="none">
                    {!narrow && (
                      <tspan fontWeight={strong ? 700 : 500} className={l.group ? 'fill-gray-700 dark:fill-gray-300' : 'fill-gray-500 dark:fill-gray-400'}>
                        {fit(l.label, leftW - 46)}
                      </tspan>
                    )}
                    <tspan dx={narrow ? 0 : 5} fontWeight={700} className="fill-gray-500 dark:fill-gray-400">
                      {pct(l.share[0])}
                    </tspan>
                  </text>
                )
              })}
              {pos[nY - 1].order.map((l, i) => {
                const strong = l.id === upId || l.id === downId || hover === l.id || (l.group && isPicked(ctx, l.id))
                return (
                  <text key={'lb' + l.id} x={X1 + nodeW + 7} y={ry[i]} fontSize={narrow ? 11 : 12} className="tabular-nums" pointerEvents="none">
                    <tspan fontWeight={800} className={l.id === upId ? 'fill-amber-700 dark:fill-amber-400' : 'fill-gray-900 dark:fill-gray-100'}>
                      {pct(l.share[nY - 1])}
                    </tspan>
                    <tspan dx={5} fontWeight={strong ? 700 : 500} className={l.group ? 'fill-gray-700 dark:fill-gray-300' : 'fill-gray-500 dark:fill-gray-400'}>
                      {fit(l.label, rightW - 46)}
                    </tspan>
                  </text>
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
