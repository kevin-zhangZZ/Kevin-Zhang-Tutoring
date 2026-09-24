// 2025 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 68% correct. This
// year's paper used four options (A–D) rather than five. Recovering three constants from an
// oblique asymptote and a y-intercept. Question text transcribed from the original paper.
// Answers checked with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 68, B: 8, C: 13, D: 11 },
  answer: 'A',
  comment: (
    <>
      The given expression can be expanded using CAS, which allows the student to equate
      coefficients with the given oblique asymptote. In addition, they should equate{' '}
      <Katex tex="y(0)" />, the <Katex tex="y" /> intercept, to <Katex tex="-2" />.
      <br />
      <Katex tex="\dfrac{x^2+a}{bx+c}=\dfrac{ab^2+c^2}{b^2(bx+c)}+\dfrac{x}{b}-\dfrac{c}{b^2}" />
      <br />
      <Katex tex="\dfrac{x}{b}-\dfrac{c}{b^2}=-\dfrac{1}{2}x+\dfrac{1}{4}" />
      <br />
      <Katex tex="\dfrac{a}{c}=-2" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{x^2+a}{bx+c} = \frac{x}{b}-\frac{c}{b^2}+\frac{a+\frac{c^2}{b^2}}{bx+c}" />,
    reason: <>Long division. The remainder term vanishes as x grows, so the first two terms are the oblique asymptote.</>,
  },
  {
    working: <Katex display tex="y = \frac{x}{b}-\frac{c}{b^2} \quad \text{must be} \quad y = -\frac{1}{2}x+\frac{1}{4}" />,
    reason: <>Equate the asymptote found by division with the one given.</>,
  },
  {
    working: <Katex display tex="\frac{1}{b} = -\frac{1}{2} \implies b = -2" />,
    reason: <>Comparing the gradients.</>,
  },
  {
    working: <Katex display tex="-\frac{c}{b^2} = \frac{1}{4} \implies -\frac{c}{4} = \frac{1}{4} \implies c = -1" />,
    reason: <>Comparing the intercepts, now that b is known.</>,
  },
  {
    working: <Katex display tex="y(0) = \frac{0+a}{0+c} = \frac{a}{c} = -2 \implies a = -2c = 2" />,
    reason: <>The <Katex tex="y" />-intercept supplies the third equation. Without it a is undetermined.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 2,\ b = -2,\ c = -1}" />,
    reason: <>Matches option <b>A</b>. Checking: <Katex tex="\frac{x^2+2}{-2x-1}" /> does have y-intercept <Katex tex="-2" />.</>,
  },
]

export default function SpecialistQ3_2025() {
  return (
    <MCQShell
      question={
        <p>
          The graph of <Katex tex="y = \dfrac{x^2+a}{bx+c}" /> has an asymptote given by{' '}
          <Katex tex="y = -\dfrac{1}{2}x+\dfrac{1}{4}" /> and a <Katex tex="y" />-intercept of{' '}
          <Katex tex="-2" />.
          <br />
          The values of <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> are
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="a = 2,\ b = -2,\ c = -1" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="a = 2,\ b = 2,\ c = -1" /> },
        { letter: 'C', content: <Katex tex="a = -2,\ b = -2,\ c = 1" /> },
        { letter: 'D', content: <Katex tex="a = -2,\ b = -2,\ c = -1" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
