// 2021 Specialist Mathematics — Exam 2, Section B Question 2 (9 marks). A real cubic with a
// conjugate pair of roots, then a ray cutting a circle in the complex plane and the area of
// the minor segment. Question text transcribed from the original paper; the figure is this
// site's own matplotlib drawing of the answer, on VCAA's polar grid (circles r = 1 to 4,
// radial lines every 30°). Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import argandSrc from './spec-2021e2-q2-argand.png'

const EXAM_AI: SAExaminerStats = { marks: [27, 73], average: 0.8 }

const EXAM_AII: SAExaminerStats = {
  marks: [28, 39, 10, 23],
  average: 1.3,
  comment: (
    <>
      Many students used <Katex tex="p(2)=-13" /> in the expanded form, which was less
      productive than using the factorised form directly.
      <br />
      An alternative solution involving purely real <Katex tex="z" /> values was possible
      yielding <Katex tex="\alpha=\tfrac35,\ \beta=-9,\ \gamma=-\tfrac{27}{5}" />.
      <br />
      Where working was correct and complete across Questions 2ai. and 2aii., these answers
      were accepted.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [41, 28, 31],
  average: 0.9,
  comment: (
    <>
      Where drawn, the ray generally had the correct argument. The point of emanation is not
      part of required ray and should be shown as an open circle. This was not always shown
      or placed correctly, sometimes due to an apparent lack of precision rather than an
      obvious mathematical error.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = { marks: [25, 75], average: 0.8 }

const EXAM_CII: SAExaminerStats = {
  marks: [62, 16, 22],
  average: 0.6,
  comment: (
    <>
      Students who scored highly correctly applied a segment area formula. A smaller
      proportion correctly used a definite integral. Some students who used an area formula,
      either of segments or triangles, had difficulty determining the required angle.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\alpha,\beta,\gamma \in R \text{ and } z_2, z_3 \notin R" />,
    reason: <>A polynomial with real coefficients cannot have a lone non-real root.</>,
  },
  {
    working: <Katex display tex="\boxed{z_3 = \overline{z_2}}" />,
    reason: <>The conjugate root theorem — non-real roots of a real polynomial come in conjugate pairs.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\left|z_2+z_3\right| = 0 \implies z_2+z_3 = 0, \text{ and with } z_3 = \overline{z_2}: \ \operatorname{Re}(z_2) = 0" />,
    reason: <>A number plus its conjugate is twice the real part, so <Katex tex="z_2" /> is purely imaginary: <Katex tex="z_2=bi" />, <Katex tex="z_3=-bi" />.</>,
  },
  {
    working: <Katex display tex="\left|z_2-z_3\right| = |2bi| = 2|b| = 6 \implies z_2 = 3i, \ z_3 = -3i" />,
    reason: <>Either labelling gives the same pair. (The report notes a purely real pair, <Katex tex="z_2=3" /> and <Katex tex="z_3=-3" />, was also accepted with correct working across parts a.i. and a.ii.)</>,
  },
  {
    working: <Katex display tex="p(2) = (2-z_1)(2-3i)(2+3i) = (2-z_1)(4+9) = -13" />,
    reason: <>Using the <em>factorised</em> form: the conjugate pair multiplies to the real number 13.</>,
  },
  {
    working: <Katex display tex="13(2-z_1) = -13 \implies z_1 = 3" />,
    reason: <>One clean step, where expanding first would have meant solving a messy cubic condition.</>,
  },
  {
    working: <Katex display tex="p(z) = (z-3)\left(z^2+9\right) = z^3-3z^2+9z-27" />,
    reason: <>Expanding now that all three roots are known.</>,
  },
  {
    working: <Katex display tex="\boxed{\alpha = -3, \quad \beta = 9, \quad \gamma = -27}" />,
    reason: <>Check: <Katex tex="p(2)=8-12+18-27=-13" /> ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="z_4 = \sqrt3+i \to \left(\sqrt3,\ 1\right)" />,
    reason: <>About <Katex tex="(1.73,1)" /> on the Argand diagram.</>,
  },
  {
    working: <Katex display tex="\operatorname{Arg}(z-z_4) = \tfrac{5\pi}{6} = 150^\circ" />,
    reason: <>A ray leaving that point up and to the left, at 30° above the negative real direction.</>,
  },
  {
    working: <Katex display tex="\text{gradient} = \tan\!\left(\tfrac{5\pi}{6}\right) = -\tfrac{1}{\sqrt3}" />,
    reason: <>Shallow and negative — but only the half going up-left, since <Katex tex="\operatorname{Arg}" /> fixes the direction as well as the slope.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={argandSrc}
          alt="On VCAA's polar grid: an orange ray leaving an open circle at z4 = √3 + i heading up and to the left at 150°, cutting the blue circle of radius 1 centred at 3i"
          className="w-full max-w-[380px]"
        />
      </div>
    ),
    reason: <><Katex tex="\operatorname{Arg}(0)" /> is undefined, so <Katex tex="z_4" /> itself is not on the ray — mark it with an open circle; the report notes this was not always shown or placed correctly.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="|z-3i| = 1: \text{ centre } (0,3), \text{ radius } 1" />,
    reason: <>Read straight off the modulus form.</>,
  },
  {
    working: <Katex display tex="\text{drawn in blue on the diagram in part b.}" />,
    reason: <>The ray passes through it, cutting off a small piece on the far side — the minor segment of part c.ii.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{ray: } y-1 = -\tfrac{1}{\sqrt3}\left(x-\sqrt3\right) \implies x+\sqrt3\,y-2\sqrt3 = 0" />,
    reason: <>Putting the ray into general form so the point–line distance formula can be used.</>,
  },
  {
    working: <Katex display tex="d = \frac{\left|0+3\sqrt3-2\sqrt3\right|}{\sqrt{1+3}} = \frac{\sqrt3}{2}" />,
    reason: <>The perpendicular distance from the centre <Katex tex="(0,3)" /> to the chord. Since <Katex tex="\tfrac{\sqrt3}{2}<1" />, the ray really does cut the circle.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\tfrac\theta2\right) = \frac{d}{r} = \frac{\sqrt3}{2} \implies \tfrac\theta2 = \tfrac\pi6 \implies \theta = \tfrac\pi3" />,
    reason: <>The half-angle the chord subtends at the centre. The report notes some students had difficulty determining this angle.</>,
  },
  {
    working: <Katex display tex="A = \tfrac12r^2\bigl(\theta-\sin\theta\bigr) = \tfrac12\left(\tfrac\pi3-\tfrac{\sqrt3}{2}\right)" />,
    reason: <>Sector minus triangle — the standard segment formula, with r = 1.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{\pi}{6}-\frac{\sqrt3}{4} = \frac{2\pi-3\sqrt3}{12}}" />,
    reason: <>About 0.091 square units — a thin sliver, as the diagram shows.</>,
  },
]

