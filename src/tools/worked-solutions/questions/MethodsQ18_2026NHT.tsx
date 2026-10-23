// 2026 Mathematical Methods NHT — Exam 2, MCQ 18. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment for this question (transcribed below from the rendered
// report). Calculus: choosing the graph of f from the graph of f′. Question text transcribed from the
// original paper; the graph of f′ and the four option graphs are cropped from the original VCAA exam
// PDF. Solution is original; the answer C agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import stemSrc from './meth-2026nht-mcq18-stem.png'
import optASrc from './meth-2026nht-mcq18-optA.png'
import optBSrc from './meth-2026nht-mcq18-optB.png'
import optCSrc from './meth-2026nht-mcq18-optC.png'
import optDSrc from './meth-2026nht-mcq18-optD.png'

function Panel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-2 w-fit">
      <img loading="lazy" decoding="async" src={src} alt={alt} className="w-full max-w-[260px]" />
    </div>
  )
}

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'C',
  comment: (
    <>
      Notice that <Katex tex="f'(3)=0" />, so the graph of <Katex tex="y=f(x)" /> must have a stationary point at <Katex tex="x=3" />.
      <br />
      Notice that <Katex tex="f'(x)>0" /> for all <Katex tex="x\neq3" />, so the graph of <Katex tex="y=f(x)" /> should be strictly increasing.
      <br />
      Only Option C meets both conditions.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)>0\ \text{ for all } x\neq3" />,
    reason: <>The given graph is the <b>gradient</b> of <Katex tex="f" />. It stays above the <i>x</i>-axis everywhere except where it touches at <Katex tex="x=3" />, so <Katex tex="f" /> is increasing throughout and never turns down.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&f'(3)=0,\ \text{no sign change}\\&\Rightarrow\ \text{stationary point of}\\&\phantom{\Rightarrow\ }\text{inflection at } x=3\end{aligned}" />,
    reason: <><Katex tex="f'" /> touches zero at <Katex tex="x=3" /> but is positive on both sides, so <Katex tex="f" /> flattens out there and keeps climbing.</>,
    more: <>Extra check: <Katex tex="f'" /> is largest near <Katex tex="x=1" />, so <Katex tex="f" /> should be steepest near <Katex tex="x=1" />. Option C&apos;s curve is steepest around there too.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{A: }&\text{flat at } x\approx1,\ \text{not at } x=3\\\text{B: }&\text{decreasing for about } -0.3<x<2.4\\\text{D: }&\text{decreasing for about } 2.1<x<3\\\text{C: }&\text{increasing, flat only at } x=3\ \checkmark\end{aligned}" />,
    reason: <>Check each option against both conditions. A has its flat point where <Katex tex="f'(1)" /> is near its largest value, not zero; B and D both fall somewhere, which would need <Katex tex="f'<0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Option C}}" />,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function MethodsQ18_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            The graph of <Katex tex="y=f'(x)" /> is shown below.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={stemSrc}
              alt="The graph of y = f′(x): positive for all x shown, rising gently to a maximum of about 0.5 at x = 1, falling to touch the x-axis at x = 3, then rising steeply — from the original 2026 NHT VCAA exam paper"
              className="w-full max-w-[400px]"
            />
          </div>
          <p>
            The graph of <Katex tex="y=f(x)" /> could be
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Panel src={optASrc} alt="Option A: an increasing curve that flattens to a horizontal point near x = 1 and then rises steeply" /> },
        { letter: 'B', content: <Panel src={optBSrc} alt="Option B: a curve that is nearly flat for negative x, falls through x = 1 to a minimum near x = 2.4, then rises steeply through x = 3" /> },
        { letter: 'C', content: <Panel src={optCSrc} alt="Option C: an increasing curve, steepest near x = 1, flattening to a horizontal point at x = 3, then rising steeply" />, isAnswer: true },
        { letter: 'D', content: <Panel src={optDSrc} alt="Option D: a curve near zero for negative x, a small maximum near x = 2, a minimum touching the x-axis at x = 3, then rising steeply" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
