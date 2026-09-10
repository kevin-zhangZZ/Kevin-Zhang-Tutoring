// 2020 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 35% correct.
// Matching a described curve to its slope field — all five options are diagrams. Question
// text and diagrams transcribed from the original paper (each is the actual VCAA figure,
// cropped from the official exam PDF, not a redrawing). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import optASrc from './spec-2020-mcq9-optA.png'
import optBSrc from './spec-2020-mcq9-optB.png'
import optCSrc from './spec-2020-mcq9-optC.png'
import optDSrc from './spec-2020-mcq9-optD.png'
import optESrc from './spec-2020-mcq9-optE.png'

function SlopeField({ src, letter }: { src: string; letter: string }) {
  return <img src={src} alt={`Slope field option ${letter}`} className="w-full max-w-[220px]" />
}

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 35, C: 17, D: 22, E: 13 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="Y - y = m(X-x)" />,
    reason: <>Equation of the tangent at <Katex tex="P(x,y)" />, with gradient <Katex tex="m=\dfrac{dy}{dx}" /> and running coordinates <Katex tex="(X,Y)" />.</>,
  },
  {
    working: <Katex display tex="\text{Set } Y=0:\quad X = x - \frac{y}{m}" />,
    reason: 'The X-intercept of that tangent line.',
  },
  {
    working: <Katex display tex="x - \frac{y}{m} = y" />,
    reason: 'Given: this X-intercept equals the y-value at P.',
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = m = \frac{y}{x-y}}" />,
    reason: 'Solve for m — this is the differential equation the correct slope field must satisfy.',
  },
  {
    working: (
      <div className="flex flex-col gap-1.5">
        <span>On the x-axis (y = 0, x ≠ 0): <Katex tex="m = \dfrac{0}{x} = 0" /> — horizontal marks.</span>
        <span>On the y-axis (x = 0, y ≠ 0): <Katex tex="m = \dfrac{y}{-y} = -1" /> — gradient −1 marks, the same on both halves of the axis.</span>
      </div>
    ),
    reason: 'Two easy diagnostic lines to read straight off each diagram.',
  },
  {
    working: <SlopeField src={optBSrc} letter="B" />,
    reason: <>Option <b>B</b> is the only diagram with flat marks along the whole <Katex tex="x" />-axis <i>and</i> uniform gradient <Katex tex="-1" /> marks along the whole <Katex tex="y" />-axis — matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ9_2020() {
  return (
    <MCQShell
      question={
        <p>
          <Katex tex="P(x,y)" /> is a point on a curve. The <Katex tex="x" />-intercept of a tangent to point{' '}
          <Katex tex="P(x,y)" /> is equal to the <Katex tex="y" />-value at <Katex tex="P" />.
          <br />
          Which one of the following slope fields best represents this curve?
        </p>
      }
      options={[
        { letter: 'A', content: <SlopeField src={optASrc} letter="A" /> },
        { letter: 'B', content: <SlopeField src={optBSrc} letter="B" />, isAnswer: true },
        { letter: 'C', content: <SlopeField src={optCSrc} letter="C" /> },
        { letter: 'D', content: <SlopeField src={optDSrc} letter="D" /> },
        { letter: 'E', content: <SlopeField src={optESrc} letter="E" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
