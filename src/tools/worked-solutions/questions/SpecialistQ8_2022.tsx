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
    reason: <>Read the field before looking at the options. In the first and third quadrants the segments fall from left to right; in the second and fourth they rise. Along the <Katex tex="y" />-axis they are horizontal, and along the <Katex tex="x" />-axis they are vertical. Now test each option against these features.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{D: } \frac{y^2}{2}+x^2&\ge0\\ \text{E: } \frac{x^2}{2}+y^2&\ge0\end{aligned}" />,
    reason: <>Squares are never negative, so <b>D</b> and <b>E</b> never give a falling segment, but the first and third quadrants are full of them. D and E are out.</>,
  },
  {
    working: <Katex display tex="\text{A at } (1,1): \ \frac{dy}{dx} = \frac{2(1)}{1} = 2 > 0" />,
    reason: <><b>A</b> gives rising segments in the first quadrant, where the field falls. A is out (it is C without the minus sign).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{B at } (1,1)&: \ \frac{dy}{dx} = -\frac{1}{2(1)} = -\frac12\\ \text{C at } (1,1)&: \ \frac{dy}{dx} = -\frac{2(1)}{1} = -2\end{aligned}" />,
    reason: <><b>B</b> and <b>C</b> both fit every feature in the first row: negative in quadrants 1 and 3, zero when <Katex tex="x=0" />, undefined (a vertical segment) when <Katex tex="y=0" />. So compare how steep they are at one point. The segment at (1, 1) is steep, well past 45°, which fits <Katex tex="-2" /> and not the gentle <Katex tex="-\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\int y\,dy &= \int -2x\,dx\\ \frac{y^2}{2} &= -x^2+c\\ 2x^2+y^2 &= 2c\end{aligned}" />,
    reason: <>A final check with C’s solution curves: separate the variables and integrate both sides. Each curve is a closed loop around <Katex tex="O" /> that crosses the <Katex tex="y" />-axis at <Katex tex="\pm\sqrt{2c}" /> but the <Katex tex="x" />-axis only at <Katex tex="\pm\sqrt{c}" />, so it is taller than it is wide, just as the segments curl in the picture. B’s curves, <Katex tex="x^2+2y^2=2c" />, would be wider than tall.</>,
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
