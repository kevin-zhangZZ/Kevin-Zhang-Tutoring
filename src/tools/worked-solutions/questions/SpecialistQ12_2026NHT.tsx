// 2026 Specialist NHT — Exam 2, MCQ 12. The NHT report gives the answer key and a short comment
// only, with no statistics. Differential equations: the time for a logistic population to grow
// from 50 to 500, as an integral of dt/dP. Question text transcribed from the original paper.
// Solution is original; the answer D agrees with the report's key. sympy confirms
// 1/(0.02P(1 − P/1000)) = 50/P + 50/(1000 − P); the integral is about 147.2 years.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      <Katex tex="\dfrac{dt}{dP}=\dfrac{50\,000}{P(1000-P)}" />
      <br />
      Initial population is 50, want time until <Katex tex="P=500" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dt}{dP}=\frac{1}{0.02P\left(1-\frac{P}{1000}\right)}" />,
    reason: <>The question asks for a <em>time</em>, so we want <Katex tex="t" /> as an integral over <Katex tex="P" />. Flip the derivative: <Katex tex="\tfrac{dt}{dP}=1\Big/\tfrac{dP}{dt}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}0.02P\left(1-\frac{P}{1000}\right)&=\frac{P}{50}\cdot\frac{1000-P}{1000}\\ &=\frac{P(1000-P)}{50\,000}\end{aligned}" />,
    reason: <>Write <Katex tex="0.02" /> as <Katex tex="\tfrac{1}{50}" /> and put the bracket over a common denominator.</>,
  },
  {
    working: <Katex display tex="\frac{dt}{dP}=\frac{50\,000}{P(1000-P)}=\frac{50}{P}+\frac{50}{1000-P}" />,
    reason: <>Partial fractions. Write <Katex tex="\tfrac{50\,000}{P(1000-P)}=\tfrac{A}{P}+\tfrac{B}{1000-P}" />; then <Katex tex="50\,000=A(1000-P)+BP" />. Put <Katex tex="P=0" />: <Katex tex="A=50" />. Put <Katex tex="P=1000" />: <Katex tex="B=50" />.</>,
  },
  {
    working: <Katex display tex="t=\int_{50}^{500}\left(\frac{50}{P}+\frac{50}{1000-P}\right)dP" />,
    reason: <>Integrate from the starting population, <Katex tex="P=50" /> (when <Katex tex="t=0" />), to <Katex tex="P=500" />. The result is the time elapsed.</>,
    more: <>Its value is <Katex tex="50\log_e\!\left(\tfrac{500}{50}\right)+50\log_e\!\left(\tfrac{950}{500}\right)=50\log_e(19)\approx147" /> years. Plausibility: the growth rate is only 2% a year at small sizes, so a tenfold increase taking well over a century is about right.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_{50}^{500}\frac{50}{P}+\frac{50}{1000-P}\,dP}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Options <b>A</b> and <b>C</b> integrate <Katex tex="\tfrac{dP}{dt}" /> itself with respect to <Katex tex="P" />, which is not a time at all; you need its reciprocal. Option <b>B</b> has the right integrand but starts at <Katex tex="P=0" /> instead of the initial population of 50, and <Katex tex="\tfrac{50}{P}" /> can&apos;t even be integrated from 0 (the integral diverges: a population of 0 never grows).</>,
  },
]

export default function SpecialistQ12_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          The growth of a population of emus in a certain region is given by the logistic differential equation{' '}
          <Katex tex="\dfrac{dP}{dt}=0.02P\left(1-\dfrac{P}{1000}\right)" />, where <Katex tex="P" /> models the number of
          emus after <Katex tex="t" /> years.
          <br />
          The initial population of emus is 50.
          <br />
          The time taken, in years, for the number of emus to grow to 500 is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_{50}^{500}0.02P\left(1-\frac{P}{1000}\right)dP" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int_{0}^{500}\frac{50}{P}+\frac{50}{1000-P}\,dP" /> },
        { letter: 'C', content: <Katex tex="\displaystyle\int_{0}^{500}0.02P\left(1-\frac{P}{1000}\right)dP" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int_{50}^{500}\frac{50}{P}+\frac{50}{1000-P}\,dP" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
