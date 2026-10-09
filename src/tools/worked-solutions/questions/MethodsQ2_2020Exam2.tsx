// 2020 Mathematical Methods — Exam 2, Section B Question 2 (11 marks). A river between two
// cosine banks: distances north, east and minimum, two areas, and a dilation constraint.
// Question text transcribed from the original paper; the figure is a crop of VCAA's own
// artwork. Answers checked with sympy/scipy and against the VCAA examination report and itute
// (which agrees on every part). Solution is original.
//
// Interactive diagrams (§15), all this site's own explanatory figures plotted from the question's
// rules: part c. drags the landing point Q along the north bank, with a circle centred at P that
// only just touches the bank at the closest point and a graph of d(x) beneath, plus buttons for the
// part a. and b. swims (interactives/meth-2020e2-q2c-shortest.tsx); part d. slides every vertical
// slice of the river down until it is a 200 × 10 rectangle (interactives/meth-2020e2-q2d-straighten.tsx);
// part e. sweeps a strip across the 'no swimming' zone whose roof switches between y = 30 and the
// north bank, with a toggle for the f₁ − f₂-all-the-way error (interactives/meth-2020e2-q2e-roof.tsx);
// part f. stretches the north bank by k, with width bars, the 20 m limit curve and a toggle for the
// check-only-at-P error (interactives/meth-2020e2-q2f-stretch.tsx).
//
// Notes on the sources:
// - Report 2e: its comment "∫₅₀¹⁰⁰(f₁ − f₂)dx = 1000 was often seen" is kept verbatim, but that
//   integral is 10 × 50 = 500; 1000 is ∫₅₀¹⁵⁰(f₁ − f₂)dx, the whole river from P to x = 150 (or
//   2∫₅₀¹⁰⁰ by symmetry). The WrongMethod box says so without guessing which the students wrote. The third of the report's sample set-ups for 2e,
//   2(∫₅₀^{200/3}(30 − f₂)dx + ∫_{200/3}^{100}(30 − f₁)dx), gives 606.6 as printed; the second
//   integrand should be f₁ − f₂ (then 837.25). Sample answers are not copied into `comment`
//   (§12.7), so neither slip appears on the page except as described in the working.
// - Part c.: one tutor's video (LMK) finds the landing point from the normal to the SOUTH bank at
//   P (x = 54.509, d = 8.47534). The shortest segment is perpendicular to the NORTH bank at the
//   landing point (the report's second method, x = 54.4769, d = 8.47526); the two agree to 1 d.p.
//   only because the banks are nearly parallel near P. The solution uses the correct condition.
// - Part c. degree-mode slip (ATAR Notes 2020 exam discussion: "it would only mess up the river
//   question"): fMin in degree mode gives 29.99 m, computed with scipy.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'
import riverSrc from './meth-2020e2-q2-river.png'

const ShortestWidget = lazyWidget(() => import('../interactives/meth-2020e2-q2c-shortest'))
const StraightenWidget = lazyWidget(() => import('../interactives/meth-2020e2-q2d-straighten'))
const RoofWidget = lazyWidget(() => import('../interactives/meth-2020e2-q2e-roof'))
const StretchWidget = lazyWidget(() => import('../interactives/meth-2020e2-q2f-stretch'))

