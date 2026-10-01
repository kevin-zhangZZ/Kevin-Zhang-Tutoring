// 2021 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 70% correct.
// The maximal domain of a sum of two square roots. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 4, C: 7, D: 70, E: 3 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x+2 \ge 0 \implies x \ge -2" />,
    reason: <>Domain of <Katex tex="f(x)=\sqrt{x+2}" />. The maximal domain is every <Katex tex="x" /> the rule works for. A square root needs a non-negative argument. Use <Katex tex="\ge" />, not <Katex tex=">" />, because <Katex tex="\sqrt0=0" /> is allowed.</>,
  },
  {
    working: <Katex display tex="1-2x \ge 0 \implies -2x \ge -1 \implies x \le \tfrac12" />,
    reason: <>Same condition for <Katex tex="g(x)=\sqrt{1-2x}" />. Dividing both sides by <Katex tex="-2" /> flips the inequality sign.</>,
  },
  {
    working: <Katex display tex="\text{dom}(h) = [-2,\ \infty)\cap\left(-\infty,\ \tfrac12\right] = \left[-2,\ \tfrac12\right]" />,
    reason: <>To work out <Katex tex="h(x)=f(x)+g(x)" /> you need <em>both</em> <Katex tex="f(x)" /> and <Katex tex="g(x)" />, so the domain of a sum is the intersection (overlap) of the two domains: the <Katex tex="x" />-values with <Katex tex="x\ge-2" /> and also <Katex tex="x\le\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="h(-2) = 0+\sqrt5, \qquad h\!\left(\tfrac12\right) = \sqrt{\tfrac52}+0" />,
    reason: <>Both endpoints give real values, so both belong in the domain: square brackets at each end.</>,
  },
  {
    working: <Katex display tex="\boxed{\left[-2,\ \tfrac12\right]}" />,
    reason: <>Matches option <b>D</b>. Option A has the right endpoints but round brackets, which leaves out <Katex tex="x=-2" /> and <Katex tex="x=\tfrac12" />, where <Katex tex="h" /> is defined (previous row). Option B is the domain of <Katex tex="f" /> alone, and option C is exactly the set of <Katex tex="x" />-values where <Katex tex="h" /> is <em>not</em> defined.</>,
  },
]

export default function MethodsQ10_2021() {
  return (
    <MCQShell
      question={
        <p>
          Consider the functions <Katex tex="f(x)=\sqrt{x+2}" /> and{' '}
          <Katex tex="g(x)=\sqrt{1-2x}" />, defined over their maximal domains.
          <br />
          The maximal domain of the function <Katex tex="h=f+g" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left(-2,\ \tfrac12\right)" /> },
        { letter: 'B', content: <Katex tex="[-2,\ \infty)" /> },
        { letter: 'C', content: <Katex tex="(-\infty,-2)\cup\left(\tfrac12,\ \infty\right)" /> },
        { letter: 'D', content: <Katex tex="\left[-2,\ \tfrac12\right]" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="[-2,\ 1]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
