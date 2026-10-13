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
// Oct 2026 review (2014–2016 to current standard): Concise reasons tightened; report traps, checks
// and alternatives moved into rows' `more`. Interactives on the qualifying parts only: b.i (21%
// full marks), roots on |z| = 2 vs the 2√2 error; b.ii (23%), Arg(z₁/z₂) = 2α reaching 5π/6.
// a.i–a.iv do not qualify (44–69% full marks).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import blankSrc from './spec-2015e2-q2a-blank-argand.png'
import { Explore, lazyWidget } from '../Explore'

const RootsCircle = lazyWidget(() => import('../interactives/spec-2015e2-q2bi-roots-circle'))
const ArgQuotient = lazyWidget(() => import('../interactives/spec-2015e2-q2bii-arg-quotient'))

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
    reason: <>Its modulus 2 and argument <Katex tex="\tan^{-1}\!\left(\tfrac{\sqrt3}{1}\right)=\tfrac\pi3" /> put it on the grid&apos;s radius-2 circle, on the <Katex tex="\tfrac\pi3" /> radial line. Both points are plotted, labelled, in part a(ii)&apos;s diagram.</>,
    more: <>The report says many students could not position <Katex tex="1+i\sqrt3" /> accurately because they did not realise it lay on the circle of radius 2, and that a number did not fully label both points: write <Katex tex="0+0i" /> and <Katex tex="1+i\sqrt3" /> beside the dots.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\left|z-\left(1+i\sqrt3\right)\right| = |z-0|" />,
    reason: <>Write <Katex tex="|z|" /> as <Katex tex="|z-0|" />: then it reads &ldquo;the points equidistant from <Katex tex="1+i\sqrt3" /> and from <Katex tex="0" />&rdquo;.</>,
  },
  {
    working: <Katex display tex="\text{the perpendicular bisector of } (0,0) \text{ and } \left(1,\sqrt3\right)" />,
    reason: <>Points equidistant from two fixed points form the perpendicular bisector of the interval joining them. It is a full line, not a ray.</>,
    more: <>The report says few students seemed to realise the line was this perpendicular bisector, and that a number terminated their line at <Katex tex="(2,0)" />. Nothing in <Katex tex="\left|z-\left(1+i\sqrt3\right)\right|=|z|" /> stops at <Katex tex="2" />: every point on the bisector, however far out, is equidistant from the two points.</>,
  },
  {
    working: <Katex display tex="|z-2| = 1:\ \text{centre } (2,0), \text{ radius } 1" />,
    reason: <><Katex tex="|z-a|=r" /> is the circle of radius <Katex tex="r" /> centred at <Katex tex="a" />: here centre <Katex tex="2" />, radius 1.</>,
    more: <>The report says some circles were poorly drawn. Mark the four easy points first, <Katex tex="1" />, <Katex tex="3" />, <Katex tex="2+i" /> and <Katex tex="2-i" />, then draw the circle through them.</>,
  },
  {
    working: <ArgandOverlay />,
    reason: <>The line (orange) has <em>negative</em> gradient: it is perpendicular to an interval that rises. It passes through the midpoint <Katex tex="\left(\tfrac12,\tfrac{\sqrt3}2\right)" /> and through <Katex tex="2" />. Blue dots: the intersections found in part a(iv).</>,
    more: <>Drawn on VCAA&apos;s own grid: the two points from part a(i) and the line in orange, the circle in blue. The line passes through <Katex tex="2" /> because <Katex tex="\left|2-\left(1+i\sqrt3\right)\right|=\left|1-i\sqrt3\right|=2=|2|" />; with the midpoint, that gives two points to rule through. The report says a common error was a line with a positive gradient.</>,
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{midpoint} = \left(\tfrac12,\tfrac{\sqrt3}2\right)" />,
    reason: <>The bisector passes through the midpoint of the interval.</>,
  },
  {
    working: <Katex display tex="m_{\text{interval}} = \frac{\sqrt3-0}{1-0} = \sqrt3 \implies m_{\text{line}} = -\frac{1}{\sqrt3}" />,
    reason: <>Perpendicular gradients multiply to <Katex tex="-1" />, so the line&apos;s gradient is negative.</>,
    more: <>The report says the most common error was the gradient given as positive. A glance at the sketch in part a(ii) catches it: the line falls from left to right.</>,
  },
  {
    working: <Katex display tex="y-0 = -\tfrac1{\sqrt3}(x-2)" />,
    reason: <>Point–gradient form through <Katex tex="z=2" />, the point <Katex tex="(2,0)" />, as the question suggests.</>,
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
    reason: <>In the required form <Katex tex="a+ib" />, not as coordinate pairs. Check: each is 1 from <Katex tex="2" />, since <Katex tex="\tfrac34+\tfrac14=1" /> ✓.</>,
    more: <>The report says common errors were answers in the wrong form and sign errors. Pairing the signs is the usual slip: the line falls, so the point to the right of <Katex tex="2" /> is below the real axis. A quicker route: the line passes through <Katex tex="2" />, the circle&apos;s centre, so the two points are 1 unit either side of <Katex tex="2" /> along the line. A unit step along a line of gradient <Katex tex="-\tfrac1{\sqrt3}" /> is <Katex tex="\tfrac{\sqrt3}2-\tfrac12 i" />, giving <Katex tex="2\pm\left(\tfrac{\sqrt3}2-\tfrac12 i\right)" />, the same two points.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="z = \frac{4\cos(\alpha)\pm\sqrt{16\cos^2(\alpha)-16}}{2}" />,
    reason: <>The quadratic formula with <Katex tex="a=1" />, <Katex tex="b=-4\cos(\alpha)" />, <Katex tex="c=4" />.</>,
    more: <>Completing the square works too: <Katex tex="\left(z-2\cos(\alpha)\right)^2=4\cos^2(\alpha)-4=-4\sin^2(\alpha)" />, so <Katex tex="z-2\cos(\alpha)=\pm2i\sin(\alpha)" />, the same roots.</>,
  },
  {
    working: <Katex display tex="16\cos^2(\alpha)-16 = -16\sin^2(\alpha)" />,
    reason: <>Factor out <Katex tex="-16" />: <Katex tex="-16\left(1-\cos^2(\alpha)\right)" />, and <Katex tex="1-\cos^2(\alpha)=\sin^2(\alpha)" />. Negative, so the roots are complex.</>,
    more: <>The report says dealing with the discriminant proved to be a problem for many. A negative discriminant is no dead end in Specialist: its square root is just imaginary, and writing it as <Katex tex="-16\sin^2(\alpha)" /> makes that root exact. It is negative for every allowed <Katex tex="\alpha" />, because <Katex tex="0<\cos(\alpha)<1" /> there.</>,
  },
  {
    working: <Katex display tex="\sqrt{-16\sin^2(\alpha)} = 4i\sin(\alpha)" />,
    reason: <><Katex tex="\sqrt{-1}=i" /> and <Katex tex="\sqrt{16\sin^2(\alpha)}=|4\sin(\alpha)|" />, which is <Katex tex="4\sin(\alpha)" /> because <Katex tex="\sin(\alpha)>0" /> here.</>,
  },
  {
    working: <Katex display tex="z = \frac{4\cos(\alpha)\pm4i\sin(\alpha)}{2} = 2\cos(\alpha)\pm2i\sin(\alpha)" />,
    reason: <>Dividing through by 2.</>,
  },
  {
    working: <Katex display tex="\boxed{z_1 = 2\,\mathrm{cis}(\alpha), \qquad z_2 = 2\,\mathrm{cis}(-\alpha)}" />,
    reason: <><Katex tex="2\cos(\alpha)+2i\sin(\alpha)=2\left(\cos(\alpha)+i\sin(\alpha)\right)" />; the other root uses <Katex tex="\cos(-\alpha)=\cos(\alpha)" />, <Katex tex="\sin(-\alpha)=-\sin(\alpha)" />.</>,
    more: <>The modulus is 2, not <Katex tex="2\sqrt2" />: <Katex tex="\sqrt{(2\cos\alpha)^2+(2\sin\alpha)^2}=\sqrt{4}=2" />. The report says some students converted correct cartesian answers to <Katex tex="2\sqrt2\,\mathrm{cis}(\pm\alpha)" />; <Katex tex="2\sqrt2" /> is what you get from <Katex tex="\sqrt{2^2+2^2}" />, wrongly treating the 2s in front of <Katex tex="\cos" /> and <Katex tex="\sin" /> as the real and imaginary parts. The report also says a number left their answers in cartesian form: the question asks for polar form, so this last line is needed.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{z_1}{z_2} = \frac{2\,\mathrm{cis}(\alpha)}{2\,\mathrm{cis}(-\alpha)} = \mathrm{cis}\bigl(\alpha-(-\alpha)\bigr)" />,
    reason: <>Dividing in polar form subtracts the arguments — no need to expand anything.</>,
  },
  {
    working: <Katex display tex="\mathrm{Arg}\!\left(\frac{z_1}{z_2}\right) = 2\alpha" />,
    reason: <>Since <Katex tex="0<\alpha<\tfrac\pi2" />, <Katex tex="2\alpha" /> lies in <Katex tex="(0,\pi)" />, already a principal argument, so no <Katex tex="2\pi" /> adjustment is needed.</>,
    more: <>The modulus in the question is there because either root could be called <Katex tex="z_1" />: swapping them gives <Katex tex="-2\alpha" />, and <Katex tex="|\pm2\alpha|=2\alpha" /> either way. Had <Katex tex="2\alpha" /> exceeded <Katex tex="\pi" />, the principal argument would have been <Katex tex="2\alpha-2\pi" />.</>,
  },
  {
    working: <Katex display tex="|2\alpha| = 2\alpha = \tfrac{5\pi}6" />,
    reason: <>Setting it equal to the given value; <Katex tex="2\alpha>0" />, so the modulus signs drop.</>,
  },
  {
    working: <Katex display tex="\boxed{\alpha = \tfrac{5\pi}{12}}" />,
    reason: <>Halve, then check it is in range: <Katex tex="\tfrac{5\pi}{12}<\tfrac{6\pi}{12}=\tfrac\pi2" /> ✓.</>,
    more: <>The report lists unsimplified expressions involving <Katex tex="z" />, <Katex tex="-\tfrac{5\pi}{12}" /> and <Katex tex="\tfrac{5\pi}6" /> among the common errors. <Katex tex="\tfrac{5\pi}6" /> is <Katex tex="2\alpha" />, not <Katex tex="\alpha" /> (and is outside the allowed range anyway); <Katex tex="-\tfrac{5\pi}{12}" /> fails <Katex tex="0<\alpha<\tfrac\pi2" />. Working from the polar forms of part b(i) avoids any messy expression in <Katex tex="z" />.</>,
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
              <img loading="lazy" decoding="async"
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
        <Explore title={<>The roots always sit on the circle <Katex tex="|z|=2" />, at angles <Katex tex="\pm\alpha" /></>}>
          <RootsCircle />
        </Explore>
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
        <Explore title={<>Dividing subtracts arguments, so <Katex tex="z_1/z_2" /> sits at angle <Katex tex="2\alpha" /></>}>
          <ArgQuotient />
        </Explore>
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
      <img loading="lazy" decoding="async"
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
