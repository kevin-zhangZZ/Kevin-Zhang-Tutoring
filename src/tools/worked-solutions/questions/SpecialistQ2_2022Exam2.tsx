// 2022 Specialist Mathematics — Exam 2, Section B Question 2 (9 marks). A product of two
// complex numbers that leads to a quadratic in a, then an Argand diagram, an angle bisector
// and a circular segment. Question text transcribed from the original paper; the Argand
// diagram is our own drawing of the answer. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import argandSrc from './spec-2022e2-q2-argand.png'

const EXAM_AI: SAExaminerStats = {
  marks: [27, 39, 34],
  average: 1.1,
  comment: (
    <>
      In a "show that" question, students are required to clearly and logically show the steps
      that lead to the given result. A number of students apparently used a CAS to solve the
      given equation and then substituted their answers, again using CAS to verify the result.
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
      the points rather than the more successful approach of considering the polar form.
      Students should be aware of the polar grid provided, which enables them to plot the
      required points precisely.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [48, 27, 25],
  average: 0.8,
  comment: (
    <>
      A common incorrect argument was <Katex tex="\theta=-\tfrac{\pi}{12}" />. Many students
      did not draw a ray; in some cases this appeared to be an unfortunate slip, as some of
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
      correctly used a definite integral, but this approach usually led to error.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="uv = (a+i)\bigl(b-\sqrt2\,i\bigr) = ab-\sqrt2\,ai+bi-\sqrt2\,i^2" />,
    reason: 'Expand first; the given form tells you nothing until the real and imaginary parts are separated.',
  },
  {
    working: <Katex display tex="= \bigl(ab+\sqrt2\bigr)+\bigl(b-\sqrt2\,a\bigr)i" />,
    reason: <><Katex tex="-\sqrt2\,i^2=+\sqrt2" />, which joins the real part.</>,
  },
  {
    working: <Katex display tex="ab+\sqrt2 = \sqrt2+\sqrt6 \implies ab = \sqrt6" />,
    reason: 'Equating real parts. Two complex numbers are equal only if both parts match.',
  },
  {
    working: <Katex display tex="b-\sqrt2\,a = \sqrt2-\sqrt6" />,
    reason: 'Equating imaginary parts — the second equation.',
  },
  {
    working: <Katex display tex="b = \frac{\sqrt6}{a} \implies \frac{\sqrt6}{a}-\sqrt2\,a = \sqrt2-\sqrt6" />,
    reason: <>Eliminating <Katex tex="b" />. (<Katex tex="a\ne0" />, since <Katex tex="ab=\sqrt6\ne0" />.)</>,
  },
  {
    working: <Katex display tex="\sqrt6-\sqrt2\,a^2 = \sqrt2\,a-\sqrt6\,a" />,
    reason: <>Multiplying through by <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\sqrt3-a^2 = a-\sqrt3\,a" />,
    reason: <>Dividing every term by <Katex tex="\sqrt2" />: <Katex tex="\tfrac{\sqrt6}{\sqrt2}=\sqrt3" />. This is the step that makes the surds tidy.</>,
  },
  {
    working: <Katex display tex="\boxed{a^2+\bigl(1-\sqrt3\bigr)a-\sqrt3 = 0} \ \checkmark" />,
    reason: 'Collecting everything on one side. Every line must be shown — the report is explicit that verifying the given result with a CAS earns nothing.',
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="a^2+\bigl(1-\sqrt3\bigr)a-\sqrt3 = (a+1)\bigl(a-\sqrt3\bigr)" />,
    reason: <>The factorisation is visible once you notice the product of the roots is <Katex tex="-\sqrt3" /> and one root is given as <Katex tex="\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="a = -1 \quad\text{or}\quad a = \sqrt3" />,
    reason: <>The second is the set already provided, so the other value of <Katex tex="a" /> is <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="ab = \sqrt6 \implies b = \frac{\sqrt6}{-1} = -\sqrt6" />,
    reason: <>Use <Katex tex="ab=\sqrt6" />, not the other equation — one line instead of three.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -1, \quad b = -\sqrt6}" />,
    reason: <>Check: <Katex tex="b-\sqrt2a=-\sqrt6+\sqrt2" /> ✓. The report notes students who gave <Katex tex="a=1" />, <Katex tex="b=\sqrt6" /> — the negatives — which fails this check.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="|u| = \sqrt{3+1} = 2, \qquad \mathrm{Arg}(u) = \arctan\!\left(\frac{1}{\sqrt3}\right) = \frac\pi6" />,
    reason: <><Katex tex="u=\sqrt3+i" /> is in the first quadrant, so no adjustment is needed.</>,
  },
  {
    working: <Katex display tex="|v| = \sqrt{2+2} = 2, \qquad \mathrm{Arg}(v) = -\frac\pi4" />,
    reason: <>Equal real and imaginary parts of opposite sign put <Katex tex="v" /> exactly on the <Katex tex="-45^\circ" /> line.</>,
  },
  {
    working: <Katex display tex="\text{Both lie on the circle } |z|=2" />,
    reason: 'The whole reason the polar grid is printed. Follow the r = 2 circle round to the right ray rather than estimating x and y — the report says that was the successful approach.',
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="|u| = |v| = 2" />,
    reason: 'Both points are the same distance from the origin, which is what makes the next step possible.',
  },
  {
    working: <Katex display tex="\triangle Ouv \text{ is isosceles} \implies \text{the median from } O \text{ bisects } \angle uOv" />,
    reason: <>In an isosceles triangle the line from the apex to the midpoint of the base is also the angle bisector. So the ray through the midpoint has the <em>average</em> of the two arguments.</>,
  },
  {
    working: <Katex display tex="\theta = \frac{1}{2}\left(\frac\pi6+\left(-\frac\pi4\right)\right) = \frac12\left(\frac{2\pi}{12}-\frac{3\pi}{12}\right)" />,
    reason: 'Averaging, with a common denominator of 12.',
  },
  {
    working: <Katex display tex="\boxed{\theta = -\frac{\pi}{24}}" />,
    reason: <>The report's common wrong answer <Katex tex="-\tfrac{\pi}{12}" /> is the <em>difference</em> of the arguments, not the average — one halving short.</>,
  },
  {
    working: <Katex display tex="\text{Midpoint} = \frac{u+v}{2} = \frac{\sqrt3+\sqrt2}{2}+\frac{1-\sqrt2}{2}i \approx 1.57-0.21i" />,
    reason: <>A direct check: <Katex tex="\arctan\!\left(\tfrac{-0.207}{1.573}\right)=-0.1309=-\tfrac{\pi}{24}" /> ✓. And the ray must actually be drawn — nearly half the cohort lost a mark for leaving it off.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\alpha = \mathrm{Arg}(u)-\mathrm{Arg}(v) = \frac\pi6-\left(-\frac\pi4\right) = \frac{5\pi}{12}" />,
    reason: 'The angle the chord subtends at the centre. Less than π, so the segment it cuts off is the minor one.',
  },
  {
    working: <Katex display tex="A = \frac12r^2\bigl(\alpha-\sin(\alpha)\bigr)" />,
    reason: 'Sector minus triangle, in one formula. The angle must be in radians.',
  },
  {
    working: <Katex display tex="A = \frac12(2)^2\left(\frac{5\pi}{12}-\sin\!\left(\frac{5\pi}{12}\right)\right) = 2\left(\frac{5\pi}{12}-\sin\!\left(\frac{5\pi}{12}\right)\right)" />,
    reason: <>With <Katex tex="r=2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A \approx 0.69 \ \text{square units}}" />,
    reason: <><Katex tex="\tfrac{5\pi}{12}\approx1.3090" /> and <Katex tex="\sin\!\left(\tfrac{5\pi}{12}\right)\approx0.9659" />, giving <Katex tex="0.6861" />. A sanity check: the whole disc is <Katex tex="4\pi\approx12.6" />, so a thin sliver near the rim being about 0.7 is the right order.</>,
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
          <Katex tex="a,b\in\mathbb{R}" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Once the values are known, the geometry takes over: <Katex tex="u" /> and{' '}
            <Katex tex="v" /> both have modulus 2, so they sit on the same circle. Two points
            on a circle make an isosceles triangle with the centre, and that single fact
            supplies part c. (the median bisects the apex angle) and part d. (the chord
            subtends <Katex tex="\mathrm{Arg}(u)-\mathrm{Arg}(v)" /> at the centre) without any
            coordinate algebra at all.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a.i"
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
        marks={1}
        statement={
          <>
            One set of possible values for <Katex tex="a" /> and <Katex tex="b" /> is{' '}
            <Katex tex="a=\sqrt3" /> and <Katex tex="b=\sqrt2" />. Hence, or otherwise, find
            the other set of possible values.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Plot and label the points representing <Katex tex="u=\sqrt3+i" /> and{' '}
            <Katex tex="v=\sqrt2-\sqrt2\,i" /> on the Argand diagram provided.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={argandSrc}
            alt="An Argand diagram showing the circle |z| = 2 with u = √3 + i at argument π/6 and v = √2 − √2i at argument −π/4, the chord joining them, the shaded minor segment it cuts off, and the ray Arg(z) = −π/24 passing through the chord's midpoint"
            className="w-full max-w-[440px]"
          />
        </div>
      </PartCard>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            The ray given by <Katex tex="\mathrm{Arg}(z)=\theta" /> passes through the midpoint
            of the line interval that joins the points <Katex tex="u=\sqrt3+i" /> and{' '}
            <Katex tex="v=\sqrt2-\sqrt2\,i" />. Find, in radians, the value of{' '}
            <Katex tex="\theta" /> and plot this ray on the Argand diagram in part b.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        marks={2}
        statement={
          <>
            The line interval that joins the points <Katex tex="u=\sqrt3+i" /> and{' '}
            <Katex tex="v=\sqrt2-\sqrt2\,i" /> cuts the circle <Katex tex="|z|=2" /> into a
            major and a minor segment. Find the area of the minor segment, giving your answer
            correct to two decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
