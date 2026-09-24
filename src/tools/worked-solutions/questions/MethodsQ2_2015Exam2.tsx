// 2015 Mathematical Methods (CAS) — Exam 2, Section 2 Question 2 (14 marks).
// A bridge over a gorge: a parabolic frame y = 60 - 3x^2/80 and a cubic road, with the angle
// of the frame at its footing, the steepest descent of the road, the longest and shortest
// vertical supporting columns, and the area of a banner between the two curves. Question text
// transcribed from the original paper; both figures are crops of VCAA's own artwork. Solution
// is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import bridgeSrc from './meth-2015e2-q2-bridge.png'
import bannerSrc from './meth-2015e2-q2e-banner.png'

const EXAM_A: SAExaminerStats = {
  marks: [54, 14, 33],
  average: 0.8,
  comment: (
    <>
      This question was not answered well. A common incorrect response was{' '}
      <Katex tex="71^\circ" />. Some students did not convert their answer to degrees. Others
      gave the answer as <Katex tex="56^\circ" />, using{' '}
      <Katex tex="\tan(\theta)=\tfrac{ON}{OA}=\tfrac{60}{40}" />. Some found{' '}
      <Katex tex="m=3" /> but were unable to find the angle.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [36, 21, 44],
  average: 1.1,
  comment: (
    <>
      Some students did not interpret the question correctly and found the gradient of the
      straight line passing through <Katex tex="X" /> and <Katex tex="Y" />. Some solved{' '}
      <Katex tex="h'(x)=0" /> for <Katex tex="x" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [57, 5, 6, 33],
  average: 1.2,
  comment: (
    <>
      Some students did not give their answers correct to two decimal places. Some worked to
      one decimal place and others rounded their answers incorrectly. Others did not set up
      the distance formula correctly or did not use brackets correctly in the distance formula.
      Some substituted <Katex tex="u" /> into{' '}
      <Katex tex="g" /> instead of <Katex tex="h" />. A common incorrect response was{' '}
      <Katex tex="v=24.53" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [64, 6, 9, 21],
  average: 0.9,
  comment: (
    <>
      Some students did not work to the required number of decimal places or rounded
      incorrectly. Others had <Katex tex="PQ=25.23" /> and <Katex tex="MN=24.30" />.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [26, 9, 15, 49],
  average: 1.9,
  comment: (
    <>
      Some students did not work to the required number of decimal places. Others rounded to{' '}
      <Katex tex="27.00" /> instead of <Katex tex="28.00" />. Some students gave answers
      without showing any working.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [46, 54],
  average: 0.6,
  comment: (
    <>
      Some students rounded incorrectly to <Katex tex="869" /> or did not work to the required
      number of decimal places. Some gave their answers in exact form.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = 60-\tfrac3{80}x^2 \implies g'(x) = -\tfrac3{40}x" />,
    reason: <>Name the parabola <Katex tex="g" /> so it can be told apart from the road later.</>,
  },
  {
    working: <Katex display tex="g'(-40) = -\tfrac3{40}\times(-40) = 3" />,
    reason: <>The gradient of the frame at the footing <Katex tex="A(-40,0)" />. It is positive because the frame climbs to the right from <Katex tex="A" />.</>,
  },
  {
    working: <Katex display tex="\tan(\theta) = 3" />,
    reason: <>The angle a line makes with the horizontal has tangent equal to its gradient — the report notes students who found <Katex tex="m=3" /> but could not turn it into an angle.</>,
  },
  {
    working: <Katex display tex="\theta = \tan^{-1}(3) = 71.565\ldots^\circ" />,
    reason: <>Make sure the CAS is in degree mode, or convert from <Katex tex="1.249" /> radians.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta \approx 72^\circ}" />,
    reason: <>To the nearest degree — <Katex tex="71^\circ" /> (truncating rather than rounding) was a common incorrect response. Sensible: the frame rises steeply from its footing, three units up for every one across.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = \tfrac{x^3}{25600}-\tfrac3{16}x+35" />,
    reason: <>The road. "Slope" means the gradient <Katex tex="h'(x)" />, so the question is asking for an extreme value of the <em>derivative</em>, not of <Katex tex="h" />.</>,
  },
  {
    working: <Katex display tex="h'(x) = \tfrac{3x^2}{25600}-\tfrac3{16}" />,
    reason: <>This is itself a parabola in <Katex tex="x" />, opening upwards.</>,
  },
  {
    working: <Katex display tex="h''(x) = \tfrac{6x}{25600} = 0 \implies x = 0" />,
    reason: <>The steepest descent is where <Katex tex="h'" /> is smallest, so differentiate again. An upward parabola takes its minimum at its vertex, which here sits on the <Katex tex="y" />-axis.</>,
  },
  {
    working: <Katex display tex="\boxed{h'(0) = -\tfrac3{16}}" />,
    reason: <>So <Katex tex="m=3" /> and <Katex tex="n=16" />. Solving <Katex tex="h'(x)=0" /> instead finds where the road is flat — the two ends <Katex tex="X" /> and <Katex tex="Y" /> — which is not what was asked.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="d(x) = g(x)-h(x)" />,
    reason: <>The vertical gap between frame and road at <Katex tex="x" />. Because both columns are vertical, the gap is just a difference of <Katex tex="y" />-values — no distance formula needed.</>,
  },
  {
    working: <Katex display tex="d(x) = 25 + \tfrac3{16}x - \tfrac3{80}x^2 - \tfrac{x^3}{25600}" />,
    reason: <>Subtracting and collecting.</>,
  },
  {
    working: <Cas fn="solve">solve(d/dx(d(x)) = 0, x) | 0 ≤ x ≤ 40</Cas>,
    reason: <>The gap is greatest where <Katex tex="d'(x)=0" />; restricting to the bridge picks out <Katex tex="M" /> rather than the other root at <Katex tex="x\approx-642" />. By hand, <Katex tex="d'(x)=\tfrac3{16}-\tfrac{3}{40}x-\tfrac{3x^2}{25600}=0" /> becomes <Katex tex="x^2+640x-1600=0" />, so <Katex tex="x=-320\pm40\sqrt{65}" />.</>,
  },
  {
    working: <Katex display tex="u = 40\sqrt{65}-320 = 2.4903\ldots \approx 2.49" />,
    reason: <>The exact root, though two decimal places is all the question asks for.</>,
  },
  {
    working: <Katex display tex="v = h(2.4903\ldots) = 34.5337\ldots \approx 34.53" />,
    reason: <><Katex tex="M" /> sits on the <em>road</em>, so substitute into <Katex tex="h" />. Substituting into <Katex tex="g" /> gives <Katex tex="59.77" />, the height of <Katex tex="N" /> — an error the report names. It also lists <Katex tex="v=24.53" /> as a common incorrect response.</>,
  },
  {
    working: <Katex display tex="\boxed{M = (2.49,\ 34.53)}" />,
    reason: <>Both coordinates to two decimal places, as specified.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="w = h(-u) = h(-2.4903\ldots) = 35.4663\ldots \approx 35.47" />,
    reason: <><Katex tex="P" /> is on the road at <Katex tex="x=-u" />. The road is falling here, so <Katex tex="P" /> sits higher than <Katex tex="M" />.</>,
  },
  {
    working: <Katex display tex="g(\pm u) = 59.7674\ldots" />,
    reason: <><Katex tex="g" /> is even, so <Katex tex="Q" /> and <Katex tex="N" /> are at exactly the same height — the two columns differ only because the road is not symmetric.</>,
  },
  {
    working: <Katex display tex="MN = g(u)-h(u) = 59.7674\ldots-34.5337\ldots" />,
    reason: <><Katex tex="MN" /> is the column at <Katex tex="x=+u" />, the one placed where the gap is largest.</>,
  },
  {
    working: <Katex display tex="MN = 25.2338\ldots \approx 25.23" />,
    reason: <>Two decimal places.</>,
  },
  {
    working: <Katex display tex="\boxed{w \approx 35.47, \quad MN \approx 25.23, \quad PQ = 59.7674\ldots-35.4663\ldots \approx 24.30}" />,
    reason: <>Shorter than <Katex tex="MN" />, which is the check worth making: <Katex tex="MN" /> was <em>defined</em> as the maximum gap, so swapping the two answers must be wrong.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Cas fn="solve">solve(60 - 3x^2/80 = x^3/25600 - 3x/16 + 35, x)</Cas>,
    reason: <><Katex tex="E" /> and <Katex tex="F" /> are where the road meets the frame, so set <Katex tex="g(x)=h(x)" />.</>,
  },
  {
    working: <Katex display tex="x = -23.7067\ldots,\quad x = 27.9962\ldots,\quad x = -964.289\ldots" />,
    reason: <>A cubic equation, so three roots; the third lies far outside the <Katex tex="80" /> m span of the bridge and is discarded.</>,
  },
  {
    working: <Katex display tex="E:\ x \approx -23.71" />,
    reason: <>The left crossing, reading <Katex tex="E" /> off the diagram as the one on the negative side.</>,
  },
  {
    working: <Katex display tex="\boxed{E:\ x \approx -23.71, \qquad F:\ x \approx 28.00}" />,
    reason: <>Since <Katex tex="27.9962\ldots" /> rounds <em>up</em>, the two decimal places are both zeros — write <Katex tex="28.00" />, not <Katex tex="27.00" /> and not <Katex tex="28" />.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="A = \int_{-23.7067\ldots}^{27.9962\ldots}\bigl(g(x)-h(x)\bigr)dx" />,
    reason: <>Between <Katex tex="E" /> and <Katex tex="F" /> the frame is above the road, so the frame is the upper function. Use the unrounded terminals, not <Katex tex="-23.71" /> and <Katex tex="28.00" />.</>,
  },
  {
    working: <Cas fn="nInt">∫(60 - 3x^2/80 - (x^3/25600 - 3x/16 + 35), x, -23.7067…, 27.9962…)</Cas>,
    reason: <>Storing the roots from part e. as variables and integrating between them avoids rounding error creeping into the final figure.</>,
  },
  {
    working: <Katex display tex="\boxed{A = 869.619\ldots \approx 870\ \text{m}^2}" />,
    reason: <>To the nearest square metre. Rounding the terminals first is what produced the common answer <Katex tex="869" />.</>,
  },
]

export default function MethodsQ2_2015Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (14 marks)</p>
        <p>
          A city is located on a river that runs through a gorge. The gorge is 80 m across,
          40 m high on one side and 30 m high on the other side. A bridge is to be built that
          crosses the river and the gorge. A diagram for the design of the bridge is shown
          below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={bridgeSrc}
            alt="A parabolic bridge frame from A(-40, 0) up to a peak of 60 and down to B(40, 0), with the road running from X(-40, 40) on the left clifftop to Y(40, 30) on the right, crossing the frame at E and F, two vertical columns PQ and MN joining road to frame near the y-axis, and the angle theta at A between the frame and the river — from the original 2015 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
        <p>
          The main frame of the bridge has the shape of a parabola. The parabolic frame is
          modelled by <Katex tex="y = 60-\tfrac3{80}x^2" /> and is connected to concrete pads
          at <Katex tex="B(40,0)" /> and <Katex tex="A(-40,0)" />. The road across the gorge is
          modelled by a cubic polynomial function.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Tangent Angle"
        marks={2}
        statement={
          <>
            Find the angle, <Katex tex="\theta" />, between the tangent to the parabolic frame
            and the horizontal at the point <Katex tex="A(-40,0)" /> to the nearest degree.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        The road from <Katex tex="X" /> to <Katex tex="Y" /> across the gorge has gradient zero
        at <Katex tex="X(-40,40)" /> and at <Katex tex="Y(40,30)" />, and has equation{' '}
        <Katex tex="y = \tfrac{x^3}{25600}-\tfrac3{16}x+35" />.
      </div>

      <PartCard
        letter="b"
        topic="Maximum Gradient"
        marks={2}
        statement={
          <>
            Find the maximum downwards slope of the road. Give your answer in the form{' '}
            <Katex tex="-\dfrac mn" />, where <Katex tex="m" /> and <Katex tex="n" /> are
            positive integers.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        Two vertical supporting columns, <Katex tex="MN" /> and <Katex tex="PQ" />, connect the
        road with the parabolic frame. The supporting column, <Katex tex="MN" />, is at the point
        where the vertical distance between the road and the parabolic frame is a maximum.
      </div>

      <PartCard
        letter="c"
        topic="Coordinates"
        marks={3}
        statement={
          <>
            Find the coordinates <Katex tex="(u,v)" /> of the point <Katex tex="M" />, stating
            your answers correct to two decimal places.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        The second supporting column, <Katex tex="PQ" />, has its lowest point at{' '}
        <Katex tex="P(-u,w)" />.
      </div>

      <PartCard
        letter="d"
        topic="Coordinates"
        marks={3}
        statement={
          <>
            Find, correct to two decimal places, the value of <Katex tex="w" /> and the lengths
            of the supporting columns <Katex tex="MN" /> and <Katex tex="PQ" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          For the opening of the bridge, a banner is erected on the bridge, as shown by the
          shaded region in the diagram below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={bannerSrc}
            alt="The parabolic frame and the road, with the region between them shaded from E on the left to F on the right — from the original 2015 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard
        letter="e"
        topic="Intersections"
        marks={3}
        statement={
          <>
            Find the <Katex tex="x" />-coordinates, correct to two decimal places, of{' '}
            <Katex tex="E" /> and <Katex tex="F" />, the points at which the road meets the
            parabolic frame of the bridge.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Area Between Curves"
        marks={1}
        statement={
          <>
            Find the area of the banner (shaded region), giving your answer to the nearest
            square metre.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
