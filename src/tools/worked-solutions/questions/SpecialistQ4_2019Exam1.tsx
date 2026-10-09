// 2019 Specialist Mathematics — Exam 1, Question 4 (3 marks).
// Two particles with given position vectors collide — find the constant a. Question text
// transcribed from the original paper (no diagram given). Cross-checked against the VCAA
// examination report and itute's independent solutions: all agree the collision is at t = 1 and
// a = (π−1)/3. itute factorises the cubic as (t²−1)(t−1) = 0, which is correct and equals our
// (t−1)²(t+1) (checked in sympy; an earlier note here misread itute's sign as (t²+1)). Solution is
// original.
//
// Interactive (Sept 2026 review): interactives/spec-2019e1-q4-collide.tsx — drag t and a to see
// that the sideways gap (t−1)²(t+1) closes only at t = 1 whatever a is, then a lines A up with B;
// a toggle shows the paths crossing for every a from about −0.09 to 1.24 but the particles
// arriving at different times. WrongMethod boxes: "find where the paths cross" (two equations,
// three unknowns) and keeping t = −1 (gives a = (2π+1)/3); neither is named in the report, so no
// source is given. Scout note (NBEASTK video) suggested the time/a sliders.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, WrongMethod, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const CollideWidget = lazyWidget(() => import('../interactives/spec-2019e1-q4-collide'))

const EXAMINER: SAExaminerStats = {
  marks: [15, 11, 9, 64],
  average: 2.2,
  comment: (
    <>
      Most students attempted to equate the <Katex tex="\underset{\sim}{i}" /> components of{' '}
      <Katex tex="\underset{\sim}{r}_A(t)" /> and <Katex tex="\underset{\sim}{r}_B(t)" /> in order to
      determine the value of <Katex tex="t" /> when the particles collided. Various algebraic and
      transcription errors were made by students, which meant they could not be awarded full
      marks for the question.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Collision} \iff \underset{\sim}{r}_A(t) = \underset{\sim}{r}_B(t) \ \text{ for the same } t" />,
    reason: <>Two particles collide only if they are at the same place <em>at the same moment</em>. So we need one value of <Katex tex="t" /> that makes the two position vectors equal, which means the <Katex tex="\underset{\sim}{i}" /> parts match <em>and</em> the <Katex tex="\underset{\sim}{j}" /> parts match, with the same <Katex tex="t" /> in both.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{i}: \quad t^2-1 = t^3-t" />,
    reason: <>Two equations, two unknowns (<Katex tex="t" /> and <Katex tex="a" />). Start with the one that has only one unknown: the <Katex tex="\underset{\sim}{i}" /> components have no <Katex tex="a" /> in them, so this equation pins down the collision time by itself.</>,
  },
  {
    working: <Katex display tex="t^3-t^2-t+1 = 0" />,
    reason: <>Everything onto one side, ready to factorise the cubic.</>,
  },
  {
    working: (
      <>
        <Katex display tex="t^2(t-1)-(t-1) = 0" />
        <Katex display tex="(t-1)\left(t^2-1\right) = (t-1)^2(t+1) = 0" />
      </>
    ),
    reason: (
      <>
        <p>
          Four terms, no obvious root formula: group them in pairs and take out the common factor{' '}
          <Katex tex="(t-1)" />, then factorise the difference of squares <Katex tex="t^2-1=(t-1)(t+1)" />.
        </p>
        <p className="mt-1.5">
          A quicker way to see it: <Katex tex="t^3-t=t(t^2-1)" />, so the equation says{' '}
          <Katex tex="t^2-1=t(t^2-1)" />, i.e. <Katex tex="(t^2-1)(t-1)=0" />. Don&apos;t divide both sides by{' '}
          <Katex tex="t^2-1" />: it can be zero, and dividing throws away the root <Katex tex="t=-1" />.
        </p>
      </>
    ),
  },
  {
    working: <Katex display tex="t=1 \ \text{(repeated)} \quad \text{or} \quad t=-1" />,
    reason: (
      <>
        <p>
          <Katex tex="t=-1" /> is outside the given domain <Katex tex="0\le t\le2" /> (it would be one unit of time before
          they started moving), so the collision happens at <Katex tex="t=1" />.
        </p>
        <p className="mt-1.5">
          The repeated root has a meaning: the sideways gap is <Katex tex="x_B-x_A=(t-1)^2(t+1)" />, which is never
          negative for <Katex tex="t\ge0" />. A draws level with B for just an instant at <Katex tex="t=1" /> and then
          falls behind again.
        </p>
      </>
    ),
    more: (
      <>
        Drag <Katex tex="t" /> in the diagram below to watch it.
      </>
    ),
  },
  {
    working: <Katex display tex="\underset{\sim}{j}: \quad a+\dfrac{t}{3} = \arccos\!\left(\dfrac{t}{2}\right)" />,
    reason: <>Now the <Katex tex="\underset{\sim}{j}" /> components, which is where <Katex tex="a" /> lives. The time is already fixed, so this equation has only one unknown left. At <Katex tex="t=1" /> both particles have <Katex tex="x=0" /> whatever <Katex tex="a" /> is; <Katex tex="a" /> just has to put A at the same height as B.</>,
  },
  {
    working: <Katex display tex="a+\dfrac{1}{3} = \arccos\!\left(\dfrac{1}{2}\right) = \dfrac{\pi}{3}" />,
    reason: <>Substitute <Katex tex="t=1" />. <Katex tex="\arccos\left(\tfrac12\right)" /> is the angle in <Katex tex="[0,\pi]" /> whose cosine is <Katex tex="\tfrac12" />, which is <Katex tex="\tfrac{\pi}{3}" /> (not <Katex tex="\tfrac{\pi}{6}" />; that one is <Katex tex="\arcsin\tfrac12" />).</>,
  },
  {
    working: <Katex display tex="\boxed{a = \dfrac{\pi}{3}-\dfrac13 = \dfrac{\pi-1}{3}}" />,
    reason: <>Check: at <Katex tex="t=1" />, particle <Katex tex="A" /> is at <Katex tex="(0,\ \tfrac{\pi}{3})" /> and particle <Katex tex="B" /> is at <Katex tex="\bigl(1-1,\ \arccos\tfrac12\bigr)=(0,\ \tfrac{\pi}{3})" /> ✓ — same point, same time.</>,
  },
]

