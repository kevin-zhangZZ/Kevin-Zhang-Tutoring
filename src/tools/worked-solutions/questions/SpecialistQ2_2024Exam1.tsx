// 2024 Specialist Mathematics — Exam 1 Question 2 (3 marks). A direct proof that an odd
// input makes a quadratic expression even. Question text transcribed from the original
// paper (2024 papers are image-only, so read from rendered pages). Checked against the
// VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [8, 4, 23, 65],
  average: 2.5,
  comment: (
    <>
      This question was answered well by students. Substituting <Katex tex="2k+1" /> for{' '}
      <Katex tex="x" /> in the expression and obtaining a multiple of 2 was a reasonable
      approach. Occasional arithmetic or algebraic errors were seen.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Let } x = 2k+1, \ \text{ where } k\in\mathbb{Z}" />,
    reason: 'The definition of an odd integer. A direct proof starts from the hypothesis, so this line is the proof getting under way.',
  },
  {
    working: <Katex display tex="2x^2-3x-7 = 2(2k+1)^2-3(2k+1)-7" />,
    reason: 'Substituting.',
  },
  {
    working: <Katex display tex="= 2\left(4k^2+4k+1\right)-6k-3-7" />,
    reason: 'Expanding. Both brackets need care — this is where the arithmetic slips happened.',
  },
  {
    working: <Katex display tex="= 8k^2+8k+2-6k-10 = 8k^2+2k-8" />,
    reason: 'Collecting like terms.',
  },
  {
    working: <Katex display tex="= 2\left(4k^2+k-4\right)" />,
    reason: <>Taking out the factor of 2. Since <Katex tex="k\in\mathbb{Z}" />, the bracket <Katex tex="4k^2+k-4" /> is an integer.</>,
  },
  {
    working: <Katex display tex="\boxed{\therefore 2x^2-3x-7 \text{ is even whenever } x \text{ is odd}}" />,
    reason: <>Twice an integer is even, by definition. A parity argument also works: with <Katex tex="x" /> odd, <Katex tex="2x^2" /> is even, <Katex tex="3x" /> is odd and 7 is odd, so the expression is even <Katex tex="-" /> odd <Katex tex="-" /> odd, which is even.</>,
  },
]

export default function SpecialistQ2_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (3 marks)</p>
        <p>
          Prove that if <Katex tex="x" /> is an odd integer then{' '}
          <Katex tex="2x^2-3x-7" /> is even, using a direct proof.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A direct proof of "if P then Q" assumes P and reasons to Q. Here that means
            writing the odd integer in the algebraic form the definition gives —{' '}
            <Katex tex="x=2k+1" /> with <Katex tex="k\in\mathbb{Z}" /> — and finishing with
            an expression visibly of the form <Katex tex="2\times(\text{integer})" />.
          </p>
          <p>
            Quoting <Katex tex="k\in\mathbb{Z}" /> at both ends is not padding: it is what
            makes the final bracket an integer, and so what makes the conclusion follow.
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
