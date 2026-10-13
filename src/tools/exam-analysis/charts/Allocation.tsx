// "What's worth the most": one bar per topic (or subtopic), ranked by the marks it's worth in
// the selected papers. Each bar splits into the marks the average student earns (grey) and the
// marks they drop (amber), so the same chart answers "what's examined" and "where are marks
// lost". The marks the archive leaves out are a pale row at the bottom.

import type { CSSProperties, ReactNode } from 'react'
import { fmt, pct, topicLabel, type Group } from '../model'
import { isPicked, missingTotal, yearCount, type ChartCtx } from '../view'
import { TipBody, useTip } from './common'

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
        g.score !== null ? `Average score ${pct(g.score)} · ${perYear(ctx, g.lost)} lost` : 'No VCAA average',
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

export function AllocationBars({ ctx }: { ctx: ChartCtx }) {
  const tip = useTip()
  const n = yearCount(ctx)
  const missing = missingTotal(ctx)
  const total = ctx.groups.reduce((s, g) => s + g.marks, 0) + missing
  const rows = [...ctx.groups].sort((a, b) => b.marks - a.marks)
  const max = Math.max(1, ...rows.map(r => r.marks), missing)
  const cols = 'grid grid-cols-[7rem_1fr_2.5rem_2.75rem] sm:grid-cols-[13rem_1fr_3.5rem_3rem_3.5rem] items-center gap-x-3'

  const bar = (earned: number, lost: number, rest: number, index: number, quiet = false) => {
    const w = (v: number) => `${(v / max) * 100}%`
    return (
      // Grows in on arrival, then glides to its new length when the filters change.
      <span className="ea-bar flex h-[18px] rounded-r-[5px] overflow-hidden" style={{ width: w(earned + lost + rest), minWidth: earned + lost + rest > 0 ? 2 : 0, '--i': index } as CSSProperties}>
        <span style={{ flex: `${earned} 0 0`, background: quiet ? 'var(--ea-missing)' : 'var(--ea-ink)' }} />
        {lost > 0 && <span style={{ flex: `${lost} 0 0`, background: 'var(--ea-lost)' }} />}
        {rest > 0 && <span style={{ flex: `${rest} 0 0`, background: 'var(--ea-missing)' }} />}
      </span>
    )
  }

  const row = (
    key: string,
    label: string,
    g: { marks: number; earned: number; lost: number },
    opts: { picked?: boolean; onClick?: () => void; tipBody: ReactNode; index: number; quiet?: boolean },
  ) => (
    <button
      key={key}
      type="button"
      onClick={opts.onClick}
      disabled={!opts.onClick}
      onPointerMove={e => tip.show(e, opts.tipBody)}
      onPointerLeave={tip.hide}
      onFocus={e => tip.show(e, opts.tipBody)}
      onBlur={tip.hide}
      className={`${cols} px-1.5 py-[5px] rounded-md text-left enabled:hover:bg-gray-50 dark:enabled:hover:bg-gray-800/60`}
    >
      <span className={`text-[13px] leading-tight truncate ${opts.picked ? 'font-bold text-gray-900 dark:text-white' : opts.quiet ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
        {label}
      </span>
      <span className="min-w-0">{bar(g.earned, g.lost, Math.max(0, g.marks - g.earned - g.lost), opts.index, opts.quiet)}</span>
      {g.marks > 0 ? (
        <>
          <span className="text-right text-[12.5px] font-semibold tabular-nums text-gray-900 dark:text-gray-100">{fmt(g.marks / n)}</span>
          <span className="text-right text-[12px] tabular-nums text-gray-500 dark:text-gray-400">{pct(total ? g.marks / total : 0)}</span>
          <span className="hidden sm:block text-right text-[12px] font-semibold tabular-nums text-amber-700 dark:text-amber-400">{opts.quiet || g.lost <= 0 ? '' : fmt(g.lost / n)}</span>
        </>
      ) : (
        <span className="col-span-2 sm:col-span-3 text-right text-[12px] text-gray-400 dark:text-gray-500">Not examined</span>
      )}
    </button>
  )

  return (
    <div ref={tip.wrapRef} className="relative">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-gray-500 dark:text-gray-400 mb-3">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--ea-ink)' }} aria-hidden />
          Marks the average student earns
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--ea-lost)' }} aria-hidden />
          Marks they drop
        </span>
        <span>
          Click a {ctx.level === 'sub' ? 'subtopic to list its questions' : 'topic to see its subtopics'}.
        </span>
      </div>
      <div className={`${cols} px-1.5 pb-1 text-[11px] font-semibold text-gray-500 dark:text-gray-400`}>
        <span />
        <span />
        <span className="text-right">{n === 1 ? 'Marks' : 'A year'}</span>
        <span className="text-right">Share</span>
        <span className="hidden sm:block text-right text-amber-700 dark:text-amber-400">Lost</span>
      </div>
      <div className="flex flex-col">
        {rows.map((g, index) =>
          row(g.id, g.label, g, {
            index,
            picked: isPicked(ctx, g.id),
            onClick: () => ctx.onGroup(g.id),
            tipBody: groupTip(ctx, g, total),
          }),
        )}
        {missing > 0 &&
          row('missing', 'Not in archive', { marks: missing, earned: missing, lost: 0 }, {
            index: rows.length,
            quiet: true,
            tipBody: (
              <TipBody
                value={perYear(ctx, missing)}
                label="Not in the archive"
                lines={['Questions left out as off the current course (mostly Specialist Mechanics), and VCAA’s 2022 redactions']}
              />
            ),
          })}
      </div>
      {ctx.focus.topic && (
        <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">Shares are of {topicLabel(ctx.subject, ctx.focus.topic)}’s marks.</p>
      )}
      {tip.node}
    </div>
  )
}
