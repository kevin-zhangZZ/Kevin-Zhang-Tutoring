// 2019 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 27% correct.
// A piecewise-linear probability density function; find Pr(X > 0) from a given average value.
// Question text transcribed from the original paper; the diagram is cropped directly from the
// original VCAA exam PDF, not a redrawing. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2019-mcq18-piecewise-pdf.png'

const DIAGRAM = <img src={diagramSrc} alt="Piecewise-linear graph of p(x) through (-a, 0), (0, 2a) and (b, b), from the original 2019 VCAA exam paper" className="w-full max-w-[280px]" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 17, C: 26, D: 27, E: 13 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      Average value <Katex tex="= \dfrac{1}{b-(-a)}\displaystyle\int_{-a}^b p(x)\,dx = \tfrac34" />. The area under
      the curve is also the area of the triangle plus the area of the trapezium:{' '}
      <Katex tex="a^2+\tfrac12 b(2a+b)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{-a}^b p(x)\,dx = 1" />,
    reason: <>Since <Katex tex="f=p" /> on <Katex tex="[-a,b]" /> is a valid probability density function, the total area under it must equal 1.</>,
  },
  {
    working: <Katex display tex="\text{Average value} = \frac{1}{b-(-a)}\int_{-a}^b p(x)\,dx = \frac{1}{a+b} = \frac34" />,
    reason: 'Use the given average value directly — the integral is already known to be 1.',
  },
  {
    working: <Katex display tex="a+b = \frac43" />,
    reason: 'Rearrange.',
  },
  {
    working: <Katex display tex="1 = \underbrace{a^2}_{\text{triangle}} + \underbrace{\tfrac12 b(2a+b)}_{\text{trapezium}} = a^2+ab+\tfrac{b^2}{2}" />,
    reason: <>Split the total area into the triangle over <Katex tex="[-a,0]" /> and the trapezium over <Katex tex="[0,b]" />, matching the graph.</>,
  },
  {
    working: <Katex display tex="a^2+ab+\tfrac{b^2}{2} = \frac{(a+b)^2+a^2}{2}" />,
    reason: <>Algebraic identity: <Katex tex="a^2+ab+\tfrac{b^2}{2} = \tfrac12\big[(a+b)^2+a^2\big]" /> — a useful shortcut that avoids solving for <Katex tex="a" /> and <Katex tex="b" /> separately.</>,
  },
  {
    working: <Katex display tex="1 = \frac{(4/3)^2+a^2}{2} \;\implies\; 2 = \frac{16}{9}+a^2 \;\implies\; a^2=\frac29" />,
    reason: <>Substitute <Katex tex="a+b=\tfrac43" /> and solve for <Katex tex="a^2" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X>0) = \int_0^b p(x)\,dx = 1 - a^2" />,
    reason: <>The trapezium's area (over <Katex tex="[0,b]" />) is everything except the triangle's area (over <Katex tex="[-a,0]" />), since the total is 1.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X>0) = 1-\frac29 = \frac79}" />,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function MethodsQ18_2019() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The distribution of a continuous random variable, <Katex tex="X" />, is defined by the probability
            density function <Katex tex="f" />, where
          </p>
          <p className="mb-2">
            <Katex tex="f(x) = \begin{cases} p(x) & -a\leq x\leq b \\ 0 & \text{otherwise} \end{cases}" />
          </p>
          <p className="mb-2">
            and <Katex tex="a,b\in\mathbb{R}^+" />. The graph of the function <Katex tex="p" /> is shown below.
          </p>
          <p>
            It is known that the average value of <Katex tex="p" /> over the interval <Katex tex="[-a,b]" /> is{' '}
            <Katex tex="\tfrac34" />.
            <br />
            <Katex tex="\Pr(X>0)" /> is
          </p>
        </>
      }
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="\tfrac23" /> },
        { letter: 'B', content: <Katex tex="\tfrac34" /> },
        { letter: 'C', content: <Katex tex="\tfrac45" /> },
        { letter: 'D', content: <Katex tex="\tfrac79" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\tfrac56" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
