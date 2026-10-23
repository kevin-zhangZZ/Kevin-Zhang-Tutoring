// 2024 Mathematical Methods NHT — Exam 2, MCQ 19. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment for this question (transcribed below from the rendered
// report). Calculus: solving (x² − x − 2) f′(x) > 0 from the sign of f′ read off a graph. Question
// text transcribed from the original paper; the graph is cropped from the original VCAA exam PDF.
// Solution is original; the answer C agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2024nht-mcq19-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'C',
  comment: (
    <>
      <Katex tex="\left(x^2-x-2\right)f'(x)>0" />
      <br />
      <Katex tex="f'(x)>0" /> when <Katex tex="\{x:-1<x<3\}" />, <Katex tex="x^2-x-2>0" /> when{' '}
      <Katex tex="\{x:x<-1\}\cup\{x:x>2\}" />
      <br />
      So <Katex tex="\left(x^2-x-2\right)f'(x)>0" />, when <Katex tex="\{x:2<x<3\}" />.
      <br />
      <Katex tex="f'(x)<0" /> when <Katex tex="\{x:x<-1\}\cup\{x:x>3\}" />, <Katex tex="x^2-x-2<0" /> when{' '}
      <Katex tex="\{x:-1<x<2\}" />
      <br />
      So <Katex tex="\left(x^2-x-2\right)f'(x)>0" />, when <Katex tex="\{x:2<x<3\}" /> only.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x^2-x-2=(x-2)(x+1)" />,
    reason: <>Factorise so the sign of the quadratic can be read off: it is zero at <Katex tex="x=-1" /> and <Katex tex="x=2" />, positive outside them and negative between them (an upright parabola).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&f'(x)>0:\ -1<x<3\\ &f'(x)<0:\ x<-1\text{ or }x>3\end{aligned}" />,
    reason: <>From the graph: <Katex tex="f" /> rises between its turning points at <Katex tex="x=-1" /> and <Katex tex="x=3" /> and falls outside them.</>,
    more: <>The <Katex tex="x" />-intercepts <Katex tex="(-2,0)" />, <Katex tex="(0,0)" /> and <Katex tex="(4,0)" /> are about the sign of <Katex tex="f" />, not of <Katex tex="f'" />. Only the turning points matter here.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{array}{c|c|c|c} & x^2-x-2 & f'(x) & \text{product}\\ \hline x<-1 & + & - & -\\ -1<x<2 & - & + & -\\ 2<x<3 & + & + & +\\ x>3 & + & - & - \end{array}"
      />
    ),
    reason: <>A product is positive when both factors have the <b>same</b> sign. The two factors change sign at <Katex tex="-1" />, <Katex tex="2" /> and <Katex tex="3" />, so check each interval between them.</>,
    more: <>At <Katex tex="x=-1" /> both factors are zero, and at <Katex tex="2" /> and <Katex tex="3" /> one of them is, so the product is zero there and those points are excluded from a strict inequality.</>,
  },
  {
    working: <Katex display tex="\boxed{2<x<3}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option <b>B</b> is where <Katex tex="f'(x)>0" /> alone, and option <b>D</b> is where <Katex tex="x^2-x-2>0" /> alone: each forgets the other factor. Option <b>A</b> is where the quadratic is negative, and option <b>E</b> is where <Katex tex="f'(x)<0" />.</>,
  },
]

export default function MethodsQ19_2024NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            Let <Katex tex="f:R\to R" /> be a continuous and differentiable function. Part of the graph of <Katex tex="f" /> is
            shown below.
          </p>
          <p>
            The stationary points of <Katex tex="f" /> are at <Katex tex="\big(-1,f(-1)\big)" /> and{' '}
            <Katex tex="\big(3,f(3)\big)" />.
          </p>
          <p>
            The solution to the inequality <Katex tex="\left(x^2-x-2\right)f'(x)>0" /> is
          </p>
        </div>
      }
      diagram={<img loading="lazy" decoding="async" src={graphSrc} alt="Graph of y = f(x): falling steeply to cross the x-axis at (−2, 0), a local minimum at (−1, f(−1)), up through (0, 0) to a local maximum at (3, f(3)), then falling through (4, 0), from the original VCAA exam paper" className="w-full max-w-[360px]" />}
      options={[
        { letter: 'A', content: <Katex tex="-1<x<2" /> },
        { letter: 'B', content: <Katex tex="-1<x<3" /> },
        { letter: 'C', content: <Katex tex="2<x<3" />, isAnswer: true },
        { letter: 'D', content: <><Katex tex="x<-1" /> or <Katex tex="x>2" /></> },
        { letter: 'E', content: <><Katex tex="x<-1" /> or <Katex tex="x>3" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
