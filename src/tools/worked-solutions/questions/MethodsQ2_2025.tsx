// 2025 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 51% correct.
// Asymptotes of a tangent graph, written as a general solution. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 51, B: 10, C: 21, D: 18 },
  answer: 'A',
  comment: (
    <>
      <Katex tex="y=2\tan\left(\pi\left(x+\dfrac{1}{2}\right)\right)" />
      <br />
      <Katex tex="\pi\left(x+\dfrac{1}{2}\right)=\dfrac{\pi}{2},\ x=0" />
      <br />
      The period is 1.
      <br />
      The general solution for the equations of the asymptotes is <Katex tex="x=k,\ k\in Z" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\tan(\theta) \text{ is undefined when } \theta = \frac{\pi}{2}+k\pi, \ k\in Z" />,
    reason: <>The graph of <Katex tex="y=\tan(\theta)" /> has a vertical asymptote at every odd multiple of <Katex tex="\tfrac{\pi}{2}" />, where <Katex tex="\cos(\theta)=0" />.</>,
    more: <>The 2 in front only stretches the graph vertically; it does not move any asymptote. So all the work is in the bracket inside the tangent.</>,
  },
  {
    working: <Katex display tex="\pi\left(x+\tfrac12\right) = \frac{\pi}{2}+k\pi" />,
    reason: <>Set the whole argument of the tangent equal to that general form.</>,
  },
  {
    working: <Katex display tex="x+\tfrac12 = \tfrac12+k \implies x = k" />,
    reason: <>Divide both sides by <Katex tex="\pi" />, then subtract <Katex tex="\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\text{check the period: } \frac{\pi}{\pi} = 1" />,
    reason: <>The period of <Katex tex="\tan(nx)" /> is <Katex tex="\tfrac{\pi}{n}" />, so asymptotes are 1 unit apart — consecutive integers, as <Katex tex="x=k" /> says.</>,
    more: <>This is also the report's route: find one asymptote (at <Katex tex="x=0" /> the argument is <Katex tex="\pi\cdot\tfrac12=\tfrac{\pi}{2}" />), then step along by the period. Don't use the sine/cosine formula <Katex tex="\tfrac{2\pi}{n}" /> here — it gives 2, which would wrongly space the asymptotes 2 apart.</>,
  },
  {
    working: <Katex display tex="\boxed{x = k, \quad k\in Z}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>The question asks for <em>all</em> asymptotes. Options <b>B</b> (even integers) and <b>C</b> (odd integers, the most common wrong answer) are each only half of them — the spacing of 2 that a period of 2 would give. Option <b>D</b>, <Katex tex="x=\frac{4k+1}{2}=2k+\tfrac12" />, is not an asymptote at all: there the argument is <Katex tex="\pi(2k+1)" />, where <Katex tex="\tan" /> is 0, so those are <Katex tex="x" />-intercepts.</>,
  },
]

export default function MethodsQ2_2025() {
  return (
    <MCQShell
      question={
        <p>
          All asymptotes of the graph of{' '}
          <Katex tex="y=2\tan\!\left(\pi\left(x+\tfrac12\right)\right)" /> are given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x=k,\ k\in Z" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="x=2k,\ k\in Z" /> },
        { letter: 'C', content: <Katex tex="x=2k+1,\ k\in Z" /> },
        { letter: 'D', content: <Katex tex="x=\frac{4k+1}{2},\ k\in Z" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
