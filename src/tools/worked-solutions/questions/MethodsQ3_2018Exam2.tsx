// 2018 Mathematical Methods — Exam 2, Section B, Question 3 (11 marks). Three sine arches
// under a bridge: locating the third arch, describing the translation, the stone area, then
// an inclined second bridge and the perpendicular rod down to a tangent point. Question text
// transcribed from the original paper; all three figures are cropped directly from the
// original VCAA exam PDF, not redrawings. Answers re-derived independently in sympy and
// checked against the VCAA examination report. Solution is original. The paper's "as shown in the
// diagram on page 18" in part f. reads "above" here (the figure is above on this page).
//
// Interactive widgets: b. slide Arch 2 by c (x → x − c moves it right onto Arch 3; x + c lands on
// Arch 1); c. slide a 30 m integration window along h₁ to see why the terminals are 5 and 35 (the
// report's ∫₀³⁰ picks up a negative piece); d. gradient = rise/run = tan θ against θ and sin θ on the
// unit circle (all three round to 0.035 at π/90); e. slide along Arch 5 with its tangent and the
// gradient graph h₂′(x) until it matches tan(π/90); f. the thin right triangle P–Q–V with an
// exaggerated-angle slider, showing PQ = PV cos θ, and the report's "P on y = 5" idea giving 1.90.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import bridge1Src from './meth-2018e2-q3-bridge1.png'
import shadedSrc from './meth-2018e2-q3-shaded.png'
import bridge2Src from './meth-2018e2-q3-bridge2.png'

const TranslateWidget = lazyWidget(() => import('../interactives/meth-2018e2-q3b-translate'))
const TerminalsWidget = lazyWidget(() => import('../interactives/meth-2018e2-q3c-terminals'))
const GradientWidget = lazyWidget(() => import('../interactives/meth-2018e2-q3d-gradient-tan'))
const TangentWidget = lazyWidget(() => import('../interactives/meth-2018e2-q3e-parallel-tangent'))
const TriangleWidget = lazyWidget(() => import('../interactives/meth-2018e2-q3f-thin-triangle'))

