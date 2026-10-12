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
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X<10) = \Pr(X>18) = 0.2" />,
    reason: <>Two tails of equal size, so 10 and 18 are the same distance from the mean.</>,
    more: <>A normal curve is symmetric about its mean, so the left tail below <Katex tex="\mu-d" /> is the mirror image of the right tail above <Katex tex="\mu+d" />. Equal tail areas therefore force 10 and 18 to sit at <Katex tex="\mu-d" /> and <Katex tex="\mu+d" /> for the same <Katex tex="d" />.</>,
  },
  {
    working: <Katex display tex="\mu = \frac{10+18}{2} = 14" />,
    reason: <>The mean is halfway between them, by symmetry.</>,
  },
  {
    working: <Katex display tex="z = \text{invNorm}(0.2,0,1) = -0.8416" />,
    reason: <><Katex tex="\Pr(X<10)=0.2" />, so 10 sits at the standard <Katex tex="z" />-score with area 0.2 to its left (<Cas fn="invNorm" />). It is negative since 10 is below the mean.</>,
  },
  {
    working: <Katex display tex="\frac{10-14}{\sigma} = -0.8416 \implies \sigma = \frac{4}{0.8416} = 4.7527" />,
    reason: <>Standardise <Katex tex="x=10" /> with <Katex tex="z=\frac{x-\mu}{\sigma}" />, then solve for <Katex tex="\sigma" />.</>,
    more: <>Keep full precision (store <Katex tex="\sigma" /> in the CAS). Rounding <Katex tex="\sigma" /> to 4.8 gives 0.338 instead of 0.337 — harmless here, but early rounding can cost the mark when options are close.</>,
  },
  {
    working: <Katex display tex="\Pr(X<12) = \text{normCdf}(-\infty,\,12,\,14,\,4.7527)" />,
    reason: <>Straight into <Cas fn="normCdf" /> once both parameters are known.</>,
  },
  {
    working: <Katex display tex="\boxed{0.337}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: (
      <>
        Quick check: 12 lies between 10 (the 20th percentile) and 14 (the median), so{' '}
        <Katex tex="\Pr(X<12)" /> must be between 0.2 and 0.5. That rules out <b>A</b>, 0.134, which is
        close to <Katex tex="\Pr(10<X<12)\approx0.137" /> — the strip between 10 and 12 without the 0.2
        below 10. <b>B</b> and <b>D</b> are in the right range, so only the value of{' '}
        <Katex tex="\sigma" /> separates them from <b>C</b>: 0.297 would need{' '}
        <Katex tex="\sigma\approx3.75" /> and 0.365 would need <Katex tex="\sigma\approx5.8" />.
      </>
    ),
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
