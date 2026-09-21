// 2016 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 68% correct.
// Recovering b and c from one complex root of z³ + bz² + cz = 0. Question text
// transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 7, C: 10, D: 6, E: 68 },
  answer: 'E',
  noAnswer: 1,
  comment: <><Katex tex="z=3+2i" /> is also a solution.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z^3+bz^2+cz = z\left(z^2+bz+c\right) = 0" />,
    reason: <>Factor out the <Katex tex="z" /> first: <Katex tex="z=0" /> is one root, and the complex pair comes from the quadratic.</>,
  },
  {
    working: <Katex display tex="3-2i \text{ is a root} \implies 3+2i \text{ is a root}" />,
    reason: <><Katex tex="b" /> and <Katex tex="c" /> are real, so non-real roots come in conjugate pairs.</>,
  },
  {
    working: <Katex display tex="z^2+bz+c = \bigl(z-(3-2i)\bigr)\bigl(z-(3+2i)\bigr)" />,
    reason: <>Those two roots account for the whole quadratic.</>,
  },
  {
    working: <Katex display tex="= z^2-6z+\left(9-4i^2\right) = z^2-6z+13" />,
    reason: <>Sum of roots <Katex tex="6" />, product <Katex tex="(3-2i)(3+2i)=9+4=13" />.</>,
  },
  {
    working: <Katex display tex="\boxed{b=-6,\ c=13}" />,
    reason: <>Option E. Option A has the sign of <Katex tex="b" /> wrong — remember the coefficient of <Katex tex="z" /> is <em>minus</em> the sum of the roots.</>,
  },
]

export default function SpecialistQ4_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            One of the roots of <Katex tex="z^3+bz^2+cz=0" /> is <Katex tex="3-2i" />, where{' '}
            <Katex tex="b" /> and <Katex tex="c" /> are real numbers.
          </p>
          <p>
            The values of <Katex tex="b" /> and <Katex tex="c" /> respectively are
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <><Katex tex="6" />, <Katex tex="13" /></> },
        { letter: 'B', content: <><Katex tex="3" />, <Katex tex="-2" /></> },
        { letter: 'C', content: <><Katex tex="-3" />, <Katex tex="2" /></> },
        { letter: 'D', content: <><Katex tex="2" />, <Katex tex="3" /></> },
        { letter: 'E', content: <><Katex tex="-6" />, <Katex tex="13" /></>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
