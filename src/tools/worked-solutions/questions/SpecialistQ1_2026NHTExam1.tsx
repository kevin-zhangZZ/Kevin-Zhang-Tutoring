// 2026 Specialist NHT — Exam 1, Question 1 (3 marks). The NHT report gives sample answers only,
// with no statistics, and no notes. Constant-acceleration motion in a straight line: the initial
// velocity from s = (u + v)t/2 (a "show that"), then the acceleration and the time at which the
// displacement is 28 m. Question text transcribed from the original paper. Answers checked with
// sympy and against the report's sample answers (u = 3; a = 2, t = 4). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow } from '../QuestionParts'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="s=\frac{(u+v)}{2}\,t" />,
    reason: <>The acceleration is constant, so the constant-acceleration formulas apply. We know <Katex tex="v" />, <Katex tex="s" /> and <Katex tex="t" /> but not <Katex tex="a" />, so pick the one formula without <Katex tex="a" /> in it.</>,
    more: <>With constant acceleration, velocity changes linearly, so the average velocity over the interval is the average of the start and end velocities, <Katex tex="\tfrac{u+v}{2}" />. Displacement is average velocity times time.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}10&=\frac{u+7}{2}\times2\\ &=u+7\end{aligned}" />,
    reason: <>Substitute <Katex tex="t=2" />, <Katex tex="v=7" /> and <Katex tex="s=d=10" />.</>,
  },
  {
    working: <Katex display tex="\boxed{u=3\text{ m s}^{-1}}" />,
    reason: <>The initial velocity is <Katex tex="u" />, the velocity at <Katex tex="t=0" />. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}v&=u+at\\ 7&=3+2a\implies a=2\end{aligned}" />,
    reason: <>To use <Katex tex="s=ut+\tfrac12at^2" /> for a new time we need <Katex tex="a" /> first. Use the known point <Katex tex="t=2" />, <Katex tex="v=7" /> with <Katex tex="u=3" /> from part a.</>,
    more: <>The question said the acceleration is positive, and <Katex tex="a=2" /> is: the object speeds up from 3 to 7 m s<sup>−1</sup> in 2 seconds.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}s&=ut+\tfrac12at^2\\ 28&=3t+\tfrac12\times2t^2=3t+t^2\end{aligned}" />,
    reason: <>Now <Katex tex="u" /> and <Katex tex="a" /> are both known, so this formula gives <Katex tex="s" /> at any time <Katex tex="t" />. Set it equal to 28.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}t^2+3t-28&=0\\ (t+7)(t-4)&=0\end{aligned}" />,
    reason: <>A quadratic in <Katex tex="t" />. Look for two numbers that multiply to <Katex tex="-28" /> and add to 3: they are 7 and <Katex tex="-4" />.</>,
  },
  {
    working: <Katex display tex="t=4\quad(t=-7\text{ rejected, since }t\ge0)" />,
    reason: <>Time is measured from the start of the motion, so a negative time isn&apos;t a valid answer.</>,
  },
  {
    working: <Katex display tex="\boxed{t=4\text{ seconds}}" />,
    reason: <>Sanity check: at <Katex tex="t=4" />, <Katex tex="s=3(4)+4^2=12+16=28" /> ✓. And it fits the given data: <Katex tex="s(2)=6+4=10" /> ✓, so 28 m is reached some time after 10 m.</>,
  },
]

export default function SpecialistQ1_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (3 marks)</p>
        <p>An object is moving in a straight line with constant positive acceleration.</p>
        <p>
          At time <Katex tex="t" /> seconds, its velocity is <Katex tex="v" /> m s<sup>−1</sup> and its
          displacement is <Katex tex="d" /> metres.
          <br />
          When <Katex tex="t=2" />, <Katex tex="v=7" /> and <Katex tex="d=10" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Constant Acceleration"
        marks={1}
        statement={<>Show that the initial velocity of the object is 3 m s<sup>−1</sup>.</>}
      >
        <Background>
          <p>
            For motion with <b>constant</b> acceleration there are five quantities, <Katex tex="u" /> (initial
            velocity), <Katex tex="v" /> (final velocity), <Katex tex="a" />, <Katex tex="s" /> (displacement) and{' '}
            <Katex tex="t" />, and each of the formulas <Katex tex="v=u+at" />, <Katex tex="s=ut+\tfrac12at^2" />,{' '}
            <Katex tex="s=vt-\tfrac12at^2" />, <Katex tex="v^2=u^2+2as" /> and <Katex tex="s=\tfrac{(u+v)}{2}t" /> leaves
            out exactly one of them. Choose the formula that leaves out the quantity you neither know nor want.
            Here the question&apos;s <Katex tex="d" /> plays the role of <Katex tex="s" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Constant Acceleration"
        marks={2}
        statement={<>After how many seconds is the object&apos;s displacement 28 m?</>}
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Use t = 2 and v = 7 as the starting values"
          working={<Katex display tex="28=7t+\tfrac12(2)t^2\implies t^2+7t-28=0" />}
        >
          The values at <Katex tex="t=2" /> are not the initial values. In <Katex tex="s=ut+\tfrac12at^2" />, <Katex tex="u" /> is
          the velocity at <Katex tex="t=0" /> and <Katex tex="s" /> is measured from where the object was at{' '}
          <Katex tex="t=0" />. Use <Katex tex="u=3" /> from part a.; a quick check is that your formula must give{' '}
          <Katex tex="s=10" /> when <Katex tex="t=2" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
