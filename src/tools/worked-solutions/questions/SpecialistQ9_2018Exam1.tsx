// 2018 Specialist Mathematics — Exam 1, Question 9 (5 marks). A parametric hyperbola
// converted to cartesian form, its intersections with a line, and the volume of the solid
// of revolution between them. Question text transcribed from the original paper (no diagram
// given). Answers checked independently with sympy and against the VCAA examination report
// (x = 1, x = 3; 2π/3).
//
// Note: the first pass integrated (line² − curve²) and got a negative volume. The curve is
// the outer boundary on [1, 3], so the correct integrand is (curve² − line²), giving 2π/3.
// Solution is original.
//
// Interactive widgets: a. trace P = (sec t, (√2/2) tan t) as t varies — x² − 2y² stays 1, t ∈ R
// gives both branches, and a toggle draws the unit-circle right triangle behind sec²t − tan²t = 1
// (spec-2018e1-q9a-trace). c. a slice of the solid as a washer, side view and face-on, sweeping
// from x = 1 to 3 to accumulate 2π/3, with a toggle for the tempting π(R − r)² disc
// (spec-2018e1-q9c-washer); and the report's alternative route stepped through — hyperbola solid
// 10π/3 minus cone 8π/3 (spec-2018e1-q9c-cone).
// Wrong methods in c. (computed with sympy): π∫₁³(R − r)² dx = π(4/3 − √2 log_e(1 + √2)) ≈ 0.273;
// line² − curve² gives −2π/3; the disc formula with the hyperbola alone gives 10π/3. None is
// attributed to the report, which only says some students "did not apply the formula ...
// correctly" and many made algebraic or arithmetic errors. Part b has no widget: it is a single
// substitution, and both intersection points are shown in the part c diagrams.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TraceWidget = lazyWidget(() => import('../interactives/spec-2018e1-q9a-trace'))
const WasherWidget = lazyWidget(() => import('../interactives/spec-2018e1-q9c-washer'))
const ConeWidget = lazyWidget(() => import('../interactives/spec-2018e1-q9c-cone'))

