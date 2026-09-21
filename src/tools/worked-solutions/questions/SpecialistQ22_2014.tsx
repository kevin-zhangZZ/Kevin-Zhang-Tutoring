// 2014 Specialist Mathematics — Exam 2, MCQ 22. VCAA examination report: 49% correct.
// Total distance from a velocity-time graph, part read off the grid and part integrated. Question text transcribed from the original paper; the figure is a crop of VCAA's own artwork; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import vtSrc from './spec-2014e2-mcq22-vt.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 6, C: 25, D: 12, E: 49 },
  answer: 'E',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{distance} = \int_0^9 |v|\,dt" />,
    reason: <>Distance travelled, not displacement — so the part below the axis counts positively.</>,
  },
  {
    working: <Katex display tex="0\le t\le2:\quad \text{a straight line from } (0,0) \text{ to } (2,9)" />,
    reason: <>Read off the grid. A triangle, so no calculus needed.</>,
  },
  {
    working: <Katex display tex="A_1 = \tfrac12\times2\times9 = 9" />,
    reason: <>Half the base times the height.</>,
  },
  {
    working: <Katex display tex="2\le t\le4:\quad v = 9 \implies A_2 = 2\times9 = 18" />,
    reason: <>A rectangle: the graph is flat at <Katex tex="v=9" /> across these two seconds.</>,
  },
  {
    working: <Katex display tex="v(t) = -\tfrac9{16}(t-4)^2+9 = 0 \implies (t-4)^2 = 16 \implies t = 8" />,
    reason: <>The body reverses at <Katex tex="t=8" />, so the last interval has to be split there.</>,
  },
  {
    working: <Katex display tex="A_3 = \int_4^8\left(9-\tfrac9{16}(t-4)^2\right)dt = 36-12 = 24" />,
    reason: <>Substituting <Katex tex="s=t-4" />: <Katex tex="\int_0^4\left(9-\tfrac9{16}s^2\right)ds = 36-\tfrac9{16}\cdot\tfrac{64}{3}" />.</>,
  },
  {
    working: <Katex display tex="A_4 = \left|\int_8^9 v\,dt\right| = \tfrac{39}{16} = 2.4375" />,
    reason: <>The body runs backwards for the last second, adding to the distance rather than cancelling. Ignoring this gives <Katex tex="9+18+24=51" />, option D.</>,
  },
  {
    working: <Katex display tex="9+18+24+2.4375 = 53.4375" />,
    reason: <>Adding the four pieces.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 53.4\ \text{metres}}" />,
    reason: <>Option E. Subtracting the reverse leg instead of adding it gives <Katex tex="48.6" />, option C — the most popular wrong answer.</>,
  },
]

export default function SpecialistQ22_2014() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The velocity–time graph below shows the motion of a body travelling in a straight
            line, where <Katex tex="v" /> ms<sup>−1</sup> is its velocity after{' '}
            <Katex tex="t" /> seconds. The velocity of the body over the time interval{' '}
            <Katex tex="t\in[4,9]" /> is given by{' '}
            <Katex tex="v(t)=-\tfrac{9}{16}(t-4)^2+9" />.
          </p>
          <p>
            The distance, in metres, travelled by the body over nine seconds is closest to
          </p>
        </>
      }
      diagram={
        <img
          src={vtSrc}
          alt="A velocity-time graph: a straight line from the origin up to (2, 9), a flat section at v = 9 until t = 4, then a downward parabola crossing the t-axis at t = 8 and reaching −5 at t = 9 — from the original 2014 VCAA exam paper"
          className="w-full max-w-[400px]"
        />
      }
      background={
        <p>
          The graph is given twice over: as a picture for <Katex tex="0\le t\le4" />, where
          the area is two simple shapes, and as a rule for <Katex tex="4\le t\le9" />, where
          it has to be integrated. The one thing to watch is the sign change at{' '}
          <Katex tex="t=8" />.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="45.6" /> },
        { letter: 'B', content: <Katex tex="47.5" /> },
        { letter: 'C', content: <Katex tex="48.6" /> },
        { letter: 'D', content: <Katex tex="51.0" /> },
        { letter: 'E', content: <Katex tex="53.4" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
