// 2019 Specialist Mathematics — Exam 1, Question 5 (6 marks).
// f(x) = cos²(x) + cos(x) + 1 on [0, 2π] — its derivative, its turning points, then sketching
// y = 1/f(x) on the axes VCAA supplied. Question text transcribed from the original paper.
// The graph is VCAA's own, cropped directly from the exam PDF; part (b)'s answer curve is drawn
// as an SVG *overlay* on that real image (never a redrawing of it), calibrated from the printed
// gridlines themselves: the grid was measured programmatically from the crop, giving x = 0 at
// column 346, y = 0 at row 684.5, 190 px per π/2 horizontally and 142.25 px per unit vertically.
// Each predicted gridline position was checked back against the measured one to within ~1.5 px.
// Cross-checked against the VCAA examination report and itute's independent solutions.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './spec-2019exam1-q5-graph.png'

// y = 1/f(x) sampled at 97 points across [0, 2π] and mapped into the cropped image's pixel
// grid with the calibration above. Sits on top of the real VCAA figure as the part (b) answer.
const RECIPROCAL_PATH =
  'M 346.0 637.1 L 353.9 637.0 L 361.8 636.7 L 369.8 636.2 L 377.7 635.4 L 385.6 634.5 L 393.5 633.3 L 401.4 631.8 L 409.3 630.1 L 417.2 628.1 L 425.2 625.8 L 433.1 623.1 L 441.0 620.0 L 448.9 616.6 L 456.8 612.6 L 464.8 608.2 L 472.7 603.2 L 480.6 597.7 L 488.5 591.5 L 496.4 584.7 L 504.3 577.2 L 512.2 569.1 L 520.2 560.5 L 528.1 551.5 L 536.0 542.2 L 543.9 533.0 L 551.8 524.0 L 559.8 515.8 L 567.7 508.5 L 575.6 502.6 L 583.5 498.3 L 591.4 495.7 L 599.3 494.8 L 607.2 495.6 L 615.2 497.8 L 623.1 501.0 L 631.0 505.1 L 638.9 509.6 L 646.8 514.4 L 654.8 519.1 L 662.7 523.6 L 670.6 527.8 L 678.5 531.5 L 686.4 534.7 L 694.3 537.4 L 702.2 539.5 L 710.2 541.0 L 718.1 541.9 L 726.0 542.2 L 733.9 541.9 L 741.8 541.0 L 749.8 539.5 L 757.7 537.4 L 765.6 534.7 L 773.5 531.5 L 781.4 527.8 L 789.3 523.6 L 797.2 519.1 L 805.2 514.4 L 813.1 509.6 L 821.0 505.1 L 828.9 501.0 L 836.8 497.8 L 844.7 495.6 L 852.7 494.8 L 860.6 495.7 L 868.5 498.3 L 876.4 502.6 L 884.3 508.5 L 892.2 515.8 L 900.2 524.0 L 908.1 533.0 L 916.0 542.2 L 923.9 551.5 L 931.8 560.5 L 939.7 569.1 L 947.7 577.2 L 955.6 584.7 L 963.5 591.5 L 971.4 597.7 L 979.3 603.2 L 987.2 608.2 L 995.2 612.6 L 1003.1 616.6 L 1011.0 620.0 L 1018.9 623.1 L 1026.8 625.8 L 1034.8 628.1 L 1042.7 630.1 L 1050.6 631.8 L 1058.5 633.3 L 1066.4 634.5 L 1074.3 635.4 L 1082.2 636.2 L 1090.2 636.7 L 1098.1 637.0 L 1106.0 637.1'

const SKY = '#0ea5e9'

