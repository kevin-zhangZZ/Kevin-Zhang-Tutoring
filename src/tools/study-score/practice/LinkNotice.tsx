// The strip shown when a log arrives in a link and clashes with the one saved on this device
// (someone else's log, or both have changed since the link was made). It says so and offers the
// two ways out: keep the link's log here (after one question, if that replaces papers), or go
// back to your own. Until one is picked, changes stay in the link (index.tsx).

import { useEffect, useId, useRef, useState } from 'react'
import { fmtDate } from './dates.ts'
import type { Attempt } from './log.ts'

const BUTTON =
  'w-full sm:w-auto h-11 sm:h-8 [@media(pointer:coarse)]:h-11 rounded-lg border border-sky-300 dark:border-sky-800 bg-white dark:bg-gray-900 px-3 text-[13px] font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap hover:bg-sky-100 dark:hover:bg-sky-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'

const papers = (n: number) => `${n} paper${n === 1 ? '' : 's'}`

export default function LinkNotice({
  attempts,
  savedCount,
  edited,
  onSave,
  onOpenMine,
}: {
  /** The log on screen (the link's, with any changes made since). */
  attempts: Attempt[]
  /** Papers saved on this device for this subject. */
  savedCount: number
  /** Changes have been made to the link's log, which aren't saved here. */
  edited: boolean
  onSave: () => void
  onOpenMine: () => void
}) {
  const askId = useId()
  const [asking, setAsking] = useState(false)
  const saveRef = useRef<HTMLButtonElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const back = useRef(false)
  useEffect(() => {
    if (asking) cancelRef.current?.focus()
    else if (back.current) saveRef.current?.focus()
    back.current = false
  }, [asking])

  // "8 papers, 12 July to 27 Sept", without the dates when either end has none.
  const n = attempts.length
  const first = attempts[0]?.date
  const last = attempts[n - 1]?.date
  const when = first && last ? (first === last ? `, ${fmtDate(first)}` : `, ${fmtDate(first)} to ${fmtDate(last)}`) : ''

  return (
    <section aria-label="Log From a Link" className="rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50 dark:bg-sky-950/40 px-4 py-3 text-[13px] leading-snug text-sky-950 dark:text-sky-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="min-w-0">
          This log came from a link
          {n > 0 && (
            <>
              :{' '}
              <b className="font-semibold">
                {papers(n)}
                {when}
              </b>
            </>
          )}
          . It isn’t the one saved on this device.
          {edited && ' Changes here aren’t saved on this device yet.'}
        </p>
        {!asking && (
          <div className="flex flex-col sm:flex-row gap-2 sm:flex-none">
            <button
              ref={saveRef}
              type="button"
              onClick={() => (savedCount > 0 ? setAsking(true) : onSave())}
              className={BUTTON}
            >
              Save to This Device
            </button>
            <button type="button" onClick={onOpenMine} className={BUTTON}>
              Open My Own Log
            </button>
          </div>
        )}
      </div>
      {asking && (
        <div className="mt-3 pt-3 border-t border-sky-200 dark:border-sky-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p id={askId}>This replaces the {papers(savedCount)} saved on this device.</p>
          <div className="flex gap-2 sm:flex-none">
            <button type="button" onClick={onSave} aria-describedby={askId} className={`${BUTTON} font-semibold text-sky-800 dark:text-sky-300`}>
              Replace
            </button>
            <button
              ref={cancelRef}
              type="button"
              onClick={() => {
                back.current = true
                setAsking(false)
              }}
              aria-describedby={askId}
              className={BUTTON}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
