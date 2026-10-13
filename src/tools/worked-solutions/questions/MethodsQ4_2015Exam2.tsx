// 2015 Mathematical Methods (CAS) — Exam 2, Section 2 Question 4 (9 marks).
// f(x)=2sin(x), g(x)=(1/2)sin(2x), h(x)=(1/3)sin(3x) on [0,2π] — areas between curves,
// graphing, transformations, and a generalisation to k(x)=m·sin(x), q(x)=(1/n)sin(nx).
// Question text transcribed from the original paper; both diagrams are cropped from the
// original VCAA exam PDF, and part b.'s answer is an SVG overlay on the cropped figure.
// Answers checked with sympy and against the VCAA examination report. Solution is original.
//
// (Recatalogued from an earlier, incorrect "2014 Exam 1 Q4" attribution — the real 2014
// Exam 1 Q4 is an unrelated 2-mark "solve 2^(3x-3)=8^(2-x)" question, confirmed against
// that paper. This content matches 2015 Exam 2 Q4 exactly, confirmed against both the
// source PDF and its examiner report, whose stats are now included below.)
//
// Interactives (Detailed only) on the parts under 40% full marks: a. (two regions, not one),
// d.i (the ∫_0^{2π} signed-area trap), d.ii (q's half-waves cancel for even n, one is left over for odd n).

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { functionToPath } from '../graphUtils'
import shadedGraphSrc from './meth-2015e2-q4-shaded-region.png'
import fAxesSrc from './meth-2015e2-q4b-f-axes.png'
import { Explore, lazyWidget } from '../Explore'

const TwoRegionsWidget = lazyWidget(() => import('../interactives/meth-2015e2-q4a-two-regions'))
const FullIntervalWidget = lazyWidget(() => import('../interactives/meth-2015e2-q4di-full-interval'))
const LobesWidget = lazyWidget(() => import('../interactives/meth-2015e2-q4dii-lobes'))

const EXAM_A: SAExaminerStats = {
  marks: [64, 36],
  average: 0.4,
  comment: <>This question was not answered well. Many students wrote <Katex tex="a=2" />.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [19, 14, 67],
  average: 1.5,
  comment: (
    <>
      Many students drew accurate graphs. Some students did not have the <Katex tex="x" />
      -intercepts and turning points in the right positions. Most students drew one continuous
      curve, without any shading.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [35, 24, 41],
  average: 1.1,
  comment: <>Many students did not give the correct wording when describing the dilations.</>,
}

const EXAM_DI: SAExaminerStats = {
  marks: [73, 16, 12],
  average: 0.4,
  comment: (
    <>
      This question was not answered well. Many students evaluated{' '}
      <Katex tex="\int_0^{2\pi}k(x)-q(x)\,dx" />. Many did not realise that when <Katex tex="n" /> is even,{' '}
      <Katex tex="\cos(n\pi)=1" />.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [81, 10, 9],
  average: 0.3,
  comment: (
    <>
      This question was not answered well. Many students did not realise that when{' '}
      <Katex tex="n" /> is odd, <Katex tex="\cos(n\pi)=-1" />.
    </>
  ),
}

const rowsA: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} 2\sin x &= \tfrac12\sin 2x \\ &= \sin x\cos x \end{aligned}" />
        <Katex display tex="\implies\; \sin x(2-\cos x)=0" />
      </>
    ),
    reason: (
      <>
        Find where <Katex tex="f" /> and <Katex tex="g" /> meet: use <Katex tex="\sin 2x=2\sin x\cos x" />, then
        factorise. Since <Katex tex="\cos x \le 1 < 2" />, the factor <Katex tex="(2-\cos x)" /> is never zero.
      </>
    ),
  },
  {
    working: <Katex display tex="\sin x=0 \implies x = 0, \pi, 2\pi \quad \text{on } [0,2\pi]" />,
    reason: <>These are the ends of the two shaded regions.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\int_0^{\pi}\!\Bigl(2\sin x-\tfrac12\sin 2x\Bigr)dx" />
        <Katex display tex="= \Bigl[-2\cos x+\tfrac14\cos 2x\Bigr]_0^{\pi}" />
        <Katex display tex="= \bigl(2+\tfrac14\bigr)-\bigl(-2+\tfrac14\bigr) = 4" />
      </>
    ),
    reason: (
      <>
        On <Katex tex="(0,\pi)" />, <Katex tex="f-g=\sin x(2-\cos x)>0" />, so <Katex tex="f" /> is on top: integrate top
        minus bottom.
      </>
    ),
    more: (
      <>
        The report's shortcut:{' '}
        <Katex tex="\int_0^\pi \tfrac12\sin 2x\,dx=0" />, because <Katex tex="(0,\pi)" /> is exactly one full period of{' '}
        <Katex tex="g" />, whose hump above the axis cancels its dip below. So the region's area is just{' '}
        <Katex tex="\int_0^\pi 2\sin x\,dx=4" />, the area under <Katex tex="f" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\int_\pi^{2\pi}\!\Bigl(\tfrac12\sin 2x-2\sin x\Bigr)dx = 4" />
        <Katex display tex="\text{Total shaded area} = 4+4 = 8" />
      </>
    ),
    reason: (
      <>
        On <Katex tex="(\pi,2\pi)" />, <Katex tex="g" /> is on top. This region is the first turned half a turn about{' '}
        <Katex tex="(\pi,0)" />, so it also has area 4.
      </>
    ),
    more: (
      <>
        Both functions satisfy <Katex tex="y(2\pi-x)=-y(x)" />, which is exactly that half-turn symmetry. In the report's form,
        the total is <Katex tex="2\int_0^\pi 2\sin x\,dx=\int_0^\pi 4\sin x\,dx" />, which shows <Katex tex="a=4" />{' '}
        straight away.
      </>
    ),
  },
  {
    working: <Katex display tex="a\int_0^\pi \sin x\,dx = a[-\cos x]_0^\pi = 2a" />,
    reason: <>The total area is given in the form <Katex tex="a\displaystyle\int_0^\pi \sin x\,dx" />.</>,
  },
  {
    working: <Katex display tex="\boxed{2a=8 \implies a=4}" />,
    reason: <>Equate the two expressions for the total area.</>,
    more: (
      <>
        The report's common wrong answer <Katex tex="a=2" /> gives an area of only <Katex tex="2(2)=4" />: one of the two
        shaded regions. The question asks for the <em>total</em> area, so both count. A sanity check on the size: each
        region sits inside a <Katex tex="\pi\times2" /> box of area about 6.3 and covers well over half of it, so 4 each
        is about right.
      </>
    ),
  },
]

