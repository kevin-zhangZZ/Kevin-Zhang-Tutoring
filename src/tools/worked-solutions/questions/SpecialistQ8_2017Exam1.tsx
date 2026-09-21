// 2017 Specialist Mathematics — Exam 1, Question 8 (4 marks). A slope field, the solution
// curve through (−1, 1), and the separable equation behind it. Question text transcribed
// from the original paper; the slope-field figure is a crop of VCAA's own artwork and the
// answer sketch is our own matplotlib version. Answers checked with sympy and against the
// VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import fieldSrc from './spec-2017exam1-q8-slopefield.png'
import solutionSrc from './spec-2017exam1-q8-solution.png'

const EXAM_A: SAExaminerStats = {
  marks: [54, 29, 17],
  average: 0.7,
  comment: (
    <>
      This question was not answered well. Several curves crossed the slope ticks rather than
      following them. Errors included the final curve not being symmetrical, the curve not
      passing through <Katex tex="(-1,1)" />, and finding an approximate value from the
      solution in part b. even though this was inconsistent with the student's graph (part a.
      used the word "hence"). Many graphs were almost flat between{' '}
      <Katex tex="x=-0.5" /> and <Katex tex="x=0.5" />, resulting in missing the desired{' '}
      <Katex tex="y" />-intercept.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [15, 49, 36],
  average: 1.2,
  comment: (
    <>
      This question was answered reasonably well. Most students were able to separate the
      variables (though some algebraic errors occurred) but several arrived at an incorrect
      value of the constant of integration, of which <Katex tex="\tfrac56" /> was most
      common. Most students had the correct integration after separating variables but made
      no attempt to express the answer with integers as required.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{start at }(-1,1)" />,
    reason: <>The initial condition <Katex tex="y(-1)=1" /> fixes one point the curve must pass through. Everything else follows the ticks.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}=\frac{-x}{1+y^2}" />,
    reason: <>The denominator is always positive, so the sign of the gradient is the sign of <Katex tex="-x" />: uphill to the left of the <Katex tex="y" />-axis, flat on it, downhill to the right. The curve therefore has a maximum on the <Katex tex="y" />-axis.</>,
  },
  {
    working: <Katex display tex="x\to-x \implies \frac{dy}{dx}\to-\frac{dy}{dx}" />,
    reason: <>The field is symmetric about the <Katex tex="y" />-axis, so the solution curve must be too. The report says non-symmetric curves were a common error.</>,
  },
  {
    working: <Katex display tex="\boxed{x\approx 1.9}" />,
    reason: <>Reading off where the curve crosses the <Katex tex="x" />-axis on the right. VCAA accepted <Katex tex="1.7\le x\le1.9" />. Part (b) confirms it exactly: <Katex tex="\sqrt{\tfrac{11}{3}}\approx1.915" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="(1+y^2)\,dy = -x\,dx" />,
    reason: <>Separating variables: all the <Katex tex="y" />s on one side, all the <Katex tex="x" />s on the other.</>,
  },
  {
    working: <Katex display tex="y+\frac{y^3}{3} = -\frac{x^2}{2}+c" />,
    reason: <>Integrating both sides. One constant is enough.</>,
  },
  {
    working: <Katex display tex="1+\frac13 = -\frac12+c" />,
    reason: <>Substituting <Katex tex="x=-1" />, <Katex tex="y=1" />. Note <Katex tex="(-1)^2=+1" />, so the right-hand side is <Katex tex="-\tfrac12" /> — the sign slip behind the report's popular wrong constant <Katex tex="\tfrac56" />.</>,
  },
  {
    working: <Katex display tex="c = \frac43+\frac12 = \frac{11}{6}" />,
    reason: <>Common denominator <Katex tex="6" />.</>,
  },
  {
    working: <Katex display tex="y+\frac{y^3}{3}+\frac{x^2}{2}-\frac{11}{6} = 0" />,
    reason: <>Everything on one side, ready to clear denominators.</>,
  },
  {
    working: <Katex display tex="\boxed{2y^3+6y+3x^2-11 = 0}" />,
    reason: <>Multiplying through by <Katex tex="6" /> gives integer coefficients as required: <Katex tex="a=2" />, <Katex tex="b=6" />, <Katex tex="c=3" />, <Katex tex="d=-11" />. Check the initial condition: <Katex tex="2+6+3-11=0" /> ✓.</>,
  },
  {
    working: <Katex display tex="y=0 \implies 3x^2=11 \implies x=\sqrt{\tfrac{11}{3}}\approx1.915" />,
    reason: <>Confirms the estimate in part (a) — though part (a) had to be read off the field, since it said "hence".</>,
  },
]

export default function SpecialistQ8_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (4 marks)</p>
        <p className="mb-3">
          A slope field representing the differential equation{' '}
          <Katex tex="\dfrac{dy}{dx}=\dfrac{-x}{1+y^2}" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={fieldSrc}
            alt="A slope field on axes from −2 to 2 in both directions: short line segments sloping up to the right on the left half of the plane, horizontal on the y-axis, and down to the right on the right half — from the original 2017 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            Sketch the solution curve of the differential equation corresponding to the
            condition <Katex tex="y(-1)=1" /> on the slope field above and, hence, estimate
            the positive value of <Katex tex="x" /> when <Katex tex="y=0" />. Give your answer
            correct to one decimal place.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Reading a slope field">
          <p>
            Every tick is a tiny piece of tangent. A solution curve must be tangent to the
            ticks it passes through — it never cuts across them. Start at the given point and
            follow the ticks in both directions.
          </p>
          <p>
            Before drawing, extract what the equation tells you about shape.{' '}
            <Katex tex="1+y^2>0" /> always, so the sign of <Katex tex="\tfrac{dy}{dx}" /> is
            the sign of <Katex tex="-x" />: rising for <Katex tex="x<0" />, zero at{' '}
            <Katex tex="x=0" />, falling for <Katex tex="x>0" />. That gives a single maximum
            on the <Katex tex="y" />-axis and a curve symmetric about it.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={solutionSrc}
            alt="The same slope field with the solution curve drawn: a symmetric arch through (−1, 1), peaking just above y = 1 on the y-axis and crossing the x-axis near x = 1.91"
            className="w-full max-w-[380px]"
          />
        </div>
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Solve the differential equation <Katex tex="\dfrac{dy}{dx}=\dfrac{-x}{1+y^2}" />{' '}
            with the condition <Katex tex="y(-1)=1" />. Express your answer in the form{' '}
            <Katex tex="ay^3+by+cx^2+d=0" />, where <Katex tex="a" />, <Katex tex="b" />,{' '}
            <Katex tex="c" /> and <Katex tex="d" /> are integers.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
