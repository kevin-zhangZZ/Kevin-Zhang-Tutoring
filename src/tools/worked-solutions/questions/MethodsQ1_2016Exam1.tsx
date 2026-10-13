// 2016 Mathematical Methods — Exam 1, Question 1 (4 marks).
// A quotient rule and a product rule with a chain rule inside. Question text transcribed
// from the original paper (no diagram given). Answers checked against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [11, 33, 56],
  average: 1.5,
  comment: (
    <>
      Most students were able to confidently apply the quotient rule. However, many students
      did not obtain full marks due to errors caused by, for example, a denominator of{' '}
      <Katex tex="x^4+4" /> as the supposed expansion of <Katex tex="(x^2+2)^2" />. Students
      should very carefully consider the placement and usage of brackets. For example, the
      expression <Katex tex="x^2+2\times-\sin(x)" /> is not equivalent to{' '}
      <Katex tex="(x^2+2)\times-\sin(x)" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [13, 18, 69],
  average: 1.6,
  comment: (
    <>
      This question was well answered. Most students correctly identified the product rule
      but did not evaluate (as instructed) or their answers were incomplete. An incorrect
      combination of the product and chain rule resulted in an answer of{' '}
      <Katex tex="10xe^{5x}" /> as a common error.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="u = \cos(x), \quad v = x^2+2" />,
    reason: <>One function of <Katex tex="x" /> divided by another, so use the quotient rule. Name the top <Katex tex="u" /> and the bottom <Katex tex="v" />.</>,
  },
  {
    working: <Katex display tex="u' = -\sin(x), \quad v' = 2x" />,
    reason: <>Standard derivatives: <Katex tex="\cos(x)" /> differentiates to <Katex tex="-\sin(x)" />, and the power rule on <Katex tex="x^2+2" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{vu'-uv'}{v^2}" />,
    reason: <>The quotient rule (on the formula sheet). The order matters: swapping the two terms on top flips the sign of the answer.</>,
    more: <>Say it as <em>bottom times derivative of top, minus top times derivative of bottom, all over bottom squared</em>.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{-\sin(x)(x^2+2)-2x\cos(x)}{(x^2+2)^2}}" />,
    reason: <>Substitute <Katex tex="u,\ u',\ v,\ v'" />, keeping <Katex tex="x^2+2" /> in brackets. Leave the denominator as <Katex tex="(x^2+2)^2" /> — don't expand it.</>,
    more: (
      <>
        These are the two slips the report names. First, <Katex tex="(x^2+2)^2" /> is not{' '}
        <Katex tex="x^4+4" />: squaring a sum gives a middle term, so it is{' '}
        <Katex tex="x^4+4x^2+4" />. Second, <Katex tex="vu'" /> must be written with brackets, as{' '}
        <Katex tex="-\sin(x)(x^2+2)" />; written as <Katex tex="x^2+2\times-\sin(x)" /> it
        means <Katex tex="x^2-2\sin(x)" />, which is a different expression. Any equivalent
        form, such as{' '}
        <Katex tex="-\dfrac{(x^2+2)\sin(x)+2x\cos(x)}{(x^2+2)^2}" />, scores full marks.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="u = x^2, \quad v = e^{5x}" />,
    reason: <><Katex tex="f(x)" /> is <Katex tex="x^2" /> times <Katex tex="e^{5x}" />, so use the product rule. Name the two factors <Katex tex="u" /> and <Katex tex="v" />.</>,
  },
  {
    working: <Katex display tex="u' = 2x, \quad v' = 5e^{5x}" />,
    reason: <>Power rule for <Katex tex="u" />. Chain rule for <Katex tex="v" />: the derivative of <Katex tex="e^{kx}" /> is <Katex tex="ke^{kx}" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = 2xe^{5x}+5x^2e^{5x}" />,
    reason: <>Product rule <Katex tex="u'v+uv'" /> (formula sheet): two terms, added.</>,
    more: (
      <>
        The report's common wrong answer <Katex tex="10xe^{5x}" /> most likely comes from multiplying the
        two derivatives together, <Katex tex="2x\times5e^{5x}" />. The derivative of a product
        is not the product of the derivatives: each term differentiates one factor and leaves
        the other alone, and the two terms are added.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(1) = 2e^5+5e^5" />,
    reason: <>Substitute <Katex tex="x=1" />. "Evaluate" asks for a value, so stopping at <Katex tex="f'(x)" /> does not answer the question.</>,  },
  {
    working: <Katex display tex="\boxed{f'(1) = 7e^5}" />,
    reason: <>Collect like terms. Leave it exact — this is the technology-free exam.</>,
    more: <>Check: <Katex tex="e^5\approx148" />, so <Katex tex="7e^5\approx1039" />. Large and positive, which fits a function growing like <Katex tex="e^{5x}" />.</>,
  },
]

export default function MethodsQ1_2016Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Quotient Rule"
        marks={2}
        statement={
          <>
            Let <Katex tex="y=\dfrac{\cos(x)}{x^2+2}" />. Find <Katex tex="\dfrac{dy}{dx}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Leave the denominator factorised">
          <p>
            After a quotient rule the denominator is always{' '}
            <Katex tex="\bigl(\text{original denominator}\bigr)^2" />. There is nothing to
            gain from expanding it, and two things to lose: time, and the mark if the
            expansion goes wrong.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Product Rule"
        marks={2}
        statement={
          <>
            Let <Katex tex="f(x)=x^2e^{5x}" />. Evaluate <Katex tex="f'(1)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
