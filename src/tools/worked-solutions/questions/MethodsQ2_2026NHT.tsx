// 2026 Mathematical Methods NHT — Exam 2, MCQ 2. The NHT report gives the answer key only, with no
// statistics; its comment (a table of the first nine outputs) is transcribed below. Algorithms: tracing a nested for loop that lists the sample space for two dice.
// Question text (including the pseudocode) transcribed from the original paper. Solution is
// original; the answer A agrees with the report's key. Distractor B verified: it is the ninth
// output if the loops are swapped (j outer, i inner).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const REPORT_ROWS: [number, number][] = [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [2, 1], [2, 2], [2, 3]]

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'A',
  comment: (
    <>
      The table below shows the values of i and j for the first 9 iterations of the algorithm.
      <table className="text-[13px] border-collapse my-2">
        <thead>
          <tr>
            <th className="border border-gray-300 dark:border-gray-700 px-3 py-1 text-left font-semibold">i</th>
            <th className="border border-gray-300 dark:border-gray-700 px-3 py-1 text-left font-semibold">j</th>
          </tr>
        </thead>
        <tbody>
          {REPORT_ROWS.map(([i, j], k) => (
            <tr key={k}>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1">{i}</td>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1">{j}</td>
            </tr>
          ))}
        </tbody>
      </table>
      The ninth line printed is 2, 3.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}i=1:\quad &(1,1),\ (1,2),\ (1,3),\\&(1,4),\ (1,5),\ (1,6)\end{aligned}" />,
    reason: <>The inner loop runs all the way through, <Katex tex="j=1" /> to <Katex tex="6" />, before the outer loop moves <Katex tex="i" /> on. So <Katex tex="i" /> stays at 1 for the first six outputs.</>,
    more: <>A nested loop works like an odometer: the inner variable (<Katex tex="j" />) turns fastest, and the outer one (<Katex tex="i" />) only ticks over when the inner one has finished a full cycle.</>,
  },
  {
    working: <Katex display tex="i=2:\quad \underset{7\text{th}}{(2,1)},\ \underset{8\text{th}}{(2,2)},\ \underset{9\text{th}}{(2,3)},\ \ldots" />,
    reason: <>The inner loop restarts at <Katex tex="j=1" /> with <Katex tex="i=2" />. Outputs 7, 8 and 9 are <Katex tex="(2,1)" />, <Katex tex="(2,2)" />, <Katex tex="(2,3)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{2,\ 3}" />,
    reason: <>Matches option <b>A</b>. Check: the output number is <Katex tex="6(i-1)+j=6(1)+3=9" /> ✓.</>,
    more: <>Option <b>B</b>, <Katex tex="3,2" />, is what you get by letting <Katex tex="i" /> change fastest instead — i.e. reading the loops the wrong way round: <Katex tex="(1,1),(2,1),\ldots,(6,1),(1,2),(2,2),(3,2)" />.</>,
  },
]

export default function MethodsQ2_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>Two dice are rolled at the same time. The algorithm below generates the sample space.</p>
          <pre className="text-[13px] leading-relaxed bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800 rounded-xl px-5 py-3 w-fit max-w-full overflow-x-auto">
{`for i from 1 to 6
  for j from 1 to 6
      print i, j
  end for
end for`}
          </pre>
          <p>The first printed output is 1, 1.</p>
          <p>The ninth printed output is</p>
        </div>
      }
      options={[
        { letter: 'A', content: <>2, 3</>, isAnswer: true },
        { letter: 'B', content: <>3, 2</> },
        { letter: 'C', content: <>6, 3</> },
        { letter: 'D', content: <>3, 6</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
