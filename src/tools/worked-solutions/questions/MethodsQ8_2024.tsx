// 2024 Mathematical Methods — Exam 2, MCQ 8. VCAA examination report: 65% correct.
// An x-intercept of f − g is where the two tabulated values agree. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 65, B: 15, C: 16, D: 3 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = 0 \iff f(x) = g(x)" />,
    reason: <>An <Katex tex="x" />-intercept is where <Katex tex="h(x)=0" />, i.e. where <Katex tex="f" /> and <Katex tex="g" /> are equal. So test each tabulated <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="h(1) = 0-3 = -3" />,
    reason: <>Not zero.</>,
  },
  {
    working: <Katex display tex="h(2) = 4-4 = 0" />,
    reason: <>At <Katex tex="x=2" />, <Katex tex="f" /> and <Katex tex="g" /> are equal — the only column of the table where they match.</>,
  },
  {
    working: <Katex display tex="h(3) = 5-(-5) = 10" />,
    reason: <>Not zero — and watch the double negative.</>,
    more: <>Option <b>B</b>, <Katex tex="(3,0)" />, is what you get from <Katex tex="f(3)+g(3)=5+(-5)=0" />: adding the functions instead of subtracting them.</>,
  },
  {
    working: <Katex display tex="\boxed{(2,\,0)}" />,
    reason: <>Matches option <b>A</b>: the only <Katex tex="x" />-value in the table where <Katex tex="h" /> is definitely zero.</>,
    more: <>The word "must" matters: <Katex tex="h" /> may well have other intercepts between or beyond the tabulated values, but the table only <em>forces</em> this one. Options <b>C</b> and <b>D</b> take function values as <Katex tex="x" />-coordinates: 4 is the common value <Katex tex="f(2)=g(2)" />, and 5 is the size of <Katex tex="f(3)" /> and <Katex tex="g(3)" />. An intercept's coordinates are <Katex tex="(x,0)" />, and only <Katex tex="x=1,2,3" /> appear in the table.</>,
  },
]

export default function MethodsQ8_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            Some values of the functions <Katex tex="f:R\to R" /> and{' '}
            <Katex tex="g:R\to R" /> are shown below.
          </p>
          <div className="overflow-x-auto">
            <table className="text-[13.5px] border-collapse">
              <tbody>
                {[
                  ['x', '1', '2', '3'],
                  ['f(x)', '0', '4', '5'],
                  ['g(x)', '3', '4', '-5'],
                ].map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c} className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center">
                        <Katex tex={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            The graph of the function <Katex tex="h(x)=f(x)-g(x)" /> must have an{' '}
            <Katex tex="x" />-intercept at
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="(2,0)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="(3,0)" /> },
        { letter: 'C', content: <Katex tex="(4,0)" /> },
        { letter: 'D', content: <Katex tex="(5,0)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
