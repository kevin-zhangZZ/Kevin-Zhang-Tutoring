// 2017 Specialist Mathematics — Exam 2, Section B, Question 3, parts (a)–(d) (8 of the
// question's 10 marks). A brooch built from arcsin and arccos branches: the corner point,
// the third-quadrant piecewise rule, the area, and the angle at the origin.
//
// Part (e) is omitted: it asks for the length of the border, i.e. arc length from
// cartesian form, which the skip guide already lists as no longer required.
//
// Question text transcribed from the original paper; the brooch figure is a crop of
// VCAA's own artwork. Answers verified with sympy and scipy. Solution is original.
// itute agrees with every answer; for (c) it slices sideways instead, one integral in y giving
// the exact 24(√2 − 1) ≈ 9.94, which the part (c) widget shows alongside the upright slicing.
//
// Interactive widgets (interactives/spec-2017e2-q3*):
//   (b) rotate — turn the first-quadrant edge half a turn about O: (x, y) → (−x, −y), and the
//       arccos piece swaps to the far end, so the domains swap order; a toggle shows one rule failing.
//   (c) strips — upright strips (rule changes at √2, two integrals) vs sideways strips (one
//       integral); a toggle shows the area with the factor 3 left out.
//   (d) angle — slide P along the edge into O: the chord OP turns into the tangent, and the angle
//       goes from 61.9° (straight-edge assumption) to 67.4°; a toggle shows the obtuse 112.6°.
// WrongMethod boxes: (a) dropping the 3, (b) one rule for the whole edge, (c) dropping the 3,
// (d) the obtuse angle and the chord-to-the-corner gradient.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import broochSrc from './spec-2017e2-q3-brooch.png'

const RotateWidget = lazyWidget(() => import('../interactives/spec-2017e2-q3b-rotate'))
const StripsWidget = lazyWidget(() => import('../interactives/spec-2017e2-q3c-strips'))
const AngleWidget = lazyWidget(() => import('../interactives/spec-2017e2-q3d-angle'))

