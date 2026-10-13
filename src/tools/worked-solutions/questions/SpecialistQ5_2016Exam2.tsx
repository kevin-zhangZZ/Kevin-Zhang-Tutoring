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
//
// Interactives (Detailed only): (d) spec-2016e2-q5d-carry-on — the true height graph after the engine
// cuts out against part (c)'s formula carried on past t = 5 (the report's main misconception);
// (e) spec-2016e2-q5e-stages — the three stages of the flight and the report's one-equation route
// with signed displacement. Parts (b) and (c) do not qualify (over 40% full marks).

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const CarryOnWidget = lazyWidget(() => import('../interactives/spec-2016e2-q5d-carry-on'))
const StagesWidget = lazyWidget(() => import('../interactives/spec-2016e2-q5e-stages'))

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
    reason: <>Given by part (a). The acceleration changes with <Katex tex="t" />, so integrate it; the constant-acceleration formulas don't apply.</>,
    more: <>The report notes a small number used a constant-acceleration formula. For instance <Katex tex="v=u+at" /> with the launch acceleration <Katex tex="\tfrac{76}{5}" /> gives <Katex tex="v=76" />, far too big: the acceleration falls steadily from <Katex tex="15.2" /> to <Katex tex="-9.8" /> over the five seconds.</>,
  },
  {
    working: <Katex display tex="v = \frac{76}{5}t-\frac52t^2+c" />,
    reason: <>Antidifferentiating with respect to <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="v(0)=0 \implies c = 0" />,
    reason: <>The rocket is launched from rest, so <Katex tex="v=0" /> when <Katex tex="t=0" />.</>,
  },
  {
    working: <Katex display tex="v(5) = \frac{76}{5}(5)-\frac52(25) = 76-62.5" />,
    reason: <>Substituting <Katex tex="t=5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{v = 13.5 \text{ m s}^{-1}}" />,
    reason: <>Positive, so the rocket is still climbing when the engine stops.</>,
    more: <>It is climbing slowly, though: the propulsion force has faded to zero by <Katex tex="t=5" /> while gravity has acted all along.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="h = \int_0^5 v\,dt = \int_0^5\left(\frac{76}{5}t-\frac52t^2\right)dt" />,
    reason: <>Height is the integral of velocity, starting from <Katex tex="h=0" /> at launch. The acceleration still isn't constant, so no <Katex tex="s=ut+\tfrac12at^2" />.</>,
    more: <>The report says more students used a constant acceleration here than in part (b). Any such formula is wrong for <Katex tex="0\le t\le5" />: for example <Katex tex="s=\tfrac12(u+v)t=\tfrac12(0+13.5)(5)=33.75" /> assumes the velocity grows in a straight line, but <Katex tex="v=\tfrac{76}{5}t-\tfrac52t^2" /> is a parabola.</>,
  },
  {
    working: <Katex display tex="= \left[\frac{76}{10}t^2-\frac56t^3\right]_0^5" />,
    reason: <>Antidifferentiating.</>,
  },
  {
    working: <Katex display tex="= \frac{76}{10}(25)-\frac56(125) = 190-\frac{625}{6}" />,
    reason: <>Substituting the terminals; the lower terminal gives 0.</>,
  },
  {
    working: <Katex display tex="\boxed{h \approx 85.83 \text{ m}}" />,
    reason: <>Exactly <Katex tex="\tfrac{515}{6}" />, given to two decimal places as the question asks.</>,
    more: <>The report notes that some students ignored the two-decimal-place instruction. Keep the exact <Katex tex="\tfrac{515}{6}" /> for parts (d) and (e) so rounding errors don't build up.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="t>5: \quad a = -g = -9.8" />,
    reason: <>The engine has stopped, so only gravity acts: the acceleration is now a <em>constant</em> <Katex tex="-9.8" /> (up positive). Constant-acceleration formulas now apply.</>,
    more: <>
      The report names the most common misconception: not realising the acceleration was now constant, and carrying on with part (c)'s
      formula <Katex tex="h=\tfrac{76}{10}t^2-\tfrac56t^3" />. That formula came from the thrust <Katex tex="50-10t" />, which only
      acts for <Katex tex="t\in[0,5]" />. Used past <Katex tex="t=5" />, its acceleration <Katex tex="\tfrac{76}{5}-5t" /> keeps falling
      below <Katex tex="-9.8" />, as if the thrust had turned round and pushed down; it peaks at <Katex tex="t=6.08" /> with{' '}
      <Katex tex="h\approx93.65" />, which is wrong. Calculus works too, if you start again from <Katex tex="\tfrac{dv}{dt}=-9.8" />{' '}
      with <Katex tex="v=13.5" /> at <Katex tex="t=5" />.
    </>,
  },
  {
    working: <Katex display tex="v^2 = u^2+2as: \quad 0 = 13.5^2+2(-9.8)s" />,
    reason: <>Start the clock when the engine cuts out: <Katex tex="u=13.5" /> from part (b). At the highest point <Katex tex="v=0" />.</>,
  },
  {
    working: <Katex display tex="s = \frac{182.25}{19.6} \approx 9.2985 \text{ m}" />,
    reason: <>The extra height climbed after the engine cuts out, measured from <Katex tex="85.83" /> m.</>,
  },
  {
    working: <Katex display tex="\boxed{85.83+9.30 \approx 95.13 \text{ m}}" />,
    reason: <>Add the height already reached in part (c). Unrounded: <Katex tex="\tfrac{515}{6}+9.2985\approx95.1318" />.</>,
    more: <>Use <Katex tex="g=9.8" />, not <Katex tex="10" />: the report reminds students of the instruction at the start of Section B. With <Katex tex="g=10" /> the extra climb is <Katex tex="\tfrac{13.5^2}{20}\approx9.11" /> m and the answer <Katex tex="94.95" /> m.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="t_1 = 5 \text{ s}" />,
    reason: <>The flight has three stages: powered climb, coasting climb, fall. The powered climb lasts 5 s, given.</>,
  },
  {
    working: <Katex display tex="t_2 = \frac{13.5}{9.8} \approx 1.378 \text{ s}" />,
    reason: <>Coasting climb: <Katex tex="v=u+at" /> with <Katex tex="u=13.5" />, <Katex tex="a=-9.8" /> and <Katex tex="v=0" /> at the top, so <Katex tex="0=13.5-9.8t_2" />.</>,
  },
  {
    working: <Katex display tex="t_3: \quad 95.1318 = \frac12(9.8)t_3^2" />,
    reason: <>Fall from rest at the top: <Katex tex="s=ut+\tfrac12at^2" /> with <Katex tex="u=0" />, taking <em>down</em> as positive. Use the unrounded height from (d).</>,
    more: <>The report notes that inconsistent signs caused difficulty. Choose a direction for each equation and stick to it: here down is positive, so <Katex tex="s" /> and <Katex tex="a" /> are both positive. With up positive instead, <Katex tex="-95.1318=-4.9t_3^2" />, the same equation. Mixing the two (for example <Katex tex="95.1318=-4.9t_3^2" />) has no solution.</>,
  },
  {
    working: <Katex display tex="t_3 = \sqrt{\frac{2\times95.1318}{9.8}} \approx 4.406 \text{ s}" />,
    reason: <>Taking the positive square root, since time is positive.</>,
    more: <>The descent is the longest stage, which makes sense: it starts from rest and has the whole height to cover.</>,
  },
  {
    working: <Katex display tex="\boxed{t = 5+1.378+4.406 \approx 10.8 \text{ s}}" />,
    reason: <>The flight time is all three stages added, to one decimal place.</>,
    more: <>
      The report notes students who treated the motion in separate sections but added only some of them: <Katex tex="5+4.406\approx9.4" />{' '}
      leaves out the coasting climb, and <Katex tex="1.378+4.406\approx5.8" /> leaves out the powered climb. Check with the report's
      one-equation route for everything after the engine cuts out. Measure <Katex tex="s" /> from where the engine cut out, up
      positive: the ground is <Katex tex="\tfrac{515}{6}" /> m <em>below</em> that point, so <Katex tex="s=-\tfrac{515}{6}" /> and{' '}
      <Katex tex="-\tfrac{515}{6}=13.5t-4.9t^2" />. Its positive solution is <Katex tex="t\approx5.78" /> (the other, <Katex tex="-3.03" />, is
      rejected), and <Katex tex="5+5.78\approx10.8" /> ✓.
    </>,
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
        <Background title="Why only parts b.–e." always>
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
            The flight has two regimes: engine on (<Katex tex="0\le t\le5" />, acceleration
            varies, so integrate) and engine off (<Katex tex="t>5" />, acceleration constant).
            Spotting where one ends and the other begins, and switching method there, is most
            of what parts b.–e. test.
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
        <Explore title="After the engine cuts out, the acceleration is frozen at −9.8">
          <CarryOnWidget />
        </Explore>
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
        <Explore title="Three stages, and every one of them counts">
          <StagesWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
