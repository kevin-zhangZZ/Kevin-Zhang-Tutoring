// 2016 Mathematical Methods — Exam 1, Question 5 (11 marks).
// The composite h(x) = logₑ(x² + 1), its domain, range and stationary point, a show-that
// log identity, then the inverse of the same rule restricted to (−∞, 0]. Question text
// transcribed from the original paper (no diagram given). Answers checked with sympy and
// against the VCAA examination report. Solution is original.
// Interactives (qualifying parts, under 40% full marks): a.ii range-through-the-chain, a.iv moving
// tangent (sign of h', inflection points at x = ±1), b.i reflection in y = x choosing the root.
// Skipped: a.iii (a "show that" lost on presentation and bracket notation; a picture does not
// help); b.ii (the b.i reflection already shows k's domain becoming the inverse's range).

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const RangeChain = lazyWidget(() => import('../interactives/meth-2016e1-q5aii-range'))
const Gradient = lazyWidget(() => import('../interactives/meth-2016e1-q5aiv-gradient'))
const Reflect = lazyWidget(() => import('../interactives/meth-2016e1-q5bi-reflect'))

const EXAM_AI: SAExaminerStats = {
  marks: [5, 95],
  average: 1.0,
  comment: (
    <>
      This question was very well answered. The few errors tended to be the result of poor
      notation, for example <Katex tex="\log_e x^2+1" />, rather than a lack of
      understanding in determining the rule of this composite function.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [55, 30, 15],
  average: 0.6,
  comment: (
    <>
      A small proportion of students gained full marks for this question. While poor
      notation was a contributing factor, students appeared to experience difficulty in
      determining the range of the composite function <Katex tex="h" />. A quick sketch over
      the given domain would have been helpful. Students are reminded that the domain and
      range of a function are key aspects of a function.
    </>
  ),
}

const EXAM_AIII: SAExaminerStats = {
  marks: [27, 42, 31],
  average: 1.1,
  comment: (
    <>
      Many students were unsure of how to present their working. In the sample working above,
      both sides were operated on separately to arrive at the same expression and the
      conclusion that one side was in fact equivalent to the other. Poor notation was again
      evident, in particular <Katex tex="\log_e(-x^2+1)\ne\log_e((-x)^2+1)" />.
    </>
  ),
}

const EXAM_AIV: SAExaminerStats = {
  marks: [45, 28, 27],
  average: 0.8,
  comment: (
    <>
      Most students could equate the correct derivative to <Katex tex="0" />. However, many
      then were unable to solve the equation, forgetting that a fraction is zero when its
      numerator is zero. Of those who managed a solution, some overlooked the second part of
      the question or assumed that the stationary point was a point of inflection.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [18, 65, 16],
  average: 1.0,
  comment: (
    <>
      Students appeared quite adept at the mechanics of determining the rule for the
      inverse: swap <Katex tex="x" /> and <Katex tex="y" /> then rearrange. However, few
      students took care to determine the range of the inverse function and select for the
      negative root of their expression.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [36, 40, 24],
  average: 0.9,
  comment: (
    <>
      This question was not answered well. Most students utilised the fact that{' '}
      <Katex tex="\text{Range}_{k^{-1}}=\text{Domain}_k" /> but found stating the domain of
      the inverse function more difficult. Again, poor notation was evident.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = f(g(x)) = f(x^2+1)" />,
    reason: <>Inside first: <Katex tex="g" /> acts, then <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="\boxed{h(x) = \log_e\!\left(x^2+1\right)}" />,
    reason: <>Keep the brackets: written as <Katex tex="\log_e x^2+1" /> it reads as <Katex tex="\log_e(x^2)+1" />, a different function.</>,
    more: <>That missing-bracket form is the notation error the report flags. Its general comments add that a logarithm needs its base, so write <Katex tex="\log_e" />, not just <Katex tex="\log" />.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{ran}(g) = [1,\infty) \subseteq (0,\infty) = \text{dom}(f)" />,
    reason: <>Check the composite exists: <Katex tex="x^2+1\ge1" /> for every real <Katex tex="x" />, and that is inside the domain of <Katex tex="\log_e" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{dom}(h) = R}" />,
    reason: <>No real <Katex tex="x" /> is excluded, so <Katex tex="h" /> has the whole domain of <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="x^2+1 \ge 1 \implies \log_e(x^2+1) \ge \log_e(1) = 0" />,
    reason: <>Range from the inside out: <Katex tex="\log_e" /> is increasing, so the smallest input <Katex tex="1" /> (at <Katex tex="x=0" />) gives the smallest output <Katex tex="0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(h) = [0,\infty)}" />,
    reason: <>Square bracket at <Katex tex="0" />, because <Katex tex="0" /> is reached. No upper limit, since <Katex tex="x^2+1\to\infty" /> as <Katex tex="x\to\pm\infty" />.</>,
    more: <>Two tempting wrong answers: <Katex tex="R" /> (the range of <Katex tex="\log_e" /> on its own, forgetting its inputs here are only <Katex tex="[1,\infty)" />) and <Katex tex="[1,\infty)" /> (the range of <Katex tex="g" />, forgetting to apply <Katex tex="\log_e" /> to it). The report&apos;s general comments name <Katex tex="(0,\infty)" /> in place of <Katex tex="[0,\infty)" /> as a common error in this part. The quick sketch the report recommends settles all three: a U-shaped curve, symmetric about the <Katex tex="y" />-axis, touching the origin and rising slowly on both sides.</>,
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\text{LHS} &= h(x)+h(-x) \\ &= \log_e\!\left(x^2+1\right) \\ &\quad +\log_e\!\left((-x)^2+1\right)\end{aligned}" />,
    reason: <>Substitute <Katex tex="-x" /> for <Katex tex="x" /> in brackets: <Katex tex="(-x)^2=x^2" />, not <Katex tex="-x^2" />.</>,
    more: <>The report singles out this slip: <Katex tex="\log_e(-x^2+1)" /> is not <Katex tex="\log_e((-x)^2+1)" />. Without the brackets, the square applies only to <Katex tex="x" /> and the minus sign survives.</>,
  },
  {
    working: <Katex display tex="= 2\log_e\!\left(x^2+1\right)" />,
    reason: <>Since <Katex tex="(-x)^2+1=x^2+1" />, the two logarithms are the same term, so add them.</>,
  },
  {
    working: <Katex display tex="\text{RHS} = f\!\left(\bigl(g(x)\bigr)^2\right) = \log_e\!\left(\left(x^2+1\right)^2\right)" />,
    reason: <>Now the other side, separately. <Katex tex="\bigl(g(x)\bigr)^2" /> is the output squared, not <Katex tex="g(x^2)" />.</>,
  },
  {
    working: <Katex display tex="= 2\log_e\!\left(x^2+1\right)" />,
    reason: <>By the power law <Katex tex="\log_e(a^n)=n\log_e a" />.</>,
  },
  {
    working: <Katex display tex="\therefore\ h(x)+h(-x)=f\!\left(\bigl(g(x)\bigr)^2\right)" />,
    reason: <>Both sides reduce to the same expression. As required.</>,
    more: <>This is how the report&apos;s sample working is set out: each side simplified on its own, then a concluding line. The report says many students were unsure how to present this. The safe pattern for any &ldquo;show that&rdquo;: never write the target equation as if it were already true, and finish by stating it.</>,
  },
]

const ROWS_AIV: WorkingRow[] = [
  {
    working: <Katex display tex="h'(x) = \frac{2x}{x^2+1}" />,
    reason: <>Chain rule for <Katex tex="\log_e" />: derivative of the inside over the inside.</>,
  },
  {
    working: <Katex display tex="\frac{2x}{x^2+1} = 0 \implies 2x = 0 \implies x = 0" />,
    reason: <>A fraction is zero exactly when its numerator is zero; the denominator <Katex tex="x^2+1" /> is never zero.</>,
    more: <>The report says many students stalled here, unable to solve this equation. There is nothing to expand or cross-multiply: set the numerator to zero.</>,
  },
  {
    working: <Katex display tex="h(0) = \log_e(1) = 0" />,
    reason: <>The <Katex tex="y" />-coordinate, so the stationary point is the origin.</>,
  },
  {
    working: <Katex display tex="h(x)\ge h(0) = 0 \text{ for all } x" />,
    reason: <>By the range in part a.ii., no point of the curve is below the origin, so it is the lowest point: a minimum.</>,
    more: (
      <>
        <p>A sign table on <Katex tex="h'" /> gives the same result, and works when no range is available. The denominator is always positive, so <Katex tex="h'" /> has the sign of <Katex tex="2x" />:</p>
        <Katex display tex="\begin{array}{c|c|c|c} x & -1 & 0 & 1 \\ \hline h'(x) & -1 & 0 & 1 \end{array}" />
        <p>Negative, then zero, then positive: down, flat, up, which is a minimum. The report also accepts symmetry of <Katex tex="x^2+1" /> with <Katex tex="\log_e" /> increasing, or a graph.</p>
        <p>It is not a point of inflection. A stationary point of inflection needs <Katex tex="h'" /> to have the same sign on both sides. <Katex tex="h" /> does have inflection points, at <Katex tex="x=\pm1" /> where <Katex tex="h''(x)=\frac{2(1-x^2)}{(x^2+1)^2}=0" />, but their gradients are <Katex tex="\pm1" />, so they are not stationary.</p>
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{(0,0), \text{ a local minimum}}" />,
    reason: <>Give both the coordinates <em>and</em> the nature.</>,
    more: <>The report notes that some students who found the point overlooked the second part of the question (its nature), and some assumed it was a point of inflection.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="x = \log_e\!\left(y^2+1\right)" />,
    reason: <>For the inverse, swap <Katex tex="x" /> and <Katex tex="y" /> in <Katex tex="y=\log_e(x^2+1)" />, then make <Katex tex="y" /> the subject.</>,
  },
  {
    working: <Katex display tex="e^{x} = y^2+1" />,
    reason: <>Exponentiating both sides undoes the logarithm.</>,
  },
  {
    working: <Katex display tex="y^2 = e^{x}-1 \implies y = \pm\sqrt{e^{x}-1}" />,
    reason: <>Two roots, and only one of them is the inverse of <Katex tex="k" />. Choosing the right one is where most students lost a mark.</>,
  },
  {
    working: <Katex display tex="\text{ran}(k^{-1}) = \text{dom}(k) = (-\infty,0]" />,
    reason: <>The inverse&apos;s outputs are the original&apos;s inputs, which are all <Katex tex="\le0" />. So take the negative root.</>,
  },
  {
    working: <Katex display tex="\boxed{k^{-1}(x) = -\sqrt{e^{x}-1}}" />,
    reason: <>Negative root only: leaving <Katex tex="\pm" />, or taking the positive root, does not give the inverse of <Katex tex="k" />.</>,
    more: <>The report says students handled the swap-and-rearrange well, but few took care to determine the range of the inverse and select the negative root. A quick check: <Katex tex="k(-1)=\log_e 2" />, and <Katex tex="-\sqrt{e^{\log_e 2}-1}=-\sqrt{1}=-1" />, back where we started. The positive root would give <Katex tex="+1" />, which is not in the domain of <Katex tex="k" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="x\le0 \implies x^2\ge0 \implies x^2+1\ge1" />,
    reason: <>On the restricted domain, <Katex tex="x^2" /> still takes every value in <Katex tex="[0,\infty)" />, so the inside covers all of <Katex tex="[1,\infty)" />.</>,
  },
  {
    working: <Katex display tex="\text{ran}(k) = [0,\infty)" />,
    reason: <>As in part a.ii.: <Katex tex="\log_e" /> maps <Katex tex="[1,\infty)" /> to <Katex tex="[0,\infty)" />. Restricting the domain lost no outputs; it only made <Katex tex="k" /> one-to-one.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{dom}(k^{-1}) = \text{ran}(k) = [0,\infty)}" />,
    reason: <>The domain of an inverse is the range of the original.</>,
    more: <>This is the half the report says students found harder. As a check, the rule <Katex tex="-\sqrt{e^x-1}" /> from part b.i. is defined exactly when <Katex tex="e^x\ge1" />, i.e. <Katex tex="x\ge0" />, which agrees. The report&apos;s general comments name <Katex tex="(0,\infty)" /> in place of <Katex tex="[0,\infty)" /> as a common error here: <Katex tex="k^{-1}(0)=0" />, so <Katex tex="0" /> belongs.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(k^{-1}) = \text{dom}(k) = (-\infty,0]}" />,
    reason: <>The range of an inverse is the domain of the original, the same fact that forced the negative root in part b.i.</>,
  },
]

export default function MethodsQ5_2016Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (11 marks)</p>
        <p>
          Let <Katex tex="f:(0,\infty)\to R" />, where <Katex tex="f(x)=\log_e(x)" /> and{' '}
          <Katex tex="g:R\to R" />, where <Katex tex="g(x)=x^2+1" />.
        </p>
      </div>

      <PartCard
        letter="a.i"
        topic="Composite Function"
        marks={1}
        statement={
          <>
            Find the rule for <Katex tex="h" />, where <Katex tex="h(x)=f(g(x))" />.
          </>
        }
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Domain & Range"
        marks={2}
        statement={<>State the domain and range of <Katex tex="h" />.</>}
        examinerReport={EXAM_AII}
      >
        <Background title="The range of a composite comes from the inside out">
          <p>
            Work through the chain, not the final formula: the allowed inputs give the inside
            function&apos;s range; that range is the set of inputs to the outer function, and its
            outputs on that set are the range of the composite.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <Explore title="Follow x through the chain: the inside never drops below 1, so h never drops below 0">
          <RangeChain />
        </Explore>
      </PartCard>

      <PartCard
        letter="a.iii"
        topic="Log Laws"
        marks={2}
        statement={
          <>
            Show that <Katex tex="h(x)+h(-x)=f\!\left(\bigl(g(x)\bigr)^2\right)" />.
          </>
        }
        examinerReport={EXAM_AIII}
      >
        <WorkingTable rows={ROWS_AIII} />
      </PartCard>

      <PartCard
        letter="a.iv"
        topic="Stationary Point"
        marks={2}
        statement={
          <>
            Find the coordinates of the stationary point of <Katex tex="h" /> and state its
            nature.
          </>
        }
        examinerReport={EXAM_AIV}
      >
        <WorkingTable rows={ROWS_AIV} />
        <Explore title="The gradient goes from negative to positive at x = 0: a minimum, not an inflection">
          <Gradient />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="k:(-\infty,0]\to R" />, where{' '}
          <Katex tex="k(x)=\log_e\!\left(x^2+1\right)" />.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Inverse Function"
        marks={2}
        statement={<>Find the rule for <Katex tex="k^{-1}" />.</>}
        examinerReport={EXAM_BI}
      >
        <Background title="Why the domain was restricted">
          <p>
            <Katex tex="h" /> on all of <Katex tex="R" /> is even (<Katex tex="h(-x)=h(x)" />, so <Katex tex="x" /> and{' '}
            <Katex tex="-x" /> give the same output), so it fails the
            horizontal-line test and has no inverse. Cutting the domain down to{' '}
            <Katex tex="(-\infty,0]" /> keeps only the decreasing half, which is one-to-one.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <Explore title="Reflect k in y = x: only the negative root lands on the reflected points">
          <Reflect />
        </Explore>
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Domain & Range"
        marks={2}
        statement={<>State the domain and range of <Katex tex="k^{-1}" />.</>}
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>
    </div>
  )
}
