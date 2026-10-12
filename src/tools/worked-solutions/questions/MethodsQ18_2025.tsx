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
      <Katex tex="\mathrm{E}(X_1)=1\times0.1+2\times0.4+3\times0.4+4\times0.1=2.5" />
      <br />
      <Katex tex="\mathrm{E}(X_2)=1\times0.1+2\times0.2+3\times0.3+4\times0.4=3" />
      <br />
      <Katex tex="\mathrm{E}(X_3)=1\times0.45+2\times0.25+3\times0.15+4\times0.15=2" />
      <br />
      <Katex tex="\mathrm{E}(X_4)=1\times0.2+2\times0.2+3\times0.2+4\times0.2+5\times0.2=3" />
      <br />
      Probability mass functions II and IV both have a mean equal to 3.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(X) = \sum x\,p(x)" />,
    reason: <>Read each height off the graph (the gridlines are <Katex tex="0.05" /> apart) and weight it by its <Katex tex="x" />-value. A dot on the axis means <Katex tex="p(x)=0" />.</>,
    more: <>Before using the heights, check each graph&apos;s heights sum to 1, which confirms you read them correctly: I <Katex tex="0.1+0.4+0.4+0.1=1" />, II <Katex tex="0.1+0.2+0.3+0.4=1" />, III <Katex tex="0.45+0.25+0.15+0.15=1" />, IV <Katex tex="5\times0.2=1" />.</>,
  },
  {
    working: <Katex display tex="\text{I}: \ 1(0.1)+2(0.4)+3(0.4)+4(0.1) = 2.5" />,
    reason: <>The graph is symmetric about <Katex tex="x=2.5" />, so the mean is 2.5 without multiplying out.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\text{II}: \ &1(0.1)+2(0.2)+3(0.3)+4(0.4)\\ &= 0.1+0.4+0.9+1.6 = 3\end{aligned}"
      />
    ),
    reason: <>Weighted towards the larger values, so the mean is above I&apos;s.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\text{III}: \ &1(0.45)+2(0.25)+3(0.15)+4(0.15)\\ &= 0.45+0.5+0.45+0.6 = 2\end{aligned}"
      />
    ),
    reason: <>Weighted towards the smaller values, so the mean is below I&apos;s.</>,
  },
  {
    working: <Katex display tex="\text{IV}: \ 0.2(1+2+3+4+5) = 0.2(15) = 3" />,
    reason: <>All five heights are <Katex tex="0.2" />, including at <Katex tex="x=5" />. Equal heights put the mean at the middle value, 3.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{II and IV}}" />,
    reason: <>Matches option <b>D</b>: both have mean 3.</>,
    more: <>
      The other pairs have different means: <b>A</b> (I and II) is 2.5 and 3, <b>B</b> (I and IV) is 2.5 and 3, and <b>C</b> (II and III) is 3 and 2.
      <br />IV is the only graph with a non-zero height at <Katex tex="x=5" />. Missing that point and reading IV as equal heights on 1 to 4 only would give a mean of 2.5, making <b>B</b> look right.
    </>,
  },
]

export default function MethodsQ18_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>Consider the following graphs, which represent probability mass functions.</p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
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
