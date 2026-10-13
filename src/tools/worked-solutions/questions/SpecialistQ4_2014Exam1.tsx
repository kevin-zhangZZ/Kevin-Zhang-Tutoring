// 2014 Specialist Mathematics — Exam 1, Question 4 (3 marks). Implicit differentiation of
// y = -3e^(3x)e^y, then the normal's gradient. Question text transcribed from the original
// paper (no diagram given). Answer checked with sympy and against the VCAA examination
// report. Solution is original. This question has no lettered parts, so it uses the plain
// card layout rather than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, ReportShelf, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

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
    reason: <>We can't make <Katex tex="y" /> the subject, so differentiate both sides with respect to <Katex tex="x" /> as they stand (implicit differentiation).</>,
    more: <>The report notes that students who rearranged first usually ran into complications or did not finish. If you like, the index law <Katex tex="e^{3x}e^y=e^{3x+y}" /> turns the right side into a single exponential, so a chain rule alone does the job: <Katex tex="\tfrac{dy}{dx}=-3e^{3x+y}\left(3+\tfrac{dy}{dx}\right)" />, the same equation as the next line.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = -3\left(3e^{3x}e^y + e^{3x}e^y\frac{dy}{dx}\right)" />,
    reason: <>Left side: <Katex tex="y" /> becomes <Katex tex="\tfrac{dy}{dx}" />. Right side: product rule on <Katex tex="e^{3x}e^y" />, with a chain rule giving <Katex tex="\tfrac{d}{dx}(e^y)=e^y\tfrac{dy}{dx}" />.</>,
    more: <>Because <Katex tex="y" /> is a function of <Katex tex="x" />, every term in <Katex tex="y" /> picks up a factor <Katex tex="\tfrac{dy}{dx}" /> by the chain rule: <Katex tex="\tfrac{d}{dx}(y)=1\cdot\tfrac{dy}{dx}" /> (not 0 or 1) and <Katex tex="\tfrac{d}{dx}(e^y)=e^y\tfrac{dy}{dx}" /> (not <Katex tex="ye^y" />). These are the report's most common differentiation errors (it writes <Katex tex="\tfrac{d}{dy}" />, but the slips are in differentiating with respect to <Katex tex="x" />). The product rule gives <Katex tex="(3e^{3x})e^y+e^{3x}\left(e^y\tfrac{dy}{dx}\right)" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}\left(1+3e^{3x}e^y\right) = -9e^{3x}e^y" />,
    reason: <>Expand the bracket, move the <Katex tex="\tfrac{dy}{dx}" /> term to the left side, then factorise out <Katex tex="\tfrac{dy}{dx}" />.</>,
    more: <>Expanding gives <Katex tex="\tfrac{dy}{dx}=-9e^{3x}e^y-3e^{3x}e^y\tfrac{dy}{dx}" />; adding <Katex tex="3e^{3x}e^y\tfrac{dy}{dx}" /> to both sides gives the line above. The report notes a number of students could not gather the <Katex tex="\tfrac{dy}{dx}" /> terms or made algebraic errors here.</>,
  },
  {
    working: <Katex display tex="(1,-3):\quad e^{3x}e^y = e^{3}e^{-3} = e^0 = 1" />,
    reason: <>Substitute <Katex tex="x=1,\ y=-3" /> now: the powers add to 0 (index law), so <Katex tex="e^{3x}e^y=1" /> and the rest is simple arithmetic.</>,
    more: <>You could make <Katex tex="\tfrac{dy}{dx}" /> the subject first, <Katex tex="\tfrac{dy}{dx}=\tfrac{-9e^{3x}e^y}{1+3e^{3x}e^y}" />, but the question only wants one number, so substituting early saves algebra. The report notes many students never substituted the point, and some could not simplify <Katex tex="e^{-3}e^3" />: by the index law it is <Katex tex="e^{-3+3}=e^0=1" />. The point is on the curve: <Katex tex="-3e^{3}e^{-3}=-3" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}(1+3) = -9 \implies \frac{dy}{dx} = -\frac94" />,
    reason: <>Put <Katex tex="e^{3x}e^y=1" /> into the previous equation. This is the gradient of the <em>tangent</em> at <Katex tex="(1,-3)" />, not yet the answer.</>,
  },
  {
    working: <Katex display tex="m_{\text{normal}} = -\frac{1}{-9/4}" />,
    reason: <>The normal is perpendicular to the tangent, so its gradient is the negative reciprocal.</>,
    more: <>The report notes several students found the tangent's gradient <Katex tex="-\tfrac94" /> and then did no further work, losing the final mark.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac49}" />,
    reason: <>Just the gradient: the question does not ask for the equation of the normal.</>,
    more: <>Check: <Katex tex="-\tfrac94\times\tfrac49=-1" />, so the normal is perpendicular to the tangent. The report notes some students found the equation of the normal, which was not required.</>,
  },
]

export default function SpecialistQ4_2014Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 4 (3 marks)" always>
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
      <ReportShelf stats={EXAM} maxMarks={3} />
    </div>
  )
}
