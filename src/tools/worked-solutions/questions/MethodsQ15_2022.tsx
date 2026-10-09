// 2022 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 88% correct.
// The maximal domain of a square root of a quadratic. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 5, C: 3, D: 2, E: 88 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\sqrt{u} \text{ needs } u \ge 0 \implies x^2-2x-3 \ge 0" />,
    reason: <>The maximal domain is every <Katex tex="x" /> for which the rule gives a real number. The square root of a negative number is not real, but <Katex tex="\sqrt0=0" /> is fine — so the condition is <Katex tex="\ge 0" />, not <Katex tex=">0" />, and the endpoints will be included.</>,
    more: <>Compare a logarithm, which needs its argument strictly positive, so there the endpoints are excluded. For a square root, check the brackets in the options as well as the numbers.</>,
  },
  {
    working: <Katex display tex="x^2-2x-3 = (x-3)(x+1)" />,
    reason: <>Factorising: <Katex tex="-3" /> and <Katex tex="1" /> multiply to <Katex tex="-3" /> and add to <Katex tex="-2" />. So the roots are <Katex tex="x=3" /> and <Katex tex="x=-1" />.</>,
  },
  {
    working: <Katex display tex="(x-3)(x+1) \ge 0 \iff x \le -1 \text{ or } x \ge 3" />,
    reason: <><Katex tex="y=x^2-2x-3" /> is an upright parabola (positive <Katex tex="x^2" /> coefficient) crossing the <Katex tex="x" />-axis at <Katex tex="-1" /> and <Katex tex="3" />, so it is on or above the axis outside the roots and below it between them.</>,
    more: <>Check with a test point between the roots, <Katex tex="x=0" />: <Katex tex="0^2-2(0)-3=-3<0" />, so the middle is excluded.</>,
  },
  {
    working: <Katex display tex="\boxed{(-\infty,-1]\cup[3,\infty)}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: <>Option A ignores the square root's restriction altogether. Option C is the region <em>between</em> the roots, where the quadratic is negative. Options B and D use <Katex tex="-3" /> and <Katex tex="1" />, the roots of <Katex tex="(x+3)(x-1)=x^2+2x-3" /> — a sign slip in the factorising. Each also has a second error: B uses round brackets, so even with the right roots it would leave out the endpoints, where <Katex tex="f(x)=\sqrt0=0" /> is defined; D takes the region between its roots.</>,
  },
]

export default function MethodsQ15_2022() {
  return (
    <MCQShell
      question={
        <p>
          The maximal domain of the function with rule{' '}
          <Katex tex="f(x)=\sqrt{x^2-2x-3}" /> is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(-\infty,\infty)" /> },
        { letter: 'B', content: <Katex tex="(-\infty,-3)\cup(1,\infty)" /> },
        { letter: 'C', content: <Katex tex="(-1,3)" /> },
        { letter: 'D', content: <Katex tex="[-3,1]" /> },
        { letter: 'E', content: <Katex tex="(-\infty,-1]\cup[3,\infty)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
