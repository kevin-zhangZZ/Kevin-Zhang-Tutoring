// 2016 Specialist Mathematics — Exam 2, Question 2 (11 marks).
// A line and circle in the complex plane, their intersection, a segment area, and a ray range.
// Question text transcribed from the original paper; worked solutions below are original.
// Parts a-c have no video walkthrough yet; the tutor will record and add these later.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

// Dropbox share links for the tutor's video walkthrough of parts d-f, converted to `raw=1`
// so the browser can stream them directly. All three were already H.264/AAC — just muxed
// in the wrong container (.mkv) — so each was only losslessly remuxed to .mp4
// (`ffmpeg -c copy -movflags +faststart`), no re-encoding needed.
const VIDEO = {
  d: 'https://www.dropbox.com/scl/fo/x672xwjrtj2j9xu7i61hm/ACtQLUkoCg7q5YQ1PNUCmoE/SAQ2d-h264.mp4?rlkey=5hew4el0gbyauzhc3y9aqdda2&raw=1',
  e: 'https://www.dropbox.com/scl/fo/x672xwjrtj2j9xu7i61hm/AKrLvS3mRUhWEZOwwAqcPIc/SAQ2e-h264.mp4?rlkey=5hew4el0gbyauzhc3y9aqdda2&raw=1',
  f: 'https://www.dropbox.com/scl/fo/x672xwjrtj2j9xu7i61hm/AE84SJGpymQCVbJgNkNlpZc/SAQ2f-h264.mp4?rlkey=5hew4el0gbyauzhc3y9aqdda2&raw=1',
}

const EXAMINER_A: SAExaminerStats = {
  marks: [14, 14, 72],
  average: 1.6,
  comment:
    'The majority of correct answers resulted from substituting z = x + yi into the expression provided. Very few students used a perpendicular bisector approach at this stage. The most common error was a negative gradient.',
}

const EXAMINER_B: SAExaminerStats = {
  marks: [17, 18, 66],
  average: 1.5,
  comment: 'Most students were able to find Cartesian expressions for the circle and the line and then apply substitution or use technology to find the required points.',
}

