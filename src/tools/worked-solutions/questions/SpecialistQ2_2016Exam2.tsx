// 2016 Specialist Mathematics — Exam 2, Question 2 (11 marks).
// A line and circle in the complex plane, their intersection, a segment area, and a ray range.
// Question text transcribed from the original paper; the blank Argand grid in part c is a crop
// of VCAA's own artwork, and the three sketches in the working are this site's own matplotlib
// figures drawn on that same grid. Worked solutions below are original. Every answer re-derived
// and checked with sympy (part d also by numerical integration of the segment); VCAA's report
// and itute agree on all six parts (itute writes part d as 9(2 + 3π)/4, the same number).
// Interactive diagrams (§15.3, qualifying parts only: d 39%, e 34%, f 7% full marks): part d.
// builds the major segment step by step from a three-quarter sector and a right-angled triangle,
// with the circle-minus-minor-segment check (interactives/spec-2016e2-q2d-segment.tsx); part e.
// reads the argument of a dragged point on the ray, past O and at O
// (interactives/spec-2016e2-q2e-ray.tsx); part f. rotates the ray Arg(z) = απ and records on a
// number line which α meet the line (interactives/spec-2016e2-q2f-rotate.tsx). Parts a-c do not
// qualify (72/66/77% full marks), so the earlier part a bisector widget was unhooked; the
// report's traps (former Common Mistake boxes) now live in the rows' `more`.
// Parts a-c have no video walkthrough yet; the tutor will record and add these later.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import blankSrc from './spec-2016e2-q2c-blank-argand.png'
import sketchSrc from './spec-2016e2-q2c-sketch.png'
import raySrc from './spec-2016e2-q2e-ray.png'
import raysSrc from './spec-2016e2-q2f-rays.png'

const SegmentWidget = lazyWidget(() => import('../interactives/spec-2016e2-q2d-segment'))
const RayWidget = lazyWidget(() => import('../interactives/spec-2016e2-q2e-ray'))
const RotateWidget = lazyWidget(() => import('../interactives/spec-2016e2-q2f-rotate'))

// Dropbox share links for the tutor's video walkthrough of parts d-f, converted to `raw=1`
// so the browser can stream them directly. All three were already H.264/AAC — just muxed
// in the wrong container (.mkv) — so each was only losslessly remuxed to .mp4
// (`ffmpeg -c copy -movflags +faststart`), no re-encoding needed.
const VIDEO = {
  d: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/APWF4toNWprpJwahCcejsmE/SM%202016/Converted/SAQ2/SAQ2d-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  e: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/APrsfg5ws8nXs3ikWvExzCY/SM%202016/Converted/SAQ2/SAQ2e-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  f: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/AAhxSw2nFv5frlU9zTHhVBk/SM%202016/Converted/SAQ2/SAQ2f-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
}

const EXAMINER_A: SAExaminerStats = {
  marks: [14, 14, 72],
  average: 1.6,
  comment: (
    <>
      The majority of correct answers resulted from substituting <Katex tex="z=x+yi" /> into
      the expression provided. Very few students used a perpendicular bisector approach at
      this stage. The most common error was a negative gradient.
    </>
  ),
}

const EXAMINER_B: SAExaminerStats = {
  marks: [17, 18, 66],
  average: 1.5,
  comment: 'Most students were able to find cartesian expressions for the circle and the line and then apply substitution or use technology to find the required points.',
}

const EXAMINER_C: SAExaminerStats = {
  marks: [11, 12, 77],
  average: 1.7,
  comment:
    'This question was generally well answered. The circle was sketched correctly in almost all cases. However, the line was not always placed with sufficient accuracy. Some students who were unable to find the correct equation in Question 2a. were able to use a perpendicular bisector approach to draw a correct line.',
}

