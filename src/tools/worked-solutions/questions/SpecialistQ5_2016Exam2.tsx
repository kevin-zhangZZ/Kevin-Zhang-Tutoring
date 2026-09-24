// 2016 Specialist Mathematics — Exam 2, Section B, Question 5, parts (b)–(e) (9 of the
// question's 10 marks). A model rocket under a decaying propulsion force, then free
// flight.
//
// Part (a) is omitted: it asks for an equation of motion by balancing the propulsion force
// against the weight, which is force analysis and off the current study design. It hands
// you dv/dt = 76/5 − 5t, and parts (b) to (e) are ordinary calculus and constant-
// acceleration work from there. The skip guide already treats this question that way.
//
// Question text transcribed from the original paper (no diagram given). Answers verified
// with scipy. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_B: SAExaminerStats = {
  marks: [13, 7, 81],
  average: 1.7,
  comment: (
    <>
      Most students found the velocity by integration. A small number incorrectly used a
      constant acceleration formula.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [31, 9, 61],
  average: 1.3,
  comment: (
    <>
      Success in Question 5b. generally translated to success in Question 5c., although a greater
      number of students used a constant acceleration in Question 5c. An answer correct to
      two decimal places was required, but this instruction was ignored by some students.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [50, 10, 39],
  average: 0.9,
  comment: (
    <>
      Students used a variety of correct approaches. Some students used calculus, while others
      used constant acceleration formulas. The most common misconception arising in this
      question was not realising that acceleration was now constant, and some students
      proceeded to use their equation for the displacement that was obtained in Question 5c.
      Students should note the instructions at the beginning of Section B where they are told
      to use <Katex tex="g=9.8" />, not 10.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [44, 27, 7, 21],
  average: 1.1,
  comment: (
    <>
      Of the students who made progress in this question, the majority used equations of
      constant acceleration. A few realised that it was possible to describe the whole of
      this section of the motion using the equation{' '}
      <Katex tex="-\tfrac{515}{6}=\tfrac{27}{2}t-4.9t^2" />. A number who treated the motion in
      separate sections added only some parts of the motion to get the total time.
      Inconsistent signs caused some difficulty.
    </>
  ),
}

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dv}{dt} = \frac{76}{5}-5t" />,
    reason: <>Given by part (a). The acceleration is <em>not</em> constant, so the constant-acceleration formulas do not apply here — integrate instead.</>,
  },
  {
    working: <Katex display tex="v = \frac{76}{5}t-\frac52t^2+c" />,
    reason: <>Antidifferentiating.</>,
  },
  {
    working: <Katex display tex="v(0)=0 \implies c = 0" />,
    reason: <>The rocket is launched from rest.</>,
  },
  {
    working: <Katex display tex="v(5) = \frac{76}{5}(5)-\frac52(25) = 76-62.5" />,
    reason: <>Substituting <Katex tex="t=5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{v = 13.5 \text{ m s}^{-1}}" />,
    reason: <>Still climbing, but slowly: the propulsion force has faded to zero by <Katex tex="t=5" /> while gravity has been acting all along.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="h = \int_0^5 v\,dt = \int_0^5\left(\frac{76}{5}t-\frac52t^2\right)dt" />,
    reason: <>Height is the integral of velocity. Again, not a constant-acceleration formula — the report says that substitution was the common error.</>,
  },
  {
    working: <Katex display tex="= \left[\frac{76}{10}t^2-\frac56t^3\right]_0^5" />,
    reason: <>Antidifferentiating.</>,
  },
  {
    working: <Katex display tex="= \frac{76}{10}(25)-\frac56(125) = 190-\frac{625}{6}" />,
    reason: <>Substituting.</>,
  },
  {
    working: <Katex display tex="\boxed{h \approx 85.83 \text{ m}}" />,
    reason: <>Exactly <Katex tex="\tfrac{515}{6}" />. Two decimal places, as instructed.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="t>5: \quad a = -g = -9.8" />,
    reason: <>With the propulsion gone, the only force is gravity, so the acceleration is <em>constant</em> from here — and the constant-acceleration formulas finally do apply.</>,
  },
  {
    working: <Katex display tex="v^2 = u^2+2as: \quad 0 = 13.5^2-2(9.8)s" />,
    reason: <>At the highest point the velocity is zero. Take up as positive.</>,
  },
  {
    working: <Katex display tex="s = \frac{182.25}{19.6} \approx 9.2985 \text{ m}" />,
    reason: <>The extra height climbed after the engine cuts out.</>,
  },
  {
    working: <Katex display tex="\boxed{85.83+9.30 \approx 95.13 \text{ m}}" />,
    reason: <>Add the height already gained. Use <Katex tex="g=9.8" />, not <Katex tex="10" /> — the instruction at the start of Section B, which the report says some students ignored.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="t_1 = 5 \text{ s}" />,
    reason: <>The powered stage, given.</>,
  },
  {
    working: <Katex display tex="t_2 = \frac{13.5}{9.8} \approx 1.378 \text{ s}" />,
    reason: <>From <Katex tex="v=u+at" /> with <Katex tex="v=0" />: the coasting climb to the apex.</>,
  },
  {
    working: <Katex display tex="t_3: \quad 95.1318 = \frac12(9.8)t_3^2" />,
    reason: <>The fall from the maximum height, starting from rest. Use the unrounded height from part (d).</>,
  },
  {
    working: <Katex display tex="t_3 = \sqrt{\frac{2\times95.1318}{9.8}} \approx 4.406 \text{ s}" />,
    reason: <>The descent is the longest of the three stages, which makes sense: it starts from rest and has the whole height to cover.</>,
  },
  {
    working: <Katex display tex="\boxed{t = 5+1.378+4.406 \approx 10.8 \text{ s}}" />,
    reason: <>All three stages, to one decimal place. The report notes students who computed the pieces correctly and then added only some of them. Check with the report's one-equation route for everything after the engine cuts out: <Katex tex="-\tfrac{515}{6}=13.5t-4.9t^2" /> gives <Katex tex="t\approx5.78" />, and <Katex tex="5+5.78\approx10.8" /> ✓.</>,
  },
]

