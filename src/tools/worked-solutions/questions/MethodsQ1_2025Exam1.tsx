// 2025 Mathematical Methods — Exam 1 Question 1 (3 marks). A product rule, then a chain
// rule on a square root evaluated at a point. Question text transcribed from the original
// paper. Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

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
    reason: <>Two functions of <Katex tex="x" /> multiplied together, so the product rule: <Katex tex="\dfrac{dy}{dx}=\dfrac{du}{dx}v+u\dfrac{dv}{dx}" />.</>,
  },
  {
    working: <Katex display tex="\frac{du}{dx} = 2x, \qquad \frac{dv}{dx} = -\sin(x)" />,
    reason: <>Differentiate each factor on its own. The derivative of <Katex tex="\cos(x)" /> is <em>negative</em> <Katex tex="\sin(x)" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 2x\cos(x)+x^2\bigl(-\sin(x)\bigr)" />,
    reason: <>Substitute into the product rule, keeping <Katex tex="-\sin(x)" /> in brackets so the sign is unambiguous.</>,
    more: <>The report notes some students did not use brackets around terms, so a line like <Katex tex="2x\cos(x)+x^2-\sin(x)" /> could be misread as <Katex tex="x^2" /> minus <Katex tex="\sin(x)" />, a different expression.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = 2x\cos(x)-x^2\sin(x)}" />,
    reason: <>Tidy <Katex tex="+\,x^2\bigl(-\sin(x)\bigr)" /> to <Katex tex="-\,x^2\sin(x)" /> for the final answer.</>,
    more: <>The report notes many students left <Katex tex="2x\cos(x)+-x^2\sin(x)" /> untidied. Factorising to <Katex tex="x\bigl(2\cos(x)-x\sin(x)\bigr)" /> is also correct, but was not required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 6\sqrt{x+1}+5 = 6(x+1)^{1/2}+5" />,
    reason: <>Write the square root as a power of <Katex tex="\tfrac12" /> so the power rule can be used.</>,
    more: <>The report notes some students did not identify the initial power of <Katex tex="(x+1)" /> as <Katex tex="\tfrac12" />. A square root is always the power <Katex tex="\tfrac12" />; a cube root would be <Katex tex="\tfrac13" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = 6\times\tfrac12(x+1)^{-1/2}\times1 = 3(x+1)^{-1/2}" />,
    reason: <>Chain rule: bring down the power, subtract 1, then multiply by the derivative of the inside <Katex tex="x+1" />, which is 1. The constant 5 differentiates to 0.</>,
    more: <>Written as a fraction this is <Katex tex="f'(x)=\dfrac{3}{\sqrt{x+1}}" />. The report notes some students omitted the numerator: the 6 in front and the <Katex tex="\tfrac12" /> brought down both stay, giving 3 on top.</>,
  },
  {
    working: <Katex display tex="f'(8) = 3(8+1)^{-1/2} =\frac{3}{\sqrt{9}} = \frac33" />,
    reason: <>The gradient of the tangent at <Katex tex="x=8" /> is <Katex tex="f'(8)" />. A negative power means one over: <Katex tex="9^{-1/2}=\tfrac{1}{\sqrt9}" />, and <Katex tex="\sqrt9=3" />.</>,
    more: <>The symbol <Katex tex="\sqrt{9}" /> means the positive square root only, so it is 3, not <Katex tex="\pm3" />. The report notes some students thought it was <Katex tex="\pm3" />, leading to an incorrect answer of <Katex tex="\pm1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{gradient} = 1}" />,
    reason: <>The question asks only for the gradient, so stop here.</>,
    more: <>The report notes some students went on to find the equation of the tangent line, which was not asked for. Read the question for exactly what is required.</>,
  },
]

export default function MethodsQ1_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (3 marks)</p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Two standard derivatives. In part a. the function is a product of two functions
              of <Katex tex="x" />, so it needs the product rule; in part b. a function of{' '}
              <Katex tex="x+1" /> sits inside a square root, so it needs the chain rule, and then the
              derivative is evaluated at <Katex tex="x=8" />. Watch the signs and brackets, and give
              exactly what is asked.
            </p>
          </Background>
        </div>
      </DetailOnly>

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
