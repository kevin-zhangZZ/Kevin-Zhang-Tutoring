// 2023 Specialist Mathematics — Exam 2, MCQ 20. VCAA examination report: 63% correct.
// A confidence interval read backwards for the population standard deviation. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 63, B: 12, C: 13, D: 7, E: 4 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Interval } (10\,500,\ 15\,500) \implies \bar x = \frac{10\,500+15\,500}{2} = 13\,000" />,
    reason: <>The sample mean is the centre — not that it is needed, but it confirms the interval is symmetric.</>,
  },
  {
    working: <Katex display tex="E = 15\,500-13\,000 = 2500" />,
    reason: <>Half the width: the margin of error.</>,
  },
  {
    working: <Katex display tex="E = z\frac{\sigma}{\sqrt n} \ \text{ with } z = 2.5758 \text{ for } 99\%" />,
    reason: <>A 99% interval leaves 0.5% in each tail, so <Katex tex="z=\mathrm{invNorm}(0.995)" />. Using <Katex tex="1.96" /> (95%) instead gives <Katex tex="12\,755" />, option <b>C</b>.</>,
  },
  {
    working: <Katex display tex="2500 = 2.5758\cdot\frac{\sigma}{\sqrt{100}} = \frac{2.5758\,\sigma}{10}" />,
    reason: <><Katex tex="\sqrt{100}=10" />.</>,
  },
  {
    working: <Katex display tex="\sigma = \frac{25\,000}{2.5758} = 9705.6\ldots" />,
    reason: <>Solving.</>,
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
