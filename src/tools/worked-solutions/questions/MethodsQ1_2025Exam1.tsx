// 2025 Mathematical Methods — Exam 1 Question 1 (3 marks). A product rule, then a chain
// rule on a square root evaluated at a point. Question text transcribed from the original
// paper. Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [12, 88],
  average: 0.9,
  comment: (
    <>
      This question was well attempted and required students to use the product rule to find the
      derivative. Many students did not tidy up the negative signs in their answer and left their
      answer as <Katex tex="2x\cos(x)+-x^2\sin(x)" /> or <Katex tex="2x\cos(x)+x^2-\sin(x)" />.
      Some students did not use brackets around terms, which meant that these presentations had
      the potential to be misinterpreted. Although not required, some students decided to
      factorise their answer and take <Katex tex="x" /> out as a common factor.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [18, 21, 61],
  average: 1.5,
  comment: (
    <>
      This question was well attempted and required students to use the chain rule to find the
      derivative, then evaluate the derivative at <Katex tex="x=8" />. Some students did not
      correctly execute the chain rule and omitted the numerator. Some students did not correctly
      identify the initial power of the <Katex tex="(x+1)" /> term as{' '}
      <Katex tex="\dfrac{1}{2}" />. Some students incorrectly thought{' '}
      <Katex tex="\sqrt{9}=\pm3" />, leading to an incorrect answer of <Katex tex="\pm1" />. A
      correct answer must emerge from correct working. Some students proceeded further to find
      the equation of the tangent line instead of only finding the gradient of the tangent at{' '}
      <Katex tex="x=8" />, as required. Students are reminded to carefully read the question and
      answer what is required.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = x^2\cos(x) = u v \ \text{ with } u = x^2, \ v = \cos(x)" />,
    reason: <>A product of two functions of x, so the product rule.</>,
  },
  {
    working: <Katex display tex="\frac{du}{dx} = 2x, \qquad \frac{dv}{dx} = -\sin(x)" />,
    reason: <>The derivative of <Katex tex="\cos" /> is <em>negative</em> sine — the sign that has to survive to the end.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 2x\cos(x)+x^2\bigl(-\sin(x)\bigr)" />,
    reason: <>Brackets around the second factor keep the sign unambiguous while the line is being written.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = 2x\cos(x)-x^2\sin(x)}" />,
    reason: <>Tidying the double negative. Factorising to <Katex tex="x\bigl(2\cos(x)-x\sin(x)\bigr)" /> is fine but was not required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 6\sqrt{x+1}+5 = 6(x+1)^{1/2}+5" />,
    reason: <>Writing the root as a power first. The initial index is <Katex tex="\tfrac12" />, not 1 — the report notes some students did not identify it correctly.</>,
  },
  {
    working: <Katex display tex="f'(x) = 6\times\tfrac12(x+1)^{-1/2}\times1 = 3(x+1)^{-1/2}" />,
    reason: <>Chain rule; the inner derivative is 1. Equivalently <Katex tex="f'(x)=\dfrac{3}{\sqrt{x+1}}" /> — the numerator must not be dropped.</>,
  },
  {
    working: <Katex display tex="f'(8) = \frac{3}{\sqrt{9}} = \frac33" />,
    reason: <><Katex tex="8+1=9" />, a perfect square, and <Katex tex="\sqrt9=3" /> — not <Katex tex="\pm3" />, which the report notes led some students to <Katex tex="\pm1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{gradient} = 1}" />,
    reason: <>The gradient of the tangent, which is what was asked for — going on to find the tangent line itself answers a different question.</>,
  },
]

export default function MethodsQ1_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (3 marks)</p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Two standard derivatives, one each way. Presentation matters as well as method:
            brackets around <Katex tex="\bigl(-\sin(x)\bigr)" /> while you write
            the product rule, and a final answer tidied to{' '}
            <Katex tex="2x\cos(x)-x^2\sin(x)" /> rather than left with a stray double
            negative.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Product Rule"
        marks={1}
        statement={
          <>
            Let <Katex tex="y=x^2\cos(x)" />.
            <br />
            Find <Katex tex="\dfrac{dy}{dx}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Chain Rule"
        marks={2}
        statement={
          <>
            Let <Katex tex="f(x)=6\sqrt{x+1}+5" />.
            <br />
            Find the gradient of the tangent to{' '}
            <Katex tex="y=f(x)" /> at <Katex tex="x=8" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
