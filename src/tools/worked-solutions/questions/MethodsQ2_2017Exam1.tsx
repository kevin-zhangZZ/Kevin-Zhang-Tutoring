// 2017 Mathematical Methods — Exam 1, Question 2 (4 marks).
// Product rule on x·logₑ(3x), then integration by recognition — the "hence" that 36% of
// students missed entirely. Question text transcribed from the original paper (no diagram
// given). Answers verified with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [12, 31, 57],
  average: 1.1,
  comment: (
    <>
      Most students used the product rule; however, many erred with the derivative of{' '}
      <Katex tex="\log_e(3x)" />. Common incorrect answers were{' '}
      <Katex tex="\log_e(3x)+3" /> and <Katex tex="\log_e(3x)+\tfrac13" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [36, 19, 45],
  average: 0.7,
  comment: (
    <>
      Students generally were not able to form an integral from their previous answer,
      ignoring the "hence" instruction. Some students attempted to integrate the given
      expression. Some poor application of log laws and/or log notation was observed.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = x\log_e(3x)" />,
    reason: <>A product: <Katex tex="u=x" /> and <Katex tex="v=\log_e(3x)" />.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\log_e(3x) = \frac{1}{3x}\times 3 = \frac{1}{x}" />,
    reason: (
      <>
        Chain rule on the log. The <Katex tex="3" /> from the inside cancels the{' '}
        <Katex tex="3" /> in the denominator. The report's two common wrong answers each keep
        only one of those threes: <Katex tex="+\tfrac13" /> uses <Katex tex="\tfrac{1}{3x}" />{' '}
        without the chain-rule factor, and <Katex tex="+3" /> multiplies by <Katex tex="3" />{' '}
        but drops the <Katex tex="3" /> underneath. Equivalently{' '}
        <Katex tex="\log_e(3x)=\log_e(3)+\log_e(x)" />, and the constant differentiates away.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 1\times\log_e(3x) + x\times\frac{1}{x}" />,
    reason: <>Product rule, <Katex tex="u'v+uv'" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \log_e(3x) + 1}" />,
    reason: <>This is exactly the integrand of part (b) — which is the whole point of the question.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\int_1^2\bigl(\log_e(3x)+1\bigr)dx = \Bigl[x\log_e(3x)\Bigr]_1^2" />,
    reason: <>Part (a) showed that <Katex tex="x\log_e(3x)" /> differentiates to the integrand, so it is an antiderivative. That is the "hence" — no integration technique is needed at all.</>,
  },
  {
    working: <Katex display tex="= 2\log_e(6) - 1\log_e(3)" />,
    reason: <>Substituting the terminals: <Katex tex="3\times2=6" /> at the top and <Katex tex="3\times1=3" /> at the bottom.</>,
  },
  {
    working: <Katex display tex="= \log_e(6^2) - \log_e(3) = \log_e\!\left(\frac{36}{3}\right)" />,
    reason: <>Pull the <Katex tex="2" /> up as a power, then subtract logs by dividing.</>,
  },
  {
    working: <Katex display tex="\boxed{\log_e(12)}" />,
    reason: <>So <Katex tex="a=12" />, a positive integer as required. As a sanity check, <Katex tex="\log_e(12)\approx2.48" />, and the integrand runs from <Katex tex="\log_e(3)+1\approx2.10" /> to <Katex tex="\log_e(6)+1\approx2.79" /> over an interval of width <Katex tex="1" /> — so an answer near <Katex tex="2.5" /> is right.</>,
  },
]

export default function MethodsQ2_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (4 marks)</p>
        <p>
          Let <Katex tex="y = x\log_e(3x)" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Product Rule"
        marks={2}
        statement={
          <>
            Find <Katex tex="\dfrac{dy}{dx}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Integral Recognition"
        marks={2}
        statement={
          <>
            Hence, calculate <Katex tex="\displaystyle\int_1^2\bigl(\log_e(3x)+1\bigr)dx" />.
            Express your answer in the form <Katex tex="\log_e(a)" />, where <Katex tex="a" />{' '}
            is a positive integer.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="What “hence” is asking for">
          <p>
            This is <em>integration by recognition</em>. The integrand{' '}
            <Katex tex="\log_e(3x)+1" /> has no antiderivative you can write down by the rules
            on the formula sheet — but part (a) just showed it <em>is</em> the derivative of
            something, and that something is the antiderivative.
          </p>
          <p>
            Whenever an exam question differentiates something in one part and integrates
            something similar in the next, the answer to the first part is the tool for the
            second. The report says students generally did not form the integral from their
            previous answer, and over a third scored zero here.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
