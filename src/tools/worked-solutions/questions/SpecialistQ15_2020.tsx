// 2020 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 38% correct. Two
// forces give a constant acceleration; the rest is vector antidifferentiation. Question
// text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 10, C: 18, D: 23, E: 38 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      Use <Katex tex="\Sigma\underset{\sim}{F}=m\underset{\sim}{a}" /> then antidifferentiate{' '}
      <Katex tex="\underset{\sim}{a}" /> twice to find the position vector.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Sigma\underset{\sim}{F} = \left(4\underset{\sim}{i}-2\underset{\sim}{j}\right)+\left(2\underset{\sim}{i}+5\underset{\sim}{j}\right) = 6\underset{\sim}{i}+3\underset{\sim}{j}" />,
    reason: <>Add the two forces component by component before doing anything else.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a} = \frac{\Sigma\underset{\sim}{F}}{m} = \frac{6\underset{\sim}{i}+3\underset{\sim}{j}}{3} = 2\underset{\sim}{i}+\underset{\sim}{j}" />,
    reason: <>Constant, because both forces are.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v} = t\left(2\underset{\sim}{i}+\underset{\sim}{j}\right)" />,
    reason: <>Antidifferentiating once; the particle starts at rest, so the constant vector is zero.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r} = \left(\underset{\sim}{i}+\underset{\sim}{j}\right)+\tfrac{t^2}{2}\left(2\underset{\sim}{i}+\underset{\sim}{j}\right)" />,
    reason: <>Again, with the initial position <Katex tex="\underset{\sim}{i}+\underset{\sim}{j}" /> as the constant.</>,
  },
  {
    working: <Katex display tex="x = 1+t^2, \quad y = 1+\tfrac{t^2}{2}" />,
    reason: <>Reading off the components.</>,
  },
  {
    working: <Katex display tex="t^2 = x-1 \implies y = 1+\frac{x-1}{2}" />,
    reason: <>Eliminating <Katex tex="t" />. Because the acceleration is constant and the particle starts from rest, the path is a <em>straight line</em> — options C and D, which are parabolas, can be ruled out before any algebra.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \tfrac{x}{2}+\tfrac12}" />,
    reason: <>Matches option <b>E</b>. Strictly it is the ray <Katex tex="x\ge1" />, since <Katex tex="t\ge0" />; option A is the parallel line through the origin.</>,
  },
]

export default function SpecialistQ15_2020() {
  return (
    <MCQShell
      question={
        <p>
          Two forces,{' '}
          <Katex tex="\underset{\sim}{F}_A=4\underset{\sim}{i}-2\underset{\sim}{j}" /> and{' '}
          <Katex tex="\underset{\sim}{F}_B=2\underset{\sim}{i}+5\underset{\sim}{j}" />, act on
          a particle of mass 3 kg. The particle is initially at rest at position{' '}
          <Katex tex="\underset{\sim}{i}+\underset{\sim}{j}" />. All force components are
          measured in newtons and displacements are measured in metres.
          <br />
          The cartesian equation of the path of the particle is
        </p>
      }
      background={
        <Background title="Force wording, vector calculus">
          <p>
            Mechanics is off the current study design, and one line here does use{' '}
            <Katex tex="\Sigma\underset{\sim}{F}=m\underset{\sim}{a}" />. Everything after
            that line — antidifferentiating a constant acceleration vector twice, then
            eliminating the parameter — is current vector calculus, so the question is worth
            doing with the first line handed to you.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=\frac{x}{2}" /> },
        { letter: 'B', content: <Katex tex="y=\frac{x}{2}-\frac12" /> },
        { letter: 'C', content: <Katex tex="y=\frac{(x+1)^2}{2}+1" /> },
        { letter: 'D', content: <Katex tex="y=\frac{(x-1)^2}{2}+1" /> },
        { letter: 'E', content: <Katex tex="y=\frac{x}{2}+\frac12" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
