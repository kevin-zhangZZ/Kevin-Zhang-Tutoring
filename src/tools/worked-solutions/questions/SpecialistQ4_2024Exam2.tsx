// 2024 Specialist Mathematics — Exam 2, Section B Question 4 (11 marks). A yacht on a
// hyperbolic path: Cartesian form, sketch, minimum speed, arc length, then the closest
// approach of a drone moving in three dimensions. Question text transcribed from the
// original paper (2024 papers are image-only, so read from rendered pages); the part b.
// path is our own drawing of the answer on VCAA's exact grid (x from −7.9 to 7.9, gridlines
// every 1; y from −4.5 to 4.5, gridlines every 0.5). Answers checked with sympy/scipy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import pathSrc from './spec-2024e2-q4b-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [22, 78],
  average: 0.8,
  comment: (
    <>
      A ‘show that’ question requires logical steps set out to indicate how the solution could
      be found. In this case an appropriate trigonometric identity like{' '}
      <Katex tex="1+\tan^2(t)=\sec^2(t)" /> needed to be used.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [36, 22, 41],
  average: 1.0,
  comment: (
    <>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Students often did not draw this graph well, and it was often not symmetrical over the{' '}
          <Katex tex="x" />-axis.
        </li>
        <li>
          Negative signs were often left off the coordinates of the end points.
        </li>
        <li>
          The direction of the path of the yacht was often left out or in the wrong
          direction.
        </li>
      </ul>
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [77, 23],
  average: 0.3,
  comment: (
    <>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Many students did not answer in terms of <Katex tex="\sec(t)" />.
        </li>
        <li>
          Several students did not find the square of the speed, but left the answer as a
          velocity or speed.
        </li>
      </ul>
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
  comment: <>Some students did not answer in exact form.</>,
}

const EXAM_CIII: SAExaminerStats = {
  marks: [52, 48],
  average: 0.5,
  comment: (
    <>
      The common error was that some students forgot to take the square root of the square of
      the speed.
    </>
  ),
}

const EXAM_CIV: SAExaminerStats = {
  marks: [46, 54],
  average: 0.6,
  comment: (
    <>
      Common errors were due to mistakes such as reversing the coordinates or forgetting the
      negative sign.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
  comment: (
    <>
      This question was answered well; however, students need to be careful to use brackets
      appropriately.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [43, 57],
  average: 0.6,
}

const EXAM_E: SAExaminerStats = {
  marks: [65, 10, 24],
  average: 0.6,
  comment: (
    <>
      This question part was often not attempted. Students who found the correct expression
      for the distance were generally able to progress.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x = 3\sec(t), \qquad y = 2\tan(t)" />,
    reason: <>Reading the two components off the position vector.</>,
  },
  {
    working: <Katex display tex="\frac{x}{3} = \sec(t), \qquad \frac{y}{2} = \tan(t)" />,
    reason: <>Isolating the trigonometric functions, ready for an identity.</>,
  },
  {
    working: <Katex display tex="\sec^2(t)-\tan^2(t) = 1" />,
    reason: <>The Pythagorean identity in its secant form — dividing <Katex tex="\cos^2+\sin^2=1" /> through by <Katex tex="\cos^2" />. Naming it explicitly is what the "show that" asks for — the report says an appropriate trigonometric identity needed to be used.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{x^2}{9}-\frac{y^2}{4} = 1}" />,
    reason: <>Substituting. A hyperbola with vertices at (±3, 0) — though the yacht only traverses one branch. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="t = \frac{2\pi}{3}: \ \sec = \frac{1}{-\tfrac12} = -2, \ \tan = -\sqrt3 \implies \left(-6,\,-2\sqrt3\right)" />,
    reason: <>The starting buoy. Both coordinates are negative — the report notes negative signs were often left off the coordinates of the end points.</>,
  },
  {
    working: <Katex display tex="t = \pi: \ \sec = -1, \ \tan = 0 \implies (-3,\,0)" />,
    reason: <>The vertex of the left branch, reached halfway through.</>,
  },
  {
    working: <Katex display tex="t = \frac{4\pi}{3}: \ \sec = -2, \ \tan = \sqrt3 \implies \left(-6,\,2\sqrt3\right)" />,
    reason: <>The finishing buoy — the mirror image of the start.</>,
  },
  {
    working: <Katex display tex="\sec(t)<0 \text{ throughout} \implies x\le-3 \text{: the left branch only}" />,
    reason: <>On <Katex tex="\left[\tfrac{2\pi}{3},\tfrac{4\pi}{3}\right]" /> the cosine is negative, so the yacht never visits the right branch.</>,
  },
  {
    working: <Katex display tex="y \text{ increases from } -2\sqrt3 \text{ to } 2\sqrt3 \implies \text{motion is upward}" />,
    reason: <><Katex tex="\tan" /> increases across the interval, so the direction arrow points up around the curve.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={pathSrc}
          alt="The answer on VCAA's grid (x from about −7.9 to 7.9, y from about −4.5 to 4.5): the left branch of a hyperbola, symmetric about the x-axis, from the labelled endpoint (−6, −2√3) up through (−3, 0) to the labelled endpoint (−6, 2√3), with arrows showing upward motion"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>Symmetric about the <Katex tex="x" />-axis, with the endpoints labelled and the direction of motion shown, as the question asks.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = \frac{d}{dt}\left(3\sec t\right)\underset{\sim}{i}+\frac{d}{dt}\left(2\tan t\right)\underset{\sim}{j} = 3\sec(t)\tan(t)\underset{\sim}{i}+2\sec^2(t)\underset{\sim}{j}" />,
    reason: <>The formula-sheet derivatives <Katex tex="\tfrac{d}{dt}\sec t=\sec t\tan t" /> and <Katex tex="\tfrac{d}{dt}\tan t=\sec^2 t" />.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{v}\right|^2 = 9\sec^2(t)\tan^2(t)+4\sec^4(t)" />,
    reason: <>The <em>square</em> of the speed, which is what the question asks for. The report notes several students left the answer as a velocity or speed.</>,
  },
  {
    working: <Katex display tex="\tan^2(t) = \sec^2(t)-1" />,
    reason: <>The same identity as part a., used to remove the <Katex tex="\tan" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\left|\underset{\sim}{v}\right|^2 = 13\sec^4(t)-9\sec^2(t)}" />,
    reason: <><Katex tex="9\sec^2(\sec^2-1)+4\sec^4 = 13\sec^4-9\sec^2" />. In terms of <Katex tex="\sec(t)" />, as required.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dt}\left(13\sec^4 t-9\sec^2 t\right) = 52\sec^4(t)\tan(t)-18\sec^2(t)\tan(t)" />,
    reason: <>Chain rule on each power of <Katex tex="\sec" />.</>,
  },
  {
    working: <Katex display tex="= 2\sec^2(t)\tan(t)\left(26\sec^2(t)-9\right)" />,
    reason: <>Factorising. Both <Katex tex="\sec^2(t)" /> and the bracket are strictly positive, since <Katex tex="\sec^2\ge1>\tfrac{9}{26}" />.</>,
  },
  {
    working: <Katex display tex="\text{sign of the derivative} = \text{sign of } \tan(t)" />,
    reason: <>Negative on <Katex tex="\left(\tfrac{2\pi}{3},\pi\right)" /> and positive on <Katex tex="\left(\pi,\tfrac{4\pi}{3}\right)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t = \pi \ \text{minutes}}" />,
    reason: <>The first derivative test confirms a minimum: decreasing then increasing. Give the exact value — the report notes some students did not answer in exact form.</>,
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: <Katex display tex="t = \pi \implies \sec(\pi) = -1 \implies \sec^2 = 1, \ \sec^4 = 1" />,
    reason: <>Both even powers come out as 1.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{v}\right|^2 = 13(1)-9(1) = 4" />,
    reason: <>This is the square of the speed, not the speed.</>,
  },
  {
    working: <Katex display tex="\boxed{\left|\underset{\sim}{v}\right| = \sqrt4 = 2 \ \text{m/min}}" />,
    reason: <>The report's common error was forgetting to take the square root and answering 4.</>,
  },
]

const ROWS_CIV: WorkingRow[] = [
  {
    working: <Katex display tex="t = \pi: \quad x = 3\sec(\pi) = -3, \qquad y = 2\tan(\pi) = 0" />,
    reason: <>Substituting the time from part c.ii. into the original position vector.</>,
  },
  {
    working: <Katex display tex="\boxed{(-3,\,0)}" />,
    reason: <>The vertex of the branch, the point of the path closest to the origin. The report notes errors such as reversing the coordinates or forgetting the negative sign.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{distance} = \int_{a}^{b}\left|\underset{\sim}{v}(t)\right|\,dt" />,
    reason: <>Arc length is the integral of the speed.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_{2\pi/3}^{4\pi/3}\sqrt{9\sec^2(t)\tan^2(t)+4\sec^4(t)}\,\,dt}" />,
    reason: <>Equivalently <Katex tex="\int_{2\pi/3}^{4\pi/3}\sqrt{13\sec^4(t)-9\sec^2(t)}\,dt" /> using part c.i. Brackets matter here — the whole expression sits under the root.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{2\pi/3}^{4\pi/3}\sqrt{13\sec^4(t)-9\sec^2(t)}\,\,dt = 9.41095\ldots" />,
    reason: <>By <Cas fn="nInt" /> — there is no elementary antiderivative.</>,
  },
  {
    working: <Katex display tex="\boxed{9.4 \ \text{metres}}" />,
    reason: <>One decimal place. A rough check: the straight-line distance between the two buoys is <Katex tex="4\sqrt3\approx6.9" /> m, so a curved path of 9.4 m is the right order.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r_D}(t)-\underset{\sim}{r_Y}(t) = \bigl(2-3t-3\sec t\bigr)\underset{\sim}{i}+\bigl(4t-1-2\tan t\bigr)\underset{\sim}{j}+(6-t)\underset{\sim}{k}" />,
    reason: <>Both are functions of the same <Katex tex="t" />, so this is the separation at each instant — not a distance between two curves.</>,
  },
  {
    working: <Katex display tex="d(t) = \sqrt{\left(2-3t-3\sec t\right)^2+\left(4t-1-2\tan t\right)^2+(6-t)^2}" />,
    reason: <>The yacht has no <Katex tex="\underset{\sim}{k} " /> component, so the whole of <Katex tex="6-t" /> is vertical separation.</>,
  },
  {
    working: <Katex display tex="\frac{2\pi}{3}\le t\le\frac{4\pi}{3}" />,
    reason: <>The domain is the yacht's, which sits inside the drone's <Katex tex="[0,5]" />: about <Katex tex="2.09" /> to <Katex tex="4.19" />.</>,
  },
  {
    working: <Katex display tex="\min_{t} d(t) = 11.0722 \ \text{ at } t \approx 2.34" />,
    reason: <>By <Cas fn="fMin" /> applied to <Katex tex="d(t)" /> over that interval, or by graphing it.</>,
  },
  {
    working: <Katex display tex="\boxed{11.1 \ \text{metres}}" />,
    reason: <>One decimal place. The minimum is interior, not at an endpoint — worth checking, since at <Katex tex="t=\tfrac{2\pi}{3}" /> the distance is already close.</>,
  },
]

