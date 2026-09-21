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
    working: <Katex display tex="a = 0" />,
    reason: <>The figure puts <Katex tex="a" /> right at the <Katex tex="y" />-axis. That makes options A and B <em>identical</em> — so neither can be the answer, which is a useful first cut.</>,
  },
  {
    working: <Katex display tex="f \text{ runs from } x=0 \text{ to } x=d; \quad g \text{ runs from } x=a=0 \text{ to } x=c" />,
    reason: <>The dashed curve <Katex tex="f" /> leaves the <Katex tex="y" />-axis above the origin and lands at <Katex tex="d" />; the solid curve <Katex tex="g" /> starts at the origin and lands at <Katex tex="c" />, before <Katex tex="d" />.</>,
  },
  {
    working: <Katex display tex="\text{shaded} = \text{(area under } f) - \text{(area under } g)" />,
    reason: <>The shaded strip is everything below <Katex tex="f" /> and above <Katex tex="g" />, including the piece between <Katex tex="c" /> and <Katex tex="d" /> where there is no <Katex tex="g" /> at all.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_0^{d}f(x)\,dx-\int_a^{c}g(x)\,dx}" />,
    reason: <>Option E. Writing it as a single integral of <Katex tex="f-g" /> over <Katex tex="[a,d]" /> would be subtracting a <Katex tex="g" /> that does not exist past <Katex tex="c" /> — which is exactly why the two areas have to be written separately, over different intervals.</>,
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
          alt="A dashed curve f from the y-axis at a, over a hump, down to the x-axis at d; a solid curve g from the origin at a, over a lower hump, down to the x-axis at c just before d; the region between them is shaded — from the original 2016 VCAA exam paper"
          className="w-full max-w-[340px]"
        />
      }
      background={
        <p>
          Two curves, but they do not share an interval. Wherever the lower boundary of a
          region changes — from a curve to the axis, say — the integral has to be split, or
          written as two separate areas subtracted. Here the region runs from{' '}
          <Katex tex="a" /> to <Katex tex="d" />, but <Katex tex="g" /> only exists as far
          as <Katex tex="c" />.
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
