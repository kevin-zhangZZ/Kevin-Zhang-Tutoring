// 2026 Mathematical Methods NHT — Exam 2, MCQ 17. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment for this question (transcribed below from the rendered
// report). Functions: identifying the graph of f∘g from the graphs of f and g. Question text
// transcribed from the original paper; the graphs of f and g and the four option graphs are cropped
// from the original VCAA exam PDF. Solution is original; the answer D agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import fSrc from './meth-2026nht-mcq17-f.png'
import gSrc from './meth-2026nht-mcq17-g.png'
import optASrc from './meth-2026nht-mcq17-optA.png'
import optBSrc from './meth-2026nht-mcq17-optB.png'
import optCSrc from './meth-2026nht-mcq17-optC.png'
import optDSrc from './meth-2026nht-mcq17-optD.png'

function Panel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-2 w-fit">
      <img loading="lazy" decoding="async" src={src} alt={alt} className="w-full max-w-[220px]" />
    </div>
  )
}

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      Notice that <Katex tex="g(0)=0" /> and <Katex tex="f(0)=1" />, so <Katex tex="(f\circ g)(0)=1" />.
      <br />
      Notice that <Katex tex="g(0.5)=0" /> and <Katex tex="f(0)=1" />, so <Katex tex="(f\circ g)(0.5)=1" />.
      <br />
      Finally, notice that <Katex tex="g(0.25)=g(0.75)=1" /> and <Katex tex="f(1)=0" />, so <Katex tex="(f\circ g)(0.25)=(f\circ g)(0.75)=0" />.
      <br />
      Only Option D passes through all of these points.
      <br />
      Alternatively, <Katex tex="f" /> is a strictly decreasing function, so <Katex tex="(f\circ g)(x)" /> must be decreasing when <Katex tex="g" /> is increasing and vice versa. Only Option D shows this behaviour.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="(f\circ g)(x)=f\big(g(x)\big)" />,
    reason: <>Read inside out: first find <Katex tex="g(x)" /> on the right-hand graph, then feed that number into <Katex tex="f" /> on the left-hand graph.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x=0,\ 0.5,\ 1:&\quad g(x)=0\ \Rightarrow\ f(0)=1\\x=0.25,\ 0.75:&\quad g(x)=1\ \Rightarrow\ f(1)=0\end{aligned}" />,
    reason: <>Use the points that can be read exactly: the zeros and peaks of <Katex tex="g" />, and the endpoints of <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="0\le g(x)\le1\ \Rightarrow\ 0\le f\big(g(x)\big)\le 1" />,
    reason: <><Katex tex="f" /> is decreasing from 1 to 0 on <Katex tex="[0,1]" />, so <Katex tex="f\circ g" /> stays between 0 and 1, and goes <b>down</b> whenever <Katex tex="g" /> goes up (and up when <Katex tex="g" /> comes down).</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Option D}}" />,
    reason: <>Matches option <b>D</b>. Option <b>B</b> rises above 1, which <Katex tex="f\circ g" /> never can. Option <b>A</b> also goes above 1 and ends at 0 instead of 1. Option <b>C</b> starts and ends at 0, the values of <Katex tex="g\big(f(x)\big)" /> at <Katex tex="x=0" /> and <Katex tex="x=1" />: the composition taken in the wrong order.</>,
  },
]

export default function MethodsQ17_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            Suppose the graphs of the functions <Katex tex="f:[0,1]\to R" /> and <Katex tex="g:[0,1]\to R" /> are as shown below.
          </p>
          <div className="flex flex-wrap gap-3">
            <Panel src={fSrc} alt="The graph of y = f(x): a curve decreasing from (0, 1) to (1, 0), concave up — from the original 2026 NHT VCAA exam paper" />
            <Panel src={gSrc} alt="The graph of y = g(x): starts at (0, 0), peaks at 1 at x = 0.25, returns to 0 at x = 0.5, peaks at 1 again at x = 0.75 and ends at (1, 0) — from the original 2026 NHT VCAA exam paper" />
          </div>
          <p>
            The graph of <Katex tex="y=(f\circ g)(x)" /> is best represented by
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Panel src={optASrc} alt="Option A: starts at (0, 1), peaks above 1.5 near x = 0.25, dips to about 0.27 at x = 0.5, rises to about 1.1 at x = 0.75 and ends at (1, 0)" /> },
        { letter: 'B', content: <Panel src={optBSrc} alt="Option B: starts at (0, 1), peaks at 1.5 at x = 0.25 and 0.75, dips to 0.5 at x = 0.5 and ends at (1, 1)" /> },
        { letter: 'C', content: <Panel src={optCSrc} alt="Option C: starts at (0, 0), a narrow peak of 1 near x = 0.12, back to 0 near x = 0.28, a wider peak of 1 near x = 0.53 and ends at (1, 0)" /> },
        { letter: 'D', content: <Panel src={optDSrc} alt="Option D: starts at (0, 1), down to 0 at x = 0.25, up to 1 at x = 0.5, down to 0 at x = 0.75 and ends at (1, 1)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
