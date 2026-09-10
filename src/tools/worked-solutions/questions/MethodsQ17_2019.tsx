// 2019 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 43% correct.
// Probability that two marbles drawn without replacement are the same colour. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 14, C: 21, D: 43, E: 14 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="n \text{ marbles total: } k \text{ red},\ n-k \text{ green}" />,
    reason: 'Set-up.',
  },
  {
    working: <Katex display tex="\Pr(\text{both red}) = \frac{k}{n}\cdot\frac{k-1}{n-1}" />,
    reason: <>Draw the first red (probability <Katex tex="k/n" />), then a second red from the <Katex tex="k-1" /> remaining reds out of <Katex tex="n-1" /> marbles left.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{both green}) = \frac{n-k}{n}\cdot\frac{n-k-1}{n-1}" />,
    reason: 'Same reasoning for two greens.',
  },
  {
    working: <Katex display tex="\Pr(\text{same colour}) = \Pr(\text{RR})+\Pr(\text{GG})" />,
    reason: '"Same colour" means either both red or both green — mutually exclusive outcomes, so add.',
  },
  {
    working: <Katex display tex="= \frac{k(k-1)}{n(n-1)} + \frac{(n-k)(n-k-1)}{n(n-1)}" />,
    reason: 'Combine the two products from above.',
  },
  {
    working: <Katex display tex="\boxed{\frac{k(k-1)+(n-k)(n-k-1)}{n(n-1)}}" />,
    reason: <>Common denominator — matches option <b>D</b>.</>,
  },
]

export default function MethodsQ17_2019() {
  return (
    <MCQShell
      question={
        <p>
          A box contains <Katex tex="n" /> marbles that are identical in every way except colour, of which{' '}
          <Katex tex="k" /> marbles are coloured red and the remainder of the marbles are coloured green. Two
          marbles are drawn randomly from the box.
          <br />
          If the first marble is <b>not</b> replaced into the box before the second marble is drawn, then the
          probability that the two marbles drawn are the same colour is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{k^2+(n-k)^2}{n^2}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{k^2+(n-k-1)^2}{n^2}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{2k(n-k-1)}{n(n-1)}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{k(k-1)+(n-k)(n-k-1)}{n(n-1)}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="{}^nC_2\left(\dfrac{k}{n}\right)^2\left(1-\dfrac{k}{n}\right)^{n-2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
