// 2023 Specialist NHT — Exam 2, MCQ 11. The NHT report gives the answer key only, with no
// statistics. Vector kinematics: which graph shows the path and direction of
// r(t) = (5 + 2cos t)i + 3(1 + sin t)j for π/2 ≤ t ≤ 3π/2. Question text transcribed from the
// original paper; the five option graphs are cropped from the original VCAA exam PDF. Solution is
// original; the answer E agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import optASrc from './spec-2023nht-mcq11-optA.png'
import optBSrc from './spec-2023nht-mcq11-optB.png'
import optCSrc from './spec-2023nht-mcq11-optC.png'
import optDSrc from './spec-2023nht-mcq11-optD.png'
import optESrc from './spec-2023nht-mcq11-optE.png'

function Opt({ src, letter, alt }: { src: string; letter: string; alt: string }) {
  return <img loading="lazy" decoding="async" src={src} alt={`Option ${letter}, cropped from the VCAA paper: ${alt}`} className="w-full max-w-[260px]" />
}

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'E' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x=5+2\cos(t),\quad y=3+3\sin(t)" />,
    reason: <>Split the position vector into its <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> components: these are the coordinates of the particle at time <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\frac{(x-5)^2}{4}+\frac{(y-3)^2}{9}=1" />,
    reason: <>Use <Katex tex="\cos^2(t)+\sin^2(t)=1" /> with <Katex tex="\cos(t)=\tfrac{x-5}{2}" /> and <Katex tex="\sin(t)=\tfrac{y-3}{3}" />. The path lies on an ellipse centred at <Katex tex="(5,3)" />, reaching 2 units left and right and 3 units up and down.</>,
    more: <>So the full ellipse runs from <Katex tex="x=3" /> to <Katex tex="x=7" /> and from <Katex tex="y=0" /> to <Katex tex="y=6" />. Option D&apos;s curve reaches <Katex tex="x=8" /> and option B&apos;s only reaches <Katex tex="y=5" />, so neither lies on this ellipse.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}t=\tfrac{\pi}{2}&:\ (5,\,6)\\ t=\pi&:\ (3,\,3)\\ t=\tfrac{3\pi}{2}&:\ (5,\,0)\end{aligned}" />,
    reason: <>Substitute the start, middle and end of the time interval. The particle starts at the top of the ellipse, passes through its leftmost point and finishes at the bottom.</>,
    more: <>Over <Katex tex="\tfrac{\pi}{2}\le t\le\tfrac{3\pi}{2}" />, <Katex tex="\cos(t)\le0" />, so <Katex tex="x\le5" />: only the left half of the ellipse is traced.</>,
  },
  {
    working: <Katex display tex="\text{left half, from }(5,6)\text{ down to }(5,0)" />,
    reason: <>Check the options against this. A is the top half, from <Katex tex="(7,3)" /> to <Katex tex="(3,3)" />. C is the right half, travelled upwards. B and D are not on the ellipse. E is the left half, starting at <Katex tex="(5,6)" /> with the arrow pointing down.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{E}}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: <>Option A is the same ellipse over <Katex tex="0\le t\le\pi" />, and option C is the right half over <Katex tex="-\tfrac{\pi}{2}\le t\le\tfrac{\pi}{2}" />: both come from using the wrong interval of <Katex tex="t" />.</>,
  },
]

export default function SpecialistQ11_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          The position of a moving particle at time <Katex tex="t" /> is given by{' '}
          <Katex tex="\underset{\sim}{r}(t)=\big(5+2\cos(t)\big)\underset{\sim}{i}+3\big(1+\sin(t)\big)\underset{\sim}{j}" />, where{' '}
          <Katex tex="\dfrac{\pi}{2}\le t\le\dfrac{3\pi}{2}" />.
          <br />
          The graph that shows the path and the direction taken by the moving particle is
        </p>
      }
      options={[
        { letter: 'A', content: <Opt src={optASrc} letter="A" alt="the upper half of an ellipse from (7, 3) over (5, 6) to (3, 3), arrow pointing down at the left end" /> },
        { letter: 'B', content: <Opt src={optBSrc} letter="B" alt="a curve from (5, 0) through x ≈ 3.5 up to (5, 5), arrow pointing up" /> },
        { letter: 'C', content: <Opt src={optCSrc} letter="C" alt="the right half of an ellipse from (5, 0) through (7, 3) to (5, 6), arrow pointing up" /> },
        { letter: 'D', content: <Opt src={optDSrc} letter="D" alt="a curve from (5, 1) through (8, 3) to (5, 5), arrow pointing up" /> },
        { letter: 'E', content: <Opt src={optESrc} letter="E" alt="the left half of an ellipse from (5, 6) through (3, 3) to (5, 0), arrow pointing down" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
