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
    reason: <>The margin of error is half the width of the interval: the distance from the centre to either end.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}E = z\frac{\sigma}{\sqrt n}\\ z = 2.5758\ldots \text{ for } 99\%\end{gathered}" />,
    reason: <>The margin of error is <Katex tex="z" /> standard errors, each <Katex tex="\tfrac{\sigma}{\sqrt n}" />. For 99%, the middle 99% of the standard normal lies between <Katex tex="-z" /> and <Katex tex="z" />, leaving 0.5% in each tail, so <Katex tex="z" /> has area 0.995 to its left: <Cas fn="invNorm" /> with area 0.995, μ = 0, σ = 1.</>,
    more: (
      <>
        A quick sense check: the familiar 95% value is <Katex tex="1.96" />, and a 99% interval has to be wider, so its{' '}
        <Katex tex="z" /> must be bigger than <Katex tex="1.96" />. Entering area 0.99 instead of 0.995 is the other
        slip to avoid: that puts the whole 1% in one tail and gives <Katex tex="z=2.3263\ldots" />, which is too small.
      </>
    ),
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
    more: (
      <>
        Each wrong option is close to the <Katex tex="\sigma" /> that one slip in <Katex tex="E" /> or{' '}
        <Katex tex="z" /> produces: <b>B</b> (<Katex tex="10\,746" />) comes from area 0.99;{' '}
        <b>C</b> (<Katex tex="12\,755" />) uses the 95% value <Katex tex="z=1.96" />;{' '}
        <b>D</b> (<Katex tex="15\,199" />) uses the 90% value <Katex tex="z=1.6449\ldots" />; and{' '}
        <b>E</b> (<Katex tex="19\,411" />) uses the whole width, 5000, as <Katex tex="E" />, which doubles{' '}
        <Katex tex="\sigma" />.
      </>
    ),
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
