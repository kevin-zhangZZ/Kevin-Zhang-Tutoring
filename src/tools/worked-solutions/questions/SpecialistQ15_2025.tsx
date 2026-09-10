// 2025 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 52% correct. This
// year's paper used four options (A–D) rather than five. Rearranging the angle-between-planes
// formula into an equation for an unknown coefficient. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 52, B: 20, C: 14, D: 14 },
  answer: 'A',
  comment: <>The angle between planes is the same as the angle between the normals to the planes.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\vec n_1 = (2,2,1) \qquad \vec n_2 = (a,0,4)" />,
    reason: 'Normal vectors read off from each plane’s equation.',
  },
  {
    working: <Katex display tex="\cos(\text{angle}) = \frac{|\vec n_1\cdot\vec n_2|}{|\vec n_1||\vec n_2|} = \frac{|2a+4|}{3\sqrt{a^2+16}}" />,
    reason: <>Angle between planes = angle between normals; <Katex tex="|\vec n_1|=\sqrt{4+4+1}=3" />.</>,
  },
  {
    working: <Katex display tex="a>0 \;\implies\; 2a+4>0 \;\implies\; |2a+4|=2a+4" />,
    reason: 'Drop the absolute value using the given sign of a.',
  },
  {
    working: <Katex display tex="\frac{2a+4}{3\sqrt{a^2+16}} = \frac{2}{3}" />,
    reason: <>Set equal to the given <Katex tex="\cos\big(\cos^{-1}(2/3)\big)=2/3" />.</>,
  },
  {
    working: <Katex display tex="3(2a+4) = 2\cdot3\sqrt{a^2+16} \;\implies\; 6a+12 = 6\sqrt{a^2+16}" />,
    reason: 'Cross-multiply.',
  },
  {
    working: <Katex display tex="\boxed{a+2 = \sqrt{a^2+16}}" />,
    reason: <>Divide through by 6 — matches option <b>A</b>.</>,
  },
]

export default function SpecialistQ15_2025() {
  return (
    <MCQShell
      question={
        <p>
          Consider the two planes described by the equations <Katex tex="2x+2y+z=2" /> and{' '}
          <Katex tex="ax+4z=1" />, where <Katex tex="a" /> is a positive constant.
          <br />
          The angle between the two planes is <Katex tex="\cos^{-1}\!\big(\tfrac23\big)" />.
          <br />
          The value of <Katex tex="a" /> satisfies the equation
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="a+2=\sqrt{a^2+16}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\dfrac{2a+4}{3\sqrt{a^2+16}}=\dfrac32" /> },
        { letter: 'C', content: <Katex tex="2a+4=3\sqrt{a^2+16}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{2a+4}{\sqrt{a^2+16}}=\dfrac23" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
