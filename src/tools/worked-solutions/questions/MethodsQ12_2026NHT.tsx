// 2026 Mathematical Methods NHT — Exam 2, MCQ 12. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment for this question (transcribed below from the rendered
// report). Functions: common zeros of sin(nx) for n = 1, …, 10 on [0, 2π]. Question text transcribed
// from the original paper. Solution is original; the answer B agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'B',
  comment: (
    <>
      First notice that there are only 3 values of <Katex tex="x\in[0,2\pi]" /> where <Katex tex="f_1(x)=\sin(x)=0" />, which are <Katex tex="0,\pi" /> and <Katex tex="2\pi" />.
      <br />
      Now notice that for any integer <Katex tex="n" />, <Katex tex="f_n(x)=\sin(nx)=0" /> when <Katex tex="x=0,\pi" /> or <Katex tex="2\pi" />.
      <br />
      So exactly 3 values of <Katex tex="x\in[0,2\pi]" /> exist such that
      <br />
      <Katex tex="f_1(x)=f_2(x)=f_3(x)=\ldots=f_{10}(x)=0" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&f_1(x)=\sin(x)=0,\ x\in[0,2\pi]\\&\Rightarrow\ x=0,\ \pi,\ 2\pi\end{aligned}" />,
    reason: <>An <Katex tex="x" /> that works for <b>every</b> <Katex tex="n" /> must in particular work for <Katex tex="n=1" />. So the only candidates are the three zeros of <Katex tex="\sin(x)" /> in the domain.</>,
    more: <>The other functions have many more zeros (for example <Katex tex="\sin(2x)=0" /> at <Katex tex="x=\tfrac{\pi}{2}" />), but each of those extra zeros fails for <Katex tex="n=1" />, so it can&apos;t count.</>,
  },
  {
    working: <Katex display tex="\sin(n\cdot 0)=0,\quad \sin(n\pi)=0,\quad \sin(2n\pi)=0" />,
    reason: <>For any integer <Katex tex="n" />, <Katex tex="0" />, <Katex tex="n\pi" /> and <Katex tex="2n\pi" /> are whole multiples of <Katex tex="\pi" />, where sine is zero. So all three candidates work for every <Katex tex="n" /> from 1 to 10.</>,
  },
  {
    working: <Katex display tex="\boxed{3\ \text{values: } x=0,\ \pi,\ 2\pi}" />,
    reason: <>Matches option <b>B</b>. Remember the domain is closed, so both endpoints <Katex tex="0" /> and <Katex tex="2\pi" /> are included.</>,
  },
]

export default function MethodsQ12_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            Consider the 10 functions, all with domain <Katex tex="[0,2\pi]" /> and defined as <Katex tex="f_n(x)=\sin(nx)" />,
            where <Katex tex="n" /> is an integer with <Katex tex="1\le n\le 10" />.
          </p>
          <Katex display tex="\begin{gathered}f_1(x)=\sin(x),\ f_2(x)=\sin(2x),\\ f_3(x)=\sin(3x),\ \ldots,\ f_{10}(x)=\sin(10x)\end{gathered}" />
          <p>
            How many values of <Katex tex="x\in[0,2\pi]" /> exist such that <Katex tex="f_n(x)=0" /> for all integers <Katex tex="n" /> with <Katex tex="1\le n\le 10" />?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <>2</> },
        { letter: 'B', content: <>3</>, isAnswer: true },
        { letter: 'C', content: <>4</> },
        { letter: 'D', content: <>5</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
