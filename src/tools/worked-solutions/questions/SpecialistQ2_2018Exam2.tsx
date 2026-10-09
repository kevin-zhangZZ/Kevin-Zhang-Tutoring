// 2018 Specialist Mathematics — Exam 2, Section B, Question 2 (10 marks). Two descriptions
// of the same circle in the Argand plane, a perpendicular-bisector line, and the area of the
// minor segment they cut off. Question text transcribed from the original paper. Part c's stem
// shows VCAA's blank Argand diagram — a polar grid of circles of radius 1 to 5 and rays every
// 30° — cropped from page 14 of the paper (spec-2018e2-q2-blank-argand.png). The drawn circle
// and line are this site's own answer-sketch (matplotlib) on that same grid, and live in the
// solution rather than the stem (guide §7).
//
// Interactive widgets: part b (drag z: the distance from 1 + 2i is 2 exactly where the ratio
// |z + 1| : |z − i| is √2, because |z + 1|² − 2|z − i|² = 4 − |z − (1 + 2i)|² for every z),
// part d (drag z: equal distances from 1 and 3 only on Re(z) = 2; y cancels), part e (the
// segment built as sector − triangle, with the 1 : √3 : 2 triangle giving the half-angle π/3,
// and a toggle showing the too-thin sector from the common θ = π/3 slip).
//
// Note: pdftotext renders the locus as |z+1| = 2|z-i|, dropping a square root. The paper
// actually says |z+1| = √2|z-i|, which is what makes the two circles coincide — the text
// extraction was checked against a render of the page. Answers verified in sympy (and the
// segment area also by integration); they agree with the report and itute.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'
import argandSrc from './spec-2018e2-q2-argand.png'
import blankArgandSrc from './spec-2018e2-q2-blank-argand.png'

const TwoRulesWidget = lazyWidget(() => import('../interactives/spec-2018e2-q2b-two-rules'))
const BisectorWidget = lazyWidget(() => import('../interactives/spec-2018e2-q2d-bisector'))
const SegmentWidget = lazyWidget(() => import('../interactives/spec-2018e2-q2e-segment'))

