// 2025 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 55% correct. This
// year's paper used four options (A–D) rather than five. Solving a separable differential
// equation and reading off the domain of the solution. Question text transcribed from the
// original paper. Answers checked with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 55, C: 23, D: 10 },
  answer: 'B',
  comment: (
    <>
      Use the DE solve functionality on CAS to solve the given differential equation and then find
      the domain of the solution. Alternatively, use separation of variables to solve the
      differential equation manually.
      <br />
      <Katex tex="\dfrac{dy}{dx}=x^2y^3" /> <em>where</em> <Katex tex="y(1)=3" /> <em>gives</em>
      <br />
      <Katex tex="\dfrac{1}{18}-\dfrac{1}{2y^2}=\dfrac{x^3}{3}-\dfrac{1}{3}" />
      <br />
      <em>Rearrange to give</em>
      <br />
      <Katex tex="y=\pm\sqrt{\dfrac{9}{7-6x^3}}" />
      <br />
      <em>Solve</em> <Katex tex="\dfrac{9}{7-6x^3}>0" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dy}{dx} = x^2y^3 \implies \int y^{-3}\,dy = \int x^2\,dx" />,
    reason: <>Separating the variables.</>,
  },
  {
    working: <Katex display tex="-\frac{1}{2y^2} = \frac{x^3}{3}+c" />,
    reason: <>Antidifferentiating both sides, with a single constant.</>,
  },
  {
    working: <Katex display tex="y(1) = 3: \quad -\frac{1}{18} = \frac{1}{3}+c \implies c = -\frac{7}{18}" />,
    reason: <>The initial condition. Skipping it leaves the domain undetermined.</>,
  },
  {
    working: <Katex display tex="\frac{1}{2y^2} = \frac{7}{18}-\frac{x^3}{3} = \frac{7-6x^3}{18}" />,
    reason: <>Rearranging over a common denominator.</>,
  },
  {
    working: <Katex display tex="y^2 = \frac{9}{7-6x^3} \implies y = \frac{3}{\sqrt{7-6x^3}}" />,
    reason: <>The positive root, since <Katex tex="y(1)=3>0" /> and the solution cannot cross <Katex tex="y=0" />.</>,
  },
  {
    working: <Katex display tex="7-6x^3 > 0 \implies x^3 < \frac{7}{6} \implies x < \left(\frac{7}{6}\right)^{\frac{1}{3}}" />,
    reason: <>Strictly greater than zero — the square root sits in a denominator, so equality is excluded as well as negatives.</>,
  },
  {
    working: <Katex display tex="\boxed{x < \left(\frac{7}{6}\right)^{\frac{1}{3}}}" />,
    reason: <>Matches option <b>B</b>. Options A and C allow equality; C and D take the wrong side of the asymptote.</>,
  },
]

export default function SpecialistQ11_2025() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="y(x)" /> is a solution to the differential equation{' '}
          <Katex tex="\dfrac{dy}{dx} = x^2y^3" />, where <Katex tex="y(1) = 3" />, the domain of{' '}
          <Katex tex="y" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x\leq\left(\frac{7}{6}\right)^{\frac{1}{3}}" /> },
        { letter: 'B', content: <Katex tex="x<\left(\frac{7}{6}\right)^{\frac{1}{3}}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="x\geq\left(\frac{7}{6}\right)^{\frac{1}{3}}" /> },
        { letter: 'D', content: <Katex tex="x>\left(\frac{7}{6}\right)^{\frac{1}{3}}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
