// 2017 Specialist Mathematics — Exam 1, Question 1 (3 marks). Implicit differentiation of
// 3xy² + 2y = x, then the tangent at (1, −1). Question text transcribed from the original
// paper (no diagram given). Answer checked with sympy and against the VCAA examination
// report. Solution is original. This question has no lettered parts, so it uses the plain
// card layout rather than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [13, 18, 11, 57],
  average: 2.1,
  comment: (
    <>
      This question was answered well by most students. Typical errors included not being
      able to use the product rule and/or chain rule on the first term, and finding the
      correct derivative but not continuing to find the equation of the tangent. A few
      students found the equation of the normal instead. Some tried to make <Katex tex="x" />{' '}
      or <Katex tex="y" /> the subject before differentiating, with these attempts usually
      leading to difficulties. A number of students gave the derivative of <Katex tex="x" />{' '}
      to be zero.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="3xy^2+2y = x" />,
    reason: <>Differentiate both sides with respect to <Katex tex="x" />, treating <Katex tex="y" /> as a function of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\bigl(3xy^2\bigr) = 3y^2 + 3x\cdot 2y\frac{dy}{dx}" />,
    reason: <>Product rule on <Katex tex="3x" /> times <Katex tex="y^2" />, with a chain rule on <Katex tex="y^2" /> since <Katex tex="y" /> depends on <Katex tex="x" />. This one term is where the report says most marks were lost.</>,
  },
  {
    working: <Katex display tex="3y^2+6xy\frac{dy}{dx}+2\frac{dy}{dx} = 1" />,
    reason: <>The right-hand side is <Katex tex="x" />, whose derivative is <Katex tex="1" /> — not <Katex tex="0" />, which the report lists as a common slip.</>,
  },
  {
    working: <Katex display tex="3(-1)^2+6(1)(-1)\frac{dy}{dx}+2\frac{dy}{dx}=1" />,
    reason: <>Substitute <Katex tex="(1,-1)" /> now, before rearranging. Solving for <Katex tex="\tfrac{dy}{dx}" /> in general first also works, but substituting early keeps the algebra to a single line.</>,
  },
  {
    working: <Katex display tex="3-4\frac{dy}{dx}=1 \implies \frac{dy}{dx}=\frac12" />,
    reason: <>Collecting: <Katex tex="-6+2=-4" />.</>,
  },
  {
    working: <Katex display tex="y-(-1) = \tfrac12(x-1)" />,
    reason: <>Point–gradient form. The gradient of the <em>tangent</em> is <Katex tex="\tfrac12" />; the report notes some students used <Katex tex="-2" />, the normal's gradient.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \frac{x}{2}-\frac32}" />,
    reason: <>Check: at <Katex tex="x=1" />, <Katex tex="y=\tfrac12-\tfrac32=-1" /> ✓, so the line does pass through the given point.</>,
  },
]

export default function SpecialistQ1_2017Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 1 (3 marks)">
        <p>
          Find the equation of the tangent to the curve given by{' '}
          <Katex tex="3xy^2+2y=x" /> at the point <Katex tex="(1,-1)" />.
        </p>
        <p>
          The curve cannot be rearranged into <Katex tex="y=\ldots" /> without a cubic
          formula, so implicit differentiation is the only realistic route — and with a point
          given, you never need the general expression for <Katex tex="\tfrac{dy}{dx}" /> at
          all.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={3} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
