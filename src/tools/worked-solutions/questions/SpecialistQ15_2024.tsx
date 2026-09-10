// 2024 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 36% correct. This
// year's paper used four options (A–D) rather than five. Describing the motion of a body
// along a parabolic path traced out parametrically. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 36, B: 12, C: 44, D: 8 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\vec r(t) = \sin(t)\vec i + \cos(2t)\vec j,\quad x=\sin(t),\ y=\cos(2t)" />,
    reason: 'Position vector — read off the Cartesian coordinates.',
  },
  {
    working: <Katex display tex="y = \cos(2t) = 1-2\sin^2(t) = 1-2x^2" />,
    reason: 'Double-angle identity eliminates the parameter — a parabola opening downward.',
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span><Katex tex="t=0:\ (0,1)" /></span>
        <span><Katex tex="t=\tfrac{\pi}{2}:\ (1,-1)" /> — x has reached its maximum, so it must now decrease: <b>direction reverses</b>.</span>
        <span><Katex tex="t=\pi:\ (0,1)" /> — back where it started, having retraced the same arc.</span>
        <span><Katex tex="t=\tfrac{3\pi}{2}:\ (-1,-1)" /> — x reaches its minimum: <b>direction reverses again</b>.</span>
        <span><Katex tex="t=2\pi:\ (0,1)" /> — back to the start.</span>
      </div>
    ),
    reason: <>Track <Katex tex="(x,y)" /> at each quarter-turn of <Katex tex="t" />, since <Katex tex="x=\sin(t)" /> oscillates between <Katex tex="\pm1" /> while <Katex tex="y" /> is pinned to <Katex tex="1-2x^2" />.</>,
  },
  {
    working: <Katex display tex="\vec r(t+\pi) = \big(-\sin(t),\ \cos(2t)\big) \neq \vec r(t) \text{ in general}" />,
    reason: <>Check whether the motion could repeat every <Katex tex="\pi" /> instead of <Katex tex="2\pi" /> — it doesn't, since <Katex tex="x" /> flips sign. The full cycle takes <Katex tex="2\pi" /> seconds.</>,
  },
  {
    working: <Katex display tex="\boxed{y=1-2x^2,\ \text{start } (0,1),\ \text{reverse at } (1,-1)\text{, then } (-1,-1)\text{, return after } 2\pi\text{ s}}" />,
    reason: <>Matches option <b>A</b> exactly.</>,
  },
]

export default function SpecialistQ15_2024() {
  return (
    <MCQShell
      question={
        <p>
          The position of a moving body is given by <Katex tex="\vec r(t) = \sin(t)\vec i + \cos(2t)\vec j" />, where{' '}
          <Katex tex="t" /> is measured in seconds, for <Katex tex="t\geq0" />.
          <br />
          The motion of the body can be described as moving along a parabolic path given by
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="y=1-2x^2" />, starting at (0, 1), reversing direction at (1, −1) and then again at (−1, −1), then returning to (0, 1) after 2π seconds.</>, isAnswer: true },
        { letter: 'B', content: <><Katex tex="y=1-x^2" />, starting at (1, 0), reversing direction at (−1, 0), then returning to (1, 0) after 2π seconds.</> },
        { letter: 'C', content: <><Katex tex="y=1-2x^2" />, starting at (0, 1), reversing direction at (1, −1) and then again at (−1, −1), then returning to (0, 1) after π seconds.</> },
        { letter: 'D', content: <><Katex tex="y=1-x^2" />, starting at (1, 0), reversing direction at (−1, 0), then returning to (1, 0) after π seconds.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
