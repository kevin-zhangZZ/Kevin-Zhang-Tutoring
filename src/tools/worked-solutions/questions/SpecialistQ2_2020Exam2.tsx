// 2020 Specialist Mathematics — Exam 2, Section B Question 2 (11 marks). A perpendicular
// bisector in the complex plane, a ray, and the circle through three given points.
// Question text transcribed from the original paper. The Argand diagram is VCAA's own blank
// grid, cropped from the official exam PDF at 300 dpi, with the part b. and d.i. answers drawn
// over it (origin at (583.5, 605.5) in the crop; 77.5 px per unit across and 72.67 px per unit
// up, read from the gridlines, which are not square). The part b. overlay shows the points and
// the line; the part d.i. overlay adds the ray, with u ringed as in the report's own diagram.
// Three interactive widgets: part c. (drag z and watch |z − u| and |z − v| become equal exactly
// on the perpendicular bisector), part d.ii. (slide z along y = x + 1 and watch Arg(z − u) jump
// from π/4 to −3π/4 as x passes −2, which is why the domain is needed) and part e. (drag the
// centre: each of the two linear equations is a perpendicular bisector, and the centre is where
// they cross). Answers checked with sympy and against the VCAA examination report and itute.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import argandSrc from './spec-2020e2-q2b-argand.png'

const BisectorWidget = lazyWidget(() => import('../interactives/spec-2020e2-q2c-bisector'))
const RayWidget = lazyWidget(() => import('../interactives/spec-2020e2-q2d-ray'))
const CentreWidget = lazyWidget(() => import('../interactives/spec-2020e2-q2e-centre'))

// Overlay geometry for VCAA's grid (crop is 1290 × 1150 px).
const ORANGE = '#f97316'
const DARK = '#c2410c'
const px = (x: number) => 583.5 + 77.5 * x
const py = (y: number) => 605.5 - 72.67 * y
const LABEL = { fontSize: 46, fontStyle: 'italic', fill: DARK, stroke: 'white', strokeWidth: 9, paintOrder: 'stroke' } as const

const ALT = {
  b: "VCAA's Argand diagram with the answer to part b. drawn over it: the points u at (−2, −1) and v at (−4, −3), and the line y = −x − 5 through (−5, 0) and (0, −5)",
  d: "VCAA's Argand diagram with the answers to parts b. and d.i.: the points u and v, the line y = −x − 5, and the ray Arg(z − u) = π/4 leaving u up and to the right through (0, 1), with u ringed because it is not on the ray",
}

function ArgandAnswer({ stage }: { stage: 'b' | 'd' }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[420px]">
        <img src={argandSrc} alt={ALT[stage]} className="w-full block" />
        <svg viewBox="0 0 1290 1150" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <line x1={px(-6.5)} y1={py(1.5)} x2={px(1.5)} y2={py(-6.5)} stroke={ORANGE} strokeWidth={7} />
          {stage === 'd' && (
            <line x1={px(-2) + 17.5} y1={py(-1) - 16.4} x2={px(5.5)} y2={py(6.5)} stroke={ORANGE} strokeWidth={7} />
          )}
          <circle cx={px(-4)} cy={py(-3)} r={12} fill={DARK} />
          <circle cx={px(-2)} cy={py(-1)} r={12} fill={DARK} />
          {stage === 'd' && <circle cx={px(-2)} cy={py(-1)} r={24} fill="none" stroke={DARK} strokeWidth={5} />}
          <text x={px(-2) + 20} y={py(-1) + 56} {...LABEL}>
            u
          </text>
          <text x={px(-4) - 26} y={py(-3) + 16} textAnchor="end" {...LABEL}>
            v
          </text>
        </svg>
      </div>
    </div>
  )
}

