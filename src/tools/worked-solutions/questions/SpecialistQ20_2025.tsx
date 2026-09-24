// 2025 Specialist Mathematics — Exam 2, MCQ 20. VCAA examination report: 54% correct. This
// year's paper used four options (A–D) rather than five. Standardising a linear combination
// of three independent normal variables. Question text transcribed from the original paper.
// Answers checked with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 54, B: 9, C: 27, D: 10 },
  answer: 'A',
  comment: (
    <>
      <Katex tex="E(3P+2Q-R)=3E(P)+2E(Q)-E(R)=-5" />
      <br />
      <Katex tex="Var(3P+2Q-R)=9Var(P)+4Var(Q)+Var(R)=108" />
      <br />
      <Katex tex="Pr(3P+2Q-R>25)=Pr\left(Z>\dfrac{25-(-5)}{\sqrt{108}}\right)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="W = 3P+2Q-R" />,
    reason: <>Name the combination. A linear combination of independent normals is itself normal.</>,
  },
  {
    working: <Katex display tex="\operatorname{E}(W) = 3(-2)+2(3)-5 = -5" />,
    reason: <>Expectation is linear, and the minus sign carries through.</>,
  },
  {
    working: <Katex display tex="\operatorname{Var}(W) = 3^2(2^2)+2^2(3^2)+(-1)^2(6^2)" />,
    reason: <>Each coefficient is <em>squared</em>, so the <Katex tex="-R" /> adds to the variance rather than subtracting. Independence is what allows the variances to be added at all.</>,
  },
  {
    working: <Katex display tex="= 36+36+36 = 108 \implies \text{sd}(W) = \sqrt{108} = 6\sqrt3" />,
    reason: <>Take the square root for the standard deviation.</>,
  },
  {
    working: <Katex display tex="\Pr(W>25) = \Pr\left(Z>\frac{25-(-5)}{6\sqrt3}\right) = \Pr\left(Z>\frac{30}{6\sqrt3}\right)" />,
    reason: <>Standardising: subtract the mean and divide by the standard deviation.</>,
  },
  {
    working: <Katex display tex="\frac{30}{6\sqrt3} = \frac{5}{\sqrt3} = \frac{5\sqrt3}{3}" />,
    reason: <>Rationalising the denominator to match the form used in the options.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr\left(Z>\frac{5\sqrt3}{3}\right)}" />,
    reason: <>Matches option <b>A</b>, about <Katex tex="\Pr(Z>2.887)" />. Option <b>D</b> uses a standard deviation of 7, from ignoring the coefficients (<Katex tex="4+9+36=49" />); option <b>C</b> uses a variance of 66, from multiplying the variances by 3 and 2 rather than by 9 and 4.</>,
  },
]

export default function SpecialistQ20_2025() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="P\sim\mathrm{N}\left(-2,\,2^2\right)" />,{' '}
          <Katex tex="Q\sim\mathrm{N}\left(3,\,3^2\right)" />,{' '}
          <Katex tex="R\sim\mathrm{N}\left(5,\,6^2\right)" /> and{' '}
          <Katex tex="Z\sim\mathrm{N}(0,\,1)" />.
          <br />
          Given that <Katex tex="P" />, <Katex tex="Q" /> and <Katex tex="R" /> are independent
          random variables, <Katex tex="\Pr\left(3P+2Q-R>25\right)" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\Pr\left(Z>\dfrac{5\sqrt3}{3}\right)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\Pr(Z>5)" /> },
        { letter: 'C', content: <Katex tex="\Pr\left(Z>\dfrac{5\sqrt{66}}{11}\right)" /> },
        { letter: 'D', content: <Katex tex="\Pr\left(Z>\dfrac{30}{7}\right)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
