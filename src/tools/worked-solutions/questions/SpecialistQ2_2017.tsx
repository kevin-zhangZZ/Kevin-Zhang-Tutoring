// 2017 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 37% correct
// (tied for third-hardest in the 2017-2018 Specialist Exam 2 papers).
// A trigonometric inequality involving cosec — solve with care around the sign of sin(x).
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 30, C: 11, D: 12, E: 37 },
  answer: 'E',
  noAnswer: 1,
  comment: 'The solve and graphing capabilities of a CAS could have been used to find the correct answer.',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(x) > \tfrac14\operatorname{cosec}(x) = \frac{1}{4\sin(x)}" />,
    reason: <>Rewrite <Katex tex="\operatorname{cosec}(x)=1/\sin(x)" />. Multiplying by <Katex tex="\sin(x)" /> will flip the inequality wherever <Katex tex="\sin(x)<0" />, so the two cases <Katex tex="x\in(0,\pi)" /> and <Katex tex="x\in(\pi,2\pi)" /> need separate treatment.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{Case } \sin(x)>0,\ x\in(0,\pi): \quad \cos(x)\sin(x) > \tfrac14" />
        <Katex display tex="\iff\; \sin(2x) > \tfrac12" />
      </>
    ),
    reason: <>Multiplying by the positive <Katex tex="\sin(x)" /> keeps the inequality direction; then use <Katex tex="\sin(x)\cos(x)=\tfrac12\sin(2x)" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="2x\in(0,2\pi): \ \sin(2x)>\tfrac12" />
        <Katex display tex="\iff\; 2x\in\left(\tfrac{\pi}{6},\tfrac{5\pi}{6}\right)" />
        <Katex display tex="\implies\; x\in\left(\tfrac{\pi}{12},\tfrac{5\pi}{12}\right)" />
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\text{Case } \sin(x)<0,\ x\in(\pi,2\pi): \quad \cos(x)\sin(x) < \tfrac14" />
        <Katex display tex="\iff\; \sin(2x) < \tfrac12" />
      </>
    ),
    reason: <>Now multiplying by the negative <Katex tex="\sin(x)" /> flips the inequality.</>,
  },
  {
    working: <Katex display tex="2x\in(2\pi,4\pi): \ \sin(2x)<\tfrac12 \text{ fails only on } \left(\tfrac{13\pi}{6},\tfrac{17\pi}{6}\right)" />,
    reason: <>The excluded band is where <Katex tex="\sin(2x)>\tfrac12" /> instead — the same shape as before, shifted one full period on.</>,
  },
  {
    working: <Katex display tex="x\in\left(\pi,\tfrac{13\pi}{12}\right) \cup \left(\tfrac{17\pi}{12},2\pi\right)" />,
    reason: <>Halve the <Katex tex="2x" />-bounds (and their complement within <Katex tex="(2\pi,4\pi)" />) to get back to <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x\in\left(\tfrac{\pi}{12},\tfrac{5\pi}{12}\right) \cup \left(\pi,\tfrac{13\pi}{12}\right) \cup \left(\tfrac{17\pi}{12},2\pi\right)}" />,
    reason: <>Combine both cases. Matches option <b>E</b>.</>,
  },
]

export default function SpecialistQ2_2017() {
  return (
    <MCQShell
      question={
        <p>
          The solutions to <Katex tex="\cos(x) > \tfrac14\operatorname{cosec}(x)" /> for{' '}
          <Katex tex="x\in(0,2\pi)\setminus\{\pi\}" /> are given by
        </p>
      }
      options={[
        {
          letter: 'A',
          content: (
            <Katex tex="x\in\left(\tfrac{\pi}{12},\tfrac{5\pi}{12}\right)\cup\left(\tfrac{5\pi}{12},\tfrac{13\pi}{12}\right)\cup\left(\tfrac{17\pi}{12},2\pi\right)" />
          ),
        },
        { letter: 'B', content: <Katex tex="x\in\left(\tfrac{\pi}{12},\tfrac{5\pi}{12}\right)\cup\left(\tfrac{13\pi}{12},\tfrac{17\pi}{12}\right)" /> },
        {
          letter: 'C',
          content: (
            <Katex tex="x\in\left(\tfrac{\pi}{12},\tfrac{5\pi}{12}\right)\cup\left(\pi,\tfrac{13\pi}{12}\right)\cup\left(\tfrac{13\pi}{12},2\pi\right)" />
          ),
        },
        { letter: 'D', content: <Katex tex="x\in\left(\tfrac{\pi}{12},\tfrac{13\pi}{12}\right)\cup\left(\tfrac{17\pi}{12},2\pi\right)" /> },
        {
          letter: 'E',
          content: (
            <Katex tex="x\in\left(\tfrac{\pi}{12},\tfrac{5\pi}{12}\right)\cup\left(\pi,\tfrac{13\pi}{12}\right)\cup\left(\tfrac{17\pi}{12},2\pi\right)" />
          ),
          isAnswer: true,
        },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
