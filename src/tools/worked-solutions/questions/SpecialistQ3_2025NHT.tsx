// 2025 Specialist NHT — Exam 2, MCQ 3. The NHT report gives the answer key only, with no
// statistics. Algebra: for how many integers a does x² + ax − 21 factorise into distinct integer
// linear factors, so that 1/(x² + ax − 21) has a two-term partial-fraction form. Question text
// transcribed from the original paper (the 2025 NHT paper is image-only, so read from the rendered
// page). Solution is original; the answer C agrees with the report's key (enumerating bc = −21
// gives a ∈ {−20, −4, 4, 20}). Distractor A checked: counting each factor pair once, ignoring
// which factor carries the minus sign, gives 2.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+ax-21=(x+b)(x+c)" />,
    reason: <>The form <Katex tex="\tfrac{B}{x+b}+\tfrac{C}{x+c}" /> needs the denominator to split into these two linear factors with integer <Katex tex="b" /> and <Katex tex="c" />.</>,
    more: <>Because <Katex tex="bc=-21" />, the factors can never be equal, so a repeated factor (which would need a <Katex tex="\tfrac{C}{(x+c)^2}" /> term) never arises, and the partial fractions with real <Katex tex="B" />, <Katex tex="C" /> always exist once the quadratic factorises.</>,
  },
  {
    working: <Katex display tex="x^2+(b+c)x+bc\ \Rightarrow\ bc=-21,\quad a=b+c" />,
    reason: <>Expand and compare coefficients with <Katex tex="x^2+ax-21" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}(1,-21)&\to a=-20 & (-1,21)&\to a=20\\(3,-7)&\to a=-4 & (-3,7)&\to a=4\end{aligned}" />,
    reason: <>List every integer pair with product <Katex tex="-21" />. One factor must be negative, and it can be either number of the pair, which gives a different sum each time.</>,
    more: <>Swapping <Katex tex="b" /> and <Katex tex="c" /> (say <Katex tex="(-21,1)" />) gives the same <Katex tex="a" />, so these four pairs cover everything.</>,
  },
  {
    working: <Katex display tex="\boxed{4\ \text{values: } a\in\{-20,\,-4,\,4,\,20\}}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Check one: <Katex tex="x^2+4x-21=(x+7)(x-3)" />. Option <b>A</b>, 2, comes from counting the pairs <Katex tex="\{1,21\}" /> and <Katex tex="\{3,7\}" /> once each, forgetting that the minus sign can go on either number.</>,
  },
]

export default function SpecialistQ3_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          How many integer values of <Katex tex="a" /> can <Katex tex="\dfrac{1}{x^2+ax-21}" /> be expressed in the
          form <Katex tex="\dfrac{B}{x+b}+\dfrac{C}{x+c}" />, where <Katex tex="b" /> and <Katex tex="c" /> are integers
          and <Katex tex="B,\,C\in R" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="3" /> },
        { letter: 'C', content: <Katex tex="4" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
