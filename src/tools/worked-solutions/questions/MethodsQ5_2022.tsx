// 2022 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 74% correct.
// The largest domain restriction making a parabola one-to-one. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
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
    reason: <>Complete the square: half of <Katex tex="3" /> is <Katex tex="\tfrac32" />, and <Katex tex="\tfrac94+10=\tfrac{49}{4}" />. So the turning point is <Katex tex="\left(-\tfrac32,-\tfrac{49}{4}\right)" />.</>,
    more: <>Two other ways to find the axis of symmetry. The <Katex tex="x" />-intercepts are <Katex tex="-5" /> and <Katex tex="2" />, since <Katex tex="f(x)=(x+5)(x-2)" />, and the axis is halfway between them, at <Katex tex="-1.5" />. Or on CAS, <Cas fn="fMin">fMin(x^2+3x−10, x)</Cas> gives <Katex tex="x=-1.5" /> directly: the <Katex tex="x" />-value of the minimum, which is what this question wants.</>,
  },
  {
    working: <Katex display tex="f \text{ is decreasing on } \left(-\infty,-\tfrac32\right]" />,
    reason: <>Left of the turning point, <Katex tex="f" /> only goes down, so no output repeats: <Katex tex="f" /> is one-to-one on <Katex tex="(-\infty,a]" /> as long as the domain stops at the turning point. If <Katex tex="a" /> went past <Katex tex="-\tfrac32" />, the domain would include points either side of the axis with equal outputs, so the largest <Katex tex="a" /> is <Katex tex="-\tfrac32" />.</>,
    more: <>For example, <Katex tex="-3" /> and <Katex tex="0" /> are both <Katex tex="1.5" /> from the axis, and <Katex tex="f(-3)=f(0)=-10" />. Even a small step past the turning point lets in such a pair: with <Katex tex="a=-1" />, the domain contains both <Katex tex="-2" /> and <Katex tex="-1" />, and <Katex tex="f(-2)=f(-1)=-12" />. Any <Katex tex="a\le-\tfrac32" /> works, and "largest" picks the endpoint <Katex tex="a=-\tfrac32" /> itself, which is allowed because the bracket in <Katex tex="(-\infty,a]" /> includes it.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -1.5}" />,
    reason: <>Matches option <b>C</b>: <Katex tex="a" /> is an <Katex tex="x" />-value, the <Katex tex="x" />-coordinate of the turning point.</>,
    more: <>Option A, <Katex tex="-12.25" />, was the most popular wrong answer. It is the <em>minimum value</em> <Katex tex="f\!\left(-\tfrac32\right)=-\tfrac{49}{4}" />, the <Katex tex="y" />-coordinate of the turning point rather than its <Katex tex="x" />-coordinate. <Katex tex="a=-12.25" /> would still make <Katex tex="f" /> one-to-one, but it is nowhere near the largest such value. Options B and E are the <Katex tex="x" />-intercepts: <Katex tex="a=-5" /> also makes <Katex tex="f" /> one-to-one but is too small, while <Katex tex="a=2" /> (like option D, <Katex tex="a=0" />) lies past the turning point.</>,
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
