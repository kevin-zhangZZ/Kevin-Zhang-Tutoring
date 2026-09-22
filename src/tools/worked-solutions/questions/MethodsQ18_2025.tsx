// 2025 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 50% correct.
// Four probability mass functions, two of which share a mean. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphsSrc from './meth-2025-mcq18-graphs.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 17, C: 17, D: 50 },
  answer: 'D',
  comment: (
    <>
      Probability mass functions II and IV both have a mean equal to 3.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(X) = \sum x\,p(x)" />,
    reason: 'Read each height off the graph and weight it by its x-value.',
  },
  {
    working: <Katex display tex="\text{I}: \ 1(0.1)+2(0.4)+3(0.4)+4(0.1) = 2.5" />,
    reason: <>Symmetric about <Katex tex="2.5" />, which is a faster way to see it than multiplying out.</>,
  },
  {
    working: <Katex display tex="\text{II}: \ 1(0.1)+2(0.2)+3(0.3)+4(0.4) = 0.1+0.4+0.9+1.6 = 3" />,
    reason: 'Weighted towards the larger values.',
  },
  {
    working: <Katex display tex="\text{III}: \ 1(0.45)+2(0.25)+3(0.15)+4(0.15) = 0.45+0.5+0.45+0.6 = 2" />,
    reason: 'Weighted towards the smaller values.',
  },
  {
    working: <Katex display tex="\text{IV}: \ \text{uniform on } 1..5 \implies \mathrm{E}(X) = \tfrac{1+5}{2} = 3" />,
    reason: <>A uniform distribution has its mean at the midpoint — no arithmetic needed. (Note IV is the only one that uses <Katex tex="x=5" />.)</>,
  },
  {
    working: <Katex display tex="\boxed{\text{II and IV}}" />,
    reason: <>Option <b>D</b>, both with mean 3. Check each set sums to 1 first: <Katex tex="0.1+0.2+0.3+0.4=1" /> ✓ and <Katex tex="5\times0.2=1" /> ✓.</>,
  },
]

export default function MethodsQ18_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>Consider the following graphs, which represent probability mass functions.</p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={graphsSrc}
              alt="Four probability mass function graphs labelled I to IV, each plotting probabilities against the values 1 to 5 — from the original 2025 VCAA exam paper"
              className="w-full max-w-[620px]"
            />
          </div>
          <p>Which pair of these probability mass functions has the same mean?</p>
        </div>
      }
      options={[
        { letter: 'A', content: <>I and II</> },
        { letter: 'B', content: <>I and IV</> },
        { letter: 'C', content: <>II and III</> },
        { letter: 'D', content: <>II and IV</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
