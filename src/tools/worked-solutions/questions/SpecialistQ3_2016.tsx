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
    reason: <>Split the fraction term by term before doing anything else — the whole question falls out of the simplified form.</>,
  },
  {
    working: <Katex display tex="f(x) = x-\frac{a}{x}" />,
    reason: <>Valid for <Katex tex="x\ne0" />, which is the whole domain anyway.</>,
  },
  {
    working: <Katex display tex="x\to0 \implies \frac{a}{x}\to\pm\infty" />,
    reason: <>So <Katex tex="x=0" /> is a vertical asymptote. It is genuine, not a hole: the <Katex tex="x" /> in the numerator cancelled only one of the two in the denominator.</>,
  },
  {
    working: <Katex display tex="x\to\pm\infty \implies \frac{a}{x}\to0 \implies f(x)\to x" />,
    reason: <>The curve approaches the line <Katex tex="y=x" />, an <em>oblique</em> asymptote. Option B's <Katex tex="y=0" /> would need the whole function to die away, which it does not.</>,
  },
  {
    working: <Katex display tex="\boxed{x=0 \text{ and } y=x \text{ only}}" />,
    reason: <>Matches option <b>C</b>. Option A (12%) misses the oblique asymptote; option D treats <Katex tex="\pm\sqrt a" /> — the <Katex tex="x" />-intercepts, where <Katex tex="x^2=a" /> — as asymptotes, which is the opposite of what they are.</>,
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
