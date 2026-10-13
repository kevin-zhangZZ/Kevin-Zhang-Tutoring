// Check My Marks' headline: one number to quote (the typical year), then how far it moves from
// year to year, on a 0–50 scale and in words. Phones stack the two halves; from sm they sit side by side.

import { useId } from 'react'
import { aheadOf } from '../format.ts'
import type { Projection } from '../model.ts'
import { CARD } from '../shared.tsx'
import { useTween } from '../../../components/motion/Reveal'

/** The year with the lowest or highest unrounded score; on a tie, the most recent. */
function extremeYear(rows: Projection[], pick: 'low' | 'high'): Projection {
  return rows.reduce((best, r) => {
    const d = pick === 'low' ? best.exact - r.exact : r.exact - best.exact
    return d > 1e-9 || (Math.abs(d) <= 1e-9 && r.year > best.year) ? r : best
  })
}

/** Where a study score sits on the 0–50 scale, as a CSS left/width. */
const onScale = (v: number) => `${Math.min(100, Math.max(0, (v / 50) * 100))}%`

export default function Headline({ rows, typical }: { rows: Projection[]; typical: number }) {
  const id = useId()
  const first = rows[0].year
  const latest = rows[rows.length - 1]
  const scores = rows.map(r => r.score)
  const lo = Math.min(...scores)
  const hi = Math.max(...scores)
  const span = `${first}–${latest.year}`
  // The big number glides to each new score as the marks change, and counts up on arrival.
  const shown = Math.round(useTween(typical, { fromZero: true }))

  return (
    <section aria-labelledby={id} className={`${CARD} grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-10 items-center`}>
      <div className="flex flex-col items-center sm:items-start sm:pl-2">
        <h2 id={id} className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          Your Projected Study Score
        </h2>
        <p className="mt-1 font-display text-8xl sm:text-[7.5rem] font-bold leading-[0.9] tracking-[-0.04em] text-gray-900 dark:text-white tabular-nums" aria-label={String(typical)}>
          {shown}
        </p>
        <p className="mt-2 text-[0.8125rem] text-gray-500 dark:text-gray-400">In a typical year (the middle of {span})</p>
      </div>

      <div className="flex flex-col gap-3 min-w-0">
        {/* The 0–50 scale: the band is the lowest to highest year, the marker the typical year. */}
        <div aria-hidden className="pt-2">
          <div className="relative h-3 rounded-full bg-gray-100 dark:bg-gray-800">
            <span className="absolute inset-y-0 rounded-full bg-sky-200 dark:bg-sky-900/70 transition-[left,width] duration-500 ease-out motion-reduce:transition-none"
              style={{ left: onScale(lo), width: `calc(${onScale(hi)} - ${onScale(lo)})` }} />
            <span className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-600 dark:bg-sky-400 ring-4 ring-white dark:ring-gray-900 transition-[left] duration-500 ease-out motion-reduce:transition-none"
              style={{ left: onScale(typical) }} />
          </div>
          <div className="mt-1.5 flex justify-between text-[11px] text-gray-400 dark:text-gray-500 tabular-nums">
            {[0, 10, 20, 30, 40, 50].map(t => <span key={t}>{t}</span>)}
          </div>
        </div>
        {lo === hi ? (
          <p className="text-sm text-gray-700 dark:text-gray-200">
            The same in every year from {first} to {latest.year}
          </p>
        ) : (
          <div>
            <p className="text-[15px] font-semibold text-gray-800 dark:text-gray-100 tabular-nums">
              Between {lo} and {hi}, depending on the year
            </p>
            <p className="mt-1 text-[0.8125rem] leading-snug text-gray-500 dark:text-gray-400 max-w-md">
              Lowest in {extremeYear(rows, 'low').year}, highest in {extremeYear(rows, 'high').year}. Marks score lower in years when more of the state
              did well.
            </p>
          </div>
        )}
        <p className="text-[0.8125rem] text-gray-500 dark:text-gray-400 tabular-nums">
          In {latest.year}: <b className="font-semibold text-gray-700 dark:text-gray-200">{latest.score}</b>, {aheadOf(latest.pct)} of the state
        </p>
      </div>
    </section>
  )
}
