// 2024 Specialist Mathematics — Exam 1 Question 10 (3 marks). The shortest distance between
// two skew lines, solved for the parameter in one of them. Question text transcribed from
// the original paper (2024 papers are image-only, so read from rendered pages). Answers
// checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [59, 14, 13, 14],
  average: 0.8,
  comment: (
    <>
      A small number of students drew diagrams of skew lines and parallel planes to help
      motivate an appropriate formula for the distance between two skew lines. Other students
      tried to work from memory with varying results.
      <br />
      Some students considered only{' '}
      <Katex tex="\dfrac{4+5m}{\sqrt{35}}=\dfrac{14}{\sqrt{35}}" /> or{' '}
      <Katex tex="\dfrac{-4-5m}{\sqrt{35}}=\dfrac{14}{\sqrt{35}}" /> and so did not find both
      values of <Katex tex="m" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{d_1} = \underset{\sim}{i}+2\underset{\sim}{j}+\underset{\sim}{k}, \qquad \underset{\sim}{d_2} = -\underset{\sim}{i}+3\underset{\sim}{j}+2\underset{\sim}{k}" />,
    reason: <>The direction vectors — the parts multiplied by λ and μ.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\underset{\sim}{d_1}\times\underset{\sim}{d_2} &= \begin{vmatrix}\underset{\sim}{i} & \underset{\sim}{j} & \underset{\sim}{k}\\1 & 2 & 1\\-1 & 3 & 2\end{vmatrix}\\ &= (4-3)\underset{\sim}{i}-\big(2-(-1)\big)\underset{\sim}{j}+\big(3-(-2)\big)\underset{\sim}{k}\\ &= \underset{\sim}{i}-3\underset{\sim}{j}+5\underset{\sim}{k}\end{aligned}"
      />
    ),
    reason: <>A cross product is perpendicular to both directions, so it points along the common perpendicular, where the shortest gap is measured. Expand along the top row: each bracket is the 2×2 determinant left when you cover that entry's row and column, and the middle term takes a minus sign.</>,
    more: <>Written out in full:{' '}<Katex tex="\underset{\sim}{i}\,(2\cdot2-1\cdot3)-\underset{\sim}{j}\,(1\cdot2-1\cdot(-1))+\underset{\sim}{k}\,(1\cdot3-2\cdot(-1))" />. Check: dotting the answer with <Katex tex="\underset{\sim}{d_1}" /> gives <Katex tex="1-6+5=0" />, and with <Katex tex="\underset{\sim}{d_2}" /> gives <Katex tex="-1-9+10=0" />.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{d_1}\times\underset{\sim}{d_2}\right| = \sqrt{1+9+25} = \sqrt{35}" />,
    reason: <>Its length is the denominator of the distance formula. The <Katex tex="\sqrt{35}" /> in the given distance confirms this route.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\underset{\sim}{a_1} = \underset{\sim}{i}+m\underset{\sim}{k}, \qquad \underset{\sim}{a_2} = 2\underset{\sim}{i}-\underset{\sim}{k}\\ &\underset{\sim}{a_2}-\underset{\sim}{a_1} = \underset{\sim}{i}+(-1-m)\underset{\sim}{k}\end{aligned}" />,
    reason: <>The points at <Katex tex="\lambda=0" /> and <Katex tex="\mu=0" />; their difference is a vector joining the two lines.</>,
    more: <>Why the choice of points does not matter: two joining vectors differ only by multiples of the direction vectors, which are perpendicular to <Katex tex="\underset{\sim}{d_1}\times\underset{\sim}{d_2}" />, so every joining vector has the same component in that direction.</>,
  },
  {
    working: <Katex display tex="d = \frac{\left|\left(\underset{\sim}{a_2}-\underset{\sim}{a_1}\right)\cdot\left(\underset{\sim}{d_1}\times\underset{\sim}{d_2}\right)\right|}{\left|\underset{\sim}{d_1}\times\underset{\sim}{d_2}\right|}" />,
    reason: <>Each line lies in one of two parallel planes with normal <Katex tex="\underset{\sim}{d_1}\times\underset{\sim}{d_2}" />. The shortest distance is the gap between them: the joining vector's scalar resolute along that normal.</>,
    more: <>The scalar resolute of <Katex tex="\underset{\sim}{a}" /> in the direction of <Katex tex="\underset{\sim}{n}" /> is <Katex tex="\dfrac{\underset{\sim}{a}\cdot\underset{\sim}{n}}{|\underset{\sim}{n}|}" />; the absolute value turns it into a length. This formula is not on the formula sheet, so if you cannot recall it, sketch the two skew lines in their parallel planes and rebuild it from the picture, as the report credits a few students with doing.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\left(\underset{\sim}{a_2}-\underset{\sim}{a_1}\right)\cdot\left(\underset{\sim}{d_1}\times\underset{\sim}{d_2}\right)\\ &\quad= (1)(1)+(0)(-3)+(-1-m)(5)\\ &\quad= -4-5m\end{aligned}" />,
    reason: <>The numerator: dot the joining vector with <Katex tex="\underset{\sim}{i}-3\underset{\sim}{j}+5\underset{\sim}{k}" />, component by component.</>,
  },
  {
    working: <Katex display tex="\frac{\left|-4-5m\right|}{\sqrt{35}} = \frac{14}{\sqrt{35}} \implies \left|5m+4\right| = 14" />,
    reason: <>Set the formula equal to the given distance and multiply both sides by <Katex tex="\sqrt{35}" />. Note <Katex tex="|-4-5m|=|5m+4|" />.</>,
    more: <>Dropping the absolute value is the trap here: the report notes some students considered only one of the two equations and so did not find both values of <Katex tex="m" />.</>,
  },
  {
    working: <Katex display tex="5m+4 = 14 \ \text{ or } \ 5m+4 = -14" />,
    reason: <>A quantity with absolute value 14 equals 14 or <Katex tex="-14" />, so there are two cases: <Katex tex="5m=10" /> or <Katex tex="5m=-18" />.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 2 \quad \text{or} \quad m = -\frac{18}{5}}" />,
    reason: <>Both are allowed, since neither is the excluded value <Katex tex="-\tfrac45" />.</>,
    more: <>Why <Katex tex="-\tfrac45" /> is excluded: it makes <Katex tex="-4-5m=0" />, so the distance would be zero and the lines would meet rather than be skew. Check: <Katex tex="m=2" /> gives <Katex tex="-4-10=-14" /> and <Katex tex="m=-\tfrac{18}{5}" /> gives <Katex tex="-4+18=14" />; both have absolute value 14, so both give distance <Katex tex="\tfrac{14}{\sqrt{35}}" />.</>,
  },
]

