// 2025 Specialist NHT — Exam 2, MCQ 1. The NHT report gives the answer key only, with no
// statistics. Proof: the contrapositive of a conditional statement about integers. Question text
// transcribed from the original paper (the 2025 NHT paper is image-only, so read from the rendered
// page). Solution is original; the answer D agrees with the report's key. Distractors checked by
// form: A is the converse, C is the inverse.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="P:\ n^2+5\ \text{is odd},\qquad Q:\ n\ \text{is even}" />,
    reason: <>Name the two parts of &ldquo;if <Katex tex="P" />, then <Katex tex="Q" />&rdquo;: the hypothesis <Katex tex="P" /> comes after &ldquo;if&rdquo;, the conclusion <Katex tex="Q" /> after &ldquo;then&rdquo;.</>,
  },
  {
    working: <Katex display tex="\text{contrapositive of } P\Rightarrow Q:\quad \lnot Q\Rightarrow \lnot P" />,
    reason: <>The contrapositive swaps the two parts <b>and</b> negates both. It is always logically equivalent to the original statement.</>,
    more: <>Swapping without negating gives the converse, <Katex tex="Q\Rightarrow P" />; negating without swapping gives the inverse, <Katex tex="\lnot P\Rightarrow\lnot Q" />. Neither is equivalent to the original.</>,
  },
  {
    working: <Katex display tex="\lnot Q:\ n\ \text{is odd},\qquad \lnot P:\ n^2+5\ \text{is even}" />,
    reason: <>For an integer, &ldquo;not even&rdquo; means odd, and &ldquo;not odd&rdquo; means even.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{if } n \text{ is odd then } n^2+5 \text{ is even}}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Option <b>A</b> is the converse (swapped, not negated) and option <b>C</b> is the inverse (negated, not swapped). Check that D is true, as it must be: if <Katex tex="n" /> is odd then <Katex tex="n^2" /> is odd, and odd + 5 is even.</>,
  },
]

export default function SpecialistQ1_2025NHT() {
  return (
    <MCQShell
      question={
        <>
          <p>Consider the statement</p>
          <p className="pl-8 my-2">
            &lsquo;if <Katex tex="n^2+5" /> is odd, then <Katex tex="n" /> is even&rsquo;, where <Katex tex="n\in Z" />.
          </p>
          <p>The contrapositive of this statement is</p>
        </>
      }
      options={[
        { letter: 'A', content: <>if <Katex tex="n" /> is even then <Katex tex="n^2+5" /> is odd.</> },
        { letter: 'B', content: <>if <Katex tex="n^2+5" /> is even then <Katex tex="n" /> is even.</> },
        { letter: 'C', content: <>if <Katex tex="n^2+5" /> is even then <Katex tex="n" /> is odd.</> },
        { letter: 'D', content: <>if <Katex tex="n" /> is odd then <Katex tex="n^2+5" /> is even.</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
