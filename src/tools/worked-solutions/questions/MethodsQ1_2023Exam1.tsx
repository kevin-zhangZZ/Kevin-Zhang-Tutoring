// 2023 Mathematical Methods — Exam 1 Question 1 (4 marks). A quotient rule that has to be
// simplified, then a product rule evaluated at an exact value. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.
// Oct 2026 review: no interactive (full marks a 42%, b 65%; neither under 40%). Concise
// reasons trimmed to the step itself; the product-rule alternative, the report's traps
// (missing bracket, unsimplified e^x/e^{2x}, mixed e^{2x}/e^x, surd handling) and the
// accepted forms moved to each row's `more` (Detailed only).

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [8, 50, 42],
  average: 1.3,
  comment: (
    <>
      This question was well attempted and required students to use either the product rule or
      quotient rule to find the derivative. The question required students to simplify their
      answers. Many students simplified the quadratic component but left the exponential terms
      unsimplified. Some students did not use brackets around terms and subsequently did not
      correctly develop the signs of terms, or collect 'like terms'. For example,{' '}
      <Katex tex="\tfrac{-x^2+x-1}{e^x}" /> was a common incorrect response.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [9, 26, 65],
  average: 1.6,
  comment: (
    <>
      Students generally responded to this question well. The question required students to use
      the product rule to differentiate and then evaluate the derivative at{' '}
      <Katex tex="x=\tfrac\pi4" />. There was no requirement to give the answer in a
      particular form. Some students did not demonstrate an understanding of how to
      differentiate <Katex tex="e^{2x}" /> correctly and produced responses that had a
      combination of <Katex tex="e^{2x}" /> and <Katex tex="e^x" /> terms. Some students
      presented responses indicating that they did not know how to arithmetically engage with
      the surd terms in their answer.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="u=x^2-x,\quad v=e^x" />
        <Katex display tex="u'=2x-1,\quad v'=e^x" />
      </>
    ),
    reason: (
      <>
        <Katex tex="y" /> is one expression divided by another, so use the quotient rule (it is
        on the formula sheet). Name the top <Katex tex="u" /> and the bottom{' '}
        <Katex tex="v" />, and write their derivatives down first.
      </>
    ),
    more: (
      <>
        The product rule works just as well; the report says either rule could be used. Write{' '}
        <Katex tex="y=\left(x^2-x\right)e^{-x}" /> with <Katex tex="u=x^2-x" /> and{' '}
        <Katex tex="v=e^{-x}" />. Then <Katex tex="v'=-e^{-x}" /> (use{' '}
        <Katex tex="\tfrac{d}{dx}e^{kx}=ke^{kx}" /> with <Katex tex="k=-1" />), and that minus
        sign is where the subtraction comes from:{' '}
        <Katex tex="\tfrac{dy}{dx}=u'v+uv'=(2x-1)e^{-x}-\left(x^2-x\right)e^{-x}=\left(-x^2+3x-1\right)e^{-x}" />,
        the same answer with no fraction left to simplify. The bracket around{' '}
        <Katex tex="x^2-x" /> matters just as much on that route.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{(2x-1)e^x-\left(x^2-x\right)e^x}{\left(e^x\right)^2}" />,
    reason: (
      <>
        Substitute into <Katex tex="\dfrac{dy}{dx}=\dfrac{v\,u'-u\,v'}{v^2}" />. Keep the bracket
        around <Katex tex="x^2-x" />: the minus sign in front applies to both of its terms.
      </>
    ),
  },
  {
    working: <Katex display tex="= \frac{e^x\left(2x-1-x^2+x\right)}{e^{2x}}" />,
    reason: (
      <>
        Take out the common factor <Katex tex="e^x" /> on top so it can cancel next, and use{' '}
        <Katex tex="\left(e^x\right)^2=e^{2x}" />. Expand the bracket:{' '}
        <Katex tex="-\left(x^2-x\right)=-x^2+x" />.
      </>
    ),
    more: (
      <>
        The report says some students did not use brackets and so got the signs wrong. Without
        the bracket, the minus reaches only the <Katex tex="x^2" />, so the top becomes{' '}
        <Katex tex="2x-1-x^2-x=-x^2+x-1" /> and the answer comes out as{' '}
        <Katex tex="\tfrac{-x^2+x-1}{e^x}" />, the report&apos;s common incorrect response.
        Writing the bracket in the quotient-rule line, then expanding it carefully here, is what
        prevents it.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{-x^2+3x-1}{e^x}}" />,
    reason: (
      <>
        Collect like terms, <Katex tex="2x+x=3x" />, and cancel one <Katex tex="e^x" />:{' '}
        <Katex tex="\tfrac{e^x}{e^{2x}}=\tfrac{1}{e^x}" />. This cancelling is part of the
        &ldquo;simplify&rdquo; the question asks for.
      </>
    ),
    more: (
      <>
        The report says many students simplified the quadratic but left the exponential terms
        unsimplified. Stopping at{' '}
        <Katex tex="\tfrac{e^x\left(-x^2+3x-1\right)}{e^{2x}}" /> is one way to do that: the
        fraction still has{' '}
        <Katex tex="e^x" /> on top and <Katex tex="e^{2x}" /> underneath, so it is not finished.
        You can cancel only because <Katex tex="e^x" /> is a factor of the <em>whole</em>{' '}
        numerator, not of just one term. The report&apos;s sample answer also
        gives <Katex tex="\tfrac{-\left(x^2-3x+1\right)}{e^x}" /> or{' '}
        <Katex tex="\left(-x^2+3x-1\right)e^{-x}" />.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="u=\sin(x),\quad v=e^{2x}" />
        <Katex display tex="u'=\cos(x),\quad v'=2e^{2x}" />
      </>
    ),
    reason: (
      <>
        <Katex tex="f" /> is one function multiplied by another, so use the product rule. For{' '}
        <Katex tex="v'" />, <Katex tex="\tfrac{d}{dx}e^{kx}=ke^{kx}" /> (formula sheet) gives{' '}
        <Katex tex="2e^{2x}" />: the exponent stays <Katex tex="2x" />.
      </>
    ),
    more: (
      <>
        That means a correct derivative has <Katex tex="e^{2x}" /> in every term and no{' '}
        <Katex tex="e^x" /> anywhere. The report says some students produced a mix of{' '}
        <Katex tex="e^{2x}" /> and <Katex tex="e^x" /> terms. One way that happens is treating
        the 2 like a power that comes down and disappears, writing <Katex tex="v'=2e^x" />. If an{' '}
        <Katex tex="e^x" /> turns up in your <Katex tex="f'(x)" />, recheck <Katex tex="v'" />.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(x) = \cos(x)e^{2x}+2\sin(x)e^{2x}" />,
    reason: <>Product rule: <Katex tex="f'(x)=u'v+uv'" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}f'\!\left(\tfrac\pi4\right) &= \cos\!\left(\tfrac\pi4\right)e^{\frac\pi2}\\&\quad+2\sin\!\left(\tfrac\pi4\right)e^{\frac\pi2}\end{aligned}"
      />
    ),
    reason: (
      <>
        Substitute <Katex tex="x=\tfrac\pi4" /> everywhere. In the exponent,{' '}
        <Katex tex="2\times\tfrac\pi4=\tfrac\pi2" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= \frac{\sqrt2}{2}e^{\frac\pi2}+2\cdot\frac{\sqrt2}{2}e^{\frac\pi2}" />,
    reason: (
      <>
        Exact values: <Katex tex="\cos\!\left(\tfrac\pi4\right)=\sin\!\left(\tfrac\pi4\right)=\tfrac{\sqrt2}{2}" />{' '}
        (the same as <Katex tex="\tfrac{1}{\sqrt2}" />).
      </>
    ),
  },
  {
    working: <Katex display tex="= \frac{\sqrt2}{2}e^{\frac\pi2}\,(1+2)" />,
    reason: (
      <>
        Both terms contain the same block <Katex tex="\tfrac{\sqrt2}{2}e^{\frac\pi2}" />, so take
        it out as a common factor: one lot of it plus two lots of it.
      </>
    ),
    more: (
      <>
        The report says some students did not know how to work with the surd terms. Treat the
        whole block like a pronumeral: if <Katex tex="a=\tfrac{\sqrt2}{2}e^{\frac\pi2}" />, the two
        terms are just <Katex tex="a+2a=3a" />. There is no need to multiply out the surd or find
        a decimal for <Katex tex="e^{\frac\pi2}" />; Exam 1 wants the exact value. The
        report&apos;s sample answer simplifies <Katex tex="2\cdot\tfrac{\sqrt2}{2}" /> to{' '}
        <Katex tex="\sqrt2" /> first, giving{' '}
        <Katex tex="\sqrt2e^{\frac\pi2}+\tfrac{\sqrt2}{2}e^{\frac\pi2}" />; that leads to the same
        place, since <Katex tex="\sqrt2+\tfrac{\sqrt2}{2}=\tfrac{3\sqrt2}{2}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f'\!\left(\frac\pi4\right) = \frac{3\sqrt2}{2}e^{\frac\pi2}}" />,
    reason: (
      <>
        <Katex tex="3\times\tfrac{\sqrt2}{2}=\tfrac{3\sqrt2}{2}" />. Any equivalent exact form,
        such as <Katex tex="\tfrac{3e^{\frac\pi2}}{\sqrt2}" />, is fine.
      </>
    ),
    more: (
      <>
        The report says there was no requirement to give the answer in a particular form, so
        rationalising the denominator is optional here.
      </>
    ),
  },
]

export default function MethodsQ1_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Quotient Rule"
        marks={2}
        statement={
          <>
            Let <Katex tex="y=\dfrac{x^2-x}{e^x}" />.
            <br />
            Find and simplify <Katex tex="\dfrac{dy}{dx}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Product Rule"
        marks={2}
        statement={
          <>
            Let <Katex tex="f(x)=\sin(x)e^{2x}" />.
            <br />
            Find <Katex tex="f'\!\left(\dfrac\pi4\right)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
