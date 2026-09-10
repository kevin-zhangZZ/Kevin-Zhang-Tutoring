// 2020 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 18% correct.
// Finding a valid domain for g(x) = log₂(cos(ax)) so that its range is exactly [−1, 0], given a
// periodicity condition that pins down a. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 21, B: 18, C: 24, D: 21, E: 16 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="-1\leq\log_2(\cos(2\pi x))\leq0 \;\implies\; \tfrac12\leq\cos(2\pi x)\leq1" />. Checking each option
      for a suitable domain gives <Katex tex="1\leq x\leq\tfrac76" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=\cos(ax),\quad f(x)=f(x+h) \text{ for all } h\in\mathbb{Z}" />,
    reason: <>Every integer must be a period of <Katex tex="f" /> — a much stronger condition than just having <i>some</i> period.</>,
  },
  {
    working: <Katex display tex="\text{fundamental period} = \frac{2\pi}{a}" />,
    reason: <>Since <Katex tex="h=1" /> is included, <Katex tex="1" /> itself must be an integer multiple of the fundamental period.</>,
  },
  {
    working: <Katex display tex="\frac{2\pi}{a} = 1 \;\implies\; a=2\pi" />,
    reason: <>Taking the simplest case where <Katex tex="1" /> <i>is</i> the fundamental period — one valid choice of <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="f(x) = \cos(2\pi x),\qquad g(x) = \log_2\big(\cos(2\pi x)\big)" />,
    reason: 'Substitute into g.',
  },
  {
    working: <Katex display tex="\text{Range of } g = [-1,0] \;\iff\; \cos(2\pi x)\in\big[2^{-1},2^0\big] = \big[\tfrac12,1\big]" />,
    reason: <>Undo the <Katex tex="\log_2" /> to translate the required range of <Katex tex="g" /> into a required range for <Katex tex="\cos(2\pi x)" />.</>,
  },
  {
    working: <Katex display tex="\cos(2\pi x)=1 \text{ at } x=1 \qquad \cos(2\pi x)=\tfrac12 \text{ at } x=\tfrac76" />,
    reason: <>Find where <Katex tex="\cos(2\pi x)" /> hits each endpoint, starting from the convenient point <Katex tex="x=1" /> (where the cosine is exactly 1).</>,
  },
  {
    working: <>On <Katex tex="\big[1,\tfrac76\big]" />, <Katex tex="2\pi x" /> runs from <Katex tex="2\pi" /> to <Katex tex="\tfrac{7\pi}{3}" />, so <Katex tex="\cos(2\pi x)" /> decreases monotonically from <Katex tex="1" /> to <Katex tex="\tfrac12" />.</>,
    reason: 'Confirm the interval sweeps the required range exactly once, with no extra values.',
  },
  {
    working: <Katex display tex="\boxed{D = \left[1,\ \tfrac76\right]}" />,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function MethodsQ20_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="f:\mathbb{R}\to\mathbb{R}" />, <Katex tex="f(x)=\cos(ax)" />, where{' '}
            <Katex tex="a\in\mathbb{R}\setminus\{0\}" />, be a function with the property
          </p>
          <p className="mb-2">
            <Katex tex="f(x) = f(x+h), \text{ for all } h\in\mathbb{Z}" />
          </p>
          <p>
            Let <Katex tex="g:D\to\mathbb{R}" />, <Katex tex="g(x)=\log_2\big(f(x)\big)" /> be a function where the
            range of <Katex tex="g" /> is <Katex tex="[-1,0]" />.
            <br />
            A possible interval for <Katex tex="D" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left[\tfrac14,\ \tfrac{5}{12}\right]" /> },
        { letter: 'B', content: <Katex tex="\left[1,\ \tfrac76\right]" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\left[\tfrac53,\ 2\right]" /> },
        { letter: 'D', content: <Katex tex="\left[-\tfrac13,\ 0\right]" /> },
        { letter: 'E', content: <Katex tex="\left[-\tfrac{1}{12},\ \tfrac14\right]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