const EXAM_A: SAExaminerStats = {
  marks: [11, 89],
  average: 0.9,
  comment: <>Some students used the distance formula, which was not an efficient approach.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [21, 27, 52],
  average: 1.3,
  comment: (
    <>
      Some students subtracted 30 instead of 50, giving <Katex tex="\dfrac{110}{3}" /> as their
      final answer. Others did not subtract, leaving their answer as{' '}
      <Katex tex="x=\dfrac{200}{3}" />. Exact answers were required; 16.7 was often seen.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [56, 11, 33],
  average: 0.8,
  comment: (
    <>
      Most students used the first method. Some found the <Katex tex="x" /> value but not the
      minimum distance. The distance formula was often set up correctly, but the incorrect{' '}
      <Katex tex="x" /> value was given. Students need to check that they have entered their
      formulas correctly into their technology.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [20, 80],
  average: 0.8,
}

const EXAM_E: SAExaminerStats = {
  marks: [52, 19, 4, 26],
  average: 1,
  comment: (
    <>
      There were various approaches to this question. Appropriate working needed to be shown.
      <br />
      <Katex tex="\displaystyle\int_{50}^{100}\bigl(f_1(x)-f_2(x)\bigr)dx=1000" /> was often seen.
      Some students incorrectly used triangles:
      <br />
      <Katex tex="\displaystyle A=2\times\frac12\times\frac{50}{3}\times10+\int_{200/3}^{400/3}\bigl(f_1(x)-f_2(x)\bigr)dx" />
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [78, 15, 7],
  average: 0.3,
  comment: (
    <>
      Some students were able to set up an appropriate inequality. There was no need to write
      out the expression for <Katex tex="f_1(x)" /> and <Katex tex="f_2(x)" /> as this often led to
      errors such as{' '}
      <Katex tex="20k\cos\left(\frac{\pi x}{100}\right)+40k-20\cos\left(\frac{\pi x}{100}\right)+30" />{' '}
      instead of{' '}
      <Katex tex="20k\cos\left(\frac{\pi x}{100}\right)+40k-20\cos\left(\frac{\pi x}{100}\right)-30" />.
      Some students did not substitute either <Katex tex="x=0" /> or <Katex tex="x=200" /> into the
      equation, leaving their answer as{' '}
      <Katex tex="k<\dfrac{2\cos\left(\frac{\pi x}{100}\right)+5}{2\left(\cos\left(\frac{\pi x}{100}\right)+2\right)}" />.
      A common incorrect approach was solving <Katex tex="kf_1(50)-f_2(50)<20" />, giving{' '}
      <Katex tex="k<\dfrac54" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{north} \implies x \text{ stays at } 50" />,
    reason: <>The vertical axis points north, so swimming north means moving straight up the page: the swimmer&apos;s <Katex tex="x" />-coordinate stays at P&apos;s <Katex tex="50" /> and only <Katex tex="y" /> changes. They land on the north bank directly above P.</>,
  },
  {
    working: <Katex display tex="f_1(50) = 20\cos\!\left(\tfrac\pi2\right)+40 = 40" />,
    reason: <>The height of the north bank at <Katex tex="x=50" />, so the landing point is <Katex tex="(50,40)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{40-30 = 10\ \text{m}}" />,
    reason: <>A vertical swim is just the difference in heights. No distance formula is needed (the report notes some students used it, which was not efficient). In fact <Katex tex="f_1(x)-f_2(x)=10" /> for every <Katex tex="x" />, because the two rules differ only in their constant term: every north–south crossing of this river is 10 m, wherever you start. Parts d., e. and f. all lean on this.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{east} \implies y \text{ stays at } 30" />,
    reason: <>East is the positive <Katex tex="x" />-direction, so the swim is horizontal: the swimmer stays at P&apos;s height, <Katex tex="y=30" />, the whole way. They reach the north bank where the bank itself is at height 30.</>,
  },
  {
    working: <Katex display tex="f_1(x) = 30 \implies \cos\!\left(\tfrac{\pi x}{100}\right) = -\tfrac12" />,
    reason: <>Solving <Katex tex="20\cos\!\left(\tfrac{\pi x}{100}\right)+40=30" />.</>,
  },
  {
    working: <Cas fn="solve">solve(f1(x) = 30, x) | 50 ≤ x ≤ 100</Cas>,
    reason: <>On CAS, with <Katex tex="f_1" /> defined first. In <Katex tex="[0,200]" /> the equation has two solutions, <Katex tex="\tfrac{200}{3}" /> and <Katex tex="\tfrac{400}{3}" />: the line <Katex tex="y=30" /> crosses the north bank on both sides of the dip. Swimming east from <Katex tex="x=50" />, the swimmer hits the first one, so restrict to just east of P.</>,
  },
  {
    working: <Katex display tex="\tfrac{\pi x}{100} = \tfrac{2\pi}{3} \implies x = \tfrac{200}{3}" />,
    reason: <>By hand: for <Katex tex="50\le x\le100" />, <Katex tex="\tfrac{\pi x}{100}" /> runs from <Katex tex="\tfrac\pi2" /> to <Katex tex="\pi" />, and the only angle there with cosine <Katex tex="-\tfrac12" /> is <Katex tex="\tfrac{2\pi}{3}" />. This is the <Katex tex="x" />-coordinate of the landing point <Katex tex="\left(\tfrac{200}{3},30\right)" />, not yet the distance (the report notes some students stopped here).</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{200}{3}-50 = \tfrac{50}{3}\ \text{m}}" />,
    reason: <>Both ends of the swim are at height 30, so its length is the change in <Katex tex="x" />: landing <Katex tex="x" /> minus starting <Katex tex="x" />. Exact, as the question requires (the report notes 16.7 was often seen). Check: <Katex tex="\tfrac{50}{3}\approx16.7" /> m is longer than the 10 m swim north, as it should be, since the swim cuts across the river at a slant.</>,
    more: <>The &ldquo;Due east&rdquo; button in the diagram in part c. shows this swim.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="Q\bigl(x, f_1(x)\bigr) \text{ on the north bank}" />,
    reason: <>The swimmer may now land anywhere on the north bank, so call the landing point <Katex tex="Q" /> and leave its <Katex tex="x" />-coordinate free. Each choice of <Katex tex="x" /> is a different swim with a different length.</>,
  },
  {
    working: <Katex display tex="d(x) = \sqrt{(x-50)^2+\bigl(f_1(x)-30\bigr)^2}" />,
    reason: <>The length of <Katex tex="PQ" /> from <Katex tex="P(50,30)" />, by the distance formula (Pythagoras on the horizontal and vertical gaps). The question becomes: which <Katex tex="x" /> makes <Katex tex="d(x)" /> smallest?</>,
  },
  {
    working: <Cas fn="fMin">fMin(d(x), x) | 50 ≤ x ≤ 100</Cas>,
    reason: <>Define <Katex tex="f_1" /> and <Katex tex="d" /> on the CAS first, so the formula is typed only once (the report says students need to check that they have entered their formulas correctly). The picture says the closest point is just east of P, so restricting to <Katex tex="50\le x\le100" /> is safe. Calculator in <b>radians</b>.</>,
  },
  {
    working: <Katex display tex="x = 54.4769\ldots" />,
    reason: <>Just east of P. Why east? The shortest swim meets the north bank at right angles: a circle centred at P that only just touches the bank touches it at the closest point, and a circle&apos;s radius meets a line that touches it at <Katex tex="90^\circ" />. The bank slopes down to the east, so the line at right angles to it leans east of due north. That gives the report&apos;s second method: gradient of <Katex tex="PQ" /> <Katex tex="\times" /> gradient of the bank <Katex tex="=-1" />, i.e. <Katex tex="\tfrac{f_1(x)-30}{x-50}=-\tfrac{1}{f_1'(x)}" />, which gives the same <Katex tex="x" />.</>,
    more: <>Drag Q in the diagram below.</>,
  },
  {
    working: <Katex display tex="d(54.4769\ldots) = 8.4752\ldots" />,
    reason: <>fMin gives where the minimum happens, not the minimum itself: substitute back into <Katex tex="d" />, using the unrounded <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{8.5\ \text{m}}" />,
    reason: <>To one decimal place. Sanity check: the shortest swim can&apos;t be longer than any particular swim, and 8.5 m is indeed shorter than the 10 m swim north (part a.) and the 16.7 m swim east (part b.). The question asks for the distance, not the <Katex tex="x" />-value; the report notes some students found the <Katex tex="x" /> value but not the minimum distance.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="A = \int_0^{200}\bigl(f_1(x)-f_2(x)\bigr)dx" />,
    reason: <>Area between two curves: integrate top minus bottom. The north bank <Katex tex="f_1" /> is above the south bank <Katex tex="f_2" /> everywhere. Keep the bracket around <Katex tex="f_1(x)-f_2(x)" />: the report&apos;s general comments list bracket errors in this part.</>,
  },
  {
    working: <Katex display tex="= \int_0^{200}10\,dx" />,
    reason: <>From part a., <Katex tex="f_1(x)-f_2(x)=10" />: every vertical slice of the river is exactly 10 m tall.</>,
  },
  {
    working: <Katex display tex="\boxed{10\times200 = 2000\ \text{m}^2}" />,
    reason: <>The integral of a constant is the constant times the length of the interval. Picture it: slide every vertical slice of the river straight down and it becomes a rectangle 200 m long and 10 m tall. Sliding a slice up or down doesn&apos;t change its height, so it doesn&apos;t change the area.</>,
    more: <>See the diagram below.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="f_2(x) = 30 \implies x = 50,\ 150" />,
    reason: <>Draw the line <Katex tex="y=30" /> through P on the figure first. The zone is the river <em>below</em> it. It starts at P, where the south bank crosses the line, and closes where the south bank climbs back up through it: <Katex tex="\cos\!\left(\tfrac{\pi x}{100}\right)=0" />, so <Katex tex="\tfrac{\pi x}{100}=\tfrac\pi2" /> or <Katex tex="\tfrac{3\pi}{2}" />.</>,
  },
  {
    working: <Katex display tex="f_1(x) = 30 \implies x = \tfrac{200}{3},\ \tfrac{400}{3}" />,
    reason: <>Where the north bank crosses the line (both solutions from part b.). Between these two <Katex tex="x" />-values the north bank is below the line, so the <em>whole</em> width of the river is in the zone.</>,
  },
  {
    working: (
      <>
        <Katex display tex="A = \int_{50}^{200/3}\bigl(30-f_2(x)\bigr)dx" />
        <Katex display tex="+\int_{200/3}^{400/3}\bigl(f_1(x)-f_2(x)\bigr)dx" />
        <Katex display tex="+\int_{400/3}^{150}\bigl(30-f_2(x)\bigr)dx" />
      </>
    ),
    reason: <>Each vertical strip of the zone runs from the south bank up to whichever is <em>lower</em>: the line or the north bank. The line is lower at both ends, the north bank in the middle, so the roof changes twice and the area needs three integrals, top minus bottom in each. Write them down: the report says appropriate working needed to be shown.</>,
    more: <>Sweep the strip in the diagram below.</>,
  },
  {
    working: (
      <>
        <Katex display tex="= 2\int_{50}^{200/3}\bigl(30-f_2(x)\bigr)dx" />
        <Katex display tex="+\int_{200/3}^{400/3}10\,dx" />
      </>
    ),
    reason: <>The banks and the line are symmetric about <Katex tex="x=100" /> (<Katex tex="\cos\!\left(2\pi-\theta\right)=\cos\theta" />, so <Katex tex="f(200-x)=f(x)" />), so the two end pieces are mirror images with equal areas. In the middle, <Katex tex="f_1-f_2=10" /> (part a.).</>,
  },
  {
    working: <Katex display tex="\int_{200/3}^{400/3}10\,dx = 10\times\tfrac{200}{3} = \tfrac{2000}{3}" />,
    reason: <>The middle piece is a bent strip of constant height 10, so, as in part d., its area is height times length.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\int_{50}^{200/3}\bigl(30-f_2(x)\bigr)dx" />
        <Katex display tex="= \int_{50}^{200/3}-20\cos\!\left(\tfrac{\pi x}{100}\right)dx" />
      </>
    ),
    reason: <><Katex tex="30-f_2(x)=-20\cos\!\left(\tfrac{\pi x}{100}\right)" />, which is positive here because the cosine is negative for <Katex tex="50<x<150" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="= \left[-\tfrac{2000}{\pi}\sin\!\left(\tfrac{\pi x}{100}\right)\right]_{50}^{200/3}" />
        <Katex display tex="= -\tfrac{2000}{\pi}\left(\tfrac{\sqrt3}{2}-1\right) = \tfrac{1000\left(2-\sqrt3\right)}{\pi}" />
      </>
    ),
    reason: <>An antiderivative of <Katex tex="\cos(ax)" /> is <Katex tex="\tfrac1a\sin(ax)" />, and here <Katex tex="\tfrac1a=\tfrac{100}{\pi}" />. Then <Katex tex="\sin\tfrac{2\pi}{3}=\tfrac{\sqrt3}{2}" /> and <Katex tex="\sin\tfrac\pi2=1" />. Each corner piece is <Katex tex="\approx85.29" /> m².</>,
  },
  {
    working: <Katex display tex="A = \tfrac{2000}{3}+\tfrac{2000\left(2-\sqrt3\right)}{\pi} = 837.248\ldots" />,
    reason: <>Two corner pieces plus the middle.</>,
  },
  {
    working: <Cas fn="nInt">2·nInt(30 − f2(x), x, 50, 200/3) + nInt(f1(x) − f2(x), x, 200/3, 400/3)</Cas>,
    reason: <>On the day, with <Katex tex="f_1" /> and <Katex tex="f_2" /> defined, CAS evaluates the set-up directly and gives the same <Katex tex="837.248\ldots" />. There is no need to write the rules out in full (the report&apos;s general comments name 2e. for this).</>,
  },
  {
    working: <Katex display tex="\boxed{837\ \text{m}^2}" />,
    reason: <>To the nearest square metre. Checks: the zone lies inside the stretch of river from <Katex tex="x=50" /> to <Katex tex="x=150" />, whose area is <Katex tex="10\times100=1000" />, and it contains the middle piece of <Katex tex="667" />, so an answer between the two is right. Another route (itute, and the report&apos;s second method): the region between <Katex tex="y=30" /> and the south bank from 50 to 150, minus the bite where the north bank dips below the line, <Katex tex="\int_{50}^{150}(30-f_2)\,dx-\int_{200/3}^{400/3}(30-f_1)\,dx" />.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="w(x) = kf_1(x)-f_2(x)" />,
    reason: <>The distance north across the river is the new north bank minus the south bank, which does not move.</>,
  },
  {
    working: <Katex display tex="w(x) < 20 \text{ for all } x \in [0,200]" />,
    reason: <>&ldquo;For all parts of the river&rdquo;: the width must be under 20 everywhere, which is the same as saying the <em>widest</em> part must be under 20. So find where the river is widest.</>,
  },
  {
    working: (
      <>
        <Katex display tex="w(x) = (k-1)f_1(x)+\bigl(f_1(x)-f_2(x)\bigr)" />
        <Katex display tex="= (k-1)f_1(x)+10" />
      </>
    ),
    reason: <>How would I see where it is widest? Split <Katex tex="kf_1" /> into <Katex tex="f_1+(k-1)f_1" />: the bank where it is now, plus the extra distance the dilation lifts it. The old gap <Katex tex="f_1-f_2" /> is the 10 from part a. This way the rules never need writing out, which the report recommends (writing them out often led to errors). If you do expand, it is <Katex tex="20(k-1)\cos\!\left(\tfrac{\pi x}{100}\right)+40k-30" />, ending in <Katex tex="-30" />; the report notes <Katex tex="+30" /> was seen.</>,
  },
  {
    working: <Katex display tex="f_1(x) \text{ is largest } (60) \text{ at } x = 0,\ 200" />,
    reason: <>Since <Katex tex="k-1\ge0" />, the extra width <Katex tex="(k-1)f_1(x)" /> is biggest where the north bank is highest. That is the picture of a dilation: each point of the bank rises by <Katex tex="(k-1)\times" /> its height, so the 60 m peaks rise three times as far as the 20 m trough. The peaks are where <Katex tex="\cos\!\left(\tfrac{\pi x}{100}\right)=1" />, at the two ends of the stretch shown. The report notes a common incorrect approach was testing <Katex tex="x=50" /> (P) instead, giving <Katex tex="k<\tfrac54" />.</>,
  },
  {
    working: <Katex display tex="w(0) = 60(k-1)+10 = 60k-50 < 20" />,
    reason: <>The widest part must be under 20. This is <Katex tex="kf_1(0)-f_2(0)" />, the report&apos;s <Katex tex="60k-50" />. Strict, because the width must be <em>strictly</em> less than 20: at <Katex tex="k=\tfrac76" /> it is exactly 20 at the ends.</>,
  },
  {
    working: <Katex display tex="60k < 70 \implies k < \tfrac76" />,
    reason: <>Dividing by the positive 60 keeps the direction of the inequality.</>,
  },
  {
    working: <Katex display tex="\boxed{1\le k<\tfrac76}" />,
    reason: <>Combined with the given <Katex tex="k\ge1" />. <Katex tex="k=1" /> is included: then nothing moves and the width is the constant 10 from part a. The report also accepts <Katex tex="k\in\left[1,\tfrac76\right)" />. Check: <Katex tex="k=\tfrac76\approx1.17" /> stretches the 60 m peaks to 70 m, exactly 20 above the south bank&apos;s 50 m there.</>,
  },
]

