// 2014 Specialist Mathematics — Exam 1, Question 6 (5 marks). A division identity, then a
// volume of revolution that uses it. Question text transcribed from the original paper; the
// figure is a crop of VCAA's own artwork. Answer checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './spec-2014e1-q6-graph.png'

const EXAM_A: SAExaminerStats = {
  marks: [14, 86],
  average: 0.9,
  comment: (
    <>
      This question was answered well, but many students did not know how a verification or
      proof should be set out. Some arguments were not convincing, and some eventually showed
      that <Katex tex="a=a" /> or similar.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [15, 35, 2, 11, 37],
  average: 2.2,
  comment: (
    <>
      Many students did not use the result from part a. Those who did generally answered well.
      Those who did not commonly attempted the incorrect partial fractions{' '}
      <Katex tex="\tfrac{x^2}{x^2-4}=\tfrac{A}{x-2}+\tfrac{B}{x+2}" />. Students are reminded
      that it is often necessary to use the results from earlier parts. Most students
      remembered to include <Katex tex="\pi" />, but some did not square the expression for{' '}
      <Katex tex="y" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{RHS} = 1+\frac{4}{a-4}" />,
    reason: <>Work on one side only and reduce it to the other — that is what makes a verification convincing.</>,
  },
  {
    working: <Katex display tex="= \frac{a-4}{a-4}+\frac{4}{a-4}" />,
    reason: <>A common denominator.</>,
  },
  {
    working: <Katex display tex="= \frac{a-4+4}{a-4} = \frac{a}{a-4} = \text{LHS} \ \checkmark" />,
    reason: <>The <Katex tex="-4" /> and <Katex tex="+4" /> cancel. Showing <Katex tex="a=a" /> proves nothing, which is the report's criticism.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_3^4 y^2\,dx" />,
    reason: <>Rotation about the <Katex tex="x" />-axis, with the region bounded below by <Katex tex="y=0" /> and sideways by <Katex tex="x=3" /> and <Katex tex="x=4" />.</>,
  },
  {
    working: <Katex display tex="y = \frac{x}{\sqrt{x^2-4}} \implies y^2 = \frac{x^2}{x^2-4}" />,
    reason: <>Squaring kills the square root — the step the report says some students skipped.</>,
  },
  {
    working: <Katex display tex="\frac{x^2}{x^2-4} = 1+\frac{4}{x^2-4}" />,
    reason: <>Part a. with <Katex tex="a=x^2" />. Partial fractions applied directly to <Katex tex="\tfrac{x^2}{x^2-4}" /> cannot work, because the degrees are equal.</>,
  },
  {
    working: <Katex display tex="\frac{4}{x^2-4} = \frac{4}{(x-2)(x+2)} = \frac{1}{x-2}-\frac{1}{x+2}" />,
    reason: <>Now partial fractions <em>do</em> apply, to the proper fraction that is left.</>,
  },
  {
    working: <Katex display tex="V = \pi\int_3^4\left(1+\frac1{x-2}-\frac1{x+2}\right)dx" />,
    reason: <>Three easy terms.</>,
  },
  {
    working: <Katex display tex="= \pi\Bigl[x+\log_e|x-2|-\log_e|x+2|\Bigr]_3^4" />,
    reason: <>On <Katex tex="[3,4]" /> both expressions are positive, so the moduli can be dropped.</>,
  },
  {
    working: <Katex display tex="= \pi\Bigl[(4+\log_e2-\log_e6)-(3+\log_e1-\log_e5)\Bigr]" />,
    reason: <>Substituting the terminals.</>,
  },
  {
    working: <Katex display tex="= \pi\left(1+\log_e\!\left(\tfrac{2\times5}{6}\right)\right)" />,
    reason: <>Collecting the logarithms, with <Katex tex="\log_e1=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \pi\left(1+\log_e\!\left(\tfrac53\right)\right)}" />,
    reason: <>About <Katex tex="4.75" /> cubic units — plausible for a solid roughly 1 unit long with radius a little over 1.</>,
  },
]

export default function SpecialistQ6_2014Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (5 marks)</p>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Verify that <Katex tex="\dfrac{a}{a-4}=1+\dfrac{4}{a-4}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          Part of the graph of <Katex tex="y=\dfrac{x}{\sqrt{x^2-4}}" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="A curve falling steeply from a vertical asymptote at x = 2 and flattening towards y = 1 as x increases past 4 — from the original 2014 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
      </div>

      <PartCard
        letter="b"
        marks={4}
        statement={
          <>
            The region enclosed by the graph of <Katex tex="y=\dfrac{x}{\sqrt{x^2-4}}" /> and
            the lines <Katex tex="y=0" />, <Katex tex="x=3" /> and <Katex tex="x=4" /> is
            rotated about the <Katex tex="x" />-axis. Find the volume of the resulting solid
            of revolution.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