const EXAM_A: SAExaminerStats = {
  marks: [13, 14, 73],
  average: 1.6,
  comment: (
    <>
      This question was answered well, with most students realising that a substitution into
      a trigonometric identity was required.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [30, 70],
  average: 0.7,
  comment: (
    <>
      Students needed to substitute <Katex tex="y=x-1" /> into the equation{' '}
      <Katex tex="x^2-2y^2=1" /> and solve the resulting quadratic equation for{' '}
      <Katex tex="x" />. A number of students gave the coordinates of the points of
      intersection and in some cases did not do this correctly.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [60, 21, 19],
  average: 0.6,
  comment: (
    <>
      Students found this question challenging. Some students did not apply the formula for
      the volume of a solid of revolution correctly. Many students made algebraic or
      arithmetic errors. A small number of students realised that the volume required could
      be found by finding the volume obtained by rotating the region bounded by the
      hyperbola, the <Katex tex="x" />-axis and the lines <Katex tex="x=1" /> and{' '}
      <Katex tex="x=3" /> about the <Katex tex="x" />-axis and then subtracting the volume of
      an appropriate cone.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x = \sec(t), \qquad y = \frac{\sqrt2}{2}\tan(t)" />,
    reason: <>A cartesian equation links <Katex tex="x" /> and <Katex tex="y" /> alone, so <Katex tex="t" /> has to go. The two coordinates are <Katex tex="\sec" /> and <Katex tex="\tan" /> of the same <Katex tex="t" />, and those two are tied together by a Pythagorean identity. Spotting that pair is the cue to use it.</>,
  },
  {
    working: <Katex display tex="\sec^2(t) - \tan^2(t) = 1" />,
    reason: <>Divide <Katex tex="\sin^2(t)+\cos^2(t)=1" /> by <Katex tex="\cos^2(t)" /> to get <Katex tex="\tan^2(t)+1=\sec^2(t)" />. Written as a difference, it has the same shape as the target <Katex tex="x^2-2y^2=1" />: a square minus a square equals <Katex tex="1" />. So we need <Katex tex="x^2" /> and <Katex tex="2y^2" /> in terms of <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="x^2 = \sec^2(t), \qquad y^2 = \frac12\tan^2(t) \implies \tan^2(t) = 2y^2" />,
    reason: <>Square both, since the identity is in squares. <Katex tex="\left(\tfrac{\sqrt2}{2}\right)^2=\tfrac24=\tfrac12" />, so multiplying <Katex tex="y^2" /> by <Katex tex="2" /> recovers <Katex tex="\tan^2(t)" />. That is where the <Katex tex="2" /> in <Katex tex="2y^2" /> comes from.</>,
  },
  {
    working: <Katex display tex="\boxed{x^2 - 2y^2 = \sec^2(t)-\tan^2(t) = 1}" />,
    reason: <>Substitute both into the identity. On a &ldquo;show that&rdquo;, write this last line out in full: the target equation has to appear, not just the substitution. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="x^2 - 2(x-1)^2 = 1" />,
    reason: <>A point of intersection lies on both graphs, so its coordinates satisfy both equations at once. Substituting the line <Katex tex="y=x-1" /> into the curve leaves one equation in <Katex tex="x" /> only, which is exactly what the question asks for.</>,
  },
  {
    working: <Katex display tex="x^2 - 2\left(x^2-2x+1\right) = 1 \implies -x^2+4x-2 = 1" />,
    reason: <>Expand the square first, then multiply the bracket by <Katex tex="-2" />. The <Katex tex="-2" /> multiplies every term, including the <Katex tex="+1" />.</>,
  },
  {
    working: <Katex display tex="x^2-4x+3 = 0 \implies (x-1)(x-3) = 0" />,
    reason: <>Move everything to one side and multiply by <Katex tex="-1" /> so the <Katex tex="x^2" /> term is positive, then factorise.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 1 \ \text{ and } \ x = 3}" />,
    reason: <>The question asks for the <Katex tex="x" />-coordinates only. The report notes students who gave full coordinate pairs, sometimes wrongly. (For reference the points are <Katex tex="(1,0)" />, the hyperbola&apos;s vertex, and <Katex tex="(3,2)" />. These two <Katex tex="x" />-values become the terminals of the integral in part c.)</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_a^b \left(y_{\text{outer}}^2 - y_{\text{inner}}^2\right)dx" />,
    reason: <>Cut the region into thin vertical strips. Spun about the <Katex tex="x" />-axis, each strip sweeps out a <em>washer</em>: a disc of radius <Katex tex="y_{\text{outer}}" /> with a hole of radius <Katex tex="y_{\text{inner}}" />. Its area is <Katex tex="\pi y_{\text{outer}}^2-\pi y_{\text{inner}}^2" />, the whole disc minus the hole, and the volume adds these up. Drag the slice in the first diagram below.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x=2: \ \ y_{\text{curve}}^2 &= \frac{4-1}{2} = \frac32 \\ y_{\text{line}}^2 &= (2-1)^2 = 1\end{aligned}" />,
    reason: <>Test a point between the intersections to see which boundary is further from the axis. The <em>curve</em> is outer, so it goes first. You can also see it without numbers: the hyperbola leaves its vertex <Katex tex="(1,0)" /> going straight up, while the line leaves at <Katex tex="45^\circ" />, so the curve is on top until they meet again at <Katex tex="x=3" />.</>,
  },
  {
    working: <Katex display tex="V = \pi\int_1^3\left(\frac{x^2-1}{2} - (x-1)^2\right)dx" />,
    reason: <>The terminals are the intersections from part b. From part a., <Katex tex="x^2-2y^2=1" /> rearranges to <Katex tex="y^2=\tfrac{x^2-1}{2}" />. There is no need to solve for <Katex tex="y" /> itself, since the formula only uses <Katex tex="y^2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\frac{x^2-1}{2}-(x-1)^2 \\ &= \frac{x^2-1-2x^2+4x-2}{2} \\ &= \frac{-x^2+4x-3}{2}\end{aligned}" />,
    reason: <>Put everything over a common denominator of <Katex tex="2" /> before integrating. The numerator is minus the quadratic from part b, which is why it is zero at <Katex tex="x=1" /> and <Katex tex="x=3" />: the washer has no area where the curves meet.</>,
  },
  {
    working: <Katex display tex="V = \frac{\pi}{2}\left[-\frac{x^3}{3}+2x^2-3x\right]_1^3" />,
    reason: <>Take the constant <Katex tex="\tfrac{\pi}{2}" /> outside, then antidifferentiate term by term.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x=3: \ \ &-9+18-9 = 0 \\ x=1: \ \ &-\tfrac13+2-3 = -\tfrac43 \\ V &=\tfrac{\pi}{2}\left[0-\left(-\tfrac43\right)\right]\end{aligned}" />,
    reason: <>Evaluate the bracket at each terminal separately, then subtract: upper minus lower. The upper terminal gives exactly zero; the lower gives <Katex tex="-\tfrac43" />, and subtracting a negative adds.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \frac{2\pi}{3}}" />,
    reason: <>Positive, as any volume must be (<Katex tex="\approx2.09" /> cubic units). The report mentions another route: rotate the region under the hyperbola from <Katex tex="x=1" /> to <Katex tex="x=3" /> (<Katex tex="\tfrac{10\pi}{3}" />), then subtract the cone made by the line (<Katex tex="\tfrac{8\pi}{3}" />). Step through it in the second diagram below. Only <Katex tex="19\%" /> of students scored both marks.</>,
  },
]

