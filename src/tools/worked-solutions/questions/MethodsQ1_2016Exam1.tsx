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
    reason: <>Naming the two parts keeps the quotient rule tidy.</>,
  },
  {
    working: <Katex display tex="u' = -\sin(x), \quad v' = 2x" />,
    reason: <>Both straightforward.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{vu'-uv'}{v^2}" />,
    reason: <>The order matters: <em>bottom times derivative of top, minus top times derivative of bottom</em>. Swapping them flips the sign of everything.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{-\sin(x)(x^2+2)-2x\cos(x)}{(x^2+2)^2}}" />,
    reason: <>Leave the denominator as <Katex tex="(x^2+2)^2" />. Expanding it wastes time and, as the report notes, students who tried often wrote <Katex tex="x^4+4" />, which is wrong.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^2e^{5x}" />,
    reason: <>A product of <Katex tex="x^2" /> and <Katex tex="e^{5x}" />, so the product rule — with a chain rule on the exponential.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}e^{5x} = 5e^{5x}" />,
    reason: <>Chain rule on the index. Combining the two rules carelessly is what produced the report's common wrong answer <Katex tex="10xe^{5x}" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = 2xe^{5x}+5x^2e^{5x}" />,
    reason: <><Katex tex="u'v+uv'" /> with <Katex tex="u=x^2" /> and <Katex tex="v=e^{5x}" />.</>,
  },
  {
    working: <Katex display tex="f'(1) = 2e^5+5e^5" />,
    reason: <>Substituting. The question says "evaluate", so this last step is not optional — the report says many students found the derivative but did not evaluate it.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(1) = 7e^5}" />,
    reason: <>About <Katex tex="1039" />. Large and positive, which fits a function growing like <Katex tex="e^{5x}" />.</>,
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
            gain from expanding it, and two things to lose: time, and the mark — the report
            singles out students who expanded <Katex tex="(x^2+2)^2" /> as{' '}
            <Katex tex="x^4+4" />.
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
