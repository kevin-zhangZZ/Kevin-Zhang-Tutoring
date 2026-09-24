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
      Area of the rectangles =
      <br />
      <Katex tex="\dfrac{\pi}{6}\left(f\left(\dfrac{\pi}{6}\right)+f\left(\dfrac{\pi}{3}\right)+f\left(\dfrac{\pi}{2}\right)\right)=\dfrac{7\pi}{6}" />
      <br />
      Actual area = <Katex tex="\displaystyle\int_0^{\frac{\pi}{2}} f(x)\,dx=\frac{3\pi}{2}" />
      <br />
      <Katex tex="\dfrac{\;\frac{7\pi}{6}\;}{\frac{3\pi}{2}}=\dfrac79" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} f\!\left(\tfrac{\pi}{6}\right) &= 2\cos\!\left(\tfrac{\pi}{3}\right)+3 \\ &= 2(0.5)+3 \\ &= 4 \end{aligned}" />
        <Katex display tex="\begin{aligned} f\!\left(\tfrac{\pi}{3}\right) &= 2\cos\!\left(\tfrac{2\pi}{3}\right)+3 \\ &= 2(-0.5)+3 \\ &= 2 \end{aligned}" />
        <Katex display tex="\begin{aligned} f\!\left(\tfrac{\pi}{2}\right) &= 2\cos(\pi)+3 \\ &= 2(-1)+3 \\ &= 1 \end{aligned}" />
      </>
    ),
    reason: <>Three rectangles of equal width <Katex tex="\tfrac{\pi}{6}" />, each using the function's value at its <em>right</em> edge as the height.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{Jamie's area} &= \frac{\pi}{6}(4+2+1) \\ &= \frac{7\pi}{6} \end{aligned}" />,
    reason: <>Width times the sum of the heights.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{Exact area} = \int_0^{\pi/2}\bigl(2\cos(2x)+3\bigr)dx" />
        <Katex display tex="= \Bigl[\sin(2x)+3x\Bigr]_0^{\pi/2} = \bigl(\sin\pi+\tfrac{3\pi}{2}\bigr)-0 = \frac{3\pi}{2}" />
      </>
    ),
    reason: <>The exact area is the definite integral. The approximation is an underestimate, as it should be: the curve is decreasing, so every right-endpoint rectangle sits below it.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{ratio} &= \frac{7\pi/6}{3\pi/2} \\ &= \frac{7}{6}\times\frac{2}{3} \\ &= \frac{14}{18} \end{aligned}" />,
    reason: <>Jamie's approximation, as a fraction of the exact area.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{7}{9}}" />,
    reason: <>Matches option <b>B</b>. Option <b>E</b> <Katex tex="\left(\tfrac73\right)" /> divides by <Katex tex="\tfrac{\pi}{2}" />, the width of the interval, rather than by the exact area — and a fraction bigger than <Katex tex="1" /> is impossible for an underestimate.</>,
  },
]

export default function MethodsQ16_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            Jamie approximates the area between the <Katex tex="x" />-axis and the graph of{' '}
            <Katex tex="y=2\cos(2x)+3" />, over the interval <Katex tex="\left[0,\tfrac{\pi}{2}\right]" />,
            using the three rectangles shown below.
          </p>
          <div className="mb-3">{DIAGRAM}</div>
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