const EXAM_A: SAExaminerStats = {
  marks: [30, 71],
  average: 0.7,
  comment: (
    <>
      Some students gave only one of the two required parts of the answer. An incorrect
      radius of <Katex tex="\sqrt2" /> was occasionally given. Students were not asked to find
      the expression of the circle at this point but a number did so.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [16, 31, 54],
  average: 1.4,
  comment: (
    <>
      Most students were able to correctly find an expression that did not involve{' '}
      <Katex tex="i" />. In a 'show that' question such as this, students are expected to
      explicitly show that the given relation leads to the required conclusion. The working
      shown above is an example of a suitable response.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [23, 19, 58],
  average: 1.4,
  comment: (
    <>
      The circle was generally drawn correctly. Students did not always supply the
      coordinates of the <Katex tex="y" />-intercepts as required by the question. Some
      coordinates were incorrectly given as imaginary numbers.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [27, 18, 55],
  average: 1.3,
  comment: (
    <>
      While the vertical line was usually sketched correctly, coordinates of the points of
      intersection with the circle were not always shown. Coordinates were sometimes
      presented as decimal approximations.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [50, 15, 4, 31],
  average: 1.2,
  comment: (
    <>
      Students who used standard formulas to find the segment area were generally more
      successful than those who took a definite integral approach. Many students did not
      start the problem with a correct sector angle.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="|z-(1+2i)| = 2" />,
    reason: <>Read <Katex tex="|z-z_0|" /> as &ldquo;the distance from <Katex tex="z" /> to <Katex tex="z_0" />&rdquo;. So this says every point is exactly <Katex tex="2" /> units from <Katex tex="1+2i" />: a circle, centre <Katex tex="1+2i" />, radius <Katex tex="2" />. No algebra is needed.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Centre } (1,\ 2), \qquad \text{radius } 2}" />,
    reason: <>Both parts are asked for; the report notes students giving only one. Write the centre as the point <Katex tex="(1,2)" /> as the question asks, not as <Katex tex="1+2i" />. The radius is <Katex tex="2" />, not <Katex tex="\sqrt2" />: the modulus is already a distance, so nothing here is squared.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="z = x+yi: \quad |(x+1)+yi| = \sqrt2\,|x+(y-1)i|" />,
    reason: <>The standard way to turn a modulus rule into cartesian form: put <Katex tex="z=x+yi" /> and group the real and imaginary parts inside each modulus, ready for <Katex tex="|a+bi|=\sqrt{a^2+b^2}" />.</>,
  },
  {
    working: <Katex display tex="(x+1)^2+y^2 = 2\left(x^2+(y-1)^2\right)" />,
    reason: <>Each modulus is a square root, so squaring both sides clears them all at once (safe, since both sides are non-negative). The <Katex tex="\sqrt2" /> gets squared too, becoming <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="x^2+2x+1+y^2 = 2x^2+2y^2-4y+2" />,
    reason: <>Expanding. The <Katex tex="2" /> multiplies the whole bracket.</>,
  },
  {
    working: <Katex display tex="0 = x^2+y^2-2x-4y+1" />,
    reason: <>Collecting everything on one side. No <Katex tex="i" /> remains, and <Katex tex="x^2" /> and <Katex tex="y^2" /> have equal coefficients with no <Katex tex="xy" /> term: the signature of a circle. Completing the square will reveal its centre and radius.</>,
  },
  {
    working: <Katex display tex="(x-1)^2-1+(y-2)^2-4+1 = 0" />,
    reason: <>Completing the square in both variables: half of <Katex tex="-2" /> is <Katex tex="-1" />, half of <Katex tex="-4" /> is <Katex tex="-2" />, and subtract the <Katex tex="1" /> and <Katex tex="4" /> just added so nothing changes.</>,
  },
  {
    working: <Katex display tex="\boxed{(x-1)^2+(y-2)^2 = 4}" />,
    reason: <>Centre <Katex tex="(1,2)" />, radius <Katex tex="\sqrt4=2" />, the same as part a. As required. On a &ldquo;show that&rdquo;, write this final comparison down; the report says students are expected to show explicitly that the relation leads to the conclusion.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x=0: \quad 1+(y-2)^2 = 4 \implies (y-2)^2 = 3" />,
    reason: <>This is part a&apos;s circle: centre <Katex tex="(1,2)" />, radius <Katex tex="2" />, so it just touches the real axis at <Katex tex="(1,0)" /> and runs from <Katex tex="x=-1" /> to <Katex tex="x=3" />. The vertical axis is <Katex tex="\operatorname{Re}(z)=0" />, so set <Katex tex="x=0" /> in part b&apos;s cartesian equation.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(0,\ 2-\sqrt3\right) \ \text{ and } \ \left(0,\ 2+\sqrt3\right)}" />,
    reason: <>Label them as coordinates, in exact form. (<Katex tex="\approx0.27" /> and <Katex tex="\approx3.73" />, which you can check against the grid.) The finished sketch, with part d&apos;s line added, is at the end of part d.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}|z-1| = |z-3| \\ \text{equidistant from } 1 \text{ and } 3\end{gathered}" />,
    reason: <>Read each modulus as a distance: <Katex tex="|z-1|" /> is the distance from <Katex tex="z" /> to <Katex tex="1" />. &ldquo;Equally far from two points&rdquo; is always the perpendicular bisector of the segment joining them, so no algebra is needed.</>,
  },
  {
    working: <Katex display tex="\text{Perpendicular bisector: } x = 2" />,
    reason: <>The midpoint of <Katex tex="(1,0)" /> and <Katex tex="(3,0)" /> is <Katex tex="(2,0)" />, and the segment is horizontal, so the bisector is the vertical line through it. Algebra agrees: <Katex tex="(x-1)^2+y^2=(x-3)^2+y^2" /> simplifies to <Katex tex="4x=8" />.</>,
  },
  {
    working: <Katex display tex="x=2: \quad 1+(y-2)^2 = 4 \implies y = 2\pm\sqrt3" />,
    reason: <>Substituting into the circle. The same numbers appear as in part c, because <Katex tex="x=0" /> and <Katex tex="x=2" /> are both <Katex tex="1" /> unit from the centre&apos;s <Katex tex="x=1" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={argandSrc} alt="VCAA's polar-grid Argand diagram with the circle of centre (1, 2) and radius 2, the vertical line Re(z) = 2, the two imaginary-axis intercepts and the two intersection points, all labelled" className="w-full max-w-[400px]" />
      </div>
    ),
    reason: <>Both parts c and d on one diagram, with all four points labelled in exact form. The report notes coordinates were sometimes given as decimal approximations.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(2,\ 2-\sqrt3\right) \ \text{ and } \ \left(2,\ 2+\sqrt3\right)}" />,
    reason: <>The intersection points, which part e needs.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="d = 2-1 = 1" />,
    reason: <>Start from part d&apos;s diagram. A segment is fixed by how far its chord is from the centre, so find the perpendicular distance from the centre <Katex tex="(1,2)" /> to the line <Katex tex="x=2" />. The line is vertical, so it is just a difference of <Katex tex="x" />-values.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\frac{\theta}{2}\right) = \frac{d}{r} = \frac12 \implies \frac{\theta}{2} = \frac{\pi}{3}" />,
    reason: <>Join the centre to both ends of the chord and drop the perpendicular. It cuts the isosceles triangle into two mirror halves, each right-angled with hypotenuse <Katex tex="2" /> (a radius) and adjacent side <Katex tex="1" />, so it gives <em>half</em> the angle at the centre. (Sides <Katex tex="1,\sqrt3,2" />: the exact-value triangle. The ends <Katex tex="(2,2\pm\sqrt3)" /> are <Katex tex="1" /> across and <Katex tex="\sqrt3" /> up or down from the centre.)</>,
  },
  {
    working: <Katex display tex="\theta = \frac{2\pi}{3}" />,
    reason: <>Double it to get the angle the chord subtends at the centre. This is the step the report flags: many students did not start with a correct sector angle.</>,
  },
  {
    working: <Katex display tex="\text{Segment} = \frac{r^2}{2}\bigl(\theta-\sin\theta\bigr)" />,
    reason: <>Segment <Katex tex="=" /> sector <Katex tex="-" /> triangle <Katex tex="=\tfrac12r^2\theta-\tfrac12r^2\sin\theta" />. The report says students who used standard formulas were generally more successful than those who took a definite integral approach. (If you do integrate, the strips are vertical between the two arcs: <Katex tex="\int_2^3 2\sqrt{4-(x-1)^2}\,dx" />, and <Cas fn="nInt">nInt</Cas> gives <Katex tex="2.457" />, the same answer.)</>,
  },
  {
    working: <Katex display tex="= \frac{4}{2}\left(\frac{2\pi}{3}-\frac{\sqrt3}{2}\right) = \frac{4\pi}{3}-\sqrt3" />,
    reason: <><Katex tex="r=2" /> and <Katex tex="\sin\!\left(\tfrac{2\pi}{3}\right)=\tfrac{\sqrt3}{2}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \frac{4\pi}{3}-\sqrt3}" />,
    reason: <>(<Katex tex="\approx2.46" /> square units.) Sensible check: the whole circle has area <Katex tex="4\pi\approx12.57" />, and the minor segment is the sliver to the right of <Katex tex="x=2" />, about a fifth of it, which matches the diagram. Only <Katex tex="31\%" /> scored full marks.</>,
  },
]

