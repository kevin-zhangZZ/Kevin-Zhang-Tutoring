// 2016 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 74% correct.
// Two independent students owning the same number of pets. Question text transcribed from
// the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 9, C: 74, D: 6, E: 8 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{same}) = \sum_x \bigl(\Pr(X=x)\bigr)^2" />,
    reason: <>"Both own <Katex tex="x" /> pets" has probability <Katex tex="\Pr(X=x)^2" /> because the two students are independent. The four cases are mutually exclusive, so add them.</>,
  },
  {
    working: <Katex display tex="= 0.5^2+0.25^2+0.2^2+0.05^2" />,
    reason: <>One term per value in the table. It is a large school, so selecting a second student does not change the distribution.</>,
  },
  {
    working: <Katex display tex="= 0.25+0.0625+0.04+0.0025" />,
    reason: <>Squaring each.</>,
  },
  {
    working: <Katex display tex="\boxed{0.355}" />,
    reason: <>Option C. Option E, <Katex tex="0.8" />, is the sum of the probabilities without squaring; option A drops the smallest term.</>,
  },
]

export default function MethodsQ7_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            The number of pets, <Katex tex="X" />, owned by each student in a large school is
            a random variable with the following discrete probability distribution.
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="text-[13px] tabular-nums border-collapse">
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">
                    <Katex tex="x" />
                  </td>
                  <td className="px-4 py-1.5 text-center">0</td>
                  <td className="px-4 py-1.5 text-center">1</td>
                  <td className="px-4 py-1.5 text-center">2</td>
                  <td className="px-4 py-1.5 text-center">3</td>
                </tr>
                <tr>
                  <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">
                    <Katex tex="\Pr(X=x)" />
                  </td>
                  <td className="px-4 py-1.5 text-center">0.5</td>
                  <td className="px-4 py-1.5 text-center">0.25</td>
                  <td className="px-4 py-1.5 text-center">0.2</td>
                  <td className="px-4 py-1.5 text-center">0.05</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            If two students are selected at random, the probability that they own the same
            number of pets is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.3" /> },
        { letter: 'B', content: <Katex tex="0.305" /> },
        { letter: 'C', content: <Katex tex="0.355" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="0.405" /> },
        { letter: 'E', content: <Katex tex="0.8" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
