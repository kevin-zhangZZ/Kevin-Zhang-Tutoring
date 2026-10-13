// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 11. VCAA examination report: 24% correct.
// Identify a single dilation mapping one graph onto a related one. Question text transcribed
// from the original paper; solution is original.
// Checked in sympy: y1(x/2) = √(x³+1) exactly (A). Factor 8 gives √(x³/64+1) (D); factor ½ gives
// √(64x³+1) and is the reverse map y2 → y1 (E); no dilation from the x-axis works, since
// y2/y1 is not constant (1 at x = 0, √2/3 at x = 1) (B, C). Rows: name graphs; dilation rule (x → x/k); solve k³ = 8; check.
// Interactive: meth-2015-mcq11-dilate (slider k with quick buttons for A, D and E; the point
// (1, 3) and the endpoint (−½, 0) move to (k, 3) and (−k/2, 0) against the target curve).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const DilateWidget = lazyWidget(() => import('../interactives/meth-2015-mcq11-dilate'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 24, B: 7, C: 7, D: 32, E: 29 },
  answer: 'A',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="y_1=\sqrt{8x^3+1}" />, <Katex tex="y_2=\sqrt{8(x/2)^3+1}=\sqrt{x^3+1}" />. The graph of{' '}
      <Katex tex="y_1" /> has been dilated by a factor of 2 from the <Katex tex="y" />-axis to get the graph
      of <Katex tex="y_2" />. This can be shown by sketching the graphs of both functions. For example, the
      point with coordinates <Katex tex="(1,3)" /> is transformed to <Katex tex="(2,3)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y_1 = \sqrt{8x^3+1}, \qquad y_2 = \sqrt{x^3+1}" />,
    reason: <>Name the graphs. Only the <Katex tex="x^3" /> term differs, so look for a change to <Katex tex="x" /> alone: a dilation from the <Katex tex="y" />-axis.</>,
    more: <>A dilation from the <Katex tex="x" />-axis (options B and C) would multiply the whole of <Katex tex="y_1" /> by a constant. That can't work: at <Katex tex="x=0" /> both graphs equal <Katex tex="1" />, so the constant would have to be <Katex tex="1" />, yet at <Katex tex="x=1" /> they are <Katex tex="3" /> and <Katex tex="\sqrt2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{dilation by factor } k \text{ from the } y\text{-axis:} \\ &y = \sqrt{8\left(\frac{x}{k}\right)^3+1} \end{aligned}" />,
    reason: <>A dilation of factor <Katex tex="k" /> from the <Katex tex="y" />-axis sends <Katex tex="(x,y)\to(kx,y)" />, so the new rule has <Katex tex="x" /> replaced by <Katex tex="\tfrac{x}{k}" />.</>,
    more: <>Why divide? A point <Katex tex="(X,Y)" /> on the new graph came from <Katex tex="\left(\tfrac{X}{k},Y\right)" /> on the old one, so <Katex tex="Y=y_1\!\left(\tfrac{X}{k}\right)" />. The report checks the answer with a point: <Katex tex="(1,3)" /> is on <Katex tex="y_1" /> because <Katex tex="\sqrt{8+1}=3" />, and it moves to <Katex tex="(2,3)" />, which is on <Katex tex="y_2" /> because <Katex tex="\sqrt{2^3+1}=3" />.</>,
  },
  {
    working: <Katex display tex="8\left(\frac{x}{k}\right)^3 = \frac{8}{k^3}\,x^3 = x^3 \implies k^3 = 8 \implies k = 2" />,
    reason: <>Cubing <Katex tex="\tfrac{x}{k}" /> divides the <Katex tex="8" /> by <Katex tex="k^3" />. To leave just <Katex tex="x^3" /> we need <Katex tex="k^3=8" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} y_1\!\left(\frac{x}{2}\right) &= \sqrt{8\left(\frac{x}{2}\right)^3+1} \\ &= \sqrt{8\cdot\frac{x^3}{8}+1} \\ &= \sqrt{x^3+1} \\ &= y_2(x) \end{aligned}" />,
    reason: <>Check: with <Katex tex="k=2" /> the rule becomes exactly <Katex tex="y_2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{dilation by a factor of 2 from the } y\text{-axis}}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Only 24% chose A. D (32%) reads the <Katex tex="8" /> as the dilation factor, but the <Katex tex="8" /> multiplies <Katex tex="x^3" />, so the stretch on <Katex tex="x" /> is only <Katex tex="\sqrt[3]8=2" />; a factor of <Katex tex="8" /> would give <Katex tex="\sqrt{\tfrac{x^3}{64}+1}" />. E (29%) is the dilation that maps the graphs the other way, from <Katex tex="y_2" /> back to <Katex tex="y_1" />: <Katex tex="y_2(2x)=\sqrt{8x^3+1}" />. Always check which graph is the original — here <Katex tex="y=\sqrt{8x^3+1}" /> is mapped <em>onto</em> <Katex tex="y=\sqrt{x^3+1}" />. B and C fail because no dilation from the <Katex tex="x" />-axis works (row 1).</>,
  },
]

export default function MethodsQ11_2015() {
  return (
    <MCQShell
      question={
        <p>
          The transformation that maps the graph of <Katex tex="y=\sqrt{8x^3+1}" /> onto the graph of{' '}
          <Katex tex="y=\sqrt{x^3+1}" /> is a
        </p>
      }
      options={[
        { letter: 'A', content: <>dilation by a factor of 2 from the <Katex tex="y" />-axis</>, isAnswer: true },
        { letter: 'B', content: <>dilation by a factor of 2 from the <Katex tex="x" />-axis</> },
        { letter: 'C', content: <>dilation by a factor of <Katex tex="\tfrac12" /> from the <Katex tex="x" />-axis</> },
        { letter: 'D', content: <>dilation by a factor of 8 from the <Katex tex="y" />-axis</> },
        { letter: 'E', content: <>dilation by a factor of <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis</> },
      ]}
      rows={ROWS}
      extras={
        <Explore title="Only factor 2 lands on the target">
          <DilateWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
