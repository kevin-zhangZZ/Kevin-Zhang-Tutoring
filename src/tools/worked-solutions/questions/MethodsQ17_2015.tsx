// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 17. VCAA examination report: 60% correct.
// f(x) = x^3 - 3x^2 + c has three distinct x-intercepts — find the set of possible c.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 11, C: 13, D: 60, E: 7 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} f'(x) &= 3x^2-6x \\ &= 3x(x-2) \end{aligned}" />,
    reason: <>Stationary points at <Katex tex="x=0" /> (local max) and <Katex tex="x=2" /> (local min) — a cubic with positive <Katex tex="x^3" /> coefficient rises, turns down, then turns up.</>,
  },
  {
    working: <Katex display tex="f(0)=c, \qquad f(2)=8-12+c=c-4" />,
    reason: <>The heights of the two turning points.</>,
  },
  {
    working: <Katex display tex="c>0 \quad \text{and} \quad c-4<0" />,
    reason: <>Three distinct roots need the local max above the <Katex tex="x" />-axis and the local min below it.</>,
    more: (
      <>
        The cubic comes up from <Katex tex="-\infty" />, turns down at the local max, turns up at the local min, then
        rises to <Katex tex="+\infty" />. It crosses the axis once on each of those three pieces only if the max is above
        the axis and the min is below it. If both turning points are on the same side, there is only one crossing.
        Changing <Katex tex="c" /> just slides the whole graph up or down, so these two conditions are all that matter.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{c \in (0,4)}" />,
    reason: <>Matches option <b>D</b> — open, because the endpoints give a repeated root.</>,
    more: (
      <>
        At <Katex tex="c=0" /> or <Katex tex="c=4" /> a turning point sits exactly on the axis, so the graph touches
        there and has a repeated root — only two distinct <Katex tex="x" />-intercepts. Those two boundary values are
        option C, the most common wrong answer: they are where the number of intercepts changes, not where there are
        three. Option E keeps only the local min below the axis (<Katex tex="c<4" />) and forgets the max must stay
        above it; option B keeps only the max above it (<Katex tex="c>0" />). Option A assumes every cubic has three{' '}
        <Katex tex="x" />-intercepts; for <Katex tex="c" /> outside <Katex tex="[0,4]" /> it has only one.
      </>
    ),
  },
]

export default function MethodsQ17_2015() {
  return (
    <MCQShell
      question={
        <>
          <p>
            A graph with rule <Katex tex="f(x) = x^3 - 3x^2 + c" />, where <Katex tex="c" /> is a real number,
            has three distinct <Katex tex="x" />-intercepts.
          </p>
          <p className="mt-2">The set of all possible values of <Katex tex="c" /> is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="R" /> },
        { letter: 'B', content: <Katex tex="R^+" /> },
        { letter: 'C', content: <Katex tex="\{0,4\}" /> },
        { letter: 'D', content: <Katex tex="(0,4)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="(-\infty,4)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
