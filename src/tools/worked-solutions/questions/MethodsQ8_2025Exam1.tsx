// 2025 Mathematical Methods — Exam 1 Question 8 (5 marks). A triangular density: solving
// for a percentile, then integrating a linear transformation of it. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [30, 23, 23, 24],
  average: 1.4,
  comment: (
    <>
      Students could either set up the integral{' '}
      <Katex tex="\displaystyle\int_k^{\frac{4}{3}}\frac{3}{8}(4-3x)\,dx=\frac{9}{16}" />, the
      integral <Katex tex="\displaystyle\int_0^k\frac{3}{8}(4-3x)\,dx=\frac{7}{16}" /> or form an
      area equation using a triangle or trapezium. Most students were able to form a definite
      integral and integrate correctly to obtain a quadratic equation. Some students who chose to
      integrate the <Katex tex="(4-3x)" /> term as a bracketed term (as in method 1), raised the
      power to 2 but then divided by 2 instead of 6. Some students were unable to form the correct
      quadratic equation or solve it correctly. The quadratic expression was readily factorised by
      inspection, but a large proportion of students used the quadratic formula or other techniques
      such as splitting the middle term and grouping. Some students did not convert fractional
      coefficients into integers before solving; for example, using{' '}
      <Katex tex="\dfrac{3}{2}k^2-4k+\dfrac{7}{6}=0" /> instead of the simpler{' '}
      <Katex tex="9k^2-24k+7=0" />. Students who obtained the two possible solutions were mostly
      aware of rejecting <Katex tex="\dfrac{7}{3}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [51, 22, 27],
  average: 0.8,
  comment: (
    <>
      This question was not responded to well. Most students correctly rewrote{' '}
      <Katex tex="h(x)" /> as <Katex tex="m\left(\dfrac{3}{8}(4-3x)\right)+n" />. However, many
      students incorrectly proceeded to factor out <Katex tex="m" /> from the entire integral
      without noticing that this was not algebraically valid. The students who recognised that the
      total probability is equal to 1 and applied it, were generally successful.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X>k) = \int_k^{4/3}\frac38(4-3x)\,dx = \frac{9}{16}" />,
    reason: <><Katex tex="\Pr(X>k)" /> is the area under <Katex tex="f" /> to the right of <Katex tex="k" />, which stops at <Katex tex="\tfrac43" /> where the density ends. Setting up this integral is the first mark.</>,
    more: <>The report also accepts the complement, <Katex tex="\int_0^k\frac38(4-3x)\,dx=1-\frac{9}{16}=\frac{7}{16}" />, or an area equation from the triangle in the Background (or a trapezium for the complement, area <Katex tex="\tfrac{7}{16}" />); every route gives the same quadratic.</>,
  },
  {
    working: <Katex display tex="\int\frac38(4-3x)\,dx = -\frac{(4-3x)^2}{16}" />,
    reason: <>Reverse chain rule: raise the power to <Katex tex="(4-3x)^2" />, then divide by the new power 2 <em>and</em> the inner derivative <Katex tex="-3" />: <Katex tex="\tfrac38\div(-6)=-\tfrac{1}{16}" />.</>,
    more: <>The report notes some students raised the power to 2 but then divided by 2 instead of 6 — forgetting the inner derivative <Katex tex="-3" />. Differentiate your answer to check: <Katex tex="-\tfrac{1}{16}\times2(4-3x)\times(-3)=\tfrac38(4-3x)" />. Expanding first also works: <Katex tex="\int\left(\tfrac32-\tfrac98x\right)dx=\tfrac32x-\tfrac{9}{16}x^2" />, though that route gives fractional coefficients to clear later.</>,
  },
  {
    working: <Katex display tex="\left[-\frac{(4-3x)^2}{16}\right]_k^{4/3} = 0+\frac{(4-3k)^2}{16}" />,
    reason: <>At <Katex tex="x=\tfrac43" /> the bracket <Katex tex="(4-3x)" /> is zero, so the upper limit contributes 0 and only the <Katex tex="k" /> term remains.</>,
  },
  {
    working: <Katex display tex="\frac{(4-3k)^2}{16} = \frac{9}{16} \implies (4-3k)^2 = 9" />,
    reason: <>Multiply both sides by 16.</>,
  },
  {
    working: <Katex display tex="4-3k = \pm3 \implies k = \frac13 \ \text{ or } \ k = \frac73" />,
    reason: <>Square-root both sides, keeping both signs: <Katex tex="4-3k=3" /> gives <Katex tex="\tfrac13" />, and <Katex tex="4-3k=-3" /> gives <Katex tex="\tfrac73" />.</>,
    more: <>Expanding <Katex tex="(4-3k)^2=9" />, or clearing fractions if you used the expanded antiderivative, gives <Katex tex="9k^2-24k+7=0" />, which factorises by inspection as <Katex tex="(3k-1)(3k-7)=0" />. The report notes many students used the quadratic formula or grouping instead, and some solved with fractional coefficients such as <Katex tex="\tfrac32k^2-4k+\tfrac76=0" /> — multiply through to integer coefficients first.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \frac13}" />,
    reason: <><Katex tex="k" /> must lie in <Katex tex="\left[0,\tfrac43\right]" />, where <Katex tex="X" /> takes its values; <Katex tex="\tfrac73>\tfrac43" /> is outside, so it is rejected.</>,
    more: <>Check: <Katex tex="\Pr\left(X>\tfrac13\right)=\tfrac{(4-1)^2}{16}=\tfrac{9}{16}" />. The root <Katex tex="\tfrac73" /> appears only because squaring makes <Katex tex="(4-3k)^2" /> blind to sign; the formula <Katex tex="\tfrac{(4-3k)^2}{16}" /> is only valid for <Katex tex="0\le k\le\tfrac43" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^{4/3}h(x)\,dx = \int_0^{4/3}\bigl(mf(x)+n\bigr)\,dx" />,
    reason: <>Substitute <Katex tex="h(x)=mf(x)+n" />; the whole of <Katex tex="h" /> is integrated.</>,
  },
  {
    working: <Katex display tex="= m\int_0^{4/3}f(x)\,dx+\int_0^{4/3}n\,dx" />,
    reason: <>Split the integral of a sum. <Katex tex="m" /> multiplies <Katex tex="f(x)" /> only, so it comes out of the first integral alone — <Katex tex="n" /> is not multiplied by <Katex tex="m" />.</>,
    more: <>The report notes many students factored <Katex tex="m" /> out of the entire integral, writing <Katex tex="m\int_0^{4/3}\bigl(f(x)+n\bigr)\,dx" />. That treats <Katex tex="mf(x)+n" /> as <Katex tex="m\bigl(f(x)+n\bigr)" /> and leads to the wrong answer <Katex tex="m+\tfrac{4mn}{3}" />.</>,
  },
  {
    working: <Katex display tex="\int_0^{4/3}f(x)\,dx = 1" />,
    reason: <><Katex tex="f" /> is a probability density function and <Katex tex="\left[0,\tfrac43\right]" /> is its whole support, so this integral is the total probability, 1 — no calculation needed.</>,
    more: <>The report notes the students who recognised the total probability is 1 were generally successful. Integrating directly confirms it, using part a's antiderivative: <Katex tex="\left[-\tfrac{(4-3x)^2}{16}\right]_0^{4/3}=0+\tfrac{16}{16}=1" />.</>,
  },
  {
    working: <Katex display tex="\int_0^{4/3}n\,dx = n\times\frac43" />,
    reason: <>The integral of a constant is the constant times the interval width, <Katex tex="\tfrac43-0" /> (a rectangle of height <Katex tex="n" />).</>,
  },
  {
    working: <Katex display tex="\boxed{\int_0^{4/3}h(x)\,dx = m+\frac{4n}{3}}" />,
    reason: <><Katex tex="m\times1+\tfrac43n" />, in terms of <Katex tex="m" /> and <Katex tex="n" /> as required.</>,
  },
]

