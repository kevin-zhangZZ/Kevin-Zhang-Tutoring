// 2024 Mathematical Methods NHT — Exam 2, Section B Question 4 (13 marks). The NHT report gives
// sample answers only, with no statistics; it adds a short note to parts a., f. and h., which
// are transcribed as each part's report comment. Timothy's tiling pattern built from the cubic
// f(x) = a(x − b)³ + c on [−4, 0]: tracing a translated edge, finding a, b and c, a continuous
// piecewise function, the inverse, the edge g(x) = m f⁻¹(nx), the tile area, the right-angle
// corner, and three families of edges with an integer parameter k. Question text transcribed
// from the original paper; Figures 1, 2 and 3 are cropped from the original VCAA exam PDF at
// 300 dpi (meth-2024nhte2-q4-figure1/2/3.png). The part a. answer is an SVG overlay on the
// Figure 1 crop and the part h. explanation an SVG overlay on the Figure 3 crop (never
// redrawings). Calibration measured from the gridlines: Figure 1 origin (855, 570.2) at 70.0 px
// per unit; Figure 3 origin (872, 653) at 71.5 px per unit; both checked with PIL composites —
// the computed f, g and translated edges lie exactly on VCAA's printed curves. Answers checked
// with sympy and against the VCAA report's sample answers: b. a = 1/4, b = −2, c = 2;
// c. (1/4)(x − 2)³ + 6, 0 < x ≤ 4 (or the report's alternative); d. ∛(4(x − 2)) − 2 on [0, 4];
// e. m = 1, n = −1; f. 32; g. gradients 3 and −1/3; h. f(x − 8k), f(x − 4 − 8k) − 4,
// g(x − 4 − 8k) + 4 (the report prints equivalent forms). Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { functionToPath } from '../graphUtils'
import fig1Src from './meth-2024nhte2-q4-figure1.png'
import fig2Src from './meth-2024nhte2-q4-figure2.png'
import fig3Src from './meth-2024nhte2-q4-figure3.png'

const ORANGE = '#f97316'
const LABEL = { fontSize: 46, fontStyle: 'italic', fontWeight: 700, fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke' } as const

const f = (x: number) => 0.25 * (x + 2) ** 3 + 2
const fInv = (x: number) => Math.cbrt(4 * (x - 2)) - 2
const g = (x: number) => fInv(-x)

// Figure 1 calibration (crop is 1748 × 1055).
const x1 = (x: number) => 855 + 70 * x
const y1 = (y: number) => 570.2 - 70 * y
// Figure 3 calibration (crop is 1783 × 1147).
const x3 = (x: number) => 872 + 71.5 * x
const y3 = (y: number) => 653 - 71.5 * y

function F2Overlay() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[560px]">
        <img loading="lazy" decoding="async" src={fig1Src} alt="VCAA's Figure 1 with the answer traced over it: the edge f₂ from (0, −4) up through a flat point at (2, −2) to (4, 0), the bold f moved 4 right and 4 down, labelled f₂" className="w-full block" />
        <svg viewBox="0 0 1748 1055" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d={functionToPath((x) => f(x - 4) - 4, 0, 4, x1, y1, 300)} fill="none" stroke={ORANGE} strokeWidth={8} strokeLinecap="round" />
          <circle cx={x1(0)} cy={y1(-4)} r={10} fill={ORANGE} />
          <circle cx={x1(4)} cy={y1(0)} r={10} fill={ORANGE} />
          <text x={x1(2.6)} y={y1(-2.75)} {...LABEL}>f₂</text>
        </svg>
      </div>
    </div>
  )
}

function FamiliesOverlay() {
  const ks = [-1, 0, 1]
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[560px]">
        <img loading="lazy" decoding="async" src={fig3Src} alt="VCAA's Figure 3 with the three answer families traced over the three shaded tiles: every upper-left edge (family 2), every lower-right edge (family 3) and every upper-right edge (family 4), with the given g edges as the lower-left sides" className="w-full block" />
        <svg viewBox="0 0 1783 1147" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {ks.map((k) => (
            <g key={k}>
              <path d={functionToPath((x) => f(x - 8 * k), 8 * k - 4, 8 * k, x3, y3, 200)} fill="none" stroke={ORANGE} strokeWidth={7} />
              <path d={functionToPath((x) => f(x - 4 - 8 * k) - 4, 8 * k, 8 * k + 4, x3, y3, 200)} fill="none" stroke={ORANGE} strokeWidth={7} />
              <path d={functionToPath((x) => g(x - 4 - 8 * k) + 4, 8 * k, 8 * k + 4, x3, y3, 400)} fill="none" stroke={ORANGE} strokeWidth={7} />
            </g>
          ))}
          <text x={x3(-3.2)} y={y3(3.1)} {...LABEL}>2.</text>
          <text x={x3(2.6)} y={y3(-2.9)} {...LABEL}>3.</text>
          <text x={x3(2.7)} y={y3(2.7)} {...LABEL}>4.</text>
        </svg>
      </div>
    </div>
  )
}