export default function SpecialistQ10_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 10 (3 marks)</p>
        <p>
          Let the lines <Katex tex="l_1" /> and <Katex tex="l_2" /> be defined by
          <br />
          <Katex tex="l_1:\underset{\sim}{r_1}(\lambda) = \underset{\sim}{i}+m\underset{\sim}{k}+\lambda\left(\underset{\sim}{i}+2\underset{\sim}{j}+\underset{\sim}{k}\right)" />{' '}
          and{' '}
          <Katex tex="l_2:\underset{\sim}{r_2}(\mu) = 2\underset{\sim}{i}-\underset{\sim}{k}+\mu\left(-\underset{\sim}{i}+3\underset{\sim}{j}+2\underset{\sim}{k}\right)" />,
          where <Katex tex="m\in R\setminus\left\{-\dfrac45\right\}" /> and{' '}
          <Katex tex="\lambda,\mu\in R" />.
          <br />
          If the shortest distance between the two skew lines <Katex tex="l_1" /> and <Katex tex="l_2" /> is{' '}
          <Katex tex="\dfrac{14}{\sqrt{35}}" />, find the values of <Katex tex="m" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Two lines in space are skew when they are not parallel and never meet. Picture
            them sitting in a pair of parallel planes, one line in each: both planes contain
            the directions <Katex tex="\underset{\sim}{d_1}" /> and{' '}
            <Katex tex="\underset{\sim}{d_2}" />, so their common normal is{' '}
            <Katex tex="\underset{\sim}{d_1}\times\underset{\sim}{d_2}" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={EXAM} maxMarks={3} />
      </div>
    </div>
  )
}
