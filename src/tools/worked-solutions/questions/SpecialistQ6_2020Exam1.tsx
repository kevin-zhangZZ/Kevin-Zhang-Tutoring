// 2020 Specialist Mathematics — Exam 1 Question 6 (5 marks). Differentiating an arctan,
// justifying a point of inflection, and sketching the curve with both horizontal
// asymptotes. Question text transcribed from the original paper; the sketch is my own
// matplotlib drawing of the answer. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './spec-2020e1-q6c-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [12, 88],
  average: 0.9,
  comment: (
    <>
      This question was answered very well. Students needed to demonstrate the use of the
      chain rule to find the (given) answer.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [25, 66, 9],
  average: 0.8,
  comment: (
    <>
      Most students showed, by using the chain or quotient rules, that{' '}
      <Katex tex="f''(x)=0" /> when <Katex tex="x=2" />. Few students attempted to justify
      that a point of inflection occurred at this point.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [26, 22, 51],
  average: 1.3,
  comment: (
    <>
      Most students sketched a smooth curve with the appropriate shape. The asymptotes{' '}
      <Katex tex="y=\tfrac\pi2" /> and <Katex tex="y=\tfrac{3\pi}{2}" /> as well as the point
      of inflection <Katex tex="(2,\pi)" /> needed to be labelled. The{' '}
      <Katex tex="y" />-intercept was not required.
      <br />
      Students are reminded that when a grid is provided for them to draw their graphs,
      sufficient area should be utilised so that all features of the graph can be shown. Some
      students drew their graphs on such a limited domain that the asymptotic behaviour was not
      shown.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\arctan(u) = \frac{1}{1+u^2}\cdot\frac{du}{dx}" />,
    reason: <>The chain rule form. Here <Katex tex="u=3x-6" />, so <Katex tex="\tfrac{du}{dx}=3" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{3}{1+(3x-6)^2}" />,
    reason: <>The <Katex tex="+\pi" /> is a constant and differentiates away.</>,
  },
  {
    working: <Katex display tex="(3x-6)^2 = 9x^2-36x+36" />,
    reason: <>Expanding the square.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{3}{9x^2-36x+37}}" />,
    reason: <>The <Katex tex="+1" /> lifts 36 to 37. As required. A "show that" needs the expansion written out, not just the chain-rule line — the report says students needed to demonstrate the use of the chain rule.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 3\left(9x^2-36x+37\right)^{-1}" />,
    reason: <>Writing it as a power makes the chain rule easier than the quotient rule.</>,
  },
  {
    working: <Katex display tex="f''(x) = -3\left(9x^2-36x+37\right)^{-2}(18x-36)" />,
    reason: <>Chain rule again; the inner derivative is <Katex tex="18x-36" />.</>,
  },
  {
    working: <Katex display tex="f''(x) = \frac{-54(x-2)}{\left(9x^2-36x+37\right)^2}" />,
    reason: <>Factoring 18 out of <Katex tex="18x-36" /> exposes the root immediately.</>,
  },
  {
    working: <Katex display tex="f''(2) = 0" />,
    reason: <>Necessary, but not sufficient — a zero second derivative does not by itself make an inflection.</>,
  },
  {
    working: <Katex display tex="9x^2-36x+37 = 9(x-2)^2+1 > 0 \ \text{ for all } x" />,
    reason: <>So the denominator never changes sign; the sign of <Katex tex="f''" /> is decided entirely by <Katex tex="-(x-2)" />.</>,
  },
  {
    working: <Katex display tex="x<2: f''(x)>0; \quad x>2: f''(x)<0" />,
    reason: <>Concave up then concave down.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{concavity changes at } x=2, \text{ so there is a point of inflection there}}" />,
    reason: <>As required. This sign test is the justification — the report notes most students showed <Katex tex="f''(2)=0" /> but few attempted to justify that a point of inflection occurred.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x\to\infty: \ \arctan(3x-6)\to\tfrac\pi2 \implies y\to\tfrac{3\pi}{2}" />,
    reason: <>The <Katex tex="+\pi" /> lifts the usual arctan asymptote.</>,
  },
  {
    working: <Katex display tex="x\to-\infty: \ \arctan(3x-6)\to-\tfrac\pi2 \implies y\to\tfrac\pi2" />,
    reason: <>So both asymptotes sit above the <Katex tex="x" />-axis, and the curve never dips below <Katex tex="y=\tfrac\pi2" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{3}{9(x-2)^2+1} > 0 \ \text{ for all } x" />,
    reason: <>Strictly increasing everywhere, with its steepest point at <Katex tex="x=2" /> where <Katex tex="f'(2)=3" />.</>,
  },
  {
    working: <Katex display tex="f(2) = \arctan(0)+\pi = \pi" />,
    reason: <>The point of inflection from part b., which the question asks to be labelled with its coordinates.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={sketchSrc}
          alt="The answer sketched on VCAA's grid (x from −6 to 6, gridlines every 2; y in steps of π/2): an S-shaped increasing curve rising from the asymptote y = π/2 to the asymptote y = 3π/2, with the point of inflection (2, π) labelled"
          className="w-full max-w-[420px]"
        />
      </div>
    ),
    reason: <>The question asks for three labels: <Katex tex="y=\tfrac\pi2" />, <Katex tex="y=\tfrac{3\pi}{2}" /> and <Katex tex="(2,\pi)" /> (the <Katex tex="y" />-intercept is not required). Use the width of the grid — a curve drawn over only <Katex tex="0\le x\le4" /> never shows the asymptotic behaviour.</>,
  },
]

export default function SpecialistQ6_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (5 marks)</p>
        <p>
          Let <Katex tex="f(x)=\arctan(3x-6)+\pi" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Arctan Derivative"
        marks={1}
        statement={<>Show that <Katex tex="f'(x)=\dfrac{3}{9x^2-36x+37}" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Point of Inflection"
        marks={2}
        statement={
          <>
            Hence, show that the graph of <Katex tex="f" /> has a point of inflection at{' '}
            <Katex tex="x=2" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Sketch Graph"
        marks={2}
        statement={
          <>
            Sketch the graph of <Katex tex="y=f(x)" /> on the axes provided below. Label any
            asymptotes with their equations and the point of inflection with its coordinates.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
