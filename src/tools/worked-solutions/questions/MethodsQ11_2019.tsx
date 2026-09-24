// 2019 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 30% correct.
// The condition for independence of two events A and B, given conditional probabilities.
// Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 30, B: 23, C: 16, D: 12, E: 19 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\Pr(A)=p" />
      <br />
      <Katex tex="\Pr(B\mid A)=\dfrac{\Pr(A\cap B)}{\Pr(A)}=\dfrac{\Pr(A)\times\Pr(B)}{\Pr(A)}=\Pr(B)=m" />
      <br />
      <Katex tex="\Pr(B\mid A')=\dfrac{\Pr(A'\cap B)}{\Pr(A')}=\dfrac{\Pr(A')\times\Pr(B)}{\Pr(A')}=\Pr(B)=n" />
      <br />
      Hence <Katex tex="m=n" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(A)=p,\quad \Pr(B\mid A)=m,\quad \Pr(B\mid A')=n" />,
    reason: <>Given information.</>,
  },
  {
    working: <Katex display tex="A,B \text{ independent} \iff \Pr(B\mid A)=\Pr(B)" />,
    reason: <>The definition of independence, in the conditional form: knowing that <Katex tex="A" /> occurred does not change the probability of <Katex tex="B" />.</>,
  },
  {
    working: <Katex display tex="\Pr(B) = \Pr(B\mid A)\Pr(A) + \Pr(B\mid A')\Pr(A') = mp+n(1-p)" />,
    reason: <>The law of total probability: <Katex tex="B" /> can happen either with <Katex tex="A" /> or without it, so split <Katex tex="\Pr(B)" /> across those two cases. Everything is now written in terms of <Katex tex="m" />, <Katex tex="n" /> and <Katex tex="p" />.</>,
  },
  {
    working: <Katex display tex="m = mp+n(1-p)" />,
    reason: <>Substituting both sides of the independence condition: the left side is <Katex tex="\Pr(B\mid A)=m" />, the right side is <Katex tex="\Pr(B)" /> from the line above.</>,
  },
  {
    working: <Katex display tex="m(1-p) = n(1-p)" />,
    reason: <>Subtracting <Katex tex="mp" /> from both sides and factorising. Since the question quotes <Katex tex="\Pr(B\mid A')=n" />, the event <Katex tex="A'" /> must be possible, so <Katex tex="p<1" /> and <Katex tex="1-p\ne0" /> — it can be divided out.</>,
  },
  {
    working: <Katex display tex="\boxed{m=n}" />,
    reason: <>Matches option <b>A</b>. (This also makes sense directly: if <Katex tex="\Pr(B\mid A)=\Pr(B\mid A')" />, then <Katex tex="B" /> occurs at the same rate whether or not <Katex tex="A" /> happens, which is exactly independence — and it holds for any value of <Katex tex="p" />, which is why none of the options involving <Katex tex="p" /> can be right.)</>,
  },
]

export default function MethodsQ11_2019() {
  return (
    <MCQShell
      question={
        <p>
          <Katex tex="A" /> and <Katex tex="B" /> are events from a sample space such that <Katex tex="\Pr(A)=p" />,
          where <Katex tex="p>0" />, <Katex tex="\Pr(B\mid A)=m" /> and <Katex tex="\Pr(B\mid A')=n" />.
          <br />
          <Katex tex="A" /> and <Katex tex="B" /> are independent events when
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="m=n" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="m=1-p" /> },
        { letter: 'C', content: <Katex tex="m+n=1" /> },
        { letter: 'D', content: <Katex tex="m=p" /> },
        { letter: 'E', content: <Katex tex="m+n=1-p" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
