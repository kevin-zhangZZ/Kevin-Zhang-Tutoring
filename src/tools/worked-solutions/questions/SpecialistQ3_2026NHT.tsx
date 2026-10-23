// 2026 Specialist NHT — Exam 2, MCQ 3. The NHT report gives the answer key and a trace table
// only, with no statistics. Calculus / algorithms: tracing a two-pass loop that approximates the
// surface area of y = √(x² + 1), 0 ≤ x ≤ 2, rotated about the x-axis. Question text transcribed
// from the original paper (the pseudocode is typeset, not cropped). Solution is original; the
// answer C agrees with the report's key. Python gives the two passes as 7.6036… and 14.6617…,
// sum 22.2653…; the exact surface area 2π∫₀²√(2x² + 1) dx = 22.7654…. The report's trace writes
// the first pass as 7.603 (truncated); to three decimal places it is 7.604, option A.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'C',
  comment: (
    <>
      <Katex tex="left\qquad\qquad area" />
      <br />
      <Katex tex="0\qquad 2\pi f\left(\frac{0+1}{2}\right)\sqrt{\left(f(0)-f(1)\right)^2+1}=7.603" />
      <br />
      <Katex tex="1\qquad 2\pi f\left(\frac{1+2}{2}\right)\sqrt{\left(f(1)-f(2)\right)^2+1}=14.662" />
      <br />
      <Katex tex="print=7.603+14.662" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{left}=0,\ 1\quad(\text{then left}=2>1\text{, stop})" />,
    reason: <>The loop runs while <code>left ≤ 1</code>, starting at 0 and adding 1 each pass, so it runs <b>twice</b>: once with <code>left = 0</code> and once with <code>left = 1</code>. Each pass adds one <code>area</code> to <code>sum</code>.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{area}_0&=2\pi f\!\left(\tfrac12\right)\sqrt{\big(f(0)-f(1)\big)^2+1}\\ &=2\pi\sqrt{\tfrac54}\,\sqrt{\big(1-\sqrt2\big)^2+1}\\ &=7.6036\ldots\end{aligned}" />,
    reason: <>First pass, <code>left = 0</code>: the midpoint is <Katex tex="\tfrac{0+1}{2}=\tfrac12" />, and <Katex tex="f(0)=1" />, <Katex tex="f(1)=\sqrt2" />, <Katex tex="f(\tfrac12)=\sqrt{\tfrac14+1}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{area}_1&=2\pi f\!\left(\tfrac32\right)\sqrt{\big(f(1)-f(2)\big)^2+1}\\ &=2\pi\sqrt{\tfrac{13}4}\,\sqrt{\big(\sqrt2-\sqrt5\big)^2+1}\\ &=14.6617\ldots\end{aligned}" />,
    reason: <>Second pass, <code>left = 1</code>: midpoint <Katex tex="\tfrac32" />, with <Katex tex="f(2)=\sqrt5" />.</>,
  },
  {
    working: <Katex display tex="\text{sum}=7.6036\ldots+14.6617\ldots=22.2653\ldots" />,
    reason: <>The loop has ended, so <code>print sum</code> outputs the total of the two passes. Keep the unrounded values until the end.</>,
    more: <>Each pass treats one unit-wide piece of the curve <Katex tex="y=\sqrt{x^2+1}" /> as a straight chord of length <Katex tex="\sqrt{(\Delta y)^2+1^2}" />, spun about the <Katex tex="x" />-axis at the radius of its midpoint: circumference <Katex tex="2\pi r" /> times slant length. That is the strip version of <Katex tex="S=2\pi\int y\sqrt{1+\left(\tfrac{dy}{dx}\right)^2}dx" />. The exact surface area for <Katex tex="0\le x\le2" /> is <Katex tex="2\pi\int_0^2\sqrt{2x^2+1}\,dx\approx22.765" />, so two chords give an underestimate that is already within about 2%.</>,
  },
  {
    working: <Katex display tex="\boxed{22.265}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option <b>A</b>, 7.604, is the first pass alone, and option <b>B</b>, 14.662, is the second pass alone (the last value of <code>area</code>, not of <code>sum</code>). The report&apos;s trace writes the first pass as 7.603; to three decimal places it is 7.604, and the total is 22.265 either way.</>,
  },
]

const ALGORITHM = (
  <div className="font-mono text-[13px] leading-loose bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800 rounded-xl px-5 py-3 w-fit max-w-full overflow-x-auto">
    <div><b>define</b> f(x)</div>
    <div className="pl-6"><b>return</b> <Katex tex="\sqrt{\texttt{x}^2+\texttt{1}}" /></div>
    <div>sum ← 0</div>
    <div>left ← 0</div>
    <div><b>while</b> left ≤ 1</div>
    <div className="pl-6 whitespace-nowrap">
      area ← <Katex tex="2\pi\times\texttt{f}\!\left(\dfrac{\texttt{left + (left + 1)}}{2}\right)\times\sqrt{\big(\texttt{f(left)}-\texttt{f(left + 1)}\big)^2+1}" />
    </div>
    <div className="pl-6">sum ← sum + area</div>
    <div className="pl-6">left ← left + 1</div>
    <div><b>end while</b></div>
    <div><b>print</b> sum</div>
  </div>
)

export default function SpecialistQ3_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>Consider the following algorithm to estimate the area of a certain surface of revolution.</p>
          {ALGORITHM}
          <p>The algorithm above will print a value closest to</p>
        </div>
      }
      background={
        <Background title="Reading a Loop">
          <p>
            Trace an algorithm by keeping a small table: one row per pass of the loop, with the value of each variable as
            that pass ends. Check the loop condition <em>before</em> each pass. Here <code>left</code> is 0, then 1, then 2,
            and at 2 the condition <code>left ≤ 1</code> fails, so there are exactly two passes.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="7.604" /> },
        { letter: 'B', content: <Katex tex="14.662" /> },
        { letter: 'C', content: <Katex tex="22.265" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="24.765" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