const EXAM_A: SAExaminerStats = {
  marks: [5, 95],
  average: 1.0,
  comment: <>This question was answered well.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [22, 78],
  average: 0.8,
  comment: (
    <>
      This question was answered well. Some students wrote <Katex tex="35" /> m to the right,
      omitting translation. A few wrote to the left or <Katex tex="5" /> m to the left or
      right. Some students had a correct statement followed by an incorrect expression{' '}
      <Katex tex="x\to x-35" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [8, 8, 18, 66],
  average: 2.4,
  comment: (
    <>
      This question was answered reasonably well. There were some
      rounding errors. Some students had the correct expression but the incorrect answer.
      Others had incorrect terminals for the area of the arch, for example{' '}
      <Katex tex="\int_0^{30}h_1(x)\,dx" />. Some students left their answer as{' '}
      <Katex tex="550-\tfrac{900}{\pi}" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
  comment: (
    <>
      This question was generally well answered. Some students evaluated{' '}
      <Katex tex="\tfrac{\pi}{90}" /> or <Katex tex="\sin\!\left(\tfrac{\pi}{90}\right)" />.
      There were some rounding errors and <Katex tex="0.036" /> was sometimes given.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [46, 13, 41],
  average: 1.0,
  comment: (
    <>
      Many students were able to equate their answer to Question 3d. to{' '}
      <Katex tex="h_2'(x)" />. Some students were possibly estimating values for the
      coordinates from the graph as <Katex tex="P\,(54,5)" /> was sometimes given without
      working.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [56, 17, 8, 19],
  average: 0.9,
  comment: (
    <>
      There were a number of other approaches to this
      question. Many students were able to get the negative reciprocal of their answer to
      Question 3d. Other students incorrectly thought <Katex tex="P" /> was on the line{' '}
      <Katex tex="y=5" /> and used a trigonometric ratio to find the distance.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="h_1: [5,35], \qquad h_2: [40,70]" />,
    reason: <>Start from what the question gives you: the domains of <Katex tex="h_1" /> and <Katex tex="h_2" />. Each arch spans <Katex tex="30" /> m and the gap between consecutive arches is <Katex tex="5" /> m, so each start is <Katex tex="35" /> m after the previous one.</>,
  },
  {
    working: <Katex display tex="h_3: [a, 105] \ \text{ with span } 105-a = 30" />,
    reason: <>The domain is given as ending at <Katex tex="105" />, and all three arches are identical, so the span fixes the start.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 75}" />,
    reason: <>Consistent with the pattern <Katex tex="5,\ 40,\ 75" /> — each <Katex tex="35" /> m apart. Check: <Katex tex="h_3(75)=5\sin(0)=0" /> and <Katex tex="h_3(105)=5\sin(\pi)=0" />, so the arch does begin and end at ground level ✓</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} h_2(x) &= 5\sin\!\left(\frac{(x-40)\pi}{30}\right) \\ h_3(x) &= 5\sin\!\left(\frac{(x-75)\pi}{30}\right) \end{aligned}" />,
    reason: <>Compare the two rules term by term. Same amplitude <Katex tex="5" /> and same <Katex tex="\tfrac{\pi}{30}" />, so nothing is stretched or reflected; only the constant subtracted from <Katex tex="x" /> changes. That points to a horizontal translation and nothing else.</>,
  },
  {
    working: <Katex display tex="h_3(x) = h_2(x-35)" />,
    reason: <>Replacing <Katex tex="x" /> by <Katex tex="x-35" /> in <Katex tex="h_2" /> gives <Katex tex="5\sin\!\left(\tfrac{(x-35-40)\pi}{30}\right)=5\sin\!\left(\tfrac{(x-75)\pi}{30}\right)" /> ✓. The arch now starts where <Katex tex="x-35=40" />, that is at <Katex tex="x=75" />, so every point has moved <Katex tex="35" /> to the right.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{A translation of } 35 \text{ units in the positive } x \text{ direction}}" />,
    reason: <>Use the word <em>translation</em> — the report notes some students wrote "<Katex tex="35" /> m to the right", omitting it. If you add a mapping, it must agree with the words: <Katex tex="(x,\ y)\to(x+35,\ y)" />. The report also notes a correct statement followed by the incorrect expression <Katex tex="x\to x-35" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Rectangle} = 110\times5 = 550 \ \text{m}^2" />,
    reason: <>The bridge is <Katex tex="110" /> m long and sits <Katex tex="5" /> m above the ground, so the whole region under it is a rectangle. The stone is what is left once the three arch openings are removed.</>,
  },
  {
    working: <Katex display tex="\int_5^{35} 5\sin\!\left(\frac{(x-5)\pi}{30}\right)dx = \frac{300}{\pi}" />,
    reason: <>One arch opening. The terminals are where that region starts and ends, which is <Katex tex="h_1" />'s domain <Katex tex="[5,\ 35]" />. The rule only describes the arch there; outside it the same sine dips below the ground. The report gives <Katex tex="\int_0^{30}" /> as an example of incorrect terminals.</>,
  },
  {
    working: <Katex display tex="\text{Shaded} = 550 - 3\times\frac{300}{\pi} = 550-\frac{900}{\pi}" />,
    reason: <>All three arches are identical, so one integral does for all three.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 264 \text{ m}^2}" />,
    reason: <>The question asks for a number to the nearest square metre, so <Katex tex="550-\tfrac{900}{\pi}" /> on its own is not the answer — the report notes some students left their answer in that form. (<Katex tex="\tfrac{900}{\pi}\approx286.5" />, so a little under half the rectangle is stone.)</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{gradient} = \tan(\theta) \ \text{ where } \theta \text{ is the angle of elevation}" />,
    reason: <>Gradient is rise over run. Draw the right triangle under the bridge with a run of <Katex tex="1" />: the angle at the left is <Katex tex="\theta" />, the rise is the opposite side and the run the adjacent side, so <Katex tex="\tfrac{\text{rise}}{\text{run}}=\tan\theta" />. The gradient is the tangent of the angle, not the angle itself.</>,
  },
  {
    working: <Katex display tex="\boxed{\tan\!\left(\frac{\pi}{90}\right) \approx 0.035}" />,
    reason: <>The angle is in radians, so the calculator must be in radian mode. <Katex tex="\tan\!\left(\tfrac{\pi}{90}\right)=0.03492\ldots" />, which rounds to <Katex tex="0.035" />. The report notes some students evaluated <Katex tex="\tfrac{\pi}{90}" /> or <Katex tex="\sin\!\left(\tfrac{\pi}{90}\right)" />, and that <Katex tex="0.036" /> was sometimes given.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &\text{Arch 5 is Arch 2 repeated:} \\ &h_2(x) = 5\sin\!\left(\frac{(x-40)\pi}{30}\right),\ x\in[40,70] \end{aligned}" />,
    reason: <>The second bridge's arches are stated to be identical to the first bridge's, so Arch 5 sits in the same position as Arch 2 and has the same rule.</>,
  },
  {
    working: <Katex display tex="h_2'(x) = \frac{\pi}{6}\cos\!\left(\frac{(x-40)\pi}{30}\right)" />,
    reason: <>Chain rule: the <Katex tex="5" /> and the <Katex tex="\tfrac{\pi}{30}" /> multiply to <Katex tex="\tfrac{\pi}{6}" />.</>,
  },
  {
    working: <Katex display tex="\frac{\pi}{6}\cos\!\left(\frac{(x-40)\pi}{30}\right) = \tan\!\left(\frac{\pi}{90}\right)" />,
    reason: <>"The tangent to Arch 5 at <Katex tex="P" /> has the same gradient as the second bridge" — set the arch's gradient equal to part d.'s value.</>,
  },
  {
    working: <Cas fn="solve">solve(π/6*cos((x-40)π/30) = tan(π/90), x) | 40&lt;=x&lt;=70</Cas>,
    reason: <>Restrict to Arch 5's domain. The required gradient is positive, so <Katex tex="P" /> is on the rising side of the arch, and there is only one such solution in <Katex tex="[40,70]" />: <Katex tex="x=54.3626\ldots" /> (the cosine equation's neighbouring solutions, <Katex tex="x\approx25.64" /> and <Katex tex="x\approx85.64" />, are off the arch). Store this unrounded value, since part f. needs it.</>,
  },
  {
    working: <Katex display tex="\boxed{P \approx (54.36,\ 4.99)}" />,
    reason: <>Two decimal places for both coordinates. Note <Katex tex="P" /> is <em>not</em> at the top of the arch: the bridge slopes gently upwards, so the matching point sits just before the crest at <Katex tex="x=55" />, and its height (<Katex tex="4.9889\ldots" />) is a shade under <Katex tex="5" />. The report notes <Katex tex="(54,5)" /> was sometimes given without working, possibly estimated from the graph.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Second bridge: } y = 5 + \tan\!\left(\frac{\pi}{90}\right)x" />,
    reason: <>Height <Katex tex="5" /> m at its left-most point (<Katex tex="x=0" />) and the gradient from part d.</>,
  },
  {
    working: <Katex display tex="m_{PQ} = -\frac{1}{\tan\!\left(\frac{\pi}{90}\right)} \approx -28.64" />,
    reason: <>The rod runs perpendicular to the bridge. Why the negative reciprocal: turn the bridge's gradient triangle (run <Katex tex="1" />, rise <Katex tex="m" />) through <Katex tex="90^\circ" /> and it becomes run <Katex tex="-m" />, rise <Katex tex="1" />, a gradient of <Katex tex="-\tfrac1m" />. So the rod is very steep, nearly vertical, as the diagram shows.</>,
  },
  {
    working: <Katex display tex="PQ: \ y - 4.9889\ldots = -28.636\ldots\,(x - 54.3626\ldots)" />,
    reason: <>The rod's line, through <Katex tex="P" /> from part e. Keep the unrounded coordinates — rounding here shows up in the third decimal of the final answer.</>,
  },
  {
    working: <Cas fn="solve">solve(tan(π/90)·x+5 = -1/tan(π/90)·(x-xp)+yp, x)</Cas>,
    reason: <>With <Katex tex="xp" /> and <Katex tex="yp" /> stored from part e. <Katex tex="Q" /> is on both lines, so solve the bridge and the rod simultaneously. This gives <Katex tex="Q\approx(54.2960,\ 6.8961)" />.</>,
  },
  {
    working: <Katex display tex="PQ = \sqrt{(54.3626-54.2960)^2+(4.9889-6.8961)^2}" />,
    reason: <>Ordinary distance formula between the two points.</>,
  },
  {
    working: <Katex display tex="\boxed{PQ \approx 1.91 \text{ m}}" />,
    reason: <>Two decimal places. A quick check: straight above <Katex tex="P" /> the bridge is at <Katex tex="5+54.3626\tan\!\left(\tfrac{\pi}{90}\right)\approx6.8984" />, a vertical gap of <Katex tex="PV\approx1.9095" />. The rod leans <Katex tex="\tfrac{\pi}{90}" /> off that vertical, so <Katex tex="PQ=PV\cos\!\left(\tfrac{\pi}{90}\right)\approx1.9084" /> ✓ (see the triangle below).</>,
  },
]

