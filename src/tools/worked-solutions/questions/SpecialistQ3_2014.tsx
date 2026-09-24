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
    reason: <>Factorise top and bottom before saying anything about asymptotes.</>,
  },
  {
    working: <Katex display tex="= \frac{(x-1)(x-3)}{(x-3)(x+2)}" />,
    reason: <><Katex tex="x^2-4x+3=(x-1)(x-3)" /> and <Katex tex="x^2-x-6=(x-3)(x+2)" />.</>,
  },
  {
    working: <Katex display tex="= \frac{x-1}{x+2}, \qquad x\ne3" />,
    reason: <>The common factor cancels, but <Katex tex="x=3" /> is still excluded from the domain — the function is undefined there even though the simplified form is not.</>,
  },
  {
    working: <Katex display tex="x = 3:\ \text{point of discontinuity (a hole)}" />,
    reason: <>A cancelled factor leaves a single missing point, not a vertical asymptote.</>,
  },
  {
    working: <Katex display tex="x = -2:\ \text{vertical asymptote}" />,
    reason: <>The factor that survives in the denominator is the one that blows up.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{asymptote } x=-2, \text{ point of discontinuity at } x=3}" />,
    reason: <>Matches option <b>D</b>. Option B (20%) treats both factors as asymptotes, missing the cancellation; option E swaps them. Options A and C put an asymptote at <Katex tex="x=1" />, which is where the graph crosses the <Katex tex="x" />-axis (the surviving factor is in the numerator), not an asymptote.</>,
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
          A factor common to numerator and denominator gives a <em>hole</em>; a factor left
          over in the denominator gives a vertical <em>asymptote</em>. Telling them apart is
          the whole question.
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
