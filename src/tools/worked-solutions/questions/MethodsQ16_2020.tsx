// 2020 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 53% correct.
// Maximising the area of a triangle under a parabola. Question text transcribed from the original paper; the figure is a crop of VCAA's own artwork; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import triangleSrc from './meth-2020-mcq16-triangle.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 16, C: 17, D: 53, E: 6 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="OB = m, \qquad BC = 9-m^2" />,
    reason: <>The two perpendicular sides: the base along the <Katex tex="x" />-axis, and the height straight up to the parabola.</>,
  },
  {
    working: <Katex display tex="A(m) = \tfrac12 m\left(9-m^2\right) = \tfrac12\left(9m-m^3\right)" />,
    reason: <>Half base times height, as a function of <Katex tex="m" /> alone.</>,
  },
  {
    working: <Katex display tex="A'(m) = \tfrac12\left(9-3m^2\right)" />,
    reason: <>Differentiating.</>,
  },
  {
    working: <Cas fn="solve">solve(9 - 3m^2 = 0, m) | 0 &lt; m &lt; 3</Cas>,
    reason: <>The domain <Katex tex="m\in(0,3)" /> rules out the negative root.</>,
  },
  {
    working: <Katex display tex="m = \sqrt3" />,
    reason: <>A maximum, since <Katex tex="A'>0" /> before it and <Katex tex="A'<0" /> after.</>,
  },
  {
    working: <Katex display tex="A\!\left(\sqrt3\right) = \tfrac12\sqrt3\left(9-3\right) = \tfrac12\sqrt3\times6" />,
    reason: <>Substituting back — the question asks for the <em>area</em>, not the value of <Katex tex="m" />.</>,
  },
  {
    working: <Katex display tex="\boxed{3\sqrt3}" />,
    reason: <>Option D. Answering <Katex tex="\sqrt3" /> (option C) stops at <Katex tex="m" />.</>,
  },
]

export default function MethodsQ16_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A right-angled triangle, <Katex tex="OBC" />, is formed using the horizontal axis
            and the point <Katex tex="C\left(m,9-m^2\right)" />, where{' '}
            <Katex tex="m\in(0,3)" />, on the parabola <Katex tex="y=9-x^2" />, as shown
            below.
          </p>
          <p>The maximum area of the triangle <Katex tex="OBC" /> is</p>
        </>
      }
      diagram={
        <img
          src={triangleSrc}
          alt="The parabola y = 9 − x² in the first quadrant with a shaded right-angled triangle from the origin O to B(m, 0) to C(m, 9 − m²) — from the original 2020 VCAA exam paper"
          className="w-full max-w-[330px]"
        />
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac{\sqrt3}{3}" /> },
        { letter: 'B', content: <Katex tex="\tfrac{2\sqrt3}{3}" /> },
        { letter: 'C', content: <Katex tex="\sqrt3" /> },
        { letter: 'D', content: <Katex tex="3\sqrt3" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="9\sqrt3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
