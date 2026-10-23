// 2026 Specialist NHT — Exam 2, Section B Question 2 (9 marks). The NHT report gives sample
// answers only, with no statistics, plus one note on a. A circle centre 3 + 4i, radius 2; v = 4 + iy
// on it (y > 4) and w its reflection in Im(z) = 4: sketch, Im(v), the area of the major segment cut
// off by the chord vw, the tangents at v and w meeting at P with x-coordinate 7, and the two circles
// centred on Im(z) = 4 through P that touch the given circle. Question text transcribed from the
// original paper; the blank Argand grid in a. is cropped from the original VCAA exam PDF, and the
// a. answer is this site's own matplotlib drawing on VCAA's exact grid (0 to 8 on both axes,
// gridlines every 1). The figures in the d. and e. Backgrounds are this site's own explanatory
// graphs, not printed by VCAA. Answers checked with sympy and against the VCAA report's sample
// answers: b. 4 + √3; c. 8π/3 + √3; d. 7 (VCAA by cos(π/3) = 2/d, or by the tangent equations,
// which is the route the working uses); e. |z − (6 + 4i)| = 1 and |z − (4 + 4i)| = 3.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import argandSrc from './spec-2026nhte2-q2a-argand.png'
import sketchSrc from './spec-2026nhte2-q2a-sketch.png'
import tangentsSrc from './spec-2026nhte2-q2d-tangents.png'
import circlesSrc from './spec-2026nhte2-q2e-circles.png'

