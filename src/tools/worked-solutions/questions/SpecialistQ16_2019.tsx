// 2019 Specialist Mathematics — Exam 2, MCQ 16. VCAA examination report: 49% correct.
// Acceleration of a particle from a = v dv/dx, given v as a function of position x. Question
// text transcribed from the original paper. Solution is original; checked in sympy, and itute
// also gives A.
//
// Extras: interactives/spec-2019-mcq16-per-second.tsx plots v = eˣ sin(x) against x with a
// draggable point; the run is the distance covered in the next 0.1 s (v × 0.1) and the rise is
// the tangent's change in v over it, so rise ÷ 0.1 = v·dv/dx. A toggle draws the 0.1-metre
// triangle (what dv/dx, option C, measures). WrongMethod: stopping at dv/dx (option C exactly;
// 26% chose C, and the report points out that C is dv/dx).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const PerSecondWidget = lazyWidget(() => import('../interactives/spec-2019-mcq16-per-second'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 49, B: 16, C: 26, D: 6, E: 2 },
  answer: 'A',
  noAnswer: 1,
  comment: <><Katex tex="a=v\dfrac{dv}{dx}" />. Note that option C is <Katex tex="\dfrac{dv}{dx}" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="v = e^x\sin(x)" />,
    reason: <>Notice what <Katex tex="v" /> is written in terms of: position <Katex tex="x" />, not time. We can&apos;t differentiate with respect to <Katex tex="t" /> without knowing <Katex tex="x" /> as a function of <Katex tex="t" />, and we don&apos;t. That is the signal to use <Katex tex="a=v\dfrac{dv}{dx}" /> (see Background).</>,
  },
  {
    working: <Katex display tex="\frac{dv}{dx} = e^x\sin(x) + e^x\cos(x)" />,
    reason: <>Product rule: differentiate <Katex tex="e^x" />, then <Katex tex="\sin(x)" />. This is only the change in velocity per <em>metre</em>, not yet the acceleration.</>,
  },
  {
    working: <Katex display tex="= e^x\big(\sin(x)+\cos(x)\big)" />,
    reason: <>Factorise out <Katex tex="e^x" />. This expression is option C, which is why stopping here is so tempting.</>,
  },
  {
    working: <Katex display tex="a = v\frac{dv}{dx} = e^x\sin(x)\cdot e^x\big(\sin(x)+\cos(x)\big)" />,
    reason: <>Multiply by <Katex tex="v" /> (metres per second) to turn &ldquo;per metre&rdquo; into &ldquo;per second&rdquo;. Drag the point in the diagram below to see why.</>,
  },
  {
    working: <Katex display tex="a = e^{2x}\Big(\sin^2(x) + \sin(x)\cos(x)\Big)" />,
    reason: <>Multiply out: <Katex tex="e^x\cdot e^x=e^{2x}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = e^{2x}\left(\sin^2(x) + \tfrac12\sin(2x)\right)}" />,
    reason: <>None of the options has <Katex tex="\sin(x)\cos(x)" />, but A has <Katex tex="\sin(2x)" />: the double-angle formula <Katex tex="\sin(2x)=2\sin(x)\cos(x)" /> turns one into <Katex tex="\tfrac12\sin(2x)" />. Matches option <b>A</b>. Option <b>C</b> is <Katex tex="\tfrac{dv}{dx}" /> (as the report notes), <b>B</b> has only one factor of <Katex tex="e^x" />, <b>D</b> is <Katex tex="\tfrac12v^2" /> itself rather than its derivative, and <b>E</b> differentiates only the <Katex tex="\sin(x)" /> factor.</>,
  },
]

export default function SpecialistQ16_2019() {
  return (
    <MCQShell
      question={
        <p>
          A variable force acts on a particle, causing it to move in a straight line. At time <Katex tex="t" /> seconds,
          where <Katex tex="t\geq0" />, its velocity <Katex tex="v" /> metres per second and position <Katex tex="x" />{' '}
          metres from the origin are such that <Katex tex="v = e^x\sin(x)" />.
          <br />
          The acceleration of the particle, in ms<sup>−2</sup>, can be expressed as
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="e^{2x}\left(\sin^2(x) + \tfrac12\sin(2x)\right)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="e^x\sin(x)\big(\sin(x)+\cos(x)\big)" /> },
        { letter: 'C', content: <Katex tex="e^x\big(\sin(x)+\cos(x)\big)" /> },
        { letter: 'D', content: <Katex tex="\tfrac12 e^{2x}\sin^2(x)" /> },
        { letter: 'E', content: <Katex tex="e^x\cos(x)" /> },
      ]}
      background={
        <Background title="Acceleration when v is given in terms of x">
          <p>
            Acceleration is always the rate of change of velocity with respect to <em>time</em>,{' '}
            <Katex tex="a=\dfrac{dv}{dt}" />. When <Katex tex="v" /> is known as a function of position, the chain rule
            goes through <Katex tex="x" />:
          </p>
          <Katex display tex="a=\frac{dv}{dt}=\frac{dv}{dx}\cdot\frac{dx}{dt}=v\frac{dv}{dx}=\frac{d}{dx}\left(\tfrac12v^2\right)" />
          <p>
            In words: <Katex tex="\dfrac{dv}{dx}" /> is how much the velocity changes per metre, and{' '}
            <Katex tex="v" /> is how many metres are covered per second, so their product is the change per second.
          </p>
        </Background>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="Per metre × metres per second = per second: why a = v dv/dx">
            <PerSecondWidget />
          </Explore>
          <WrongMethod
            title="Acceleration is the derivative of velocity, so differentiate v"
            source="26% chose C"
            working={<Katex display tex="a=\frac{dv}{dx}=e^x\big(\sin(x)+\cos(x)\big)\quad\text{(option C)}" />}
          >
            <p>
              Acceleration is the derivative of velocity with respect to <em>time</em>. Here <Katex tex="v" /> is written
              in terms of <Katex tex="x" />, so <Katex tex="\tfrac{d}{dx}" /> gives the change in velocity per metre. The
              units show it: <Katex tex="\tfrac{\text{m/s}}{\text{m}}=\text{s}^{-1}" />, not <Katex tex="\text{m/s}^2" />.
              Near <Katex tex="x=\pi" /> this would give about <Katex tex="-e^{\pi}\approx-23" />, while the particle is
              barely moving and its true acceleration is close to <Katex tex="0" />.
            </p>
            <p>
              Catch it by asking what <Katex tex="v" /> is a function of. If it is <Katex tex="x" />, use{' '}
              <Katex tex="a=v\tfrac{dv}{dx}" /> or <Katex tex="\tfrac{d}{dx}\left(\tfrac12v^2\right)" />.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
