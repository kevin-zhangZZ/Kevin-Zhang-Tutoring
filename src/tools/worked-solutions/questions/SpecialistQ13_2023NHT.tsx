// 2023 Specialist NHT — Exam 2, MCQ 13. The NHT report gives the answer key only, with no
// statistics. Vectors: find d when the vector resolute of a = 4i + 3dj − dk in the direction of b is
// 2i − j − 2k. Question text transcribed from the original paper. Solution is original; the answer A
// agrees with the report's key, and sympy confirms a·(2i − j − 2k) = 9 gives d = −1.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{u}=2\underset{\sim}{i}-\underset{\sim}{j}-2\underset{\sim}{k},\qquad |\underset{\sim}{u}|=\sqrt{4+1+4}=3" />,
    reason: <>The vector resolute of <Katex tex="\underset{\sim}{a}" /> in the direction of <Katex tex="\underset{\sim}{b}" /> is parallel to <Katex tex="\underset{\sim}{b}" />, so <Katex tex="\underset{\sim}{b}" /> points along <Katex tex="\underset{\sim}{u}" /> (or the opposite way, which gives the same resolute). Use <Katex tex="\underset{\sim}{u}" /> as the direction.</>,
  },
  {
    working: <Katex display tex="\left(\underset{\sim}{a}\cdot\hat{\underset{\sim}{u}}\right)\hat{\underset{\sim}{u}}=\frac{\underset{\sim}{a}\cdot\underset{\sim}{u}}{|\underset{\sim}{u}|^2}\,\underset{\sim}{u}=\underset{\sim}{u}" />,
    reason: <>The vector resolute formula, with the unit vector written out: <Katex tex="\hat{\underset{\sim}{u}}=\tfrac{\underset{\sim}{u}}{|\underset{\sim}{u}|}" /> appears twice, so the denominator is <Katex tex="|\underset{\sim}{u}|^2" />. The resolute is <Katex tex="\underset{\sim}{u}" /> itself, so the coefficient must be 1.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{u}=|\underset{\sim}{u}|^2=9" />,
    reason: <>Multiply both sides by <Katex tex="|\underset{\sim}{u}|^2" />: the dot product must equal <Katex tex="|\underset{\sim}{u}|^2=3^2=9" />. This is the one equation we need for <Katex tex="d" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{a}\cdot\underset{\sim}{u}&=4(2)+3d(-1)+(-d)(-2)\\ &=8-3d+2d=8-d\end{aligned}" />,
    reason: <>Dot product: multiply matching components and add. Watch the signs in the <Katex tex="\underset{\sim}{k}" /> term: <Katex tex="(-d)(-2)=+2d" />.</>,
  },
  {
    working: <Katex display tex="8-d=9\implies \boxed{d=-1}" />,
    reason: <>Matches option <b>A</b>. Check: <Katex tex="\underset{\sim}{a}=4\underset{\sim}{i}-3\underset{\sim}{j}+\underset{\sim}{k}" />, <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{u}=8+3-2=9" /> ✓.</>,
    more: <>Option E, 5, divides by <Katex tex="|\underset{\sim}{u}|" /> only once (<Katex tex="(\underset{\sim}{a}\cdot\hat{\underset{\sim}{u}})\,\underset{\sim}{u}=\underset{\sim}{u}" /> gives <Katex tex="8-d=3" />). Option B, <Katex tex="-\tfrac15" />, comes from the sign slip <Katex tex="(-d)(-2)=-2d" />, giving <Katex tex="8-5d=9" />.</>,
  },
]

export default function SpecialistQ13_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          The vector resolute of <Katex tex="\underset{\sim}{a}=4\underset{\sim}{i}+3d\underset{\sim}{j}-d\underset{\sim}{k}" />, where{' '}
          <Katex tex="d\in R" />, in the direction of a non-zero vector <Katex tex="\underset{\sim}{b}" /> is{' '}
          <Katex tex="2\underset{\sim}{i}-\underset{\sim}{j}-2\underset{\sim}{k}" />.
          <br />
          The value of <Katex tex="d" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-1" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="-\dfrac{1}{5}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{1}{3}" /> },
        { letter: 'D', content: <Katex tex="1" /> },
        { letter: 'E', content: <Katex tex="5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
