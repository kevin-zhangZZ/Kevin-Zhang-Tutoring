// 2017 Specialist Mathematics — Exam 2, Section B, Question 4 (10 marks).
// z² + 4z + 16 = 0: polar form, the roots, a locus, the Argand sketch, and the major
// segment. Part (f) was answered correctly by 1% of the state. Question text transcribed
// from the original paper. Part e.'s polar Argand plane (circles of radius 1–5, spokes every
// 30°) is VCAA's own figure, cropped from the exam PDF at 300 dpi, with the answer drawn over it
// as an overlay (origin at (500.5, 535.5) in the crop, 77.68 px per unit, measured from the
// circles along several rays and checked with a PIL composite). An earlier version showed a
// matplotlib redraw on a Cartesian grid instead; replaced Sept 2026. Answers verified with
// sympy; they agree with the VCAA report and with itute (whose 4g adds the major sector and
// triangle OAB directly — the same 32π/3 + 4√3). Solution is original.
// Interactives: c. turning/flipping 2 − 2√3i onto the roots (spec-2017e2-q4c-symmetries);
// d./e. equal distances from 0 and 2 − 2√3i trace the line (spec-2017e2-q4d-bisector);
// f. b as a's mirror image in Re(z) = −2, with near-miss rules (spec-2017e2-q4f-mirror);
// g. segment = sector ∓ triangle as the chord slides (spec-2017e2-q4g-segment).
// Common Mistake boxes: a. (wrong quadrant), b. (verifying by substitution), c. (not in terms
// of 2 − 2√3i) and g. (sector angle 2π/3) — all from the examiner's report.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import argandSrc from './spec-2017e2-q4e-argand.png'

const SymmetriesWidget = lazyWidget(() => import('../interactives/spec-2017e2-q4c-symmetries'))
const BisectorWidget = lazyWidget(() => import('../interactives/spec-2017e2-q4d-bisector'))
const MirrorWidget = lazyWidget(() => import('../interactives/spec-2017e2-q4f-mirror'))
const SegmentWidget = lazyWidget(() => import('../interactives/spec-2017e2-q4g-segment'))

// Calibration of VCAA's polar Argand plane in the 1112 × 1015 crop.
const AX = 500.5
const AY = 535.5
const R = 77.68
const S3 = Math.sqrt(3)
const px = (x: number) => AX + x * R
const py = (y: number) => AY - y * R
const ORANGE = '#f97316'
const LABEL = { fontSize: 40, fill: '#c2410c', stroke: 'white', strokeWidth: 9, paintOrder: 'stroke' } as const
const LINE_X1 = 4 - 5 * S3 // where the line leaves the grid at Im(z) = −5
const LINE_X2 = 5.2

function ArgandAnswer() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[420px]">
        <img loading="lazy" decoding="async"
          src={argandSrc}
          alt="VCAA's polar Argand plane with the answer drawn over it: the line x − √3y − 4 = 0 rising gently through 4 on the real axis, and the roots −2 ± 2√3i where the circle of radius 4 meets the 120° and −120° spokes, the lower root lying on the line"
          className="w-full block"
        />
        <svg viewBox="0 0 1112 1015" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <line x1={px(LINE_X1)} y1={py((LINE_X1 - 4) / S3)} x2={px(LINE_X2)} y2={py((LINE_X2 - 4) / S3)} stroke={ORANGE} strokeWidth={7} />
          <circle cx={px(-2)} cy={py(2 * S3)} r={13} fill="#c2410c" />
          <circle cx={px(-2)} cy={py(-2 * S3)} r={13} fill="#c2410c" />
          <text x={px(-2) - 24} y={py(2 * S3) - 18} textAnchor="end" {...LABEL}>−2 + 2√3i</text>
          <text x={px(-2) - 26} y={py(-2 * S3) - 16} textAnchor="end" {...LABEL}>−2 − 2√3i</text>
          <text x={px(1.2)} y={py(-2.9)} {...LABEL}>x − √3y − 4 = 0</text>
        </svg>
      </div>
    </div>
  )
}

