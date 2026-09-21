// 2018 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 65% correct. The
// first time the speed of a particle on an ellipse is a minimum. Question text transcribed
// from the original paper; VCAA printed no diagram and neither does the stem here (guide §7).
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 65, C: 11, D: 14, E: 2 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}(t) = 3\cos(t)\underset{\sim}{i} + 4\sin(t)\underset{\sim}{j}" />,
    reason: <>An ellipse with semi-axes <Katex tex="3" /> and <Katex tex="4" />. Speed is the magnitude of velocity, so differentiate first.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = -3\sin(t)\underset{\sim}{i} + 4\cos(t)\underset{\sim}{j}" />,
    reason: <>Component by component.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{v}\right|^2 = 9\sin^2(t) + 16\cos^2(t)" />,
    reason: <>Minimise the square of the speed rather than the speed itself — same minimising <Katex tex="t" />, no square root to differentiate.</>,
  },
  {
    working: <Katex display tex="= 9\left(\sin^2 t+\cos^2 t\right) + 7\cos^2(t) = 9 + 7\cos^2(t)" />,
    reason: <>Using the Pythagorean identity to collapse it to a single trigonometric term. No calculus is needed from here.</>,
  },
  {
    working: <Katex display tex="9+7\cos^2(t) \ \text{ is least when } \cos^2(t)=0" />,
    reason: <><Katex tex="\cos^2" /> is never negative, so the smallest it can be is zero, giving a minimum speed of <Katex tex="\sqrt9=3" />.</>,
  },
  {
    working: <Katex display tex="\cos(t)=0 \implies t = \frac{\pi}{2},\ \frac{3\pi}{2},\ \dots" />,
    reason: <>Infinitely many times, and the question asks for the <em>first</em> with <Katex tex="t\ge0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t = \frac{\pi}{2}}" />,
    reason: <>Matches option <b>B</b>. Option <b>D</b> <Katex tex="\left(\tfrac{3\pi}{2}\right)" />, chosen by <Katex tex="14\%" />, is the <em>second</em> such time. Sensible: at <Katex tex="t=\tfrac{\pi}{2}" /> the particle is at <Katex tex="(0,4)" />, the end of the <em>long</em> axis — which is exactly where an ellipse traced this way moves slowest.</>,
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
            Speed is <Katex tex="\left|\underset{\sim}{v}\right|" />, a scalar, so it always
            involves a square root. Minimising <Katex tex="\left|\underset{\sim}{v}\right|^2" />{' '}
            instead gives the same answer and avoids differentiating one — and here the
            square simplifies so far that no differentiation is needed at all.
          </p>
          <p>
            Note the word <em>first</em>. Periodic motion produces the minimum repeatedly,
            and the options include a later one to catch anyone who solves without checking
            which solution is smallest.
          </p>
        </Background>
      }
    />
  )
}
