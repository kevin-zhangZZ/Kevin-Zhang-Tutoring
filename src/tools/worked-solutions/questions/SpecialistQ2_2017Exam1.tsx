// 2017 Specialist Mathematics — Exam 1, Question 2 (4 marks). A definite integral needing
// partial fractions with an irreducible quadratic factor. 38% of students scored zero.
// Question text transcribed from the original paper (no diagram given). Answer checked with
// sympy and against the VCAA examination report. Solution is original. No lettered parts,
// so this uses the plain card layout rather than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [38, 11, 9, 7, 35],
  average: 1.9,
  comment: (
    <>
      This question tended to be answered well by students who knew that partial fractions
      were required and which form of partial fractions to use. A large number of students
      did not use partial fractions, which meant that no progress could be made. Students gave
      answers such as <Katex tex="\log_e\!\left(x(1+x^2)\right)" /> and{' '}
      <Katex tex="\log_e\!\left(x\times\tan^{-1}(x)\right)" /> using this approach. Several
      students used partial fractions of the form <Katex tex="\tfrac{A}{x}+\tfrac{B}{1+x^2}" />,
      often getting correct partial fractions with incorrect working, or{' '}
      <Katex tex="\tfrac{A}{x}+\tfrac{Bx}{1+x^2}" />, which led to correct partial fractions
      since the value of <Katex tex="C" /> was zero. Some used a substitution such as{' '}
      <Katex tex="u=x^2" /> or <Katex tex="u=1+x^2" />, which led to an alternative partial
      fractions form that was sometimes handled successfully but often terminals were not
      adjusted. Occasionally <Katex tex="x=\tan(u)" /> was used but this was rarely followed
      through correctly. A number of students found the correct antiderivative but made errors
      in final arithmetic simplification work, which frequently gave the incorrect answer{' '}
      <Katex tex="\log_e\!\left(\sqrt{\tfrac34}\right)" />. Others did not put the answer in the
      correct form, often giving <Katex tex="\log_e\!\left(\tfrac{\sqrt6}{2}\right)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1}{x(1+x^2)} = \frac{A}{x}+\frac{Bx+C}{1+x^2}" />,
    reason: <>The quadratic factor is irreducible, so its numerator must be <em>linear</em>, not constant. Using <Katex tex="\tfrac{B}{1+x^2}" /> is the error the report names.</>,
  },
  {
    working: <Katex display tex="1 = A(1+x^2)+(Bx+C)x" />,
    reason: <>Multiplying through by <Katex tex="x(1+x^2)" />.</>,
  },
  {
    working: <Katex display tex="x=0: \quad 1=A" />,
    reason: <>Substituting the root of the linear factor kills the other term immediately.</>,
  },
  {
    working: <Katex display tex="x^2: \quad 0=A+B \implies B=-1; \qquad x^1: \quad 0=C" />,
    reason: <>Comparing coefficients. So the split is <Katex tex="\tfrac1x-\tfrac{x}{1+x^2}" /> — and because <Katex tex="C=0" />, the wrong form <Katex tex="\tfrac{A}{x}+\tfrac{B}{1+x^2}" /> can still stumble onto the right answer, which is why the report calls it out.</>,
  },
  {
    working: <Katex display tex="\int_1^{\sqrt3}\!\left(\frac1x-\frac{x}{1+x^2}\right)dx" />,
    reason: <>The second piece is now a standard <Katex tex="\tfrac{f'}{f}" /> form up to a factor of <Katex tex="\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="= \Bigl[\log_e(x)-\tfrac12\log_e(1+x^2)\Bigr]_1^{\sqrt3}" />,
    reason: <>The numerator <Katex tex="x" /> is half the derivative of <Katex tex="1+x^2" />, hence the <Katex tex="\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="= \left(\log_e\!\sqrt3-\tfrac12\log_e 4\right)-\left(0-\tfrac12\log_e 2\right)" />,
    reason: <>At <Katex tex="x=\sqrt3" />: <Katex tex="1+3=4" />. At <Katex tex="x=1" />: <Katex tex="\log_e1=0" /> and <Katex tex="1+1=2" />.</>,
  },
  {
    working: <Katex display tex="= \tfrac12\log_e3-\log_e2+\tfrac12\log_e2 = \tfrac12\log_e3-\tfrac12\log_e2" />,
    reason: <>Since <Katex tex="\log_e\sqrt3=\tfrac12\log_e3" /> and <Katex tex="\tfrac12\log_e4=\log_e2" />.</>,
  },
  {
    working: <Katex display tex="= \tfrac12\log_e\!\left(\tfrac32\right)" />,
    reason: <>Combining the two logs.</>,
  },
  {
    working: <Katex display tex="\boxed{\log_e\!\sqrt{\frac32}}" />,
    reason: <>Pulling the <Katex tex="\tfrac12" /> inside as a square root gives the required form with <Katex tex="a=3" /> and <Katex tex="b=2" />. About <Katex tex="0.203" /> — small and positive, which fits a positive integrand over a short interval.</>,
  },
]

export default function SpecialistQ2_2017Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 2 (4 marks)">
        <p>
          Find <Katex tex="\displaystyle\int_1^{\sqrt3}\frac{1}{x(1+x^2)}\,dx" />, expressing
          your answer in the form <Katex tex="\log_e\!\sqrt{\tfrac{a}{b}}" />, where{' '}
          <Katex tex="a" /> and <Katex tex="b" /> are positive integers.
        </p>
      </Background>
      <Background>
        <p>
          <strong>Which partial-fraction form?</strong> Match the numerator to the factor: a{' '}
          <em>linear</em> factor gets a constant on top, an <em>irreducible quadratic</em>{' '}
          factor gets a linear expression on top. So{' '}
          <Katex tex="\tfrac{1}{x(1+x^2)}" /> splits as{' '}
          <Katex tex="\tfrac{A}{x}+\tfrac{Bx+C}{1+x^2}" />.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={4} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