const rowsB: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} &\text{amplitude } \tfrac13,\quad \text{period } \tfrac{2\pi}{3} \\ &x\text{-int: } 0,\ \tfrac{\pi}{3},\ \tfrac{2\pi}{3},\ \pi,\ \tfrac{4\pi}{3},\ \tfrac{5\pi}{3},\ 2\pi \\ &\max \text{ at } \bigl(\tfrac{\pi}{6},\tfrac13\bigr),\ \bigl(\tfrac{5\pi}{6},\tfrac13\bigr),\ \bigl(\tfrac{3\pi}{2},\tfrac13\bigr) \\ &\min \text{ at } \bigl(\tfrac{\pi}{2},-\tfrac13\bigr),\ \bigl(\tfrac{7\pi}{6},-\tfrac13\bigr),\ \bigl(\tfrac{11\pi}{6},-\tfrac13\bigr) \end{aligned}"
      />
    ),
    reason: (
      <>
        Read the amplitude and period off <Katex tex="h(x)=\tfrac13\sin(3x)" />. A half-period is{' '}
        <Katex tex="\tfrac{\pi}{3}" />, so intercepts are <Katex tex="\tfrac{\pi}{3}" /> apart, with a turning point halfway
        between each pair.
      </>
    ),
    more: (
      <>
        Check the turning points with <Katex tex="h'(x)=\cos(3x)=0" />, giving{' '}
        <Katex tex="3x=\tfrac{\pi}{2},\tfrac{3\pi}{2},\ldots" />, so <Katex tex="x=\tfrac{\pi}{6},\tfrac{\pi}{2},\ldots" />.
        A useful landmark: <Katex tex="h" /> has a minimum at <Katex tex="x=\tfrac{\pi}{2}" />, right under{' '}
        <Katex tex="f" />'s maximum, and a maximum at <Katex tex="x=\tfrac{3\pi}{2}" />, right above <Katex tex="f" />'s
        minimum. The report notes some students put the <Katex tex="x" />-intercepts and turning points in the wrong
        places, so mark them against the printed scale before drawing. Draw one smooth curve; no shading is asked for.
      </>
    ),
  },
  {
    working: (
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
        <LogoOverlay />
      </div>
    ),
    reason: (
      <>
        Sketch through those points (<Katex tex="h" /> in orange): three full cycles over <Katex tex="[0,2\pi]" />, much
        flatter and faster than <Katex tex="f" />.
      </>
    ),
  },
]

