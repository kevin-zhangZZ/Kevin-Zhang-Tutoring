// 2024 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 48% correct.
// A hybrid whose rational branch cancels to a line, patched at the hole. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 48, B: 10, C: 4, D: 37 },
  answer: 'A',
  comment: (
    <>
      <Katex tex="f(x)=\begin{cases}\dfrac{x^2+3x-10}{x-2}=x+5 & x\in R\setminus\{2\}\\[6pt] 7 & x=2\end{cases}" />
      <br />
      <Katex tex="\therefore \text{ continuous at } x=2" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+3x-10 = (x+5)(x-2)" />,
    reason: <>Factorise first: the numerator shares the factor <Katex tex="x-2" /> with the denominator, so the first branch alone would leave a hole at <Katex tex="x=2" />, not an asymptote.</>,
    more: <>A vertical asymptote needs the denominator to be 0 while the numerator is not. Here both are 0 at <Katex tex="x=2" />, so the factor cancels and the graph just has a gap there (unless the rule fills it in).</>,
  },
  {
    working: <Katex display tex="\frac{(x+5)(x-2)}{x-2} = x+5 \quad (x\ne2)" />,
    reason: <>For every <Katex tex="x\ne2" />, the function is the straight line <Katex tex="y=x+5" />.</>,
  },
  {
    working: <Katex display tex="\lim_{x\to2}f(x) = 2+5 = 7" />,
    reason: <>Near <Katex tex="x=2" />, <Katex tex="f(x)=x+5" />, so <Katex tex="f(x)" /> approaches 7: the gap in the line is at <Katex tex="(2,7)" />.</>,
  },
  {
    working: <Katex display tex="f(2) = 7 = \lim_{x\to2}f(x)" />,
    reason: <>The second branch defines <Katex tex="f(2)=7" />, exactly the limit, so the gap is filled and <Katex tex="f" /> is continuous everywhere.</>,
    more: <>Continuous at a point means <Katex tex="f" /> is defined there and its value equals the limit. So <Katex tex="f" /> is simply <Katex tex="f(x)=x+5" /> for all real <Katex tex="x" />: the hybrid rule is a disguised way of writing one straight line.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{the function } f \text{ is continuous}}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>
      <b>D</b> (a point of discontinuity), chosen by 37%, is the trap: the "<Katex tex="x\in R\setminus\{2\}" />" in the first branch suggests a hole, but the second branch fills it with the right value. <b>D</b> would be correct only if <Katex tex="f(2)" /> were any value other than 7. <b>B</b> and <b>C</b> fail because the graph is the line <Katex tex="y=x+5" />, which has no asymptote of either kind.
    </>,
  },
]

export default function SpecialistQ2_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            Consider the function <Katex tex="f" /> with rule
          </p>
          <Katex
            display
            tex="f(x)=\begin{cases}\dfrac{x^2+3x-10}{x-2} & x\in R\setminus\{2\}\\[8pt] 7 & x=2\end{cases}"
          />
          <p>Which of the following statements is correct?</p>
        </div>
      }
      options={[
        { letter: 'A', content: <>The function <Katex tex="f" /> is continuous.</>, isAnswer: true },
        { letter: 'B', content: <>The graph of <Katex tex="y=f(x)" /> has a vertical asymptote.</> },
        { letter: 'C', content: <>The graph of <Katex tex="y=f(x)" /> has a horizontal asymptote.</> },
        { letter: 'D', content: <>The graph of <Katex tex="y=f(x)" /> has a point of discontinuity.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
