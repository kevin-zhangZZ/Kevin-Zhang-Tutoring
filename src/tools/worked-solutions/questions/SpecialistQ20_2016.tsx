// 2016 Specialist Mathematics — Exam 2, MCQ 20. VCAA examination report: 68% correct.
// The distribution of a sample mean of 25 battery lifetimes. Question text transcribed
// from the original paper; answer verified with scipy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 4, C: 14, D: 7, E: 68 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\mathrm{E}(\bar X)=20,\ \mathrm{sd}(\bar X)=\tfrac{2}{\sqrt{25}}=\tfrac25" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim N\!\left(20,\,2^2\right), \qquad n = 25" />,
    reason: <>One battery. The question asks about the mean of twenty-five, so this is not the distribution to use directly.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(\bar X) = 20, \qquad \mathrm{sd}(\bar X) = \frac{2}{\sqrt{25}} = 0.4" />,
    reason: <>The mean of <Katex tex="n" /> independent values keeps the mean <Katex tex="\mu" /> but has standard deviation <Katex tex="\sigma/\sqrt n" />.</>,
    more: <>Why <Katex tex="\sqrt n" />: the total <Katex tex="X_1+\dots+X_{25}" /> has variance <Katex tex="25\times2^2=100" /> (variances of independent variables add), so standard deviation <Katex tex="10" />. Dividing the total by <Katex tex="25" /> to get the mean divides its standard deviation by <Katex tex="25" /> too: <Katex tex="10/25=0.4" />. Since each <Katex tex="X" /> is normal, <Katex tex="\bar X" /> is exactly normal: <Katex tex="\bar X\sim N(20,\,0.4^2)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \Pr(\bar X>19.3) &= \Pr\!\left(Z>\frac{19.3-20}{0.4}\right) \\ &= \Pr(Z>-1.75) \end{aligned}" />,
    reason: <>Standardise using the standard deviation of the <em>mean</em>, <Katex tex="0.4" />, not that of one battery.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(19.3, ∞, 20, 0.4)</Cas>,
    reason: <>Or directly on CAS, entering the mean <Katex tex="20" /> and standard deviation <Katex tex="0.4" /> of <Katex tex="\bar X" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.9599}" />,
    reason: <>Matches option <b>E</b>. Sensible: <Katex tex="19.3" /> is below the mean, so exceeding it is more likely than not.</>,
    more: <>Option A is the complement, <Katex tex="\Pr(\bar X<19.3)" />; options A and B are both under a half, so they fail the check on sight. Using the single-battery standard deviation <Katex tex="2" /> instead of <Katex tex="0.4" /> gives <Katex tex="\Pr(X>19.3)\approx0.6368" />, the probability for <em>one</em> battery, which is not an option. Option C, the most common wrong answer, flips the formula to <Katex tex="\sqrt n/\sigma=5/2=2.5" />: <Katex tex="\Pr(Z>-0.7/2.5)=\Pr(Z>-0.28)\approx0.6103" />. Dividing by <Katex tex="\sqrt n" /> must make the spread smaller than <Katex tex="2" />, so <Katex tex="2.5" /> is a warning sign.</>,
  },
]

export default function SpecialistQ20_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The lifetime of a certain brand of batteries is normally distributed with a mean
            lifetime of <Katex tex="20" /> hours and a standard deviation of two hours. A
            random sample of <Katex tex="25" /> batteries is selected.
          </p>
          <p>
            The probability that the mean lifetime of this sample of <Katex tex="25" />{' '}
            batteries exceeds <Katex tex="19.3" /> hours is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.0401" /> },
        { letter: 'B', content: <Katex tex="0.1368" /> },
        { letter: 'C', content: <Katex tex="0.6103" /> },
        { letter: 'D', content: <Katex tex="0.8632" /> },
        { letter: 'E', content: <Katex tex="0.9599" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
