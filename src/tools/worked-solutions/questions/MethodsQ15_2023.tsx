// 2023 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 65% correct.
// Reading two normal curves off their means and standard deviations. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import optionsSrc from './meth-2023-mcq15-options.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 65, B: 6, C: 17, D: 4, E: 6 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mu_Y = 80 < 100 = \mu_X" />,
    reason: <>The <Katex tex="Y" /> curve (solid, per the key) is centred to the <em>left</em> of the <Katex tex="X" /> curve (dashed).</>,
  },
  {
    working: <Katex display tex="\sigma_Y = 10 < 20 = \sigma_X" />,
    reason: <><Katex tex="Y" /> is the narrower of the two.</>,
  },
  {
    working: <Katex display tex="\text{area under each} = 1 \implies \text{narrower} \Rightarrow \text{taller}" />,
    reason: <>Every density encloses area 1, so halving the spread roughly doubles the peak: <Katex tex="Y" /> must be both narrow and tall.</>,
  },
  {
    working: <Katex display tex="\text{Want: solid tall and narrow, on the left; dashed low and wide, on the right}" />,
    reason: 'Three features to check — centre order, width order, and height order. Only one diagram has all three.',
  },
  {
    working: <Katex display tex="\boxed{\text{Diagram A}}" />,
    reason: <>Option <b>C</b> reverses which curve is narrow; <b>B</b> puts the solid curve on the right; <b>D</b> and <b>E</b> give the two curves similar spreads.</>,
  },
]

export default function MethodsQ15_2023() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            Let <Katex tex="X" /> be a normal random variable with mean of 100 and standard
            deviation of 20. Let <Katex tex="Y" /> be a normal random variable with mean of 80
            and standard deviation of 10. Which of the diagrams below best represents the
            probability density functions for <Katex tex="X" /> and <Katex tex="Y" />, plotted
            on the same set of axes?
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={optionsSrc}
              alt="Five candidate diagrams, each showing a dashed curve for X and a solid curve for Y on the same axes, differing in which curve is taller, narrower and further left — from the original 2023 VCAA exam paper"
              className="w-full max-w-[620px]"
            />
          </div>
        </div>
      }
      options={[
        { letter: 'A', content: <>Diagram A</>, isAnswer: true },
        { letter: 'B', content: <>Diagram B</> },
        { letter: 'C', content: <>Diagram C</> },
        { letter: 'D', content: <>Diagram D</> },
        { letter: 'E', content: <>Diagram E</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
