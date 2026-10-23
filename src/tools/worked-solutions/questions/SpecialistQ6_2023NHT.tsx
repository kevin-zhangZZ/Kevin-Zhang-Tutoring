// 2023 Specialist NHT — Exam 2, MCQ 6. The NHT report gives the answer key only, with no
// statistics. Complex numbers: the locus of points equidistant from 1 + 2i and −2 + i is their
// perpendicular bisector, y = −3x. Option C is the same set written as a complex equation, not in
// Cartesian form as asked. Question text transcribed from the original paper. Solution is
// original; the answer E agrees with the report's key (sympy solves the expanded distance equation
// to y = −3x). Distractors verified: B is the line through the two points, A has the negative of
// that line's gradient through the midpoint, D is the circle with the two points as a diameter.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'E' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|z-(1+2i)|=|z-(-2+i)|" />,
    reason: <><Katex tex="|z-w|" /> is the distance from <Katex tex="z" /> to <Katex tex="w" />. Equal distances from two fixed points describe a straight line: the perpendicular bisector of the segment joining them.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&z=x+yi:\\ &(x-1)^2+(y-2)^2=(x+2)^2+(y-1)^2\end{aligned}" />,
    reason: <>To get Cartesian form, substitute <Katex tex="z=x+yi" /> and square both sides (both are non-negative distances).</>,
  },
  {
    working: <Katex display tex="-2x+1-4y+4=4x+4-2y+1" />,
    reason: <>Expand; the <Katex tex="x^2" /> and <Katex tex="y^2" /> terms cancel on both sides, which is why the locus is a line, not a circle.</>,
  },
  {
    working: <Katex display tex="-6x=2y \implies y=-3x" />,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{midpoint}&=\left(-\tfrac12,\ \tfrac32\right):\ \ -3\left(-\tfrac12\right)=\tfrac32\ \checkmark\\ \text{gradients}&:\ \tfrac{2-1}{1-(-2)}=\tfrac13,\quad \tfrac13\times(-3)=-1\ \checkmark\end{aligned}" />,
    reason: <>Check: the line passes through the midpoint of the two points and is perpendicular to the segment joining them.</>,
  },
  {
    working: <Katex display tex="\boxed{y=-3x}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: <>Option C is the right set, but written as a complex equation; the question asks for <b>Cartesian</b> form. Option B is the line <i>through</i> the two points (gradient <Katex tex="\tfrac13" />). Option A goes through the midpoint with gradient <Katex tex="-\tfrac13" />, the negative of the segment&apos;s gradient instead of its negative reciprocal. Option D is the circle that has the two points at the ends of a diameter.</>,
  },
]

export default function SpecialistQ6_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          The set <Katex tex="S" /> consists of all points on the complex plane that are equidistant from the points
          represented by <Katex tex="1+2i" /> and <Katex tex="-2+i" />.
          <br />
          The set <Katex tex="S" /> expressed in Cartesian form is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=-\dfrac13x+\dfrac43" /> },
        { letter: 'B', content: <Katex tex="y=\dfrac13x+\dfrac53" /> },
        { letter: 'C', content: <Katex tex="|z-1-2i|=|z+2-i|" /> },
        { letter: 'D', content: <Katex tex="\left(x+\dfrac12\right)^2+\left(y-\dfrac32\right)^2=\dfrac52" /> },
        { letter: 'E', content: <Katex tex="y=-3x" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
