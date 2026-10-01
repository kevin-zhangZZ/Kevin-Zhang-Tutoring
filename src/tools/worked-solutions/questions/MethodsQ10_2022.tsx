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
  },
  {
    working: <Katex display tex="\sqrt{\frac{0.55\times0.45}{1000}} = 0.015732\ldots" />,
    reason: <>The square-root part of the formula-sheet interval <Katex tex="\hat p\pm z\sqrt{\tfrac{\hat p(1-\hat p)}{n}}" />, with <Katex tex="1-\hat p=0.45" />.</>,
  },
  {
    working: <Katex display tex="0.55 \pm 1.96\times0.015732 = 0.55\pm0.030835" />,
    reason: <>For 95%, <Katex tex="z=1.96" />: the middle 95% of the standard normal lies between <Katex tex="-1.96" /> and <Katex tex="1.96" />, leaving 2.5% in each tail. If you forget it, <Cas fn="invNorm" /> with area 0.975 on the standard normal gives it.</>,
  },
  {
    working: <Katex display tex="(0.51917,\ 0.58083)" />,
    reason: <>Subtract the <Katex tex="0.030835" /> for the lower end and add it for the upper end.</>,
  },
  {
    working: <Katex display tex="(51.917,\ 58.083) \approx \boxed{(51.9,\ 58.1)}" />,
    reason: <>Matches option <b>D</b>. Multiply both ends by 100, because the question asks for a <em>percentage</em>, and round to one decimal place like the options. Using <Katex tex="z=1.645" /> (the 90% value) gives option C, and <Katex tex="z=2.576" /> (the 99% value) gives option B. Option A is the interval you get if 55% is entered as <Katex tex="0.055" />, and option E is the interval for a sample of only 100 adults, not 1000.</>,
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
