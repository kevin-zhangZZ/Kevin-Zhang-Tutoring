// 2015 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 43% correct.
// Reconstruct a hyperbola's equation from its asymptotes and a point on it.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 20, C: 11, D: 43, E: 18 },
  answer: 'D',
  noAnswer: 1,
  comment: 'Options D and E had the correct asymptotes, but (5, 5) satisfied only option D.',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{centre } (2,1), \quad \text{asymptotes } y-1=\pm\tfrac23(x-2)" />,
    reason: 'The asymptotes of a hyperbola always cross at its centre, so each asymptote is a line through (2, 1).',
  },
  {
    working: (
      <>
        <Katex display tex="(y-1)^2 = \tfrac49(x-2)^2" />
        <Katex display tex="\implies\; \frac{(y-1)^2}{4} - \frac{(x-2)^2}{9} = 0" />
      </>
    ),
    reason: <>Squaring combines both asymptotes into one equation; dividing by <Katex tex="4" /> puts it in hyperbola form.</>,
    more: <>This form also gives a quick gradient rule for any hyperbola: the asymptote gradients are <Katex tex="\pm\sqrt{\dfrac{\text{denominator under }(y-k)^2}{\text{denominator under }(x-h)^2}}" />, whichever term comes first. Here that is <Katex tex="\pm\sqrt{4/9}=\pm\tfrac23" />, as required.</>,
  },
  {
    working: <Katex display tex="\frac{(y-1)^2}{4} - \frac{(x-2)^2}{9} = k, \quad k \ne 0" />,
    reason: <>A hyperbola's asymptotes are its equation with the right side set to <Katex tex="0" />. So every hyperbola with these asymptotes is this left side equal to a non-zero constant. The point <Katex tex="(5,5)" /> fixes <Katex tex="k" />.</>,
    more: <>The sign of <Katex tex="k" /> sets the orientation. If <Katex tex="k>0" /> the branches open up and down; if <Katex tex="k<0" />, multiplying through by <Katex tex="-1" /> gives the <Katex tex="x" />-term first, so the branches open left and right. Option E is exactly the <Katex tex="k=-3" /> case.</>,
  },
  {
    working: (
      <>
        <Katex display tex="k = \frac{(5-1)^2}{4}-\frac{(5-2)^2}{9}" />
        <Katex display tex="= \frac{16}{4}-\frac{9}{9} = 4-1 = 3" />
      </>
    ),
    reason: <>Substitute <Katex tex="x=5" />, <Katex tex="y=5" />. Since <Katex tex="k=3>0" />, the branches open up and down.</>,
    more: <>Check the orientation from a sketch: from the centre <Katex tex="(2,1)" /> to <Katex tex="(5,5)" /> is a run of <Katex tex="3" /> and a rise of <Katex tex="4" />, a gradient of <Katex tex="\tfrac43" />. That is steeper than the asymptotes' <Katex tex="\tfrac23" />, so <Katex tex="(5,5)" /> sits in the region above the asymptotes, where only an up/down-opening branch can reach.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{(y-1)^2}{4} - \frac{(x-2)^2}{9} = 3}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>
      <b>E</b> (18%) has the right asymptotes but opens left and right: substituting <Katex tex="(5,5)" /> gives <Katex tex="1-4=-3\ne3" />. This is the report's point — D and E share asymptotes, but only D contains <Katex tex="(5,5)" />.{' '}
      <b>B</b> (20%, the most popular wrong answer) does contain <Katex tex="(5,5)" />, since <Katex tex="\tfrac94-\tfrac{16}9=\tfrac{17}{36}" />, but it has <Katex tex="9" /> under the <Katex tex="y" />-term and <Katex tex="4" /> under the <Katex tex="x" />-term, so its asymptote gradients are <Katex tex="\pm\sqrt{9/4}=\pm\tfrac32" />, not <Katex tex="\pm\tfrac23" />. A student who only tested the point lands on B, so check both conditions.{' '}
      <b>A</b> and <b>C</b> have the same denominators as B, so the same wrong gradients, and do not contain the point either (A gives <Katex tex="\tfrac{17}{36}\ne1" />, C gives <Katex tex="-\tfrac{17}{36}" />).
    </>,
  },
]

export default function SpecialistQ4_2015() {
  return (
    <MCQShell
      question={
        <>
          <p>
            The two asymptotes of a particular hyperbola have gradients <Katex tex="\tfrac23" /> and{' '}
            <Katex tex="-\tfrac23" /> respectively and intersect at the point <Katex tex="(2,1)" />. One
            branch of the hyperbola passes through the point <Katex tex="(5,5)" />.
          </p>
          <p className="mt-2">The equation of the hyperbola is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{(x-2)^2}{4} - \dfrac{(y-1)^2}{9} = 1" /> },
        { letter: 'B', content: <Katex tex="\dfrac{(x-2)^2}{4} - \dfrac{(y-1)^2}{9} = \dfrac{17}{36}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{(y-1)^2}{9} - \dfrac{(x-2)^2}{4} = \dfrac{17}{36}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{(y-1)^2}{4} - \dfrac{(x-2)^2}{9} = 3" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{(x-2)^2}{9} - \dfrac{(y-1)^2}{4} = 3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
