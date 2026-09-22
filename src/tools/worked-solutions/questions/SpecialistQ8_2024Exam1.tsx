// 2024 Specialist Mathematics — Exam 1 Question 8 (4 marks). Implicit differentiation of
// a quartic relation, then the points where the tangent has a given slope. Question text
// transcribed from the original paper (2024 papers are image-only, so read from rendered
// pages). Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [15, 31, 54],
  average: 1.4,
  comment: (
    <>
      The implicit differentiation was done very well. Some students made algebraic errors
      and some moved too quickly to the final answer. Students needed to present evidence,
      typically a clear and correct factorisation.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [37, 30, 32],
  average: 1.0,
  comment: (
    <>
      Some students, while recognising the relationship <Katex tex="y=x" />, neglected to
      consider that the points lay on the graph of the relation. Some who found an equation
      had difficulty solving it, or found incorrect coordinates in addition to the correct
      ones.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\left(x^2y^2\right)+\frac{d}{dx}(xy) = \frac{d}{dx}(2)" />,
    reason: 'Differentiating both sides with respect to x.',
  },
  {
    working: <Katex display tex="2xy^2+x^2\cdot2y\frac{dy}{dx} \ + \ y+x\frac{dy}{dx} \ = \ 0" />,
    reason: 'Product rule on each term, with the chain rule supplying dy/dx whenever y is differentiated.',
  },
  {
    working: <Katex display tex="\frac{dy}{dx}\left(2x^2y+x\right) = -\left(2xy^2+y\right)" />,
    reason: 'Collecting the dy/dx terms on one side.',
  },
  {
    working: <Katex display tex="\frac{dy}{dx}\cdot x(2xy+1) = -y(2xy+1)" />,
    reason: 'Factorising both sides. This is the step the examiner wanted to see written down — without it the cancellation looks like a guess.',
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = -\frac{y}{x}, \quad \text{provided } 2xy\ne-1}" />,
    reason: <>The common factor <Katex tex="2xy+1" /> cancels, which is exactly why the condition <Katex tex="2xy\ne-1" /> is attached.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="-\frac{y}{x} = -1 \implies y = x" />,
    reason: 'Setting the gradient from part a. equal to the required slope.',
  },
  {
    working: <Katex display tex="\text{the points must also satisfy } x^2y^2+xy = 2" />,
    reason: <>The missing step for many: <Katex tex="y=x" /> is a whole line, and only the points of it that lie <em>on the curve</em> count.</>,
  },
  {
    working: <Katex display tex="x^2\cdot x^2+x\cdot x = 2 \implies x^4+x^2-2 = 0" />,
    reason: 'Substituting y = x into the relation.',
  },
  {
    working: <Katex display tex="\left(x^2+2\right)\left(x^2-1\right) = 0" />,
    reason: <>A quadratic in <Katex tex="x^2" />. The factor <Katex tex="x^2+2" /> has no real zeros, so it contributes nothing.</>,
  },
  {
    working: <Katex display tex="x^2 = 1 \implies x = \pm1, \quad y = x" />,
    reason: 'Both signs.',
  },
  {
    working: <Katex display tex="\boxed{(1,\,1) \ \text{ and } \ (-1,\,-1)}" />,
    reason: <>Check the exclusion from part a.: at both points <Katex tex="2xy = 2 \ne -1" /> ✓, so the gradient formula is valid there.</>,
  },
]

export default function SpecialistQ8_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (4 marks)</p>
        <p>
          Consider the relation <Katex tex="x^2y^2+xy=2" />, where{' '}
          <Katex tex="x,y\in\mathbb{R}" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The relation is secretly a quadratic in <Katex tex="u=xy" />:{' '}
            <Katex tex="u^2+u-2=0" /> gives <Katex tex="u=1" /> or <Katex tex="u=-2" />, so
            the graph is really the pair of hyperbolas <Katex tex="xy=1" /> and{' '}
            <Katex tex="xy=-2" />. The factor <Katex tex="2xy+1" /> that cancels in part a.
            is never zero on either of them, which is why the excluded case never actually
            arises.
          </p>
          <p>
            Part b. needs two conditions, not one. <Katex tex="y=x" /> says where the
            gradient is right; <Katex tex="x^2y^2+xy=2" /> says where the point is on the
            curve. Using only the first was the most common way to lose marks.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            Using implicit differentiation, show that <Katex tex="\dfrac{dy}{dx}=-\dfrac{y}{x}" />{' '}
            given that <Katex tex="2xy\ne-1" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Find all points on the graph of <Katex tex="x^2y^2+xy=2" /> where the slope of
            the tangent is equal to <Katex tex="-1" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
