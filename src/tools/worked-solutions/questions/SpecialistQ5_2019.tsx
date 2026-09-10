// 2019 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 38% correct.
// Two rays from fixed points at given arguments intersect at (a, b); find b. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 25, C: 8, D: 38, E: 21 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      Intersection of <Katex tex="y = x-2,\ x\geq 2" /> and{' '}
      <Katex tex="y-1 = -\tfrac{1}{\sqrt3}(x-5),\ x\leq 5" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{Arg}(z-2) = \tfrac{\pi}{4}" />,
    reason: <>A ray from <Katex tex="(2,0)" /> at angle <Katex tex="\tfrac{\pi}{4}" />, gradient <Katex tex="\tan\tfrac{\pi}{4}=1" />.</>,
  },
  {
    working: <Katex display tex="y - 0 = 1\cdot(x-2) \;\implies\; y = x-2,\ \ x>2" />,
    reason: 'Point-gradient form of the first ray (only the forward half-line counts, since Arg fixes a direction, not a full line).',
  },
  {
    working: <Katex display tex="\mathrm{Arg}\big(z-(5+i)\big) = \tfrac{5\pi}{6}" />,
    reason: <>A ray from <Katex tex="(5,1)" /> at angle <Katex tex="\tfrac{5\pi}{6}" />, gradient <Katex tex="\tan\tfrac{5\pi}{6}=-\tfrac{1}{\sqrt3}" />.</>,
  },
  {
    working: <Katex display tex="y - 1 = -\tfrac{1}{\sqrt3}(x-5),\ \ x<5" />,
    reason: 'Point-gradient form of the second ray.',
  },
  {
    working: <Katex display tex="\begin{aligned} x-2-1 &= -\tfrac{1}{\sqrt3}(x-5) \\ \sqrt3(x-3) &= -(x-5) \\ x(\sqrt3+1) &= 5+3\sqrt3 \end{aligned}" />,
    reason: <>Substitute <Katex tex="y=x-2" /> into the second ray and solve for <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="x = \frac{5+3\sqrt3}{\sqrt3+1} = \frac{(5+3\sqrt3)(\sqrt3-1)}{2} = \sqrt3+2" />,
    reason: <>Rationalise the denominator — both <Katex tex="x=2+\sqrt3\approx3.73" /> and <Katex tex="y=x-2\approx1.73" /> land inside the two rays' valid ranges, confirming the ray (not just line) intersection.</>,
  },
  {
    working: <Katex display tex="\boxed{b = y = x-2 = \sqrt3}" />,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function SpecialistQ5_2019() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="z=x+yi" />, where <Katex tex="x,y\in\mathbb{R}" />. The rays{' '}
          <Katex tex="\mathrm{Arg}(z-2) = \tfrac{\pi}{4}" /> and{' '}
          <Katex tex="\mathrm{Arg}\big(z-(5+i)\big) = \tfrac{5\pi}{6}" />, where <Katex tex="z\in\mathbb{C}" />, intersect on
          the complex plane at a point <Katex tex="(a,b)" />. The value of <Katex tex="b" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\sqrt3" /> },
        { letter: 'B', content: <Katex tex="2-\sqrt3" /> },
        { letter: 'C', content: <Katex tex="0" /> },
        { letter: 'D', content: <Katex tex="\sqrt3" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="2+\sqrt3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
