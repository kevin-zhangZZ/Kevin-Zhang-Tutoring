// 2022 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 34% correct. Where the
// maximum-volume open box occurs when squares of side x are cut from a rectangular sheet.
// Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 34, C: 13, D: 34, E: 9 },
  answer: 'D',
  noAnswer: 1,
  comment: <>Solve <Katex tex="V'(x)=0" /> for <Katex tex="x" />. The maximum occurs at the smaller <Katex tex="x" /> value.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="V(x) = x(b-2x)(a-2x)" />,
    reason: <>Cutting squares of side <Katex tex="x" /> from each corner and folding up gives a box of height <Katex tex="x" />, and base sides <Katex tex="b-2x" /> and <Katex tex="a-2x" />.</>,
  },
  {
    working: <Katex display tex="V(x) = 4x^3 - 2(a+b)x^2 + abx" />,
    reason: 'Expand the product.',
  },
  {
    working: <Katex display tex="V'(x) = 12x^2 - 4(a+b)x + ab" />,
    reason: 'Differentiate.',
  },
  {
    working: <Katex display tex="x = \frac{4(a+b)\pm\sqrt{16(a+b)^2-48ab}}{24}" />,
    reason: 'Quadratic formula on V′(x) = 0.',
  },
  {
    working: <Katex display tex="16(a+b)^2 - 48ab = 16\big(a^2+2ab+b^2-3ab\big) = 16(a^2-ab+b^2)" />,
    reason: 'Simplify inside the square root.',
  },
  {
    working: <Katex display tex="x = \frac{4(a+b)\pm4\sqrt{a^2-ab+b^2}}{24} = \frac{(a+b)\pm\sqrt{a^2-ab+b^2}}{6}" />,
    reason: <>Factor out <Katex tex="4" /> and simplify.</>,
  },
  {
    working: <>Of the two stationary points, the <b>smaller</b> <Katex tex="x" /> is the local maximum of <Katex tex="V" /> (the larger one makes one side length negative or is a local minimum).</>,
    reason: <>A cubic <Katex tex="V(x)" /> with positive leading coefficient rises, has a local max, then a local min, then rises again — the earlier turning point is the maximum.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \frac{a+b-\sqrt{a^2-ab+b^2}}{6}}" />,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function MethodsQ19_2022() {
  return (
    <MCQShell
      question={
        <p>
          A box is formed from a rectangular sheet of cardboard, which has a width of <Katex tex="a" /> units and a
          length of <Katex tex="b" /> units, by first cutting out squares of side length <Katex tex="x" /> units from
          each corner and then folding upwards to form a container with an open top.
          <br />
          The maximum volume of the box occurs when <Katex tex="x" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{a-b+\sqrt{a^2-ab+b^2}}{6}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{a+b+\sqrt{a^2-ab+b^2}}{6}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{a-b-\sqrt{a^2-ab+b^2}}{6}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{a+b-\sqrt{a^2-ab+b^2}}{6}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{a+b-\sqrt{a^2-2ab+b^2}}{6}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
