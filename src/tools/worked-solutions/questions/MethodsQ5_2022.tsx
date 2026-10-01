// 2022 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 74% correct.
// The largest domain restriction making a parabola one-to-one. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 5, C: 74, D: 5, E: 6 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^2+3x-10" />,
    reason: <>A parabola is not one-to-one: every horizontal line above the turning point cuts it twice, once on each side of the axis of symmetry. It becomes one-to-one only when the domain keeps just one side of the turning point.</>,
  },
  {
    working: <Katex display tex="f(x) = \left(x+\tfrac32\right)^2-\tfrac{49}{4}" />,
    reason: <>Complete the square: half of <Katex tex="3" /> is <Katex tex="\tfrac32" />, and <Katex tex="\tfrac94+10=\tfrac{49}{4}" />. So the turning point is <Katex tex="\left(-\tfrac32,-\tfrac{49}{4}\right)" />. (Or: the <Katex tex="x" />-intercepts are <Katex tex="-5" /> and <Katex tex="2" />, and the axis of symmetry is halfway between them, at <Katex tex="-1.5" />.)</>,
  },
  {
    working: <Katex display tex="f \text{ is decreasing on } \left(-\infty,-\tfrac32\right]" />,
    reason: <>The domain <Katex tex="(-\infty,a]" /> keeps the left-hand branch. Points equally far either side of the axis give the same output, for example <Katex tex="f(-3)=f(0)=-10" />. If <Katex tex="a" /> went even slightly past <Katex tex="-\tfrac32" />, the domain would contain such a pair just either side of <Katex tex="-\tfrac32" />. So <Katex tex="a" /> can be at most <Katex tex="-\tfrac32" />, and "largest" means exactly that.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -1.5}" />,
    reason: <>Matches option <b>C</b>. Option A, <Katex tex="-12.25" />, is the <em>minimum value</em> <Katex tex="f\!\left(-\tfrac32\right)" />, a <Katex tex="y" />-value rather than an <Katex tex="x" />-value. Options B and E are the <Katex tex="x" />-intercepts: <Katex tex="a=-5" /> does make <Katex tex="f" /> one-to-one but is not the largest such value, while <Katex tex="a=2" /> (like option D, <Katex tex="a=0" />) lies past the turning point.</>,
  },
]

export default function MethodsQ5_2022() {
  return (
    <MCQShell
      question={
        <p>
          The largest value of <Katex tex="a" /> such that the function{' '}
          <Katex tex="f:(-\infty,a]\to R" />, <Katex tex="f(x)=x^2+3x-10" />, where{' '}
          <Katex tex="f" /> is one-to-one, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-12.25" /> },
        { letter: 'B', content: <Katex tex="-5" /> },
        { letter: 'C', content: <Katex tex="-1.5" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="0" /> },
        { letter: 'E', content: <Katex tex="2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
