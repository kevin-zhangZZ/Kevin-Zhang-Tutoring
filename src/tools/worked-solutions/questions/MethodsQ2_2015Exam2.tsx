// 2015 Mathematical Methods (CAS) — Exam 2, Section 2 Question 2 (14 marks).
// A bridge over a gorge: a parabolic frame y = 60 - 3x^2/80 and a cubic road, with the angle
// of the frame at its footing, the steepest descent of the road, the longest and shortest
// vertical supporting columns, and the area of a banner between the two curves. Question text
// transcribed from the original paper; both figures are crops of VCAA's own artwork. Solution
// is original. Numbers checked with sympy against the VCAA examination report.
// Interactives (parts under 40% full marks): a. chord AP swinging to the tangent at A (the
// report's 56° error); c. sliding vertical column with the gap curve d(x) (M is on the road).
// d. (21%) skipped: its errors were rounding and swapping MN/PQ, which the PQ < MN check in the
// working covers; the part c. widget already shows the column at its maximum.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import bridgeSrc from './meth-2015e2-q2-bridge.png'
import bannerSrc from './meth-2015e2-q2e-banner.png'

const ChordWidget = lazyWidget(() => import('../interactives/meth-2015e2-q2a-chord-to-tangent'))
const GapWidget = lazyWidget(() => import('../interactives/meth-2015e2-q2c-gap'))

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
    reason: <>The tangent's gradient comes from the derivative. Name the parabola <Katex tex="g" /> to tell it apart from the road later.</>,
  },
  {
    working: <Katex display tex="g'(-40) = -\tfrac3{40}\times(-40) = 3" />,
    reason: <>The gradient of the tangent at the footing <Katex tex="A(-40,0)" />. Positive, because the frame climbs to the right from <Katex tex="A" />.</>,
  },
  {
    working: <Katex display tex="\tan(\theta) = 3" />,
    reason: <>A line's gradient is the tangent of the angle it makes with the horizontal: <Katex tex="m=\tan(\theta)" />.</>,
    more: <>The report notes students who found <Katex tex="m=3" /> but could not turn it into an angle. Picture a right-angled triangle under the tangent line: it rises <Katex tex="3" /> for every <Katex tex="1" /> across, so opposite over adjacent is <Katex tex="\tfrac31" />. Others used <Katex tex="\tan(\theta)=\tfrac{60}{40}" />, the line from <Katex tex="A" /> up to the top of the frame at <Katex tex="(0,60)" />. That line is a chord, not the tangent: it has gradient <Katex tex="1.5" /> and makes an angle of about <Katex tex="56^\circ" />. The parabola is steepest at its feet, so the tangent at <Katex tex="A" /> is steeper than any chord from <Katex tex="A" />.</>,
  },
  {
    working: <Katex display tex="\theta = \tan^{-1}(3) = 71.565\ldots^\circ" />,
    reason: <>Make sure the CAS is in degree mode, or convert from <Katex tex="1.249" /> radians by multiplying by <Katex tex="\tfrac{180}{\pi}" />.</>,
    more: <>The report notes students who did not convert their answer to degrees. The question asks for the angle to the nearest degree, so a radian value does not answer it.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta \approx 72^\circ}" />,
    reason: <>To the nearest degree: <Katex tex="71.565\ldots" /> rounds <em>up</em>.</>,
    more: <><Katex tex="71^\circ" /> was the report's common incorrect response, most likely from cutting off the decimals instead of rounding. Check: a gradient of <Katex tex="3" /> (three up for one across) is much steeper than <Katex tex="45^\circ" /> (gradient <Katex tex="1" />), so an angle in the seventies is sensible.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = \tfrac{x^3}{25600}-\tfrac3{16}x+35" />,
    reason: <>"Slope" means the gradient <Katex tex="h'(x)" />, so we want the most negative value of the <em>derivative</em>, not of <Katex tex="h" />.</>,
  },
  {
    working: <Katex display tex="h'(x) = \tfrac{3x^2}{25600}-\tfrac3{16}" />,
    reason: <>This is itself a parabola in <Katex tex="x" />, opening upwards, so it has a minimum value.</>,
  },
  {
    working: <Katex display tex="h''(x) = \tfrac{6x}{25600} = 0 \implies x = 0" />,
    reason: <>The steepest descent is where <Katex tex="h'" /> is smallest: at the vertex of that parabola, where its own derivative <Katex tex="h''" /> is zero.</>,
  },
  {
    working: <Katex display tex="\boxed{h'(0) = -\tfrac3{16}}" />,
    reason: <>So <Katex tex="m=3" /> and <Katex tex="n=16" />: the road is steepest at <Katex tex="x=0" />, midway across.</>,
    more: <>Check the ends: <Katex tex="h'(\pm40)=\tfrac{3\times1600}{25600}-\tfrac3{16}=0" />, the flat road at <Katex tex="X" /> and <Katex tex="Y" /> given in the question, so <Katex tex="-\tfrac3{16}" /> is the most negative slope anywhere on the road. The report names two errors. Solving <Katex tex="h'(x)=0" /> finds those flat ends, not the steepest point. The gradient of the straight line through <Katex tex="X" /> and <Katex tex="Y" />, <Katex tex="\tfrac{30-40}{80}=-\tfrac18" />, is the road's <em>average</em> slope; in the middle the road is steeper than that, since <Katex tex="\tfrac3{16}>\tfrac18" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="d(x) = g(x)-h(x)" />,
    reason: <><Katex tex="MN" /> is where the vertical gap between the frame (top) and road (bottom) is greatest, so write the gap as a function: top minus bottom.</>,
    more: <>This is the "distance formula" the report refers to. Because the columns are vertical, it is just a difference of <Katex tex="y" />-values at the same <Katex tex="x" />, not the distance between two points. Bracket all of <Katex tex="h" />: <Katex tex="60-\tfrac3{80}x^2-\bigl(\tfrac{x^3}{25600}-\tfrac3{16}x+35\bigr)" />. Leaving the brackets out flips the signs of the last two terms, an error the report names.</>,
  },
  {
    working: <Katex display tex="d(x) = 25 + \tfrac3{16}x - \tfrac3{80}x^2 - \tfrac{x^3}{25600}" />,
    reason: <>Expanding the bracket: <Katex tex="-\bigl(-\tfrac3{16}x\bigr)=+\tfrac3{16}x" /> and <Katex tex="60-35=25" />.</>,
  },
  {
    working: <Cas fn="solve">solve(d/dx(d(x)) = 0, x) | -40 ≤ x ≤ 40</Cas>,
    reason: <>Define <Katex tex="d(x)" /> on CAS first. The gap is greatest where <Katex tex="d'(x)=0" />; restricting to the bridge discards the other root, near <Katex tex="x=-642" />.</>,
    more: <>By hand: <Katex tex="d'(x)=\tfrac3{16}-\tfrac{3}{40}x-\tfrac{3x^2}{25600}=0" />; multiplying by <Katex tex="-\tfrac{25600}{3}" /> gives <Katex tex="x^2+640x-1600=0" />, so <Katex tex="x=-320\pm40\sqrt{65}" />. It is a maximum, not a minimum: <Katex tex="d''(x)=-\tfrac3{40}-\tfrac{6x}{25600}" /> is negative at <Katex tex="x\approx2.49" />. It also fits the picture: the gap is <Katex tex="0" /> at <Katex tex="E" /> and <Katex tex="F" /> and about <Katex tex="25" /> m here.</>,
  },
  {
    working: <Katex display tex="u = 40\sqrt{65}-320 = 2.4903\ldots \approx 2.49" />,
    reason: <>The <Katex tex="x" />-coordinate of <Katex tex="M" />, to two decimal places. Keep the full value stored for the next line.</>,
  },
  {
    working: <Katex display tex="v = h(2.4903\ldots) = 34.5337\ldots \approx 34.53" />,
    reason: <><Katex tex="M" /> is the bottom of the column, on the <em>road</em>, so substitute into <Katex tex="h" />, not <Katex tex="g" />.</>,
    more: <>Substituting into <Katex tex="g" /> gives <Katex tex="59.77" />, the height of <Katex tex="N" /> at the top of the column: an error the report names. The report also lists <Katex tex="v=24.53" /> as a common incorrect response. A quick check rules out answers like that: the road only falls from <Katex tex="X(-40,40)" /> to <Katex tex="Y(40,30)" /> (<Katex tex="h'(x)=\tfrac{3x^2}{25600}-\tfrac3{16}" /> is an upward parabola that is <Katex tex="0" /> at <Katex tex="x=\pm40" />, so <Katex tex="h'(x)\le0" /> between them), so every point on the road, <Katex tex="M" /> included, is between heights <Katex tex="30" /> and <Katex tex="40" />. Nor is <Katex tex="v" /> the gap <Katex tex="d(u)\approx25.23" />; that is the length of <Katex tex="MN" />, asked for in part d.</>,
  },
  {
    working: <Katex display tex="\boxed{M = (2.49,\ 34.53)}" />,
    reason: <>Both coordinates to two decimal places, as specified.</>,
    more: <>The report notes students who worked to one decimal place or rounded incorrectly. Round only at the end: <Katex tex="2.4903\ldots" /> and <Katex tex="34.5337\ldots" /> both round down here.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} w &= h(-u) = h(-2.4903\ldots) \\ &= 35.4663\ldots \approx 35.47 \end{aligned}" />,
    reason: <><Katex tex="P" /> is on the road at <Katex tex="x=-u" />. The road is falling here, so <Katex tex="P" /> sits higher than <Katex tex="M" />.</>,
  },
  {
    working: <Katex display tex="g(\pm u) = 59.7674\ldots" />,
    reason: <>The tops <Katex tex="N" /> and <Katex tex="Q" /> are on the frame. <Katex tex="g" /> is even, so they are at exactly the same height.</>,
  },
  {
    working: <Katex display tex="MN = g(u)-h(u) = 59.7674\ldots-34.5337\ldots" />,
    reason: <>Column length is frame minus road. <Katex tex="MN" /> is the column at <Katex tex="x=+u" />, where the gap is largest.</>,
  },
  {
    working: <Katex display tex="MN = 25.2338\ldots \approx 25.23" />,
    reason: <>Two decimal places.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} PQ &= g(-u)-h(-u) \\ &= 59.7674\ldots-35.4663\ldots \end{aligned}" />,
    reason: <>The same subtraction at <Katex tex="x=-u" />, where the road is higher, so the column is shorter.</>,
  },
  {
    working: <Katex display tex="PQ = 24.3011\ldots \approx 24.30" />,
    reason: <>Two decimal places; the trailing zero shows the required accuracy.</>,
  },
  {
    working: <Katex display tex="\boxed{w \approx 35.47,\ \ MN \approx 25.23,\ \ PQ \approx 24.30}" />,
    reason: <><Katex tex="PQ" /> is shorter than <Katex tex="MN" />, as it must be: <Katex tex="MN" /> was <em>defined</em> as the longest gap.</>,
    more: <>The report notes students who had <Katex tex="PQ=25.23" /> and <Katex tex="MN=24.30" />, the two lengths swapped. The check above catches it. It also notes students who did not work to the required number of decimal places or rounded incorrectly: keep <Katex tex="u" />, <Katex tex="h(\pm u)" /> and <Katex tex="g(u)" /> stored at full accuracy and round each final answer once.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Cas fn="solve">solve(60 - 3x^2/80 = x^3/25600 - 3x/16 + 35, x)</Cas>,
    reason: <><Katex tex="E" /> and <Katex tex="F" /> are where the road meets the frame, so set <Katex tex="g(x)=h(x)" />.</>,
    more: <>Write this equation down: the report notes students who gave answers without showing any working, and this equation is the working.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x &= -23.7067\ldots,\quad x = 27.9962\ldots, \\ x &= -964.289\ldots \end{aligned}" />,
    reason: <>A cubic equation, so up to three roots; the third lies far outside the bridge (<Katex tex="-40\le x\le40" />) and is discarded.</>,
  },
  {
    working: <Katex display tex="E:\ x \approx -23.71" />,
    reason: <>The left crossing: <Katex tex="E" /> is the one on the negative side in the diagram.</>,
  },
  {
    working: <Katex display tex="\boxed{E:\ x \approx -23.71, \qquad F:\ x \approx 28.00}" />,
    reason: <><Katex tex="27.9962\ldots" /> rounds <em>up</em> to <Katex tex="28.00" />; write both zeros to show two decimal places.</>,
    more: <>The report notes students who rounded to <Katex tex="27.00" /> instead of <Katex tex="28.00" />, and others who did not work to the required number of decimal places (writing just <Katex tex="28" /> is one way to lose that).</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="A = \int_{-23.7067\ldots}^{27.9962\ldots}\bigl(g(x)-h(x)\bigr)dx" />,
    reason: <>Between <Katex tex="E" /> and <Katex tex="F" /> the frame is above the road, so integrate frame minus road between the part e. crossings.</>,
  },
  {
    working: <Cas fn="nInt">∫(60 - 3x^2/80 - (x^3/25600 - 3x/16 + 35), x, -23.7067…, 27.9962…)</Cas>,
    reason: <>Store the roots from part e. as variables and integrate between them, so no rounding enters before the end.</>,
  },
  {
    working: <Katex display tex="\boxed{A = 869.619\ldots \approx 870\ \text{m}^2}" />,
    reason: <>To the nearest square metre: <Katex tex="869.6\ldots" /> rounds <em>up</em>.</>,
    more: <>The report notes students who rounded incorrectly to <Katex tex="869" />, which cuts off the decimals instead of rounding. (Even the rounded terminals <Katex tex="-23.71" /> and <Katex tex="28.00" /> give <Katex tex="869.62\ldots" />, still <Katex tex="870" />.) Some gave an exact form; the question asks for the nearest square metre, and the terminals have no neat exact form anyway (CAS gives them as decimals). Check: the banner is about <Katex tex="52" /> m wide and at most <Katex tex="25" /> m tall, and a parabola-like region covers about <Katex tex="\tfrac23" /> of its bounding box: <Katex tex="\tfrac23\times52\times25\approx867" />.</>,
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
          <img loading="lazy" decoding="async"
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
        <Explore title="The tangent at A is steeper than any line from A to the frame">
          <ChordWidget />
        </Explore>
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
        <Explore title="M is the bottom of the longest column, on the road">
          <GapWidget />
        </Explore>
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
          <img loading="lazy" decoding="async"
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
