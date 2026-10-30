// 2022 Specialist NHT — Exam 1, Question 7 (4 marks). The NHT report gives sample answers only,
// with no statistics. A particle on r(t) = 4sec(t) i + 2tan(t) j, t ∈ [0, π/2): eliminate t with
// sec² − tan² = 1 to get the hyperbola x²/16 − y²/4 = 1, restricted to x ≥ 4, y ≥ 0; then the
// speed at t = π/6. Question text transcribed from the original paper. Answers checked with sympy
// and against the VCAA report's sample answers (x²/16 − y²/4 = 1; 8√2/3). The report's sample
// answer to part a. gives the equation alone, without the restriction; the solution gives the
// equation as the answer and adds the restriction the parameter interval forces, saying why.
// Solution is original. Widget: interactives/spec-2022nhte1-q7a-quarter.tsx (the particle traces
// only the top half of the right branch; velocity arrow and speed at t = π/6).

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow } from '../QuestionParts'

const QuarterWidget = lazyWidget(() => import('../interactives/spec-2022nhte1-q7a-quarter'))

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x = 4\sec(t),\quad y = 2\tan(t)" />,
    reason: <>Read the two components off <Katex tex="\underset{\sim}{r}(t)=x\,\underset{\sim}{i}+y\,\underset{\sim}{j}" />. A cartesian equation links <Katex tex="x" /> and <Katex tex="y" /> with no <Katex tex="t" />, so the job is to eliminate <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\frac{x}{4} = \sec(t),\quad \frac{y}{2} = \tan(t)" />,
    reason: <>Make each trig function the subject, ready to substitute into an identity that links them.</>,
  },
  {
    working: <Katex display tex="\sec^2(t) - \tan^2(t) = 1" />,
    reason: <>The Pythagorean identity linking sec and tan: divide <Katex tex="\sin^2(t)+\cos^2(t)=1" /> through by <Katex tex="\cos^2(t)" /> to get <Katex tex="\tan^2(t)+1=\sec^2(t)" />.</>,
    more: <>Whenever a parametric path uses sec and tan (or cosec and cot) of the same <Katex tex="t" />, this identity is the one to reach for, and the result is a hyperbola. With sin and cos it would be <Katex tex="\sin^2+\cos^2=1" /> and an ellipse.</>,
  },
  {
    working: <Katex display tex="\left(\frac{x}{4}\right)^2 - \left(\frac{y}{2}\right)^2 = 1 \implies \frac{x^2}{16} - \frac{y^2}{4} = 1" />,
    reason: <>Substitute. This is a hyperbola centred at the origin, with vertices <Katex tex="(\pm4,0)" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} t\in\left[0,\tfrac\pi2\right) &\implies \sec(t)\ge1,\ \tan(t)\ge0 \\ &\implies x\ge4,\ y\ge0 \end{aligned}"
      />
    ),
    reason: <>The particle doesn&apos;t trace the whole hyperbola. On <Katex tex="\left[0,\tfrac\pi2\right)" />, <Katex tex="\cos(t)" /> falls from 1 towards 0, so <Katex tex="\sec(t)=\tfrac{1}{\cos(t)}" /> rises from 1 to infinity, and <Katex tex="\tan(t)" /> rises from 0 to infinity.</>,
    more: <>So the path is only the top half of the right-hand branch: it starts at <Katex tex="(4,0)" /> when <Katex tex="t=0" /> and heads up and to the right. In the widget below, the faint curve is the whole hyperbola and the particle visits only one quarter of it.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{x^2}{16} - \frac{y^2}{4} = 1,\quad x\ge4,\ y\ge0}" />,
    reason: <>The equation together with the restriction from the previous line describes exactly the part of the hyperbola the particle travels on. Equivalently <Katex tex="y=\tfrac12\sqrt{x^2-16}" /> for <Katex tex="x\ge4" />.</>,
    more: <>VCAA&apos;s sample answer gives the equation <Katex tex="\tfrac{x^2}{16}-\tfrac{y^2}{4}=1" /> alone, without the restriction. Check with <Katex tex="t=\tfrac\pi4" />: <Katex tex="x=4\sqrt2" /> and <Katex tex="y=2" />, and <Katex tex="\tfrac{32}{16}-\tfrac44=2-1=1" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\dot{\underset{\sim}{r}}(t) = 4\sec(t)\tan(t)\,\underset{\sim}{i} + 2\sec^2(t)\,\underset{\sim}{j}" />,
    reason: <>Velocity is the derivative of position, one component at a time. <Katex tex="\tfrac{d}{dt}\sec(t)=\sec(t)\tan(t)" /> and <Katex tex="\tfrac{d}{dt}\tan(t)=\sec^2(t)" />.</>,
    more: <>If you don&apos;t remember the derivative of sec, write it as <Katex tex="(\cos t)^{-1}" /> and use the chain rule: <Katex tex="-(\cos t)^{-2}\times(-\sin t)=\tfrac{\sin t}{\cos^2 t}=\sec t\tan t" />. VCAA&apos;s sample answer writes the <Katex tex="\underset{\sim}{i}" /> component in that form, <Katex tex="\tfrac{4\sin(t)}{\cos^2(t)}" />.</>,
  },
  {
    working: <Katex display tex="\sec\!\left(\frac\pi6\right) = \frac{2}{\sqrt3},\quad \tan\!\left(\frac\pi6\right) = \frac{1}{\sqrt3}" />,
    reason: <>Exact values: <Katex tex="\cos\tfrac\pi6=\tfrac{\sqrt3}{2}" />, so its reciprocal is <Katex tex="\tfrac{2}{\sqrt3}" />, and <Katex tex="\tan\tfrac\pi6=\tfrac{1}{\sqrt3}" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} \dot{\underset{\sim}{r}}\!\left(\frac\pi6\right) &= 4\cdot\frac{2}{\sqrt3}\cdot\frac{1}{\sqrt3}\,\underset{\sim}{i} + 2\cdot\frac{4}{3}\,\underset{\sim}{j} \\ &= \frac83\,\underset{\sim}{i} + \frac83\,\underset{\sim}{j} \end{aligned}"
      />
    ),
    reason: <><Katex tex="\tfrac{2}{\sqrt3}\cdot\tfrac{1}{\sqrt3}=\tfrac23" /> and <Katex tex="\sec^2\tfrac\pi6=\left(\tfrac{2}{\sqrt3}\right)^2=\tfrac43" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \left|\dot{\underset{\sim}{r}}\!\left(\frac\pi6\right)\right| &= \sqrt{\left(\frac83\right)^2+\left(\frac83\right)^2} \\ &= \sqrt{2\cdot\frac{64}{9}} = \frac{8\sqrt2}{3} \end{aligned}" />,
    reason: <>Speed is the magnitude of the velocity vector, not either component on its own.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{speed} = \frac{8\sqrt2}{3}\text{ m/s}}" />,
    reason: <>Leave it exact (Exam 1 is technology-free), with units: the components are in metres and <Katex tex="t" /> is in seconds, so speed is in m/s.</>,
    more: <>About <Katex tex="3.77" /> m/s. Sanity check: the two components are equal, so the speed should be <Katex tex="\sqrt2" /> times either one, and <Katex tex="\sqrt2\times\tfrac83\approx3.77" />.</>,
  },
]

