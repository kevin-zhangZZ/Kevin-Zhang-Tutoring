// 2020 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 66% correct.
// Simplifying 4z·conj(z)/(z + conj(z))² into real and imaginary parts. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 66, B: 4, C: 13, D: 9, E: 8 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z = a+bi \implies \bar z = a-bi" />,
    reason: 'Working in components is quicker here than juggling conjugate identities.',
  },
  {
    working: <Katex display tex="z\bar z = a^2+b^2" />,
    reason: <>The modulus squared — the <Katex tex="i" /> terms cancel.</>,
  },
  {
    working: <Katex display tex="z+\bar z = 2a \implies (z+\bar z)^2 = 4a^2" />,
    reason: <>Twice the real part; note this is <em>squared</em>, so the 4 downstairs will cancel the 4 upstairs.</>,
  },
  {
    working: <Katex display tex="\frac{4z\bar z}{(z+\bar z)^2} = \frac{4\left(a^2+b^2\right)}{4a^2} = \frac{a^2+b^2}{a^2}" />,
    reason: <>The condition <Katex tex="a\in R\setminus\{0\}" /> is there precisely so this division is legal.</>,
  },
  {
    working: <Katex display tex="= 1+\frac{b^2}{a^2} = \boxed{1+\left(\frac{\operatorname{Im}(z)}{\operatorname{Re}(z)}\right)^2}" />,
    reason: <>Splitting the fraction. Matches option <b>A</b>.</>,
  },
]

export default function SpecialistQ5_2020() {
  return (
    <MCQShell
      question={
        <p>
          Given the complex number <Katex tex="z=a+bi" />, where{' '}
          <Katex tex="a\in R\setminus\{0\}" /> and <Katex tex="b\in R" />,{' '}
          <Katex tex="\dfrac{4z\bar z}{(z+\bar z)^2}" /> is equivalent to
        </p>
      }
      options={[
        {
          letter: 'A',
          content: <Katex tex="1+\left(\frac{\operatorname{Im}(z)}{\operatorname{Re}(z)}\right)^2" />,
          isAnswer: true,
        },
        { letter: 'B', content: <Katex tex="4\left[\operatorname{Re}(z)\cdot\operatorname{Im}(z)\right]" /> },
        { letter: 'C', content: <Katex tex="4\left([\operatorname{Re}(z)]^2+[\operatorname{Im}(z)]^2\right)" /> },
        {
          letter: 'D',
          content: <Katex tex="4\left[1+(\operatorname{Re}(z)+\operatorname{Im}(z))^2\right]" />,
        },
        { letter: 'E', content: <Katex tex="\frac{2\cdot\operatorname{Im}(z)}{[\operatorname{Re}(z)]^2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