const EXAMINER_C: SAExaminerStats = {
  marks: [11, 12, 77],
  average: 1.7,
  comment:
    'This question was generally well answered. The circle was sketched correctly in almost all cases. However, the line was not always placed with sufficient accuracy. Some students who were unable to find the correct equation in part (a) were able to use a perpendicular bisector approach to draw a correct line.',
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

export default function SpecialistQ2_2016() {
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
        <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
          <LineCircleDiagram />
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
      working: (
        <>
          <Katex display tex="\cos\theta = \frac{(-3)(0)+(0)(3)}{3\times 3} = 0" />
          <Katex display tex="\implies\; \theta = \frac{\pi}{2}" />
        </>
      ),
      reason: (
        <>
          Chord joins <Katex tex="(-2,0)" /> and <Katex tex="(1,3)" />; from centre <Katex tex="(1,0)" /> the
          vectors to these points are <Katex tex="(-3,0)" /> and <Katex tex="(0,3)" /> — use the dot product for
          the angle between them.
        </>
      ),
    },
    {
      working: <Katex display tex="\theta_{\text{major}} = 2\pi - \tfrac{\pi}{2} = \tfrac{3\pi}{2}" />,
      reason: "That's the angle for the minor segment, so the major segment's is the reflex angle.",
    },
    {
      working: (
        <Katex
          display
          tex="\text{Area} = \frac{1}{2}(3)^2\left(\frac{3\pi}{2} - \sin\frac{3\pi}{2}\right) = \frac{9}{2}\left(\frac{3\pi}{2}+1\right)"
        />
      ),
      reason: <>Segment area <Katex tex="=\tfrac{1}{2}r^2(\theta-\sin\theta)" />, with <Katex tex="r=3" />.</>,
    },
    {
      working: <Katex display tex="\boxed{\text{Area} = \dfrac{27\pi}{4} + \dfrac{9}{2} \text{ square units}}" />,
    },
  ]

  const rowsE: WorkingRow[] = [
    {
      working: (
        <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
          <LineCircleDiagram showRay />
        </div>
      ),
      reason: (
        <>
          Ray from the origin at angle <Katex tex="-\tfrac{3\pi}{4}" /> (i.e. <Katex tex="-135°" />), heading into
          the third quadrant.
        </>
      ),
    },
  ]

  const rowsF: WorkingRow[] = [
    {
      working: (
        <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
          <RayRangeDiagram />
        </div>
      ),
      reason: (
        <>
          The line through the origin parallel to <Katex tex="y=x+2" /> (dashed) splits the plane in two. A ray
          from the origin only reaches <Katex tex="y=x+2" /> at some <Katex tex="t>0" /> if it points into the{' '}
          <em>same</em> half as that line (shaded) — the example ray shown does. Pointing along the dashed line
          itself (<Katex tex="\theta=\tfrac{\pi}{4}" /> or <Katex tex="\theta=-\tfrac{3\pi}{4}" />, open circles)
          never meets it, since the ray stays exactly parallel.
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
      reason: <>Divide by <Katex tex="\pi" />, since <Katex tex="\theta = \alpha\pi" />.</>,
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (11 marks)</p>
        <p>A line in the complex plane is given by</p>
        <Katex display tex="|z-1| = |z+2-3i|, \quad z \in \mathbb{C}." className="my-2" />
      </div>

      <PartCard letter="a" marks={2} statement={<>Find the equation of this line in the form <Katex tex="y = mx + c" />.</>} examinerReport={EXAMINER_A}>
        <WorkingTable rows={rowsA} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={<>Find the points of intersection of the line <Katex tex="|z-1|=|z+2-3i|" /> with the circle <Katex tex="|z-1|=3" />.</>}
        examinerReport={EXAMINER_B}
      >
        <WorkingTable rows={rowsB} />
      </PartCard>

      <PartCard letter="c" marks={2} statement={<>Sketch both the line <Katex tex="|z-1|=|z+2-3i|" /> and the circle <Katex tex="|z-1|=3" /> on the Argand diagram.</>} examinerReport={EXAMINER_C}>
        <WorkingTable rows={rowsC} />
      </PartCard>

      <PartCard
        letter="d"
        marks={2}
        statement={<>The line <Katex tex="|z-1|=|z+2-3i|" /> cuts the circle <Katex tex="|z-1|=3" /> into two segments. Find the area of the major segment.</>}
        examinerReport={EXAMINER_D}
        videoSrc={VIDEO.d}
      >
        <WorkingTable rows={rowsD} />
      </PartCard>

      <PartCard letter="e" marks={1} statement={<>Sketch the ray given by <Katex tex="\mathrm{Arg}(z) = -\dfrac{3\pi}{4}" /> on the Argand diagram in part c.</>} examinerReport={EXAMINER_E} videoSrc={VIDEO.e}>
        <WorkingTable rows={rowsE} />
      </PartCard>

      <PartCard
        letter="f"
        marks={2}
        statement={<>Write down the range of values of <Katex tex="\alpha, \ \alpha \in \mathbb{R}" />, for which a ray with equation <Katex tex="\mathrm{Arg}(z) = \alpha\pi" /> intersects the line <Katex tex="|z-1|=|z+2-3i|" />.</>}
        examinerReport={EXAMINER_F}
        videoSrc={VIDEO.f}
      >
        <WorkingTable rows={rowsF} />
      </PartCard>
    </div>
  )
}

// Argand diagram: circle |z-1|=3 (centre (1,0), r=3) and the line y=x+2, intersecting at
// z=-2 and z=1+3i. Grid spans -4..4 on both axes (matching the original exam's diagram).
// `showRay` overlays the part-e ray Arg(z) = -3π/4 from the origin.
function LineCircleDiagram({ showRay = false }: { showRay?: boolean }) {
  return (
    <svg viewBox="0 0 300 300" width={260} height={260}>
      {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map(n => (
        <g key={n}>
          <line x1={150 + n * 30} y1={0} x2={150 + n * 30} y2={300} stroke="#e5e7eb" strokeWidth={1} />
          <line x1={0} y1={150 - n * 30} x2={300} y2={150 - n * 30} stroke="#e5e7eb" strokeWidth={1} />
        </g>
      ))}
      <line x1={0} y1={150} x2={300} y2={150} stroke="#9ca3af" strokeWidth={1.5} />
      <line x1={150} y1={0} x2={150} y2={300} stroke="#9ca3af" strokeWidth={1.5} />

      <circle cx={180} cy={150} r={90} fill="none" stroke="#38bdf8" strokeWidth={2} />
      <line x1={0} y1={240} x2={240} y2={0} stroke="#fb923c" strokeWidth={2} />

      <circle cx={90} cy={150} r={4.5} fill="#f97316" />
      <circle cx={180} cy={60} r={4.5} fill="#f97316" />
      <text x={64} y={144} fontSize={11} className="fill-gray-700 dark:fill-gray-300">−2</text>
      <text x={186} y={56} fontSize={11} className="fill-gray-700 dark:fill-gray-300">1+3i</text>

      {showRay && <line x1={150} y1={150} x2={0} y2={300} stroke="#dc2626" strokeWidth={2} />}
      {showRay && (
        <circle cx={150} cy={150} r={4.5} fill="white" className="dark:fill-gray-900" stroke="#dc2626" strokeWidth={2} />
      )}
      {showRay && (
        <text x={30} y={230} fontSize={11} className="fill-rose-600 dark:fill-rose-400">
          Arg(z) = −3π/4
        </text>
      )}
    </svg>
  )
}

// Argand diagram for part (f): the line y=x+2 (solid orange) together with the parallel line
// through the origin, y=x (dashed) — the boundary directions θ=π/4 and θ=−3π/4 where a ray
// from the origin runs exactly parallel and never reaches y=x+2. The shaded half-plane is
// where a ray must point to hit y=x+2 at some t>0; a single example ray (green) illustrates
// this, with an open circle at the origin (its argument is undefined there, as in part e) and
// a filled dot marking where it actually meets the line.
function RayRangeDiagram() {
  return (
    <svg viewBox="0 0 300 300" width={260} height={260}>
      {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map(n => (
        <g key={n}>
          <line x1={150 + n * 30} y1={0} x2={150 + n * 30} y2={300} stroke="#e5e7eb" strokeWidth={1} />
          <line x1={0} y1={150 - n * 30} x2={300} y2={150 - n * 30} stroke="#e5e7eb" strokeWidth={1} />
        </g>
      ))}
      <line x1={0} y1={150} x2={300} y2={150} stroke="#9ca3af" strokeWidth={1.5} />
      <line x1={150} y1={0} x2={150} y2={300} stroke="#9ca3af" strokeWidth={1.5} />

      {/* Shaded half-plane y > x — the directions a ray from the origin must point into. */}
      <path d="M 0 300 L 0 0 L 300 0 Z" fill="#38bdf8" fillOpacity={0.14} />

      {/* Boundary line through the origin, parallel to y = x + 2. */}
      <line x1={0} y1={300} x2={300} y2={0} stroke="#9ca3af" strokeWidth={2} strokeDasharray="6 5" />

      {/* The actual line y = x + 2. */}
      <line x1={0} y1={240} x2={240} y2={0} stroke="#fb923c" strokeWidth={2} />
      <text x={186} y={56} fontSize={11} className="fill-gray-700 dark:fill-gray-300">y = x + 2</text>

      {/* Open circles marking the excluded boundary angles θ = π/4 and θ = −3π/4. */}
      <circle cx={225} cy={75} r={4} fill="white" className="dark:fill-gray-900" stroke="#6b7280" strokeWidth={1.75} />
      <text x={231} y={72} fontSize={11} className="fill-gray-500 dark:fill-gray-400">θ = π/4</text>
      <circle cx={75} cy={225} r={4} fill="white" className="dark:fill-gray-900" stroke="#6b7280" strokeWidth={1.75} />
      <text x={20} y={244} fontSize={11} className="fill-gray-500 dark:fill-gray-400">θ = −3π/4</text>

      {/* Example valid ray at θ = 2π/3, into the shaded half — meets y = x + 2 at t ≈ 1.46. */}
      <line x1={150} y1={150} x2={117} y2={93} stroke="#22c55e" strokeWidth={2} />
      <circle cx={150} cy={150} r={4.5} fill="white" className="dark:fill-gray-900" stroke="#22c55e" strokeWidth={2} />
      <circle cx={128} cy={112} r={3.5} fill="#22c55e" />
      <text x={100} y={90} fontSize={11} className="fill-emerald-600 dark:fill-emerald-400">example ray</text>
    </svg>
  )
}
