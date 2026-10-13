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
    reason: <>Compare with <Katex tex="\tfrac{(x-h)^2}{a^2}-\tfrac{(y-k)^2}{b^2}=1" />: centre <Katex tex="(3,0)" />, <Katex tex="a=3" />, <Katex tex="b=2" />.</>,
  },
  {
    working: <Katex display tex="y = \pm\frac{b}{a}(x-h) = \pm\tfrac23(x-3)" />,
    reason: <>The asymptotes are the lines through the centre with gradients <Katex tex="\pm\tfrac ba=\pm\tfrac23" /> (rise <Katex tex="b" /> over run <Katex tex="a" />).</>,
    more: (
      <>
        If you can&apos;t recall the formula, replace the 1 by 0: far from the centre the 1 is negligible, so{' '}
        <Katex tex="\tfrac{y^2}{4}=\tfrac{(x-3)^2}{9}" />, giving <Katex tex="y=\pm\tfrac23(x-3)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="y = 0 \implies x = 3 \text{ for both}" />,
    reason: <>Both asymptotes cross the <Katex tex="x" />-axis at the centre, giving the single point <Katex tex="(3,0)" />.</>,
  },
  {
    working: <Katex display tex="x = 0 \implies y = \pm\tfrac23(0-3) = \mp2" />,
    reason: <>Substitute <Katex tex="x=0" /> into each asymptote: the points <Katex tex="(0,-2)" /> and <Katex tex="(0,2)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(0,2),\ (0,-2),\ (3,0)}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: (
      <>
        Option C, the most common wrong answer, has the right <Katex tex="y" />-intercepts but puts the centre at{' '}
        <Katex tex="x=-3" />: <Katex tex="(x-3)^2" /> means a centre at <Katex tex="x=+3" />. Options A and D use the
        gradient <Katex tex="\pm\tfrac32" /> (<Katex tex="a" /> over <Katex tex="b" />), giving <Katex tex="y" />-intercepts{' '}
        <Katex tex="\mp4.5" />, and A also has the centre&apos;s
        sign wrong. Option E swaps the coordinates of B&apos;s intercepts and makes the sign error too.
      </>
    ),
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
