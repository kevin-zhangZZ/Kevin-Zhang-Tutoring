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
    <img loading="lazy" decoding="async"
      src={fieldSrc}
      alt="A direction field on axes from -2 to 2 in both directions: slopes below the x-axis are steeply positive everywhere, slopes above it near x = 0 are negative, and each slope is the same at (x, y) and (-x, y)"
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
    working: <Katex display tex="\text{slope at } (-x,\,y) = \text{slope at } (x,\,y)" />,
    reason: (
      <>
        Read off the picture: each segment on the left is parallel to its partner on the right. For example, the
        slopes at <Katex tex="(1,0)" /> and <Katex tex="(-1,0)" /> are both positive.
      </>
    ),
    more: (
      <>
        The segments are parallel, not reflected. A true mirror image in the y-axis would reverse each tilt (slope{' '}
        <Katex tex="m" /> becoming <Katex tex="-m" />); here the tilt at <Katex tex="(-x,y)" /> is the same as at{' '}
        <Katex tex="(x,y)" />. This is the report's &ldquo;the gradients for positive <Katex tex="x" /> values are the
        same as those for negative <Katex tex="x" /> values&rdquo;.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{so } \frac{dy}{dx} \text{ depends on } x \text{ only through } x^2" />,
    reason: (
      <>
        Replacing x by −x leaves <Katex tex="x^2" /> unchanged. Only <b>A</b> has <Katex tex="x^2" />; B, C and D
        contain x itself, so their slopes change when x changes sign.
      </>
    ),
    more: (
      <>
        For example, at <Katex tex="(1,0)" /> and <Katex tex="(-1,0)" />: B <Katex tex="(x-y^2)" /> gives 1 and −1,
        C <Katex tex="(y-x)" /> gives −1 and 1, and D <Katex tex="(x-y)" /> gives 1 and −1. Only A{' '}
        <Katex tex="(x^2-y)" /> gives the same slope, 1, at both points, as drawn.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&\textbf{A}: \ \frac{dy}{dx} = x^2-y\\&(0,2)\mapsto-2\\&(0,-2)\mapsto+2\end{aligned}"
      />
    ),
    reason: <>A check on the y-axis: negative slope above the origin, positive below, exactly as drawn.</>,
    more: (
      <>
        This is the report's second test, &ldquo;when <Katex tex="x=0" /> and <Katex tex="y>0" />, the gradient is
        negative&rdquo;. It rules out C (<Katex tex="y-x" /> gives <Katex tex="+2" /> at <Katex tex="(0,2)" />) and
        B (<Katex tex="x-y^2" /> gives <Katex tex="-4" /> at both <Katex tex="(0,2)" /> and <Katex tex="(0,-2)" />,
        but the field is steeply positive below the axis). It does not separate A from D, since{' '}
        <Katex tex="x-y" /> also gives <Katex tex="-2" /> and <Katex tex="+2" /> there: that is why the same-slope test
        in the first two rows is needed.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = x^2-y}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: (
      <>
        One more check: the slope of <Katex tex="x^2-y" /> is zero where <Katex tex="y=x^2" />, and the near-horizontal
        segments in the picture do lie along that parabola, e.g. through <Katex tex="(0,0)" /> and{' '}
        <Katex tex="(\pm1,1)" />. Option <b>B</b> (10%) fails the same-slope test and the check below the axis;{' '}
        <b>D</b> (6%) passes the y-axis check but fails the same-slope test; <b>C</b> (4%) fails both.
      </>
    ),
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
