// 2021 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 73% correct.
// Testing four functional relations against f(x) = x. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 12, C: 73, D: 7, E: 2 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x \implies f(-x) = -x, \quad f\!\left(x^2\right) = x^2" />,
    reason: <>Substitute into the rule: replacing <Katex tex="x" /> by <Katex tex="-x" />, then by <Katex tex="x^2" />. These are the only inputs the four relations use, so now test each relation in turn.</>,
  },
  {
    working: <Katex display tex="f(x) = f(-x): \ x = -x \ \text{ only at } x=0 \quad \times" />,
    reason: <>"Satisfied by the function" means true for <em>every</em> <Katex tex="x" /> in the domain <Katex tex="R" />, so holding at one point is not enough. This is the rule for an even function (graph symmetric about the <Katex tex="y" />-axis), and <Katex tex="y=x" /> is not symmetric about the <Katex tex="y" />-axis.</>,
  },
  {
    working: <Katex display tex="-f(x) = f(-x): \ -x = -x \ \text{ for all } x \quad \checkmark" />,
    reason: <>This is the rule for an odd function, and <Katex tex="f(x)=x" /> is one.</>,
  },
  {
    working: <Katex display tex="f(x) = -f(x): \ x = -x \ \text{ only at } x=0 \quad \times" />,
    reason: <>Rearranging gives <Katex tex="2f(x)=0" />, so only the function that is 0 for every <Katex tex="x" /> satisfies this relation.</>,
  },
  {
    working: <Katex display tex="\bigl(f(x)\bigr)^2 = f\!\left(x^2\right): \ x^2 = x^2 \ \text{ for all } x \quad \checkmark" />,
    reason: <>Squaring the output <Katex tex="x" /> and putting <Katex tex="x^2" /> into <Katex tex="f" /> both give <Katex tex="x^2" />, for every real <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{2}" />,
    reason: <>Matches option <b>C</b>. The second and fourth relations hold for every <Katex tex="x" />; the first and third hold only at <Katex tex="x=0" />.</>,
  },
]

export default function MethodsQ5_2021() {
  return (
    <MCQShell
      question={
        <>
          <p>Consider the following four functional relations.</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 py-2">
            <Katex tex="f(x)=f(-x)" />
            <Katex tex="-f(x)=f(-x)" />
            <Katex tex="f(x)=-f(x)" />
            <Katex tex="\bigl(f(x)\bigr)^2=f\!\left(x^2\right)" />
          </div>
          <p>
            The number of these functional relations that are satisfied by the function{' '}
            <Katex tex="f:R\to R" />, <Katex tex="f(x)=x" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="1" /> },
        { letter: 'C', content: <Katex tex="2" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="3" /> },
        { letter: 'E', content: <Katex tex="4" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