const EXAM_A: SAExaminerStats = {
  comment: <>The graph must be drawn and labelled.</>,
}

const EXAM_F: SAExaminerStats = {
  comment: <>Alternative methods were possible.</>,
}

const EXAM_H: SAExaminerStats = {
  comment: <>Some of the equations are shown below. There are other possibilities.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f_2(x) = f(x-4)-4" />,
    reason: <>Replacing <Katex tex="x" /> by <Katex tex="x-4" /> moves the graph 4 units right; the <Katex tex="-4" /> moves it 4 units down. Every point of <Katex tex="f" /> moves by <Katex tex="(+4,\,-4)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}(-4,0)&\to(0,-4)\\ (-2,2)&\to(2,-2)\\ (0,4)&\to(4,0)\end{aligned}" />,
    reason: <>Move the two endpoints and the flat point in the middle of <Katex tex="f" />, then find the dashed edge that joins them.</>,
    more: <>The domain moves too: <Katex tex="[-4,0]" /> becomes <Katex tex="[0,4]" />. The traced edge is the same shape as <Katex tex="f" />, flat in the middle and steep at both ends.</>,
  },
  {
    working: <F2Overlay />,
    reason: <>The edge from <Katex tex="(0,-4)" /> to <Katex tex="(4,0)" />, traced and labelled <Katex tex="f_2" /> as asked.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="b = -2, \qquad c = 2" />,
    reason: <><Katex tex="y=a(x-b)^3+c" /> has its stationary point of inflection at <Katex tex="(b,c)" />, so read <Katex tex="b" /> and <Katex tex="c" /> straight from <Katex tex="(-2,2)" />.</>,
    more: <>Check by calculus: <Katex tex="f'(x)=3a(x-b)^2" /> is zero only at <Katex tex="x=b" />, where <Katex tex="f(b)=c" />.</>,
  },
  {
    working: <Katex display tex="f(0) = a(0+2)^3+2 = 8a+2 = 4" />,
    reason: <>Use the axial intercept <Katex tex="(0,4)" /> to find the last unknown.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \tfrac14, \quad b = -2, \quad c = 2}" />,
    reason: <>So <Katex tex="f(x)=\tfrac14(x+2)^3+2" />.</>,
    more: <>Check the other endpoint: <Katex tex="f(-4)=\tfrac14(-8)+2=0" />, matching the bold curve starting at <Katex tex="(-4,0)" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(x-4)+4: \quad (-4,0)\to(0,4)" />,
    reason: <>The second piece must start where <Katex tex="f" /> ends, at <Katex tex="(0,4)" />, for <Katex tex="p" /> to be continuous. Translating <Katex tex="f" /> by 4 right and 4 up moves its left end <Katex tex="(-4,0)" /> there.</>,
    more: <>In Figure 1 this is the dashed edge rising from <Katex tex="(0,4)" /> through <Katex tex="(2,6)" />, so it is an edge of the pattern, as required.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}f(x-4)+4 &= \tfrac14(x-4+2)^3+2+4\\ &= \tfrac14(x-2)^3+6\end{aligned}" />,
    reason: <>Substitute into the rule from part b.</>,
  },
  {
    working: <Katex display tex="\boxed{p(x)=\begin{cases} f(x) & -4\le x\le0\\[2pt] \tfrac14(x-2)^3+6 & 0<x\le4\end{cases}}" />,
    reason: <>The domain is <Katex tex="[-4,0]" /> moved 4 right. Use <Katex tex="0<x" /> so the two pieces don&apos;t both claim <Katex tex="x=0" />.</>,
    more: <>VCAA also accepts joining on the left instead: <Katex tex="f(x+4)-4=\tfrac14(x+6)^3-2" /> for <Katex tex="-8\le x<-4" />, which ends at <Katex tex="(-4,0)" />, where <Katex tex="f" /> starts.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="x = \tfrac14(y+2)^3+2" />,
    reason: <>Swap <Katex tex="x" /> and <Katex tex="y" /> in <Katex tex="y=\tfrac14(x+2)^3+2" />, then solve for <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="4(x-2) = (y+2)^3 \implies y+2 = \sqrt[3]{4(x-2)}" />,
    reason: <>Undo each step in reverse: subtract 2, multiply by 4, take the cube root. A cube root has only one real value, so there is no ±.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = \sqrt[3]{4(x-2)}-2, \quad x\in[0,4]}" />,
    reason: <>The domain of <Katex tex="f^{-1}" /> is the range of <Katex tex="f" />. <Katex tex="f" /> is increasing on <Katex tex="[-4,0]" />, from <Katex tex="f(-4)=0" /> to <Katex tex="f(0)=4" />, so its range is <Katex tex="[0,4]" />.</>,
    more: <>VCAA also writes the rule as <Katex tex="2^{\frac23}(x-2)^{\frac13}-2" />. On CAS, <Cas fn="solve">solve(x = ¼(y+2)³ + 2, y)</Cas> gives the rule. Check: <Katex tex="f^{-1}(2)=-2" />, since <Katex tex="f(-2)=2" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="f^{-1}: \ (0,-4) \text{ to } (4,0)" />,
    reason: <>The graph of <Katex tex="f^{-1}" /> is <Katex tex="f" /> reflected in <Katex tex="y=x" />: its endpoints are <Katex tex="f" />&apos;s with the coordinates swapped.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}n=-1: \quad f^{-1}(-x) \text{ runs}\\ \text{from } (0,-4) \text{ to } (-4,0)\end{gathered}" />,
    reason: <>The edge <Katex tex="g" /> has the same <Katex tex="y" />-values as <Katex tex="f^{-1}" /> but on the other side of the <Katex tex="y" />-axis. Replacing <Katex tex="x" /> by <Katex tex="-x" /> reflects in the <Katex tex="y" />-axis.</>,
    more: <>The shape agrees too: <Katex tex="f" /> is flat at <Katex tex="(-2,2)" />, so <Katex tex="f^{-1}" /> is vertical at <Katex tex="(2,-2)" />, and its reflection is vertical at <Katex tex="(-2,-2)" />, exactly where the bold <Katex tex="g" /> in Figure 2 is steepest.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 1, \quad n = -1}" />,
    reason: <>No vertical change is needed, so <Katex tex="m=1" />. Check: <Katex tex="g(-4)=f^{-1}(4)=0" /> and <Katex tex="g(0)=f^{-1}(0)=-4" />.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{-4}^{0} f(x)\,dx = \left[\tfrac{1}{16}(x+2)^4+2x\right]_{-4}^{0}" />,
    reason: <>The part of the tile in the second quadrant is bounded by <Katex tex="f" />, the <Katex tex="x" />-axis and the <Katex tex="y" />-axis. <Katex tex="f\ge0" /> on <Katex tex="[-4,0]" />, so its area is this integral. The antiderivative of <Katex tex="\tfrac14(x+2)^3" /> is <Katex tex="\tfrac14\cdot\tfrac{(x+2)^4}{4}=\tfrac{1}{16}(x+2)^4" />.</>,
  },
  {
    working: <Katex display tex="= \left(\tfrac{16}{16}+0\right)-\left(\tfrac{16}{16}-8\right) = 8" />,
    reason: <>Top limit minus bottom limit: <Katex tex="(0+2)^4=16" /> and <Katex tex="(-4+2)^4=16" />, so this quarter of the tile has area 8.</>,
  },
  {
    working: <Katex display tex="A = 4\times8" />,
    reason: <>Rotating the tile a quarter-turn about the origin maps it onto itself (each edge onto the next), so its four quadrant pieces have equal area.</>,
    more: <>Rotating <Katex tex="f" />&apos;s edge a quarter-turn clockwise about <Katex tex="O" /> sends each point <Katex tex="(x,y)" /> to <Katex tex="(y,-x)" />, giving the upper-right edge from <Katex tex="(0,4)" /> to <Katex tex="(4,0)" />; turning again gives <Katex tex="f_2" />, then <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = 32 \text{ square units}}" />,
    reason: <>The area of one tile.</>,
    more: <>VCAA&apos;s other method: the tile has the same area as the square with corners <Katex tex="(\pm4,0)" /> and <Katex tex="(0,\pm4)" />, side <Katex tex="4\sqrt2" />, so <Katex tex="4\sqrt2\times4\sqrt2=32" />. Each edge is symmetric about its own midpoint (for <Katex tex="f" />, the point <Katex tex="(-2,2)" />), so it bulges out of the square as much as it cuts in, and the pieces cancel.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \tfrac34(x+2)^2, \qquad f'(-4) = \tfrac34(4) = 3" />,
    reason: <>Chain rule on <Katex tex="\tfrac14(x+2)^3" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}g(x) &= f^{-1}(-x) = \sqrt[3]{4(-x-2)}-2\\ &= -\sqrt[3]{4(x+2)}-2\end{aligned}" />,
    reason: <>From parts d. and e. The cube root of a negative is the negative of the cube root, which tidies the sign.</>,
  },
  {
    working: <Katex display tex="g'(x) = -\tfrac13\big(4(x+2)\big)^{-\frac23}\cdot4" />,
    reason: <>Chain rule: the derivative of <Katex tex="u^{\frac13}" /> is <Katex tex="\tfrac13u^{-\frac23}" />, times the inner derivative 4.</>,
  },
  {
    working: <Katex display tex="g'(-4) = -\tfrac43(-8)^{-\frac23} = -\tfrac43\cdot\tfrac14 = -\tfrac13" />,
    reason: <><Katex tex="(-8)^{\frac23}=\left(\sqrt[3]{-8}\right)^2=(-2)^2=4" />.</>,
    more: <>Or without the rule for <Katex tex="g" />: the inverse&apos;s gradient is the reciprocal, <Katex tex="(f^{-1})'(0)=\tfrac{1}{f'(-4)}=\tfrac13" />, and reflecting in the <Katex tex="y" />-axis flips its sign.</>,
  },
  {
    working: <Katex display tex="f'(-4)\times g'(-4) = 3\times\left(-\tfrac13\right) = -1" />,
    reason: <>Two lines are perpendicular when the product of their gradients is <Katex tex="-1" />. The tangents to the two edges at <Katex tex="(-4,0)" /> are perpendicular, so the edges meet at a right angle.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{angle at } (-4,0) = 90^\circ}" />,
    reason: <>As required.</>,
    more: <>Another way to see it: the angle of <Katex tex="f" />&apos;s tangent is <Katex tex="\tan^{-1}3\approx71.6^\circ" /> above the <Katex tex="x" />-axis, and <Katex tex="g" />&apos;s is <Katex tex="\tan^{-1}\tfrac13\approx18.4^\circ" /> below it; together <Katex tex="90^\circ" />.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <Katex display tex="\text{tile centres } (8k,\ 0), \ k\in Z" />,
    reason: <>The shaded tiles in Figure 3 repeat every 8 units along the <Katex tex="x" />-axis. Each has four edges; family 1 (<Katex tex="g" />) is the lower-left one, so the other three families are the other three sides.</>,
  },
  {
    working: <Katex display tex="\text{upper left: } y = f(x-8k)" />,
    reason: <>For <Katex tex="k=0" /> this is <Katex tex="f" /> itself, from <Katex tex="(-4,0)" /> to <Katex tex="(0,4)" />. Shifting by <Katex tex="8k" /> gives the same edge of every other tile.</>,
  },
  {
    working: <Katex display tex="\text{lower right: } y = f(x-4-8k)-4" />,
    reason: <>For <Katex tex="k=0" /> this is <Katex tex="f_2" /> from part a., from <Katex tex="(0,-4)" /> to <Katex tex="(4,0)" />.</>,
  },
  {
    working: <Katex display tex="\text{upper right: } y = g(x-4-8k)+4" />,
    reason: <>The upper-right edge, from <Katex tex="(0,4)" /> to <Katex tex="(4,0)" />, is the shape of <Katex tex="g" /> (shallow at both ends, vertical in the middle) moved 4 right and 4 up: <Katex tex="g(-4)+4=4" /> and <Katex tex="g(0)+4=0" />.</>,
    more: <>VCAA writes this family as <Katex tex="-g(-x\pm8k)" /> and as <Katex tex="\sqrt[3]{-4(x-2\pm8k)}+2" />; all three are the same curves. The report also uses <Katex tex="\pm8k" /> in place of <Katex tex="-8k" />, which describes the same family since <Katex tex="k" /> runs over all integers.</>,
  },
  {
    working: (
      <table className="border-collapse text-[14px]">
        <tbody>
          <tr><td className="border border-gray-400 dark:border-gray-600 px-3 py-1.5">1.</td><td className="border border-gray-400 dark:border-gray-600 px-4 py-1.5"><Katex tex="y=g(x-8k)" /></td></tr>
          <tr><td className="border border-gray-400 dark:border-gray-600 px-3 py-1.5">2.</td><td className="border border-gray-400 dark:border-gray-600 px-4 py-1.5"><Katex tex="y=f(x-8k)" /></td></tr>
          <tr><td className="border border-gray-400 dark:border-gray-600 px-3 py-1.5">3.</td><td className="border border-gray-400 dark:border-gray-600 px-4 py-1.5"><Katex tex="y=f(x-4-8k)-4" /></td></tr>
          <tr><td className="border border-gray-400 dark:border-gray-600 px-3 py-1.5">4.</td><td className="border border-gray-400 dark:border-gray-600 px-4 py-1.5"><Katex tex="y=g(x-4-8k)+4" /></td></tr>
        </tbody>
      </table>
    ),
    reason: <>The completed table, each family in terms of <Katex tex="f" /> or <Katex tex="g" /> and <Katex tex="k\in Z" />, as asked. The order of rows 2–4 doesn&apos;t matter.</>,
  },
  {
    working: <FamiliesOverlay />,
    reason: <>Families 2, 3 and 4 traced on Figure 3: together with the given <Katex tex="g" /> edges they outline every shaded tile.</>,
  },
]

