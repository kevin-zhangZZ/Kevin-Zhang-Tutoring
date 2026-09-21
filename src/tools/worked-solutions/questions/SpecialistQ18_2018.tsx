// 2018 Specialist Mathematics — Exam 2, MCQ 18. VCAA examination report: 62% correct.
// Recovering the population standard deviation from a confidence interval. Question text
// transcribed from the original paper; VCAA printed no diagram and neither does the stem
// here (guide §7). Value checked (13.6071). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 11, C: 18, D: 62, E: 3 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Width} = 67.31 - 58.42 = 8.89" />,
    reason: <>The full width of the interval.</>,
  },
  {
    working: <Katex display tex="\text{Margin of error} = \frac{8.89}{2} = 4.445" />,
    reason: <>A confidence interval is symmetric about the sample mean, so the margin of error is half the width.</>,
  },
  {
    working: <Katex display tex="\text{Margin of error} = z\,\frac{\sigma}{\sqrt n} = 1.96\times\frac{\sigma}{\sqrt{36}}" />,
    reason: <>The standard form for a <Katex tex="95\%" /> interval, with <Katex tex="z=1.96" /> and <Katex tex="n=36" />.</>,
  },
  {
    working: <Katex display tex="4.445 = \frac{1.96\,\sigma}{6}" />,
    reason: <><Katex tex="\sqrt{36}=6" />.</>,
  },
  {
    working: <Katex display tex="\sigma = \frac{4.445\times6}{1.96} = \frac{26.67}{1.96} = 13.6071\ldots" />,
    reason: <>Solving. Keep the full decimal expansion before rounding — the two candidate options differ only in the second decimal place.</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma \approx 13.61}" />,
    reason: <>Matches option <b>D</b>. Option <b>C</b> <Katex tex="(13.60)" />, chosen by <Katex tex="18\%" />, is the same calculation truncated rather than rounded, or done with <Katex tex="z=1.96" /> replaced by a slightly different value. Options <b>A</b> and <b>B</b> are roughly <Katex tex="\tfrac{\sigma}{\sqrt n}" /> — the standard deviation of the <em>sample mean</em> rather than of the population.</>,
  },
]

export default function SpecialistQ18_2018() {
  return (
    <MCQShell
      question={
        <p>
          A <Katex tex="95\%" /> confidence interval for the mean height <Katex tex="\mu" />,
          in centimetres, of a random sample of <Katex tex="36" /> Irish setter dogs is{' '}
          <Katex tex="58.42<\mu<67.31" />. The standard deviation of the height of the
          population of Irish setter dogs, in centimetres, correct to two decimal places, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2.26" /> },
        { letter: 'B', content: <Katex tex="2.27" /> },
        { letter: 'C', content: <Katex tex="13.60" /> },
        { letter: 'D', content: <Katex tex="13.61" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="62.87" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Running a confidence interval backwards">
          <p>
            The usual direction is sample <Katex tex="\to" /> interval. Here you are given the
            interval and asked for one of the inputs, so read the construction in reverse:
            half the width is the margin of error, and the margin of error is{' '}
            <Katex tex="1.96\,\tfrac{\sigma}{\sqrt n}" />.
          </p>
          <p>
            Two of the five options sit <Katex tex="0.01" /> apart, so this is also a rounding
            question — carry the full value of <Katex tex="\tfrac{26.67}{1.96}" /> before
            rounding at the last step. And note the question asks for the{' '}
            <em>population</em> standard deviation <Katex tex="\sigma" />, not the standard
            deviation of the sample mean; the small options are the latter.
          </p>
        </Background>
      }
    />
  )
}
