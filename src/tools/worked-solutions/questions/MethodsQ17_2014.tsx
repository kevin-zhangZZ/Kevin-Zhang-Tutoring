// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 17. VCAA examination report: 50% correct.
// When a pair of simultaneous linear equations has no solution. Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 50, C: 17, D: 10, E: 8 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="ax-3y = 5, \qquad 3x-ay = 8-a" />,
    reason: <>Two lines. "No solution" means they are parallel <em>and distinct</em> — equal gradients alone are not the whole answer.</>,
  },
  {
    working: <Katex display tex="y = \tfrac a3x-\tfrac53, \qquad y = \tfrac3ax-\tfrac{8-a}{a}" />,
    reason: <>Rearrange each into <Katex tex="y=mx+c" /> form to read off the gradients. (<Katex tex="a=0" /> can't give parallel lines: the first becomes horizontal, the second vertical.)</>,
  },
  {
    working: <Katex display tex="\tfrac a3 = \tfrac3a \implies a^2 = 9 \implies a = 3 \text{ or } a = -3" />,
    reason: <>Both must now be tested separately — this is the step that splits options A, B and C.</>,
  },
  {
    working: <Katex display tex="a=3:\quad 3x-3y=5 \ \text{ and } \ 3x-3y=5" />,
    reason: <>The same equation twice, since <Katex tex="8-a=5" />. <em>Infinitely many</em> solutions, not none.</>,
  },
  {
    working: <Katex display tex="a=-3:\quad -3x-3y=5 \ \text{ and } \ 3x+3y=11" />,
    reason: <>Multiply the first by <Katex tex="-1" />: <Katex tex="3x+3y=-5" /> against <Katex tex="3x+3y=11" /> — parallel and distinct, so no solution.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -3}" />,
    reason: <>Matches option <b>B</b>. Option C includes <Katex tex="a=3" />, where the system is consistent; option A is the case that gives infinitely many solutions.</>,
  },
]

export default function MethodsQ17_2014() {
  return (
    <MCQShell
      question={
        <p>
          The simultaneous linear equations <Katex tex="ax-3y=5" /> and{' '}
          <Katex tex="3x-ay=8-a" /> have <b>no solution</b> for
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="a = 3" /> },
        { letter: 'B', content: <Katex tex="a = -3" />, isAnswer: true },
        { letter: 'C', content: <>both <Katex tex="a=3" /> and <Katex tex="a=-3" /></> },
        { letter: 'D', content: <Katex tex="a \in R\setminus\{3\}" /> },
        { letter: 'E', content: <Katex tex="a \in R\setminus[-3,3]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
