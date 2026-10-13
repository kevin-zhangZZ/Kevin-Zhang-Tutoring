// 2016 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 71% correct.
// Asymptotes of (x³ − ax)/x², which simplifies to x − a/x. Question text transcribed from
// the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 6, C: 71, D: 7, E: 4 },
  answer: 'C',
  noAnswer: 0,
  comment: <Katex tex="f(x)=x-\tfrac{a}{x}" />,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{x^3-ax}{x^2} = \frac{x^3}{x^2}-\frac{ax}{x^2}" />,
    reason: <>The denominator is a single term, so divide each numerator term by <Katex tex="x^2" />. A polynomial part plus a fraction shows the asymptotes directly.</>,
  },
  {
    working: <Katex display tex="f(x) = x-\frac{a}{x}" />,
    reason: <>Valid for <Katex tex="x\ne0" />, which is the whole domain anyway.</>,
  },
  {
    working: <Katex display tex="x\to0 \implies \frac{a}{x}\to\pm\infty" />,
    reason: <>So <Katex tex="x=0" /> is a vertical asymptote (as <Katex tex="a\ne0" />).</>,
    more: <>It is genuine, not a hole: the factor <Katex tex="x" /> in the numerator cancelled only one of the two in the denominator, so an <Katex tex="x" /> is left underneath. If <Katex tex="a" /> were <Katex tex="0" /> the function would just be <Katex tex="y=x" /> with a hole at the origin — that is why the question says <Katex tex="a" /> is non-zero.</>,
  },
  {
    working: <Katex display tex="x\to\pm\infty \implies \frac{a}{x}\to0 \implies f(x)\to x" />,
    reason: <>The difference <Katex tex="f(x)-x=-\tfrac{a}{x}" /> shrinks to <Katex tex="0" />, so the line <Katex tex="y=x" /> is an <em>oblique</em> asymptote.</>,
  },
  {
    working: <Katex display tex="\boxed{x=0 \text{ and } y=x \text{ only}}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: (
      <>
        <b>A</b> (12%, the most common wrong answer) misses the oblique asymptote — a straight-line asymptote need not be horizontal.{' '}
        <b>B</b>&rsquo;s <Katex tex="y=0" /> would need the whole function to die away as <Katex tex="x\to\pm\infty" />, but{' '}
        <Katex tex="f(x)" /> grows like <Katex tex="x" />. <b>E</b>&rsquo;s <Katex tex="y=a" /> has no basis: the <Katex tex="a" /> term is{' '}
        <Katex tex="\tfrac{a}{x}" />, which tends to <Katex tex="0" />, not <Katex tex="a" />. <b>D</b> treats{' '}
        <Katex tex="x=\pm\sqrt a" /> as asymptotes, but these are the <Katex tex="x" />-intercepts (where <Katex tex="x^2=a" />, when{' '}
        <Katex tex="a>0" />): <Katex tex="f(\pm\sqrt a)=0" />, a finite value — the opposite of an asymptote.
      </>
    ),
  },
]

export default function SpecialistQ3_2016() {
  return (
    <MCQShell
      question={
        <p>
          The straight-line asymptote(s) of the graph of the function with rule{' '}
          <Katex tex="f(x)=\dfrac{x^3-ax}{x^2}" />, where <Katex tex="a" /> is a non-zero
          real constant, is given by
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="x=0" /> only</> },
        { letter: 'B', content: <><Katex tex="x=0" /> and <Katex tex="y=0" /> only</> },
        { letter: 'C', content: <><Katex tex="x=0" /> and <Katex tex="y=x" /> only</>, isAnswer: true },
        { letter: 'D', content: <><Katex tex="x=0" />, <Katex tex="x=\sqrt a" /> and <Katex tex="x=-\sqrt a" /> only</> },
        { letter: 'E', content: <><Katex tex="x=0" /> and <Katex tex="y=a" /> only</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
