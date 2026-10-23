// 2026 Mathematical Methods NHT — Exam 2, MCQ 10. The NHT report gives the answer key only, with no
// statistics; its worked comment is transcribed below, with its sketches cropped from the report PDF
// (meth-2026nht-mcq10-report-graph.png). Probability: how the binomial mean and variance change with p for p > 0.5. Question
// text transcribed from the original paper. Solution is original; the answer B agrees with the
// report's key (sympy: d/dp [np(1 − p)] = n(1 − 2p) < 0 for p > 1/2).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2026nht-mcq10-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'B',
  comment: (
    <>
      The mean and variance are given by
      <br />
      <Katex tex="\text{E}(X)=np\ \text{ and }\ \text{var}(X)=np(1-p)" />
      <br />
      We can consider these as functions of <Katex tex="p" />, for a given value of <Katex tex="n" />.
      <br />
      The mean is a linear function of <Katex tex="p" />, while the variance is a quadratic function of{' '}
      <Katex tex="p" /> with a local maximum at <Katex tex="p=\dfrac12" />.
      <br />
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's two sketches for 1/2 < p < 1: E(X) a rising straight segment with open endpoints, and var(X) a falling curve from an open point at p = 1/2 to an open point on the p-axis at p = 1" className="w-full max-w-[360px] mt-1" />
      <br />
      As <Katex tex="p" /> increases, <Katex tex="\text{E}(X)" /> increases and <Katex tex="\text{var}(X)" /> decreases.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{E}(X)=np" />,
    reason: <>With <Katex tex="n" /> fixed, the mean is a positive multiple of <Katex tex="p" />, so it <b>increases</b> as <Katex tex="p" /> increases. That rules out options C and D.</>,
  },
  {
    working: <Katex display tex="\operatorname{Var}(X)=np(1-p)=n\left(\tfrac14-\left(p-\tfrac12\right)^2\right)" />,
    reason: <>The variance is a quadratic in <Katex tex="p" />: an inverted parabola with its maximum at <Katex tex="p=\tfrac12" /> (complete the square to see it).</>,
    more: <>Or differentiate: <Katex tex="\dfrac{d}{dp}\big(np(1-p)\big)=n(1-2p)" />, which is negative whenever <Katex tex="p>\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\tfrac12<p<1:\ \operatorname{Var}(X)\ \text{decreases as }p\text{ increases}" />,
    reason: <>The question restricts <Katex tex="p" /> to the right of the parabola&apos;s peak, where it is falling.</>,
    more: <>Intuitively, the variance measures how unpredictable the count is. At <Katex tex="p=\tfrac12" /> each trial is a coin toss; as <Katex tex="p\to1" /> almost every trial succeeds, so <Katex tex="X" /> is almost certainly <Katex tex="n" /> and the spread shrinks to 0.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{E}(X)\text{ increases and }\operatorname{var}(X)\text{ decreases}}" />,
    reason: <>Matches option <b>B</b>. Check with <Katex tex="n=10" />: <Katex tex="p=0.6" /> gives mean 6 and variance 2.4; <Katex tex="p=0.8" /> gives mean 8 and variance 1.6 ✓.</>,
    more: <>Option <b>A</b> would be right for <Katex tex="0<p<\tfrac12" />, to the left of the peak, where both rise together. The restriction <Katex tex="0.5<p<1" /> is the whole point of the question.</>,
  },
]

export default function MethodsQ10_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            Let <Katex tex="X\sim\text{Bi}(n,\ p)" />, where <Katex tex="0.5<p<1" />.
          </p>
          <p>
            For a particular value of <Katex tex="n" />, as <Katex tex="p" /> increases
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <><Katex tex="\text{E}(X)" /> increases and <Katex tex="\operatorname{var}(X)" /> increases.</> },
        { letter: 'B', content: <><Katex tex="\text{E}(X)" /> increases and <Katex tex="\operatorname{var}(X)" /> decreases.</>, isAnswer: true },
        { letter: 'C', content: <><Katex tex="\text{E}(X)" /> decreases and <Katex tex="\operatorname{var}(X)" /> increases.</> },
        { letter: 'D', content: <><Katex tex="\text{E}(X)" /> decreases and <Katex tex="\operatorname{var}(X)" /> decreases.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
