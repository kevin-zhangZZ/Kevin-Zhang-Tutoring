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
    working: <Katex display tex="\begin{aligned} \mathrm{E}(S) &= 3(204) + 2(76) \\ &= 612+152 \\ &= 764 \end{aligned}" />,
    reason: <>Means always add: three oranges at <Katex tex="204" /> g each and two lemons at <Katex tex="76" /> g each.</>,
    more: <>Expectation is linear, so <Katex tex="\mathrm{E}(S)" /> is the sum of the five individual means whether or not the masses are independent. Independence is needed only for the variance in the next step.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\mathrm{Var}(S) = 3\,\mathrm{Var}(O)+2\,\mathrm{Var}(L)" />
        <Katex display tex="= 3(9^2)+2(3^2) = 243+18 = 261" />
      </>
    ),
    reason: <>The five masses are independent, so their <em>variances</em> add: one <Katex tex="9^2" /> for each orange and one <Katex tex="3^2" /> for each lemon.</>,
    more: <>This is the report's note, <Katex tex="\mathrm{Var}(X_1+X_2+X_3)\ne\mathrm{Var}(3X)" />. Three <em>different</em> oranges vary independently, so a heavy one is often offset by a light one: the variance is <Katex tex="3\times9^2=243" />. <Katex tex="3X" /> is one orange's mass tripled, so its deviation from the mean is tripled too: <Katex tex="\mathrm{Var}(3X)=3^2\times9^2=729" />. Treating the set as <Katex tex="3O+2L" /> gives <Katex tex="729+36=765" /> and a standard deviation of <Katex tex="3\sqrt{85}" />, which is not an option. And it is variances that add, never standard deviations.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \mathrm{sd}(S) &= \sqrt{261} \\ &= \sqrt{9\times29} \\ &= 3\sqrt{29} \end{aligned}" />,
    reason: <>Standard deviation is the square root of variance.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(S)=764, \ \mathrm{sd}(S) = 3\sqrt{29}}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option C (chosen by 22%) has the right mean but <Katex tex="\sqrt{33}" />: it adds the standard deviations as if they were variances, <Katex tex="3\times9+2\times3=33" />, then takes the square root. Options B, D and E all have mean <Katex tex="636=2(204)+3(76)" />, which swaps the numbers of oranges and lemons; B's <Katex tex="12=9+3" /> and E's <Katex tex="33" /> also add standard deviations directly, and D's <Katex tex="3\sqrt{10}=\sqrt{9^2+3^2}" /> adds one orange's and one lemon's variance, ignoring how many of each there are.</>,
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
            of 3 grams.
          </p>
          <p className="mb-2">The masses of the lemons are independent of the masses of the oranges.</p>
          <p>
            The mean mass and standard deviation, in grams, respectively of a set of three of these
            oranges and two of these lemons are
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="764, \ 3\sqrt{29}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="636, \ 12" /> },
        { letter: 'C', content: <Katex tex="764, \ \sqrt{33}" /> },
        { letter: 'D', content: <Katex tex="636, \ 3\sqrt{10}" /> },
        { letter: 'E', content: <Katex tex="636, \ 33" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
