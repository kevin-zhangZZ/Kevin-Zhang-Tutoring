// 2024 Mathematical Methods — Exam 2, MCQ 12. VCAA examination report: 47% correct.
// Reading a double transformation off a graph — factorise the argument first. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import stemSrc from './meth-2024-mcq12-stem.png'
import optASrc from './meth-2024-mcq12-optA.png'
import optBSrc from './meth-2024-mcq12-optB.png'
import optCSrc from './meth-2024-mcq12-optC.png'
import optDSrc from './meth-2024-mcq12-optD.png'

function Panel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-2 w-fit">
      <img src={src} alt={alt} className="w-full max-w-[260px]" />
    </div>
  )
}

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 47, B: 28, C: 17, D: 7 },
  answer: 'A',
  comment: (
    <>
      The graph of <Katex tex="f" /> has been dilated by a factor of <Katex tex="\tfrac12" />{' '}
      from the <Katex tex="y" />-axis and translated <Katex tex="\tfrac12" /> a unit left. The
      local minimum of <Katex tex="f" /> is at approximately <Katex tex="(2,1)" />. This would
      become <Katex tex="(1,1)" /> and then <Katex tex="\left(\tfrac12,1\right)" /> after each
      of the transformations.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(2x+1) = f\!\left(2\left(x+\tfrac12\right)\right)" />,
    reason: <>Factorise the 2 out of the argument. Without this step the order and size of the two transformations cannot be read off.</>,
  },
  {
    working: <Katex display tex="\text{dilation factor } \tfrac12 \text{ from the } y\text{-axis, then } \tfrac12 \text{ unit left}" />,
    reason: <>Reading <Katex tex="2(x+\tfrac12)" /> from the inside out. The graph is squashed horizontally, not stretched, and moved <em>left</em>, not right.</>,
  },
  {
    working: <Katex display tex="(x,y) \mapsto \left(\tfrac{x}{2}-\tfrac12,\ y\right)" />,
    reason: <>Every <Katex tex="y" />-value is unchanged, so the heights 1, <Katex tex="\approx2.7" /> and the shape all stay put — only the horizontal scale changes. Options <b>C</b> and <b>D</b> stretch the graph instead of squashing it.</>,
  },
  {
    working: <Katex display tex="\text{local min } (2,1) \mapsto (1,1) \mapsto \left(\tfrac12,\,1\right)" />,
    reason: <>Track one identifiable point through both steps. This is the quickest way to separate the two squashed options.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{A}}" />,
    reason: <>Matches option <b>A</b>, whose local minimum sits at <Katex tex="x=\tfrac12" />. Option <b>B</b>, chosen by 28%, has the same dilation but its minimum at <Katex tex="x=0" /> — a translation of 1 unit left instead of <Katex tex="\tfrac12" />.</>,
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
              alt="The graph of y = f(x): rising from below the axis near x = −1.8, levelling off at (−1, 1), rising to a local maximum of about 2.7 near x = 0.8, falling to a local minimum at (2, 1), then rising steeply — from the original 2024 VCAA exam paper"
              className="w-full max-w-[460px]"
            />
          </div>
          <p>
            Which of the following options best represents the graph of{' '}
            <Katex tex="y=f(2x+1)" />?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Panel src={optASrc} alt="Option A: the graph squashed horizontally, with its local minimum at (1/2, 1)" />, isAnswer: true },
        { letter: 'B', content: <Panel src={optBSrc} alt="Option B: the graph squashed horizontally, with its local minimum at (0, 1)" /> },
        { letter: 'C', content: <Panel src={optCSrc} alt="Option C: the graph stretched horizontally, with its local minimum at (3, 1)" /> },
        { letter: 'D', content: <Panel src={optDSrc} alt="Option D: the graph stretched horizontally, with its local minimum at (2, 1)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
