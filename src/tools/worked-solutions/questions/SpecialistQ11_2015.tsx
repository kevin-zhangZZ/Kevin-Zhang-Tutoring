// 2015 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 66% correct.
// Reading displacement as signed area under a velocity-time graph. Question text transcribed
// from the original paper; the figure is a crop of VCAA's own artwork. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import vtSrc from './spec-2015-mcq11-vt.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 5, C: 18, D: 66, E: 8 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x(T)-x(0) = \int_0^T v\,dt" />,
    reason: <>Displacement is the <em>signed</em> area under the velocity–time graph. Returning to the initial position means this integral is back to zero.</>,
  },
  {
    working: <Katex display tex="0 \le t \le 2:\quad v \ge 0" />,
    reason: <>The first hump is entirely above the axis, peaking at <Katex tex="v=0.5" /> when <Katex tex="t=1" />. The body moves forward the whole time, so it cannot have returned yet.</>,
  },
  {
    working: <Katex display tex="A_1 = \int_0^2 v\,dt \approx \tfrac23\times2\times0.5 \approx 0.67" />,
    reason: <>Estimate the hump's area: a smooth arch of width 2 and height <Katex tex="0.5" /> fills about two-thirds of its bounding rectangle (exact for a parabola; counting grid squares agrees).</>,
    more: <>Two-thirds is exact for a parabolic arch; a sine-shaped arch gives <Katex tex="\tfrac{2}{\pi}\times2\times0.5\approx0.64" />. Counting grid squares (each <Katex tex="0.5\times0.25=0.125" /> square units) gives about five squares, so about 0.6. An estimate is all a multiple-choice interval needs.</>,
  },
  {
    working: <Katex display tex="2 < t \lesssim 3.9:\quad v < 0" />,
    reason: <>Now the body reverses, so the accumulated area starts being paid back. The trough is twice as deep as the first hump was tall, reaching <Katex tex="v=-1" /> at <Katex tex="t=3" />.</>,
  },
  {
    working: <Katex display tex="\left|\int_2^3 v\,dt\right| \approx \tfrac23\times1\times1 \approx 0.67" />,
    reason: <>The first half of the trough alone gives back about as much as the whole forward hump — because it is twice as deep over half the width.</>,
  },
  {
    working: <Katex display tex="\boxed{(2.5,\ 3.5)}" />,
    reason: <>Matches option <b>D</b>: the negative area catches up with the positive area near <Katex tex="t=3" />.</>,
    more: (
      <>
        Options A and B (before <Katex tex="t=2" />) are out because the body is still moving forward. Check the ends of the interval. From <Katex tex="t=2" /> to <Katex tex="2.5" /> the curve only falls
        to about <Katex tex="-0.6" />, giving back roughly 0.15 — far short of 0.67, so the body has not
        returned by <Katex tex="t=2.5" />. By <Katex tex="t=3.5" /> about 1 has been given back in total (0.67 to <Katex tex="t=3" />, then about 0.4 more), so
        the return has already happened: option E (8%) is too late. Option C (18%) is the
        change-of-direction trap described at the top: <Katex tex="t=2" /> is a turning point, not a return.
      </>
    ),
  },
]

export default function SpecialistQ11_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The velocity–time graph for a body moving along a straight line is shown below.
          </p>
          <p>The body first returns to its initial position within the time interval</p>
        </>
      }
      diagram={
        <img loading="lazy" decoding="async"
          src={vtSrc}
          alt="A velocity-time graph: v rises to 0.5 at t = 1 and returns to zero at t = 2, dips to a minimum of -1 at t = 3 and back to zero at t just under 4, then rises again towards 0.8 by t = 6 — from the original 2015 VCAA exam paper"
          className="w-full max-w-[420px]"
        />
      }
      background={
        <p>
          The trap is reading "returns to its initial position" as "changes direction". The
          body changes direction at <Katex tex="t=2" />, but at that moment it is as far
          forward as it ever gets. Coming <em>back</em> takes until the area below the axis
          matches the area above it.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(0,\,0.5)" /> },
        { letter: 'B', content: <Katex tex="(0.5,\,1.5)" /> },
        { letter: 'C', content: <Katex tex="(1.5,\,2.5)" /> },
        { letter: 'D', content: <Katex tex="(2.5,\,3.5)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="(3.5,\,5)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