export default function SpecialistQ2_2018Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (10 marks)</p>
      </div>

      <PartCard letter="a" topic="Circle Locus" marks={1} statement={<>State the centre in the form <Katex tex="(x,y)" />, where <Katex tex="x,y\in R" />, and state the radius of the circle given by <Katex tex="|z-(1+2i)|=2" />, where <Katex tex="z\in C" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="The 2 on the right is r², so the radius is √2"
          source="Examiner's report"
          working={<Katex display tex="r^2 = 2 \implies r = \sqrt2" />}
        >
          That&apos;s the cartesian form, <Katex tex="(x-1)^2+(y-2)^2=r^2" />, where the right-hand side
          is squared. In <Katex tex="|z-(1+2i)|=2" /> nothing is squared: the modulus is itself a
          distance, so the <Katex tex="2" /> is the radius. Quick check: <Katex tex="3+2i" /> satisfies
          the equation, and it is <Katex tex="2" /> units from <Katex tex="1+2i" />, not <Katex tex="\sqrt2" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="Cartesian Form" marks={2} statement={<>By expressing the circle given by <Katex tex="|z+1|=\sqrt2\,|z-i|" /> in cartesian form, show that this circle has the same centre and radius as the circle given by <Katex tex="|z-(1+2i)|=2" />.</>} examinerReport={EXAM_B}>
        <Background>
          <p>
            Two quite different-looking descriptions turn out to be the same circle. The
            first is &ldquo;distance from one point is constant&rdquo;; the second is
            &ldquo;distance from <Katex tex="-1" /> is <Katex tex="\sqrt2" /> times the distance
            from <Katex tex="i" />&rdquo;, which is an <em>Apollonius circle</em>: a fixed ratio of
            distances gives a circle whenever the ratio is not <Katex tex="1" />. (Ratio{' '}
            <Katex tex="1" /> gives a straight line, as in part d.)
          </p>
          <p>
            The mechanical route is always the same: put <Katex tex="z=x+yi" />, square both
            sides to clear the moduli, and complete the square.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Why the ratio rule and the distance rule draw the same circle">
          <TwoRulesWidget />
        </Explore>
        <WrongMethod
          title="Once there's no i left, I've shown it"
          source="Examiner's report"
          working={<Katex display tex="x^2+y^2-2x-4y+1=0 \;\therefore\; \text{same circle}" />}
        >
          The report says most students reached an expression without <Katex tex="i" />, yet only{' '}
          <Katex tex="54\%" /> scored both marks. This equation doesn&apos;t display a centre or a
          radius, so it can&apos;t yet be compared with part a. Complete the square to reach{' '}
          <Katex tex="(x-1)^2+(y-2)^2=4" />, then say it in words: centre <Katex tex="(1,2)" />,
          radius <Katex tex="2" />, the same as part a.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Sketch Circle"
        marks={2}
        statement={
          <>
            Graph the circle given by <Katex tex="|z+1|=\sqrt2\,|z-i|" /> on the Argand diagram below, labelling the intercepts with the vertical axis.
            <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={blankArgandSrc}
                alt="Blank Argand diagram from the original 2018 VCAA exam paper: Re(z) and Im(z) axes from −5 to 5 on a polar grid of circles of radius 1 to 5 and rays every 30°"
                className="w-full max-w-[340px]"
              />
            </div>
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <WrongMethod
          title="Label the intercepts as imaginary numbers"
          source="Examiner's report"
          working={<Katex display tex="(2-\sqrt3)i \ \text{ and } \ (2+\sqrt3)i" />}
        >
          The report says some coordinates were incorrectly given as imaginary numbers. The axes are
          named <Katex tex="\operatorname{Re}(z)" /> and <Katex tex="\operatorname{Im}(z)" />, but a
          labelled point on the diagram is written as coordinates:{' '}
          <Katex tex="\left(0,\ 2-\sqrt3\right)" /> and <Katex tex="\left(0,\ 2+\sqrt3\right)" />.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The line given by <Katex tex="|z-1|=|z-3|" /> intersects the circle given by{' '}
          <Katex tex="|z+1|=\sqrt2\,|z-i|" /> in two places.
        </p>
      </div>

      <PartCard letter="d" topic="Line & Circle" marks={2} statement={<>Draw the line given by <Katex tex="|z-1|=|z-3|" /> on the Argand diagram in <b>part c.</b> Label the points of intersection with their coordinates.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
        <Explore title="Why |z − 1| = |z − 3| is the vertical line Re(z) = 2">
          <BisectorWidget />
        </Explore>
      </PartCard>

      <PartCard letter="e" topic="Segment Area" marks={3} statement={<>Find the area of the minor segment enclosed by an arc of the circle given by <Katex tex="|z+1|=\sqrt2\,|z-i|" /> and part of the line given by <Katex tex="|z-1|=|z-3|" />.</>} examinerReport={EXAM_E}>
        <Background>
          <p>
            Half the students scored zero, and the report says many did not start with a
            correct sector angle. A diagram makes this a standard circular segment: chord{' '}
            <Katex tex="x=2" /> across a circle of radius <Katex tex="2" /> centred at{' '}
            <Katex tex="(1,2)" />.
          </p>
          <p>
            Segment area <Katex tex="=\tfrac{r^2}{2}(\theta-\sin\theta)" />, where{' '}
            <Katex tex="\theta" /> is the angle the chord subtends at the centre: the sector{' '}
            <Katex tex="\tfrac12r^2\theta" /> minus the isosceles triangle{' '}
            <Katex tex="\tfrac12r^2\sin\theta" />. Find <Katex tex="\theta" /> from the
            right-angled triangle formed by the radius, the perpendicular to the chord, and
            half the chord, and remember that triangle only holds half of <Katex tex="\theta" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <Explore title="Segment = sector − triangle, and where the angle 2π/3 comes from">
          <SegmentWidget />
        </Explore>
        <WrongMethod
          title="The angle in the triangle is π/3, so θ = π/3"
          source="Examiner's report"
          working={<Katex display tex="\tfrac12(2)^2\left(\tfrac{\pi}{3}-\sin\tfrac{\pi}{3}\right) = \tfrac{2\pi}{3}-\sqrt3 \approx 0.36" />}
        >
          The report says many students did not start with a correct sector angle. The{' '}
          <Katex tex="\tfrac{\pi}{3}" /> is the angle between a radius and the perpendicular, and
          the perpendicular splits the angle at the centre in half, so <Katex tex="\theta" /> is
          double it. Catch it with a size check: <Katex tex="0.36" /> is under <Katex tex="3\%" /> of
          the circle&apos;s <Katex tex="4\pi\approx12.6" />, far smaller than the sliver in the
          diagram.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
