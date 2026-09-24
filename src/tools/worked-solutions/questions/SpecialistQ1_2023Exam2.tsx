// 2023 Specialist Mathematics — Exam 2, Section B Question 1 (10 marks). A piecewise walking
// track joined smoothly, and an elliptical return path whose arc length is wanted. Question
// text transcribed from the original paper; the stem figure is a crop of VCAA's own artwork
// (300 dpi), and the part e. answer is an SVG overlay on that crop (never a redrawing of it).
// Calibration measured from the crop's own gridlines: origin at (286.5, 796.5), 354.75 px per
// unit across and 635.5 px per unit up; checked with a PIL composite — the calibrated
// f(x) lies exactly on VCAA's printed track. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import trackSrc from './spec-2023e2-q1-track.png'

const OX = 286.5
const OY = 796.5
const SX = 354.75
const SY = 635.5
const toX = (x: number) => OX + x * SX
const toY = (y: number) => OY - y * SY
const ORANGE = '#f97316'
const ELLIPSE = Array.from({ length: 241 }, (_, i) => {
  const t = Math.PI / 2 + (Math.PI / 2) * (i / 240)
  return `${i === 0 ? 'M' : 'L'} ${toX(2 * Math.cos(t) + 2)} ${toY((Math.E - 2) * Math.sin(t))}`
}).join(' ')

// Part e.: the elliptical return path drawn on VCAA's own diagram of the track.
function EllipseOverlay() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[460px]">
        <img src={trackSrc} alt="VCAA's diagram of the track, with the answer drawn over it: the quarter ellipse from D(2, e − 2) arcing back to the origin, leaving D horizontally and arriving at O vertically" className="w-full block" />
        <svg viewBox="0 0 1320 1036" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d={ELLIPSE} fill="none" stroke={ORANGE} strokeWidth={6} />
        </svg>
      </div>
    </div>
  )
}

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
      drawn mostly connected point <Katex tex="D" /> to the origin, the quarter ellipse curves
      were often not vertical at the origin and horizontal at <Katex tex="D" />.
    </>
  ),
}

const EXAM_FI: SAExaminerStats = {
  marks: [34, 66],
  average: 0.7,
  comment: (
    <>
      The most frequent error was to use terminals 0 and 2. A variety of correct equivalent
      forms of the integrand were seen.
    </>
  ),
}

