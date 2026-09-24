// 2025 Specialist Mathematics — Exam 1 Question 3 (5 marks). Rectilinear motion from a
// velocity function: displacement by integration, initial acceleration, then matching a
// second particle. Question text transcribed from the original paper. Answers checked with
// sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [29, 71],
  average: 0.7,
  comment: (
    <>
      In this question the result was given. While this question was generally well answered, some
      students did not correctly apply the initial condition in order to find the value of the
      constant of integration.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [19, 24, 57],
  average: 1.4,
  comment: (
    <>
      Students needed to apply the quotient rule (or the chain rule) to find{' '}
      <Katex tex="a(t)" />. The quotient rule was not always applied correctly so while the correct
      value for the initial acceleration may have been given, full marks would not have been
      obtained due to the incorrect derivative.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [49, 23, 28],
  average: 0.8,
  comment: (
    <>
      Some ineffective attempts at rearranging and squaring were seen in some responses. Only a
      small proportion of students were able to arrive successfully at the correct answer.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x(t) = \int v(t)\,dt = \int t\left(t^2+k\right)^{-1/2}dt" />,
    reason: <>Displacement is the antiderivative of velocity.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dt}\left(t^2+k\right)^{1/2} = t\left(t^2+k\right)^{-1/2}" />,
    reason: <>The reverse chain rule: the <Katex tex="2t" /> from the inner derivative exactly meets the <Katex tex="\tfrac12" /> from the power, so no extra constant is needed.</>,
  },
  {
    working: <Katex display tex="x(t) = \sqrt{t^2+k}+c" />,
    reason: <>The general antiderivative.</>,
  },
  {
    working: <Katex display tex="x(0) = 0: \quad \sqrt{k}+c = 0 \implies c = -\sqrt{k}" />,
    reason: <>"Starts from rest at <Katex tex="O" />" fixes the constant — the report notes some students did not apply it correctly.</>,
  },
  {
    working: <Katex display tex="\boxed{x(t) = \sqrt{t^2+k}-\sqrt{k}}" />,
    reason: <>As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="a = \frac{dv}{dt}, \qquad v = \frac{t}{\sqrt{t^2+k}}" />,
    reason: <>Velocity is given as a function of <em>time</em>, so this is an ordinary derivative — no need for the <Katex tex="v\tfrac{dv}{dx}" /> forms.</>,
  },
  {
    working: <Katex display tex="\frac{dv}{dt} = \frac{\sqrt{t^2+k}-t\cdot\frac{t}{\sqrt{t^2+k}}}{t^2+k}" />,
    reason: <>Quotient rule, with the chain rule on the denominator.</>,
  },
  {
    working: <Katex display tex="= \frac{\left(t^2+k\right)-t^2}{\left(t^2+k\right)^{3/2}} = \frac{k}{\left(t^2+k\right)^{3/2}}" />,
    reason: <>Multiplying numerator and denominator by <Katex tex="\sqrt{t^2+k}" />. The tidy result is the sign that the quotient rule was applied correctly.</>,
  },
  {
    working: <Katex display tex="t = 0: \quad a = \frac{k}{k^{3/2}} = k^{-1/2}" />,
    reason: <>Substituting the initial time.</>,
  },
  {
    working: <Katex display tex="\boxed{a(0) = \frac{1}{\sqrt{k}} \ \text{ m s}^{-2}}" />,
    reason: <>Positive, as it must be for a particle starting from rest and speeding up. Note <Katex tex="a>0" /> for all <Katex tex="t" />, so the particle never slows.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="s(3)-x(3) = 1" />,
    reason: <>"Ahead by 1 m" — the second particle minus the first.</>,
  },
  {
    working: <Katex display tex="3-\left(\sqrt{9+k}-\sqrt{k}\right) = 1 \implies \sqrt{9+k}-\sqrt{k} = 2" />,
    reason: <>Substituting both position functions.</>,
  },
  {
    working: <Katex display tex="\sqrt{9+k} = 2+\sqrt{k}" />,
    reason: <>Isolating one root before squaring is what makes this work — squaring the difference directly leaves a cross term <Katex tex="\sqrt{k(9+k)}" /> that needs a second round of squaring. The report notes some ineffective attempts at rearranging and squaring.</>,
  },
  {
    working: <Katex display tex="9+k = 4+4\sqrt{k}+k" />,
    reason: <>Squaring. The <Katex tex="k" /> cancels from both sides.</>,
  },
  {
    working: <Katex display tex="5 = 4\sqrt{k} \implies \sqrt{k} = \tfrac54" />,
    reason: <>A single remaining root.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \frac{25}{16}}" />,
    reason: <>Positive, as required. Check: <Katex tex="\sqrt{9+\tfrac{25}{16}}-\tfrac54 = \tfrac{13}{4}-\tfrac54 = 2" /> ✓.</>,
  },
]

export default function SpecialistQ3_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (5 marks)</p>
        <p>
          A particle starts from rest at a fixed point <Katex tex="O" /> and travels in a
          straight line.
        </p>
        <p>
          The velocity, <Katex tex="v" /> m s<Katex tex="^{-1}" />, of the
          particle at time <Katex tex="t" /> seconds has equation{' '}
          <Katex tex="v(t)=\dfrac{t}{\sqrt{t^2+k}}" />, where <Katex tex="k" /> is a positive
          constant and <Katex tex="t\ge0" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The velocity is exactly the derivative of <Katex tex="\sqrt{t^2+k}" />, which is
            why part a. needs no substitution or by-parts work — just the reverse chain rule,
            plus the constant fixed by <Katex tex="x(0)=0" />.
          </p>
          <p>
            Part c. reduces to <Katex tex="\sqrt{9+k}-\sqrt{k}=2" />. The reliable way to
            clear two square roots is to isolate one of them <em>before</em> squaring;
            squaring the difference as it stands leaves a <Katex tex="\sqrt{k(9+k)}" /> term
            that needs a second round of squaring.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Displacement"
        marks={1}
        statement={
          <>
            Use integration to show that the displacement, <Katex tex="x" /> metres, of the
            particle relative to <Katex tex="O" /> is given by{' '}
            <Katex tex="x(t)=\sqrt{t^2+k}-\sqrt{k}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Acceleration"
        marks={2}
        statement={
          <>
            Find the initial acceleration, in terms of <Katex tex="k" />, of the particle in
            m s<Katex tex="^{-2}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Meeting Times"
        marks={2}
        statement={
          <>
            Another particle starts at <Katex tex="O" /> at the same time as the first
            particle and follows the same path.
            <br />
            Its position relative to <Katex tex="O" /> is described by the equation{' '}
            <Katex tex="s(t)=t" />.
            <br />
            Three seconds after leaving <Katex tex="O" /> the second particle is 1 m ahead of the
            first particle.
            <br />
            Find the value of <Katex tex="k" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
