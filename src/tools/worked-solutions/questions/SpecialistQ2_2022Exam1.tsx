// 2022 Specialist Mathematics — Exam 1 Question 2 (3 marks). A separable differential
// equation whose y-side is a standard arcsin form. Question text transcribed from the
// original paper. Answer checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [12, 19, 9, 60],
  average: 2.2,
  comment: (
    <>
      This question was answered well with most students recognising and attempting to solve
      the separable differential equation. A small number of students correctly separated and
      integrated to find an answer in terms of inverse cosine. Quite a few students set up
      the differential equation as a definite integral; while the method is sound, students
      need to use a "dummy" variable in such problems.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dy}{dx} = -x\sqrt{4-y^2} \implies \frac{1}{\sqrt{4-y^2}}\,dy = -x\,dx" />,
    reason: <>Separable: every <Katex tex="y" /> on the left, every <Katex tex="x" /> on the right.</>,
  },
  {
    working: <Katex display tex="\int\frac{1}{\sqrt{4-y^2}}\,dy = \int -x\,dx" />,
    reason: 'Integrate both sides. One arbitrary constant is enough.',
  },
  {
    working: <Katex display tex="\arcsin\!\left(\frac{y}{2}\right) = -\frac{x^2}{2}+c" />,
    reason: <>Straight off the formula sheet: <Katex tex="\int\tfrac{1}{\sqrt{a^2-y^2}}dy=\arcsin\!\left(\tfrac ya\right)" /> with <Katex tex="a=2" />.</>,
  },
  {
    working: <Katex display tex="y(2)=0: \quad \arcsin(0) = -\frac{4}{2}+c \implies 0 = -2+c \implies c = 2" />,
    reason: 'Apply the condition now, before rearranging — much less algebra than doing it last.',
  },
  {
    working: <Katex display tex="\arcsin\!\left(\frac{y}{2}\right) = 2-\frac{x^2}{2} \implies \frac{y}{2} = \sin\!\left(2-\frac{x^2}{2}\right)" />,
    reason: <>Taking <Katex tex="\sin" /> of both sides — legitimate because <Katex tex="\arcsin" /> returns a value in <Katex tex="\left[-\tfrac\pi2,\tfrac\pi2\right]" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 2\sin\!\left(2-\frac{x^2}{2}\right)}" />,
    reason: <>In the required form <Katex tex="y=f(x)" />. Check: at <Katex tex="x=2" />, <Katex tex="y=2\sin(0)=0" /> ✓.</>,
  },
]

export default function SpecialistQ2_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (3 marks)</p>
        <p>
          Solve the differential equation{' '}
          <Katex tex="\dfrac{dy}{dx}=-x\sqrt{4-y^2}" /> given that{' '}
          <Katex tex="y(2)=0" />. Give your answer in the form{' '}
          <Katex tex="y=f(x)" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A <Katex tex="\sqrt{a^2-y^2}" /> in a denominator is the signature of an{' '}
            <Katex tex="\arcsin" />. Separate first and the whole question becomes two
            formula-sheet integrals. The alternative, <Katex tex="-\arccos\!\left(\tfrac y2\right)" />,
            differs only by a constant and is equally correct — it just looks different at
            the end.
          </p>
          <p>
            Setting the problem up as definite integrals{' '}
            <Katex tex="\int_0^y\!\cdots dy=\int_2^x\!\cdots dx" /> also works, but only if
            the integration variables are renamed to something other than{' '}
            <Katex tex="x" /> and <Katex tex="y" />; reusing the terminal as the variable is
            the slip the report singles out.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={3} />
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
