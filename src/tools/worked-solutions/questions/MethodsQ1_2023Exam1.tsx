// 2023 Mathematical Methods — Exam 1 Question 1 (4 marks). A quotient rule that has to be
// simplified, then a product rule evaluated at an exact value. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

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
        <Katex tex="y" /> is one expression divided by another, so reach for the quotient rule
        (it&apos;s on the formula sheet). Name the top <Katex tex="u" /> and the bottom{' '}
        <Katex tex="v" />, and write their derivatives down first. (Rewriting{' '}
        <Katex tex="y=\left(x^2-x\right)e^{-x}" /> and using the product rule works just as
        well.)
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{(2x-1)e^x-\left(x^2-x\right)e^x}{\left(e^x\right)^2}" />,
    reason: (
      <>
        <Katex tex="\dfrac{dy}{dx}=\dfrac{v\,u'-u\,v'}{v^2}" />. Keep the bracket around{' '}
        <Katex tex="x^2-x" />: the minus sign in front applies to the whole of{' '}
        <Katex tex="u\,v'" />, both of its terms.
      </>
    ),
  },
  {
    working: <Katex display tex="= \frac{e^x\left(2x-1-x^2+x\right)}{e^{2x}}" />,
    reason: (
      <>
        Take out the common factor <Katex tex="e^x" /> on top so it can cancel later, and{' '}
        <Katex tex="\left(e^x\right)^2=e^{2x}" />. Inside the bracket,{' '}
        <Katex tex="-\left(x^2-x\right)=-x^2+x" /> — the minus multiplies both terms. Writing{' '}
        <Katex tex="-x^2-x" /> instead gives <Katex tex="2x-1-x^2-x=-x^2+x-1" />, which is
        exactly the common incorrect response the report quotes.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{-x^2+3x-1}{e^x}}" />,
    reason: (
      <>
        Collect like terms, <Katex tex="2x+x=3x" />, and cancel one <Katex tex="e^x" />:{' '}
        <Katex tex="\tfrac{e^x}{e^{2x}}=\tfrac{1}{e^x}" />. &ldquo;Simplify&rdquo; includes
        this cancellation — stopping at <Katex tex="\tfrac{e^x(\ldots)}{e^{2x}}" /> leaves the
        exponential terms unsimplified, which the report says many students did. Equivalent
        answers: <Katex tex="\tfrac{-\left(x^2-3x+1\right)}{e^x}" /> or{' '}
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
        <Katex tex="f" /> is one function multiplied by another, so use the product rule.{' '}
        <Katex tex="\tfrac{d}{dx}e^{kx}=ke^{kx}" /> (formula sheet) gives{' '}
        <Katex tex="\tfrac{d}{dx}e^{2x}=2e^{2x}" />: the exponent stays <Katex tex="2x" /> and
        the 2 comes out front as a multiplier. A correct derivative has <Katex tex="e^{2x}" />{' '}
        in every term and no <Katex tex="e^x" /> anywhere — the report says some students mixed
        the two.
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
        Both terms contain the same block <Katex tex="\tfrac{\sqrt2}{2}e^{\frac\pi2}" />, so
        treat it as a common factor — one lot of it plus two lots of it. There&apos;s no need to
        multiply out the surd or the <Katex tex="e^{\frac\pi2}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f'\!\left(\frac\pi4\right) = \frac{3\sqrt2}{2}e^{\frac\pi2}}" />,
    reason: (
      <>
        The report notes there was no requirement to give a particular form; it also lists{' '}
        <Katex tex="\tfrac{3e^{\frac\pi2}}{\sqrt2}" />.
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