const EXAM_A: SAExaminerStats = {
  marks: [9, 7, 7, 77],
  average: 2.5,
  comment: (
    <>
      Most students were able to set up modulus expressions and successfully solve for{' '}
      <Katex tex="y" /> with or without the use of technology. Students who used a geometric
      approach were generally less successful.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [8, 18, 74],
  average: 1.7,
  comment: (
    <>
      This question was generally done well. Some students who were unable to find the
      cartesian form in Question 2a. were still able to plot the relation using their geometric
      understanding.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [46, 54],
  average: 0.5,
  comment: (
    <>
      A variety of reasonable responses were accepted. Insufficiently precise responses such
      as 'a linear line' or responses that did not explicitly interpret the line in relation
      to the points were not accepted.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [45, 55],
  average: 0.5,
  comment: (
    <>
      Incorrect responses frequently extended through the point representing{' '}
      <Katex tex="u" />; in some cases, a line was sketched instead of a ray.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [75, 25],
  average: 0.2,
  comment: (
    <>
      While a high proportion of students gave the correct rule, many did not fully describe
      the function as they did not include the domain.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [52, 10, 7, 32],
  average: 1.2,
  comment: (
    <>
      Students struggled with this question. While many were able to set up suitable
      cartesian or complex equations, fewer were then able to proceed further. Students familiar
      with the functionality of CAS were able to use it effectively. Some students correctly
      found <Katex tex="z_c" /> but did not also state the radius.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="z = x+yi, \quad u = -2-i, \quad v = -4-3i" />,
    reason: <>Whenever a relation involving <Katex tex="z" /> has to become a cartesian equation, put <Katex tex="z=x+yi" />: every modulus then turns into a square root of real numbers. The report notes that students who used a geometric approach were generally less successful, so do the algebra and use the picture as a check.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}|z-u| = |(x+2)+(y+1)i| \\ |z-v| = |(x+4)+(y+3)i|\end{gathered}" />,
    reason: <>Group the real parts and the imaginary parts before taking the modulus. The signs are where marks go: <Katex tex="x-(-2)=x+2" /> and <Katex tex="y-(-1)=y+1" />.</>,
  },
  {
    working: <Katex display tex="(x+2)^2+(y+1)^2 = (x+4)^2+(y+3)^2" />,
    reason: <>Using <Katex tex="|a+bi|=\sqrt{a^2+b^2}" /> on both sides, then squaring. Both sides are distances, so neither is negative and squaring loses nothing.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}x^2+4x+4+y^2+2y+1 \\ = x^2+8x+16+y^2+6y+9\end{gathered}" />,
    reason: <>The <Katex tex="x^2" /> and <Katex tex="y^2" /> terms appear once on each side and cancel. That is why the answer is a straight line rather than a circle: it happens whenever the two moduli are simply set equal.</>,
  },
  {
    working: <Katex display tex="4x+2y+5 = 8x+6y+25 \implies 4x+4y+20 = 0" />,
    reason: <>Collect everything on one side.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -x-5}" />,
    reason: <>Divide by 4 and make <Katex tex="y" /> the subject, as the question asks: <Katex tex="m=-1" />, <Katex tex="c=-5" />. Quick check: the midpoint of <Katex tex="u" /> and <Katex tex="v" />, <Katex tex="(-3,-2)" />, is obviously the same distance from both, and <Katex tex="-2=-(-3)-5" /> ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="u = -2-i \to (-2,-1), \quad v = -4-3i \to (-4,-3)" />,
    reason: <>Real part across, imaginary part up. Mark and label both points: the question asks for the points as well as the relation.</>,
  },
  {
    working: <Katex display tex="y = -x-5: \ \text{through } (0,-5) \text{ and } (-5,0)" />,
    reason: <>The two intercepts are the easiest points to plot. Rule the line right across the grid: it has no endpoints.</>,
  },
  {
    working: <ArgandAnswer stage="b" />,
    reason: <>Check it looks like the perpendicular bisector: the line passes through the midpoint <Katex tex="(-3,-2)" /> of <Katex tex="uv" />, and <Katex tex="uv" /> has gradient 1, perpendicular to the line's gradient <Katex tex="-1" /> ✓. The report notes some students who could not find the cartesian form in 2a. still plotted the relation from this geometric understanding.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}|z-u| = |z-v| \\ \iff z \text{ is as far from } u \text{ as from } v\end{gathered}" />,
    reason: <>Read each modulus as a distance (see the Background in part a.). The phrase &lsquo;in relation to the points&rsquo; tells you the answer must mention <Katex tex="u" /> and <Katex tex="v" />, not just describe the line.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{\begin{gathered}\text{the perpendicular bisector of the line}\\ \text{segment joining } u \text{ and } v\end{gathered}}"
      />
    ),
    reason: <>The points equally far from two fixed points form the line that cuts the segment between them in half, at right angles. Both halves of the phrase matter: <em>perpendicular bisector</em>, and <em>of the segment joining u and v</em>. Say it the right way round: the line bisects the segment, not the other way. The report notes insufficiently precise responses such as &lsquo;a linear line&rsquo;, or ones that did not relate the line to the points, were not accepted.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{Arg}(z-u) = \tfrac\pi4" />,
    reason: <><Katex tex="z-u" /> is the arrow from <Katex tex="u" /> to <Katex tex="z" />, and its argument is the angle that arrow makes with the positive real direction. So the locus is every point you can reach by leaving <Katex tex="u" /> at <Katex tex="45^\circ" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\text{a ray from } u(-2,-1) \text{ at } 45^\circ\text{,} \\ \text{up and to the right only}\end{gathered}" />,
    reason: <>One direction only. Below and to the left of <Katex tex="u" />, the arrow from <Katex tex="u" /> to <Katex tex="z" /> points the opposite way, with argument <Katex tex="-\tfrac{3\pi}{4}" />. And <Katex tex="\operatorname{Arg}(0)" /> is undefined, so <Katex tex="u" /> itself is not on the ray: show it with an open circle. The report notes incorrect responses frequently extended through <Katex tex="u" />, and some sketched a line instead of a ray.</>,
  },
  {
    working: <ArgandAnswer stage="d" />,
    reason: <>Drawn on the part b. diagram, as the question asks, through <Katex tex="(0,1)" /> and <Katex tex="(1,2)" />. <Katex tex="u" /> is already plotted from part b., so ring it to show the ray starts there but does not include it, as the report's own diagram does.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\tan\!\left(\tfrac\pi4\right) = 1 \implies \text{gradient } 1" />,
    reason: <>The argument is the angle the ray makes with the positive real direction, and a line at angle <Katex tex="\theta" /> to the positive <Katex tex="x" />-direction has gradient <Katex tex="\tan\theta" />.</>,
  },
  {
    working: <Katex display tex="y-(-1) = 1\left(x-(-2)\right) \implies y = x+1" />,
    reason: <>Point–gradient form through <Katex tex="u" />, where the ray starts.</>,
  },
  {
    working: <Katex display tex="\boxed{y = x+1, \quad x>-2}" />,
    reason: <>&lsquo;Write down the <em>function</em>&rsquo; is the cue that a domain is needed, and a ray is only half a line. The ray leaves <Katex tex="u" /> heading right, so <Katex tex="x>-2" />, strict because <Katex tex="u" /> is excluded. In function notation: <Katex tex="f:(-2,\infty)\to R,\ f(x)=x+1" />. The report notes that many students gave the correct rule but did not include the domain; 75% scored zero.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="z_c = m+ni: \quad |z_c-u| = |z_c-v| = |z_c+5i|" />,
    reason: <>How would I know where to start? The centre is the one point the same distance, <Katex tex="r" />, from every point on the circle. Three points give two equations in the two unknowns <Katex tex="m" /> and <Katex tex="n" />. Note <Katex tex="z_c-(-5i)=z_c+5i" />, the distance to <Katex tex="(0,-5)" />.</>,
  },
  {
    working: <Katex display tex="(-2-m)^2+(-1-n)^2 = m^2+(n+5)^2" />,
    reason: <><Katex tex="|z_c-u|=|z_c+5i|" />, squared.</>,
  },
  {
    working: <Katex display tex="(-4-m)^2+(-3-n)^2 = m^2+(n+5)^2" />,
    reason: <><Katex tex="|z_c-v|=|z_c+5i|" />, squared. On CAS you can finish in one step with <Cas fn="solve">solve(eq1 and eq2, {'{'}m, n{'}'})</Cas>, but by hand is quick too.</>,
  },
  {
    working: <Katex display tex="5+4m+2n = 10n+25 \implies m-2n = 5" />,
    reason: <>Expanding the first: <Katex tex="m^2" /> and <Katex tex="n^2" /> cancel, exactly as <Katex tex="x^2" /> and <Katex tex="y^2" /> did in part a. So this equation is a straight line of possible centres: the perpendicular bisector of <Katex tex="u" /> and <Katex tex="-5i" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}25+8m+6n = 10n+25 \\ \implies 8m = 4n \implies n = 2m\end{gathered}" />,
    reason: <>Expanding the second: another straight line, the perpendicular bisector of <Katex tex="v" /> and <Katex tex="-5i" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}m-2(2m) = 5 \implies -3m = 5 \\ \implies m = -\tfrac53, \ n = -\tfrac{10}{3}\end{gathered}" />,
    reason: <>Substitute <Katex tex="n=2m" /> into the first. Geometrically, this is finding where the two lines cross.</>,
  },
  {
    working: <Katex display tex="\boxed{z_c = -\tfrac53-\tfrac{10}{3}i}" />,
    reason: <>Check: the centre is also equally far from <Katex tex="u" /> and <Katex tex="v" />, so it must lie on part a.'s line <Katex tex="y=-x-5" />, and <Katex tex="-\tfrac{10}{3}=\tfrac53-5" /> ✓.</>,
  },
  {
    working: <Katex display tex="r^2 = \left(-\tfrac53\right)^2+\left(-\tfrac{10}{3}+5\right)^2 = \tfrac{25}{9}+\tfrac{25}{9} = \tfrac{50}{9}" />,
    reason: <>The radius is the distance from the centre to any of the three points; <Katex tex="-5i=(0,-5)" /> gives the simplest numbers.</>,
  },
  {
    working: <Katex display tex="\boxed{r = \frac{5\sqrt2}{3}}" />,
    reason: <>About 2.36. The question asks for both the centre and the radius; the report notes some students correctly found <Katex tex="z_c" /> but did not also state the radius.</>,
  },
]

