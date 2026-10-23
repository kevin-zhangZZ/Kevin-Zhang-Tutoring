// 2023 Mathematical Methods NHT — Exam 2, MCQ 12. The NHT report gives the answer key only, with
// no statistics. Calculus: the gradient graph of a hyperbola-like curve that is increasing on
// both branches. Question text transcribed from the original paper; the stem graph and the five
// option graphs are cropped from the original VCAA exam PDF. Solution is original; the answer C
// agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import stemSrc from './meth-2023nht-mcq12-stem.png'
import optASrc from './meth-2023nht-mcq12-optA.png'
import optBSrc from './meth-2023nht-mcq12-optB.png'
import optCSrc from './meth-2023nht-mcq12-optC.png'
import optDSrc from './meth-2023nht-mcq12-optD.png'
import optESrc from './meth-2023nht-mcq12-optE.png'

function Panel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-2 w-fit">
      <img loading="lazy" decoding="async" src={src} alt={alt} className="w-full max-w-[240px]" />
    </div>
  )
}

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f \text{ increasing on both branches}\ \Rightarrow\ f'(x)>0" />,
    reason: <>Read the gradient, not the height. Left of the vertical asymptote the curve rises; right of it the curve also rises. So <Katex tex="f'(x)" /> is positive everywhere it exists, and the graph of <Katex tex="f'" /> lies entirely above the <Katex tex="x" />-axis.</>,
    more: <>The fact that <Katex tex="f" /> itself is negative just right of the asymptote is irrelevant: a function can be below the axis and still be going up. This alone rules out options <b>B</b>, <b>D</b> and <b>E</b>, which all dip below the axis.</>,
  },
  {
    working: <Katex display tex="x\to a:\ f'(x)\to\infty \ \text{ from both sides}" />,
    reason: <>Next to the vertical asymptote (call it <Katex tex="x=a" />, with <Katex tex="a>0" />) both branches become vertical, so the gradient grows without bound. <Katex tex="f'" /> has the same vertical asymptote, shooting up on both sides.</>,
  },
  {
    working: <Katex display tex="x\to\pm\infty:\ f'(x)\to 0^+" />,
    reason: <>Far out, <Katex tex="f" /> flattens towards its horizontal asymptote, so its gradient approaches 0 from above: the <Katex tex="x" />-axis is a horizontal asymptote of <Katex tex="f'" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{C}}" />,
    reason: <>Matches option <b>C</b>: positive everywhere, a vertical asymptote at the same <Katex tex="x=a" /> with both sides going up, and approaching the <Katex tex="x" />-axis at both ends.</>,
    more: <>Option <b>B</b> is the graph of <Katex tex="f" /> shifted down, not its gradient. Option <b>E</b> has the right shape but is upside down — the gradient of a curve that is falling on both branches. Option <b>A</b> crosses below the axis and has no horizontal asymptote. A rule with this shape, for checking: <Katex tex="f(x)=1-\tfrac{1}{x-1}" /> gives <Katex tex="f'(x)=\tfrac{1}{(x-1)^2}" />, which is option C&apos;s shape.</>,
  },
]

export default function MethodsQ12_2023NHT() {
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
              alt="The graph of y = f(x): two branches either side of a vertical asymptote just right of the y-axis. The left branch rises slowly from a horizontal asymptote above the x-axis and shoots up near the asymptote; the right branch rises from far below, crosses the x-axis and levels off towards the same horizontal asymptote — from the original 2023 NHT VCAA exam paper"
              className="w-full max-w-[320px]"
            />
          </div>
          <p>
            The graph of <Katex tex="y=f'(x)" /> is best represented by
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Panel src={optASrc} alt="Option A: a curve rising through the origin to a vertical asymptote, then a branch coming down from above to a minimum and rising again" /> },
        { letter: 'B', content: <Panel src={optBSrc} alt="Option B: a copy of the shape of f shifted down, with its right branch below the x-axis" /> },
        { letter: 'C', content: <Panel src={optCSrc} alt="Option C: both branches above the x-axis, rising to a vertical asymptote from both sides and flattening towards the x-axis at both ends" />, isAnswer: true },
        { letter: 'D', content: <Panel src={optDSrc} alt="Option D: a decreasing curve through the y-axis down to a vertical asymptote, then a branch rising from below to a maximum below the axis and falling" /> },
        { letter: 'E', content: <Panel src={optESrc} alt="Option E: both branches below the x-axis, dropping to a vertical asymptote from both sides" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
