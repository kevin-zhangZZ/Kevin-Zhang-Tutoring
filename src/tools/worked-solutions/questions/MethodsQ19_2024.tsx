// 2024 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 57% correct.
// Two symmetric tail probabilities pin down both the mean and the standard deviation. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 19, C: 57, D: 13 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X<10) = \Pr(X>18) = 0.2" />,
    reason: 'Two tails of equal size, so 10 and 18 are the same distance from the mean.',
  },
  {
    working: <Katex display tex="\mu = \frac{10+18}{2} = 14" />,
    reason: 'The symmetry of the normal curve — no calculation required.',
  },
  {
    working: <Katex display tex="z = \text{invNorm}(0.2,0,1) = -0.8416" />,
    reason: <>The <Cas fn="invNorm" /> for the lower tail.</>,
  },
  {
    working: <Katex display tex="\frac{10-14}{\sigma} = -0.8416 \implies \sigma = \frac{4}{0.8416} = 4.7527" />,
    reason: 'Standardising the known point. Keep full precision — rounding σ to 4.8 here shifts the final answer in the third decimal place.',
  },
  {
    working: <Katex display tex="\Pr(X<12) = \text{normCdf}(-\infty,\,12,\,14,\,4.7527)" />,
    reason: <>Straight into <Cas fn="normCdf" /> once both parameters are known.</>,
  },
  {
    working: <Katex display tex="\boxed{0.337}" />,
    reason: <>Option <b>C</b>. Reasonable: 12 is between the 20th percentile (10) and the median (14), so the answer must lie between 0.2 and 0.5, which already rules out <b>A</b>.</>,
  },
]

export default function MethodsQ19_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-1">
          <p>
            Consider the normal random variable <Katex tex="X" /> that satisfies{' '}
            <Katex tex="\Pr(X<10)=0.2" /> and <Katex tex="\Pr(X>18)=0.2" />.
          </p>
          <p>
            The value of <Katex tex="\Pr(X<12)" /> is closest to
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.134" /> },
        { letter: 'B', content: <Katex tex="0.297" /> },
        { letter: 'C', content: <Katex tex="0.337" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="0.365" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
