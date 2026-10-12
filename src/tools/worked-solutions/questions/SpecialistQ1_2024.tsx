// 2024 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 72% correct.
// A contrapositive: swap the two halves and negate both. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 3, C: 72, D: 6 },
  answer: 'C',
  comment: (
    <>
      Asked for contrapositive – therefore, switch the hypothesis and the conclusion and negate
      both.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="P \implies Q \quad\text{has contrapositive}\quad \neg Q \implies \neg P" />,
    reason: <>The contrapositive swaps the two halves <em>and</em> negates both. Doing only one of the two gives the converse or the inverse instead.</>,
    more: <>Three statements are easily confused. The converse is <Katex tex="Q\implies P" /> (swap only), the inverse is <Katex tex="\neg P\implies\neg Q" /> (negate only), and the contrapositive is <Katex tex="\neg Q\implies\neg P" /> (both). Only the contrapositive is guaranteed to be true exactly when the original is, which is why a proof by contrapositive is a valid proof of the original.</>,
  },
  {
    working: <Katex display tex="P: \ m+n\ge9, \qquad Q: \ m\ge5 \text{ or } n\ge5" />,
    reason: <>Name the hypothesis <Katex tex="P" /> (after "if") and the conclusion <Katex tex="Q" /> (after "then"), so each negation is done separately.</>,
  },
  {
    working: <Katex display tex="\neg Q: \ \neg(m\ge5 \text{ or } n\ge5) \equiv m<5 \text{ and } n<5" />,
    reason: <>De Morgan: negating an <em>or</em> turns it into an <em>and</em>, with each part negated.</>,
    more: <>"<Katex tex="m\ge5" /> or <Katex tex="n\ge5" />" is false only when <em>neither</em> holds, i.e. both <Katex tex="m<5" /> and <Katex tex="n<5" />. Negating each inequality but keeping the "or" gives option <b>A</b>, chosen by 20%: it is the most common slip on this question.</>,
  },
  {
    working: <Katex display tex="\neg P: \ m+n<9" />,
    reason: <>The negation of <Katex tex="\ge" /> is <Katex tex="<" />, not <Katex tex="\le" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{if } m<5 \text{ and } n<5, \text{ then } m+n<9}" />,
    reason: <>Matches option <b>C</b>: the negated conclusion now comes first, the negated hypothesis second.</>,
    more: <>
      <b>A</b> negates both halves but keeps the "or" (De Morgan missed). <b>B</b> is the converse <Katex tex="Q\implies P" />: swapped but not negated. <b>D</b> negates <Katex tex="\ge" /> as <Katex tex="\le" />, but <Katex tex="m\le5" /> still includes <Katex tex="m=5" />, which satisfies <Katex tex="m\ge5" /> (likewise <Katex tex="m+n\le9" /> still allows <Katex tex="m+n=9" />). Check: a contrapositive is logically equivalent to the original, and both are true here, since two integers each below 5 are each at most 4, so their sum is at most 8.
    </>,
  },
]

export default function SpecialistQ1_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>Consider the statement</p>
          <p className="pl-5 italic">
            &lsquo;for any integers <Katex tex="m" /> and <Katex tex="n" />, if{' '}
            <Katex tex="m+n\ge9" /> then <Katex tex="m\ge5" /> or <Katex tex="n\ge5" />&rsquo;.
          </p>
          <p>The contrapositive of this statement is</p>
        </div>
      }
      options={[
        { letter: 'A', content: <>if <Katex tex="m<5" /> or <Katex tex="n<5" />, then <Katex tex="m+n<9" /></> },
        { letter: 'B', content: <>if <Katex tex="m\ge5" /> or <Katex tex="n\ge5" />, then <Katex tex="m+n\ge9" /></> },
        { letter: 'C', content: <>if <Katex tex="m<5" /> and <Katex tex="n<5" />, then <Katex tex="m+n<9" /></>, isAnswer: true },
        { letter: 'D', content: <>if <Katex tex="m\le5" /> and <Katex tex="n\le5" />, then <Katex tex="m+n\le9" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
