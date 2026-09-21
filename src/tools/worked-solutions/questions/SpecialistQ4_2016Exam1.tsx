// 2016 Specialist Mathematics — Exam 1, Question 4 (4 marks). A related-rates chain rule:
// the surface area of a growing cube whose side length is arctan(t). Question text
// transcribed from the original paper (no diagram given). Answer checked with sympy and
// against the VCAA examination report. Solution is original. No lettered parts, so this
// uses the plain card layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [23, 13, 20, 4, 40],
  average: 2.3,
  comment: (
    <>
      Students had mixed success with this question. Quite a few students made errors with
      the formula for the surface area of a cube, including <Katex tex="A=x^2" />,{' '}
      <Katex tex="2x^2" />, <Katex tex="4x^2" /> or more commonly <Katex tex="x^3" />. There
      was some confusion with <Katex tex="t" /> and <Katex tex="x" />, which resulted in a
      denominator <Katex tex="(1+x^2)" /> rather than <Katex tex="(1+t^2)" />. Some found the
      correct derivative using the chain rule but then did not continue by substituting.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="A = 6x^2" />,
    reason: <>A cube has six square faces. The report lists four different wrong formulas for this one line — it is worth writing out "six faces, each <Katex tex="x" /> by <Katex tex="x" />" before committing.</>,
  },
  {
    working: <Katex display tex="\frac{dA}{dt} = \frac{dA}{dx}\times\frac{dx}{dt}" />,
    reason: <>The chain rule links the two rates. <Katex tex="A" /> is known in terms of <Katex tex="x" />, and <Katex tex="x" /> in terms of <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\frac{dA}{dx} = 12x, \qquad \frac{dx}{dt} = \frac{1}{1+t^2}" />,
    reason: <>Note the derivative of <Katex tex="\arctan(t)" /> has <Katex tex="t" /> in it, not <Katex tex="x" /> — the report's other flagged confusion.</>,
  },
  {
    working: <Katex display tex="\frac{dA}{dt} = \frac{12x}{1+t^2} = \frac{12\arctan(t)}{1+t^2}" />,
    reason: <>Substituting <Katex tex="x=\arctan(t)" /> puts everything in one variable.</>,
  },
  {
    working: <Katex display tex="t=1: \quad \frac{dA}{dt} = \frac{12\arctan(1)}{1+1} = \frac{12\times\frac{\pi}{4}}{2}" />,
    reason: <><Katex tex="\arctan(1)=\tfrac{\pi}{4}" />, an exact value.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dA}{dt} = \frac{3\pi}{2} \text{ mm}^2\text{ per day}}" />,
    reason: <>About <Katex tex="4.7" /> mm² per day. Plausible: after one day the side is <Katex tex="\tfrac{\pi}{4}\approx0.79" /> mm, so the cube has about <Katex tex="3.7" /> mm² of surface and is still growing quickly.</>,
  },
]

export default function SpecialistQ4_2016Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 4 (4 marks)">
        <p>
          Chemicals are added to a container so that a particular crystal will grow in the
          shape of a cube. The side length of the crystal, <Katex tex="x" /> millimetres,{' '}
          <Katex tex="t" /> days after the chemicals were added to the container, is given by{' '}
          <Katex tex="x=\arctan(t)" />.
        </p>
        <p>
          Find the rate at which the surface area, <Katex tex="A" /> square millimetres, of
          the crystal is growing one day after the chemicals were added. Give your answer in
          square millimetres per day.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={4} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