// The real VCAA figure with the part (b) answer drawn on top of it.
function ReciprocalOverlay() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[620px]">
        <img src={graphSrc} alt="VCAA's graph of f(x) = cos²x + cos x + 1 on 0 ≤ x ≤ 2π" className="w-full" />
        <svg viewBox="0 0 1670 900" className="absolute inset-0 w-full h-full" aria-label="The graph of y = 1/f(x) drawn on the same axes">
          <path d={RECIPROCAL_PATH} fill="none" stroke={SKY} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          {/* turning points of the reciprocal graph */}
          <circle cx={599.3} cy={494.8} r={10} fill={SKY} />
          <circle cx={726.0} cy={542.2} r={10} fill={SKY} />
          <circle cx={852.7} cy={494.8} r={10} fill={SKY} />
          {/* endpoints */}
          <circle cx={346.0} cy={637.1} r={10} fill={SKY} />
          <circle cx={1106.0} cy={637.1} r={10} fill={SKY} />
          {/* where the two graphs cross, at f(x) = 1 */}
          <circle cx={536.0} cy={542.2} r={7} fill="none" stroke={SKY} strokeWidth={4} />
          <circle cx={916.0} cy={542.2} r={7} fill="none" stroke={SKY} strokeWidth={4} />
          <g fill={SKY} fontSize={38} fontStyle="italic">
            <text x={599.3} y={466} textAnchor="middle">(2π/3, 4/3)</text>
            <text x={852.7} y={466} textAnchor="middle">(4π/3, 4/3)</text>
            <text x={726.0} y={614} textAnchor="middle">(π, 1)</text>
            <text x={332} y={652} textAnchor="end">(0, 1/3)</text>
            <text x={1122} y={652} textAnchor="start">(2π, 1/3)</text>
          </g>
        </svg>
      </div>
    </div>
  )
}

