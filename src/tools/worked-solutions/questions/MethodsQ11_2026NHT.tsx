// 2026 Mathematical Methods NHT — Exam 2, MCQ 11. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment for this question (transcribed below from the rendered
// report). Algebra: a monic quadratic sharing its x-intercepts with (x − a)²(x − b). Question text
// transcribed from the original paper. Solution is original; the answer D agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      The graph of <Katex tex="y=g(x)" /> has 2 <i>x</i>-intercepts, which are at <Katex tex="x=a" /> and <Katex tex="x=b." />
      <br />
      Substituting these into the equation <Katex tex="f(x)=0" /> gives the equations
      <br />
      <Katex tex="a^2+ac+ab=0" /> and <Katex tex="b^2+bc+ab=0" />
      <br />
      Solving these simultaneously gives <Katex tex="c=-(a+b)" />.
      <br />
      OR
      <br />
      <Katex tex="f(x)=x^2+cx+ab=(x-b)(x-a)=x^2-(a+b)x+ab" />
      <br />
      Equating coefficients <Katex tex="c=-(a+b)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g(x)=0\ \Rightarrow\ x=a\ \text{ or }\ x=b" />,
    reason: <>Null factor law on <Katex tex="(x-a)^2(x-b)" />. These are the <i>x</i>-intercepts <Katex tex="f" /> must share (just one intercept if <Katex tex="a=b" />).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}a\neq b:\quad f(x)&=(x-a)(x-b)\\&=x^2-(a+b)x+ab\end{aligned}" />,
    reason: <>A quadratic with leading coefficient 1 and roots <Katex tex="a" /> and <Katex tex="b" /> can only be <Katex tex="(x-a)(x-b)" />. Its constant term <Katex tex="ab" /> matches <Katex tex="f" />&apos;s, which is the hint that this is the intended reading.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x^2+cx+ab&=x^2-(a+b)x+ab\\\Rightarrow\ c&=-(a+b)\end{aligned}" />,
    reason: <>Equate the coefficients of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}a=b:\quad f(a)&=a^2+ca+a^2=0\\\Rightarrow\ c&=-2a=-(a+b)\end{aligned}" />,
    reason: <>The question says <b>all possible</b> values of <Katex tex="a" /> and <Katex tex="b" />, so check the repeated case too. Then <Katex tex="f(x)=(x-a)^2" />, whose only intercept is <Katex tex="a" />, as required (for <Katex tex="a=b=0" />, <Katex tex="f(x)=x^2+cx" /> needs <Katex tex="c=0" />, which also equals <Katex tex="-(a+b)" />).</>,
  },
  {
    working: <Katex display tex="\boxed{c=-(a+b)}" />,
    reason: <>Matches option <b>D</b>. Option <b>C</b> is the sign slip: the sum of the roots of <Katex tex="x^2+cx+ab" /> is <Katex tex="-c" />, not <Katex tex="c" />.</>,
    more: <>Quick test: <Katex tex="a=1,\ b=3" /> gives <Katex tex="f(x)=(x-1)(x-3)=x^2-4x+3" />, so <Katex tex="c=-4" />. That is <Katex tex="-(a+b)" />, but not <Katex tex="ab=3" /> (A), <Katex tex="-ab=-3" /> (B) or <Katex tex="a+b=4" /> (C).</>,
  },
]

export default function MethodsQ11_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>Let</p>
          <Katex display tex="\begin{aligned}&f:R\to R,\ f(x)=x^2+cx+ab\\&g:R\to R,\ g(x)=(x-a)^2(x-b)\end{aligned}" />
          <p>
            where <Katex tex="a,b,c\in R" />.
          </p>
          <p>
            Given that the graphs <Katex tex="y=f(x)" /> and <Katex tex="y=g(x)" /> have the same <i>x</i>-intercepts,
            which one of the following must be true for all possible values of <Katex tex="a" /> and <Katex tex="b" />?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="c=ab" /> },
        { letter: 'B', content: <Katex tex="c=-ab" /> },
        { letter: 'C', content: <Katex tex="c=a+b" /> },
        { letter: 'D', content: <Katex tex="c=-(a+b)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
