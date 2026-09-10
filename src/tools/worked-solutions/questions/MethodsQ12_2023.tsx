// 2023 Mathematical Methods — Exam 2, MCQ 12. VCAA examination report: 22% correct. Maximum
// possible mean of a discrete random variable, given a probability mass function in terms of
// an unknown k. Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 14, C: 26, D: 18, E: 29 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      From observation, <Katex tex="k\geq0" /> and the maximum will occur when <Katex tex="k=0" />,{' '}
      <Katex tex="E(X)=2" />.
    </>
  ),
}

const TABLE = (
  <div className="overflow-x-auto">
    <table className="text-[12.5px] border-collapse">
      <tbody>
        <tr><td className="pr-3 font-semibold">X</td><td className="px-2">−1</td><td className="px-2">0</td><td className="px-2">1</td><td className="px-2">2</td></tr>
        <tr><td className="pr-3 font-semibold">Pr(X=x)</td><td className="px-2"><Katex tex="k^2" /></td><td className="px-2"><Katex tex="3k" /></td><td className="px-2"><Katex tex="k" /></td><td className="px-2"><Katex tex="-k^2-4k+1" /></td></tr>
      </tbody>
    </table>
  </div>
)

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="k^2+3k+k+(-k^2-4k+1) = 1" />,
    reason: <>Check: the probabilities automatically sum to 1 for <i>any</i> <Katex tex="k" /> — this is an identity, not a constraint.</>,
  },
  {
    working: <Katex display tex="k^2\geq0 \ \checkmark \qquad 3k\geq0 \;\implies\; k\geq0 \qquad -k^2-4k+1\geq0 \;\implies\; -2-\sqrt5\leq k\leq -2+\sqrt5" />,
    reason: <>Every probability must be <Katex tex="\geq0" /> — this is the real constraint on <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0 \leq k \leq \sqrt5-2\ (\approx0.236)}" />,
    reason: <>Combine all the sign conditions (the upper bounds from the individual terms being <Katex tex="\leq1" /> are automatically satisfied within this range).</>,
  },
  {
    working: <Katex display tex="E(X) = -1(k^2)+0(3k)+1(k)+2(-k^2-4k+1) = -3k^2-7k+2" />,
    reason: 'Standard formula for the mean of a discrete random variable.',
  },
  {
    working: <>This is a downward parabola in <Katex tex="k" />, with vertex at <Katex tex="k=-\tfrac{7}{6}" /> — well to the left of the valid range <Katex tex="[0,\sqrt5-2]" />.</>,
    reason: <>So on the valid range, <Katex tex="E(X)" /> is <b>decreasing</b> as <Katex tex="k" /> increases — its maximum is at the left endpoint, <Katex tex="k=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{E(X)\big|_{k=0} = -0-0+2 = 2}" />,
    reason: <>Matches option <b>E</b>.</>,
  },
]

export default function MethodsQ12_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The probability mass function for the discrete random variable <Katex tex="X" /> is shown below.
          </p>
          <div className="mb-3">{TABLE}</div>
          <p>The maximum possible value for the mean of <Katex tex="X" /> is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="\tfrac13" /> },
        { letter: 'C', content: <Katex tex="\tfrac23" /> },
        { letter: 'D', content: <Katex tex="1" /> },
        { letter: 'E', content: <Katex tex="2" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
