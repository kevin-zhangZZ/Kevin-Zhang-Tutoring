// 2023 Mathematical Methods NHT — Exam 2, MCQ 16. The NHT report gives the answer key only, with
// no statistics. Functions: the largest domain of a composite g(f(x)) — x in dom f, and f(x) in
// dom g. Question text transcribed from the original paper. Solution is original; the answer B
// agrees with the report's key, and sympy's solve of −√3 ≤ 3x − 1 ≤ √3 confirms it. Verified
// distractors: E is dom f, C is dom g, A is dom f ∩ dom g.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}g(f(x)) \text{ defined} \iff\\ x\in[-1,3] \text{ and } f(x)\in\left[-\sqrt3,\sqrt3\right]\end{gathered}" />,
    reason: <>To evaluate <Katex tex="g(f(x))" />, first <Katex tex="f" /> must accept <Katex tex="x" />, then <Katex tex="g" /> must accept the output <Katex tex="f(x)" />. So the condition on <Katex tex="g" />&apos;s domain applies to <Katex tex="f(x)" />, not to <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="-\sqrt3\le 3x-1\le\sqrt3" />,
    reason: <>Write <Katex tex="f(x)\in\left[-\sqrt3,\sqrt3\right]" /> as a double inequality, with <Katex tex="f(x)=3x-1" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}1-\sqrt3\le 3x\le 1+\sqrt3\\ \Rightarrow\ \frac{1-\sqrt3}{3}\le x\le\frac{1+\sqrt3}{3}\end{gathered}" />,
    reason: <>Add 1 throughout, then divide by 3 (positive, so the inequalities keep their direction).</>,
  },
  {
    working: <Katex display tex="\left[\tfrac{1-\sqrt3}{3},\tfrac{1+\sqrt3}{3}\right]\approx[-0.244,\ 0.911]\subseteq[-1,3]" />,
    reason: <>Now intersect with <Katex tex="f" />&apos;s domain <Katex tex="[-1,3]" />. This interval already lies inside it, so nothing more is cut off.</>,
  },
  {
    working: <Katex display tex="\boxed{\left[\frac{1-\sqrt3}{3},\ \frac{1+\sqrt3}{3}\right]}" />,
    reason: <>Matches option <b>B</b>. Check an endpoint: <Katex tex="f\!\left(\tfrac{1+\sqrt3}{3}\right)=1+\sqrt3-1=\sqrt3" />, exactly the edge of <Katex tex="g" />&apos;s domain.</>,
    more: <>Option <b>E</b> is just the domain of <Katex tex="f" />, option <b>C</b> just the domain of <Katex tex="g" />, and option <b>A</b> their intersection — all three apply <Katex tex="g" />&apos;s restriction to <Katex tex="x" /> instead of to <Katex tex="f(x)" />. (The composite&apos;s rule is <Katex tex="(3x-1)^2" />, which looks defined everywhere; the restriction comes only from the given domains.)</>,
  },
]

export default function MethodsQ16_2023NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            Let <Katex tex="f:[-1,3]\to R,\ f(x)=3x-1" /> and{' '}
            <Katex tex="g:\left[-\sqrt3,\sqrt3\right]\to R,\ g(x)=x^2" />
          </p>
          <p>
            The largest domain for which <Katex tex="g(f(x))" /> is defined is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left[-1,\sqrt3\right]" /> },
        { letter: 'B', content: <Katex tex="\left[\dfrac{1-\sqrt3}{3},\dfrac{1+\sqrt3}{3}\right]" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\left[-\sqrt3,\sqrt3\right]" /> },
        { letter: 'D', content: <Katex tex="\left[\dfrac{-1-\sqrt3}{3},\dfrac{1-\sqrt3}{3}\right]" /> },
        { letter: 'E', content: <Katex tex="[-1,3]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
