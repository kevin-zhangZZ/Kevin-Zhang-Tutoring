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
      <img src={reportGraphSrc} alt="The report's graph: f(x) = x², x < 0, its reflection g(x) = −√x, x > 0, in the dotted line y = x" className="w-full max-w-[360px] mt-1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>For each pair, find <Katex tex="f^{-1}" /> (swap <Katex tex="x" /> and <Katex tex="y" />, solve for <Katex tex="y" />) and compare it with <Katex tex="g" />: rule <i>and</i> domain.</>,
    reason: <>For <Katex tex="g" /> to be the inverse of <Katex tex="f" />, it needs the same rule as <Katex tex="f^{-1}" />, its domain must be the range of <Katex tex="f" />, and its outputs must be the domain of <Katex tex="f" />. A rule with the right shape can still fail on the domain restriction.</>,
  },
  {
    working: <Katex display tex="\text{A: } x=5y+3 \implies y=\tfrac{x-3}{5}=g(x)\ \checkmark" />,
    reason: <>Both functions are defined for all <Katex tex="x\in R" />, so there is no restriction to check. Genuine inverse pair.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{B: } x&=\tfrac23y+2\\ y&=\tfrac32(x-2)\\ &=\tfrac32x-3=g(x)\ \checkmark\end{aligned}" />,
    reason: <>Subtract 2, then multiply by <Katex tex="\tfrac32" />. Expanding the bracket is where the <Katex tex="-3" /> comes from (<Katex tex="\tfrac32\times2=3" />). Both domains are <Katex tex="R" />. Genuine inverse pair.</>,
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
    reason: <><Katex tex="g" /> has the right domain but the wrong sign: its outputs are positive, and <Katex tex="f" /> only takes negative inputs. Check with a number: <Katex tex="f(-2)=4" />, but <Katex tex="g(4)=2" />, not <Katex tex="-2" />, so <Katex tex="g" /> does not undo <Katex tex="f" />. Substituting the rules alone, <Katex tex="\big(\sqrt x\big)^2=x" />, seems to work, but it ignores that <Katex tex="f" /> is restricted to <Katex tex="x<0" />.</>,
  },
  {
    working: <Katex display tex="\text{D: } x=\tfrac1y \implies y=\tfrac1x=g(x)\ \checkmark" />,
    reason: <><Katex tex="f" /> takes every value except 0, which is exactly the domain of <Katex tex="g" />, <Katex tex="x\neq0" />. So <Katex tex="\tfrac1x" /> is its own inverse. Genuine inverse pair.</>,
  },
  {
    working: <Katex display tex="\text{E: } x=\log_e(y)+1 \implies y=e^{x-1}=g(x)\ \checkmark" />,
    reason: <><Katex tex="x-1=\log_e(y)" />, so <Katex tex="y=e^{x-1}" />. The range of <Katex tex="f" /> is <Katex tex="R" /> (a log takes every real value), matching the domain of <Katex tex="g" />. Genuine inverse pair.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{C}}" />,
    reason: <>Matches option <b>C</b>. Options A, B, D and E are all genuine inverse pairs (rows above); only in C does <Katex tex="g" /> give outputs that lie outside the domain of <Katex tex="f" />.</>,
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
