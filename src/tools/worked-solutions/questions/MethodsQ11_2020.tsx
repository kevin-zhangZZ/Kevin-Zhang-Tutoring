// 2020 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 60% correct.
// Recovering a standard deviation from a standardised probability. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 13, C: 60, D: 15, E: 4 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="1-\Pr(Z>1.5) = \Pr(Z\le1.5)" />,
    reason: <>The complement. Rewriting the right-hand side as a single "less than" makes the comparison direct.</>,
  },
  {
    working: <Katex display tex="\Pr(X<259) = \Pr(Z<1.5)" />,
    reason: <>Two "less than" probabilities that are equal, so the standardised values must match.</>,
  },
  {
    working: <Katex display tex="\frac{259-250}{\sigma} = 1.5" />,
    reason: <>Standardising with <Katex tex="\mu=250" />.</>,
  },
  {
    working: <Katex display tex="\frac{9}{\sigma} = 1.5" />,
    reason: <>The numerator is 9, not 259.</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma = 6\ \text{mm}}" />,
    reason: <>Matches option <b>C</b>. Option <b>A</b> is the <Katex tex="z" />-value itself and option <b>D</b> is the difference <Katex tex="259-250" /> — both stop a step short.</>,
  },
]

export default function MethodsQ11_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The lengths of plastic pipes that are cut by a particular machine are a normally
            distributed random variable, <Katex tex="X" />, with a mean of 250 mm.
          </p>
          <p className="mb-2"><Katex tex="Z" /> is the standard normal random variable.</p>
          <p>
            If <Katex tex="\Pr(X<259)=1-\Pr(Z>1.5)" />, then the standard deviation of the
            lengths of plastic pipes, in millimetres, is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="1.5" /> },
        { letter: 'B', content: <Katex tex="3" /> },
        { letter: 'C', content: <Katex tex="6" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="9" /> },
        { letter: 'E', content: <Katex tex="12" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
