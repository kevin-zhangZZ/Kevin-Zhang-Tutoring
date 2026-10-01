import { STEPS, STEP_NUMBERS, type StepN } from './lessonSteps'

/** Where the demo is: a Lesson step, or Explore. */
export type PPView = StepN | 'explore'

const FOCUS = 'focus-visible:outline-none'

/** Steps 1–6 and Explore. Any of them can be jumped to. The current step's name shows from md
 *  (all six don't fit beside the site's sidebar); Explore is always labelled. */
export function StepBar({ view, visited, onGo }: { view: PPView; visited: ReadonlySet<PPView>; onGo: (v: PPView) => void }) {
  const curN = view === 'explore' ? 7 : view
  return (
    <div id="pp-stepbar" className="scroll-mt-4 mb-4">
      <ol className="flex items-center" aria-label="Lesson steps">
        {STEP_NUMBERS.map((n) => {
          const cur = view === n
          const done = !cur && (visited.has(n) || n < curN)
          const conf = STEPS[n]
          return (
            <li key={n} className={`flex items-center min-w-0 ${cur ? 'md:flex-auto flex-1' : 'flex-1'}`}>
              <button
                type="button"
                onClick={() => onGo(n)}
                aria-label={`Step ${n}: ${conf.title}`}
                title={cur ? undefined : `${n}. ${conf.short}`}
                aria-current={cur ? 'step' : undefined}
                className={`group flex-none flex items-center gap-2 min-h-[44px] min-w-[44px] justify-center md:justify-start rounded-full ${FOCUS}`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[12.5px] font-semibold tabular-nums transition-colors motion-reduce:transition-none ${
                    cur
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : done
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        : 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                >
                  {n}
                </span>
                <span
                  className={`hidden ${cur ? 'md:inline' : ''} text-[12.5px] whitespace-nowrap ${
                    cur ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  }`}
                >
                  {conf.short}
                </span>
              </button>
              <span aria-hidden="true" className={`flex-1 h-[2px] mx-1 md:mx-1.5 rounded ${n < curN ? 'bg-blue-200 dark:bg-blue-900' : 'bg-gray-200 dark:bg-gray-800'}`} />
            </li>
          )
        })}
        <li className="flex-none">
          <button
            type="button"
            onClick={() => onGo('explore')}
            aria-current={view === 'explore' ? 'step' : undefined}
            className={`min-h-[44px] inline-flex items-center gap-1.5 px-2.5 sm:px-3 rounded-full text-[12.5px] font-semibold ${FOCUS} ${
              view === 'explore'
                ? 'bg-blue-600 text-white dark:bg-blue-500'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <svg viewBox="0 0 12 12" className="hidden sm:block w-3 h-3" fill="currentColor" aria-hidden="true">
              <rect x="1" y="1" width="4.2" height="4.2" rx=".8" />
              <rect x="6.8" y="1" width="4.2" height="4.2" rx=".8" />
              <rect x="1" y="6.8" width="4.2" height="4.2" rx=".8" />
              <rect x="6.8" y="6.8" width="4.2" height="4.2" rx=".8" />
            </svg>
            Explore
          </button>
        </li>
      </ol>
      <p className="md:hidden mt-1 text-[13px] text-gray-600 dark:text-gray-400">
        {view === 'explore' ? 'Explore: every control, no steps' : `Step ${view} of 6 · ${STEPS[view].title}`}
      </p>
    </div>
  )
}

/** Phones: Back / n of 6 / Next, pinned to the bottom of the screen. */
export function PhoneNav({ view, onGo, onControls }: { view: PPView; onGo: (v: PPView) => void; onControls: () => void }) {
  const back = view === 'explore' ? 6 : view > 1 ? ((view - 1) as StepN) : null
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-20 px-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-t border-gray-200 dark:border-gray-800"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Step navigation"
    >
      <div className="h-16 flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={back === null}
          onClick={() => back !== null && onGo(back)}
          className="h-11 px-4 rounded-full bg-gray-100 dark:bg-gray-800 text-[14px] font-semibold text-gray-700 dark:text-gray-200 disabled:opacity-40"
        >
          ‹ Back
        </button>
        <span className="text-[14px] font-display font-semibold tabular-nums text-gray-500 dark:text-gray-400">
          {view === 'explore' ? 'Explore' : `${view} of 6`}
        </span>
        {view === 'explore' ? (
          <button type="button" onClick={onControls} className="h-11 px-5 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-[14px] font-semibold">
            Controls ↑
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onGo(view === 6 ? 'explore' : ((view + 1) as StepN))}
            className="h-11 px-5 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-[14px] font-semibold"
          >
            {view === 6 ? 'Explore ›' : 'Next ›'}
          </button>
        )}
      </div>
    </nav>
  )
}
