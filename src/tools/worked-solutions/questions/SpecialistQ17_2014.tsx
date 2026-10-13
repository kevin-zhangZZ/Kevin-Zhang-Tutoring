// 2014 Specialist Mathematics — Exam 2, MCQ 17. VCAA examination report: 62% correct.
// Antidifferentiating an acceleration vector, with the constant pinned by "starts from rest". Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 24, C: 6, D: 62, E: 2 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = \int\underset{\sim}{a}(t)\,dt" />,
    reason: <>Antidifferentiate each component, then use the initial condition — the constant is a vector.</>,
  },
  {
    working: <Katex display tex="\int-4\sin(2t)\,dt = 2\cos(2t)" />,
    reason: <>Divide by 2, the coefficient of <Katex tex="t" /> (reverse chain rule); the two minus signs cancel.</>,
  },
  {
    working: <Katex display tex="\int20\cos(2t)\,dt = 10\sin(2t)" />,
    reason: <>Again divide by 2, the coefficient of <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\int-20e^{-2t}\,dt = 10e^{-2t}" />,
    reason: <>Divide by <Katex tex="-2" />: the two minus signs cancel, so the result is positive.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = 2\cos(2t)\underset{\sim}{i}+10\sin(2t)\underset{\sim}{j}+10e^{-2t}\underset{\sim}{k}+\underset{\sim}{c}" />,
    reason: <>Collect the three components and add one constant vector <Katex tex="\underset{\sim}{c}" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(0) = \underset{\sim}{0}:\quad 2\underset{\sim}{i}+0\underset{\sim}{j}+10\underset{\sim}{k}+\underset{\sim}{c} = \underset{\sim}{0}" />,
    reason: <>"Starts from rest" means the velocity is the zero vector at <Katex tex="t=0" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{c} = -2\underset{\sim}{i}-10\underset{\sim}{k}" />,
    reason: <>Only two components need correcting, because <Katex tex="\sin(0)=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned}\underset{\sim}{v}(t) &= \bigl(2\cos(2t)-2\bigr)\underset{\sim}{i}+10\sin(2t)\underset{\sim}{j}\\ &\quad+\bigl(10e^{-2t}-10\bigr)\underset{\sim}{k}\end{aligned}}" />,
    reason: <>Matches option <b>D</b>; at <Katex tex="t=0" /> every component is zero ✓.</>,
    more: (
      <>
        Option B (24%, the most common wrong answer) is the antiderivative with the constant left
        out — it gives <Katex tex="2\underset{\sim}{i}+10\underset{\sim}{k}" /> at{' '}
        <Katex tex="t=0" />, not rest. A is the <em>derivative</em> of the acceleration, not its
        antiderivative. C is that derivative shifted so it is zero at <Katex tex="t=0" />. E is double the correct velocity in the{' '}
        <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> components, and
        its <Katex tex="\underset{\sim}{k}" /> component also has the wrong sign.
      </>
    ),
  },
]

export default function SpecialistQ17_2014() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The acceleration vector of a particle that starts from rest is given by{' '}
            <Katex tex="\underset{\sim}{a}(t)=-4\sin(2t)\underset{\sim}{i}+20\cos(2t)\underset{\sim}{j}-20e^{-2t}\underset{\sim}{k}" />
            , where <Katex tex="t\ge0" />.
          </p>
          <p>
            The velocity vector of the particle,{' '}
            <Katex tex="\underset{\sim}{v}(t)" />, is given by
          </p>
        </>
      }
      background={
        <p>
          A fast check on all five options: substitute <Katex tex="t=0" /> and keep only
          those that give the zero vector. Options A and B fail that test immediately;
          differentiating the survivors C, D and E settles the rest — only D gives back the
          acceleration.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-8\cos(2t)\underset{\sim}{i}-40\sin(2t)\underset{\sim}{j}+40e^{-2t}\underset{\sim}{k}" /> },
        { letter: 'B', content: <Katex tex="2\cos(2t)\underset{\sim}{i}+10\sin(2t)\underset{\sim}{j}+10e^{-2t}\underset{\sim}{k}" /> },
        { letter: 'C', content: <Katex tex="\bigl(8-8\cos(2t)\bigr)\underset{\sim}{i}-40\sin(2t)\underset{\sim}{j}+\bigl(40e^{-2t}-40\bigr)\underset{\sim}{k}" /> },
        { letter: 'D', content: <Katex tex="\bigl(2\cos(2t)-2\bigr)\underset{\sim}{i}+10\sin(2t)\underset{\sim}{j}+\bigl(10e^{-2t}-10\bigr)\underset{\sim}{k}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\bigl(4\cos(2t)-4\bigr)\underset{\sim}{i}+20\sin(2t)\underset{\sim}{j}+\bigl(20-20e^{-2t}\bigr)\underset{\sim}{k}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
