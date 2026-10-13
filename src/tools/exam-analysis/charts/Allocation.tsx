// "What's worth the most": one row of ticks per topic (or subtopic), ranked by the marks it's
// worth in the selected papers — lieflat's Tick Rows. One tick is one mark a year (one mark,
// for a single year), so the bar can be counted: dark ticks are the marks the average student
// earns, amber ticks the marks they drop. The marks the archive leaves out are a pale row.

import type { CSSProperties, ReactNode } from 'react'
import { fmt, pct, topicLabel, type Group } from '../model'
import { isPicked, missingTotal, yearCount, type ChartCtx } from '../view'
import { TipBody, hash01, useTip, useWidth } from './common'

function perYear(ctx: ChartCtx, marks: number): string {
  const n = yearCount(ctx)
  return n === 1 ? `${fmt(marks)} marks` : `${fmt(marks / n)} marks a year`
}

function groupTip(ctx: ChartCtx, g: Group, total: number) {
  return (
    <TipBody
      value={perYear(ctx, g.marks)}
      label={g.label}
      lines={[
        `${pct(total ? g.marks / total : 0)} of the marks · ${g.items} ${g.items === 1 ? 'item' : 'items'}`,
        g.score !== null ? `Average score ${pct(g.score)} · ${perYear(ctx, g.lost)} dropped` : 'No VCAA average',
      ]}
    />
  )
}

/** The section's headline: what's worth the most, and (if it's something else) what costs the most. */
export function allocationHeadline(ctx: ChartCtx): string {
  const shown = ctx.groups.filter(g => g.marks > 0)
  if (!shown.length) return 'Nothing in these filters'
  const n = yearCount(ctx)
  const most = [...shown].sort((a, b) => b.marks - a.marks)[0]
  const costly = [...shown].sort((a, b) => b.lost - a.lost)[0]
  const total = shown.reduce((s, g) => s + g.marks, 0) + missingTotal(ctx)
  const worth = `${most.label} is worth the most, ${n === 1 ? `${fmt(most.marks)} marks` : `${fmt(most.marks / n)} marks a year`} (${pct(most.marks / total)})`
  if (costly.id === most.id || costly.lost <= 0) return `${worth}, and it’s where students drop the most`
  return `${worth}, but students drop the most in ${costly.label}`
}

interface Row {
  key: string
  label: string
  marks: number
  /** Ticks: earned, dropped, and (for the archive row, or unscored items) neutral. */
  earned: number
  lost: number
  rest: number
  lostValue: number
  quiet?: boolean
  picked?: boolean
  onClick?: () => void
  tip: ReactNode
}

