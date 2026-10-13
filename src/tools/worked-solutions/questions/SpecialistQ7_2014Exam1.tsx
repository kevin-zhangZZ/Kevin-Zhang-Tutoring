// 2014 Specialist Mathematics — Exam 1, Question 7 (5 marks). The range of 3x·arctan(2x), a
// show-that derivative, and the area under arctan(2x) obtained by reversing it. Question text
// transcribed from the original paper (no diagram given). Answers checked with sympy and
// against the VCAA examination report. Solution is original.
// Interactives (Detailed only) on the qualifying parts: a. (4% full marks) the signs of the two
// factors, spec-2014e1-q7a-signs; c. (26% full marks) checking a candidate area against the
// graph, spec-2014e1-q7c-check. Part b. (91%) does not qualify.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const SignsWidget = lazyWidget(() => import('../interactives/spec-2014e1-q7a-signs'))
const CheckWidget = lazyWidget(() => import('../interactives/spec-2014e1-q7c-check'))

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
    working: <Katex display tex="\begin{aligned} x>0 &\implies \arctan(2x)>0 \\ x<0 &\implies \arctan(2x)<0 \end{aligned}" />,
    reason: <><Katex tex="\arctan" /> is increasing and passes through the origin, so it takes the same sign as its input.</>,
  },
  {
    working: <Katex display tex="\therefore\ x\arctan(2x) \ge 0 \text{ for all } x" />,
    reason: <>Same sign multiplied together is positive; and at <Katex tex="x=0" /> both factors vanish.</>,
  },
  {
    working: <Katex display tex="f(0) = 0, \qquad f(x)\to\infty \text{ as } x\to\pm\infty" />,
    reason: <>So 0 is the minimum value. As <Katex tex="x\to\pm\infty" />, <Katex tex="\arctan(2x)\to\pm\tfrac\pi2" /> but <Katex tex="3x\to\pm\infty" />, so the product has no upper bound.</>,
    more: <>For large <Katex tex="|x|" />, <Katex tex="f(x)\approx\tfrac{3\pi}{2}|x|" />, which grows without limit. The graph is also symmetric about the <Katex tex="y" />-axis, since <Katex tex="f(-x)=(-3x)\arctan(-2x)=3x\arctan(2x)=f(x)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{[0,\infty)}" />,
    reason: <><Katex tex="f" /> is continuous, so it takes every value from 0 upwards. The bracket at 0 is square because <Katex tex="f(0)=0" /> is reached.</>,
    more: <>Only 4% of students scored this mark. The report says many multiplied the ranges of the two factors, giving answers such as <Katex tex="\left(-\tfrac{3\pi}2,\tfrac{3\pi}2\right)" />. That fails twice: <Katex tex="3x" /> has range <Katex tex="R" />, not a bounded interval, and the range of a product is not found by multiplying ranges, because both factors depend on the same <Katex tex="x" />. Here they always share a sign, so the product is never negative.</>,
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
    reason: <>Product rule <Katex tex="u'v+uv'" /> with <Katex tex="u=3x" /> (so <Katex tex="u'=3" />) and <Katex tex="v=\arctan(2x)" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = 3\arctan(2x)+\frac{6x}{1+4x^2}" />,
    reason: <><Katex tex="3x\times2=6x" />. As required.</>,
    more: <>In a "show that", the mark is for the working that gets you here: the derivative of <Katex tex="\arctan(2x)" /> and the product-rule line must both be written out. The report says some arguments were unconvincing because too few steps were shown, and that a few students who wrote <Katex tex="\tan^{-1}(2x)" /> treated it as the reciprocal <Katex tex="\tfrac{1}{\tan(2x)}" />. The <Katex tex="-1" /> means the inverse function, <Katex tex="\arctan" />, not a power.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\int f'(x)\,dx = f(x) = 3x\arctan(2x)" />,
    reason: <>The "hence": <Katex tex="f'(x)" /> from part b contains <Katex tex="3\arctan(2x)" />, so antidifferentiating it gives an equation we can solve for <Katex tex="\int\arctan(2x)\,dx" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &3\int\arctan(2x)\,dx + \int\frac{6x}{1+4x^2}\,dx \\ &\qquad = 3x\arctan(2x) \end{aligned}" />,
    reason: <>Antidifferentiate each term of <Katex tex="f'(x)" /> separately. The first is 3 times the integral we want.</>,
  },
  {
    working: <Katex display tex="\int\frac{6x}{1+4x^2}\,dx = \tfrac34\log_e\!\left(1+4x^2\right)" />,
    reason: <>The numerator is <Katex tex="\tfrac34" /> of the derivative <Katex tex="8x" /> of the denominator — a "derivative over function" (log) integral, not another arctan.</>,
    more: <>The report says some students gave <Katex tex="3\arctan(2x)" /> here. The arctan pattern <Katex tex="\int\tfrac{a}{a^2+x^2}dx" /> needs a constant numerator; an <Katex tex="x" /> in the numerator points to the log. Equivalently, substitute <Katex tex="u=1+4x^2" />, <Katex tex="\tfrac{du}{dx}=8x" />: <Katex tex="\int\tfrac{6x}{1+4x^2}dx=\tfrac34\int\tfrac1u\,du=\tfrac34\log_e(u)" />. If you substitute inside the definite integral instead, change the terminals to <Katex tex="u" />-values: <Katex tex="x=\tfrac12" /> gives <Katex tex="u=2" /> and <Katex tex="x=\tfrac{\sqrt3}{2}" /> gives <Katex tex="u=4" />. The report notes errors in changing the terminals. No absolute value is needed, since <Katex tex="1+4x^2>0" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \int\arctan(2x)\,dx &= x\arctan(2x) \\ &\quad -\tfrac14\log_e\!\left(1+4x^2\right) \end{aligned}" />,
    reason: <>Subtract the log term from both sides, then divide by 3: <Katex tex="\tfrac34\div3=\tfrac14" />.</>,
    more: <>No <Katex tex="+c" /> is needed, because this antiderivative is only used to evaluate a definite integral.</>,
  },
  {
    working: <Katex display tex="A = \Bigl[x\arctan(2x)-\tfrac14\log_e\!\left(1+4x^2\right)\Bigr]_{1/2}^{\sqrt3/2}" />,
    reason: <><Katex tex="g(x)=\arctan(2x)>0" /> on this interval, so the area is the integral outright.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x = \tfrac{\sqrt3}{2}:\quad &\tfrac{\sqrt3}{2}\arctan\!\left(\sqrt3\right)-\tfrac14\log_e(4) \\ &= \tfrac{\sqrt3\pi}{6}-\tfrac12\log_e(2) \end{aligned}" />,
    reason: <><Katex tex="\arctan\!\left(\sqrt3\right)=\tfrac\pi3" /> and <Katex tex="1+4\times\tfrac34=4" />, with <Katex tex="\log_e4=2\log_e2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x = \tfrac12:\quad &\tfrac12\arctan(1)-\tfrac14\log_e(2) \\ &= \tfrac\pi8-\tfrac14\log_e(2) \end{aligned}" />,
    reason: <><Katex tex="\arctan(1)=\tfrac\pi4" /> and <Katex tex="1+4\times\tfrac14=2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{\sqrt3\,\pi}{6}-\frac\pi8-\frac14\log_e(2)}" />,
    reason: <>Upper value minus lower value. The log terms combine: <Katex tex="-\tfrac12\log_e2+\tfrac14\log_e2=-\tfrac14\log_e2" />.</>,
    more: <>Check: <Katex tex="A\approx0.907-0.393-0.173=0.341" />. The strip has width <Katex tex="\tfrac{\sqrt3-1}{2}\approx0.366" />, and the curve rises from <Katex tex="\tfrac\pi4\approx0.785" /> to <Katex tex="\tfrac\pi3\approx1.047" />, so the area must lie between <Katex tex="0.366\times0.785\approx0.287" /> and <Katex tex="0.366\times1.047\approx0.383" />. It does. The <Katex tex="3\arctan(2x)" /> slip gives about 0.252, which fails this check, as the diagram below shows.</>,
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
        <Explore title="Both factors always share a sign, so f(x) is never negative">
          <SignsWidget />
        </Explore>
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
            An antiderivative of <Katex tex="\arctan(2x)" /> is not on the formula sheet. The
            current study design includes integration by parts, which finds one directly (and
            gives the same result), but in 2014 it was not part of the course. The word "hence"
            tells you to get it from part b instead, and the report notes that some students
            ignored it.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="Check an area answer: its equal-area rectangle must have height between π/4 and π/3">
          <CheckWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
