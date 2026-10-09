// 2022 Specialist Mathematics — Exam 2, Section B Question 2 (9 marks). A product of two
// complex numbers that leads to a quadratic in a, then an Argand diagram, an angle bisector
// and a circular segment. Question text transcribed from the original paper; the Argand
// diagram is this site's own matplotlib drawing of the answer, on VCAA's polar grid (circles
// r = 1, 2; rays every π/24). Answers checked with sympy and against the VCAA
// examination report. Solution is original.
// Interactives: c. spec-2022e2-q2c-bisector (drag v round |z| = 2: the midpoint ray is the average
// of the arguments only because |u| = |v|; toggles show the sum −π/12 and |v| = 1 failing);
// d. spec-2022e2-q2d-segment (minor segment = sector minus triangle, step by step).
// Skipped: a.i (34% full marks) — an algebraic 'show that'; the report says marks were lost by
// using CAS to solve and verify instead of showing the steps, which nothing to drag would fix.
// Oct 2026 Concise/Detailed pass: reasons trimmed to the one-line "why"; checks, traps, the CAS
// warning and report commentary moved to each row's `more`. c.'s midpoint-check row folded into the
// averaging row's `more` (with the −π/12 trap); c.'s last reason now says −π/24 is the first grid
// ray below the real axis. a.ii's trap now matches the report (the negatives of the values
// provided, a = −√3, b = −√2 — previously described as the negatives of the answer); a.ii `more`
// adds the quadratic-formula route. Both widgets audited (numbers re-derived with sympy) and kept.
// Final review: "midpoint of uv" (uv was the product in a.) now "the line interval joining u and
// v" / "M"; Background is a roadmap (no "subtends"); −π/12 described as what adding gives, not
// as the report's diagnosis; d.'s widget Notice no longer repeats row 2's `more`.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import argandSrc from './spec-2022e2-q2-argand.png'

const BisectorWidget = lazyWidget(() => import('../interactives/spec-2022e2-q2c-bisector'))
const SegmentWidget = lazyWidget(() => import('../interactives/spec-2022e2-q2d-segment'))

