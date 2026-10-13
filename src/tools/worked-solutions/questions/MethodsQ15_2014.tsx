// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 15. VCAA examination report: 44% correct.
// The classic open-box optimisation. Question text transcribed from the original paper; the
// figure is a crop of VCAA's own artwork. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import netSrc from './meth-2014-mcq15-net.png'
import boxSrc from './meth-2014-mcq15-box.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 44, C: 16, D: 13, E: 19 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="V(x)=x(6-2x)(8-2x)" />, solve <Katex tex="V'(x)=0" />;{' '}
      <Katex tex="x=1.13\ldots" /> as <Katex tex="V(x)>0" />. <Katex tex="x" /> is closest to{' '}
      <Katex tex="1.1" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="V(x) = x(8-2x)(6-2x)" />,
    reason: <>Height <Katex tex="x" />, and each side loses <Katex tex="x" /> at <em>both</em> ends — hence <Katex tex="8-2x" /> and <Katex tex="6-2x" />, not <Katex tex="8-x" /> and <Katex tex="6-x" />.</>,
    more: <>Taking only one <Katex tex="x" /> off each side, <Katex tex="V=x(8-x)(6-x)" />, peaks near <Katex tex="x\approx2.26" /> — closest to option D.</>,
  },
  {
    working: <Katex display tex="0 < x < 3" />,
    reason: <>Every dimension must be positive. The narrower side runs out first: <Katex tex="6-2x>0" /> forces <Katex tex="x<3" />.</>,
  },
  {
    working: <Cas fn="fMax">fMax(x(8-2x)(6-2x), x) | 0&lt;x&lt;3</Cas>,
    reason: <>CAS finds the maximum on the domain directly: <Katex tex="x=1.1315\ldots" />. The next rows show the same result by hand.</>,
  },
  {
    working: <Katex display tex="3x^2-14x+12 = 0 \implies x = \frac{7\pm\sqrt{13}}{3}" />,
    reason: <>Expanding, <Katex tex="V(x)=4x^3-28x^2+48x" />, so <Katex tex="V'(x)=12x^2-56x+48=0" />; divide by 4, then use the quadratic formula.</>,
  },
  {
    working: <Katex display tex="x = 1.1315\ldots \quad\text{or}\quad x = 3.5352\ldots" />,
    reason: <>Reject <Katex tex="3.54" />: it is outside <Katex tex="(0,3)" />. <Katex tex="V" /> is 0 at both ends and positive between, so the remaining stationary point is the maximum.</>,
    more: <>The rejected root is option E, <Katex tex="3.6" /> — the most common wrong answer (19%). Cutting squares of side 3.54 cm from a 6 cm wide sheet would need 7.07 cm of width, so it isn't a box at all; always check a stationary point against the domain before choosing it.</>,
  },
  {
    working: <Katex display tex="\boxed{x \approx 1.1}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Check: <Katex tex="V(1.13)\approx24.26\text{ cm}^3" />, larger than the nearby options <Katex tex="V(0.8)\approx22.53" />, <Katex tex="V(1.6)\approx21.50" /> and <Katex tex="V(2)=16" />. Options D and E are the two traps explained in the rows above. Option C, 1.6, is what you get if only the 8 cm side loses <Katex tex="2x" />: <Katex tex="V=x(8-2x)(6-x)" /> peaks at <Katex tex="x\approx1.57" />.</>,
  },
]

export default function MethodsQ15_2014() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Zoe has a rectangular piece of cardboard that is 8 cm long and 6 cm wide. Zoe cuts
            squares of side length <Katex tex="x" /> centimetres from each of the corners of
            the cardboard, as shown in the diagram below.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-2">
            <img loading="lazy" decoding="async"
              src={netSrc}
              alt="A rectangle 8 cm long and 6 cm wide with a small square of side x cm marked by dashed lines at each of the four corners — from the original 2014 VCAA exam paper"
              className="w-full max-w-[340px]"
            />
          </div>
          <p className="mb-2">Zoe turns up the sides to form an open box.</p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-2">
            <img loading="lazy" decoding="async"
              src={boxSrc}
              alt="The open box formed by folding up the sides, drawn as a rectangular prism with hidden edges dashed — from the original 2014 VCAA exam paper"
              className="w-full max-w-[220px]"
            />
          </div>
          <p>
            The value of <Katex tex="x" /> for which the volume of the box is a maximum is
            closest to
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.8" /> },
        { letter: 'B', content: <Katex tex="1.1" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="1.6" /> },
        { letter: 'D', content: <Katex tex="2.0" /> },
        { letter: 'E', content: <Katex tex="3.6" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
