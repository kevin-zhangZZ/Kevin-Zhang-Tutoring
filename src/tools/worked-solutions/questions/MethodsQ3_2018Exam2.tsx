// 2018 Mathematical Methods — Exam 2, Section B, Question 3 (11 marks). Three sine arches
// under a bridge: locating the third arch, describing the translation, the stone area, then
// an inclined second bridge and the perpendicular rod down to a tangent point. Question text
// transcribed from the original paper; all three figures are cropped directly from the
// original VCAA exam PDF, not redrawings. Answers re-derived independently in sympy and
// checked against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import bridge1Src from './meth-2018exam2-q3-bridge1.png'
import shadedSrc from './meth-2018exam2-q3-shaded.png'
import bridge2Src from './meth-2018exam2-q3-bridge2.png'

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
      omitting the word translation. A few wrote to the left, or <Katex tex="5" /> m to the
      left or right.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [8, 8, 18, 66],
  average: 2.4,
  comment: (
    <>
      <Katex tex="5\times110-3\displaystyle\int_5^{35}h_1(x)\,dx = 264\ \text{m}^2" />, correct
      to the nearest square metre. This question was answered reasonably well. There were some
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
      <Katex tex="\tan\!\left(\tfrac{\pi}{90}\right)\approx0.035" />, correct to three decimal
      places. This question was generally well answered. Some students evaluated{' '}
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
      <Katex tex="h_2'(x)=\tan\!\left(\tfrac{\pi}{90}\right)" />,{' '}
      <Katex tex="x=54.36\ldots" />, <Katex tex="h_2(54.3626\ldots)=4.99\ldots" />,{' '}
      <Katex tex="P(54.36,\ 4.99)" />, correct to two decimal places. Many students were able
      to equate their answer to Question 3d. to <Katex tex="h_2'(x)" />. Some students were
      possibly estimating values for the coordinates from the graph, as{' '}
      <Katex tex="P(54,5)" /> was sometimes given.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [56, 17, 8, 19],
  average: 0.9,
  comment: (
    <>
      Distance <Katex tex="PQ = \sqrt{(54.36\ldots-54.29\ldots)^2+(4.98\ldots-6.896\ldots)^2} \approx 1.91" />{' '}
      m, correct to two decimal places. There were a number of other approaches to this
      question. Many students were able to get the negative reciprocal of their answer to
      Question 3d. Other students incorrectly thought <Katex tex="P" /> was on the line{' '}
      <Katex tex="y=5" /> and used a trigonometric ratio to find the distance.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="h_1: [5,35], \qquad h_2: [40,70]" />,
    reason: <>Each arch spans <Katex tex="30" /> m and the gap between consecutive arches is <Katex tex="5" /> m, so each start is <Katex tex="35" /> m after the previous one.</>,
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
    working: <Katex display tex="h_2(x) = 5\sin\!\left(\frac{(x-40)\pi}{30}\right), \qquad h_3(x) = 5\sin\!\left(\frac{(x-75)\pi}{30}\right)" />,
    reason: <>The two rules differ only in the constant subtracted from <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="h_3(x) = h_2(x-35)" />,
    reason: <>Replacing <Katex tex="x" /> by <Katex tex="x-35" /> in <Katex tex="h_2" /> gives <Katex tex="5\sin\!\left(\tfrac{(x-35-40)\pi}{30}\right)=5\sin\!\left(\tfrac{(x-75)\pi}{30}\right)" /> ✓</>,
  },
  {
    working: <Katex display tex="\boxed{\text{A translation of } 35 \text{ units in the positive } x \text{ direction}}" />,
    reason: <>Use the word <em>translation</em> — the report notes that "<Katex tex="35" /> m to the right" without it did not score. Subtracting inside the bracket moves the graph <em>right</em>, not left, which is the other error recorded.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Rectangle} = 110\times5 = 550 \ \text{m}^2" />,
    reason: <>The bridge is <Katex tex="110" /> m long and sits <Katex tex="5" /> m above the ground, so the whole region under it is a rectangle. The stone is what is left once the three arch openings are removed.</>,
  },
  {
    working: <Katex display tex="\int_5^{35} 5\sin\!\left(\frac{(x-5)\pi}{30}\right)dx = \frac{300}{\pi}" />,
    reason: <>One arch opening. Use the arch's <em>own</em> terminals — the report flags <Katex tex="\int_0^{30}" /> as a common wrong choice, which integrates the right shape over the wrong interval.</>,
  },
  {
    working: <Katex display tex="\text{Shaded} = 550 - 3\times\frac{300}{\pi} = 550-\frac{900}{\pi}" />,
    reason: <>All three arches are identical, so one integral does for all three.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 264 \text{ m}^2}" />,
    reason: <>The question asks for a number to the nearest square metre, so <Katex tex="550-\tfrac{900}{\pi}" /> on its own is not the answer — the report records that as a frequent omission. (<Katex tex="\tfrac{900}{\pi}\approx286.5" />, so a little over half the rectangle is stone.)</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{gradient} = \tan(\theta) \ \text{ where } \theta \text{ is the angle of elevation}" />,
    reason: <>Gradient is rise over run, which is exactly the tangent of the angle the line makes with the horizontal — not the angle itself.</>,
  },
  {
    working: <Katex display tex="\boxed{\tan\!\left(\frac{\pi}{90}\right) \approx 0.035}" />,
    reason: <>In radians, so the calculator must be in radian mode. The report lists three separate slips: quoting <Katex tex="\tfrac{\pi}{90}\approx0.0349" /> as the gradient without taking the tangent, using <Katex tex="\sin" /> instead, and rounding to <Katex tex="0.036" />. (<Katex tex="\tan\!\left(\tfrac{\pi}{90}\right)=0.03492\ldots" />, which rounds <em>down</em> to <Katex tex="0.035" />.)</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Arch 5 is Arch 2 repeated: } h(x) = 5\sin\!\left(\frac{(x-40)\pi}{30}\right), \ x\in[40,70]" />,
    reason: <>The second bridge's arches are stated to be identical to the first bridge's, so Arch 5 sits in the same position as Arch 2.</>,
  },
  {
    working: <Katex display tex="h'(x) = \frac{\pi}{6}\cos\!\left(\frac{(x-40)\pi}{30}\right)" />,
    reason: <>Chain rule: the <Katex tex="5" /> and the <Katex tex="\tfrac{\pi}{30}" /> multiply to <Katex tex="\tfrac{\pi}{6}" />.</>,
  },
  {
    working: <Katex display tex="\frac{\pi}{6}\cos\!\left(\frac{(x-40)\pi}{30}\right) = \tan\!\left(\frac{\pi}{90}\right)" />,
    reason: <>"The tangent to Arch 5 at <Katex tex="P" /> has the same gradient as the second bridge" — set the arch's gradient equal to part (d)'s value.</>,
  },
  {
    working: <Cas fn="solve">solve(π/6*cos((x-40)π/30) = tan(π/90), x) | 40&lt;=x&lt;=70</Cas>,
    reason: <>Restrict to Arch 5's domain. Two solutions exist in general; the one just past the crest is the one the diagram marks.</>,
  },
  {
    working: <Katex display tex="\boxed{P \approx (54.36,\ 4.99)}" />,
    reason: <>Two decimal places for both coordinates. Note <Katex tex="P" /> is <em>not</em> at the top of the arch: the bridge slopes gently upwards, so the matching point sits slightly past the crest at <Katex tex="x=55" />, and its height is a shade under <Katex tex="5" />. The report notes <Katex tex="(54,5)" /> being read off the graph instead of computed.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Second bridge: } y = 5 + \tan\!\left(\frac{\pi}{90}\right)x" />,
    reason: <>Height <Katex tex="5" /> m at its left-most point (<Katex tex="x=0" />) and the gradient from part (d).</>,
  },
  {
    working: <Katex display tex="m_{PQ} = -\frac{1}{\tan\!\left(\frac{\pi}{90}\right)} \approx -28.64" />,
    reason: <>The rod runs perpendicular to the bridge, and perpendicular gradients multiply to <Katex tex="-1" />. Nearly vertical, as the diagram shows.</>,
  },
  {
    working: <Katex display tex="PQ: \ y - 4.9861\ldots = -28.636\ldots\,(x - 54.3626\ldots)" />,
    reason: <>The rod's line, through <Katex tex="P" /> from part (e). Keep the unrounded coordinates — rounding here shows up in the third decimal of the final answer.</>,
  },
  {
    working: <Cas fn="solve">solve(5+tan(π/90)x = -28.636(x-54.3626)+4.9861, x)</Cas>,
    reason: <>Where the rod meets the bridge gives <Katex tex="Q\approx(54.2957,\ 6.8961)" />.</>,
  },
  {
    working: <Katex display tex="PQ = \sqrt{(54.3626-54.2957)^2+(4.9861-6.8961)^2}" />,
    reason: <>Ordinary distance formula between the two points.</>,
  },
  {
    working: <Katex display tex="\boxed{PQ \approx 1.91 \text{ m}}" />,
    reason: <>Two decimal places. A useful check: the vertical gap between <Katex tex="P" /> and the bridge is <Katex tex="6.8984-4.9861\approx1.912" />, and because the bridge is almost horizontal the perpendicular distance is barely shorter than the vertical one. The report notes students who assumed <Katex tex="P" /> lay on <Katex tex="y=5" /> and used a trigonometric ratio — that assumption is what part (e) exists to disprove.</>,
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
          <img src={bridge1Src} alt="A horizontal bridge at height 5 m spanning three identical sine arches labelled Arch 1, Arch 2 and Arch 3, on axes running to x = 110, from the original 2018 VCAA exam paper" className="w-full max-w-[520px]" />
        </div>
        <div className="mt-3 space-y-1">
          <p>Arch 1: <Katex tex="h_1:[5,35]\to\mathbb{R},\ h_1(x)=5\sin\!\left(\dfrac{(x-5)\pi}{30}\right)" /></p>
          <p>Arch 2: <Katex tex="h_2:[40,70]\to\mathbb{R},\ h_2(x)=5\sin\!\left(\dfrac{(x-40)\pi}{30}\right)" /></p>
          <p>Arch 3: <Katex tex="h_3:[a,105]\to\mathbb{R},\ h_3(x)=5\sin\!\left(\dfrac{(x-a)\pi}{30}\right)" /></p>
        </div>
      </div>

      <PartCard letter="a" marks={1} statement={<>State the value of <Katex tex="a" />, where <Katex tex="a\in\mathbb{R}" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={1} statement={<>Describe the transformation that maps the graph of <Katex tex="y=h_2(x)" /> to <Katex tex="y=h_3(x)" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          The area above ground level between the arches and the bridge is filled with stone.
          The stone is represented by the shaded regions shown in the diagram below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img src={shadedSrc} alt="The same bridge and arches with the stone shaded: the full rectangle under the bridge minus the three arch openings, from the original 2018 VCAA exam paper" className="w-full max-w-[520px]" />
        </div>
      </div>

      <PartCard letter="c" marks={3} statement={<>Find the total area of the shaded regions, correct to the nearest square metre.</>} examinerReport={EXAM_C}>
        <Background>
          <p>
            Do not integrate the shaded shape directly — it has an awkward outline. Take the
            rectangle under the bridge and subtract the three arch openings instead. Each
            opening is the area under one sine arch, and all three are congruent, so a single
            integral serves.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
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
          <img src={bridge2Src} alt="The inclined second bridge rising from 5 m at the left, over Arches 4, 5 and 6, with the perpendicular rod PQ drawn from the bridge down to a point P on Arch 5, from the original 2018 VCAA exam paper" className="w-full max-w-[520px]" />
        </div>
      </div>

      <PartCard letter="d" marks={1} statement={<>State the gradient of the second bridge, correct to three decimal places.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" marks={2} statement={<><Katex tex="P" /> is a point on Arch 5. The tangent to Arch 5 at point <Katex tex="P" /> has the same gradient as the second bridge. Find the coordinates of <Katex tex="P" />, correct to two decimal places.</>} examinerReport={EXAM_E}>
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard letter="f" marks={3} statement={<>A supporting rod connects a point <Katex tex="Q" /> on the second bridge to point <Katex tex="P" /> on Arch 5. The rod follows a straight line and runs perpendicular to the second bridge. Find the distance <Katex tex="PQ" />, in metres, correct to two decimal places.</>} examinerReport={EXAM_F}>
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
            warns against. Part (e) has already established that <Katex tex="P" /> is at
            height <Katex tex="4.99" />, not <Katex tex="5" />, and slightly right of the
            crest.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
