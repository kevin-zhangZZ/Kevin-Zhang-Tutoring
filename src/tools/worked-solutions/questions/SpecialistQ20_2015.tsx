// 2015 Specialist Mathematics — Exam 2, MCQ 20. VCAA examination report: 60% correct.
// Constant acceleration, with a reversal of direction. Question text transcribed from the
// original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 60, C: 11, D: 12, E: 13 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="-11 = 5+a\times16,\ a=-1" />;{' '}
      <Katex tex="5\times16-0.5\times1\times16^2=-48" />, dist <Katex tex="=48" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = 5, \qquad v = -11, \qquad t = 16" />,
    reason: <>"In the opposite direction" is the whole question: the final velocity takes the opposite sign to the initial one.</>,
  },
  {
    working: <Katex display tex="v = u+at \implies -11 = 5+16a" />,
    reason: <>Constant acceleration, so the standard formulas apply.</>,
  },
  {
    working: <Katex display tex="16a = -16 \implies a = -1\ \text{ms}^{-2}" />,
    reason: <>Taking <Katex tex="v=+11" /> here instead gives <Katex tex="a=0.375" /> and a displacement of 128 — option E.</>,
  },
  {
    working: <Katex display tex="s = ut+\tfrac12at^2 = 5(16)+\tfrac12(-1)(16)^2" />,
    reason: <>Displacement from the starting point.</>,
  },
  {
    working: <Katex display tex="s = 80-128 = -48" />,
    reason: <>Negative, meaning the object finishes on the far side of where it started.</>,
  },
  {
    working: <Katex display tex="\boxed{48\ \text{metres}}" />,
    reason: <>Option B. Distance <em>from the starting point</em> is the magnitude of the displacement. It is not the distance travelled: the object went forward <Katex tex="12.5" /> m before turning at <Katex tex="t=5" />, so the path length is <Katex tex="12.5+60.5=73" /> m — option C, the trap.</>,
  },
]

export default function SpecialistQ20_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            An object is moving in a straight line, initially at 5 ms<sup>−1</sup>. Sixteen
            seconds later, it is moving at 11 ms<sup>−1</sup> in the opposite direction to its
            initial velocity.
          </p>
          <p>
            Assuming that the acceleration of the object is constant, after 16 seconds the
            distance, in metres, of the object from its starting point is
          </p>
        </>
      }
      background={
        <p>
          This is straight-line motion under constant acceleration — no forces anywhere in it,
          so it is ordinary current-syllabus kinematics. The two decisions that separate the
          options are the sign of the final velocity and the difference between{' '}
          <em>displacement</em> and <em>distance travelled</em>.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="24" /> },
        { letter: 'B', content: <Katex tex="48" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="73" /> },
        { letter: 'D', content: <Katex tex="96" /> },
        { letter: 'E', content: <Katex tex="128" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