export function AllocationBars({ ctx }: { ctx: ChartCtx }) {
  const tip = useTip()
  const [ref, width] = useWidth<HTMLDivElement>()
  const n = yearCount(ctx)
  const missing = missingTotal(ctx)
  const total = ctx.groups.reduce((s, g) => s + g.marks, 0) + missing

  const rows: Row[] = [...ctx.groups]
    .sort((a, b) => b.marks - a.marks)
    .map(g => {
      const all = Math.max(g.marks > 0 ? 1 : 0, Math.round(g.marks / n))
      const earned = Math.min(all, Math.round(g.earned / n))
      const lost = Math.min(all - earned, Math.round(g.lost / n))
      return {
        key: g.id, label: g.label, marks: g.marks, earned, lost, rest: all - earned - lost, lostValue: g.lost,
        picked: isPicked(ctx, g.id), onClick: () => ctx.onGroup(g.id), tip: groupTip(ctx, g, total),
      }
    })
  if (missing > 0)
    rows.push({
      key: 'missing', label: 'Not in archive', marks: missing, earned: 0, lost: 0, rest: Math.max(1, Math.round(missing / n)), lostValue: 0, quiet: true,
      tip: <TipBody value={perYear(ctx, missing)} label="Not in the archive" lines={['Questions left out as off the current course (mostly Specialist Mechanics), and VCAA’s 2022 redactions']} />,
    })

  const narrow = width > 0 && width < 560
  const labelW = narrow ? 112 : 208
  const valuesW = narrow ? 88 : 156
  const tickArea = Math.max(60, width - labelW - valuesW - 24)
  const maxTicks = Math.max(1, ...rows.map(r => r.earned + r.lost + r.rest))
  const step = Math.min(10, (tickArea - 4) / maxTicks)
  const h = 22

  return (
    <div ref={tip.wrapRef} className="relative">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-gray-500 dark:text-gray-400 mb-3">
        <span>One tick is one mark{n === 1 ? '' : ' a year'}.</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-[3px] h-3 rounded-full" style={{ background: 'var(--ea-ink)' }} aria-hidden />
          Earned by the average student
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-[3px] h-3 rounded-full" style={{ background: 'var(--ea-lost)' }} aria-hidden />
          Dropped
        </span>
        <span>Click a {ctx.level === 'sub' ? 'subtopic to list its questions' : 'topic to see its subtopics'}.</span>
      </div>
      <div ref={ref}>
        <div className="flex items-end px-1.5 pb-1 text-[11px] font-semibold text-gray-500 dark:text-gray-400">
          <span className="flex-1" />
          <span style={{ width: valuesW }} className="flex-none grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_1fr] text-right">
            <span>{n === 1 ? 'Marks' : 'A year'}</span>
            <span>Share</span>
            <span className="hidden sm:block text-amber-700 dark:text-amber-400">Dropped</span>
          </span>
        </div>
        {width > 0 &&
          rows.map((r, i) => {
            const ticks = r.earned + r.lost + r.rest
            return (
              <button
                key={r.key}
                type="button"
                onClick={r.onClick}
                disabled={!r.onClick}
                onPointerMove={e => tip.show(e, r.tip)}
                onPointerLeave={tip.hide}
                onFocus={e => tip.show(e, r.tip)}
                onBlur={tip.hide}
                className="w-full flex items-center px-1.5 py-[3px] rounded-md text-left enabled:hover:bg-gray-50 dark:enabled:hover:bg-gray-800/60"
              >
                <span
                  style={{ width: labelW }}
                  className={`flex-none pr-3 text-right text-[13px] leading-tight truncate ${
                    r.picked ? 'font-bold text-gray-900 dark:text-white' : r.quiet ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {r.label}
                </span>
                <svg width={tickArea} height={h} className="flex-none block overflow-visible" aria-hidden>
                  {Array.from({ length: ticks }, (_, k) => {
                    const len = h * 0.62 + hash01(`${r.key}:${k}`) * 4
                    const color = k < r.earned ? 'var(--ea-ink)' : k < r.earned + r.lost ? 'var(--ea-lost)' : 'var(--ea-missing)'
                    return (
                      <line
                        key={k}
                        className="ea-fade"
                        style={{ '--d': i * 60 + k * 10 } as CSSProperties}
                        x1={2 + k * step}
                        x2={2 + k * step}
                        y1={(h - len) / 2}
                        y2={(h + len) / 2}
                        stroke={color}
                        strokeWidth={Math.min(2.2, step * 0.42)}
                        strokeLinecap="round"
                        opacity={0.75 + hash01(`${r.key}~${k}`) * 0.25}
                      />
                    )
                  })}
                </svg>
                <span style={{ width: valuesW }} className="flex-none grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_1fr] text-right tabular-nums">
                  {r.marks > 0 ? (
                    <>
                      <span className={`text-[12.5px] font-bold ${r.quiet ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>{fmt(r.marks / n)}</span>
                      <span className="text-[12px] text-gray-500 dark:text-gray-400">{pct(total ? r.marks / total : 0)}</span>
                      <span className="hidden sm:block text-[12px] font-semibold text-amber-700 dark:text-amber-400">{r.quiet || r.lostValue <= 0 ? '' : fmt(r.lostValue / n)}</span>
                    </>
                  ) : (
                    <span className="col-span-2 sm:col-span-3 text-[12px] text-gray-400 dark:text-gray-500">Not examined</span>
                  )}
                </span>
              </button>
            )
          })}
      </div>
      {ctx.focus.topic && <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">Shares are of {topicLabel(ctx.subject, ctx.focus.topic)}’s marks.</p>}
      {tip.node}
    </div>
  )
}
