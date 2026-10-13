// 2025 Specialist Mathematics — Exam 1 Question 2 (3 marks). Where two lines in space meet,
// found by equating components with two different parameters. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [14, 13, 15, 59],
  average: 2.2,
  comment: (
    <>
      Students needed to express the two lines in parametric form using different parameters for
      each line and solving the resulting equations for the parameters. Substituting back gave the
      point of intersection of the lines.
      <br />
      It was common for students to use the same parameter for both lines. This did not result in
      viable equations to solve. In this case, students were ineligible for full marks.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="L_1: \ \underset{\sim}{r_1}(s) = (2+s)\underset{\sim}{i}+(3+2s)\underset{\sim}{j}+(1-s)\underset{\sim}{k}" />,
    reason: <>Vector equation of a line: position vector of <Katex tex="A_1" /> plus <Katex tex="s" /> times the direction <Katex tex="\underset{\sim}{u}" />, collected into components.</>,
    more: <>That is, <Katex tex="\underset{\sim}{r_1} = (2\underset{\sim}{i}+3\underset{\sim}{j}+\underset{\sim}{k}) + s(\underset{\sim}{i}+2\underset{\sim}{j}-\underset{\sim}{k})" />. Each value of <Katex tex="s \in R" /> gives one point of <Katex tex="L_1" />.</>,
  },
  {
    working: <Katex display tex="L_2: \ \underset{\sim}{r_2}(t) = (1-t)\underset{\sim}{i}+(3-t)\underset{\sim}{j}+(2+t)\underset{\sim}{k}" />,
    reason: <>Same method from <Katex tex="A_2" /> and <Katex tex="\underset{\sim}{v}" />, but with a <em>different</em> parameter <Katex tex="t" />: the meeting point is generally at different parameter values on the two lines.</>,
    more: (
      <>
        The report says it was common to use the same parameter for both lines, and those
        students were ineligible for full marks. Using <Katex tex="s" /> for both asks the lines
        to reach the point at the <em>same</em> parameter value. Here that gives{' '}
        <Katex tex="2+s=1-s \Rightarrow s=-\tfrac12" /> but{' '}
        <Katex tex="3+2s=3-s \Rightarrow s=0" /> — a contradiction, even though the lines do
        meet (at <Katex tex="s=1" /> on <Katex tex="L_1" /> and <Katex tex="t=-2" /> on{' '}
        <Katex tex="L_2" />). Also avoid calling the parameter <Katex tex="u" /> or{' '}
        <Katex tex="v" /> here, since the question already uses those letters for the direction vectors.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} 2+s &= 1-t \\ 3+2s &= 3-t \\ 1-s &= 2+t \end{aligned}" />,
    reason: <>At the intersection the two position vectors are equal, so equate the <Katex tex="\underset{\sim}{i}" />, <Katex tex="\underset{\sim}{j}" /> and <Katex tex="\underset{\sim}{k}" /> components: three equations, two unknowns.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \underset{\sim}{j}\text{: } 3+2s &= 3-t \\ 2s &= -t \\ t &= -2s \end{aligned}" />,
    reason: <>Start with the simplest equation: the constant 3 on each side cancels, leaving <Katex tex="t" /> directly in terms of <Katex tex="s" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \underset{\sim}{i}\text{: } 2+s &= 1-t \\ 2+s &= 1+2s \\ s &= 1, \quad t = -2 \end{aligned}" />,
    reason: <>Substitute <Katex tex="t=-2s" /> into the <Katex tex="\underset{\sim}{i}" /> equation to find <Katex tex="s" />, then use <Katex tex="t=-2s" /> to get <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \underset{\sim}{k}\text{: } 1-s &= 2+t \\ \text{LHS} &= 1-1 = 0 \\ \text{RHS} &= 2+(-2) = 0 \quad \checkmark \end{aligned}" />,
    reason: <>Substitute <Katex tex="s=1,\ t=-2" /> into the unused <Katex tex="\underset{\sim}{k}" /> equation. It holds, so the lines really intersect.</>,
    more: (
      <>
        Two unknowns are fixed by any two equations, so the third is an independent test. If it
        failed, the lines would be skew and there would be no point of intersection. (They are not parallel here: <Katex tex="\underset{\sim}{v}" />{' '}
        is not a multiple of <Katex tex="\underset{\sim}{u}" />.)
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \underset{\sim}{r_1}(1) &= 3\underset{\sim}{i}+5\underset{\sim}{j}+0\underset{\sim}{k} \\ \text{point: } &\boxed{(3,\,5,\,0)} \end{aligned}" />,
    reason: <>Substitute <Katex tex="s=1" /> into <Katex tex="L_1" />. The question asks for coordinates, so give the point, not a vector.</>,
    more: <>Check with <Katex tex="L_2" />: <Katex tex="t=-2" /> gives <Katex tex="(1+2,\ 3+2,\ 2-2) = (3,5,0)" />, the same point.</>,
  },
]

export default function SpecialistQ2_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (3 marks)</p>
        <p>
          Consider the following two lines, <Katex tex="L_1" /> and <Katex tex="L_2" />.
        </p>
        <p>
          <Katex tex="L_1" /> passes through the point <Katex tex="A_1(2,3,1)" /> and has
          direction{' '}
          <Katex tex="\underset{\sim}{u}=\underset{\sim}{i}+2\underset{\sim}{j}-\underset{\sim}{k}" />.
        </p>
        <p>
          <Katex tex="L_2" /> passes through the point <Katex tex="A_2(1,3,2)" /> and has
          direction{' '}
          <Katex tex="\underset{\sim}{v}=-\underset{\sim}{i}-\underset{\sim}{j}+\underset{\sim}{k}" />.
        </p>
        <p>Find the coordinates of the point of intersection of the two lines.</p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Two lines in space can intersect, be parallel, or be <em>skew</em> (not parallel, but
            never meeting). If they intersect, there is one point both vector equations
            reach; setting{' '}
            <Katex tex="\underset{\sim}{r_1}(s)=\underset{\sim}{r_2}(t)" /> and solving for both
            parameters finds that point.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={EXAM} maxMarks={3} />
      </div>
    </div>
  )
}