const rowsC: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=2\sin x \;\xrightarrow{\ \times \frac13 \text{ horizontally}\ }\; 2\sin(3x)" />,
    reason: <>Dilation of factor <Katex tex="\tfrac13" /> from the <Katex tex="y" />-axis: replace <Katex tex="x" /> with <Katex tex="3x" />, compressing the period from <Katex tex="2\pi" /> to <Katex tex="\tfrac{2\pi}{3}" />.</>,
  },
  {
    working: <Katex display tex="2\sin(3x) \;\xrightarrow{\ \times \frac16 \text{ vertically}\ }\; \tfrac13\sin(3x) = h(x)" />,
    reason: <>Dilation of factor <Katex tex="\tfrac16" /> from the <Katex tex="x" />-axis: multiply the output by <Katex tex="\tfrac16" />, shrinking the amplitude from 2 to <Katex tex="\tfrac13" />.</>,
  },
  {
    working: (
      <p>
        <b>Transformations:</b> a dilation of factor <Katex tex="\tfrac16" /> from the{' '}
        <Katex tex="x" />-axis, and a dilation of factor <Katex tex="\tfrac13" /> from the{' '}
        <Katex tex="y" />-axis.
      </p>
    ),
    reason: <>Name each dilation by its factor and the axis it is <em>from</em>.</>,
    more: (
      <>
        The report notes many students did not use the correct wording. Write "dilation by a factor of ... from the
        ...-axis" (or "parallel to" the other axis). Phrases like "compressed by 3" or "horizontal dilation by 3", or a
        factor with no axis, do not describe the transformation precisely. Check: the mapping{' '}
        <Katex tex="(x,y)\to\bigl(\tfrac{x}{3},\tfrac{y}{6}\bigr)" /> sends a point of <Katex tex="y=2\sin x" /> to{' '}
        <Katex tex="(X,Y)" /> with <Katex tex="x=3X,\ y=6Y" />, so <Katex tex="6Y=2\sin(3X)" />, i.e.{' '}
        <Katex tex="Y=\tfrac13\sin(3X)" />. Two dilations can be done in either order.
      </>
    ),
  },
]

const rowsDi: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Area} = 2\int_0^\pi \bigl(k(x)-q(x)\bigr)\,dx" />,
    reason: (
      <>
        As in part a. (graph <Katex tex="k" /> and <Katex tex="q" /> on CAS for a few <Katex tex="m,n" /> to see it), they
        meet only at <Katex tex="x=0,\pi,2\pi" />, with <Katex tex="k" /> on top on <Katex tex="(0,\pi)" />; the region
        on <Katex tex="(\pi,2\pi)" /> is a congruent copy.
      </>
    ),
    more: (
      <>
        Why the graphs look like this: <Katex tex="k" /> rises with gradient <Katex tex="m\ge2" /> at the origin, while{' '}
        <Katex tex="q" /> stays within <Katex tex="\pm\tfrac1n" /> and starts with gradient 1. (A full proof uses{' '}
        <Katex tex="|\sin(nx)|\le n|\sin x|" />, which is beyond Methods.) Both functions satisfy{' '}
        <Katex tex="y(2\pi-x)=-y(x)" />, so the region on <Katex tex="(\pi,2\pi)" /> is the first one turned half a turn
        about <Katex tex="(\pi,0)" />. The report notes many students evaluated{' '}
        <Katex tex="\int_0^{2\pi}k(x)-q(x)\,dx" />: on <Katex tex="(\pi,2\pi)" /> it is <Katex tex="q" /> that is on top,
        so that half counts as negative and cancels the first, giving 0. Split the integral wherever the curves cross.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\int_0^\pi m\sin x\,dx = \bigl[-m\cos x\bigr]_0^\pi = 2m" />
        <Katex display tex="\int_0^\pi \tfrac1n\sin(nx)\,dx = \Bigl[-\tfrac{1}{n^2}\cos(nx)\Bigr]_0^\pi" />
        <Katex display tex="= \frac{1-\cos(n\pi)}{n^2}" />
      </>
    ),
    reason: (
      <>
        Integrate each function separately. An antiderivative of <Katex tex="\sin(nx)" /> is{' '}
        <Katex tex="-\tfrac1n\cos(nx)" />, and <Katex tex="\cos 0=1" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\text{Area} = 2\left(2m-\frac{1-\cos(n\pi)}{n^2}\right)" />
        <Katex display tex="= 4m+\frac{2\cos(n\pi)-2}{n^2}" />
      </>
    ),
    reason: (
      <>
        Double the top-minus-bottom integral (two congruent regions), then expand. Keep <Katex tex="\cos(n\pi)" /> until
        you use whether <Katex tex="n" /> is even or odd.
      </>
    ),
  },
  {
    working: <Katex display tex="n \text{ even} \;\implies\; \cos(n\pi)=1" />,
    reason: (
      <>
        For even <Katex tex="n" />, <Katex tex="n\pi" /> is a whole number of full turns (
        <Katex tex="2\pi, 4\pi,\ldots" />), so <Katex tex="\cos(n\pi)=1" />.
      </>
    ),
    more: (
      <>
        The report notes many students did not realise this. On the graph: <Katex tex="q" /> has period{' '}
        <Katex tex="\tfrac{2\pi}{n}" />, so <Katex tex="(0,\pi)" /> holds exactly <Katex tex="\tfrac n2" /> full periods,
        and its parts above and below the axis cancel: <Katex tex="\int_0^\pi q(x)\,dx=0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = 4m + \dfrac{2(1)-2}{n^2} = 4m + \dfrac{0}{n^2}}" />,
    reason: <>In the required form <Katex tex="am+\tfrac{b}{n^2}" />, <Katex tex="a=4" /> and <Katex tex="b=0" />.</>,
    more: <>Consistent with part a.: <Katex tex="m=2,\ n=2" /> (even) gives <Katex tex="4(2)=8" />. ✓</>,
  },
]

