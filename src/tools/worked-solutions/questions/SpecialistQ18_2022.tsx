// 2022 Specialist Mathematics — Exam 2, MCQ 18. VCAA examination report: 42% correct.
// Probability that two independent normal travel times differ by more than a given amount.
// Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 42, C: 13, D: 14, E: 15 },
  answer: 'B',
  comment: (
    <>
      <Katex tex="D = T_1-T_2,\ E(D)=0,\ \mathrm{Var}(D)=1^2\mathrm{Var}(T_1)+(-1)^2\mathrm{Var}(T_2)=12.5" />
      <br />
      <Katex tex="1-\Pr(-6<D<6)=0.0897" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="T_1,T_2 \sim N(30,2.5^2),\ \text{independent}" />,
    reason: <>Let <Katex tex="T_1" /> and <Katex tex="T_2" /> be the two consecutive travel times.</>,
  },
  {
    working: <Katex display tex="D = T_1-T_2 \;\implies\; E(D)=30-30=0" />,
    reason: <>&ldquo;Differ by&rdquo; is about the difference, so define <Katex tex="D" /> as one time minus the other. Means subtract: <Katex tex="E(D)=E(T_1)-E(T_2)" />. As a linear combination of independent normal variables, <Katex tex="D" /> is also normal.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\mathrm{Var}(D) &= \mathrm{Var}(T_1)+\mathrm{Var}(T_2)\\ &= 2.5^2+2.5^2 = 12.5\\ \mathrm{sd}(D) &= \sqrt{12.5}\approx3.536\end{aligned}" />,
    reason: <>For independent variables, <Katex tex="\mathrm{Var}(aX+bY)=a^2\mathrm{Var}(X)+b^2\mathrm{Var}(Y)" /> (formula sheet). Here <Katex tex="a=1" /> and <Katex tex="b=-1" />, and <Katex tex="(-1)^2=1" />, so the variances <em>add</em> even though the times are subtracted. Add variances, never standard deviations: <Katex tex="\mathrm{sd}(D)" /> is not <Katex tex="2.5+2.5=5" />.</>,
  },
  {
    working: <Katex display tex="\Pr(|D|>6) = 1 - \Pr(-6\leq D\leq6)" />,
    reason: <>Either trip could be the longer one, so the times differ by more than 6 minutes when <Katex tex="D>6" /> <em>or</em> <Katex tex="D<-6" />. Both tails count, and the quickest way to get them is the complement of <Katex tex="D" /> lying between <Katex tex="-6" /> and 6.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\Pr(-6\leq D\leq6)\\ &= \Pr(-1.697\leq Z\leq1.697)\\ &\approx 0.9103\end{aligned}" />,
    reason: <>Standardising, <Katex tex="\tfrac{6}{\sqrt{12.5}}\approx1.697" />. By <Cas fn="normCdf" /> with lower <Katex tex="-6" />, upper 6, <Katex tex="\mu=0" />, <Katex tex="\sigma=\sqrt{12.5}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{1-0.9103 = 0.0897}" />,
    reason: <>Matches option <b>B</b>. Option <b>A</b>, 0.0448, is only one tail, <Katex tex="\Pr(D>6)" />. Options <b>C</b> and <b>D</b> come from adding the standard deviations (<Katex tex="\mathrm{sd}=5" />): <b>C</b>, 0.1151, is one tail and <b>D</b>, 0.2301, is both. Option <b>E</b>, 0.9103, is the probability the times are <em>within</em> 6 minutes of each other.</>,
  },
]

export default function SpecialistQ18_2022() {
  return (
    <MCQShell
      question={
        <p>
          The time taken, <Katex tex="T" /> minutes, for a student to travel to school is normally distributed with a
          mean of 30 minutes and a standard deviation of 2.5 minutes.
          <br />
          Assuming that individual travel times are independent of each other, the probability, correct to four
          decimal places, that two consecutive travel times differ by more than 6 minutes is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.0448" /> },
        { letter: 'B', content: <Katex tex="0.0897" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="0.1151" /> },
        { letter: 'D', content: <Katex tex="0.2301" /> },
        { letter: 'E', content: <Katex tex="0.9103" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
