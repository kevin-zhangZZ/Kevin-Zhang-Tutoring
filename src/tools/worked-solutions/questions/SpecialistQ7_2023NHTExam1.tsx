// 2023 Specialist NHT — Exam 1, Question 7 (5 marks). The NHT report gives sample answers only,
// with no statistics; its alternative answer for part b. (the limit as t → ∞) is quoted as that
// part's examiner comment. A particle falling from rest with a = g − 2v: separate dv/dt = g − 2v to
// get v = (g/2)(1 − e^(−2t)), then the terminal velocity g/2. A kinematics differential equation
// (no force analysis), so on the current study design. Question text transcribed from the original
// paper. Answers checked with sympy (dsolve with v(0) = 0) and against the report's sample answers.
// Solution is original; it inverts dt/dv = 1/(g − 2v) as the report does.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT_B: SAExaminerStats = {
  comment: (
    <>
      Alternatively, <Katex tex="\displaystyle\lim_{t\to\infty}\frac{g}{2}\left(1-e^{-2t}\right)=\frac{g}{2}" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dv}{dt}=g-2v" />,
    reason: <>Acceleration is the rate of change of velocity with time, and we want <Katex tex="v" /> in terms of <Katex tex="t" />, so write <Katex tex="a" /> as <Katex tex="\tfrac{dv}{dt}" />.</>,
  },
  {
    working: <Katex display tex="\frac{dt}{dv}=\frac{1}{g-2v}\implies t=\int\frac{1}{g-2v}\,dv" />,
    reason: <>The right side depends only on <Katex tex="v" />, so flip both sides and integrate with respect to <Katex tex="v" />.</>,
  },
  {
    working: <Katex display tex="t=-\frac12\log_e(g-2v)+c" />,
    reason: <>An antiderivative of <Katex tex="\tfrac{1}{g-2v}" /> is <Katex tex="\log_e" /> of the denominator divided by the coefficient of <Katex tex="v" />, <Katex tex="-2" />. No modulus is needed: the particle starts with <Katex tex="g-2v=g>0" /> and, as we will see, <Katex tex="v" /> never reaches <Katex tex="\tfrac g2" />, so <Katex tex="g-2v" /> stays positive.</>,
    more: <>Missing the <Katex tex="-\tfrac12" /> (writing <Katex tex="t=\log_e(g-2v)+c" />) is the slip to watch for. Check by differentiating: <Katex tex="\tfrac{d}{dv}\left(-\tfrac12\log_e(g-2v)\right)=-\tfrac12\times\tfrac{-2}{g-2v}=\tfrac{1}{g-2v}" /> ✓.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&t=0,\ v=0:\\ &0=-\tfrac12\log_e(g)+c\\ &c=\tfrac12\log_e(g)\end{aligned}" />,
    reason: <>&ldquo;Falls from rest&rdquo; means <Katex tex="v=0" /> when <Katex tex="t=0" />. Use it to find the constant.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}t&=\tfrac12\log_e(g)-\tfrac12\log_e(g-2v)\\ &=\frac12\log_e\!\left(\frac{g}{g-2v}\right)\end{aligned}" />,
    reason: <>Combine the logs with <Katex tex="\log_e(A)-\log_e(B)=\log_e\!\left(\tfrac AB\right)" />.</>,
  },
  {
    working: <Katex display tex="e^{2t}=\frac{g}{g-2v}\implies g-2v=ge^{-2t}" />,
    reason: <>Multiply by 2 and exponentiate both sides, then take reciprocals.</>,
  },
  {
    working: <Katex display tex="2v=g-ge^{-2t}\implies v=\frac{g}{2}\left(1-e^{-2t}\right)" />,
    reason: <>Make <Katex tex="v" /> the subject. As required.</>,
    more: <>Check it satisfies everything: at <Katex tex="t=0" />, <Katex tex="v=\tfrac g2(1-1)=0" /> ✓; and <Katex tex="\tfrac{dv}{dt}=\tfrac g2\times2e^{-2t}=ge^{-2t}" />, while <Katex tex="g-2v=g-g\left(1-e^{-2t}\right)=ge^{-2t}" /> ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="a=0\implies g-2v=0" />,
    reason: <>The limiting velocity is the speed the particle settles at, where it stops speeding up: the acceleration is zero.</>,
  },
  {
    working: <Katex display tex="\boxed{v=\frac{g}{2}=4.9\ \text{ms}^{-1}}" />,
    reason: <>VCAA gives the answer as <Katex tex="\tfrac g2" />; with <Katex tex="g=9.8" /> from the paper&apos;s instructions it is 4.9. It agrees with part a.: as <Katex tex="t\to\infty" />, <Katex tex="e^{-2t}\to0" /> and <Katex tex="v\to\tfrac g2" />, but <Katex tex="v" /> never actually reaches it.</>,
  },
]

export default function SpecialistQ7_2023NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (5 marks)</p>
        <p>
          A particle falls from rest such that its acceleration, in <Katex tex="\text{ms}^{-2}" />, is given by{' '}
          <Katex tex="a=g-2v" />, where <Katex tex="v" /> is the velocity of the particle, in{' '}
          <Katex tex="\text{ms}^{-1}" />, at time <Katex tex="t" /> seconds.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Separable Differential Equations"
        marks={4}
        statement={
          <>
            Solve a suitable differential equation to show that <Katex tex="v=\dfrac{g}{2}\left(1-e^{-2t}\right)" />.
          </>
        }
      >
        <Background>
          <p>
            When <Katex tex="\tfrac{dv}{dt}" /> depends on <Katex tex="v" /> only, flip it:{' '}
            <Katex tex="\tfrac{dt}{dv}=\tfrac{1}{f(v)}" />, integrate with respect to <Katex tex="v" /> to
            get <Katex tex="t" /> in terms of <Katex tex="v" />, use the initial condition to fix the
            constant, and then rearrange for <Katex tex="v" />. The <Katex tex="-2v" /> in the
            acceleration is a resistance that grows with speed, which is why the particle cannot speed
            up forever.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Terminal Velocity"
        marks={1}
        statement={<>Write down the limiting (terminal) velocity of the particle in <Katex tex="\text{ms}^{-1}" />.</>}
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
