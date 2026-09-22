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
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X<200) = 1-0.325 = 0.675" />,
    reason: 'Converting the upper tail into a cumulative probability.',
  },
  {
    working: <Katex display tex="\Pr(X<180) = 1-0.325-0.589 = 0.086" />,
    reason: <>The three regions <Katex tex="X<180" />, <Katex tex="180<X<200" /> and <Katex tex="X>200" /> account for everything.</>,
  },
  {
    working: <Katex display tex="z_1 = \text{invNorm}(0.086) = -1.3657, \qquad z_2 = \text{invNorm}(0.675) = 0.4538" />,
    reason: <>By <Cas fn="invNorm" /> on the standard normal.</>,
  },
  {
    working: <Katex display tex="\frac{180-\mu}{\sigma} = -1.3657, \qquad \frac{200-\mu}{\sigma} = 0.4538" />,
    reason: 'Two linear equations in μ and σ.',
  },
  {
    working: <Katex display tex="\text{subtract: } \frac{20}{\sigma} = 1.8195 \implies \sigma = 10.99" />,
    reason: <>The <Katex tex="\mu" /> cancels, which is why subtracting is the efficient move.</>,
  },
  {
    working: <Katex display tex="\mu = 200-0.4538(10.99) = 195.0" />,
    reason: 'Back-substituting.',
  },
  {
    working: <Katex display tex="\boxed{\mu \approx 195, \quad \sigma \approx 11}" />,
    reason: <>Option <b>D</b>. Note the mean is <em>not</em> midway between 180 and 200: the two tails have different sizes, so the distribution is not centred between them.</>,
  },
]

export default function MethodsQ12_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-1">
          <p>
            For a normal random variable <Katex tex="X" />, it is known that{' '}
            <Katex tex="\Pr(X>200)=0.325" /> and <Katex tex="\Pr(180<X<200)=0.589" />.
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
