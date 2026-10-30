// 2024 Specialist NHT — Exam 1, Question 1 (4 marks). The NHT report gives sample answers only,
// with no statistics. Constant-acceleration (straight-line) motion: a car from rest covering 400 m in
// 10 s (a = 8 m s⁻², v = 80 m s⁻¹), then the average speed over the first half of a 12-second run
// in terms of the final speed V (V/4). Question text transcribed from the original paper (read from
// a rendered page image). Answers checked with sympy and against the VCAA report's sample answers,
// which agree. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow } from '../QuestionParts'

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="u=0,\quad s=400,\quad t=10,\quad a=\,?" />,
    reason: <>List what you know. &ldquo;From rest&rdquo; means the initial velocity is <Katex tex="u=0" />. The final speed <Katex tex="v" /> isn&apos;t given, so choose the constant-acceleration formula that leaves it out.</>,
  },
  {
    working: <Katex display tex="s=ut+\tfrac12at^2" />,
    reason: <>The one constant-acceleration formula linking <Katex tex="s" />, <Katex tex="u" />, <Katex tex="t" /> and <Katex tex="a" /> without <Katex tex="v" />.</>,
  },
  {
    working: <Katex display tex="400=0\times10+\tfrac12a(10)^2=50a" />,
    reason: <>Substitute the known values. The <Katex tex="ut" /> term is zero because the car starts from rest, and <Katex tex="\tfrac12\times10^2=50" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a=8\ \text{m s}^{-2}}" />,
    reason: <>Divide both sides by 50.</>,
    more: <>Sanity check: a fast electric car reaches about 100 km/h in a few seconds, around <Katex tex="8" /> to <Katex tex="10\ \text{m s}^{-2}" />, so 8 is realistic.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="v=u+at=0+8\times10" />,
    reason: <>It has travelled 400 m after exactly 10 seconds, so use <Katex tex="t=10" /> with the acceleration from part a.i.</>,
  },
  {
    working: <Katex display tex="\boxed{v=80\ \text{m s}^{-1}}" />,
    reason: <>The car only ever moves forward, so its speed is just this velocity, 80.</>,
    more: <>Check with a formula that doesn&apos;t use <Katex tex="t" />: <Katex tex="v^2=u^2+2as=0+2(8)(400)=6400" />, so <Katex tex="v=80" /> ✓. Another check: with constant acceleration from rest, the average speed is half the final speed, <Katex tex="\tfrac{80}{2}=40" />, and <Katex tex="40\times10=400" /> m ✓. Part b. uses exactly this idea.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="V=0+a(12)\implies a=\frac{V}{12}" />,
    reason: <>From rest, <Katex tex="v=u+at" /> after 12 seconds gives the (unknown) constant acceleration in terms of <Katex tex="V" />.</>,
  },
  {
    working: <Katex display tex="t=6:\quad v=\frac{V}{12}\times6=\frac{V}{2}" />,
    reason: <>The speed grows in proportion to time, so halfway through the time the car has half its final speed.</>,
  },
  {
    working: <Katex display tex="\text{average speed}=\frac{0+\frac V2}{2}" />,
    reason: <>With constant acceleration, speed increases linearly, so its average over an interval is the average of the starting and finishing speeds: here 0 and <Katex tex="\tfrac V2" />.</>,
    more: <>Equivalently, find the distance and divide by the time: <Katex tex="s=\tfrac12\cdot\tfrac{V}{12}\cdot6^2=\tfrac{3V}{2}" /> metres in 6 seconds, so the average speed is <Katex tex="\tfrac{3V/2}{6}=\tfrac V4" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{V}{4}\ \text{m s}^{-1}}" />,
    reason: <>Simplify: half of <Katex tex="\tfrac V2" /> is <Katex tex="\tfrac V4" />. Not <Katex tex="\tfrac V2" />: that is the speed reached at <Katex tex="t=6" />, not the average over the first 6 seconds.</>,
    more: <>VCAA&apos;s route: the average over all 12 seconds is <Katex tex="\tfrac V2" />, and the first 6 seconds average half of that, <Katex tex="\tfrac12\times\tfrac V2=\tfrac V4" />.</>,
  },
]

export default function SpecialistQ1_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (4 marks)</p>
      </div>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">a.</p>
        <p>
          A certain model of electric car accelerates in a straight line from rest, with constant acceleration, to
          travel 400 metres in 10 seconds.
        </p>
      </div>

      <PartCard
        letter="a.i"
        topic="Constant Acceleration"
        marks={2}
        statement={<>Find the acceleration of the car in <Katex tex="\text{m s}^{-2}" />.</>}
      >
        <Background>
          <p>
            When the acceleration is constant, five quantities describe the motion: initial velocity <Katex tex="u" />,
            final velocity <Katex tex="v" />, acceleration <Katex tex="a" />, time <Katex tex="t" /> and displacement{' '}
            <Katex tex="s" />. Each of the formulas <Katex tex="v=u+at" />, <Katex tex="s=ut+\tfrac12at^2" />,{' '}
            <Katex tex="v^2=u^2+2as" />, <Katex tex="s=\tfrac12(u+v)t" /> and <Katex tex="s=vt-\tfrac12at^2" /> leaves
            one of them out. Pick the one that leaves out the quantity you neither know nor want.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
        <WrongMethod
          title="Speed is distance over time, so a = 40/10"
          working={<Katex display tex="v=\frac{400}{10}=40,\quad a=\frac{40}{10}=4" />}
        >
          <Katex tex="\tfrac{400}{10}=40" /> is the <b>average</b> speed, not the final speed. Starting from rest and
          speeding up steadily, the car finishes at twice its average speed, 80 m s⁻¹, so the acceleration is{' '}
          <Katex tex="\tfrac{80}{10}=8" />, not 4.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Constant Acceleration"
        marks={1}
        statement={<>Find the speed of the car, in <Katex tex="\text{m s}^{-1}" />, when it has travelled 400 m.</>}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Average Speed"
        marks={1}
        statement={
          <>
            A second car accelerates in a straight line from rest, with constant acceleration, for 12 seconds.
            <br />
            Given that the speed of this car is <Katex tex="V\ \text{m s}^{-1}" /> after 12 seconds, write down the
            average speed of the car in terms of <Katex tex="V" /> for the first 6 seconds of its motion.
          </>
        }
      >
        <Background>
          <p>
            Average speed is total distance divided by total time. On a velocity–time graph the distance is the area
            under the graph; with constant acceleration from rest that graph is a straight line through the origin, so
            the area is a triangle and the average speed is exactly half the speed at the end of the interval.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <WrongMethod title="Halfway in time, so half the final speed" working={<Katex display tex="\text{average}=\frac V2" />}>
          <Katex tex="\tfrac V2" /> is the speed <b>at</b> <Katex tex="t=6" /> (and the average over all 12 seconds).
          The average over the first 6 seconds is half of the speed reached at <Katex tex="t=6" />, which is{' '}
          <Katex tex="\tfrac V4" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
