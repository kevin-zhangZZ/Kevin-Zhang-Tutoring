// 2026 Mathematical Methods NHT — Exam 2, MCQ 3. The NHT report gives the answer key only, with no
// statistics; its worked comment is transcribed below from the rendered report. Probability: standardising a normal variable given its variance, then an upper tail.
// Question text transcribed from the original paper. Solution is original; the answer D agrees
// with the report's key. Checked with scipy: 1 − Φ(2.5) = 0.00621. Distractors verified: C divides
// by the variance 4 instead of the standard deviation 2 (5/4 = 1.25); B is the lower tail.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      <Katex tex="\Pr(X>20)=\Pr\left(Z>\dfrac{20-15}{\sqrt4}\right)" />
      <br />
      <Katex tex="=\Pr(Z>2.5)" />
      <br />
      <Katex tex="=1-\Pr(Z<2.5)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="T\sim N(15,\ 2^2),\qquad \sigma=\sqrt4=2" />,
    reason: <>The question gives the <b>variance</b>, 4. Standardising needs the <b>standard deviation</b>, its square root.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(T>20)&=\Pr\left(Z>\frac{20-15}{2}\right)\\&=\Pr(Z>2.5)\end{aligned}" />,
    reason: <>Standardise with <Katex tex="z=\dfrac{x-\mu}{\sigma}" />: 20 minutes is 2.5 standard deviations above the mean.</>,
    more: <>The question doesn&apos;t name the travel time; <Katex tex="T" /> is our label. The report calls it <Katex tex="X" /> — same variable, and it writes the denominator as <Katex tex="\sqrt4" />, the square root of the variance.</>,
  },
  {
    working: <Katex display tex="\Pr(Z>2.5)=1-\Pr(Z<2.5)" />,
    reason: <>Every option is written with <Katex tex="Z<\ldots" />, so turn the upper tail into one minus the lower tail (the total probability is 1, and for a continuous variable <Katex tex="\Pr(Z=2.5)=0" />).</>,
  },
  {
    working: <Katex display tex="\boxed{1-\Pr(Z<2.5)}" />,
    reason: <>Matches option <b>D</b>. Check: this is about <Katex tex="0.006" /> — small, as it should be for a trip 2.5 standard deviations longer than average.</>,
    more: <><Cas fn="normCdf">normCdf(20, ∞, 15, 2)</Cas> gives <Katex tex="0.00621" /> directly. Option <b>C</b> divides by the variance instead of the standard deviation: <Katex tex="\tfrac{20-15}{4}=1.25" />. Option <b>B</b> is <Katex tex="\Pr(Z<2.5)\approx0.994" />, the probability of taking <em>less</em> than 20 minutes.</>,
  },
]

export default function MethodsQ3_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            Assume that the time, in minutes, it takes for a particular student to travel to school is a normal random
            variable with mean 15 and variance 4.
          </p>
          <p>Let <Katex tex="Z" /> be a standard normal random variable.</p>
          <p>The probability that it takes the student more than 20 minutes to travel to school is equal to</p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\Pr(Z<1.25)" /> },
        { letter: 'B', content: <Katex tex="\Pr(Z<2.5)" /> },
        { letter: 'C', content: <Katex tex="1-\Pr(Z<1.25)" /> },
        { letter: 'D', content: <Katex tex="1-\Pr(Z<2.5)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
