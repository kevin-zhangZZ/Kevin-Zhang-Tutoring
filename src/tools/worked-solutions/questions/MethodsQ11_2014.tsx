// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 11. VCAA examination report: 62% correct.
// Two marbles of different colours, drawn without replacement. Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 10, C: 8, D: 10, E: 62 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(RB) = \tfrac59\times\tfrac48 = \tfrac{20}{72}" />,
    reason: <>Red then blue. Nine marbles to start, eight left for the second draw — <em>without</em> replacement, so the denominator drops.</>,
    more: <>The second numerator is still 4 because no blue marble has gone yet; only the total has dropped from 9 to 8.</>,
  },
  {
    working: <Katex display tex="\Pr(BR) = \tfrac49\times\tfrac58 = \tfrac{20}{72}" />,
    reason: <>Blue then red: the same four numbers multiplied in a different order, so the same probability.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{different}) = \tfrac{20}{72}+\tfrac{20}{72} = \tfrac{40}{72}" />,
    reason: <>"Different colours" happens as red-blue <em>or</em> blue-red. These can't both happen, so add them.</>,
    more: (
      <>
        Check with the complement: <Katex tex="\Pr(RR)=\tfrac59\times\tfrac48=\tfrac{20}{72}" /> and{' '}
        <Katex tex="\Pr(BB)=\tfrac49\times\tfrac38=\tfrac{12}{72}" />, so{' '}
        <Katex tex="\Pr(\text{different})=1-\tfrac{32}{72}=\tfrac{40}{72}" />. Or count
        unordered pairs: <Katex tex="\dfrac{5\times4}{\binom92}=\dfrac{20}{36}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\tfrac59}" />,
    reason: <>Matches option <b>E</b> (divide top and bottom of <Katex tex="\tfrac{40}{72}" /> by 8).</>,
    more: (
      <>
        Each wrong option is a recognisable slip. A, <Katex tex="\tfrac{20}{81}=\tfrac59\times\tfrac49" />,
        is one order only <em>with</em> replacement; D, <Katex tex="\tfrac{40}{81}" />, is both orders
        with replacement — the denominator <Katex tex="81=9\times9" /> means the second draw
        wrongly still had 9 marbles. B, <Katex tex="\tfrac5{18}=\tfrac{20}{72}" />, counts only red-then-blue.
        C, <Katex tex="\tfrac49" />, is just the chance that one marble drawn is blue.
      </>
    ),
  },
]

export default function MethodsQ11_2014() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A bag contains five red marbles and four blue marbles. Two marbles are drawn from
            the bag, without replacement, and the results are recorded.
          </p>
          <p>The probability that the marbles are different colours is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac{20}{81}" /> },
        { letter: 'B', content: <Katex tex="\tfrac{5}{18}" /> },
        { letter: 'C', content: <Katex tex="\tfrac{4}{9}" /> },
        { letter: 'D', content: <Katex tex="\tfrac{40}{81}" /> },
        { letter: 'E', content: <Katex tex="\tfrac{5}{9}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
