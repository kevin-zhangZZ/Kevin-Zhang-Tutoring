// 2020 Mathematical Methods — Exam 1, Question 1 (3 marks). A product rule, then a chain
// rule on an exponential evaluated at a point. Question text transcribed from the original
// paper (no diagram given). Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [14, 86],
  average: 0.9,
  comment: <>This question was well answered. Most students competently and confidently applied the product rule.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [20, 21, 60],
  average: 1.4,
  comment: (
    <>
      Students applied the chain rule; however, too often the lack of brackets resulted in an
      incorrect answer: for example,{' '}
      <Katex tex="2x-1e^{x^2-x+3}" /> instead of{' '}
      <Katex tex="(2x-1)e^{x^2-x+3}" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = x^2\sin(x)" />,
    reason: <>A product, so the product rule.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = 2x\sin(x)+x^2\cos(x)}" />,
    reason: <><Katex tex="u'v+uv'" /> with <Katex tex="u=x^2" /> and <Katex tex="v=\sin(x)" />. No factorising is needed.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = e^{x^2-x+3}" />,
    reason: <>An exponential of a function, so the chain rule: the derivative of the index multiplies the whole thing.</>,
  },
  {
    working: <Katex display tex="f'(x) = (2x-1)e^{x^2-x+3}" />,
    reason: <>The brackets around <Katex tex="2x-1" /> are essential — without them the report notes the answer reads as <Katex tex="2x-1e^{\ldots}" />.</>,
  },
  {
    working: <Katex display tex="f'(1) = (2-1)e^{1-1+3}" />,
    reason: <>Substituting <Katex tex="x=1" />. The index collapses neatly.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(1) = e^3}" />,
    reason: <>An exact value, as Exam 1 requires.</>,
  },
]

export default function MethodsQ1_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (3 marks)</p>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={<>Let <Katex tex="y=x^2\sin(x)" />. Find <Katex tex="\tfrac{dy}{dx}" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Evaluate <Katex tex="f'(1)" />, where <Katex tex="f:R\to R" />,{' '}
            <Katex tex="f(x)=e^{x^2-x+3}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
