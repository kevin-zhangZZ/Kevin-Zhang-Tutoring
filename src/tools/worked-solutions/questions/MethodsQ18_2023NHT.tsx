// 2023 Mathematical Methods NHT — Exam 2, MCQ 18. The NHT report gives the answer key only, with
// no statistics; it prints a short worked comment for this question (transcribed below from the
// rendered report). Functions: fitting an exponential model V = b(1 + a)^t to two data points.
// Question text transcribed from the original paper. Solution is original; the answer A agrees
// with the report's key: (1 + a)^10 = 1.25 gives a = 0.022565…, and b = 12000/1.25 = 9600.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'A',
  comment: (
    <>
      <Katex tex="b\neq 10\,000" /> as a fee is deducted from the initial investment
      <br />
      <Katex tex="b(1+a)^{10}=12\,000" />
      <br />
      <Katex tex="b(1+a)^{20}=15\,000" />
      <br />
      <Katex tex="a=0.02256\ldots" />, <Katex tex="b=9600" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="b(1+a)^{10}=12\,000,\qquad b(1+a)^{20}=15\,000" />,
    reason: <>Substitute the two known values: <Katex tex="t=10" /> and <Katex tex="t=20" />. Two equations, two unknowns.</>,
    more: <>The $10&#8202;000 is <b>not</b> data for the model. <Katex tex="b" /> is the value at <Katex tex="t=0" />, the amount actually invested, and the fee is taken off before that — so <Katex tex="b" /> must be less than 10&#8202;000, which already rules out options B and D.</>,
  },
  {
    working: <Katex display tex="\frac{b(1+a)^{20}}{b(1+a)^{10}}=\frac{15\,000}{12\,000}\ \Rightarrow\ (1+a)^{10}=1.25" />,
    reason: <>Divide the equations: <Katex tex="b" /> cancels and the index laws leave <Katex tex="(1+a)^{20-10}" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}1+a=1.25^{1/10}\\ \Rightarrow\ a=1.25^{0.1}-1=0.022565\ldots\end{gathered}" />,
    reason: <>Take the tenth root of both sides (<Katex tex="1+a>0" />, so only the positive root).</>,
  },
  {
    working: <Katex display tex="b=\frac{12\,000}{(1+a)^{10}}=\frac{12\,000}{1.25}=9600" />,
    reason: <>Substitute <Katex tex="(1+a)^{10}=1.25" /> back into the first equation. No rounded <Katex tex="a" /> is needed: use the exact power. This is less than the $10&#8202;000 handed over because the fee came off first, so <Katex tex="b" /> is not 10&#8202;000.</>,
  },
  {
    working: <Katex display tex="\boxed{a\approx0.0226,\ \ b=9600}" />,
    reason: <>Matches option <b>A</b>. Check: <Katex tex="9600\times1.25^2=15\,000" /> ✓. The fee is $400.</>,
    more: <>Option <b>C</b> has the right <Katex tex="b" /> but writes <Katex tex="a=0.0225" />: <Katex tex="0.022565\ldots" /> rounds to 0.0226, not 0.0225 (truncating gives C). Options <b>B</b> and <b>D</b> take <Katex tex="b" /> as the $10&#8202;000 handed over, ignoring the fee; with <Katex tex="b=10\,000" /> the two data points can&apos;t both fit any value of <Katex tex="a" />. Option <b>E</b> doesn&apos;t fit either: <Katex tex="9800\times1.0224^{10}\approx12\,230" />.</>,
  },
]

export default function MethodsQ18_2023NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            An investment firm models a particular financial investment using the equation{' '}
            <Katex tex="V=b(1+a)^t" />, where <Katex tex="V" /> represents the value of the investment
            after <Katex tex="t" /> years and <Katex tex="a" /> and <Katex tex="b" /> are positive real
            constants.
          </p>
          <p>The investment firm deducts a fee from any initial investment amount before interest is calculated.</p>
          <p>After 10 years the value of the investment was $12&#8202;000 and after 20 years its value was $15&#8202;000.</p>
          <p>
            If the initial investment amount given to the firm was $10&#8202;000, the approximate values
            of <Katex tex="a" /> and <Katex tex="b" /> are
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="a=0.0226,\quad b=9600" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="a=0.0226,\quad b=10\,000" /> },
        { letter: 'C', content: <Katex tex="a=0.0225,\quad b=9600" /> },
        { letter: 'D', content: <Katex tex="a=0.0225,\quad b=10\,000" /> },
        { letter: 'E', content: <Katex tex="a=0.0224,\quad b=9800" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
