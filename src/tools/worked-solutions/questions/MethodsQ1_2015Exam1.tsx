// 2015 Mathematical Methods (CAS) — Exam 1, Question 1 (4 marks).
// A chain rule, then a quotient rule with a logarithm. Question text transcribed from the
// original paper (no diagram given). Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: <>Most students correctly applied the chain rule. The most common errors were arithmetical.</>,
}

const EXAM_BI: SAExaminerStats = {
  marks: [10, 18, 72],
  average: 1.6,
  comment: (
    <>
      The majority of students used the quotient rule and this was the most direct method.
      Many students experienced difficulty in simplifying their derived expressions, to the
      point where some final answers involved fractions within a fraction.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [32, 68],
  average: 0.7,
  comment: (
    <>
      This question was well handled. However, some students who correctly identified the
      required derivative in Question 1b.i. could not evaluate{' '}
      <Katex tex="2\log_e(1)=2(0)=0" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dy}{dx} = 7(5x+1)^6\times5" />,
    reason: <>Chain rule: power down, power reduced by one, times the derivative of the inside.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = 35(5x+1)^6}" />,
    reason: <>Leave it factorised — expanding a sixth power gains nothing and loses time.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="u = \log_e(x), \quad v = x^2 \implies u' = \frac1x, \quad v' = 2x" />,
    reason: <>Quotient rule. The product rule on <Katex tex="\log_e(x)\cdot x^{-2}" /> also works but leaves negative indices to tidy.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{x^2\cdot\frac1x-\log_e(x)\cdot2x}{x^4}" />,
    reason: <>Bottom times derivative of top, minus top times derivative of bottom, all over the bottom squared.</>,
  },
  {
    working: <Katex display tex="= \frac{x-2x\log_e(x)}{x^4} = \frac{x\bigl(1-2\log_e(x)\bigr)}{x^4}" />,
    reason: <>Take out the common factor of <Katex tex="x" /> in the numerator. Without this, the answer stays a fraction inside a fraction — the report's main complaint.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{1-2\log_e(x)}{x^3}}" />,
    reason: <>One factor of <Katex tex="x" /> cancels.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="f'(1) = \frac{1-2\log_e(1)}{1^3}" />,
    reason: <>Substituting.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(1) = 1}" />,
    reason: <>Since <Katex tex="\log_e(1)=0" />. Positive, as expected: <Katex tex="\tfrac{\log_e x}{x^2}" /> is still rising at <Katex tex="x=1" />.</>,
  },
]

export default function MethodsQ1_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Let <Katex tex="y=(5x+1)^7" />. Find <Katex tex="\dfrac{dy}{dx}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        marks={2}
        statement={
          <>
            Let <Katex tex="f(x)=\dfrac{\log_e(x)}{x^2}" />. Find <Katex tex="f'(x)" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard letter="b.ii" marks={1} statement={<>Evaluate <Katex tex="f'(1)" />.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
      </PartCard>
    </div>
  )
}