export default function MethodsQ2_2020Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (11 marks)</p>
        <p>
          An area of parkland has a river running through it, as shown below. The river is shown
          shaded.
          <br />
          The north bank of the river is modelled by the function{' '}
          <Katex tex="f_1:[0,200]\to R,\ f_1(x)=20\cos\!\left(\dfrac{\pi x}{100}\right)+40" />.
          <br />
          The south bank of the river is modelled by the function{' '}
          <Katex tex="f_2:[0,200]\to R,\ f_2(x)=20\cos\!\left(\dfrac{\pi x}{100}\right)+30" />.
          <br />
          The horizontal axis points east and the vertical axis points north.
          <br />
          All distances are measured in metres.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={riverSrc}
            alt="A shaded band of constant vertical width between two identical cosine curves running from x = 0 to x = 200, with the point P marked at (50, 30) on the lower curve — from the original 2020 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
        <p>
          A swimmer always starts at point <Katex tex="P" />, which has coordinates{' '}
          <Katex tex="(50,30)" />.
          <br />
          Assume that no movement of water in the river affects the
          motion or path of the swimmer, which is always a straight line.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Distance"
        marks={1}
        statement={
          <>
            The swimmer swims north from point <Katex tex="P" />.
            <br />
            Find the distance, in
            metres, that the swimmer needs to swim to get to the north bank of the river.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Distance"
        marks={2}
        statement={
          <>
            The swimmer swims east from point <Katex tex="P" />.
            <br />
            Find the distance, in metres,
            that the swimmer needs to swim to get to the north bank of the river.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Subtract P's 30 from the landing x-value"
          source="Examiner's report"
          working={<Katex display tex="\tfrac{200}{3}-30 = \tfrac{110}{3}" />}
        >
          30 is P&apos;s <Katex tex="y" />-coordinate, a height. The swim is horizontal, so its length is how far
          east the swimmer moves: landing <Katex tex="x" /> minus starting <Katex tex="x" />,{' '}
          <Katex tex="\tfrac{200}{3}-50" />. A quick check catches it: a swim of{' '}
          <Katex tex="\tfrac{110}{3}\approx36.7" /> m east from <Katex tex="x=50" /> would land at{' '}
          <Katex tex="x\approx86.7" />, where the north bank is only about 21.7 m high, not 30.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Minimum Distance"
        marks={2}
        statement={
          <>
            On another occasion, the swimmer swims the minimum distance from point{' '}
            <Katex tex="P" /> to the north bank of the river.
            <br />
            Find this minimum distance. Give
            your answer in metres, correct to one decimal place.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="The shortest distance from a point to a curve">
          <p>
            Picture a circle centred at <Katex tex="P" />, growing from nothing. The first point of the
            north bank it reaches is the closest one. At that moment the circle only just touches the bank,
            so the bank is tangent to the circle there, and a tangent to a circle is at right angles to the
            radius. So the shortest swim meets the north bank at <Katex tex="90^\circ" />. It is{' '}
            <em>not</em> due north (that meets this sloping bank at about <Katex tex="58^\circ" />), and it
            is not the 10 m swim from part a.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="The shortest swim meets the north bank at right angles">
          <ShortestWidget />
        </Explore>
        <WrongMethod
          title="Stop at the answer fMin gives"
          source="Examiner's report"
          working={<Katex display tex="x = 54.4769\ldots \implies 54.5\ \text{m}" />}
        >
          fMin returns the <Katex tex="x" />-value where <Katex tex="d(x)" /> is smallest, which is the
          position of the landing point, 54.5 m east of the origin. The question wants the distance itself,{' '}
          <Katex tex="d(54.4769\ldots)" />. A size check catches it: 54.5 m is more than five times the 10 m
          swim straight north, so it can&apos;t be the shortest swim.
        </WrongMethod>
        <WrongMethod
          title="Leave the calculator in degree mode"
          source="ATAR Notes exam discussion"
          working={<Katex display tex="\text{fMin in degrees} \implies d \approx 30.0\ \text{m}" />}
        >
          In degree mode the CAS reads <Katex tex="\cos\!\left(\tfrac{\pi x}{100}\right)" /> as the cosine of about{' '}
          <Katex tex="1.6^\circ" /> to <Katex tex="3.1^\circ" />, which is almost 1, so the &ldquo;north bank&rdquo;
          becomes nearly the flat line <Katex tex="y=60" /> and the closest point is 30 m straight up. The
          same slip makes part b.&apos;s <Katex tex="\text{solve}" /> find no solution between 50 and 100. The sanity check: no
          shortest swim can be three times the 10 m swim north. Set radians whenever a rule has{' '}
          <Katex tex="\pi" /> inside a trig function.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d"
        topic="Area Between Curves"
        marks={1}
        statement={
          <>
            Calculate the surface area of the section of the river shown on the graph above, in square
            metres.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
        <Explore title="Why the bent river has the area of a 200 × 10 rectangle">
          <StraightenWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="e"
        topic="Area Between Curves"
        marks={3}
        statement={
          <>
            A horizontal line is drawn through point <Katex tex="P" />. The section of the
            river that is south of the line is declared a &lsquo;no swimming&rsquo; zone.
            <br />
            Find the area of the &lsquo;no swimming&rsquo; zone, correct to the nearest square metre.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
        <Explore title="The zone's roof is the line, then the north bank, then the line again">
          <RoofWidget />
        </Explore>
        <WrongMethod
          title="Take the whole river between x = 50 and x = 150"
          source="Examiner's report"
          working={<Katex display tex="\int_{50}^{150}\bigl(f_1(x)-f_2(x)\bigr)dx = 1000" />}
        >
          This counts every strip all the way up to the north bank, including the river <em>above</em> the
          line near both ends, which is swimming water. The zone&apos;s roof is the line wherever the north
          bank is above it. (The report prints this integral from 50 to 100, but{' '}
          <Katex tex="\int_{50}^{100}\bigl(f_1-f_2\bigr)dx" /> is only <Katex tex="10\times50=500" />; 1000 is
          what the whole river from 50 to 150 gives, or twice the half from 50 to 100.) Check a sketch: 1000 is the entire 10 m-wide river
          over that stretch, and the zone is visibly less than that.
        </WrongMethod>
        <WrongMethod
          title="Treat the two corner pieces as triangles"
          source="Examiner's report"
          working={<Katex display tex="2\times\tfrac12\times\tfrac{50}{3}\times10+\tfrac{2000}{3} = 833.3\ldots" />}
        >
          The corner piece from <Katex tex="x=50" /> to <Katex tex="\tfrac{200}{3}" /> has a curved side: the
          south bank. There it bends below the straight line from <Katex tex="(50,30)" /> to{' '}
          <Katex tex="\left(\tfrac{200}{3},20\right)" />, so each corner is about 85.29 m², not the
          triangle&apos;s 83.33, and the answer comes out as 833 instead of 837. When a side is a curve,
          integrate.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="f"
        topic="Dilation"
        marks={2}
        statement={
          <>
            Scientists observe that the north bank of the river is changing over time. It is
            moving further north from its current position. They model its predicted new
            location using the function with rule <Katex tex="y=kf_1(x)" />, where{' '}
            <Katex tex="k\ge1" />.
            <br />
            Find the values of <Katex tex="k" /> for which the distance <b>north</b> across the river, for
            all parts of the river, is strictly less than 20 m.
          </>
        }
        examinerReport={EXAM_F}
      >
        <Background title="Dilation from the x-axis">
          <p>
            <Katex tex="y=kf_1(x)" /> keeps every <Katex tex="x" /> and multiplies every height by{' '}
            <Katex tex="k" />: this is a dilation by factor <Katex tex="k" /> from the <Katex tex="x" />-axis. A
            point at height <Katex tex="h" /> moves to height <Katex tex="kh" />, up by{' '}
            <Katex tex="(k-1)h" />. So the higher a point is, the further it moves. The north bank doesn&apos;t
            shift north as a block (that would be a translation, which moves every point the same amount); it
            stretches, and its peaks rise more than its trough. That is why the river no longer has the same
            width everywhere.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
        <Explore title="Stretching the bank widens the river most where the bank is highest">
          <StretchWidget />
        </Explore>
        <WrongMethod
          title="Check the width only at P (x = 50)"
          source="Examiner's report"
          working={<Katex display tex="kf_1(50)-f_2(50) = 40k-30 < 20 \implies k<\tfrac54" />}
        >
          P is where the swimmer starts, but it isn&apos;t where the river is widest. At{' '}
          <Katex tex="k=1.2" />, say, the width at P is <Katex tex="18" /> (fine) but at the ends it is{' '}
          <Katex tex="60(1.2)-50=22" />, too wide. &ldquo;For all parts of the river&rdquo; means testing the widest
          part, and the widest part is where the north bank is highest.
        </WrongMethod>
        <WrongMethod
          title="Solve for k and leave x in the answer"
          source="Examiner's report"
          working={<Katex display tex="k<\dfrac{2\cos\left(\frac{\pi x}{100}\right)+5}{2\left(\cos\left(\frac{\pi x}{100}\right)+2\right)}" />}
        >
          The rearranging is right, but the answer can&apos;t depend on <Katex tex="x" />: <Katex tex="k" /> has to
          work at <em>every</em> <Katex tex="x" /> at once, so it must be below the <em>smallest</em> value of the
          right-hand side. Writing <Katex tex="c=\cos\!\left(\tfrac{\pi x}{100}\right)" />, the right-hand side is{' '}
          <Katex tex="1+\tfrac{1}{2c+4}" />, smallest when <Katex tex="c=1" /> (at <Katex tex="x=0" /> and{' '}
          <Katex tex="200" />): <Katex tex="1+\tfrac16=\tfrac76" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
