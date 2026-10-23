// 2023 Mathematical Methods NHT — Exam 2, MCQ 5. The NHT report gives the answer key only, with
// no statistics. Probability: the expected value of a discrete random variable from its table.
// Question text transcribed from the original paper. Solution is original; the answer B agrees
// with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{E}(X)=\sum x\Pr(X=x)" />,
    reason: <>The expected value is a <b>weighted</b> average: each value of <Katex tex="x" /> is weighted by how likely it is.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{E}(X)&=0(0.2)+1(0.4)+2(0.3)+3(0.1)\\&=0+0.4+0.6+0.3\end{aligned}" />,
  },
  {
    working: <Katex display tex="\boxed{\text{E}(X)=1.3}" />,
    reason: <>Matches option <b>B</b>. It sits between 1 and 2, nearer 1, where the largest probability (0.4 at <Katex tex="x=1" />) lies ✓.</>,
    more: <>Option <b>C</b>, 1.5, is the plain average of the four values <Katex tex="\tfrac{0+1+2+3}{4}" />, which ignores the probabilities; it would be right only if all four were equally likely. Option <b>A</b>, 1.0, is the sum of the probabilities, which is always 1 for any distribution.</>,
  },
]

const cell = 'border border-gray-300 dark:border-gray-700 px-4 py-1.5 text-center'

export default function MethodsQ5_2023NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            The probability distribution for the discrete random variable <Katex tex="X" /> is shown in the table below
          </p>
          <div className="overflow-x-auto">
            <table className="text-[13.5px] border-collapse">
              <tbody>
                <tr>
                  <th className={`${cell} font-normal`}><Katex tex="x" /></th>
                  {['0', '1', '2', '3'].map((v) => (
                    <td key={v} className={cell}>{v}</td>
                  ))}
                </tr>
                <tr>
                  <th className={`${cell} font-normal whitespace-nowrap`}><Katex tex="\Pr(X=x)" /></th>
                  {['0.2', '0.4', '0.3', '0.1'].map((v, i) => (
                    <td key={i} className={cell}>{v}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The value of <Katex tex="\text{E}(X)" /> is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="1.0" /> },
        { letter: 'B', content: <Katex tex="1.3" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="1.5" /> },
        { letter: 'D', content: <Katex tex="2.2" /> },
        { letter: 'E', content: <Katex tex="3.0" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