const EXAM_AI: SAExaminerStats = {
  marks: [27, 39, 34],
  average: 1.1,
  comment: (
    <>
      In a 'show that' question, students are required to clearly and logically show the steps
      that lead to the given result. A number of students apparently used a CAS to solve the
      given equation and then substituted their answers, again using CAS to verify the given
      result.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [31, 69],
  average: 0.7,
  comment: (
    <>
      Most students gave at least one correct answer; some students gave the negatives of the
      values provided.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [20, 20, 60],
  average: 1.4,
  comment: (
    <>
      Some students appeared to use the Cartesian values to plot the approximate position of
      the points rather than the more successful approach of considering the polar form,
      resulting in accurate positions. Students should be aware of the polar grid provided,
      which enables them to plot the required points precisely. Most students labelled their
      points.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [48, 27, 25],
  average: 0.8,
  comment: (
    <>
      A common incorrect argument was <Katex tex="\theta=-\tfrac{\pi}{12}" />. Many students
      did not draw a ray; in some cases this appeared to be an unfortunate slip as some of
      these gave a correct argument.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [52, 16, 32],
  average: 0.8,
  comment: (
    <>
      Most successful students correctly applied a segment area formula. A smaller proportion
      correctly used a definite integral but this approach usually led to error. Some
      students who used an area formula, either of segments or triangles, had difficulty.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="uv = (a+i)\bigl(b-\sqrt2\,i\bigr) = ab-\sqrt2\,ai+bi-\sqrt2\,i^2" />,
    reason: <>Expand first; the given form tells you nothing until the real and imaginary parts are separated.</>,
  },
  {
    working: <Katex display tex="= \bigl(ab+\sqrt2\bigr)+\bigl(b-\sqrt2\,a\bigr)i" />,
    reason: <><Katex tex="-\sqrt2\,i^2=+\sqrt2" />, which joins the real part.</>,
  },
  {
    working: <Katex display tex="ab+\sqrt2 = \sqrt2+\sqrt6 \implies ab = \sqrt6" />,
    reason: <>Equating real parts. Two complex numbers are equal only if both parts match.</>,
  },
  {
    working: <Katex display tex="b-\sqrt2\,a = \sqrt2-\sqrt6" />,
    reason: <>Equating imaginary parts — the second equation.</>,
  },
  {
    working: <Katex display tex="b = \frac{\sqrt6}{a} \implies \frac{\sqrt6}{a}-\sqrt2\,a = \sqrt2-\sqrt6" />,
    reason: <>The equation to reach contains only <Katex tex="a" />, so <Katex tex="b" /> has to be eliminated; the real-part equation gives <Katex tex="b" /> most simply.</>,
    more: <>Dividing by <Katex tex="a" /> is safe: <Katex tex="a\ne0" />, since <Katex tex="a=0" /> would make <Katex tex="ab=0" />, not <Katex tex="\sqrt6" />.</>,
  },
  {
    working: <Katex display tex="\sqrt6-\sqrt2\,a^2 = \sqrt2\,a-\sqrt6\,a" />,
    reason: <>Multiplying through by <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\sqrt3-a^2 = a-\sqrt3\,a" />,
    reason: <>Dividing every term by <Katex tex="\sqrt2" />, using <Katex tex="\tfrac{\sqrt6}{\sqrt2}=\sqrt3" />.</>,
    more: <>How you'd know to do this: the target has <Katex tex="\sqrt3" /> in it but no <Katex tex="\sqrt2" /> or <Katex tex="\sqrt6" />. Every term here has a factor of <Katex tex="\sqrt2" /> (<Katex tex="\sqrt6=\sqrt2\times\sqrt3" />), so dividing by <Katex tex="\sqrt2" /> leaves exactly the surd the target uses.</>,
  },
  {
    working: <Katex display tex="0 = a^2+a-\sqrt3\,a-\sqrt3" />,
    reason: <>Moving every term to the right-hand side, so that <Katex tex="a^2" /> is positive as in the target.</>,
  },
  {
    working: <Katex display tex="\boxed{a^2+\bigl(1-\sqrt3\bigr)a-\sqrt3 = 0}" />,
    reason: <>Taking out the common factor <Katex tex="a" /> from <Katex tex="a-\sqrt3\,a" />. As required.</>,
    more: <>Every line above has to be written out by hand. Solving with CAS and substituting back (the shortcut the report mentions) confirms the equation is true, but it doesn't show how it follows from <Katex tex="uv" />, which is what a 'show that' asks for.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="a^2+\bigl(1-\sqrt3\bigr)a-\sqrt3 = (a+1)\bigl(a-\sqrt3\bigr)" />,
    reason: <><Katex tex="a=\sqrt3" /> is given as one solution, so <Katex tex="a-\sqrt3" /> is a factor. The constant term is <Katex tex="-\sqrt3=\bigl(-\sqrt3\bigr)(1)" />, so the other factor is <Katex tex="a+1" />.</>,
    more: (
      <>
        <p>Expanding confirms the middle term: <Katex tex="(a+1)\bigl(a-\sqrt3\bigr)=a^2-\sqrt3\,a+a-\sqrt3=a^2+\bigl(1-\sqrt3\bigr)a-\sqrt3" /> ✓.</p>
        <p>The quadratic formula works too ("or otherwise"). The discriminant is <Katex tex="\bigl(1-\sqrt3\bigr)^2+4\sqrt3=4+2\sqrt3=\bigl(1+\sqrt3\bigr)^2" />, so <Katex tex="a=\tfrac{(\sqrt3-1)\pm(1+\sqrt3)}{2}" />, which is <Katex tex="\sqrt3" /> or <Katex tex="-1" />.</p>
      </>
    ),
  },
  {
    working: <Katex display tex="a = -1 \quad\text{or}\quad a = \sqrt3" />,
    reason: <>The second is the set already provided, so the other value of <Katex tex="a" /> is <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="ab = \sqrt6 \implies b = \frac{\sqrt6}{-1} = -\sqrt6" />,
    reason: <>Substituting <Katex tex="a=-1" /> into <Katex tex="ab=\sqrt6" />, the simpler of the two equations from a.i.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -1, \quad b = -\sqrt6}" />,
    reason: <>Check in the other equation, the imaginary part: <Katex tex="b-\sqrt2\,a=-\sqrt6+\sqrt2=\sqrt2-\sqrt6" /> ✓.</>,
    more: <>The report notes some students gave the negatives of the values provided, <Katex tex="a=-\sqrt3" /> and <Katex tex="b=-\sqrt2" />. That pair still gives <Katex tex="ab=\sqrt6" />, but <Katex tex="b-\sqrt2\,a=-\sqrt2+\sqrt6=\sqrt6-\sqrt2" />, the wrong sign, so it is not a solution. A pair must satisfy both equations from a.i., which is why the check uses the equation that wasn't used to find <Katex tex="b" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="|u| = \sqrt{3+1} = 2, \qquad \mathrm{Arg}(u) = \arctan\!\left(\frac{1}{\sqrt3}\right) = \frac\pi6" />,
    reason: <><Katex tex="u=\sqrt3+i" /> is in the first quadrant, so no adjustment is needed.</>,
  },
  {
    working: <Katex display tex="|v| = \sqrt{2+2} = 2, \qquad \mathrm{Arg}(v) = -\frac\pi4" />,
    reason: <>The real and imaginary parts of <Katex tex="v=\sqrt2-\sqrt2\,i" /> are the same size with the imaginary part negative, so <Katex tex="v" /> lies on the line <Katex tex="y=-x" /> in the fourth quadrant.</>,
  },
  {
    working: <Katex display tex="\text{Both lie on the circle } |z|=2" />,
    reason: <>So plot both on the <Katex tex="r=2" /> circle of the printed polar grid. Its rays are every <Katex tex="\tfrac{\pi}{24}" />, so <Katex tex="u" /> is on the 4th ray above the positive real axis (<Katex tex="4\times\tfrac{\pi}{24}=\tfrac{\pi}{6}" />) and <Katex tex="v" /> on the 6th ray below it (<Katex tex="6\times\tfrac{\pi}{24}=\tfrac{\pi}{4}" />).</>,
    more: <>This is why the polar grid is printed: follow the <Katex tex="r=2" /> circle round to the right ray instead of estimating <Katex tex="x" /> and <Katex tex="y" />. The report notes some students used the Cartesian values to plot approximate positions, while considering the polar form was the more successful approach and gave accurate positions.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={argandSrc}
          alt="On VCAA's polar grid: the points u = √3 + i (modulus 2, argument π/6) and v = √2 − √2i (modulus 2, argument −π/4), a dashed line joining them, and the part c. ray Arg(z) = −π/24 from an open circle at O through the midpoint of that line"
          className="w-full max-w-[440px]"
        />
      </div>
    ),
    reason: <>Both points plotted and labelled. The ray from part c. is drawn on the same diagram, as that part asks.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="|u| = |v| = 2" />,
    reason: <>From part b. Both points are the same distance from the origin <Katex tex="O" />, which is what makes the next step possible.</>,
    more: <>Whenever a question asks for the argument of the midpoint of two complex numbers, compare their moduli first. If they are equal, the midpoint's argument is the average of the two arguments (next line). If not, there is no shortcut: find <Katex tex="M=\tfrac{u+v}{2}" /> and its argument directly.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\triangle Ouv \text{ is isosceles} \\ &\implies OM \text{ bisects } \angle uOv\end{aligned}" />,
    reason: <>Let <Katex tex="M" /> be the midpoint of the line interval joining <Katex tex="u" /> and <Katex tex="v" />. In an isosceles triangle, the line from the apex <Katex tex="O" /> to the midpoint of the base bisects the angle at <Katex tex="O" />, so the ray through <Katex tex="M" /> has the <em>average</em> of the two arguments.</>,
    more: <>Why it bisects the angle: triangles <Katex tex="OuM" /> and <Katex tex="OvM" /> have all three sides equal (<Katex tex="Ou=Ov=2" />, <Katex tex="uM=vM" />, <Katex tex="OM" /> shared), so they are congruent and their angles at <Katex tex="O" /> are equal.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\theta &= \frac{1}{2}\left(\frac\pi6+\left(-\frac\pi4\right)\right) \\ &= \frac12\left(\frac{2\pi}{12}-\frac{3\pi}{12}\right) = -\frac{\pi}{24}\end{aligned}" />,
    reason: <>Averaging, with a common denominator of 12.</>,
    more: (
      <>
        <p>The report's common incorrect argument, <Katex tex="-\tfrac{\pi}{12}" />, is what you get by adding the arguments, <Katex tex="\tfrac\pi6+\left(-\tfrac\pi4\right)" />, and leaving out the halving. That ray points twice as far below the real axis as the midpoint does.</p>
        <p>Without the isosceles idea you can still find <Katex tex="M" /> directly, and this doubles as a check: <Katex tex="M=\tfrac{u+v}{2}=\tfrac{\sqrt3+\sqrt2}{2}+\tfrac{1-\sqrt2}{2}i" />, which is <Katex tex="\approx1.57-0.21i" />, in the fourth quadrant. So <Katex tex="\theta=\arctan\!\left(\tfrac{-0.207}{1.573}\right)\approx-0.1309" />, and <Katex tex="\tfrac{-0.1309}{\pi}\approx-0.0417\approx-\tfrac{1}{24}" />, giving <Katex tex="-\tfrac{\pi}{24}" /> ✓.</p>
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\theta = -\frac{\pi}{24}}" />,
    reason: <>On the polar grid this is the first ray below the positive real axis. Draw the ray on part b.'s diagram from an open circle at <Katex tex="O" /> (<Katex tex="\mathrm{Arg}(0)" /> is undefined), through <Katex tex="M" /> and beyond.</>,
    more: <>The report notes many students did not draw a ray, in some cases even after giving a correct argument. The question asks for both: the value of <Katex tex="\theta" /> and the ray.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\alpha = \mathrm{Arg}(u)-\mathrm{Arg}(v) = \frac\pi6-\left(-\frac\pi4\right) = \frac{5\pi}{12}" />,
    reason: <>The angle at the centre <Katex tex="O" /> between the radii to <Katex tex="u" /> and <Katex tex="v" />, using the arguments from part b. It is less than <Katex tex="\pi" />, so the minor segment is the one on the side of the chord away from <Katex tex="O" />.</>,
  },
  {
    working: <Katex display tex="A = \frac12r^2\alpha-\frac12r^2\sin(\alpha)" />,
    reason: <>Minor segment = sector <Katex tex="Ouv" /> minus triangle <Katex tex="Ouv" />. Sector: <Katex tex="\tfrac12r^2\alpha" /> (<Katex tex="\alpha" /> in radians). Triangle: <Katex tex="\tfrac12ab\sin(C)" />, with both sides radii <Katex tex="r" /> and the angle <Katex tex="\alpha" /> between them.</>,
    more: (
      <>
        <p>The report notes some students who used an area formula, either of segments or triangles, had difficulty. Two things to get right: <Katex tex="\alpha" /> in radians (calculator in radian mode), and the triangle's area from the two radii and the angle between them. Triangle <Katex tex="Ouv" /> is not right-angled, so avoid <Katex tex="\tfrac12\times\text{base}\times\text{height}" /> with a guessed height: <Katex tex="\tfrac12ab\sin(C)" /> needs only the two radii and <Katex tex="\alpha" />.</p>
        <p>A definite integral also works, but it must be split at <Katex tex="x=\sqrt3" />, where the segment's upper edge changes from the chord to the arc. The report notes that approach usually led to error.</p>
      </>
    ),
  },
  {
    working: <Katex display tex="= \frac12r^2\bigl(\alpha-\sin(\alpha)\bigr)" />,
    reason: <>Taking out the common factor: this is the segment-area formula.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}A &= \frac12(2)^2\left(\frac{5\pi}{12}-\sin\!\left(\frac{5\pi}{12}\right)\right) \\ &= 2\left(\frac{5\pi}{12}-\sin\!\left(\frac{5\pi}{12}\right)\right)\end{aligned}" />,
    reason: <>With <Katex tex="r=2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A \approx 0.69 \ \text{square units}}" />,
    reason: <>With the calculator in radian mode: <Katex tex="\tfrac{5\pi}{12}\approx1.3090" /> and <Katex tex="\sin\!\left(\tfrac{5\pi}{12}\right)\approx0.9659" />, giving <Katex tex="0.6861" />.</>,
    more: <>A sanity check: the whole disc is <Katex tex="4\pi\approx12.6" />, so a thin sliver near the rim being about 0.7 is the right order.</>,
  },
]

export default function SpecialistQ2_2022Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (9 marks)</p>
        <p>
          Two complex numbers <Katex tex="u" /> and <Katex tex="v" /> are given by{' '}
          <Katex tex="u=a+i" /> and <Katex tex="v=b-\sqrt2\,i" />, where{' '}
          <Katex tex="a,b\in R" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Once the values are known, the geometry takes over: <Katex tex="u" /> and{' '}
              <Katex tex="v" /> both have modulus 2, so they sit on the same circle centred at the
              origin <Katex tex="O" />, and triangle <Katex tex="Ouv" /> is isosceles. That one fact
              drives part c. (the ray from <Katex tex="O" /> through the midpoint of the interval
              joining <Katex tex="u" /> and <Katex tex="v" /> splits the angle at <Katex tex="O" /> in
              half) and
              part d. (the angle at <Katex tex="O" /> is simply{' '}
              <Katex tex="\mathrm{Arg}(u)-\mathrm{Arg}(v)" />), with no coordinate algebra at all.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a.i"
        topic="Complex Product"
        marks={2}
        statement={
          <>
            Given that <Katex tex="uv=\bigl(\sqrt2+\sqrt6\bigr)+\bigl(\sqrt2-\sqrt6\bigr)i" />,
            show that <Katex tex="a^2+\bigl(1-\sqrt3\bigr)a-\sqrt3=0" />.
          </>
        }
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Complex Product"
        marks={1}
        statement={
          <>
            One set of possible values for <Katex tex="a" /> and <Katex tex="b" /> is{' '}
            <Katex tex="a=\sqrt3" /> and <Katex tex="b=\sqrt2" />.
            <br />
            Hence, or otherwise, find
            the other set of possible values.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Argand Diagram"
        marks={2}
        statement={
          <>
            Plot and label the points representing <Katex tex="u=\sqrt3+i" /> and{' '}
            <Katex tex="v=\sqrt2-\sqrt2\,i" /> on the Argand diagram below.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Ray Locus"
        marks={2}
        statement={
          <>
            The ray given by <Katex tex="\mathrm{Arg}(z)=\theta" /> passes through the midpoint
            of the line interval that joins the points <Katex tex="u=\sqrt3+i" /> and{' '}
            <Katex tex="v=\sqrt2-\sqrt2\,i" />.
            <br />
            Find, in radians, the value of{' '}
            <Katex tex="\theta" /> and plot this ray on the Argand diagram in part b.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="Equal moduli make the midpoint ray split the angle in half">
          <BisectorWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="d"
        topic="Segment Area"
        marks={2}
        statement={
          <>
            The line interval that joins the points <Katex tex="u=\sqrt3+i" /> and{' '}
            <Katex tex="v=\sqrt2-\sqrt2\,i" /> cuts the circle <Katex tex="|z|=2" /> into a
            major and a minor segment.
            <br />
            Find the area of the minor segment, giving your answer
            correct to two decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
        <Explore title="The minor segment is the sector minus the triangle">
          <SegmentWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
