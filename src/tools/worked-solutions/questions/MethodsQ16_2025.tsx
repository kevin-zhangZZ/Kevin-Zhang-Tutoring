// 2025 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 18% correct. This
// year's paper used four options (A–D) rather than five. What must be true of a and b so that
// the derivative of a·ln(bx) has range (0, ∞), across both possible sign cases. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraph1Src from './meth-2025-mcq16-report-graph1.png'
import reportGraph2Src from './meth-2025-mcq16-report-graph2.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 16, C: 46, D: 18 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="h(x)=a\log_e(bx),\ h'(x)=\dfrac{a}{x}" />
      <br />
      The two cases where <Katex tex="h'" /> has range <Katex tex="(0,\infty)" /> are{' '}
      <Katex tex="a>0" /> and <Katex tex="b>0" /> or <Katex tex="a<0" /> and <Katex tex="b<0" />.
      <br />
      In both cases it must be true that <Katex tex="ab>0" />.
      <br />
      Example 1 <Katex tex="a=1" /> and <Katex tex="b=1" />.
      <img loading="lazy" decoding="async" src={reportGraph1Src} alt="The report's Example 1: h(x) = ln(x) and h′(x) = 1/x, both defined for x > 0, with h′ positive throughout" className="w-full max-w-[360px] mt-1" />
      <br />
      Example 2 <Katex tex="a=-1" /> and <Katex tex="b=-1" />.
      <img loading="lazy" decoding="async" src={reportGraph2Src} alt="The report's Example 2: h(x) = −ln(−x) and h′(x) = −1/x, both defined for x < 0, with h′ positive throughout" className="w-full max-w-[360px] mt-1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = a\log_e(bx) \;\implies\; h'(x) = a\cdot\frac{b}{bx} = \frac{a}{x}" />,
    reason: <>Chain rule: the derivative of <Katex tex="\log_e(bx)" /> is <Katex tex="\frac{b}{bx}" />. The <Katex tex="b" /> cancels out of <Katex tex="h'" />, but it still controls the <i>domain</i>.</>,
  },
  {
    working: <>Domain requires <Katex tex="bx>0" />: if <Katex tex="b>0" />, domain is <Katex tex="x>0" />; if <Katex tex="b<0" />, domain is <Katex tex="x<0" />.</>,
    reason: <>The sign of <Katex tex="b" /> decides which half-line <Katex tex="h" /> (and so <Katex tex="h'" />) is defined on, and that decides the sign of <Katex tex="\frac{a}{x}" />.</>,
    more: <>It is easy to assume a log is always defined for <Katex tex="x>0" />, but that is only true when <Katex tex="b>0" />. For example, with <Katex tex="b=-1" />, <Katex tex="h(x)=a\log_e(-x)" /> is defined only for <Katex tex="x<0" />. This is the case students who chose C missed.</>,
  },
  {
    working: <Katex display tex="b>0:\ \ x>0,\ \ \frac{a}{x}>0 \implies a>0" />,
    reason: <>For <Katex tex="\frac{a}{x}" /> to stay positive when <Katex tex="x" /> is always positive, need <Katex tex="a>0" />.</>,
    more: <>The question asks for range <Katex tex="(0,\infty)" />, not just positive values. With <Katex tex="a>0" /> and <Katex tex="x>0" /> that holds: as <Katex tex="x\to0^+" />, <Katex tex="\frac{a}{x}\to\infty" />, and as <Katex tex="x\to\infty" />, <Katex tex="\frac{a}{x}\to0^+" />, so every positive value is reached. The report's Example 1 (<Katex tex="a=b=1" />) shows this case.</>,
  },
  {
    working: <Katex display tex="b<0:\ \ x<0,\ \ \frac{a}{x}>0 \implies a<0" />,
    reason: <>Now <Katex tex="x" /> is always negative, so <Katex tex="\frac{a}{x}" /> is positive only if <Katex tex="a<0" /> (negative ÷ negative).</>,
    more: <>Again the full range <Katex tex="(0,\infty)" /> is reached: as <Katex tex="x\to0^-" />, <Katex tex="\frac{a}{x}\to\infty" />, and as <Katex tex="x\to-\infty" />, <Katex tex="\frac{a}{x}\to0^+" />. The report's Example 2 (<Katex tex="a=b=-1" />, so <Katex tex="h(x)=-\log_e(-x)" />) shows this case.</>,
  },
  {
    working: <>Both valid cases — <Katex tex="(a>0,b>0)" /> and <Katex tex="(a<0,b<0)" /> — have <Katex tex="a" /> and <Katex tex="b" /> the <b>same sign</b>.</>,
    reason: <>Either case is possible, so a statement that <i>must</i> be true has to hold in both.</>,
  },
  {
    working: <Katex display tex="\boxed{ab>0}" />,
    reason: <>Same sign is exactly <Katex tex="ab>0" />. Matches option <b>D</b>.</>,
    more: <>
      Test each option against the example <Katex tex="a=b=-1" />, which works:
      <br />• <b>A</b> (<Katex tex="a>0" /> only) and <b>C</b> (<Katex tex="a>0" /> and <Katex tex="b>0" />) both fail it. C (chosen by 46%) describes a case that <i>works</i>, but &ldquo;must be true&rdquo; asks for something every valid pair satisfies, and C misses the second case.
      <br />• <b>B</b> (<Katex tex="a>0" /> and <Katex tex="b<0" />) never works: the domain is <Katex tex="x<0" />, so <Katex tex="\frac{a}{x}<0" /> and the range is <Katex tex="(-\infty,0)" />.
      <br />• <b>D</b> (<Katex tex="ab>0" />) holds in both cases.
    </>,
  },
]

export default function MethodsQ16_2025() {
  return (
    <MCQShell
      question={
        <p>
          Consider the function <Katex tex="h(x)=a\log_e(bx)" />, where <Katex tex="a,b\in R\setminus\{0\}" />.
          <br />
          Given that its derivative <Katex tex="h'(x)" /> has range <Katex tex="(0,\infty)" />, which of the
          following <b>must</b> be true?
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="a>0" /> only</> },
        { letter: 'B', content: <><Katex tex="a>0" /> and <Katex tex="b<0" /></> },
        { letter: 'C', content: <><Katex tex="a>0" /> and <Katex tex="b>0" /></> },
        { letter: 'D', content: <Katex tex="ab>0" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
