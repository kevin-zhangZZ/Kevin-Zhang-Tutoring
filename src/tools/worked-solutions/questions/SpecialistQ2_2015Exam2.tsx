// 2015 Specialist Mathematics — Exam 2, Section 2 Question 2 (12 marks). An Argand diagram
// with a perpendicular-bisector line and a circle, their intersections, then a quadratic in
// z with a trigonometric coefficient. Question text transcribed from the original paper; the
// Argand grid VCAA supplied was blank, so the diagram is this site's own matplotlib figure.
// Answers checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import argandSrc from './spec-2015e2-q2a-argand.png'

const EXAM_AI: SAExaminerStats = {
  marks: [7, 24, 69],
  average: 1.6,
  comment: (
    <>
      Many students could not accurately position <Katex tex="1+i\sqrt3" />, not realising it
      lay on the circle of radius 2. A number of students did not fully label both points.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [15, 26, 59],
  average: 1.5,
  comment: (
    <>
      Most students graphed the circle correctly, although some circles were poorly drawn. A
      common error was to draw a straight line with a positive gradient. A number of students
      terminated their line at <Katex tex="(2,0)" />. Few students seemed to realise that the
      required line was the perpendicular bisector of the line interval joining{' '}
      <Katex tex="(0,0)" /> and <Katex tex="\left(1,\sqrt3\right)" />.
    </>
  ),
}

const EXAM_AIII: SAExaminerStats = {
  marks: [38, 62],
  average: 0.6,
  comment: <>This question was generally well answered. The most common error was the gradient given as positive.</>,
}

const EXAM_AIV: SAExaminerStats = {
  marks: [31, 14, 12, 44],
  average: 1.7,
  comment: (
    <>
      Common errors were answers given in the wrong form and sign errors. Most students
      attempted to solve the equations of the line and circle simultaneously.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [44, 25, 10, 21],
  average: 1.1,
  comment: (
    <>
      Most students attempted to apply the quadratic formula or complete the square, but few
      managed to find the values of <Katex tex="z" /> in polar form. Dealing with the
      discriminant proved to be a problem for many. A number of students left answers in
      cartesian form, and some erroneously converted correct cartesian answers to{' '}
      <Katex tex="2\sqrt2\,\mathrm{cis}(\theta)" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [77, 23],
  average: 0.3,
  comment: (
    <>
      Many students did not attempt this question. Common errors were unsimplified
      expressions involving <Katex tex="z" />, and the answers <Katex tex="-\tfrac{5\pi}{12}" />{' '}
      and <Katex tex="\tfrac{5\pi}6" />.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="0+0i \to (0,0), \qquad 1+i\sqrt3 \to \left(1,\sqrt3\right)" />,
    reason: <>Real part across, imaginary part up.</>,
  },
  {
    working: <Katex display tex="\left|1+i\sqrt3\right| = \sqrt{1+3} = 2" />,
    reason: <>Worth computing before plotting: the point sits exactly 2 units from the origin, at <Katex tex="\left(1,1.73\right)" /> — the report says many students placed it badly.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\left|z-\left(1+i\sqrt3\right)\right| = |z-0|" />,
    reason: <>Written this way the meaning is plain: the points equidistant from <Katex tex="1+i\sqrt3" /> and from <Katex tex="0" />.</>,
  },
  {
    working: <Katex display tex="\text{the perpendicular bisector of } (0,0) \text{ and } \left(1,\sqrt3\right)" />,
    reason: <>A full line, not a ray — the report notes students stopping it at <Katex tex="(2,0)" />.</>,
  },
  {
    working: <Katex display tex="|z-2| = 1:\ \text{centre } (2,0), \text{ radius } 1" />,
    reason: <>The standard circle form.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-2">
        <img
          src={argandSrc}
          alt="An Argand diagram showing the origin and the point 1 + i√3, the perpendicular bisector of the segment joining them falling from upper left to lower right through (2, 0), and the circle of radius 1 centred at 2, with the two intersection points marked"
          className="w-full max-w-[400px]"
        />
      </div>
    ),
    reason: <>The line has <em>negative</em> gradient, because the segment it bisects rises steeply. The intersection points found in part a(iv) are marked in red.</>,
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{midpoint} = \left(\tfrac12,\tfrac{\sqrt3}2\right)" />,
    reason: <>The bisector passes through the midpoint of the interval.</>,
  },
  {
    working: <Katex display tex="m_{\text{interval}} = \frac{\sqrt3-0}{1-0} = \sqrt3 \implies m_{\text{line}} = -\frac{1}{\sqrt3}" />,
    reason: <>Perpendicular gradients multiply to <Katex tex="-1" />. Negative, as the report emphasises.</>,
  },
  {
    working: <Katex display tex="y-0 = -\tfrac1{\sqrt3}(x-2)" />,
    reason: <>Using the hint: the line passes through <Katex tex="z=2" />, i.e. the point <Katex tex="(2,0)" />, which saves substituting the midpoint.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -\frac{x}{\sqrt3}+\frac{2}{\sqrt3}}" />,
    reason: <>Check with the midpoint: <Katex tex="-\tfrac{1/2}{\sqrt3}+\tfrac2{\sqrt3}=\tfrac{3/2}{\sqrt3}=\tfrac{\sqrt3}2" /> ✓.</>,
  },
]

const ROWS_AIV: WorkingRow[] = [
  {
    working: <Katex display tex="(x-2)^2+y^2 = 1, \qquad y = \frac{2-x}{\sqrt3}" />,
    reason: <>The circle in cartesian form, and the line from part a(iii) ready to substitute.</>,
  },
  {
    working: <Katex display tex="(x-2)^2+\frac{(2-x)^2}{3} = 1" />,
    reason: <>Substituting. Note <Katex tex="(2-x)^2=(x-2)^2" />, so both terms share a factor.</>,
  },
  {
    working: <Katex display tex="(x-2)^2\left(1+\tfrac13\right) = 1 \implies (x-2)^2 = \tfrac34" />,
    reason: <>Factorising rather than expanding keeps this to one line.</>,
  },
  {
    working: <Katex display tex="x = 2\pm\frac{\sqrt3}{2}" />,
    reason: <>Since <Katex tex="\sqrt{3/4}=\tfrac{\sqrt3}2" />.</>,
  },
  {
    working: <Katex display tex="y = \frac{2-x}{\sqrt3} = \mp\frac{\sqrt3/2}{\sqrt3} = \mp\tfrac12" />,
    reason: <>The signs are opposite: the larger <Katex tex="x" /> goes with the negative <Katex tex="y" />, since the line falls.</>,
  },
  {
    working: <Katex display tex="\boxed{2-\frac{\sqrt3}{2}+\frac12 i \quad\text{and}\quad 2+\frac{\sqrt3}{2}-\frac12 i}" />,
    reason: <>In the required form <Katex tex="a+ib" />, not as coordinate pairs.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="z = \frac{4\cos(\theta)\pm\sqrt{16\cos^2(\theta)-16}}{2}" />,
    reason: <>The quadratic formula on <Katex tex="z^2-4\cos(\theta)z+4=0" />.</>,
  },
  {
    working: <Katex display tex="16\cos^2(\theta)-16 = -16\bigl(1-\cos^2(\theta)\bigr) = -16\sin^2(\theta)" />,
    reason: <>The discriminant is negative, which is where the report says students came unstuck. The Pythagorean identity turns it into a perfect square.</>,
  },
  {
    working: <Katex display tex="\sqrt{-16\sin^2(\theta)} = 4i\sin(\theta) \qquad \left(0<\theta<\tfrac\pi2 \implies \sin(\theta)>0\right)" />,
    reason: <>The restriction on <Katex tex="\theta" /> is what lets the modulus signs be dropped.</>,
  },
  {
    working: <Katex display tex="z = \frac{4\cos(\theta)\pm4i\sin(\theta)}{2} = 2\cos(\theta)\pm2i\sin(\theta)" />,
    reason: <>Dividing through by 2.</>,
  },
  {
    working: <Katex display tex="\boxed{z_1 = 2\,\mathrm{cis}(\theta), \qquad z_2 = 2\,\mathrm{cis}(-\theta)}" />,
    reason: <>Read straight off: <Katex tex="2\cos\theta+2i\sin\theta" /> is already <Katex tex="2\,\mathrm{cis}(\theta)" />. The modulus is 2, not <Katex tex="2\sqrt2" /> — check with <Katex tex="\sqrt{4\cos^2\theta+4\sin^2\theta}=2" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{z_1}{z_2} = \frac{2\,\mathrm{cis}(\theta)}{2\,\mathrm{cis}(-\theta)} = \mathrm{cis}\bigl(\theta-(-\theta)\bigr)" />,
    reason: <>Dividing in polar form subtracts the arguments — no need to expand anything.</>,
  },
  {
    working: <Katex display tex="\mathrm{Arg}\!\left(\frac{z_1}{z_2}\right) = 2\theta" />,
    reason: <>And since <Katex tex="0<\theta<\tfrac\pi2" />, <Katex tex="2\theta\in(0,\pi)" />, which is inside the principal range — so no adjustment by <Katex tex="2\pi" /> is needed.</>,
  },
  {
    working: <Katex display tex="2\theta = \tfrac{5\pi}6" />,
    reason: <>Setting it equal to the given value.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta = \tfrac{5\pi}{12}}" />,
    reason: <>In range, since <Katex tex="\tfrac{5\pi}{12}<\tfrac{6\pi}{12}=\tfrac\pi2" /> ✓. Answering <Katex tex="\tfrac{5\pi}6" /> forgets to halve.</>,
  },
]