export default function SpecialistQ4_2024Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (11 marks)</p>
        <p>
          A model yacht is sailing on a lake between two buoys. Its path from one buoy to the
          other, relative to an origin <Katex tex="O" />, is given by
        </p>
        <div className="py-1">
          <Katex
            display
            tex="\underset{\sim}{r_Y}(t) = 3\sec(t)\underset{\sim}{i}+2\tan(t)\underset{\sim}{j}, \text{ where } \frac{2\pi}{3}\le t\le\frac{4\pi}{3}."
          />
        </div>
        <p>
          Displacement components are measured in metres, and time <Katex tex="t" /> is
          measured in minutes.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            One identity, <Katex tex="\sec^2 t-\tan^2 t = 1" />, does the work twice: in part
            a. it eliminates <Katex tex="t" /> to give the Cartesian equation, and in part
            c.i. it turns the speed squared into a polynomial in{' '}
            <Katex tex="\sec(t)" /> alone.
          </p>
          <p>
            Part c. is a chain of four one-mark parts, and each asks for a different object:
            the <em>square</em> of the speed, the <em>time</em>, the <em>speed</em>, then the{' '}
            <em>position</em>. The report notes students leaving the speed squared, 4, in
            place of the speed in c.iii., and a velocity or speed in place of its square in
            c.i.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Cartesian Equation"
        marks={1}
        statement={
          <>
            Use a trigonometric identity to show that the Cartesian equation of the path is
            given by <Katex tex="\dfrac{x^2}{9}-\dfrac{y^2}{4}=1" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Path"
        marks={2}
        statement={
          <>
            Sketch the path of the yacht on the axes below. Label the endpoints with their
            coordinates and show the direction of motion.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Speed"
        marks={1}
        statement={
          <>
            Write down an expression, in terms of <Katex tex="\sec(t)" />, for the square of
            the speed of the yacht at any time, <Katex tex="t" />.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Minimum Speed"
        marks={1}
        statement={
          <>
            Find the time, in minutes, when the minimum speed occurs.
            <br />
            You do not need to justify that this speed is a minimum.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="c.iii"
        topic="Minimum Speed"
        marks={1}
        statement={<>State the minimum speed of the yacht in metres per minute.</>}
        examinerReport={EXAM_CIII}
      >
        <WorkingTable rows={ROWS_CIII} />
      </PartCard>

      <PartCard
        letter="c.iv"
        topic="Position"
        marks={1}
        statement={<>State the coordinates of the yacht when the minimum speed occurs.</>}
        examinerReport={EXAM_CIV}
      >
        <WorkingTable rows={ROWS_CIV} />
      </PartCard>

      <PartCard
        letter="d.i"
        topic="Distance Travelled"
        marks={1}
        statement={
          <>
            Write down a definite integral, in terms of <Katex tex="t" />, that gives the
            distance travelled by the yacht along the path given by{' '}
            <Katex tex="\underset{\sim}{r_Y}(t)" /> over the time interval{' '}
            <Katex tex="\tfrac{2\pi}{3}\le t\le\tfrac{4\pi}{3}" />.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Distance Travelled"
        marks={1}
        statement={
          <>
            Find the distance travelled by the yacht over this time interval.
            <br />
            Give your answer in metres correct to one decimal place.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Closest Approach"
        marks={2}
        statement={
          <>
            The position vector of a drone videoing the yacht, relative to the same origin as
            the yacht, <Katex tex="O" />, is given by{' '}
            <Katex tex="\underset{\sim}{r_D}(t) = (2-3t)\underset{\sim}{i}+(4t-1)\underset{\sim}{j}+(6-t)\underset{\sim}{k}" />,
            where <Katex tex="0\le t\le5" />.
            <br />
            Displacement components are measured in metres, and time <Katex tex="t" /> is
            measured in minutes.
            <br />
            What is the shortest distance from the drone to the yacht, as the yacht sails
            along the path given by{' '}
            <Katex tex="\underset{\sim}{r_Y}(t) = 3\sec(t)\underset{\sim}{i}+2\tan(t)\underset{\sim}{j}" />,
            where <Katex tex="\dfrac{2\pi}{3}\le t\le\dfrac{4\pi}{3}" />?
            <br />
            Give your answer in metres, correct to one decimal place.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
