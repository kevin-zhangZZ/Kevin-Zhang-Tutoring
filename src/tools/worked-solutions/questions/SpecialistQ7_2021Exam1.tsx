// 2021 Specialist Mathematics — Exam 1 Question 7 (5 marks). A separable differential
// equation, then reading the maximum off the solution. Question text transcribed from the
// original paper. Answers checked with sympy and against the VCAA examination report.
// Solution is original.
// Interactive: part b has spec-2021e1-q7b-repeating-max (slide t along x = e^(1 − cos t) and
// watch the maximum e² come back at t = π, 3π, 5π, …).

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const RepeatingMax = lazyWidget(() => import('../interactives/spec-2021e1-q7b-repeating-max'))

const EXAM_A: SAExaminerStats = {
  marks: [15, 6, 14, 66],
  average: 2.3,
  comment: (
    <>
      The majority of students were able to separate the differential equation correctly and
      make progress towards the solution. Some sign errors were seen when the trigonometric
      function was integrated.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [58, 34, 8],
  average: 0.5,
  comment: (
    <>
      The maximum displacement of the particle could be found by inspection. Most students
      did not attempt or were unable to give the correct times at which the maximum
      occurred.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dx}{dt} = x\sin(t) \implies \frac{1}{x}\,dx = \sin(t)\,dt" />,
    reason: <>The right side is (a function of <Katex tex="x" />) × (a function of <Katex tex="t" />), so the variables separate: divide by <Katex tex="x" /> (allowed, since <Katex tex="x" /> starts at 1, not 0) to get everything in <Katex tex="x" /> on the left and everything in <Katex tex="t" /> on the right.</>,
  },
  {
    working: <Katex display tex="\int\frac{1}{x}\,dx = \int\sin(t)\,dt" />,
    reason: <>Integrating both sides.</>,
  },
  {
    working: <Katex display tex="\log_e|x| = -\cos(t)+c" />,
    reason: <>The antiderivative of <Katex tex="\sin(t)" /> is <em>minus</em> <Katex tex="\cos(t)" /> — check by differentiating: <Katex tex="\tfrac{d}{dt}\big({-\cos(t)}\big)=\sin(t)" />. The report notes some sign errors here. One constant <Katex tex="c" /> on one side is enough.</>,
  },
  {
    working: <Katex display tex="t=0, \ x=1: \ \log_e(1) = -1+c \implies c = 1" />,
    reason: <>Substitute the initial condition (displacement 1 cm at the start). <Katex tex="\cos(0)=1" /> and <Katex tex="\log_e(1)=0" />.</>,
  },
  {
    working: <Katex display tex="\log_e(x) = 1-\cos(t)" />,
    reason: <>Why the absolute value can be dropped: this says <Katex tex="|x| = e^{1-\cos(t)}" />, which is never 0. So <Katex tex="x" /> can never pass through 0, and since it starts positive (<Katex tex="x=1" />), it stays positive, giving <Katex tex="|x| = x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = e^{1-\cos(t)}}" />,
    reason: <>Check: <Katex tex="x(0)=e^0=1" /> ✓, and <Katex tex="\tfrac{dx}{dt}=e^{1-\cos t}\sin t = x\sin t" /> ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="x = e^{1-\cos(t)} \text{ is largest when } 1-\cos(t) \text{ is largest}" />,
    reason: <><Katex tex="e^u" /> is increasing, so maximising <Katex tex="x" /> means maximising the exponent — no calculus needed.</>,
  },
  {
    working: <Katex display tex="\cos(t) \ge -1, \text{ so } 1-\cos(t) \le 2" />,
    reason: <><Katex tex="\cos(t)" /> lies between <Katex tex="-1" /> and <Katex tex="1" />, so <Katex tex="1-\cos(t)" /> lies between 0 and 2. The top value 2 is actually reached, whenever <Katex tex="\cos(t)=-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x_{\max} = e^2\ \text{cm}}" />,
    reason: <><Katex tex="e^2" /> is exact, as the technology-free exam expects. Since <Katex tex="x>0" /> always, the largest <Katex tex="x" /> is the maximum displacement.</>,
  },
  {
    working: <Katex display tex="\cos(t) = -1 \implies t = \pi,\ 3\pi,\ 5\pi,\ \ldots" />,
    reason: <>On the unit circle, <Katex tex="\cos(t)=-1" /> only at the point <Katex tex="(-1,0)" />: first at <Katex tex="t=\pi" />, then again after every full turn of <Katex tex="2\pi" />. So the maximum is not a one-off: it comes back at every odd multiple of <Katex tex="\pi" />.</>,
    more: <>Slide <Katex tex="t" /> in the diagram below to see it.</>,
  },
  {
    working: <Katex display tex="\boxed{t = (2k+1)\pi \text{ seconds}, \quad k \in \{0,1,2,\ldots\}}" />,
    reason: <>The question asks for <em>the times</em>, so give the general rule, not just <Katex tex="t=\pi" />. Time starts at <Katex tex="t=0" />, so negative <Katex tex="k" /> is excluded (the report writes this as <Katex tex="k \in N \cup \{0\}" />). Both halves are needed for the 2 marks: the maximum <Katex tex="e^2" /> and these times. The report notes most students did not attempt or were unable to give these times.</>,
  },
]

export default function SpecialistQ7_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (5 marks)</p>
        <p>
          The velocity of a particle satisfies the differential equation{' '}
          <Katex tex="\dfrac{dx}{dt}=x\sin(t)" />, where <Katex tex="x" /> centimetres is its
          displacement relative to a fixed point <Katex tex="O" /> at time <Katex tex="t" />{' '}
          seconds.
          <br />
          Initially, the displacement of the particle is 1 cm.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Separable DE"
        marks={3}
        statement={
          <>
            Find an expression for <Katex tex="x" /> in terms of <Katex tex="t" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Maximum Displacement"
        marks={2}
        statement={
          <>
            Find the maximum displacement of the particle and the times at which this occurs.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="Why the maximum happens at infinitely many times">
          <RepeatingMax />
        </Explore>
      </PartCard>
    </div>
  )
}
