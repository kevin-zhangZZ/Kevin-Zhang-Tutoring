// 2021 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 60% correct.
// Two angles between vectors whose cosines are negatives of each other. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 11, C: 17, D: 60, E: 6 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(\theta) = \frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{a}\right|\left|\underset{\sim}{b}\right|} = \frac{x-1}{\sqrt{x^2+1}\cdot\sqrt2}" />,
    reason: <><Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=x(1)+1(-1)=x-1" />, and <Katex tex="\left|\underset{\sim}{b}\right|=\sqrt2" />.</>,
  },
  {
    working: <Katex display tex="\cos(\phi) = \frac{\underset{\sim}{b}\cdot\underset{\sim}{c}}{\left|\underset{\sim}{b}\right|\left|\underset{\sim}{c}\right|} = \frac{1-x}{\sqrt2\cdot\sqrt{1+x^2}}" />,
    reason: <><Katex tex="\underset{\sim}{b}\cdot\underset{\sim}{c}=1(1)+(-1)(x)=1-x" /> — the <em>negative</em> of the first dot product, and the two magnitudes are identical.</>,
  },
  {
    working: <Katex display tex="\cos(\theta)\cos(\phi) = \frac{(x-1)(1-x)}{2\left(1+x^2\right)}" />,
    reason: <>Both denominators are <Katex tex="\sqrt2\sqrt{1+x^2}" />, so they combine to <Katex tex="2\left(1+x^2\right)" />.</>,
  },
  {
    working: <Katex display tex="(x-1)(1-x) = -(x-1)^2" />,
    reason: <>A quantity times its own negative — this minus sign is the point of the question.</>,
  },
  {
    working: <Katex display tex="\boxed{-\frac{(x-1)^2}{2\left(1+x^2\right)}}" />,
    reason: <>Never positive, because the two angles always sit on opposite sides of <Katex tex="90^\circ" />. Matches option <b>D</b>.</>,
  },
]

export default function SpecialistQ12_2021() {
  return (
    <MCQShell
      question={
        <p>
          Consider the vectors{' '}
          <Katex tex="\underset{\sim}{a}=x\underset{\sim}{i}+\underset{\sim}{j}" />,{' '}
          <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}-\underset{\sim}{j}" /> and{' '}
          <Katex tex="\underset{\sim}{c}=\underset{\sim}{i}+x\underset{\sim}{j}" />.
          <br />
          Given that <Katex tex="\theta" /> is the angle between{' '}
          <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" />, and{' '}
          <Katex tex="\phi" /> is the angle between <Katex tex="\underset{\sim}{b}" /> and{' '}
          <Katex tex="\underset{\sim}{c}" />, <Katex tex="\cos(\theta)\cos(\phi)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac{2\left(1+x^2\right)}{1-x^2}" /> },
        { letter: 'B', content: <Katex tex="\frac{\sqrt2\left(1-x^2\right)}{1+x^2}" /> },
        { letter: 'C', content: <Katex tex="-\frac{(x+1)^2}{2\left(1+x^2\right)}" /> },
        {
          letter: 'D',
          content: <Katex tex="-\frac{(x-1)^2}{2\left(1+x^2\right)}" />,
          isAnswer: true,
        },
        { letter: 'E', content: <Katex tex="\frac{\sqrt2\left(1+x^2\right)}{1-x^2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
