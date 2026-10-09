// 2023 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 59% correct.
// An oblique asymptote pins two coefficients; a vertical one pins the third. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 59, C: 13, D: 14, E: 2 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{x^3}{ax^2+bx+c} = 2x+1+\frac{px+q}{ax^2+bx+c}" />,
    reason: <>An oblique asymptote is the quotient you get when you divide the numerator by the denominator, so the function is <Katex tex="2x+1" /> plus a remainder fraction whose numerator <Katex tex="px+q" /> (for some constants <Katex tex="p" /> and <Katex tex="q" />) has lower degree than the quadratic denominator.</>,
    more: <>Because its numerator has lower degree than its denominator, the remainder fraction <Katex tex="\to 0" /> as <Katex tex="x\to\pm\infty" />. That is why the graph gets closer and closer to the line <Katex tex="y=2x+1" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x^3 &= (2x+1)(ax^2+bx+c) \\ &\qquad +px+q \\ &= 2ax^3+(a+2b)x^2 \\ &\qquad +(b+2c+p)x+c+q \end{aligned}" />,
    reason: <>Multiply both sides by <Katex tex="ax^2+bx+c" /> to clear the fractions, then expand.</>,
    more: <>This avoids long division with unknown coefficients.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} 2a &= 1, & a &= \tfrac12 \\ a+2b &= 0, & b &= -\tfrac14 \end{aligned}" />,
    reason: <>Both sides are the same polynomial, so equate coefficients. The left side is <Katex tex="1x^3+0x^2+\dots" />, so the <Katex tex="x^3" /> terms give <Katex tex="2a=1" /> and the <Katex tex="x^2" /> terms give <Katex tex="a+2b=0" />.</>,
    more: <>A quick check on <Katex tex="a" />: for large <Katex tex="x" /> the function behaves like its leading terms, <Katex tex="\dfrac{x^3}{ax^2}=\dfrac{x}{a}" />, so the asymptote's gradient is <Katex tex="\tfrac1a" />. A gradient of 2 needs <Katex tex="a=\tfrac12" />, not <Katex tex="a=2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} a(1)^2+b(1)+c &= 0 \\ \tfrac12-\tfrac14+c &= 0 \\ c &= -\tfrac14 \end{aligned}" />,
    reason: <>The <Katex tex="x" /> and constant terms only fix <Katex tex="p" /> and <Katex tex="q" />, so <Katex tex="c" /> has to come from the vertical asymptote. A vertical asymptote is where the denominator is 0 (and the numerator isn't), so the denominator must be 0 at <Katex tex="x=1" />.</>,
    more: (
      <>
        Check: the denominator is <Katex tex="\tfrac12x^2-\tfrac14x-\tfrac14 = \tfrac14(2x+1)(x-1)" />, which is 0 at{' '}
        <Katex tex="x=1" /> while the numerator <Katex tex="1^3=1" /> isn't, so <Katex tex="x=1" /> really is an asymptote
        (not a hole). The graph also has a second vertical asymptote, <Katex tex="x=-\tfrac12" />; the question only
        needs <Katex tex="x=1" /> to be one of them.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{a = \frac12, \quad b = -\frac14, \quad c = -\frac14}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: (
      <>
        Options <b>A</b> and <b>E</b> have <Katex tex="a=2" />, which gives the oblique asymptote{' '}
        <Katex tex="y=\tfrac x2+1" /> (gradient <Katex tex="\tfrac12" />, not 2). Option <b>C</b> has the sign of{' '}
        <Katex tex="b" /> flipped, which gives <Katex tex="y=2x-1" />. Option <b>D</b>, the most common wrong answer, has
        the right <Katex tex="a" /> and <Katex tex="b" />, but its denominator <Katex tex="\tfrac14(x+1)(2x-3)" /> is zero
        at <Katex tex="x=-1" /> and <Katex tex="x=\tfrac32" />, not <Katex tex="x=1" />. Its <Katex tex="c=-\tfrac34" /> is
        what you get by substituting <Katex tex="x=-1" /> instead of <Katex tex="x=1" /> into the denominator:{' '}
        <Katex tex="\tfrac12+\tfrac14+c=0" />.
      </>
    ),
  },
]

export default function SpecialistQ2_2023() {
  return (
    <MCQShell
      question={
        <p>
          The graph of <Katex tex="y=\dfrac{x^3}{ax^2+bx+c}" /> has asymptotes given by{' '}
          <Katex tex="y=2x+1" /> and <Katex tex="x=1" />. The values of <Katex tex="a" />,{' '}
          <Katex tex="b" /> and <Katex tex="c" /> are, respectively
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2,\ -4,\ 2" /> },
        { letter: 'B', content: <Katex tex="\tfrac12,\ -\tfrac14,\ -\tfrac14" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\tfrac12,\ \tfrac14,\ -\tfrac34" /> },
        { letter: 'D', content: <Katex tex="\tfrac12,\ -\tfrac14,\ -\tfrac34" /> },
        { letter: 'E', content: <Katex tex="2,\ -4,\ -8" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
