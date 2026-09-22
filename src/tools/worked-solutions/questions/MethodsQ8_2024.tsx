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
    reason: 'An x-intercept of the difference is a point where the two functions are equal.',
  },
  {
    working: <Katex display tex="h(1) = 0-3 = -3" />,
    reason: 'Not zero.',
  },
  {
    working: <Katex display tex="h(2) = 4-4 = 0" />,
    reason: <>The only row where <Katex tex="f" /> and <Katex tex="g" /> match.</>,
  },
  {
    working: <Katex display tex="h(3) = 5-(-5) = 10" />,
    reason: 'Not zero — and watch the double negative.',
  },
  {
    working: <Katex display tex="\boxed{(2,\,0)}" />,
    reason: <>Option <b>A</b>. The word "must" matters: <Katex tex="h" /> may well have other intercepts between the tabulated values, but this is the only one the table <em>forces</em>. The wrong options all use the shared value 4 as an <Katex tex="x" />-coordinate.</>,
  },
]

export default function MethodsQ8_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            Some values of the functions <Katex tex="f:\mathbb{R}\to\mathbb{R}" /> and{' '}
            <Katex tex="g:\mathbb{R}\to\mathbb{R}" /> are shown below.
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
