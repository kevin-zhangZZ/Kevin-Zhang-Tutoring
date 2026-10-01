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
    reason: <><Katex tex="y" /> is <Katex tex="3x" /> multiplied by <Katex tex="e^{2x}" />: two functions of <Katex tex="x" /> multiplied together, so use the product rule <Katex tex="(uv)'=u'v+uv'" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} u&=3x, & u'&=3 \\ v&=e^{2x}, & v'&=2e^{2x} \end{aligned}" />,
    reason: <>Differentiate each factor on its own first. For <Katex tex="e^{2x}" />, use <Katex tex="\tfrac{d}{dx}e^{kx}=ke^{kx}" /> (the chain rule), which brings down the 2.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 3e^{2x}+3x\cdot2e^{2x}" />,
    reason: <>Substitute into <Katex tex="u'v+uv'" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = 6xe^{2x}+3e^{2x}}" />,
    reason: <>Carry out the multiplication <Katex tex="3x\times2=6x" />: the report calls leaving <Katex tex="3x2e^{2x}" /> unmultiplied an incomplete answer. Factorising to <Katex tex="3e^{2x}(2x+1)" /> is correct but not required, and the report warns that a wrong factorisation written after a correct answer still loses the mark. If you factorise, expand it back to check.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{\cos(x)}{e^x}" />,
    reason: <>One function divided by another, so use the quotient rule <Katex tex="\left(\tfrac{u}{v}\right)'=\tfrac{u'v-uv'}{v^2}" />. (Writing <Katex tex="f(x)=e^{-x}\cos(x)" /> and using the product rule works just as well.)</>,
  },
  {
    working: <Katex display tex="\begin{aligned} u&=\cos(x), & u'&=-\sin(x) \\ v&=e^x, & v'&=e^x \end{aligned}" />,
    reason: <>Differentiate the top and the bottom separately first.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{-\sin(x)\cdot e^x-\cos(x)\cdot e^x}{\left(e^x\right)^2}" />,
    reason: <>Substitute into <Katex tex="\tfrac{u'v-uv'}{v^2}" />. Both terms on top come out negative: the first because the derivative of <Katex tex="\cos(x)" /> is <Katex tex="-\sin(x)" />, the second from the minus sign in the rule.</>,
  },
  {
    working: <Katex display tex="= \frac{-e^x\bigl(\sin(x)+\cos(x)\bigr)}{e^{2x}}" />,
    reason: <>Both terms on top contain <Katex tex="e^x" />, so take out <Katex tex="-e^x" /> as a common factor. On the bottom, <Katex tex="(e^x)^2=e^{2x}" /> by index laws.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = -\frac{\sin(x)+\cos(x)}{e^x}}" />,
    reason: <>&ldquo;Simplify&rdquo; here means cancel the common factor <Katex tex="e^x" />: <Katex tex="\tfrac{e^x}{e^{2x}}=\tfrac{1}{e^x}" />. You can only cancel a factor of the <em>whole</em> numerator, which is why we factorised first. The report notes some students cancelled only one of the <Katex tex="e^x" /> terms; cancelling from one term of a sum is not allowed. Equivalently, <Katex tex="f'(x)=-e^{-x}\bigl(\sin(x)+\cos(x)\bigr)" />.</>,
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
