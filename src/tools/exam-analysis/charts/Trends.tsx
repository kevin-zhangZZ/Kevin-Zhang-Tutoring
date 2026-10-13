// "Has it changed": a topic × year heatmap of the marks each topic got, or of its average
// score. When the years span the 2023 study design, a gap and a label split the grid there and
// the last column compares the two periods' yearly averages; otherwise it's the least-squares
// trend. Click a year to see just that year, or a cell for its questions.

import { Fragment } from 'react'
import { STUDY_DESIGN_YEAR, fmt, pct, slope, statOf, topicLabel, type Group, type Item } from '../model'
import { isPicked, type ChartCtx } from '../view'
import { TipBody, heatColor, mix, useTip, useWidth } from './common'

export type TrendMeasure = 'marks' | 'score'

interface Series {
  g: Group
  /** Per year of ctx.years: marks, or the average score (null if nothing scored). */
  values: (number | null)[]
  /** Since-2023 average minus the average before, when both periods are in view; else the slope. */
  trend: number
  /** The two periods' yearly averages, when the years span the study design. */
  before: number | null
  after: number | null
}

/** Index of the first study-design year, when the years in view start before it. */
function splitOf(years: number[]): number {
  const k = years.findIndex(y => y >= STUDY_DESIGN_YEAR)
  return k > 0 ? k : -1
}

const mean = (vs: (number | null)[]) => {
  const ok = vs.filter((v): v is number => v !== null)
  return ok.length ? ok.reduce((a, b) => a + b, 0) / ok.length : null
}

function seriesOf(ctx: ChartCtx, groups: Group[], measure: TrendMeasure): Series[] {
  return groups.map(g => {
    const values = ctx.years.map(y => {
      const list = g.itemList.filter(i => i.year === y)
      if (measure === 'marks') return list.reduce((s, i) => s + i.marks, 0)
      return list.length ? statOf(list).score : null
    })
    const split = splitOf(ctx.years)
    if (split > 0) {
      const before = mean(values.slice(0, split))
      const after = mean(values.slice(split))
      return { g, values, before, after, trend: before === null || after === null ? 0 : after - before }
    }
    const pts = ctx.years.map((y, k) => [y, values[k]] as const).filter(([, v]) => v !== null) as [number, number][]
    return { g, values, before: null, after: null, trend: slope(pts.map(p => p[0]), pts.map(p => p[1])) }
  })
}

function valueText(measure: TrendMeasure, v: number | null): string {
  if (v === null) return '—'
  return measure === 'marks' ? fmt(v) : `${Math.round(v * 100)}`
}

// A period change is a difference of yearly averages; a slope is per year, so it's flat sooner.
function isFlat(measure: TrendMeasure, t: number, split: boolean): boolean {
  return measure === 'marks' ? Math.abs(t) < (split ? 0.5 : 0.05) : Math.abs(t) < (split ? 0.02 : 0.002)
}

function trendText(measure: TrendMeasure, t: number, split: boolean): string {
  if (isFlat(measure, t, split)) return 'steady'
  const sign = t > 0 ? '+' : '−'
  if (measure === 'marks') return split ? `${sign}${Math.abs(t).toFixed(1)}` : `${sign}${Math.abs(t).toFixed(1)} a year`
  return split ? `${sign}${Math.round(Math.abs(t * 100))} pts` : `${sign}${Math.abs(t * 100).toFixed(1)} pts a year`
}

// Amber is "harder" on this page, so only a falling score is amber; everything else stays grey.
function Change({ t, measure, split }: { t: number; measure: TrendMeasure; split: boolean }) {
  const flat = isFlat(measure, t, split)
  const harder = measure === 'score' && t < 0 && !flat
  return (
    <span className={harder ? 'font-semibold text-amber-700 dark:text-amber-400' : flat ? 'text-gray-400 dark:text-gray-500' : 'font-semibold text-gray-800 dark:text-gray-200'}>
      {flat ? '→' : t > 0 ? '↑' : '↓'} {trendText(measure, t, split)}
    </span>
  )
}

/** The section's headline: the biggest move, across the study-design change if it's in view. */
export function trendHeadline(ctx: ChartCtx, measure: TrendMeasure): string {
  if (ctx.years.length < 2) return 'Pick more than one year to see what has changed'
  const split = splitOf(ctx.years) > 0
  const series = seriesOf(ctx, ctx.groups, measure).filter(s => s.g.marks > 0)
  if (!series.length) return 'Nothing in these filters'
  const top = [...series].sort((a, b) => Math.abs(b.trend) - Math.abs(a.trend))[0]
  const when = split ? `since the ${STUDY_DESIGN_YEAR} study design` : 'over these years'
  if (isFlat(measure, top.trend, split)) return `Little has moved ${when}`
  if (measure === 'marks') {
    const size = split ? `from ${fmt(Math.round((top.before ?? 0) * 10) / 10)} to ${fmt(Math.round((top.after ?? 0) * 10) / 10)} marks a year` : `${top.trend > 0 ? 'up' : 'down'} ${Math.abs(top.trend).toFixed(1)} marks every year`
    return `${top.g.label} has ${top.trend > 0 ? 'gained' : 'lost'} the most ${when}, ${size}`
  }
  const pts = split ? `from ${pct(top.before)} to ${pct(top.after)} on average` : `${top.trend < 0 ? 'down' : 'up'} ${Math.abs(top.trend * 100).toFixed(1)} points a year`
  return `${top.g.label} has ${top.trend < 0 ? 'got harder' : 'got easier'} the most ${when}, ${pts}`
}

