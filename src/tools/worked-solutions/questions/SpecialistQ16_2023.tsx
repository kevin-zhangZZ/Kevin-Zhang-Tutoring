// 2023 Specialist Mathematics — Exam 2, MCQ 16. VCAA examination report: 32% correct.
// Distance travelled, not displacement: the ball goes up before it comes down. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 13, C: 23, D: 32, E: 23 },
  answer: 'D',
  comment: (
    <>
      Maximum height <Katex tex="=13" /> m, so <Katex tex="2\times13=26" /> m of travel from
      ground level — but the ball was released from a height of 1.5 m, so the total vertical
      distance travelled is <Katex tex="26.0-1.5=24.5" /> m.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z(t) = 15t-4.9t^2+1.5" />,
    reason: <>Only the <Katex tex="\underset{\sim}{k}" /> component matters; the horizontal motion is irrelevant to vertical distance.</>,
  },
  {
    working: <Katex display tex="z(0) = 1.5 \ \text{m}" />,
    reason: 'The release height — the ball starts above the ground, which is the crux of the question.',
  },
  {
    working: <Katex display tex="\dot z(t) = 15-9.8t = 0 \implies t = \frac{15}{9.8} = 1.5306" />,
    reason: 'The ball is momentarily at rest vertically at the top of its flight.',
  },
  {
    working: <Katex display tex="z_{\max} = 15(1.5306)-4.9(1.5306)^2+1.5 = 12.98 \approx 13.0 \ \text{m}" />,
    reason: 'The highest point above the ground.',
  },
  {
    working: <Katex display tex="\text{up} = 13.0-1.5 = 11.5 \ \text{m}; \qquad \text{down} = 13.0 \ \text{m}" />,
    reason: 'Distance travelled adds the two legs; displacement would subtract them.',
  },
  {
    working: <Katex display tex="\boxed{11.5+13.0 = 24.5 \ \text{m}}" />,
    reason: <>Option <b>D</b>. Option <b>E</b>, <Katex tex="26.0" />, is <Katex tex="2\times13" /> — right for a ball released at ground level, which this one was not.</>,
  },
]

export default function SpecialistQ16_2023() {
  return (
    <MCQShell
      question={
        <p>
          A student throws a ball for his dog to retrieve. The position vector of the ball,
          relative to an origin <Katex tex="O" /> at ground level <Katex tex="t" /> seconds
          after release, is given by{' '}
          <Katex tex="\underset{\sim}{r}_B(t)=5t\underset{\sim}{i}+7t\underset{\sim}{j}+\left(15t-4.9t^2+1.5\right)\underset{\sim}{k}" />
          . Displacement components are measured in metres, where{' '}
          <Katex tex="\underset{\sim}{i}" /> is a unit vector to the east,{' '}
          <Katex tex="\underset{\sim}{j}" /> is a unit vector to the north and{' '}
          <Katex tex="\underset{\sim}{k}" /> is a unit vector vertically up. The total
          vertical distance, in metres, travelled by the ball before it hits the ground is
          closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1.5" /> },
        { letter: 'B', content: <Katex tex="11.5" /> },
        { letter: 'C', content: <Katex tex="13.0" /> },
        { letter: 'D', content: <Katex tex="24.5" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="26.0" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
