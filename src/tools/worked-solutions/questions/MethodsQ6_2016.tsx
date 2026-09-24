// 2016 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 67% correct.
// The square of the distance between two points on y = sin(2x). Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 67, B: 8, C: 9, D: 8, E: 7 },
  answer: 'A',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f\!\left(\frac{\pi}{4}\right) = \sin\!\left(\frac{\pi}{2}\right) = 1" />,
    reason: <>Double the input inside the sine. This is the top of the first hump.</>,
  },
  {
    working: <Katex display tex="f\!\left(\frac{3\pi}{4}\right) = \sin\!\left(\frac{3\pi}{2}\right) = -1" />,
    reason: <>And the bottom of the trough that follows.</>,
  },
  {
    working: <Katex display tex="\Delta x = \frac{3\pi}{4}-\frac{\pi}{4} = \frac{\pi}{2}, \qquad \Delta y = -1-1 = -2" />,
    reason: <>The horizontal and vertical separations.</>,
  },
  {
    working: <Katex display tex="\text{length}^2 = \left(\frac{\pi}{2}\right)^2+(-2)^2 = \frac{\pi^2}{4}+4" />,
    reason: <>Pythagoras. The question asks for the <em>square</em> of the length, so there is no final square root — option C is what you get if you drop the horizontal part entirely.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{\pi^2+16}{4}}" />,
    reason: <>Matches option <b>A</b>, about <Katex tex="6.47" />. A quick check: the two points are <Katex tex="1.57" /> apart horizontally and <Katex tex="2" /> vertically, so a length near <Katex tex="2.5" /> and a square near <Katex tex="6.5" />.</>,
  },
]

export default function MethodsQ6_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Consider the graph of the function defined by{' '}
            <Katex tex="f:[0,2\pi]\to R" />, <Katex tex="f(x)=\sin(2x)" />.
          </p>
          <p>
            The square of the length of the line segment joining the points on the graph for
            which <Katex tex="x=\tfrac{\pi}{4}" /> and <Katex tex="x=\tfrac{3\pi}{4}" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{\pi^2+16}{4}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\pi+4" /> },
        { letter: 'C', content: <Katex tex="4" /> },
        { letter: 'D', content: <Katex tex="\dfrac{3\pi^2+16\pi}{4}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{10\pi^2}{16}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
