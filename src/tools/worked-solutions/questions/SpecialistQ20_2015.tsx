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
    reason: <>Take the initial direction as positive. "In the opposite direction" then makes the final velocity negative.</>,
  },
  {
    working: <Katex display tex="v = u+at \implies -11 = 5+16a" />,
    reason: <>Constant acceleration, so the standard formulas apply.</>,
  },
  {
    working: <Katex display tex="16a = -16 \implies a = -1\ \text{ms}^{-2}" />,
    reason: <>The object slows by <Katex tex="1\ \text{ms}^{-1}" /> every second, stops, then speeds up the other way.</>,
    more: <>Ignoring the change of direction and taking <Katex tex="v=+11" /> gives <Katex tex="a=\tfrac{6}{16}=0.375" /> and a displacement of <Katex tex="80+\tfrac12(0.375)(16)^2=128" />, which is option E (13%).</>,
  },
  {
    working: <Katex display tex="s = ut+\tfrac12at^2 = 5(16)+\tfrac12(-1)(16)^2" />,
    reason: <>Displacement from the starting point.</>,
  },
  {
    working: <Katex display tex="s = 80-128 = -48" />,
    reason: <>Negative: the object ends 48 m from the start, on the opposite side to the way it first moved.</>,
  },
  {
    working: <Katex display tex="\boxed{48\ \text{metres}}" />,
    reason: <>Matches option <b>B</b>: distance <em>from the starting point</em> is the magnitude of the displacement.</>,
    more: (
      <>
        It is not the distance travelled. The velocity is <Katex tex="5-t" />, so the object stops at <Katex tex="t=5" />, having gone forward <Katex tex="5(5)-\tfrac12(5)^2=12.5" /> m. In the remaining 11 s it speeds up from rest to <Katex tex="11\ \text{ms}^{-1}" /> the other way, covering <Katex tex="\tfrac12(1)(11)^2=60.5" /> m. The path length is <Katex tex="12.5+60.5=73" /> m, option C (11%): the right answer to a different question. The net result, <Katex tex="12.5-60.5=-48" />, agrees with the displacement above.
      </>
    ),
  },
]

export default function SpecialistQ20_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            An object is moving in a straight line, initially at 5 ms<sup>−1</sup>. Sixteen
            seconds later, it is moving at 11 ms<sup>−1</sup> in the <b>opposite</b> direction to
            its initial velocity.
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