export default function MethodsQ3_2018Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (11 marks)</p>
        <p className="mb-2">
          A horizontal bridge positioned <Katex tex="5" /> m above level ground is{' '}
          <Katex tex="110" /> m in length. The bridge also touches the top of three arches.
          Each arch begins and ends at ground level. The arches are <Katex tex="5" /> m apart
          at the base, as shown in the diagram below.
        </p>
        <p className="mb-3">
          Let <Katex tex="x" /> be the horizontal distance, in metres, from the left side of
          the bridge and let <Katex tex="y" /> be the height, in metres, above ground level.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async" src={bridge1Src} alt="A horizontal bridge at height 5 m spanning three identical sine arches labelled Arch 1, Arch 2 and Arch 3, on axes running to x = 110, from the original 2018 VCAA exam paper" className="w-full max-w-[520px]" />
        </div>
        <div className="mt-3 space-y-1">
          <p>Arch 1 can be modelled by the function <Katex tex="h_1:[5,35]\to R,\ h_1(x)=5\sin\!\left(\dfrac{(x-5)\pi}{30}\right)" />.</p>
          <p>Arch 2 can be modelled by the function <Katex tex="h_2:[40,70]\to R,\ h_2(x)=5\sin\!\left(\dfrac{(x-40)\pi}{30}\right)" />.</p>
          <p>Arch 3 can be modelled by the function <Katex tex="h_3:[a,105]\to R,\ h_3(x)=5\sin\!\left(\dfrac{(x-a)\pi}{30}\right)" />.</p>
        </div>
      </div>

      <PartCard letter="a" topic="Find Parameter" marks={1} statement={<>State the value of <Katex tex="a" />, where <Katex tex="a\in R" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Transformations" marks={1} statement={<>Describe the transformation that maps the graph of <Katex tex="y=h_2(x)" /> to <Katex tex="y=h_3(x)" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Replacing x by x − 35 slides the arch right, onto Arch 3">
          <TranslateWidget />
        </Explore>
        <WrongMethod
          title="There's a minus 35 in the bracket, so it moves 35 to the left"
          source="Examiner's report"
          working={<Katex display tex="\text{Translation of } 35 \text{ units to the left}" />}
        >
          Moving left would be <Katex tex="h_2(x+35)=5\sin\!\left(\tfrac{(x-5)\pi}{30}\right)" />, which is Arch 1,
          not Arch 3. Check with one point: the arch must start where the bracket is zero. For <Katex tex="h_3" /> that
          is <Katex tex="x=75" />, and <Katex tex="75" /> is to the right of <Katex tex="40" />.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          The area above ground level between the arches and the bridge is filled with stone.
          The stone is represented by the shaded regions shown in the diagram below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async" src={shadedSrc} alt="The same bridge and arches with the stone shaded: the full rectangle under the bridge minus the three arch openings, from the original 2018 VCAA exam paper" className="w-full max-w-[520px]" />
        </div>
      </div>

      <PartCard letter="c" topic="Area Between Curves" marks={3} statement={<>Find the total area of the shaded regions, correct to the nearest square metre.</>} examinerReport={EXAM_C}>
        <Background>
          <p>
            Do not integrate the shaded shape directly — it has an awkward outline. Take the
            rectangle under the bridge and subtract the three arch openings instead. Each
            opening is the area under one sine arch, and all three are congruent, so a single
            integral serves.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="Why the arch's terminals are 5 and 35, not 0 and 30">
          <TerminalsWidget />
        </Explore>
        <WrongMethod
          title="Each arch is 30 m wide, so integrate from 0 to 30"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned} &550 - 3\int_0^{30} h_1(x)\,dx \\ &= 550-\frac{450\sqrt3}{\pi} \approx 302 \text{ m}^2 \end{aligned}" />}
        >
          The width is right but the position is wrong. On <Katex tex="[0,\ 5]" /> the rule <Katex tex="h_1" /> is
          negative (the sine has not started its arch yet), so that piece is subtracted, and <Katex tex="[30,\ 35]" /> is
          left out. Take the terminals from the domain: <Katex tex="h_1(5)=h_1(35)=0" /> are the arch&apos;s feet.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-2">
          A second bridge has a height of <Katex tex="5" /> m above the ground at its left-most
          point and is inclined at a constant angle of elevation of{' '}
          <Katex tex="\dfrac{\pi}{90}" /> radians, as shown in the diagram below. The second
          bridge also has three arches below it, which are identical to the arches below the
          first bridge, and spans a horizontal distance of <Katex tex="110" /> m.
        </p>
        <p className="mb-3">
          Let <Katex tex="x" /> be the horizontal distance, in metres, from the left side of
          the second bridge and let <Katex tex="y" /> be the height, in metres, above ground
          level.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async" src={bridge2Src} alt="The inclined second bridge rising from 5 m at the left, over Arches 4, 5 and 6, with the perpendicular rod PQ drawn from the bridge down to a point P on Arch 5, from the original 2018 VCAA exam paper" className="w-full max-w-[520px]" />
        </div>
      </div>

      <PartCard letter="d" topic="Gradient" marks={1} statement={<>State the gradient of the second bridge, correct to three decimal places.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
        <Explore title="Gradient is rise over run, which is tan θ, not θ">
          <GradientWidget />
        </Explore>
        <WrongMethod
          title="The gradient is just the angle, π/90"
          source="Examiner's report"
          working={<Katex display tex="m = \frac{\pi}{90} \approx 0.0349" />}
        >
          When the angle is tiny, the three numbers <Katex tex="\theta" />, <Katex tex="\sin\theta" /> and{' '}
          <Katex tex="\tan\theta" /> are almost equal, so this happens to round to <Katex tex="0.035" /> as well, but the method is wrong. Try it on a
          bigger angle: a line at <Katex tex="\tfrac{\pi}{4}" /> has gradient <Katex tex="\tan\tfrac{\pi}{4}=1" />,
          not <Katex tex="\tfrac{\pi}{4}\approx0.785" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="e" topic="Tangent Line" marks={2} statement={<><Katex tex="P" /> is a point on Arch 5. The tangent to Arch 5 at point <Katex tex="P" /> has the same gradient as the second bridge. Find the coordinates of <Katex tex="P" />, correct to two decimal places.</>} examinerReport={EXAM_E}>
        <WorkingTable rows={ROWS_E} />
        <Explore title="P is where the arch's tangent runs parallel to the bridge">
          <TangentWidget />
        </Explore>
        <WrongMethod
          title="P looks like the top of the arch, so read it off the graph"
          source="Examiner's report"
          working={<Katex display tex="P \approx (54,\ 5)" />}
        >
          At the top of the arch the tangent is horizontal, <Katex tex="h_2'(55)=0" />, but the bridge rises with
          gradient <Katex tex="0.035" />. The matching point is slightly before the crest, on the rising side, and
          only solving <Katex tex="h_2'(x)=\tan\!\left(\tfrac{\pi}{90}\right)" /> gives it to two decimal places.
        </WrongMethod>
        <WrongMethod
          title="Set the arch equal to the bridge's gradient"
          working={<Katex display tex="h_2(x)=\tan\!\left(\tfrac{\pi}{90}\right) \ \Rightarrow\ x\approx40.07 \text{ or } 69.93" />}
        >
          This finds where the arch is <Katex tex="0.035" /> m <em>high</em>, just above its two feet. The
          condition is about the tangent, so it needs <Katex tex="h_2'(x)" />. Two answers hugging the ends of the
          domain, when the diagram shows <Katex tex="P" /> near the top, is the sign to recheck.
        </WrongMethod>
      </PartCard>

      <PartCard letter="f" topic="Perpendicular Distance" marks={3} statement={<>A supporting rod connects a point <Katex tex="Q" /> on the second bridge to point <Katex tex="P" /> on Arch 5. The rod follows a straight line and runs perpendicular to the second bridge, as shown in the diagram above. Find the distance <Katex tex="PQ" />, in metres, correct to two decimal places.</>} examinerReport={EXAM_F}>
        <Background>
          <p>
            <Katex tex="56\%" /> scored zero. The rod is <em>perpendicular to the bridge</em>,
            so this is a shortest-distance-from-a-point-to-a-line problem: build the
            perpendicular through <Katex tex="P" />, find where it meets the bridge, then
            measure.
          </p>
          <p>
            The tempting shortcut — treating <Katex tex="P" /> as sitting on{' '}
            <Katex tex="y=5" /> and using a trigonometric ratio — is exactly what the report
            describes. Part e. has already established that <Katex tex="P" /> is at height{' '}
            <Katex tex="4.99" />, not <Katex tex="5" />, and slightly left of the crest.
          </p>
          <p>
            A shorter route, once you see it: the rod, the vertical line from <Katex tex="P" /> up
            to the bridge, and the bridge form a right-angled triangle with the right angle at{' '}
            <Katex tex="Q" />. The rod is perpendicular to the bridge and the vertical is
            perpendicular to the ground, so the angle between them at <Katex tex="P" /> equals the
            bridge's angle <Katex tex="\tfrac{\pi}{90}" />. The vertical gap is the hypotenuse, so{' '}
            <Katex tex="PQ = (\text{vertical gap})\times\cos\!\left(\tfrac{\pi}{90}\right)" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
        <Explore title="The rod, the vertical and the bridge make a thin right triangle">
          <TriangleWidget />
        </Explore>
        <WrongMethod
          title="P is on the dashed line y = 5, so use the triangle from (0, 5)"
          source="Examiner's report"
          working={<Katex display tex="PQ = 54.36\sin\!\left(\tfrac{\pi}{90}\right) \approx 1.90" />}
        >
          <Katex tex="P" /> is on Arch 5, and part e. puts it at height <Katex tex="4.9889\ldots" />, about{' '}
          <Katex tex="0.011" /> below <Katex tex="y=5" />. That gap adds <Katex tex="0.011\cos\!\left(\tfrac{\pi}{90}\right)" /> to
          the rod, so the answer moves from <Katex tex="1.90" /> to <Katex tex="1.91" />. The dashed line in the diagram
          only marks the height of the bridge's left end. Always use the coordinates you actually found for{' '}
          <Katex tex="P" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
