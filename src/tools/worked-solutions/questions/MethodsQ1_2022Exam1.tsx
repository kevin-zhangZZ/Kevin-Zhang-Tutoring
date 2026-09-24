// 2022 Mathematical Methods — Exam 1 Question 1 (3 marks). A product rule, then a quotient
// rule that simplifies. Question text transcribed from the original paper. Answers checked
// with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [35, 65],
  average: 0.7,
  comment: (
    <>
      This question was well attempted; however a number of students wrote{' '}
      <Katex tex="3x2e^{2x}+3e^{2x}" /> as their final answer. This was an incomplete answer, as
      the term <Katex tex="3x2e^{2x}" /> needed to be written as <Katex tex="6xe^{2x}" />. Some
      students did not use the product rule that was required. Many students chose to
      factorise their answer and in doing so factorised incorrectly. It is important to note
      that there was no requirement to express the answer in factorised form. If students
      further engage with their answer, and the final response is incorrect, even if a correct
      answer has been previously written, full marks cannot be awarded.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [9, 37, 53],
  average: 1.5,
  comment: (
    <>
      Students generally responded to this question well, applying either the product rule or
      quotient rule to obtain the derivative. Some students did not demonstrate an
      understanding of what was required to simplify the expression. Some students cancelled
      only one of the <Katex tex="e^x" /> terms.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = 3x\,e^{2x}" />,
    reason: <>A product of <Katex tex="3x" /> and <Katex tex="e^{2x}" />, so the product rule.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 3e^{2x}+3x\cdot2e^{2x}" />,
    reason: <>The chain rule supplies the 2 in <Katex tex="\tfrac{d}{dx}e^{2x}=2e^{2x}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = 6xe^{2x}+3e^{2x}}" />,
    reason: <>The multiplication <Katex tex="3x\times2" /> must actually be carried out — the report calls leaving it unmultiplied an incomplete answer. Factorising to <Katex tex="3e^{2x}(2x+1)" /> is fine but not required; the report notes many who factorised did so incorrectly.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{\cos(x)}{e^x}" />,
    reason: <>A quotient — though writing it as a product with <Katex tex="e^{-x}" /> works just as well.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{-\sin(x)\cdot e^x-\cos(x)\cdot e^x}{\left(e^x\right)^2}" />,
    reason: <>Quotient rule. Note <Katex tex="\tfrac{d}{dx}e^x=e^x" />, so the second term keeps its sign from the rule's minus.</>,
  },
  {
    working: <Katex display tex="= \frac{-e^x\bigl(\sin(x)+\cos(x)\bigr)}{e^{2x}}" />,
    reason: <>Factoring <Katex tex="-e^x" /> out of the numerator.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = -\frac{\sin(x)+\cos(x)}{e^x}}" />,
    reason: <>Both exponentials cancel down: <Katex tex="\tfrac{e^x}{e^{2x}}=\tfrac{1}{e^x}" />. The report notes some students cancelled only one. Equivalently <Katex tex="-e^{-x}\bigl(\sin x+\cos x\bigr)" />.</>,
  },
]

export default function MethodsQ1_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (3 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Product Rule"
        marks={1}
        statement={
          <>
            Let <Katex tex="y=3xe^{2x}" />.
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
        topic="Quotient Rule"
        marks={2}
        statement={
          <>
            Find and simplify the rule of <Katex tex="f'(x)" />, where{' '}
            <Katex tex="f:R\to R" />, <Katex tex="f(x)=\dfrac{\cos(x)}{e^x}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
