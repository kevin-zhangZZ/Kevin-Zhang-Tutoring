// 2016 Specialist Mathematics — Exam 2, Question 2 (11 marks).
// A line and circle in the complex plane, their intersection, a segment area, and a ray range.
// Question text transcribed from the original paper; worked solutions below are original.
// No video walkthrough yet — the tutor will record and add these later.

import Katex from '../../../components/Katex'
import { PartCard, Step } from '../QuestionParts'

export default function SpecialistQ2_2016() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (11 marks)</p>
        <p>A line in the complex plane is given by</p>
        <Katex display tex="|z-1| = |z+2-3i|, \quad z \in \mathbb{C}." className="my-2" />
      </div>

      <PartCard letter="a" marks={2} statement={<>Find the equation of this line in the form <Katex tex="y = mx + c" />.</>}>
        <Step n={1}>
          Let <Katex tex="z = x + iy" />. Then <Katex tex="|z-1|" /> is the distance to <Katex tex="(1,0)" /> and{' '}
          <Katex tex="|z+2-3i|" /> is the distance to <Katex tex="(-2,3)" />, so the line is the perpendicular
          bisector of the segment joining these two points. Squaring both distances:
          <Katex display tex="(x-1)^2+y^2 = (x+2)^2+(y-3)^2" className="my-2" />
        </Step>
        <Step n={2}>
          Expand and simplify:
          <Katex
            display
            tex="x^2-2x+1+y^2 = x^2+4x+4+y^2-6y+9 \;\implies\; -6x+6y-12=0"
            className="my-2"
          />
        </Step>
        <Step n={3} final>
          Divide by 6:
          <Katex display tex="\boxed{y = x + 2}" className="my-2" />
        </Step>
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={<>Find the points of intersection of the line <Katex tex="|z-1|=|z+2-3i|" /> with the circle <Katex tex="|z-1|=3" />.</>}
      >
        <Step n={1}>
          The circle <Katex tex="|z-1|=3" /> is <Katex tex="(x-1)^2+y^2=9" />. Substitute <Katex tex="y=x+2" />:
          <Katex display tex="(x-1)^2+(x+2)^2=9 \;\implies\; 2x^2+2x-4=0 \;\implies\; x^2+x-2=0" className="my-2" />
        </Step>
        <Step n={2}>
          Factorise:
          <Katex display tex="(x+2)(x-1)=0 \;\implies\; x=-2 \text{ or } x=1" className="my-2" />
        </Step>
        <Step n={3} final>
          With <Katex tex="y=x+2" />: <Katex tex="x=-2 \Rightarrow y=0" />, and <Katex tex="x=1 \Rightarrow y=3" />.
          <Katex display tex="\boxed{z = -2 \ \text{ and } \ z = 1+3i}" className="my-2" />
        </Step>
      </PartCard>

      <PartCard letter="c" marks={2} statement={<>Sketch both the line <Katex tex="|z-1|=|z+2-3i|" /> and the circle <Katex tex="|z-1|=3" /> on the Argand diagram.</>}>
        <Step n={1} final>
          The circle has centre <Katex tex="(1,0)" /> and radius 3; the line <Katex tex="y=x+2" /> cuts through it
          at the two points found in part b:
          <div className="mt-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
            <LineCircleDiagram />
          </div>
        </Step>
      </PartCard>

      <PartCard
        letter="d"
        marks={2}
        statement={<>The line <Katex tex="|z-1|=|z+2-3i|" /> cuts the circle <Katex tex="|z-1|=3" /> into two segments. Find the area of the major segment.</>}
      >
        <Step n={1}>
          The chord joins <Katex tex="(-2,0)" /> and <Katex tex="(1,3)" />. From the centre <Katex tex="(1,0)" />,
          the vectors to these points are <Katex tex="(-3,0)" /> and <Katex tex="(0,3)" />:
          <Katex display tex="\cos\theta = \frac{(-3)(0)+(0)(3)}{3\times 3} = 0 \;\implies\; \theta = \frac{\pi}{2}" className="my-2" />
        </Step>
        <Step n={2}>
          That's the angle for the <em>minor</em> segment, so the major segment's angle is <Katex tex="2\pi - \tfrac{\pi}{2} = \tfrac{3\pi}{2}" />.
          Using segment area <Katex tex="=\tfrac{1}{2}r^2(\theta-\sin\theta)" /> with <Katex tex="r=3" />:
          <Katex
            display
            tex="\text{Area} = \frac{1}{2}(3)^2\left(\frac{3\pi}{2} - \sin\frac{3\pi}{2}\right) = \frac{9}{2}\left(\frac{3\pi}{2}+1\right)"
            className="my-2"
          />
        </Step>
        <Step n={3} final>
          <Katex display tex="\boxed{\text{Area} = \dfrac{27\pi}{4} + \dfrac{9}{2} \approx 25.71 \text{ square units}}" className="my-2" />
        </Step>
      </PartCard>

      <PartCard letter="e" marks={1} statement={<>Sketch the ray given by <Katex tex="\mathrm{Arg}(z) = -\dfrac{3\pi}{4}" /> on the Argand diagram in part c.</>}>
        <Step n={1} final>
          A ray from the origin at angle <Katex tex="-\tfrac{3\pi}{4}" /> (i.e. <Katex tex="-135°" />), heading into
          the third quadrant:
          <div className="mt-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
            <LineCircleDiagram showRay />
          </div>
        </Step>
      </PartCard>

      <PartCard
        letter="f"
        marks={2}
        statement={<>Write down the range of values of <Katex tex="\alpha, \ \alpha \in \mathbb{R}" />, for which a ray with equation <Katex tex="\mathrm{Arg}(z) = \alpha\pi" /> intersects the line <Katex tex="|z-1|=|z+2-3i|" />.</>}
      >
        <Step n={1}>
          Write the ray as <Katex tex="(t\cos\theta, t\sin\theta)" /> for <Katex tex="t \ge 0" />, where{' '}
          <Katex tex="\theta = \alpha\pi" />. It meets <Katex tex="y=x+2" /> when:
          <Katex display tex="t\sin\theta = t\cos\theta + 2 \;\implies\; t = \frac{2}{\sin\theta - \cos\theta}" className="my-2" />
        </Step>
        <Step n={2}>
          This needs <Katex tex="t > 0" />, i.e. <Katex tex="\sin\theta > \cos\theta" />, i.e.{' '}
          <Katex tex="\sqrt{2}\sin\!\left(\theta - \tfrac{\pi}{4}\right) > 0" />. The two boundary directions —
          where the ray is exactly parallel to the line — are <Katex tex="\theta = \tfrac{\pi}{4}" /> and{' '}
          <Katex tex="\theta = -\tfrac{3\pi}{4}" />; solving the inequality on <Katex tex="\theta \in (-\pi, \pi]" />
          gives:
          <Katex display tex="\theta \in \left(-\pi, -\tfrac{3\pi}{4}\right) \cup \left(\tfrac{\pi}{4}, \pi\right]" className="my-2" />
        </Step>
        <Step n={3} final>
          Divide by <Katex tex="\pi" /> (since <Katex tex="\theta = \alpha\pi" />):
          <Katex display tex="\boxed{\alpha \in \left(-1, -\tfrac{3}{4}\right) \cup \left(\tfrac{1}{4}, 1\right]}" className="my-2" />
        </Step>
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
      {/* grid */}
      {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map(n => (
        <g key={n}>
          <line x1={150 + n * 30} y1={0} x2={150 + n * 30} y2={300} stroke="#e5e7eb" strokeWidth={1} />
          <line x1={0} y1={150 - n * 30} x2={300} y2={150 - n * 30} stroke="#e5e7eb" strokeWidth={1} />
        </g>
      ))}
      {/* axes */}
      <line x1={0} y1={150} x2={300} y2={150} stroke="#9ca3af" strokeWidth={1.5} />
      <line x1={150} y1={0} x2={150} y2={300} stroke="#9ca3af" strokeWidth={1.5} />

      {/* circle |z-1|=3 */}
      <circle cx={180} cy={150} r={90} fill="none" stroke="#38bdf8" strokeWidth={2} />
      {/* line y=x+2, clipped to the box */}
      <line x1={0} y1={240} x2={240} y2={0} stroke="#fb923c" strokeWidth={2} />

      {/* intersection points */}
      <circle cx={90} cy={150} r={4.5} fill="#f97316" />
      <circle cx={180} cy={60} r={4.5} fill="#f97316" />
      <text x={64} y={144} fontSize={11} className="fill-gray-700 dark:fill-gray-300">−2</text>
      <text x={186} y={56} fontSize={11} className="fill-gray-700 dark:fill-gray-300">1+3i</text>

      {showRay && <line x1={150} y1={150} x2={0} y2={300} stroke="#dc2626" strokeWidth={2} />}
      {showRay && (
        <text x={30} y={230} fontSize={11} className="fill-rose-600 dark:fill-rose-400">
          Arg(z) = −3π/4
        </text>
      )}
    </svg>
  )
}
