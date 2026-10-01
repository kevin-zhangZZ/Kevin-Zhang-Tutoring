// 2021 Specialist Mathematics — Exam 1 Question 2 (3 marks). A definite integral that
// splits into a log and an arctan. Question text transcribed from the original paper.
// Answer checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [22, 9, 6, 63],
  average: 2.1,
  comment: (
    <>
      Most students understood that they needed to write the integrand as the sum of two
      rational functions:
      <br />
      <Katex tex="\displaystyle\int_0^1\frac{2x}{x^2+1}\,dx+\int_0^1\frac{1}{x^2+1}\,dx=\Bigl[\log_e\left(x^2+1\right)\Bigr]_0^1+\Bigl[\arctan(x)\Bigr]_0^1" />
      <br />
      Use of a substitution was unnecessary in this situation and in attempting to use a
      substitution, some students introduced errors into their working.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{2x+1}{x^2+1} = \frac{2x}{x^2+1}+\frac{1}{x^2+1}" />,
    reason: (
      <>
        How would I know to split? The derivative of the denominator <Katex tex="x^2+1" /> is{' '}
        <Katex tex="2x" />, and <Katex tex="2x" /> is sitting in the numerator. Splitting the
        fraction leaves one piece with <Katex tex="2x" /> on top (a logarithm) and one with just a
        constant on top (an arctan). Both are standard forms, so no substitution is needed.
      </>
    ),
  },
  {
    working: <Katex display tex="\int_0^1\frac{2x}{x^2+1}\,dx = \Bigl[\log_e\left(x^2+1\right)\Bigr]_0^1" />,
    reason: (
      <>
        The numerator is exactly the derivative of the denominator, so use{' '}
        <Katex tex="\int\tfrac{f'(x)}{f(x)}\,dx=\log_e|f(x)|+c" /> with{' '}
        <Katex tex="f(x)=x^2+1" />. The absolute value bars can go because{' '}
        <Katex tex="x^2+1>0" /> for every <Katex tex="x" />. (If you substitute{' '}
        <Katex tex="u=x^2+1" /> instead, change the terminals too: <Katex tex="x=0" /> gives{' '}
        <Katex tex="u=1" /> and <Katex tex="x=1" /> gives <Katex tex="u=2" />.)
      </>
    ),
  },
  {
    working: <Katex display tex="= \log_e(2)-\log_e(1) = \log_e(2)" />,
    reason: <>At <Katex tex="x=1" />, <Katex tex="x^2+1=2" />; at <Katex tex="x=0" />, <Katex tex="x^2+1=1" />. And <Katex tex="\log_e(1)=0" />.</>,
  },
  {
    working: <Katex display tex="\int_0^1\frac{1}{x^2+1}\,dx = \Bigl[\arctan(x)\Bigr]_0^1" />,
    reason: (
      <>
        Formula sheet: <Katex tex="\int\tfrac{a}{a^2+x^2}\,dx=\tan^{-1}\!\left(\tfrac{x}{a}\right)+c" />.
        Here <Katex tex="a=1" />, so the antiderivative is <Katex tex="\tan^{-1}(x)" />, also
        written <Katex tex="\arctan(x)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= \arctan(1)-\arctan(0) = \frac{\pi}{4}-0 = \frac{\pi}{4}" />,
    reason: <><Katex tex="\arctan(1)=\tfrac\pi4" /> because <Katex tex="\tan\left(\tfrac\pi4\right)=1" />, and <Katex tex="\arctan(0)=0" /> because <Katex tex="\tan(0)=0" />.</>,
  },
  {
    working: <Katex display tex="\int_0^1\frac{2x+1}{x^2+1}\,dx = \boxed{\log_e(2)+\frac{\pi}{4}}" />,
    reason: <>Add the two pieces. Leave it exact, as this is the technology-free exam (it is about <Katex tex="1.479" />).</>,
  },
]

export default function SpecialistQ2_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (3 marks)</p>
        <p>
          Evaluate <Katex tex="\displaystyle\int_0^1\frac{2x+1}{x^2+1}\,dx" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            When the denominator is a quadratic that doesn't factorise, like{' '}
            <Katex tex="x^2+1" />, look at the numerator before reaching for a substitution. Ask
            whether it can be written as{' '}
            <em>(a multiple of the denominator's derivative) plus (a constant)</em>. The first part
            integrates to a logarithm and the second to an arctan (after completing the square if the
            denominator has an <Katex tex="x" /> term). Here the numerator{' '}
            <Katex tex="2x+1" /> is already in that form, so the integral is two standard forms
            added together.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={3} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
