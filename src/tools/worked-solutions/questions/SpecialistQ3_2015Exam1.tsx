// 2015 Specialist Mathematics — Exam 1, Question 3 (4 marks). Antidifferentiating a velocity
// vector with a given initial position, then the distance from the origin at t = 2. Question
// text transcribed from the original paper (no diagram given). Answer checked with sympy and
// against the VCAA examination report. Solution is original. This question has no lettered
// parts, so it uses the plain card layout rather than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [5, 5, 23, 14, 53],
  average: 3.1,
  comment: (
    <>
      Most students handled this question very well. Common errors included finding an
      incorrect antiderivative vector, forgetting to include a constant (vector) of
      integration, finding the incorrect constant of integration, or a sign error in
      consolidating the vector answer. A large proportion of these errors were caused by
      incorrect use (or lack) of brackets. Some students added <Katex tex="5t" /> to 2 and got{' '}
      <Katex tex="7t" />. Several students left the displacement vector as the answer, and
      many made arithmetic errors in calculating the modulus of the vector. Some assumed that the distance from the origin was given by the modulus of{' '}
      <Katex tex="\underset{\sim}{r}(2)-\underset{\sim}{r}(0)" />. Some were unable to
      recognise that <Katex tex="\sqrt{169}=13" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\dot{\underset{\sim}{r}}(t) = (4t-3)\underset{\sim}{i}+2t\,\underset{\sim}{j}-5\underset{\sim}{k}" />,
    reason: <>The given <em>velocity</em>. Position comes from antidifferentiating each component separately.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}(t) = (2t^2-3t)\underset{\sim}{i}+t^2\underset{\sim}{j}-5t\,\underset{\sim}{k}+\underset{\sim}{c}" />,
    reason: <>The constant of integration is a <em>vector</em>, not a scalar — forgetting it, or finding it wrongly, is among the report's common errors.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}(0) = \underset{\sim}{c} = \underset{\sim}{i}-2\underset{\sim}{k}" />,
    reason: <>At <Katex tex="t=0" /> every term with a <Katex tex="t" /> vanishes, so the constant is the given initial position outright.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}(t) = (2t^2-3t+1)\underset{\sim}{i}+t^2\underset{\sim}{j}+(-5t-2)\underset{\sim}{k}" />,
    reason: <>Brackets matter on the <Katex tex="\underset{\sim}{k}" /> component: <Katex tex="-5t" /> and <Katex tex="-2" /> are both negative.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}(2) = (8-6+1)\underset{\sim}{i}+4\underset{\sim}{j}+(-10-2)\underset{\sim}{k} = 3\underset{\sim}{i}+4\underset{\sim}{j}-12\underset{\sim}{k}" />,
    reason: <>Substituting <Katex tex="t=2" />.</>,
  },
  {
    working: <Katex display tex="\bigl|\underset{\sim}{r}(2)\bigr| = \sqrt{3^2+4^2+(-12)^2} = \sqrt{9+16+144}" />,
    reason: <>"Distance from the origin" is the magnitude of the position vector itself — not of the change in position.</>,
  },
  {
    working: <Katex display tex="\boxed{\sqrt{169} = 13\ \text{metres}}" />,
    reason: <><Katex tex="(3,4,12)" /> is a Pythagorean quadruple, so the surd comes out whole.</>,
  },
]

export default function SpecialistQ3_2015Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 3 (4 marks)">
        <p>
          The velocity of a particle at time <Katex tex="t" /> seconds is given by{' '}
          <Katex tex="\dot{\underset{\sim}{r}}(t)=(4t-3)\underset{\sim}{i}+2t\,\underset{\sim}{j}-5\underset{\sim}{k}" />
          , where components are measured in metres per second.
        </p>
        <p>
          Find the distance of the particle from the origin in metres when{' '}
          <Katex tex="t=2" />, given that{' '}
          <Katex tex="\underset{\sim}{r}(0)=\underset{\sim}{i}-2\underset{\sim}{k}" />.
        </p>
      </Background>
      <Background>
        <p>
          Two traps sit between the velocity and the answer: the constant of integration is a
          vector, and the question asks for a distance from the <em>origin</em>, so the final
          step is the magnitude of <Katex tex="\underset{\sim}{r}(2)" /> rather than of any
          displacement.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={4} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
