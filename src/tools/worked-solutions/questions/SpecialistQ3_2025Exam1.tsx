// 2025 Specialist Mathematics — Exam 1 Question 3 (5 marks). Rectilinear motion from a
// velocity function: displacement by integration, initial acceleration, then matching a
// second particle. Question text transcribed from the original paper. Answers checked with
// sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

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
    reason: <>Spot that <Katex tex="t" /> is (half) the derivative of the inside, <Katex tex="t^2+k" />: try <Katex tex="\left(t^2+k\right)^{1/2}" />. Its <Katex tex="\tfrac12" /> and the inner <Katex tex="2t" /> cancel exactly.</>,
    more: <>This is the reverse chain rule: when the integrand is (a multiple of) <Katex tex="f'(t)\left[f(t)\right]^n" />, the antiderivative is a multiple of <Katex tex="\left[f(t)\right]^{n+1}" />. Differentiating the guess and comparing tells you the multiple, which here is exactly 1, so no substitution is needed.</>,
  },
  {
    working: <Katex display tex="x(t) = \sqrt{t^2+k}+c" />,
    reason: <>The general antiderivative.</>,
  },
  {
    working: <Katex display tex="x(0) = 0: \quad \sqrt{k}+c = 0 \implies c = -\sqrt{k}" />,
    reason: <>The particle starts <em>at</em> <Katex tex="O" />, so its displacement is 0 when <Katex tex="t=0" />. This fixes the constant.</>,
    more: <>The report notes some students did not correctly apply the initial condition. Note <Katex tex="\sqrt{0^2+k}=\sqrt{k}" />, not 0, so <Katex tex="c" /> is not 0. "From rest" is a separate condition (<Katex tex="v(0)=0" />), which the given <Katex tex="v(t)" /> already satisfies; it plays no part in finding <Katex tex="c" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x(t) = \sqrt{t^2+k}-\sqrt{k}}" />,
    reason: <>As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="a = \frac{dv}{dt}, \qquad v = \frac{t}{\sqrt{t^2+k}}" />,
    reason: <>Acceleration is the derivative of velocity with respect to time, and <Katex tex="v" /> is given in terms of <Katex tex="t" />.</>,
    more: <>Because <Katex tex="v" /> is a function of time, this is an ordinary derivative; the <Katex tex="v\tfrac{dv}{dx}" /> forms are only needed when velocity is given in terms of position.</>,
  },
  {
    working: <Katex display tex="\frac{dv}{dt} = \frac{\sqrt{t^2+k}-t\cdot\frac{t}{\sqrt{t^2+k}}}{t^2+k}" />,
    reason: <>Quotient rule with <Katex tex="u=t" /> and <Katex tex="w=\sqrt{t^2+k}" />; the chain rule gives <Katex tex="w'=\dfrac{t}{\sqrt{t^2+k}}" />.</>,
    more: <>The report notes the quotient rule was not always applied correctly, and a correct final value built on an incorrect derivative did not earn full marks, so show <Katex tex="a(t)" /> in full. Alternatively, write <Katex tex="v=t\left(t^2+k\right)^{-1/2}" /> and use the product rule with the chain rule: <Katex tex="a=\left(t^2+k\right)^{-1/2}-t^2\left(t^2+k\right)^{-3/2}" />, which simplifies to the same result.</>,
  },
  {
    working: <Katex display tex="= \frac{\left(t^2+k\right)-t^2}{\left(t^2+k\right)^{3/2}} = \frac{k}{\left(t^2+k\right)^{3/2}}" />,
    reason: <>Multiplying numerator and denominator by <Katex tex="\sqrt{t^2+k}" /> clears the fraction inside the fraction.</>,
    more: <>Note <Katex tex="\left(t^2+k\right)\sqrt{t^2+k}=\left(t^2+k\right)^{3/2}" />. The <Katex tex="t^2" /> terms cancelling to leave a tidy <Katex tex="k" /> is a good sign the derivative is right.</>,
  },
  {
    working: <Katex display tex="t = 0: \quad a = \frac{k}{k^{3/2}} = k^{-1/2}" />,
    reason: <>"Initial" means <Katex tex="t=0" />. Then <Katex tex="k^{3/2}=k\sqrt{k}" />, so <Katex tex="\tfrac{k}{k^{3/2}}=\tfrac{1}{\sqrt{k}}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a(0) = \frac{1}{\sqrt{k}} \ \text{ m s}^{-2}}" />,
    reason: <>In terms of <Katex tex="k" />, as asked. Positive, as expected for a particle speeding up from rest.</>,
    more: <>In fact <Katex tex="a(t)=\dfrac{k}{\left(t^2+k\right)^{3/2}}>0" /> for all <Katex tex="t" />, so the particle never slows; its velocity rises towards 1 m s<Katex tex="^{-1}" /> but never reaches it.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="s(3)-x(3) = 1" />,
    reason: <>"Ahead by 1 m": the second particle's position minus the first's is 1. Both start at <Katex tex="O" /> on the same path, so positions compare directly.</>,
    more: <>Why is the second particle the one ahead? Its velocity is always 1, while the first particle's velocity <Katex tex="\tfrac{t}{\sqrt{t^2+k}}" /> is always less than 1, so <Katex tex="x(t)<t=s(t)" />. Setting it up the other way round, <Katex tex="x(3)-s(3)=1" />, leads to <Katex tex="\sqrt{9+k}-\sqrt{k}=4" />, then <Katex tex="\sqrt{k}=-\tfrac78" />, which has no solution.</>,
  },
  {
    working: <Katex display tex="3-\left(\sqrt{9+k}-\sqrt{k}\right) = 1 \implies \sqrt{9+k}-\sqrt{k} = 2" />,
    reason: <>Substituting both position functions.</>,
  },
  {
    working: <Katex display tex="\sqrt{9+k} = 2+\sqrt{k}" />,
    reason: <>Isolate one root <em>before</em> squaring, so that after squaring only one root remains.</>,
    more: <>The report notes some ineffective attempts at rearranging and squaring. Squaring <Katex tex="\sqrt{9+k}-\sqrt{k}=2" /> as it stands gives <Katex tex="9+2k-2\sqrt{k(9+k)}=4" />, which still contains a root and needs a second, messier round of squaring. Squaring each root separately (<Katex tex="9+k-k=4" />) is not valid: <Katex tex="(a-b)^2\ne a^2-b^2" />.</>,
  },
  {
    working: <Katex display tex="9+k = 4+4\sqrt{k}+k" />,
    reason: <>Squaring both sides; the right side expands as <Katex tex="(2+\sqrt{k})^2" />. The <Katex tex="k" /> cancels from both sides.</>,
  },
  {
    working: <Katex display tex="5 = 4\sqrt{k} \implies \sqrt{k} = \tfrac54" />,
    reason: <>Now only one root is left; solve for it.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \frac{25}{16}}" />,
    reason: <>Squaring <Katex tex="\tfrac54" />; positive, as <Katex tex="k" /> must be. Check: <Katex tex="\sqrt{9+\tfrac{25}{16}}-\tfrac54 = \tfrac{13}{4}-\tfrac54 = 2" /> ✓.</>,
    more: <>Squaring can introduce false solutions, which is why the check matters; here it confirms <Katex tex="k=\tfrac{25}{16}" />. Exact form is expected, as Exam 1 is technology-free.</>,
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

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The velocity is exactly the derivative of <Katex tex="\sqrt{t^2+k}" />, which is
              why part a. needs no substitution or by-parts work — just the reverse chain rule,
              plus the constant fixed by <Katex tex="x(0)=0" />.
            </p>
            <p>
              Part c. reduces to <Katex tex="\sqrt{9+k}-\sqrt{k}=2" />, an equation with two
              square roots. In general, to clear two square roots, isolate one of them, square,
              and repeat if a root remains.
            </p>
          </Background>
        </div>
      </DetailOnly>

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
