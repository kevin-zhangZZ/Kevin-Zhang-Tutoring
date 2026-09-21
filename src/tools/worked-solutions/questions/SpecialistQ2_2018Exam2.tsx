// 2018 Specialist Mathematics — Exam 2, Section B, Question 2 (10 marks). Two descriptions
// of the same circle in the Argand plane, a perpendicular-bisector line, and the area of the
// minor segment they cut off. Question text transcribed from the original paper. VCAA
// supplied a blank Argand grid, so the drawn circle and line are this site's own
// answer-sketch (matplotlib) and live in the solution rather than the stem (guide §7).
//
// Note: pdftotext renders the locus as |z+1| = 2|z-i|, dropping a square root. The paper
// actually says |z+1| = √2|z-i|, which is what makes the two circles coincide — the text
// extraction was checked against a render of the page. Answers verified in sympy.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import argandSrc from './spec-2018exam2-q2-argand.png'

const EXAM_A: SAExaminerStats = {
  marks: [30, 70],
  average: 0.7,
  comment: (
    <>
      Some students gave only one of the two required parts of the answer. An incorrect
      radius of <Katex tex="\sqrt2" /> was occasionally given.
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
      explicitly show that the given relation leads to the required conclusion.
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
      coordinates were incorrect.
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
      presented as decimals.
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
      start the problem with a diagram.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="|z-(1+2i)| = 2" />,
    reason: <><Katex tex="|z-z_0|=r" /> is the set of points a fixed distance <Katex tex="r" /> from <Katex tex="z_0" /> — a circle, read straight off.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Centre } (1,\ 2), \qquad \text{radius } 2}" />,
    reason: <>Both parts are asked for; the report notes students giving only one. The radius is <Katex tex="2" />, not <Katex tex="\sqrt2" /> — no square root is involved in this form.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="z = x+yi: \quad |x+1+yi| = \sqrt2\,|x+(y-1)i|" />,
    reason: <>Substituting the cartesian form into <Katex tex="|z+1|=\sqrt2\,|z-i|" />.</>,
  },
  {
    working: <Katex display tex="(x+1)^2+y^2 = 2\left(x^2+(y-1)^2\right)" />,
    reason: <>Squaring both sides clears every modulus at once. Squaring is safe because both sides are non-negative.</>,
  },
  {
    working: <Katex display tex="x^2+2x+1+y^2 = 2x^2+2y^2-4y+2" />,
    reason: <>Expanding.</>,
  },
  {
    working: <Katex display tex="0 = x^2+y^2-2x-4y+1" />,
    reason: <>Collecting everything on one side. No <Katex tex="i" /> remains, which is the first thing to check.</>,
  },
  {
    working: <Katex display tex="(x-1)^2-1+(y-2)^2-4+1 = 0" />,
    reason: <>Completing the square in both variables.</>,
  },
  {
    working: <Katex display tex="(x-1)^2+(y-2)^2 = 4 \ \checkmark" />,
    reason: <>Centre <Katex tex="(1,2)" />, radius <Katex tex="\sqrt4=2" /> — identical to part (a). On a "show that" the final comparison must be written down, not left implied; the report is explicit about that.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x=0: \quad 1+(y-2)^2 = 4 \implies (y-2)^2 = 3" />,
    reason: <>The vertical axis in an Argand diagram is <Katex tex="\operatorname{Re}(z)=0" />, so set <Katex tex="x=0" /> in the cartesian form from part (b).</>,
  },
  {
    working: <Katex display tex="\boxed{\left(0,\ 2-\sqrt3\right) \ \text{ and } \ \left(0,\ 2+\sqrt3\right)}" />,
    reason: <>Exact surds, not decimals — the report flags decimal coordinates on this and the next part. (<Katex tex="\approx0.27" /> and <Katex tex="\approx3.73" />.)</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="|z-1| = |z-3| \iff \text{equidistant from } (1,0) \text{ and } (3,0)" />,
    reason: <>A locus of the form <Katex tex="|z-a|=|z-b|" /> is always the perpendicular bisector of the segment joining <Katex tex="a" /> and <Katex tex="b" /> — no algebra needed.</>,
  },
  {
    working: <Katex display tex="\text{Perpendicular bisector: } x = 2" />,
    reason: <>The midpoint of <Katex tex="(1,0)" /> and <Katex tex="(3,0)" /> is <Katex tex="(2,0)" />, and the segment is horizontal, so the bisector is the vertical line through it.</>,
  },
  {
    working: <Katex display tex="x=2: \quad 1+(y-2)^2 = 4 \implies y = 2\pm\sqrt3" />,
    reason: <>Substituting into the circle. The same numbers appear as in part (c), because <Katex tex="x=0" /> and <Katex tex="x=2" /> are symmetric about the centre's <Katex tex="x=1" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={argandSrc} alt="Argand diagram showing the circle of centre (1, 2) and radius 2, the vertical line Re(z) = 2, the two imaginary-axis intercepts and the two intersection points, all labelled" className="w-full max-w-[400px]" />
      </div>
    ),
    reason: <>Both parts (c) and (d) on one diagram, with all four points labelled in exact form.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(2,\ 2-\sqrt3\right) \ \text{ and } \ \left(2,\ 2+\sqrt3\right)}" />,
    reason: <>The intersection points, which part (e) needs.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="d = 2-1 = 1" />,
    reason: <>The perpendicular distance from the centre <Katex tex="(1,2)" /> to the line <Katex tex="x=2" />. Because the line is vertical this is just a difference of <Katex tex="x" />-values.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\frac{\theta}{2}\right) = \frac{d}{r} = \frac12 \implies \frac{\theta}{2} = \frac{\pi}{3}" />,
    reason: <>Drop the perpendicular from the centre to the chord: it bisects both the chord and the angle <Katex tex="\theta" /> the chord subtends at the centre, giving a right-angled triangle.</>,
  },
  {
    working: <Katex display tex="\theta = \frac{2\pi}{3}" />,
    reason: <>The angle subtended by the chord.</>,
  },
  {
    working: <Katex display tex="\text{Segment} = \frac{r^2}{2}\bigl(\theta-\sin\theta\bigr)" />,
    reason: <>Sector minus triangle, in one formula. The report says students who used the standard formula did markedly better than those who set up an integral.</>,
  },
  {
    working: <Katex display tex="= \frac{4}{2}\left(\frac{2\pi}{3}-\frac{\sqrt3}{2}\right) = \frac{4\pi}{3}-\sqrt3" />,
    reason: <><Katex tex="\sin\!\left(\tfrac{2\pi}{3}\right)=\tfrac{\sqrt3}{2}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \frac{4\pi}{3}-\sqrt3}" />,
    reason: <>(<Katex tex="\approx2.46" /> square units.) Sensible check: the whole circle has area <Katex tex="4\pi\approx12.57" />, and the minor segment is the small sliver to the right of <Katex tex="x=2" /> — about a fifth of it, which matches the diagram. Only <Katex tex="31\%" /> scored full marks.</>,
  },
]

