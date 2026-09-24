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
    working: <Katex display tex="a+3a+5a+7a=1" />,
    reason: <>Every probability distribution must total <Katex tex="1" /> — that's the equation that turns the unknown <Katex tex="a" /> into a number.</>,
  },
  {
    working: <Katex display tex="16a=1 \implies a=\dfrac{1}{16}" />,
    reason: <>Collecting like terms.</>,
  },
  {
    working: <Katex display tex="E(X) = \sum x\Pr(X=x) = 0(a)+1(3a)+2(5a)+3(7a)" />,
    reason: <>The mean of a discrete random variable weights each value by its probability. Note the <Katex tex="x=0" /> term contributes nothing.</>,
  },
  {
    working: <Katex display tex="= (0+3+10+21)a = 34a" />,
    reason: <>Simplifying.</>,
  },
  {
    working: <Katex display tex="\boxed{E(X) = \dfrac{34}{16} = \dfrac{17}{8}}" />,
    reason: <>Matches option <b>D</b>. Sanity check: <Katex tex="\tfrac{17}{8}=2.125" />, which sits between <Katex tex="0" /> and <Katex tex="3" /> and leans towards the larger values — right, since they carry the bigger probabilities. Option <b>A</b> <Katex tex="\left(\tfrac{1}{16}\right)" /> is just <Katex tex="a" />, and option <b>C</b> <Katex tex="\left(\tfrac{35}{16}\right)" /> gives the <Katex tex="x=0" /> column a weight of <Katex tex="1" /> instead of <Katex tex="0" />.</>,
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
        { letter: 'B', content: <Katex tex="1" /> },
        { letter: 'C', content: <Katex tex="\dfrac{35}{16}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{17}{8}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
