// 2021 Mathematical Methods — Exam 1 Question 2 (2 marks). Antidifferentiating with a
// condition that pins the constant. Question text transcribed from the original paper.
// Answer checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [9, 20, 72],
  average: 1.7,
  comment: (
    <>
      This question was well answered; however, those who did not include the arbitrary
      constant could not complete the question. It is worth recognising that this question is
      not the usual "find an antiderivative" question and that the constant of integration,{' '}
      <Katex tex="c" />, was required to identify the correct antiderivative. Students need
      to take care with writing fractions.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \int\left(x^3+x\right)dx" />,
    reason: <>Going backwards from <Katex tex="f'" /> to <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="f(x) = \frac{x^4}{4}+\frac{x^2}{2}+c" />,
    reason: 'The constant is the whole point of this question — without it there is nothing for the given condition to fix.',
  },
  {
    working: <Katex display tex="f(1) = \frac14+\frac12+c = 2" />,
    reason: <>Substituting the given value.</>,
  },
  {
    working: <Katex display tex="c = 2-\frac34 = \frac54" />,
    reason: <><Katex tex="\tfrac14+\tfrac12=\tfrac34" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = \frac{x^4}{4}+\frac{x^2}{2}+\frac54}" />,
    reason: <>Check: <Katex tex="f(1)=\tfrac14+\tfrac12+\tfrac54=2" /> ✓. Write the fractions clearly — the report warns that <Katex tex="\tfrac{x^4}{4}" /> squashed up can read as <Katex tex="x^{4/4}" />.</>,
  },
]

export default function MethodsQ2_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (2 marks)</p>
        <p>
          Let <Katex tex="f'(x)=x^3+x" />. Find <Katex tex="f(x)" /> given that{' '}
          <Katex tex="f(1)=2" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The wording is "find <Katex tex="f(x)" />", not "find an antiderivative" — so the
            answer is one specific function, and the arbitrary constant has to be there for
            the condition <Katex tex="f(1)=2" /> to pin it down.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={2} />
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
