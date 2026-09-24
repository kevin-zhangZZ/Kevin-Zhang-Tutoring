// 2017 Mathematical Methods — Exam 1, Question 1 (4 marks).
// Quotient rule on x/(x+2), then the chain rule on (2 - x³)³. Question text transcribed
// from the original paper (no diagram given). Answers verified with sympy. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [12, 19, 69],
  average: 1.3,
  comment: (
    <>
      This question was well handled. Students choosing to use the quotient rule tended to
      progress better than those using the product rule. Some very poor algebraic slips were
      made. The most common was cancelling <Katex tex="x+2" /> in the numerator with{' '}
      <Katex tex="x+2" /> in the denominator. Others unnecessarily expanded{' '}
      <Katex tex="(x+2)^2" /> and did so incorrectly.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [14, 21, 66],
  average: 1.1,
  comment: (
    <>
      Students competently applied the chain rule; however, some erred with the derivative of{' '}
      <Katex tex="(2-x^3)^3" />, especially with negatives. Some students opted unnecessarily
      to take the longer route by (often incorrectly) expanding the rule given by{' '}
      <Katex tex="g" />. Others forgot to evaluate <Katex tex="g'(1)" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \frac{(x+2)\times 1 - x\times 1}{(x+2)^2}" />,
    reason: (
      <>
        Quotient rule with <Katex tex="u=x" /> and <Katex tex="v=x+2" />, so{' '}
        <Katex tex="u'=1" /> and <Katex tex="v'=1" />. Both derivatives being{' '}
        <Katex tex="1" /> is what makes this one quick.
      </>
    ),
  },
  {
    working: <Katex display tex="= \frac{x+2-x}{(x+2)^2}" />,
    reason: <>Expanding the numerator only. Leave the denominator factorised — expanding it is the extra work the report warns about.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{2}{(x+2)^2}}" />,
    reason: (
      <>
        Positive everywhere on <Katex tex="(-2,\infty)" />, which matches the shape: this is a
        hyperbola <Katex tex="y=1-\tfrac{2}{x+2}" /> rising towards the asymptote{' '}
        <Katex tex="y=1" />.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = 3(2-x^3)^2 \times (-3x^2)" />,
    reason: <>Chain rule: bring the power down, keep the inside, times the derivative of the inside. The derivative of <Katex tex="2-x^3" /> is <Katex tex="-3x^2" />, and the minus is where marks were lost.</>,
  },
  {
    working: <Katex display tex="= -9x^2(2-x^3)^2" />,
    reason: <>Tidying <Katex tex="3\times(-3)=-9" />.</>,
  },
  {
    working: <Katex display tex="g'(1) = -9(1)^2\bigl(2-1\bigr)^2 = -9(1)(1)" />,
    reason: <>Now substitute. The report notes students who differentiated correctly and then forgot this last step.</>,
  },
  {
    working: <Katex display tex="\boxed{g'(1) = -9}" />,
    reason: <>Negative, as expected: the inside, <Katex tex="2-x^3" />, is decreasing, and cubing keeps the order, so <Katex tex="g" /> is decreasing.</>,
  },
]

export default function MethodsQ1_2017Exam1() {
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
            Let <Katex tex="f:(-2,\infty)\to R" />, <Katex tex="f(x)=\dfrac{x}{x+2}" />.
            Differentiate <Katex tex="f" /> with respect to <Katex tex="x" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Quotient rule or product rule?">
          <p>
            Both work. The quotient rule applies directly; the product rule needs{' '}
            <Katex tex="f(x)=x(x+2)^{-1}" /> and then a chain rule on the second factor, and
            the negative index is where slips creep in. The report says as much — students who
            used the quotient rule fared better.
          </p>
          <p>
            <Katex tex="\dfrac{d}{dx}\!\left(\dfrac{u}{v}\right)=\dfrac{v\,u'-u\,v'}{v^2}" />{' '}
            — note the order in the numerator. Getting it backwards flips the sign of the whole
            answer.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Chain Rule"
        marks={2}
        statement={
          <>
            Let <Katex tex="g(x)=(2-x^3)^3" />. Evaluate <Katex tex="g'(1)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