export default function SpecialistQ2_2021Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (9 marks)</p>
        <p>
          The polynomial{' '}
          <Katex tex="p(z)=z^3+\alpha z^2+\beta z+\gamma" />, where <Katex tex="z\in C" />{' '}
          and <Katex tex="\alpha,\beta,\gamma\in R" />, can also be written as{' '}
          <Katex tex="p(z)=(z-z_1)(z-z_2)(z-z_3)" />, where <Katex tex="z_1\in R" /> and{' '}
          <Katex tex="z_2,z_3\in C" />.
        </p>
      </div>

      <PartCard
        letter="a.i"
        topic="Conjugate Roots"
        marks={1}
        statement={
          <>
            State the relationship between <Katex tex="z_2" /> and <Katex tex="z_3" />.
          </>
        }
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Cubic Coefficients"
        marks={3}
        statement={
          <>
            Determine the values of <Katex tex="\alpha" />, <Katex tex="\beta" /> and{' '}
            <Katex tex="\gamma" />, given that <Katex tex="p(2)=-13" />,{' '}
            <Katex tex="\left|z_2+z_3\right|=0" /> and <Katex tex="\left|z_2-z_3\right|=6" />.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Consider the point <Katex tex="z_4=\sqrt3+i" />.
        </p>
      </div>

      <PartCard
        letter="b"
        topic="Ray Locus"
        marks={2}
        statement={
          <>
            Sketch the ray given by{' '}
            <Katex tex="\operatorname{Arg}(z-z_4)=\tfrac{5\pi}{6}" /> on the Argand diagram below.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The ray <Katex tex="\operatorname{Arg}(z-z_4)=\tfrac{5\pi}{6}" /> intersects the
          circle <Katex tex="|z-3i|=1" />, dividing it into a major and a minor segment.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Circle Locus"
        marks={1}
        statement={
          <>
            Sketch the circle <Katex tex="|z-3i|=1" /> on the Argand diagram in part b.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Segment Area"
        marks={2}
        statement={<>Find the area of the minor segment.</>}
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>
    </div>
  )
}
