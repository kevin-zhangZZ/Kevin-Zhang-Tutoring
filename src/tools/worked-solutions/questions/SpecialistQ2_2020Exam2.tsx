// 2020 Specialist Mathematics — Exam 2, Section B Question 2 (11 marks). A perpendicular
// bisector in the complex plane, a ray, and the circle through three given points.
// Question text transcribed from the original paper; both figures are this site's own
// matplotlib drawings of the answers, the first on VCAA's Argand grid (x −6 to 7, y −6 to 6,
// gridlines every 1). Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import argandSrc from './spec-2020e2-q2-argand.png'
import circleSrc from './spec-2020e2-q2e-circle.png'

const EXAM_A: SAExaminerStats = {
  marks: [9, 7, 7, 77],
  average: 2.5,
  comment: (
    <>
      Most students were able to set up modulus expressions and successfully solve for{' '}
      <Katex tex="y" /> with or without the use of technology. Students who used a geometric
      approach were generally less successful.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [8, 18, 74],
  average: 1.7,
  comment: (
    <>
      This question was generally done well. Some students who were unable to find the
      cartesian form in Question 2a. were still able to plot the relation using their geometric
      understanding.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [46, 54],
  average: 0.5,
  comment: (
    <>
      A variety of reasonable responses were accepted. Insufficiently precise responses such
      as 'a linear line' or responses that did not explicitly interpret the line in relation
      to the points, were not accepted.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [45, 55],
  average: 0.5,
  comment: (
    <>
      Incorrect responses frequently extended through the point representing{' '}
      <Katex tex="u" />; in some cases, a line was sketched instead of a ray.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [75, 25],
  average: 0.2,
  comment: (
    <>
      While a high proportion of students gave the correct rule, many did not fully describe
      the function as they did not include the domain.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [52, 10, 7, 32],
  average: 1.2,
  comment: (
    <>
      Students struggled with this question. While many were able to set up suitable
      cartesian or complex equations, fewer were then able to proceed further. Students familiar
      with the functionality of CAS were able to use it effectively. Some students correctly
      found <Katex tex="z_c" /> but did not also state the radius.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="z = x+yi, \quad u = -2-i, \quad v = -4-3i" />,
    reason: <>Going straight to cartesian components is the reliable route — the report notes students who used a geometric approach were generally less successful.</>,
  },
  {
    working: <Katex display tex="|z-u| = |(x+2)+(y+1)i|, \quad |z-v| = |(x+4)+(y+3)i|" />,
    reason: <>Subtracting a negative: <Katex tex="x-(-2)=x+2" />.</>,
  },
  {
    working: <Katex display tex="(x+2)^2+(y+1)^2 = (x+4)^2+(y+3)^2" />,
    reason: <>Square both sides — both moduli are non-negative, so nothing is lost.</>,
  },
  {
    working: <Katex display tex="x^2+4x+4+y^2+2y+1 = x^2+8x+16+y^2+6y+9" />,
    reason: <>The <Katex tex="x^2" /> and <Katex tex="y^2" /> terms cancel, which is why the answer is a straight line.</>,
  },
  {
    working: <Katex display tex="4x+2y+5 = 8x+6y+25 \implies 4x+4y+20 = 0" />,
    reason: <>Collecting.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -x-5}" />,
    reason: <>So <Katex tex="m=-1" /> and <Katex tex="c=-5" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="u = -2-i \to (-2,-1), \quad v = -4-3i \to (-4,-3)" />,
    reason: <>Real part across, imaginary part up.</>,
  },
  {
    working: <Katex display tex="y = -x-5: \ \text{through } (0,-5) \text{ and } (-5,0)" />,
    reason: <>Two easy points are enough to rule the line.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={argandSrc}
          alt="VCAA's Argand grid with u at (−2, −1) and v at (−4, −3), the line y = −x − 5, and the ray Arg(z − u) = π/4 leaving u at 45 degrees with an open circle at u — this site's own drawing of the answers to b. and d.i."
          className="w-full max-w-[380px]"
        />
      </div>
    ),
    reason: <>The orange ray is part d.i. Check the line really is the perpendicular bisector: the midpoint of <Katex tex="uv" /> is <Katex tex="(-3,-2)" />, which satisfies <Katex tex="y=-x-5" /> ✓, and <Katex tex="uv" /> has gradient 1, perpendicular to <Katex tex="-1" /> ✓.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="|z-u| = |z-v| \iff \text{the distance to } u \text{ equals the distance to } v" />,
    reason: <>Read the modulus as a distance and the relation interprets itself.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{the perpendicular bisector of the line segment joining } u \text{ and } v}" />,
    reason: <>Both halves matter: <em>perpendicular bisector</em>, and <em>of the segment joining u and v</em>. The report notes insufficiently precise responses such as 'a linear line', or responses that did not relate the line to the points, were not accepted.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{Arg}(z-u) = \tfrac\pi4" />,
    reason: <>The set of points whose displacement from <Katex tex="u" /> has argument exactly <Katex tex="\tfrac\pi4" />.</>,
  },
  {
    working: <Katex display tex="\text{a ray from } u(-2,-1) \text{ at } 45^\circ, \text{ going up and to the right only}" />,
    reason: <>One direction, not two — the report notes incorrect responses frequently extended through <Katex tex="u" />, and some sketched a line instead of a ray. And <Katex tex="\operatorname{Arg}(0)" /> is undefined, so <Katex tex="u" /> itself is excluded: mark it with an open circle.</>,
  },
  {
    working: <Katex display tex="\text{see the orange ray in the diagram in part b.}" />,
    reason: <>Drawn on the same axes, as the question asks.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\tan\!\left(\tfrac\pi4\right) = 1 \implies \text{gradient } 1" />,
    reason: <>The argument is the angle the ray makes with the positive real direction.</>,
  },
  {
    working: <Katex display tex="y-(-1) = 1\left(x-(-2)\right) \implies y = x+1" />,
    reason: <>Point–gradient form through <Katex tex="u" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = x+1, \quad x>-2}" />,
    reason: <>The domain is the whole point of the word <em>ray</em> — the report notes many students gave the correct rule but did not include the domain (75% scored zero).</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="z_c = m+ni; \ \text{equal distances to } u, \ v \text{ and } -5i" />,
    reason: <>The centre of a circle is equidistant from every point on it, which turns three points into two equations.</>,
  },
  {
    working: <Katex display tex="(-2-m)^2+(-1-n)^2 = m^2+(n+5)^2" />,
    reason: <>Distance to <Katex tex="u" /> equals distance to <Katex tex="-5i=(0,-5)" />.</>,
  },
  {
    working: <Katex display tex="(-4-m)^2+(-3-n)^2 = m^2+(n+5)^2" />,
    reason: <>Same again with <Katex tex="v" />. Two equations, two unknowns.</>,
  },
  {
    working: <Katex display tex="5+4m+2n = 10n+25 \implies m-2n = 5" />,
    reason: <>Expanding the first: the squares in <Katex tex="m" /> and <Katex tex="n" /> cancel.</>,
  },
  {
    working: <Katex display tex="25+8m+6n = 10n+25 \implies 8m = 4n \implies n = 2m" />,
    reason: <>Expanding the second.</>,
  },
  {
    working: <Katex display tex="m-2(2m) = 5 \implies -3m = 5 \implies m = -\tfrac53, \ n = -\tfrac{10}{3}" />,
    reason: <>Substituting.</>,
  },
  {
    working: <Katex display tex="\boxed{z_c = -\tfrac53-\tfrac{10}{3}i}" />,
    reason: <>A point on the perpendicular bisector from part a., as it must be: <Katex tex="-\tfrac{10}{3}=\tfrac53-5" /> ✓.</>,
  },
  {
    working: <Katex display tex="r^2 = \left(-\tfrac53\right)^2+\left(-\tfrac{10}{3}+5\right)^2 = \tfrac{25}{9}+\tfrac{25}{9} = \tfrac{50}{9}" />,
    reason: <>Using the distance to <Katex tex="-5i" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={circleSrc}
          alt="A circle through u at (−2, −1), v at (−4, −3) and −5i at (0, −5), centred at (−5/3, −10/3) — this site's own explanatory figure"
          className="w-full max-w-[340px]"
        />
      </div>
    ),
    reason: <>Not required, but a quick sketch confirms all three points sit on one circle.</>,
  },
  {
    working: <Katex display tex="\boxed{r = \frac{5\sqrt2}{3}}" />,
    reason: <>About 2.36. The report notes some students correctly found <Katex tex="z_c" /> but did not also state the radius.</>,
  },
]

