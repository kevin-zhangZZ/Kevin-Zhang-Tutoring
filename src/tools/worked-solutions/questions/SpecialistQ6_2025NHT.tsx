// 2025 Specialist NHT — Exam 2, MCQ 6. The NHT report gives the answer key only, with no
// statistics. Differential equations: three steps of Euler's method with a general step size,
// then matching to a given expression to find y₀. Question text transcribed from the original
// paper (the 2025 NHT paper is image-only, so read from the rendered page). Solution is original;
// the answer A agrees with the report's key (sympy: y₃ = y₀ + h(1 + e^h + e^{2h}), so y₀ = −3h/4).
// Distractors checked: C (h/4) leaves out the first step's h·e⁰; B (−h/2) squares the ½ as ½.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}y_{n+1}&=y_n+h\,f(x_n)\\ f(x)&=e^x,\quad x_n=nh\end{aligned}" />,
    reason: <>Euler&apos;s method: each step adds the step size times the gradient at the <b>start</b> of the step. Starting from <Katex tex="x_0=0" />, the <Katex tex="x" />-values are <Katex tex="0,\ h,\ 2h" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}y_1&=y_0+h\,e^{0}=y_0+h\\ y_2&=y_1+h\,e^{h}\\ y_3&=y_2+h\,e^{2h}\end{aligned}" />,
    reason: <>Three steps reach <Katex tex="y_3" />, using the gradients at <Katex tex="x=0" />, <Katex tex="h" /> and <Katex tex="2h" />.</>,
  },
  {
    working: <Katex display tex="y_3=y_0+h\left(1+e^{h}+e^{2h}\right)" />,
    reason: <>Collect the three increments.</>,
  },
  {
    working: <Katex display tex="\left(e^h+\tfrac12\right)^2h=h\left(e^{2h}+e^h+\tfrac14\right)" />,
    reason: <>Expand the target: <Katex tex="(p+q)^2=p^2+2pq+q^2" /> with <Katex tex="2\cdot e^h\cdot\tfrac12=e^h" /> and <Katex tex="\left(\tfrac12\right)^2=\tfrac14" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}y_0+h+he^h+he^{2h}&=he^{2h}+he^h+\tfrac14h\\ y_0&=\tfrac14h-h\end{aligned}" />,
    reason: <>Set them equal: the <Katex tex="e^h" /> and <Katex tex="e^{2h}" /> terms already match, leaving <Katex tex="y_0+h=\tfrac14h" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y_0=-\frac{3}{4}h}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option <b>C</b>, <Katex tex="\tfrac14h" />, leaves out the first step&apos;s <Katex tex="h\,e^{0}=h" /> (starting the gradients at <Katex tex="x=h" />). Option <b>B</b>, <Katex tex="-\tfrac12h" />, comes from squaring <Katex tex="\tfrac12" /> as <Katex tex="\tfrac12" /> instead of <Katex tex="\tfrac14" />.</>,
  },
]

export default function SpecialistQ6_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          Euler&apos;s method is applied to <Katex tex="\dfrac{dy}{dx}=e^x" /> with initial values <Katex tex="(0,\,y_0)" />.
          <br />
          For step size <Katex tex="h" />, the value of <Katex tex="y_3" /> will be{' '}
          <Katex tex="\left(e^h+\dfrac12\right)^2h" /> when
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="y_0=-\dfrac34h" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="y_0=-\dfrac12h" /> },
        { letter: 'C', content: <Katex tex="y_0=\dfrac14h" /> },
        { letter: 'D', content: <Katex tex="y_0=\dfrac12h" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
