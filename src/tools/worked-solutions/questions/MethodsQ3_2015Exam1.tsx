// 2015 Mathematical Methods (CAS) — Exam 1, Question 3 (2 marks).
// A definite integral of x^(−1/2). Only 55% scored both marks — most wrong answers used a
// logarithm. Question text transcribed from the original paper (no diagram given). Answer
// checked with sympy and against the VCAA examination report. Solution is original.
// No lettered parts, so this uses the plain card layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, ReportShelf, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [38, 6, 55],
  average: 1.2,
  comment: (
    <>
      This question was not answered well. A range of incorrect antiderivatives were given,
      the majority of which involved the logarithm function.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1}{\sqrt x} = x^{-\frac12}" />,
    reason: <>Rewrite as a power first. The logarithm rule applies only to <Katex tex="x^{-1}" />, and this is <Katex tex="x^{-1/2}" /> — that distinction is the whole question.</>,
    more: <>A logarithm answer treats <Katex tex="\frac{1}{\sqrt x}" /> like <Katex tex="\frac1x" /> — for example
      writing <Katex tex="\log_e(\sqrt x)" />, which gives <Katex tex="\log_e 2" /> instead of <Katex tex="2" />. Differentiating
      exposes it: <Katex tex="\frac{d}{dx}\log_e(\sqrt x)=\frac{1}{2x}" />, not <Katex tex="\frac{1}{\sqrt x}" />.</>,
  },
  {
    working: <Katex display tex="\int x^{-\frac12}\,dx = \frac{x^{\frac12}}{\frac12}+c = 2\sqrt x+c" />,
    reason: <>Add one to the index and divide by the new index: <Katex tex="-\tfrac12+1=\tfrac12" />, and dividing by <Katex tex="\tfrac12" /> means multiplying by <Katex tex="2" />.</>,
    more: <>Check by differentiating back: <Katex tex="\frac{d}{dx}\bigl(2x^{\frac12}\bigr)=2\cdot\tfrac12x^{-\frac12}=\frac{1}{\sqrt x}" />, the
      original integrand.</>,
  },
  {
    working: <Katex display tex="\int_1^4 x^{-\frac12}\,dx = \Bigl[2\sqrt x\Bigr]_1^4 = 2(2)-2(1)" />,
    reason: <>Substitute the upper terminal, then subtract the lower: <Katex tex="\sqrt4=2" /> and <Katex tex="\sqrt1=1" />. The <Katex tex="+c" /> is dropped: it would cancel in the subtraction.</>,
  },
  {
    working: <Katex display tex="\boxed{2}" />,
    reason: <>Exact answer, as Exam 1 requires. Sensible size: the integrand stays between <Katex tex="\tfrac12" /> and <Katex tex="1" /> over a width of <Katex tex="3" />, so the area lies between <Katex tex="1.5" /> and <Katex tex="3" />.</>,
  },
]

export default function MethodsQ3_2015Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 3 (2 marks)" always>
        <p>
          Evaluate <Katex tex="\displaystyle\int_1^4\left(\frac{1}{\sqrt x}\right)dx" />.
        </p>
      </Background>
      <Background>
        <p>
          The power rule <Katex tex="\int x^n\,dx=\frac{x^{n+1}}{n+1}+c" /> works for every
          index except <Katex tex="n=-1" />, where it would divide by zero — that one case
          is <Katex tex="\int\frac1x\,dx=\log_e|x|+c" />.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <ReportShelf stats={EXAM} maxMarks={2} />
    </div>
  )
}
