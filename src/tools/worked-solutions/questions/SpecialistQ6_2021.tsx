// 2021 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 23% correct.
// The possible arguments of z when z² is real. Question text transcribed from the original
// paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 23, B: 15, C: 30, D: 24, E: 8 },
  answer: 'A',
  comment: <>The square of any <Katex tex="z" /> with the argument given in option A will be real.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z = r\,\mathrm{cis}(\theta),\quad r>0" />,
    reason: <>Write <Katex tex="z" /> in polar form, where <Katex tex="\theta=\arg(z)" />.</>,
  },
  {
    working: <Katex display tex="z^2 = r^2\,\mathrm{cis}(2\theta)" />,
    reason: <>De Moivre — modulus squares, argument doubles.</>,
  },
  {
    working: <Katex display tex="z^2\in\mathbb{R} \;\iff\; 2\theta = k\pi \text{ for some } k\in\mathbb{Z}" />,
    reason: <><Katex tex="\mathrm{cis}(\phi)" /> is real exactly when <Katex tex="\phi" /> is a multiple of <Katex tex="\pi" /> (giving <Katex tex="\pm1" />).</>,
  },
  {
    working: <Katex display tex="\boxed{\theta = \frac{k\pi}{2},\quad k\in\mathbb{Z}}" />,
    reason: <>Solve for <Katex tex="\theta" /> — matches option <b>A</b>. This includes both the axes: <Katex tex="\theta=0,\pi" /> (z real, so <Katex tex="z^2" /> real) and <Katex tex="\theta=\pm\tfrac{\pi}{2}" /> (z purely imaginary, so <Katex tex="z^2" /> real and negative). Option C only captures the purely-imaginary half of these.</>,
  },
]

export default function SpecialistQ6_2021() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="z\in\mathbb{C}" />, <Katex tex="z\neq0" /> and <Katex tex="z^2\in\mathbb{R}" />, then the possible
          values of <Katex tex="\arg(z)" /> are
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="\dfrac{k\pi}{2}" />, <Katex tex="k\in\mathbb{Z}" /></>, isAnswer: true },
        { letter: 'B', content: <><Katex tex="k\pi" />, <Katex tex="k\in\mathbb{Z}" /></> },
        { letter: 'C', content: <><Katex tex="\dfrac{(2k+1)\pi}{2}" />, <Katex tex="k\in\mathbb{Z}" /></> },
        { letter: 'D', content: <><Katex tex="\dfrac{(4k+1)\pi}{2}" />, <Katex tex="k\in\mathbb{Z}" /></> },
        { letter: 'E', content: <><Katex tex="\dfrac{(4k-1)\pi}{2}" />, <Katex tex="k\in\mathbb{Z}" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
