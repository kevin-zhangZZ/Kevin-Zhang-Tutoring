// 2019 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 35% correct — the
// hardest MCQ on the paper. A particle moving along the x-axis is given a constant acceleration
// perpendicular to its velocity; describe the resulting motion. The word "force" is flavour
// text here: the mathematics is pure vector kinematics (antidifferentiate a constant
// acceleration vector), with no force analysis, so this question is unaffected by the removal
// of Mechanics from the study design. Question text transcribed from the original paper; VCAA
// printed no diagram, so the path shown is this site's own explanatory figure (matplotlib).
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import pathSrc from './spec-2019-mcq15-path.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 17, C: 12, D: 17, E: 35 },
  noAnswer: 1,
  answer: 'E',
  comment: <>Antidifferentiate to find <Katex tex="\underset{\sim}{r}(t)" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}(t) = \lambda\underset{\sim}{j} \quad (\lambda<0, \text{ constant})" />,
    reason: <>The acceleration is entirely in the <Katex tex="\underset{\sim}{j} " /> direction — perpendicular to the initial motion, which is along the <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = \int\underset{\sim}{a}\,dt = \lambda t\,\underset{\sim}{j} + \underset{\sim}{c}, \qquad \underset{\sim}{v}(0)=u\underset{\sim}{i} \implies \underset{\sim}{c}=u\underset{\sim}{i}" />,
    reason: <>Antidifferentiate component by component, using the given initial velocity to fix the constant vector.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = u\,\underset{\sim}{i} + \lambda t\,\underset{\sim}{j}" />,
    reason: <>The <Katex tex="\underset{\sim}{i} " /> component never changes — nothing accelerates the particle horizontally — while the <Katex tex="\underset{\sim}{j} " /> component grows steadily negative.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}(t) = ut\,\underset{\sim}{i} + \dfrac{\lambda t^2}{2}\,\underset{\sim}{j}" />,
    reason: <>Antidifferentiate again, taking the particle to start at the origin.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x = ut \implies t = \dfrac{x}{u}" />
        <Katex display tex="y = \dfrac{\lambda}{2}\left(\dfrac{x}{u}\right)^2 = \dfrac{\lambda}{2u^2}x^2" />
      </>
    ),
    reason: <>Eliminate <Katex tex="t" /> to get the cartesian path. <Katex tex="y" /> is a constant multiple of <Katex tex="x^2" /> — a parabola.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={pathSrc} alt="Parabolic path: the particle starts at the origin moving right along the x-axis and curves downward under a constant downward acceleration" className="w-full max-w-[320px]" />
      </div>
    ),
    reason: <>Exactly the projectile picture: constant horizontal velocity, constant vertical acceleration.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Option E — the particle moves along a parabola}}" />,
    reason: <>Checking the others: the speed <Katex tex="\sqrt{u^2+\lambda^2t^2}" /> <em>increases</em>, so A and B are out; the particle leaves the <Katex tex="x" />-axis but never travels parallel to the <Katex tex="y" />-axis, ruling out C; and a circular arc needs the acceleration direction to keep turning, whereas here it is fixed, ruling out D.</>,
  },
]

export default function SpecialistQ15_2019() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A particle is moving along the <Katex tex="x" />-axis with velocity{' '}
            <Katex tex="\underset{\sim}{v}=u\underset{\sim}{i}" />, where <Katex tex="u" /> is a
            real constant. At time <Katex tex="t=0" />, a force acts on the particle, causing it
            to accelerate with acceleration{' '}
            <Katex tex="\underset{\sim}{a}=\lambda\underset{\sim}{j}" />, where{' '}
            <Katex tex="\lambda" /> is a negative real constant.
          </p>
          <p>Which one of the following statements correctly describes the motion of the particle for <Katex tex="t>0" />?</p>
        </>
      }
      options={[
        { letter: 'A', content: <>The particle slows down, stops momentarily and then begins to move in the opposite direction to its original motion.</> },
        { letter: 'B', content: <>The particle continues to travel along the <Katex tex="x" />-axis with decreasing speed.</> },
        { letter: 'C', content: <>The particle travels parallel to the <Katex tex="y" />-axis.</> },
        { letter: 'D', content: <>The particle moves along a circular arc.</> },
        { letter: 'E', content: <>The particle moves along a parabola.</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