export default function MethodsQ8_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (5 marks)</p>
        <p>Consider</p>
        <div className="py-1">
          <Katex
            display
            tex="f(x)=\begin{cases}\dfrac38(4-3x) & 0\le x\le\dfrac43\\[8pt] 0 & \text{otherwise}\end{cases}"
          />
        </div>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The density is a straight line falling to zero at <Katex tex="x=\tfrac43" />, so
              the region beyond <Katex tex="k" /> is a triangle — area{' '}
              <Katex tex="\tfrac12\times\left(\tfrac43-k\right)\times\tfrac38(4-3k)" />, which
              gives the same quadratic as the integral with no antidifferentiation at all.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Continuous PDF"
        marks={3}
        statement={
          <>
            The continuous random variable <Katex tex="X" /> has probability density function{' '}
            <Katex tex="f(x)" />.
            <br />
            Find <Katex tex="k" /> such that{' '}
            <Katex tex="\Pr(X>k)=\dfrac{9}{16}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Transformed PDF"
        marks={2}
        statement={
          <>
            The function <Katex tex="h(x)" /> is a transformation of <Katex tex="f(x)" /> such
            that
            <Katex display tex="h(x)=mf(x)+n" />
            where <Katex tex="m" /> and <Katex tex="n" /> are real numbers.
            <br />
            Find <Katex tex="\displaystyle\int_0^{\frac43}h(x)\,dx" /> in terms of{' '}
            <Katex tex="m" /> and <Katex tex="n" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
