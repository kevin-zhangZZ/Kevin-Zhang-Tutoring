// 2014 Specialist Mathematics — Exam 1, Question 4 (3 marks). Implicit differentiation of
// y = -3e^(3x)e^y, then the normal's gradient. Question text transcribed from the original
// paper (no diagram given). Answer checked with sympy and against the VCAA examination
// report. Solution is original. This question has no lettered parts, so it uses the plain
// card layout rather than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [14, 9, 29, 48],
  average: 2.1,
  comment: (
    <>
      Many students answered this question well. Most recognised the need for implicit
      differentiation and attempted to use the product rule. The most common differentiation
      errors were <Katex tex="\tfrac{d}{dy}\!\left(e^y\right)=ye^y" /> and{' '}
      <Katex tex="\tfrac{d}{dy}(y)=0" />, or occasionally <Katex tex="=1" />. Some students
      rearranged the equation prior to attempting to find the derivative. On most occasions
      this either led to complications or was an incomplete attempt. A number of students were
      unable to take the <Katex tex="\tfrac{dy}{dx}" /> terms to one side of the equation or
      made algebraic errors in doing so. Many students did not substitute in the given values.
      Some who did substitute in the given values made numerical errors or were unable to
      simplify <Katex tex="e^{-3}e^3" />. Several students correctly found the gradient of the
      tangent and then did no further work. Some students found the equation of the normal,
      which was not required.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = -3e^{3x}e^y" />,
    reason: <>The <Katex tex="y" /> on both sides means implicit differentiation; rearranging first only makes it harder.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = -3\left(3e^{3x}e^y + e^{3x}e^y\frac{dy}{dx}\right)" />,
    reason: <>Product rule on <Katex tex="e^{3x}e^y" />, with a chain rule on <Katex tex="e^y" /> giving <Katex tex="e^y\tfrac{dy}{dx}" /> — not <Katex tex="ye^y" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}\left(1+3e^{3x}e^y\right) = -9e^{3x}e^y" />,
    reason: <>Collecting the <Katex tex="\tfrac{dy}{dx}" /> terms on the left.</>,
  },
  {
    working: <Katex display tex="(1,-3):\quad e^{3x}e^y = e^{3}e^{-3} = e^0 = 1" />,
    reason: <>Substituting the point now, before simplifying further — the indices cancel exactly, which is why this point was chosen.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}(1+3) = -9 \implies \frac{dy}{dx} = -\frac94" />,
    reason: <>The gradient of the <em>tangent</em> at <Katex tex="(1,-3)" />.</>,
  },
  {
    working: <Katex display tex="m_{\text{normal}} = -\frac{1}{-9/4}" />,
    reason: <>The normal is perpendicular to the tangent, so its gradient is the negative reciprocal. Stopping at <Katex tex="-\tfrac94" /> is the report's common omission.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac49}" />,
    reason: <>Just the gradient — the question does not ask for the equation of the normal. Check: <Katex tex="-\tfrac94\times\tfrac49=-1" />, so the normal is perpendicular to the tangent ✓.</>,
  },
]

export default function SpecialistQ4_2014Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 4 (3 marks)">
        <p>
          Find the gradient of the normal to the curve defined by{' '}
          <Katex tex="y=-3e^{3x}e^y" /> at the point <Katex tex="(1,-3)" />.
        </p>
      </Background>
      <Background>
        <p>
          Two traps sit at the ends: <Katex tex="e^y" /> differentiates to{' '}
          <Katex tex="e^y\tfrac{dy}{dx}" /> at the start, and the question asks for the{' '}
          <em>normal</em>, not the tangent, at the finish.
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
