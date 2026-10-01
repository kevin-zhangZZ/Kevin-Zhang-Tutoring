// 2021 Specialist Mathematics — Exam 2, MCQ 20. VCAA examination report: 43% correct.
// Probability that two independent normal times differ by less than a given amount. Question
// text transcribed from the original paper. Solution is original.
// The report's comment is kept verbatim in `comment` (its brackets are misplaced); the
// working explains it as Pr(|T1 - T2| < 3) = Pr(-3 < T1 - T2 < 3).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 18, C: 43, D: 15, E: 14 },
  answer: 'C',
  comment: <Katex tex="\Pr\left|T_1-T_2\right|<3=-3<\Pr\left(T_1-T_2\right)<3" />,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="T_1,\ T_2 \sim \mathrm{N}\!\left(30,\ 5^2\right),\ \text{independent}" />,
    reason: <>Let <Katex tex="T_1" /> and <Katex tex="T_2" /> be the times, in seconds, taken by the two machines.</>,
  },
  {
    working: <Katex display tex="D = T_1-T_2" />,
    reason: <>"Differ by less than 3 seconds" is about the difference between the two times, so let <Katex tex="D" /> be that difference. A linear combination of independent normal variables is itself normal, so only the mean and variance of <Katex tex="D" /> are needed.</>,
  },
  {
    working: <Katex display tex="E(D) = E(T_1)-E(T_2) = 30-30 = 0" />,
    reason: <>The mean of a difference is the difference of the means.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(D) = \mathrm{Var}(T_1)+\mathrm{Var}(T_2) = 25+25 = 50" />,
    reason: <>For independent variables, <Katex tex="\mathrm{Var}(aT_1+bT_2) = a^2\,\mathrm{Var}(T_1)+b^2\,\mathrm{Var}(T_2)" />. Here <Katex tex="a=1" />, <Katex tex="b=-1" /> and <Katex tex="(-1)^2=1" />, so the variances <em>add</em> even though the times are subtracted. Each variance is <Katex tex="5^2=25" />.</>,
  },
  {
    working: <Katex display tex="D \sim \mathrm{N}(0,\ 50) \;\implies\; \mathrm{sd}(D) = \sqrt{50} = 5\sqrt2" />,
    reason: <>The standard deviation is the square root of the variance — not <Katex tex="5+5=10" />.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(|D|<3\right) = \Pr(-3<D<3)" />,
    reason: <>"Differ by less than 3 seconds" means <Katex tex="|T_1-T_2|<3" />. Either machine could be the faster one, so <Katex tex="D" /> can be negative too. This is the step the report&rsquo;s comment shows (with its brackets misplaced): <Katex tex="\Pr\left(|T_1-T_2|<3\right) = \Pr\left(-3<T_1-T_2<3\right)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(-3<D<3) &= \Pr\!\left(-\frac{3}{5\sqrt2}<Z<\frac{3}{5\sqrt2}\right)\\ &= 0.32862\ldots\end{aligned}" />,
    reason: <>Standardise by dividing by <Katex tex="\mathrm{sd}(D)=5\sqrt2" /> (the mean is 0), then use <Cas fn="normCdf" /> with lower −3, upper 3, μ = 0, σ = √50.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr\!\left(|T_1-T_2|<3\right) \approx 0.329}" />,
    reason: <>Matches option <b>C</b>. Option <b>A</b>, 0.164, is only <Katex tex="\Pr(0<D<3)" />, half the answer: it forgets that either machine could be the slower one. Option <b>B</b>, 0.236, adds the standard deviations (sd 10 instead of <Katex tex="\sqrt{50}" />); option <b>D</b>, 0.451, uses sd 5, the standard deviation of one machine; option <b>E</b>, 0.671, is the complement, <Katex tex="\Pr\left(|D|\ge3\right)" />.</>,
  },
]

export default function SpecialistQ20_2021() {
  return (
    <MCQShell
      question={
        <p>
          An office has two coffee machines that operate independently of each other. The time taken for each
          machine to produce a cup of coffee is normally distributed with a mean of 30 seconds and a standard
          deviation of 5 seconds. On a particular morning, a cup of coffee is produced from each machine.
          <br />
          The probability that the time taken by each coffee machine to produce one cup of coffee will differ
          by less than 3 seconds is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.164" /> },
        { letter: 'B', content: <Katex tex="0.236" /> },
        { letter: 'C', content: <Katex tex="0.329" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="0.451" /> },
        { letter: 'E', content: <Katex tex="0.671" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
