// 2018 Specialist Mathematics — Exam 1, Question 7 (3 marks). Use a double angle formula to
// collapse cot(2x) + ½tan(x) to a multiple of cot(x). Question text transcribed from the
// original paper (no diagram given). Identity verified symbolically and numerically in
// sympy, and checked against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [10, 6, 19, 66],
  average: 2.4,
  comment: (
    <>
      This question was answered well, with most students converting{' '}
      <Katex tex="\cot(2x)" /> into <Katex tex="\tfrac{1}{\tan(2x)}" /> and using a double
      angle formula. A number of students used <Katex tex="\sin" /> and <Katex tex="\cos" />{' '}
      but were less successful than those who used the more direct approach. A number of
      students thought that <Katex tex="\cot(2x)" /> was equal to{' '}
      <Katex tex="\tfrac{1}{\cos(2x)}" />. Some students gave their final answer as{' '}
      <Katex tex="a=2" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cot(2x) = \frac{1}{\tan(2x)}" />,
    reason: <>Start by writing everything in terms of <Katex tex="\tan" />, since the other term already is. Note <Katex tex="\cot(2x)\ne\tfrac{1}{\cos(2x)}" /> — the report says a number of students made that mistake.</>,
  },
  {
    working: <Katex display tex="\tan(2x) = \frac{2\tan(x)}{1-\tan^2(x)}" />,
    reason: <>The double angle formula for tangent, from the formula sheet.</>,
  },
  {
    working: <Katex display tex="\cot(2x) = \frac{1-\tan^2(x)}{2\tan(x)}" />,
    reason: <>Taking the reciprocal.</>,
  },
  {
    working: <Katex display tex="\cot(2x)+\frac12\tan(x) = \frac{1-\tan^2(x)}{2\tan(x)} + \frac{\tan(x)}{2}" />,
    reason: <>Substituting into the left-hand side.</>,
  },
  {
    working: <Katex display tex="= \frac{1-\tan^2(x)}{2\tan(x)} + \frac{\tan^2(x)}{2\tan(x)}" />,
    reason: <>Common denominator <Katex tex="2\tan(x)" />: the second term is multiplied top and bottom by <Katex tex="\tan(x)" />.</>,
  },
  {
    working: <Katex display tex="= \frac{1-\tan^2(x)+\tan^2(x)}{2\tan(x)} = \frac{1}{2\tan(x)}" />,
    reason: <>The <Katex tex="\tan^2(x)" /> terms cancel exactly. That cancellation is the whole point of the question — it is why the <Katex tex="\tfrac12" /> coefficient was chosen.</>,
  },
  {
    working: <Katex display tex="= \frac12\cot(x)" />,
    reason: <>Rewriting the reciprocal of <Katex tex="\tan" /> as <Katex tex="\cot" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \frac12}" />,
    reason: <>The report notes <Katex tex="a=2" /> being given — the reciprocal of the correct value. Spot-check at <Katex tex="x=\tfrac{\pi}{4}" />: <Katex tex="\cot\!\left(\tfrac{\pi}{2}\right)+\tfrac12\tan\!\left(\tfrac{\pi}{4}\right)=0+\tfrac12" />, and <Katex tex="\tfrac12\cot\!\left(\tfrac{\pi}{4}\right)=\tfrac12" /> ✓</>,
  },
]

export default function SpecialistQ7_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (3 marks)</p>
        <p>
          Given that <Katex tex="\cot(2x)+\dfrac12\tan(x)=a\cot(x)" />, use a suitable double
          angle formula to find the value of <Katex tex="a" />, <Katex tex="a\in R" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The instruction "use a suitable double angle formula" is a strong hint about
            route. There are three double angle formulas available, but only the{' '}
            <Katex tex="\tan" /> one keeps everything in a single trigonometric function —
            and the right-hand side is a <Katex tex="\cot" />, which is just{' '}
            <Katex tex="\tfrac{1}{\tan}" />.
          </p>
          <p>
            The report confirms this is the efficient path: students who expanded into{' '}
            <Katex tex="\sin" /> and <Katex tex="\cos" /> could get there, but were less
            successful.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={3} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
