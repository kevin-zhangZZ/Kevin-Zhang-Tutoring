// 2021 Mathematical Methods — Exam 1 Question 8 (5 marks). Recovering a function from its
// gradient and a point on it, then classifying the stationary point. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [26, 16, 38, 21],
  average: 1.6,
  comment: (
    <>
      Most students were able to antidifferentiate to get the correct powers, but often with
      incorrect coefficients. Some students lost the <Katex tex="(x+6)" /> term and just had{' '}
      <Katex tex="x" />. Students who had included the constant of integration knew to
      substitute <Katex tex="\left(3,\tfrac{29}{4}\right)" /> in to find <Katex tex="c" />.
      Solving to find <Katex tex="c" /> caused problems; students encountered difficulties
      evaluating terms like <Katex tex="9^{3/2}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [50, 27, 23],
  average: 0.8,
  comment: (
    <>
      Most students knew that they had to consider the slope of the curve on either side of{' '}
      <Katex tex="x=3" />. Most students had a valid approach, but not all provided
      convincing arguments that showed the working out of substituting suitable{' '}
      <Katex tex="x" /> values. Those who tried a second derivative approach met with mixed
      success.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = \int\left(\sqrt{x+6}-\frac{x}{2}-\frac32\right)dx" />,
    reason: 'Antidifferentiating the gradient function.',
  },
  {
    working: <Katex display tex="\int(x+6)^{1/2}dx = \frac{(x+6)^{3/2}}{3/2} = \frac{2(x+6)^{3/2}}{3}" />,
    reason: <>Keep the <Katex tex="(x+6)" /> intact — the report notes students who quietly replaced it with <Katex tex="x" />. The inner derivative is 1, so no extra factor is needed.</>,
  },
  {
    working: <Katex display tex="y = \frac{2(x+6)^{3/2}}{3}-\frac{x^2}{4}-\frac{3x}{2}+c" />,
    reason: 'The other two terms are straightforward power rules.',
  },
  {
    working: <Katex display tex="9^{3/2} = \left(\sqrt9\right)^3 = 27" />,
    reason: <>Square-root first, then cube — the fractional index the report flags as a stumbling block.</>,
  },
  {
    working: <Katex display tex="x = 3: \ \frac{2(27)}{3}-\frac94-\frac92+c = \frac{29}{4}" />,
    reason: <>Substituting the given stationary point <Katex tex="\left(3,\tfrac{29}{4}\right)" />.</>,
  },
  {
    working: <Katex display tex="18-\frac{27}{4}+c = \frac{29}{4} \implies c = \frac{56}{4}-18 = -4" />,
    reason: <><Katex tex="\tfrac94+\tfrac{18}4=\tfrac{27}4" />, and <Katex tex="\tfrac{29}4+\tfrac{27}4=14" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \frac{2(x+6)^{3/2}}{3}-\frac{x^2}{4}-\frac{3x}{2}-4}" />,
    reason: <>Check the stationary point is where it should be: <Katex tex="\sqrt{9}-\tfrac32-\tfrac32=0" /> ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d^2y}{dx^2} = \frac{1}{2\sqrt{x+6}}-\frac12" />,
    reason: 'Differentiating the given gradient function — quicker and more convincing than a sign table, provided it is evaluated properly.',
  },
  {
    working: <Katex display tex="\text{at } x=3: \ \frac{1}{2\sqrt9}-\frac12 = \frac16-\frac12" />,
    reason: <><Katex tex="\sqrt9=3" />, so the first term is <Katex tex="\tfrac16" />.</>,
  },
  {
    working: <Katex display tex="= -\frac13 < 0" />,
    reason: 'Concave down at the stationary point.',
  },
  {
    working: <Katex display tex="\boxed{\left(3,\tfrac{29}{4}\right) \text{ is a local maximum}}" />,
    reason: <>A sign table also works: <Katex tex="\tfrac{dy}{dx}" /> at <Katex tex="x=-2" /> is <Katex tex="2+1-\tfrac32>0" />, and at <Katex tex="x=10" /> is <Katex tex="4-5-\tfrac32<0" /> — positive then negative. Whichever route, the substituted values must actually be written down.</>,
  },
]

export default function MethodsQ8_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (5 marks)</p>
        <p>
          The gradient of a function is given by{' '}
          <Katex tex="\dfrac{dy}{dx}=\sqrt{x+6}-\dfrac{x}{2}-\dfrac32" />. The graph of the
          function has a single stationary point at{' '}
          <Katex tex="\left(3,\tfrac{29}{4}\right)" />.
        </p>
      </div>

      <PartCard letter="a" marks={3} statement={<>Find the rule of the function.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={<>Determine the nature of the stationary point.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
