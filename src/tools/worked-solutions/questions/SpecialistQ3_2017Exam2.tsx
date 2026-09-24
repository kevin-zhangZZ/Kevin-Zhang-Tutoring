// 2017 Specialist Mathematics — Exam 2, Section B, Question 3, parts (a)–(d) (8 of the
// question's 10 marks). A brooch built from arcsin and arccos branches: the corner point,
// the third-quadrant piecewise rule, the area, and the angle at the origin.
//
// Part (e) is omitted: it asks for the length of the border, i.e. arc length from
// cartesian form, which the skip guide already lists as no longer required.
//
// Question text transcribed from the original paper; the brooch figure is a crop of
// VCAA's own artwork. Answers verified with sympy and scipy. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import broochSrc from './spec-2017e2-q3-brooch.png'

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
    reason: <>The corner is where the two branches meet, which is the join in the piecewise rule.</>,
  },
  {
    working: <Katex display tex="y = 3\arcsin\!\left(\frac{\sqrt2}{2}\right) = 3\arcsin\!\left(\frac{1}{\sqrt2}\right)" />,
    reason: <>Either branch gives the same value there — a useful check that the function really is continuous.</>,
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
    reason: <>The third quadrant is the first quadrant rotated <Katex tex="180^\circ" />, so <Katex tex="g(x)=-f(-x)" /> — the odd extension.</>,
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
    working: <Katex display tex="A = 4\left(\int_0^{\sqrt2}3\arcsin\!\left(\frac{x}{2}\right)dx + \int_{\sqrt2}^{2}3\arccos\!\left(\frac{x}{2}\right)dx\right)" />,
    reason: <>The area in the first quadrant, times four by symmetry. Split at <Katex tex="\sqrt2" /> because the rule changes there.</>,
  },
  {
    working: <Cas fn="nInt">4·(nInt(3·sin⁻¹(x/2), x, 0, √2) + nInt(3·cos⁻¹(x/2), x, √2, 2))</Cas>,
    reason: <>Both antiderivatives exist in closed form, but this is the technology paper and the question asks for a decimal.</>,
  },
  {
    working: <Katex display tex="\boxed{A \approx 9.9 \text{ cm}^2}" />,
    reason: <>One decimal place. A rough check: the brooch fits inside a <Katex tex="4\times4.7" /> rectangle, about <Katex tex="19" /> cm<Katex tex="^2" />, and the bowtie shape fills a little over half of it.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 3\arcsin\!\left(\frac{x}{2}\right) \text{ near } x=0" />,
    reason: <>Only the arcsin branch reaches the origin, so that is the one to differentiate.</>,
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
    working: <Katex display tex="\text{lower-right edge: gradient } -\frac32" />,
    reason: <>By reflection in the <Katex tex="x" />-axis — the figure is symmetric, so the fourth-quadrant edge mirrors the first-quadrant one.</>,
  },
  {
    working: <Katex display tex="\theta = \tan^{-1}\!\left(\frac32\right) \approx 56.31^\circ" />,
    reason: <>The angle each edge makes with the positive <Katex tex="x" />-direction.</>,
  },
  {
    working: <Katex display tex="180^\circ - 2(56.31^\circ)" />,
    reason: <>The upper-right and lower-right edges enclose <Katex tex="2\theta\approx112.62^\circ" /> inside the right wing. The two curves cross at the origin, so the other angle between them — the gap above (and below) the origin — is the supplement. The report notes the obtuse angle was sometimes given instead.</>,
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
        <Background title="Why only parts a.–d.">
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
      </PartCard>
    </div>
  )
}