export default function SpecialistQ7_2022NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (4 marks)</p>
        <p>
          The path of a moving particle after <Katex tex="t" /> seconds is given by{' '}
          <Katex tex="\underset{\sim}{r}(t)=4\sec(t)\,\underset{\sim}{i}+2\tan(t)\,\underset{\sim}{j}" /> for{' '}
          <Katex tex="t\in\left[0,\dfrac\pi2\right)" />, where components are measured in metres.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Cartesian Equation"
        marks={2}
        statement={<>Find the cartesian equation of the path.</>}
      >
        <WorkingTable rows={ROWS_A} />
        <Explore title="The particle traces only one quarter of the hyperbola, which is why x ≥ 4">
          <QuarterWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="b"
        topic="Speed"
        marks={2}
        statement={
          <>
            Find the speed of the particle when <Katex tex="t=\dfrac\pi6" />.
          </>
        }
      >
        <Background>
          <p>
            Velocity <Katex tex="\dot{\underset{\sim}{r}}(t)" /> is a vector: it says which way the particle is moving and how
            fast. Speed is just the &ldquo;how fast&rdquo;: the length of that vector,{' '}
            <Katex tex="\left|\dot{\underset{\sim}{r}}(t)\right|=\sqrt{\dot x^2+\dot y^2}" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
