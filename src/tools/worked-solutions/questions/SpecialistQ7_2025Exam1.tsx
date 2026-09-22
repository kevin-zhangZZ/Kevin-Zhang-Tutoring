// 2025 Specialist Mathematics — Exam 1 Question 7 (4 marks). Proof by mathematical
// induction of a closed form for a sum of squares. Question text transcribed from the
// original paper. Checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [11, 8, 18, 34, 29],
  average: 2.6,
  comment: (
    <>
      Common errors included not properly verifying the base case, misstating the
      assumption, and assuming equality at the beginning of the inductive step rather than
      deriving it.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="P(n): \quad \sum_{i=1}^{n}(i+1)^2 = \tfrac16 n\left(2n^2+9n+13\right)" />,
    reason: 'Naming the proposition explicitly is part of the expected structure.',
  },
  {
    working: <Katex display tex="P(1): \ \text{LHS} = (1+1)^2 = 4; \quad \text{RHS} = \tfrac16(1)(2+9+13) = \tfrac{24}{6} = 4" />,
    reason: <>Both sides evaluated separately and shown equal — writing "<Katex tex="\text{LHS}=\text{RHS}" />" without computing them is not a verification.</>,
  },
  {
    working: <Katex display tex="\therefore P(1) \text{ is true}" />,
    reason: 'The base case, stated as a conclusion.',
  },
  {
    working: <Katex display tex="\text{Assume } P(k) \text{ true for some } k\in\mathbb{N}: \quad \sum_{i=1}^{k}(i+1)^2 = \tfrac16 k\left(2k^2+9k+13\right)" />,
    reason: <>"Assume true for some <Katex tex="k" />", not "for all <Katex tex="k" />" — the misstatement the report singles out.</>,
  },
  {
    working: <Katex display tex="\sum_{i=1}^{k+1}(i+1)^2 = \sum_{i=1}^{k}(i+1)^2+\bigl((k+1)+1\bigr)^2" />,
    reason: <>Start from the left side of <Katex tex="P(k+1)" /> and work forwards. Starting from an equation you are trying to prove is the error that cost most marks.</>,
  },
  {
    working: <Katex display tex="= \tfrac16 k\left(2k^2+9k+13\right)+(k+2)^2" />,
    reason: 'Using the assumption — the only place it is allowed.',
  },
  {
    working: <Katex display tex="= \tfrac16\left[2k^3+9k^2+13k+6\left(k^2+4k+4\right)\right] = \tfrac16\left[2k^3+15k^2+37k+24\right]" />,
    reason: 'Common denominator, then expand and collect.',
  },
  {
    working: <Katex display tex="= \tfrac16(k+1)\left(2k^2+13k+24\right)" />,
    reason: <>Factorising out <Katex tex="k+1" />, which must appear if the proof is going to close.</>,
  },
  {
    working: <Katex display tex="2(k+1)^2+9(k+1)+13 = 2k^2+4k+2+9k+9+13 = 2k^2+13k+24" />,
    reason: <>Checking that this bracket is exactly the one <Katex tex="P(k+1)" /> requires.</>,
  },
  {
    working: <Katex display tex="\boxed{\therefore P(k) \text{ true} \implies P(k+1) \text{ true; with } P(1) \text{ true}, \ P(n) \text{ holds for all } n\in\mathbb{N}}" />,
    reason: 'The closing statement completes the induction.',
  },
]

export default function SpecialistQ7_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (4 marks)</p>
        <p>Use mathematical induction to prove that</p>
        <div className="py-1">
          <Katex display tex="\sum_{i=1}^{n}(i+1)^2 = \frac16 n\left(2n^2+9n+13\right) \ \text{ for } n\in\mathbb{N}," />
        </div>
        <p>
          where{' '}
          <Katex tex="\displaystyle\sum_{i=1}^{n}(i+1)^2 = 2^2+3^2+4^2+\ldots+(n+1)^2" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Three things earn the marks here beyond the algebra, and all three are about how
            the proof is written. Verify the base case by <em>evaluating both sides</em>.
            Assume the result for <em>some</em> <Katex tex="k" />, not for all of them. And
            in the inductive step, begin with the left-hand side of{' '}
            <Katex tex="P(k+1)" /> and work forwards — never start from the equation you are
            trying to establish.
          </p>
          <p>
            The algebra itself is one line of expansion and one of factorising: getting{' '}
            <Katex tex="k+1" /> back out of <Katex tex="2k^3+15k^2+37k+24" /> is the only
            technical step.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={4} />
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
