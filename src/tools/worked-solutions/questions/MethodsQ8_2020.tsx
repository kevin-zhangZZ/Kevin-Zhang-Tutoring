// 2020 Mathematical Methods — Exam 2, MCQ 8. VCAA examination report: 50% correct.
// Recovering p from a binomial mean, then a tail probability. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 50, C: 14, D: 9, E: 20 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(X) = np = 1.4, \quad n = 25" />,
    reason: <>The mean of a binomial is <Katex tex="np" />, which is how <Katex tex="p" /> is recovered.</>,
  },
  {
    working: <Katex display tex="p = \frac{1.4}{25} = 0.056" />,
    reason: <>Note <Katex tex="0.056" /> is option C — the probability of a <em>single</em> item being defective, not the answer.</>,
  },
  {
    working: <Katex display tex="X \sim \mathrm{Bi}(25,\,0.056)" />,
    reason: <>Now the distribution is fully specified.</>,
  },
  {
    working: <Katex display tex="\Pr(X>3) = 1-\Pr(X\le3)" />,
    reason: <>"More than three" excludes 3 itself, so the complement runs up to and including 3.</>,
  },
  {
    working: <Cas fn="binomCdf">1 - binomCdf(25, 0.056, 0, 3)</Cas>,
    reason: <>Using <Katex tex="\Pr(X\le4)" /> instead gives <Katex tex="0.0088" />; using <Katex tex="\Pr(X\ge3)" /> gives <Katex tex="0.162" />, which is option E.</>,
  },
  {
    working: <Katex display tex="\boxed{0.048}" />,
    reason: <>Option B, to three decimal places (<Katex tex="0.04850\ldots" />).</>,
  },
]

export default function MethodsQ8_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Items are packed in boxes of 25 and the mean number of defective items per box is
            1.4
          </p>
          <p>
            Assuming that the probability of an item being defective is binomially
            distributed, the probability that a box contains more than three defective items,
            correct to three decimal places, is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.037" /> },
        { letter: 'B', content: <Katex tex="0.048" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="0.056" /> },
        { letter: 'D', content: <Katex tex="0.114" /> },
        { letter: 'E', content: <Katex tex="0.162" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
