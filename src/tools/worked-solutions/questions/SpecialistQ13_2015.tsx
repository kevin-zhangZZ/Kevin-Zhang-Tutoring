// 2015 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 47% correct.
// Tracing a solution curve through a direction field. Question text transcribed from the
// original paper; the figure is a crop of VCAA's own artwork. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import fieldSrc from './spec-2015-mcq13-field.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 15, C: 26, D: 47, E: 6 },
  answer: 'D',
  noAnswer: 1,
  comment: <>The solution doesn't cross any gradient segments.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{start at } (-2.5,\ 1.5)" />,
    reason: <>A solution curve is <em>tangent</em> to the segment at every point it passes through, so it never cuts across one. Trace it left to right from here.</>,
    more: <>This is the examiner's one-line comment: the solution doesn't cross any gradient segments. You never need the differential equation itself — reading the segments one grid square at a time, and keeping a rough note of the curve's height, is enough to separate the five options.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}-2.5 \le x \le -1:\quad \frac{dy}{dx} < 0 \\ y \text{ falls to about } 0.9\end{gathered}" />,
    reason: <>Near the start the segments slope down, flattening as <Katex tex="x" /> approaches <Katex tex="-1" />, so the curve loses roughly half a unit of height.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}-1 \le x \le 1.5:\quad \frac{dy}{dx} \text{ small} \\ y \text{ stays near } 1\end{gathered}" />,
    reason: <>Around <Katex tex="y\approx1" /> the segments are almost flat, so the curve stays near <Katex tex="y=1" />. It never gets close to <Katex tex="y=2" />, ruling out A, B and E.</>,
    more: <>Look closely and the segments around <Katex tex="(0,\,1)" /> tilt slightly <em>upward</em>, so the curve gains a little height here (to about <Katex tex="1.1" />–<Katex tex="1.2" /> by <Katex tex="x=1" />) — it is not falling the whole way. But it rises gently. To reach <Katex tex="(-0.5,\,2)" /> (option E) from a height of about <Katex tex="0.9" /> at <Katex tex="x=-1" />, it would have to climb about <Katex tex="1" /> unit over half a unit across — a gradient near <Katex tex="2" />, much steeper than any segment there. Options A <Katex tex="(0,\,2)" /> and B <Katex tex="(1,\,2)" /> fail the same way.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}1.5 \le x \le 3:\quad \frac{dy}{dx} < 0 \\ \text{and steepening}\end{gathered}" />,
    reason: <>Past <Katex tex="x\approx1.5" /> the segments tilt down, more steeply the further right you go, so the curve now drops quickly.</>,
    more: <>Near <Katex tex="(2.5,\,1)" /> the segments have gradient about <Katex tex="-1" />, and near <Katex tex="x=3" /> they are steeper still. Starting from a height of about <Katex tex="1" /> at <Katex tex="x=2" />, the curve falls by more than a unit over the last unit of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\text{at } x = 3: \\ y \text{ well below } 1\end{gathered}" />,
    reason: <>To reach <Katex tex="(3,\,1)" /> the curve would have to stay almost level from <Katex tex="x=1.5" /> to <Katex tex="x=3" />, but every segment there slopes down, and steeply beyond <Katex tex="x\approx2" />. So C is out.</>,
    more: <>Option C, the most popular wrong answer, is tempting if you picture the curve as roughly symmetric about the <Katex tex="y" />-axis, ending near the height it started. A mirror-image curve would need mirror-image segments — rising on the right where they fall on the left — but on this field the segments slope <em>down</em> on both the left and the right, so the curve keeps falling as it leaves the middle band.</>,
  },
  {
    working: <Katex display tex="\boxed{(3,\ -0.5)}" />,
    reason: <>Matches option <b>D</b> — the only point the traced curve can reach.</>,
    more: <>D <Katex tex="(3,\,-0.5)" /> is the only option consistent with every segment the curve passes. A trace by eye cannot pin down the exact height at <Katex tex="x=3" />, and it does not need to: the question asks which point the curve <em>could</em> pass through, and only D fits: A, B and E sit about a unit above the curve, and C needs it to stay level where it is clearly falling.</>,
  },
]

export default function SpecialistQ13_2015() {
  return (
    <MCQShell
      question={
        <>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-3">
            <img loading="lazy" decoding="async"
              src={fieldSrc}
              alt="A direction field on axes from x = -3.5 to 3.5 and y = -2.5 to 2.5: the line segments are steeply negative near the left and right edges, almost horizontal in a band through the middle, and tilt upward near the top and bottom of the y-axis — from the original 2015 VCAA exam paper"
              className="w-full max-w-[460px]"
            />
          </div>
          <p className="mb-2">The direction field for a certain differential equation is shown above.</p>
          <p>
            The solution curve to the differential equation that passes through the point{' '}
            <Katex tex="(-2.5,\,1.5)" /> could also pass through
          </p>
        </>
      }
      background={
        <p>
          You do not need the differential equation. A solution curve follows the segments,
          so the sign and steepness of <Katex tex="\tfrac{dy}{dx}" /> at each point tell you
          whether the curve is rising or falling there, and how fast. Tracing from the given
          point and noting the curve's rough height as you go is enough: the options sit well
          apart, so the trace does not need to be precise.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(0,\,2)" /> },
        { letter: 'B', content: <Katex tex="(1,\,2)" /> },
        { letter: 'C', content: <Katex tex="(3,\,1)" /> },
        { letter: 'D', content: <Katex tex="(3,\,-0.5)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="(-0.5,\,2)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
