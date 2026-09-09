// 2017 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 47% correct.
// Count the distinct roots of a product of a quartic and a quadratic in z — the trap is that
// one root of each factor coincides.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 4, C: 9, D: 47, E: 35 },
  answer: 'D',
  noAnswer: 0,
  comment: 'Use of complex solve gives five solutions.',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z^4-1=0 \;\implies\; z^4=1" />,
    reason: 'Solve each factor separately, then combine — being alert to any repeats.',
  },
  {
    working: <Katex display tex="\boxed{z \in \{1,\,-1,\,i,\,-i\}}" />,
    reason: 'The four 4th roots of unity, evenly spaced around the unit circle.',
  },
  {
    working: <Katex display tex="z^2+3iz-2=0" />,
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} z &= \frac{-3i\pm\sqrt{(3i)^2-4(1)(-2)}}{2} \\ &= \frac{-3i\pm\sqrt{-9+8}}{2} \end{aligned}" />
        <Katex display tex="= \frac{-3i\pm i}{2}" />
      </>
    ),
    reason: 'The quadratic formula, remembering that i² = -1.',
  },
  {
    working: <Katex display tex="\boxed{z = \frac{-3i+i}{2}=-i, \quad \text{or} \quad z=\frac{-3i-i}{2}=-2i}" />,
  },
  {
    working: <Katex display tex="\{1,-1,i,-i\} \cup \{-i,-2i\} = \{1,-1,i,-i,-2i\}" />,
    reason: <>Combine the two solution sets — but <Katex tex="-i" /> appears in <em>both</em>, so it's only counted once.</>,
  },
  {
    working: <Katex display tex="\boxed{5 \text{ distinct roots}}" />,
    reason: <>Matches option <b>D</b> — not <Katex tex="4+2=6" />, since the two factors share the common root <Katex tex="z=-i" />.</>,
  },
]

export default function SpecialistQ3_2017() {
  return (
    <MCQShell
      question={
        <p>
          The number of distinct roots of the equation <Katex tex="(z^4-1)(z^2+3iz-2)=0" />, where{' '}
          <Katex tex="z\in\mathbb{C}" />, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="3" /> },
        { letter: 'C', content: <Katex tex="4" /> },
        { letter: 'D', content: <Katex tex="5" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="6" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
