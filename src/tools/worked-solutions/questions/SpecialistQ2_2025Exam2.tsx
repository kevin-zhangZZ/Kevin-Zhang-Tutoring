// 2025 Specialist Mathematics — Exam 2, Section B Question 2 (10 marks). A circle and a
// perpendicular bisector on the Argand plane, where they meet, a ray through two given points,
// and the area of the minor segment they cut off. Question text transcribed from the original
// paper; the polar grid carrying P and Q is the actual VCAA figure, cropped from the official
// exam PDF, and the combined sketch is our own drawing of the answer. Answers checked with
// sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import pqSrc from './spec-2025e2-q2-pq.png'
import sketchSrc from './spec-2025e2-q2-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [11.69, 88.31],
  average: 0.88,
  comment: <>Students must make sure their sketch is visible. The use of a highlighter or colour was useful.</>,
}

const EXAM_BI: SAExaminerStats = {
  marks: [13.34, 12.21, 74.45],
  average: 1.61,
  comment: (
    <>
      This was a &ldquo;show that&rdquo; question which requires a full algebraic or a
      geometric approach. The algebraic approach is to equate the magnitudes of the complex
      expressions and then expand the brackets and simplify.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [21.7, 78.3],
  average: 0.78,
  comment: <>Some students drew the line slightly off the correct angle of 60° with the Re(z) axis.</>,
}

const EXAM_CI: SAExaminerStats = {
  marks: [18.93, 10.88, 70.19],
  average: 1.51,
  comment: <>These points could be found by inspection of the graph or using simultaneous equations.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [26.11, 73.89],
  average: 0.73,
  comment: (
    <>
      Students need to take care when labelling the points on the graph. If they are using
      coordinates, they must not have <Katex tex="i" /> in the coordinate. Some students did
      not record a response for this question.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [49.36, 50.64],
  average: 0.5,
  comment: (
    <>
      Many students stated the correct value for <Katex tex="z_0" /> but did not correctly
      identify the argument. Drawing the ray on the graph may have made it easier to identify
      the angle. Principal values were expected.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [23.49, 15.44, 61.07],
  average: 1.37,
  comment: (
    <>
      Most students were successful when applying the area formula of a segment. Some
      responses, however, used the incorrect angle and others did not give the answer in the
      required form.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="z\overline{z} = |z|^2" />,
    reason: 'The standard identity — a complex number times its conjugate is the square of its modulus.',
  },
  {
    working: <Katex display tex="|z|^2 = 4 \implies |z| = 2" />,
    reason: 'The modulus is never negative, so only the positive root survives.',
  },
  {
    working: <Katex display tex="\boxed{\text{the circle of radius } 2 \text{ centred at the origin}}" />,
    reason: 'Drawn on the polar grid, which already carries circles of radius 1, 2 and 3 — so this is a matter of tracing the middle one clearly.',
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="z = x+iy \implies |z-2i| = \left|x+(y-2)i\right|, \quad \left|z-\sqrt3-i\right| = \left|\left(x-\sqrt3\right)+(y-1)i\right|" />,
    reason: 'Writing z in Cartesian form so both moduli can be expanded.',
  },
  {
    working: <Katex display tex="x^2+(y-2)^2 = \left(x-\sqrt3\right)^2+(y-1)^2" />,
    reason: 'Squaring both sides — legal, since both moduli are non-negative.',
  },
  {
    working: <Katex display tex="x^2+y^2-4y+4 = x^2-2\sqrt3x+3+y^2-2y+1" />,
    reason: 'Expanding every bracket.',
  },
  {
    working: <Katex display tex="-4y+4 = -2\sqrt3x-2y+4" />,
    reason: <>The <Katex tex="x^2" /> and <Katex tex="y^2" /> terms cancel, which is what makes the locus a straight line.</>,
  },
  {
    working: <Katex display tex="-2y = -2\sqrt3x \implies \boxed{y = \sqrt3x}" />,
    reason: 'As required. Geometrically this is the perpendicular bisector of the segment joining 2i and √3 + i, which passes through the origin because both points are distance 2 from it.',
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="y = \sqrt3x \implies \tan(\theta) = \sqrt3 \implies \theta = \frac{\pi}{3}" />,
    reason: 'A line through the origin at 60° to the positive real axis — and the same line continues into the third quadrant.',
  },
  {
    working: <Katex display tex="\boxed{\text{see the sketch below}}" />,
    reason: 'Drawn full length, not just the first-quadrant half. The polar grid already has a ray at 60°, so it can be traced.',
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+y^2 = 4 \quad \text{and} \quad y = \sqrt3x" />,
    reason: 'The circle from part a. and the line from part b.i., solved simultaneously.',
  },
  {
    working: <Katex display tex="x^2+3x^2 = 4 \implies 4x^2 = 4 \implies x = \pm1" />,
    reason: 'Substituting the line into the circle.',
  },
  {
    working: <Katex display tex="x = 1 \implies y = \sqrt3, \qquad x = -1 \implies y = -\sqrt3" />,
    reason: 'Back-substituting into the line.',
  },
  {
    working: <Katex display tex="\boxed{1+\sqrt3\,i \qquad \text{and} \qquad -1-\sqrt3\,i}" />,
    reason: <>In the form <Katex tex="a+ib" /> as asked. They are diametrically opposite, as they must be for a line through the centre.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{mark } 1+\sqrt3\,i \text{ and } -1-\sqrt3\,i \text{ where the line meets the circle}" />,
    reason: 'Both lie at distance 2 from the origin, at arguments π/3 and −2π/3.',
  },
  {
    working: <Katex display tex="\boxed{\text{see the sketch below}}" />,
    reason: <>Label them as complex numbers, not as coordinate pairs containing <Katex tex="i" /> — writing <Katex tex="\left(1,\sqrt3\,i\right)" /> was penalised.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{Arg}(z-z_0) = \theta \text{ is a ray starting at } z_0" />,
    reason: 'The point subtracted is where the ray begins, so z₀ is P itself.',
  },
  {
    working: <Katex display tex="\boxed{z_0 = \frac{3}{2}+\frac{3\sqrt3}{2}i}" />,
    reason: 'Read straight off the diagram.',
  },
  {
    working: <Katex display tex="Q-P = 3-\left(\frac{3}{2}+\frac{3\sqrt3}{2}i\right) = \frac{3}{2}-\frac{3\sqrt3}{2}i" />,
    reason: 'The direction of the ray is from P towards Q, so subtract in that order.',
  },
  {
    working: <Katex display tex="\tan(\theta) = \frac{-\frac{3\sqrt3}{2}}{\frac{3}{2}} = -\sqrt3, \quad \text{fourth quadrant}" />,
    reason: 'Positive real part, negative imaginary part.',
  },
  {
    working: <Katex display tex="\boxed{\theta = -\frac{\pi}{3}}" />,
    reason: <>The principal value, in <Katex tex="(-\pi,\pi]" />. Answering <Katex tex="\tfrac{5\pi}{3}" /> or <Katex tex="\tfrac{\pi}{3}" /> was the common loss.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="|P| = \sqrt{\left(\frac{3}{2}\right)^2+\left(\frac{3\sqrt3}{2}\right)^2} = \sqrt{\frac94+\frac{27}{4}} = 3, \qquad |Q| = 3" />,
    reason: <>Both points lie on the circle <Katex tex="|z|=3" />, so the chord PQ really does cut a segment from it.</>,
  },
  {
    working: <Katex display tex="\operatorname{Arg}(P) = \frac{\pi}{3}, \qquad \operatorname{Arg}(Q) = 0" />,
    reason: 'P is at 60° and Q sits on the positive real axis.',
  },
  {
    working: <Katex display tex="\text{angle at the centre} = \frac{\pi}{3}-0 = \frac{\pi}{3}" />,
    reason: 'The angle subtended by the chord — using the reflex angle instead gives the major segment, which was a listed error.',
  },
  {
    working: <Katex display tex="A = \frac{1}{2}r^2\big(\vartheta-\sin(\vartheta)\big) = \frac{1}{2}(9)\left(\frac{\pi}{3}-\frac{\sqrt3}{2}\right)" />,
    reason: 'The segment formula: sector minus triangle.',
  },
  {
    working: <Katex display tex="\boxed{A = \frac{3\pi}{2}-\frac{9\sqrt3}{4}}" />,
    reason: <>In the form <Katex tex="c\pi+d" /> with <Katex tex="c=\tfrac32" /> and <Katex tex="d=-\tfrac{9\sqrt3}{4}" />, about 0.815 square units.</>,
  },
]

export default function SpecialistQ2_2025Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (10 marks)</p>
        <p>
          Parts a. to c. are set on one polar Argand plane; parts d. and e. move to a second
          one carrying two marked points.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Two loci meet here. <Katex tex="z\overline{z}=4" /> is a circle in disguise, since{' '}
            <Katex tex="z\overline{z}" /> is always <Katex tex="|z|^2" />. And an equation of
            the form <Katex tex="|z-w_1| = |z-w_2|" /> always describes the perpendicular
            bisector of the segment joining <Katex tex="w_1" /> and <Katex tex="w_2" /> — here
            both of those points happen to be distance 2 from the origin, so the bisector runs
            through the centre of the circle and the two intersection points end up
            diametrically opposite.
          </p>
          <p>
            Part d. relies on reading <Katex tex="\operatorname{Arg}(z-z_0)=\theta" /> correctly:
            the ray <em>starts</em> at <Katex tex="z_0" /> and <Katex tex="\theta" /> is the
            direction it travels, measured as a principal value.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Sketch <Katex tex="\left\{z:z\overline{z}=4,\ z\in\mathbb{C}\right\}" /> on the polar
            Argand plane provided.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        marks={2}
        statement={
          <>
            Show that <Katex tex="\left\{z:|z-2i|=\left|z-\sqrt3-i\right|,\ z\in\mathbb{C}\right\}" />{' '}
            may be expressed as <Katex tex="y=\sqrt3x" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        marks={1}
        statement={
          <>
            Sketch <Katex tex="\left\{z:|z-2i|=\left|z-\sqrt3-i\right|,\ z\in\mathbb{C}\right\}" />{' '}
            on the Argand plane in <b>part a</b>.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c.i"
        marks={2}
        statement={
          <>
            Find the points of intersection of the curves defined in <b>part a</b> and in{' '}
            <b>part b.i</b>, expressing your answers in the form <Katex tex="a+ib" />, where{' '}
            <Katex tex="a,b\in\mathbb{R}" />.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        marks={1}
        statement={<>Label these points on the Argand plane in <b>part a</b>.</>}
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={sketchSrc}
            alt="An Argand plane showing the circle of radius 2 centred at the origin together with the full line y = √3 x, meeting it at the labelled points 1 + √3 i in the first quadrant and −1 − √3 i in the third"
            className="w-full max-w-[460px]"
          />
        </div>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">d. and e.</p>
        <p>
          Consider the points <Katex tex="P" /> and <Katex tex="Q" /> labelled on the Argand
          plane below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={pqSrc}
            alt="A polar Argand plane from −3 to 3 with the point P at (3/2, 3√3/2) marked on the outer circle and the point Q at (3, 0) marked on the positive real axis"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard
        letter="d"
        marks={1}
        statement={
          <>
            A ray originating at point <Katex tex="P" /> and passing through point{' '}
            <Katex tex="Q" /> has the equation <Katex tex="\operatorname{Arg}(z-z_0)=\theta" />,
            where <Katex tex="\theta" /> is a radian measure. Write down the values of{' '}
            <Katex tex="z_0" /> and <Katex tex="\theta" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        marks={2}
        statement={
          <>
            Find the area of the minor segment bounded by the chord connecting the points{' '}
            <Katex tex="P" /> and <Katex tex="Q" /> and the circle given by{' '}
            <Katex tex="|z|=3" />. Give your answer in the form <Katex tex="c\pi+d" />, where{' '}
            <Katex tex="c,d\in\mathbb{R}" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
