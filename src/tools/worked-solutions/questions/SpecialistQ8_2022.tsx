// 2022 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 74% correct.
// Reading a direction field: which way the slopes lean, how steep they are, and the closed solution curves. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import fieldSrc from './spec-2022-mcq8-field.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 13, C: 74, D: 6, E: 4 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\text{Quadrants 1 and 3: }&\frac{dy}{dx}<0\\ \text{Quadrants 2 and 4: }&\frac{dy}{dx}>0\\ \text{On } x=0\text{: }&\frac{dy}{dx}=0\\ \text{On } y=0\text{: }&\text{vertical}\end{aligned}" />,
    reason: <>Each segment’s gradient is the value of <Katex tex="\tfrac{dy}{dx}" /> at that point. Read the field before the options: segments fall (left to right) in quadrants 1 and 3 and rise in quadrants 2 and 4; they are horizontal along the <Katex tex="y" />-axis and vertical along the <Katex tex="x" />-axis.</>,
    more: <>These features already hint at the form of the answer. Horizontal segments all along <Katex tex="x=0" /> mean <Katex tex="\tfrac{dy}{dx}=0" /> whenever <Katex tex="x=0" />, so expect a factor of <Katex tex="x" /> on top. Vertical segments all along <Katex tex="y=0" /> mean <Katex tex="\tfrac{dy}{dx}" /> is undefined whenever <Katex tex="y=0" />, so expect <Katex tex="y" /> underneath, as in A, B and C.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{D: } \frac{y^2}{2}+x^2&\ge0\\ \text{E: } \frac{x^2}{2}+y^2&\ge0\end{aligned}" />,
    reason: <>Squares are never negative, so <b>D</b> and <b>E</b> never give a falling segment, but the first and third quadrants are full of them. D and E are out.</>,
  },
  {
    working: <Katex display tex="\text{A at } (1,1): \ \frac{dy}{dx} = \frac{2(1)}{1} = 2 > 0" />,
    reason: <><b>A</b> gives rising segments in the first quadrant, where the field falls. A is out.</>,
    more: <>A is C without the minus sign: at every point it has the same steepness as C, but leans the wrong way.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{B at } (1,1)&: \ \frac{dy}{dx} = -\frac{1}{2(1)} = -\frac12\\ \text{C at } (1,1)&: \ \frac{dy}{dx} = -\frac{2(1)}{1} = -2\end{aligned}" />,
    reason: <><b>B</b> and <b>C</b> both match all four features in the first row, so compare how steep they are at one point. The segment at (1, 1) is steeper than 45°, which fits <Katex tex="-2" />, not the gentle <Katex tex="-\tfrac12" />.</>,
    more: (
      <>
        <p>
          B was the most popular wrong answer (13%). Its sign pattern is identical to C’s, so only steepness separates
          them: a gradient of <Katex tex="-2" /> is about 63° below the horizontal, while <Katex tex="-\tfrac12" /> is
          only about 27°.
        </p>
        <p>
          You can also see this steepness difference in the solution curves. Separate the variables in C and integrate
          both sides:
        </p>
        <Katex display tex="\begin{aligned}\int y\,dy &= \int -2x\,dx\\ \frac{y^2}{2} &= -x^2+c\\ 2x^2+y^2 &= 2c\end{aligned}" />
        <p>
          Each curve is a closed loop around <Katex tex="O" /> that crosses the <Katex tex="y" />-axis at{' '}
          <Katex tex="\pm\sqrt{2c}" /> but the <Katex tex="x" />-axis only at <Katex tex="\pm\sqrt{c}" />, so it is taller
          than it is wide, just as the segments curl in the picture. B’s curves, <Katex tex="x^2+2y^2=2c" />, would be
          wider than tall.
        </p>
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = -\frac{2x}{y}}" />,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function SpecialistQ8_2022() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={fieldSrc}
              alt="A direction field on −4 ≤ x ≤ 4, −4 ≤ y ≤ 4 whose line segments curl around the origin in closed loops that are taller than they are wide — from the original 2022 VCAA exam paper"
              className="w-full max-w-[420px]"
            />
          </div>
          <p>The direction field shown above best represents the differential equation</p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac{dy}{dx}=\frac{2x}{y}" /> },
        { letter: 'B', content: <Katex tex="\frac{dy}{dx}=-\frac{x}{2y}" /> },
        { letter: 'C', content: <Katex tex="\frac{dy}{dx}=-\frac{2x}{y}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\frac{dy}{dx}=\frac{y^2}{2}+x^2" /> },
        { letter: 'E', content: <Katex tex="\frac{dy}{dx}=\frac{x^2}{2}+y^2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
