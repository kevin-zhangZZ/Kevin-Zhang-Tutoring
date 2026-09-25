// "Where the marks go": one bar per topic (or subtopic), ranked by the marks it's worth in the
// selected papers, with the marks the archive leaves out as a grey row at the bottom.

import type { ReactNode } from 'react'
import { fmt, pct, topicLabel, type Group } from '../model'
import { isPicked, missingTotal, yearCount, type ChartCtx } from '../view'
import { TipBody, topicColor, useTip } from './common'

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
        g.score !== null ? `Average score ${pct(g.score)}` : 'No VCAA average',
      ]}
    />
  )
}

export function AllocationBars({ ctx }: { ctx: ChartCtx }) {
  const tip = useTip()
  const missing = missingTotal(ctx)
  const total = ctx.groups.reduce((s, g) => s + g.marks, 0) + missing
  const rows = [...ctx.groups].sort((a, b) => b.marks - a.marks)
  const max = Math.max(1, ...rows.map(r => r.marks), missing)

  const row = (key: string, label: string, marks: number, color: string, opts: { picked?: boolean; onClick?: () => void; tipBody: ReactNode }) => (
    <button
      key={key}
      type="button"
      onClick={opts.onClick}
      disabled={!opts.onClick}
      onPointerMove={e => tip.show(e, opts.tipBody)}
      onPointerLeave={tip.hide}
      onFocus={e => tip.show(e, opts.tipBody)}
      onBlur={tip.hide}
      className="group grid grid-cols-[7.5rem_1fr] sm:grid-cols-[13rem_1fr] items-center gap-3 px-1.5 py-[5px] rounded-md text-left enabled:hover:bg-gray-50 dark:enabled:hover:bg-gray-800/60"
    >
      <span className={`text-[13px] leading-tight truncate ${opts.picked ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
        {label}
      </span>
      <span className="flex items-center gap-2 min-w-0">
        <span className="flex-1 min-w-0">
          <span
            className="block h-3.5 rounded-r"
            style={{ width: `${(marks / max) * 100}%`, minWidth: marks > 0 ? 2 : 0, background: color }}
          />
        </span>
        <span className="w-[5.5rem] sm:w-28 flex-none text-[12px] tabular-nums text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {marks > 0 ? (
            <>
              <b className="font-semibold text-gray-800 dark:text-gray-200">{fmt(marks / yearCount(ctx))}</b>
              {' · '}
              {pct(total ? marks / total : 0)}
            </>
          ) : (
            'Not examined'
          )}
        </span>
      </span>
    </button>
  )

  return (
    <div ref={tip.wrapRef} className="relative">
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-2">
        {yearCount(ctx) === 1 ? 'Marks' : 'Marks a year, on average'} ·{' '}
        {ctx.focus.topic ? `share of ${topicLabel(ctx.subject, ctx.focus.topic)}’s marks` : 'share of all the marks in the selected papers'}. Click a{' '}
        {ctx.level === 'sub' ? 'subtopic to list its questions' : 'topic to see its subtopics'}.
      </p>
      <div className="flex flex-col">
        {rows.map(g =>
          row(g.id, g.label, g.marks, topicColor(ctx.subject, g.topic), {
            picked: isPicked(ctx, g.id),
            onClick: () => ctx.onGroup(g.id),
            tipBody: groupTip(ctx, g, total),
          }),
        )}
        {missing > 0 &&
          row('missing', 'Not in archive', missing, 'var(--ea-missing)', {
            tipBody: (
              <TipBody
                value={perYear(ctx, missing)}
                label="Not in the archive"
                lines={['Questions left out as off the current course (mostly Specialist Mechanics), and VCAA’s 2022 redactions']}
              />
            ),
          })}
      </div>
      {tip.node}
    </div>
  )
}
