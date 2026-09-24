// 2015 Mathematical Methods (CAS) — Exam 1, Question 7 (5 marks).
// A logarithm equation, then an exponential equation that becomes a hidden quadratic.
// Question text transcribed from the original paper (no diagram given). Answers checked
// with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [16, 19, 65],
  average: 1.5,
  comment: <>Many students correctly applied logarithm laws, but others incorrectly cancelled logarithms.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [49, 5, 10, 36],
  average: 1.3,
  comment: (
    <>
      This question was not answered well. Many students were unable to create the quadratic
      equation evolved from manipulating <Katex tex="e^{-t}" />. Many students solved via the
      quadratic formula rather than using simpler factorising techniques. The feasibility of
      only one answer was generally well handled.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\log_2(6-x)-\log_2(4-x) = \log_2\!\left(\frac{6-x}{4-x}\right)" />,
    reason: <>Subtracting logs of the same base means dividing. "Cancelling" the logs term by term — the report's flagged error — is not a law.</>,
  },
  {
    working: <Katex display tex="\log_2\!\left(\frac{6-x}{4-x}\right) = 2 \implies \frac{6-x}{4-x} = 2^2" />,
    reason: <>The definition of a logarithm.</>,
  },
  {
    working: <Katex display tex="6-x = 4(4-x) = 16-4x" />,
    reason: <>Multiplying through by <Katex tex="4-x" />, which is positive since <Katex tex="x<4" />.</>,
  },
  {
    working: <Katex display tex="3x = 10 \implies \boxed{x = \frac{10}{3}}" />,
    reason: <>And <Katex tex="\tfrac{10}{3}\approx3.33<4" />, so both logarithms are defined ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="3e^t = 5+8e^{-t}" />,
    reason: <>Two different powers of <Katex tex="e" /> — multiply through by <Katex tex="e^t" /> to get them all the same way up.</>,
  },
  {
    working: <Katex display tex="3e^{2t}-5e^t-8 = 0" />,
    reason: <>Since <Katex tex="e^t\cdot e^{-t}=1" />. This is a quadratic in <Katex tex="e^t" />, which is the step the report says many students missed.</>,
  },
  {
    working: <Katex display tex="\text{let } a = e^t: \quad 3a^2-5a-8 = 0" />,
    reason: <>A pronumeral makes the structure visible.</>,
  },
  {
    working: <Katex display tex="(a+1)(3a-8) = 0 \implies a = -1 \text{ or } a = \frac83" />,
    reason: <>Factorising beats the quadratic formula here — the report notes students reaching for the formula unnecessarily.</>,
  },
  {
    working: <Katex display tex="e^t = -1 \text{ is impossible}" />,
    reason: <>An exponential is always positive. That rejection is worth a mark.</>,
  },
  {
    working: <Katex display tex="\boxed{t = \log_e\!\left(\frac83\right)}" />,
    reason: <>Check: <Katex tex="e^t=\tfrac83" /> and <Katex tex="e^{-t}=\tfrac38" />, so <Katex tex="3\times\tfrac83=8" /> and <Katex tex="5+8\times\tfrac38=8" /> ✓.</>,
  },
]

export default function MethodsQ7_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (5 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Log Equation"
        marks={2}
        statement={
          <>
            Solve <Katex tex="\log_2(6-x)-\log_2(4-x)=2" /> for <Katex tex="x" />, where{' '}
            <Katex tex="x<4" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Exponential Equation"
        marks={3}
        statement={
          <>
            Solve <Katex tex="3e^t=5+8e^{-t}" /> for <Katex tex="t" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="Spotting a hidden quadratic">
          <p>
            An equation with <Katex tex="e^{t}" /> and <Katex tex="e^{-t}" /> in it is
            almost always a quadratic in disguise. Multiply through by{' '}
            <Katex tex="e^{t}" /> — the negative power disappears, the constant becomes a
            linear term, and you are left with{' '}
            <Katex tex="3a^2-5a-8=0" /> where <Katex tex="a=e^{t}" />.
          </p>
          <p>
            The same move works for <Katex tex="4^x" /> and <Katex tex="2^x" />, for{' '}
            <Katex tex="\sin^2" /> and <Katex tex="\sin" />, and anywhere else two powers of
            the same base appear.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
