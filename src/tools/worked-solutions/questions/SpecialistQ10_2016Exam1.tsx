// 2016 Specialist Mathematics — Exam 1, Question 10 (5 marks). A separable differential
// equation with an inverse-sine antiderivative, completing the square, and a root choice.
// Question text transcribed from the original paper (no diagram given). Answer checked
// with sympy and against the VCAA examination report. Solution is original. No lettered
// parts, so this uses the plain card layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [20, 15, 12, 31, 7, 14],
  average: 2.4,
  comment: (
    <>
      Students found this question challenging. Most students were able to separate the
      variables correctly, but there were then many errors in the subsequent integration.
      Errors were seen in the integration of the polynomial part but far more in the
      integration of the term involving the reciprocal of the square root, despite the
      formula being on the formula sheet. It was common for logarithms to be seen. Some
      students were unable to proceed by completing the square or otherwise having
      integrated. A large number of students, when confronted with a square equals a
      constant, gave only the positive root. Many gave both roots but did not realise that
      only the negative root satisfied the initial conditions. Several students omitted the
      constant of integration; others made mistakes when attempting to evaluate the
      constant. A number of students interpreted <Katex tex="y(1)=0" /> as{' '}
      <Katex tex="x=0" /> when <Katex tex="y=1" />, while some attempted to solve for{' '}
      <Katex tex="x" /> rather than <Katex tex="y" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\sqrt{2-x^2}\,\frac{dy}{dx} = \frac{1}{2-y}" />,
    reason: <>The equation as given.</>,
  },
  {
    working: <Katex display tex="(2-y)\,dy = \frac{dx}{\sqrt{2-x^2}}" />,
    reason: <>Separating: all the <Katex tex="y" />s on one side, all the <Katex tex="x" />s on the other.</>,
  },
  {
    working: <Katex display tex="2y-\frac{y^2}{2} = \arcsin\!\left(\frac{x}{\sqrt2}\right)+c" />,
    reason: <>The right-hand side is the standard form <Katex tex="\int\tfrac{dx}{\sqrt{a^2-x^2}}=\arcsin\!\left(\tfrac{x}{a}\right)" /> with <Katex tex="a=\sqrt2" /> — it is on the formula sheet. The report says logarithms appeared here instead.</>,
  },
  {
    working: <Katex display tex="y(1)=0: \quad 0 = \arcsin\!\left(\frac{1}{\sqrt2}\right)+c = \frac{\pi}{4}+c" />,
    reason: <>Substituting the initial condition: <Katex tex="y(1)=0" /> means <Katex tex="y=0" /> when <Katex tex="x=1" />, not the other way round. <Katex tex="\arcsin\!\left(\tfrac{1}{\sqrt2}\right)=\tfrac{\pi}{4}" />.</>,
  },
  {
    working: <Katex display tex="c = -\frac{\pi}{4} \implies 2y-\frac{y^2}{2} = \arcsin\!\left(\frac{x}{\sqrt2}\right)-\frac{\pi}{4}" />,
    reason: <>Now rearrange to make <Katex tex="y" /> the subject, as the question demands.</>,
  },
  {
    working: <Katex display tex="y^2-4y = -2\arcsin\!\left(\frac{x}{\sqrt2}\right)+\frac{\pi}{2}" />,
    reason: <>Multiplying through by <Katex tex="-2" /> and reversing the sides.</>,
  },
  {
    working: <Katex display tex="(y-2)^2 = 4+\frac{\pi}{2}-2\arcsin\!\left(\frac{x}{\sqrt2}\right)" />,
    reason: <>Completing the square: add <Katex tex="4" /> to both sides.</>,
  },
  {
    working: <Katex display tex="y = 2\pm\sqrt{4+\frac{\pi}{2}-2\arcsin\!\left(\frac{x}{\sqrt2}\right)}" />,
    reason: <>Both roots — the report says a large number of students wrote only the positive one.</>,
  },
  {
    working: <Katex display tex="x=1: \quad 4+\frac{\pi}{2}-2\times\frac{\pi}{4} = 4 \implies y = 2\pm2" />,
    reason: <>Testing the initial condition on each root: the plus gives <Katex tex="y=4" />, the minus gives <Katex tex="y=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 2-\sqrt{4+\frac{\pi}{2}-2\arcsin\!\left(\frac{x}{\sqrt2}\right)}}" />,
    reason: <>Only the negative root passes through <Katex tex="(1,0)" />. A solution of a first-order differential equation with a given initial condition is a single function, not a pair.</>,
  },
]

export default function SpecialistQ10_2016Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 10 (5 marks)">
        <p>
          Solve the differential equation{' '}
          <Katex tex="\sqrt{2-x^2}\,\dfrac{dy}{dx}=\dfrac{1}{2-y}" />, given that{' '}
          <Katex tex="y(1)=0" />. Express <Katex tex="y" /> as a function of{' '}
          <Katex tex="x" />.
        </p>
      </Background>
      <Background>
        <p>
          Three separate places to lose marks: recognising{' '}
          <Katex tex="\tfrac{1}{\sqrt{a^2-x^2}}" /> as an inverse sine rather than a
          logarithm; completing the square to make <Katex tex="y" /> the subject; and
          choosing between the two roots at the end.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={5} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
