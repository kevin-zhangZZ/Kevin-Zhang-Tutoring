// 2024 Specialist Mathematics — Exam 2, Section B Question 4 (11 marks). A yacht on a
// hyperbolic path: Cartesian form, sketch, minimum speed, arc length, then the closest
// approach of a drone moving in three dimensions. Question text transcribed from the
// original paper (2024 papers are image-only, so read from rendered pages); the part b.
// path is our own drawing of the answer on VCAA's exact grid (x from −7.9 to 7.9, gridlines
// every 1; y from −4.5 to 4.5, gridlines every 0.5). Answers checked with sympy/scipy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
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
    reason: <>Isolating the trigonometric functions, so an identity linking <Katex tex="\sec" /> and <Katex tex="\tan" /> can remove <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\sec^2(t)-\tan^2(t) = 1" />,
    reason: <>The Pythagorean identity in its secant form: divide <Katex tex="\cos^2+\sin^2=1" /> through by <Katex tex="\cos^2" />.</>,
    more: <>Writing the identity down explicitly is what earns the mark in a "show that": the report says an appropriate trigonometric identity needed to be used. Jumping straight from the parametric equations to the Cartesian one shows nothing.</>,
  },
  {
    working: <Katex display tex="\left(\frac{x}{3}\right)^2-\left(\frac{y}{2}\right)^2 = 1 \implies \boxed{\frac{x^2}{9}-\frac{y^2}{4} = 1}" />,
    reason: <>Substituting <Katex tex="\sec(t)=\tfrac{x}{3}" /> and <Katex tex="\tan(t)=\tfrac{y}{2}" /> into the identity. As required.</>,
    more: <>This is a hyperbola with vertices at <Katex tex="(\pm3,\,0)" /> and asymptotes <Katex tex="y=\pm\tfrac{2}{3}x" />, but the restricted <Katex tex="t" /> interval means the yacht only traverses part of one branch, which part b. pins down.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}t = \frac{2\pi}{3}:&\ \sec = \frac{1}{-\tfrac12} = -2, \ \tan = -\sqrt3\\ &\implies \left(-6,\,-2\sqrt3\right)\end{aligned}" />,
    reason: <>The starting buoy: <Katex tex="x=3(-2)" />, <Katex tex="y=2(-\sqrt3)" />. Both coordinates are negative.</>,
    more: <>The report notes negative signs were often left off the coordinates of the end points. In the second quadrant <Katex tex="\cos" /> is negative, so <Katex tex="\sec" /> is too, and <Katex tex="\tan = \sin/\cos" /> is negative.</>,
  },
  {
    working: <Katex display tex="t = \pi: \ \sec = -1, \ \tan = 0 \implies (-3,\,0)" />,
    reason: <>The vertex of the left branch, reached halfway through.</>,
  },
  {
    working: <Katex display tex="t = \frac{4\pi}{3}: \ \sec = -2, \ \tan = \sqrt3 \implies \left(-6,\,2\sqrt3\right)" />,
    reason: <>The finishing buoy: in the third quadrant <Katex tex="\cos" /> and <Katex tex="\sin" /> are both negative, so <Katex tex="\tan" /> is positive.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\sec(t)<0 \text{ throughout} \implies x\le-3\\ &\implies \text{left branch only}\end{aligned}" />,
    reason: <>On <Katex tex="\left[\tfrac{2\pi}{3},\tfrac{4\pi}{3}\right]" /> the cosine is negative, so <Katex tex="\sec t\le-1" /> and <Katex tex="x=3\sec t\le-3" />: the yacht never visits the right branch.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&y \text{ increases from } -2\sqrt3 \text{ to } 2\sqrt3\\ &\implies \text{motion is upward}\end{aligned}" />,
    reason: <><Katex tex="\tfrac{dy}{dt}=2\sec^2(t)>0" />, so <Katex tex="y" /> only ever increases: the yacht travels from the lower endpoint, through <Katex tex="(-3,0)" />, to the upper one.</>,
    more: <>The report notes the direction was often left out or drawn the wrong way. Put at least one arrowhead on the curve pointing upward, from <Katex tex="(-6,-2\sqrt3)" /> towards <Katex tex="(-6,2\sqrt3)" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={pathSrc}
          alt="The answer on VCAA's grid (x from about −7.9 to 7.9, y from about −4.5 to 4.5): the left branch of a hyperbola, symmetric about the x-axis, from the labelled endpoint (−6, −2√3) up through (−3, 0) to the labelled endpoint (−6, 2√3), with arrows showing upward motion"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>Symmetric about the <Katex tex="x" />-axis, with the endpoints labelled and the direction of motion shown, as the question asks.</>,
    more: <>The report notes the graph was often not symmetrical over the <Katex tex="x" />-axis. The Cartesian equation only involves <Katex tex="y^2" />, so replacing <Katex tex="y" /> by <Katex tex="-y" /> changes nothing, and the endpoints are mirror images. Plot the three points above and join them with a smooth curve that is vertical at <Katex tex="(-3,0)" /> and bends outward, staying inside the asymptotes <Katex tex="y=\pm\tfrac{2}{3}x" /> (at <Katex tex="x=-6" /> they are at <Katex tex="y=\pm4" />, just beyond <Katex tex="\pm2\sqrt3\approx\pm3.46" />).</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{v}(t) &= \frac{d}{dt}\left(3\sec t\right)\underset{\sim}{i}+\frac{d}{dt}\left(2\tan t\right)\underset{\sim}{j}\\ &= 3\sec(t)\tan(t)\underset{\sim}{i}+2\sec^2(t)\underset{\sim}{j}\end{aligned}" />,
    reason: <>Velocity is the derivative of position. Use the formula-sheet derivatives <Katex tex="\tfrac{d}{dt}\sec t=\sec t\tan t" /> and <Katex tex="\tfrac{d}{dt}\tan t=\sec^2 t" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\left|\underset{\sim}{v}\right|^2 &= \left(3\sec t\tan t\right)^2+\left(2\sec^2 t\right)^2\\ &= 9\sec^2(t)\tan^2(t)+4\sec^4(t)\end{aligned}" />,
    reason: <>Speed is <Katex tex="|\underset{\sim}{v}|" />, so its <em>square</em> is just the sum of the squared components, with no square root.</>,
    more: <>Read what is asked: the report notes several students did not find the square of the speed, but left the answer as a velocity or speed. The square is asked for because it is the tidy expression to work with in part c.ii.</>,
  },
  {
    working: <Katex display tex="\tan^2(t) = \sec^2(t)-1" />,
    reason: <>The identity from part a., rearranged. The answer must be in terms of <Katex tex="\sec(t)" /> only, so the <Katex tex="\tan" /> has to go.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\left|\underset{\sim}{v}\right|^2 &= 9\sec^2(t)\left(\sec^2(t)-1\right)+4\sec^4(t)\\ &= \boxed{13\sec^4(t)-9\sec^2(t)}\end{aligned}" />,
    reason: <>Expanding and collecting the <Katex tex="\sec^4" /> terms: <Katex tex="9+4=13" />. In terms of <Katex tex="\sec(t)" />, as required.</>,
    more: <>Only 23% of students scored this mark, and the report notes many did not answer in terms of <Katex tex="\sec(t)" />: the expression <Katex tex="9\sec^2(t)\tan^2(t)+4\sec^4(t)" /> from two rows up is correct but still contains <Katex tex="\tan" />, so it does not answer the question. The report's own working goes through <Katex tex="\cos" /> instead (using <Katex tex="\sin^2 t = 1-\cos^2 t" />) and reaches <Katex tex="\tfrac{13}{\cos^4 t}-\tfrac{9}{\cos^2 t}" />, the same thing.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\frac{d}{dt}\left(13\sec^4 t-9\sec^2 t\right)\\ &= 52\sec^4(t)\tan(t)-18\sec^2(t)\tan(t)\end{aligned}" />,
    reason: <>The speed is least when its square is least, so differentiate the part c.i. answer. Chain rule: <Katex tex="\tfrac{d}{dt}\sec^n t = n\sec^{n-1}t\cdot\sec t\tan t" />.</>,
    more: <>Squaring does not move the minimum, because speed is never negative: the smallest speed gives the smallest speed squared. That is why working with <Katex tex="|\underset{\sim}{v}|^2" /> saves differentiating a square root.</>,
  },
  {
    working: <Katex display tex="= 2\sec^2(t)\tan(t)\left(26\sec^2(t)-9\right)" />,
    reason: <>Factorising. Both <Katex tex="\sec^2(t)" /> and the bracket are strictly positive, since <Katex tex="\sec^2\ge1>\tfrac{9}{26}" />.</>,
  },
  {
    working: <Katex display tex="\text{sign of the derivative} = \text{sign of } \tan(t)" />,
    reason: <><Katex tex="\tan(t)" /> is negative on <Katex tex="\left(\tfrac{2\pi}{3},\pi\right)" /> (second quadrant), zero at <Katex tex="t=\pi" />, and positive on <Katex tex="\left(\pi,\tfrac{4\pi}{3}\right)" /> (third quadrant).</>,
  },
  {
    working: <Katex display tex="\boxed{t = \pi \ \text{minutes}}" />,
    reason: <>The only stationary point; the speed decreases then increases there. Give the exact value <Katex tex="\pi" />, not 3.14.</>,
    more: <>The report notes some students did not answer in exact form. Since the minimum need not be justified, on the CAS you could simply apply <Cas fn="fMin" /> to the part c.i. expression over <Katex tex="\left[\tfrac{2\pi}{3},\tfrac{4\pi}{3}\right]" />. A quicker way to see it by hand: for <Katex tex="\sec^2\ge1" />, <Katex tex="13\sec^4-9\sec^2" /> grows as <Katex tex="\sec^2" /> grows, so it is least when <Katex tex="\sec^2 t" /> takes its smallest value, 1, which on this interval happens only at <Katex tex="t=\pi" />.</>,
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}t = \pi &\implies \sec(\pi) = \frac{1}{\cos(\pi)} = -1\\ &\implies \sec^2 = 1, \ \sec^4 = 1\end{aligned}" />,
    reason: <>Both even powers come out as 1.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{v}\right|^2 = 13(1)-9(1) = 4" />,
    reason: <>Substituting into the part c.i. expression. This is the square of the speed, not the speed.</>,
  },
  {
    working: <Katex display tex="\boxed{\left|\underset{\sim}{v}\right| = \sqrt4 = 2 \ \text{m/min}}" />,
    reason: <>Take the square root: the question asks for the speed, not its square.</>,
  },
]