export default function SpecialistQ2_2020Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (11 marks)</p>
        <p>
          Two complex numbers, <Katex tex="u" /> and <Katex tex="v" />, are defined as{' '}
          <Katex tex="u=-2-i" /> and <Katex tex="v=-4-3i" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Line Locus"
        marks={3}
        statement={
          <>
            Express the relation <Katex tex="|z-u|=|z-v|" /> in the cartesian form{' '}
            <Katex tex="y=mx+c" />, where <Katex tex="m,c\in R" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Modulus as distance, argument as direction">
          <p>
            For complex numbers <Katex tex="z" /> and <Katex tex="a" />, <Katex tex="z-a" /> is the arrow from the
            point <Katex tex="a" /> to the point <Katex tex="z" /> on the Argand plane. So <Katex tex="|z-a|" /> is
            the <b>distance</b> between them, and <Katex tex="\operatorname{Arg}(z-a)" /> is the <b>direction</b> you
            travel from <Katex tex="a" /> to reach <Katex tex="z" />.
          </p>
          <p>
            Every part of this question is one of those two readings: <Katex tex="|z-u|=|z-v|" /> says{' '}
            <Katex tex="z" /> is as far from <Katex tex="u" /> as from <Katex tex="v" />, and{' '}
            <Katex tex="\operatorname{Arg}(z-u)=\tfrac\pi4" /> says <Katex tex="z" /> is reached from <Katex tex="u" />{' '}
            by heading off at <Katex tex="45^\circ" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Loci"
        marks={2}
        statement={
          <>
            Plot the points that represent <Katex tex="u" /> and <Katex tex="v" /> and the
            relation <Katex tex="|z-u|=|z-v|" /> on the Argand diagram below.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Perpendicular Bisector"
        marks={1}
        statement={
          <>
            State a geometrical interpretation of the graph of <Katex tex="|z-u|=|z-v|" /> in
            relation to the points that represent <Katex tex="u" /> and <Katex tex="v" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="Why |z − u| = |z − v| is the perpendicular bisector of uv">
          <BisectorWidget />
        </Explore>
        <WrongMethod title="It's a straight line with gradient −1" source="Examiner's report">
          True, but it describes the graph without mentioning <Katex tex="u" /> and <Katex tex="v" />, and the
          question asks for an interpretation &lsquo;in relation to the points&rsquo;. The report did not accept
          insufficiently precise responses such as &lsquo;a linear line&rsquo;, or ones that did not interpret the
          line in relation to the points. Say what the line does to the segment <Katex tex="uv" />: it cuts it in
          half, at right angles.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d.i"
        topic="Ray Locus"
        marks={1}
        statement={
          <>
            Sketch the ray given by <Katex tex="\operatorname{Arg}(z-u)=\tfrac\pi4" /> on the
            Argand diagram in part b.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
        <WrongMethod title="Draw the whole line through u at 45°" source="Examiner's report">
          Test a point on the extension below <Katex tex="u" />, say <Katex tex="z=-3-2i" />. Then{' '}
          <Katex tex="z-u=-1-i" />, which points down and to the left: <Katex tex="\operatorname{Arg}(-1-i)=-\tfrac{3\pi}{4}" />,
          not <Katex tex="\tfrac\pi4" />. So that half is not on the locus. Before drawing, ask which way the arrow
          from <Katex tex="u" /> points: only one direction gives <Katex tex="\tfrac\pi4" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Ray Equation"
        marks={1}
        statement={
          <>
            Write down the function that describes the ray{' '}
            <Katex tex="\operatorname{Arg}(z-u)=\tfrac\pi4" />, giving the rule in cartesian
            form.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
        <Explore title="Why the ray needs the domain x > −2">
          <RayWidget />
        </Explore>
        <WrongMethod title="The answer is y = x + 1" source="Examiner's report" working={<Katex display tex="y=x+1" />}>
          That is the rule of the whole line, so it includes points such as <Katex tex="(-3,-2)" />, where{' '}
          <Katex tex="\operatorname{Arg}(z-u)=-\tfrac{3\pi}{4}" />, and the point <Katex tex="u" /> itself, where the
          argument is undefined. The report notes many students gave this correct rule but not the domain. A ray always
          needs one: here <Katex tex="x>-2" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="e"
        topic="Circle Through Points"
        marks={3}
        statement={
          <>
            The points representing <Katex tex="u" /> and <Katex tex="v" /> and{' '}
            <Katex tex="-5i" /> lie on the circle given by <Katex tex="|z-z_c|=r" />, where{' '}
            <Katex tex="z_c" /> is the centre of the circle and <Katex tex="r" /> is the
            radius.
            <br />
            Find <Katex tex="z_c" /> in the form <Katex tex="a+ib" />, where{' '}
            <Katex tex="a,b\in R" />, and find the radius <Katex tex="r" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
        <Explore title="The centre is where two perpendicular bisectors cross">
          <CentreWidget />
        </Explore>
        <WrongMethod title="Find the centre, then stop" source="Examiner's report">
          The question asks for <Katex tex="z_c" /> <em>and</em> <Katex tex="r" />. The report notes some students
          correctly found <Katex tex="z_c" /> but did not also state the radius. Once you have the centre, the radius
          is one more line: the distance from <Katex tex="z_c" /> to any of the three points.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
