// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 8. VCAA examination report: 53% correct.
// A zero average value turns into a balance of two areas. Question text transcribed from
// the original paper; the figure is a crop of VCAA's own artwork. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2015-mcq8-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 6, C: 17, D: 53, E: 8 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average value} = \frac{1}{p-(-2)}\int_{-2}^{p} f(x)\,dx = 0" />,
    reason: <>Average value is the integral divided by the interval's width. The width <Katex tex="p+2" /> is positive, so the average is zero exactly when the integral is.</>,
  },
  {
    working: <Katex display tex="\int_{-2}^{0} f(x)\,dx + \int_{0}^{p} f(x)\,dx = 0" />,
    reason: <>Split the integral at <Katex tex="x=0" />, where the graph changes from curve to line, so each piece can be found separately.</>,
  },
  {
    working: <Katex display tex="\int_{-2}^{0} f(x)\,dx = -\frac{25}{8}" />,
    reason: <>The shaded region lies below the <Katex tex="x" />-axis, so its <em>signed</em> area is the negative of the given <Katex tex="\tfrac{25}{8}" />. Missing that sign is the trap.</>,
  },
  {
    working: <Katex display tex="\int_{0}^{p} f(x)\,dx = \frac12\times p\times p = \frac{p^2}{2}" />,
    reason: <>On <Katex tex="[0,p]" /> the graph is a straight line from the origin to <Katex tex="(p,p)" />, so the region is a triangle with base <Katex tex="p" /> and height <Katex tex="p" />. No integration needed.</>,
  },
  {
    working: <Katex display tex="\frac{p^2}{2}-\frac{25}{8} = 0 \implies p^2 = \frac{25}{4}" />,
    reason: <>The two pieces add to the whole integral, which is zero.</>,
    more: <>Check: with <Katex tex="p=\tfrac52" /> the triangle has area <Katex tex="\tfrac12\times\tfrac52\times\tfrac52=\tfrac{25}{8}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p = \frac52}" />,
    reason: <>Matches option <b>D</b>, taking the positive root since <Katex tex="p" /> lies to the right of <Katex tex="0" /> on the figure.</>,
    more: <>Option E, <Katex tex="\tfrac{25}{4}" />, is <Katex tex="p^2" /> left un-rooted. Writing <Katex tex="+\tfrac{25}{8}" /> for the shaded part instead of <Katex tex="-\tfrac{25}{8}" /> gives <Katex tex="\tfrac{p^2}{2}+\tfrac{25}{8}=0" />, which has no real solution at all. The report doesn't say how options C and A arose. A, <Katex tex="2" />, may be a guess mirroring the <Katex tex="-2" /> on the left. C, <Katex tex="\tfrac54" />, is half the answer, and a triangle with <Katex tex="p=\tfrac54" /> has area only <Katex tex="\tfrac12\times\tfrac54\times\tfrac54=\tfrac{25}{32}" />, not <Katex tex="\tfrac{25}{8}" />.</>,
  },
]

export default function MethodsQ8_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The graph of a function <Katex tex="f:[-2,p]\to R" /> is shown below. The average
            value of <Katex tex="f" /> over the interval <Katex tex="[-2,p]" /> is zero. The
            area of the shaded region is <Katex tex="\tfrac{25}{8}" />.
          </p>
          <p>
            If the graph is a straight line, for <Katex tex="0\le x\le p" />, then the value
            of <Katex tex="p" /> is
          </p>
        </>
      }
      diagram={
        <img loading="lazy" decoding="async"
          src={diagramSrc}
          alt="A curve from (−2, 0) dipping below the x-axis and returning to the origin, with that region shaded, then a straight line from the origin up to the point (p, p) — from the original 2015 VCAA exam paper"
          className="w-full max-w-[320px]"
        />
      }
      background={
        <p>
          The average value of <Katex tex="f" /> over <Katex tex="[a,b]" /> is the height of the
          rectangle on <Katex tex="[a,b]" /> with the same signed area as the graph:{' '}
          <Katex tex="\tfrac{1}{b-a}\int_a^b f(x)\,dx" />. An average of zero therefore says
          the graph's area above the axis and its area below the axis are the same size, so they
          cancel in the integral.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="5" /> },
        { letter: 'C', content: <Katex tex="\dfrac54" /> },
        { letter: 'D', content: <Katex tex="\dfrac52" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{25}{4}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
