// 2019 Specialist Mathematics — Exam 1, Question 4 (3 marks).
// Two particles with given position vectors collide — find the constant a. Question text
// transcribed from the original paper (no diagram given). Cross-checked against the VCAA
// examination report and itute's independent solutions: all agree the collision is at t = 1 and
// a = (π−1)/3, though itute's printed factorisation of the cubic, (t²+1)(t−1), is not correct
// (it expands to t³−t²+t−1); the correct factorisation, verified by computer algebra, is
// (t−1)²(t+1), which has the same relevant root. Solution is original.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAMINER: SAExaminerStats = {
  marks: [15, 11, 9, 64],
  average: 2.2,
  comment: (
    <>
      Most students attempted to equate the components of the two position vectors in order to
      determine the value of <Katex tex="t" /> when the particles collided. Various algebraic and
      transcription errors were made, which meant they could not be awarded full marks. Finding
      the time when two particles are in the same position was noted as an area of strength.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Collision} \iff \underset{\sim}{r}_A(t) = \underset{\sim}{r}_B(t) \ \text{ for the same } t" />,
    reason: <>Two particles collide only if they are at the same place <em>at the same moment</em> — so both components must match at a single common value of <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{i}: \quad t^2-1 = t^3-t" />,
    reason: <>Equate the <Katex tex="\underset{\sim}{i}" /> components first — this one has no <Katex tex="a" /> in it, so it determines the collision time on its own.</>,
  },
  {
    working: <Katex display tex="t^3-t^2-t+1 = 0" />,
    reason: <>Everything onto one side.</>,
  },
  {
    working: (
      <>
        <Katex display tex="t^2(t-1)-(t-1) = 0" />
        <Katex display tex="(t-1)\left(t^2-1\right) = (t-1)^2(t+1) = 0" />
      </>
    ),
    reason: <>Group in pairs and take out the common factor <Katex tex="(t-1)" />, then factorise the difference of squares <Katex tex="t^2-1=(t-1)(t+1)" />.</>,
  },
  {
    working: <Katex display tex="t=1 \ \text{(repeated)} \quad \text{or} \quad t=-1" />,
    reason: <><Katex tex="t=-1" /> is outside the given domain <Katex tex="0\le t\le2" /> — time doesn't run backwards here — so the collision happens at <Katex tex="t=1" />. This is also "after they have started moving", as required.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{j}: \quad a+\dfrac{t}{3} = \arccos\!\left(\dfrac{t}{2}\right)" />,
    reason: <>Now use the <Katex tex="\underset{\sim}{j}" /> components, which is where <Katex tex="a" /> lives, at the collision time just found.</>,
  },
  {
    working: <Katex display tex="a+\dfrac{1}{3} = \arccos\!\left(\dfrac{1}{2}\right) = \dfrac{\pi}{3}" />,
    reason: <>Substituting <Katex tex="t=1" />. The exact value <Katex tex="\arccos\left(\tfrac12\right)=\tfrac{\pi}{3}" /> is the angle in <Katex tex="[0,\pi]" /> whose cosine is <Katex tex="\tfrac12" />.</>,
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
        <SAExaminerReport stats={EXAMINER} maxMarks={3} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
