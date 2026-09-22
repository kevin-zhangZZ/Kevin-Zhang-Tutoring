// 2023 Mathematical Methods — Exam 1 Question 4 (2 marks). Two trapeziums approximating an
// area, with calculus explicitly not allowed. Question text transcribed from the original
// paper; the figure is a crop of VCAA's own artwork. Answer checked with sympy and against
// the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2023e1-q4-graph.png'

const EXAM: SAExaminerStats = {
  marks: [35, 20, 45],
  average: 1.1,
  comment: (
    <>
      Any attempt to calculate this area using integral calculus was not acceptable. Some
      students gave the formula as stated on the formula sheet; however, many did not proceed
      to identify and substitute the correct values. Common errors involved incorrect values
      of <Katex tex="f(2)" />, given as <Katex tex="\tfrac32" /> instead of{' '}
      <Katex tex="\tfrac52" />, and incorrect values of <Katex tex="f(3)" />. Arithmetic
      manipulation errors frequently arose from dealing with the different denominators.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Two trapeziums of equal width across } [1,3] \implies \text{width } = \frac{3-1}{2} = 1" />,
    reason: <>The strips run from <Katex tex="x=1" /> to <Katex tex="2" /> and from <Katex tex="2" /> to <Katex tex="3" />.</>,
  },
  {
    working: <Katex display tex="f(1) = 1+\frac11 = 2" />,
    reason: 'The three heights are all that is needed.',
  },
  {
    working: <Katex display tex="f(2) = 2+\frac12 = \frac52" />,
    reason: <>Not <Katex tex="\tfrac32" /> — the report's named error is subtracting instead of adding.</>,
  },
  {
    working: <Katex display tex="f(3) = 3+\frac13 = \frac{10}{3}" />,
    reason: <><Katex tex="3=\tfrac93" />, so the sum is <Katex tex="\tfrac{10}{3}" />.</>,
  },
  {
    working: <Katex display tex="A_1 = \frac12\left(2+\frac52\right)(1) = \frac94" />,
    reason: <>Formula sheet: area of a trapezium <Katex tex="=\tfrac12(a+b)h" />, with the parallel sides vertical here and <Katex tex="h" /> the horizontal width.</>,
  },
  {
    working: <Katex display tex="A_2 = \frac12\left(\frac52+\frac{10}{3}\right)(1) = \frac12\cdot\frac{35}{6} = \frac{35}{12}" />,
    reason: <><Katex tex="\tfrac52+\tfrac{10}{3}=\tfrac{15+20}{6}=\tfrac{35}{6}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{27}{12}+\frac{35}{12} = \frac{62}{12} = \frac{31}{6}}" />,
    reason: <>About <Katex tex="5.17" /> square units. The exact integral is <Katex tex="4+\log_e3\approx5.10" />, so the trapeziums slightly overestimate — as they must, since the curve is concave up here.</>,
  },
]

export default function MethodsQ4_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (2 marks)</p>
        <p>
          The graph of <Katex tex="y=x+\dfrac1x" /> is shown over part of its domain.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="The curve y = x + 1/x falling steeply from the y-axis to a minimum of 2 near x = 1 and then rising gently, drawn for x between 0 and about 5 — from the original 2023 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
        <p>
          Use two trapeziums of equal width to approximate the area between the curve, the{' '}
          <Katex tex="x" />-axis and the lines <Katex tex="x=1" /> and <Katex tex="x=3" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            "Use two trapeziums" is an instruction about <em>method</em>, not just about the
            answer. Integrating gives <Katex tex="4+\log_e3" />, which is a perfectly good
            area and scores nothing here. The report is explicit: any attempt using integral
            calculus was not acceptable.
          </p>
          <p>
            The work is three function values and one formula-sheet area. Everything that goes
            wrong goes wrong in the fraction arithmetic, so a common denominator early is
            worth the line it costs.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={2} />
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
