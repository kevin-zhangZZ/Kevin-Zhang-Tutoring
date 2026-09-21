// 2017 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 78% correct.
// The vector resolute of a in the direction of b. Question text transcribed from the
// original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 16, C: 78, D: 2, E: 2 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = 3(2)+(-4)(2)+12(-1) = 6-8-12 = -14" />,
    reason: <>Matching components, multiply and add. Negative, so the resolute points opposite to <Katex tex="\underset{\sim}{b}" />.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{b}\right|^2 = 2^2+2^2+(-1)^2 = 9" />,
    reason: <>So <Katex tex="\left|\underset{\sim}{b}\right|=3" />. Careful: the vector resolute divides by <Katex tex="\left|\underset{\sim}{b}\right|^2" />, not <Katex tex="\left|\underset{\sim}{b}\right|" />.</>,
  },
  {
    working: <Katex display tex="\text{vector resolute} = \frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{b}\right|^2}\,\underset{\sim}{b}" />,
    reason: <>Equivalently <Katex tex="\left(\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}\right)\hat{\underset{\sim}{b}}" /> — the unit vector appears twice, which is where the square comes from.</>,
  },
  {
    working: <Katex display tex="\boxed{-\frac{14}{9}\left(2\underset{\sim}{i}+2\underset{\sim}{j}-\underset{\sim}{k}\right)}" />,
    reason: <>Option C. Option B divides by <Katex tex="3" /> instead of <Katex tex="9" />; options A and D are scalars, so they answer "scalar resolute" instead — and <Katex tex="-\tfrac{14}{3}" /> is indeed that scalar resolute.</>,
  },
]

export default function SpecialistQ13_2017() {
  return (
    <MCQShell
      question={
        <p>
          Given the vectors{' '}
          <Katex tex="\underset{\sim}{a}=3\underset{\sim}{i}-4\underset{\sim}{j}+12\underset{\sim}{k}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{b}=2\underset{\sim}{i}+2\underset{\sim}{j}-\underset{\sim}{k}" />
          , the vector resolute of <Katex tex="\underset{\sim}{a}" /> in the direction of{' '}
          <Katex tex="\underset{\sim}{b}" /> is
        </p>
      }
      background={
        <p>
          Two things are called a "resolute" and they are not the same object. The{' '}
          <em>scalar</em> resolute is{' '}
          <Katex tex="\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}" />, a number. The{' '}
          <em>vector</em> resolute is{' '}
          <Katex tex="\left(\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}\right)\hat{\underset{\sim}{b}}" />
          , a vector pointing along <Katex tex="\underset{\sim}{b}" />. Two of the five
          options here are scalars, put there for anyone who answers the wrong one.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\dfrac{14}{3}" /> },
        { letter: 'B', content: <Katex tex="-\dfrac{14}{3}\left(2\underset{\sim}{i}+2\underset{\sim}{j}-\underset{\sim}{k}\right)" /> },
        { letter: 'C', content: <Katex tex="-\dfrac{14}{9}\left(2\underset{\sim}{i}+2\underset{\sim}{j}-\underset{\sim}{k}\right)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="-\dfrac{14}{13}" /> },
        { letter: 'E', content: <Katex tex="-\dfrac{14}{169}\left(3\underset{\sim}{i}-4\underset{\sim}{j}+12\underset{\sim}{k}\right)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
