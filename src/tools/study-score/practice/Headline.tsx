// Track My Papers' headline: one number to quote, the Recent Average as a whole study score
// (one mark moves a projection about a quarter of a point, so a decimal would be noise). Under
// it, quietly: how it has moved since the first papers, the gap to the goal, and Best and the
// paper count as a footnote.

import { useId } from 'react'
import type { Subject } from '../data.ts'
import { WINDOW, changeSinceStart, recentAverage, type Scored } from './log.ts'
import { fmtDate } from './dates.ts'
import { CARD } from '../shared.tsx'

// ── Lines ──────────────────────────────────────────────────────────────────────────────────

/** "last 3 papers", or "your first paper" / "your 2 papers" before the window fills. */
function windowText(n: number): string {
  if (n >= WINDOW) return `last ${WINDOW} papers`
  return n === 1 ? 'your first paper' : `your ${n} papers`
}

/** The change line, from the paper where the first and last WINDOW stop sharing papers. Up in
 *  emerald; level or down in grey, so a dip never shouts. */
function ChangeLine({ change }: { change: number }) {
  const by = Math.round(Math.abs(change))
  const since = `from your first ${WINDOW} papers`
  if (change >= 1) {
    return (
      <span className="text-[14px] font-medium text-emerald-700 dark:text-emerald-400">
        <span aria-hidden>▲ </span>Up {by} {since}
      </span>
    )
  }
  if (change <= -1) {
    return (
      <span className="text-[14px] font-medium text-gray-600 dark:text-gray-300">
        <span aria-hidden>▼ </span>Down {by} {since}
      </span>
    )
  }
  return <span className="text-[14px] font-medium text-gray-500 dark:text-gray-400">About the same as your first {WINDOW} papers</span>
}

/** A short dashed amber stroke, drawn like the chart's goal line, to tie the sentence to it. */
function GoalSwatch() {
  return (
    <svg width={16} height={4} aria-hidden className="inline-block align-middle mr-1.5 -mt-0.5">
      <line x1={0} x2={16} y1={2} y2={2} strokeWidth={1.5} strokeDasharray="6 4" className="stroke-amber-700 dark:stroke-amber-300" />
    </svg>
  )
}

// ── Card ───────────────────────────────────────────────────────────────────────────────────

export default function PracticeHeadline({ scored, goal }: { subject: Subject; scored: Scored[]; goal: number | null }) {
  const id = useId()
  const n = scored.length
  const recent = recentAverage(scored)
  if (recent === null) {
    return (
      <section className={`${CARD} text-center`}>
        <h2 className="text-[12px] font-semibold text-gray-500 dark:text-gray-400">Recent Average</h2>
        <p className="font-display text-5xl font-bold leading-none tracking-tight mt-1.5 text-gray-300 dark:text-gray-600">—</p>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1.5">Add a paper to see your projected study score.</p>
      </section>
    )
  }

  const shown = Math.round(recent)
  const change = changeSinceStart(scored)
  // The goal gap compares the whole number on the card, so the card never contradicts itself.
  const gap = goal === null ? null : goal - shown
  const best = scored.reduce((a, b) => (b.proj.exact > a.proj.exact ? b : a))
  const first = scored[0]

  return (
    <section aria-labelledby={id} className={`@container ${CARD} text-center`}>
      <h2 id={id} className="text-[12px] font-semibold text-gray-500 dark:text-gray-400">
        Recent Average
      </h2>
      <p className="font-display text-5xl font-bold leading-none tracking-tight tabular-nums mt-1.5 text-gray-900 dark:text-white">{shown}</p>
      {/* Phones stack the sub-line and the change; wider cards put them on one row. */}
      <p className="flex flex-col items-center @lg:flex-row @lg:flex-wrap @lg:justify-center @lg:items-baseline gap-x-2 gap-y-0.5 mt-1.5 text-[13px] text-gray-500 dark:text-gray-400">
        <span>Projected study score, {windowText(n)}</span>
        {change !== null && (
          <>
            <span aria-hidden className="hidden @lg:inline">
              ·
            </span>
            <ChangeLine change={change} />
          </>
        )}
      </p>
      {goal !== null && gap !== null && (
        <p className="mt-1 text-[13.5px] text-gray-700 dark:text-gray-300">
          <GoalSwatch />
          {gap > 0 ? `About ${gap} below your goal of ${goal}.` : `At or above your goal of ${goal}.`}
        </p>
      )}
      <p className="mt-1.5 text-[12.5px] text-gray-500 dark:text-gray-400 tabular-nums">
        {n === 1 ? (
          <span className="whitespace-nowrap">
            {first.paper} paper{first.date ? `, sat ${fmtDate(first.date)}` : ''}
          </span>
        ) : (
          <>
            <span className="whitespace-nowrap">
              Best <b className="font-semibold text-gray-700 dark:text-gray-200">{best.proj.score}</b> ({best.paper} paper
              {best.date ? `, ${fmtDate(best.date)}` : ''}) ·
            </span>{' '}
            <span className="whitespace-nowrap">
              <b className="font-semibold text-gray-700 dark:text-gray-200">{n}</b> papers{first.date ? ` since ${fmtDate(first.date)}` : ''}
            </span>
          </>
        )}
      </p>
    </section>
  )
}
