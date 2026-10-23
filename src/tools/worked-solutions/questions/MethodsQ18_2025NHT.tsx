// 2025 Mathematical Methods NHT — Exam 2, MCQ 18. The NHT report gives the answer key and a
// worked comment (a trace of the first two passes), with no statistics. Algorithms: tracing the
// bisection method with a stopping tolerance. Question text and pseudocode transcribed from the
// original paper (image-only, read from the rendered page); the report's comment is transcribed
// from the rendered report page. Solution is original; the answer B agrees with the report's key
// (f(5) ≈ −0.0572, f(4) ≈ 0.0530 so b ← 5; f(4.5) ≈ 0.0041 is within 0.01). Distractors checked:
// 4.54 and 1.86 are the true roots of log_e(x) = x/3 to two decimal places (4.5364…, 1.8572…).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'B',
  comment: (
    <>
      <Katex tex="f(x)=\log_e(x)-\tfrac x3" />
      <br />
      <Katex tex="i=1" />: <Katex tex="c=\tfrac{4+6}{2}=5" />, <Katex tex="f(5)=-0.057\ldots" />,{' '}
      <Katex tex="f(4)\times f(5)=-0.003\ldots" />, <Katex tex="b=5" />
      <br />
      <Katex tex="i=2" />: <Katex tex="c=\tfrac{4+5}{2}=4.5" />, <Katex tex="f(4.5)=0.004\ldots<0.01" />
      <br />
      Print 4.5
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="i=1:\quad c=\tfrac{4+6}{2}=5,\quad f(5)\approx-0.0572" />,
    reason: <>Not within <Katex tex="0.01" /> of zero, so nothing is printed yet.</>,
  },
  {
    working: <Katex display tex="f(4)\approx0.0530\ \Rightarrow\ f(4)\times f(5)<0\ \Rightarrow\ b\leftarrow5" />,
    reason: <>A sign change between <Katex tex="a=4" /> and <Katex tex="c=5" /> means the root is in that half, so the right end moves in.</>,
  },
  {
    working: <Katex display tex="i=2:\quad c=\tfrac{4+5}{2}=4.5,\quad f(4.5)\approx0.0041" />,
    reason: <>Now <Katex tex="-0.01<f(4.5)<0.01" />, so the algorithm prints <Katex tex="c" />.</>,
  },
  {
    working: <Katex display tex="\boxed{4.5}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>The print branch doesn&rsquo;t change <Katex tex="a" /> or <Katex tex="b" />, so on the third pass <Katex tex="c" /> is 4.5 again and 4.5 is printed a second time; no other number is ever printed. Option <b>A</b>, 4.54, is the actual root to two decimal places, but the algorithm stops at the first midpoint that is close enough, not at the root. Options <b>C</b> and <b>D</b> are near the equation&rsquo;s other root, which is outside the starting interval <Katex tex="[4,6]" />.</>,
  },
]

export default function MethodsQ18_2025NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            Consider the algorithm below, which can be used to find an approximate solution to the equation{' '}
            <Katex tex="\log_e(x)-\dfrac x3=0" />.
          </p>
          <pre className="text-[13px] leading-relaxed bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800 rounded-xl px-5 py-3 w-fit max-w-full overflow-x-auto">
{`define f(x)
    return loge(x) - x/3

a ← 4
b ← 6
for i from 1 to 3
    c ← (a + b)/2
    if -0.01 < f(c) < 0.01 then
        print c
    else if f(a) × f(c) < 0 then
        b ← c
    else
        a ← c
    end if
end for`}
          </pre>
          <p>Which of the following numbers would be printed by this algorithm?</p>
        </div>
      }
      options={[
        { letter: 'A', content: <>4.54</> },
        { letter: 'B', content: <>4.5</>, isAnswer: true },
        { letter: 'C', content: <>1.9</> },
        { letter: 'D', content: <>1.86</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
