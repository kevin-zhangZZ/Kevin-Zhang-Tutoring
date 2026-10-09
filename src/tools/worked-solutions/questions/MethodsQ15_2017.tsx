// 2017 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 58% correct, no written
// comment. Maximising the area of a rectangle with one corner on y = −x³ + 8. Question text
// transcribed from the original paper; the figure is a crop of VCAA's own artwork.
// Answer B verified with sympy and agrees with itute. Solution is original.
// Interactive: meth-2017-mcq15-best-rectangle (drag C along the curve; the rectangle and the graph
// of A(u) = 8u − u⁴ with its tangent update together; flat tangent at u = ∛2, A = 6∛2).
// WrongMethod: stopping at u = ∛2 (option A, 14%).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import diagramSrc from './meth-2017-mcq15-rectangle.png'

const RectangleWidget = lazyWidget(() => import('../interactives/meth-2017-mcq15-best-rectangle'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 58, C: 7, D: 9, E: 11 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="A = uv" />,
    reason: (
      <>
        The rectangle runs from the origin <Katex tex="A" /> to the opposite corner <Katex tex="C(u,v)" />, so its width is{' '}
        <Katex tex="u" /> and its height is <Katex tex="v" />.
      </>
    ),
  },
  {
    working: <Katex display tex="v = -u^3+8" />,
    reason: (
      <>
        <Katex tex="(u,v)" /> lies on the curve. Two unknowns but one link between them: substituting turns the area
        into a function of <Katex tex="u" /> alone, which is what you need before you can differentiate.
      </>
    ),
  },
  {
    working: <Katex display tex="A(u) = u(-u^3+8) = 8u-u^4" />,
    reason: (
      <>
        Expanding. The domain is <Katex tex="0<u<2" />: <Katex tex="C" /> must stay on the curve above the{' '}
        <Katex tex="x" />-axis, and <Katex tex="-u^3+8=0" /> at <Katex tex="u=2" />.
      </>
    ),
  },
  {
    working: <Katex display tex="A'(u) = 8-4u^3" />,
    reason: (
      <>
        A maximum inside the interval is where the graph of <Katex tex="A(u)" /> is flat, so find where the derivative
        is zero.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} 8-4u^3&=0 \\ u^3&=2 \\ u&=\sqrt[3]{2} \end{aligned}" />,
    reason: (
      <>
        Why this is a maximum: <Katex tex="A(0)=0" /> and <Katex tex="A(2)=0" /> (no width, then no height), and{' '}
        <Katex tex="A" /> is positive in between, so the only stationary point must be the top. Or check signs:{' '}
        <Katex tex="A'(1)=4>0" /> and <Katex tex="A'(1.5)=-5.5<0" />. On CAS,{' '}
        <Cas fn="fMax">{'fMax(8u-u^4,u)|0<u<2'}</Cas> gives this <Katex tex="u" />, not the maximum area.
      </>
    ),
  },
  {
    working: <Katex display tex="v = -2+8 = 6" />,
    reason: (
      <>
        Substitute back into the curve. Because <Katex tex="u^3=2" /> exactly, <Katex tex="v=-u^3+8=6" />, with no
        decimals needed.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{A = uv = 6\sqrt[3]{2}}" />,
    reason: (
      <>
        Matches option <b>B</b>, about <Katex tex="7.56" />. Option A, <Katex tex="\sqrt[3]{2}" />, is <Katex tex="u" />:
        where the maximum happens, not the maximum area. Sanity check against the picture: the rectangle sits inside a{' '}
        <Katex tex="2\times8" /> box, so its area must be under <Katex tex="16" />, and option C is that whole box.
      </>
    ),
  },
]

export default function MethodsQ15_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A rectangle <Katex tex="ABCD" /> has vertices <Katex tex="A(0,0)" />,{' '}
            <Katex tex="B(u,0)" />, <Katex tex="C(u,v)" /> and <Katex tex="D(0,v)" />, where{' '}
            <Katex tex="(u,v)" /> lies on the graph of <Katex tex="y=-x^3+8" />, as shown
            below.
          </p>
          <p>The maximum area of the rectangle is</p>
        </>
      }
      diagram={
        <img loading="lazy" decoding="async"
          src={diagramSrc}
          alt="The curve y = −x³ + 8 in the first quadrant, from (0, 8) down to (2, 0), with a rectangle drawn from the origin to the point C(u, v) on the curve, from the original 2017 VCAA exam paper"
          className="w-full max-w-[230px]"
        />
      }
      options={[
        { letter: 'A', content: <Katex tex="\sqrt[3]{2}" /> },
        { letter: 'B', content: <Katex tex="6\sqrt[3]{2}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="16" /> },
        { letter: 'D', content: <Katex tex="8" /> },
        { letter: 'E', content: <Katex tex="3\sqrt[3]{2}" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Too narrow or too flat: the best rectangle is in between">
            <RectangleWidget />
          </Explore>
          <WrongMethod
            title="I found u = ∛2, so the answer is ∛2"
            source="14% chose A"
            working={<Katex display tex="8-4u^3=0 \implies u=\sqrt[3]{2}\approx1.26" />}
          >
            <p>
              Setting <Katex tex="A'(u)=0" /> finds <em>where</em> the maximum happens: the width of the best rectangle.
              The question asks for the maximum <em>area</em>, so substitute back:{' '}
              <Katex tex="A=\sqrt[3]{2}\times6=6\sqrt[3]{2}" />. CAS has the same trap built in, because fMax returns the
              value of <Katex tex="u" />, not the maximum. To catch it, reread the last line of the question and ask
              whether your number is a length or an area: a rectangle about <Katex tex="1.26" /> wide and <Katex tex="6" />{' '}
              tall has area about <Katex tex="7.56" />, not <Katex tex="1.26" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
