// 2024 Mathematical Methods — Exam 1 Question 2 (3 marks). A parameter that makes two lines
// parallel (equal gradients, no matrices), then deciding which root gives no solution rather
// than infinitely many. Question text transcribed from the original paper. Answer checked
// with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [22, 22, 18, 37],
  average: 1.7,
  comment: (
    <>
      There were multiple ways to approach this question; however, generally students approached
      this by one of the following: equating gradients and <Katex tex="y" />-intercepts
      separately; using a matrix/determinant method; forming ratios; or attempting to solve
      simultaneously. These methods were met with varying degrees of success. Those who knew
      that the two lines needed to have identical gradients were generally successful.
      Students using the determinant method often arrived at <Katex tex="k=-2" /> and{' '}
      <Katex tex="k=\tfrac43" /> and then did not justify which answer was the valid solution.
      Students who set the two initial equations equal to one another commonly found they had
      multiple variables to deal with and did not know how to solve for <Katex tex="k" />. The
      methods involving forming ratios or setting gradients equal to one another regularly led
      to the required quadratic. Some students struggled with applying an appropriate method to
      solve the quadratic equation. The quadratic was readily factorised by inspection, yet a
      large proportion of students used the quadratic formula or other techniques such as
      splitting the middle term and grouping. Some students incorrectly put{' '}
      <Katex tex="k=-2" /> as the final solution, rejecting <Katex tex="k=\tfrac43" />,
      indicating confusion about the definition between 'infinite solutions' and 'no
      solution'.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\text{Line 1: } y &= \tfrac{3k}{2}x-\tfrac{k+4}{2}\\ \text{Line 2: } y &= \tfrac{4-k}{k}x-1\end{aligned}" />,
    reason: <>No solution means the two lines are parallel but not the same line: equal gradients, different <Katex tex="y" />-intercepts. So rearrange each into <Katex tex="y=mx+c" />.</>,
    more: <>Line 2: <Katex tex="ky=(4-k)x-k" />, then divide by <Katex tex="k" />. That needs <Katex tex="k\neq0" />, but <Katex tex="k=0" /> is not a candidate anyway: the equations become <Katex tex="-2y=4" /> and <Katex tex="-4x=0" />, which have the one solution <Katex tex="x=0,\ y=-2" />. This is the report's Method 3; its Method 1 sets the ratios of coefficients equal, <Katex tex="\tfrac{3k}{k-4}=-\tfrac2k" />, which is the same condition as equal gradients. Setting the two original equations equal to each other leaves <Katex tex="x" />, <Katex tex="y" /> and <Katex tex="k" /> all unknown, which is where many students stalled: the condition has to be on the coefficients (gradients and intercepts), not on <Katex tex="x" /> and <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{3k}{2}&=\frac{4-k}{k}\\ 3k^2&=8-2k\\ 3k^2+2k-8&=0\end{aligned}" />,
    reason: <>Equal gradients, then multiply both sides by <Katex tex="2k" /> to clear the fractions.</>,
  },
  {
    working: <Katex display tex="(3k-4)(k+2) = 0 \implies k = \frac43 \ \text{ or } \ k = -2" />,
    reason: <>Factorise by inspection: first terms give <Katex tex="3k^2" />, last terms give <Katex tex="-8" />, and the middle is <Katex tex="3k\cdot2+(-4)\cdot k=2k" />.</>,
    more: <>Check by expanding: <Katex tex="(3k-4)(k+2)=3k^2+6k-4k-8=3k^2+2k-8" />. The report notes many students reached for the quadratic formula here; in a technology-free exam, trying to factorise first saves time and arithmetic slips.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}k=-2:\quad &m_1=m_2=\tfrac{3(-2)}{2}=-3\\ &c_1=-\tfrac{-2+4}{2}=-1=c_2\end{aligned}" />,
    reason: <>Same gradient <em>and</em> same intercept: the two equations describe the same line, so there are infinitely many solutions, not none.</>,
    more: <>Substituting <Katex tex="k=-2" /> into the original equations makes both of them <Katex tex="-6x-2y=2" />. Line 2's intercept is <Katex tex="-1" /> for every <Katex tex="k" />, so the lines coincide only when <Katex tex="\tfrac{k+4}{2}=1" />, i.e. <Katex tex="k=-2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}k=\tfrac43:\quad &m_1=m_2=\tfrac32\cdot\tfrac43=2\\ &c_1=-\tfrac{\frac43+4}{2}=-\tfrac83\neq-1=c_2\end{aligned}" />,
    reason: <>Same gradient but different intercepts: parallel lines that never meet, so no solution.</>,
    more: <>In equation form: the first becomes <Katex tex="4x-2y=\tfrac{16}{3}" />, and the second, <Katex tex="-\tfrac83x+\tfrac43y=-\tfrac43" />, multiplied by <Katex tex="-\tfrac32" /> becomes <Katex tex="4x-2y=2" />. The same left side cannot equal two different numbers.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \frac43}" />,
    reason: <>The only value giving parallel, distinct lines.</>,
    more: <>The report notes that students using the determinant method (its Method 2, which gives the same quadratic; matrices are not part of the current Methods course) often did not justify which root was valid, and that some answered <Katex tex="k=-2" />, the infinitely-many case.</>,
  },
]

export default function MethodsQ2_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (3 marks)</p>
        <p>Consider the simultaneous linear equations</p>
        <div className="py-1">
          <Katex display tex="\begin{aligned}3kx-2y &= k+4\\ (k-4)x+ky &= -k\end{aligned}" />
        </div>
        <p>
          where <Katex tex="x,y\in R" /> and <Katex tex="k" /> is a real constant.
        </p>
        <p>
          Determine the value of <Katex tex="k" /> for which the system of equations has no
          real solution.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Two linear equations in <Katex tex="x" /> and <Katex tex="y" /> are two straight
            lines, and only three things can happen: they cross once (one solution), they are
            parallel and distinct (no solution), or they are the same line (infinitely many
            solutions). Equal gradients rule out the first case only; the{' '}
            <Katex tex="y" />-intercepts decide between the other two.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={3} />
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