const REPORT_A: SAExaminerStats = {
  comment: (
    <>
      Many did not draw and label the line <Katex tex="\operatorname{Im}(z)=4" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="|z-(3+4i)| = 2" />,
    reason: <>A circle centred at <Katex tex="z_0=3+4i" /> (the point <Katex tex="(3,4)" />) with radius 2: it reaches from 1 to 5 across and from 2 to 6 up.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} v&:\ \operatorname{Re}(v)=4,\ \operatorname{Im}(v)>4 \\ w&:\ \operatorname{Re}(w)=4,\ \operatorname{Im}(w)<4 \end{aligned}" />,
    reason: <><Katex tex="v" /> is where the vertical line <Katex tex="\operatorname{Re}(z)=4" /> meets the upper half of the circle. Reflecting in the horizontal line <Katex tex="\operatorname{Im}(z)=4" /> keeps the real part and puts <Katex tex="w" /> the same distance below the line, also on the circle.</>,
    more: <>The exact position, <Katex tex="v=4+(4+\sqrt3)i\approx4+5.73i" />, comes in part b.; for the sketch, plotting it on the circle at <Katex tex="\operatorname{Re}(z)=4" /> is enough.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          loading="lazy"
          decoding="async"
          src={sketchSrc}
          alt="Our sketch on VCAA's Argand grid: the circle centre z0 = 3 + 4i radius 2, the horizontal line Im(z) = 4 through its centre, v on the circle above the line at Re(z) = 4 and w directly below it"
          className="w-full max-w-[380px]"
        />
      </div>
    ),
    reason: <>The circle, the line <Katex tex="\operatorname{Im}(z)=4" /> drawn and labelled, and the three points labelled. The report notes many did not draw and label the line.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="(x-3)^2+(y-4)^2 = 2^2" />,
    reason: <>The Cartesian equation of the circle: distance from <Katex tex="(3,4)" /> equals 2.</>,
  },
  {
    working: <Katex display tex="x=4:\quad 1+(y-4)^2 = 4 \implies (y-4)^2 = 3" />,
    reason: <><Katex tex="v=4+iy" /> has real part 4, so substitute <Katex tex="x=4" />.</>,
  },
  {
    working: <Katex display tex="y = 4\pm\sqrt3" />,
    reason: <>Take the positive root, since <Katex tex="y>4" />. The other, <Katex tex="4-\sqrt3" />, is the imaginary part of <Katex tex="w" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\operatorname{Im}(v) = 4+\sqrt3}" />,
    reason: <>The imaginary part is a real number: <Katex tex="4+\sqrt3" />, not <Katex tex="(4+\sqrt3)i" />.</>,
    more: <>Check: <Katex tex="4+\sqrt3\approx5.73" />, between 4 and the top of the circle at 6, matching the sketch.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="v-z_0 = 1+\sqrt3\,i,\qquad w-z_0 = 1-\sqrt3\,i" />,
    reason: <>The radii to <Katex tex="v" /> and <Katex tex="w" />, from part b.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \operatorname{Arg}(v-z_0) &= \frac{\pi}{3} \\ \operatorname{Arg}(w-z_0) &= -\frac{\pi}{3} \end{aligned}" />,
    reason: <><Katex tex="\tan^{-1}\!\left(\tfrac{\sqrt3}{1}\right)=\tfrac\pi3" />; both radii point right of the centre, one up and one down.</>,
  },
  {
    working: <Katex display tex="\theta = 2\pi - \frac{2\pi}{3} = \frac{4\pi}{3}" />,
    reason: <>The chord <Katex tex="vw" /> subtends <Katex tex="\tfrac{2\pi}{3}" /> at the centre on the minor side. The <b>major</b> segment is on the other side, so its arc subtends the rest of the full turn.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} A &= \frac12 r^2\left(\theta-\sin\theta\right) \\ &= \frac12\times2^2\left(\frac{4\pi}{3}-\sin\frac{4\pi}{3}\right) \end{aligned}" />,
    reason: <>Segment area = sector area <Katex tex="\tfrac12r^2\theta" /> minus the triangle <Katex tex="\tfrac12r^2\sin\theta" />. For <Katex tex="\theta>\pi" /> the sine is negative, so the triangle is effectively <em>added</em>, which is right: the major segment contains the triangle <Katex tex="z_0vw" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} A = 2\left(\frac{4\pi}{3}+\frac{\sqrt3}{2}\right) \\ \boxed{A = \frac{8\pi}{3}+\sqrt3} \end{gathered}" />,
    reason: <><Katex tex="\sin\tfrac{4\pi}{3}=-\tfrac{\sqrt3}{2}" />.</>,
    more: <>Check: <Katex tex="\approx10.11" />, more than half the circle&rsquo;s area (<Katex tex="2\pi\approx6.28" />) and less than all of it (<Katex tex="4\pi\approx12.57" />). Or: circle minus minor segment, <Katex tex="4\pi-\left(\tfrac{4\pi}{3}-\sqrt3\right)" />, gives the same.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered} m_{z_0v} = \frac{\sqrt3}{1} = \sqrt3 \\ \implies m_{\text{tangent}} = -\frac{1}{\sqrt3} \end{gathered}" />,
    reason: <>A tangent to a circle is perpendicular to the radius at the point of contact, so its gradient is the negative reciprocal of the radius&rsquo;s.</>,
  },
  {
    working: <Katex display tex="y-\left(4+\sqrt3\right) = -\frac{1}{\sqrt3}(x-4)" />,
    reason: <>The tangent at <Katex tex="v=(4,\ 4+\sqrt3)" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} y=4:\quad -\sqrt3 = -\frac{1}{\sqrt3}(x-4) \\ \implies x-4 = 3 \end{gathered}" />,
    reason: <><Katex tex="P" /> is on the line <Katex tex="\operatorname{Im}(z)=4" />, so set <Katex tex="y=4" />. By symmetry the tangent at <Katex tex="w" /> (gradient <Katex tex="+\tfrac1{\sqrt3}" />) meets that line at the same point.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 7}" />,
    reason: <>As required.</>,
    more: <>VCAA&rsquo;s first route is trigonometry in the right-angled triangle <Katex tex="z_0vP" />: the angle at <Katex tex="z_0" /> is <Katex tex="\tfrac\pi3" /> and the side next to it is the radius 2, so <Katex tex="\cos\tfrac\pi3=\tfrac{2}{d}" /> gives <Katex tex="d=|P-z_0|=4" /> and <Katex tex="x=3+4=7" />. The report also gives both tangent equations, <Katex tex="y=-\tfrac{1}{\sqrt3}x+4+\sqrt3+\tfrac{4}{\sqrt3}" /> and <Katex tex="y=\tfrac{1}{\sqrt3}x+4-\sqrt3-\tfrac{4}{\sqrt3}" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered} \text{contact point on } \operatorname{Im}(z)=4 \\ \implies 5+4i \ \text{or} \ 1+4i \end{gathered}" />,
    reason: <>When two circles touch, the point of contact lies on the line through their centres. Both centres are on <Katex tex="\operatorname{Im}(z)=4" />, so the contact point is where the given circle meets that line: 2 either side of <Katex tex="3+4i" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} 5+4i \text{ and } 7+4i&:\ z_c = 6+4i,\ R=1 \\ 1+4i \text{ and } 7+4i&:\ z_c = 4+4i,\ R=3 \end{aligned}" />,
    reason: <>Each circle passes through <Katex tex="P" /> and its contact point, both on the line through its centre, so those two points are the ends of a diameter: the centre is their midpoint and the radius half the gap.</>,
  },
  {
    working: <Katex display tex="|6-3| = 3 = 2+1, \qquad |4-3| = 1 = 3-2" />,
    reason: <>Check the tangency: the small circle touches from outside (centres a sum of radii apart); the large one encloses the given circle and touches from inside (a difference of radii apart).</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered} |z-(6+4i)| = 1 \\ |z-(4+4i)| = 3 \end{gathered}}" />,
    reason: <>In the form <Katex tex="|z-z_c|=R" />, as asked.</>,
    more: <>Algebraically: a centre <Katex tex="h+4i" /> through <Katex tex="P" /> has <Katex tex="R=|7-h|" />, and tangency needs <Katex tex="|h-3|=2+R" /> or <Katex tex="|h-3|=|R-2|" />. Working through the cases gives only <Katex tex="h=6" /> and <Katex tex="h=4" />.</>,
  },
]

