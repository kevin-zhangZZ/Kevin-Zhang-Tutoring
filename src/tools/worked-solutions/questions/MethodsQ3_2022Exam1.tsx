// 2022 Mathematical Methods — Exam 1 Question 3 (3 marks). When a 2×2 system has
// infinitely many solutions. Question text transcribed from the original paper. Answer
// checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [38, 13, 13, 36],
  average: 1.5,
  comment: (
    <>
      Those who knew that the two lines needed to be identical were generally successful.
      Students using the determinant method often arrived at <Katex tex="k=-5" /> and{' '}
      <Katex tex="k=-3" />, and then did not justify which value was valid. Students who set
      the two initial equations equal to one another commonly found they had multiple
      variables to deal with.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{infinitely many solutions} \iff \text{the two lines are identical}" />,
    reason: <>Not merely parallel. A zero determinant gives <em>parallel or identical</em>, which is why it alone cannot finish the question.</>,
  },
  {
    working: <Katex display tex="kx-5y = 4+k \implies y = \frac{k}{5}x-\frac{4+k}{5}" />,
    reason: 'Putting both equations into gradient–intercept form makes both conditions visible at once.',
  },
  {
    working: <Katex display tex="3x+(k+8)y = -1 \implies y = -\frac{3}{k+8}x-\frac{1}{k+8}" />,
    reason: <>Valid provided <Katex tex="k\ne-8" />.</>,
  },
  {
    working: <Katex display tex="\text{equal gradients: } \frac{k}{5} = -\frac{3}{k+8} \implies k^2+8k+15 = 0" />,
    reason: <>Cross-multiplying: <Katex tex="k(k+8)=-15" />.</>,
  },
  {
    working: <Katex display tex="(k+3)(k+5) = 0 \implies k = -3 \text{ or } k = -5" />,
    reason: 'Two candidates — one gives parallel lines, the other identical ones.',
  },
  {
    working: <Katex display tex="\text{equal intercepts: } -\frac{4+k}{5} = -\frac{1}{k+8} \implies k^2+12k+27 = 0" />,
    reason: <>The second condition: <Katex tex="(k+4)(k+8)=5" />.</>,
  },
  {
    working: <Katex display tex="(k+3)(k+9) = 0 \implies k = -3 \text{ or } k = -9" />,
    reason: 'The second list of candidates.',
  },
  {
    working: <Katex display tex="\boxed{k = -3}" />,
    reason: <>The only value in <em>both</em> lists. Check: <Katex tex="k=-3" /> gives <Katex tex="-3x-5y=1" /> and <Katex tex="3x+5y=-1" /> — the same line ✓. At <Katex tex="k=-5" /> the lines are parallel but distinct, so there are no solutions.</>,
  },
]

export default function MethodsQ3_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (3 marks)</p>
        <p>Consider the system of equations</p>
        <p className="py-1">
          <Katex display tex="\begin{aligned}kx-5y &= 4+k\\ 3x+(k+8)y &= -1\end{aligned}" />
        </p>
        <p>
          Determine the value of <Katex tex="k" /> for which the system of equations above
          has an infinite number of solutions.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A determinant of zero is <em>necessary</em> but not sufficient: it says the
            lines are parallel, and parallel lines have either no solutions or infinitely
            many. The extra step — checking which candidate also makes the intercepts agree
            — is what most of the marks were for.
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
