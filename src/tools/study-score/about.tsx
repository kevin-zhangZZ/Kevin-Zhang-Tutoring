// How It Works: the method behind the projections and the VCAA sources, folded away at the foot
// of the page in both modes (the two everyday caveats are in Keep in Mind, by the result).

import { DISTRIBUTIONS, SUBJECTS, currentCourseFrom, type Subject } from './data.ts'
import { MEAN, RHO, RHO_RANGE, SD } from './model.ts'

const B = 'font-semibold text-gray-700 dark:text-gray-300'

export default function HowItWorks({ subject }: { subject: Subject }) {
  const rows = DISTRIBUTIONS[subject]
  const one = SUBJECTS[subject].exams.length === 1
  const first = rows[0].year
  const last = rows[rows.length - 1].year
  const current = currentCourseFrom(subject)

  return (
    <details className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <summary className="flex items-center gap-2 min-h-[44px] px-4 sm:px-5 rounded-2xl cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden font-display text-[15px] font-bold text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        <svg viewBox="0 0 12 12" aria-hidden className="w-3 h-3 flex-none transition-transform motion-reduce:transition-none group-open:rotate-90">
          <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        How It Works
      </summary>
      <div className="px-4 sm:px-5 pb-4 pt-1 max-w-3xl flex flex-col gap-2 text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">
        <p>
          <b className={B}>{one ? 'Ranking the exam.' : 'Ranking each exam.'}</b> Every year VCAA publishes how many students got each grade (UG to A+) on{' '}
          {one ? 'the exam' : 'Exam 1 and Exam 2'}, and the score range for each grade. That gives the share of the state below each grade boundary; between
          boundaries the projection fills in a smooth curve.
        </p>
        {one ? (
          <p>
            <b className={B}>One exam.</b> {SUBJECTS[subject].name} has a single end-of-year exam, out of {SUBJECTS[subject].exams[0].rawMax}, so your rank on that
            exam is your projected rank.
            {current !== null &&
              ` The ${current === last ? `${last} paper is` : current === last - 1 ? `${current} and ${last} papers are` : `papers from ${current} on are`} on the current study design; earlier years are on the previous one, which covered some different content.`}
          </p>
        ) : (
          <p>
            <b className={B}>Combining the exams.</b> Exam 2 has twice as many marks, so it carries twice the weight overall. But a mark is a mark: one more on
            Exam 1 helps exactly as much as one more on Exam 2. VCAA doesn’t publish how students’ Exam 1 and Exam 2 results line up, so the projection assumes
            a correlation of {RHO} between them — typical for two papers on the same course. Anything from {RHO_RANGE[0]} to {RHO_RANGE[1]} moves the result by a
            point or two at most, and mostly when the two exams went very differently.
          </p>
        )}
        <p>
          <b className={B}>Study score.</b> Study scores are scaled so the state has a mean of {MEAN} and a standard deviation of {SD}, capped at 50. Your{' '}
          {one ? '' : 'combined '}rank is turned into a study score on that curve: the top 16% score about 37 or more, the top 2% about 44 or more, and roughly
          the top 0.2% get 50.
        </p>
        <p>
          <b className={B}>Reading the results.</b> Check My Marks leads with the middle of the {rows.length} years’ scores ({first}–{last}), so half the years
          score your marks a little higher and half a little lower. Track My Papers scores each paper against the students who sat it that year, and its Recent
          Average evens out the kind years and the tough ones.
        </p>
        <p>
          <b className={B}>What it leaves out.</b> School-assessed coursework (SACs) also counts, but SAC marks are moderated against the{' '}
          {one ? 'exam' : 'exams'}, so a student whose SACs are in line with {one ? 'their exam' : 'their exams'} keeps the same rank. This is a projection from
          published statistics, not VCAA’s calculation, so treat it as give or take 2 points. Near full marks, many students are tied, and VCAA separates them
          with their SACs.
        </p>
        <p>
          <b className={B}>Sources.</b> VCAA grade distributions:{' '}
          {[...rows].reverse().map((r, i) => (
            <span key={r.year}>
              <a href={r.source} target="_blank" rel="noreferrer" className="text-sky-700 dark:text-sky-400 hover:underline">
                {r.year}
              </a>
              {i < rows.length - 1 ? ', ' : '.'}
            </span>
          ))}
        </p>
      </div>
    </details>
  )
}