export default function SpecialistQ2_2020Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (11 marks)</p>
        <p>
          Two complex numbers, <Katex tex="u" /> and <Katex tex="v" />, are defined as{' '}
          <Katex tex="u=-2-i" /> and <Katex tex="v=-4-3i" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Line Locus"
        marks={3}
        statement={
          <>
            Express the relation <Katex tex="|z-u|=|z-v|" /> in the cartesian form{' '}
            <Katex tex="y=mx+c" />, where <Katex tex="m,c\in R" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Loci"
        marks={2}
        statement={
          <>
            Plot the points that represent <Katex tex="u" /> and <Katex tex="v" /> and the
            relation <Katex tex="|z-u|=|z-v|" /> on the Argand diagram below.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Perpendicular Bisector"
        marks={1}
        statement={
          <>
            State a geometrical interpretation of the graph of <Katex tex="|z-u|=|z-v|" /> in
            relation to the points that represent <Katex tex="u" /> and <Katex tex="v" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d.i"
        topic="Ray Locus"
        marks={1}
        statement={
          <>
            Sketch the ray given by <Katex tex="\operatorname{Arg}(z-u)=\tfrac\pi4" /> on the
            Argand diagram in part b.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Ray Equation"
        marks={1}
        statement={
          <>
            Write down the function that describes the ray{' '}
            <Katex tex="\operatorname{Arg}(z-u)=\tfrac\pi4" />, giving the rule in cartesian
            form.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Circle Through Points"
        marks={3}
        statement={
          <>
            The points representing <Katex tex="u" /> and <Katex tex="v" /> and{' '}
            <Katex tex="-5i" /> lie on the circle given by <Katex tex="|z-z_c|=r" />, where{' '}
            <Katex tex="z_c" /> is the centre of the circle and <Katex tex="r" /> is the
            radius.
            <br />
            Find <Katex tex="z_c" /> in the form <Katex tex="a+ib" />, where{' '}
            <Katex tex="a,b\in R" />, and find the radius <Katex tex="r" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
