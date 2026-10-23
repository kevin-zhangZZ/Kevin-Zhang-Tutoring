// 2026 Specialist NHT — Exam 2, MCQ 2. The NHT report gives the answer key and brief working
// only, with no statistics. Functions: the value of p that makes a hybrid function continuous at
// x = 4, found from a limit after factorising and cancelling the (√x − 2) factor. Question text
// transcribed from the original paper. Solution is original; the answer B agrees with the report's
// key, and sympy's limit gives π/80. The report's first line, "f(x) = p", is kept verbatim (it
// stands for f(4) = p).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'B',
  comment: (
    <>
      <Katex tex="f(x)=p" />
      <br />
      <Katex tex="\lim\limits_{x\to4}f(x)=\dfrac{\pi}{80}" />
      <br />
      <Katex tex="p=\dfrac{\pi}{80}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="p=f(4)=\lim_{x\to4}\frac{(\sqrt x-2)\arctan\!\left(\frac x4\right)}{x^2-3x-4}" />,
    reason: <>Continuous at <Katex tex="x=4" /> means the value there equals the limit as <Katex tex="x\to4" />. Elsewhere on <Katex tex="[0,\infty)" /> the rule is a quotient of continuous functions with a non-zero denominator, so <Katex tex="x=4" /> is the only point to check.</>,
    more: <>Substituting <Katex tex="x=4" /> straight in gives <Katex tex="\tfrac{0\times\arctan(1)}{0}" />, which is undefined. That &ldquo;0 over 0&rdquo; says there is a common factor to cancel. (The denominator&apos;s other zero, <Katex tex="x=-1" />, is outside the domain.)</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x^2-3x-4&=(x-4)(x+1)\\ x-4&=(\sqrt x-2)(\sqrt x+2)\end{aligned}" />,
    reason: <>Factorise the denominator, then write <Katex tex="x-4" /> as a difference of two squares, <Katex tex="(\sqrt x)^2-2^2" />, to expose the same factor <Katex tex="\sqrt x-2" /> that is in the numerator.</>,
  },
  {
    working: <Katex display tex="f(x)=\frac{\arctan\!\left(\frac x4\right)}{(\sqrt x+2)(x+1)},\quad x\ne4" />,
    reason: <>Cancel <Katex tex="\sqrt x-2" />, which is allowed because it is non-zero for <Katex tex="x\ne4" />. What is left has a non-zero denominator at <Katex tex="x=4" />, so the limit is found by substituting.</>,
  },
  {
    working: <Katex display tex="\lim_{x\to4}f(x)=\frac{\arctan(1)}{(2+2)(4+1)}=\frac{\pi/4}{20}" />,
    reason: <><Katex tex="\arctan(1)=\tfrac{\pi}{4}" />, since <Katex tex="\tan\!\left(\tfrac{\pi}{4}\right)=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p=\frac{\pi}{80}}" />,
    reason: <>Matches option <b>B</b>. The report&apos;s first line, <Katex tex="f(x)=p" />, means <Katex tex="f(4)=p" />, the value at <Katex tex="x=4" />.</>,
    more: <>Sanity check: <Katex tex="\tfrac{\pi}{80}\approx0.0393" />, and <Katex tex="f(4.001)\approx0.03927" /> by direct substitution into the original rule, so the two pieces do join up.</>,
  },
]

export default function SpecialistQ2_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            A function with domain <Katex tex="x\in[0,\infty)" /> has the following rule.
          </p>
          <Katex display tex="\footnotesize f(x)=\begin{cases}\dfrac{(\sqrt x-2)\arctan\!\left(\frac x4\right)}{x^2-3x-4}, & x\in[0,\infty)\setminus\{4\}\\[2ex] p, & x=4\end{cases}" />
          <p>
            For the function to be continuous on the interval <Katex tex="[0,\infty)" />, the value of <Katex tex="p" /> must be
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{9}{4}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{\pi}{80}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{\pi}{40}" /> },
        { letter: 'D', content: <Katex tex="1" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
