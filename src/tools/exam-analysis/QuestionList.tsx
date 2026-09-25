// The questions behind whatever is picked — the page's table view: every MCQ and short-answer
// part in the filters and the current pick, each linked to its worked solution.

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { questionPath } from '../worked-solutions/routes'
import { itemLabel, itemScore, pct, statOf, subLabel, type Item } from './model'
import type { AnalysisSubject } from './taxonomy'
import { BAND_FILL, bandOf } from './charts/common'

type Sort = 'score' | 'year' | 'marks'

const SORTS: { id: Sort; label: string }[] = [
  { id: 'score', label: 'Hardest first' },
  { id: 'year', label: 'Newest first' },
  { id: 'marks', label: 'Most marks' },
]

const PAGE = 40

export function QuestionList({ subject, items }: { subject: AnalysisSubject; items: Item[] }) {
  const [sort, setSort] = useState<Sort>('score')
  const [shown, setShown] = useState(PAGE)
  const sorted = [...items].sort((a, b) => {
    if (sort === 'year') return b.year - a.year || a.question.id.localeCompare(b.question.id)
    if (sort === 'marks') return b.marks - a.marks || (itemScore(a) ?? 2) - (itemScore(b) ?? 2)
    return (itemScore(a) ?? 2) - (itemScore(b) ?? 2)
  })
  const st = statOf(items)

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <p className="text-[13px] text-gray-600 dark:text-gray-300">
          <b className="text-gray-900 dark:text-white">{items.length}</b> {items.length === 1 ? 'item' : 'items'} · {st.marks} marks · average{' '}
          <b className="text-gray-900 dark:text-white">{pct(st.score)}</b>
        </p>
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1" role="group" aria-label="Sort">
          {SORTS.map(s => (
            <button
              key={s.id}
              type="button"
              aria-pressed={sort === s.id}
              onClick={() => setSort(s.id)}
              className={`px-3 py-1 rounded-full text-[12.5px] font-medium ${
                sort === s.id ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      {items.length === 0 ? (
        <p className="text-[13px] text-gray-500 py-6 text-center">Nothing matches — try more years or clear the pick.</p>
      ) : (
        <ul className="divide-y divide-gray-100 dark:divide-gray-800 border-y border-gray-100 dark:border-gray-800">
          {sorted.slice(0, shown).map(i => {
            const s = itemScore(i)
            return (
              <li key={i.key}>
                <Link
                  to={questionPath(i.question)}
                  className="grid grid-cols-[5.5rem_1fr_auto] sm:grid-cols-[9rem_1fr_11rem_3rem] items-center gap-x-3 gap-y-0.5 py-2 px-1 hover:bg-gray-50 dark:hover:bg-gray-800/60 rounded-md"
                >
                  <span className="font-display text-[12.5px] font-bold text-sky-700 dark:text-sky-400 tabular-nums">{itemLabel(i)}</span>
                  <span className="min-w-0">
                    <span className="block text-[13px] text-gray-800 dark:text-gray-200 truncate">{i.question.topic.split('—')[1]?.trim() ?? i.question.topic}</span>
                    <span className="block text-[11.5px] text-gray-500 dark:text-gray-400 truncate">
                      {subLabel(subject, i.sub)} · {i.type === 'mc' ? 'MCQ' : `${i.marks} ${i.marks === 1 ? 'mark' : 'marks'}`}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 justify-end">
                    <span className="hidden sm:block w-24 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden" aria-hidden>
                      {s !== null && <span className="block h-full rounded-full" style={{ width: `${s * 100}%`, background: BAND_FILL[bandOf(s)] }} />}
                    </span>
                    <span
                      className={`w-10 text-right text-[12.5px] tabular-nums ${s !== null && bandOf(s) === 'hard' ? 'font-extrabold text-amber-700 dark:text-amber-400' : 'font-semibold text-gray-600 dark:text-gray-300'}`}
                    >
                      {pct(s)}
                    </span>
                  </span>
                  <span className="hidden sm:block text-right text-[12.5px] font-semibold text-sky-700 dark:text-sky-400">Open ›</span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
      {sorted.length > shown && (
        <button
          type="button"
          onClick={() => setShown(n => n + 200)}
          className="mt-3 text-[13px] font-semibold text-sky-700 dark:text-sky-400 hover:underline"
        >
          Show {Math.min(200, sorted.length - shown)} more of {sorted.length - shown}
        </button>
      )}
    </div>
  )
}
