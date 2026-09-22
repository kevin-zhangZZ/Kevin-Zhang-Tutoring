// 2024 Mathematical Methods — Exam 2, MCQ 12. VCAA examination report: 47% correct.
// Reading a double transformation off a graph — factorise the argument first. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import stemSrc from './meth-2024-mcq12-stem.png'
import optionsSrc from './meth-2024-mcq12-options.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 47, B: 28, C: 17, D: 7 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(2x+1) = f\!\left(2\left(x+\tfrac12\right)\right)" />,
    reason: 'Factorise the 2 out of the argument. Without this step the order and size of the two transformations cannot be read off.',
  },
  {
    working: <Katex display tex="\text{dilation factor } \tfrac12 \text{ from the } y\text{-axis, then } \tfrac12 \text{ unit left}" />,
    reason: <>Reading <Katex tex="2(x+\tfrac12)" /> from the inside out. The graph is squashed horizontally, not stretched, and moved <em>left</em>, not right.</>,
  },
  {
    working: <Katex display tex="(x,y) \mapsto \left(\tfrac{x}{2}-\tfrac12,\ y\right)" />,
    reason: <>Every <Katex tex="y" />-value is unchanged, so the heights 1, <Katex tex="\approx2.5" /> and the shape all stay put — only the horizontal scale changes. Options <b>C</b> and <b>D</b> stretch the graph instead of squashing it.</>,
  },
  {
    working: <Katex display tex="\text{local min } (2,1) \mapsto (1,1) \mapsto \left(\tfrac12,\,1\right)" />,
    reason: 'Track one identifiable point through both steps. This is the quickest way to separate the two squashed options.',
  },
  {
    working: <Katex display tex="\boxed{\text{Graph A}}" />,
    reason: <>Option <b>A</b>, whose local minimum sits at <Katex tex="x=\tfrac12" />. Option <b>B</b> is the same dilation but translated the wrong way (or not at all) — its minimum is at <Katex tex="x\approx0" />, which is why 28% chose it.</>,
  },
]

export default function MethodsQ12_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            The graph of <Katex tex="y=f(x)" /> is shown below.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={stemSrc}
              alt="The graph of y = f(x): rising from below the axis near x = −2, flattening near y = 1, a local maximum of about 2.5 near x = −0.5, a local minimum of 1 at x = 2, then rising steeply — from the original 2024 VCAA exam paper"
              className="w-full max-w-[460px]"
            />
          </div>
          <p>
            Which of the following options best represents the graph of{' '}
            <Katex tex="y=f(2x+1)" />?
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={optionsSrc}
              alt="Four candidate graphs labelled A to D, two horizontally squashed and two horizontally stretched, differing in how far left or right the turning points sit — from the original 2024 VCAA exam paper"
              className="w-full max-w-[620px]"
            />
          </div>
        </div>
      }
      options={[
        { letter: 'A', content: <>Graph A</>, isAnswer: true },
        { letter: 'B', content: <>Graph B</> },
        { letter: 'C', content: <>Graph C</> },
        { letter: 'D', content: <>Graph D</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
