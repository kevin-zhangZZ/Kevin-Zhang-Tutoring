// 2015 Specialist Mathematics — Exam 2, Section 2 Question 4 (12 marks). A model helicopter
// climbing on a helix: altitude, angle of elevation, period of the horizontal motion,
// velocity perpendicular to acceleration, speed, and a distance to a fixed point. Question
// text transcribed from the original paper (no diagram given). Answers checked with sympy
// and against the VCAA examination report. Solution is original.
// Interactives (Detailed only) on the parts under 40% full marks: a.ii (plan and side views of the
// elevation triangle, with the report's 'directly above take-off' error) and d (the squared i, j, k
// pieces of the speed, with the 'leave out k' error).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'

const ElevationWidget = lazyWidget(() => import('../interactives/spec-2015e2-q4aii-elevation'))
const SpeedWidget = lazyWidget(() => import('../interactives/spec-2015e2-q4d-speed'))

const EXAM_AI: SAExaminerStats = {
  marks: [13, 87],
  average: 0.9,
  comment: (
    <>
      Most students answered this question well. A number of students attempted to solve{' '}
      <Katex tex="\underset{\sim}{r}(t)=60" />, failing to realise that only the{' '}
      <Katex tex="\underset{\sim}{k}" /> component was 60.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [52, 15, 33],
  average: 0.8,
  comment: (
    <>
      A significant number of students seemed not to know what "angle of elevation" meant. A
      number found the complementary angle – the angle with the vertical. Others found angles
      made with the <Katex tex="\underset{\sim}{i}" /> or <Katex tex="\underset{\sim}{j}" />{' '}
      directions. A small number of students tried to find the angle of elevation using the
      velocity vector. A common error was to assume that the helicopter, when at an altitude of 60 m, was directly above its
      initial location.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [57, 43],
  average: 0.5,
  comment: (
    <>
      Most students didn't realise that the period of the horizontal motion was required.
      Many students gave lengthy answers to this question, which was not necessary.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [19, 9, 21, 52],
  average: 2.1,
  comment: (
    <>
      A significant number of students gave answers with <Katex tex="x" /> as the variable
      instead of <Katex tex="t" />. Some students differentiated using CAS technology in
      degree mode, and a significant number omitted the <Katex tex="\underset{\sim}{k}" />{' '}
      component from the velocity. Often, <Katex tex="\underset{\sim}{i}" />,{' '}
      <Katex tex="\underset{\sim}{j}" /> or <Katex tex="\underset{\sim}{k}" /> were just
      dropped in the midst of working. Some students simply asserted that{' '}
      <Katex tex="\dot{\underset{\sim}{r}}(t).\ddot{\underset{\sim}{r}}(t)=0" />, without
      setting out the scalar product to show it.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [26, 35, 39],
  average: 1.2,
  comment: (
    <>
      Most students knew that they needed to find{' '}
      <Katex tex="\left|\dot{\underset{\sim}{r}}(t)\right|" />. Leaving out the{' '}
      <Katex tex="\underset{\sim}{k}" /> component was a common error. Some students could not
      simplify{' '}
      <Katex tex="\left(-\tfrac{5\pi}{6}\sin\!\left(\tfrac{\pi t}{30}\right)\right)^2+\left(\tfrac{5\pi}{6}\cos\!\left(\tfrac{\pi t}{30}\right)\right)^2" />{' '}
      using the Pythagorean identity.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [26, 16, 6, 53],
  average: 1.9,
  comment: (
    <>
      This question was moderately well answered. Frequent errors occurred in finding <Katex tex="\underset{\sim}{r}(45)" />, and many
      students attempted to find the distance using{' '}
      <Katex tex="\left|\underset{\sim}{r}(45)\right|-\left|\underset{\sim}{r}_{\text{tree}}\right|" />{' '}
      instead of{' '}
      <Katex tex="\left|\underset{\sim}{r}(45)-\underset{\sim}{r}_{\text{tree}}\right|" />.
      Occasionally an exact value of <Katex tex="5\sqrt{17}" /> was given instead of an answer
      correct to one decimal place.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{altitude} = \tfrac{2t}5" />,
    reason: <>Altitude is the <Katex tex="\underset{\sim}{k}" /> component alone — <Katex tex="\underset{\sim}{k}" /> is the vertical unit vector.</>,
  },
  {
    working: <Katex display tex="\tfrac{2t}5 = 60 \implies t = 150" />,
    reason: <>Set the height equal to 60 and solve.</>,
    more: <>The report notes a number of students solved <Katex tex="\underset{\sim}{r}(t)=60" /> (in effect <Katex tex="\left|\underset{\sim}{r}(t)\right|=60" />). That answers a different question: when the helicopter is 60 m from the origin, not when it is 60 m above the ground.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="t=150:\quad \tfrac{\pi t}{30} = 5\pi" />,
    reason: <>Altitude 60 m is reached at <Katex tex="t=150" /> (part a.i). Evaluate the angle <Katex tex="\tfrac{\pi t}{30}" /> first.</>,
  },
  {
    working: <Katex display tex="\cos(5\pi) = -1, \qquad \sin(5\pi) = 0" />,
    reason: <><Katex tex="5\pi" /> is the angle <Katex tex="\pi" /> plus two full turns, so these are exact (radians, not degrees).</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}(150) = 25\underset{\sim}{i}+50\underset{\sim}{j}+60\underset{\sim}{k}" />,
    reason: <><Katex tex="50+25(-1)=25" /> and <Katex tex="50+25(0)=50" />. The helicopter is over <Katex tex="(25,50)" />, <em>not</em> over its take-off point <Katex tex="\underset{\sim}{r}(0)" />: <Katex tex="(75,50)" />.</>,
    more: <>The report's common error was to assume the helicopter, at 60 m, was directly above its initial location. It circles as it climbs: 150 seconds is two and a half circuits of 60 seconds (part b), so it is on the opposite side of the circle from <Katex tex="(75,50)" />. Assuming <Katex tex="(75,50)" /> gives a horizontal distance <Katex tex="\sqrt{75^2+50^2}\approx 90.14" /> and an angle of about <Katex tex="34^\circ" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{horizontal distance} &= \sqrt{25^2+50^2} \\ &= \sqrt{3125} = 55.90\ldots\end{aligned}" />,
    reason: <>Elevation is measured from the horizontal, so we need the ground distance from <Katex tex="O" />: Pythagoras on the <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> components.</>,
    more: <>Picture the vertical plane through <Katex tex="O" /> and the helicopter: a right-angled triangle with the ground line (55.90 m) along the bottom, the altitude (60 m) as the vertical side, and the elevation as the angle at <Katex tex="O" />. The report notes some students found angles made with the <Katex tex="\underset{\sim}{i}" /> or <Katex tex="\underset{\sim}{j}" /> directions, or used the velocity vector. Neither is the elevation: it depends only on <em>where</em> the helicopter is, measured up from the horizontal.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\tan(\text{elevation}) &= \frac{60}{55.90\ldots} \\ \implies \text{elevation} &= 47.02\ldots^\circ\end{aligned}" />,
    reason: <>Opposite (the altitude) over adjacent (the horizontal distance).</>,
    more: <>Check: the altitude 60 is a little more than the ground distance 55.90, so the angle should be a little more than <Katex tex="45^\circ" />. Taking <Katex tex="\tan^{-1}\!\left(\tfrac{55.90}{60}\right)" /> instead gives <Katex tex="43^\circ" />, the angle with the vertical: the complementary angle the report says a number of students found.</>,
  },
  {
    working: <Katex display tex="\boxed{47^\circ}" />,
    reason: <>To the nearest degree.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}x &= 50+25\cos\!\left(\tfrac{\pi t}{30}\right) \\ y &= 50+25\sin\!\left(\tfrac{\pi t}{30}\right)\end{aligned}" />,
    reason: <>The horizontal position <Katex tex="(x,y)" /> is the <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> components. "Directly above the point of take-off" means these are back at their <Katex tex="t=0" /> values, <Katex tex="(75,50)" />.</>,
    more: <>Only the horizontal components matter: the <Katex tex="\underset{\sim}{k}" /> component keeps growing, so the helicopter is never back <em>at</em> the take-off point, only above it. In plan view it moves round a circle of radius 25 about <Katex tex="(50,50)" />, starting at <Katex tex="(75,50)" />.</>,
  },
  {
    working: <Katex display tex="\text{period} = \frac{2\pi}{\pi/30} = 60" />,
    reason: <><Katex tex="\cos(nt)" /> and <Katex tex="\sin(nt)" /> have period <Katex tex="\tfrac{2\pi}{n}" />; here <Katex tex="n=\tfrac{\pi}{30}" />. After one period both components are back where they started.</>,
    more: <>The report notes most students didn't realise the period of the horizontal motion was required. Check: at <Katex tex="t=60" />, <Katex tex="\tfrac{\pi t}{30}=2\pi" />, so the position is <Katex tex="(50+25,\ 50+0)=(75,50)" />, and <Katex tex="\cos=1" /> with <Katex tex="\sin=0" /> happens nowhere earlier for <Katex tex="t>0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{60\ \text{seconds}}" />,
    reason: <>"First" — the earliest positive time, which is one period.</>,
    more: <>The report notes many students gave lengthy answers, which was not necessary: for 1 mark, the period is enough.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\dot{\underset{\sim}{r}}(t) = -\tfrac{5\pi}6\sin\!\left(\tfrac{\pi t}{30}\right)\underset{\sim}{i}+\tfrac{5\pi}6\cos\!\left(\tfrac{\pi t}{30}\right)\underset{\sim}{j}+\tfrac25\underset{\sim}{k}" />,
    reason: <>Differentiate each component; the chain rule brings out <Katex tex="25\times\tfrac\pi{30}=\tfrac{5\pi}6" />. The <Katex tex="\underset{\sim}{k}" /> component <Katex tex="\tfrac{2t}5" /> gives <Katex tex="\tfrac25" />.</>,
    more: <>The report notes a significant number omitted the <Katex tex="\underset{\sim}{k}" /> component from the velocity, and that <Katex tex="\underset{\sim}{i}" />, <Katex tex="\underset{\sim}{j}" /> or <Katex tex="\underset{\sim}{k}" /> were often dropped mid-working: write every component with its unit vector on every line. Keep <Katex tex="t" /> as the variable (some students switched to <Katex tex="x" />), and if you use CAS, check it is in radian mode: in degree mode it treats <Katex tex="\tfrac{\pi t}{30}" /> as degrees and the derivative picks up an extra factor <Katex tex="\tfrac{\pi}{180}" />. In radian mode, <Cas fn="derivative">d/dt(50+25·cos(π·t/30))</Cas> gives the <Katex tex="\underset{\sim}{i}" /> component above.</>,
  },
  {
    working: <Katex display tex="\ddot{\underset{\sim}{r}}(t) = -\tfrac{\pi^2}{36}\cos\!\left(\tfrac{\pi t}{30}\right)\underset{\sim}{i}-\tfrac{\pi^2}{36}\sin\!\left(\tfrac{\pi t}{30}\right)\underset{\sim}{j}" />,
    reason: <>Differentiate again; <Katex tex="\tfrac{5\pi}6\times\tfrac\pi{30}=\tfrac{\pi^2}{36}" />. The constant <Katex tex="\tfrac25" /> differentiates to zero, so there is no <Katex tex="\underset{\sim}{k}" /> component.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\dot{\underset{\sim}{r}}\cdot\ddot{\underset{\sim}{r}} &= \tfrac{5\pi^3}{216}\sin\!\left(\tfrac{\pi t}{30}\right)\cos\!\left(\tfrac{\pi t}{30}\right) \\ &\quad - \tfrac{5\pi^3}{216}\cos\!\left(\tfrac{\pi t}{30}\right)\sin\!\left(\tfrac{\pi t}{30}\right) + \tfrac25(0)\end{aligned}" />,
    reason: <>Multiply matching components and add. Each product has <Katex tex="\tfrac{5\pi}6\times\tfrac{\pi^2}{36}=\tfrac{5\pi^3}{216}" />; the <Katex tex="\underset{\sim}{k}" /> product is zero.</>,
    more: <>The signs: the <Katex tex="\underset{\sim}{i}" /> product is <Katex tex="\left(-\tfrac{5\pi}6\sin\right)\left(-\tfrac{\pi^2}{36}\cos\right)" />, two negatives, so positive; the <Katex tex="\underset{\sim}{j}" /> product is <Katex tex="\left(\tfrac{5\pi}6\cos\right)\left(-\tfrac{\pi^2}{36}\sin\right)" />, so negative.</>,
  },
  {
    working: <Katex display tex="= 0" />,
    reason: <>The two terms are equal and opposite, so they cancel for every <Katex tex="t" />.</>,
    more: <>The report singles out students who simply asserted that the scalar product was zero, without setting it out. The line above is the setting out that earns the marks in a "show that".</>,
  },
  {
    working: <Katex display tex="\therefore\ \dot{\underset{\sim}{r}}\perp\ddot{\underset{\sim}{r}} \text{ for all } t" />,
    reason: <>Neither vector is ever zero (the velocity always has <Katex tex="\underset{\sim}{k}" /> component <Katex tex="\tfrac25" />; the acceleration has magnitude <Katex tex="\tfrac{\pi^2}{36}" />), so they are perpendicular. As required.</>,
    more: <>Geometrically: the speed is constant (part d), so the acceleration can only turn the velocity, never lengthen it, and a push that only turns is at right angles to the motion.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\left|\dot{\underset{\sim}{r}}(t)\right|^2 = {}&\left(\tfrac{5\pi}6\right)^2\sin^2\!\left(\tfrac{\pi t}{30}\right) \\ &+\left(\tfrac{5\pi}6\right)^2\cos^2\!\left(\tfrac{\pi t}{30}\right)+\left(\tfrac25\right)^2\end{aligned}" />,
    reason: <>Speed is the magnitude of the velocity from part c: square all three components, <Katex tex="\underset{\sim}{k}" /> included, and add. Squaring removes the minus sign on the <Katex tex="\underset{\sim}{i}" /> component.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\left|\dot{\underset{\sim}{r}}(t)\right| &= \sqrt{\left(\tfrac{5\pi}6\right)^2\left(\sin^2+\cos^2\right)+\tfrac4{25}} \\ &= \sqrt{\tfrac{25\pi^2}{36}+\tfrac4{25}}\end{aligned}" />,
    reason: <>Factor out <Katex tex="\left(\tfrac{5\pi}6\right)^2" />; <Katex tex="\sin^2\theta+\cos^2\theta=1" /> removes <Katex tex="t" />, so the speed is constant. Then take the square root.</>,
    more: <>The report notes some students could not simplify the first two terms using the Pythagorean identity. It applies to any angle, here <Katex tex="\theta=\tfrac{\pi t}{30}" />. A constant speed makes sense: the helicopter goes round its circle at a steady rate while climbing at a steady <Katex tex="\tfrac25" /> m/s.</>,
  },
  {
    working: <Katex display tex="= \sqrt{6.8538\ldots+0.16} = 2.6483\ldots" />,
    reason: <><Katex tex="\tfrac{25\pi^2}{36}=6.8538\ldots" /> and <Katex tex="\tfrac4{25}=0.16" />.</>,
  },
  {
    working: <Katex display tex="\boxed{2.65\ \text{ms}^{-1}}" />,
    reason: <>To two decimal places.</>,
    more: <>Leaving out the <Katex tex="\underset{\sim}{k}" /> component was the report's common error: it gives <Katex tex="\sqrt{\tfrac{25\pi^2}{36}}=\tfrac{5\pi}6\approx 2.62" />. The climb adds only 0.16 under the square root, but at two decimal places that is enough to change the answer.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="t=45:\quad \tfrac{\pi t}{30} = \tfrac{3\pi}2" />,
    reason: <>Again an exact angle: <Katex tex="\cos\!\left(\tfrac{3\pi}2\right)=0" />, <Katex tex="\sin\!\left(\tfrac{3\pi}2\right)=-1" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}(45) = 50\underset{\sim}{i}+25\underset{\sim}{j}+18\underset{\sim}{k}" />,
    reason: <><Katex tex="50+25(0)=50" />, <Katex tex="50+25(-1)=25" />, and <Katex tex="\tfrac{2(45)}5=18" />.</>,
    more: <>The report notes frequent errors in finding <Katex tex="\underset{\sim}{r}(45)" />. A geometric check: 45 seconds is three-quarters of the 60-second circuit, and the helicopter goes anticlockwise (east of the centre, then north, west, south), starting at <Katex tex="(75,50)" />, so it is now due south of the centre <Katex tex="(50,50)" />: at <Katex tex="(50,25)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{r}(45)-\underset{\sim}{r}_{\text{tree}} = {}&(50-60)\underset{\sim}{i}+(25-40)\underset{\sim}{j} \\ &+(18-8)\underset{\sim}{k}\end{aligned}" />,
    reason: <>The distance between two points is the magnitude of the <em>difference</em> of their position vectors.</>,
    more: <>The report notes many students used <Katex tex="\left|\underset{\sim}{r}(45)\right|-\left|\underset{\sim}{r}_{\text{tree}}\right|" /> instead. That is the difference of their distances from <Katex tex="O" />, which is not the distance between them: here it is <Katex tex="\sqrt{3449}-\sqrt{5264}\approx 58.73-72.55" />, not even positive.</>,
  },
  {
    working: <Katex display tex="= -10\underset{\sim}{i}-15\underset{\sim}{j}+10\underset{\sim}{k}" />,
    reason: <>The displacement from the treetop to the helicopter.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{distance} &= \sqrt{(-10)^2+(-15)^2+10^2} \\ &= \sqrt{425} = 5\sqrt{17}\end{aligned}" />,
    reason: <>The magnitude of that displacement.</>,
  },
  {
    working: <Katex display tex="5\sqrt{17} = 20.615\ldots \approx \boxed{20.6\ \text{metres}}" />,
    reason: <>To one decimal place, as the question asks.</>,
    more: <>The report notes the exact value <Katex tex="5\sqrt{17}" /> was occasionally given instead of an answer correct to one decimal place: the exact surd on its own does not answer the question.</>,
  },
]

export default function SpecialistQ4_2015Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (12 marks)</p>
        <p>
          The position vector <Katex tex="\underset{\sim}{r}(t)" />, from origin{' '}
          <Katex tex="O" />, of a model helicopter <Katex tex="t" /> seconds after leaving the
          ground is given by
        </p>
        <div>
          <Katex
            display
            tex="\begin{aligned}\underset{\sim}{r}(t) = {}&\left(50+25\cos\!\left(\tfrac{\pi t}{30}\right)\right)\underset{\sim}{i} \\ &+ \left(50+25\sin\!\left(\tfrac{\pi t}{30}\right)\right)\underset{\sim}{j} + \tfrac{2t}{5}\underset{\sim}{k}\end{aligned}"
          />
        </div>
        <p>
          where <Katex tex="\underset{\sim}{i}" /> is a unit vector to the east,{' '}
          <Katex tex="\underset{\sim}{j}" /> is a unit vector to the north and{' '}
          <Katex tex="\underset{\sim}{k}" /> is a unit vector vertically up. Displacement
          components are measured in metres.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The path is a helix: a circle of radius 25 about <Katex tex="(50,50)" /> in plan
              view, climbing steadily. Two facts do most of the work — the take-off point is{' '}
              <Katex tex="\underset{\sim}{r}(0)=75\underset{\sim}{i}+50\underset{\sim}{j}" />, not the origin, and the helicopter circles as it climbs, so its
              horizontal position keeps changing (the period is found in part b).
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a.i"
        topic="Vector Kinematics"
        marks={1}
        statement={<>Find the time, in seconds, required for the helicopter to gain an altitude of 60 m.</>}
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Angle of Elevation"
        marks={2}
        statement={
          <>
            Find the angle of elevation from <Katex tex="O" /> of the helicopter when it is at
            an altitude of 60 m. Give your answer in degrees, correct to the nearest degree.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
        <Explore title="At 60 m the helicopter is not above its take-off point">
          <ElevationWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="b"
        topic="Period"
        marks={1}
        statement={<>After how many seconds will the helicopter first be directly above the point of take-off?</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Perpendicular Vectors"
        marks={3}
        statement={<>Show that the velocity of the helicopter is perpendicular to its acceleration.</>}
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Speed"
        marks={2}
        statement={
          <>
            Find the speed of the helicopter in ms<sup>−1</sup>, giving your answer correct to
            two decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
        <Explore title="The i and j pieces trade off, so the speed never changes">
          <SpeedWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="e"
        topic="Distance"
        marks={3}
        statement={
          <>
            A treetop has position vector{' '}
            <Katex tex="\underset{\sim}{r}=60\underset{\sim}{i}+40\underset{\sim}{j}+8\underset{\sim}{k}" />
            . Find the distance of the helicopter from the treetop after it has been
            travelling for 45 seconds. Give your answer in metres, correct to one decimal
            place.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
