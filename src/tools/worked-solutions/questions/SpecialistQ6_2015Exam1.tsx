// 2015 Specialist Mathematics — Exam 1, Question 6 (4 marks). Acceleration given as a
// function of velocity, integrated against displacement. Question text transcribed from the
// original paper (no diagram given). Answer checked with sympy and against the VCAA
// examination report. Solution is original. This question has no lettered parts, so it uses
// the plain card layout rather than PartCard.
// Reviewed Oct 2026 (2014–2016 pass, review mode — no interactives): report traps (wrong form,
// log_e(4v), modulus/±e^5, sqrt(e^10), cubic) now addressed in the rows' `more`.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, ReportShelf, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [15, 11, 8, 6, 59],
  average: 2.8,
  comment: (
    <>
      The majority of students understood the need to use the relevant form for the
      acceleration <Katex tex="a" />. Some used an incorrect form. Quite a few integrated{' '}
      <Katex tex="\tfrac1{4v}" /> to get <Katex tex="\log_e(4v)" />, omitting the coefficient
      of <Katex tex="\tfrac14" />. A relatively small number of students forgot the constant of
      integration, while others made arithmetical slips in finding the constant of integration
      or a simplification slip in working with it. Some used modulus at the integration step
      and then gave the final answer as <Katex tex="\pm e^5" />. A few were unable to simplify{' '}
      <Katex tex="\sqrt{e^{10}}" />. Others integrated with respect to <Katex tex="v" /> to
      obtain a cubic.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a = v\frac{dv}{dx}" />,
    reason: <>The question links acceleration to <em>velocity</em> and asks about <em>displacement</em>, so pick the form of <Katex tex="a" /> that involves both and no time.</>,
    more: <>The report notes some students used an incorrect form. <Katex tex="a=\tfrac{dv}{dt}" /> would give <Katex tex="v" /> in terms of <Katex tex="t" />, but nothing in the question is given in terms of time, so you would need a second integration for <Katex tex="x" /> in terms of <Katex tex="t" />, then eliminate <Katex tex="t" />, before you could use <Katex tex="v=e" /> at <Katex tex="x=1" /> — far longer. The other <Katex tex="x" />-form, <Katex tex="\tfrac{d}{dx}\!\left(\tfrac12v^2\right)=4v^2" />, also works: with <Katex tex="u=\tfrac12v^2" /> it reads <Katex tex="\tfrac{du}{dx}=8u" />, so <Katex tex="u=Ae^{8x}" />; <Katex tex="u=\tfrac12e^2" /> at <Katex tex="x=1" /> gives <Katex tex="A=\tfrac12e^{-6}" />, so <Katex tex="\tfrac12v^2=\tfrac12e^{8x-6}" />. Then at <Katex tex="x=2" />, <Katex tex="v^2=e^{10}" /> and <Katex tex="v=\sqrt{e^{10}}=e^5" /> — the report says a few students couldn't finish that simplification.</>,
  },
  {
    working: <Katex display tex="v\frac{dv}{dx} = 4v^2" />,
    reason: <>Substituting the given rule.</>,
    more: <>Don't integrate <Katex tex="4v^2" /> with respect to <Katex tex="v" /> here — the report says some students did, getting a cubic. The left side is a rate with respect to <Katex tex="x" />, so the equation must be rearranged before anything is integrated.</>,
  },
  {
    working: <Katex display tex="\frac{dv}{dx} = 4v \qquad (v\ne0)" />,
    reason: <>Dividing by <Katex tex="v" />. Safe: <Katex tex="v=e>0" /> at <Katex tex="x=1" />, and <Katex tex="a=4v^2>0" /> means it only grows from there.</>,
    more: <>So <Katex tex="v>0" /> throughout the motion from <Katex tex="x=1" /> to <Katex tex="x=2" />, and the body moves in the positive direction, which is why it reaches <Katex tex="x=2" /> at all.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dv} = \frac{1}{4v}" />,
    reason: <>Flip both sides so the derivative is <Katex tex="\tfrac{dx}{dv}" />; then <Katex tex="x" /> is found by integrating <Katex tex="\tfrac1{4v}" /> with respect to <Katex tex="v" />.</>,
    more: <>Separating variables, <Katex tex="\int\tfrac1{4v}\,dv=\int1\,dx" />, gives exactly the same next line.</>,
  },
  {
    working: <Katex display tex="x = \tfrac14\log_e(v)+c" />,
    reason: <>Strictly <Katex tex="\tfrac14\log_e|v|" />, but <Katex tex="v>0" />, so the modulus is dropped. Keep the coefficient <Katex tex="\tfrac14" />.</>,
    more: <>Two traps from the report. Quite a few students wrote <Katex tex="\log_e(4v)" />: but <Katex tex="\tfrac1{4v}=\tfrac14\cdot\tfrac1v" />, and the constant <Katex tex="\tfrac14" /> just stays in front. And some kept the modulus, <Katex tex="|v|=e^5" />, then answered <Katex tex="\pm e^5" /> (see the final line). Don't forget the <Katex tex="+c" /> either — some students did.</>,
  },
  {
    working: <Katex display tex="1 = \tfrac14\log_e(e)+c = \tfrac14+c \implies c = \tfrac34" />,
    reason: <>Using <Katex tex="v=e" /> when <Katex tex="x=1" />, and <Katex tex="\log_e(e)=1" />.</>,
    more: <>The report notes arithmetical slips here. Go slowly: <Katex tex="\tfrac14\log_e(e)=\tfrac14\times1=\tfrac14" />, so <Katex tex="c=1-\tfrac14=\tfrac34" />.</>,
  },
  {
    working: <Katex display tex="x = \tfrac14\log_e(v)+\tfrac34" />,
    reason: <>The relationship between displacement and velocity.</>,
    more: <>Equivalently <Katex tex="v=e^{4x-3}" />. Check: at <Katex tex="x=1" /> this gives <Katex tex="e^{1}=e" />, matching the given condition.</>,
  },
  {
    working: <Katex display tex="2 = \tfrac14\log_e(v)+\tfrac34 \implies \log_e(v) = 5" />,
    reason: <>Substitute <Katex tex="x=2" /> and multiply by 4: <Katex tex="8=\log_e(v)+3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{v = e^5\ \text{ms}^{-1}}" />,
    reason: <>Since <Katex tex="\log_e(v)=5" />. Only the positive value: <Katex tex="v>0" /> throughout, so not <Katex tex="\pm e^5" />.</>,
    more: <>Check with <Katex tex="v=e^{4x-3}" />: at <Katex tex="x=2" />, <Katex tex="v=e^{8-3}=e^5" />.</>,
  },
]

export default function SpecialistQ6_2015Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 6 (4 marks)" always>
        <p>
          The acceleration <Katex tex="a" /> ms<sup>−2</sup> of a body moving in a straight
          line in terms of the velocity <Katex tex="v" /> ms<sup>−1</sup> is given by{' '}
          <Katex tex="a=4v^2" />.
        </p>
        <p>
          Given that <Katex tex="v=e" /> when <Katex tex="x=1" />, where <Katex tex="x" /> is
          the displacement of the body in metres, find the velocity of the body when{' '}
          <Katex tex="x=2" />.
        </p>
      </Background>
      <Background>
        <p>
          Acceleration has four standard forms —{' '}
          <Katex tex="\tfrac{dv}{dt}" />, <Katex tex="v\tfrac{dv}{dx}" />,{' '}
          <Katex tex="\tfrac{d}{dx}\!\left(\tfrac12v^2\right)" /> and{' '}
          <Katex tex="\tfrac{d^2x}{dt^2}" />. Choosing between them is the whole first step.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <ReportShelf stats={EXAM} maxMarks={4} />
    </div>
  )
}