function cellTip(measure: TrendMeasure, g: Group, year: number, list: Item[]) {
  const st = statOf(list)
  return (
    <TipBody
      value={measure === 'marks' ? `${st.marks} ${st.marks === 1 ? 'mark' : 'marks'}` : st.score === null ? 'Not examined' : `${pct(st.score)} average`}
      label={`${g.label} · ${year}`}
      lines={[measure === 'marks' ? (st.score !== null ? `Average score ${pct(st.score)}` : 'Not examined') : `${st.marks} marks`, 'Click to list these questions']}
    />
  )
}

export function Heatmap({ ctx, measure }: { ctx: ChartCtx; measure: TrendMeasure }) {
  const tip = useTip()
  const [ref, width] = useWidth<HTMLDivElement>()
  const series = seriesOf(ctx, ctx.groups, measure)
  const labelW = width < 560 ? 96 : 196
  const split = splitOf(ctx.years)
  // A trend needs at least two years.
  const trendW = width < 560 || ctx.years.length < 2 ? 0 : split > 0 ? 84 : 112
  const gap = split > 0 ? 10 : 0
  const nY = ctx.years.length
  const cellW = Math.min(96, Math.max(14, (width - labelW - trendW - gap) / Math.max(1, nY)))
  // Each cell's left margin: the study-design gap before the first new-course year.
  const ml = (k: number) => (k === split ? gap : 0)
  const cellH = 26
  const short = cellW < 38
  const max = Math.max(1, ...series.flatMap(s => s.values.map(v => v ?? 0)))
  const showSubHeads = ctx.level === 'sub' && !ctx.focus.topic
  const missingRow = measure === 'marks' ? ctx.years.map(y => ctx.missing.get(y) ?? 0) : null
  const hasMissing = !!missingRow && missingRow.some(v => v > 0)

  const fillFor = (v: number | null) => {
    if (v === null || (measure === 'marks' && v === 0)) return 'transparent'
    return measure === 'marks' ? mix('var(--ea-seq-lo)', 'var(--ea-seq-hi)', 0.12 + (0.88 * v) / max) : heatColor(v)
  }
  // Cell numbers flip to the opposite end of the scale where the fill gets deep enough. The
  // switch points are the colour-mix step (0-100, as mix() rounds it) where each theme's text
  // still clears 4.5:1 — computed against the oklab blend of the --ea-seq / --ea-heat ends.
  // Light: gray-950 below, white from the threshold. Dark: white below, gray-950 from it.
  const cellText = (v: number | null) => {
    if (v === null) return ''
    const t = measure === 'marks' ? 0.12 + (0.88 * v) / max : (0.8 - v) / 0.6
    const k = Math.round(Math.min(1, Math.max(0, t)) * 100)
    const [light, dark] = measure === 'marks' ? [58, 45] : [94, 53]
    return `${k >= light ? 'text-white' : 'text-gray-950'} ${k >= dark ? 'dark:text-gray-950' : 'dark:text-white'}`
  }

  const row = (s: Series) => (
    <div key={s.g.id} className="flex items-center" style={{ height: cellH + 2 }}>
      <button
        type="button"
        onClick={() => ctx.onGroup(s.g.id)}
        style={{ width: labelW }}
        title={s.g.label}
        className={`flex-none self-stretch pr-2 text-left text-[12.5px] leading-tight truncate hover:underline underline-offset-2 ${isPicked(ctx, s.g.id) ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'} ${showSubHeads ? 'pl-3' : ''}`}
      >
        {s.g.label}
      </button>
      {ctx.years.map((y, k) => {
        const v = s.values[k]
        const sel = ctx.focus.year === y && isPicked(ctx, s.g.id)
        const list = s.g.itemList.filter(i => i.year === y)
        return (
          <button
            key={y}
            type="button"
            onClick={() => ctx.onCell(s.g.id, y)}
            onPointerMove={e => tip.show(e, cellTip(measure, s.g, y, list))}
            onPointerLeave={tip.hide}
            onFocus={e => tip.show(e, cellTip(measure, s.g, y, list))}
            onBlur={tip.hide}
            aria-label={`${s.g.label}, ${y}: ${valueText(measure, v)}`}
            style={{ width: cellW - 2, height: cellH, marginLeft: ml(k), marginRight: 2, background: fillFor(v) }}
            className={`flex-none rounded-[3px] text-[11px] tabular-nums font-medium ${
              v === null || (measure === 'marks' && v === 0) ? 'border border-gray-100 dark:border-gray-800 text-gray-300 dark:text-gray-600' : cellText(v)
            } ${sel ? 'ring-2 ring-gray-900 dark:ring-white' : ''}`}
          >
            {cellW >= 22 ? (v === null || (measure === 'marks' && v === 0) ? '·' : valueText(measure, v)) : ''}
          </button>
        )
      })}
      {trendW > 0 && (
        <span style={{ width: trendW }} className="flex-none pl-2 text-[11.5px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
          <Change t={s.trend} measure={measure} split={split > 0} />
        </span>
      )}
    </div>
  )

  const byTopic = [...new Set(series.map(s => s.g.topic))]

  return (
    <div>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-2">
        {measure === 'marks' ? 'Marks per year; darker is more.' : 'Average score per year; deeper amber is harder.'}
        {split > 0 ? ` The last column compares the yearly average since ${STUDY_DESIGN_YEAR} with the years before.` : ''} Click a year to see just that year, or
        a cell for its questions.
      </p>
      <div ref={tip.wrapRef} className="relative">
        <div ref={ref} className="overflow-x-auto scrollbar-quiet pt-3 -mt-3">
          {width > 0 && (
            <div style={{ minWidth: labelW + nY * 16 + trendW + gap }}>
              {split > 0 && (
                <div className="flex items-end" style={{ height: 18 }}>
                  <span style={{ width: labelW + split * cellW }} className="flex-none pr-2 text-right text-[11px] text-gray-400 dark:text-gray-500 truncate">
                    {cellW * split > 120 ? 'Previous study design' : ''}
                  </span>
                  <span
                    style={{ width: (nY - split) * cellW - 2, marginLeft: gap }}
                    className="flex-none self-stretch border-t-2 border-l-2 border-gray-800 dark:border-gray-200 rounded-tl pl-1.5 text-[11px] font-semibold leading-4 text-gray-800 dark:text-gray-100 truncate"
                  >
                    {(nY - split) * cellW > 90 ? `${STUDY_DESIGN_YEAR} study design` : STUDY_DESIGN_YEAR}
                  </span>
                </div>
              )}
              <div className="flex items-end mb-1" style={{ height: 20 }}>
                <span style={{ width: labelW }} className="flex-none" />
                {ctx.years.map((y, k) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => ctx.onYear(y)}
                    title={`Show ${y} only`}
                    style={{ width: cellW - 2, marginLeft: ml(k), marginRight: 2 }}
                    className={`relative flex-none self-stretch text-center text-[11px] tabular-nums hover:underline underline-offset-2 after:absolute after:-top-3 after:bottom-0 after:inset-x-0 ${y >= STUDY_DESIGN_YEAR ? 'font-semibold text-gray-700 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {short ? `’${String(y).slice(2)}` : y}
                  </button>
                ))}
                {trendW > 0 && (
                  <span style={{ width: trendW }} className="flex-none pl-2 text-[11px] text-gray-500 dark:text-gray-400">
                    {split > 0 ? `Since ${STUDY_DESIGN_YEAR}` : 'Trend'}
                  </span>
                )}
              </div>
              {showSubHeads
                ? byTopic.map(t => (
                    <Fragment key={t}>
                      <div className="mt-2 mb-0.5 text-[11.5px] font-semibold text-gray-500 dark:text-gray-400">
                        {topicLabel(ctx.subject, t)}
                      </div>
                      {series.filter(s => s.g.topic === t).map(row)}
                    </Fragment>
                  ))
                : series.map(row)}
              {hasMissing && missingRow && (
                <div className="flex items-center mt-1" style={{ height: cellH + 2 }}>
                  <span style={{ width: labelW }} className="flex-none pr-2 text-[12.5px] text-gray-500 dark:text-gray-400 truncate">
                    Not in archive
                  </span>
                  {missingRow.map((v, k) => (
                    <span
                      key={k}
                      style={{ width: cellW - 2, height: cellH, marginLeft: ml(k), marginRight: 2, background: v ? 'var(--ea-missing)' : 'transparent' }}
                      className="flex-none rounded-[3px] text-[11px] tabular-nums text-gray-500 dark:text-gray-400 flex items-center justify-center"
                      onPointerMove={e => tip.show(e, <TipBody value={`${v} marks`} label={`Not in the archive · ${ctx.years[k]}`} lines={['Off-course questions left out']} />)}
                      onPointerLeave={tip.hide}
                    >
                      {cellW >= 22 && v ? v : ''}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {tip.node}
      </div>
      {measure === 'score' && (
        <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            Easier
            <span className="inline-block w-24 h-2.5 rounded-sm" style={{ background: 'linear-gradient(90deg, var(--ea-heat-lo), var(--ea-heat-hi))' }} aria-hidden />
            Harder
          </span>
        </p>
      )}
    </div>
  )
}
