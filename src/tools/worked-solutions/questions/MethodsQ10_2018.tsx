// 2018 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 74% correct. Which
// rule satisfies the functional equation f(x + f(x)) = f(2x). Question text transcribed from
// the original paper; VCAA printed no diagram and neither does the stem here (guide §7).
// Every option tested symbolically in sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 9, C: 74, D: 8, E: 5 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x \implies f\bigl(x+f(x)\bigr) = f(x+x) = f(2x) \ \checkmark" />,
    reason: <>Option <b>C</b>. With the identity function the inner bracket collapses to <Katex tex="2x" /> immediately, and both sides are <Katex tex="2x" />. The equation holds for every <Katex tex="x" />, not just some.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = x}" />,
    reason: <>Matches option <b>C</b>. The remaining options fail, and each can be dismissed in one substitution.</>,
  },
  {
    working: <Katex display tex="\textbf{A}: \ f\bigl(x+(1-x)\bigr) = f(1) = 0, \quad f(2x) = 1-2x" />,
    reason: <>Ruling out <b>A</b>: the left side collapses to a constant while the right side still depends on <Katex tex="x" />, so they can only agree at one point.</>,
  },
  {
    working: <Katex display tex="\textbf{B}: \ f\bigl(x+(x-1)\bigr) = 2x-2, \quad f(2x) = 2x-1" />,
    reason: <>Ruling out <b>B</b>: the two sides differ by <Katex tex="1" /> everywhere.</>,
  },
  {
    working: <Katex display tex="\textbf{D}: \ f\!\left(x+\tfrac{x}{2}\right) = \tfrac{3x}{4}, \quad f(2x) = x" />,
    reason: <>Ruling out <b>D</b>: equal only at <Katex tex="x=0" />, which the question excludes anyway.</>,
  },
  {
    working: <Katex display tex="\textbf{E}: \ f\!\left(x+\tfrac{1-x}{2}\right) = \tfrac{1-x}{4}, \quad f(2x) = \tfrac{1-2x}{2}" />,
    reason: <>Ruling out <b>E</b>: different gradients, so no agreement beyond a single crossing.</>,
  },
]

export default function MethodsQ10_2018() {
  return (
    <MCQShell
      question={
        <p>
          The function <Katex tex="f" /> has the property{' '}
          <Katex tex="f\bigl(x+f(x)\bigr)=f(2x)" /> for all non-zero real numbers{' '}
          <Katex tex="x" />. Which one of the following is a possible rule for the function?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x)=1-x" /> },
        { letter: 'B', content: <Katex tex="f(x)=x-1" /> },
        { letter: 'C', content: <Katex tex="f(x)=x" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="f(x)=\dfrac{x}{2}" /> },
        { letter: 'E', content: <Katex tex="f(x)=\dfrac{1-x}{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Testing a functional equation">
          <p>
            The condition must hold <em>for all</em> non-zero <Katex tex="x" />, so it is not
            enough to find one value that works — and conversely, one value that fails kills
            an option outright.
          </p>
          <p>
            The mechanical approach is fastest: for each candidate, compute{' '}
            <Katex tex="f(x)" />, add it to <Katex tex="x" />, feed the result back into{' '}
            <Katex tex="f" />, and compare with <Katex tex="f(2x)" />. Since every option
            here is linear, both sides come out linear and you only need the gradients and
            intercepts to match.
          </p>
        </Background>
      }
    />
  )
}