export default function SpecialistQ5_2016Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (10 marks) — parts b.–e. only</p>
        <p className="mb-2">
          A model rocket of mass <Katex tex="2" /> kg is launched from rest and travels
          vertically up, with a vertical propulsion force of <Katex tex="(50-10t)" /> newtons
          after <Katex tex="t" /> seconds of flight, where <Katex tex="t\in[0,5]" />. Assume
          that the rocket is subject only to the vertical propulsion force and gravity, and
          that air resistance is negligible.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background title="Why only parts b.–e.">
          <p>
            Part a. reads: "Let <Katex tex="v" /> ms<sup>−1</sup> be the velocity of the rocket{' '}
            <Katex tex="t" /> seconds after it is launched. Write down an equation of motion for
            the rocket and show that <Katex tex="\dfrac{dv}{dt}=\dfrac{76}{5}-5t" />." Writing an
            equation of motion by balancing the propulsion force against the weight is force
            analysis, which is not part of the current study design, so it is omitted here.
          </p>
          <p>
            The result it establishes, <Katex tex="\dfrac{dv}{dt}=\dfrac{76}{5}-5t" />, is all the
            remaining parts need.
          </p>
        </Background>
      </div>

      <PartCard
        letter="b"
        topic="Velocity"
        marks={2}
        statement={
          <>
            Find the velocity, in m s<Katex tex="^{-1}" />, of the rocket after five seconds.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="Two stages, two kinds of acceleration">
          <p>
            While the engine is firing (<Katex tex="0\le t\le5" />), the acceleration{' '}
            <Katex tex="\tfrac{76}{5}-5t" /> changes with time — so every quantity has to
            come from integration, not from <Katex tex="v=u+at" /> and friends.
          </p>
          <p>
            After <Katex tex="t=5" />, the only force is gravity, the acceleration is a
            constant <Katex tex="-9.8" />, and the constant-acceleration formulas are the
            quickest route. Switching methods at the right moment is most of what this
            question is testing — the report's headline error is using one where the other
            belongs.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Displacement"
        marks={2}
        statement={
          <>
            Find the height of the rocket after five seconds. Give your answer in metres,
            correct to two decimal places.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Maximum Height"
        marks={2}
        statement={
          <>
            After five seconds, when the vertical propulsion force has stopped, the rocket is
            subject only to gravity. Find the maximum height reached by the rocket. Give your
            answer in metres, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Time of Flight"
        marks={3}
        statement={
          <>
            Having reached its maximum height, the rocket falls directly to the ground.
            Assuming negligible air resistance during this final stage of motion, find the
            time for which the rocket was in flight. Give your answer in seconds, correct to
            one decimal place.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
