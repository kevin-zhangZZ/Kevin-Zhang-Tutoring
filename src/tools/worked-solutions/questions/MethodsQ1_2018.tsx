// 2018 Mathematical Methods — Exam 2, MCQ 1. VCAA examination report: 95% correct. The period
// of a scaled cosine. Question text transcribed from the original paper; VCAA printed no
// diagram and neither does the stem here (guide §7). Answer checked with sympy; itute also gives
// C. Solution is original. Widget (meth-2018-mcq1-cycle): the angle 2πx/3 turning once round the
// unit circle as the graph is traced, with the first full turn finishing at x = 3.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const CycleWidget = lazyWidget(() => import('../interactives/meth-2018-mcq1-cycle'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 2, C: 95, D: 2, E: 0 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 4\cos\!\left(\frac{2\pi x}{3}\right)+1" />,
    reason: <>Only the coefficient of <Katex tex="x" /> inside the cosine affects the period. The <Katex tex="4" /> (amplitude) and <Katex tex="+1" /> (vertical shift) don't change how often it repeats.</>,
  },
  {
    working: <Katex display tex="\text{Period} = \frac{2\pi}{n} \ \text{ for } \ \cos(nx), \qquad n = \frac{2\pi}{3}" />,
    reason: <>Cosine repeats each time its angle <Katex tex="nx" /> goes up by <Katex tex="2\pi" />, which happens when <Katex tex="x" /> goes up by <Katex tex="\tfrac{2\pi}{n}" />.</>,
    more: <>The <Katex tex="2\pi" /> is one full turn round the unit circle: after it, cosine is back where it started.</>,
  },
  {
    working: <Katex display tex="\text{Period} = \frac{2\pi}{\ \frac{2\pi}{3}\ } = 2\pi \times \frac{3}{2\pi}" />,
    reason: <>Dividing by a fraction is multiplying by its reciprocal.</>,
    more: <>A quick check that skips the formula: one full cycle ends when the angle reaches <Katex tex="2\pi" />, and <Katex tex="\tfrac{2\pi x}{3} = 2\pi" /> gives <Katex tex="x = 3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Period} = 3}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>The <Katex tex="2\pi" />s cancel exactly, which is the point of writing the coefficient as <Katex tex="\tfrac{2\pi}{3}" /> in the first place: a period of <Katex tex="3" /> was designed in. The period would be <Katex tex="2\pi" /> only if the coefficient of <Katex tex="x" /> were <Katex tex="1" />.</>,
  },
]

export default function MethodsQ1_2018() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f:R\to R,\ f(x)=4\cos\!\left(\dfrac{2\pi x}{3}\right)+1" />.
          The period of this function is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="2" /> },
        { letter: 'C', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="4" /> },
        { letter: 'E', content: <Katex tex="5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <Explore title="The period is how far x moves while the angle 2πx/3 goes once round">
          <CycleWidget />
        </Explore>
      }
    />
  )
}