const EXAM_AI: SAExaminerStats = {
  marks: [14, 86],
  average: 0.9,
  comment: (
    <>
      This question was well done. A small number of students had difficulty finding the
      derivative and some who differentiated correctly attempted to factorise their answer with
      mixed success. Some students used a double angle formula to write the answer in an
      alternative form; this was not always done correctly, nor was it helpful for the next part.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [6, 52, 42],
  average: 1.4,
  comment: (
    <>
      This question was generally well done. A common mistake was to include the endpoints at{' '}
      <Katex tex="x=0" /> and <Katex tex="x=2\pi" /> even though the question specifically asked
      for the turning points in the open interval <Katex tex="(0,2\pi)" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [23, 19, 31, 27],
  average: 1.7,
  comment: (
    <>
      Students' graph-sketching abilities were reasonable, with most drawing a single, smooth
      curve with the correct shape. Common errors included neglecting to label the turning point
      at <Katex tex="(\pi,1)" />, graphs not passing through the intersection points at{' '}
      <Katex tex="x=\tfrac{\pi}{2}" /> and <Katex tex="x=\tfrac{3\pi}{2}" />, and poor estimation
      of the heights <Katex tex="\tfrac43" /> and <Katex tex="\tfrac13" /> against the given
      scale. Some students drew their graphs with an open circle at the endpoints.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \bigl(\cos(x)\bigr)^2 + \cos(x) + 1" />,
    reason: <>Writing <Katex tex="\cos^2(x)" /> as a square makes the chain rule visible: it is "something squared", where the something is <Katex tex="\cos(x)" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{d}{dx}\bigl(\cos(x)\bigr)^2 = 2\cos(x)\times\bigl(-\sin(x)\bigr) = -2\cos(x)\sin(x)" />,
    reason: <>Chain rule: bring the power down, keep the inside, times the derivative of the inside.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = -2\cos(x)\sin(x)-\sin(x)}" />,
    reason: <>Adding the derivative of <Katex tex="\cos(x)" />, which is <Katex tex="-\sin(x)" />; the constant <Katex tex="1" /> differentiates to zero.</>,
  },
  {
    working: <Katex display tex="= -\sin(x)\bigl(2\cos(x)+1\bigr)" />,
    reason: <>Both terms share a factor of <Katex tex="-\sin(x)" />. Factorising is optional for this mark but makes part (a)(ii) much easier — a product is zero exactly when one of its factors is. (Rewriting <Katex tex="-2\cos x\sin x" /> as <Katex tex="-\sin(2x)" /> is also correct, but then the equation in the next part is harder to solve.)</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 0 \implies -\sin(x)\bigl(2\cos(x)+1\bigr)=0" />,
    reason: <>Turning points occur where the gradient is zero.</>,
  },
  {
    working: <Katex display tex="\sin(x)=0 \quad \text{or} \quad \cos(x)=-\dfrac12" />,
    reason: <>Set each factor to zero separately.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\sin(x)=0 \ \text{ on } (0,2\pi) \implies x=\pi" />
        <Katex display tex="\cos(x)=-\tfrac12 \ \text{ on } (0,2\pi) \implies x=\dfrac{2\pi}{3},\ \dfrac{4\pi}{3}" />
      </>
    ),
    reason: <>Cosine is negative in the second and third quadrants, and the base angle for <Katex tex="\tfrac12" /> is <Katex tex="\tfrac{\pi}{3}" />, giving <Katex tex="\pi-\tfrac{\pi}{3}" /> and <Katex tex="\pi+\tfrac{\pi}{3}" />. Note <Katex tex="x=0" /> and <Katex tex="x=2\pi" /> also satisfy <Katex tex="\sin(x)=0" />, but they are <em>excluded</em> — the question asks for the open interval <Katex tex="(0,2\pi)" />, and they are domain endpoints, not turning points.</>,
  },
  {
    working: (
      <>
        <Katex display tex="f\!\left(\tfrac{2\pi}{3}\right) = \left(-\tfrac12\right)^2+\left(-\tfrac12\right)+1 = \tfrac14-\tfrac12+1 = \tfrac34" />
        <Katex display tex="f(\pi) = (-1)^2+(-1)+1 = 1" />
        <Katex display tex="f\!\left(\tfrac{4\pi}{3}\right) = \tfrac14-\tfrac12+1 = \tfrac34" />
      </>
    ),
    reason: <>Substitute each <Katex tex="x" /> back into <Katex tex="f" /> to get the <Katex tex="y" />-coordinates. The two outer ones match because <Katex tex="\cos" /> takes the same value <Katex tex="-\tfrac12" /> at both.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\dfrac{2\pi}{3},\ \dfrac34\right),\quad (\pi,\ 1),\quad \left(\dfrac{4\pi}{3},\ \dfrac34\right)}" />,
    reason: <>Two minimums either side of a small local maximum — exactly the shape drawn in the given graph, which is a free check on the answer.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)\ge\dfrac34>0 \ \text{ for all } x \implies \dfrac{1}{f(x)} \text{ is defined everywhere, with no asymptotes}" />,
    reason: <>The first thing to settle for any reciprocal graph: does the original ever hit zero? Here it doesn't — its smallest value is <Katex tex="\tfrac34" /> — so the reciprocal graph is a single unbroken curve.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{max of } f \ \longleftrightarrow \ \text{min of } \dfrac1f" />
        <Katex display tex="\text{min of } f \ \longleftrightarrow \ \text{max of } \dfrac1f" />
      </>
    ),
    reason: <>Turning points stay at the same <Katex tex="x" />-values, but swap type: taking reciprocals reverses the order of positive numbers.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\left(\tfrac{2\pi}{3},\ \tfrac34\right)\to\left(\tfrac{2\pi}{3},\ \tfrac43\right), \qquad (\pi,1)\to(\pi,1)" />
        <Katex display tex="\left(\tfrac{4\pi}{3},\ \tfrac34\right)\to\left(\tfrac{4\pi}{3},\ \tfrac43\right)" />
      </>
    ),
    reason: <>Invert each <Katex tex="y" />-coordinate from part (a)(ii). The two minimums of <Katex tex="f" /> become maximums at height <Katex tex="\tfrac43" />, and the local maximum at <Katex tex="(\pi,1)" /> becomes a local minimum — still at height <Katex tex="1" />, since <Katex tex="1" /> is its own reciprocal.</>,
  },
  {
    working: <Katex display tex="f(0)=f(2\pi)=3 \implies \text{endpoints } \left(0,\ \tfrac13\right) \text{ and } \left(2\pi,\ \tfrac13\right)" />,
    reason: <>The endpoints must be labelled too, and they are <em>closed</em> (filled) dots — the domain includes them, so no open circles.</>,
  },
  {
    working: <Katex display tex="f(x)=1 \iff \cos^2(x)+\cos(x)=0 \iff \cos(x)\bigl(\cos(x)+1\bigr)=0" />,
    reason: <>Where does the new graph cross the old one? Exactly where <Katex tex="f=\tfrac1f" />, i.e. where <Katex tex="f=1" /> (since <Katex tex="f>0" />).</>,
  },
  {
    working: <Katex display tex="\cos(x)=0 \implies x=\tfrac{\pi}{2},\ \tfrac{3\pi}{2}; \qquad \cos(x)=-1 \implies x=\pi" />,
    reason: <>So the two curves meet at <Katex tex="\left(\tfrac{\pi}{2},1\right)" />, <Katex tex="(\pi,1)" /> and <Katex tex="\left(\tfrac{3\pi}{2},1\right)" />. The report singles out the first and third as points students' sketches often missed — they are a useful accuracy check when drawing.</>,
  },
]