const EXAM_A: SAExaminerStats = {
  marks: [26, 74],
  average: 0.8,
  comment: (
    <>
      A number of incorrect answers had arguments outside the third quadrant, which should
      have alerted students to an error, given the signs of the real and imaginary parts. A
      diagram could have reminded students that the answer needed to be in the third
      quadrant.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [45, 55],
  average: 0.5,
  comment: (
    <>
      Correct solutions were obtained by using the quadratic formula or completing the
      square. Some students did not correctly follow the 'show that' instruction either by
      not showing key steps in their solution or by solely verifying the solutions given by
      substitution. Some students confused factors with solutions or did not proceed beyond
      factorising the quadratic.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [69, 31],
  average: 0.3,
  comment: (
    <>
      Misunderstanding of the question was apparent in student responses to this question.
      Many attempts at
      solutions were not expressed in terms of <Katex tex="2-2\sqrt3i" /> as required.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [20, 15, 65],
  average: 1.5,
  comment: (
    <>
      The solution shown above was the most common correct approach. A smaller proportion
      of students correctly applied a perpendicular bisector approach. The 'show that'
      instruction was generally followed.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [16, 31, 53],
  average: 1.4,
  comment: (
    <>
      Incorrect plotting of the line was the most common error. Students should ensure that
      points plotted are accurately placed and can be clearly seen.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [99, 1],
  average: 0.0,
  comment: (
    <>
      This question caused significant difficulty for students. While a variety of correct
      forms was accepted, very few correct answers were given.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [63, 14, 24],
  average: 0.6,
  comment: (
    <>
      A significant number of students incorrectly used a sector angle of{' '}
      <Katex tex="\tfrac{2\pi}{3}" />. Solutions using definite integrals were also seen;
      these solutions were usually completed correctly.
    </>
  ),
}


const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\left|-2-2\sqrt3i\right| = \sqrt{(-2)^2+\left(-2\sqrt3\right)^2} = \sqrt{16} = 4" />,
    reason: <>Modulus first: Pythagoras on the real and imaginary parts, the distance of the point from <Katex tex="O" />.</>,
  },
  {
    working: <Katex display tex="\tan^{-1}\!\left(\frac{2\sqrt3}{2}\right) = \tan^{-1}\!\left(\sqrt3\right) = \frac{\pi}{3}" />,
    reason: <>Use the <em>sizes</em> of the two parts, signs dropped, to get the acute angle the point makes with the real axis. Recognise <Katex tex="\tan\tfrac{\pi}{3}=\sqrt3" /> from the 30–60–90 triangle.</>,
  },
  {
    working: <Katex display tex="\operatorname{Re}<0,\ \operatorname{Im}<0 \implies \text{third quadrant}" />,
    reason: <>The signs decide the quadrant: left of the imaginary axis and below the real axis. A quick sketch of the point is the habit the report recommends, because it makes a wrong-quadrant answer obvious.</>,
  },
  {
    working: <Katex display tex="\operatorname{Arg}\!\left(-2-2\sqrt3i\right) = -\left(\pi-\frac{\pi}{3}\right) = -\frac{2\pi}{3}" />,
    reason: <>A third-quadrant point is reached by turning <em>clockwise</em> from the positive real axis, so its principal argument is negative: <Katex tex="\tfrac{\pi}{3}" /> short of <Katex tex="-\pi" />. This keeps it in <Katex tex="(-\pi,\pi]" />.</>,
  },
  {
    working: <Katex display tex="\boxed{4\operatorname{cis}\!\left(-\frac{2\pi}{3}\right)}" />,
    reason: <>Equivalently <Katex tex="4\operatorname{cis}\!\left(\tfrac{4\pi}{3}\right)" />, though the principal argument is the usual convention.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="z = \frac{-4\pm\sqrt{4^2-4(1)(16)}}{2(1)}" />,
    reason: <>A "show that" wants the roots <em>derived</em>, so start from the equation with the quadratic formula. Completing the square, <Katex tex="(z+2)^2=-12" />, is equally good.</>,
  },
  {
    working: <Katex display tex="= \frac{-4\pm\sqrt{-48}}{2}" />,
    reason: <><Katex tex="16-64=-48" />. A negative discriminant means no real roots: the roots are a conjugate pair.</>,
  },
  {
    working: <Katex display tex="\sqrt{-48} = \sqrt{48}\,i = 4\sqrt3\,i" />,
    reason: <>Since <Katex tex="48=16\times3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z = \frac{-4\pm4\sqrt3i}{2} = -2\pm2\sqrt3i}" />,
    reason: <>Halving both terms. Every line above is needed: the report says solely verifying the given roots by substitution did not follow the instruction. As required.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{let } w = 2-2\sqrt3i" />,
    reason: <>Name the given number. An answer "in terms of" it must actually use it.</>,
  },
  {
    working: <Katex display tex="\text{roots: } -2+2\sqrt3i,\quad -2-2\sqrt3i" />,
    reason: <>How would I know what to do to <Katex tex="w" />? Compare: the roots have the same sizes of parts, <Katex tex="2" /> and <Katex tex="2\sqrt3" />, only different signs. Changing signs is exactly what negating (both signs) and conjugating (the imaginary sign only) do.</>,
  },
  {
    working: <Katex display tex="-w = -2+2\sqrt3i" />,
    reason: <>Negating flips both signs, which gives one root. On the Argand plane it is a half-turn about <Katex tex="O" />.</>,
  },
  {
    working: <Katex display tex="\bar w = 2+2\sqrt3i \implies -\bar w = -2-2\sqrt3i" />,
    reason: <>Conjugate (flip in the real axis), then negate. That gives the other root, as it must: the roots of a real quadratic are conjugates, and <Katex tex="-\bar w" /> is the conjugate of <Katex tex="-w" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z = -\left(2-2\sqrt3i\right),\ \ z = -\overline{\left(2-2\sqrt3i\right)}}" />,
    reason: <>That is, <Katex tex="z=-w" /> and <Katex tex="z=-\bar w" />. The report says many attempts were not expressed in terms of <Katex tex="2-2\sqrt3i" /> as required.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="|z| = \left|z-\left(2-2\sqrt3i\right)\right|" />,
    reason: <>Read <Katex tex="|z-c|" /> as the distance from <Katex tex="z" /> to <Katex tex="c" />. So this says <Katex tex="z" /> is as far from <Katex tex="0" /> as from <Katex tex="2-2\sqrt3i" />, which already tells you the locus is a line: the perpendicular bisector of those two points.</>,
  },
  {
    working: <Katex display tex="x^2+y^2 = (x-2)^2+\left(y+2\sqrt3\right)^2" />,
    reason: <>Put <Katex tex="z=x+yi" />, so <Katex tex="z-\left(2-2\sqrt3i\right)=(x-2)+\left(y+2\sqrt3\right)i" />, and square both moduli. Squaring is safe because both sides are non-negative.</>,
  },
  {
    working: <Katex display tex="x^2+y^2 = x^2-4x+4+y^2+4\sqrt3y+12" />,
    reason: <>Expanding. Note <Katex tex="\left(2\sqrt3\right)^2=12" />.</>,
  },
  {
    working: <Katex display tex="0 = -4x+4\sqrt3y+16" />,
    reason: <>The <Katex tex="x^2" /> and <Katex tex="y^2" /> cancel, which is why an "equal distances from two points" locus always comes out as a straight line.</>,
  },
  {
    working: <Katex display tex="\boxed{x-\sqrt3y-4 = 0}" />,
    reason: <>Dividing by <Katex tex="-4" />. Quick check: the midpoint <Katex tex="1-\sqrt3i" /> of the two fixed points must be on the bisector, and <Katex tex="1-\sqrt3\left(-\sqrt3\right)-4=0" /> ✓. As required.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="x-\sqrt3y-4=0 \iff y = \frac{1}{\sqrt3}(x-4)" />,
    reason: <>Gradient <Katex tex="\tfrac{1}{\sqrt3}=\tan\tfrac{\pi}{6}" />, so the line rises at <Katex tex="30^\circ" />: parallel to the grid&apos;s <Katex tex="30^\circ" /> spoke.</>,
  },
  {
    working: <Katex display tex="\text{intercepts } 4 \text{ and } -\tfrac{4}{\sqrt3}i\approx-2.31i" />,
    reason: <>Two accurate points are enough to rule the line: <Katex tex="(4,0)" /> and <Katex tex="\left(0,-\tfrac{4\sqrt3}{3}\right)" />.</>,
  },
  {
    working: <Katex display tex="-2\pm2\sqrt3i = 4\operatorname{cis}\!\left(\pm\frac{2\pi}{3}\right)" />,
    reason: <>Part a. has already located the roots. On this polar grid each is where the circle of radius <Katex tex="4" /> meets the <Katex tex="120^\circ" /> or <Katex tex="-120^\circ" /> spoke, so no estimating <Katex tex="2\sqrt3\approx3.46" /> is needed.</>,
  },
  {
    working: <ArgandAnswer />,
    reason: <>The lower root lies exactly on the line, since <Katex tex="-2-\sqrt3\left(-2\sqrt3\right)-4=0" />. An accurate line passes right through it. The report says incorrect plotting of the line was the most common error.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\text{roots } -2\pm2\sqrt3i \implies \text{line } \operatorname{Re}(z)=-2" />,
    reason: <>Both roots have real part <Katex tex="-2" />, so the line through them is vertical.</>,
  },
  {
    working: <Katex display tex="|z-a| = |z-b|:\ \text{perpendicular bisector of } a,\,b" />,
    reason: <>Part d. in reverse. So the question is: which pairs <Katex tex="a,b" /> have <Katex tex="\operatorname{Re}(z)=-2" /> as their perpendicular bisector? Answer: <Katex tex="b" /> must be <Katex tex="a" />&apos;s mirror image in that line.</>,
  },
  {
    working: <Katex display tex="\operatorname{Im}(b) = \operatorname{Im}(a)" />,
    reason: <>The bisector is vertical, so the segment from <Katex tex="a" /> to <Katex tex="b" /> must be horizontal.</>,
  },
  {
    working: <Katex display tex="\frac{\operatorname{Re}(a)+\operatorname{Re}(b)}{2} = -2" />,
    reason: <>The midpoint of <Katex tex="a" /> and <Katex tex="b" /> has to lie on the line.</>,
  },
  {
    working: <Katex display tex="b = \bigl(-4-\operatorname{Re}(a)\bigr)+\operatorname{Im}(a)\,i" />,
    reason: <>Solving for <Katex tex="\operatorname{Re}(b)" /> and assembling the two conditions.</>,
  },
  {
    working: <Katex display tex="\boxed{b = -4-\bar a}" />,
    reason: <>Because <Katex tex="-\bar a = -\operatorname{Re}(a)+\operatorname{Im}(a)\,i" />: conjugating then negating leaves the imaginary part unchanged. Check with <Katex tex="a=0" />: <Katex tex="b=-4" />, and the bisector of <Katex tex="0" /> and <Katex tex="-4" /> is <Katex tex="\operatorname{Re}(z)=-2" /> ✓.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="|z|=4 \text{ meets } \operatorname{Re}(z)=-2 \text{ at } -2\pm2\sqrt3i" />,
    reason: <>The two roots are on the circle, since <Katex tex="\sqrt{4+12}=4" />, so the chord is the segment joining them. Sketch it: <Katex tex="O" /> is to the right of the chord, inside the bigger piece.</>,
  },
  {
    working: <Katex display tex="\operatorname{Arg}\left(-2\pm2\sqrt3i\right) = \pm\frac{2\pi}{3}" />,
    reason: <>From part a. (and its conjugate). The minor arc between them, through <Katex tex="-4" />, subtends <Katex tex="\tfrac{2\pi}{3}" /> at <Katex tex="O" />.</>,
  },
  {
    working: <Katex display tex="\theta = 2\pi-\frac{2\pi}{3} = \frac{4\pi}{3}" />,
    reason: <>The major segment is bounded by the major arc, which goes the long way round, through <Katex tex="4" />. Using <Katex tex="\tfrac{2\pi}{3}" /> here was the report&apos;s common error.</>,
  },
  {
    working: <Katex display tex="A = \frac12 r^2\bigl(\theta-\sin\theta\bigr) = \frac12(16)\left(\frac{4\pi}{3}-\sin\frac{4\pi}{3}\right)" />,
    reason: <>Segment = sector minus triangle, and this formula holds for <Katex tex="\theta>\pi" /> too.</>,
    more: <>See the Background above.</>,
  },
  {
    working: <Katex display tex="\sin\frac{4\pi}{3} = -\frac{\sqrt3}{2}" />,
    reason: <>Third quadrant, reference angle <Katex tex="\tfrac{\pi}{3}" />. The negative sine is what makes the triangle term <em>add</em> for a major segment.</>,
  },
  {
    working: <Katex display tex="A = 8\left(\frac{4\pi}{3}+\frac{\sqrt3}{2}\right) = \boxed{\frac{32\pi}{3}+4\sqrt3}" />,
    reason: <>About <Katex tex="40.4" />. Sanity check: the whole disc is <Katex tex="16\pi\approx50.3" /> and half of it is <Katex tex="25.1" />, so a major segment of about four-fifths of the disc is right.</>,
  },
]

export default function SpecialistQ4_2017Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (10 marks)</p>
      </div>

      <PartCard letter="a" topic="Polar Form" marks={1} statement={<>Express <Katex tex="-2-2\sqrt3i" /> in polar form.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Arg = tan⁻¹(y/x), so it's tan⁻¹(√3) = π/3"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\tan^{-1}\!\left(\frac{-2\sqrt3}{-2}\right) = \tan^{-1}\!\left(\sqrt3\right) = \frac{\pi}{3}" />
              <Katex display tex="\implies 4\operatorname{cis}\!\left(\frac{\pi}{3}\right) = 2+2\sqrt3i" />
            </>
          }
        >
          The two minus signs cancel inside the fraction, so <Katex tex="\tan^{-1}" /> can&apos;t tell the third quadrant
          from the first: it only ever returns angles in <Katex tex="\left(-\tfrac{\pi}{2},\tfrac{\pi}{2}\right)" />. The
          report says a number of answers had arguments outside the third quadrant. Catch it by converting back: this
          answer is <Katex tex="2+2\sqrt3i" />, the point diagonally opposite.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Complex Quadratic"
        marks={1}
        statement={
          <>
            Show that the roots of <Katex tex="z^2+4z+16=0" /> are{' '}
            <Katex tex="z=-2-2\sqrt3i" /> and <Katex tex="z=-2+2\sqrt3i" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Substitute each given root and check it gives 0"
          source="Examiner's report"
          working={<Katex display tex="\left(-8-8\sqrt3i\right)+\left(-8+8\sqrt3i\right)+16 = 0" />}
        >
          Every line of that check is true, but it only confirms numbers someone handed you. It doesn&apos;t
          derive them from the equation, which is what &ldquo;show that the roots are&rdquo; asks. The report says
          solely verifying by substitution did not follow the instruction. Solve the quadratic instead.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Roots"
        marks={1}
        statement={
          <>
            Express the roots of <Katex tex="z^2+4z+16=0" /> in terms of{' '}
            <Katex tex="2-2\sqrt3i" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="Turning and flipping 2 − 2√3i onto the two roots">
          <SymmetriesWidget />
        </Explore>
        <WrongMethod
          title="Just write the roots out again: z = −2 ± 2√3i"
          source="Examiner's report"
          working={<Katex display tex="z = -2\pm2\sqrt3i" />}
        >
          True, but it&apos;s part b.&apos;s answer again and never mentions <Katex tex="2-2\sqrt3i" />, so it doesn&apos;t
          answer this question. &ldquo;In terms of&rdquo; means the given number must appear, operated on: negated,
          conjugated, rotated. The report says many attempts were not expressed in terms of{' '}
          <Katex tex="2-2\sqrt3i" /> as required.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d"
        topic="Line Locus"
        marks={2}
        statement={
          <>
            Show that the cartesian form of the relation{' '}
            <Katex tex="|z| = \left|z-\left(2-2\sqrt3i\right)\right|" /> is{' '}
            <Katex tex="x-\sqrt3y-4=0" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
        <Explore title="Equally far from 0 and from 2 − 2√3i: the points form one line">
          <BisectorWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="e"
        topic="Sketch Loci"
        marks={2}
        statement={
          <>
            Sketch the line represented by <Katex tex="x-\sqrt3y-4=0" /> and plot the roots
            of <Katex tex="z^2+4z+16=0" /> on the Argand diagram below.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Line Locus"
        marks={1}
        statement={
          <>
            The equation of the line passing through the two roots of{' '}
            <Katex tex="z^2+4z+16=0" /> can be expressed as <Katex tex="|z-a|=|z-b|" />,
            where <Katex tex="a,b\in C" />. Find <Katex tex="b" /> in terms of{' '}
            <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_F}
      >
        <Background title="Running a locus backwards">
          <p>
            Part d. went forwards: given a relation of the form{' '}
            <Katex tex="|z-a|=|z-b|" />, find the line. This one runs backwards: the line is known, and you have to say
            which pairs of points produce it.
          </p>
          <p>
            Two conditions do it. The segment joining <Katex tex="a" /> and{' '}
            <Katex tex="b" /> must be perpendicular to the line, and the midpoint of{' '}
            <Katex tex="a" /> and <Katex tex="b" /> must lie on it. Together they say <Katex tex="b" /> is the mirror
            image of <Katex tex="a" /> in the line. With a vertical line those say: same imaginary part, and real parts
            averaging to <Katex tex="-2" />.
          </p>
          <p>
            Only <Katex tex="1\%" /> of students scored this mark. It is not hard once you see
            what is being asked; the difficulty is in reading the question.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
        <Explore title="b has to be a's mirror image in the line through the roots">
          <MirrorWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="g"
        topic="Segment Area"
        marks={2}
        statement={
          <>
            Find the area of the major segment bounded by the line passing through the roots
            of <Katex tex="z^2+4z+16=0" /> and the major arc of the circle given by{' '}
            <Katex tex="|z|=4" />.
          </>
        }
        examinerReport={EXAM_G}
      >
        <Background title="Segments bigger than a semicircle">
          <p>
            A segment is a sector with the triangle <Katex tex="OAB" /> (centre and the two chord ends) taken into
            account: <Katex tex="A=\tfrac12r^2\theta-\tfrac12r^2\sin\theta" />, where <Katex tex="\theta" /> is the angle
            the segment&apos;s own arc subtends at the centre.
          </p>
          <p>
            For a minor segment the triangle sticks out of it and is subtracted. For a major segment the centre is
            inside the segment, so the triangle is <em>part of</em> it and must be added. You don&apos;t need two
            formulas: when <Katex tex="\theta>\pi" />, <Katex tex="\sin\theta<0" />, and the minus sign turns into a plus
            by itself.
          </p>
        </Background>
        <WorkingTable rows={ROWS_G} />
        <Explore title="One formula for both segments: sin θ turns negative past π">
          <SegmentWidget />
        </Explore>
        <WrongMethod
          title="The angle between the two roots is 2π/3, so use that"
          source="Examiner's report"
          working={<Katex display tex="\frac12(16)\left(\frac{2\pi}{3}-\sin\frac{2\pi}{3}\right) = \frac{16\pi}{3}-4\sqrt3 \approx 9.83" />}
        >
          <Katex tex="\tfrac{2\pi}{3}" /> is the angle of the <em>minor</em> arc, so this is the area of the small segment
          on the far side of the chord. The report says a significant number of students used this sector angle. Catch
          it with a size check: a major segment is more than half the disc, <Katex tex="8\pi\approx25.1" />, and{' '}
          <Katex tex="9.83" /> isn&apos;t.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
