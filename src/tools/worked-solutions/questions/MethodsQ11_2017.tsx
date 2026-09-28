// 2017 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 72% correct.
// Finding a and b from the positions of a cubic's turning points. Question text
// transcribed from the original paper; solution is original.
// Checked in sympy: f'(-1) = f'(3) = 0 gives a = -3, b = -9 (D), agreeing with the report and itute.
// Distractors computed: A (-2, -3) is exactly what f(-1) = f(3) = 0 gives; C (3, -9) is exactly
// f'(x) = 3(x - 1)(x + 3) (turning points at -3 and 1); B and E have the maximum at x = -1 but the
// minimum at x = -1/3 and x = 5.
// Interactive: meth-2017-mcq11-turning (sliders for a and b, f above f', turning points sit above
// the zeros of f'; buttons load each option). WrongMethods: options A and C (10% each).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TurningWidget = lazyWidget(() => import('../interactives/meth-2017-mcq11-turning'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 5, C: 10, D: 72, E: 3 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)=3x^2+2ax+b" />,
    reason: <>Turning points are where the gradient is zero, so information about them is information about <Katex tex="f'" />. Differentiate <Katex tex="f(x)=x^3+ax^2+bx" />.</>,
  },
  {
    working: <Katex display tex="f'(-1)=0 \text{ and } f'(3)=0" />,
    reason: <>A local maximum and a local minimum are both stationary points, so both <Katex tex="x" />-values make the <em>derivative</em> zero (not <Katex tex="f" /> itself). Two unknowns, two equations.</>,
  },
  {
    working: <Katex display tex="f'(x)=3(x+1)(x-3)" />,
    reason: <><Katex tex="f'" /> is a quadratic with leading coefficient <Katex tex="3" /> and zeros <Katex tex="-1" /> and <Katex tex="3" />, so it must be this. A zero at <Katex tex="x=-1" /> means a factor <Katex tex="(x+1)" />. This is quicker than solving <Katex tex="3-2a+b=0" /> and <Katex tex="27+6a+b=0" /> simultaneously, which gives the same answer.</>,
  },
  {
    working: <Katex display tex="=3(x^2-2x-3)=3x^2-6x-9" />,
    reason: <>Expanding.</>,
  },
  {
    working: <Katex display tex="2a=-6 \implies a=-3, \qquad b=-9" />,
    reason: <>Matching coefficients with <Katex tex="3x^2+2ax+b" />: the <Katex tex="x" />-coefficient is <Katex tex="2a" /> and the constant is <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a=-3 \text{ and } b=-9}" />,
    reason: <>Matches option <b>D</b>. Check the shape: <Katex tex="f'(x)=3(x+1)(x-3)" /> is positive, then negative, then positive, so <Katex tex="f" /> rises to the maximum at <Katex tex="x=-1" />, falls, and turns up at the minimum <Katex tex="x=3" />, as stated. Option A (10%) is what <Katex tex="f(-1)=f(3)=0" /> gives, and option C (10%) is what <Katex tex="3(x-1)(x+3)" /> gives — both below.</>,
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
      extras={
        <>
          <Explore title="Turning points sit above the zeros of f′">
            <TurningWidget />
          </Explore>
          <WrongMethod
            title="Turning points at x = −1 and x = 3, so f(−1) = 0 and f(3) = 0"
            source="10% chose A"
            working={
              <>
                <Katex display tex="f(-1)=-1+a-b=0" />
                <Katex display tex="f(3)=27+9a+3b=0" />
                <Katex display tex="\implies a=-2,\ b=-3" />
              </>
            }
          >
            That makes <Katex tex="-1" /> and <Katex tex="3" /> the <em>x-intercepts</em> of <Katex tex="f" />, not
            its turning points. Load option A in the widget: the graph cuts the axis at <Katex tex="-1" /> and{' '}
            <Katex tex="3" /> but turns at <Katex tex="x=\tfrac{2\pm\sqrt{13}}{3}" />, about <Katex tex="-0.54" /> and{' '}
            <Katex tex="1.87" />. A turning point is where the gradient is zero, so the conditions go on{' '}
            <Katex tex="f'" />. To test any option, substitute it into <Katex tex="f'(-1)" />: for A,{' '}
            <Katex tex="f'(-1)=3+4-3=4\neq0" />.
          </WrongMethod>
          <WrongMethod
            title="Zeros at −1 and 3, so the factors are (x − 1) and (x + 3)"
            source="10% chose C"
            working={
              <>
                <Katex display tex="3(x-1)(x+3)=3x^2+6x-9" />
                <Katex display tex="\implies a=3,\ b=-9" />
              </>
            }
          >
            Those factors are zero at <Katex tex="x=1" /> and <Katex tex="x=-3" />, so the turning points land in
            the mirror-image places: maximum at <Katex tex="-3" />, minimum at <Katex tex="1" />. A zero at{' '}
            <Katex tex="x=-1" /> needs <Katex tex="x+1=0" />, the factor <Katex tex="(x+1)" />. Substituting back
            catches it: with <Katex tex="a=3" />, <Katex tex="f'(-1)=3-6-9=-12\neq0" />.
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
