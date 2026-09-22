// 2023 Specialist Mathematics — Exam 2, Section B Question 1 (10 marks). A piecewise walking
// track joined smoothly, and an elliptical return path whose arc length is wanted. Question
// text transcribed from the original paper; the stem figure is a crop of VCAA's own artwork
// and the completed sketch is ours. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import trackSrc from './spec-2023e2-q1-track.png'
import sketchSrc from './spec-2023e2-q1e-sketch.png'

const EXAM_A: SAExaminerStats = { marks: [22, 78], average: 0.8, comment: <>This question was answered well.</> }

const EXAM_B: SAExaminerStats = {
  marks: [27, 13, 61],
  average: 1.4,
  comment: (
    <>
      Most students recognised that they needed to evaluate the derivative of both component
      functions at <Katex tex="x=1" />. Some students showed only that the functions met at
      the point without showing that they joined smoothly.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = { marks: [8, 92], average: 0.9 }
const EXAM_CII: SAExaminerStats = { marks: [9, 91], average: 0.9 }

const EXAM_D: SAExaminerStats = {
  marks: [11, 8, 81],
  average: 1.7,
  comment: (
    <>
      This was generally well done. A small proportion of students (correctly) expressed{' '}
      <Katex tex="y" /> explicitly as a function of <Katex tex="x" /> in the first quadrant.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [78, 22],
  average: 0.2,
  comment: (
    <>
      The quarter ellipse was often sketched without sufficient accuracy. While the curves
      drawn mostly connected point <Katex tex="D" /> to the origin, they were often not
      vertical at the origin and horizontal at <Katex tex="D" />.
    </>
  ),
}

const EXAM_FI: SAExaminerStats = {
  marks: [34, 66],
  average: 0.7,
  comment: (
    <>
      The most frequent error was to use terminals 0 and <Katex tex="2\pi" />. A variety of
      correct equivalent forms of the integrand were seen.
    </>
  ),
}

const EXAM_FII: SAExaminerStats = { marks: [34, 66], average: 0.7 }

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="C(1,0) \text{ lies on } y = -x(x+a)^2: \quad 0 = -1(1+a)^2" />,
    reason: 'The first branch must pass through C.',
  },
  {
    working: <Katex display tex="(1+a)^2 = 0 \implies \boxed{a = -1} \ \checkmark" />,
    reason: 'A repeated root, which is also why the curve touches the axis at C rather than crossing it.',
  },
  {
    working: <Katex display tex="C(1,0) \text{ lies on } y = e^{x-1}-x+b: \quad 0 = e^0-1+b" />,
    reason: 'And so must the second branch, or the track would have a gap.',
  },
  {
    working: <Katex display tex="0 = 1-1+b \implies \boxed{b = 0} \ \checkmark" />,
    reason: 'Both constants follow from the single point C.',
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <>
        <p className="text-[13.5px] mb-1">“Smoothly” means:</p>
        <Katex display tex="\text{the two gradients must agree at } x=1" />
      </>
    ),
    reason: 'The functions already meet there (part a.); showing that is not enough on its own, and the report says many students stopped there.',
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left[-x(x-1)^2\right] = -(x-1)^2-2x(x-1) = -(x-1)(3x-1)" />,
    reason: 'Product rule, then factorising out the common (x − 1).',
  },
  {
    working: <Katex display tex="\text{At } x=1: \quad -(0)(2) = 0" />,
    reason: 'The left branch arrives flat.',
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left[e^{x-1}-x\right] = e^{x-1}-1, \quad \text{at } x=1: \ e^0-1 = 0" />,
    reason: 'And the right branch leaves flat.',
  },
  {
    working: <Katex display tex="\boxed{\text{Both gradients are } 0 \text{ at } C, \text{ so the curves join smoothly.}}" />,
    reason: 'State the conclusion — the two zeros are the evidence, not the answer.',
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = -(x-1)(3x-1) = 0 \implies x = \frac13 \ \text{ or } \ x = 1" />,
    reason: <>From part b. <Katex tex="x=1" /> is the smooth join at C, so the turning point A is the other one.</>,
  },
  {
    working: <Katex display tex="f\!\left(\frac13\right) = -\frac13\left(\frac13-1\right)^2 = -\frac13\cdot\frac49" />,
    reason: 'Substituting back.',
  },
  {
    working: <Katex display tex="\boxed{A\left(\tfrac13,\ -\tfrac{4}{27}\right)}" />,
    reason: <>About <Katex tex="(0.33,-0.15)" />, matching the dip in the printed diagram.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = -x(x-1)^2 = -x^3+2x^2-x" />,
    reason: 'Expanding makes the second derivative immediate.',
  },
  {
    working: <Katex display tex="f''(x) = -6x+4 = 0 \implies x = \frac23" />,
    reason: <>A point of inflection needs <Katex tex="f''=0" /> and a change of concavity; since <Katex tex="f''" /> is linear, it changes sign here.</>,
  },
  {
    working: <Katex display tex="f\!\left(\frac23\right) = -\frac23\left(-\frac13\right)^2 = -\frac23\cdot\frac19" />,
    reason: 'Substituting.',
  },
  {
    working: <Katex display tex="\boxed{B\left(\tfrac23,\ -\tfrac{2}{27}\right)}" />,
    reason: <>Between A and C, as the diagram shows.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="x = 2\cos(t)+2 \implies \cos(t) = \frac{x-2}{2}" />,
    reason: 'Isolate each trigonometric function.',
  },
  {
    working: <Katex display tex="y = (e-2)\sin(t) \implies \sin(t) = \frac{y}{e-2}" />,
    reason: 'Same for the other component.',
  },
  {
    working: <Katex display tex="\cos^2(t)+\sin^2(t) = 1" />,
    reason: 'The Pythagorean identity is what eliminates the parameter.',
  },
  {
    working: <Katex display tex="\boxed{\frac{(x-2)^2}{4}+\frac{y^2}{(e-2)^2} = 1}" />,
    reason: <>An ellipse centred at <Katex tex="(2,0)" /> with semi-axes 2 and <Katex tex="e-2\approx0.718" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="t = \frac\pi2: \ (x,y) = (2,\ e-2) = D; \qquad t = \pi: \ (x,y) = (0,\ 0) = O" />,
    reason: <>The domain <Katex tex="\left[\tfrac\pi2,\pi\right]" /> traces exactly the second quadrant of the ellipse — a quarter, from D round to O.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}\bigg|_{t=\pi/2} = \frac{(e-2)\cos(t)}{-2\sin(t)}\bigg|_{t=\pi/2} = 0" />,
    reason: <>So the path leaves <Katex tex="D" /> <em>horizontally</em> — it is the top of the ellipse.</>,
  },
  {
    working: <Katex display tex="t\to\pi: \ \frac{dy}{dx}\to\infty" />,
    reason: <>And it arrives at <Katex tex="O" /> <em>vertically</em>, the left end of the major axis. The report says most sketches got neither of these right.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="L = \int_{t_1}^{t_2}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\;dt" />,
    reason: 'The parametric arc-length formula.',
  },
  {
    working: <Katex display tex="\frac{dx}{dt} = -2\sin(t), \qquad \frac{dy}{dt} = (e-2)\cos(t)" />,
    reason: 'Differentiating each component.',
  },
  {
    working: <Katex display tex="\boxed{L = \int_{\frac\pi2}^{\pi}\sqrt{4\sin^2(t)+(e-2)^2\cos^2(t)}\;dt}" />,
    reason: <>The terminals are the <em>parameter</em> values that give D and O — not 0 and <Katex tex="2\pi" />, which would trace the whole ellipse.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: (
      <Cas fn="nInt">
        nInt(√(4·sin(t)²+(e−2)²·cos(t)²), t, π/2, π)
      </Cas>
    ),
    reason: 'No elementary antiderivative — elliptic arc length never has one — so integrate numerically.',
  },
  {
    working: <Katex display tex="\boxed{L \approx 2.255 \ \text{km}}" />,
    reason: <>Three decimal places. A quarter of a circle of radius 2 would be <Katex tex="\pi\approx3.14" /> km, and this ellipse is much flatter, so 2.255 is the right order.</>,
  },
]

