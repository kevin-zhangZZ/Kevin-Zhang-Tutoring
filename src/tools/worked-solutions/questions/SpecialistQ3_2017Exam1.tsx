// 2017 Specialist Mathematics — Exam 1, Question 3 (3 marks). A real cubic with one given
// complex root: find the other two. Question text transcribed from the original paper (no
// diagram given). Answer checked with sympy and against the VCAA examination report.
// Solution is original. No lettered parts, so this uses the plain card layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [8, 23, 27, 43],
  average: 2.1,
  comment: (
    <>
      Students generally performed well on this question, with most students able to obtain
      at least two marks. Typical errors included giving a second solution as{' '}
      <Katex tex="-1-i" />; correctly giving <Katex tex="1+i" /> as a second solution then
      multiplying this by the given solution to get <Katex tex="2" /> and stating{' '}
      <Katex tex="2" /> as the third solution, which was a correct answer but incorrect
      reasoning; and not being able to correctly determine the third solution after finding{' '}
      <Katex tex="a=-4" />. Those who attempted to use polar form were unsuccessful.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z_2 = \overline{1-i} = 1+i" />,
    reason: <>The coefficients are all real (<Katex tex="a\in R" />), so non-real roots come in conjugate pairs. The report's wrong answer <Katex tex="-1-i" /> is the negative, not the conjugate.</>,
  },
  {
    working: <Katex display tex="z_1z_2z_3 = -\frac{a}{1} = -a" />,
    reason: <>Product of roots of <Katex tex="z^3+az^2+6z+a=0" /> is <Katex tex="-\tfrac{\text{constant}}{\text{leading}}" /> for a cubic.</>,
  },
  {
    working: <Katex display tex="z_1+z_2+z_3 = -a" />,
    reason: <>Sum of roots is <Katex tex="-\tfrac{\text{coefficient of }z^2}{\text{leading}}" />. Here both relations give <Katex tex="-a" />, which is the shortcut the question is built around.</>,
  },
  {
    working: <Katex display tex="(1-i)(1+i) = 1-i^2 = 2" />,
    reason: <>A conjugate pair always multiplies to a real number — here <Katex tex="|1-i|^2=2" />.</>,
  },
  {
    working: <Katex display tex="2z_3 = -a \quad\text{and}\quad 2+z_3 = -a" />,
    reason: <>The product and the sum, both written in terms of the unknown third root.</>,
  },
  {
    working: <Katex display tex="2z_3 = 2+z_3 \implies z_3 = 2" />,
    reason: <>Equating the two expressions for <Katex tex="-a" /> eliminates <Katex tex="a" /> in one step.</>,
  },
  {
    working: <Katex display tex="a = -2z_3 = -4" />,
    reason: <>Not asked for, but worth having as a check.</>,
  },
  {
    working: <Katex display tex="\boxed{z = 1+i \ \text{ and }\ z = 2}" />,
    reason: <>Verify in the original: <Katex tex="2^3-4(2)^2+6(2)-4 = 8-16+12-4 = 0" /> ✓. The report notes that answers left as factors were not accepted — the question asks for solutions.</>,
  },
]

export default function SpecialistQ3_2017Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 3 (3 marks)">
        <p>
          Let <Katex tex="z^3+az^2+6z+a=0" />, <Katex tex="z\in C" />, where{' '}
          <Katex tex="a" /> is a real constant. Given that <Katex tex="z=1-i" /> is a solution
          to the equation, find all other solutions.
        </p>
        <p>
          Long division by <Katex tex="z^2-2z+2" /> also works, but it carries the unknown{' '}
          <Katex tex="a" /> through every line. The sum-and-product relations get there in
          three lines instead.
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
