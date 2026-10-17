// "Where did the marks move": a two-column Sankey (lieflat's Aggregate Sankey) of how the paper's
// marks were shared out before and after — the same two periods as the dumbbells (before and
// since the 2023 study design, else the two halves of the years in view). Each topic (or
// subtopic) is a node on both sides, sized by its share of the marks and ranked biggest first,
// so a ribbon that climbs or falls between the columns is a topic that gained or lost ground.
// The biggest mover is amber; hover a ribbon to follow it, click it to zoom in.

import { useState, type CSSProperties } from 'react'
import { STUDY_DESIGN_YEAR, fmt, pct, topicLabel } from '../model'
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

/** The section's headline: what took a bigger share of the paper, and what gave it up. */
export function shiftHeadline(ctx: ChartCtx): string {
  const r = flowsOf(ctx)
  if (!r) return 'Pick more than one year to see where the marks moved'
  const fs = eligible(ctx, r.flows)
  if (!fs.length) return 'Nothing in these filters'
  const grew = [...fs].sort((x, y) => y.b - y.a - (x.b - x.a))[0]
  const shrank = [...fs].sort((x, y) => x.b - x.a - (y.b - y.a))[0]
  const when = r.design ? `Since the ${STUDY_DESIGN_YEAR} study design` : `From ${span(r.a)} to ${span(r.b)}`
  const whole = ctx.focus.topic ? `${topicLabel(ctx.subject, ctx.focus.topic)}’s marks` : 'the paper'
  const up = grew.b - grew.a >= 0.01
  const down = shrank.a - shrank.b >= 0.01
  if (!up && !down) return `${when}, the share-out of ${whole} has barely shifted`
  const g = `${grew.t.label} has grown from ${pct(grew.a)} to ${pct(grew.b)} of ${whole}`
  const s = `${shrank.t.label} has shrunk from ${pct(shrank.a)} to ${pct(shrank.b)}`
  if (up && down && grew !== shrank) return `${when}, ${g}, and ${s}`
  return up ? `${when}, ${g}` : `${when}, ${s.replace('shrunk', 'shrunk the most,')}`
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

export function ShiftSankey({ ctx }: { ctx: ChartCtx }) {
  const tip = useTip()
  const [ref, width] = useWidth<HTMLDivElement>()
  const [hover, setHover] = useState<string | null>(null)
  const r = flowsOf(ctx)

  if (!r)
    return (
      <p className="text-[13px] text-gray-500 dark:text-gray-400">
        This compares two stretches of years, so it needs more than one. Widen the years above to see where the marks moved.
      </p>
    )

  const flows = r.flows
  const fs = eligible(ctx, flows)
  const big = [...fs].sort((x, y) => Math.abs(y.b - y.a) - Math.abs(x.b - x.a))[0]
  // Biggest first on each side; the archive's left-out marks always sit at the bottom.
  const order = (key: 'a' | 'b') => [...flows].sort((x, y) => (x.t.g ? 0 : 1) - (y.t.g ? 0 : 1) || y[key] - x[key])
  const left = order('a')
  const right = order('b')

  const narrow = width < 560
  // On a phone the left side keeps just its percentages, so the names on the right have room.
  const leftW = narrow ? 40 : 200
  const rightW = narrow ? Math.min(170, Math.round(width * 0.46)) : 200
  const nodeW = 7
  const XA = leftW
  const XB = Math.max(XA + nodeW + 60, width - rightW - nodeW)
  const n = flows.length
  const gap = n > 12 ? 3 : 6
  const top = 30
  const plotH = Math.max(300, Math.min(600, n * 24))
  const unit = plotH - gap * (n - 1)
  const height = top + plotH + 8

  // Each node's span on its side.
  const place = (list: Flow[], key: 'a' | 'b') => {
    const pos = new Map<string, [number, number]>()
    let y = top
    for (const f of list) {
      const h = f[key] * unit
      pos.set(f.t.id, [y, y + h])
      y += h + gap
    }
    return pos
  }
  const pa = place(left, 'a')
  const pb = place(right, 'b')
  const mid = (XA + nodeW + XB) / 2

  const tone = (f: Flow) => (f === big ? 'var(--ea-lost)' : f.t.g ? 'var(--ea-hair)' : 'var(--ea-missing)')
  const opacityOf = (f: Flow) => {
    if (hover) return hover === f.t.id ? 0.75 : 0.12
    if (f.t.g && isPicked(ctx, f.t.id)) return 0.7
    return f === big ? 0.55 : f.t.g ? 0.32 : 0.4
  }

  const charW = narrow ? 6 : 6.7
  const fit = (s: string, room: number) => (s.length * charW > room ? `${s.slice(0, Math.max(3, Math.floor(room / charW) - 1))}…` : s)
  const labelsFor = (list: Flow[], pos: Map<string, [number, number]>) => {
    const ys = list.map(f => {
      const [y0, y1] = pos.get(f.t.id)!
      return (y0 + y1) / 2 + 4
    })
    return spread(ys, 13, top + 8, top + plotH)
  }
  const ly = labelsFor(left, pa)
  const ry = labelsFor(right, pb)
  const action = ctx.level === 'sub' ? 'list its questions' : 'see its subtopics'

  const show = (e: { clientX: number; clientY: number } | { currentTarget: Element }, f: Flow) => {
    setHover(f.t.id)
    tip.show(
      e,
      <TipBody
        value={`${pct(f.a)} → ${pct(f.b)}`}
        label={f.t.label}
        lines={[`${fmt(Math.round((f.t.a ?? 0) * 10) / 10)} → ${fmt(Math.round((f.t.b ?? 0) * 10) / 10)} marks a year`, f.t.g ? `Click to ${action}` : 'Off-course questions left out of the archive']}
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
        Each topic’s share of the marks{ctx.focus.topic ? ` in ${topicLabel(ctx.subject, ctx.focus.topic)}` : ''}, {span(r.a)} on the left and {span(r.b)} on the
        right, biggest at the top. A ribbon that climbs gained ground. Hover to follow one; click to {action}.
      </p>
      <div ref={tip.wrapRef} className="relative">
        <div ref={ref}>
          {width > 0 && (
            <svg width={width} height={height} className="block" role="group" aria-label={`Share of the marks by topic, ${span(r.a)} and ${span(r.b)}`} onPointerLeave={hide}>
              <text x={narrow ? 0 : XA + nodeW} y={14} textAnchor={narrow ? 'start' : 'end'} fontSize={11.5} fontWeight={700} className="fill-gray-500 dark:fill-gray-400">
                {span(r.a)}
                {r.design && !narrow ? ' · previous design' : ''}
              </text>
              <text x={XB} y={14} fontSize={11.5} fontWeight={700} className="fill-gray-800 dark:fill-gray-100">
                {span(r.b)}
                {r.design && !narrow ? ` · ${STUDY_DESIGN_YEAR} design` : ''}
              </text>
              {flows.map((f, i) => {
                const [a0, a1] = pa.get(f.t.id)!
                const [b0, b1] = pb.get(f.t.id)!
                const x0 = XA + nodeW
                const d = `M${x0} ${a0} C${mid} ${a0} ${mid} ${b0} ${XB} ${b0} L${XB} ${b1} C${mid} ${b1} ${mid} ${a1} ${x0} ${a1} Z`
                const clickable = !!f.t.g
                return (
                  <path
                    key={f.t.id}
                    d={d}
                    className={`ea-fade transition-[fill-opacity] duration-200 outline-none ${clickable ? 'cursor-pointer' : ''}`}
                    style={{ '--d': 120 + i * 60 } as CSSProperties}
                    fill={tone(f)}
                    fillOpacity={opacityOf(f)}
                    role={clickable ? 'button' : undefined}
                    tabIndex={clickable ? 0 : undefined}
                    aria-label={`${f.t.label}: ${pct(f.a)} then ${pct(f.b)} of the marks`}
                    onPointerMove={e => show(e, f)}
                    onFocus={e => show(e, f)}
                    onBlur={hide}
                    onClick={clickable ? () => ctx.onGroup(f.t.id) : undefined}
                    onKeyDown={clickable ? e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), ctx.onGroup(f.t.id)) : undefined}
                  />
                )
              })}
              {(['a', 'b'] as const).map(side =>
                (side === 'a' ? left : right).map(f => {
                  const [y0, y1] = (side === 'a' ? pa : pb).get(f.t.id)!
                  return (
                    <rect
                      key={side + f.t.id}
                      className="ea-fade"
                      x={side === 'a' ? XA : XB}
                      y={y0}
                      width={nodeW}
                      height={Math.max(0.5, y1 - y0)}
                      rx={2}
                      fill={f === big ? 'var(--ea-lost)' : f.t.g ? 'var(--ea-ink)' : 'var(--ea-missing)'}
                      opacity={hover && hover !== f.t.id ? 0.35 : 1}
                    />
                  )
                }),
              )}
              {left.map((f, i) => {
                const strong = f === big || hover === f.t.id || (f.t.g && isPicked(ctx, f.t.id))
                return (
                  <text key={'la' + f.t.id} x={XA - 7} y={ly[i]} textAnchor="end" fontSize={narrow ? 11 : 12} className="tabular-nums">
                    {!narrow && (
                      <tspan fontWeight={strong ? 700 : 500} className={f.t.g ? 'fill-gray-700 dark:fill-gray-300' : 'fill-gray-500 dark:fill-gray-400'}>
                        {fit(f.t.label, leftW - 46)}
                      </tspan>
                    )}
                    <tspan dx={narrow ? 0 : 5} fontWeight={700} className="fill-gray-500 dark:fill-gray-400">
                      {pct(f.a)}
                    </tspan>
                  </text>
                )
              })}
              {right.map((f, i) => {
                const strong = f === big || hover === f.t.id || (f.t.g && isPicked(ctx, f.t.id))
                return (
                  <text key={'lb' + f.t.id} x={XB + nodeW + 7} y={ry[i]} fontSize={narrow ? 11 : 12} className="tabular-nums">
                    <tspan fontWeight={800} className={f === big ? 'fill-amber-700 dark:fill-amber-400' : 'fill-gray-900 dark:fill-gray-100'}>
                      {pct(f.b)}
                    </tspan>
                    <tspan dx={5} fontWeight={strong ? 700 : 500} className={f.t.g ? 'fill-gray-700 dark:fill-gray-300' : 'fill-gray-500 dark:fill-gray-400'}>
                      {fit(f.t.label, rightW - 46)}
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