const EXAM_FII: SAExaminerStats = {
  marks: [34, 66],
  average: 0.7,
  comment: <>Most students who answered Question 1fi. correctly were successful here.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="C(1,0) \text{ lies on } y = -x(x+a)^2: \quad 0 = -1(1+a)^2" />,
    reason: <>The first branch must pass through C.</>,
  },
  {
    working: <Katex display tex="(1+a)^2 = 0 \implies \boxed{a = -1}" />,
    reason: <>A repeated root, which is also why the curve touches the axis at C rather than crossing it.</>,
  },
  {
    working: <Katex display tex="C(1,0) \text{ lies on } y = e^{x-1}-x+b: \quad 0 = e^0-1+b" />,
    reason: <>And so must the second branch, or the track would have a gap.</>,
  },
  {
    working: <Katex display tex="0 = 1-1+b \implies \boxed{b = 0}" />,
    reason: <>Both constants follow from the single point C. As required.</>,
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
    reason: <>The functions already meet there (part a.); showing that is not enough on its own — the report notes some students showed only that the functions met.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left[-x(x-1)^2\right] = -(x-1)^2-2x(x-1) = -(x-1)(3x-1)" />,
    reason: <>Product rule, then factorising out the common (x − 1).</>,
  },
  {
    working: <Katex display tex="\text{At } x=1: \quad -(0)(2) = 0" />,
    reason: <>The left branch arrives flat.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left[e^{x-1}-x\right] = e^{x-1}-1, \quad \text{at } x=1: \ e^0-1 = 0" />,
    reason: <>And the right branch leaves flat.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Both gradients are } 0 \text{ at } C, \text{ so the curves join smoothly.}}" />,
    reason: <>State the conclusion — the two zeros are the evidence, not the answer. As required.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = -(x-1)(3x-1) = 0 \implies x = \frac13 \ \text{ or } \ x = 1" />,
    reason: <>From part b. <Katex tex="x=1" /> is the smooth join at C, so the turning point A is the other one.</>,
  },
  {
    working: <Katex display tex="f\!\left(\frac13\right) = -\frac13\left(\frac13-1\right)^2 = -\frac13\cdot\frac49" />,
    reason: <>Substituting back.</>,
  },
  {
    working: <Katex display tex="\boxed{A\left(\tfrac13,\ -\tfrac{4}{27}\right)}" />,
    reason: <>About <Katex tex="(0.33,-0.15)" />, matching the dip in the printed diagram.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = -x(x-1)^2 = -x^3+2x^2-x" />,
    reason: <>Expanding makes the second derivative immediate.</>,
  },
  {
    working: <Katex display tex="f''(x) = -6x+4 = 0 \implies x = \frac23" />,
    reason: <>A point of inflection needs <Katex tex="f''=0" /> and a change of concavity; since <Katex tex="f''" /> is linear, it changes sign here.</>,
  },
  {
    working: <Katex display tex="f\!\left(\frac23\right) = -\frac23\left(-\frac13\right)^2 = -\frac23\cdot\frac19" />,
    reason: <>Substituting.</>,
  },
  {
    working: <Katex display tex="\boxed{B\left(\tfrac23,\ -\tfrac{2}{27}\right)}" />,
    reason: <>Between A and C, as the diagram shows.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="x = 2\cos(t)+2 \implies \cos(t) = \frac{x-2}{2}" />,
    reason: <>Isolate each trigonometric function.</>,
  },
  {
    working: <Katex display tex="y = (e-2)\sin(t) \implies \sin(t) = \frac{y}{e-2}" />,
    reason: <>Same for the other component.</>,
  },
  {
    working: <Katex display tex="\cos^2(t)+\sin^2(t) = 1" />,
    reason: <>The Pythagorean identity is what eliminates the parameter.</>,
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
    reason: <>And it arrives at <Katex tex="O" /> <em>vertically</em>, the left end of the major axis. The report notes the curves drawn were often not vertical at the origin and horizontal at D.</>,
  },
  {
    working: <EllipseOverlay />,
    reason: <>Drawn on the printed diagram, as the question asks: from <Katex tex="D" /> round to <Katex tex="O" />, horizontal at <Katex tex="D" /> and vertical at <Katex tex="O" />.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="L = \int_{t_1}^{t_2}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\;dt" />,
    reason: <>The parametric arc-length formula.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dt} = -2\sin(t), \qquad \frac{dy}{dt} = (e-2)\cos(t)" />,
    reason: <>Differentiating each component.</>,
  },
  {
    working: <Katex display tex="\boxed{L = \int_{\frac\pi2}^{\pi}\sqrt{4\sin^2(t)+(e-2)^2\cos^2(t)}\;dt}" />,
    reason: <>The terminals are the <em>parameter</em> values that give D and O. The report notes the most frequent error was terminals 0 and 2 — the <Katex tex="x" />-values of O and D, not the <Katex tex="t" />-values.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: (
      <Cas fn="nInt">
        nInt(√(4·sin(t)²+(e−2)²·cos(t)²), t, π/2, π)
      </Cas>
    ),
    reason: <>Elliptic arc length has no elementary antiderivative in general, so integrate numerically.</>,
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
            tex="f(x)=\begin{cases}-x(x+a)^2, & 0\le x\le1\\[2pt]e^{x-1}-x+b, & 1<x\le2.\end{cases}"
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
        topic="Find Parameters"
        marks={1}
        statement={<>Show that <Katex tex="a=-1" /> and <Katex tex="b=0" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Smooth Join"
        marks={2}
        statement={<>Verify that the two curves meet <b>smoothly</b> at point <Katex tex="C" />.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Coordinates"
        marks={1}
        statement={<>Find the coordinates of point <Katex tex="A" />.</>}
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Coordinates"
        marks={1}
        statement={<>Find the coordinates of point <Katex tex="B" />.</>}
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The return track from point <Katex tex="D" /> to point <Katex tex="O" /> follows an
          elliptical path given by
        </p>
        <Katex display tex="x=2\cos(t)+2,\ y=(e-2)\sin(t), \ \text{where } t\in\left[\frac\pi2,\pi\right]." />
      </div>

      <PartCard
        letter="d"
        topic="Cartesian Equation"
        marks={2}
        statement={<>Find the Cartesian equation of the elliptical path.</>}
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Sketch Path"
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
      </PartCard>

      <PartCard
        letter="f.i"
        topic="Arc Length"
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
        topic="Arc Length"
        marks={1}
        statement={
          <>
            Find the length of the elliptical path from <Katex tex="D" /> to{' '}
            <Katex tex="O" />.
            <br />
            Give your answer in kilometres correct to three decimal places.
          </>
        }
        examinerReport={EXAM_FII}
      >
        <WorkingTable rows={ROWS_FII} />
      </PartCard>
    </div>
  )
}
