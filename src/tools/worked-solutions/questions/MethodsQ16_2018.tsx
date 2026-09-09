// 2018 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 49% correct.
// Compare a right-endpoint rectangle approximation of an area to the exact integral.
// Question text transcribed from the original paper; the diagram is the actual VCAA figure
// (cropped from the official exam PDF), not a redrawing. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import rectanglesSrc from './meth-2018-mcq16-rectangles.png'

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img src={rectanglesSrc} alt="Graph of y = 2cos(2x) + 3 on [0, π/2] with three right-endpoint approximating rectangles, from the original 2018 VCAA exam paper" className="w-full max-w-[380px]" />
  </div>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 49, C: 18, D: 9, E: 15 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      Area of the rectangles <Katex tex="=\dfrac{\pi}{6}\Bigl[f(\tfrac{\pi}{6})+f(\tfrac{\pi}{3})+f(\tfrac{\pi}{2})\Bigr]" />.
      Actual area <Katex tex="=\displaystyle\int_0^{\pi/2} f(x)\,dx" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: DIAGRAM,
    reason: <>Three rectangles of equal width <Katex tex="\tfrac{\pi}{6}" />, each using the function's value at its <em>right</em> edge as the height.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} f\!\left(\tfrac{\pi}{6}\right) &= 2\cos\!\left(\tfrac{\pi}{3}\right)+3 \\ &= 2(0.5)+3 \\ &= 4 \end{aligned}" />
        <Katex display tex="\begin{aligned} f\!\left(\tfrac{\pi}{3}\right) &= 2\cos\!\left(\tfrac{2\pi}{3}\right)+3 \\ &= 2(-0.5)+3 \\ &= 2 \end{aligned}" />
        <Katex display tex="\begin{aligned} f\!\left(\tfrac{\pi}{2}\right) &= 2\cos(\pi)+3 \\ &= 2(-1)+3 \\ &= 1 \end{aligned}" />
      </>
    ),
    reason: 'The heights of the three rectangles.',
  },
  {
    working: <Katex display tex="\begin{aligned} \text{Jamie's area} &= \frac{\pi}{6}(4+2+1) \\ &= \frac{7\pi}{6} \end{aligned}" />,
  },
  {
    working: (
      <>
        <Katex display tex="\text{Exact area} = \int_0^{\pi/2}\bigl(2\cos(2x)+3\bigr)dx" />
        <Katex display tex="= \Bigl[\sin(2x)+3x\Bigr]_0^{\pi/2} = \bigl(\sin\pi+\tfrac{3\pi}{2}\bigr)-0 = \frac{3\pi}{2}" />
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \text{ratio} &= \frac{7\pi/6}{3\pi/2} \\ &= \frac{7}{6}\times\frac{2}{3} \\ &= \frac{14}{18} \end{aligned}" />,
    reason: "Jamie's approximation, as a fraction of the exact area.",
  },
  {
    working: <Katex display tex="\boxed{\frac{7}{9}}" />,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function MethodsQ16_2018() {
  return (
    <MCQShell
      question={
        <>
          <div className="mb-3">{DIAGRAM}</div>
          <p className="mb-2">
            Jamie approximates the area between the <Katex tex="x" />-axis and the graph of{' '}
            <Katex tex="y=2\cos(2x)+3" />, over the interval <Katex tex="\left[0,\tfrac{\pi}{2}\right]" />,
            using the three rectangles shown above.
          </p>
          <p>Jamie's approximation as a fraction of the exact area is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac59" /> },
        { letter: 'B', content: <Katex tex="\dfrac79" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{9}{11}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{11}{18}" /> },
        { letter: 'E', content: <Katex tex="\dfrac73" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
