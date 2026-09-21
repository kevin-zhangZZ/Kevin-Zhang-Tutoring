// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 15. VCAA examination report: 44% correct.
// The classic open-box optimisation. Question text transcribed from the original paper; the
// figure is a crop of VCAA's own artwork. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import netSrc from './meth-2014-mcq15-net.png'

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
  },
  {
    working: <Katex display tex="0 < x < 3" />,
    reason: <>The narrower side runs out first: <Katex tex="6-2x>0" /> forces <Katex tex="x<3" />.</>,
  },
  {
    working: <Cas fn="fMax">fMax(x(8-2x)(6-2x), x) | 0&lt;x&lt;3</Cas>,
    reason: <>Or expand to <Katex tex="4x^3-28x^2+48x" /> and solve <Katex tex="V'(x)=12x^2-56x+48=0" />.</>,
  },
  {
    working: <Katex display tex="3x^2-14x+12 = 0 \implies x = \frac{7\pm\sqrt{13}}{3}" />,
    reason: <>Dividing by 4 first keeps the numbers small.</>,
  },
  {
    working: <Katex display tex="x = 1.1315\ldots \quad\text{or}\quad x = 3.5352\ldots" />,
    reason: <>The second root is outside <Katex tex="(0,3)" /> — it would need cutting more than the cardboard has.</>,
  },
  {
    working: <Katex display tex="\boxed{x \approx 1.1}" />,
    reason: <>Option B. Option E, <Katex tex="3.6" />, is the rejected root; option C, <Katex tex="1.6" />, comes from using <Katex tex="(8-x)(6-x)" /> instead.</>,
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
            the cardboard, as shown in the diagram below. Zoe turns up the sides to form an
            open box.
          </p>
          <p>
            The value of <Katex tex="x" /> for which the volume of the box is a maximum is
            closest to
          </p>
        </>
      }
      diagram={
        <img
          src={netSrc}
          alt="A rectangle 8 cm long and 6 cm wide with a small square of side x cm marked by dashed lines at each of the four corners — from the original 2014 VCAA exam paper"
          className="w-full max-w-[380px]"
        />
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
