// 2021 Mathematical Methods — Exam 2, MCQ 3. VCAA examination report: 72% correct.
// A 95% confidence interval for a population proportion. Question text transcribed from the
// original paper. Solution is original. Stem and options checked against the rendered paper
// page; interval recomputed in scipy (z = 1.96 gives A; 1.645 gives B; 2.58 gives C). D and E
// have no verified source slip, so only their centre/width is described. The report has no
// comment on this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 72, B: 7, C: 6, D: 8, E: 5 },
  answer: 'A',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p \pm z\sqrt{\frac{\hat p\left(1-\hat p\right)}{n}}" />,
    reason: <>The approximate confidence interval from the formula sheet: <Katex tex="\hat p" /> is the sample proportion, <Katex tex="n" /> the sample size, and <Katex tex="z" /> depends on the confidence level. Here <Katex tex="\hat p=0.125" /> and <Katex tex="n=48" />.</>,
  },
  {
    working: <Katex display tex="z = 1.96 \ \text{ for } 95\%" />,
    reason: <>The middle <Katex tex="95\%" /> of the standard normal leaves <Katex tex="2.5\%" /> in each tail, so <Katex tex="z" /> has <Katex tex="0.975" /> to its left: <Cas fn="invNorm">invNorm(0.975, 0, 1) = 1.95996…</Cas>, rounded to 1.96.</>,
    more: <>The other common values are 1.645 for a <Katex tex="90\%" /> interval and 2.58 for a <Katex tex="99\%" /> interval. Using the wrong one is the usual slip here, and both give options on this question (see the last row).</>,
  },
  {
    working: <Katex display tex="\sqrt{\frac{0.125\times0.875}{48}} = 0.047735\ldots" />,
    reason: <>The standard error: the estimated standard deviation of the sample proportion, using <Katex tex="\hat p" /> in place of the unknown population proportion. Keep it unrounded.</>,
  },
  {
    working: <Katex display tex="1.96\times0.047735\ldots = 0.093561\ldots" />,
    reason: <>The margin of error — how far the interval reaches either side of <Katex tex="\hat p" />.</>,
  },
  {
    working: <Katex display tex="0.125-0.093561\ldots = 0.0314" />,
    reason: <>The lower end: <Katex tex="\hat p" /> minus the margin of error, to four decimal places like the options.</>,
  },
  {
    working: <Katex display tex="0.125+0.093561\ldots = 0.2186" />,
    reason: <>The upper end: <Katex tex="\hat p" /> plus the margin of error.</>,
    more: <>Quick check: the interval must be centred on <Katex tex="\hat p=0.125" />, and <Katex tex="\frac{0.0314+0.2186}{2}=0.125" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(0.0314,\ 0.2186)}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option B uses <Katex tex="z=1.645" /> (a <Katex tex="90\%" /> interval) and option C uses <Katex tex="z=2.58" /> (a <Katex tex="99\%" /> interval): both are centred on 0.125 but have the wrong width. Option D is centred correctly but far too narrow, with a margin of only 0.0354, about 0.74 standard errors. No usual <Katex tex="z" /> value (1.645, 1.96 or 2.58) gives that, so its width alone rules it out. Option E has the right margin of error, 0.0936, but is centred on 0.12 instead of 0.125.</>,
  },
]

export default function MethodsQ3_2021() {
  return (
    <MCQShell
      question={
        <p>
          A box contains many coloured glass beads.
          <br />
          A random sample of 48 beads is selected and it is found that the proportion of
          blue-coloured beads in this sample is 0.125
          <br />
          Based on this sample, a 95% confidence interval for the proportion of blue-coloured
          glass beads is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(0.0314,\ 0.2186)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="(0.0465,\ 0.2035)" /> },
        { letter: 'C', content: <Katex tex="(0.0018,\ 0.2482)" /> },
        { letter: 'D', content: <Katex tex="(0.0896,\ 0.1604)" /> },
        { letter: 'E', content: <Katex tex="(0.0264,\ 0.2136)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
