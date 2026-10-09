// 2022 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 47% correct. Which pair
// of functions is NOT a genuine inverse pair — testing whether each g really is f⁻¹ on f's own
// restricted domain. Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2022-mcq6-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 20, C: 47, D: 14, E: 16 },
  answer: 'C',
  comment: (
    <>
      The inverse of <Katex tex="f:(-\infty,0)\to R,\ f(x)=x^2" /> is{' '}
      <Katex tex="f^{-1}:(0,\infty)\to R,\ f^{-1}(x)=-\sqrt x" />, not <Katex tex="g(x)=\sqrt x,\ x>0" />.
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's graph: f(x) = x², x < 0, its reflection g(x) = −√x, x > 0, in the dotted line y = x" className="w-full max-w-[360px] mt-1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>For each pair, find <Katex tex="f^{-1}" /> (swap <Katex tex="x" /> and <Katex tex="y" />, solve for <Katex tex="y" />) and compare it with <Katex tex="g" />.</>,
    reason: <>For <Katex tex="g" /> to be the inverse of <Katex tex="f" />, it needs the same rule as <Katex tex="f^{-1}" />, its domain must be the range of <Katex tex="f" />, and its outputs must be the domain of <Katex tex="f" />. A restriction on the domain of <Katex tex="f" /> can change the rule of <Katex tex="f^{-1}" />, for example which sign of a square root to keep.</>,
  },
  {
    working: <Katex display tex="\text{A: } x=5y+3 \implies y=\tfrac{x-3}{5}=g(x)\ \checkmark" />,
    reason: <>Both functions are defined for all <Katex tex="x\in R" />, so there is no restriction to check. Genuine inverse pair.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{B: } x&=\tfrac23y+2\\ y&=\tfrac32(x-2)\\ &=\tfrac32x-3=g(x)\ \checkmark\end{aligned}" />,
    reason: <>Subtract 2, then multiply by <Katex tex="\tfrac32" />; expanding the bracket gives the <Katex tex="-3" /> (<Katex tex="\tfrac32\times2=3" />). Both domains are <Katex tex="R" />, so this is a genuine inverse pair.</>,
    more: <>B was the most popular wrong answer. The <Katex tex="-3" /> can look wrong if you invert the line piece by piece, flipping the gradient and changing the sign of the constant to get <Katex tex="\tfrac32x-2" />. That shortcut does not work: the constant gets multiplied by <Katex tex="\tfrac32" /> too. A number check settles it: <Katex tex="f(0)=2" />, and <Katex tex="g(2)=\tfrac32(2)-3=0" />, so <Katex tex="g" /> takes <Katex tex="f" />'s output straight back to the input.</>,
  },
  {
    working: <Katex display tex="\text{C: } f(x)=x^2,\ x<0 \implies \text{ran}\,f=(0,\infty)" />,
    reason: <>Squaring a negative number gives a positive number, so every output of <Katex tex="f" /> is positive. These outputs become the inputs (domain) of <Katex tex="f^{-1}" />.</>,
  },
  {
    working: <Katex display tex="x=y^2,\ y<0 \implies y=-\sqrt x" />,
    reason: <>Solving gives <Katex tex="y=\pm\sqrt x" />. The outputs of <Katex tex="f^{-1}" /> must be the inputs of <Katex tex="f" />, which are negative, so reject <Katex tex="+\sqrt x" />.</>,
  },
  {
    working: <Katex display tex="f^{-1}(x)=-\sqrt x,\ x>0 \ \neq\ g(x)=\sqrt x" />,
    reason: <><Katex tex="g" /> has the right domain but the wrong sign: its outputs are positive, and <Katex tex="f" /> only takes negative inputs. Check: <Katex tex="f(-2)=4" />, but <Katex tex="g(4)=2" />, not <Katex tex="-2" />, so <Katex tex="g" /> does not undo <Katex tex="f" />.</>,
    more: <>Composing the rules alone, <Katex tex="f(g(x))=\big(\sqrt x\big)^2=x" />, seems to work, but it ignores that <Katex tex="f" /> is restricted to <Katex tex="x<0" />, so <Katex tex="f(g(x))" /> is not even defined. The other way round, <Katex tex="g(f(x))=\sqrt{x^2}=|x|=-x" /> for <Katex tex="x<0" />, not <Katex tex="x" />. On a graph, <Katex tex="f" /> is the left half of the parabola, in the second quadrant. Reflecting it in <Katex tex="y=x" /> lands in the fourth quadrant, on <Katex tex="y=-\sqrt x" />, as in the report's graph. The curve <Katex tex="y=\sqrt x" /> is the reflection of the <em>right</em> half instead.</>,
  },
  {
    working: <Katex display tex="\text{D: } x=\tfrac1y \implies y=\tfrac1x=g(x)\ \checkmark" />,
    reason: <><Katex tex="f" /> takes every value except 0, which is exactly the domain of <Katex tex="g" />, <Katex tex="x\neq0" />. So <Katex tex="\tfrac1x" /> is its own inverse, and this is a genuine inverse pair.</>,
    more: <>A function can be its own inverse. The graph of <Katex tex="y=\tfrac1x" /> is symmetric about the line <Katex tex="y=x" />, so reflecting it in that line changes nothing. Check: <Katex tex="f(2)=\tfrac12" />, and <Katex tex="g\!\left(\tfrac12\right)=2" />.</>,
  },
  {
    working: <Katex display tex="\text{E: } x=\log_e(y)+1 \implies y=e^{x-1}=g(x)\ \checkmark" />,
    reason: <><Katex tex="x-1=\log_e(y)" />, so <Katex tex="y=e^{x-1}" />. The range of <Katex tex="f" /> is <Katex tex="R" /> (a log takes every real value), matching the domain of <Katex tex="g" />, so this is a genuine inverse pair.</>,
    more: <>The two domains are different, <Katex tex="x>0" /> and <Katex tex="x\in R" />, and that is exactly right: the domain of an inverse is the <em>range</em> of <Katex tex="f" />, not the domain of <Katex tex="f" />. It works the other way too: the range of <Katex tex="g(x)=e^{x-1}" /> is <Katex tex="(0,\infty)" />, the domain of <Katex tex="f" />. Note the rule is <Katex tex="e^{x-1}" />, not <Katex tex="e^x-1" />: the <Katex tex="+1" /> was added after the log, so it is undone first, before exponentiating.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{C}}" />,
    reason: <>Matches option <b>C</b>: the only pair where <Katex tex="g" /> is not <Katex tex="f^{-1}" />.</>,
    more: <>More than half the students (53%) chose a genuine pair, mostly B (20%), E (16%) or D (14%). Each genuine pair, A included, passes all three checks: rule, domain and outputs. Only in C does <Katex tex="g" /> give outputs that lie outside the domain of <Katex tex="f" />.</>,
  },
]

export default function MethodsQ6_2022() {
  return (
    <MCQShell
      question={<p>Which of the pairs of functions below are <b>not</b> inverse functions?</p>}
      options={[
        { letter: 'A', content: <><Katex tex="f(x)=5x+3,\ x\in R" /><br /><Katex tex="g(x)=\dfrac{x-3}{5},\ x\in R" /></> },
        { letter: 'B', content: <><Katex tex="f(x)=\tfrac23x+2,\ x\in R" /><br /><Katex tex="g(x)=\tfrac32x-3,\ x\in R" /></> },
        { letter: 'C', content: <><Katex tex="f(x)=x^2,\ x<0" /><br /><Katex tex="g(x)=\sqrt x,\ x>0" /></>, isAnswer: true },
        { letter: 'D', content: <><Katex tex="f(x)=\dfrac1x,\ x\neq0" /><br /><Katex tex="g(x)=\dfrac1x,\ x\neq0" /></> },
        { letter: 'E', content: <><Katex tex="f(x)=\log_e(x)+1,\ x>0" /><br /><Katex tex="g(x)=e^{x-1},\ x\in R" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