export default function SpecialistQ4_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (3 marks)</p>
        <p className="mb-2">
          The position vectors of two particles <Katex tex="A" /> and <Katex tex="B" /> at time{' '}
          <Katex tex="t" /> seconds after they have started moving are given by
        </p>
        <Katex display tex="\underset{\sim}{r}_A(t) = \left(t^2-1\right)\underset{\sim}{i} + \left(a+\dfrac{t}{3}\right)\underset{\sim}{j}" className="my-2" />
        <Katex display tex="\underset{\sim}{r}_B(t) = \left(t^3-t\right)\underset{\sim}{i} + \arccos\!\left(\dfrac{t}{2}\right)\underset{\sim}{j}" className="my-2" />
        <p className="mb-2">
          respectively, where <Katex tex="a" /> is a real constant and <Katex tex="0\le t\le2" />.
        </p>
        <p>Find the value of <Katex tex="a" /> if the particles collide after they have started moving.</p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A position vector <Katex tex="\underset{\sim}{r}(t)=x(t)\,\underset{\sim}{i}+y(t)\,\underset{\sim}{j}" /> just
            says where the particle is at time <Katex tex="t" />: at the point <Katex tex="\bigl(x(t),\,y(t)\bigr)" />. Two
            vectors are equal exactly when their <Katex tex="\underset{\sim}{i}" /> components are equal and their{' '}
            <Katex tex="\underset{\sim}{j}" /> components are equal, so one vector equation gives two ordinary
            equations.
          </p>
          <p>
            Careful with the word <b>collide</b>. Two paths that cross are not enough — the
            particles must be at the crossing point <em>simultaneously</em>. So this is not "solve
            for where the paths meet"; it is "find a single <Katex tex="t" /> making both
            components agree".
          </p>
          <p>
            That gives a clean strategy: one component equation contains no unknown constant, so
            it pins down the time; the other then gives the constant.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Colliding means the same place at the same time, not just crossing paths">
          <CollideWidget />
        </Explore>
        <WrongMethod
          title="Find where the two paths cross"
          working={
            <>
              <Katex display tex="t^2-1=s^3-s" />
              <Katex display tex="a+\dfrac{t}{3}=\arccos\!\left(\dfrac{s}{2}\right)" />
            </>
          }
        >
          Giving each particle its own time (<Katex tex="t" /> for A, <Katex tex="s" /> for B) finds where the
          paths meet, but that is two equations in three unknowns, so it can&apos;t produce a single value of{' '}
          <Katex tex="a" />. In fact every <Katex tex="a" /> from about <Katex tex="-0.09" /> to{' '}
          <Katex tex="1.24" /> makes the paths cross somewhere (turn on &ldquo;Show where the paths cross&rdquo;
          above). A collision needs both particles at that point at the same moment, so use the same{' '}
          <Katex tex="t" /> in both components.
        </WrongMethod>
        <WrongMethod
          title="Use t = −1 as well"
          working={
            <>
              <Katex display tex="t=-1:\quad a-\dfrac13=\arccos\!\left(-\dfrac12\right)=\dfrac{2\pi}{3}" />
              <Katex display tex="a=\dfrac{2\pi+1}{3}" />
            </>
          }
        >
          At <Katex tex="t=-1" /> the <Katex tex="\underset{\sim}{i}" /> components really do match (both are{' '}
          <Katex tex="0" />), so the algebra gives no warning. The domain does: the question says{' '}
          <Katex tex="0\le t\le2" />, and <Katex tex="t=-1" /> is one unit of time before the particles started moving.
          Check every root of the time equation against the given domain before you use it.
        </WrongMethod>
        <SAExaminerReport stats={EXAMINER} maxMarks={3} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