export default function SpecialistQ2_2026NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (9 marks)</p>
        <p>
          A circle in the complex plane has a centre at <Katex tex="z_0=3+4i" /> and a radius of 2.
          <br />
          For a given value of <Katex tex="y" />, where <Katex tex="y>4" />, the point{' '}
          <Katex tex="v=4+iy" /> lies on this circle.
          <br />
          Point <Katex tex="w" /> is the reflection of point <Katex tex="v" /> in the line{' '}
          <Katex tex="\operatorname{Im}(z)=4" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Although it is set in the complex plane, this is coordinate geometry of a circle: think
              of <Katex tex="z=x+iy" /> as the point <Katex tex="(x,y)" />, the circle as{' '}
              <Katex tex="(x-3)^2+(y-4)^2=4" />, and <Katex tex="\operatorname{Im}(z)=4" /> as the
              horizontal line <Katex tex="y=4" /> through the centre. Everything is symmetric about
              that line, which is why <Katex tex="w" />, the tangents and the circles in part e. all
              mirror one another.
            </p>
            <p>
              Two circle facts do the work: a tangent is perpendicular to the radius at the point of
              contact (part d.), and two circles that touch do so on the line through their centres
              (part e.).
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Argand Diagram"
        marks={2}
        statement={
          <div className="flex flex-col gap-2">
            <p>
              On the Argand diagram below, sketch the circle and draw the line{' '}
              <Katex tex="\operatorname{Im}(z)=4" />.
              <br />
              Plot and label the points <Katex tex="z_0" />, <Katex tex="v" /> and <Katex tex="w" />.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mt-1">
              <img
                loading="lazy"
                decoding="async"
                src={argandSrc}
                alt="VCAA's blank Argand diagram: Re(z) and Im(z) from 0 to 8, gridlines every 1"
                className="w-full max-w-[320px]"
              />
            </div>
          </div>
        }
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Circle Locus"
        marks={2}
        statement={<>Find <Katex tex="\operatorname{Im}(v)" />.</>}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Segment Area"
        marks={2}
        statement={
          <>
            Find the area of the <b>major</b> segment bounded by an arc of the circle and the chord
            connecting point <Katex tex="v" /> to point <Katex tex="w" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Tangent to Circle"
        marks={1}
        statement={
          <>
            The tangents to the circle at points <Katex tex="v" /> and <Katex tex="w" /> intersect at
            a point, <Katex tex="P" />, on the line <Katex tex="\operatorname{Im}(z)=4" />.
            <br />
            Show that the <Katex tex="x" />-coordinate of <Katex tex="P" /> is 7.
          </>
        }
      >
        <Background title="The Picture">
          <p>
            Each tangent meets its radius at a right angle, so <Katex tex="z_0vP" /> is a right-angled
            triangle with the radius 2 next to the <Katex tex="\tfrac\pi3" /> angle at the centre.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              loading="lazy"
              decoding="async"
              src={tangentsSrc}
              alt="Our explanatory figure: the circle with the radii from z0 to v and w at angles of π/3 above and below Im(z) = 4, and the tangents at v and w meeting at P = 7 + 4i, with the right angle marked at v"
              className="w-full max-w-[340px]"
            />
          </div>
        </Background>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Tangent Circles"
        marks={2}
        statement={
          <>
            There are two circles that pass through point <Katex tex="P" /> that are tangent to the
            circle <Katex tex="|z-(3+4i)|=2" /> and have their centres on the line{' '}
            <Katex tex="\operatorname{Im}(z)=4" />.
            <br />
            Find the equation of each circle in the form <Katex tex="|z-z_\mathrm{c}|=R" />, where{' '}
            <Katex tex="z_\mathrm{c}" /> represents the centre of each respective circle.
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
        <Background title="The Two Circles">
          <p>
            The small circle touches the given one from outside at <Katex tex="5+4i" />; the large
            one wraps around it and touches from inside at <Katex tex="1+4i" />. Both pass through{' '}
            <Katex tex="P" />.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              loading="lazy"
              decoding="async"
              src={circlesSrc}
              alt="Our explanatory figure: the given circle centre z0 = 3 + 4i radius 2, the circle centre 6 + 4i radius 1 touching it at 5 + 4i, and the circle centre 4 + 4i radius 3 enclosing it and touching at 1 + 4i; both orange circles pass through P = 7 + 4i"
              className="w-full max-w-[340px]"
            />
          </div>
        </Background>
      </PartCard>
    </div>
  )
}
