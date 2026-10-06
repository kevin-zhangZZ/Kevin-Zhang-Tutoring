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
    reason: <>How do I find a corner? It is where the edge changes direction suddenly, and on a piecewise rule that happens at the join: here <Katex tex="x=\sqrt2" />, where the <Katex tex="\arcsin" /> piece hands over to the <Katex tex="\arccos" /> piece.</>,
  },
  {
    working: <Katex display tex="y = 3\arcsin\!\left(\frac{\sqrt2}{2}\right) = 3\arcsin\!\left(\frac{1}{\sqrt2}\right)" />,
    reason: <>Either branch gives the same value there (<Katex tex="\arccos\tfrac{1}{\sqrt2}" /> is also <Katex tex="\tfrac{\pi}{4}" />), a useful check that the edge really is joined up. <Katex tex="\sin\tfrac{\pi}{4}=\tfrac{1}{\sqrt2}" /> is a standard exact value.</>,
  },
  {
    working: <Katex display tex="= 3\times\frac{\pi}{4}" />,
    reason: <>Exact value. The factor of <Katex tex="3" /> is a dilation from the <Katex tex="x" />-axis; the report says some students dropped it.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\sqrt2,\ \frac{3\pi}{4}\right)}" />,
    reason: <>About <Katex tex="(1.41,2.36)" />, which is where the figure puts the corner.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{the brooch has point symmetry about } O" />,
    reason: <>How would I know? The figure is symmetric in both axes, and reflecting in both axes is the same as a half-turn about <Katex tex="O" />: <Katex tex="(x,y)\to(-x,-y)" />. So the third-quadrant edge is the first-quadrant edge turned <Katex tex="180^\circ" />, and <Katex tex="g(x)=-f(-x)" />.</>,
  },
  {
    working: <Katex display tex="-2\le x<-\sqrt2 \implies -x \in \left(\sqrt2,2\right]" />,
    reason: <>Reflecting the domain. The <em>second</em> branch of <Katex tex="f" /> is the one that applies to <Katex tex="-x" /> here, so the order of the two pieces swaps.</>,
  },
  {
    working: <Katex display tex="g(x) = -3\arccos\!\left(-\frac{x}{2}\right)" />,
    reason: <>Substituting <Katex tex="-x" /> into the arccos branch and negating.</>,
  },
  {
    working: <Katex display tex="-\sqrt2\le x\le0 \implies g(x) = -3\arcsin\!\left(-\frac{x}{2}\right)" />,
    reason: <>The same move on the arcsin branch. Since <Katex tex="\arcsin" /> is odd this also equals <Katex tex="3\arcsin\!\left(\tfrac{x}{2}\right)" /> — the third-quadrant edge is the smooth continuation of the first-quadrant one straight through the origin.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{g(x)=\begin{cases}-3\arccos\!\left(-\tfrac{x}{2}\right) & -2\le x<-\sqrt2\\[4pt] -3\arcsin\!\left(-\tfrac{x}{2}\right) & -\sqrt2\le x\le0\end{cases}}"
      />
    ),
    reason: <>Two pieces, each with its own domain. The report says many students did not use a hybrid function, and of those who did, the domains were frequently incorrect.</>,
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
    reason: <>The brooch is symmetric in both axes, so find the first-quadrant quarter and multiply by four. Each upright strip reaches up to the edge <Katex tex="y=f(x)" />, and <Katex tex="f" /> has a different rule either side of <Katex tex="\sqrt2" />; one integral can only use one rule, so split there.</>,
  },
  {
    working: <Cas fn="nInt">4·(nInt(3·sin⁻¹(x/2), x, 0, √2) + nInt(3·cos⁻¹(x/2), x, √2, 2))</Cas>,
    reason: <>Both antiderivatives exist in closed form, but this is the technology paper and the question asks for a decimal. (Slicing sideways instead gives one integral and the exact value <Katex tex="24(\sqrt2-1)" />; see the explorer below.)</>,
  },
  {
    working: <Katex display tex="\boxed{A \approx 9.9 \text{ cm}^2}" />,
    reason: <>One decimal place. A rough check: the brooch fits inside a <Katex tex="4\times4.7" /> rectangle, about <Katex tex="19" /> cm<Katex tex="^2" />, and the bowtie shape fills a little over half of it.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 3\arcsin\!\left(\frac{x}{2}\right) \text{ near } x=0" />,
    reason: <>The angle between two curves where they cross is the angle between their <em>tangents</em> there, so I need the gradients at <Katex tex="O" />, and gradients mean derivatives. Only the <Katex tex="\arcsin" /> branch reaches the origin, so that is the one to differentiate.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{3}{\sqrt{1-\frac{x^2}{4}}}\times\frac12 = \frac{3}{\sqrt{4-x^2}}" />,
    reason: <>Chain rule, then simplifying: <Katex tex="\sqrt{1-\tfrac{x^2}{4}}=\tfrac{\sqrt{4-x^2}}{2}" />, so the halves cancel.</>,
  },
  {
    working: <Katex display tex="f'(0) = \frac{3}{2}" />,
    reason: <>The gradient of the upper-right edge as it leaves the origin.</>,
  },
  {
    working: <Katex display tex="\text{other edge at } O\text{: gradient } -\frac32" />,
    reason: <>The other edge through <Katex tex="O" /> (second and fourth quadrants) is the first one reflected in the <Katex tex="x" />-axis, <Katex tex="y=-3\arcsin\tfrac{x}{2}" />, so its gradient is the negative.</>,
  },
  {
    working: <Katex display tex="\theta = \tan^{-1}\!\left(\frac32\right) \approx 56.31^\circ" />,
    reason: <>A line of gradient <Katex tex="m" /> makes the angle <Katex tex="\tan^{-1}m" /> with the positive <Katex tex="x" />-direction. So each tangent is <Katex tex="56.31^\circ" /> from the <Katex tex="x" />-axis, one above it and one below.</>,
  },
  {
    working: <Katex display tex="180^\circ - 2(56.31^\circ)" />,
    reason: <>The upper-right and lower-right edges enclose <Katex tex="2\theta\approx112.62^\circ" /> inside the right wing. The two curves cross at the origin, so the other angle between them — the gap above (and below) the origin — is the supplement. The report notes the obtuse angle was sometimes given instead. (Equivalently, each tangent is <Katex tex="90^\circ-56.31^\circ=33.69^\circ" /> from the <Katex tex="y" />-axis, and the gap above <Katex tex="O" /> is twice that.)</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 67.4^\circ}" />,
    reason: <>One decimal place. Checking against the figure: each wing opens wider than a right angle at the origin, so the gaps above and below must be acute.</>,
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
          <img
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
        <Background title="Reflecting a piecewise rule">
          <p>
            The brooch has point symmetry about the origin, so the third-quadrant rule is{' '}
            <Katex tex="g(x)=-f(-x)" />: negate the input <em>and</em> the output.
          </p>
          <p>
            Two things then move. The domains reflect —{' '}
            <Katex tex="[0,\sqrt2]" /> becomes <Katex tex="[-\sqrt2,0]" /> and{' '}
            <Katex tex="(\sqrt2,2]" /> becomes <Katex tex="[-2,-\sqrt2)" /> — and because
            reflection reverses the order of the intervals, the <Katex tex="\arccos" />{' '}
            branch now comes first when you write the rule left to right.
          </p>
        </Background>
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
              tex="4\left(\int_0^{\sqrt2}\arcsin\tfrac{x}{2}\,dx+\int_{\sqrt2}^{2}\arccos\tfrac{x}{2}\,dx\right)\approx3.3"
            />
          }
        >
          That is the area of a brooch one-third as tall. The <Katex tex="3" /> multiplies every strip&apos;s height,
          so it multiplies the area by <Katex tex="3" /> too, and leaving it out gives{' '}
          <Katex tex="8(\sqrt2-1)\approx3.3" />. The rough check in the working (a little over half of a{' '}
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
        <Background title="The angle between two curves">
          <p>
            Where two curves cross, the angle between them is the angle between their <b>tangents</b> at that point.
            Zoom in far enough and each curve looks like its tangent line, so the curves really do meet at that angle.
          </p>
          <p>
            A line with gradient <Katex tex="m" /> makes the angle <Katex tex="\tan^{-1}m" /> with the positive{' '}
            <Katex tex="x" />-direction. Two crossing lines make a pair of angles that add to{' '}
            <Katex tex="180^\circ" />; the acute one is the smaller.
          </p>
        </Background>
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
          The two tangents make a pair of angles adding to <Katex tex="180^\circ" />, and the question asks for
          the acute one, so it is <Katex tex="180^\circ-112.6^\circ=67.4^\circ" />. Whenever a question says
          &ldquo;acute&rdquo;, check your answer is under <Katex tex="90^\circ" />.
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
