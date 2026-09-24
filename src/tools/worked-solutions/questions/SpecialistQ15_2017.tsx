// 2017 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 71% correct.
// Constant velocity from two displacement vectors two seconds apart. Question text
// transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 71, C: 13, D: 7, E: 4 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{v} = \frac{\underset{\sim}{r}_2-\underset{\sim}{r}_1}{t_2-t_1}" />,
    reason: <>Constant velocity means change in position divided by change in time — the vector version of gradient.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}_2-\underset{\sim}{r}_1 = \left(-\underset{\sim}{i}+5\underset{\sim}{j}\right)-\left(3\underset{\sim}{i}+\underset{\sim}{j}\right)" />,
    reason: <>Later minus earlier. Getting the order backwards (and not dividing by the time) gives option D.</>,
  },
  {
    working: <Katex display tex="= -4\underset{\sim}{i}+4\underset{\sim}{j}" />,
    reason: <>Component by component: <Katex tex="-1-3=-4" /> and <Katex tex="5-1=4" />. This is the <em>displacement</em> over the two seconds, which is option C — the trap for anyone who forgets to divide.</>,
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{v} = -2\underset{\sim}{i}+2\underset{\sim}{j}\ \text{m s}^{-1}}" />,
    reason: <>Dividing by <Katex tex="2" /> seconds. Matches option <b>B</b>. Check: starting at <Katex tex="3\underset{\sim}{i}+\underset{\sim}{j}" /> and adding <Katex tex="2\underset{\sim}{v}" /> gives <Katex tex="-\underset{\sim}{i}+5\underset{\sim}{j}" /> ✓.</>,
  },
]

export default function SpecialistQ15_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A body has displacement of{' '}
            <Katex tex="3\underset{\sim}{i}+\underset{\sim}{j}" /> metres at a particular
            time. The body moves with constant velocity and two seconds later its
            displacement is <Katex tex="-\underset{\sim}{i}+5\underset{\sim}{j}" /> metres.
          </p>
          <p>
            The velocity, in m s<Katex tex="^{-1}" />, of the body is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="2\underset{\sim}{i}+6\underset{\sim}{j}" /> },
        { letter: 'B', content: <Katex tex="-2\underset{\sim}{i}+2\underset{\sim}{j}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="-4\underset{\sim}{i}+4\underset{\sim}{j}" /> },
        { letter: 'D', content: <Katex tex="4\underset{\sim}{i}-4\underset{\sim}{j}" /> },
        { letter: 'E', content: <Katex tex="\underset{\sim}{i}+3\underset{\sim}{j}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
