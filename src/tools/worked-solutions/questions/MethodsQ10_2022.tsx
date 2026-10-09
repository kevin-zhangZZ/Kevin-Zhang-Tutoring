// 2022 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 78% correct.
// A 95% confidence interval quoted as a percentage. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 6, C: 10, D: 78, E: 4 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p = 0.55, \quad n = 1000" />,
    reason: <>The confidence interval formula uses the sample proportion <Katex tex="\hat p" /> as a decimal, so write 55% as <Katex tex="0.55" /> now and convert back to a percentage at the end.</>,
    more: (
      <>
        <Katex tex="\hat p" /> is the proportion in the <em>sample</em>: 550 of the 1000 adults surveyed. The interval
        estimates <Katex tex="p" />, the proportion of <em>all</em> Australian adults who are happy with their level of
        physical activity, and it is centred on <Katex tex="\hat p" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\sqrt{\frac{0.55\times0.45}{1000}} = 0.015732\ldots" />,
    reason: <>The square-root part of the formula-sheet interval <Katex tex="\hat p\pm z\sqrt{\tfrac{\hat p(1-\hat p)}{n}}" />, with <Katex tex="1-\hat p=0.45" />.</>,
    more: (
      <>
        This square root is the estimated standard deviation of the sample proportion. The <Katex tex="n" /> under it
        is the sample size, 1000: the bigger the sample, the smaller the square root and the narrower the interval.
      </>
    ),
  },
  {
    working: <Katex display tex="0.55 \pm 1.96\times0.015732 = 0.55\pm0.030835" />,
    reason: <>For a 95% interval, <Katex tex="z=1.96" />: the middle 95% of the standard normal lies between <Katex tex="-1.96" /> and <Katex tex="1.96" />.</>,
    more: (
      <>
        The formula sheet does not give <Katex tex="z" />. The middle 95% leaves 2.5% in each tail, so{' '}
        <Katex tex="z" /> is the value with 97.5% of the area to its left: <Cas fn="invNorm" /> with area 0.975,{' '}
        <Katex tex="\mu=0" /> and <Katex tex="\sigma=1" /> gives <Katex tex="1.95996\ldots" />. The value 1.96 for 95%
        is worth knowing by heart.
      </>
    ),
  },
  {
    working: <Katex display tex="(0.51917,\ 0.58083)" />,
    reason: <>Subtract the <Katex tex="0.030835" /> for the lower end and add it for the upper end.</>,
    more: (
      <>
        On CAS, <b>1-Prop z Interval</b> (menu → Statistics → Confidence Intervals) gives this interval in one step.
        It asks for the number of successes, <Katex tex="x=550" />, and <Katex tex="n=1000" />, with C Level 0.95.
      </>
    ),
  },
  {
    working: <Katex display tex="(51.917,\ 58.083)" />,
    reason: <>Multiply both ends by 100, because the question asks for a <em>percentage</em>.</>,
  },
  {
    working: <Katex display tex="\boxed{(51.9,\ 58.1)}" />,
    reason: <>Matches option <b>D</b>, rounded to one decimal place like the options.</>,
    more: (
      <>
        A quick look at the options: every one except A is centred on 55, so they differ only in their width, and the
        width depends on <Katex tex="z" /> and <Katex tex="n" />. Using <Katex tex="z=1.645" /> (the 90% value) gives
        option C, and <Katex tex="z=2.576" /> (the 99% value) gives option B. Option E is the interval for a sample of
        only 100 adults, not 1000. Option A is centred on 5.5, not 55: it is the interval you get if 55% is entered as{' '}
        <Katex tex="0.055" />.
      </>
    ),
  },
]

export default function MethodsQ10_2022() {
  return (
    <MCQShell
      question={
        <p>
          An organisation randomly surveyed 1000 Australian adults and found that 55% of
          those surveyed were happy with their level of physical activity.
          <br />
          An approximate
          95% confidence interval for the percentage of Australian adults who were happy
          with their level of physical activity is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(4.1,\ 6.9)" /> },
        { letter: 'B', content: <Katex tex="(50.9,\ 59.1)" /> },
        { letter: 'C', content: <Katex tex="(52.4,\ 57.6)" /> },
        { letter: 'D', content: <Katex tex="(51.9,\ 58.1)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="(45.2,\ 64.8)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
