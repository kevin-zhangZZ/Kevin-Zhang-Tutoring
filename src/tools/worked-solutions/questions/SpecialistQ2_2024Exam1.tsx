// 2024 Specialist Mathematics — Exam 1 Question 2 (3 marks). A direct proof that an odd
// input makes a quadratic expression even. Question text transcribed from the original
// paper (2024 papers are image-only, so read from rendered pages). Checked against the
// VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [8, 4, 23, 65],
  average: 2.5,
  comment: (
    <>
      This question was answered well by students. Substituting <Katex tex="2k+1" /> (or{' '}
      <Katex tex="2k-1" />) for <Katex tex="x" /> in the expression and obtaining{' '}
      <Katex tex="2\left(4k^2+k-4\right)" /> (or <Katex tex="2\left(4k^2-7k-1\right)" />), hence
      a multiple of 2 and so even, was a reasonable approach. Occasional arithmetic or algebraic
      errors were seen.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Let } x = 2k+1, \ \text{ where } k\in Z" />,
    reason: <>An odd integer is one more than an even number, <Katex tex="2k" />, where <Katex tex="k\in Z" /> means <Katex tex="k" /> is an integer. A direct proof starts from what we are given (<Katex tex="x" /> odd), written algebraically.</>,
    more: <>Writing <Katex tex="x=2k-1" /> works equally well — the report also mentions it, ending at <Katex tex="2\left(4k^2-7k-1\right)" />.</>,
  },
  {
    working: <Katex display tex="2x^2-3x-7 = 2(2k+1)^2-3(2k+1)-7" />,
    reason: <>Substitute <Katex tex="x=2k+1" /> everywhere <Katex tex="x" /> appears, keeping the brackets.</>,
  },
  {
    working: <Katex display tex="= 2\left(4k^2+4k+1\right)-6k-3-7" />,
    reason: <>Square first, <Katex tex="(2k+1)^2=4k^2+4k+1" />, then multiply out <Katex tex="-3(2k+1)=-6k-3" />.</>,
    more: <>The report notes occasional arithmetic or algebraic errors. The usual ones here: forgetting the middle term <Katex tex="4k" /> when squaring, multiplying by 2 before squaring (writing <Katex tex="(4k+2)^2" /> for <Katex tex="2(2k+1)^2" />), or writing <Katex tex="+3" /> instead of <Katex tex="-3" /> from <Katex tex="-3\times 1" />.</>,
  },
  {
    working: <Katex display tex="= 8k^2+8k+2-6k-10 = 8k^2+2k-8" />,
    reason: <>Expand <Katex tex="2\left(4k^2+4k+1\right)=8k^2+8k+2" /> and combine <Katex tex="-3-7=-10" />, then collect like terms: <Katex tex="8k-6k=2k" /> and <Katex tex="2-10=-8" />.</>,
  },
  {
    working: <Katex display tex="= 2\left(4k^2+k-4\right)" />,
    reason: <>Taking out the factor of 2. Since <Katex tex="k\in Z" />, the bracket <Katex tex="4k^2+k-4" /> is an integer.</>,
  },
  {
    working: <Katex display tex="\boxed{\therefore 2x^2-3x-7 \text{ is even whenever } x \text{ is odd}}" />,
    reason: <>Twice an integer is even, by definition. As required.</>,
    more: <>The report's answer also gives a parity argument, which is a complete direct proof on its own: with <Katex tex="x" /> odd, <Katex tex="2x^2" /> is even, <Katex tex="3x" /> is odd and 7 is odd, so the expression is even <Katex tex="-" /> odd <Katex tex="-" /> odd, which is even. As a check, trying <Katex tex="x=1" /> gives <Katex tex="2-3-7=-8" />, even, as expected.</>,
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
            <Katex tex="x=2k+1" /> with <Katex tex="k\in Z" /> — and finishing with
            an expression visibly of the form <Katex tex="2\times(\text{integer})" />.
          </p>
          <p>
            State <Katex tex="k\in Z" /> when you introduce <Katex tex="x=2k+1" />:
            without it, the final bracket need not be an integer.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={EXAM} maxMarks={3} />
      </div>
    </div>
  )
}
