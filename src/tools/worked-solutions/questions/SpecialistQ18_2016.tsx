// 2016 Specialist Mathematics — Exam 2, MCQ 18. VCAA examination report: 61% correct.
// Mean and standard deviation of a sum of independent oranges and lemons.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 61, B: 5, C: 22, D: 8, E: 3 },
  answer: 'A',
  noAnswer: 1,
  comment: <>Note that <Katex tex="\mathrm{Var}(X_1+X_2+X_3) \ne \mathrm{Var}(3X)" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="S = O_1+O_2+O_3+L_1+L_2" />,
    reason: <>Let <Katex tex="O_i" /> and <Katex tex="L_i" /> be the independent masses of the three oranges and two lemons.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(S) = 3(204) + 2(76) = 612+152 = 764" />,
    reason: 'Expectation is linear, so it adds regardless of independence.',
  },
  {
    working: (
      <>
        <Katex display tex="\mathrm{Var}(S) = 3\,\mathrm{Var}(O)+2\,\mathrm{Var}(L)" />
        <Katex display tex="= 3(9^2)+2(3^2) = 243+18 = 261" />
      </>
    ),
    reason: <>For <em>independent</em> variables, variances add — but each orange contributes its own <Katex tex="\mathrm{Var}(O)=9^2" /> separately, which is <em>not</em> the same as <Katex tex="\mathrm{Var}(3\times\text{one orange})=3^2\times9^2" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}(S) = \sqrt{261} = \sqrt{9\times29} = 3\sqrt{29}" />,
    reason: 'Standard deviation is the square root of variance.',
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(S)=764, \ \mathrm{sd}(S) = 3\sqrt{29}}" />,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function SpecialistQ18_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Oranges grown on a citrus farm have a mean mass of 204 grams with a standard deviation of 9
            grams. Lemons grown on the same farm have a mean mass of 76 grams with a standard deviation
            of 3 grams. The masses of the lemons are independent of the masses of the oranges.
          </p>
          <p>
            The mean mass and standard deviation, in grams respectively, of a set of three of these oranges
            and two of these lemons are
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="764, \ 3\sqrt{29}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="636, \ 12" /> },
        { letter: 'C', content: <Katex tex="764, \ 33" /> },
        { letter: 'D', content: <Katex tex="636, \ 3\sqrt{10}" /> },
        { letter: 'E', content: <Katex tex="636, \ 33" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
