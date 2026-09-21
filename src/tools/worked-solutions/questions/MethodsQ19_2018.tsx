// 2018 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 41% correct.
// Total area of the (four-region, alternating-sign) shaded area between f(x)=cos(πx/2) and
// g(x)=sin(πx) on [0,3]. Question text transcribed from the original paper; the diagram is
// cropped directly from the original VCAA exam PDF, not a redrawing. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2018-mcq19-fg-areas.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 4, C: 41, D: 9, E: 42 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos\!\left(\frac{\pi x}{2}\right) = \sin(\pi x) = 2\sin\!\left(\frac{\pi x}{2}\right)\cos\!\left(\frac{\pi x}{2}\right)" />,
    reason: <>Find where <Katex tex="f" /> and <Katex tex="g" /> meet, using the double-angle identity for <Katex tex="\sin(\pi x)" />.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\frac{\pi x}{2}\right)\left[1-2\sin\!\left(\frac{\pi x}{2}\right)\right] = 0" />,
  },
  {
    working: <Katex display tex="\cos\!\left(\frac{\pi x}{2}\right)=0 \implies x=1,3 \qquad \sin\!\left(\frac{\pi x}{2}\right)=\tfrac12 \implies x=\tfrac13,\ \tfrac53" />,
    reason: <>Within <Katex tex="[0,3]" />, this gives four crossings: <Katex tex="x=\tfrac13,\,1,\,\tfrac53,\,3" /> — matching the diagram's dashed lines and the visible crossings at <Katex tex="x=1" /> and <Katex tex="x=3" />.</>,
  },
  {
    working: <Katex display tex="f>g \text{ on } \left(0,\tfrac13\right)\cup\left(1,\tfrac53\right); \qquad g>f \text{ on } \left(\tfrac13,1\right)\cup\left(\tfrac53,3\right)" />,
    reason: <>Between consecutive crossings, <Katex tex="f-g" /> keeps a constant sign — testing one point per interval gives this pattern, matching the shading in the diagram above.</>,
  },
  {
    working: <Katex display tex="h(x) = \int\!\left(\cos\tfrac{\pi x}{2}-\sin(\pi x)\right)dx = \frac{2}{\pi}\sin\!\left(\frac{\pi x}{2}\right) + \frac{1}{\pi}\cos(\pi x)" />,
    reason: <>An antiderivative of <Katex tex="f-g" />, to evaluate each region's signed integral.</>,
  },
  {
    working: (
      <Katex
        display
        tex="h(0)=\tfrac1\pi,\quad h\!\left(\tfrac13\right)=\tfrac{3}{2\pi},\quad h(1)=\tfrac1\pi,\quad h\!\left(\tfrac53\right)=\tfrac{3}{2\pi},\quad h(3)=-\tfrac3\pi"
      />
    ),
  },
  {
    working: (
      <Katex
        display
        tex="R_1=\int_0^{1/3}\!(f-g)=\tfrac{1}{2\pi},\quad R_2=\int_{1/3}^{1}\!(f-g)=-\tfrac{1}{2\pi},\quad R_3=\int_{1}^{5/3}\!(f-g)=\tfrac{1}{2\pi},\quad R_4=\int_{5/3}^{3}\!(f-g)=-\tfrac{9}{2\pi}"
      />
    ),
    reason: <>Each region's signed integral is <Katex tex="h" /> evaluated at its two endpoints.</>,
  },
  {
    working: <Katex display tex="R_3 = -R_2 \quad \left(\text{both} = \tfrac{1}{2\pi}\text{ in size}\right)" />,
    reason: <>A genuine symmetry of this particular pair of curves, not a coincidence — it's exactly what lets the total collapse to a 3-term expression instead of 4.</>,
  },
  {
    working: <Katex display tex="\text{Total area} = R_1 - R_2 + R_3 - R_4 = R_1 - R_2 + (-R_2) - R_4 = R_1 - 2R_2 - R_4" />,
    reason: <>Flip the sign of the two regions where <Katex tex="g>f" /> (subtracting a negative <Katex tex="R_2" /> and <Katex tex="R_4" />), then use <Katex tex="R_3=-R_2" /> to combine terms — this is exactly option C's expression: <Katex tex="\int_0^{1/3}\!(f-g) - 2\!\int_{1/3}^{1}\!(f-g) - \int_{5/3}^{3}\!(f-g)" />.</>,
  },
  {
    working: <Katex display tex="= \tfrac{1}{2\pi} - 2\!\left(-\tfrac{1}{2\pi}\right) - \left(-\tfrac{9}{2\pi}\right) = \tfrac{1}{2\pi}+\tfrac{1}{\pi}+\tfrac{9}{2\pi}" />,
  },
  {
    working: <Katex display tex="\boxed{\text{Total area} = \dfrac{6}{\pi}}" />,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function MethodsQ19_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The graphs <Katex tex="f:\mathbb{R}\to\mathbb{R},\ f(x)=\cos\!\left(\tfrac{\pi x}{2}\right)" />{' '}
            and <Katex tex="g:\mathbb{R}\to\mathbb{R},\ g(x)=\sin(\pi x)" /> are shown in the
            diagram below.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-2">
            <img
              src={graphSrc}
              alt="Graphs of f(x)=cos(πx/2) and g(x)=sin(πx) on [0,3], with the regions between them shaded, from the original 2018 VCAA exam paper"
              className="w-full max-w-[380px]"
            />
          </div>
          <p>An integral expression that gives the total area of the shaded regions is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_0^3\!\left(\sin(\pi x)-\cos\tfrac{\pi x}{2}\right)dx" /> },
        { letter: 'B', content: <Katex tex="\displaystyle 2\!\int_{5/3}^3\!\left(\sin(\pi x)-\cos\tfrac{\pi x}{2}\right)dx" /> },
        {
          letter: 'C',
          content: (
            <Katex tex="\displaystyle\int_0^{1/3}\!\left(\cos\tfrac{\pi x}{2}-\sin(\pi x)\right)dx - 2\!\int_{1/3}^{1}\!\left(\cos\tfrac{\pi x}{2}-\sin(\pi x)\right)dx - \int_{5/3}^{3}\!\left(\cos\tfrac{\pi x}{2}-\sin(\pi x)\right)dx" />
          ),
          isAnswer: true,
        },
        {
          letter: 'D',
          content: (
            <Katex tex="\displaystyle 2\!\int_1^{5/3}\!\left(\cos\tfrac{\pi x}{2}-\sin(\pi x)\right)dx - 2\!\int_{5/3}^{3}\!\left(\cos\tfrac{\pi x}{2}-\sin(\pi x)\right)dx" />
          ),
        },
        {
          letter: 'E',
          content: (
            <Katex tex="\displaystyle\int_0^{1/3}\!\left(\cos\tfrac{\pi x}{2}-\sin(\pi x)\right)dx + 2\!\int_{1/3}^{1}\!\left(\sin(\pi x)-\cos\tfrac{\pi x}{2}\right)dx + \int_{5/3}^{3}\!\left(\cos\tfrac{\pi x}{2}-\sin(\pi x)\right)dx" />
          ),
        },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
