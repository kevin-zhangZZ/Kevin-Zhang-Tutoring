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
    reason: <>Velocity is the antiderivative of acceleration, and each component is antidifferentiated separately.</>,
  },
  {
    working: <Katex display tex="= -\cos(t)\underset{\sim}{i}+2\sin(t)\underset{\sim}{j}+\underset{\sim}{c}" />,
    reason: <>
      <Katex tex="\int\sin(t)\,dt=-\cos(t)" /> (watch the minus sign) and{' '}
      <Katex tex="\int2\cos(t)\,dt=2\sin(t)" />. The constant of integration is a{' '}
      <em>vector</em> <Katex tex="\underset{\sim}{c}" />, with a component in each direction.
    </>,
    more: (
      <>
        To be sure of a sign, differentiate back:{' '}
        <Katex tex="\tfrac{d}{dt}\bigl(-\cos(t)\bigr)=\sin(t)" />, the{' '}
        <Katex tex="\underset{\sim}{i}" /> component of the acceleration. Writing{' '}
        <Katex tex="+\cos(t)" /> would differentiate back to <Katex tex="-\sin(t)" />, the wrong
        acceleration.
      </>
    ),
  },
  {
    working: <Katex display tex="\underset{\sim}{\dot r}(0) = -\cos(0)\underset{\sim}{i}+2\sin(0)\underset{\sim}{j}+\underset{\sim}{c} = -\underset{\sim}{i}+\underset{\sim}{c}" />,
    reason: <>Substitute <Katex tex="t=0" />, the time at which the velocity is given, using <Katex tex="\cos(0)=1" /> and <Katex tex="\sin(0)=0" />.</>,
  },
  {
    working: <Katex display tex="-\underset{\sim}{i}+\underset{\sim}{c} = 2\underset{\sim}{i}+\underset{\sim}{j} \implies \underset{\sim}{c} = 3\underset{\sim}{i}+\underset{\sim}{j}" />,
    reason: <>Set this equal to the given <Katex tex="\underset{\sim}{\dot r}(0)" /> and add <Katex tex="\underset{\sim}{i}" /> to both sides.</>,
    more: (
      <>
        One vector equation fixes both components of the constant at once. Writing{' '}
        <Katex tex="\underset{\sim}{c}=c_1\underset{\sim}{i}+c_2\underset{\sim}{j}" />, it says{' '}
        <Katex tex="-1+c_1=2" /> and <Katex tex="c_2=1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\underset{\sim}{\dot r}(t) = -\cos(t)\underset{\sim}{i}+2\sin(t)\underset{\sim}{j}+3\underset{\sim}{i}+\underset{\sim}{j}" />,
    reason: <>Substitute <Katex tex="\underset{\sim}{c}" /> back, then collect the <Katex tex="\underset{\sim}{i}" /> terms and the <Katex tex="\underset{\sim}{j}" /> terms.</>,
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{\dot r}(t) = \bigl(3-\cos(t)\bigr)\underset{\sim}{i}+\bigl(2\sin(t)+1\bigr)\underset{\sim}{j}}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: (
      <>
        <p>
          Check at <Katex tex="t=0" />:{' '}
          <Katex tex="(3-1)\underset{\sim}{i}+(0+1)\underset{\sim}{j}=2\underset{\sim}{i}+\underset{\sim}{j}" />,
          as given. But that check alone can&rsquo;t pick B: every option except A was built to
          pass it. Differentiating back is the check that separates them, because only B
          returns <Katex tex="\sin(t)\underset{\sim}{i}+2\cos(t)\underset{\sim}{j}" />.
        </p>
        <p>
          Option <b>A</b> leaves out the constant <Katex tex="\underset{\sim}{c}" />, so at{' '}
          <Katex tex="t=0" /> it gives <Katex tex="-\underset{\sim}{i}" />. Option <b>C</b>, the
          most common wrong answer, antidifferentiates <Katex tex="\sin(t)" /> to{' '}
          <Katex tex="+\cos(t)" />: the sign slip. Options <b>D</b> and <b>E</b> don&rsquo;t
          antidifferentiate at all: D keeps the acceleration&rsquo;s components and E
          differentiates them, each with a constant chosen to fit{' '}
          <Katex tex="\underset{\sim}{\dot r}(0)" />.
        </p>
      </>
    ),
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