const ROWS_CIV: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}t = \pi: \quad x &= 3\sec(\pi) = -3\\ y &= 2\tan(\pi) = 0\end{aligned}" />,
    reason: <>Substituting the time from part c.ii. into the original position vector.</>,
  },
  {
    working: <Katex display tex="\boxed{(-3,\,0)}" />,
    reason: <>Written in the order <Katex tex="(x,\,y)" />: the vertex of the branch, the point of the path closest to the origin.</>,
    more: <>The report notes errors such as reversing the coordinates or forgetting the negative sign. It is the same point found in part b. at <Katex tex="t=\pi" />, a useful check.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{distance} = \int_{a}^{b}\left|\underset{\sim}{v}(t)\right|\,dt" />,
    reason: <>Distance travelled along the path is the integral of the speed from the start time <Katex tex="a" /> to the end time <Katex tex="b" />; here <Katex tex="a=\tfrac{2\pi}{3}" />, <Katex tex="b=\tfrac{4\pi}{3}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_{2\pi/3}^{4\pi/3}\sqrt{9\sec^2(t)\tan^2(t)+4\sec^4(t)}\,\,dt}" />,
    reason: <>The speed is the square root of the part c.i. expression. Equivalently <Katex tex="\int_{2\pi/3}^{4\pi/3}\sqrt{13\sec^4(t)-9\sec^2(t)}\,dt" />.</>,
    more: <>The report says students need to be careful to use brackets appropriately. The whole sum sits under the root, and if you write it with the components the squares must be bracketed: <Katex tex="(3\sec t\tan t)^2" />, not <Katex tex="3\sec t\tan t^2" />, which squares only the <Katex tex="t" />.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{2\pi/3}^{4\pi/3}\sqrt{13\sec^4(t)-9\sec^2(t)}\,\,dt = 9.41095\ldots" />,
    reason: <>By <Cas fn="nInt" /> — there is no elementary antiderivative.</>,
  },
  {
    working: <Katex display tex="\boxed{9.4 \ \text{metres}}" />,
    reason: <>Correct to one decimal place, as asked.</>,
    more: <>A rough check: the straight-line distance between the two buoys is <Katex tex="4\sqrt3\approx6.9" /> m, along the line <Katex tex="x=-6" />, and the path bends right to <Katex tex="(-3,0)" />, 3 m from that chord, so it must be noticeably longer than 6.9 m: 9.4 m is the right size.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\underset{\sim}{r_D}(t)-\underset{\sim}{r_Y}(t)\\ &= \bigl(2-3t-3\sec t\bigr)\underset{\sim}{i}+\bigl(4t-1-2\tan t\bigr)\underset{\sim}{j}\\ &\quad+(6-t)\underset{\sim}{k}\end{aligned}" />,
    reason: <>The vector from yacht to drone at time <Katex tex="t" />: both positions are measured from <Katex tex="O" /> at the same instant, so subtract them.</>,
    more: <>This compares where the drone and the yacht are <em>at the same moment</em>, which is what "as the yacht sails" means, so a single <Katex tex="t" /> is used throughout. It is not the shortest gap between the two paths as drawn shapes. The report notes this part was often not attempted, and that students who found the correct expression for the distance were generally able to progress: setting it up is the whole difficulty, and the CAS does the rest.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}d(t)^2 &= \left(2-3t-3\sec t\right)^2\\ &\quad+\left(4t-1-2\tan t\right)^2+(6-t)^2\end{aligned}" />,
    reason: <>The distance <Katex tex="d(t)" /> is the magnitude of that vector, so <Katex tex="d(t)" /> is the square root of this. The yacht has no <Katex tex="\underset{\sim}{k}" /> component, so <Katex tex="6-t" /> is the drone's height alone.</>,
  },
  {
    working: <Katex display tex="\frac{2\pi}{3}\le t\le\frac{4\pi}{3}" />,
    reason: <>Both must exist at time <Katex tex="t" />: the yacht's interval, about <Katex tex="2.09" /> to <Katex tex="4.19" />, lies inside the drone's <Katex tex="[0,5]" />, so use the yacht's.</>,
  },
  {
    working: <Katex display tex="\min_{t} d(t) = 11.0722 \ \text{ at } t \approx 2.34" />,
    reason: <><Cas fn="fMin" /> of <Katex tex="d(t)^2" /> over that interval gives the <Katex tex="t" />; substitute it into <Katex tex="d(t)" /> (or graph <Katex tex="d(t)" />).</>,
    more: <>Minimising <Katex tex="d(t)^2" /> instead of <Katex tex="d(t)" /> is the same trick as part c.ii.: a distance is never negative, so it and its square are smallest at the same <Katex tex="t" />, and you avoid typing the square root. Just remember to take the square root of the minimum value at the end.</>,
  },
  {
    working: <Katex display tex="\boxed{11.1 \ \text{metres}}" />,
    reason: <>Correct to one decimal place, as asked.</>,
    more: <>The minimum is interior, not at an endpoint: at <Katex tex="t=\tfrac{2\pi}{3}" /> the distance is about 11.65 m and at <Katex tex="t=\tfrac{4\pi}{3}" /> about 13.24 m, both larger. The domain restriction matters: outside the yacht's interval, <Katex tex="\sec" /> and <Katex tex="\tan" /> are undefined at <Katex tex="t=\tfrac{\pi}{2}" /> and <Katex tex="\tfrac{3\pi}{2}" />, and the expression no longer describes the yacht.</>,
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
            tex="\begin{aligned}&\underset{\sim}{r_Y}(t) = 3\sec(t)\underset{\sim}{i}+2\tan(t)\underset{\sim}{j},\\ &\text{where } \frac{2\pi}{3}\le t\le\frac{4\pi}{3}.\end{aligned}"
          />
        </div>
        <p>
          Displacement components are measured in metres, and time <Katex tex="t" /> is
          measured in minutes.
        </p>
      </div>

      <DetailOnly>
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
              <em>position</em>. Before writing each answer, check it is the object that part
              asks for.
            </p>
          </Background>
        </div>
      </DetailOnly>

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