export default function SpecialistQ5_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-3">Question 5 (6 marks)</p>
        <p className="mb-3">
          The graph of <Katex tex="f(x)=\cos^2(x)+\cos(x)+1" /> over the domain{' '}
          <Katex tex="0\le x\le2\pi" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img src={graphSrc} alt="Graph of f(x) = cos²x + cos x + 1 on 0 ≤ x ≤ 2π, from the original 2019 VCAA exam paper" className="w-full max-w-[520px]" />
        </div>
      </div>

      <PartCard letter="a.i" marks={1} statement={<>Find <Katex tex="f'(x)" />.</>} examinerReport={EXAM_AI}>
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard letter="a.ii" marks={2} statement={<>Hence, find the coordinates of the turning points of the graph in the interval <Katex tex="(0,2\pi)" />.</>} examinerReport={EXAM_AII}>
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="b"
        marks={3}
        statement={<>Sketch the graph of <Katex tex="y=\dfrac{1}{f(x)}" /> on the set of axes above. Clearly label the turning points and endpoints of this graph with their coordinates.</>}
        examinerReport={EXAM_B}
      >
        <Background>
          <p>
            Sketching a <b>reciprocal</b> graph <Katex tex="y=\tfrac{1}{f(x)}" /> is a matter of
            transferring a few features rather than plotting from scratch. The rules worth
            knowing:
          </p>
          <p>
            • Wherever <Katex tex="f(x)=0" />, the reciprocal has a <em>vertical asymptote</em>.
            (Not an issue here — check this first, because it decides the whole shape.)<br />
            • Turning points keep their <Katex tex="x" />-value but swap between maximum and
            minimum, with the <Katex tex="y" />-value inverted.<br />
            • Where <Katex tex="f(x)=1" /> (or <Katex tex="-1" />), the two graphs cross, since
            those numbers are their own reciprocals.<br />
            • <Katex tex="f" /> and <Katex tex="\tfrac1f" /> always have the same sign, and where{' '}
            <Katex tex="f" /> is big, <Katex tex="\tfrac1f" /> is small.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
            The Finished Sketch
          </p>
          <ReciprocalOverlay />
          <p className="text-[12.5px] leading-relaxed text-gray-500 dark:text-gray-400 mt-2.5">
            The answer (in blue) drawn on VCAA's own axes. Filled dots are the labelled turning
            points and endpoints; the two small rings mark where it crosses the original curve,
            at <Katex tex="x=\tfrac{\pi}{2}" /> and <Katex tex="x=\tfrac{3\pi}{2}" />. Notice it
            is a gentle wave between <Katex tex="\tfrac13" /> and <Katex tex="\tfrac43" /> — much
            flatter than <Katex tex="f" />, because taking reciprocals squashes the tall value{' '}
            <Katex tex="3" /> down to <Katex tex="\tfrac13" /> and compresses the whole range.
          </p>
        </div>
      </PartCard>
    </div>
  )
}
