// 2024 Mathematical Methods — Exam 1 Question 2 (3 marks). A parameter that makes two lines
// parallel, then deciding which root gives no solution rather than infinitely many. Question
// text transcribed from the original paper. Answer checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [22, 22, 18, 37],
  average: 1.7,
  comment: (
    <>
      Those who knew that the two lines needed to have identical gradients were generally
      successful. Students using the determinant method often arrived at{' '}
      <Katex tex="k=-2" /> and <Katex tex="k=\tfrac43" /> and then did not justify which
      answer was valid. The quadratic was readily factorised by inspection, yet a large
      proportion used the quadratic formula. Some students incorrectly gave{' '}
      <Katex tex="k=-2" />, indicating confusion between "infinite solutions" and "no
      solution".
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{pmatrix}3k&-2\\k-4&k\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix} = \begin{pmatrix}k+4\\-k\end{pmatrix}" />,
    reason: 'Matrix form. A unique solution exists exactly when the determinant is non-zero, so the candidates are the values that make it vanish.',
  },
  {
    working: <Katex display tex="\det = 3k(k)-(-2)(k-4) = 3k^2+2k-8" />,
    reason: 'Expanding, being careful with the double negative.',
  },
  {
    working: <Katex display tex="3k^2+2k-8 = (3k-4)(k+2) = 0 \implies k = \frac43 \ \text{ or } \ k = -2" />,
    reason: <>Factorises by inspection: <Katex tex="3\times(-8)=-24" />, and <Katex tex="6" /> and <Katex tex="-4" /> multiply to <Katex tex="-24" /> and add to <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="k = -2: \quad -6x-2y = 2 \ \text{ and } \ -6x-2y = 2" />,
    reason: <>Substituting: <Katex tex="3(-2)=-6" />, <Katex tex="-2-4=-6" />, <Katex tex="-2+4=2" /> and <Katex tex="-(-2)=2" />. The two equations are <em>identical</em>, so there are infinitely many solutions — not none.</>,
  },
  {
    working: <Katex display tex="k = \tfrac43: \quad 4x-2y = \tfrac{16}{3} \ \text{ and } \ -\tfrac83x+\tfrac43y = -\tfrac43" />,
    reason: <>Multiplying the second by <Katex tex="-\tfrac32" /> gives <Katex tex="4x-2y=2" />, which contradicts <Katex tex="4x-2y=\tfrac{16}{3}" />. Parallel lines that never meet.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \frac43}" />,
    reason: 'A zero determinant means "no unique solution"; only checking each case separately tells you whether that is none or infinitely many. Stopping at the quadratic loses the last mark.',
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
          where <Katex tex="x,y\in\mathbb{R}" /> and <Katex tex="k" /> is a real constant.
          Determine the value of <Katex tex="k" /> for which the system of equations has no
          real solution.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            "No solution" and "infinitely many solutions" both require the determinant to be
            zero, so the determinant on its own never finishes this kind of question. It
            narrows the field to two candidates; substituting each back is what decides
            between parallel lines (none) and coincident lines (infinitely many).
          </p>
          <p>
            Equivalently, in gradient language: no solution needs the same gradient{' '}
            <em>and different</em> intercepts.
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
