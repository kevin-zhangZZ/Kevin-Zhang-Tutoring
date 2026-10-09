// 2022 Mathematical Methods — Exam 1 Question 2 (4 marks). An antiderivative of a
// reciprocal-linear function, then a definite integral evaluated purely from two given
// integrals. Question text transcribed from the original paper. Answers checked with sympy
// and against the VCAA examination report. Solution is original.
// Oct 2026 Concise/Detailed review: each row's reason is the short "why"; the report's traps
// (the 3log/6log answers, domain-as-terminals, g'(x) label, product of integrals, f(x) = 1/3,
// missing brackets) and the checks live in the rows' `more`. No widgets: neither part is under
// 40% full marks (a 45%, b 40%). Final review: (a) row 3 keeps +c until row 4 sets c = 0;
// (b) the f(x) = 1/3 trap sits with the substitution row.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [55, 45],
  average: 0.5,
  comment: (
    <>
      This question asked for an antiderivative of the function <Katex tex="g(x)" />, and it
      was fine to name this function <Katex tex="\int g(x)\,dx" /> or <Katex tex="G(x)" /> or
      give no name at all; however, some students chose to incorrectly label the function as{' '}
      <Katex tex="g'(x)" />. Students are reminded to pay attention to the nomenclature they
      use to identify functions or equations. Incorrect answers of{' '}
      <Katex tex="3\log_e(2x-3)" /> and <Katex tex="6\log_e(2x-3)" /> were common. Some
      students treated the values in the domain of <Katex tex="\left(\tfrac32,\infty\right)" />{' '}
      as terminal values in a definite integral.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [36, 19, 5, 40],
  average: 1.5,
  comment: (
    <>
      This question was not answered well by many students. Some students incorrectly tried
      to expand the expression as a product of two integrals, while other students
      erroneously substituted <Katex tex="\tfrac13" /> for <Katex tex="f(x)" /> and then
      arrived at an integral of constant terms that they then tried to integrate. Brackets
      were commonly missing.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\int\frac{3}{2x-3}\,dx = 3\int\frac{1}{2x-3}\,dx" />,
    reason: <>An antiderivative of <Katex tex="g(x)" /> is a function whose derivative is <Katex tex="g(x)" />. Pull the constant 3 out first so the standard form <Katex tex="\tfrac{1}{ax+b}" /> is visible.</>,
  },
  {
    working: <Katex display tex="\int\frac{1}{ax+b}\,dx = \frac{1}{a}\log_e|ax+b|+c, \quad a = 2" />,
    reason: <>This is the standard result for <Katex tex="\tfrac{1}{ax+b}" />: take <Katex tex="\log_e" /> of the bracket and divide by the coefficient of <Katex tex="x" />. Here that coefficient is <Katex tex="a=2" />.</>,
    more: <>Why divide? Differentiating <Katex tex="\log_e(2x-3)" /> by the chain rule brings out a factor of 2: <Katex tex="\tfrac{d}{dx}\log_e(2x-3)=\tfrac{2}{2x-3}" />. The <Katex tex="\tfrac1a=\tfrac12" /> is there to cancel that 2. Leaving it out gives the report's common wrong answer <Katex tex="3\log_e(2x-3)" />; <em>multiplying</em> by 2 instead (as you would when differentiating) gives the other one, <Katex tex="6\log_e(2x-3)" />.</>,
  },
  {
    working: <Katex display tex="= 3\times\frac12\log_e(2x-3)+c" />,
    reason: <>Apply this result, keeping the 3 from the first line in front. The domain <Katex tex="\left(\tfrac32,\infty\right)" /> makes <Katex tex="2x-3>0" />, so the absolute value bars can be dropped.</>,
    more: <>That is all the domain is for here. The report notes some students treated <Katex tex="\tfrac32" /> and <Katex tex="\infty" /> as terminals of a definite integral. But the question asks for an antiderivative, which is a function of <Katex tex="x" />, not a number, so nothing gets substituted.</>,
  },
  {
    working: <Katex display tex="G(x) = \boxed{\frac{3}{2}\log_e(2x-3)}" />,
    reason: <>The question asks for <em>an</em> antiderivative, so any one will do: take <Katex tex="c=0" />. Label it <Katex tex="G(x)" />, not <Katex tex="g'(x)" />, which means the derivative of <Katex tex="g" />.</>,
    more: <>Check by differentiating: <Katex tex="G'(x)=\tfrac32\times\tfrac{2}{2x-3}=\tfrac{3}{2x-3}=g(x)" />. The report&apos;s published answer also lists <Katex tex="\tfrac32\log_e\left(x-\tfrac32\right)" />. Since <Katex tex="x-\tfrac32=\tfrac12(2x-3)" />, that differs from <Katex tex="G(x)" /> only by the constant <Katex tex="\tfrac32\log_e 2" />, so it is an antiderivative too.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)\bigl(2f(x)-3\bigr) = 2\bigl[f(x)\bigr]^2-3f(x)" />,
    reason: <>You are given the integrals of <Katex tex="\bigl[f(x)\bigr]^2" /> and <Katex tex="f(x)" />, not <Katex tex="f(x)" /> itself. So expand the integrand <em>inside</em> the integral to get exactly those two pieces.</>,
    more: <>Don't split it into a product of two integrals, <Katex tex="\int_0^1 f(x)\,dx\times\int_0^1\bigl(2f(x)-3\bigr)dx" />; the report notes some students tried this. The integral of a product is not the product of the integrals. For example, with <Katex tex="f(x)=x" />, <Katex tex="\int_0^1 x\cdot x\,dx=\tfrac13" /> but <Katex tex="\int_0^1 x\,dx\times\int_0^1 x\,dx=\tfrac14" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\int_0^1\Bigl(2\bigl[f(x)\bigr]^2-3f(x)\Bigr)dx &= 2\int_0^1\bigl[f(x)\bigr]^2dx\\ &\quad-3\int_0^1 f(x)\,dx\end{aligned}"
      />
    ),
    reason: <>The integral of a difference is the difference of the integrals, and constants (the 2 and the 3) come outside. Each piece is now one of the given integrals.</>,
    more: <>The report notes brackets were commonly missing. For example, the brackets around the whole integrand are what make the <Katex tex="dx" /> cover both terms.</>,
  },
  {
    working: <Katex display tex="= 2\left(\frac15\right)-3\left(\frac13\right)" />,
    reason: <>Substitute the two given values.</>,
    more: <>What gets replaced is each whole integral, not <Katex tex="f(x)" />. The report notes some students substituted <Katex tex="\tfrac13" /> for <Katex tex="f(x)" />, which left them integrating constants. <Katex tex="\int_0^1 f(x)\,dx=\tfrac13" /> is the value of an <em>integral</em> of <Katex tex="f" />, a single number, not a formula for <Katex tex="f(x)" />. In fact <Katex tex="f(x)" /> can&apos;t be the constant <Katex tex="\tfrac13" />: then <Katex tex="\int_0^1\bigl[f(x)\bigr]^2dx" /> would be <Katex tex="\tfrac19" />, not the given <Katex tex="\tfrac15" />.</>,
  },
  {
    working: <Katex display tex="= \frac25-1 = \boxed{-\frac35}" />,
    reason: <>Negative, which is fine — a definite integral is a signed area.</>,
  },
]

export default function MethodsQ2_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Antiderivative"
        marks={1}
        statement={
          <>
            Let <Katex tex="g:\left(\tfrac32,\infty\right)\to R" />,{' '}
            <Katex tex="g(x)=\dfrac{3}{2x-3}" />.
            <br />
            Find the rule for an antiderivative of{' '}
            <Katex tex="g(x)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Integral Properties"
        marks={3}
        statement={
          <>
            Evaluate <Katex tex="\displaystyle\int_0^1\Bigl(f(x)\bigl(2f(x)-3\bigr)\Bigr)dx" />
            , where <Katex tex="\displaystyle\int_0^1\bigl[f(x)\bigr]^2dx=\tfrac15" /> and{' '}
            <Katex tex="\displaystyle\int_0^1 f(x)\,dx=\tfrac13" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
