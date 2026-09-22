// 2020 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 61% correct.
// Recovering the shape of f from the graph of its derivative. Question text transcribed from the original paper; both figures are crops of VCAA's own artwork; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import fprimeSrc from './meth-2020-mcq6-fprime.png'
import optionsSrc from './meth-2020-mcq6-options.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 61, C: 6, D: 5, E: 8 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 0 \text{ at exactly two points}" />,
    reason: <>The printed curve crosses the <Katex tex="x" />-axis twice. The later dip is a local minimum of <Katex tex="f'" /> that stays <em>above</em> the axis — it is not a third zero.</>,
  },
  {
    working: <Katex display tex="f'>0,\ \text{then } f'<0,\ \text{then } f'>0" />,
    reason: <>Reading the sign left to right.</>,
  },
  {
    working: <Katex display tex="\text{so } f \text{ rises, falls, then rises}" />,
    reason: <>Two stationary points: a local maximum at the first zero, a local minimum at the second.</>,
  },
  {
    working: <Katex display tex="\text{the local max comes } \textbf{first}" />,
    reason: <>This eliminates options C and D, which start by falling, and option E, which has two maximums.</>,
  },
  {
    working: <Katex display tex="f' \text{ never returns to zero after the second crossing}" />,
    reason: <>So <Katex tex="f" /> keeps increasing to the right — with a flattening where <Katex tex="f'" /> dips, but no third turning point. Option A turns again, so it is out.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-2">
        <img
          src={optionsSrc}
          alt="The five option graphs A to E, each a curve on x and y axes — from the original 2020 VCAA exam paper"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>Option B: a small hump, then a minimum, then a steady rise that flattens briefly — exactly the shape the sign pattern demands.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{B}}" />,
    reason: <>Count the zeros of <Katex tex="f'" /> and the sign between them; the number of turning points of <Katex tex="f" /> follows, and usually only one option survives.</>,
  },
]

export default function MethodsQ6_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Part of the graph of <Katex tex="y=f'(x)" /> is shown below.</p>
          <p>
            The corresponding part of the graph of <Katex tex="y=f(x)" /> is best represented
            by
          </p>
        </>
      }
      diagram={
        <img
          src={fprimeSrc}
          alt="A curve descending from the upper left, crossing the x-axis, reaching a minimum below it, crossing back up, then a small local maximum and local minimum above the axis before rising steeply — from the original 2020 VCAA exam paper"
          className="w-full max-w-[320px]"
        />
      }
      background={
        <p>
          The only things that matter are where <Katex tex="f'" /> crosses the axis and what
          sign it takes between crossings. A dip that stays above the axis changes the{' '}
          <em>concavity</em> of <Katex tex="f" /> but not its direction.
        </p>
      }
      options={[
        { letter: 'A', content: <>the graph labelled A above</> },
        { letter: 'B', content: <>the graph labelled B above</>, isAnswer: true },
        { letter: 'C', content: <>the graph labelled C above</> },
        { letter: 'D', content: <>the graph labelled D above</> },
        { letter: 'E', content: <>the graph labelled E above</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