export default function MethodsQ4_2024NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (13 marks)</p>
        <p>Timothy has created a tiling pattern using transformations of the cubic function</p>
        <Katex display tex="f:[-4,0]\to R,\ f(x)=a(x-b)^3+c" />
        <p>
          where <Katex tex="a,b,c\in R" />
        </p>
        <p>
          On the graph below, the function <Katex tex="f" /> is shown in <b>bold</b>. The rest of
          Timothy&apos;s tiling pattern is shown with dashed lines, which are all images of
          transformations of <Katex tex="f" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={fig1Src}
            alt="Figure 1: a grid with x from −12 to 12 and y from −6 to 6, the bold cubic f from (−4, 0) through a flat point at (−2, 2) to (0, 4), and a repeating pattern of dashed transformed copies of it forming interlocking tiles — from the original VCAA exam paper"
            className="w-full max-w-[560px]"
          />
          <p className="text-center text-[13px] font-semibold text-gray-700 mt-1">Figure 1</p>
        </div>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Every edge in the pattern is a copy of <Katex tex="f" /> or of its reflection. Two
              transformation facts do almost all the work: <Katex tex="f(x-h)+k" /> moves a graph{' '}
              <Katex tex="h" /> right and <Katex tex="k" /> up, and <Katex tex="f(-x)" /> reflects
              it in the <Katex tex="y" />-axis. Track the endpoints and the flat point of each edge
              and the rules follow.
            </p>
            <p>
              Each shaded tile is the square with corners <Katex tex="(\pm4,0)" />,{' '}
              <Katex tex="(0,\pm4)" /> with its sides replaced by these wavy edges, and the tiles
              repeat every 8 units.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Translation"
        marks={1}
        statement={
          <>
            The translation of <Katex tex="f" /> given by <Katex tex="f_2(x)=f(x-4)-4" /> describes a
            different edge of one of the tiles.
            <br />
            Trace over the edge described by <Katex tex="f_2" /> on the graph in Figure 1, and label
            this edge <Katex tex="f_2" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Finding Parameters"
        marks={2}
        statement={
          <>
            Given that <Katex tex="f" /> has a stationary point of inflection at <Katex tex="(-2,2)" />{' '}
            and an axial intercept at <Katex tex="(0,4)" />, find the values of <Katex tex="a" />,{' '}
            <Katex tex="b" /> and <Katex tex="c" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Piecewise Function"
        marks={1}
        statement={
          <>
            The piecewise function, <Katex tex="p" />, is continuous, where the first component is{' '}
            <Katex tex="f" />, the other component is a <b>translation</b> of <Katex tex="f" /> and
            both are edges in Timothy&apos;s tiling pattern.
            <br />
            Complete a possible rule and domain for the second piece of the piecewise function{' '}
            <Katex tex="p" />.
            <Katex display tex="p(x)=\begin{cases} f(x) & -4\le x\le0\\[4pt] \underline{\qquad\qquad} & \underline{\qquad\qquad}\end{cases}" />
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Inverse Function"
        marks={2}
        statement={<>Find the rule and domain for <Katex tex="f^{-1}" />, the inverse function of <Katex tex="f" />.</>}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Transformed Inverse"
        marks={1}
        statement={
          <>
            Let <Katex tex="m,n\in R" /> and <Katex tex="g(x)=mf^{-1}(nx)" /> be a function
            describing a transformation of the inverse <Katex tex="f^{-1}" />.
            <br />
            Find the values of <Katex tex="m" /> and <Katex tex="n" />, given that{' '}
            <Katex tex="g(x)" /> describes the tile edge joining <Katex tex="(-4,0)" /> and{' '}
            <Katex tex="(0,-4)" />, shown in bold in Figure 2.
            <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={fig2Src}
                alt="Figure 2: the same tiling pattern with one tile shaded, its corners at (−4, 0), (0, 4), (4, 0) and (0, −4); its upper-left edge is labelled f and its lower-left edge, from (−4, 0) to (0, −4), is drawn in bold and labelled g, becoming vertical at (−2, −2) — from the original VCAA exam paper"
                className="w-full max-w-[560px]"
              />
              <p className="text-center text-[13px] font-semibold text-gray-700 mt-1">Figure 2</p>
            </div>
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Area"
        marks={2}
        statement={<>Find the area of one of the tiles. An example is shaded in Figure 2.</>}
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g"
        topic="Perpendicular Tangents"
        marks={2}
        statement={
          <>
            Using the derivatives of <Katex tex="f" /> and <Katex tex="g" /> at <Katex tex="x=-4" />,
            show that the angle at the left corner of the shaded tile, at the point{' '}
            <Katex tex="(-4,0)" />, is <Katex tex="90^\circ" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>

      <PartCard
        letter="h"
        topic="Families of Functions"
        marks={2}
        statement={
          <>
            The family of functions defined by
            <Katex display tex="y=g(x-8k),\qquad k\in Z" />
            gives an infinite set of edges in Timothy&apos;s tiling pattern, three of which are shown
            in bold on Figure 3.
            <div className="my-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={fig3Src}
                alt="Figure 3: the tiling pattern with three tiles shaded, centred at (−8, 0), (0, 0) and (8, 0); the lower-left edge of each, a copy of g, is drawn in bold — from the original VCAA exam paper"
                className="w-full max-w-[560px]"
              />
              <p className="text-center text-[13px] font-semibold text-gray-700 mt-1">Figure 3</p>
            </div>
            Three more families of functions can be used to bound an infinite set of tiles centred on
            the <Katex tex="x" />-axis, three of which are shaded on Figure 3.
            <br />
            Complete the table to define three such families of functions, in terms of the given
            functions <Katex tex="f" /> or <Katex tex="g" />, and a parameter <Katex tex="k\in Z" />.
            <table className="mt-3 border-collapse text-[14px]">
              <tbody>
                <tr><td className="border border-gray-400 dark:border-gray-600 px-3 py-1.5">1.</td><td className="border border-gray-400 dark:border-gray-600 px-4 py-1.5 min-w-[180px] text-center"><Katex tex="y=g(x-8k)" /></td></tr>
                <tr><td className="border border-gray-400 dark:border-gray-600 px-3 py-1.5">2.</td><td className="border border-gray-400 dark:border-gray-600 px-4 py-1.5">&nbsp;</td></tr>
                <tr><td className="border border-gray-400 dark:border-gray-600 px-3 py-1.5">3.</td><td className="border border-gray-400 dark:border-gray-600 px-4 py-1.5">&nbsp;</td></tr>
                <tr><td className="border border-gray-400 dark:border-gray-600 px-3 py-1.5">4.</td><td className="border border-gray-400 dark:border-gray-600 px-4 py-1.5">&nbsp;</td></tr>
              </tbody>
            </table>
          </>
        }
        examinerReport={EXAM_H}
      >
        <WorkingTable rows={ROWS_H} />
      </PartCard>
    </div>
  )
}
