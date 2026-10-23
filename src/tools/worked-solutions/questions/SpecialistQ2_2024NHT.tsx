// 2024 Specialist NHT — Exam 2, MCQ 2. The NHT report gives the answer key only, with no
// statistics. Algorithms: tracing pseudocode that approximates the arc length of y = x² on [1, 2]
// with chords of horizontal width 0.5. Question text (including the pseudocode) transcribed from
// the original paper. Solution is original; the answer E agrees with the report's key. Python
// trace: arcs √1.8125 = 1.3463… and √3.3125 = 1.8200…, sum 3.1663…; the exact arc length is
// 3.1678…, also 3.17.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'E' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=x^2,\quad a=1,\ b=2,\ h=0.5" />,
    reason: <>The loop runs while <Katex tex="right\le b" />. <Katex tex="right" /> starts at <Katex tex="1.5" />, then becomes <Katex tex="2" />, then <Katex tex="2.5" />, so the loop body runs <b>twice</b>.</>,
    more: <>Each pass adds the length of the straight chord from <Katex tex="(left,\,f(left))" /> to <Katex tex="(right,\,f(right))" />: horizontal change <Katex tex="h" />, vertical change <Katex tex="f(right)-f(left)" />, length by Pythagoras. Adding the chords approximates the length of the curve.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{Pass 1: }arc&=\sqrt{(1.5^2-1^2)^2+0.5^2}\\&=\sqrt{1.25^2+0.25}\\&=\sqrt{1.8125}\approx1.3463\end{aligned}" />,
    reason: <><Katex tex="left=1" />, <Katex tex="right=1.5" />. Then <Katex tex="left" /> and <Katex tex="right" /> each move up by <Katex tex="0.5" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{Pass 2: }arc&=\sqrt{(2^2-1.5^2)^2+0.5^2}\\&=\sqrt{1.75^2+0.25}\\&=\sqrt{3.3125}\approx1.8200\end{aligned}" />,
    reason: <><Katex tex="left=1.5" />, <Katex tex="right=2" />. Afterwards <Katex tex="right=2.5>b" />, so the loop stops and <Katex tex="sum" /> is printed.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}sum&\approx1.3463+1.8200\\&=3.1663\ldots\approx\boxed{3.17}\end{aligned}" />,
    reason: <>Matches option <b>E</b>, correct to two decimal places.</>,
    more: <>Sanity check: the exact arc length <Katex tex="\int_1^2\sqrt{1+4x^2}\,dx\approx3.168" />, only slightly more than the chords (a chord is the shortest path between its endpoints, so the chords always slightly underestimate). Option <b>A</b> (1.35) is the first chord alone and option <b>B</b> (1.82) is the second chord alone: stopping after one pass, or printing <Katex tex="arc" /> instead of <Katex tex="sum" />.</>,
  },
]

export default function SpecialistQ2_2024NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>Consider the following algorithm to estimate the arc length of a certain curve.</p>
          <pre className="text-[12.5px] leading-relaxed bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-xl p-4 overflow-x-auto">
{`define f(x)
return x²
    sum ← 0
    a ← 1
    b ← 2
    h ← 0.5
    left ← a
    right ← a + h
while right ≤ b do
    arc ← √((f(right) − f(left))² + h²)
    sum ← sum + arc
    left ← left + h
    right ← right + h
end while
print sum`}
          </pre>
          <p>Correct to two decimal places, the above algorithm will print the value</p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="1.35" /> },
        { letter: 'B', content: <Katex tex="1.82" /> },
        { letter: 'C', content: <Katex tex="2.38" /> },
        { letter: 'D', content: <Katex tex="2.96" /> },
        { letter: 'E', content: <Katex tex="3.17" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