export default function SpecialistQ9_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 9 (5 marks)</p>
        <p>
          A curve is specified parametrically by{' '}
          <Katex tex="\underset{\sim}{r}(t)=\sec(t)\,\underset{\sim}{i}+\dfrac{\sqrt2}{2}\tan(t)\,\underset{\sim}{j},\ t\in R" />.
        </p>
      </div>

      <PartCard letter="a" topic="Cartesian Equation" marks={2} statement={<>Show that the cartesian equation of the curve is <Katex tex="x^2-2y^2=1" />.</>} examinerReport={EXAM_A}>
        <Background>
          <p>
            A parametric curve gives <Katex tex="x" /> and <Katex tex="y" /> separately, each in
            terms of <Katex tex="t" />. Its cartesian equation is the relation between{' '}
            <Katex tex="x" /> and <Katex tex="y" /> that holds for <em>every</em> value of{' '}
            <Katex tex="t" />. With trigonometric coordinates, a Pythagorean identity removes{' '}
            <Katex tex="t" />: <Katex tex="\cos" /> and <Katex tex="\sin" /> pair with{' '}
            <Katex tex="\cos^2+\sin^2=1" />; <Katex tex="\sec" /> and <Katex tex="\tan" /> pair
            with <Katex tex="\sec^2-\tan^2=1" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="Why every value of t lands on x² − 2y² = 1">
          <TraceWidget />
        </Explore>
      </PartCard>

      <PartCard letter="b" topic="Intersections" marks={1} statement={<>Find the <Katex tex="x" />-coordinates of the points of intersection of the curve <Katex tex="x^2-2y^2=1" /> and the line <Katex tex="y=x-1" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" topic="Volume of Revolution" marks={2} statement={<>Find the volume of the solid of revolution formed when the region bounded by the curve and the line is rotated about the <Katex tex="x" />-axis.</>} examinerReport={EXAM_C}>
        <Background>
          <p>
            Start with a sketch. The curve is the whole hyperbola (both branches, since{' '}
            <Katex tex="t\in R" />), but the line only meets the right branch, at{' '}
            <Katex tex="x=1" /> and <Katex tex="x=3" /> (part b). The region they bound is the
            thin sliver between the upper arc and the line, and it lies above the{' '}
            <Katex tex="x" />-axis.
          </p>
          <p>
            Two things then make this manageable. First, the formula needs{' '}
            <Katex tex="y^2" />, not <Katex tex="y" />, and part a. hands you{' '}
            <Katex tex="y^2=\tfrac{x^2-1}{2}" /> directly, so no square roots ever appear.
          </p>
          <p>
            Second, decide which curve is <em>outer</em> before writing the integral. Test one
            interior point. If the answer comes out negative, the order was wrong: a volume
            cannot be negative, so that is a free check.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="Each slice is a washer: π(R² − r²), not π(R − r)²">
          <WasherWidget />
        </Explore>
        <Explore title="The report's shortcut: the hyperbola's solid minus a cone">
          <ConeWidget />
        </Explore>
        <WrongMethod
          title="The radius is the gap between the curves, so square the difference"
          working={<Katex display tex="V=\pi\int_1^3\left(\sqrt{\frac{x^2-1}{2}}-(x-1)\right)^2dx" />}
        >
          A slice is not a disc of radius <Katex tex="R-r" />. It is a disc of radius{' '}
          <Katex tex="R" /> with a hole of radius <Katex tex="r" />, so its area is{' '}
          <Katex tex="\pi R^2-\pi r^2" />, and <Katex tex="(R-r)^2\ne R^2-r^2" />. Expanding the
          square also leaves a cross term <Katex tex="2(x-1)\sqrt{\tfrac{x^2-1}{2}}" />, and the{' '}
          <Katex tex="-\sqrt{x^2-1}" /> piece of it has no antiderivative you can find with the
          substitutions in this course. On a technology-free paper, an integral you can&apos;t do
          is a sign the setup is wrong. (This
          integral is about <Katex tex="0.27" />, not <Katex tex="\tfrac{2\pi}{3}\approx2.09" />.)
          Toggle <Katex tex="\pi(R-r)^2" /> in the washer diagram to see how small that disc is.
        </WrongMethod>
        <WrongMethod
          title="The straight line looks like the top edge, so it goes first"
          working={<Katex display tex="V=\pi\int_1^3\left((x-1)^2-\frac{x^2-1}{2}\right)dx=-\frac{2\pi}{3}" />}
        >
          On a rough sketch the hyperbola can look as if it sags below the line. It doesn&apos;t:
          it leaves <Katex tex="(1,0)" /> vertically, so it is on top all the way to{' '}
          <Katex tex="x=3" /> (check <Katex tex="x=2" />: <Katex tex="y^2=\tfrac32" /> against{' '}
          <Katex tex="1" />). A negative volume always means the outer and inner radii are the
          wrong way round. Go back and swap them in the integral, rather than quietly dropping the
          minus sign.
        </WrongMethod>
        <WrongMethod
          title="It's the hyperbola being rotated, so use π∫y² dx with the hyperbola's y"
          working={<Katex display tex="V=\pi\int_1^3\frac{x^2-1}{2}\,dx=\frac{10\pi}{3}" />}
        >
          That is the disc formula, which is for a region reaching all the way down to the{' '}
          <Katex tex="x" />-axis: it gives the whole solid under the hyperbola. But the region in
          this question stops at the line, not the axis, so the solid has a cone-shaped hole in
          it. Only a washer formula
          (or subtracting the cone&apos;s <Katex tex="\tfrac{8\pi}{3}" />, as in the second diagram)
          removes it. Quick check: the region is a thin sliver, so its solid should be much smaller
          than <Katex tex="\tfrac{10\pi}{3}\approx10.5" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
