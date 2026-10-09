// 2019 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 27% correct.
// A piecewise-linear probability density function; find Pr(X > 0) from a given average value.
// Question text transcribed from the original paper; the diagram is cropped directly from the
// original VCAA exam PDF, not a redrawing. Solution is original; it substitutes b = 4/3 − a
// (the a-terms cancel) where the report solves the pair on CAS.
// Interactive: interactives/meth-2019-mcq18-area-one.tsx (average value as a rectangle of height
// 3/4 fixing a + b = 4/3; slide a until the area under p is 1). WrongMethod: taking the
// average value 3/4 as the probability (B, 17%).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'
import diagramSrc from './meth-2019-mcq18-piecewise-pdf.png'

const AreaOne = lazyWidget(() => import('../interactives/meth-2019-mcq18-area-one'))

const DIAGRAM = <img loading="lazy" decoding="async" src={diagramSrc} alt="Piecewise-linear graph of p(x) through (-a, 0), (0, 2a) and (b, b), from the original 2019 VCAA exam paper" className="w-full max-w-[280px]" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 17, C: 26, D: 27, E: 13 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      Average value = <Katex tex="\dfrac{1}{a+b}\displaystyle\int_{-a}^{b}p(x)\,dx=\dfrac34" />
      <br />
      The area under curve = area of the triangle + area of the trapezium ={' '}
      <Katex tex="a^2+\dfrac{b(2a+b)}{2}" />
      <br />
      <Katex tex="\dfrac34(a+b)=\displaystyle\int_{-a}^{b}p(x)\,dx=a^2+\dfrac{b(2a+b)}{2}=1" />
      <br />
      Solve <Katex tex="\dfrac34(a+b)=1" /> and <Katex tex="a^2+\dfrac{b(2a+b)}{2}=1" /> for{' '}
      <Katex tex="a" />, <Katex tex="a=\dfrac{\sqrt2}{3}" />,
      <br />
      <Katex tex="\Pr(X>0)=1-a^2=1-\left(\dfrac{\sqrt2}{3}\right)^2=\dfrac79" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{-a}^b p(x)\,dx = 1" />,
    reason: <>There are two unknowns, <Katex tex="a" /> and <Katex tex="b" />, so I need two equations. The first comes free with the words &ldquo;probability density function&rdquo;: the total area under <Katex tex="p" /> on <Katex tex="[-a,b]" /> must be 1.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\frac{1}{b-(-a)}\int_{-a}^b p(x)\,dx = \frac34 \\ \frac{1}{a+b}\times 1 = \frac34\end{gathered}" />,
    reason: <>The second comes from the average value of <Katex tex="p" /> over <Katex tex="[-a,b]" />. Its formula contains the same integral, which we already know is 1, so there is nothing to integrate. Picture it: the average value is the height of the rectangle over <Katex tex="[-a,b]" /> that has the same area as the region under <Katex tex="p" />.</>,
  },
  {
    working: <Katex display tex="a+b = \frac43" />,
    reason: <>Rearrange. A rectangle of height <Katex tex="\tfrac34" /> and area 1 must be <Katex tex="\tfrac43" /> wide.</>,
  },
  {
    working: <Katex display tex="1 = \underbrace{a^2}_{\text{triangle}} + \underbrace{\tfrac12 b(2a+b)}_{\text{trapezium}}" />,
    reason: <>Now write the area in terms of <Katex tex="a" /> and <Katex tex="b" /> straight from the graph. The triangle over <Katex tex="[-a,0]" /> has base <Katex tex="a" /> and height <Katex tex="2a" />, so its area is <Katex tex="\tfrac12\cdot a\cdot 2a=a^2" />. The trapezium over <Katex tex="[0,b]" /> has parallel sides <Katex tex="2a" /> and <Katex tex="b" /> and width <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="a^2 + a\left(\tfrac43-a\right)+\tfrac12\left(\tfrac43-a\right)^2 = 1" />,
    reason: <>Substitute <Katex tex="b=\tfrac43-a" /> so that only one unknown is left (the trapezium expands to <Katex tex="ab+\tfrac{b^2}{2}" />). On CAS, <Cas fn="solve" /> the two equations together for <Katex tex="\{a,b\}" /> with <Katex tex="a>0" /> and <Katex tex="b>0" />.</>,
  },
  {
    working: <Katex display tex="\tfrac{a^2}{2}+\tfrac89 = 1 \;\implies\; a^2=\tfrac29" />,
    reason: <>Expanding, the <Katex tex="\tfrac{4a}{3}" /> terms cancel and the <Katex tex="a^2" /> terms collect to <Katex tex="\tfrac{a^2}{2}" />. We don&apos;t even need <Katex tex="a=\tfrac{\sqrt2}{3}" /> itself, only <Katex tex="a^2" />, because <Katex tex="a^2" /> is the triangle&apos;s area.</>,
  },
  {
    working: <Katex display tex="\Pr(X>0) = \int_0^b p(x)\,dx = 1 - a^2" />,
    reason: <>The event <Katex tex="X>0" /> is the part of the region to the right of the <Katex tex="y" />-axis: the trapezium. That is everything except the triangle, since the total is 1.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X>0) = 1-\frac29 = \frac79}" />,
    reason: <>Matches option <b>D</b>. As a check, <Katex tex="b=\tfrac{4-\sqrt2}{3}" /> and <Katex tex="2a+b=\tfrac{4+\sqrt2}{3}" /> give the trapezium directly: <Katex tex="\tfrac12\cdot\tfrac{16-2}{9}=\tfrac79" />. Option <b>B</b> <Katex tex="\left(\tfrac34\right)" /> is the average value itself, a height rather than an area.</>,
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
            and <Katex tex="a,b\in R^+" />. The graph of the function <Katex tex="p" /> is shown below.
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
      background={
        <Background title="Average value of a function">
          <p>
            The average value of <Katex tex="p" /> over <Katex tex="[-a,b]" /> is{' '}
            <Katex tex="\dfrac{1}{b-(-a)}\displaystyle\int_{-a}^{b}p(x)\,dx" />: the height of the rectangle on{' '}
            <Katex tex="[-a,b]" /> whose area equals the area under <Katex tex="p" />. So height &times; width = area. It is a
            height, not a probability, and it is not the mean <Katex tex="\operatorname{E}(X)=\int x\,p(x)\,dx" />, which is
            a position on the <Katex tex="x" />-axis.
          </p>
        </Background>
      }
      rows={ROWS}
      extras={
        <>
          <Explore title="The average value is a height: height × width = area = 1">
            <AreaOne />
          </Explore>
          <WrongMethod
            title="The average value is 3/4, so the probability is 3/4"
            source="17% chose B"
            working={<Katex display tex="\Pr(X>0)=\tfrac34 \quad \text{(option B)}" />}
          >
            <p>
              The average value is the height of a rectangle over the whole interval <Katex tex="[-a,b]" />; a probability is
              an area, here over only part of it. They are different kinds of quantity, and equal only by coincidence. Use the
              average value for what it gives you: height &times; width = area, so{' '}
              <Katex tex="\tfrac34(a+b)=1" />. Then <Katex tex="\Pr(X>0)" /> still has to be found as the area of the
              trapezium.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
