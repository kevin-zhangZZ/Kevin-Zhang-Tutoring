// 2022 Mathematical Methods — Exam 1 Question 2 (4 marks). An antiderivative of a
// reciprocal-linear function, then a definite integral evaluated purely from two given
// integrals. Question text transcribed from the original paper. Answers checked with sympy
// and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [55, 45],
  average: 0.5,
  comment: (
    <>
      Incorrect answers of <Katex tex="3\log_e(2x-3)" /> and{' '}
      <Katex tex="6\log_e(2x-3)" /> were common. Some students treated the values in the
      domain as terminal values in a definite integral. It was fine to name the
      antiderivative <Katex tex="G(x)" /> or give it no name at all, but some students
      incorrectly labelled it <Katex tex="g'(x)" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [36, 19, 5, 40],
  average: 1.5,
  comment: (
    <>
      Some students incorrectly tried to expand the expression as a product of two
      integrals, while others erroneously substituted <Katex tex="\tfrac13" /> for{' '}
      <Katex tex="f(x)" /> and then arrived at an integral of constant terms. Brackets were
      commonly missing.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\int\frac{3}{2x-3}\,dx = 3\int\frac{1}{2x-3}\,dx" />,
    reason: 'Pull the constant out first so the standard form is visible.',
  },
  {
    working: <Katex display tex="\int\frac{1}{ax+b}\,dx = \frac{1}{a}\log_e|ax+b|+c, \quad a = 2" />,
    reason: <>Dividing by the inner coefficient is the step that produces the <Katex tex="\tfrac12" /> — leaving it out gives the report's <Katex tex="3\log_e(2x-3)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{3}{2}\log_e(2x-3)}" />,
    reason: <>The domain <Katex tex="\left(\tfrac32,\infty\right)" /> makes <Katex tex="2x-3>0" />, so no absolute value is needed — that is what the domain is there for, not to act as terminals.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)\bigl(2f(x)-3\bigr) = 2\bigl[f(x)\bigr]^2-3f(x)" />,
    reason: <>Expand <em>inside</em> the integral. An integral of a product is not the product of the integrals, which is the report's first named error.</>,
  },
  {
    working: <Katex display tex="\int_0^1\Bigl(2\bigl[f(x)\bigr]^2-3f(x)\Bigr)dx = 2\int_0^1\bigl[f(x)\bigr]^2dx-3\int_0^1 f(x)\,dx" />,
    reason: <>Linearity splits it into exactly the two integrals the question supplies. Note <Katex tex="f" /> itself is never needed — substituting <Katex tex="f(x)=\tfrac13" /> confuses the <em>value of an integral</em> with the function.</>,
  },
  {
    working: <Katex display tex="= 2\left(\frac15\right)-3\left(\frac13\right)" />,
    reason: 'Substituting the given values.',
  },
  {
    working: <Katex display tex="= \frac25-1 = \boxed{-\frac35}" />,
    reason: <>Negative, which is fine — a definite integral is a signed area.</>,
  },
]

export default function MethodsQ2_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Let <Katex tex="g:\left(\tfrac32,\infty\right)\to R" />,{' '}
            <Katex tex="g(x)=\dfrac{3}{2x-3}" />. Find the rule for an antiderivative of{' '}
            <Katex tex="g(x)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={3}
        statement={
          <>
            Evaluate <Katex tex="\displaystyle\int_0^1\Bigl(f(x)\bigl(2f(x)-3\bigr)\Bigr)dx" />
            , where <Katex tex="\displaystyle\int_0^1\bigl[f(x)\bigr]^2dx=\tfrac15" /> and{' '}
            <Katex tex="\displaystyle\int_0^1 f(x)\,dx=\tfrac13" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
