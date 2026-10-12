// 2025 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 49% correct. This
// year's paper used four options (A–D) rather than five. Setting up the surface-of-revolution
// integral for a parametric curve rotated about the x-axis. Question text transcribed from
// the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 15, C: 49, D: 29 },
  answer: 'C',
  comment: (
    <>
      Apply the formula for the surface area of a curve rotated about the <Katex tex="x" />-axis.
      <br />
      <Katex tex="2\pi\displaystyle\int_a^b e^{kt}\sqrt{k^2+k^2e^{2kt}}\,dt" />
      <br />
      <em>Use the substitution</em> <Katex tex="u=e^{kt}" />
      <br />
      <Katex tex="=2\pi\displaystyle\int_{e^{ka}}^{e^{kb}}\frac{1}{k}\sqrt{k^2\left(1+u^2\right)}\,du" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="S = 2\pi\int_a^b y\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />,
    reason: <>The formula-sheet surface area for a parametric curve rotated about the x-axis: y is the radius each point sweeps out.</>,
    more: (
      <>
        Each small piece of curve, of length <Katex tex="\sqrt{\left(\tfrac{dx}{dt}\right)^2+\left(\tfrac{dy}{dt}\right)^2}\,dt" />,
        sweeps out a thin band of circumference <Katex tex="2\pi y" />. The square root holds the{' '}
        <em>derivatives</em> of x and y: option <b>A</b> (8%) puts <Katex tex="x^2+y^2=k^2t^2+e^{2kt}" /> there
        instead.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{dx}{dt}=k \qquad \frac{dy}{dt}=ke^{kt}" />,
    reason: <>Differentiate <Katex tex="x=kt" /> and <Katex tex="y=e^{kt}" />.</>,
  },
  {
    working: <Katex display tex="S = 2\pi\int_a^b e^{kt}\sqrt{k^2+k^2e^{2kt}}\,dt" />,
    reason: <>Substitute y and the two derivatives into the formula.</>,
    more: (
      <>
        Option <b>B</b> (15%) is what you get by forgetting to square the derivatives, i.e. using{' '}
        <Katex tex="\sqrt{k+ke^{kt}}=\sqrt{k}\sqrt{1+e^{kt}}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="S = 2\pi\int_a^b e^{kt}\cdot k\sqrt{1+e^{2kt}}\,dt" />,
    reason: <>Take <Katex tex="k^2" /> out of the square root as k, which is allowed because k is positive.</>,
  },
  {
    working: <Katex display tex="u = e^{kt} \;\implies\; \frac{du}{dt} = ke^{kt} \;\implies\; du = ke^{kt}\,dt" />,
    reason: (
      <>
        Options C and D are in u with terminals <Katex tex="e^{ka}" /> and <Katex tex="e^{kb}" />, which points
        to <Katex tex="u=e^{kt}" />. The factor <Katex tex="e^{kt}\cdot k\,dt" /> is then exactly du.
      </>
    ),
  },
  {
    working: <Katex display tex="t=a \implies u=e^{ka}, \qquad t=b \implies u=e^{kb}" />,
    reason: <>Convert the terminals to u-values.</>,
  },
  {
    working: <Katex display tex="\boxed{S = 2\pi\int_{e^{ka}}^{e^{kb}}\sqrt{1+u^2}\,du}" />,
    reason: (
      <>
        Replace <Katex tex="e^{kt}\cdot k\,dt" /> by du and <Katex tex="e^{2kt}=(e^{kt})^2" /> by{' '}
        <Katex tex="u^2" />; no u is left outside the root. Matches option <b>C</b>.
      </>
    ),
    more: (
      <>
        Option <b>D</b> (29%) was the most common wrong answer. It keeps the radius <Katex tex="y=e^{kt}" /> as a
        factor <Katex tex="u" /> outside the root, treating <Katex tex="k\,dt" /> alone as <Katex tex="du" />. But{' '}
        <Katex tex="du=ke^{kt}\,dt" />, so the <Katex tex="e^{kt}" /> is used up by <Katex tex="du" /> and no{' '}
        <Katex tex="u" /> is left outside. A CAS check with, say, <Katex tex="k=1.5" />, <Katex tex="a=0.2" />,{' '}
        <Katex tex="b=0.8" /> gives about 31.58 for both the original t-integral and option C, but about 77.39
        for D.
      </>
    ),
  },
]

export default function SpecialistQ9_2025() {
  return (
    <MCQShell
      question={
        <p>
          A parametric curve is given by <Katex tex="x=kt" />, <Katex tex="y=e^{kt}" />, where <Katex tex="k" /> is a
          positive constant. The curve is rotated about the <Katex tex="x" />-axis from <Katex tex="t=a" /> to{' '}
          <Katex tex="t=b" />, where <Katex tex="b>a" />, to form a surface of revolution.
          <br />
          The area of this surface is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2\pi\displaystyle\int_a^b e^{kt}\sqrt{k^2t^2+e^{2kt}}\,dt" /> },
        { letter: 'B', content: <Katex tex="2\pi\sqrt{k}\displaystyle\int_a^b e^{kt}\sqrt{1+e^{kt}}\,dt" /> },
        { letter: 'C', content: <Katex tex="2\pi\displaystyle\int_{e^{ka}}^{e^{kb}}\sqrt{1+u^2}\,du" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="2\pi\displaystyle\int_{e^{ka}}^{e^{kb}} u\sqrt{1+u^2}\,du" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
