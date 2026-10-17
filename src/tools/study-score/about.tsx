// How It Works: the method behind the projections and the VCAA sources, folded away at the foot
// of the page in both modes (the two everyday caveats are in Keep in Mind, by the result).

import { CURRENT_DESIGN_FROM, DISTRIBUTIONS, OLDER_NAME, SUBJECTS, type Subject } from './data.ts'
import { MEAN, RHO, RHO_RANGE, SD, STRETCH_FROM } from './model.ts'

const B = 'font-semibold text-gray-700 dark:text-gray-300'

export default function HowItWorks({ subject }: { subject: Subject }) {
  const rows = DISTRIBUTIONS[subject]
  const { name, exams } = SUBJECTS[subject]
  const one = exams.length === 1
  /** Graded assessments the marks feed: 2 for Methods; 1 for Japanese, whose two exams are one. */
  const graded = rows[rows.length - 1].exams.length
  const first = rows[0].year
  const last = rows[rows.length - 1].year
  const current = CURRENT_DESIGN_FROM[subject]
  const older = exams[0].older
  const design = ` The ${current === last ? `${last} paper is` : current === last - 1 ? `${current} and ${last} papers are` : `papers from ${current} on are`} on the current study design; earlier years are on older study designs, which covered some different content.`
  const oldName = OLDER_NAME[subject]
  const furtherNote = oldName
    ? ` Papers up to ${oldName.upTo} are ${oldName.name}, the subject ${name} replaced, scored against the students who sat ${oldName.name} that year.`
    : ''

  return (
    <details className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <summary className="flex items-center gap-2 min-h-[44px] px-4 sm:px-5 rounded-2xl cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden font-display text-[0.9375rem] font-bold text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        <svg viewBox="0 0 12 12" aria-hidden className="w-3 h-3 flex-none transition-transform motion-reduce:transition-none group-open:rotate-90">
          <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        How It Works
      </summary>
      <div className="px-4 sm:px-5 pb-4 pt-1 max-w-3xl flex flex-col gap-2 text-[0.8125rem] leading-relaxed text-gray-600 dark:text-gray-400">
        <p>
          <b className={B}>{one ? 'Ranking the exam.' : graded > 1 ? 'Ranking each exam.' : 'Ranking the exams.'}</b> Every year VCAA publishes how many students
          got each grade (UG to A+) on {one ? 'the exam' : graded > 1 ? `${exams[0].label} and ${exams[1].label}` : 'the oral and written exams together'}, and the score
          range for each grade. That gives the share of the state below each grade boundary; between boundaries the projection fills in a smooth curve.
        </p>
        {one ? (
          <p>
            <b className={B}>One exam.</b> {name} has a single end-of-year exam, out of {exams[0].rawMax}, so your rank on that exam is your projected rank.
            {older && ` Papers up to ${older.upTo} were out of ${older.rawMax}; a mark counts for the same share of the paper in every year.`}
            {design}
          </p>
        ) : graded > 1 ? (
          <p>
            <b className={B}>Combining the exams.</b> {exams[1].label} has {exams[1].rawMax} marks to {exams[0].label}’s {exams[0].rawMax}, so it carries{' '}
            {exams[1].rawMax === 2 * exams[0].rawMax ? 'twice the' : 'more'} weight overall. But a mark is a mark: one more on {exams[0].label} helps exactly as much as one
            more on {exams[1].label}. VCAA doesn’t publish how students’ {exams[0].label} and {exams[1].label} results line up, so the projection assumes a correlation of{' '}
            {RHO} between them — typical for two papers on the same course. Anything from {RHO_RANGE[0]} to {RHO_RANGE[1]} moves the result by a point or two at most, and
            mostly near the top or bottom of the scale.
            {furtherNote}
          </p>
        ) : (
          <p>
            <b className={B}>Oral and written.</b> VCAA reports the {exams[0].label.toLowerCase()} and {exams[1].label.toLowerCase()} exams as one combined score:
            the oral is a quarter of it and the written three quarters, their 12.5% and 37.5% shares of the study score. So a written mark (out of{' '}
            {exams[1].rawMax}) is worth more than an oral one (out of {exams[0].rawMax}).
            {design}
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
          with their SACs. Because SACs are left out, the rank alone would put full marks at only 44 to 49, so above {STRETCH_FROM} each year’s scale is
          stretched to make full marks 50.
        </p>
        <p>
          <b className={B}>Sources.</b> VCAA grade distributions:{' '}
          {[...rows].reverse().map((r, i) => (
            <span key={r.year}>
              <a href={r.source} target="_blank" rel="noreferrer" className="rounded text-sky-700 dark:text-sky-400 [@media(hover:hover)]:hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
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
