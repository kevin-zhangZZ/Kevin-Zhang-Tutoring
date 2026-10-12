// 2025 Mathematical Methods — Exam 2, MCQ 12. VCAA examination report: 58% correct.
// Two normal probabilities give two standardised equations. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 16, C: 15, D: 58 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\dfrac{200-\mu}{\sigma}=0.453\ldots,\ \dfrac{180-\mu}{\sigma}=-1.365\ldots" />
      <br />
      <Katex tex="\mu=195,\ \sigma=11" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X<200) = 1-0.325 = 0.675" />,
    reason: <><Cas fn="invNorm" /> needs a left-tail (cumulative) probability, so convert the upper tail first.</>,
  },
  {
    working: <Katex display tex="\Pr(X<180) = 1-0.325-0.589 = 0.086" />,
    reason: <>The three regions <Katex tex="X<180" />, <Katex tex="180<X<200" /> and <Katex tex="X>200" /> account for everything.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} z_1 &= \text{invNorm}(0.086) = -1.3658 \\ z_2 &= \text{invNorm}(0.675) = 0.4538 \end{aligned}" />,
    reason: <>The z-scores of 180 and 200: <Cas fn="invNorm" /> with mean 0 and standard deviation 1, using the left-tail areas above.</>,
  },
  {
    working: <Katex display tex="\frac{180-\mu}{\sigma} = -1.3658, \qquad \frac{200-\mu}{\sigma} = 0.4538" />,
    reason: <>Each z-score is <Katex tex="z=\dfrac{x-\mu}{\sigma}" />, giving two equations in the two unknowns.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \frac{200-\mu}{\sigma}-\frac{180-\mu}{\sigma} &= 0.4538-(-1.3658) \\ \frac{20}{\sigma} &= 1.8196 \\ \sigma &\approx 10.99 \end{aligned}" />,
    reason: <>Subtracting cancels <Katex tex="\mu" />, leaving one equation in <Katex tex="\sigma" />.</>,
    more: <>Alternatively, enter both equations into <Cas fn="solve" /> together. Either way, keep at least 4 decimal places in the z-scores (or store them on CAS); 4 d.p. is enough here.</>,
  },
  {
    working: <Katex display tex="\mu = 200-0.4538\times10.99 \approx 195.0" />,
    reason: <>Back-substitute into the second equation, rearranged as <Katex tex="\mu=200-0.4538\sigma" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\mu \approx 195, \quad \sigma \approx 11}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>
      Check: with <Katex tex="\mu=195" /> and <Katex tex="\sigma=11" />,{' '}
      <Katex tex="\Pr(X>200)\approx0.325" /> and <Katex tex="\Pr(180<X<200)\approx0.589" /> ✓. Options{' '}
      <b>A</b> and <b>B</b> (26% together) put the mean at 190, midway between 180 and 200 — but the two
      tails have different sizes (0.086 below 180, 0.325 above 200), so the distribution is not centred
      between them. Option <b>C</b> keeps the right mean but with <Katex tex="\sigma=10" /> gives{' '}
      <Katex tex="\Pr(X>200)\approx0.309" />, not 0.325.
    </>,
  },
]

export default function MethodsQ12_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-1">
          <p>
            For a normal random variable <Katex tex="X" />, it is known that{' '}
            <Katex tex="\Pr(X>200)=0.325" /> and <Katex tex="\Pr(180<X<200)=0.589" />
          </p>
          <p>
            The mean and standard deviation of <Katex tex="X" /> are closest to
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <>190 and 10</> },
        { letter: 'B', content: <>190 and 11</> },
        { letter: 'C', content: <>195 and 10</> },
        { letter: 'D', content: <>195 and 11</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
