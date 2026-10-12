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
      <img loading="lazy" decoding="async" src={src} alt={alt} className="w-full max-w-[260px]" />
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
    reason: <>Factorise the 2 out of the argument, so both transformations can be read off in the usual order: dilation first, then translation.</>,
    more: <>The common slip is to dilate first and then shift 1 unit left: once <Katex tex="x" /> has been doubled, the <Katex tex="+1" /> moves the graph only <Katex tex="\tfrac12" /> a unit. (Translating 1 unit left first and then dilating by factor <Katex tex="\tfrac12" /> is also correct; it lands in the same place.)</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\text{dilation by factor } \tfrac12 \text{ from the } y\text{-axis,}\\ \text{then translation } \tfrac12 \text{ unit left}\end{gathered}" />,
    reason: <>Replacing <Katex tex="x" /> with <Katex tex="2x" /> squashes the graph horizontally by factor <Katex tex="\tfrac12" />; then <Katex tex="x+\tfrac12" /> in place of <Katex tex="x" /> moves it <Katex tex="\tfrac12" /> left.</>,
    more: <>Changes inside the function act on <Katex tex="x" /> the opposite way to how they look: multiplying <Katex tex="x" /> by 2 halves the horizontal distances, and adding <Katex tex="\tfrac12" /> to <Katex tex="x" /> shifts the graph in the negative direction.</>,
  },
  {
    working: <Katex display tex="(x,y) \mapsto \left(\tfrac{x}{2}-\tfrac12,\ y\right)" />,
    reason: <>Halve each <Katex tex="x" />-coordinate, then subtract <Katex tex="\tfrac12" />. Every <Katex tex="y" />-value is unchanged, so the heights (1 and about 2.7) stay put.</>,
    more: <>As a check, a point <Katex tex="(x',y)" /> is on the new graph when <Katex tex="2x'+1=x" /> for a point <Katex tex="(x,y)" /> on the old one, so <Katex tex="x'=\tfrac{x-1}{2}=\tfrac{x}{2}-\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\text{local min } (2,1) \mapsto (1,1) \mapsto \left(\tfrac12,\,1\right)" />,
    reason: <>Track one easy-to-read point through both steps: the local minimum at <Katex tex="(2,1)" /> is clearest on the graph.</>,
    more: <>A quicker way to find where the minimum lands: the new graph has its minimum where the argument <Katex tex="2x+1" /> equals the old <Katex tex="x" />-value 2, so <Katex tex="2x+1=2" />, giving <Katex tex="x=\tfrac12" />. The flat point at <Katex tex="(-1,1)" /> stays at <Katex tex="(-1,1)" />, since <Katex tex="2x+1=-1" /> gives <Katex tex="x=-1" /> — a handy second check against option <b>B</b>, whose flat point is at <Katex tex="x=-1.5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{A}}" />,
    reason: <>Matches option <b>A</b>, whose local minimum sits at <Katex tex="x=\tfrac12" />.</>,
    more: <>Option <b>B</b> (chosen by 28%) has the right squash but its minimum at <Katex tex="x=0" />: that is the graph of <Katex tex="f(2x+2)" />, a 1-unit shift left after the dilation, which comes from not factorising. Option <b>C</b> (minimum at <Katex tex="x=3" />) dilates by factor 2 and then shifts 1 left, and option <b>D</b> (minimum at <Katex tex="x=2" />) dilates by factor 2 and then shifts 2 left — both treat the 2 as a stretch.</>,
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
            <img loading="lazy" decoding="async"
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
