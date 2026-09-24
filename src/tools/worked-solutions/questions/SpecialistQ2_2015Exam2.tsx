// 2015 Specialist Mathematics — Exam 2, Section 2 Question 2 (12 marks). An Argand diagram
// with a perpendicular-bisector line and a circle, their intersections, then a quadratic in
// z with a trigonometric coefficient. Question text transcribed from the original paper; VCAA's
// blank polar Argand grid is cropped from the paper, and the part a. answers are an SVG overlay
// on it. Answers checked with sympy and against the VCAA examination report. Solution is
// original.
// Audit, Sept 2026: part b. uses α on the paper (was θ), and b.ii asks for |Arg(z1/z2)| = 5π/6
// (the modulus was missing). The answer diagram used to be a matplotlib figure on a cartesian
// grid; VCAA printed a polar grid, so the answer now overlays the real one. Calibration measured
// from the crop (916 × 906): origin (404.5, 484), 1 unit = 121.67 px from the ±1, ±2, ±3 ticks.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import blankSrc from './spec-2015e2-q2a-blank-argand.png'

const EXAM_AI: SAExaminerStats = {
  marks: [7, 24, 69],
  average: 1.6,
  comment: (
    <>
      This question was answered quite well, but many students could not accurately position{' '}
      <Katex tex="1+i\sqrt3" />, not realising it lay on the circle of radius 2. A number of students did not fully label both points.
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
      This question was reasonably well answered. Common errors were answers given in the
      wrong form and sign errors. Most students
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
      cartesian form, and some erroneously converted correct cartesian form answers to{' '}
      <Katex tex="2\sqrt2\,\mathrm{cis}(\alpha)" /> and{' '}
      <Katex tex="2\sqrt2\,\mathrm{cis}(-\alpha)" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [77, 23],
  average: 0.3,
  comment: (
    <>
      Many students did not attempt this question. Common errors were unsimplified
      expressions involving <Katex tex="z" />, <Katex tex="-\tfrac{5\pi}{12}" /> and{' '}
      <Katex tex="\tfrac{5\pi}6" />.
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
    reason: <>Worth computing before plotting: the point sits exactly on the circle of radius 2, on the radial line at <Katex tex="60^\circ" /> (since <Katex tex="\tan^{-1}\sqrt3=\tfrac\pi3" />) — the report says many students placed it badly because they missed this. Both points are plotted in the diagram in part a(ii).</>,
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
    working: <ArgandOverlay />,
    reason: <>Drawn on VCAA's own grid: the two points from part a(i) and the line in orange, the circle in blue. The line has <em>negative</em> gradient, because the segment it bisects rises steeply; it passes through <Katex tex="2" /> and is a full line, not a ray. The intersection points found in part a(iv) are the blue dots.</>,
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
    reason: <>In the required form <Katex tex="a+ib" />, not as coordinate pairs. Check: each is exactly 1 from <Katex tex="2" />, since <Katex tex="\left(\tfrac{\sqrt3}2\right)^2+\left(\tfrac12\right)^2=1" /> ✓.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="z = \frac{4\cos(\alpha)\pm\sqrt{16\cos^2(\alpha)-16}}{2}" />,
    reason: <>The quadratic formula on <Katex tex="z^2-4\cos(\alpha)z+4=0" />.</>,
  },
  {
    working: <Katex display tex="16\cos^2(\alpha)-16 = -16\bigl(1-\cos^2(\alpha)\bigr) = -16\sin^2(\alpha)" />,
    reason: <>The discriminant is negative, which is where the report says students came unstuck. The Pythagorean identity turns it into a perfect square.</>,
  },
  {
    working: <Katex display tex="\sqrt{-16\sin^2(\alpha)} = 4i\sin(\alpha) \qquad \left(0<\alpha<\tfrac\pi2 \implies \sin(\alpha)>0\right)" />,
    reason: <>The restriction on <Katex tex="\alpha" /> is what lets the modulus signs be dropped.</>,
  },
  {
    working: <Katex display tex="z = \frac{4\cos(\alpha)\pm4i\sin(\alpha)}{2} = 2\cos(\alpha)\pm2i\sin(\alpha)" />,
    reason: <>Dividing through by 2.</>,
  },
  {
    working: <Katex display tex="\boxed{z_1 = 2\,\mathrm{cis}(\alpha), \qquad z_2 = 2\,\mathrm{cis}(-\alpha)}" />,
    reason: <>Read straight off: <Katex tex="2\cos\alpha+2i\sin\alpha" /> is already <Katex tex="2\,\mathrm{cis}(\alpha)" />. The modulus is 2, not <Katex tex="2\sqrt2" /> — check with <Katex tex="\sqrt{4\cos^2\alpha+4\sin^2\alpha}=2" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{z_1}{z_2} = \frac{2\,\mathrm{cis}(\alpha)}{2\,\mathrm{cis}(-\alpha)} = \mathrm{cis}\bigl(\alpha-(-\alpha)\bigr)" />,
    reason: <>Dividing in polar form subtracts the arguments — no need to expand anything.</>,
  },
  {
    working: <Katex display tex="\mathrm{Arg}\!\left(\frac{z_1}{z_2}\right) = 2\alpha \quad \text{(or } -2\alpha \text{ if the roots are labelled the other way)}" />,
    reason: <>The modulus in the question is there because either root could be called <Katex tex="z_1" />; it makes the answer the same either way. And since <Katex tex="0<\alpha<\tfrac\pi2" />, <Katex tex="2\alpha\in(0,\pi)" />, which is inside the principal range — so no adjustment by <Katex tex="2\pi" /> is needed.</>,
  },
  {
    working: <Katex display tex="|2\alpha| = 2\alpha = \tfrac{5\pi}6" />,
    reason: <>Setting it equal to the given value.</>,
  },
  {
    working: <Katex display tex="\boxed{\alpha = \tfrac{5\pi}{12}}" />,
    reason: <>In range, since <Katex tex="\tfrac{5\pi}{12}<\tfrac{6\pi}{12}=\tfrac\pi2" /> ✓. Answering <Katex tex="\tfrac{5\pi}6" /> forgets to halve, and <Katex tex="-\tfrac{5\pi}{12}" /> is outside <Katex tex="0<\alpha<\tfrac\pi2" /> — both are errors the report lists.</>,
  },
]

export default function SpecialistQ2_2015Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (12 marks)</p>
      </div>

      <PartCard
        letter="a.i"
        topic="Argand Diagram"
        marks={2}
        statement={
          <>
            <p className="mb-2">
              On the Argand diagram below, plot and label the points <Katex tex="0+0i" /> and{' '}
              <Katex tex="1+i\sqrt3" />.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                src={blankSrc}
                alt="A blank polar Argand grid: circles of radius 1, 2 and 3 about the origin, radial lines every 15°, and axes marked from −3 to 3 — from the original 2015 VCAA exam paper"
                className="w-full max-w-[300px]"
              />
            </div>
          </>
        }
        examinerReport={EXAM_AI}
      >
        <Background>
          <p>
            Part a. is a geometry question dressed in complex-number notation: once you see{' '}
            <Katex tex="|z-a|=|z-b|" /> as "equidistant from two points", the sketch and the
            cartesian equation both follow from the perpendicular bisector.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Line & Circle Loci"
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
        topic="Cartesian Equation"
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
        topic="Intersections"
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
        topic="Complex Quadratic"
        marks={3}
        statement={
          <>
            Consider the equation <Katex tex="z^2-4\cos(\alpha)z+4=0" />, where{' '}
            <Katex tex="\alpha" /> is a real constant and{' '}
            <Katex tex="0<\alpha<\tfrac\pi2" />. Find the roots <Katex tex="z_1" /> and{' '}
            <Katex tex="z_2" /> of this equation, in terms of <Katex tex="\alpha" />,
            expressing your answers in polar form.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Argument"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="\alpha" /> for which{' '}
            <Katex tex="\left|\mathrm{Arg}\!\left(\tfrac{z_1}{z_2}\right)\right|=\tfrac{5\pi}6" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>
    </div>
  )
}

