// 2025 Specialist NHT — Exam 2, MCQ 2. The NHT report gives the answer key only, with no
// statistics. Functions: counting straight-line asymptotes of a rational function whose numerator
// shares a factor with the denominator. Question text transcribed from the original paper (the 2025
// NHT paper is image-only, so read from the rendered page). Solution is original; the answer B
// agrees with the report's key (sympy: numerator = (x − 3)(2x³ − 1), so f = (2x³ − 1)/(x + 5) for
// x ≠ 3, = 2x² − 10x + 50 − 251/(x + 5)). Distractor C checked: treating both zeros of the
// denominator as vertical asymptotes gives 2.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+2x-15=(x+5)(x-3)" />,
    reason: <>Factorise the denominator first: its zeros, <Katex tex="x=-5" /> and <Katex tex="x=3" />, are the only candidates for vertical asymptotes.</>,
  },
  {
    working: <Katex display tex="x=3:\ \ 2(81)-6(27)-3+3=0" />,
    reason: <>Before calling each one an asymptote, check whether the numerator is also zero there. At <Katex tex="x=3" /> it is, so <Katex tex="x-3" /> is a factor of the numerator too.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}2x^4-6x^3-x+3&=2x^3(x-3)-(x-3)\\&=(x-3)(2x^3-1)\end{aligned}" />,
    reason: <>Factorise by grouping: the first pair and the second pair both contain <Katex tex="x-3" />.</>,
  },
  {
    working: <Katex display tex="f(x)=\frac{(x-3)(2x^3-1)}{(x+5)(x-3)}=\frac{2x^3-1}{x+5},\quad x\neq 3" />,
    reason: <>The common factor cancels, leaving a hole (a missing point) at <Katex tex="x=3" />, not an asymptote. The graph only blows up at <Katex tex="x=-5" />.</>,
    more: <>Near <Katex tex="x=3" /> the function approaches <Katex tex="\tfrac{2(27)-1}{8}=\tfrac{53}{8}" />, a finite value, so the graph doesn&apos;t shoot off to infinity there.</>,
  },
  {
    working: <Katex display tex="\frac{2x^3-1}{x+5}=2x^2-10x+50-\frac{251}{x+5}" />,
    reason: <>For the behaviour as <Katex tex="x\to\pm\infty" />, divide (long division). To check it: <Katex tex="(x+5)(2x^2-10x+50)=2x^3+250" />, which is 251 more than <Katex tex="2x^3-1" />. The fraction part tends to 0, so the graph approaches the <b>parabola</b> <Katex tex="y=2x^2-10x+50" />, which is not a straight line.</>,
    more: <>A rational function has a straight-line oblique asymptote only when the numerator&apos;s degree is exactly one more than the denominator&apos;s. Here, after cancelling, it is two more (cubic over linear), so the curved asymptote takes over and there is no horizontal or oblique line.</>,
  },
  {
    working: <Katex display tex="\boxed{1\ \text{straight-line asymptote: } x=-5}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option <b>C</b>, 2, counts <Katex tex="x=3" /> as a second vertical asymptote without checking the numerator there.</>,
  },
]

export default function SpecialistQ2_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          The number of straight-line asymptotes of the graph of the function with rule{' '}
          <Katex tex="f(x)=\dfrac{2x^4-6x^3-x+3}{x^2+2x-15}" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="1" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="2" /> },
        { letter: 'D', content: <Katex tex="3" /> },
      ]}
      rows={ROWS}
      extras={
        <WrongMethod
          title="Every zero of the denominator is a vertical asymptote"
          working={<Katex display tex="\begin{aligned}&(x+5)(x-3)=0\\&\Rightarrow\ x=-5,\ x=3\ \Rightarrow\ 2\end{aligned}" />}
        >
          That only holds when the numerator is non-zero there. At <Katex tex="x=3" /> the numerator is 0 as well, the
          factor cancels and the graph has a hole, not an asymptote. Always substitute each zero of the denominator into
          the numerator before declaring an asymptote.
        </WrongMethod>
      }
      examinerReport={EXAMINER}
    />
  )
}
