// Marks Needed: the page worked backwards. For each target study score, the total marks that
// reach it in a typical year (so setting them makes the headline agree) and across the years,
// with a row placing the student's own marks among the targets.

import { useId, useMemo, type Ref } from 'react'
import { DISTRIBUTIONS, SUBJECTS, type Subject } from '../data.ts'
import { marksNeeded, splitTotal, totalMax } from '../model.ts'
import { CARD, H2, SUB } from '../shared.tsx'

const TARGETS = [30, 35, 40, 45]

export default function MarksNeeded({
  subject,
  marks,
  typical,
  cardRef,
}: {
  subject: Subject
  marks: number[]
  typical: number
  /** The card, for the sticky mark bar to know when it has scrolled past. */
  cardRef?: Ref<HTMLElement>
}) {
  const id = useId()
  const two = SUBJECTS[subject].exams.length > 1
  const max = totalMax(subject)
  const years = DISTRIBUTIONS[subject]
  const across = `${years[0].year}–${years[years.length - 1].year}`
  const rows = useMemo(() => marksNeeded(subject, TARGETS), [subject])
  const total = marks.reduce((s, m) => s + m, 0)
  // The student's row goes after every target already reached; the next one up is in bold.
  const youAt = rows.filter(r => r.target <= typical).length
  const next = rows[youAt]?.target

  const you = (
    <tr key="you">
      <td colSpan={3} className="py-1">
        <div className="rounded-lg bg-sky-50 dark:bg-sky-950/60 px-2.5 py-1.5 text-[12.5px] font-semibold text-sky-800 dark:text-sky-200 tabular-nums">
          You now: <b className="font-bold">{total}</b> / {max} → <b className="font-bold">{typical}</b>
        </div>
      </td>
    </tr>
  )

  return (
    <section ref={cardRef} aria-labelledby={id} className={CARD}>
      <h2 id={id} className={H2}>
        Marks Needed
      </h2>
      <p className={`${SUB} mt-0.5 mb-3 max-w-2xl`}>
        {two
          ? `Total marks out of ${max} for each study score. Only the total counts, so any split between the two exams works.`
          : `Marks out of ${max} on the exam for each study score.`}
      </p>

      <table className="w-full max-w-xl text-[13px] sm:text-[13.5px] tabular-nums">
        <thead>
          <tr className="text-left text-[12px] font-semibold text-gray-500 dark:text-gray-400">
            <th scope="col" className="pb-1.5 pr-2 font-semibold w-[24%]">
              <span className="sm:hidden">Score</span>
              <span className="hidden sm:inline">Study Score</span>
            </th>
            <th scope="col" className="pb-1.5 pr-2 font-semibold">
              <span className="sm:hidden">Typical</span>
              <span className="hidden sm:inline">Typical Year</span>
            </th>
            <th scope="col" className="pb-1.5 font-semibold">
              <span className="sm:hidden">{across}</span>
              <span className="hidden sm:inline">Across {across}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.flatMap((r, i) => {
            const bold = r.target === next
            const tone = bold ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
            const range = r.lo === null || r.hi === null ? '—' : r.lo === r.hi ? `${r.lo}` : `${r.lo}–${r.hi}`
            const row = (
              <tr key={r.target} className={`align-top ${i === youAt ? '' : 'border-t border-gray-100 dark:border-gray-800'} ${tone}`}>
                <th scope="row" className={`py-2 pr-2 text-left font-display text-base ${bold ? 'font-bold' : 'font-semibold'}`}>
                  {r.target}
                </th>
                <td className="py-2 pr-2">
                  {r.typical === null ? (
                    '—'
                  ) : (
                    <>
                      <span className={bold ? '' : 'font-medium'}>{r.typical}</span>
                      {two && (
                        <span className="block sm:inline sm:ml-1.5 text-[12px] sm:text-[12.5px] font-normal text-gray-500 dark:text-gray-400">
                          e.g. {splitTotal(subject, r.typical).join(' + ')}
                        </span>
                      )}
                    </>
                  )}
                </td>
                <td className="py-2 whitespace-nowrap">{range}</td>
              </tr>
            )
            return i === youAt ? [you, row] : [row]
          })}
          {youAt === rows.length && you}
        </tbody>
      </table>

      <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">The low end is the most generous year, the high end the least generous.</p>
    </section>
  )
}