export default function SpecialistQ1_2023Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (10 marks)</p>
        <p>
          Viewed from above, a scenic walking track from point <Katex tex="O" /> to point{' '}
          <Katex tex="D" /> is shown below. Its shape is given by
        </p>
        <div className="py-1">
          <Katex
            display
            tex="f(x)=\begin{cases}-x(x+a)^2 & 0\le x\le1\\[2pt]e^{x-1}-x+b & 1<x\le2\end{cases}"
          />
        </div>
        <p>
          The minimum turning point of section <Katex tex="OABC" /> occurs at point{' '}
          <Katex tex="A" />. Point <Katex tex="B" /> is a point of inflection and the curves
          meet at point <Katex tex="C(1,0)" />. Distances are measured in kilometres.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={trackSrc}
            alt="A curve on a grid dipping just below the x-axis between O and C(1, 0), through marked points A and B, then rising steeply to D at x = 2 — from the original 2023 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            "Meet smoothly" is two conditions, not one: the same value <em>and</em> the same
            gradient. Part a. supplies the first; part b. exists entirely to make you check
            the second.
          </p>
          <p>
            The return path is a quarter of an ellipse, and the parameter interval{' '}
            <Katex tex="\left[\tfrac\pi2,\pi\right]" /> is doing real work — it decides the
            terminals in part f. and the shape in part e. Sketching it well means getting the
            tangents right at both ends: horizontal at <Katex tex="D" />, vertical at{' '}
            <Katex tex="O" />.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={<>Show that <Katex tex="a=-1" /> and <Katex tex="b=0" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={<>Verify that the two curves meet smoothly at point <Katex tex="C" />.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c.i"
        marks={1}
        statement={<>Find the coordinates of point <Katex tex="A" />.</>}
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        marks={1}
        statement={<>Find the coordinates of point <Katex tex="B" />.</>}
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The return track from point <Katex tex="D" /> to point <Katex tex="O" /> follows an
          elliptical path given by <Katex tex="x=2\cos(t)+2" />,{' '}
          <Katex tex="y=(e-2)\sin(t)" />, where{' '}
          <Katex tex="t\in\left[\dfrac\pi2,\pi\right]" />.
        </p>
      </div>

      <PartCard
        letter="d"
        marks={2}
        statement={<>Find the Cartesian equation of the elliptical path.</>}
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        marks={1}
        statement={
          <>
            Sketch the elliptical path from <Katex tex="D" /> to <Katex tex="O" /> on the
            diagram above.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={sketchSrc}
            alt="The walking track in blue dipping below the axis through A and B to C(1, 0) and rising to D(2, e − 2), with the orange quarter ellipse arcing back from D horizontally, over the top and down vertically into the origin"
            className="w-full max-w-[500px]"
          />
        </div>
      </PartCard>

      <PartCard
        letter="f.i"
        marks={1}
        statement={
          <>
            Write down a definite integral in terms of <Katex tex="t" /> that gives the length
            of the elliptical path from <Katex tex="D" /> to <Katex tex="O" />.
          </>
        }
        examinerReport={EXAM_FI}
      >
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard
        letter="f.ii"
        marks={1}
        statement={
          <>
            Find the length of the elliptical path from <Katex tex="D" /> to{' '}
            <Katex tex="O" />. Give your answer in kilometres correct to three decimal places.
          </>
        }
        examinerReport={EXAM_FII}
      >
        <WorkingTable rows={ROWS_FII} />
      </PartCard>
    </div>
  )
}
