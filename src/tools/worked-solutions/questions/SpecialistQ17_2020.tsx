// 2020 Specialist Mathematics — Exam 2, MCQ 17. VCAA examination report: 58% correct.
// Acceleration of a particle from a = v dv/dx, given v as a function of position x. Question
// text transcribed from the original paper. Solution is original. Interactive:
// spec-2020-mcq17-per-second (dv/dx is per metre, acceleration is per second; v converts one to
// the other). The report has no comment on this question; the WrongMethod rests on its option
// percentages (A 21%), with dv/dx at x = 2 computed to be exactly −1/4.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const PerSecondWidget = lazyWidget(() => import('../interactives/spec-2020-mcq17-per-second'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 21, B: 58, C: 11, D: 5, E: 5 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="v = \frac{1}{x}" />,
    reason: (
      <>
        Velocity is given in terms of position <Katex tex="x" />, not time, so you can&apos;t just differentiate
        with respect to <Katex tex="t" />. That is the signal to use <Katex tex="a = v\dfrac{dv}{dx}" /> from the
        formula sheet.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{dv}{dx} = -\frac{1}{x^2}" />,
    reason: (
      <>
        Differentiate with respect to <Katex tex="x" />. This is how fast velocity changes <b>per metre</b>{' '}
        travelled; it is not the acceleration yet.
      </>
    ),
  },
  {
    working: <Katex display tex="a = v\frac{dv}{dx} = \frac1x\cdot\left(-\frac{1}{x^2}\right) = -\frac{1}{x^3}" />,
    reason: (
      <>
        Multiplying by <Katex tex="v" /> (metres per second) turns &ldquo;per metre&rdquo; into &ldquo;per
        second&rdquo;. The other formula-sheet form agrees:{' '}
        <Katex tex="\tfrac{d}{dx}\left(\tfrac12v^2\right) = \tfrac{d}{dx}\left(\tfrac12x^{-2}\right) = -x^{-3}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{a = -\frac{1}{2^3} = -\frac18}" />,
    reason: (
      <>
        Substitute <Katex tex="x=2" />. The sign makes sense: <Katex tex="v>0" />, so the particle moves forward, but{' '}
        <Katex tex="v=\tfrac1x" /> shrinks as <Katex tex="x" /> grows, so it is slowing down. Matches option{' '}
        <b>B</b>. Option <b>A</b>, <Katex tex="-\tfrac14" />, is <Katex tex="\tfrac{dv}{dx}" /> alone, without the
        factor of <Katex tex="v" />; option <b>C</b> has the sign wrong; option <b>D</b>, <Katex tex="\tfrac12" />, is
        the velocity itself.
      </>
    ),
  },
]

export default function SpecialistQ17_2020() {
  return (
    <MCQShell
      question={
        <p>
          The velocity, <Katex tex="v\text{ m s}^{-1}" />, of a particle at time <Katex tex="t\geq0" /> seconds and at
          position <Katex tex="x\geq1" /> m from the origin is <Katex tex="v=\dfrac1x" />.
          <br />
          The acceleration of the particle, in <Katex tex="\text{m s}^{-2}" />, when <Katex tex="x=2" /> is
        </p>
      }
      background={
        <Background title="Acceleration when velocity is a function of position">
          <p>
            Acceleration is always <Katex tex="a = \dfrac{dv}{dt}" />. When <Katex tex="v" /> is known in terms of{' '}
            <Katex tex="x" />, the chain rule links the two:
          </p>
          <Katex display tex="a = \frac{dv}{dt} = \frac{dv}{dx}\cdot\frac{dx}{dt} = v\frac{dv}{dx} = \frac{d}{dx}\left(\tfrac12v^2\right)" />
          <p>
            Both forms are on the formula sheet. The units check it: <Katex tex="\tfrac{dv}{dx}" /> is{' '}
            <Katex tex="\text{m s}^{-1}" /> per metre, which is <Katex tex="\text{s}^{-1}" />; times{' '}
            <Katex tex="v" /> in <Katex tex="\text{m s}^{-1}" /> gives <Katex tex="\text{m s}^{-2}" />.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\tfrac14" /> },
        { letter: 'B', content: <Katex tex="-\tfrac18" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\tfrac18" /> },
        { letter: 'D', content: <Katex tex="\tfrac12" /> },
        { letter: 'E', content: <Katex tex="\tfrac14" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="dv/dx is per metre; acceleration is per second">
            <PerSecondWidget />
          </Explore>
          <WrongMethod
            title="Acceleration is the derivative of v, so a = dv/dx"
            source="21% chose A"
            working={<Katex display tex="\frac{dv}{dx} = -\frac{1}{x^2} = -\frac14 \text{ at } x = 2" />}
          >
            Acceleration is the derivative of <Katex tex="v" /> with respect to <b>time</b>. Differentiating{' '}
            <Katex tex="v=\tfrac1x" /> with respect to <Katex tex="x" /> gives the change per metre, and at{' '}
            <Katex tex="x=2" /> the particle covers only half a metre each second, so the true change per second is
            half as big: <Katex tex="\tfrac12\times\left(-\tfrac14\right) = -\tfrac18" />. Whenever <Katex tex="v" /> is
            written in terms of <Katex tex="x" />, reach for <Katex tex="v\tfrac{dv}{dx}" />.
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
