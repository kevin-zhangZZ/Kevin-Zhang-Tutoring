// 2023 Specialist Mathematics — Exam 1 Question 5 (3 marks). Integration by parts, new to
// the 2023 study design. Question text transcribed from the original paper. Answer checked
// with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [23, 10, 14, 53],
  average: 2.0,
  comment: (
    <>
      Integration by parts is a new topic for 2023 and many students were able to answer this
      question reasonably well.
      <br />
      Some students did not consistently evaluate the definite integral, and some final
      responses included the independent variable{' '}
      <Katex tex="\tfrac13x^3\log_e(x)-\tfrac79" />.
      <br />
      A number of students selected the function to differentiate and the function to
      antidifferentiate incorrectly. Some idiosyncratic methods were also observed.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int u\,\frac{dv}{dx}\,dx = uv-\int v\,\frac{du}{dx}\,dx" />,
    reason: <>Integration by parts, from the formula sheet.</>,
  },
  {
    working: <Katex display tex="u = \log_e(x), \qquad \frac{dv}{dx} = x^2" />,
    reason: <>Choose <Katex tex="\log_e(x)" /> as the part to <em>differentiate</em>: there is no elementary antiderivative you would want for it, and differentiating turns it into <Katex tex="\tfrac1x" />, which simplifies the second integral. Choosing the other way round makes the problem worse.</>,
  },
  {
    working: <Katex display tex="\frac{du}{dx} = \frac1x, \qquad v = \frac{x^3}{3}" />,
    reason: <>The two halves you need.</>,
  },
  {
    working: <Katex display tex="\int_1^2 x^2\log_e(x)\,dx = \left[\frac{x^3}{3}\log_e(x)\right]_1^2-\int_1^2\frac{x^3}{3}\cdot\frac1x\,dx" />,
    reason: <>Both the boundary term and the remaining integral carry the terminals.</>,
  },
  {
    working: <Katex display tex="= \frac83\log_e(2)-0-\frac13\int_1^2 x^2\,dx" />,
    reason: <><Katex tex="\log_e(1)=0" />, so the lower boundary term vanishes. The <Katex tex="x^3/x" /> cancels to <Katex tex="x^2" /> — the payoff for the choice above.</>,
  },
  {
    working: <Katex display tex="= \frac83\log_e(2)-\frac13\left[\frac{x^3}{3}\right]_1^2 = \frac83\log_e(2)-\frac19(8-1)" />,
    reason: <>A straightforward power integral.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{8\log_e(2)}{3}-\frac79}" />,
    reason: <>About <Katex tex="1.071" />. A definite integral must evaluate to a <em>number</em> — the report notes some final responses still included the independent variable.</>,
  },
]

export default function SpecialistQ5_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (3 marks)</p>
        <p>
          Evaluate <Katex tex="\displaystyle\int_1^2 x^2\log_e(x)\,dx" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Integration by parts entered the study design in 2023. The whole skill is the
            choice of which factor to differentiate: pick the one that gets{' '}
            <em>simpler</em>. A logarithm almost always plays that role, because{' '}
            <Katex tex="\log_e(x)" /> differentiates to <Katex tex="\tfrac1x" /> and then
            cancels against the power you antidifferentiated.
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
