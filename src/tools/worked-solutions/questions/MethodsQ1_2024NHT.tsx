// 2024 Mathematical Methods NHT — Exam 2, MCQ 1. The NHT report gives the answer key only, with
// no statistics. Functions: the period and range of a transformed sine function. Question text
// transcribed from the original paper. Solution is original; the answer C agrees with the
// report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{period}=\frac{2\pi}{2}=\pi" />,
    reason: <>For <Katex tex="y=A\sin(nx+c)+d" /> the period is <Katex tex="\tfrac{2\pi}{n}" />. Here the coefficient of <Katex tex="x" /> is <Katex tex="n=2" />; the <Katex tex="-\tfrac{\pi}{2}" /> inside only slides the graph sideways and doesn&apos;t change the period.</>,
  },
  {
    working: <Katex display tex="-\sqrt3\le\sqrt3\sin\!\left(2x-\tfrac{\pi}{2}\right)\le\sqrt3" />,
    reason: <>Sine always lies between <Katex tex="-1" /> and <Katex tex="1" />, and the amplitude <Katex tex="\sqrt3" /> stretches that to <Katex tex="[-\sqrt3,\sqrt3]" />.</>,
  },
  {
    working: <Katex display tex="-2\sqrt3\le f(x)\le 0" />,
    reason: <>The <Katex tex="-\sqrt3" /> at the end translates the whole graph down by <Katex tex="\sqrt3" />, so subtract <Katex tex="\sqrt3" /> from both ends.</>,
    more: <>Both ends are reached, since the domain is all of <Katex tex="R" />, so the range uses square brackets. Equivalently: the graph oscillates about its mean line <Katex tex="y=-\sqrt3" />, one amplitude above and one below.</>,
  },
  {
    working: <Katex display tex="\boxed{\pi\ \text{and}\ \left[-2\sqrt3,\,0\right]}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option A has the right period but forgets the downward translation. Options D and E have the right range but the wrong period: <Katex tex="2\pi" /> ignores the <Katex tex="2" /> in front of <Katex tex="x" />, and <Katex tex="4\pi" /> multiplies by it instead of dividing. Option B makes both slips.</>,
  },
]

export default function MethodsQ1_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          The period and range for the function <Katex tex="f(x)=\sqrt3\sin\!\left(2x-\dfrac{\pi}{2}\right)-\sqrt3" /> are respectively
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="\pi" /> and <Katex tex="\left[-\sqrt3,\sqrt3\right]" /></> },
        { letter: 'B', content: <><Katex tex="2\pi" /> and <Katex tex="\left[-\sqrt3,\sqrt3\right]" /></> },
        { letter: 'C', content: <><Katex tex="\pi" /> and <Katex tex="\left[-2\sqrt3,0\right]" /></>, isAnswer: true },
        { letter: 'D', content: <><Katex tex="2\pi" /> and <Katex tex="\left[-2\sqrt3,0\right]" /></> },
        { letter: 'E', content: <><Katex tex="4\pi" /> and <Katex tex="\left[-2\sqrt3,0\right]" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
