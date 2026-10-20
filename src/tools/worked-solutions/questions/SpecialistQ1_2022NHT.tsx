// 2022 Specialist NHT — Exam 2, MCQ 1. The NHT report gives the answer key only, with no
// statistics. Functions: counting the asymptotes of a rational function as b varies — the
// horizontal asymptote y = 1 is always there, so "two asymptotes" means exactly one vertical one,
// a repeated zero of the denominator. Question text transcribed from the original paper.
// Solution is original; the answer E agrees with the report's key (checked with sympy).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'E' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x\to\pm\infty:\quad f(x)=\frac{1+\frac{1}{x^2}}{1+\frac{b}{x}+\frac{4}{x^2}}\to 1" />,
    reason: <>Numerator and denominator are both degree 2 with leading coefficient 1, so <Katex tex="y=1" /> is a horizontal asymptote, whatever <Katex tex="b" /> is. That is one of the two asymptotes already.</>,
  },
  {
    working: <Katex display tex="x^2+bx+4=0" />,
    reason: <>The vertical asymptotes are where the denominator is zero. The numerator <Katex tex="x^2+1" /> is never zero, so nothing cancels: every real zero of the denominator gives a vertical asymptote.</>,
    more: <>The other asymptote count must come from here: exactly <b>one</b> vertical asymptote, so the quadratic must have exactly one real solution.</>,
  },
  {
    working: <Katex display tex="\Delta=b^2-4(1)(4)=b^2-16=0" />,
    reason: <>A quadratic has exactly one (repeated) solution when its discriminant is zero.</>,
  },
  {
    working: <Katex display tex="b^2=16\implies b=\pm4" />,
    reason: <>Take both square roots.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}b=4:&\quad x^2+4x+4=(x+2)^2,\ \ x=-2\\ b=-4:&\quad x^2-4x+4=(x-2)^2,\ \ x=2\end{aligned}" />,
    reason: <>Check: each value gives a perfect square, so one vertical asymptote, plus <Katex tex="y=1" />: two in total.</>,
  },
  {
    working: <Katex display tex="\boxed{\{b : b=\pm4\}}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: (
      <>
        Option A (<Katex tex="b^2>16" />) gives two distinct zeros of the denominator, so two vertical asymptotes plus{' '}
        <Katex tex="y=1" />: three asymptotes. Option B (<Katex tex="b^2<16" />) gives a denominator that is never zero, so{' '}
        <Katex tex="y=1" /> is the only asymptote. Options C and D are B and A with <Katex tex="16" /> in place of{' '}
        <Katex tex="4" />: the discriminant&apos;s <Katex tex="16" /> compared with <Katex tex="b" /> instead of{' '}
        <Katex tex="b^2" />.
      </>
    ),
  },
]

export default function SpecialistQ1_2022NHT() {
  return (
    <MCQShell
      question={
        <p>
          The graph of <Katex tex="f" /> with rule <Katex tex="f(x)=\dfrac{x^2+1}{x^2+bx+4}" />, where{' '}
          <Katex tex="b\in R" />, has two asymptotes when
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\{b : b<-4\}\cup\{b : b>4\}" /> },
        { letter: 'B', content: <Katex tex="\{b : -4<b<4\}" /> },
        { letter: 'C', content: <Katex tex="\{b : -16<b<16\}" /> },
        { letter: 'D', content: <Katex tex="\{b : b<-16\}\cup\{b : b>16\}" /> },
        { letter: 'E', content: <Katex tex="\{b : b=\pm4\}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
