// 2024 Mathematical Methods NHT — Exam 2, MCQ 17. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment for this question (transcribed below from the rendered
// report). Probability: what Pr(A | B) = 1 and Pr(C | B) = Pr(C) force. Question text transcribed
// from the original paper. Solution is original; the answer D agrees with the report's key.
// Note: strictly, Pr(A ∩ B) = Pr(B) gives B ⊆ A only up to a set of probability zero; the report and
// the options treat it as B ⊆ A, and the solution follows that reading.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      <Katex tex="\Pr(A\,|\,B)=1" />
      <br />
      <Katex tex="\dfrac{\Pr(A\cap B)}{\Pr(B)}=1" />
      <br />
      <Katex tex="\Pr(A\cap B)=\Pr(B),\ B\subseteq A" />
      <br />
      <Katex tex="\Pr(C\,|\,B)=\Pr(C)" />
      <br />
      <Katex tex="\dfrac{\Pr(C\cap B)}{\Pr(B)}=\Pr(C)" />
      <br />
      <Katex tex="\Pr(C\cap B)=\Pr(B)\times\Pr(C)" />, <Katex tex="B" /> and <Katex tex="C" /> are independent.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\Pr(A\,|\,B)=\frac{\Pr(A\cap B)}{\Pr(B)}&=1\\ \Pr(A\cap B)&=\Pr(B)\end{aligned}" />,
    reason: <>Definition of conditional probability. <Katex tex="\Pr(A\,|\,B)=1" /> says: whenever <Katex tex="B" /> happens, <Katex tex="A" /> happens too.</>,
  },
  {
    working: <Katex display tex="B\subseteq A" />,
    reason: <><Katex tex="A\cap B" /> is the part of <Katex tex="B" /> inside <Katex tex="A" />, and it carries all of <Katex tex="B" />&apos;s probability, so <Katex tex="B" /> sits inside <Katex tex="A" />.</>,
    more: <>Think of a Venn diagram: if any of <Katex tex="B" /> poked outside <Katex tex="A" />, then <Katex tex="\Pr(A\cap B)" /> would be smaller than <Katex tex="\Pr(B)" />. (Strictly, a piece of <Katex tex="B" /> with zero probability could lie outside <Katex tex="A" />; the report and the options ignore that technicality.)</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(C\,|\,B)&=\Pr(C)\\ \Pr(C\cap B)&=\Pr(C)\Pr(B)\end{aligned}" />,
    reason: <>Knowing <Katex tex="B" /> happened doesn&apos;t change the probability of <Katex tex="C" />: that is the definition of <Katex tex="B" /> and <Katex tex="C" /> being independent. Multiply through by <Katex tex="\Pr(B)" /> to get the product form.</>,
  },
  {
    working: <Katex display tex="\boxed{B\text{ and }C\text{ independent, and }B\subseteq A}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Option <b>E</b> gets the subset right but the independence wrong. Options <b>A</b> and <b>C</b> are about <Katex tex="\Pr(A)" />, which the information doesn&apos;t pin down: <Katex tex="A" /> could be the whole sample space (<Katex tex="\Pr(A)=1" />) or just slightly bigger than <Katex tex="B" />, so neither <b>must</b> be true. Option <b>B</b> (<Katex tex="C\subseteq B" />) isn&apos;t forced either; in fact if <Katex tex="C\subseteq B" /> with <Katex tex="0<\Pr(B)<1" /> and <Katex tex="\Pr(C)>0" />, then <Katex tex="\Pr(C\,|\,B)=\tfrac{\Pr(C)}{\Pr(B)}" /> is bigger than <Katex tex="\Pr(C)" />, contradicting independence.</>,
  },
]

export default function MethodsQ17_2024NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            Suppose that for three events, <Katex tex="A" />, <Katex tex="B" /> and <Katex tex="C" />,{' '}
            <Katex tex="\Pr(A\,|\,B)=1" /> and <Katex tex="\Pr(C\,|\,B)=\Pr(C)" />.
          </p>
          <p>
            Which of the following statements about <Katex tex="A" />, <Katex tex="B" /> and <Katex tex="C" />{' '}
            <b>must</b> be true?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\Pr(A)=1" /> },
        { letter: 'B', content: <Katex tex="C\subseteq B" /> },
        { letter: 'C', content: <Katex tex="\Pr(A)\neq 1" /> },
        { letter: 'D', content: <><Katex tex="B" /> and <Katex tex="C" /> are independent events and <Katex tex="B\subseteq A" /></>, isAnswer: true },
        { letter: 'E', content: <><Katex tex="B" /> and <Katex tex="C" /> are not independent events and <Katex tex="B\subseteq A" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
