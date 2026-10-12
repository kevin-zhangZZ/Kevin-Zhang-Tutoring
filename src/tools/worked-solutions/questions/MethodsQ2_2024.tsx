// 2024 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 81% correct.
// Antidifferentiating a derivative between two points. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 4, C: 5, D: 81 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g(2)-g(0) = \int_0^2 g'(x)\,dx" />,
    reason: <>The change in <Katex tex="g" /> from <Katex tex="x=0" /> to <Katex tex="x=2" /> is the definite integral of <Katex tex="g'" /> (fundamental theorem of calculus), so <Katex tex="g" /> itself isn't needed.</>,
    more: <>The longer way gives the same result: antidifferentiate to <Katex tex="g(x)=\tfrac{x^4}{4}-\tfrac{x^2}{2}+c" />, use <Katex tex="g(0)=5" /> to get <Katex tex="c=5" />, then substitute <Katex tex="x=2" />: <Katex tex="g(2)=4-2+5=7" />.</>,
  },
  {
    working: <Katex display tex="\int_0^2\left(x^3-x\right)dx = \left[\frac{x^4}{4}-\frac{x^2}{2}\right]_0^2" />,
    reason: <>Antidifferentiate term by term: raise each power by 1 and divide by the new power.</>,
  },
  {
    working: <Katex display tex="= \left(\frac{2^4}{4}-\frac{2^2}{2}\right)-0 = 4-2 = 2" />,
    reason: <>Substitute the upper terminal, then subtract the value at the lower terminal, which is 0 because both terms vanish at <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{g(2) = g(0)+2 = 5+2 = 7}" />,
    reason: <>Matches option <b>D</b>. The integral is only the change in <Katex tex="g" />, so add it to the starting value <Katex tex="g(0)=5" />.</>,
    more: <>Option <b>A</b>, 2, the most common wrong answer, is the integral alone: the change in <Katex tex="g" />, not its value. Option <b>B</b>, <Katex tex="3=5-2" />, subtracts the change instead of adding it. Option <b>C</b>, 5, is <Katex tex="g(0)" /> unchanged, which is what you get by assuming the integral of <Katex tex="x^3-x" /> is 0 because it is an odd function (its graph has rotational symmetry about the origin, so areas either side of 0 cancel); that shortcut works only on an interval symmetric about 0, such as <Katex tex="[-2,2]" />.</>,
  },
]

export default function MethodsQ2_2024() {
  return (
    <MCQShell
      question={
        <p>
          A function <Katex tex="g:R\to R" /> has the derivative{' '}
          <Katex tex="g'(x)=x^3-x" />.
          <br />
          Given that <Katex tex="g(0)=5" />, the value of{' '}
          <Katex tex="g(2)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="3" /> },
        { letter: 'C', content: <Katex tex="5" /> },
        { letter: 'D', content: <Katex tex="7" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
