// 2016 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 69% correct.
// Writing a shaded region between two curves as definite integrals, where the lower curve
// stops before the upper one does. Question text transcribed from the original paper; the
// figure is a crop of VCAA's own artwork. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2016-mcq13-shaded.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 15, C: 6, D: 7, E: 69 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{shaded region: from } x=0 \text{ to } x=d" />,
    reason: <>Read the figure carefully. The dashed curve <Katex tex="y=f(x)" /> starts on the <Katex tex="y" />-axis above the origin and meets the <Katex tex="x" />-axis at <Katex tex="d" />; the shading runs all the way from the <Katex tex="y" />-axis to <Katex tex="d" />.</>,
  },
  {
    working: <Katex display tex="y=g(x) \text{ is above the } x\text{-axis only from } x=a \text{ to } x=c" />,
    reason: <>The solid curve meets the <Katex tex="x" />-axis at <Katex tex="a" />, just to the <em>right</em> of the origin, and again at <Katex tex="c" />, just before <Katex tex="d" />. So the bottom edge of the region is the <Katex tex="x" />-axis on <Katex tex="[0,a]" /> and on <Katex tex="[c,d]" />, and <Katex tex="g" /> only on <Katex tex="[a,c]" />.</>,
  },
  {
    working: <Katex display tex="\text{area} = \int_0^{a}f(x)\,dx+\int_a^{c}\bigl(f(x)-g(x)\bigr)dx+\int_c^{d}f(x)\,dx" />,
    reason: <>Split wherever the bottom edge changes.</>,
  },
  {
    working: <Katex display tex="= \int_0^{d}f(x)\,dx-\int_a^{c}g(x)\,dx" />,
    reason: <>The three <Katex tex="f" /> pieces join up into one integral from <Katex tex="0" /> to <Katex tex="d" />: everything under <Katex tex="f" />, minus the part under <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_0^{d}f(x)\,dx-\int_a^{c}g(x)\,dx}" />,
    reason: <>Matches option <b>E</b>. Option D is the three-piece split with the last piece starting at <Katex tex="b" /> instead of <Katex tex="c" />; option B (15%) subtracts <Katex tex="g" /> on <Katex tex="[0,a]" /> and <Katex tex="[c,d]" />, where <Katex tex="g" /> is not the lower edge; option A misses the strip between the <Katex tex="y" />-axis and <Katex tex="a" />.</>,
  },
]

export default function MethodsQ13_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Consider the graphs of the functions <Katex tex="f" /> and <Katex tex="g" />{' '}
            shown below.
          </p>
          <p>The area of the shaded region could be represented by</p>
        </>
      }
      diagram={
        <img
          src={diagramSrc}
          alt="A dashed curve y = f(x) from the y-axis above the origin, over a hump, down to the x-axis at d; a solid curve y = g(x) from the x-axis at a, just right of the origin, over a lower hump that touches f above b, down to the x-axis at c just before d; the region between the dashed curve and the solid curve or x-axis is shaded — from the original 2016 VCAA exam paper"
          className="w-full max-w-[340px]"
        />
      }
      background={
        <p>
          Two curves, but they do not bound the region over the same interval. Wherever the
          lower boundary of a region changes — from a curve to the axis, say — the integral
          has to be split, or written as two separate areas subtracted. Here the region runs
          from the <Katex tex="y" />-axis to <Katex tex="d" />, but <Katex tex="g" /> is the
          lower edge only from <Katex tex="a" /> to <Katex tex="c" />.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_a^{d}\bigl(f(x)-g(x)\bigr)dx" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int_0^{d}\bigl(f(x)-g(x)\bigr)dx" /> },
        { letter: 'C', content: <Katex tex="\displaystyle\int_0^{b}\bigl(f(x)-g(x)\bigr)dx+\int_b^{c}\bigl(f(x)-g(x)\bigr)dx" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int_0^{a}f(x)\,dx+\int_a^{c}\bigl(f(x)-g(x)\bigr)dx+\int_b^{d}f(x)\,dx" /> },
        { letter: 'E', content: <Katex tex="\displaystyle\int_0^{d}f(x)\,dx-\int_a^{c}g(x)\,dx" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
