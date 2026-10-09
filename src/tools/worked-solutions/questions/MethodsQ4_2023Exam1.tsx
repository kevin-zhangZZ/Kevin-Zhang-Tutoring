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
      This question required that students use two trapeziums to approximate the area between
      the curve and the stated lines and axis. Therefore any attempt to calculate this area
      using integral calculus was not acceptable. Some students gave the formula as stated on
      the formula sheet; however, many did not proceed to identify and substitute the correct
      values into this formula to produce the correct answer. Some students set up two separate
      trapeziums and used <Katex tex="\tfrac{(a+b)}{2}h" /> to find the area; this approach was
      frequently successful. Common errors involved incorrect values of <Katex tex="f(2)" />,
      given as <Katex tex="\tfrac32" /> instead of <Katex tex="\tfrac52" />, and incorrect
      values of <Katex tex="f(3)" />. Other errors were produced in setting up the formula and
      included having <Katex tex="\tfrac{3-1}{2\times3}=\tfrac13" /> as the value for{' '}
      <Katex tex="\tfrac{x_n-x_0}{2n}" />. Arithmetic manipulation errors (frequently) arose
      from dealing with the different denominators of the fractions.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="h = \frac{3-1}{2} = 1" />,
    reason: <>The interval from <Katex tex="x=1" /> to <Katex tex="x=3" /> has length <Katex tex="2" />. Two trapeziums of equal width share it, so each is <Katex tex="1" /> wide (call this width <Katex tex="h" />): one over <Katex tex="[1,2]" />, the other over <Katex tex="[2,3]" />.</>,
  },
  {
    working: <Katex display tex="f(1) = 1+\frac11 = 2" />,
    reason: <>Write <Katex tex="f(x)=x+\tfrac1x" />. Each trapezium's parallel sides are its vertical edges, from the <Katex tex="x" />-axis up to the curve, so their lengths are the function values at the strip edges <Katex tex="x=1,\ 2,\ 3" />.</>,
  },
  {
    working: <Katex display tex="f(2) = 2+\frac12 = \frac52" />,
    reason: <><Katex tex="2=\tfrac42" />, so the sum is <Katex tex="\tfrac52" />.</>,
    more: <>The report notes <Katex tex="f(2)" /> was commonly given as <Katex tex="\tfrac32" /> instead of <Katex tex="\tfrac52" />. Check each height against VCAA's graph: above <Katex tex="x=2" /> the curve is at about <Katex tex="2.5" />, and nowhere is it lower than <Katex tex="2" />, so <Katex tex="\tfrac32" /> can't be right.</>,
  },
  {
    working: <Katex display tex="f(3) = 3+\frac13 = \frac{10}{3}" />,
    reason: <><Katex tex="3=\tfrac93" />, so the sum is <Katex tex="\tfrac{10}{3}" />.</>,
    more: <>Wrong values of <Katex tex="f(3)" /> were also a common error. The same check works: above <Katex tex="x=3" /> the graph is at about <Katex tex="3.3" />, and <Katex tex="\tfrac{10}{3}\approx3.33" />.</>,
  },
  {
    working: <Katex display tex="A_1 = \frac12\left(2+\frac52\right)(1) = \frac12\cdot\frac92 = \frac94" />,
    reason: <>Area of a trapezium <Katex tex="=\tfrac12(a+b)h" /> (formula sheet), where <Katex tex="a" /> and <Katex tex="b" /> are the parallel sides and <Katex tex="h" /> is the distance between them. For the strip over <Katex tex="[1,2]" />, the parallel sides are the heights <Katex tex="f(1)" /> and <Katex tex="f(2)" />, and <Katex tex="h" /> is the width <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="A_2 = \frac12\left(\frac52+\frac{10}{3}\right)(1) = \frac12\cdot\frac{35}{6} = \frac{35}{12}" />,
    reason: <>Same formula for the strip over <Katex tex="[2,3]" />, with heights <Katex tex="f(2)" /> and <Katex tex="f(3)" />. Use a common denominator of <Katex tex="6" />: <Katex tex="\tfrac52+\tfrac{10}{3}=\tfrac{15}{6}+\tfrac{20}{6}=\tfrac{35}{6}" />.</>,
  },
  {
    working: <Katex display tex="A_1 + A_2 = \frac{27}{12}+\frac{35}{12} = \frac{62}{12}" />,
    reason: <>Rewrite <Katex tex="\tfrac94" /> as <Katex tex="\tfrac{27}{12}" /> so both areas are over <Katex tex="12" />, then add.</>,
    more: <>The report says arithmetic slips with these different denominators were frequent. To get <Katex tex="\tfrac{27}{12}" />, multiply the top and bottom of <Katex tex="\tfrac94" /> by <Katex tex="3" />; once the denominators match, add only the numerators. A size check catches slips: <Katex tex="A_1=2.25" /> and <Katex tex="A_2=\tfrac{35}{12}\approx2.9" />, so the total should be about <Katex tex="5.2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} \approx \frac{31}{6}\ \text{square units}}" />,
    reason: <><Katex tex="\tfrac{62}{12}" /> simplifies to <Katex tex="\tfrac{31}{6}" /> (about <Katex tex="5.17" />).</>,
    more: (
      <>
        <p>
          An alternative is the formula sheet's trapezium rule, which does both trapeziums in one
          line:{' '}
          <Katex tex="\text{Area}\approx\tfrac{x_n-x_0}{2n}[f(x_0)+2f(x_1)+\dots+2f(x_{n-1})+f(x_n)]" />.
          Writing the formula down is not enough; you must identify each value. Here{' '}
          <Katex tex="n=2" /> (the number of trapeziums) and the strip edges are{' '}
          <Katex tex="x_0=1" />, <Katex tex="x_1=2" />, <Katex tex="x_2=3" />, so{' '}
          <Katex tex="\tfrac{x_n-x_0}{2n}=\tfrac{3-1}{2\times2}=\tfrac12" /> and
        </p>
        <Katex display tex="\text{Area}\approx\tfrac12\left[2+2\left(\tfrac52\right)+\tfrac{10}{3}\right]=\tfrac{31}{6}," />
        <p>
          the same answer. The middle height is doubled because it is a side of both trapeziums.
          The report lists <Katex tex="\tfrac{3-1}{2\times3}=\tfrac13" /> as a common error:{' '}
          <Katex tex="n" /> counts trapeziums (<Katex tex="2" />), not heights (<Katex tex="3" />).
        </p>
        <p>
          As a check only (it can't be the method here), integrating gives the exact area{' '}
          <Katex tex="4+\log_e(3)\approx5.10" />, so the estimate is slightly too big. That is
          expected: the top of each trapezium is a straight line joining two points on the curve,
          and because this curve bends upwards (concave up) that line sits above it.
        </p>
      </>
    ),
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
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="The curve y = x + 1/x falling steeply from the y-axis to a minimum of 2 at x = 1 and then rising gently, drawn for x between 0 and about 5 — from the original 2023 VCAA exam paper"
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
            answer. Integrating would give the exact area, but it scores nothing here: the report
            is explicit that any attempt using integral calculus was not acceptable.
          </p>
          <p>
            The idea: cut the region into two vertical strips of equal width, then across the top
            of each strip replace the curve with the straight line joining its two end points.
            Each strip becomes a trapezium lying on its side: a flat base on the{' '}
            <Katex tex="x" />-axis, two upright edges, and a sloping straight top.
          </p>
          <p>
            The report's common errors were wrong heights, a wrong value for the fraction{' '}
            <Katex tex="\tfrac{x_n-x_0}{2n}" /> at the front of the formula-sheet trapezium rule
            (an alternative to adding two trapeziums, set out under the answer), and slips adding
            fractions with different denominators. Each is dealt with in the working below.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={2} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
