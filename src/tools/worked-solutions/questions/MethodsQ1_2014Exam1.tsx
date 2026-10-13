// 2014 Mathematical Methods (CAS) — Exam 1, Question 1 (5 marks). A product rule, then a
// chain rule on a square root evaluated at a point. Question text transcribed from the
// original paper (no diagram given). Answers checked with sympy and against the VCAA
// examination report. Solution is original. The report's 1b comment repeats "only gave" — a
// VCAA slip, kept verbatim.

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
      Many students only gave only gave the expression for <Katex tex="f'(x)" />, not the specific value
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
    reason: <><Katex tex="u'v+uv'" /> with <Katex tex="u=x^2" />, <Katex tex="u'=2x" /> and <Katex tex="v=\sin(x)" />, <Katex tex="v'=\cos(x)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = x^2\cos(x)+2x\sin(x)}" />,
    reason: <>Same answer with the terms in the usual order. Stop here: no factorising or simplifying is needed.</>,
    more: <>Factorising to <Katex tex="x\bigl(x\cos(x)+2\sin(x)\bigr)" /> is correct but not required, and the report notes some students made errors trying to do it. Unless a question asks for a particular form, the first correct expression earns the marks.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \sqrt{x^2+3} = \left(x^2+3\right)^{1/2}" />,
    reason: <>Rewrite the square root as a power of <Katex tex="\tfrac12" /> so the power rule can be used on the outside.</>,
  },
  {
    working: <Katex display tex="f'(x) = \tfrac12\left(x^2+3\right)^{-1/2}\times 2x" />,
    reason: <>Chain rule: power rule on the outside (bring down <Katex tex="\tfrac12" />, subtract 1), times the derivative of the inside <Katex tex="x^2+3" />, which is <Katex tex="2x" />.</>,
    more: <>Forgetting the <Katex tex="\times 2x" /> is the classic chain-rule slip — the report says this part was not as well handled as the product rule in part a. The chain rule written out in full: let <Katex tex="y=u^{1/2}" /> with <Katex tex="u=x^2+3" />, so <Katex tex="\tfrac{dy}{dx}=\tfrac{dy}{du}\times\tfrac{du}{dx}=\tfrac12u^{-1/2}\times2x" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{x}{\sqrt{x^2+3}}" />,
    reason: <>The 2 and the <Katex tex="\tfrac12" /> cancel, and a power of <Katex tex="-\tfrac12" /> means 1 over the square root.</>,
  },
  {
    working: <Katex display tex="f'(1) = \frac{1}{\sqrt{1+3}} = \frac{1}{\sqrt4}" />,
    reason: <>Substitute <Katex tex="x=1" />: the question asks for the <em>value</em> <Katex tex="f'(1)" />, not just the rule <Katex tex="f'(x)" />.</>,
    more: <>The report says many students only gave the expression for <Katex tex="f'(x)" />, not the specific value of <Katex tex="f'(1)" />. Stopping at the rule leaves the question unanswered. Underline what is being asked (here <Katex tex="f'(1)" />) and check your final line against it — the report's general comments recommend highlighting key components of a question.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(1) = \tfrac12}" />,
    reason: <><Katex tex="\sqrt4" /> means the positive square root, 2, so the answer is <Katex tex="\tfrac12" />, not <Katex tex="\pm\tfrac12" />.</>,
    more: <>The report specifically warns against <Katex tex="\pm\tfrac12" />. The <Katex tex="\pm" /> only appears when <em>solving</em> an equation like <Katex tex="y^2=4" />. Sanity check: for <Katex tex="x>0" /> the graph of <Katex tex="\sqrt{x^2+3}" /> is increasing, so a positive gradient at <Katex tex="x=1" /> makes sense ✓.</>,
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