const rowsDii: WorkingRow[] = [
  {
    working: <Katex display tex="n \text{ odd} \;\implies\; \cos(n\pi)=-1" />,
    reason: (
      <>
        For odd <Katex tex="n" />, <Katex tex="n\pi" /> is <Katex tex="\pi" /> plus whole turns, so{' '}
        <Katex tex="\cos(n\pi)=\cos\pi=-1" />.
      </>
    ),
    more: (
      <>
        The report notes many students did not realise this. On the graph: over <Katex tex="(0,\pi)" />,{' '}
        <Katex tex="q" /> is <Katex tex="n" /> half-waves, each of area <Katex tex="\tfrac{2}{n^2}" />, alternately above
        and below the axis. For odd <Katex tex="n" /> one half-wave above is left over, so{' '}
        <Katex tex="\int_0^\pi q(x)\,dx=\tfrac{1-(-1)}{n^2}=\tfrac{2}{n^2}" />, and this is taken off each of the two
        halves of the enclosed area.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{Area} = 4m+\frac{2(-1)-2}{n^2}" />,
    reason: <>Substitute into the general area from part d.i.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = 4m - \dfrac{4}{n^2}}" />,
    reason: <>In the same form, <Katex tex="a=4" /> and <Katex tex="b=-4" />.</>,
    more: (
      <>
        Check with <Katex tex="m=2,\ n=3" /> (the design from part b.): <Katex tex="8-\tfrac49\approx7.56" />, a little
        less than part a.'s 8, by the two left-over half-waves of <Katex tex="h" />, each of area{' '}
        <Katex tex="\tfrac29" />.
      </>
    ),
  },
]

