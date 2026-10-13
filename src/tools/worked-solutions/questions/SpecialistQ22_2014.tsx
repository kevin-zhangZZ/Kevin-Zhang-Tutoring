// 2014 Specialist Mathematics — Exam 2, MCQ 22. VCAA examination report: 49% correct.
// Total distance from a velocity-time graph, part read off the grid and part integrated. Question text transcribed from the original paper; the figure is a crop of VCAA's own artwork; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import vtSrc from './spec-2014-mcq22-vt.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 6, C: 25, D: 12, E: 49 },
  answer: 'E',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{distance} = \int_0^9 |v|\,dt" />,
    reason: <>Distance travelled, not displacement — so area below the <Katex tex="t" />-axis counts positively.</>,
  },
  {
    working: <Katex display tex="A_1 = \tfrac12\times2\times9 = 9" />,
    reason: <>For <Katex tex="0\le t\le2" /> the graph is a straight line from <Katex tex="(0,0)" /> to <Katex tex="(2,9)" />: a triangle, so half base times height.</>,
  },
  {
    working: <Katex display tex="A_2 = 2\times9 = 18" />,
    reason: <>For <Katex tex="2\le t\le4" /> the graph is flat at <Katex tex="v=9" />: a rectangle.</>,
  },
  {
    working: <Katex display tex="-\tfrac9{16}(t-4)^2+9 = 0" />,
    reason: <>Find where the velocity changes sign: the body reverses there, so the last interval must be split.</>,
  },
  {
    working: <Katex display tex="(t-4)^2 = 16 \implies t = 8" />,
    reason: <>Take <Katex tex="t-4=4" />; the root <Katex tex="t=0" /> is outside <Katex tex="[4,9]" />.</>,
  },
  {
    working: <Katex display tex="\int v\,dt = 9t-\tfrac{3}{16}(t-4)^3" />,
    reason: <>Antidifferentiate <Katex tex="(t-4)^2" /> as <Katex tex="\tfrac13(t-4)^3" /> (the inside is linear with coefficient 1), so <Katex tex="-\tfrac9{16}\times\tfrac13=-\tfrac3{16}" />; the 9 gives <Katex tex="9t" />.</>,
  },
  {
    working: <Katex display tex="A_3 = \int_4^8 v\,dt = (72-12)-(36-0) = 24" />,
    reason: <>On <Katex tex="[4,8]" /> the velocity is positive, so this integral is the area.</>,
  },
  {
    working: <Katex display tex="\int_8^9 v\,dt = \left(81-\tfrac{375}{16}\right)-60 = -\tfrac{39}{16}" />,
    reason: <>Negative, because the body is moving backwards for the last second.</>,
  },
  {
    working: <Katex display tex="A_4 = \tfrac{39}{16} = 2.4375" />,
    reason: <>Distance counts this leg positively: take the absolute value, and add it.</>,
    more: (
      <>
        Leaving this last second out altogether gives <Katex tex="9+18+24=51" />, option D (12%).
        On the calculator, both pieces can be done in one step:{' '}
        <Cas fn="nInt">nInt(abs(-9/16·(t-4)^2+9), t, 4, 9)</Cas> returns{' '}
        <Katex tex="26.4375" />, which is <Katex tex="24+2.4375" />.
      </>
    ),
  },
  {
    working: <Katex display tex="9+18+24+2.4375 = 53.4375" />,
    reason: <>Adding the four areas.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 53.4\ \text{metres}}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: (
      <>
        The most popular wrong answer, C (25%), is <Katex tex="9+18+24-2.4375\approx48.6" />: it
        integrates <Katex tex="v" /> straight across <Katex tex="[4,9]" />, so the backwards leg
        cancels instead of adding. That is the displacement, not the distance travelled.
      </>
    ),
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
        <img loading="lazy" decoding="async"
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
