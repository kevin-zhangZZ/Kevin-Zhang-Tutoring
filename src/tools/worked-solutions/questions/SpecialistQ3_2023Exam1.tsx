// 2023 Specialist Mathematics — Exam 1 Question 3 (3 marks). Velocity as a function of
// displacement, so acceleration is v dv/dx; then a limit at infinity. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [44, 21, 35],
  average: 0.9,
  comment: (
    <>
      A smaller number of students evaluated{' '}
      <Katex tex="\tfrac{d}{dx}\!\left(\tfrac12v^2\right)" /> when <Katex tex="x=2" /> to
      obtain the same result.
      <br />
      A large number of students evaluated <Katex tex="\tfrac{dv}{dx}" /> at{' '}
      <Katex tex="x=2" /> and proceeded no further.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: (
    <>
      Some students separated the fraction to find the limit:
      <br />
      <Katex tex="\tfrac{3x+2}{2x-1}=\tfrac32+\tfrac{7}{2(2x-1)}" />
      <br />
      Other students divided both the numerator and denominator by <Katex tex="x" /> to find
      the limit. Many students wrote for their answer 0 or <Katex tex="\infty" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="a = v\frac{dv}{dx}" />,
    reason: <>Velocity is given in terms of <Katex tex="x" />, not <Katex tex="t" />, so this is the form of acceleration to use. The report notes a large number of students evaluated <Katex tex="\tfrac{dv}{dx}" /> at <Katex tex="x=2" /> and proceeded no further.</>,
  },
  {
    working: <Katex display tex="v = \frac{3x+2}{2x-1} \implies \frac{dv}{dx} = \frac{3(2x-1)-2(3x+2)}{(2x-1)^2}" />,
    reason: <>Quotient rule.</>,
  },
  {
    working: <Katex display tex="= \frac{6x-3-6x-4}{(2x-1)^2} = \frac{-7}{(2x-1)^2}" />,
    reason: <>Always negative, so the particle is always decelerating along this stretch.</>,
  },
  {
    working: <Katex display tex="a = \frac{3x+2}{2x-1}\cdot\frac{-7}{(2x-1)^2}" />,
    reason: <>Multiplying the two pieces together.</>,
  },
  {
    working: <Katex display tex="x=2: \quad a = \frac{8}{3}\cdot\frac{-7}{9}" />,
    reason: <><Katex tex="3(2)+2=8" />, <Katex tex="2(2)-1=3" />, and <Katex tex="3^2=9" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -\frac{56}{27} \ \mathrm{ms^{-2}}}" />,
    reason: <>About <Katex tex="-2.07" />. The alternative form <Katex tex="a=\tfrac{d}{dx}\!\left(\tfrac12v^2\right)" /> gives exactly the same number.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\lim_{x\to\infty}\frac{3x+2}{2x-1}" />,
    reason: <>Both parts grow without bound, so the answer is neither 0 nor <Katex tex="\infty" /> — the report notes many students wrote one of those.</>,
  },
  {
    working: <Katex display tex="\frac{3x+2}{2x-1} = \frac{3+\tfrac2x}{2-\tfrac1x}" />,
    reason: <>Dividing every term by the highest power of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\frac2x\to0 \ \text{ and } \ \frac1x\to0" />,
    reason: <>The two vanishing pieces.</>,
  },
  {
    working: <Katex display tex="\boxed{v \to \frac32 \ \mathrm{ms^{-1}}}" />,
    reason: <>The ratio of the leading coefficients. Equivalently <Katex tex="v=\tfrac32+\tfrac{7}{2(2x-1)}" />, which shows the particle approaches <Katex tex="1.5\ \mathrm{ms^{-1}}" /> from above — consistent with the negative acceleration in part a.</>,
  },
]

export default function SpecialistQ3_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (3 marks)</p>
        <p>
          A particle moves along a straight line. When the particle is <Katex tex="x" /> m
          from a fixed point <Katex tex="O" />, its velocity, <Katex tex="v" />{' '}
          <Katex tex="\mathrm{m\,s^{-1}}" />, is given by
        </p>
        <Katex display tex="v=\frac{3x+2}{2x-1}, \ \text{where } x\ge1." />
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Acceleration has three interchangeable forms —{' '}
            <Katex tex="\tfrac{dv}{dt}" />, <Katex tex="v\tfrac{dv}{dx}" /> and{' '}
            <Katex tex="\tfrac{d}{dx}\!\left(\tfrac12v^2\right)" /> — and the one to reach for
            is whichever matches the variable you have. Here everything is in{' '}
            <Katex tex="x" />, so it is the second or the third. Differentiating and stopping
            is the error the report saw most: <Katex tex="\tfrac{dv}{dx}" /> is not
            acceleration.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Acceleration"
        marks={2}
        statement={
          <>
            Find the acceleration of the particle, in <Katex tex="\mathrm{m\,s^{-2}}" />, when{' '}
            <Katex tex="x=2" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Limiting Velocity"
        marks={1}
        statement={
          <>
            Find the value that the velocity of the particle approaches as <Katex tex="x" />{' '}
            becomes very large.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
