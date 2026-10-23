// 2026 Specialist NHT — Exam 1, Question 7 (3 marks). The NHT report gives sample answers only,
// with no statistics, and no notes. Parametric curve x = t² + 1/t², y = t² − 1/t², t ≠ 0: a. dx/dt = 0
// at t = ±1 while dy/dt ≠ 0, so the only point with a vertical tangent is (2, 0); b. x² − y² = 4.
// Question text transcribed from the original paper. The graph of the curve
// (spec-2026nhte1-q7-curve.png) is this site's own explanatory figure; VCAA printed none. Answers
// checked with sympy and against the report's sample answers ((2, 0); x² − y² = 4). Since
// x = t² + 1/t² ≥ 2, the curve is only the right-hand branch (x ≥ 2) of the hyperbola; the report's
// answer gives the equation alone, so that is the boxed answer, with the restriction noted in the
// reasoning. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow } from '../QuestionParts'
import curveSrc from './spec-2026nhte1-q7-curve.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dx}{dt}=2t-\frac{2}{t^3},\qquad \frac{dy}{dt}=2t+\frac{2}{t^3}" />,
    reason: <>Write <Katex tex="\tfrac{1}{t^2}=t^{-2}" /> and use the power rule: its derivative is <Katex tex="-2t^{-3}" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}=\frac{dy/dt}{dx/dt}=\frac{2t+\frac{2}{t^3}}{2t-\frac{2}{t^3}}=\frac{t^4+1}{t^4-1}" />,
    reason: <>Chain rule for parametric curves. Multiply the top and bottom by <Katex tex="\tfrac{t^3}{2}" /> to clear the small fractions.</>,
  },
  {
    working: <Katex display tex="t^4-1=0\implies t=\pm1\quad\left(t^4+1\neq0\right)" />,
    reason: <>A vertical tangent is where the gradient is undefined: the denominator <Katex tex="\tfrac{dx}{dt}" /> is zero while the numerator is not. <Katex tex="t^4+1>0" /> always, so it&apos;s never zero. <Katex tex="t^4=1" /> has the real solutions <Katex tex="t=\pm1" />.</>,
    more: <>Physically: at <Katex tex="t=\pm1" /> the curve momentarily stops moving sideways (<Katex tex="\tfrac{dx}{dt}=0" />) but is still moving up or down (<Katex tex="\tfrac{dy}{dt}=\pm4" />), so it is heading straight up or down.</>,
  },
  {
    working: <Katex display tex="t=\pm1:\quad x=1+1=2,\quad y=1-1=0" />,
    reason: <><Katex tex="x" /> and <Katex tex="y" /> involve only <Katex tex="t^2" />, so <Katex tex="t=1" /> and <Katex tex="t=-1" /> give the same point.</>,
  },
  {
    working: <Katex display tex="\boxed{(2,\ 0)}" />,
    reason: <>One point only, even though there are two values of <Katex tex="t" />. Sanity check: <Katex tex="x=t^2+\tfrac{1}{t^2}\ge2" />, with its minimum 2 at <Katex tex="t^2=1" />. A point where <Katex tex="x" /> reaches its smallest value is the leftmost point of the curve, which is exactly where the tangent is vertical ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}x^2-y^2&=\left(t^2+\frac{1}{t^2}\right)^2-\left(t^2-\frac{1}{t^2}\right)^2\\ &=\left(t^4+2+\frac{1}{t^4}\right)-\left(t^4-2+\frac{1}{t^4}\right)\end{aligned}" />,
    reason: <>To eliminate <Katex tex="t" />, look for a combination of <Katex tex="x" /> and <Katex tex="y" /> where it cancels. Squaring <Katex tex="t^2\pm\tfrac{1}{t^2}" /> gives the same <Katex tex="t^4" /> and <Katex tex="\tfrac{1}{t^4}" /> terms in both, with cross terms <Katex tex="+2" /> and <Katex tex="-2" />, so subtract.</>,
    more: <>Another route: <Katex tex="x+y=2t^2" /> and <Katex tex="x-y=\tfrac{2}{t^2}" />, so <Katex tex="(x+y)(x-y)=4" />. The difference of two squares appears either way.</>,
  },
  {
    working: <Katex display tex="=4" />,
  },
  {
    working: <Katex display tex="\boxed{x^2-y^2=4}" />,
    reason: <>A hyperbola. Strictly, the curve is only its right-hand branch: <Katex tex="x=t^2+\tfrac{1}{t^2}\ge2" /> for every <Katex tex="t\ne0" />, while <Katex tex="y" /> takes every real value. The report&apos;s answer is the equation alone.</>,
    more: (
      <>
        <span className="block mb-2">The curve, with the vertical tangent at its leftmost point <Katex tex="(2,0)" /> from part a.:</span>
        <span className="block bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async" src={curveSrc}
            alt="This site's own graph of the right-hand branch of the hyperbola x² − y² = 4, opening to the right from its vertex (2, 0), with the vertical tangent x = 2 drawn dashed through the vertex"
            className="w-full max-w-[300px]" />
        </span>
      </>
    ),
  },
]

export default function SpecialistQ7_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (3 marks)</p>
        <p>
          A curve is described by the parametric equations <Katex tex="x=t^2+\dfrac{1}{t^2}" /> and{' '}
          <Katex tex="y=t^2-\dfrac{1}{t^2}" />, where <Katex tex="t\in R\setminus\{0\}" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Parametric Derivative"
        marks={2}
        statement={<>Find the coordinates of any points on the curve that have a vertical tangent.</>}
      >
        <Background>
          <p>
            For a curve given by <Katex tex="x(t)" /> and <Katex tex="y(t)" />, the gradient is{' '}
            <Katex tex="\tfrac{dy}{dx}=\tfrac{dy/dt}{dx/dt}" />. The tangent is <b>horizontal</b> where{' '}
            <Katex tex="\tfrac{dy}{dt}=0" /> (and <Katex tex="\tfrac{dx}{dt}\ne0" />), and <b>vertical</b> where{' '}
            <Katex tex="\tfrac{dx}{dt}=0" /> (and <Katex tex="\tfrac{dy}{dt}\ne0" />), since the gradient is then undefined.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Set dy/dx = 0 for a vertical tangent"
          working={<Katex display tex="t^4+1=0" />}
        >
          A gradient of zero is a <b>horizontal</b> tangent. This equation has no real solutions, which is a hint that it
          is the wrong one: a vertical tangent has an <b>undefined</b> gradient, so set the denominator{' '}
          <Katex tex="\tfrac{dx}{dt}" /> to zero.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="Cartesian Equation" marks={1} statement={<>Find the Cartesian equation of the curve.</>}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
