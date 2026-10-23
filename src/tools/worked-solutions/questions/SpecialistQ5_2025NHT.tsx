// 2025 Specialist NHT — Exam 2, MCQ 5. The NHT report gives the answer key only, with no
// statistics. Complex numbers: the equation of a ray from its start point and direction on the
// Argand plane. Question text transcribed from the original paper (the 2025 NHT paper is
// image-only, so read from the rendered page); the Argand diagram is cropped from the original
// VCAA exam PDF. Solution is original; the answer B agrees with the report's key. Distractors
// checked by form: C has the reversed direction, D the start point 2 − 3i, A both.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import raySrc from './spec-2025nht-mcq5-ray.png'

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img loading="lazy" decoding="async"
      src={raySrc}
      alt="VCAA's Argand diagram, both axes from −3 to 3: a ray starts at an open circle at −2 + 3i and runs down to the right through i and 1, with an arrow beyond 3 − 2i"
      className="w-full max-w-[340px]"
    />
  </div>
)

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{Arg}(z-z_0)=\theta" />,
    reason: <>This is the ray that starts at <Katex tex="z_0" /> (not included) and heads off at angle <Katex tex="\theta" /> to the positive real direction: <Katex tex="z-z_0" /> is the arrow from <Katex tex="z_0" /> to <Katex tex="z" />.</>,
    more: <>The start point is excluded because <Katex tex="\operatorname{Arg}(0)" /> is undefined, which is why VCAA draws it as an open circle.</>,
  },
  {
    working: <Katex display tex="z_0=-2+3i\ \Rightarrow\ z-z_0=z+2-3i" />,
    reason: <>The open circle is at <Katex tex="(-2,3)" />. Subtracting <Katex tex="-2+3i" /> flips both signs.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&(-2,3)\to(1,0):\ \text{right } 3,\ \text{down } 3\\&\Rightarrow\ \theta=-\frac{\pi}{4}\end{aligned}" />,
    reason: <>Read the direction off the grid: the ray passes through <Katex tex="1" /> on the real axis, so it moves right and down by equal amounts. That is <Katex tex="\tfrac{\pi}{4}" /> <b>below</b> the positive real direction.</>,
  },
  {
    working: <Katex display tex="\boxed{\operatorname{Arg}(z+2-3i)=-\frac{\pi}{4}}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option <b>C</b>&apos;s <Katex tex="\tfrac{3\pi}{4}" /> is the opposite direction: a ray from <Katex tex="-2+3i" /> going up and to the left. Option <b>D</b> starts at <Katex tex="2-3i" /> (the sign of <Katex tex="z_0" /> not flipped), and option <b>A</b> makes both slips.</>,
  },
]

export default function SpecialistQ5_2025NHT() {
  return (
    <MCQShell
      question={<p>The equation of the ray on the Argand plane above is</p>}
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="\operatorname{Arg}(z-2+3i)=\dfrac{3\pi}{4}" /> },
        { letter: 'B', content: <Katex tex="\operatorname{Arg}(z+2-3i)=-\dfrac{\pi}{4}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\operatorname{Arg}(z+2-3i)=\dfrac{3\pi}{4}" /> },
        { letter: 'D', content: <Katex tex="\operatorname{Arg}(z-2+3i)=-\dfrac{\pi}{4}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
