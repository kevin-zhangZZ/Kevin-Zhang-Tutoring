// 2017 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 75% correct.
// Implied domain of 2arccos(1/x). Question text transcribed from the original paper;
// solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 1, B: 8, C: 75, D: 4, E: 12 },
  answer: 'C',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="-1\le\tfrac1x\le1 \implies x\in(-\infty,-1]\cup[1,\infty)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="-1\le\frac1x\le1" />,
    reason: <>The domain of <Katex tex="\arccos" /> is <Katex tex="[-1,1]" />, so whatever goes inside must land there. The outer factor of <Katex tex="2" /> changes nothing.</>,
  },
  {
    working: <Katex display tex="\left|\frac1x\right|\le1" />,
    reason: <>The same statement without splitting into cases — easier to invert.</>,
  },
  {
    working: <Katex display tex="|x|\ge1" />,
    reason: <>Taking reciprocals flips the inequality. Beware of doing this by multiplying through by <Katex tex="x" />, whose sign is unknown; the modulus form avoids the trap.</>,
  },
  {
    working: <Katex display tex="\boxed{(-\infty,-1]\cup[1,\infty)}" />,
    reason: <>Option C. Note <Katex tex="x=0" /> is excluded automatically — <Katex tex="|0|\ge1" /> is false — so no separate exclusion is needed. Spot-check: <Katex tex="x=2" /> gives <Katex tex="2\arccos(0.5)" />, fine; <Katex tex="x=0.5" /> gives <Katex tex="\arccos(2)" />, undefined.</>,
  },
]

export default function SpecialistQ1_2017() {
  return (
    <MCQShell
      question={
        <p>
          The implied domain of{' '}
          <Katex tex="f(x)=2\cos^{-1}\!\left(\dfrac1x\right)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="R" /> },
        { letter: 'B', content: <Katex tex="[-1,1]" /> },
        { letter: 'C', content: <Katex tex="(-\infty,-1]\cup[1,\infty)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="R\setminus\{0\}" /> },
        { letter: 'E', content: <Katex tex="[-1,1]\setminus\{0\}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
