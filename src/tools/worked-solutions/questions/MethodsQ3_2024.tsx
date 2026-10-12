// 2024 Mathematical Methods — Exam 2, MCQ 3. VCAA examination report: 67% correct.
// A conditional probability where the unknown k cancels. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 11, C: 67, D: 14 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X<4\mid X>1) = \frac{\Pr(1<X<4)}{\Pr(X>1)}" />,
    reason: <>Conditional probability: <Katex tex="\Pr(A\mid B)=\frac{\Pr(A\cap B)}{\Pr(B)}" />. Both <Katex tex="X<4" /> and <Katex tex="X>1" /> hold exactly when <Katex tex="1<X<4" />.</>,
    more: <>The event after the bar, <Katex tex="X>1" />, is the information you are given, so it goes in the denominator: it shrinks the possible outcomes to <Katex tex="X=2,3,4" />.</>,
  },
  {
    working: <Katex display tex="\Pr(1<X<4) = 5k+3k = 8k" />,
    reason: <><Katex tex="X=2" /> and <Katex tex="X=3" /> are the only values strictly between 1 and 4.</>,
  },
  {
    working: <Katex display tex="\Pr(X>1) = 5k+3k+2k = 10k" />,
    reason: <><Katex tex="X=2,3,4" /> are the values greater than 1.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{8k}{10k} = \frac45}" />,
    reason: <>Matches option <b>C</b>. The <Katex tex="k" /> cancels, so it never needs to be found.</>,
    more: <>It is still worth checking that <Katex tex="k" /> exists: the probabilities sum to <Katex tex="15k=1" />, so <Katex tex="k=\tfrac{1}{15}" /> and every probability lies between 0 and 1. The distractors use that value. Option <b>D</b>, the most common wrong answer, is <Katex tex="\Pr(1<X<4)=\tfrac{8}{15}" />: the numerator only, never divided by <Katex tex="\Pr(X>1)" />. Option <b>A</b> is <Katex tex="\Pr(X<4)=\tfrac{13}{15}" />, ignoring the condition altogether. Option <b>B</b>, <Katex tex="\tfrac{11}{13}" />, swaps the two events and also reads <Katex tex="X>1" /> as <Katex tex="X\geq1" />: <Katex tex="\Pr(X\geq1\mid X<4)=\tfrac{3k+5k+3k}{13k}=\tfrac{11}{13}" />.</>,
  },
]

export default function MethodsQ3_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            A discrete random variable <Katex tex="X" /> is defined using the probability
            distribution below, where <Katex tex="k" /> is a positive real number.
          </p>
          <div className="overflow-x-auto">
            <table className="text-[13.5px] border-collapse">
              <tbody>
                <tr>
                  <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal">
                    <Katex tex="x" />
                  </th>
                  {[0, 1, 2, 3, 4].map((v) => (
                    <td key={v} className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center">{v}</td>
                  ))}
                </tr>
                <tr>
                  <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal whitespace-nowrap">
                    <Katex tex="\Pr(X=x)" />
                  </th>
                  {['2k', '3k', '5k', '3k', '2k'].map((v, i) => (
                    <td key={i} className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center">
                      <Katex tex={v} />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Find <Katex tex="\Pr(X<4\mid X>1)" />.
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac{13}{15}" /> },
        { letter: 'B', content: <Katex tex="\frac{11}{13}" /> },
        { letter: 'C', content: <Katex tex="\frac45" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\frac{8}{15}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
