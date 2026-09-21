// 2016 Mathematical Methods — Exam 1, Question 5 (11 marks).
// The composite h(x) = logₑ(x² + 1), its domain, range and stationary point, a show-that
// log identity, then the inverse of the same rule restricted to (−∞, 0]. Question text
// transcribed from the original paper (no diagram given). Answers checked with sympy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

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
      the given domain would have been helpful.
    </>
  ),
}

const EXAM_AIII: SAExaminerStats = {
  marks: [27, 42, 31],
  average: 1.1,
  comment: (
    <>
      Many students were unsure of how to present their working. Operating on both sides
      separately to arrive at the same expression, and then concluding that one side is
      equivalent to the other, is a clear way to set it out. Poor notation was again
      evident, in particular <Katex tex="\log_e(-x^2+1)" /> for{' '}
      <Katex tex="\log_e((-x)^2+1)" />.
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
      inverse: swap <Katex tex="x" /> and <Katex tex="y" />, then rearrange. However, few
      students took care to determine the range of the inverse function and select the
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
      <Katex tex="\text{ran}(k^{-1})=\text{dom}(k)" /> but found stating the domain of the
      inverse function more difficult.
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
    reason: <>The brackets are not optional — <Katex tex="\log_e x^2+1" /> means something else entirely, and the report flags exactly that.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{ran}(g) = [1,\infty) \subseteq (0,\infty) = \text{dom}(f)" />,
    reason: <>Check the composite exists: <Katex tex="x^2+1\ge1" /> for every real <Katex tex="x" />, and that is inside the domain of <Katex tex="\log_e" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{dom}(h) = R}" />,
    reason: <>Every real <Katex tex="x" /> survives, so the domain of <Katex tex="h" /> is the whole domain of <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="x^2+1 \ge 1 \implies \log_e(x^2+1) \ge \log_e(1) = 0" />,
    reason: <><Katex tex="\log_e" /> is increasing, so the inequality carries through. The minimum <Katex tex="0" /> is attained at <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(h) = [0,\infty)}" />,
    reason: <>Unbounded above, since <Katex tex="x^2+1\to\infty" />. Only <Katex tex="15\%" /> of students got both the domain and the range.</>,
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{LHS} = h(x)+h(-x) = \log_e\!\left(x^2+1\right)+\log_e\!\left((-x)^2+1\right)" />,
    reason: <>Note <Katex tex="(-x)^2=x^2" />, not <Katex tex="-x^2" /> — the report singles this notation slip out.</>,
  },
  {
    working: <Katex display tex="= 2\log_e\!\left(x^2+1\right)" />,
    reason: <>The two logarithms are identical, because <Katex tex="h" /> is an even function.</>,
  },
  {
    working: <Katex display tex="\text{RHS} = f\!\left(\bigl(g(x)\bigr)^2\right) = \log_e\!\left(\left(x^2+1\right)^2\right)" />,
    reason: <>Working the other side separately. Careful: it is <Katex tex="\bigl(g(x)\bigr)^2" />, the output squared — not <Katex tex="g(x^2)" />.</>,
  },
  {
    working: <Katex display tex="= 2\log_e\!\left(x^2+1\right)" />,
    reason: <>By the power law <Katex tex="\log_e(a^n)=n\log_e a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{LHS} = \text{RHS}}" />,
    reason: <>Both sides reduce to the same expression, so the identity holds. The report recommends exactly this two-column layout for "show that" questions.</>,
  },
]

