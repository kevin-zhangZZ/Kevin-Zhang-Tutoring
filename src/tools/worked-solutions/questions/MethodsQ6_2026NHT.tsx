// 2026 Mathematical Methods NHT — Exam 2, MCQ 6. The NHT report gives the answer key only, with no
// statistics; its worked comment is transcribed below from the rendered report. Functions: the inverse of an exponential (reflection in y = x), then a log law to
// match the option's form. Question text transcribed from the original paper. Solution is original;
// the answer A agrees with the report's key (sympy solves x = 2^(y−1) + 3 as y = log2(2x − 6)).
// Distractor B verified as log2(x − 3) + 1 with only the x doubled; C reverses x − 3.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'A',
  comment: (
    <>
      <Katex tex="y=2^{x-1}+3" />, inverse swap <Katex tex="x" /> and <Katex tex="y" />
      <br />
      <Katex tex="x=2^{y-1}+3" />
      <br />
      <Katex tex="x-3=2^{y-1}" />
      <br />
      <Katex tex="\log_2(x-3)=y-1" />
      <br />
      <Katex tex="y=\log_2(x-3)+1" />
      <br />
      <Katex tex="y=\log_2(x-3)+\log_2(2)" />
      <br />
      <Katex tex="y=\log_2(2x-6)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x=2^{y-1}+3" />,
    reason: <>Reflecting a graph in the line <Katex tex="y=x" /> swaps every point <Katex tex="(a,b)" /> to <Katex tex="(b,a)" />, so the image&apos;s rule comes from swapping <Katex tex="x" /> and <Katex tex="y" /> — this is the inverse function.</>,
  },
  {
    working: <Katex display tex="x-3=2^{y-1}" />,
    reason: <>Isolate the power first.</>,
  },
  {
    working: <Katex display tex="\log_2(x-3)=y-1" />,
    reason: <>Take <Katex tex="\log_2" /> of both sides: <Katex tex="\log_2" /> undoes "2 to the power of".</>,
  },
  {
    working: <Katex display tex="y=\log_2(x-3)+1" />,
    reason: <>This is the inverse, but it isn&apos;t one of the options yet — the options have everything inside a single log.</>,
  },
  {
    working: <Katex display tex="y=\log_2(x-3)+\log_2(2)=\log_2\big(2(x-3)\big)" />,
    reason: <>Write the <Katex tex="1" /> as <Katex tex="\log_2(2)" />, then add the logs by multiplying their arguments: <Katex tex="\log_2(m)+\log_2(n)=\log_2(mn)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y=\log_2(2x-6)}" />,
    reason: <>Matches option <b>A</b>. Check: <Katex tex="(1,4)" /> is on the original graph (<Katex tex="2^0+3=4" />), so <Katex tex="(4,1)" /> should be on the image: <Katex tex="\log_2(8-6)=\log_2(2)=1" /> ✓.</>,
    more: <>Option <b>B</b> comes from multiplying only the <Katex tex="x" /> by 2: <Katex tex="2(x-3)" /> is <Katex tex="2x-6" />, not <Katex tex="2x-3" />. Option <b>C</b> turns <Katex tex="x-3" /> into <Katex tex="3-x" />, which would reflect the graph in a vertical line as well. The same point check rules out each of them: at <Katex tex="x=4" />, B gives <Katex tex="\log_2(5)" /> and C is undefined.</>,
  },
]

export default function MethodsQ6_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            The graph of <Katex tex="y=2^{x-1}+3" /> is reflected in the line <Katex tex="y=x" />.
          </p>
          <p>The rule for the image is</p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=\log_2(2x-6)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="y=\log_2(2x-3)" /> },
        { letter: 'C', content: <Katex tex="y=\log_2(3-x)+1" /> },
        { letter: 'D', content: <Katex tex="y=\log_2(x)-2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
