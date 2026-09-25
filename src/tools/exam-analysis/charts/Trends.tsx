// "How it has changed": a topic × year heatmap of the marks each topic got, or of its average
// score, with a trend (least-squares slope) per row. Click a year to see just that year, or a
// cell for its questions.

import { Fragment } from 'react'
import { STUDY_DESIGN_YEAR, fmt, pct, slope, statOf, topicLabel, type Group, type Item } from '../model'
import { isPicked, type ChartCtx } from '../view'
import { TipBody, heatColor, mix, topicColor, useTip, useWidth } from './common'

export type TrendMeasure = 'marks' | 'score'

interface Series {
  g: Group
  /** Per year of ctx.years: marks, or the average score (null if nothing scored). */
  values: (number | null)[]
  trend: number
}

function seriesOf(ctx: ChartCtx, groups: Group[], measure: TrendMeasure): Series[] {
  return groups.map(g => {
    const values = ctx.years.map(y => {
      const list = g.itemList.filter(i => i.year === y)
      if (measure === 'marks') return list.reduce((s, i) => s + i.marks, 0)
      return list.length ? statOf(list).score : null
    })
    const pts = ctx.years.map((y, k) => [y, values[k]] as const).filter(([, v]) => v !== null) as [number, number][]
    return { g, values, trend: slope(pts.map(p => p[0]), pts.map(p => p[1])) }
  })
}

function valueText(measure: TrendMeasure, v: number | null): string {
  if (v === null) return '—'
  return measure === 'marks' ? fmt(v) : `${Math.round(v * 100)}`
}

function trendText(measure: TrendMeasure, t: number): string {
  if (measure === 'marks') {
    if (Math.abs(t) < 0.05) return 'steady'
    return `${t > 0 ? '+' : '−'}${Math.abs(t).toFixed(1)} a year`
  }
  if (Math.abs(t) < 0.002) return 'steady'
  return `${t > 0 ? '+' : '−'}${Math.abs(t * 100).toFixed(1)} pts a year`
}

function Arrow({ t, measure }: { t: number; measure: TrendMeasure }) {
  const flat = measure === 'marks' ? Math.abs(t) < 0.05 : Math.abs(t) < 0.002
  if (flat) return <span className="text-gray-400">→</span>
  return <span className={t > 0 ? 'text-sky-700 dark:text-sky-400' : 'text-rose-600 dark:text-rose-400'}>{t > 0 ? '↑' : '↓'}</span>
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
  // A trend needs at least two years.
  const trendW = width < 560 || ctx.years.length < 2 ? 0 : 92
  const nY = ctx.years.length
  const cellW = Math.min(96, Math.max(14, (width - labelW - trendW) / Math.max(1, nY)))
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
  const darkCell = (v: number | null) =>
    v !== null && (measure === 'marks' ? 0.12 + (0.88 * v) / max > 0.55 : (0.8 - v) / 0.6 > 0.6)

  const row = (s: Series) => (
    <div key={s.g.id} className="flex items-center" style={{ height: cellH + 2 }}>
      <button
        type="button"
        onClick={() => ctx.onGroup(s.g.id)}
        style={{ width: labelW }}
        title={s.g.label}
        className={`flex-none pr-2 text-left text-[12.5px] leading-tight truncate hover:underline underline-offset-2 ${isPicked(ctx, s.g.id) ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'} ${showSubHeads ? 'pl-3' : ''}`}
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
            style={{ width: cellW - 2, height: cellH, marginRight: 2, background: fillFor(v) }}
            className={`flex-none rounded-[3px] text-[11px] tabular-nums font-medium ${
              v === null || (measure === 'marks' && v === 0) ? 'border border-gray-100 dark:border-gray-800 text-gray-300 dark:text-gray-600' : ''
            } ${darkCell(v) ? 'text-white dark:text-gray-950' : 'text-gray-700 dark:text-gray-200'} ${sel ? 'ring-2 ring-gray-900 dark:ring-white' : ''}`}
          >
            {cellW >= 22 ? (v === null || (measure === 'marks' && v === 0) ? '·' : valueText(measure, v)) : ''}
          </button>
        )
      })}
      {trendW > 0 && (
        <span style={{ width: trendW }} className="flex-none pl-2 text-[11.5px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
          <Arrow t={s.trend} measure={measure} /> {trendText(measure, s.trend)}
        </span>
      )}
    </div>
  )

  const byTopic = [...new Set(series.map(s => s.g.topic))]

  return (
    <div>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-2">
        {measure === 'marks' ? 'Marks per year; darker is more.' : 'Average score per year; deeper amber is harder.'} Click a year to see just that year, or a cell
        for its questions.
      </p>
      <div ref={tip.wrapRef} className="relative">
        <div ref={ref} className="overflow-x-auto scrollbar-quiet">
          {width > 0 && (
            <div style={{ minWidth: labelW + nY * 16 + trendW }}>
              <div className="flex items-end mb-1" style={{ height: 20 }}>
                <span style={{ width: labelW }} className="flex-none" />
                {ctx.years.map(y => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => ctx.onYear(y)}
                    title={`Show ${y} only`}
                    style={{ width: cellW - 2, marginRight: 2 }}
                    className={`flex-none text-center text-[11px] tabular-nums hover:underline underline-offset-2 ${y >= STUDY_DESIGN_YEAR ? 'font-semibold text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}`}
                  >
                    {short ? `’${String(y).slice(2)}` : y}
                  </button>
                ))}
                {trendW > 0 && (
                  <span style={{ width: trendW }} className="flex-none pl-2 text-[11px] text-gray-400 dark:text-gray-500">
                    Trend
                  </span>
                )}
              </div>
              {showSubHeads
                ? byTopic.map(t => (
                    <Fragment key={t}>
                      <div className="flex items-center gap-1.5 mt-2 mb-0.5 text-[11.5px] font-semibold text-gray-500 dark:text-gray-400">
                        <span className="w-2 h-2 rounded-sm" style={{ background: topicColor(ctx.subject, t) }} aria-hidden />
                        {topicLabel(ctx.subject, t)}
                      </div>
                      {series.filter(s => s.g.topic === t).map(row)}
                    </Fragment>
                  ))
                : series.map(row)}
              {hasMissing && missingRow && (
                <div className="flex items-center mt-1" style={{ height: cellH + 2 }}>
                  <span style={{ width: labelW }} className="flex-none pr-2 text-[12.5px] text-gray-400 dark:text-gray-500 truncate">
                    Not in archive
                  </span>
                  {missingRow.map((v, k) => (
                    <span
                      key={k}
                      style={{ width: cellW - 2, height: cellH, marginRight: 2, background: v ? 'var(--ea-missing)' : 'transparent' }}
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
