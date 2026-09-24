// 2014 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 85% correct.
// Where the asymptotes of a hyperbola cut the axes. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 85, C: 6, D: 5, E: 2 },
  answer: 'B',
  noAnswer: 0,
  comment: <>Asymptotes are <Katex tex="y=\pm\tfrac23(x-3)" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{(x-3)^2}{9}-\frac{y^2}{4} = 1" />,
    reason: <>Centre <Katex tex="(3,0)" />, with <Katex tex="a^2=9" /> and <Katex tex="b^2=4" />.</>,
  },
  {
    working: <Katex display tex="y = \pm\frac{b}{a}(x-h) = \pm\tfrac23(x-3)" />,
    reason: <>The asymptotes pass through the centre with gradients <Katex tex="\pm\tfrac ba=\pm\tfrac23" />. Inverting this to <Katex tex="\pm\tfrac32" /> gives <Katex tex="y" />-intercepts <Katex tex="\mp4.5" /> — options A and D.</>,
  },
  {
    working: <Katex display tex="y = 0 \implies x = 3 \text{ for both}" />,
    reason: <>Both asymptotes cross the <Katex tex="x" />-axis at the centre, giving the single point <Katex tex="(3,0)" />.</>,
  },
  {
    working: <Katex display tex="x = 0 \implies y = \mp2" />,
    reason: <><Katex tex="\pm\tfrac23(0-3)=\mp2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(0,2),\ (0,-2),\ (3,0)}" />,
    reason: <>Matches option <b>B</b>. Option C has the <Katex tex="x" />-intercept at <Katex tex="-3" />, which would be the centre of a hyperbola in <Katex tex="(x+3)^2" />.</>,
  },
]

export default function SpecialistQ1_2014() {
  return (
    <MCQShell
      question={
        <p>
          The asymptotes of the hyperbola given by{' '}
          <Katex tex="\dfrac{(x-3)^2}{9}-\dfrac{y^2}{4}=1" /> intersect the coordinate axes at
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(0,-4.5),\ (0,4.5),\ (-3,0)" /> },
        { letter: 'B', content: <Katex tex="(0,2),\ (0,-2),\ (3,0)" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="(0,2),\ (0,-2),\ (-3,0)" /> },
        { letter: 'D', content: <Katex tex="(0,-4.5),\ (0,4.5),\ (3,0)" /> },
        { letter: 'E', content: <Katex tex="(2,0),\ (-2,0),\ (0,-3)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