const EXAM_A: SAExaminerStats = {
  marks: [26, 74],
  average: 0.8,
  comment: (
    <>
      This question was answered well. Some students who knew the correct{' '}
      <Katex tex="x" />-coordinate value did not correctly apply the dilation factor of{' '}
      <Katex tex="3" /> to obtain the correct <Katex tex="y" />-coordinate value.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [51, 49],
  average: 0.5,
  comment: <>Many students did not use a hybrid function. Of those who did, domains were frequently incorrect.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [16, 7, 15, 61],
  average: 2.2,
  comment: (
    <>
      The majority of students stated definite integrals over the correct intervals. Some of
      these did not include the factor of <Katex tex="3" /> in their expressions.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [62, 3, 8, 26],
  average: 1.0,
  comment: (
    <>
      Many students did not attempt this question. Where attempts were made, some students
      did not use a derivative to find the gradient of the function. In some cases the obtuse
      angle, rather than the acute angle, was given.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x=\sqrt2" />,
    reason: <>A corner is where the edge suddenly changes direction. On a piecewise rule that happens at the join, <Katex tex="x=\sqrt2" />, where the <Katex tex="\arcsin" /> piece hands over to <Katex tex="\arccos" />.</>,
  },
  {
    working: <Katex display tex="y = 3\arcsin\!\left(\frac{\sqrt2}{2}\right) = 3\arcsin\!\left(\frac{1}{\sqrt2}\right)" />,
    reason: <>Substitute <Katex tex="x=\sqrt2" /> into the <Katex tex="\arcsin" /> branch, the one whose domain includes <Katex tex="\sqrt2" />.</>,
    more: <>The <Katex tex="\arccos" /> branch gives the same height there (<Katex tex="\arccos\tfrac{1}{\sqrt2}" /> is also <Katex tex="\tfrac{\pi}{4}" />), a useful check that the two pieces really do join up.</>,
  },
  {
    working: <Katex display tex="= 3\times\frac{\pi}{4}" />,
    reason: <><Katex tex="\sin\tfrac{\pi}{4}=\tfrac{1}{\sqrt2}" /> is a standard exact value. Keep the <Katex tex="3" />: it is a dilation by factor <Katex tex="3" /> from the <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\sqrt2,\ \frac{3\pi}{4}\right)}" />,
    reason: <>About <Katex tex="(1.41,2.36)" />, which is where the figure puts the corner.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{the brooch has point symmetry about } O" />,
    reason: <>The figure is symmetric in both axes, and reflecting in both axes is a half-turn about <Katex tex="O" />: <Katex tex="(x,y)\to(-x,-y)" />. So the third-quadrant rule is <Katex tex="g(x)=-f(-x)" />.</>,
    more: <>Why <Katex tex="-f(-x)" />? A point <Katex tex="(x,y)" /> is on the third-quadrant edge exactly when its half-turn image <Katex tex="(-x,-y)" /> is on <Katex tex="f" />, so <Katex tex="-y=f(-x)" />, that is, <Katex tex="y=-f(-x)" />.</>,
  },
  {
    working: <Katex display tex="-2\le x<-\sqrt2 \implies -x \in \left(\sqrt2,2\right]" />,
    reason: <>For these <Katex tex="x" />, <Katex tex="-x" /> lies in the domain of the <Katex tex="\arccos" /> branch of <Katex tex="f" />, so that branch applies here.</>,
    more: <>Reflection reverses the order of the intervals: <Katex tex="[0,\sqrt2]" /> becomes <Katex tex="[-\sqrt2,0]" /> and <Katex tex="(\sqrt2,2]" /> becomes <Katex tex="[-2,-\sqrt2)" />. So, reading left to right, the <Katex tex="\arccos" /> branch now comes first.</>,
  },
  {
    working: <Katex display tex="g(x) = -3\arccos\!\left(-\frac{x}{2}\right)" />,
    reason: <>Substitute <Katex tex="-x" /> into the <Katex tex="\arccos" /> branch and negate: <Katex tex="g(x)=-f(-x)" />.</>,
  },
  {
    working: <Katex display tex="-\sqrt2\le x\le0 \implies g(x) = -3\arcsin\!\left(-\frac{x}{2}\right)" />,
    reason: <>The same on the <Katex tex="\arcsin" /> branch: here <Katex tex="-x\in[0,\sqrt2]" />.</>,
    more: <>Since <Katex tex="\arcsin" /> is odd this also equals <Katex tex="3\arcsin\!\left(\tfrac{x}{2}\right)" />: the third-quadrant edge is the smooth continuation of the first-quadrant one straight through the origin.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{g(x)=\begin{cases}-3\arccos\!\left(-\tfrac{x}{2}\right) & -2\le x<-\sqrt2\\[4pt] -3\arcsin\!\left(-\tfrac{x}{2}\right) & -\sqrt2\le x\le0\end{cases}}"
      />
    ),
    reason: <>Two pieces, each with its own domain. The join <Katex tex="-\sqrt2" /> goes with the <Katex tex="\arcsin" /> piece, just as <Katex tex="\sqrt2" /> did in <Katex tex="f" />.</>,
    more: <>The report says that of the students who did use a hybrid function, the domains were frequently incorrect. Check each piece's interval is the reflection of the matching piece of <Katex tex="f" />, with the endpoint <Katex tex="-\sqrt2" /> in exactly one of them.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}A = 4\Big(&\int_0^{\sqrt2}3\arcsin\!\left(\frac{x}{2}\right)dx\\ &+ \int_{\sqrt2}^{2}3\arccos\!\left(\frac{x}{2}\right)dx\Big)\end{aligned}"
      />
    ),
    reason: <>The brooch is symmetric in both axes, so find the first-quadrant quarter and multiply by <Katex tex="4" />. The rule for <Katex tex="f" /> changes at <Katex tex="\sqrt2" />, so split the integral there.</>,
    more: <>Each upright strip reaches up to the edge <Katex tex="y=f(x)" />, and one integral can only use one rule for that height: <Katex tex="3\arcsin\tfrac{x}{2}" /> up to <Katex tex="\sqrt2" />, <Katex tex="3\arccos\tfrac{x}{2}" /> after it.</>,
  },
  {
    working: <Cas fn="nInt">4·(nInt(3·sin⁻¹(x/2), x, 0, √2) + nInt(3·cos⁻¹(x/2), x, √2, 2))</Cas>,
    reason: <>This is the technology paper and a decimal answer is asked for, so evaluate the integrals on CAS.</>,
    more: <>Slicing sideways instead gives a single integral and the exact value <Katex tex="24(\sqrt2-1)\approx9.94" />: each horizontal strip runs from <Katex tex="x=2\sin\tfrac{y}{3}" /> to <Katex tex="x=2\cos\tfrac{y}{3}" />, for <Katex tex="0\le y\le\tfrac{3\pi}{4}" />, so <Katex tex="A=4\int_0^{3\pi/4}\left(2\cos\tfrac{y}{3}-2\sin\tfrac{y}{3}\right)dy=4\left[6\sin\tfrac{y}{3}+6\cos\tfrac{y}{3}\right]_0^{3\pi/4}=4(6\sqrt2-6)" />. The explorer below shows both ways.</>,
  },
  {
    working: <Katex display tex="\boxed{A \approx 9.9 \text{ cm}^2}" />,
    reason: <>Correct to one decimal place, in square centimetres, as asked.</>,
    more: <>A rough check, only meant to catch answers that are badly off: the brooch fits inside a rectangle <Katex tex="4" /> wide and <Katex tex="2\times\tfrac{3\pi}{4}\approx4.7" /> tall (the corner height from part a), about <Katex tex="19" /> cm<Katex tex="^2" />, and the bowtie shape fills roughly half of it.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 3\arcsin\!\left(\frac{x}{2}\right) \text{ near } x=0" />,
    reason: <>The angle between two curves where they cross is the angle between their <em>tangents</em>, so find the gradients at <Katex tex="O" />. Only the <Katex tex="\arcsin" /> branch reaches the origin.</>,
    more: <>Why tangents? Zoom in far enough on the crossing point and each curve looks like its tangent line, so the curves really do meet at the tangents&apos; angle. Gradients of tangents mean derivatives.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{3}{\sqrt{1-\frac{x^2}{4}}}\times\frac12 = \frac{3}{\sqrt{4-x^2}}" />,
    reason: <>Chain rule, then simplify: <Katex tex="\sqrt{1-\tfrac{x^2}{4}}=\tfrac{\sqrt{4-x^2}}{2}" />, so the halves cancel.</>,
  },
  {
    working: <Katex display tex="f'(0) = \frac{3}{2}" />,
    reason: <>The gradient of the upper-right edge as it leaves the origin.</>,
  },
  {
    working: <Katex display tex="\text{other edge at } O\text{: gradient } -\frac32" />,
    reason: <>The other edge through <Katex tex="O" /> is this one reflected in the <Katex tex="x" />-axis, <Katex tex="y=-3\arcsin\tfrac{x}{2}" />, so its gradient is the negative.</>,
    more: <>That edge runs through the fourth quadrant and, by the half-turn symmetry, on into the second.</>,
  },
  {
    working: <Katex display tex="\theta = \tan^{-1}\!\left(\frac32\right) \approx 56.31^\circ" />,
    reason: <>A line of gradient <Katex tex="m" /> makes the angle <Katex tex="\tan^{-1}m" /> with the positive <Katex tex="x" />-direction. So one tangent is <Katex tex="56.31^\circ" /> above the <Katex tex="x" />-axis, the other <Katex tex="56.31^\circ" /> below.</>,
  },
  {
    working: <Katex display tex="180^\circ - 2(56.31^\circ)" />,
    reason: <>Inside the right wing the tangents make <Katex tex="2\theta\approx112.62^\circ" />, which is obtuse. Two crossing lines make a pair of angles adding to <Katex tex="180^\circ" />, so the acute one is the supplement.</>,
    more: <>Check against the figure: each wing opens wider than a right angle at the origin, so the acute angle is the gap above (and below) the origin. Equivalently, each tangent is <Katex tex="90^\circ-56.31^\circ=33.69^\circ" /> from the <Katex tex="y" />-axis, and the gap above <Katex tex="O" /> is twice that.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 67.4^\circ}" />,
    reason: <>In degrees, correct to one decimal place, and under <Katex tex="90^\circ" /> as an acute angle must be.</>,
  },
]

