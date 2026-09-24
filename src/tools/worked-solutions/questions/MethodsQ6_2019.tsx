// 2019 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 63% correct. Maximising
// the volume of an open-top box folded from a cut-cornered rectangular sheet. Question text
// transcribed from the original paper; the net is cropped directly from the original VCAA exam
// PDF, not a redrawing. The graph of the volume function is this site's own explanatory figure
// (matplotlib) — VCAA never printed one. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import diagramSrc from './meth-2019-mcq6-cardboard.png'
import volumeSrc from './meth-2019-mcq6-volume.png'
import boxSrc from './meth-2019-mcq6-box.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 63, B: 9, C: 7, D: 12, E: 8 },
  noAnswer: 1,
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{length} = 80-2x, \qquad \text{width} = 50-2x, \qquad \text{height} = x" />,
    reason: <>Folding the flaps up turns the cut sheet into the open box, and its <em>height</em> is the size of the cut-out square, <Katex tex="x" />. Each dimension of the base loses a square from <em>both</em> ends — hence <Katex tex="2x" />, not <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="V(x) = x(80-2x)(50-2x), \qquad 0<x<25" />,
    reason: <>Volume of a rectangular prism. The domain comes from needing all three dimensions positive: <Katex tex="x>0" /> and <Katex tex="50-2x>0" />, i.e. <Katex tex="x<25" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="V(x) = 4x^3-260x^2+4000x" />
        <Katex display tex="V'(x) = 12x^2-520x+4000 = 4\left(3x^2-130x+1000\right)" />
      </>
    ),
    reason: <>Expand, then differentiate. (On a CAS you can skip both lines: <Cas fn="fMax">fMax(x(80-2x)(50-2x), x) | 0&lt;x&lt;25</Cas> returns <Katex tex="x=10" /> directly, and graphing <Katex tex="V" /> and reading off the peak works too. The by-hand route is shown because the factorisation is short and it is the only route available on Exam 1.)</>,
  },
  {
    working: <Katex display tex="3x^2-130x+1000 = (3x-100)(x-10) = 0 \implies x=\dfrac{100}{3} \ \text{ or } \ x=10" />,
    reason: <>Setting <Katex tex="V'(x)=0" /> and factorising.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={volumeSrc} alt="Graph of V(x) = x(80−2x)(50−2x) on 0 ≤ x ≤ 25, rising to a maximum of 18 000 at x = 10 and falling back to zero at x = 25" className="w-full max-w-[340px]" />
      </div>
    ),
    reason: <><Katex tex="x=\tfrac{100}{3}\approx33.3" /> is outside the domain (you can't cut <Katex tex="33.3" /> cm squares from a <Katex tex="50" /> cm width), so <Katex tex="x=10" /> is the only stationary point that exists here — and the graph confirms it is the maximum.</>,
  },
  {
    working: <Katex display tex="\boxed{x=10}" />,
    reason: <>Matches option <b>A</b>. The trap answer <Katex tex="\tfrac{100}{3}" /> is option <b>D</b> — the rejected root.</>,
  },
]

export default function MethodsQ6_2019() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            A rectangular sheet of cardboard has a length of <Katex tex="80" /> cm and a width of{' '}
            <Katex tex="50" /> cm. Squares, of side length <Katex tex="x" /> centimetres, are cut
            from each of the corners, as shown in the diagram below.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-3">
            <img src={diagramSrc} alt="Rectangular 80 cm by 50 cm sheet with x cm squares cut from each corner, from the original 2019 VCAA exam paper" className="w-full max-w-[320px]" />
          </div>
          <p className="mb-3">
            A rectangular box with an open top is then constructed, as shown in the diagram below.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-3">
            <img src={boxSrc} alt="The open-topped rectangular box, drawn in perspective with hidden edges dashed, from the original 2019 VCAA exam paper" className="w-full max-w-[220px]" />
          </div>
          <p>The volume of the box is a maximum when <Katex tex="x" /> is equal to</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="10" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="20" /> },
        { letter: 'C', content: <Katex tex="25" /> },
        { letter: 'D', content: <Katex tex="\dfrac{100}{3}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{200}{3}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
