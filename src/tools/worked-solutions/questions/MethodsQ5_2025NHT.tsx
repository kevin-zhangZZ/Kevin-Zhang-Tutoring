// 2025 Mathematical Methods NHT — Exam 2, MCQ 5. The NHT report gives the answer key only, with
// no statistics. Probability: a normal probability between a raw score and a score given in
// standard deviations. Question text transcribed from the original paper (the 2025 NHT paper is
// image-only, so read from the rendered page). Solution is original; the answer C agrees with
// the report's key (scipy: Pr(117.9 < X < 138) = 0.44060…). Distractors checked:
// Pr(0 < Z < 1.2) = 0.3849… (B), Pr(0.14 < Z < 1.2) = 0.3293… (A).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim N(120,\,15^2)" />,
    reason: <>Let <Katex tex="X" /> be a randomly selected participant&apos;s score.</>,
  },
  {
    working: <Katex display tex="\text{Chloe: } 120+1.2\times15=138" />,
    reason: <>&ldquo;1.2 standard deviations above the mean&rdquo; means mean plus 1.2 lots of 15. Turn it into a score so both people are on the same scale.</>,
    more: <>Equally, Andrew&apos;s score is <Katex tex="z=\tfrac{117.9-120}{15}=-0.14" />, just below the mean, and you could work entirely with <Katex tex="Z\sim N(0,1)" />: <Katex tex="\Pr(-0.14<Z<1.2)" />.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(117.9, 138, 120, 15)</Cas>,
    reason: <>The probability of a score between the two, from the normal distribution with mean 120 and standard deviation 15.</>,
  },
  {
    working: <Katex display tex="\Pr(117.9<X<138)=0.4406\ldots" />,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.44}" />,
    reason: <>Matches option <b>C</b>. Sense check: from just below the mean to 1.2 sd above covers a bit more than <Katex tex="\Pr(0<Z<1.2)\approx0.38" />.</>,
    more: <>Option <b>B</b>, <Katex tex="0.3849\ldots" />, is <Katex tex="\Pr(0<Z<1.2)" />: starting at the mean instead of at Andrew. Option <b>A</b>, <Katex tex="0.3293\ldots" />, puts Andrew at <Katex tex="z=+0.14" />, above the mean — a sign slip, since 117.9 is <b>below</b> 120.</>,
  },
]

export default function MethodsQ5_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          The scores of a national standardised test are approximately normally distributed with
          mean of 120 and standard deviation of 15. Andrew scored 117.9 and Chloe&apos;s score is
          1.2 standard deviations above the mean. The probability that a randomly selected
          participant achieved a score between Andrew and Chloe is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.33" /> },
        { letter: 'B', content: <Katex tex="0.39" /> },
        { letter: 'C', content: <Katex tex="0.44" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="0.87" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
