// 2024 Specialist Mathematics — Exam 1 Question 5 (3 marks). A solid of revolution whose
// volume is given, leading to a cubic in the upper terminal. Question text transcribed from
// the original paper (2024 papers are image-only, so read from rendered pages). Answers
// checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [22, 11, 9, 59],
  average: 2.1,
  comment: (
    <>
      Most students were able to apply the formula for the volume of the solid obtained by
      rotating the given region about the <Katex tex="x" />-axis. Some students tried to apply a
      formula for the surface area of the solid.
      <br />
      Some algebraic errors were observed. Students are reminded to be careful to avoid sign
      errors: responses often included incorrect expressions following the integration, such
      as <Katex tex="\pi\left(\dfrac{1}{2}k^2+\dfrac{2}{k}-k\textcolor{red}{+1}\right)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_a^b y^2\,dx" />,
    reason: <>Rotation about the x-axis. The surface-area formula is a different thing entirely — the report notes some students tried to apply it.</>,
  },
  {
    working: <Katex display tex="y^2 = k-\frac{1}{x^2}" />,
    reason: <>The square root disappears immediately — this is why the curve was given in that form.</>,
  },
  {
    working: <Katex display tex="V = \pi\int_1^{k/2}\left(k-x^{-2}\right)dx = \pi\left[kx+\frac1x\right]_1^{k/2}" />,
    reason: <>The antiderivative of <Katex tex="-x^{-2}" /> is <Katex tex="+x^{-1}" /> — the report warns that sign errors after the integration were often seen.</>,
  },
  {
    working: <Katex display tex="= \pi\left[\left(\frac{k^2}{2}+\frac{2}{k}\right)-\left(k+1\right)\right]" />,
    reason: <>Substituting <Katex tex="x=\tfrac{k}{2}" /> gives <Katex tex="\tfrac{k^2}{2}" /> and <Katex tex="\tfrac{2}{k}" />; substituting <Katex tex="x=1" /> gives <Katex tex="k+1" />.</>,
  },
  {
    working: <Katex display tex="\frac{k^2}{2}+\frac{2}{k}-k-1 = \frac72" />,
    reason: <>Dividing the given volume <Katex tex="\tfrac{7\pi}{2}" /> through by <Katex tex="\pi" />.</>,
  },
  {
    working: <Katex display tex="\times 2k: \quad k^3+4-2k^2-2k = 7k" />,
    reason: <>Clearing the fractions. Multiplying by <Katex tex="2k" /> is legitimate because <Katex tex="k>2>0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k^3-2k^2-9k+4 = 0}" />,
    reason: <>As required. (For interest, the cubic factorises as <Katex tex="(k-4)\left(k^2+2k-1\right)" />, so the value with <Katex tex="k>2" /> is exactly <Katex tex="k=4" />, but the question stops at the equation.)</>,
  },
]

export default function SpecialistQ5_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (3 marks)</p>
        <p>
          The curve with equation <Katex tex="y=\sqrt{k-\dfrac{1}{x^2}}" />, for{' '}
          <Katex tex="1\le x\le\dfrac{k}{2}" /> where <Katex tex="k>2" />, is rotated about
          the <Katex tex="x" />-axis to form a solid of revolution that has volume{' '}
          <Katex tex="\dfrac{7\pi}{2}" /> units<Katex tex="^3" />.
        </p>
        <p>
          Show that <Katex tex="k" /> satisfies the equation <Katex tex="k^3-2k^2-9k+4=0" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The curve is written as a square root precisely so that{' '}
            <Katex tex="y^2" /> is clean: <Katex tex="\pi\int y^2\,dx" /> becomes an integral
            of <Katex tex="k-x^{-2}" />, which is a one-line antidifferentiation. If the
            square root is still in your integral, you have reached for the wrong formula.
          </p>
          <p>
            The unknown <Katex tex="k" /> appears in three places at once — inside the
            integrand, in the upper terminal, and (after substituting) as a denominator — so
            the cubic comes out of clearing fractions, not out of any clever manipulation.
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