const ROWS_AIV: WorkingRow[] = [
  {
    working: <Katex display tex="h'(x) = \frac{2x}{x^2+1}" />,
    reason: <>Chain rule: derivative of the inside over the inside.</>,
  },
  {
    working: <Katex display tex="\frac{2x}{x^2+1} = 0 \implies 2x = 0 \implies x = 0" />,
    reason: <>A fraction is zero exactly when its numerator is — and <Katex tex="x^2+1" /> is never zero, so nothing is lost. The report says many students stalled at this step.</>,
  },
  {
    working: <Katex display tex="h(0) = \log_e(1) = 0" />,
    reason: <>So the stationary point is at the origin.</>,
  },
  {
    working: <Katex display tex="h(x)\ge0 = h(0) \text{ for all } x" />,
    reason: <>From the range in part (a)(ii) — nothing on the curve is below the origin, so it must be the lowest point. A sign table on <Katex tex="h'" /> gives the same conclusion.</>,
  },
  {
    working: <Katex display tex="\boxed{(0,0), \text{ a local minimum}}" />,
    reason: <>Both parts of the question: the coordinates <em>and</em> the nature. The report notes students who gave one without the other, and others who called it a point of inflection.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="x = \log_e\!\left(y^2+1\right)" />,
    reason: <>Swap <Katex tex="x" /> and <Katex tex="y" />, then make <Katex tex="y" /> the subject.</>,
  },
  {
    working: <Katex display tex="e^{x} = y^2+1" />,
    reason: <>Exponentiating both sides undoes the logarithm.</>,
  },
  {
    working: <Katex display tex="y^2 = e^{x}-1 \implies y = \pm\sqrt{e^{x}-1}" />,
    reason: <>Two roots — and choosing between them is the second mark.</>,
  },
  {
    working: <Katex display tex="\text{ran}(k^{-1}) = \text{dom}(k) = (-\infty,0]" />,
    reason: <>The outputs of the inverse must be the inputs of the original, and those were all non-positive. So take the negative root.</>,
  },
  {
    working: <Katex display tex="\boxed{k^{-1}(x) = -\sqrt{e^{x}-1}}" />,
    reason: <>The report says few students made this choice deliberately — most left a <Katex tex="\pm" /> or took the positive root by habit.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{ran}(k) = \text{ran of } \log_e(x^2+1) \text{ on } (-\infty,0]" />,
    reason: <>On <Katex tex="(-\infty,0]" /> the inside <Katex tex="x^2+1" /> runs over <Katex tex="[1,\infty)" /> — the same set as on all of <Katex tex="R" />, because the left half of the parabola already covers it.</>,
  },
  {
    working: <Katex display tex="\text{ran}(k) = [0,\infty)" />,
    reason: <>So restricting the domain lost no output values; it only made the function one-to-one, which is what allows an inverse to exist.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{dom}(k^{-1}) = \text{ran}(k) = [0,\infty)}" />,
    reason: <>The domain of an inverse is the range of the original. This is the half the report says students found harder.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(k^{-1}) = \text{dom}(k) = (-\infty,0]}" />,
    reason: <>And the range of an inverse is the domain of the original — which is also the fact that forced the negative root in part (b)(i).</>,
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
        marks={2}
        statement={<>State the domain and range of <Katex tex="h" />.</>}
        examinerReport={EXAM_AII}
      >
        <Background title="The range of a composite comes from the inside out">
          <p>
            Work through the chain, not the final formula. Here <Katex tex="x" /> ranges over{' '}
            <Katex tex="R" />, so <Katex tex="x^2+1" /> ranges over{' '}
            <Katex tex="[1,\infty)" />, so <Katex tex="\log_e" /> of that ranges over{' '}
            <Katex tex="[0,\infty)" />.
          </p>
          <p>
            Trying to read the range off <Katex tex="\log_e(x^2+1)" /> directly is where most
            of the state came unstuck — only <Katex tex="15\%" /> got full marks.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="a.iii"
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
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="k:(-\infty,0]\to R" />, where{' '}
          <Katex tex="k(x)=\log_e\!\left(x^2+1\right)" />.
        </p>
      </div>

      <PartCard
        letter="b.i"
        marks={2}
        statement={<>Find the rule for <Katex tex="k^{-1}" />.</>}
        examinerReport={EXAM_BI}
      >
        <Background title="Why the domain was restricted">
          <p>
            <Katex tex="h" /> on all of <Katex tex="R" /> is even, so it fails the
            horizontal-line test and has no inverse. Cutting the domain down to{' '}
            <Katex tex="(-\infty,0]" /> keeps only the decreasing half, which is one-to-one.
          </p>
          <p>
            That restriction is what decides the sign at the end: the inverse must return
            values in <Katex tex="(-\infty,0]" />, so the negative square root is the only
            possible choice.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        marks={2}
        statement={<>State the domain and range of <Katex tex="k^{-1}" />.</>}
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>
    </div>
  )
}