export default function SpecialistQ2_2018Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (10 marks)</p>
      </div>

      <PartCard letter="a" marks={1} statement={<>State the centre in the form <Katex tex="(x,y)" />, where <Katex tex="x,y\in\mathbb{R}" />, and state the radius of the circle given by <Katex tex="|z-(1+2i)|=2" />, where <Katex tex="z\in\mathbb{C}" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={2} statement={<>By expressing the circle given by <Katex tex="|z+1|=\sqrt2\,|z-i|" /> in cartesian form, show that this circle has the same centre and radius as the circle given by <Katex tex="|z-(1+2i)|=2" />.</>} examinerReport={EXAM_B}>
        <Background>
          <p>
            Two quite different-looking descriptions turn out to be the same circle. The
            first is "distance from a point is constant"; the second is "distance from one
            point is <Katex tex="\sqrt2" /> times the distance from another", which is an{' '}
            <em>Apollonius circle</em> — a circle whenever the ratio is not <Katex tex="1" />.
          </p>
          <p>
            The mechanical route is always the same: put <Katex tex="z=x+yi" />, square both
            sides to clear the moduli, and complete the square.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" marks={2} statement={<>Graph the circle given by <Katex tex="|z+1|=\sqrt2\,|z-i|" /> on an Argand diagram, labelling the intercepts with the vertical axis.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard letter="d" marks={2} statement={<>The line given by <Katex tex="|z-1|=|z-3|" /> intersects the circle in two places. Draw the line on the Argand diagram and label the points of intersection with their coordinates.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" marks={3} statement={<>Find the area of the minor segment enclosed by an arc of the circle given by <Katex tex="|z+1|=\sqrt2\,|z-i|" /> and part of the line given by <Katex tex="|z-1|=|z-3|" />.</>} examinerReport={EXAM_E}>
        <Background>
          <p>
            Half the state scored zero, and the report's first observation is that many did
            not draw a diagram. With one, this is a standard circular segment: chord{' '}
            <Katex tex="x=2" /> across a circle of radius <Katex tex="2" /> centred at{' '}
            <Katex tex="(1,2)" />.
          </p>
          <p>
            Segment area <Katex tex="=\tfrac{r^2}{2}(\theta-\sin\theta)" />, where{' '}
            <Katex tex="\theta" /> is the angle the chord subtends at the centre. Find{' '}
            <Katex tex="\theta" /> from the right-angled triangle formed by the radius, the
            perpendicular to the chord, and half the chord.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
