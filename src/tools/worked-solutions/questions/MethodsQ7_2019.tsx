// 2019 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 82% correct. The mean
// of a discrete random variable given its probability distribution in terms of a. Question
// text transcribed from the original paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 4, C: 6, D: 82, E: 3 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a+3a+5a+7a=1 \implies 16a=1 \implies a=\dfrac{1}{16}" />,
    reason: <>All probabilities sum to <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="E(X) = 0(a)+1(3a)+2(5a)+3(7a) = 34a" />,
  },
  {
    working: <Katex display tex="\boxed{E(X) = 34\times\dfrac{1}{16} = \dfrac{17}{8}}" />,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function MethodsQ7_2019() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The discrete random variable <Katex tex="X" /> has the following probability distribution.</p>
          <div className="overflow-x-auto">
            <table className="text-[13.5px] border-collapse">
              <tbody>
                <tr>
                  <td className="pr-4 font-semibold"><Katex tex="x" /></td>
                  <td className="px-3"><Katex tex="0" /></td>
                  <td className="px-3"><Katex tex="1" /></td>
                  <td className="px-3"><Katex tex="2" /></td>
                  <td className="px-3"><Katex tex="3" /></td>
                </tr>
                <tr>
                  <td className="pr-4 font-semibold"><Katex tex="\Pr(X=x)" /></td>
                  <td className="px-3"><Katex tex="a" /></td>
                  <td className="px-3"><Katex tex="3a" /></td>
                  <td className="px-3"><Katex tex="5a" /></td>
                  <td className="px-3"><Katex tex="7a" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2">The mean of <Katex tex="X" /> is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{1}{16}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{1}{35}" /> },
        { letter: 'C', content: <Katex tex="16" /> },
        { letter: 'D', content: <Katex tex="\dfrac{17}{8}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
