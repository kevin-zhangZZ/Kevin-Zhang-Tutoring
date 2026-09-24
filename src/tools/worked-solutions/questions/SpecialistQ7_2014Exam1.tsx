// 2014 Specialist Mathematics — Exam 1, Question 7 (5 marks). The range of 3x·arctan(2x), a
// show-that derivative, and the area under arctan(2x) obtained by reversing it. Question text
// transcribed from the original paper (no diagram given). Answers checked with sympy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [96, 4],
  average: 0.1,
  comment: (
    <>
      This question was answered poorly by most students. Few realised that <Katex tex="x" />{' '}
      and the arctan function are both positive for the same values, negative for the same
      values and zero for the same values. Incorrect responses included <Katex tex="R" />,{' '}
      <Katex tex="\left(-\tfrac\pi4,\tfrac\pi4\right)" />,{' '}
      <Katex tex="\left(-\tfrac\pi2,\tfrac\pi2\right)" />,{' '}
      <Katex tex="\left(-\tfrac{3\pi}2,\tfrac{3\pi}2\right)" /> and{' '}
      <Katex tex="\left(-\tfrac{3\pi x}2,\tfrac{3\pi x}2\right)" />. Many students seemed to
      use the product of the range of each of the ‘parts’, some ignored one part and others
      found the product of the range of one part and the variable <Katex tex="x" />. Some
      ignored the presence of one of the two functions involved.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [9, 91],
  average: 0.9,
  comment: (
    <>
      This question was well answered. Most students were able to obtain the given result.
      There were, however, some unconvincing arguments, often because insufficient steps were
      shown. A few students used{' '}
      <Katex tex="\tan^{-1}(2x)" /> and then confused inverses with reciprocals.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [27, 19, 28, 26],
  average: 1.6,
  comment: (
    <>
      Most students who used the result from Question 7b. made good attempts at this
      question. Some ignored the word ‘hence’. Most attempted to apply this method but many
      made algebraic errors. When attempting to integrate <Katex tex="\tfrac{6x}{1+4x^2}" />,
      some gave <Katex tex="3\arctan(2x)" /> or similar, others made the correct substitution
      but made errors in either changing the terminals or with the arithmetic.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 3x\arctan(2x)" />,
    reason: <>A product of two factors, so look at the sign of each rather than at their ranges separately.</>,
  },
  {
    working: <Katex display tex="x>0 \implies \arctan(2x)>0; \qquad x<0 \implies \arctan(2x)<0" />,
    reason: <><Katex tex="\arctan" /> is increasing and passes through the origin, so it takes the same sign as its input.</>,
  },
  {
    working: <Katex display tex="\therefore\ x\arctan(2x) \ge 0 \text{ for all } x" />,
    reason: <>Same sign multiplied together is positive; and at <Katex tex="x=0" /> both factors vanish.</>,
  },
  {
    working: <Katex display tex="f(0) = 0, \qquad f(x)\to\infty \text{ as } x\to\pm\infty" />,
    reason: <>The minimum is attained at 0, and the product grows without bound because <Katex tex="\arctan(2x)\to\pm\tfrac\pi2" /> while <Katex tex="3x\to\pm\infty" />.</>,
  },
  {
    working: <Katex display tex="\boxed{[0,\infty)}" />,
    reason: <>Closed at 0 because that value is actually reached. Only 4% of students got this.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 3x\arctan(2x)" />,
    reason: <>A product, so the product rule.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\arctan(2x) = \frac{2}{1+(2x)^2} = \frac{2}{1+4x^2}" />,
    reason: <>The standard derivative <Katex tex="\tfrac{d}{dx}\arctan(u)=\tfrac{u'}{1+u^2}" />, with <Katex tex="u=2x" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = 3\arctan(2x)+3x\times\frac{2}{1+4x^2}" />,
    reason: <><Katex tex="u'v+uv'" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = 3\arctan(2x)+\frac{6x}{1+4x^2} \quad \text{as required}" />,
    reason: <>The mark is for the product-rule line above, not this restatement — the report criticises arguments with too few steps.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\int f'(x)\,dx = f(x) = 3x\arctan(2x)" />,
    reason: <>The "hence": antidifferentiating part b. gives back <Katex tex="f" />, and one of the two terms on the right is the thing we want.</>,
  },
  {
    working: <Katex display tex="3\int\arctan(2x)\,dx + \int\frac{6x}{1+4x^2}\,dx = 3x\arctan(2x)" />,
    reason: <>Splitting the integral.</>,
  },
  {
    working: <Katex display tex="\int\frac{6x}{1+4x^2}\,dx = \tfrac34\log_e\!\left(1+4x^2\right)" />,
    reason: <>The numerator is <Katex tex="\tfrac34" /> of the derivative <Katex tex="8x" /> of the denominator — a <Katex tex="\tfrac{f'}{f}" /> integral, not another arctan.</>,
  },
  {
    working: <Katex display tex="\int\arctan(2x)\,dx = x\arctan(2x)-\tfrac14\log_e\!\left(1+4x^2\right)" />,
    reason: <>Rearranging and dividing by 3.</>,
  },
  {
    working: <Katex display tex="A = \Bigl[x\arctan(2x)-\tfrac14\log_e\!\left(1+4x^2\right)\Bigr]_{1/2}^{\sqrt3/2}" />,
    reason: <><Katex tex="g(x)=\arctan(2x)>0" /> on this interval, so the area is the integral outright.</>,
  },
  {
    working: <Katex display tex="x = \tfrac{\sqrt3}{2}:\quad \tfrac{\sqrt3}{2}\arctan\!\left(\sqrt3\right)-\tfrac14\log_e(4) = \tfrac{\sqrt3\pi}{6}-\tfrac12\log_e(2)" />,
    reason: <><Katex tex="\arctan\!\left(\sqrt3\right)=\tfrac\pi3" /> and <Katex tex="1+4\times\tfrac34=4" />, with <Katex tex="\log_e4=2\log_e2" />.</>,
  },
  {
    working: <Katex display tex="x = \tfrac12:\quad \tfrac12\arctan(1)-\tfrac14\log_e(2) = \tfrac\pi8-\tfrac14\log_e(2)" />,
    reason: <><Katex tex="\arctan(1)=\tfrac\pi4" /> and <Katex tex="1+4\times\tfrac14=2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{\sqrt3\,\pi}{6}-\frac\pi8-\frac14\log_e(2)}" />,
    reason: <>Subtracting: <Katex tex="-\tfrac12\log_e2+\tfrac14\log_e2=-\tfrac14\log_e2" />. Numerically <Katex tex="0.907-0.393-0.173\approx0.34" />, plausible for a strip of width <Katex tex="0.37" /> under a curve around <Katex tex="0.9" /> high.</>,
  },
]

export default function SpecialistQ7_2014Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (5 marks)</p>
        <p>
          Consider <Katex tex="f(x)=3x\arctan(2x)" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Range"
        marks={1}
        statement={<>Write down the range of <Katex tex="f" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Product Rule"
        marks={1}
        statement={
          <>
            Show that{' '}
            <Katex tex="f'(x)=3\arctan(2x)+\dfrac{6x}{1+4x^2}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Area Under Curve"
        marks={3}
        statement={
          <>
            <b>Hence</b> evaluate the area enclosed by the graph of{' '}
            <Katex tex="g(x)=\arctan(2x)" />, the <Katex tex="x" />-axis and the lines{' '}
            <Katex tex="x=\tfrac12" /> and <Katex tex="x=\tfrac{\sqrt3}{2}" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background>
          <p>
            An antiderivative of <Katex tex="\arctan" /> is not on the formula sheet, and the
            technique that produces one directly (integration by parts) is not part of VCE
            Specialist Mathematics — so part c. has to be run backwards out of part b. That is
            what the word "hence" is telling you.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
