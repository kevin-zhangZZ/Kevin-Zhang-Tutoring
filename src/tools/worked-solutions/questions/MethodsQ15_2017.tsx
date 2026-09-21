// 2017 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 58% correct.
// Maximising the area of a rectangle with one corner on y = −x³ + 8. Question text
// transcribed from the original paper; the figure is a crop of VCAA's own artwork.
// Answer verified with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2017-mcq15-rectangle.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 58, C: 7, D: 9, E: 11 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="A = uv" />,
    reason: <>The rectangle has width <Katex tex="u" /> and height <Katex tex="v" />, since <Katex tex="A" /> is at the origin and <Katex tex="C" /> is the opposite corner.</>,
  },
  {
    working: <Katex display tex="v = -u^3+8" />,
    reason: <><Katex tex="(u,v)" /> lies on the curve. This is what turns a two-variable area into a one-variable function.</>,
  },
  {
    working: <Katex display tex="A(u) = u(-u^3+8) = 8u-u^4" />,
    reason: <>Expanding. The domain is <Katex tex="0<u<2" />, since the curve meets the <Katex tex="x" />-axis at <Katex tex="u=2" />.</>,
  },
  {
    working: <Katex display tex="A'(u) = 8-4u^3" />,
    reason: <>Differentiating.</>,
  },
  {
    working: <Katex display tex="8-4u^3=0 \implies u^3=2 \implies u=\sqrt[3]{2}" />,
    reason: <>Setting the derivative to zero. <Katex tex="A'" /> changes from positive to negative here, so it is a maximum.</>,
  },
  {
    working: <Katex display tex="v = -2+8 = 6" />,
    reason: <>Because <Katex tex="u^3=2" /> exactly — no decimals needed anywhere.</>,
  },
  {
    working: <Katex display tex="\boxed{A = 6\sqrt[3]{2}}" />,
    reason: <>Option B, about <Katex tex="7.56" />. Sanity check against the picture: the rectangle sits inside a <Katex tex="2\times8" /> box, so an area under <Katex tex="16" /> is right, and option C is that whole box.</>,
  },
]

export default function MethodsQ15_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A rectangle <Katex tex="ABCD" /> has vertices <Katex tex="A(0,0)" />,{' '}
            <Katex tex="B(u,0)" />, <Katex tex="C(u,v)" /> and <Katex tex="D(0,v)" />, where{' '}
            <Katex tex="(u,v)" /> lies on the graph of <Katex tex="y=-x^3+8" />, as shown
            below.
          </p>
          <p>The maximum area of the rectangle is</p>
        </>
      }
      diagram={
        <img
          src={diagramSrc}
          alt="The curve y = −x³ + 8 in the first quadrant, from (0, 8) down to (2, 0), with a rectangle drawn from the origin to the point C(u, v) on the curve, from the original 2017 VCAA exam paper"
          className="w-full max-w-[230px]"
        />
      }
      options={[
        { letter: 'A', content: <Katex tex="\sqrt[3]{2}" /> },
        { letter: 'B', content: <Katex tex="6\sqrt[3]{2}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="16" /> },
        { letter: 'D', content: <Katex tex="8" /> },
        { letter: 'E', content: <Katex tex="3\sqrt[3]{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