// Part a(ii)'s answer drawn over VCAA's own blank polar grid (guide §7: annotate the crop,
// never redraw it). Pixel calibration measured from spec-2015e2-q2a-blank-argand.png
// (916 × 906): origin (404.5, 484); the ±1, ±2, ±3 ticks are 121.67 px apart on both axes.
function ArgandOverlay() {
  const orange = '#f97316'
  const blue = '#0ea5e9'
  return (
    <div className="relative w-full max-w-[360px] bg-white rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <img
        src={blankSrc}
        alt="VCAA's polar Argand grid with this site's answer overlaid: the points 0 and 1 + i√3, the perpendicular bisector of the segment joining them (a falling line through 2), the circle of radius 1 centred at 2, and the two points where they meet"
        className="w-full block"
      />
      <svg viewBox="0 0 916 906" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <line x1={27.3} y1={125.7} x2={824.3} y2={585.9} stroke={orange} strokeWidth={5} />
        <circle cx={647.8} cy={484} r={121.67} fill="none" stroke={blue} strokeWidth={5} />
        <circle cx={404.5} cy={484} r={9} fill={orange} />
        <circle cx={526.2} cy={273.3} r={9} fill={orange} />
        <circle cx={542.5} cy={423.2} r={9} fill={blue} />
        <circle cx={753.2} cy={544.8} r={9} fill={blue} />
        <text x={545} y={262} fontSize={30} fill={orange} fontStyle="italic">1 + i√3</text>
        <text x={330} y={462} fontSize={30} fill={orange} textAnchor="end" fontStyle="italic">0 + 0i</text>
        <text x={660} y={660} fontSize={30} fill={blue} fontStyle="italic">|z − 2| = 1</text>
      </svg>
    </div>
  )
}
