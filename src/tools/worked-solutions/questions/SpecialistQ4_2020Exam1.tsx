// 2020 Specialist Mathematics — Exam 1 Question 4 (4 marks). An inequality with an absolute
// value in the denominator, answered in interval notation. Question text transcribed from
// the original paper. Answer checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import reportGraphSrc from './spec-2020e1-q4-report-graph.png'

const EXAM: SAExaminerStats = {
  marks: [22, 20, 22, 24, 12],
  average: 1.8,
  comment: (
    <>
      The intersection of the graphs of <Katex tex="y=3-x" /> and{' '}
      <Katex tex="y=\dfrac{1}{|x-4|}" /> occurs when <Katex tex="x<3" />. A quick sketch was
      helpful:
      <img src={reportGraphSrc} alt="The report's sketch of y = 3 − x and y = 1/|x − 4|, with the asymptote x = 4" className="w-full max-w-[240px] my-2" />
      As <Katex tex="x<3" />, the inequality to be solved was{' '}
      <Katex tex="3-x>\dfrac{1}{4-x}" />. This led to the inequality{' '}
      <Katex tex="x^2-7x+11>0" />, which could be solved using the quadratic formula. A number of
      students who found that <Katex tex="-\infty<x<\dfrac{7-\sqrt5}{2}" /> did not receive full
      marks as they did not write the final answer in interval notation.
      <br />
      Students who approached this problem algebraically were often unsure how to deal with the
      inequality signs.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1}{|x-4|} > 0 \ \text{ for all } x \ne 4" />,
    reason: <>An absolute value is never negative, so the right-hand side is always strictly positive. That single observation does most of the work.</>,
  },
  {
    working: <Katex display tex="\implies 3-x > 0 \implies x < 3" />,
    reason: <>The left-hand side must beat something positive, so it has to be positive itself. This kills the whole region <Katex tex="x\ge3" /> at a stroke — including the awkward point <Katex tex="x=4" />.</>,
  },
  {
    working: <Katex display tex="x < 3 \implies x-4 < 0 \implies |x-4| = 4-x" />,
    reason: <>With the domain narrowed there is only one case to handle, not two.</>,
  },
  {
    working: <Katex display tex="3-x > \frac{1}{4-x}" />,
    reason: <>The inequality with the modulus removed.</>,
  },
  {
    working: <Katex display tex="(3-x)(4-x) > 1" />,
    reason: <>Multiplying by <Katex tex="4-x" />, which is <em>positive</em> on <Katex tex="x<3" />, so the sign of the inequality is safe. The report notes students who approached this algebraically were often unsure how to deal with the inequality signs.</>,
  },
  {
    working: <Katex display tex="12-7x+x^2 > 1 \implies x^2-7x+11 > 0" />,
    reason: <>Expanding and collecting.</>,
  },
  {
    working: <Katex display tex="x = \frac{7\pm\sqrt{49-44}}{2} = \frac{7\pm\sqrt5}{2}" />,
    reason: <>The quadratic formula; <Katex tex="\tfrac{7-\sqrt5}{2}\approx2.38" /> and <Katex tex="\tfrac{7+\sqrt5}{2}\approx4.62" />.</>,
  },
  {
    working: <Katex display tex="x^2-7x+11 > 0 \iff x < \tfrac{7-\sqrt5}{2} \ \text{ or } \ x > \tfrac{7+\sqrt5}{2}" />,
    reason: <>A positive parabola is above the axis outside its roots.</>,
  },
  {
    working: <Katex display tex="\text{combine with } x<3: \ \tfrac{7+\sqrt5}{2}\approx4.62 \text{ is excluded}" />,
    reason: <>Only the left branch survives the domain restriction.</>,
  },
  {
    working: <Katex display tex="\boxed{x \in \left(-\infty,\ \tfrac{7-\sqrt5}{2}\right)}" />,
    reason: <>Interval notation, as the question demands — the report notes students who wrote the same set as <Katex tex="-\infty<x<\tfrac{7-\sqrt5}{2}" /> did not receive full marks.</>,
  },
]

export default function SpecialistQ4_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (4 marks)</p>
        <p>
          Solve the inequality <Katex tex="3-x>\dfrac{1}{|x-4|}" /> for <Katex tex="x" />,
          expressing your answer in interval notation.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The instinct with a modulus is to split into two cases. Resist it here: because
            the right-hand side is always positive, the left-hand side must be too, and that
            single deduction fixes the sign of <Katex tex="x-4" /> before you ever open the
            absolute value.
          </p>
          <p>
            It also means you never multiply an inequality by something of unknown sign — the
            usual way marks are lost on this type of question.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={4} />
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
