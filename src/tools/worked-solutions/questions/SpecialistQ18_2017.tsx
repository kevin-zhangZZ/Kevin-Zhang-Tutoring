// 2017 Specialist Mathematics — Exam 2, MCQ 18. VCAA examination report: 42% correct.
// Mean and variance of a linear combination of two independent normals. Question text
// transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 25, B: 9, C: 14, D: 8, E: 42 },
  answer: 'E',
  noAnswer: 1,
  comment: <Katex tex="\mathrm{E}(W)=-4,\ \mathrm{sd}(W)=5" />,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(W) = 4\mathrm{E}(U)-3\mathrm{E}(V) = 4(5)-3(8)" />,
    reason: <>Expectation is linear, so the coefficients pass straight through — signs included.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(W) = 20-24 = -4" />,
    reason: <>Negative, which is easy to miss and is what makes the final standardisation come out at <Katex tex="1.8" /> rather than <Katex tex="0.2" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(W) = 4^2\mathrm{Var}(U)+(-3)^2\mathrm{Var}(V)" />,
    reason: <>Variances of independent variables <em>add</em>, and the coefficients are squared — so the minus sign disappears here. Subtracting the variances is the classic error.</>,
  },
  {
    working: <Katex display tex="= 16(1)+9(1) = 25 \implies \mathrm{sd}(W)=5" />,
    reason: <>Note <Katex tex="16+9=25" /> is deliberate — the numbers were chosen so the standard deviation is a whole number.</>,
  },
  {
    working: <Katex display tex="\Pr(W>5) = \Pr\!\left(Z>\frac{5-(-4)}{5}\right)" />,
    reason: <>Standardising. The double negative in the numerator is the last trap.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(Z>1.8)}" />,
    reason: <>Matches option <b>E</b>. Option A (25%) subtracts the variances, giving <Katex tex="\mathrm{sd}(W)=\sqrt7" />; option D, <Katex tex="\Pr(Z>0.2)" />, comes from taking <Katex tex="\mathrm{E}(W)=+4" />; option B has the inequality reversed.</>,
  },
]

export default function SpecialistQ18_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            <Katex tex="U" /> and <Katex tex="V" /> are independent normally distributed
            random variables, where <Katex tex="U" /> has a mean of <Katex tex="5" /> and a
            variance of <Katex tex="1" />, and <Katex tex="V" /> has a mean of{' '}
            <Katex tex="8" /> and a variance of <Katex tex="1" />. The random variable{' '}
            <Katex tex="W" /> is defined by <Katex tex="W=4U-3V" />.
          </p>
          <p>
            In terms of the standard normal variable <Katex tex="Z" />,{' '}
            <Katex tex="\Pr(W>5)" /> is equivalent to
          </p>
        </>
      }
      background={
        <p>
          For independent <Katex tex="U" /> and <Katex tex="V" />:{' '}
          <Katex tex="\mathrm{E}(aU+bV)=a\mathrm{E}(U)+b\mathrm{E}(V)" /> — signs carry
          through — but{' '}
          <Katex tex="\mathrm{Var}(aU+bV)=a^2\mathrm{Var}(U)+b^2\mathrm{Var}(V)" /> — always a
          sum, whatever the signs of <Katex tex="a" /> and <Katex tex="b" />. Subtracting
          variables cannot reduce the spread.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\Pr\!\left(Z>\tfrac{9\sqrt7}{7}\right)" /> },
        { letter: 'B', content: <Katex tex="\Pr(Z<1.8)" /> },
        { letter: 'C', content: <Katex tex="\Pr\!\left(Z<\tfrac{9\sqrt7}{7}\right)" /> },
        { letter: 'D', content: <Katex tex="\Pr(Z>0.2)" /> },
        { letter: 'E', content: <Katex tex="\Pr(Z>1.8)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
