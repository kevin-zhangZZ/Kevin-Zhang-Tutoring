// 2024 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 50% correct.
// Acceleration of an exponential is a constant multiple of the position. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 30, C: 50, D: 13 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x = e^{(k-1)t}" />,
    reason: <>Here <Katex tex="k" /> is a constant, so <Katex tex="k-1" /> is just the growth rate.</>,
  },
  {
    working: <Katex display tex="v = \frac{dx}{dt} = (k-1)e^{(k-1)t}" />,
    reason: 'Chain rule.',
  },
  {
    working: <Katex display tex="a = \frac{dv}{dt} = (k-1)^2e^{(k-1)t} = (k-1)^2 x" />,
    reason: <>Differentiating again. Recognising the answer as a multiple of <Katex tex="x" /> is what makes the substitution at the end trivial — there is no need to solve for <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="x = k+1 \implies a = (k-1)^2(k+1)" />,
    reason: 'Substituting the given position.',
  },
  {
    working: <Katex display tex="(k-1)^2(k+1) = (k-1)\bigl[(k-1)(k+1)\bigr] = (k-1)\left(k^2-1\right)" />,
    reason: <>Regrouping into the form the options use. Option <b>B</b>, <Katex tex="\left(k^2-1\right)(k+1)" />, is the same product with the wrong bracket doubled — and was chosen by 30%.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(k^2-1\right)(k-1)}" />,
    reason: <>Option <b>C</b>.</>,
  },
]

export default function SpecialistQ12_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-1">
          <p>
            The position, <Katex tex="x" /> metres, of a particle moving in a straight line
            from a fixed origin <Katex tex="O" /> at time <Katex tex="t" /> seconds, is given
            by <Katex tex="x=e^{(k-1)t}" />, where <Katex tex="k>1" />.
          </p>
          <p>
            The acceleration of the particle, in m s<Katex tex="^{-2}" />, when{' '}
            <Katex tex="x=k+1" /> is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="k^2-1" /> },
        { letter: 'B', content: <Katex tex="\left(k^2-1\right)(k+1)" /> },
        { letter: 'C', content: <Katex tex="\left(k^2-1\right)(k-1)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="(k-1)^2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
