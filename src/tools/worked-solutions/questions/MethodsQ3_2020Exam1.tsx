// 2020 Mathematical Methods — Exam 1, Question 3 (3 marks). Recovering a and b in
// y = tan(ax + b) from two labelled points. Question text transcribed from the original
// paper; the figure is a crop of VCAA's own artwork. Answers checked with sympy and against
// the VCAA examination report. Solution is original. This question has no lettered parts, so
// it uses the plain card layout rather than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2020e1-q3-tan.png'

const EXAM: SAExaminerStats = {
  marks: [27, 22, 28, 23],
  average: 1.5,
  comment: (
    <>
      Most students were able to substitute from the points labelled on the graph, however,
      many did not proceed further. Many of those who did proceed used incorrect angles.
      Students are expected to know exact values for the circular functions. A common error
      was to use <Katex tex="\tfrac{3\pi}{4}" /> in the first equation or{' '}
      <Katex tex="\tfrac\pi6" /> in the second equation.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="(-1,-1): \quad \tan(-a+b) = -1" />,
    reason: <>Substituting the left-hand labelled point into <Katex tex="y=\tan(ax+b)" />.</>,
  },
  {
    working: <Katex display tex="-a+b = -\tfrac\pi4" />,
    reason: <>The graph is continuous on <Katex tex="[-1,1]" />, so it stays inside one branch of the tangent and each angle is the principal one: <Katex tex="\tan^{-1}(-1)=-\tfrac\pi4" />, not <Katex tex="\tfrac{3\pi}4" />.</>,
  },
  {
    working: <Katex display tex="\left(1,\sqrt3\right): \quad \tan(a+b) = \sqrt3" />,
    reason: <>The right-hand point.</>,
  },
  {
    working: <Katex display tex="a+b = \tfrac\pi3" />,
    reason: <><Katex tex="\tan\!\left(\tfrac\pi3\right)=\sqrt3" /> — using <Katex tex="\tfrac\pi6" /> here is the report's other common error, since <Katex tex="\tan\!\left(\tfrac\pi6\right)=\tfrac1{\sqrt3}" />.</>,
  },
  {
    working: <Katex display tex="\text{adding: } 2b = \tfrac\pi3-\tfrac\pi4 = \tfrac{4\pi-3\pi}{12}" />,
    reason: <>The <Katex tex="a" /> terms cancel.</>,
  },
  {
    working: <Katex display tex="\boxed{b = \tfrac\pi{24}}" />,
    reason: <><Katex tex="\tfrac\pi{24}\approx0.13" />, which satisfies <Katex tex="0<b<1" /> ✓.</>,
  },
  {
    working: <Katex display tex="a = b+\tfrac\pi4 = \tfrac\pi{24}+\tfrac{6\pi}{24}" />,
    reason: <>From the first equation.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \tfrac{7\pi}{24}}" />,
    reason: <>Positive ✓. Check the period: <Katex tex="\tfrac\pi a=\tfrac{24}7\approx3.4" />, comfortably wider than the interval <Katex tex="[-1,1]" /> the graph is continuous on.</>,
  },
]

export default function MethodsQ3_2020Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 3 (3 marks)">
        <p>
          Shown below is part of the graph of a period of the function of the form{' '}
          <Katex tex="y=\tan(ax+b)" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="One branch of a tangent curve rising between two dashed vertical asymptotes, passing through the marked points (−1, −1) and (1, √3) — from the original 2020 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
        <p>
          The graph is continuous for <Katex tex="x\in[-1,1]" />. Find the value of{' '}
          <Katex tex="a" /> and the value of <Katex tex="b" />, where <Katex tex="a>0" /> and{' '}
          <Katex tex="0<b<1" />.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={3} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
