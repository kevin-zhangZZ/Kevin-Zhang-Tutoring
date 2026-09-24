// 2024 Specialist Mathematics — Exam 1 Question 10 (3 marks). The shortest distance between
// two skew lines, solved for the parameter in one of them. Question text transcribed from
// the original paper (2024 papers are image-only, so read from rendered pages). Answers
// checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

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
        tex="\underset{\sim}{d_1}\times\underset{\sim}{d_2} = \begin{vmatrix}\underset{\sim}{i} & \underset{\sim}{j} & \underset{\sim}{k}\\1 & 2 & 1\\-1 & 3 & 2\end{vmatrix} = \underset{\sim}{i}-3\underset{\sim}{j}+5\underset{\sim}{k}"
      />
    ),
    reason: <>A vector perpendicular to both lines — the direction along which the shortest gap is measured.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{d_1}\times\underset{\sim}{d_2}\right| = \sqrt{1+9+25} = \sqrt{35}" />,
    reason: <>The <Katex tex="\sqrt{35}" /> in the given distance is a strong hint that this is the intended route.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a_1} = \underset{\sim}{i}+m\underset{\sim}{k}, \qquad \underset{\sim}{a_2} = 2\underset{\sim}{i}-\underset{\sim}{k} \implies \underset{\sim}{a_2}-\underset{\sim}{a_1} = \underset{\sim}{i}+(-1-m)\underset{\sim}{k}" />,
    reason: <>Any vector joining a point of one line to a point of the other will do — the formula projects away whatever part runs along the lines.</>,
  },
  {
    working: <Katex display tex="d = \frac{\left|\left(\underset{\sim}{a_2}-\underset{\sim}{a_1}\right)\cdot\left(\underset{\sim}{d_1}\times\underset{\sim}{d_2}\right)\right|}{\left|\underset{\sim}{d_1}\times\underset{\sim}{d_2}\right|}" />,
    reason: <>The scalar resolute of the joining vector in the common-perpendicular direction. It is not on the formula sheet, so it has to be recalled or rebuilt — the report notes students who tried to work from memory had varying results.</>,
  },
  {
    working: <Katex display tex="\left(\underset{\sim}{a_2}-\underset{\sim}{a_1}\right)\cdot\left(\underset{\sim}{d_1}\times\underset{\sim}{d_2}\right) = (1)(1)+(0)(-3)+(-1-m)(5) = -4-5m" />,
    reason: <>The triple product.</>,
  },
  {
    working: <Katex display tex="\frac{\left|-4-5m\right|}{\sqrt{35}} = \frac{14}{\sqrt{35}} \implies \left|5m+4\right| = 14" />,
    reason: <>The <Katex tex="\sqrt{35}" /> cancels. The absolute value is what produces two answers, not one — the report notes some students considered only one case.</>,
  },
  {
    working: <Katex display tex="5m+4 = 14 \ \text{ or } \ 5m+4 = -14" />,
    reason: <>Both branches.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 2 \quad \text{or} \quad m = -\frac{18}{5}}" />,
    reason: <>Both differ from the excluded value <Katex tex="-\tfrac45" />, which is precisely the <Katex tex="m" /> making the triple product zero — there the lines would meet rather than be skew.</>,
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
            Picture the two skew lines sitting in a pair of parallel planes. The common
            normal of those planes is{' '}
            <Katex tex="\underset{\sim}{d_1}\times\underset{\sim}{d_2}" />, and the shortest
            distance is just the gap between the planes — the scalar resolute of <em>any</em>{' '}
            vector joining the two lines in that normal direction. That picture is enough to
            rebuild the formula if it will not come to mind.
          </p>
          <p>
            Two details decide the marks. The absolute value gives two values of{' '}
            <Katex tex="m" />, and the excluded value <Katex tex="m=-\tfrac45" /> in the stem
            is not decoration: it is the one value making the distance zero, where the lines
            would intersect and not be skew at all.
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
