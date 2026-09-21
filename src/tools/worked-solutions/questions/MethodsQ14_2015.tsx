// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 14. VCAA examination report: 75% correct.
// The mean of a discrete distribution whose probabilities are multiples of p. Question
// text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 11, C: 6, D: 75, E: 5 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="p+2p+3p+4p+5p = 15p = 1" />,
    reason: <>Probabilities in a distribution must add to <Katex tex="1" />. Always the first step when a table is written in terms of a parameter.</>,
  },
  {
    working: <Katex display tex="p = \frac{1}{15}" />,
    reason: <>So the probabilities are <Katex tex="\tfrac1{15},\tfrac2{15},\tfrac3{15},\tfrac4{15},\tfrac5{15}" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(X) = 1(p)+2(2p)+3(3p)+4(4p)+5(5p)" />,
    reason: <>Each value times its probability.</>,
  },
  {
    working: <Katex display tex="= p(1+4+9+16+25) = 55p" />,
    reason: <>The sum of the first five squares.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{55}{15} = \frac{11}{3}}" />,
    reason: <>About <Katex tex="3.67" />. Sensible: the larger values carry the larger probabilities, so the mean should sit above the middle value <Katex tex="3" />.</>,
  },
]

export default function MethodsQ14_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            Consider the following discrete probability distribution for the random variable{' '}
            <Katex tex="X" />.
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="text-[13px] tabular-nums border-collapse">
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">
                    <Katex tex="x" />
                  </td>
                  <td className="px-4 py-1.5 text-center">1</td>
                  <td className="px-4 py-1.5 text-center">2</td>
                  <td className="px-4 py-1.5 text-center">3</td>
                  <td className="px-4 py-1.5 text-center">4</td>
                  <td className="px-4 py-1.5 text-center">5</td>
                </tr>
                <tr>
                  <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">
                    <Katex tex="\Pr(X=x)" />
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    <Katex tex="p" />
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    <Katex tex="2p" />
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    <Katex tex="3p" />
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    <Katex tex="4p" />
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    <Katex tex="5p" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>The mean of this distribution is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="\dfrac73" /> },
        { letter: 'C', content: <Katex tex="\dfrac{11}{2}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{11}{3}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="4" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
