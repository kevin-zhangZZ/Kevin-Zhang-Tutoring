// 2017 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 46% correct.
// Second derivative of an implicitly-defined function at a point, via the product and chain rules.
// Question text transcribed from the original paper; solution is original.
// Widget: interactives/spec-2017-mcq6-slope-change (the gradient along the solution curve through
// (0, 1); its rate of change is 3π/8, and holding y at 1 gives option D's π/4). WrongMethod: treating
// arctan(y) as a constant (30% D), computed.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SlopeWidget = lazyWidget(() => import('../interactives/spec-2017-mcq6-slope-change'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 46, C: 10, D: 30, E: 8 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\dfrac{d^2y}{dx^2} = \dfrac{d}{dx}\bigl(e^x\arctan(y)\bigr) = e^x\arctan(y) + \dfrac{e^x}{1+y^2}\dfrac{dy}{dx}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dy}{dx} = e^x\arctan(y)" />,
    reason: <>The given first derivative. It is written in terms of both <Katex tex="x" /> and <Katex tex="y" />, so whatever we do to it has to treat <Katex tex="y" /> as a function of <Katex tex="x" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\frac{d^2y}{dx^2} = \frac{d}{dx}\Bigl(e^x\arctan(y)\Bigr)" />
        <Katex display tex="= e^x\arctan(y) + e^x\cdot\frac{1}{1+y^2}\cdot\frac{dy}{dx}" />
      </>
    ),
    reason: <>The second derivative is the derivative of the first, so differentiate the right-hand side with respect to <Katex tex="x" />. It is a product, so use the product rule. The trap is <Katex tex="\arctan(y)" />: it has no <Katex tex="x" /> in sight, but <Katex tex="y" /> changes as <Katex tex="x" /> changes, so the chain rule gives <Katex tex="\tfrac{1}{1+y^2}\cdot\tfrac{dy}{dx}" />, not zero.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{at } (0,1): \quad \frac{dy}{dx} &= e^0\arctan(1) \\ &= \frac{\pi}{4} \end{aligned}" />,
    reason: <>First evaluate the given first derivative at the point, since it feeds into the second derivative.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\frac{d^2y}{dx^2}\bigg|_{(0,1)} = e^0\arctan(1) + \frac{e^0}{1+1^2}\cdot\frac{\pi}{4}" />
        <Katex display tex="= \frac{\pi}{4} + \frac{1}{2}\cdot\frac{\pi}{4} = \frac{\pi}{4}+\frac{\pi}{8}" />
      </>
    ),
    reason: <>Substitute <Katex tex="x=0" />, <Katex tex="y=1" /> and <Katex tex="\tfrac{dy}{dx}=\tfrac{\pi}{4}" /> from the row above, using <Katex tex="\arctan(1)=\tfrac{\pi}{4}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{d^2y}{dx^2}\bigg|_{(0,1)} = \frac{3\pi}{8}}" />,
    reason: <>Matches option <b>B</b>. Option D (30%), <Katex tex="\tfrac{\pi}{4}" />, is just the first term: what you get by treating <Katex tex="\arctan(y)" /> as a constant, forgetting that it also varies with <Katex tex="x" />.</>,
  },
]

export default function SpecialistQ6_2017() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="\dfrac{dy}{dx} = e^x\arctan(y)" />, the value of <Katex tex="\dfrac{d^2y}{dx^2}" />{' '}
          at the point <Katex tex="(0,1)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac12" /> },
        { letter: 'B', content: <Katex tex="\dfrac{3\pi}{8}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="-\dfrac12" /> },
        { letter: 'D', content: <Katex tex="\dfrac{\pi}{4}" /> },
        { letter: 'E', content: <Katex tex="-\dfrac{\pi}{8}" /> },
      ]}
      background={
        <p>
          When <Katex tex="y" /> is a function of <Katex tex="x" />, differentiating anything in <Katex tex="y" /> with
          respect to <Katex tex="x" /> uses the chain rule:{' '}
          <Katex tex="\tfrac{d}{dx}f(y) = f'(y)\,\tfrac{dy}{dx}" />. For example,{' '}
          <Katex tex="\tfrac{d}{dx}\arctan(y) = \tfrac{1}{1+y^2}\,\tfrac{dy}{dx}" />.
        </p>
      }
      extras={
        <>
          <Explore title="Why d²y/dx² has two terms: moving along the curve, y changes too">
            <SlopeWidget />
          </Explore>
          <WrongMethod
            title="arctan(y) has no x in it, so treat it as a constant"
            source="30% chose D"
            working={
              <>
                <Katex display tex="\frac{d}{dx}\Bigl(e^x\arctan(y)\Bigr) = e^x\arctan(y)" />
                <Katex display tex="\text{at } (0,1):\ e^0\arctan(1) = \frac{\pi}{4}" />
              </>
            }
          >
            <Katex tex="y" /> is not a constant: it is the height of the solution curve, and it rises as{' '}
            <Katex tex="x" /> increases (at <Katex tex="(0,1)" />, <Katex tex="\tfrac{dy}{dx}=\tfrac{\pi}{4}" />). So{' '}
            <Katex tex="\arctan(y)" /> changes too, and the chain rule adds{' '}
            <Katex tex="\tfrac{e^x}{1+y^2}\cdot\tfrac{dy}{dx}=\tfrac{\pi}{8}" />. A warning sign: this
            &ldquo;second derivative&rdquo; is the same number as <Katex tex="\tfrac{dy}{dx}" /> itself at the point.
          </WrongMethod>
        </>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
