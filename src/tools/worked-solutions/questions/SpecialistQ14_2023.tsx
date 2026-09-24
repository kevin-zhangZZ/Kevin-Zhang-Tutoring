// 2023 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 48% correct.
// Finding c·n for a unit vector n orthogonal to two given vectors. Question text transcribed
// from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 48, C: 16, D: 9, E: 19 },
  answer: 'B',
  comment: (
    <>
      <Katex tex="\underset{\sim}{n}=x\underset{\sim}{i}+y\underset{\sim}{j}+z\underset{\sim}{k},\ x+y=0,\ x-y=0\Rightarrow x=0,\ y=0" />
      <br />
      <Katex tex="\Rightarrow\underset{\sim}{n}=\pm\underset{\sim}{k},\ \left|\underset{\sim}{c}.\underset{\sim}{n}\right|=3" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{n} = x\underset{\sim}{i} + y\underset{\sim}{j} + z\underset{\sim}{k}" />,
    reason: <>General form of the unknown vector.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{n} = x+y = 0 \qquad \underset{\sim}{b}\cdot\underset{\sim}{n} = x-y = 0" />,
    reason: <>Apply the two orthogonality conditions with <Katex tex="\underset{\sim}{a}=\underset{\sim}{i}+\underset{\sim}{j}" /> and <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}-\underset{\sim}{j}" />.</>,
  },
  {
    working: <Katex display tex="x+y=0 \text{ and } x-y=0 \;\implies\; x=0,\ y=0" />,
    reason: <>Add and subtract the two equations.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{n} = z\underset{\sim}{k},\quad |\underset{\sim}{n}|=1 \;\implies\; z=\pm1" />,
    reason: <>Only the <Katex tex="\underset{\sim}{k}" /> component survives; the unit-length condition pins down <Katex tex="z" /> up to sign.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{c}\cdot\underset{\sim}{n} = \left(\underset{\sim}{i}+2\underset{\sim}{j}+3\underset{\sim}{k}\right)\cdot\left(\pm\underset{\sim}{k}\right) = \pm3" />,
    reason: <>Only the <Katex tex="\underset{\sim}{k}" /> component of <Katex tex="\underset{\sim}{c}" /> contributes. The sign depends on which unit normal is taken — which is why the question asks for the modulus.</>,
  },
  {
    working: <Katex display tex="\boxed{\left|\underset{\sim}{c}\cdot\underset{\sim}{n}\right| = 3}" />,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ14_2023() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="\underset{\sim}{a} = \underset{\sim}{i}+\underset{\sim}{j}" />, <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}-\underset{\sim}{j}" /> and{' '}
          <Katex tex="\underset{\sim}{c} = \underset{\sim}{i}+2\underset{\sim}{j}+3\underset{\sim}{k}" />.
          <br />
          If <Katex tex="\underset{\sim}{n}" /> is a unit vector such that <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{n}=0" /> and{' '}
          <Katex tex="\underset{\sim}{b}\cdot\underset{\sim}{n}=0" />, then <Katex tex="\left|\underset{\sim}{c}\cdot\underset{\sim}{n}\right|" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="4" /> },
        { letter: 'D', content: <Katex tex="5" /> },
        { letter: 'E', content: <Katex tex="6" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
