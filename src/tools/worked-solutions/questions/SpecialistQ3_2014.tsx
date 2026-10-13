// 2014 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 66% correct.
// An asymptote versus a point of discontinuity in a rational function. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 20, C: 3, D: 66, E: 3 },
  answer: 'D',
  noAnswer: 0,
  comment: <><Katex tex="f(x)=1-\dfrac{3(x-3)}{(x-3)(x+2)}" /></>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{x^2-4x+3}{x^2-x-6}" />,
    reason: <>Factorise top and bottom before saying anything about asymptotes: a shared factor gives a hole, while an unshared denominator factor gives a vertical asymptote.</>,
  },
  {
    working: <Katex display tex="= \frac{(x-1)(x-3)}{(x-3)(x+2)}" />,
    reason: <><Katex tex="x^2-4x+3=(x-1)(x-3)" /> and <Katex tex="x^2-x-6=(x-3)(x+2)" />.</>,
  },
  {
    working: <Katex display tex="= \frac{x-1}{x+2}, \qquad x\ne3" />,
    reason: <>The common factor cancels, but <Katex tex="x=3" /> is still excluded: the original denominator is 0 there, so <Katex tex="f(3)" /> is undefined.</>,
  },
  {
    working: <Katex display tex="x = 3:\ \text{point of discontinuity (a hole)}" />,
    reason: <>Near <Katex tex="x=3" />, <Katex tex="f(x)" /> approaches <Katex tex="\tfrac{3-1}{3+2}=\tfrac25" />, a finite value: the graph just has the point <Katex tex="\left(3,\tfrac25\right)" /> missing.</>,
  },
  {
    working: <Katex display tex="x = -2:\ \text{vertical asymptote}" />,
    reason: <>As <Katex tex="x\to-2" />, the numerator <Katex tex="x-1\to-3" /> while the denominator <Katex tex="x+2\to0" />, so <Katex tex="|f(x)|" /> grows without bound.</>,
    more: (
      <>
        The report&apos;s form <Katex tex="f(x)=1-\tfrac{3(x-3)}{(x-3)(x+2)}=1-\tfrac{3}{x+2}" /> (for <Katex tex="x\ne3" />)
        shows the same thing at a glance: a hyperbola with vertical asymptote <Katex tex="x=-2" />, horizontal
        asymptote <Katex tex="y=1" />, and the point at <Katex tex="x=3" /> removed.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{\begin{gathered}\text{asymptote at } x=-2, \\ \text{point of discontinuity at } x=3\end{gathered}}"
      />
    ),
    reason: <>Matches option <b>D</b>.</>,
    more: (
      <>
        Option B, the most common wrong answer, sets the original denominator to zero and calls both roots asymptotes,
        missing the cancellation. Option E swaps the two features. Options A and C put an asymptote at{' '}
        <Katex tex="x=1" />, but <Katex tex="x-1" /> is in the numerator: <Katex tex="f(1)=0" />, so that is where the
        graph crosses the <Katex tex="x" />-axis.
      </>
    ),
  },
]

export default function SpecialistQ3_2014() {
  return (
    <MCQShell
      question={
        <p>
          The features of the graph of the function with rule{' '}
          <Katex tex="f(x)=\dfrac{x^2-4x+3}{x^2-x-6}" /> include
        </p>
      }
      background={
        <p>
          A vertical asymptote at <Katex tex="x=c" /> needs the denominator to approach 0 while the numerator does
          not. If both are 0 at <Katex tex="x=c" />, they share the factor <Katex tex="(x-c)" />: cancel it, and the
          graph usually just has one missing point there — a <em>point of discontinuity</em>, or hole.
        </p>
      }
      options={[
        { letter: 'A', content: <>asymptotes at <Katex tex="x=1" /> and <Katex tex="x=-2" />.</> },
        { letter: 'B', content: <>asymptotes at <Katex tex="x=3" /> and <Katex tex="x=-2" />.</> },
        { letter: 'C', content: <>an asymptote at <Katex tex="x=1" /> and a point of discontinuity at <Katex tex="x=3" />.</> },
        { letter: 'D', content: <>an asymptote at <Katex tex="x=-2" /> and a point of discontinuity at <Katex tex="x=3" />.</>, isAnswer: true },
        { letter: 'E', content: <>an asymptote at <Katex tex="x=3" /> and a point of discontinuity at <Katex tex="x=-2" />.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