export default function SpecialistQ2_2015Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (12 marks)</p>
        <p>
          Part a. is a geometry question dressed in complex-number notation: once you see{' '}
          <Katex tex="|z-a|=|z-b|" /> as "equidistant from two points", the sketch and the
          cartesian equation both follow from the perpendicular bisector.
        </p>
      </div>

      <PartCard
        letter="a.i"
        marks={2}
        statement={
          <>
            On the Argand diagram below, plot and label the points <Katex tex="0+0i" /> and{' '}
            <Katex tex="1+i\sqrt3" />.
          </>
        }
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        marks={2}
        statement={
          <>
            On the same Argand diagram above, sketch the line{' '}
            <Katex tex="\left|z-\left(1+i\sqrt3\right)\right|=|z|" /> and the circle{' '}
            <Katex tex="|z-2|=1" />.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="a.iii"
        marks={1}
        statement={
          <>
            Use the fact that the line <Katex tex="\left|z-\left(1+i\sqrt3\right)\right|=|z|" />{' '}
            passes through the point <Katex tex="z=2" />, or otherwise, to find the equation of
            this line in cartesian form.
          </>
        }
        examinerReport={EXAM_AIII}
      >
        <WorkingTable rows={ROWS_AIII} />
      </PartCard>

      <PartCard
        letter="a.iv"
        marks={3}
        statement={
          <>
            Find the points of intersection of the line and the circle, expressing your
            answers in the form <Katex tex="a+ib" />.
          </>
        }
        examinerReport={EXAM_AIV}
      >
        <WorkingTable rows={ROWS_AIV} />
      </PartCard>

      <PartCard
        letter="b.i"
        marks={3}
        statement={
          <>
            Consider the equation <Katex tex="z^2-4\cos(\theta)z+4=0" />, where{' '}
            <Katex tex="\theta" /> is a real constant and{' '}
            <Katex tex="0<\theta<\tfrac\pi2" />. Find the roots <Katex tex="z_1" /> and{' '}
            <Katex tex="z_2" /> of this equation, in terms of <Katex tex="\theta" />,
            expressing your answers in polar form.
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
            Find the value of <Katex tex="\theta" /> for which{' '}
            <Katex tex="\mathrm{Arg}\!\left(\tfrac{z_1}{z_2}\right)=\tfrac{5\pi}6" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>
    </div>
  )
}
