// 2014 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 71% correct.
// Completing the square to read off an ellipse. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 3, C: 19, D: 5, E: 71 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      Completed square form: <Katex tex="(x-3)^2+2(y+2)^2=1" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x^2-6x+2y^2+8y+16 = 0" />,
    reason: <>Group the <Katex tex="x" /> terms and the <Katex tex="y" /> terms, then complete both squares.</>,
  },
  {
    working: <Katex display tex="\left(x^2-6x\right)+2\left(y^2+4y\right)+16 = 0" />,
    reason: <>Factor the 2 out of the <Katex tex="y" /> terms <em>before</em> completing that square.</>,
  },
  {
    working: <Katex display tex="(x-3)^2-9+2\left[(y+2)^2-4\right]+16 = 0" />,
    reason: <>The <Katex tex="-4" /> inside the bracket is multiplied by 2 when it comes out.</>,
  },
  {
    working: <Katex display tex="(x-3)^2+2(y+2)^2 = 1" />,
    reason: <><Katex tex="-9-8+16=-1" />, so the constant moves across as <Katex tex="+1" />.</>,
  },
  {
    working: <Katex display tex="\frac{(x-3)^2}{1}+\frac{(y+2)^2}{1/2} = 1" />,
    reason: <>Divide the <Katex tex="2" /> underneath so the right-hand side is 1 and both denominators are squares of semi-axes.</>,
  },
  {
    working: <Katex display tex="\boxed{(3,-2),\quad 1,\quad \tfrac{1}{\sqrt2}}" />,
    reason: <>Matches option <b>E</b>. The vertical semi-axis is <Katex tex="\sqrt{\tfrac12}=\tfrac1{\sqrt2}" />, not <Katex tex="\tfrac12" /> — which is option C, the most popular wrong answer.</>,
  },
]

export default function SpecialistQ2_2014() {
  return (
    <MCQShell
      question={
        <p>
          The ellipse given by <Katex tex="x^2-6x+2y^2+8y+16=0" /> has centre, length of
          horizontal semi-axis and length of vertical semi-axis respectively of
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(-3,2),\ 1,\ 2" /> },
        { letter: 'B', content: <Katex tex="(-2,3),\ 1,\ \tfrac1{\sqrt2}" /> },
        { letter: 'C', content: <Katex tex="(3,-2),\ \tfrac12,\ 1" /> },
        { letter: 'D', content: <Katex tex="(-3,2),\ \tfrac12,\ 1" /> },
        { letter: 'E', content: <Katex tex="(3,-2),\ 1,\ \tfrac1{\sqrt2}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
