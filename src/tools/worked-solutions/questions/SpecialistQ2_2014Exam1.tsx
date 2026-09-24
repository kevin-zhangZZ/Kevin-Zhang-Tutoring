// 2014 Specialist Mathematics — Exam 1, Question 2 (5 marks). Converting a vector path to
// cartesian form, sketching it over the right domain, and finding a speed. Question text
// transcribed from the original paper; the axes VCAA supplied for part (b) were blank, so the
// sketch is this site's own matplotlib figure. Answers checked with sympy and against the
// VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import pathSrc from './spec-2014e1-q2b-path.png'

const EXAM_A: SAExaminerStats = {
  marks: [11, 89],
  average: 0.9,
  comment: (
    <>
      This question was well answered. Most students were able to obtain the given result.
      There were, however, some unconvincing arguments, often due to insufficient steps being
      shown. Some students made algebraic errors.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [22, 36, 42],
  average: 1.2,
  comment: (
    <>
      Most students knew that a parabola was required. Some graphs were poorly drawn and did
      not give a smoothly drawn curve that had symmetry properties. Many graphs were drawn with
      a wrong domain, the most common being the whole parabola or <Katex tex="x\ge0" />, which
      may have been due to a confusion with <Katex tex="t\ge0" />. Many students did not choose
      a number scale, primarily on the vertical axis, which caused the graph to be distorted
      and therefore led to an incorrect answer.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [20, 7, 73],
  average: 1.5,
  comment: (
    <>
      This question was generally answered well but many students substituted{' '}
      <Katex tex="t=1" /> into the displacement vector or differentiated incorrectly. Common
      errors for the velocity were{' '}
      <Katex tex="t\,\underset{\sim}{i}+(2t-4)\,\underset{\sim}{j}" /> and{' '}
      <Katex tex="-2\,\underset{\sim}{i}+(2t-4)\,\underset{\sim}{j}" />. Many students gave the
      term <Katex tex="2t-4\,\underset{\sim}{j}" /> without any brackets. Some derivatives did
      not include <Katex tex="\underset{\sim}{i}" /> or <Katex tex="\underset{\sim}{j}" />.
      There was also an arithmetic issue involving the square of a negative, so the answer{' '}
      <Katex tex="\sqrt3" /> was common. Some students gave the answer as the velocity vector
      rather than finding its magnitude to give the speed. Others made the question more
      difficult by finding the magnitude of the velocity vector prior to substituting in{' '}
      <Katex tex="t=1" /> rather than the other way around. Several made errors when expanding
      inside the square root.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x = t-2, \qquad y = t^2-4t+1" />,
    reason: <>Read off the components, then eliminate <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="t = x+2" />,
    reason: <>Rearranging the simpler of the two.</>,
  },
  {
    working: <Katex display tex="y = (x+2)^2-4(x+2)+1" />,
    reason: <>Substituting. Every <Katex tex="t" /> must be replaced.</>,
  },
  {
    working: <Katex display tex="= x^2+4x+4-4x-8+1" />,
    reason: <>Expanding carefully — this line is what makes the argument convincing.</>,
  },
  {
    working: <Katex display tex="y = x^2-3 \quad \text{as required}" />,
    reason: <>A "show that" is marked on the steps above this line, not on restating the given equation — the report criticises arguments with too few steps.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="t \ge 0 \implies x = t-2 \ge -2" />,
    reason: <>The domain is the trap: <Katex tex="t\ge0" /> does <em>not</em> mean <Katex tex="x\ge0" />. The path starts at <Katex tex="x=-2" /> and runs right.</>,
  },
  {
    working: <Katex display tex="t=0:\ \underset{\sim}{r}(0) = -2\underset{\sim}{i}+\underset{\sim}{j} \implies (-2,1)" />,
    reason: <>The starting point, an endpoint of the sketch.</>,
  },
  {
    working: <Katex display tex="y = 0 \implies x = \pm\sqrt3" />,
    reason: <>Both intercepts are on the path, since <Katex tex="-\sqrt3\approx-1.73>-2" />.</>,
  },
  {
    working: <Katex display tex="\text{vertex } (0,-3)" />,
    reason: <>From <Katex tex="y=x^2-3" />, also on the path.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-2">
        <img
          src={pathSrc}
          alt="The parabola y = x² − 3 drawn only for x ≥ −2: it starts at the point (−2, 1), falls through (−√3, 0) to the vertex (0, −3), and rises back through (√3, 0) and onwards"
          className="w-full max-w-[360px]"
        />
      </div>
    ),
    reason: <>A smooth curve with a closed endpoint at <Katex tex="(-2,1)" /> and all four features labelled. Scales on both axes matter — the report says an unscaled vertical axis distorted many sketches.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}(t) = (t-2)\underset{\sim}{i}+\left(t^2-4t+1\right)\underset{\sim}{j}" />,
    reason: <>Speed is the magnitude of the <em>velocity</em>, so differentiate first.</>,
  },
  {
    working: <Katex display tex="\dot{\underset{\sim}{r}}(t) = \underset{\sim}{i}+(2t-4)\underset{\sim}{j}" />,
    reason: <>The derivative of <Katex tex="t-2" /> is 1, not <Katex tex="t" />. Brackets around <Katex tex="2t-4" /> are needed.</>,
  },
  {
    working: <Katex display tex="\dot{\underset{\sim}{r}}(1) = \underset{\sim}{i}-2\underset{\sim}{j}" />,
    reason: <>Substitute <Katex tex="t=1" /> <em>before</em> taking the magnitude — it keeps the arithmetic to one line.</>,
  },
  {
    working: <Katex display tex="\left|\dot{\underset{\sim}{r}}(1)\right| = \sqrt{1^2+(-2)^2}" />,
    reason: <>Squaring a negative gives a positive: the report notes the common answer <Katex tex="\sqrt3" /> from getting this wrong.</>,
  },
  {
    working: <Katex display tex="\boxed{\sqrt5}" />,
    reason: <>A scalar — speed, not the velocity vector.</>,
  },
]

export default function SpecialistQ2_2014Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (5 marks)</p>
        <p>The position vector of a particle at time <Katex tex="t\ge0" /> is given by</p>
        <div>
          <Katex
            display
            tex="\underset{\sim}{r}(t) = (t-2)\underset{\sim}{i}+\left(t^2-4t+1\right)\underset{\sim}{j}"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Cartesian Equation"
        marks={1}
        statement={
          <>
            Show that the cartesian equation of the path followed by the particle is{' '}
            <Katex tex="y=x^2-3" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Path"
        marks={2}
        statement={
          <>
            Sketch the path followed by the particle on the axes below, labelling all
            important features.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Speed"
        marks={2}
        statement={<>Find the speed of the particle when <Katex tex="t=1" />.</>}
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
