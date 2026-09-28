// 2018 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 65% correct. The
// first time the speed of a particle on an ellipse is a minimum. Question text transcribed
// from the original paper; VCAA printed no diagram and neither does the stem here (guide §7).
// Solution is original; answer B re-derived in sympy and agrees with itute.
//
// Interactive (extras): interactives/spec-2018-mcq13-speed-arrow — the velocity arrow drawn on
// the ellipse beside a graph of |v| against t; the arrow is shortest at the ends of the long
// axis, first at t = π/2. Its toggle shows the option-C slip (setting −3sin t + 4cos t = 0).
// WrongMethod: that option-C slip, which gives tan⁻¹(4/3) exactly (11% chose C; checked in
// sympy, and the speed there is 12√2/5, not a minimum). The report makes no comment on this
// question beyond the percentages.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SpeedArrow = lazyWidget(() => import('../interactives/spec-2018-mcq13-speed-arrow'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 65, C: 11, D: 14, E: 2 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}(t) = 3\cos(t)\underset{\sim}{i} + 4\sin(t)\underset{\sim}{j}" />,
    reason: <>An ellipse with semi-axes <Katex tex="3" /> (across) and <Katex tex="4" /> (up). The question is about <em>speed</em>, which is about how fast the position changes, so the first move is always to differentiate.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = -3\sin(t)\underset{\sim}{i} + 4\cos(t)\underset{\sim}{j}" />,
    reason: <>Differentiate each component separately. This is a <em>vector</em>: an arrow with a direction as well as a length.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{v}\right|^2 = 9\sin^2(t) + 16\cos^2(t)" />,
    reason: <>Speed is the <b>length</b> of that arrow, <Katex tex="\sqrt{(-3\sin t)^2+(4\cos t)^2}" />. Work with its square instead: the square root only grows as its input grows, so both are smallest at the same <Katex tex="t" />, and there is no root to carry around.</>,
  },
  {
    working: <Katex display tex="= 9\left(\sin^2 t+\cos^2 t\right) + 7\cos^2(t)" />,
    reason: <>How would I know to do this? Two trig terms pulling in opposite directions are hard to minimise, but a <Katex tex="\sin^2" /> next to a <Katex tex="\cos^2" /> is a signal for <Katex tex="\sin^2 t+\cos^2 t=1" />. Split <Katex tex="16\cos^2 t" /> into <Katex tex="9\cos^2 t+7\cos^2 t" /> so the identity can absorb the <Katex tex="9" />s.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{v}\right|^2 = 9 + 7\cos^2(t)" />,
    reason: <>Now only one term changes with <Katex tex="t" />, so the minimum can be read off without any calculus.</>,
  },
  {
    working: <Katex display tex="\text{least when } \cos^2(t)=0" />,
    reason: <><Katex tex="\cos^2(t)" /> is never negative, so the smallest it can be is <Katex tex="0" />. The minimum speed is then <Katex tex="\sqrt{9}=3" />. (The largest is <Katex tex="\sqrt{16}=4" />, when <Katex tex="\cos^2(t)=1" />.)</>,
  },
  {
    working: <Katex display tex="\cos(t)=0 \implies t = \frac{\pi}{2},\ \frac{3\pi}{2},\ \dots" />,
    reason: <>The motion repeats every <Katex tex="2\pi" />, so the minimum happens over and over. The question asks for the <b>first</b> with <Katex tex="t\ge0" />, the smallest of these.</>,
  },
  {
    working: <Katex display tex="\boxed{t = \frac{\pi}{2}}" />,
    reason: <>Matches option <b>B</b>. Option <b>D</b> <Katex tex="\left(\tfrac{3\pi}{2}\right)" />, chosen by <Katex tex="14\%" />, is the <em>second</em> such time. Options <b>A</b> <Katex tex="(3)" /> and <b>E</b> <Katex tex="(9)" /> are the minimum speed and its square: values, not times. Sensible: at <Katex tex="t=\tfrac{\pi}{2}" /> the particle is at <Katex tex="(0,4)" />, an end of the <em>long</em> axis, which is where this ellipse is traced most slowly.</>,
  },
]

export default function SpecialistQ13_2018() {
  return (
    <MCQShell
      question={
        <p>
          The position vector of a particle that is moving along a curve at time{' '}
          <Katex tex="t" /> is given by{' '}
          <Katex tex="\underset{\sim}{r}(t)=3\cos(t)\underset{\sim}{i}+4\sin(t)\underset{\sim}{j},\ t\ge0" />.
          The <b>first</b> time when the speed of the particle is a minimum is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="3" /> },
        { letter: 'B', content: <Katex tex="\dfrac{\pi}{2}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\tan^{-1}\!\left(\dfrac43\right)" /> },
        { letter: 'D', content: <Katex tex="\dfrac{3\pi}{2}" /> },
        { letter: 'E', content: <Katex tex="9" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background>
          <p>
            Velocity <Katex tex="\underset{\sim}{v}=\dot{\underset{\sim}{r}}" /> is a vector: at
            each moment it is an arrow pointing the way the particle is heading. Speed is the
            length of that arrow, <Katex tex="\left|\underset{\sim}{v}\right|" />, a single
            non-negative number. Minimising{' '}
            <Katex tex="\left|\underset{\sim}{v}\right|^2" /> instead gives the same{' '}
            <Katex tex="t" /> and avoids differentiating a square root; here the square simplifies
            so far that no differentiation is needed at all.
          </p>
          <p>
            Note the word <em>first</em>. Periodic motion produces the minimum repeatedly,
            and the options include a later one to catch anyone who solves without checking
            which solution is smallest.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Speed is the length of the velocity arrow: shortest at the ends of the long axis">
            <SpeedArrow />
          </Explore>
          <WrongMethod
            title="Speed is least when the velocity is zero, so set −3sin(t) + 4cos(t) = 0"
            source="11% chose C"
            working={
              <>
                <Katex display tex="-3\sin(t)+4\cos(t)=0" />
                <Katex display tex="\tan(t)=\tfrac43 \implies t=\tan^{-1}\!\left(\tfrac43\right)" />
              </>
            }
          >
            <p>
              This treats the velocity as if it were a number. The{' '}
              <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> parts
              point in different directions and cannot be added together; the velocity is zero
              only if <em>both</em> parts are zero, and <Katex tex="\sin t" /> and{' '}
              <Katex tex="\cos t" /> are never zero at the same time. At{' '}
              <Katex tex="t=\tan^{-1}\!\left(\tfrac43\right)" /> the speed is{' '}
              <Katex tex="\sqrt{9+7\cdot\tfrac{9}{25}}=\tfrac{12\sqrt2}{5}\approx3.39" />, which
              is more than the minimum of <Katex tex="3" />.
            </p>
            <p>
              To catch it: speed always means{' '}
              <Katex tex="\sqrt{(\text{i-part})^2+(\text{j-part})^2}" />. If your working
              never squares the components, you have not found a speed.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
