// 2023 Mathematical Methods NHT — Exam 2, MCQ 1. The NHT report gives the answer key only, with
// no statistics. Functions: the period of a transformed sine function. Question text transcribed
// from the original paper. Solution is original; the answer B agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y=a\sin(nx+c)+k:\ \ \text{period}=\frac{2\pi}{n}" />,
    reason: <>Only the coefficient of <Katex tex="x" /> inside the sine changes the period. The <Katex tex="3" /> (amplitude), the <Katex tex="-\tfrac{\pi}{3}" /> (horizontal shift) and the <Katex tex="+1" /> (vertical shift) move or stretch the graph without changing how often it repeats.</>,
    more: <>Writing the rule as <Katex tex="y=3\sin\!\left(2\left(x-\tfrac{\pi}{6}\right)\right)+1" /> makes this clear: a translation of <Katex tex="\tfrac{\pi}{6}" /> to the right slides each cycle along, while the factor 2 squeezes every cycle to half its width (a dilation by factor <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis).</>,
  },
  {
    working: <Katex display tex="n=2" />,
    reason: <>The coefficient of <Katex tex="x" /> in <Katex tex="2x-\tfrac{\pi}{3}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{period}=\frac{2\pi}{2}=\pi}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option <b>C</b>, <Katex tex="2\pi" />, is the period of <Katex tex="\sin(x)" /> itself, forgetting to divide by the 2. Check: from <Katex tex="x=\tfrac{\pi}{6}" /> to <Katex tex="x=\tfrac{7\pi}{6}" /> the inside <Katex tex="2x-\tfrac{\pi}{3}" /> runs from <Katex tex="0" /> to <Katex tex="2\pi" />, exactly one full cycle over an <Katex tex="x" />-interval of length <Katex tex="\pi" /> ✓.</>,
  },
]

export default function MethodsQ1_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          The period of the function <Katex tex="y=3\sin\left(2x-\dfrac{\pi}{3}\right)+1" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{\pi}{2}" /> },
        { letter: 'B', content: <Katex tex="\pi" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="2\pi" /> },
        { letter: 'D', content: <Katex tex="\dfrac{3\pi}{2}" /> },
        { letter: 'E', content: <Katex tex="3\pi" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
