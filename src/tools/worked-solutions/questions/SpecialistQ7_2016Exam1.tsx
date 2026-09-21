// 2016 Specialist Mathematics — Exam 1, Question 7 (4 marks). Arc length of
// y = (1/3)(x² + 2)^(3/2), where the expression under the root collapses to a perfect
// square. Question text transcribed from the original paper (no diagram given). Answer
// checked with sympy and against the VCAA examination report. Solution is original.
// No lettered parts, so this uses the plain card layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [9, 15, 30, 2, 43],
  average: 2.6,
  comment: (
    <>
      Some students responded very well to this question but others had some difficulty. A
      number made an error in the formula, despite it being on the formula sheet. Most
      students found the derivative correctly, but some made errors leading to an impossible
      integral. A large proportion of those who found the correct derivative and substituted
      correctly into the formula were then unable to recognise the perfect square inside the
      square root. A small number of students took the square root of individual terms.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="L = \int_a^b\sqrt{1+\left(\frac{dy}{dx}\right)^2}\,dx" />,
    reason: <>The cartesian arc-length formula, straight from the formula sheet.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac13\times\frac32\left(x^2+2\right)^{\frac12}\times2x = x\sqrt{x^2+2}" />,
    reason: <>Chain rule. The <Katex tex="\tfrac13" />, the <Katex tex="\tfrac32" /> and the <Katex tex="2x" /> collapse to a single <Katex tex="x" /> out front.</>,
  },
  {
    working: <Katex display tex="1+\left(\frac{dy}{dx}\right)^2 = 1+x^2\left(x^2+2\right) = x^4+2x^2+1" />,
    reason: <>Squaring removes the surd completely — which is the design of the question.</>,
  },
  {
    working: <Katex display tex="= \left(x^2+1\right)^2" />,
    reason: <>A perfect square. Spotting this is the whole question; the report says most of the students who got this far could not see it.</>,
  },
  {
    working: <Katex display tex="\sqrt{\left(x^2+1\right)^2} = x^2+1" />,
    reason: <>No absolute value needed: <Katex tex="x^2+1>0" /> always.</>,
  },
  {
    working: <Katex display tex="L = \int_0^2\left(x^2+1\right)dx = \left[\frac{x^3}{3}+x\right]_0^2" />,
    reason: <>An ordinary polynomial integral.</>,
  },
  {
    working: <Katex display tex="\boxed{L = \frac83+2 = \frac{14}{3}}" />,
    reason: <>About <Katex tex="4.67" />. Sensible: the curve runs from <Katex tex="\left(0,\tfrac{2\sqrt2}{3}\right)" /> to <Katex tex="\left(2,\tfrac{6\sqrt6}{3}\right)\approx(2,4.90)" />, a straight-line distance of about <Katex tex="4.4" />, so a slightly longer arc is right.</>,
  },
]

export default function SpecialistQ7_2016Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 7 (4 marks)">
        <p>
          Find the arc length of the curve{' '}
          <Katex tex="y=\tfrac13\left(x^2+2\right)^{\frac32}" /> from <Katex tex="x=0" /> to{' '}
          <Katex tex="x=2" />.
        </p>
        <p>
          Arc-length integrands are almost never integrable by hand. When an exam asks for
          one on the no-technology paper, the expression under the root is going to be a
          perfect square — look for it before trying anything else.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={4} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
