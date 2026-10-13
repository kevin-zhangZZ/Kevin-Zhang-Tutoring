// 2014 Mathematical Methods (CAS) — Exam 1, Question 4 (2 marks). An index equation solved
// by matching bases. Question text transcribed from the original paper (no diagram given).
// Answer checked with sympy and against the VCAA examination report. Solution is original.
// Reviewed Oct 2026 (2014-16 pass): mode review, part does not qualify for an interactive (76% full marks).
// This question has no lettered parts, so it uses the plain card layout rather than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, ReportShelf, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [7, 18, 76],
  average: 1.7,
  comment: (
    <>
      Some students chose to work with a common base of 8. Students are reminded to simplify
      their final answer, especially for fraction answers.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="2^{3x-3} = 8^{2-x}" />,
    reason: <>Different bases, but <Katex tex="8=2^3" />, so both sides can be written as powers of 2.</>,
    more: <>The aim is one base on each side, so the indices can be compared. Base 8 also works (the report notes some students chose it): factor 3 out of the left index, <Katex tex="2^{3x-3}=2^{3(x-1)}=\left(2^3\right)^{x-1}=8^{x-1}" />, so <Katex tex="x-1=2-x" /> and again <Katex tex="x=\tfrac32" />. Base 2 is safer because base 8 only works if you spot that common factor of 3.</>,
  },
  {
    working: <Katex display tex="8^{2-x} = \left(2^3\right)^{2-x} = 2^{3(2-x)}" />,
    reason: <>Power-of-a-power law: <Katex tex="(a^m)^n=a^{mn}" />, so the indices multiply.</>,
  },
  {
    working: <Katex display tex="2^{3x-3} = 2^{6-3x}" />,
    reason: <>Expand <Katex tex="3(2-x)=6-3x" />. Same base on both sides, so the indices must be equal.</>,
  },
  {
    working: <Katex display tex="3x-3 = 6-3x \implies 6x = 9" />,
    reason: <>Add <Katex tex="3x" /> and <Katex tex="3" /> to both sides.</>,
    more: <>The report's general comments list Question 4 among the questions where poor transpositions and handling of negatives led to errors — moving <Katex tex="-3x" /> across without changing its sign gives <Katex tex="3x-3x=9" />, i.e. <Katex tex="0=9" />, a sure sign of a slip.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \tfrac32}" />,
    reason: <>Divide by 6 and simplify: an unsimplified fraction such as <Katex tex="\tfrac96" /> loses the answer mark.</>,
    more: <>The answer-mark rule is from the report's general comments. Check: <Katex tex="3\left(\tfrac32\right)-3=\tfrac32" /> and <Katex tex="3\left(2-\tfrac32\right)=\tfrac32" />, so both sides equal <Katex tex="2^{3/2}" /> ✓.</>,
  },
]

export default function MethodsQ4_2014Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 4 (2 marks)" always>
        <p>
          Solve the equation <Katex tex="2^{3x-3}=8^{2-x}" /> for <Katex tex="x" />.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <ReportShelf stats={EXAM} maxMarks={2} />
    </div>
  )
}
