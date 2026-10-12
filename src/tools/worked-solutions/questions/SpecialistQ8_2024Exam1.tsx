// 2024 Specialist Mathematics — Exam 1 Question 8 (4 marks). Implicit differentiation of
// a quartic relation, then the points where the tangent has a given slope. Question text
// transcribed from the original paper (2024 papers are image-only, so read from rendered
// pages). Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [15, 31, 54],
  average: 1.4,
  comment: (
    <>
      The implicit differentiation was done very well. Some students made algebraic errors and
      some students moved too quickly to the final answer. Students needed to present evidence,
      typically consisting of clear and correct factorisation such as{' '}
      <Katex tex="\dfrac{dy}{dx}=-\dfrac{y(2xy+1)}{x(2xy+1)}=-\dfrac{y}{x}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [37, 30, 32],
  average: 1.0,
  comment: (
    <>
      Some students, while recognising the relationship <Katex tex="y=x" />, neglected to
      consider that the points lay on the graph of <Katex tex="x^2y^2+xy=2" />.
      <br />
      Some students who did find an equation such as <Katex tex="x^4+x^2=2" /> had difficulty
      solving it or found incorrect coordinates in addition to <Katex tex="(1,1)" /> and{' '}
      <Katex tex="(-1,-1)" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\left(x^2y^2\right)+\frac{d}{dx}(xy) = \frac{d}{dx}(2)" />,
    reason: <>Differentiating both sides with respect to <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="2xy^2+x^2\cdot2y\frac{dy}{dx} \ + \ y+x\frac{dy}{dx} \ = \ 0" />,
    reason: <>Product rule on each term, with the chain rule supplying <Katex tex="\dfrac{dy}{dx}" /> whenever <Katex tex="y" /> is differentiated.</>,
    more: <>In detail: <Katex tex="\frac{d}{dx}\left(y^2\right)=2y\frac{dy}{dx}" /> by the chain rule, so <Katex tex="\frac{d}{dx}\left(x^2\cdot y^2\right)=2x\cdot y^2+x^2\cdot 2y\frac{dy}{dx}" />; and <Katex tex="\frac{d}{dx}(x\cdot y)=1\cdot y+x\frac{dy}{dx}" />. The constant 2 differentiates to 0.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}\left(2x^2y+x\right) = -\left(2xy^2+y\right)" />,
    reason: <>Collecting the <Katex tex="\dfrac{dy}{dx}" /> terms on one side.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}\cdot x(2xy+1) = -y(2xy+1)" />,
    reason: <>Factorising both sides: <Katex tex="x" /> comes out of the left, <Katex tex="y" /> out of the right, exposing the common factor <Katex tex="2xy+1" />.</>,
    more: <>Don't skip this line. The report says students needed to present evidence, typically a clear and correct factorisation like this one; some moved too quickly to the final answer, and without the factorisation the cancellation looks like a guess.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = -\frac{y}{x}, \quad \text{provided } 2xy\ne-1}" />,
    reason: <>The common factor <Katex tex="2xy+1" /> cancels, which is exactly why the condition <Katex tex="2xy\ne-1" /> is attached. As required.</>,
    more: <>Dividing by <Katex tex="x" /> is also safe: <Katex tex="x=0" /> would make the relation read <Katex tex="0=2" />, so no point of the graph has <Katex tex="x=0" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="-\frac{y}{x} = -1 \implies y = x" />,
    reason: <>The slope of the tangent is <Katex tex="\dfrac{dy}{dx}" />, so set part a.'s gradient equal to <Katex tex="-1" /> and multiply by <Katex tex="-x" />.</>,
  },
  {
    working: <Katex display tex="\text{the points must also satisfy } x^2y^2+xy = 2" />,
    reason: <><Katex tex="y=x" /> is a whole line; only the points on it that also lie <em>on the curve</em> count.</>,
    more: <>The report notes some students stopped at <Katex tex="y=x" />. The question asks for points, so solve <Katex tex="y=x" /> simultaneously with the relation.</>,
  },
  {
    working: <Katex display tex="x^2\cdot x^2+x\cdot x = 2 \implies x^4+x^2-2 = 0" />,
    reason: <>Substituting <Katex tex="y=x" /> into the relation.</>,
  },
  {
    working: <Katex display tex="\left(x^2+2\right)\left(x^2-1\right) = 0" />,
    reason: <>A quadratic in <Katex tex="x^2" />: with <Katex tex="u=x^2" /> it is <Katex tex="u^2+u-2=(u+2)(u-1)" />. Since <Katex tex="x^2+2>0" />, that factor gives no real solutions.</>,
    more: <>The report says some students who reached <Katex tex="x^4+x^2=2" /> had difficulty solving it. Move everything to one side first, then spot that only even powers appear, so it factorises as a quadratic in <Katex tex="x^2" />.</>,
  },
  {
    working: <Katex display tex="x^2 = 1 \implies x = \pm1, \quad y = x" />,
    reason: <>Take both signs, and pair each <Katex tex="x" /> with <Katex tex="y=x" />.</>,
    more: <>The report says some students found incorrect coordinates as well. A typical way: pairing <Katex tex="x=\pm1" /> with <Katex tex="y=\pm1" /> freely adds <Katex tex="(1,-1)" /> and <Katex tex="(-1,1)" />. Neither is on the graph: there <Katex tex="x^2y^2+xy=1-1=0\ne2" />.</>,
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
          <Katex tex="x,y\in R" />.
        </p>
      </div>

      <DetailOnly>
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
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Implicit Differentiation"
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
        topic="Tangent Gradient"
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