export default function SpecialistQ3_2017Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (parts a–d)</p>
        <p className="mb-3">
          A brooch is designed using inverse circular functions to make the shape shown in
          the diagram below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-3">
          <img loading="lazy" decoding="async"
            src={broochSrc}
            alt="A bowtie-shaped brooch on grid axes from −2 to 2: two curved wings meeting at the origin, each wing running out to x = ±2 with corner points near (±1.41, ±2.36), from the original 2017 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
        <p className="mb-2">
          The edges of the brooch in the first quadrant are described by the piecewise
          function
        </p>
        <Katex
          display
          tex="f(x)=\begin{cases}3\arcsin\!\left(\tfrac{x}{2}\right) & 0\le x\le\sqrt2\\[4pt] 3\arccos\!\left(\tfrac{x}{2}\right) & \sqrt2<x\le2\end{cases}"
        />
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background title="Why only parts a.–d." always>
          <p>
            Part e. asks for the length of the gold border around the brooch, which is arc
            length from a cartesian rule — no longer required by the study design, so it is
            left out here. Parts a.–d. are all current.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Coordinates"
        marks={1}
        statement={<>Write down the coordinates of the corner point of the brooch in the first quadrant.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="The corner's height is arcsin(√2/2) = π/4"
          source="Examiner's report"
          working={<Katex display tex="y=\arcsin\!\left(\tfrac{\sqrt2}{2}\right)=\tfrac{\pi}{4}" />}
        >
          This drops the <Katex tex="3" /> in front of <Katex tex="\arcsin" />: the dilation factor the report
          says some students missed. The figure catches it: <Katex tex="\tfrac{\pi}{4}\approx0.79" />, but the
          corner is drawn above <Katex tex="y=2" />. With the <Katex tex="3" />,{' '}
          <Katex tex="\tfrac{3\pi}{4}\approx2.36" /> fits.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Hybrid Function"
        marks={1}
        statement={<>Specify the piecewise function that describes the edges in the third quadrant.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="Half a turn about O: why the two pieces swap ends">
          <RotateWidget />
        </Explore>
        <WrongMethod
          title="One rule covers the whole edge: g(x) = −3arcsin(−x/2), −2 ≤ x ≤ 0"
          source="Examiner's report"
          working={<Katex display tex="g(-2)=-3\arcsin(1)=-\tfrac{3\pi}{2}\neq0" />}
        >
          The report says many students did not use a hybrid function. No single rule can work, and this one shows
          why: the edge has a corner at <Katex tex="\left(-\sqrt2,-\tfrac{3\pi}{4}\right)" />, and one smooth{' '}
          <Katex tex="\arcsin" /> curve can&apos;t turn a corner. It carries on down to{' '}
          <Katex tex="\left(-2,-\tfrac{3\pi}{2}\right)" />, far below the brooch, instead of coming back up to{' '}
          <Katex tex="(-2,0)" />. Check any answer by testing the ends: the edge must pass through{' '}
          <Katex tex="O" />, the corner and <Katex tex="(-2,0)" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Area Enclosed"
        marks={3}
        statement={
          <>
            Given that each unit in the diagram represents one centimetre, find the area of
            the brooch. Give your answer in square centimetres, correct to one decimal place.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="Slice it upright (two integrals) or sideways (one)">
          <StripsWidget />
        </Explore>
        <WrongMethod
          title="Integrate arcsin(x/2) and arccos(x/2), leaving out the 3"
          source="Examiner's report"
          working={
            <Katex
              display
              tex="\begin{aligned}&4\left(\int_0^{\sqrt2}\arcsin\tfrac{x}{2}\,dx\right.\\&\quad\left.+\int_{\sqrt2}^{2}\arccos\tfrac{x}{2}\,dx\right)\\&\approx3.3\end{aligned}"
            />
          }
        >
          That is the area of a brooch one-third as tall. The <Katex tex="3" /> multiplies every strip&apos;s height,
          so it multiplies the area by <Katex tex="3" /> too, and leaving it out gives{' '}
          <Katex tex="8(\sqrt2-1)\approx3.3" />. The rough check in the working (roughly half of a{' '}
          <Katex tex="4\times4.7" /> rectangle) rules this out at once.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d"
        topic="Angle Between Curves"
        marks={3}
        statement={
          <>
            Find the acute angle between the edges of the brooch at the origin. Give your
            answer in degrees, correct to one decimal place.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
        <Explore title="Slide P into the origin: the chord becomes the tangent">
          <AngleWidget />
        </Explore>
        <WrongMethod
          title="The angle is 2 × 56.3° = 112.6°"
          source="Examiner's report"
          working={<Katex display tex="2\tan^{-1}\!\left(\tfrac32\right)\approx112.6^\circ" />}
        >
          That is the angle <em>inside</em> the wing, the obtuse one, which the report says some students gave.
          The red flag: <Katex tex="112.6^\circ" /> is over <Katex tex="90^\circ" />, so it cannot be the acute
          angle the question asks for.
        </WrongMethod>
        <WrongMethod
          title="The edges look straight, so use the gradient from O to the corner"
          working={
            <Katex
              display
              tex="\begin{gathered}m=\frac{3\pi/4}{\sqrt2}\approx1.666\\ 180^\circ-2\tan^{-1}(1.666)\approx61.9^\circ\end{gathered}"
            />
          }
        >
          The report notes that some students did not use a derivative for the gradient. The edges only look
          straight: the gradient <Katex tex="\frac{3}{\sqrt{4-x^2}}" /> grows from <Katex tex="1.5" /> at{' '}
          <Katex tex="O" /> to about <Katex tex="2.12" /> at the corner, so the line to the corner is steeper than
          the tangent at <Katex tex="O" />. The angle at <Katex tex="O" /> depends only on the tangents there, so
          use <Katex tex="f'(0)" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
