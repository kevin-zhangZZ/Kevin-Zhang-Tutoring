// 2017 Specialist Mathematics — Exam 2, Section B, Question 4 (10 marks).
// z² + 4z + 16 = 0: polar form, the roots, a locus, the Argand sketch, and the major
// segment. Part (f) was answered correctly by 1% of the state. Question text transcribed
// from the original paper; VCAA supplied blank Argand axes for part e. (−5 to 5 on both
// axes), so the sketch is our own matplotlib figure on that grid. Answers verified with
// sympy. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import argandSrc from './spec-2017e2-q4e-argand.png'

const EXAM_A: SAExaminerStats = {
  marks: [26, 74],
  average: 0.8,
  comment: (
    <>
      A number of incorrect answers had arguments outside the third quadrant, which should
      have alerted students to an error, given the signs of the real and imaginary parts. A
      diagram could have reminded students that the answer needed to be in the third
      quadrant.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [45, 55],
  average: 0.5,
  comment: (
    <>
      Correct solutions were obtained by using the quadratic formula or completing the
      square. Some students did not correctly follow the 'show that' instruction either by
      not showing key steps in their solution or by solely verifying the solutions given by
      substitution. Some students confused factors with solutions or did not proceed beyond
      factorising the quadratic.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [69, 31],
  average: 0.3,
  comment: (
    <>
      Misunderstanding of the question was apparent in student responses to this question.
      Many attempts at
      solutions were not expressed in terms of <Katex tex="2-2\sqrt3i" /> as required.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [20, 15, 65],
  average: 1.5,
  comment: (
    <>
      The solution shown above was the most common correct approach. A smaller proportion
      of students correctly applied a perpendicular bisector approach. The 'show that'
      instruction was generally followed.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [16, 31, 53],
  average: 1.4,
  comment: (
    <>
      Incorrect plotting of the line was the most common error. Students should ensure that
      points plotted are accurately placed and can be clearly seen.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [99, 1],
  average: 0.0,
  comment: (
    <>
      This question caused significant difficulty for students. While a variety of correct
      forms was accepted, very few correct answers were given.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [63, 14, 24],
  average: 0.6,
  comment: (
    <>
      A significant number of students incorrectly used a sector angle of{' '}
      <Katex tex="\tfrac{2\pi}{3}" />. Solutions using definite integrals were also seen;
      these solutions were usually completed correctly.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\left|-2-2\sqrt3i\right| = \sqrt{4+12} = 4" />,
    reason: <>Modulus first.</>,
  },
  {
    working: <Katex display tex="\text{reference angle} = \tan^{-1}\!\left(\frac{2\sqrt3}{2}\right) = \tan^{-1}\!\left(\sqrt3\right) = \frac{\pi}{3}" />,
    reason: <>Using the magnitudes of the two components, which gives the acute angle to the real axis.</>,
  },
  {
    working: <Katex display tex="\text{both parts negative} \implies \text{third quadrant}" />,
    reason: <>Sketching the point first is the habit the report recommends — it makes a wrong-quadrant answer obvious.</>,
  },
  {
    working: <Katex display tex="\operatorname{Arg} = -\pi+\frac{\pi}{3} = -\frac{2\pi}{3}" />,
    reason: <>Measuring clockwise from the positive real axis keeps the argument in the principal range <Katex tex="(-\pi,\pi]" />.</>,
  },
  {
    working: <Katex display tex="\boxed{4\operatorname{cis}\!\left(-\frac{2\pi}{3}\right)}" />,
    reason: <>Equivalently <Katex tex="4\operatorname{cis}\!\left(\tfrac{4\pi}{3}\right)" />, though the principal argument is the usual convention.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="z = \frac{-4\pm\sqrt{4^2-4(1)(16)}}{2}" />,
    reason: <>The quadratic formula. Completing the square, <Katex tex="(z+2)^2=-12" />, is equally acceptable.</>,
  },
  {
    working: <Katex display tex="= \frac{-4\pm\sqrt{-48}}{2}" />,
    reason: <><Katex tex="16-64=-48" />, so the discriminant is negative and the roots are a conjugate pair.</>,
  },
  {
    working: <Katex display tex="\sqrt{-48} = \sqrt{48}\,i = 4\sqrt3\,i" />,
    reason: <>Since <Katex tex="48=16\times3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z = \frac{-4\pm4\sqrt3i}{2} = -2\pm2\sqrt3i}" />,
    reason: <>As required. In a "show that", every one of these lines is needed — the report says solely verifying the given roots by substitution did not follow the instruction.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="w = 2-2\sqrt3i" />,
    reason: <>Name the given number so the relationships are visible.</>,
  },
  {
    working: <Katex display tex="-w = -2+2\sqrt3i" />,
    reason: <>One root, immediately.</>,
  },
  {
    working: <Katex display tex="\bar w = 2+2\sqrt3i \implies -\bar w = -2-2\sqrt3i" />,
    reason: <>Conjugate, then negate, for the other root.</>,
  },
  {
    working: <Katex display tex="\boxed{z = -w \ \text{ and }\ z = -\bar w, \quad\text{where } w = 2-2\sqrt3i}" />,
    reason: <>The question wanted the roots written <em>in terms of</em> <Katex tex="2-2\sqrt3i" />, not recomputed. The report says many attempts were not expressed in terms of <Katex tex="2-2\sqrt3i" /> as required.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="|z| = \left|z-\left(2-2\sqrt3i\right)\right|" />,
    reason: <>Read it as: the distance from <Katex tex="z" /> to the origin equals the distance from <Katex tex="z" /> to the point <Katex tex="\left(2,-2\sqrt3\right)" />.</>,
  },
  {
    working: <Katex display tex="x^2+y^2 = (x-2)^2+\left(y+2\sqrt3\right)^2" />,
    reason: <>Putting <Katex tex="z=x+yi" /> and squaring both sides — legitimate, since both moduli are non-negative.</>,
  },
  {
    working: <Katex display tex="x^2+y^2 = x^2-4x+4+y^2+4\sqrt3y+12" />,
    reason: <>Expanding. Note <Katex tex="\left(2\sqrt3\right)^2=12" />.</>,
  },
  {
    working: <Katex display tex="0 = -4x+4\sqrt3y+16" />,
    reason: <>The squared terms cancel — which is why every "equidistant" locus comes out as a straight line.</>,
  },
  {
    working: <Katex display tex="\boxed{x-\sqrt3y-4 = 0}" />,
    reason: <>Dividing by <Katex tex="-4" />. Check with the midpoint <Katex tex="\left(1,-\sqrt3\right)" /> of the two fixed points: <Katex tex="1+3-4=0" /> ✓.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="x-\sqrt3y-4=0 \iff y = \frac{x-4}{\sqrt3}" />,
    reason: <>Gradient <Katex tex="\tfrac{1}{\sqrt3}" />, so the line rises gently — about <Katex tex="30^\circ" /> to the real axis.</>,
  },
  {
    working: <Katex display tex="\text{intercepts } (4,0) \text{ and } \left(0,-\tfrac{4\sqrt3}{3}\right)" />,
    reason: <>Two accurate points are enough to rule the line. <Katex tex="-\tfrac{4}{\sqrt3}\approx-2.31" />.</>,
  },
  {
    working: <Katex display tex="\text{plot } -2+2\sqrt3i \approx -2+3.46i \text{ and } -2-2\sqrt3i \approx -2-3.46i" />,
    reason: <>Both roots sit on the vertical line <Katex tex="\operatorname{Re}(z)=-2" />, one above and one below the real axis. The lower root lies exactly on the line — <Katex tex="-2-\sqrt3\left(-2\sqrt3\right)-4=0" /> — so plot it carefully; the report says inaccurate plotting was the most common error.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\text{the roots are } -2\pm2\sqrt3i \implies \text{the line is } \operatorname{Re}(z)=-2" />,
    reason: <>Both have real part <Katex tex="-2" />, so the line through them is vertical.</>,
  },
  {
    working: <Katex display tex="|z-a| = |z-b| \iff \text{perpendicular bisector of } a \text{ and } b" />,
    reason: <>So the question becomes: which pairs of points have <Katex tex="\operatorname{Re}(z)=-2" /> as their perpendicular bisector?</>,
  },
  {
    working: <Katex display tex="\operatorname{Im}(b) = \operatorname{Im}(a)" />,
    reason: <>The bisector is vertical, so the segment <Katex tex="ab" /> must be horizontal — same imaginary part.</>,
  },
  {
    working: <Katex display tex="\frac{\operatorname{Re}(a)+\operatorname{Re}(b)}{2} = -2 \implies \operatorname{Re}(b) = -4-\operatorname{Re}(a)" />,
    reason: <>The midpoint has to lie on the line.</>,
  },
  {
    working: <Katex display tex="b = -4-\operatorname{Re}(a)+i\operatorname{Im}(a)" />,
    reason: <>Assembling the two conditions.</>,
  },
  {
    working: <Katex display tex="\boxed{b = -4-\bar a}" />,
    reason: <>Because <Katex tex="-\bar a = -\operatorname{Re}(a)+i\operatorname{Im}(a)" />. Check with <Katex tex="a=0" />: <Katex tex="b=-4" />, and the bisector of <Katex tex="0" /> and <Katex tex="-4" /> is indeed <Katex tex="\operatorname{Re}(z)=-2" /> ✓.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="|z|=4 \text{ meets } \operatorname{Re}(z)=-2 \text{ at } -2\pm2\sqrt3i" />,
    reason: <>The two roots lie on the circle: <Katex tex="\sqrt{4+12}=4" /> ✓. So the chord through them is the chord the question means.</>,
  },
  {
    working: <Katex display tex="\cos\theta = \frac{-2}{4} = -\frac12 \implies \theta = \pm\frac{2\pi}{3}" />,
    reason: <>The arguments of the two endpoints.</>,
  },
  {
    working: <Katex display tex="\text{minor arc} = \frac{2\pi}{3}, \qquad \text{major arc} = 2\pi-\frac{2\pi}{3} = \frac{4\pi}{3}" />,
    reason: <>The report says using <Katex tex="\tfrac{2\pi}{3}" /> here — the <em>minor</em> angle — was a common error. The question asks for the major segment.</>,
  },
  {
    working: <Katex display tex="A = \frac12 r^2\bigl(\theta-\sin\theta\bigr) = \frac12(16)\left(\frac{4\pi}{3}-\sin\frac{4\pi}{3}\right)" />,
    reason: <>The segment formula: sector minus triangle, in one step.</>,
  },
  {
    working: <Katex display tex="\sin\frac{4\pi}{3} = -\frac{\sqrt3}{2}" />,
    reason: <>Third quadrant, reference angle <Katex tex="\tfrac{\pi}{3}" />. The double negative is what makes the triangle term <em>add</em> for a major segment.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{32\pi}{3}+4\sqrt3}" />,
    reason: <>About <Katex tex="40.4" />. Sanity check: the whole disc has area <Katex tex="16\pi\approx50.3" />, so a major segment at about four-fifths of that is right.</>,
  },
]

export default function SpecialistQ4_2017Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (10 marks)</p>
      </div>

      <PartCard letter="a" topic="Polar Form" marks={1} statement={<>Express <Katex tex="-2-2\sqrt3i" /> in polar form.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Complex Quadratic"
        marks={1}
        statement={
          <>
            Show that the roots of <Katex tex="z^2+4z+16=0" /> are{' '}
            <Katex tex="z=-2-2\sqrt3i" /> and <Katex tex="z=-2+2\sqrt3i" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Roots"
        marks={1}
        statement={
          <>
            Express the roots of <Katex tex="z^2+4z+16=0" /> in terms of{' '}
            <Katex tex="2-2\sqrt3i" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Line Locus"
        marks={2}
        statement={
          <>
            Show that the cartesian form of the relation{' '}
            <Katex tex="|z| = \left|z-\left(2-2\sqrt3i\right)\right|" /> is{' '}
            <Katex tex="x-\sqrt3y-4=0" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Sketch Loci"
        marks={2}
        statement={
          <>
            Sketch the line represented by <Katex tex="x-\sqrt3y-4=0" /> and plot the roots
            of <Katex tex="z^2+4z+16=0" /> on the Argand diagram below.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={argandSrc}
            alt="Argand diagram from −5 to 5 on both axes with the line x − √3y − 4 = 0 rising gently through (4, 0), and the two roots −2 ± 2√3 i plotted, the lower one lying on the line"
            className="w-full max-w-[380px]"
          />
        </div>
      </PartCard>

      <PartCard
        letter="f"
        topic="Line Locus"
        marks={1}
        statement={
          <>
            The equation of the line passing through the two roots of{' '}
            <Katex tex="z^2+4z+16=0" /> can be expressed as <Katex tex="|z-a|=|z-b|" />,
            where <Katex tex="a,b\in C" />. Find <Katex tex="b" /> in terms of{' '}
            <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_F}
      >
        <Background title="Running a locus backwards">
          <p>
            Part d. went forwards: given a relation of the form{' '}
            <Katex tex="|z-a|=|z-b|" />, find the line. This one runs backwards — the line is known, and you have to say which pairs of points produce
            it.
          </p>
          <p>
            Two conditions do it. The segment joining <Katex tex="a" /> and{' '}
            <Katex tex="b" /> must be perpendicular to the line, and the midpoint of{' '}
            <Katex tex="a" /> and <Katex tex="b" /> must lie on it. With a vertical line
            those say: same imaginary part, and real parts averaging to{' '}
            <Katex tex="-2" />.
          </p>
          <p>
            Only <Katex tex="1\%" /> of students scored this mark. It is not hard once you see
            what is being asked — the difficulty is in reading the question.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g"
        topic="Segment Area"
        marks={2}
        statement={
          <>
            Find the area of the major segment bounded by the line passing through the roots
            of <Katex tex="z^2+4z+16=0" /> and the major arc of the circle given by{' '}
            <Katex tex="|z|=4" />.
          </>
        }
        examinerReport={EXAM_G}
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>
    </div>
  )
}
