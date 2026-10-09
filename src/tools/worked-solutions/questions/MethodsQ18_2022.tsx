// 2022 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 47% correct. Finding a
// from a binomial conditional-probability equation, by testing the given options on CAS. Question
// text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 47, C: 14, D: 12, E: 8 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="X\sim\mathrm{Bi}(20,0.88)" />
      <br />
      <Katex tex="\Pr(X\ge16\mid X\ge a)\approx0.9175" />
      <br />
      <Katex tex="\dfrac{\Pr(X\ge16\cap X\ge a)}{\Pr(X\ge a)}\approx0.9175" />
      <br />
      As <Katex tex="a" /> &lt; 16 in the options
      <br />
      <Katex tex="\dfrac{\Pr(X\ge16)}{\Pr(X\ge a)}\approx0.9175" />.
      <br />
      <Katex tex="a=12" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{Bi}(20,0.88)" />,
    reason: <>Given distribution.</>,
  },
  {
    working: <Katex display tex="\Pr(X\geq16\mid X\geq a) = \frac{\Pr(X\geq16 \cap X\geq a)}{\Pr(X\geq a)}" />,
    reason: <>Definition of conditional probability: <Katex tex="\Pr(A\mid B)=\dfrac{\Pr(A\cap B)}{\Pr(B)}" />.</>,
  },
  {
    working: <Katex display tex="a<16:\ \Pr(X\geq16\cap X\geq a)=\Pr(X\geq16)" />,
    reason: <>All five options are below 16. Then any outcome with <Katex tex="X\geq16" /> automatically has <Katex tex="X\geq a" />, so "<Katex tex="X\geq16" /> and <Katex tex="X\geq a" />" is just <Katex tex="X\geq16" />.</>,
    more: <><Katex tex="a" /> has to be below 16 anyway: if <Katex tex="a\geq16" />, then <Katex tex="X\geq a" /> forces <Katex tex="X\geq16" /> and the conditional probability would be 1, not 0.9175.</>,
  },
  {
    working: <Katex display tex="\frac{\Pr(X\geq16)}{\Pr(X\geq a)} \approx 0.9175" />,
    reason: <>An equation in <Katex tex="a" /> alone. <Katex tex="a" /> is a whole number and <Katex tex="\Pr(X\geq a)" /> is a sum of binomial terms, so there is no algebra to solve it — test the options instead.</>,
  },
  {
    working: <><Cas fn="binomCdf">binomCdf(20, 0.88, 16, 20)</Cas> <Katex tex="= 0.91728\ldots" /></>,
    reason: <>The numerator, <Katex tex="\Pr(X\geq16)" />: lower bound 16, upper bound 20, both included.</>,
  },
  {
    working: <Katex display tex="\begin{array}{c|c} a & \dfrac{\Pr(X\geq16)}{\Pr(X\geq a)} \\ \hline 11 & 0.9173 \\ 12 & 0.9175 \\ 13 & 0.9186 \\ 14 & 0.9235 \\ 15 & 0.9418 \end{array}" />,
    reason: <>Divide by <Cas fn="binomCdf">binomCdf(20, 0.88, a, 20)</Cas> for each option. Only <Katex tex="a=12" /> gives 0.9175 — <Katex tex="a=11" /> gives 0.9173, so compare all four decimal places.</>,
    more: <>The values for 11 and 12 are so close because the only difference between the two denominators is <Katex tex="\Pr(X=11)" />, which is tiny (about 0.0002).</>,
  },
  {
    working: <Katex display tex="\boxed{a=12}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option A, 11, is what an off-by-one lower bound gives: <Cas fn="binomCdf">binomCdf(20, 0.88, a + 1, 20)</Cas> is <Katex tex="\Pr(X>a)" />, not <Katex tex="\Pr(X\geq a)" />, and with it <Katex tex="a=11" /> gives 0.9175. Options C, D and E all give ratios above 0.9175, as the table shows.</>,
  },
]

export default function MethodsQ18_2022() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="X" /> is a binomial random variable where <Katex tex="n=20" />, <Katex tex="p=0.88" /> and{' '}
          <Katex tex="\Pr(X\geq16\mid X\geq a) = 0.9175" />, correct to four decimal places, then <Katex tex="a" /> is
          equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="11" /> },
        { letter: 'B', content: <Katex tex="12" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="13" /> },
        { letter: 'D', content: <Katex tex="14" /> },
        { letter: 'E', content: <Katex tex="15" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
