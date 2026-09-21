// 2015 Specialist Mathematics — Exam 1, Question 6 (4 marks). Acceleration given as a
// function of velocity, integrated against displacement. Question text transcribed from the
// original paper (no diagram given). Answer checked with sympy and against the VCAA
// examination report. Solution is original. This question has no lettered parts, so it uses
// the plain card layout rather than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [15, 11, 8, 6, 59],
  average: 2.8,
  comment: (
    <>
      The majority of students understood the need to use the relevant form for the
      acceleration. Quite a few integrated <Katex tex="\tfrac1{4v}" /> to get{' '}
      <Katex tex="\log_e(4v)" />, omitting the coefficient of <Katex tex="\tfrac14" />. A
      relatively small number of students forgot the constant of integration, while others
      made arithmetical slips in finding it. Some used a modulus at the integration step and
      then gave the final answer as <Katex tex="\pm e^5" />. A few were unable to simplify.
      Others integrated with respect to <Katex tex="v" /> to obtain a cubic.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a = v\frac{dv}{dx}" />,
    reason: <>The question links acceleration to <em>velocity</em> and asks about <em>displacement</em>, so pick the form of <Katex tex="a" /> that involves both and no time.</>,
  },
  {
    working: <Katex display tex="v\frac{dv}{dx} = 4v^2" />,
    reason: <>Substituting the given rule.</>,
  },
  {
    working: <Katex display tex="\frac{dv}{dx} = 4v \qquad (v\ne0)" />,
    reason: <>Dividing by <Katex tex="v" />. Since <Katex tex="v=e" /> at <Katex tex="x=1" />, the velocity is positive, so this division is safe and the modulus later can be dropped.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dv} = \frac{1}{4v}" />,
    reason: <>Inverting is easier than separating: it makes the right-hand side a function of <Katex tex="v" /> alone.</>,
  },
  {
    working: <Katex display tex="x = \tfrac14\log_e(v)+c" />,
    reason: <>The coefficient <Katex tex="\tfrac14" /> is the step the report says was most often dropped.</>,
  },
  {
    working: <Katex display tex="1 = \tfrac14\log_e(e)+c = \tfrac14+c \implies c = \tfrac34" />,
    reason: <>Using <Katex tex="v=e" /> when <Katex tex="x=1" />, and <Katex tex="\log_e(e)=1" />.</>,
  },
  {
    working: <Katex display tex="x = \tfrac14\log_e(v)+\tfrac34" />,
    reason: <>The relationship between displacement and velocity.</>,
  },
  {
    working: <Katex display tex="2 = \tfrac14\log_e(v)+\tfrac34 \implies \log_e(v) = 5" />,
    reason: <>Substituting <Katex tex="x=2" /> and multiplying through by 4: <Katex tex="8-3=5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{v = e^5\ \text{ms}^{-1}}" />,
    reason: <>Positive, as it must be — the velocity started positive and <Katex tex="a=4v^2>0" /> only ever increases it.</>,
  },
]

export default function SpecialistQ6_2015Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 6 (4 marks)">
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
        <p>
          Acceleration has four standard forms —{' '}
          <Katex tex="\tfrac{dv}{dt}" />, <Katex tex="v\tfrac{dv}{dx}" />,{' '}
          <Katex tex="\tfrac{d}{dx}\!\left(\tfrac12v^2\right)" /> and{' '}
          <Katex tex="\tfrac{d^2x}{dt^2}" />. Choosing between them is the whole first step:
          here the data and the question are both about <Katex tex="v" /> and{' '}
          <Katex tex="x" />, with time never mentioned.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={4} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
