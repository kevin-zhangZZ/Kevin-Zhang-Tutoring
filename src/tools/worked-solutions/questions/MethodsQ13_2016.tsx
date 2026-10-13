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
    working: <Katex display tex="\text{shaded: } x=0 \text{ to } x=d" />,
    reason: <>The dashed curve <Katex tex="y=f(x)" /> starts on the <Katex tex="y" />-axis and meets the <Katex tex="x" />-axis at <Katex tex="d" />; the shading runs from the <Katex tex="y" />-axis all the way to <Katex tex="d" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} [0,a]&: \text{ bottom edge is the } x\text{-axis} \\ [a,c]&: \text{ bottom edge is } y=g(x) \\ [c,d]&: \text{ bottom edge is the } x\text{-axis} \end{aligned}" />,
    reason: <>The solid curve <Katex tex="y=g(x)" /> starts at <Katex tex="a" />, just right of the origin, and comes back to the <Katex tex="x" />-axis at <Katex tex="c" />, before <Katex tex="d" />.</>,
    more: <>The point <Katex tex="b" /> is where the two curves touch. It is marked to tempt you into splitting there, but the bottom edge does not change at <Katex tex="b" /> — it is <Katex tex="g" /> on both sides — so <Katex tex="b" /> plays no part in the area.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{area} &= \int_0^{a}f(x)\,dx \\ &\quad +\int_a^{c}\bigl(f(x)-g(x)\bigr)dx \\ &\quad +\int_c^{d}f(x)\,dx \end{aligned}" />,
    reason: <>Area between curves is <Katex tex="\int(\text{top}-\text{bottom})\,dx" />, so split wherever the bottom edge changes: at <Katex tex="a" /> and at <Katex tex="c" />.</>,
  },
  {
    working: <Katex display tex="= \int_0^{d}f(x)\,dx-\int_a^{c}g(x)\,dx" />,
    reason: <>The three <Katex tex="f" /> pieces join into one integral from <Katex tex="0" /> to <Katex tex="d" />: everything under <Katex tex="f" />, minus the part under <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_0^{d}f(x)\,dx-\int_a^{c}g(x)\,dx}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: (
      <>
        Why the others fail. <b>B</b> (15%, the most common wrong answer) and <b>A</b>{' '}
        subtract <Katex tex="g" /> right out to <Katex tex="d" />, but on{' '}
        <Katex tex="[c,d]" /> the bottom edge is the <Katex tex="x" />-axis, not{' '}
        <Katex tex="g" />; B does the same on <Katex tex="[0,a]" />, and A also leaves out
        the strip between the <Katex tex="y" />-axis and <Katex tex="a" />. <b>C</b> is just{' '}
        <Katex tex="\int_0^{c}\bigl(f(x)-g(x)\bigr)dx" /> split pointlessly at{' '}
        <Katex tex="b" />: it uses <Katex tex="g" /> on <Katex tex="[0,a]" /> and misses{' '}
        <Katex tex="[c,d]" /> altogether. <b>D</b> is the correct three-piece split except
        that its last piece starts at <Katex tex="b" /> instead of <Katex tex="c" />, so the
        area under <Katex tex="f" /> on <Katex tex="[b,c]" /> is counted a second time.
      </>
    ),
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
        <img loading="lazy" decoding="async"
          src={diagramSrc}
          alt="A dashed curve y = f(x) from the y-axis above the origin, over a hump, down to the x-axis at d; a solid curve y = g(x) from the x-axis at a, just right of the origin, over a lower hump that touches f above b, down to the x-axis at c just before d; the region between the dashed curve and the solid curve or x-axis is shaded — from the original 2016 VCAA exam paper"
          className="w-full max-w-[340px]"
        />
      }
      background={
        <p>
          Two curves, but they do not bound the region over the same interval. Wherever the
          lower boundary of a region changes — from a curve to the axis, say — the integral
          has to be split, or written as two separate areas subtracted.
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
