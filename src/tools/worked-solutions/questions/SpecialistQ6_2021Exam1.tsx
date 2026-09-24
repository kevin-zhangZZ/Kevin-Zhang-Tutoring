// 2021 Specialist Mathematics — Exam 1 Question 6 (4 marks). The values of a parameter
// making three vectors linearly independent, with an absolute value in the way. Question
// text transcribed from the original paper. Answer checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [14, 9, 19, 33, 26],
  average: 2.5,
  comment: (
    <>
      Most students realised that they first needed to write down and solve a system of
      linear equations in order to find the values of <Katex tex="p" /> for which the set of
      vectors were linearly dependent. Many students were able to find that{' '}
      <Katex tex="p=\pm\sqrt5" /> for linear dependence but failed to conclude that{' '}
      <Katex tex="p\in R\setminus\left\{-\sqrt5,\sqrt5\right\}" /> (or equivalent) for
      independence.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{c} = m\underset{\sim}{a}+n\underset{\sim}{b} \ \text{ has a solution} \iff \text{the three are linearly dependent}" />,
    reason: <>Find the dependent values first, then take the complement — the question asks for independence.</>,
  },
  {
    working: <Katex display tex="3\underset{\sim}{i}+2\underset{\sim}{j}+\left|1-p^2\right|\underset{\sim}{k} = m\left(-\underset{\sim}{i}+6\underset{\sim}{j}-3\underset{\sim}{k}\right)+n\left(2\underset{\sim}{i}-8\underset{\sim}{j}+5\underset{\sim}{k}\right)" />,
    reason: <>Writing the vector with the unknown in terms of the other two.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{i}: \ -m+2n = 3; \qquad \underset{\sim}{j}: \ 6m-8n = 2" />,
    reason: <>Two equations with no <Katex tex="p" /> in them, so solve these first.</>,
  },
  {
    working: <Katex display tex="m = 2n-3 \implies 6(2n-3)-8n = 2 \implies 4n = 20 \implies n = 5, \ m = 7" />,
    reason: <>A clean pair of integers.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{k}: \ \left|1-p^2\right| = -3m+5n = -21+25 = 4" />,
    reason: <>The third component is where <Katex tex="p" /> finally enters.</>,
  },
  {
    working: <Katex display tex="1-p^2 = 4 \ \text{ or } \ 1-p^2 = -4" />,
    reason: <>The absolute value gives two cases. The first needs <Katex tex="p^2=-3" />, impossible for real <Katex tex="p" />.</>,
  },
  {
    working: <Katex display tex="p^2 = 5 \implies p = \pm\sqrt5 \ \text{ (dependent)}" />,
    reason: <>Only these two values make the three vectors coplanar.</>,
  },
  {
    working: <Katex display tex="\boxed{p \in R\setminus\left\{-\sqrt5,\ \sqrt5\right\}}" />,
    reason: <>The question asks for <em>independent</em>, which is everything except the two dependent values — the report notes many students found <Katex tex="p=\pm\sqrt5" /> but failed to conclude this.</>,
  },
]

export default function SpecialistQ6_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (4 marks)</p>
        <p>
          Consider the three vectors{' '}
          <Katex tex="\underset{\sim}{a}=-\underset{\sim}{i}+6\underset{\sim}{j}-3\underset{\sim}{k}" />
          ,{' '}
          <Katex tex="\underset{\sim}{b}=2\underset{\sim}{i}-8\underset{\sim}{j}+5\underset{\sim}{k}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{c}=3\underset{\sim}{i}+2\underset{\sim}{j}+\left|1-p^2\right|\underset{\sim}{k}" />
          , where <Katex tex="p" /> is a real constant.
        </p>
        <p>
          Find the values of <Katex tex="p" /> for which the three vectors are linearly independent.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            There is no direct test for independence — the route is always to find when the
            vectors <em>are</em> dependent and then exclude those values. Read the last line
            of the question twice before writing the answer.
          </p>
          <p>
            The absolute value is the second trap: <Katex tex="\left|1-p^2\right|=4" /> has
            two branches, and only one of them has real solutions.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={4} />
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
