// 2023 Specialist Mathematics — Exam 2, MCQ 20. VCAA examination report: 63% correct.
// A confidence interval read backwards for the population standard deviation. Question text transcribed from the original paper.
// Answer and distractor values checked with scipy. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 63, B: 12, C: 13, D: 7, E: 4 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\bar x = \frac{10\,500+15\,500}{2} = 13\,000" />,
    reason: <>A confidence interval for <Katex tex="\mu" /> has the form <Katex tex="\left(\bar x-E,\ \bar x+E\right)" />: the sample mean <Katex tex="\bar x" /> sits in the middle, with the margin of error <Katex tex="E" /> on either side.</>,
  },
  {
    working: <Katex display tex="E = 15\,500-13\,000 = 2500" />,
    reason: <>The margin of error is half the width of the interval. Using the whole width, 5000, instead doubles <Katex tex="\sigma" /> to about <Katex tex="19\,411" />, closest to option <b>E</b>.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}E = z\frac{\sigma}{\sqrt n}\\ z = 2.5758\ldots \text{ for } 99\%\end{gathered}" />,
    reason: <>For 99%, the middle 99% of the standard normal lies between <Katex tex="-z" /> and <Katex tex="z" />, leaving 0.5% in each tail, so <Katex tex="z" /> has area 0.995 to its left: <Cas fn="invNorm" /> with area 0.995, μ = 0, σ = 1. Using area 0.99 instead (all 1% in one tail, <Katex tex="z=2.3263\ldots" />) gives <Katex tex="10\,746" />, closest to option <b>B</b>; using the 95% value <Katex tex="1.96" /> gives <Katex tex="12\,755" />, closest to option <b>C</b>.</>,
  },
  {
    working: <Katex display tex="2500 = 2.5758\ldots\times\frac{\sigma}{\sqrt{100}} = \frac{2.5758\ldots\times\sigma}{10}" />,
    reason: <>Substitute <Katex tex="E=2500" /> and <Katex tex="n=100" />, so <Katex tex="\sqrt{n}=10" />.</>,
  },
  {
    working: <Katex display tex="\sigma = \frac{25\,000}{2.5758\ldots} = 9705.6\ldots" />,
    reason: <>Multiply both sides by 10, then divide by <Katex tex="2.5758\ldots" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma \approx 9710}" />,
    reason: <>Matches option <b>A</b>, the closest of the five.</>,
  },
]

export default function SpecialistQ20_2023() {
  return (
    <MCQShell
      question={
        <p>
          The lifespan of a certain electronic component is normally distributed with a mean
          of <Katex tex="\mu" /> hours and a standard deviation of <Katex tex="\sigma" />{' '}
          hours.
          <br />
          Given that a 99% confidence interval, based on a random sample of 100 such
          components, is <Katex tex="(10\,500,\ 15\,500)" />, the value of{' '}
          <Katex tex="\sigma" /> is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="9710" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="10\,750" /> },
        { letter: 'C', content: <Katex tex="12\,750" /> },
        { letter: 'D', content: <Katex tex="15\,190" /> },
        { letter: 'E', content: <Katex tex="19\,390" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
