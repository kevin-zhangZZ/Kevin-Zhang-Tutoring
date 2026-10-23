// 2026 Specialist NHT — Exam 1, Question 4 (4 marks). The NHT report gives sample answers only,
// with no statistics, and no notes. a. Substituting y = e^(mx) into 2y'' − y' − y = 0 gives
// 2m² − m − 1 = 0, so m = −1/2 or 1 ("show that"). b. The region between y = e^x and y = e^(−x/2)
// for 0 ≤ x ≤ 1, rotated about the x-axis: V = π∫(e^(2x) − e^(−x)) dx = (π/2)(e² + 2e^(−1) − 3).
// Question text transcribed from the original paper; the graph is cropped from the original VCAA
// exam PDF (spec-2026nhte1-q4b-graph.png). Answers checked with sympy (V ≈ 8.050) and against the
// report's sample answers. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow } from '../QuestionParts'
import graphSrc from './spec-2026nhte1-q4b-graph.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y=e^{mx},\quad \frac{dy}{dx}=me^{mx},\quad \frac{d^2y}{dx^2}=m^2e^{mx}" />,
    reason: <>Each differentiation brings down another factor of <Katex tex="m" /> (chain rule).</>,
  },
  {
    working: <Katex display tex="2m^2e^{mx}-me^{mx}-e^{mx}=0" />,
    reason: <>Substitute all three into the differential equation.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}e^{mx}\left(2m^2-m-1\right)&=0\\ 2m^2-m-1&=0\quad(e^{mx}\neq0)\end{aligned}" />,
    reason: <>Factor out <Katex tex="e^{mx}" />. An exponential is always positive, never zero, so the other factor must be zero. Say why you can divide by it.</>,
  },
  {
    working: <Katex display tex="(2m+1)(m-1)=0" />,
    reason: <>Factorise the quadratic: <Katex tex="2m^2-2m+m-1=2m(m-1)+(m-1)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{m=-\frac12\ \text{ or }\ m=1}" />,
    reason: <>So <Katex tex="y=e^{-\frac12x}" /> and <Katex tex="y=e^{x}" /> are the two solutions of this form. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="V=\pi\int_0^1\left(\left(e^{x}\right)^2-\left(e^{-\frac12x}\right)^2\right)dx" />,
    reason: <>The region is rotated about the <Katex tex="x" />-axis and has a gap between it and the axis, so each slice is a washer: outer radius the upper curve <Katex tex="y=e^x" />, inner radius the lower curve <Katex tex="y=e^{-\frac12x}" /> (from part a., matching the graph). It runs from where the curves meet at <Katex tex="x=0" /> to the line <Katex tex="x=1" />.</>,
    more: <>Which curve is which? <Katex tex="e^x" /> increases and <Katex tex="e^{-\frac12x}" /> decreases, and both pass through <Katex tex="(0,1)" />, so for <Katex tex="x>0" /> the increasing one is on top, as the graph shows.</>,
  },
  {
    working: <Katex display tex="=\pi\int_0^1\left(e^{2x}-e^{-x}\right)dx" />,
    reason: <>Index laws: <Katex tex="\left(e^x\right)^2=e^{2x}" /> and <Katex tex="\left(e^{-\frac12x}\right)^2=e^{-x}" />.</>,
  },
  {
    working: <Katex display tex="=\pi\left[\tfrac12e^{2x}+e^{-x}\right]_0^1" />,
    reason: <>Antiderivative of <Katex tex="e^{kx}" /> is <Katex tex="\tfrac1ke^{kx}" />: with <Katex tex="k=-1" />, <Katex tex="-e^{-x}" /> antidifferentiates to <Katex tex="+e^{-x}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&=\pi\left(\tfrac12e^{2}+e^{-1}\right)-\pi\left(\tfrac12+1\right)\\ &=\pi\left(\tfrac12e^{2}+e^{-1}-\tfrac32\right)\end{aligned}" />,
    reason: <>Substitute the terminals: at <Katex tex="x=0" /> both exponentials are 1.</>,
  },
  {
    working: <Katex display tex="\boxed{V=\frac{\pi}{2}\left(e^2+2e^{-1}-3\right)}" />,
    reason: <>Take out a factor of <Katex tex="\tfrac12" /> for a tidy exact answer. Sanity check: <Katex tex="e^2+\tfrac2e-3\approx7.389+0.736-3=5.125" />, so <Katex tex="V\approx8.05" /> cubic units. The solid is at most about 2.7 units in radius and 1 long, so its volume is well under <Katex tex="\pi(2.7)^2\approx23" /> ✓.</>,
  },
]

export default function SpecialistQ4_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Differential Equations"
        marks={2}
        statement={
          <>
            Consider the differential equation <Katex tex="2\dfrac{d^2y}{dx^2}-\dfrac{dy}{dx}-y=0" />.
            <br />
            Two solutions of the differential equation have the form <Katex tex="y=e^{mx}" />, where <Katex tex="m\in R" />.
            <br />
            Show that <Katex tex="m=-\dfrac12" /> or <Katex tex="m=1" />.
          </>
        }
      >
        <Background>
          <p>
            &ldquo;<Katex tex="y=e^{mx}" /> is a solution&rdquo; means that when you substitute it and its derivatives
            into the left-hand side, you get 0 for every <Katex tex="x" />. So differentiate, substitute, and find which
            values of <Katex tex="m" /> make that happen.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Volume of Revolution"
        marks={2}
        statement={
          <>
            The graphs of the two solutions of the differential equation are shown on the Cartesian plane below.
            <span className="block my-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async" src={graphSrc}
                alt="Graph from the original VCAA exam paper: y = e^x rising and y = e^(−x/2) falling, crossing at (0, 1); the region between them from x = 0 to the vertical line x = 1 is shaded"
                className="w-full max-w-[360px]" />
            </span>
            The shaded region shown above is bounded by the two curves and the line with equation <Katex tex="x=1" />.
            This region is rotated about the <Katex tex="x" />-axis to form a solid of revolution.
            <br />
            Calculate the volume of this solid.
          </>
        }
      >
        <Background>
          <p>
            Rotating a region about the <Katex tex="x" />-axis, a thin slice at <Katex tex="x" /> sweeps out a disc of
            radius <Katex tex="y" />, with area <Katex tex="\pi y^2" />. When the region doesn&apos;t reach the axis the
            slice is a washer, a disc with a hole, and its area is <Katex tex="\pi\left(y_{\text{outer}}^2-y_{\text{inner}}^2\right)" />.
            So <Katex tex="V=\pi\int_a^b\left(y_{\text{outer}}^2-y_{\text{inner}}^2\right)dx" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Square the difference of the curves"
          working={<Katex display tex="V=\pi\int_0^1\left(e^x-e^{-\frac12x}\right)^2dx" />}
        >
          That is the volume made by rotating a region of height <Katex tex="e^x-e^{-\frac12x}" /> sitting on the axis, which
          isn&apos;t this solid. The hole has radius <Katex tex="e^{-\frac12x}" />, so subtract the two <b>areas</b>{' '}
          <Katex tex="\pi\left(e^x\right)^2-\pi\left(e^{-\frac12x}\right)^2" />, not the radii.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
