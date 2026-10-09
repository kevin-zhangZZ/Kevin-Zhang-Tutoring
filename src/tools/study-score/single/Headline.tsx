// Check My Marks' headline: one number to quote (the typical year), then how far it moves from
// year to year, in words. Phones stack the two halves; from sm they sit side by side.

import { useId } from 'react'
import { aheadOf } from '../format.ts'
import type { Projection } from '../model.ts'
import { CARD } from '../shared.tsx'

/** The year with the lowest or highest unrounded score; on a tie, the most recent. */
function extremeYear(rows: Projection[], pick: 'low' | 'high'): Projection {
  return rows.reduce((best, r) => {
    const d = pick === 'low' ? best.exact - r.exact : r.exact - best.exact
    return d > 1e-9 || (Math.abs(d) <= 1e-9 && r.year > best.year) ? r : best
  })
}

export default function Headline({ rows, typical }: { rows: Projection[]; typical: number }) {
  const id = useId()
  const first = rows[0].year
  const latest = rows[rows.length - 1]
  const scores = rows.map(r => r.score)
  const lo = Math.min(...scores)
  const hi = Math.max(...scores)
  const span = `${first}–${latest.year}`

  return (
    <section aria-labelledby={id} className={`${CARD} text-center grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-6 items-center`}>
      <div className="flex flex-col items-center">
        <h2 id={id} className="text-[12px] font-semibold text-gray-500 dark:text-gray-400">
          Your Projected Study Score
        </h2>
        <p className="mt-1 font-display text-5xl font-bold leading-none text-gray-900 dark:text-white tabular-nums">{typical}</p>
        <p className="mt-2 text-[13px] text-gray-500 dark:text-gray-400">In a typical year (the middle of {span})</p>
      </div>
      <div aria-hidden className="h-px w-full sm:h-auto sm:w-px sm:self-stretch bg-gray-200 dark:bg-gray-800" />
      <div className="flex flex-col items-center gap-1.5">
        {lo === hi ? (
          <p className="text-[14px] text-gray-700 dark:text-gray-200">
            The same in every year from {first} to {latest.year}
          </p>
        ) : (
          <>
            <p className="text-[14px] text-gray-700 dark:text-gray-200 tabular-nums">
              Between {lo} and {hi}, depending on the year
            </p>
            <p className="text-[12.5px] leading-snug text-gray-500 dark:text-gray-400 max-w-sm">
              Lowest in {extremeYear(rows, 'low').year}, highest in {extremeYear(rows, 'high').year}. Marks score lower in years when more of the state
              did well.
            </p>
          </>
        )}
        <p className="text-[12.5px] text-gray-500 dark:text-gray-400 tabular-nums">
          In {latest.year}: <b className="font-semibold text-gray-700 dark:text-gray-200">{latest.score}</b> · {aheadOf(latest.pct)} of the state
        </p>
      </div>
    </section>
  )
}
