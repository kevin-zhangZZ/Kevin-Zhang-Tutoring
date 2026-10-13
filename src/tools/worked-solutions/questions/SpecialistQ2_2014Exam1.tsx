// 2014 Specialist Mathematics — Exam 1, Question 2 (5 marks). Converting a vector path to
// cartesian form, sketching it over the right domain, and finding a speed. Question text
// transcribed from the original paper; the axes VCAA supplied for part (b) were blank, so the
// sketch is this site's own matplotlib figure. Answers checked with sympy and against the
// VCAA examination report. Solution is original.
// Oct 2026 review (2014-16 pass): no part qualifies for an interactive (all parts at least 40%
// full marks); report traps and checks moved into rows' `more`.

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
    reason: <>Read off the components. A cartesian equation links <Katex tex="x" /> and <Katex tex="y" /> only, so eliminate <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="t = x+2" />,
    reason: <>Make <Katex tex="t" /> the subject of the simpler (linear) equation.</>,
  },
  {
    working: <Katex display tex="y = (x+2)^2-4(x+2)+1" />,
    reason: <>Substitute into the <Katex tex="y" /> equation, replacing every <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="= x^2+4x+4-4x-8+1" />,
    reason: <>Expand each bracket, writing the line out in full.</>,
  },
  {
    working: <Katex display tex="y = x^2-3 \quad \text{as required}" />,
    reason: <>The <Katex tex="x" /> terms cancel and <Katex tex="4-8+1=-3" />. As required.</>,
    more: <>A "show that" is marked on the steps above this line, not on restating the given equation — the report criticises arguments with too few steps, and notes algebraic errors. A quick check: <Katex tex="t=0" /> gives the point <Katex tex="(-2,1)" />, and <Katex tex="(-2)^2-3=1" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="t \ge 0 \implies x = t-2 \ge -2" />,
    reason: <>The path is only part of the parabola: <Katex tex="t\ge0" /> does <em>not</em> mean <Katex tex="x\ge0" />. It starts at <Katex tex="x=-2" /> and runs right.</>,
    more: <>The report says many sketches had the wrong domain — usually the whole parabola, or <Katex tex="x\ge0" /> (the trap above). Always push the restriction on <Katex tex="t" /> through <Katex tex="x=t-2" />: as <Katex tex="t" /> increases from 0, <Katex tex="x" /> increases from <Katex tex="-2" /> without bound, so there is a left endpoint and no right one.</>,
  },
  {
    working: <Katex display tex="t=0:\ \underset{\sim}{r}(0) = -2\underset{\sim}{i}+\underset{\sim}{j} \implies (-2,1)" />,
    reason: <>The starting point. <Katex tex="t=0" /> is allowed, so this endpoint is a closed dot.</>,
  },
  {
    working: <Katex display tex="y = 0 \implies x = \pm\sqrt3" />,
    reason: <>Both intercepts are on the path, since <Katex tex="-\sqrt3\approx-1.73>-2" />.</>,
  },
  {
    working: <Katex display tex="\text{vertex } (0,-3)" />,
    reason: <>The turning point of <Katex tex="y=x^2-3" />. It is on the path since <Katex tex="0\ge-2" /> (reached at <Katex tex="t=2" />). It is also the <Katex tex="y" />-intercept.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-2">
        <img loading="lazy" decoding="async"
          src={pathSrc}
          alt="The parabola y = x² − 3 drawn only for x ≥ −2: it starts at the point (−2, 1), falls through (−√3, 0) to the vertex (0, −3), and rises back through (√3, 0) and onwards"
          className="w-full max-w-[360px]"
        />
      </div>
    ),
    reason: <>A smooth parabola from the closed endpoint <Katex tex="(-2,1)" /> rightwards, with the endpoint, both intercepts and the vertex labelled, and a number scale on both axes.</>,
    more: <>The report marked down curves that were not smooth or not symmetrical, and sketches with no number scale (especially on the vertical axis), which distorted the shape. A useful check on symmetry: the point <Katex tex="(2,1)" /> (at <Katex tex="t=4" />) is the mirror image of the endpoint <Katex tex="(-2,1)" /> in the <Katex tex="y" />-axis, so the curve must pass through it at the same height.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}(t) = (t-2)\underset{\sim}{i}+\left(t^2-4t+1\right)\underset{\sim}{j}" />,
    reason: <>Speed is the magnitude of the <em>velocity</em>, so differentiate first.</>,
  },
  {
    working: <Katex display tex="\dot{\underset{\sim}{r}}(t) = \underset{\sim}{i}+(2t-4)\underset{\sim}{j}" />,
    reason: <>Differentiate each component: <Katex tex="t-2" /> gives 1 and <Katex tex="t^2-4t+1" /> gives <Katex tex="2t-4" /> (kept in brackets).</>,
    more: <>The report lists two common wrong velocities: <Katex tex="t\,\underset{\sim}{i}+(2t-4)\,\underset{\sim}{j}" /> (the derivative of <Katex tex="t-2" /> taken as <Katex tex="t" /> instead of 1) and <Katex tex="-2\,\underset{\sim}{i}+(2t-4)\,\underset{\sim}{j}" /> (the derivative of <Katex tex="t-2" /> taken as the constant <Katex tex="-2" />). Without brackets, <Katex tex="2t-4\,\underset{\sim}{j}" /> means <Katex tex="2t" /> minus a vector, which is not the velocity. Keep <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> on every term.</>,
  },
  {
    working: <Katex display tex="\dot{\underset{\sim}{r}}(1) = \underset{\sim}{i}-2\underset{\sim}{j}" />,
    reason: <>Substitute <Katex tex="t=1" /> into the <em>velocity</em>: <Katex tex="2(1)-4=-2" />.</>,
    more: <>Substituting <Katex tex="t=1" /> into <Katex tex="\underset{\sim}{r}(t)" /> instead gives the position <Katex tex="-\underset{\sim}{i}-2\underset{\sim}{j}" />, not the velocity — a common error the report mentions. By coincidence <Katex tex="\left|-\underset{\sim}{i}-2\underset{\sim}{j}\right|=\sqrt5" /> as well, so this wrong method happens to give the right number here but earns no marks for working; at <Katex tex="t=2" />, say, the speed is 1 but <Katex tex="\left|\underset{\sim}{r}(2)\right|=3" />. Substitute <em>before</em> taking the magnitude: the general <Katex tex="\sqrt{1+(2t-4)^2}" /> invites expansion errors inside the root, which the report also mentions.</>,
  },
  {
    working: <Katex display tex="\left|\dot{\underset{\sim}{r}}(1)\right| = \sqrt{1^2+(-2)^2}" />,
    reason: <>Take the magnitude of the velocity. Squaring a negative gives a positive: <Katex tex="(-2)^2=4" />, so the number under the square root is <Katex tex="1+4" />.</>,
    more: <>The report notes the common answer <Katex tex="\sqrt3" />, which most likely comes from treating <Katex tex="(-2)^2" /> as <Katex tex="-4" /> and then ignoring the sign of <Katex tex="1-4=-3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\sqrt5}" />,
    reason: <>Speed is a scalar, so the answer is a number, not the velocity vector.</>,
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
