// 2015 Specialist Mathematics — Exam 2, MCQ 17. VCAA examination report: 48% correct.
// Find cos(∠ABC) from the position vectors of A, B, C, using BA and BC.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 22, C: 48, D: 10, E: 9 },
  answer: 'C',
  noAnswer: 1,
  comment: <>Application of the scalar product to <Katex tex="\overrightarrow{BA}" /> and <Katex tex="\overrightarrow{BC}" /> gives the required result.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} \overrightarrow{BA} &= \underset{\sim}{a}-\underset{\sim}{b} \\ &= (2\underset{\sim}{i}+\underset{\sim}{j})-(3\underset{\sim}{i}-\underset{\sim}{j}+\underset{\sim}{k}) \end{aligned}" />
        <Katex display tex="= -\underset{\sim}{i}+2\underset{\sim}{j}-\underset{\sim}{k}" />
      </>
    ),
    reason: <>The angle <Katex tex="\angle ABC" /> is the angle <em>at</em> <Katex tex="B" />, between the two rays <Katex tex="BA" /> and <Katex tex="BC" /> — so both vectors must start from <Katex tex="B" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} \overrightarrow{BC} &= \underset{\sim}{c}-\underset{\sim}{b} \\ &= -3\underset{\sim}{j}+\underset{\sim}{k}-(3\underset{\sim}{i}-\underset{\sim}{j}+\underset{\sim}{k}) \end{aligned}" />
        <Katex display tex="= -3\underset{\sim}{i}-2\underset{\sim}{j}" />
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} |\overrightarrow{BA}| &= \sqrt{(-1)^2+2^2+(-1)^2} \\ &= \sqrt6 \end{aligned}" />
        <Katex display tex="\begin{aligned} |\overrightarrow{BC}| &= \sqrt{(-3)^2+(-2)^2+0^2} \\ &= \sqrt{13} \end{aligned}" />
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \overrightarrow{BA}\cdot\overrightarrow{BC} &= (-1)(-3)+(2)(-2)+(-1)(0) \\ &= 3-4+0 \\ &= -1 \end{aligned}" />,
  },
  {
    working: <Katex display tex="\cos(\angle ABC) = \frac{\overrightarrow{BA}\cdot\overrightarrow{BC}}{|\overrightarrow{BA}||\overrightarrow{BC}|}" />,
    reason: 'The scalar-product formula for the angle between two vectors.',
  },
  {
    working: <Katex display tex="\boxed{\cos(\angle ABC) = \frac{-1}{\sqrt6\sqrt{13}}}" />,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function SpecialistQ17_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Points <Katex tex="A" />, <Katex tex="B" /> and <Katex tex="C" /> have position vectors{' '}
            <Katex tex="\underset{\sim}{a} = 2\underset{\sim}{i}+\underset{\sim}{j}" />,{' '}
            <Katex tex="\underset{\sim}{b} = 3\underset{\sim}{i}-\underset{\sim}{j}+\underset{\sim}{k}" /> and{' '}
            <Katex tex="\underset{\sim}{c} = -3\underset{\sim}{j}+\underset{\sim}{k}" /> respectively.
          </p>
          <p>The cosine of angle <Katex tex="ABC" /> is equal to</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{5}{\sqrt6\sqrt{10}}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{7}{\sqrt6\sqrt{13}}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{-1}{\sqrt6\sqrt{13}}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{-7}{\sqrt{21}\sqrt6}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{-2}{\sqrt6\sqrt{13}}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
