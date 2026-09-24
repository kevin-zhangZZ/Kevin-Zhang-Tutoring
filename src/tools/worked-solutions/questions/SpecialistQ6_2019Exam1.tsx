// 2019 Specialist Mathematics — Exam 1, Question 6 (3 marks).
// Find d so that three given vectors are linearly dependent. Question text transcribed from the
// original paper (no diagram given). Cross-checked against the VCAA examination report and
// itute's independent solutions, and verified by computer algebra (including the determinant
// route, which gives 2d − 32 = 0). Solution is original.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAMINER: SAExaminerStats = {
  marks: [16, 4, 17, 63],
  average: 2.3,
  comment: (
    <>
      This question was handled well with most students being able to write down correct
      simultaneous equations to solve. Occasional arithmetic and transcription errors were
      noted, but a large number were successful in finding the value of <Katex tex="d" />. A
      number of students successfully evaluated a <Katex tex="3\times3" /> determinant in order to
      find the value of <Katex tex="d" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{c} = m\underset{\sim}{a} + n\underset{\sim}{b}" />,
    reason: <>Linear dependence means one of the vectors can be built out of the other two. Write that down with two unknown scalars and see whether it can be satisfied.</>,
  },
  {
    working: <Katex display tex="-6\underset{\sim}{i}+2\underset{\sim}{j}+d\underset{\sim}{k} = m\left(2\underset{\sim}{i}-3\underset{\sim}{j}+4\underset{\sim}{k}\right)+n\left(-2\underset{\sim}{i}+4\underset{\sim}{j}-8\underset{\sim}{k}\right)" />,
    reason: <>Substituting the three given vectors.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\underset{\sim}{i}: \quad 2m-2n = -6" />
        <Katex display tex="\underset{\sim}{j}: \quad -3m+4n = 2" />
        <Katex display tex="\underset{\sim}{k}: \quad 4m-8n = d" />
      </>
    ),
    reason: <>Two vectors are equal only if all three components match, giving three equations. The first two involve only <Katex tex="m" /> and <Katex tex="n" />, so solve those first; the third then delivers <Katex tex="d" />.</>,
  },
  {
    working: <Katex display tex="2m-2n=-6 \implies m-n=-3 \implies m = n-3" />,
    reason: <>Divide the first equation by <Katex tex="2" /> and make <Katex tex="m" /> the subject.</>,
  },
  {
    working: (
      <>
        <Katex display tex="-3(n-3)+4n = 2" />
        <Katex display tex="-3n+9+4n = 2 \implies n = -7" />
      </>
    ),
    reason: <>Substitute into the second equation.</>,
  },
  {
    working: <Katex display tex="m = n-3 = -7-3 = -10" />,
    reason: <>Back-substituting.</>,
  },
  {
    working: <Katex display tex="d = 4m-8n = 4(-10)-8(-7) = -40+56" />,
    reason: <>Now use the third component equation, which was held back for exactly this.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{Alternative: } \begin{vmatrix} 2 & -3 & 4 \\ -2 & 4 & -8 \\ -6 & 2 & d\end{vmatrix} = 0" />
        <Katex display tex="2(4d+16)+3(-2d-48)+4(-4+24) = 2d-32 = 0 \implies d=16" />
      </>
    ),
    reason: <>Three vectors are linearly dependent exactly when the determinant of the matrix of their components is zero — they then fail to span three dimensions. This route is quicker if you're confident with determinants, and the report notes a number of students used it successfully. Both routes agree.</>,
  },
  {
    working: <Katex display tex="\boxed{d = 16}" />,
    reason: <>Check with the first two components: <Katex tex="2(-10)-2(-7)=-20+14=-6" /> ✓ and <Katex tex="-3(-10)+4(-7)=30-28=2" /> ✓.</>,
  },
]

export default function SpecialistQ6_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (3 marks)</p>
        <p>
          Find the value of <Katex tex="d" /> for which the vectors{' '}
          <Katex tex="\underset{\sim}{a}=2\underset{\sim}{i}-3\underset{\sim}{j}+4\underset{\sim}{k}" />,{' '}
          <Katex tex="\underset{\sim}{b}=-2\underset{\sim}{i}+4\underset{\sim}{j}-8\underset{\sim}{k}" /> and{' '}
          <Katex tex="\underset{\sim}{c}=-6\underset{\sim}{i}+2\underset{\sim}{j}+d\underset{\sim}{k}" /> are
          linearly dependent.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A set of vectors is <b>linearly dependent</b> when at least one of them can be
            written as a combination of the others — in other words, one is redundant. For three
            vectors in space that means they all lie in a common plane through the origin,
            instead of spanning all of three-dimensional space.
          </p>
          <p>
            In practice the test is: write <Katex tex="\underset{\sim}{c}=m\underset{\sim}{a}+n\underset{\sim}{b}" />,
            compare components to get simultaneous equations, and find the values that make it
            work. (Equivalently, set the determinant of the three vectors' components to zero.)
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAMINER} maxMarks={3} />
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
