// 2020 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 61% correct.
// Recovering the shape of f from the graph of its derivative. Question text transcribed from the original paper; the graph of f' and the five option graphs are crops of VCAA's own artwork (option letters masked); solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import fprimeSrc from './meth-2020-mcq6-fprime.png'
import optASrc from './meth-2020-mcq6-optA.png'
import optBSrc from './meth-2020-mcq6-optB.png'
import optCSrc from './meth-2020-mcq6-optC.png'
import optDSrc from './meth-2020-mcq6-optD.png'
import optESrc from './meth-2020-mcq6-optE.png'

const opt = (src: string, alt: string) => <img src={src} alt={alt} className="w-full max-w-[220px]" />

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
    reason: <>This eliminates options <b>C</b> and <b>D</b>, which have a minimum before a maximum, and option <b>E</b>, which has two maximums.</>,
  },
  {
    working: <Katex display tex="\text{both zeros of } f' \text{ are left of the } y\text{-axis}" />,
    reason: <>So both turning points of <Katex tex="f" /> lie at negative <Katex tex="x" />. Option <b>A</b> has the right rise–fall–rise pattern, but its minimum is to the <em>right</em> of the <Katex tex="y" />-axis, so it is out.</>,
  },
  {
    working: <Katex display tex="f' \text{ never returns to zero after the second crossing}" />,
    reason: <>So <Katex tex="f" /> keeps increasing to the right — with a flattening where <Katex tex="f'" /> dips to its local minimum, but no third turning point. That is option <b>B</b>: a small hump, then a minimum, both left of the <Katex tex="y" />-axis, then a rise that flattens briefly before steepening.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{B}}" />,
    reason: <>Matches option <b>B</b>. Count the zeros of <Katex tex="f'" />, note where they are, and read the sign between them; the turning points of <Katex tex="f" /> follow.</>,
  },
]

export default function MethodsQ6_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Part of the graph of <Katex tex="y=f'(x)" /> is shown below.</p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={fprimeSrc}
              alt="A curve descending from the upper left, crossing the x-axis, reaching a minimum below it, crossing back up just left of the y-axis, then a small local maximum and local minimum above the axis before rising steeply — from the original 2020 VCAA exam paper"
              className="w-full max-w-[320px]"
            />
          </div>
          <p>
            The corresponding part of the graph of <Katex tex="y=f(x)" /> is best represented
            by
          </p>
        </>
      }
      background={
        <p>
          The only things that matter are where <Katex tex="f'" /> crosses the axis and what
          sign it takes between crossings. A dip that stays above the axis changes the{' '}
          <em>concavity</em> of <Katex tex="f" /> but not its direction.
        </p>
      }
      options={[
        { letter: 'A', content: opt(optASrc, 'A cubic-like curve rising to a maximum left of the y-axis, falling through the y-axis to a minimum right of it, then rising steeply') },
        { letter: 'B', content: opt(optBSrc, 'A curve with a small maximum and then a minimum, both left of the y-axis, passing through the origin and rising with a brief flattening before steepening'), isAnswer: true },
        { letter: 'C', content: opt(optCSrc, 'A curve falling to a minimum left of the y-axis, rising to a maximum right of it, then falling steeply') },
        { letter: 'D', content: opt(optDSrc, 'A curve falling from the upper left through the origin to a minimum, then a small maximum, then falling, all right of the y-axis after the origin') },
        { letter: 'E', content: opt(optESrc, 'A symmetric curve with two maximums either side of a flat section on the y-axis') },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
