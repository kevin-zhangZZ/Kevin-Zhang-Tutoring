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
    reason: <>Separating the variables: the right side is a product of a function of x and a function of y, so divide by <Katex tex="y^3" /> and integrate each side.</>,
    more: <>The report suggests CAS first: its differential-equation solver, given the condition <Katex tex="y(1)=3" />, gives the solution directly, and the domain still has to be read off it as in the rows below. Separating by hand, as here, is the report's alternative.</>,
  },
  {
    working: <Katex display tex="-\frac{1}{2y^2} = \frac{x^3}{3}+c" />,
    reason: <>Antidifferentiating both sides (<Katex tex="\int y^{-3}\,dy=\frac{y^{-2}}{-2}" />), with a single constant.</>,
  },
  {
    working: <Katex display tex="y(1) = 3: \quad -\frac{1}{18} = \frac{1}{3}+c \implies c = -\frac{7}{18}" />,
    reason: <>Substitute <Katex tex="x=1,\ y=3" />. The domain depends on c, so it cannot be found without this.</>,
    more: <>The report writes the same equation as <Katex tex="\frac{1}{18}-\frac{1}{2y^2}=\frac{x^3}{3}-\frac{1}{3}" />, which is what you get by integrating each side from the initial point (<Katex tex="y" /> from 3, <Katex tex="x" /> from 1). Moving terms around shows it is identical to the next row.</>,
  },
  {
    working: <Katex display tex="\frac{1}{2y^2} = \frac{7}{18}-\frac{x^3}{3} = \frac{7-6x^3}{18}" />,
    reason: <>Multiply by <Katex tex="-1" />, then write over the common denominator 18.</>,
  },
  {
    working: <Katex display tex="y^2 = \frac{9}{7-6x^3} \implies y = \frac{3}{\sqrt{7-6x^3}}" />,
    reason: <>Take the positive root: y is never 0, so (being continuous) it can't switch from positive to negative, and <Katex tex="y(1)=3>0" />.</>,
    more: <>The report keeps <Katex tex="y=\pm\sqrt{\frac{9}{7-6x^3}}" />. Either way the domain is the same, because both signs need the same expression under the square root to be positive.</>,
  },
  {
    working: <Katex display tex="7-6x^3 > 0 \implies x^3 < \frac{7}{6} \implies x < \left(\frac{7}{6}\right)^{\frac{1}{3}}" />,
    reason: <>The square root sits in a denominator, so <Katex tex="7-6x^3" /> must be strictly positive. Dividing by <Katex tex="-6" /> reverses the inequality.</>,
    more: <>Check that the initial point is inside: <Katex tex="1<\left(\frac{7}{6}\right)^{\frac{1}{3}}\approx 1.053" />, as it must be. As <Katex tex="x" /> approaches <Katex tex="\left(\frac{7}{6}\right)^{\frac{1}{3}}" /> from the left, <Katex tex="y\to\infty" />: the solution has a vertical asymptote there and cannot be continued past it. Taking the cube root keeps the direction of the inequality, because <Katex tex="x\mapsto x^{\frac{1}{3}}" /> is increasing.</>,
  },
  {
    working: <Katex display tex="\boxed{x < \left(\frac{7}{6}\right)^{\frac{1}{3}}}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option <b>A</b> (12%) includes <Katex tex="x=\left(\frac{7}{6}\right)^{\frac{1}{3}}" />, where the denominator is 0 and <Katex tex="y" /> is undefined. Options <b>C</b> (23%) and <b>D</b> (10%) take the other side of the asymptote, which is what you get by forgetting to reverse the inequality when dividing by <Katex tex="-6" />. There <Katex tex="7-6x^3<0" />, so <Katex tex="y^2" /> would be negative, and the initial point <Katex tex="x=1" /> is not even in that interval.</>,
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
