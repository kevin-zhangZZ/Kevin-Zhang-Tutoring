// 2016 Specialist Mathematics — Exam 2, Question 2 (11 marks).
// A line and circle in the complex plane, their intersection, a segment area, and a ray range.
// Question text transcribed from the original paper; the blank Argand grid in part c is a crop
// of VCAA's own artwork, and the three sketches in the working are this site's own matplotlib
// figures drawn on that same grid. Worked solutions below are original.
// Parts a-c have no video walkthrough yet; the tutor will record and add these later.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import blankSrc from './spec-2016e2-q2c-blank-argand.png'
import sketchSrc from './spec-2016e2-q2c-sketch.png'
import raySrc from './spec-2016e2-q2e-ray.png'
import raysSrc from './spec-2016e2-q2f-rays.png'

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
      working: <Katex display tex="(x-1)^2+y^2 = (x+2)^2+(y-3)^2" />,
      reason: (
        <>
          Let <Katex tex="z=x+yi" />. <Katex tex="|z-1|" /> is the distance to <Katex tex="(1,0)" />,{' '}
          <Katex tex="|z+2-3i|" /> the distance to <Katex tex="(-2,3)" /> — the line is the set of points
          equidistant from both, i.e. the perpendicular bisector. Square both distances and equate.
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
    },
    {
      working: <Katex display tex="\boxed{y = x + 2}" />,
      reason: <>Dividing by <Katex tex="6" />. The gradient is <Katex tex="+1" /> — the report says a negative gradient was the most common error. Check: the midpoint of <Katex tex="(1,0)" /> and <Katex tex="(-2,3)" /> is <Katex tex="\left(-\tfrac12,\tfrac32\right)" />, which is on the line.</>,
    },
  ]

  const rowsB: WorkingRow[] = [
    {
      working: <Katex display tex="(x-1)^2+(x+2)^2=9" />,
      reason: (
        <>
          Circle <Katex tex="|z-1|=3" /> is <Katex tex="(x-1)^2+y^2=9" />; substitute the line{' '}
          <Katex tex="y=x+2" /> from part (a).
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
    },
    {
      working: (
        <>
          <Katex display tex="(x+2)(x-1)=0" />
          <Katex display tex="\implies\; x=-2 \text{ or } x=1" />
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
      reason: <>Substitute back into <Katex tex="y=x+2" />.</>,
    },
    {
      working: <Katex display tex="\boxed{z = -2 \ \text{ and } \ z = 1+3i}" />,
    },
  ]

  const rowsC: WorkingRow[] = [
    {
      working: (
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={sketchSrc}
            alt="Our sketch on VCAA's grid: the circle |z − 1| = 3, centre 1 and radius 3, and the line y = x + 2 crossing it at −2 and 1 + 3i"
            className="w-full max-w-[320px]"
          />
        </div>
      ),
      reason: (
        <>
          Circle centred <Katex tex="(1,0)" />, radius 3; line <Katex tex="y=x+2" /> cuts it at the two points
          found in part (b).
        </>
      ),
    },
  ]

  const rowsD: WorkingRow[] = [
    {
      working: <Katex display tex="\text{centre } (1,0) \to (-2,0): \ (-3,0); \qquad (1,0) \to (1,3): \ (0,3)" />,
      reason: (
        <>
          The chord joins the intersection points from part b. Seen from the centre, one is straight
          left and the other straight up, so the chord subtends a right angle at the centre.
        </>
      ),
    },
    {
      working: <Katex display tex="\text{major segment} = \tfrac34\text{ of the circle} + \text{right-angled triangle}" />,
      reason: (
        <>
          The major segment is the three-quarter sector outside the right angle, plus the triangle between
          the two radii and the chord — the route the report calls the easiest.
        </>
      ),
    },
    {
      working: <Katex display tex="\text{Area} = \tfrac34\times\pi\times3^2 + \tfrac12\times3\times3" />,
      reason: <>The triangle has two perpendicular sides of length <Katex tex="3" /> (both radii).</>,
    },
    {
      working: <Katex display tex="\boxed{\text{Area} = \dfrac{27\pi}{4} + \dfrac{9}{2} \text{ square units}}" />,
      reason: <>About <Katex tex="25.7" />, a little over three-quarters of the whole circle (<Katex tex="9\pi\approx28.3" />), as a major segment cut off by a chord this far from the centre should be.</>,
    },
  ]

  const rowsE: WorkingRow[] = [
    {
      working: (
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={raySrc}
            alt="The part c sketch with the ray Arg(z) = −3π/4 added: a half-line from an open circle at the origin into the third quadrant"
            className="w-full max-w-[320px]"
          />
        </div>
      ),
      reason: (
        <>
          Ray from the origin at angle <Katex tex="-\tfrac{3\pi}{4}" /> (i.e. <Katex tex="-135^\circ" />), heading into
          the third quadrant. The origin is excluded (open circle): <Katex tex="\mathrm{Arg}(0)" /> is undefined, and
          the report notes rays drawn through or past the origin.
        </>
      ),
    },
  ]

  const rowsF: WorkingRow[] = [
    {
      working: (
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={raysSrc}
            alt="The line y = x + 2, the dashed parallel line y = x through the origin, the half-plane above y = x shaded, and an example ray Arg(z) = 2π/3 from the origin meeting y = x + 2"
            className="w-full max-w-[320px]"
          />
        </div>
      ),
      reason: (
        <>
          The line through the origin parallel to <Katex tex="y=x+2" /> (dashed) splits the plane in two. A ray
          from the origin only reaches <Katex tex="y=x+2" /> at some <Katex tex="t>0" /> if it points into the{' '}
          <em>same</em> half as that line (shaded) — the example ray shown does. Pointing along the dashed line
          itself (<Katex tex="\theta=\tfrac{\pi}{4}" /> or <Katex tex="\theta=-\tfrac{3\pi}{4}" />) never meets
          it, since the ray stays exactly parallel.
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
          Write the ray as <Katex tex="(t\cos\theta, t\sin\theta)" /> for <Katex tex="t \ge 0" />, where{' '}
          <Katex tex="\theta = \alpha\pi" />, and substitute into <Katex tex="y=x+2" />.
        </>
      ),
    },
    {
      working: (
        <>
          <Katex display tex="\sin\theta > \cos\theta" />
          <Katex display tex="\iff\; \sqrt{2}\sin\!\left(\theta - \tfrac{\pi}{4}\right) > 0" />
        </>
      ),
      reason: (
        <>
          Need <Katex tex="t>0" />. The boundary directions — where the ray is exactly parallel to the line — are{' '}
          <Katex tex="\theta = \tfrac{\pi}{4}" /> and <Katex tex="\theta = -\tfrac{3\pi}{4}" />.
        </>
      ),
    },
    {
      working: <Katex display tex="\theta \in \left(-\pi, -\tfrac{3\pi}{4}\right) \cup \left(\tfrac{\pi}{4}, \pi\right]" />,
      reason: <>Solving the inequality on <Katex tex="\theta \in (-\pi, \pi]" />.</>,
    },
    {
      working: <Katex display tex="\boxed{\alpha \in \left(-1, -\tfrac{3}{4}\right) \cup \left(\tfrac{1}{4}, 1\right]}" />,
      reason: <>Divide by <Katex tex="\pi" />, since <Katex tex="\theta = \alpha\pi" />. The principal argument lies in <Katex tex="(-\pi,\pi]" />, so <Katex tex="\alpha=1" /> is included but <Katex tex="\alpha=-1" /> is not — including it was a common error, as were answers with multiples of <Katex tex="\pi" />.</>,
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
              <img
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
        statement={<>The line <Katex tex="|z-1|=|z+2-3i|" /> cuts the circle <Katex tex="|z-1|=3" /> into two segments. Find the area of the major segment.</>}
        examinerReport={EXAMINER_D}
        videoSrc={VIDEO.d}
      >
        <WorkingTable rows={rowsD} />
      </PartCard>

      <PartCard letter="e" topic="Ray Locus" marks={1} statement={<>Sketch the ray given by <Katex tex="\mathrm{Arg}(z) = -\dfrac{3\pi}{4}" /> on the Argand diagram in part c.</>} examinerReport={EXAMINER_E} videoSrc={VIDEO.e}>
        <WorkingTable rows={rowsE} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Ray Intersections"
        marks={2}
        statement={<>Write down the range of values of <Katex tex="\alpha, \ \alpha \in R" />, for which a ray with equation <Katex tex="\mathrm{Arg}(z) = \alpha\pi" /> intersects the line <Katex tex="|z-1|=|z+2-3i|" />.</>}
        examinerReport={EXAMINER_F}
        videoSrc={VIDEO.f}
      >
        <WorkingTable rows={rowsF} />
      </PartCard>
    </div>
  )
}
