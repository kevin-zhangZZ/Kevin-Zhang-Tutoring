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
    reason: <>Two unknowns, <Katex tex="a" /> and <Katex tex="b" />, need two equations. First: <Katex tex="p" /> is a probability density, so the total area under it on <Katex tex="[-a,b]" /> is 1.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\frac{1}{b-(-a)}\int_{-a}^b p(x)\,dx = \frac34 \\ \frac{1}{a+b}\times 1 = \frac34\end{gathered}" />,
    reason: <>Second: the average value of <Katex tex="p" /> over <Katex tex="[-a,b]" />. Its formula contains the same integral, which is 1, so there is nothing to integrate.</>,
  },
  {
    working: <Katex display tex="a+b = \frac43" />,
    reason: <>Rearrange. A rectangle of height <Katex tex="\tfrac34" /> and area 1 must be <Katex tex="\tfrac43" /> wide.</>,
  },
  {
    working: <Katex display tex="1 = \underbrace{a^2}_{\text{triangle}} + \underbrace{\tfrac12 b(2a+b)}_{\text{trapezium}}" />,
    reason: <>The area from the graph: a triangle on <Katex tex="[-a,0]" /> (base <Katex tex="a" />, height <Katex tex="2a" />) plus a trapezium on <Katex tex="[0,b]" /> (parallel sides <Katex tex="2a" /> and <Katex tex="b" />, width <Katex tex="b" />).</>,
    more: <>Triangle: <Katex tex="\tfrac12\cdot a\cdot 2a=a^2" />. Trapezium: <Katex tex="\tfrac12(\text{sum of parallel sides})\times\text{width}=\tfrac12(2a+b)\,b" />. The parallel sides are the heights of the graph at <Katex tex="x=0" /> and <Katex tex="x=b" />, read from the points <Katex tex="(0,2a)" /> and <Katex tex="(b,b)" />.</>,
  },
  {
    working: <Katex display tex="a^2 + a\left(\tfrac43-a\right)+\tfrac12\left(\tfrac43-a\right)^2 = 1" />,
    reason: <>Substitute <Katex tex="b=\tfrac43-a" /> so only one unknown is left (the trapezium expands to <Katex tex="ab+\tfrac{b^2}{2}" />).</>,
    more: <>The report instead solves the two equations together on CAS: <Cas fn="solve" /> them for <Katex tex="\{a,b\}" /> with <Katex tex="a>0" /> and <Katex tex="b>0" />. By hand it is quick because the <Katex tex="a" />-terms cancel (next line).</>,
  },
  {
    working: <Katex display tex="\tfrac{a^2}{2}+\tfrac89 = 1 \;\implies\; a^2=\tfrac29" />,
    reason: <>Expanding, the <Katex tex="\tfrac{4a}{3}" /> terms cancel and the <Katex tex="a^2" /> terms collect to <Katex tex="\tfrac{a^2}{2}" />; the constant is <Katex tex="\tfrac12\left(\tfrac43\right)^2=\tfrac89" />.</>,
    more: <>Expanded: <Katex tex="a^2+\tfrac{4a}{3}-a^2+\tfrac89-\tfrac{4a}{3}+\tfrac{a^2}{2}" />. So <Katex tex="a=\tfrac{\sqrt2}{3}" /> and <Katex tex="b=\tfrac43-\tfrac{\sqrt2}{3}=\tfrac{4-\sqrt2}{3}" />, both positive as required. We don&apos;t actually need <Katex tex="a" /> itself, only <Katex tex="a^2" />, because <Katex tex="a^2" /> is the triangle&apos;s area.</>,
  },
  {
    working: <Katex display tex="\Pr(X>0) = \int_0^b p(x)\,dx = 1 - a^2" />,
    reason: <><Katex tex="X>0" /> is the region right of the <Katex tex="y" />-axis: the trapezium, which is the total area 1 minus the triangle.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X>0) = 1-\frac29 = \frac79}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Check with the trapezium directly: <Katex tex="b=\tfrac{4-\sqrt2}{3}" /> and <Katex tex="2a+b=\tfrac{4+\sqrt2}{3}" />, so <Katex tex="\tfrac12 b(2a+b)=\tfrac12\cdot\tfrac{16-2}{9}=\tfrac79" />. Option <b>B</b> <Katex tex="\left(\tfrac34\right)" /> is the average value itself, a height rather than an area.</>,
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
