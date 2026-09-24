// 2014 Mathematical Methods (CAS) — Exam 1, Question 1 (5 marks). A product rule, then a
// chain rule on a square root evaluated at a point. Question text transcribed from the
// original paper (no diagram given). Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [8, 4, 88],
  average: 1.8,
  comment: (
    <>
      Although this question was generally very well handled, some students made errors in an
      attempt to factorise, which was not necessary.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [10, 16, 18, 55],
  average: 2.2,
  comment: (
    <>
      Many students only gave the expression for <Katex tex="f'(x)" />, not the specific value
      of <Katex tex="f'(1)" />. Students should also note that{' '}
      <Katex tex="\tfrac{1}{\sqrt4}\ne\pm\tfrac12" />, <Katex tex="\tfrac{1}{\sqrt4}=\tfrac12" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = x^2\sin(x)" />,
    reason: <>A product of <Katex tex="x^2" /> and <Katex tex="\sin(x)" />, so the product rule.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 2x\sin(x)+x^2\cos(x)" />,
    reason: <><Katex tex="u'v+uv'" /> with <Katex tex="u=x^2" /> and <Katex tex="v=\sin(x)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = x^2\cos(x)+2x\sin(x)}" />,
    reason: <>Leave it here. Factorising to <Katex tex="x\bigl(x\cos x+2\sin x\bigr)" /> is not required, and the report notes it caused errors.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \sqrt{x^2+3} = \left(x^2+3\right)^{1/2}" />,
    reason: <>Index form makes the chain rule mechanical.</>,
  },
  {
    working: <Katex display tex="f'(x) = \tfrac12\left(x^2+3\right)^{-1/2}\times 2x" />,
    reason: <>Chain rule: the derivative of the inside, <Katex tex="2x" />, multiplies through.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{x}{\sqrt{x^2+3}}" />,
    reason: <>The 2 and the <Katex tex="\tfrac12" /> cancel.</>,
  },
  {
    working: <Katex display tex="f'(1) = \frac{1}{\sqrt{1+3}} = \frac{1}{\sqrt4}" />,
    reason: <>The question asks for a <em>value</em>, not the rule — the report says many students stopped one line too early.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(1) = \tfrac12}" />,
    reason: <><Katex tex="\sqrt4" /> means the positive square root, 2, so the answer is <Katex tex="\tfrac12" /> — not <Katex tex="\pm\tfrac12" />, which the report specifically warns against. Sanity check: <Katex tex="\sqrt{x^2+3}" /> is increasing gently at <Katex tex="x=1" />, and <Katex tex="\tfrac12" /> is a gentle positive slope ✓.</>,
  },
]

export default function MethodsQ1_2014Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (5 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Product Rule"
        marks={2}
        statement={<>If <Katex tex="y=x^2\sin(x)" />, find <Katex tex="\tfrac{dy}{dx}" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Chain Rule"
        marks={3}
        statement={<>If <Katex tex="f(x)=\sqrt{x^2+3}" />, find <Katex tex="f'(1)" />.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
