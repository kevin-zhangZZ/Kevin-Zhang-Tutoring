// 2025 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 80% correct. This
// year's paper used four options (A–D) rather than five. Matching a direction field to its
// differential equation. Question text transcribed from the original paper; the diagram is
// the actual VCAA figure, cropped from the official exam PDF, not a redrawing.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import fieldSrc from './spec-2025-mcq8-field.png'

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img
      src={fieldSrc}
      alt="A direction field on axes from -2 to 2 in both directions: slopes below the x-axis are steeply positive everywhere, slopes above it near x = 0 are negative, and the pattern is mirrored about the y-axis"
      className="w-full max-w-[340px]"
    />
  </div>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 80, B: 10, C: 4, D: 6 },
  answer: 'A',
  comment: (
    <>
      In this direction field, it can be seen that the gradients for positive <Katex tex="x" />{' '}
      values are the same as those for negative <Katex tex="x" /> values, indicating the{' '}
      <Katex tex="x" /> value is squared. When <Katex tex="x=0" /> and <Katex tex="y>0" />, the
      gradient is negative, indicating A is the best response.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{the field is unchanged under } x \mapsto -x" />,
    reason: <>Read straight off the picture: the left half is the mirror image of the right half, not its negative.</>,
  },
  {
    working: <Katex display tex="\text{so } \frac{dy}{dx} \text{ depends on } x \text{ only through } x^2" />,
    reason: <>That rules out <b>C</b> (<Katex tex="y-x" />) and <b>D</b> (<Katex tex="x-y" />), whose slopes flip sign with x.</>,
  },
  {
    working: <Katex display tex="\text{at } (0,2): \ \text{the slope drawn is steeply negative}" />,
    reason: <>One test point is enough to separate the two survivors.</>,
  },
  {
    working: <Katex display tex="\textbf{B}: \ \frac{dy}{dx} = x-y^2 = 0-4 = -4 \quad\text{and at } (0,-2): \ 0-4 = -4" />,
    reason: <>B gives the same negative slope above and below the axis — but the field is steeply <em>positive</em> below the axis, so B fails.</>,
  },
  {
    working: <Katex display tex="\textbf{A}: \ \frac{dy}{dx} = x^2-y \implies (0,2)\mapsto-2, \quad (0,-2)\mapsto+2" />,
    reason: <>Negative above, positive below — exactly what is drawn.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = x^2-y}" />,
    reason: <>Matches option <b>A</b>. The horizontal marks lie along <Katex tex="y = x^2" />, which is the visible parabola of zero slopes.</>,
  },
]

export default function SpecialistQ8_2025() {
  return (
    <MCQShell
      question={
        <p>
          Consider the direction field below.
          <br />
          The direction field best represents the differential equation
        </p>
      }
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{dy}{dx} = x^2-y" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\dfrac{dy}{dx} = x-y^2" /> },
        { letter: 'C', content: <Katex tex="\dfrac{dy}{dx} = y-x" /> },
        { letter: 'D', content: <Katex tex="\dfrac{dy}{dx} = x-y" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
