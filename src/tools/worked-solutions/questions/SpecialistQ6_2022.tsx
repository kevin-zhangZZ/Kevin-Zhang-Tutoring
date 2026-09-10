// 2022 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 59% correct.
// Which equation's graph meets |z − 5| = 2 at exactly two points. Question text transcribed
// from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 9, C: 10, D: 12, E: 59 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|z-5|=2" />,
    reason: 'A circle of radius 2 centred at (5, 0).',
  },
  {
    working: (
      <>
        <p>A. <Katex tex="\mathrm{Arg}(z-3)=\tfrac{\pi}{2}" /> — vertical ray from (3, 0), tangent at (3, 0): 1 point (and that point has y = 0, excluded from the open ray).</p>
        <p>B. <Katex tex="|z-1|=2" /> — circle centred (1, 0) r = 2; centre distance 4 = sum of radii: externally tangent, 1 point.</p>
        <p>C. <Katex tex="\mathrm{Im}(z)=2" /> — line y = 2; distance from (5, 0) is 2 = radius: tangent, 1 point.</p>
        <p>D. <Katex tex="\mathrm{Re}(z)+\mathrm{Im}(z)=2" /> — line x+y=2; distance from (5, 0) is <Katex tex="3/\sqrt2\approx2.12>2" />: no intersection.</p>
      </>
    ),
    reason: 'Check each option against the circle in turn — each of A–D gives 0 or 1 points, not 2.',
  },
  {
    working: <Katex display tex="|z-5-5i|=4" />,
    reason: 'Option E: a circle of radius 4 centred at (5, 5).',
  },
  {
    working: <Katex display tex="\text{Centre distance} = |(5,5)-(5,0)| = 5" />,
    reason: 'Distance between the two circles’ centres.',
  },
  {
    working: <Katex display tex="|4-2| < 5 < 4+2 \;\implies\; 2 < 5 < 6" />,
    reason: 'Two circles intersect at exactly two points precisely when the centre distance is strictly between the difference and the sum of the radii.',
  },
  {
    working: <Katex display tex="\boxed{|z-5-5i|=4}" />,
    reason: <>The condition holds — matches option <b>E</b>.</>,
  },
]

export default function SpecialistQ6_2022() {
  return (
    <MCQShell
      question={
        <p>
          Given <Katex tex="z=x+yi" />, where <Katex tex="x,y\in\mathbb{R}" /> and <Katex tex="z\in\mathbb{C}" />, an
          equation that has a graph that has two points of intersection with the graph given by{' '}
          <Katex tex="|z-5|=2" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\mathrm{Arg}(z-3)=\tfrac{\pi}{2}" /> },
        { letter: 'B', content: <Katex tex="|z-1|=2" /> },
        { letter: 'C', content: <Katex tex="\mathrm{Im}(z)=2" /> },
        { letter: 'D', content: <Katex tex="\mathrm{Re}(z)+\mathrm{Im}(z)=2" /> },
        { letter: 'E', content: <Katex tex="|z-5-5i|=4" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
