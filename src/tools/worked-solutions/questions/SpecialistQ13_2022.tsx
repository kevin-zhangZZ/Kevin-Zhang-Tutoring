// 2022 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 76% correct.
// Antidifferentiating a vector, one component at a time, with a vector constant. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 76, C: 10, D: 4, E: 6 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{\dot r}(t) = \int\underset{\sim}{\ddot r}(t)\,dt = \int\bigl(\sin(t)\underset{\sim}{i}+2\cos(t)\underset{\sim}{j}\bigr)dt" />,
    reason: <>Velocity is the antiderivative of acceleration; each component integrates separately.</>,
  },
  {
    working: <Katex display tex="= -\cos(t)\underset{\sim}{i}+2\sin(t)\underset{\sim}{j}+\underset{\sim}{c}" />,
    reason: <>The constant of integration is a <em>vector</em>, with a component in each direction. Option <b>A</b> is what you get by forgetting it.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{\dot r}(0) = -\cos(0)\underset{\sim}{i}+2\sin(0)\underset{\sim}{j}+\underset{\sim}{c} = -\underset{\sim}{i}+\underset{\sim}{c}" />,
    reason: <>Substituting the given initial velocity time.</>,
  },
  {
    working: <Katex display tex="-\underset{\sim}{i}+\underset{\sim}{c} = 2\underset{\sim}{i}+\underset{\sim}{j} \implies \underset{\sim}{c} = 3\underset{\sim}{i}+\underset{\sim}{j}" />,
    reason: <>Equating components fixes both pieces of the constant at once.</>,
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{\dot r}(t) = \bigl(3-\cos(t)\bigr)\underset{\sim}{i}+\bigl(2\sin(t)+1\bigr)\underset{\sim}{j}}" />,
    reason: <>Matches option <b>B</b>. Check at <Katex tex="t=0" />: <Katex tex="(3-1)\underset{\sim}{i}+(0+1)\underset{\sim}{j}=2\underset{\sim}{i}+\underset{\sim}{j}" />.</>,
  },
]

export default function SpecialistQ13_2022() {
  return (
    <MCQShell
      question={
        <p>
          The acceleration of a body moving in a plane is given by{' '}
          <Katex tex="\underset{\sim}{\ddot r}(t)=\sin(t)\underset{\sim}{i}+2\cos(t)\underset{\sim}{j}" />
          , where <Katex tex="t\ge0" />.
          <br />
          Given that{' '}
          <Katex tex="\underset{\sim}{\dot r}(0)=2\underset{\sim}{i}+\underset{\sim}{j}" />, the
          velocity of the body at time <Katex tex="t" />,{' '}
          <Katex tex="\underset{\sim}{\dot r}(t)" />, is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\cos(t)\underset{\sim}{i}+2\sin(t)\underset{\sim}{j}" /> },
        { letter: 'B', content: <Katex tex="\bigl(3-\cos(t)\bigr)\underset{\sim}{i}+\bigl(2\sin(t)+1\bigr)\underset{\sim}{j}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\bigl(1+\cos(t)\bigr)\underset{\sim}{i}+\bigl(2\sin(t)+1\bigr)\underset{\sim}{j}" /> },
        { letter: 'D', content: <Katex tex="\bigl(2+\sin(t)\bigr)\underset{\sim}{i}+\bigl(2\cos(t)-1\bigr)\underset{\sim}{j}" /> },
        { letter: 'E', content: <Katex tex="\bigl(1+\cos(t)\bigr)\underset{\sim}{i}+\bigl(1-2\sin(t)\bigr)\underset{\sim}{j}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