export default function MethodsQ4_2015Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (9 marks)</p>
        <p className="mb-2">
          An electronics company is designing a new logo, based initially on the graphs of the
          functions <Katex tex="f(x)=2\sin(x)" /> and <Katex tex="g(x)=\tfrac12\sin(2x)" />, for{' '}
          <Katex tex="0 \le x \le 2\pi" />.
        </p>
        <p className="mb-2">
          These graphs are shown in the diagram below, in which the measurements in the{' '}
          <Katex tex="x" /> and <Katex tex="y" /> directions are in metres.
        </p>
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3 mt-3 w-fit">
          <img loading="lazy" decoding="async"
            src={shadedGraphSrc}
            alt="Graphs of f(x)=2sin(x) and g(x)=(1/2)sin(2x) on [0,2π], with the regions enclosed between them shaded, from the original 2015 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
        <p className="mt-3">
          The logo is to be painted onto a large sign, with the area enclosed by the graphs of the
          two functions (shaded in the diagram) to be painted red.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Definite Integral"
        marks={1}
        statement={
          <>
            The total area of the shaded regions, in square metres, can be calculated as{' '}
            <Katex tex="a\displaystyle\int_0^\pi \sin(x)\,dx" />. What is the value of{' '}
            <Katex tex="a" />?
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={rowsA} />
        <Explore title="The total is two regions, so a·∫sin x must cover 8, not 4">
          <TwoRegionsWidget />
        </Explore>
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        The electronics company considers changing the circular functions used in the design of
        the logo. Its next attempt uses the graphs of the functions <Katex tex="f(x)=2\sin(x)" />{' '}
        and <Katex tex="h(x)=\tfrac13\sin(3x)" />, for <Katex tex="0 \le x \le 2\pi" />.
      </div>

      <PartCard
        letter="b"
        topic="Sketch Graph"
        marks={2}
        statement={
          <>
            <p className="mb-2">
              On the axes below, the graph of <Katex tex="y=f(x)" /> has been drawn. On the same
              axes, draw the graph of <Katex tex="y=h(x)" />.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={fAxesSrc}
                alt="Axes with y=2sin(x) already drawn on them, from the original 2015 VCAA exam paper"
                className="w-full max-w-[300px]"
              />
            </div>
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={rowsB} />
      </PartCard>

      <PartCard letter="c" topic="Transformations" marks={2} statement={<>State a sequence of two transformations that maps the graph of <Katex tex="y=f(x)" /> to the graph of <Katex tex="y=h(x)" />.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={rowsC} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        The electronics company now considers using the graphs of the functions{' '}
        <Katex tex="k(x) = m\sin(x)" /> and <Katex tex="q(x) = \tfrac1n\sin(nx)" />, where{' '}
        <Katex tex="m" /> and <Katex tex="n" /> are positive integers with <Katex tex="m \ge 2" />{' '}
        and <Katex tex="0 \le x \le 2\pi" />.
      </div>

      <PartCard
        letter="d.i"
        topic="Area Between Curves"
        marks={2}
        statement={
          <>
            Find the area enclosed by the graphs of <Katex tex="y=k(x)" /> and{' '}
            <Katex tex="y=q(x)" /> in terms of <Katex tex="m" /> and <Katex tex="n" /> if{' '}
            <Katex tex="n" /> is even. Give your answer in the form <Katex tex="am+\dfrac{b}{n^2}" />, where <Katex tex="a" /> and <Katex tex="b" /> are integers.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={rowsDi} />
        <Explore title="Integrating k − q straight across [0, 2π] always gives 0">
          <FullIntervalWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Area Between Curves"
        marks={2}
        statement={
          <>
            Find the area enclosed by the graphs of <Katex tex="y=k(x)" /> and{' '}
            <Katex tex="y=q(x)" /> in terms of <Katex tex="m" /> and <Katex tex="n" /> if{' '}
            <Katex tex="n" /> is odd. Give your answer in the same form.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={rowsDii} />
        <Explore title="Odd n leaves one half-wave of q uncancelled on (0, π)">
          <LobesWidget />
        </Explore>
      </PartCard>
    </div>
  )
}

// Overlays h(x)=(1/3)sin(3x) (orange, computed exactly via functionToPath) on top of the
// *real* cropped VCAA figure, which already has f(x)=2sin(x) drawn on it — rather than
// redrawing f itself. Pixel calibration (ox, oy, scaleX, scaleY) was measured directly off
// the real image: ox/oy from where the printed x- and y-axis lines cross, scaleX/scaleY
// cross-checked against the printed curve's own peak (π/2, 2) and trough (3π/2, −2) pixels
// — both agree to within ~1px, so the overlay lines up with the real image, not an
// approximation of it.
function LogoOverlay() {
  const ox = 116.5
  const oy = 544
  const scaleX = 167.75
  const scaleY = 251.5
  const toSvgX = (x: number) => ox + x * scaleX
  const toSvgY = (y: number) => oy - y * scaleY
  const h = (x: number) => (1 / 3) * Math.sin(3 * x)
  return (
    <div className="relative w-full max-w-[340px]">
      <img loading="lazy" decoding="async"
        src={fAxesSrc}
        alt="Axes with y=2sin(x) already drawn on them, from the original 2015 VCAA exam paper"
        className="w-full block"
      />
      <svg viewBox="0 0 1358 1091" className="absolute inset-0 w-full h-full">
        <path d={functionToPath(h, 0, 2 * Math.PI, toSvgX, toSvgY)} fill="none" stroke="#f97316" strokeWidth={5} />
      </svg>
    </div>
  )
}
