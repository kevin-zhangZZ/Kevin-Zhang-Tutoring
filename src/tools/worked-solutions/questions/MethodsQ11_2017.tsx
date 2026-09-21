// 2017 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 72% correct.
// Finding a and b from the positions of a cubic's turning points. Question text
// transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 5, C: 10, D: 72, E: 3 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)=3x^2+2ax+b" />,
    reason: <>Differentiating <Katex tex="f(x)=x^3+ax^2+bx" />.</>,
  },
  {
    working: <Katex display tex="f'(-1)=0 \text{ and } f'(3)=0" />,
    reason: <>Both a local maximum and a local minimum are stationary points, so both make the derivative zero. Which is which does not matter here.</>,
  },
  {
    working: <Katex display tex="f'(x)=3(x+1)(x-3)" />,
    reason: <>A quadratic with those two roots and leading coefficient <Katex tex="3" />. Writing it factorised is far quicker than solving two simultaneous equations.</>,
  },
  {
    working: <Katex display tex="=3(x^2-2x-3)=3x^2-6x-9" />,
    reason: <>Expanding.</>,
  },
  {
    working: <Katex display tex="2a=-6 \implies a=-3, \qquad b=-9" />,
    reason: <>Matching coefficients with <Katex tex="3x^2+2ax+b" />. Option C forgets to halve the <Katex tex="-6" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a=-3 \text{ and } b=-9}" />,
    reason: <>Option D. Check the shape: <Katex tex="f'(x)=3(x+1)(x-3)" /> is positive, then negative, then positive, so <Katex tex="x=-1" /> really is the maximum and <Katex tex="x=3" /> the minimum, as stated.</>,
  },
]

export default function MethodsQ11_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The function <Katex tex="f:R\to R" />, <Katex tex="f(x)=x^3+ax^2+bx" /> has a
            local maximum at <Katex tex="x=-1" /> and a local minimum at{' '}
            <Katex tex="x=3" />.
          </p>
          <p>
            The values of <Katex tex="a" /> and <Katex tex="b" /> are respectively
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <><Katex tex="-2" /> and <Katex tex="-3" /></> },
        { letter: 'B', content: <><Katex tex="2" /> and <Katex tex="1" /></> },
        { letter: 'C', content: <><Katex tex="3" /> and <Katex tex="-9" /></> },
        { letter: 'D', content: <><Katex tex="-3" /> and <Katex tex="-9" /></>, isAnswer: true },
        { letter: 'E', content: <><Katex tex="-6" /> and <Katex tex="-15" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
