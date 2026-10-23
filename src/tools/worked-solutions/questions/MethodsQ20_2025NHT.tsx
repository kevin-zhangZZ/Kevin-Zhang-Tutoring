// 2025 Mathematical Methods NHT — Exam 2, MCQ 20. The NHT report gives the answer key and a
// worked comment (one example giving 1 solution, one giving 0), with no statistics. Algebra:
// simultaneous linear equations, read as lines. Question text transcribed from the original paper
// (image-only, read from the rendered page); the report's comment is transcribed from the
// rendered report page. Solution is original; the answer A agrees with the report's key (the
// combined solution set is {P} ∩ M, where P is the unique intersection and M the repeated line).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'A',
  comment: (
    <>
      To have one unique solution, the gradients have to be different; for example, <Katex tex="y=2x+1" /> and{' '}
      <Katex tex="y=3x+1" />.
      <br />
      For an infinite number of solutions, the gradients and <Katex tex="y" />-intercepts have to be the same; for
      example, <Katex tex="y=4x+1" /> and <Katex tex="2y=8x+2" />.
      <br />
      If these four linear equations are combined into a new system of four linear equations, there will be one
      solution, <Katex tex="(0,1)" />.
      <br />
      Another example for an infinite number of solutions is <Katex tex="y=4x+2" /> and <Katex tex="2y=8x+4" />. When
      these are combined with <Katex tex="y=2x+1" /> and <Katex tex="y=3x+1" />, there will be no solution.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Unique solution: two lines meeting at one point } P" />,
    reason: <>Each linear equation in <Katex tex="x" /> and <Katex tex="y" /> is a line. Two lines with a unique solution cross at exactly one point.</>,
  },
  {
    working: <Katex display tex="\text{Infinitely many: the same line } M \text{ written twice}" />,
    reason: <>Two equations with infinitely many solutions describe one line (one is a multiple of the other).</>,
  },
  {
    working: <Katex display tex="\text{All four hold} \iff \text{the point is } P \text{ and lies on } M" />,
    reason: <>A solution of the combined system must satisfy the first pair, so it can only be <Katex tex="P" />, and it must also be on <Katex tex="M" />.</>,
  },
  {
    working: <Katex display tex="P\in M:\ 1 \text{ solution};\qquad P\notin M:\ 0 \text{ solutions}" />,
    reason: <>The combined system can never have more solutions than the first pair, which has only one.</>,
  },
  {
    working: <Katex display tex="\boxed{0 \text{ or } 1}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Adding equations to a system can only remove solutions, never add them. So once the first pair pins the answer down to the single point <Katex tex="P" />, &ldquo;infinitely many&rdquo; (options <b>B</b> and <b>D</b>) is impossible. The report&rsquo;s examples show both remaining cases: <Katex tex="y=4x+1" /> passes through <Katex tex="P=(0,1)" />, and <Katex tex="y=4x+2" /> does not.</>,
  },
]

export default function MethodsQ20_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          In the <Katex tex="xy" />-plane, there is a system of two linear equations with a unique solution and another
          system of two linear equations with infinitely many solutions.
          <br />
          These four linear equations are combined into a new system of four linear equations.
          <br />
          All possibilities for the number of solutions of this new system will be
        </p>
      }
      options={[
        { letter: 'A', content: <>0 or 1</>, isAnswer: true },
        { letter: 'B', content: <>1 or infinitely many</> },
        { letter: 'C', content: <>1</> },
        { letter: 'D', content: <>0, 1 or infinitely many</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
