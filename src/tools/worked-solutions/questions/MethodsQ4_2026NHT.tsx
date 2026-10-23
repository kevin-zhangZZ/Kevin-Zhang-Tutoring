// 2026 Mathematical Methods NHT — Exam 2, MCQ 4. The NHT report gives the answer key only, with no
// statistics; its worked comment is transcribed below from the rendered report, with its graph
// cropped from the report PDF (meth-2026nht-mcq4-report-graph.png). Functions: finding the domain of a hyperbola's restriction from its range. Question
// text transcribed from the original paper. Solution is original; the answer A agrees with the
// report's key (f(−4) = 1, f(−1) = −2, f decreasing on x < 0 — checked by substitution).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2026nht-mcq4-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'A',
  comment: (
    <>
      <Katex tex="f(x)=\dfrac4x+2" />
      <br />
      Solve <Katex tex="\dfrac4x+2=1" />, <Katex tex="x=-4" /> and <Katex tex="\dfrac4x+2=-2" />, <Katex tex="x=-1" />.
      <br />
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's graph of y = f(x) for −4 ≤ x < −1: a curve from the closed point (−4, 1) down to the open point (−1, −2), on a grid from −6 to 6 on both axes" className="w-full max-w-[360px] mt-1" />
      <br />
      If <Katex tex="-4\le x<-1" />, then the range of <Katex tex="f(x)" /> is <Katex tex="-2<y\le1" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x>0\implies \frac4x>0\implies f(x)>2" />,
    reason: <>The range <Katex tex="(-2,\ 1]" /> lies entirely below the asymptote <Katex tex="y=2" />. On the right branch every output is above 2, so the domain must be on the <b>left</b> branch, <Katex tex="x<0" />. That rules out options C and D straight away.</>,
  },
  {
    working: <Katex display tex="\frac4x+2=1\implies\frac4x=-1\implies x=-4" />,
    reason: <>Find the <Katex tex="x" />-value that gives each end of the range. The top end, <Katex tex="y=1" />…</>,
  },
  {
    working: <Katex display tex="\frac4x+2=-2\implies\frac4x=-4\implies x=-1" />,
    reason: <>…and the bottom end, <Katex tex="y=-2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}f(-4)&=1\ \text{(included)}\\f(-1)&=-2\ \text{(excluded)}\end{aligned}" />,
    reason: <>The square bracket in <Katex tex="(-2,\ 1]" /> says <Katex tex="y=1" /> is reached, so <Katex tex="x=-4" /> is in the domain; the round bracket says <Katex tex="y=-2" /> is not, so <Katex tex="x=-1" /> is left out.</>,
    more: <>On <Katex tex="x<0" />, <Katex tex="f" /> is decreasing (<Katex tex="f'(x)=-\tfrac{4}{x^2}<0" />), so as <Katex tex="x" /> runs from <Katex tex="-4" /> up towards <Katex tex="-1" />, <Katex tex="y" /> falls continuously from <Katex tex="1" /> towards <Katex tex="-2" /> — every value in between is hit exactly once. A quick sketch of the left branch shows this at a glance.</>,
  },
  {
    working: <Katex display tex="\boxed{D=[-4,\ -1)}" />,
    reason: <>Matches option <b>A</b>. Check: <Katex tex="x=-2" /> gives <Katex tex="f(-2)=0" />, inside <Katex tex="(-2,\ 1]" /> ✓.</>,
    more: <>Option <b>B</b>, <Katex tex="(-4,\ -1]" />, has the brackets the wrong way round: it would include <Katex tex="x=-1" /> (giving the excluded <Katex tex="y=-2" />) and leave out <Katex tex="x=-4" /> (losing <Katex tex="y=1" />). Brackets transfer from range to domain at the <b>matching</b> point, not by position — here the decreasing function sends the left end of the domain to the right end of the range.</>,
  },
]

export default function MethodsQ4_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            The function <Katex tex="f:D\to R,\ f(x)=\dfrac4x+2" /> has range <Katex tex="(-2,\ 1]" />.
          </p>
          <p>The domain <Katex tex="D" /> is</p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="[-4,\ -1)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="(-4,\ -1]" /> },
        { letter: 'C', content: <Katex tex="(-1,\ 4]" /> },
        { letter: 'D', content: <Katex tex="[-1,\ 4)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
