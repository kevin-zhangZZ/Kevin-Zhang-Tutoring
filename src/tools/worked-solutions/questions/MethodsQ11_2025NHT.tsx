// 2025 Mathematical Methods NHT — Exam 2, MCQ 11. The NHT report gives the answer key only for
// this question, with no statistics or comment. Functions: the range of a composite, found by
// pushing the inner function's range through the outer one. Question text transcribed from the
// original paper (image-only, read from the rendered page). Solution is original; the answer C
// agrees with the report's key (sin x + 2 ∈ [1, 3], log_e of that ∈ [0, log_e 3]).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="-1\le\sin(x)\le1\ \Rightarrow\ 1\le g(x)\le3" />,
    reason: <>The range of the inner function <Katex tex="g" /> is <Katex tex="[1,3]" />: the sine graph moved up 2.</>,
  },
  {
    working: <Katex display tex="f\big(g(x)\big)=\log_e\big(g(x)\big),\quad g(x)\in[1,3]" />,
    reason: <>So <Katex tex="f" /> is only ever fed inputs from 1 to 3. All of them are positive, so the composite is defined everywhere.</>,
  },
  {
    working: <Katex display tex="\log_e(1)=0,\quad \log_e(3)" />,
    reason: <><Katex tex="\log_e" /> is increasing, so the smallest input gives the smallest output and the largest gives the largest.</>,
  },
  {
    working: <Katex display tex="\boxed{\big[0,\ \log_e(3)\big]}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option <b>D</b>, <Katex tex="[1,3]" />, is the range of <Katex tex="g" /> alone: the last step, applying <Katex tex="f" />, was left off. Option <b>A</b> is the domain of <Katex tex="f" />, not a range.</>,
  },
]

export default function MethodsQ11_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          Consider the functions <Katex tex="f:(0,\infty)\to R,\ f(x)=\log_e(x)" /> and{' '}
          <Katex tex="g:R\to R,\ g(x)=\sin(x)+2" />.
          <br />
          The range of the function <Katex tex="f\big(g(x)\big)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(0,\infty)" /> },
        { letter: 'B', content: <Katex tex="[0,1]" /> },
        { letter: 'C', content: <Katex tex="\big[0,\log_e(3)\big]" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="[1,3]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
