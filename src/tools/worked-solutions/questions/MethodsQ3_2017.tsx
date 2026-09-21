// 2017 Mathematical Methods — Exam 2, MCQ 3. VCAA examination report: 83% correct.
// Two marbles drawn without replacement from five red and three yellow. Question text
// transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 2, C: 83, D: 12, E: 1 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(RY) = \frac58\times\frac37 = \frac{15}{56}" />,
    reason: <>Red first: <Katex tex="5" /> of the <Katex tex="8" /> marbles. Then yellow: <Katex tex="3" /> of the <Katex tex="7" /> left, because the first marble is not replaced.</>,
  },
  {
    working: <Katex display tex="\Pr(YR) = \frac38\times\frac57 = \frac{15}{56}" />,
    reason: <>The other order. Equal to the first — which is always true for two draws without replacement, and worth knowing as a shortcut.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{different}) = \frac{15}{56}+\frac{15}{56} = \frac{30}{56}" />,
    reason: <>The two orders are mutually exclusive, so add. Option D is what you get if you forget the second order, and option E is the same slip left unsimplified.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{15}{28}}" />,
    reason: <>Dividing top and bottom by <Katex tex="2" />. About <Katex tex="0.54" /> — a bit over half, which is sensible for a fairly even split of colours.</>,
  },
]

export default function MethodsQ3_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A box contains five red marbles and three yellow marbles. Two marbles are drawn at
            random from the box without replacement.
          </p>
          <p>The probability that the marbles are of different colours is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac58" /> },
        { letter: 'B', content: <Katex tex="\dfrac35" /> },
        { letter: 'C', content: <Katex tex="\dfrac{15}{28}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{15}{56}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{30}{28}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