const EXAMINER_D: SAExaminerStats = {
  marks: [48, 13, 39],
  average: 0.9,
  comment:
    'Students found this question more difficult than previous parts of Question 2. A correct answer was most easily found by adding a right-angled triangle to three-quarters of a circle. Subtracting the minor segment area from the circle area was a common approach. Some students correctly used a segment area formula and a larger number set up elaborate definite integrals to find the area, occasionally successfully, but this was not an efficient approach. Sign and factorisation errors meant that some students moved from a correct approach and evaluation to an incorrect final answer.',
}

const EXAMINER_E: SAExaminerStats = {
  marks: [66, 34],
  average: 0.4,
  comment: 'Many students were not able to sketch the required ray. Some students sketched a line but did not restrict their ray appropriately, either including or extending past the origin.',
}

const EXAMINER_F: SAExaminerStats = {
  marks: [85, 9, 7],
  average: 0.3,
  comment:
    'Students found this question demanding, with few students giving a fully correct answer. Many students did not respond to this question. Common incorrect answers contained multiples of π or included the endpoint α = −1. Some students did not note that the principal value of the argument was used in the question. Of the correct answers, a variety of correct notations were presented.',
}

export default function SpecialistQ2_2016Exam2() {
  const rowsA: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="\text{Let } z = x+yi:" />
          <Katex display tex="|(x-1)+yi| = |(x+2)+(y-3)i|" />
        </>
      ),
      reason: (
        <>
          Substitute <Katex tex="z=x+yi" /> and group each side into its real and imaginary parts, ready to take the
          modulus of each.
        </>
      ),
      more: (
        <>
          Before any algebra, it helps to read the equation as distances. <Katex tex="|z-1|" /> is the distance from{' '}
          <Katex tex="z" /> to the point <Katex tex="1" />, i.e. <Katex tex="(1,0)" />. Rewrite the other side as{' '}
          <Katex tex="|z-(-2+3i)|" />: the distance from <Katex tex="z" /> to <Katex tex="(-2,3)" />. So the equation
          describes every point the same distance from <Katex tex="(1,0)" /> and <Katex tex="(-2,3)" />, which is the
          perpendicular bisector of the segment joining them. That is why it is a line. The report says very few students
          used this perpendicular bisector approach here, but it gives the quick check in the last row, and a way to draw
          the line in part c even if the algebra goes wrong.
        </>
      ),
    },
    {
      working: <Katex display tex="(x-1)^2+y^2 = (x+2)^2+(y-3)^2" />,
      reason: (
        <>
          <Katex tex="|a+bi|=\sqrt{a^2+b^2}" />, so both sides are square roots; squaring removes them. Careful: the
          imaginary part of <Katex tex="z+2-3i" /> is <Katex tex="y-3" />, not <Katex tex="y+3" />.
        </>
      ),
      more: (
        <>
          One sign slip here flips the gradient. Reading the imaginary part as <Katex tex="y+3" /> gives{' '}
          <Katex tex="(x-1)^2+y^2=(x+2)^2+(y+3)^2" />, so <Katex tex="-6x-6y-12=0" /> and <Katex tex="y=-x-2" />: a
          negative gradient, which the report says was the most common error. That equation is the set of points equally
          far from <Katex tex="(1,0)" /> and <Katex tex="(-2,-3)" />, the wrong second point. Both checks in the last row
          catch it straight away.
        </>
      ),
    },
    {
      working: (
        <>
          <Katex display tex="x^2-2x+1+y^2 = x^2+4x+4+y^2-6y+9" />
          <Katex display tex="\implies\; -6x+6y-12=0" />
        </>
      ),
      reason: (
        <>
          Expand. The <Katex tex="x^2" /> and <Katex tex="y^2" /> cancel from both sides, as they always do for{' '}
          <Katex tex="|z-a|=|z-b|" />, leaving a linear equation.
        </>
      ),
    },
    {
      working: <Katex display tex="\boxed{y = x + 2}" />,
      reason: (
        <>
          Divide by <Katex tex="6" /> and make <Katex tex="y" /> the subject. Check: points equally far from{' '}
          <Katex tex="(1,0)" /> and <Katex tex="(-2,3)" /> form the perpendicular bisector of the segment joining them
          (gradient <Katex tex="-1" />), so the gradient must be <Katex tex="+1" />.
        </>
      ),
      more: (
        <>
          The bisector crosses the segment at right angles. The segment has gradient{' '}
          <Katex tex="\tfrac{3-0}{-2-1}=-1" />, so the line has gradient{' '}
          <Katex tex="+1" />; a negative gradient (the report&apos;s most common error) must be wrong. It also passes
          through the segment&apos;s midpoint <Katex tex="\left(-\tfrac12,\tfrac32\right)" />, and indeed{' '}
          <Katex tex="-\tfrac12+2=\tfrac32" />.
        </>
      ),
    },
  ]

  const rowsB: WorkingRow[] = [
    {
      working: <Katex display tex="|z-1|=3 \implies (x-1)^2+y^2=9" />,
      reason: (
        <>
          <Katex tex="|z-1|=3" /> says <Katex tex="z" /> is always 3 units from the point <Katex tex="1" />: a circle,
          centre <Katex tex="(1,0)" />, radius 3. With <Katex tex="z=x+yi" /> it reads{' '}
          <Katex tex="\sqrt{(x-1)^2+y^2}=3" />; square both sides.
        </>
      ),
    },
    {
      working: <Katex display tex="(x-1)^2+(x+2)^2=9" />,
      reason: (
        <>
          An intersection point is on both graphs, so it satisfies both equations: substitute the line{' '}
          <Katex tex="y=x+2" /> from part a into the circle.
        </>
      ),
    },
    {
      working: (
        <>
          <Katex display tex="2x^2+2x-4=0" />
          <Katex display tex="\implies\; x^2+x-2=0" />
        </>
      ),
      reason: (
        <>
          Expanding: <Katex tex="x^2-2x+1+x^2+4x+4=9" />. Then divide by <Katex tex="2" />.
        </>
      ),
    },
    {
      working: (
        <>
          <Katex display tex="(x+2)(x-1)=0" />
          <Katex display tex="\implies\; x=-2 \text{ or } x=1" />
        </>
      ),
      reason: (
        <>
          Factorise.
        </>
      ),
      more: (
        <>
          On CAS, <Cas fn="solve" /> with the line and the circle entered together as a system gives the same pair, but
          this quadratic is quick by hand.
        </>
      ),
    },
    {
      working: (
        <>
          <Katex display tex="x=-2" />
          <Katex display tex="\Rightarrow y=0" />
          <Katex display tex="x=1" />
          <Katex display tex="\Rightarrow y=3" />
        </>
      ),
      reason: <>Substitute back into <Katex tex="y=x+2" />, the simpler of the two equations.</>,
    },
    {
      working: <Katex display tex="\boxed{z = -2 \ \text{ and } \ z = 1+3i}" />,
      reason: (
        <>
          Check: both are 3 from the centre <Katex tex="1" /> (<Katex tex="-2" /> is 3 to its left,{' '}
          <Katex tex="1+3i" /> is 3 above it). As points, <Katex tex="(-2,0)" /> and <Katex tex="(1,3)" />; either form
          is fine.
        </>
      ),
    },
  ]

  const rowsC: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="\text{circle: centre } 1,\ \text{radius } 3," />
          <Katex display tex="\text{through } -2,\ 4,\ 1+3i,\ 1-3i" />
          <Katex display tex="\text{line: through } -2 \text{ and } 1+3i" />
        </>
      ),
      reason: (
        <>
          Circle: mark the four points 3 units left, right, above and below the centre, and draw through them. Line:
          rule it through the two part b intersections, across the whole grid.
        </>
      ),
      more: (
        <>
          A compass helps with the circle. The report notes the line was not always placed with sufficient accuracy;
          ruling it through two exact points you already know avoids that, and it must run edge to edge, since it is a
          line, not a segment. If part a went wrong, draw the perpendicular bisector of <Katex tex="1" /> and{' '}
          <Katex tex="-2+3i" /> instead; the report says some students got a correct line that way.
        </>
      ),
    },
    {
      working: (
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={sketchSrc}
            alt="Our sketch on VCAA's grid: the circle |z − 1| = 3, centre 1 and radius 3, and the line y = x + 2 crossing it at −2 and 1 + 3i"
            className="w-full max-w-[320px]"
          />
        </div>
      ),
      reason: (
        <>
          Circle centred <Katex tex="(1,0)" />, radius 3; line <Katex tex="y=x+2" /> cuts it at the two points
          found in part (b), and crosses the imaginary axis at <Katex tex="2i" />.
        </>
      ),
    },
  ]

  const rowsD: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="\text{From the centre } 1:\ -2 \text{ is } 3 \text{ left},\ 1+3i \text{ is } 3 \text{ up}" />
          <Katex display tex="\implies \text{angle at the centre} = \tfrac{\pi}{2}" />
        </>
      ),
      reason: (
        <>
          Join the centre to each end of the chord (the part b points). One radius points straight left, the other
          straight up, so they meet at a right angle.
        </>
      ),
      more: (
        <>
          Start from the picture in part c. What decides a segment&apos;s area is the angle the chord subtends at the
          centre, so that is the first thing to find. Here it is exactly <Katex tex="\tfrac{\pi}{2}" />, a quarter of
          the full turn, which is what makes this question quick. Step through the diagram below.
        </>
      ),
    },
    {
      working: (
        <>
          <Katex display tex="\text{major segment} = \tfrac34\text{ of the circle}" />
          <Katex display tex="+\ \text{right-angled triangle}" />
        </>
      ),
      reason: (
        <>
          The major segment is the bigger piece, containing the centre. Cut it along the two radii: a three-quarter
          sector plus the triangle between the radii and the chord.
        </>
      ),
      more: (
        <>
          Sector and triangle both have area formulas; the segment as a whole does not. The report says a correct answer
          was most easily found this way. It also notes that some students set up elaborate definite integrals, which
          occasionally worked but was not an efficient approach.
        </>
      ),
    },
    {
      working: <Katex display tex="\text{Area} = \tfrac34\times\pi\times3^2 + \tfrac12\times3\times3" />,
      reason: (
        <>
          The sector is three-quarters of a circle of radius 3. The triangle&apos;s two perpendicular sides are both
          radii (length <Katex tex="3" />), so they are its base and height.
        </>
      ),
    },
    {
      working: <Katex display tex="\boxed{\text{Area} = \dfrac{27\pi}{4} + \dfrac{9}{2} \text{ square units}}" />,
      reason: (
        <>
          Check: about <Katex tex="25.71" />, more than the three-quarter sector alone (
          <Katex tex="\tfrac{27\pi}{4}\approx21.21" />) but less than the whole circle (<Katex tex="9\pi\approx28.27" />).
        </>
      ),
      more: (
        <>
          <p>
            The other common route is circle minus minor segment. The minor segment is the quarter circle minus the
            triangle, <Katex tex="\tfrac{9\pi}{4}-\tfrac92" />, and all of it must be subtracted:
          </p>
          <Katex display tex="9\pi-\left(\tfrac{9\pi}{4}-\tfrac92\right)=\tfrac{27\pi}{4}+\tfrac92." />
          <p>
            Dropping the bracket gives <Katex tex="\tfrac{27\pi}{4}-\tfrac92\approx16.71" />, smaller than the
            three-quarter sector on its own, so the size check above catches it. The report notes that sign and
            factorisation errors took some students from a correct approach to an incorrect final answer; this is one
            such slip. The segment formula <Katex tex="\tfrac12r^2(\theta-\sin\theta)" /> with the reflex angle{' '}
            <Katex tex="\theta=\tfrac{3\pi}{2}" /> also works: <Katex tex="\tfrac92\left(\tfrac{3\pi}{2}+1\right)" />,
            the same answer.
          </p>
        </>
      ),
    },
  ]

  const rowsE: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="-\tfrac{3\pi}{4} \text{ is } 135^\circ \text{ clockwise}" />
          <Katex display tex="\text{ray from } 0 \text{ (excluded) through } -1-i" />
        </>
      ),
      reason: (
        <>
          <Katex tex="\mathrm{Arg}(z)" /> is the angle from the positive real axis to <Katex tex="z" />, clockwise
          negative. Every point in the direction <Katex tex="-\tfrac{3\pi}{4}" /> (third quadrant, <Katex tex="45^\circ" />{' '}
          to both axes) has it: a ray from <Katex tex="O" />.
        </>
      ),
      more: (
        <>
          However far out a point is along that direction, its argument is still <Katex tex="-\tfrac{3\pi}{4}" />, so the
          locus is a half-line starting at <Katex tex="O" />, through <Katex tex="-1-i" />, <Katex tex="-2-2i" />, and so
          on. It is not the whole line <Katex tex="y=x" />.
        </>
      ),
    },
    {
      working: (
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={raySrc}
            alt="The part c sketch with the ray Arg(z) = −3π/4 added: a half-line from an open circle at the origin into the third quadrant"
            className="w-full max-w-[320px]"
          />
        </div>
      ),
      reason: (
        <>
          Draw it from an open circle at <Katex tex="O" /> to the edge of the grid. <Katex tex="O" /> is excluded since{' '}
          <Katex tex="\mathrm{Arg}(0)" /> is undefined; don&apos;t continue past <Katex tex="O" />.
        </>
      ),
      more: (
        <>
          <p>
            <Katex tex="\mathrm{Arg}(0)" /> is undefined because there is no direction from <Katex tex="O" /> to itself.
            The report notes students who sketched a line, or a ray that included or extended past the origin.
          </p>
          <p>
            One way to end up with a line is converting to <Katex tex="\tan" />:{' '}
            <Katex tex="\tan\!\left(-\tfrac{3\pi}{4}\right)=1" />, so <Katex tex="\tfrac{y}{x}=1" />, i.e.{' '}
            <Katex tex="y=x" />. But <Katex tex="\tan\theta=1" /> for <Katex tex="\theta=\tfrac{\pi}{4}" /> too, and the
            first-quadrant half of <Katex tex="y=x" /> has argument <Katex tex="\tfrac{\pi}{4}" />, not{' '}
            <Katex tex="-\tfrac{3\pi}{4}" />. <Katex tex="\tan" /> throws the quadrant away;{' '}
            <Katex tex="\mathrm{Arg}(z)=-\tfrac{3\pi}{4}" /> needs <Katex tex="x<0" /> and <Katex tex="y<0" />. Drag the
            point through <Katex tex="O" /> in the diagram below to see the argument jump.
          </p>
        </>
      ),
    },
  ]

  const rowsF: WorkingRow[] = [
    {
      working: (
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={raysSrc}
            alt="The line y = x + 2, the dashed parallel line y = x through the origin, the half-plane above y = x shaded, and an example ray Arg(z) = 2π/3 from the origin meeting y = x + 2"
            className="w-full max-w-[320px]"
          />
        </div>
      ),
      reason: (
        <>
          <Katex tex="y=x+2" /> lies entirely above its parallel through <Katex tex="O" />, <Katex tex="y=x" /> (dashed).
          A ray from <Katex tex="O" /> meets it only if it points above <Katex tex="y=x" /> (shaded).
        </>
      ),
      more: (
        <>
          Picture the ray swinging round <Katex tex="O" /> as <Katex tex="\alpha" /> changes. A ray pointing into the
          shaded side must eventually cross <Katex tex="y=x+2" />, as the example ray at{' '}
          <Katex tex="\tfrac{2\pi}{3}" /> does. A ray pointing below the dashed line heads away and never meets it, and
          one pointing exactly along the dashed line (<Katex tex="\tfrac{\pi}{4}" /> or{' '}
          <Katex tex="-\tfrac{3\pi}{4}" />) stays parallel to it forever. Rotate the ray in the diagram below.
        </>
      ),
    },
    {
      working: (
        <>
          <Katex display tex="t\sin\theta = t\cos\theta + 2" />
          <Katex display tex="\implies\; t = \frac{2}{\sin\theta - \cos\theta}" />
        </>
      ),
      reason: (
        <>
          Now the algebra. Let <Katex tex="\theta=\alpha\pi" />. Points on the ray are{' '}
          <Katex tex="(t\cos\theta, t\sin\theta)" />, <Katex tex="t>0" /> (the distance from <Katex tex="O" />).
          Substitute into <Katex tex="y=x+2" />.
        </>
      ),
    },
    {
      working: <Katex display tex="t>0 \iff \sin\theta > \cos\theta" />,
      reason: (
        <>
          The meeting point is on the ray only if <Katex tex="t>0" />. If <Katex tex="\sin\theta=\cos\theta" />, no{' '}
          <Katex tex="t" /> works: the ray is parallel.
        </>
      ),
      more: (
        <>
          A negative <Katex tex="t" /> is behind <Katex tex="O" />, on the opposite ray. Geometrically,{' '}
          <Katex tex="(\cos\theta,\sin\theta)" /> is the ray&apos;s direction on the unit circle, and{' '}
          <Katex tex="\sin\theta>\cos\theta" /> says that point is above <Katex tex="y=x" />: the same condition as the
          picture. Equality happens at <Katex tex="\theta=\tfrac{\pi}{4}" /> and <Katex tex="-\tfrac{3\pi}{4}" />.
        </>
      ),
    },
    {
      working: <Katex display tex="\theta \in \left(-\pi, -\tfrac{3\pi}{4}\right) \cup \left(\tfrac{\pi}{4}, \pi\right]" />,
      reason: (
        <>
          <Katex tex="\sin\theta>\cos\theta" /> from <Katex tex="\tfrac{\pi}{4}" /> round to{' '}
          <Katex tex="\tfrac{5\pi}{4}" />. <Katex tex="\mathrm{Arg}" /> lies in <Katex tex="(-\pi,\pi]" />, so write{' '}
          <Katex tex="\pi" /> to <Katex tex="\tfrac{5\pi}{4}" /> as <Katex tex="-\pi" /> to{' '}
          <Katex tex="-\tfrac{3\pi}{4}" />, excluding <Katex tex="-\pi" />.
        </>
      ),
      more: (
        <>
          Subtracting <Katex tex="2\pi" /> turns <Katex tex="\left(\pi,\tfrac{5\pi}{4}\right)" /> into{' '}
          <Katex tex="\left(-\pi,-\tfrac{3\pi}{4}\right)" />. The direction <Katex tex="\pi" /> itself (the negative real
          axis, which meets the line at <Katex tex="-2" />) is kept once, at the top end of{' '}
          <Katex tex="\left(\tfrac{\pi}{4},\pi\right]" />; the principal argument is never <Katex tex="-\pi" />.
        </>
      ),
    },
    {
      working: <Katex display tex="\boxed{\alpha \in \left(-1, -\tfrac{3}{4}\right) \cup \left(\tfrac{1}{4}, 1\right]}" />,
      reason: (
        <>
          Divide by <Katex tex="\pi" />, since <Katex tex="\theta = \alpha\pi" />: the question asks for{' '}
          <Katex tex="\alpha" />, so no <Katex tex="\pi" /> in the answer. <Katex tex="\alpha=1" /> is included;{' '}
          <Katex tex="\alpha=-1" /> is not.
        </>
      ),
      more: (
        <>
          The report lists two common incorrect answers. Answers containing multiples of <Katex tex="\pi" />{' '}
          give the right directions, but as values of the angle <Katex tex="\theta" />, not of <Katex tex="\alpha" />.
          Including <Katex tex="\alpha=-1" /> treats <Katex tex="\mathrm{Arg}(z)=-\pi" /> as a ray, but no complex number
          has principal argument <Katex tex="-\pi" />: the left-pointing ray through <Katex tex="-2" /> is{' '}
          <Katex tex="\alpha=1" />, already counted. The report also notes that some students did not note that the
          principal value of the argument was used in the question.
        </>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (11 marks)</p>
        <p>A line in the complex plane is given by</p>
        <Katex display tex="|z-1| = |z+2-3i|, \quad z \in C." className="my-2" />
      </div>

      <PartCard letter="a" topic="Line Locus" marks={2} statement={<>Find the equation of this line in the form <Katex tex="y = mx + c" />.</>} examinerReport={EXAMINER_A}>
        <WorkingTable rows={rowsA} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Line & Circle"
        marks={2}
        statement={<>Find the points of intersection of the line <Katex tex="|z-1|=|z+2-3i|" /> with the circle <Katex tex="|z-1|=3" />.</>}
        examinerReport={EXAMINER_B}
      >
        <WorkingTable rows={rowsB} />
      </PartCard>

      <PartCard letter="c" topic="Sketch Loci" marks={2} statement={
          <>
            <p>
              Sketch both the line <Katex tex="|z-1|=|z+2-3i|" /> and the circle <Katex tex="|z-1|=3" /> on the
              Argand diagram below.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mt-3">
              <img loading="lazy" decoding="async"
                src={blankSrc}
                alt="Blank Argand diagram with Re(z) and Im(z) each from −4 to 4 — from the original 2016 VCAA exam paper"
                className="w-full max-w-[300px]"
              />
            </div>
          </>
        } examinerReport={EXAMINER_C}>
        <WorkingTable rows={rowsC} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Segment Area"
        marks={2}
        statement={<>The line <Katex tex="|z-1|=|z+2-3i|" /> cuts the circle <Katex tex="|z-1|=3" /> into two segments.<br />Find the area of the major segment.</>}
        examinerReport={EXAMINER_D}
        videoSrc={VIDEO.d}
      >
        <WorkingTable rows={rowsD} />
        <Explore title="The major segment is three-quarters of the circle plus a right-angled triangle">
          <SegmentWidget />
        </Explore>
      </PartCard>

      <PartCard letter="e" topic="Ray Locus" marks={1} statement={<>Sketch the ray given by <Katex tex="\mathrm{Arg}(z) = -\dfrac{3\pi}{4}" /> on the Argand diagram in <b>part c.</b></>} examinerReport={EXAMINER_E} videoSrc={VIDEO.e}>
        <WorkingTable rows={rowsE} />
        <Explore title="Why Arg(z) = −3π/4 is a ray that stops at an open circle at O, not a line">
          <RayWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="f"
        topic="Ray Intersections"
        marks={2}
        statement={<>Write down the range of values of <Katex tex="\alpha, \ \alpha \in R" />, for which a ray with equation <Katex tex="\mathrm{Arg}(z) = \alpha\pi" /> intersects the line <Katex tex="|z-1|=|z+2-3i|" />.</>}
        examinerReport={EXAMINER_F}
        videoSrc={VIDEO.f}
      >
        <Background title="What α Does in Arg(z) = απ">
          <p>
            <Katex tex="\alpha\pi" /> is the angle of the ray, measured from the positive real axis:{' '}
            <Katex tex="\alpha=\tfrac12" /> points straight up (<Katex tex="\tfrac{\pi}{2}" />), <Katex tex="\alpha=1" />{' '}
            along the negative real axis (<Katex tex="\pi" />), <Katex tex="\alpha=-\tfrac12" /> straight down.
          </p>
          <p>
            <Katex tex="\mathrm{Arg}" /> is the <em>principal</em> argument, which always lies in{' '}
            <Katex tex="(-\pi,\pi]" />. So only <Katex tex="-1<\alpha\le1" /> gives a ray at all.
          </p>
        </Background>
        <WorkingTable rows={rowsF} />
        <Explore title="Rotate the ray: it meets y = x + 2 only when it points above the parallel line y = x">
          <RotateWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
