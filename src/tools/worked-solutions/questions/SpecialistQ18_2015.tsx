// 2015 Specialist Mathematics — Exam 2, MCQ 18. VCAA examination report: 75% correct.
// When two moving particles collide, not just where their paths cross. Question text
// transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 75, C: 8, D: 10, E: 2 },
  answer: 'B',
  noAnswer: 0,
  comment: <>Both <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> components must equate.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}_1(t) = \underset{\sim}{r}_2(t)" />,
    reason: <>A collision means the same place at the <em>same time</em> — so it is one value of <Katex tex="t" /> that must satisfy both components, not two separate parameters.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{j}:\quad 3t+2 = 4+t" />,
    reason: <>Start with the linear component; the <Katex tex="\underset{\sim}{i}" /> equation is quadratic and messier.</>,
  },
  {
    working: <Katex display tex="2t = 2 \implies t = 1" />,
    reason: <>One candidate time, and it satisfies <Katex tex="t\ge0" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{i}:\quad 2+4(1)^2 = 6 \quad\text{and}\quad 6(1) = 6 \ \checkmark" />,
    reason: <>The check that matters: the <Katex tex="\underset{\sim}{i}" /> components agree at that same <Katex tex="t" />, so the particles really do meet rather than merely crossing paths.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}_1(1) = 6\underset{\sim}{i}+5\underset{\sim}{j}" />,
    reason: <>Substituting <Katex tex="t=1" /> back: <Katex tex="3(1)+2=5" /> for the <Katex tex="\underset{\sim}{j}" /> component.</>,
  },
  {
    working: <Katex display tex="\boxed{6\underset{\sim}{i}+5\underset{\sim}{j}}" />,
    reason: <>Matches option <b>B</b>. Options A and C are the two particles' positions at <Katex tex="t=\tfrac12" />, when their <Katex tex="\underset{\sim}{i}" /> components agree but their <Katex tex="\underset{\sim}{j}" /> components do not — paths crossing without a collision. The question asks <em>where</em>, so the answer is the position vector, not <Katex tex="t=1" />.</>,
  },
]

export default function SpecialistQ18_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The position vectors of two moving particles are given by{' '}
            <Katex tex="\underset{\sim}{r}_1(t)=\left(2+4t^2\right)\underset{\sim}{i}+(3t+2)\underset{\sim}{j}" />{' '}
            and{' '}
            <Katex tex="\underset{\sim}{r}_2(t)=(6t)\underset{\sim}{i}+(4+t)\underset{\sim}{j}" />
            , where <Katex tex="t\ge0" />.
          </p>
          <p>The particles will collide at</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="3\underset{\sim}{i}+3.5\underset{\sim}{j}" /> },
        { letter: 'B', content: <Katex tex="6\underset{\sim}{i}+5\underset{\sim}{j}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="3\underset{\sim}{i}+4.5\underset{\sim}{j}" /> },
        { letter: 'D', content: <Katex tex="0.5\underset{\sim}{i}+\underset{\sim}{j}" /> },
        { letter: 'E', content: <Katex tex="5\underset{\sim}{i}+6\underset{\sim}{j}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
