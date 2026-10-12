// 2025 Mathematical Methods — Exam 1 Question 2 (2 marks). Antidifferentiating a
// reciprocal-linear derivative and fixing the constant. Question text transcribed from the
// original paper. Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [22, 38, 40],
  average: 1.2,
  comment: (
    <>
      This question required students to antidifferentiate <Katex tex="g(x)" /> to obtain a{' '}
      <Katex tex="\log_e" /> term plus the constant of integration, <Katex tex="c" />. Using the
      condition <Katex tex="g(1)=0" /> allowed the value of <Katex tex="c" /> to be calculated.
      Some students chose to take out a factor of <Katex tex="\dfrac{1}{2}" /> to obtain an
      equivalent antiderivative{' '}
      <Katex tex="\dfrac{1}{2}\log_e\left(x+\dfrac{3}{2}\right)+c" />. Upon substituting{' '}
      <Katex tex="g(1)=0" /> this yielded the same answer for <Katex tex="g(x)" />. Some students
      did not recognise that the integral would involve a logarithmic function. A common error was
      writing <Katex tex="\ln(2x+3)+c" /> as the first step, without accounting for the necessary
      factor of <Katex tex="\dfrac{1}{2}" /> in front of <Katex tex="\ln(2x+3)" />. A common
      incorrect answer was <Katex tex="\log_e\left(\dfrac{2x+3}{5}\right)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = \int\frac{1}{2x+3}\,dx" />,
    reason: <>To recover <Katex tex="g" /> from <Katex tex="g'" />, antidifferentiate. One over a linear expression antidifferentiates to a logarithm.</>,
    more: (
      <>
        (The report's "antidifferentiate <Katex tex="g(x)" />" means antidifferentiate the given
        derivative <Katex tex="g'(x)" />.) The report notes some students did not recognise the
        logarithm. The power rule cannot work here: <Katex tex="\tfrac{1}{2x+3}=(2x+3)^{-1}" />,
        and the power rule would give <Katex tex="\tfrac{(2x+3)^{0}}{0\times 2}" />, which is
        undefined. The power <Katex tex="-1" /> is exactly the case where the antiderivative is{' '}
        <Katex tex="\log_e" /> instead.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{d}{dx}\log_e(2x+3) = \frac{2}{2x+3}" />,
    reason: <>Test the obvious guess: the chain rule brings out a factor of <Katex tex="2" />, twice what we want, so <Katex tex="g" /> needs <Katex tex="\tfrac12" /> in front.</>,
    more: (
      <>
        This is the report's common error: writing <Katex tex="\ln(2x+3)+c" /> straight away,
        without the <Katex tex="\tfrac12" />. In general{' '}
        <Katex tex="\int\tfrac{1}{ax+b}\,dx=\tfrac{1}{a}\log_e(ax+b)+c" /> — the{' '}
        <Katex tex="\tfrac1a" /> undoes the <Katex tex="a" /> the chain rule produces.
      </>
    ),
  },
  {
    working: <Katex display tex="g(x) = \tfrac12\log_e(2x+3)+c" />,
    reason: <>No absolute value is needed: the domain <Katex tex="x>-\tfrac32" /> makes <Katex tex="2x+3>0" /> throughout.</>,
    more: (
      <>
        Some students first wrote <Katex tex="\tfrac{1}{2x+3}=\tfrac12\cdot\tfrac{1}{x+\frac32}" /> and got{' '}
        <Katex tex="\tfrac12\log_e\!\left(x+\tfrac32\right)+c" />. That is also correct: it
        differs from <Katex tex="\tfrac12\log_e(2x+3)" /> only by the constant{' '}
        <Katex tex="-\tfrac12\log_e 2" />, which the value of <Katex tex="c" /> absorbs, so{' '}
        <Katex tex="g(1)=0" /> leads to the same final <Katex tex="g(x)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} g(1) = 0: \quad \tfrac12\log_e(5)+c &= 0 \\ c &= -\tfrac12\log_e(5) \end{aligned}" />,
    reason: <>Substitute <Katex tex="x=1" /> (so <Katex tex="2x+3=5" />) and set the result to <Katex tex="0" /> to find <Katex tex="c" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} g(x) &= \tfrac12\log_e(2x+3)-\tfrac12\log_e(5) \\ &= \boxed{\tfrac12\log_e\!\left(\frac{2x+3}{5}\right)} \end{aligned}" />,
    reason: <>Combine with <Katex tex="\log_e a-\log_e b=\log_e\tfrac ab" />; any equivalent form scores. Check: <Katex tex="g(1)=\tfrac12\log_e(1)=0" /> ✓.</>,
    more: (
      <>
        The report's common incorrect answer, <Katex tex="\log_e\!\left(\tfrac{2x+3}{5}\right)" />,
        is this answer without the <Katex tex="\tfrac12" />. It does satisfy{' '}
        <Katex tex="g(1)=0" />, but its derivative is <Katex tex="\tfrac{2}{2x+3}" />, so it fails
        the other condition — always check both. Moving the <Katex tex="\tfrac12" /> inside as a
        power gives the report's third accepted form,{' '}
        <Katex tex="\log_e\!\left(\sqrt{\tfrac{2x+3}{5}}\right)" />.
      </>
    ),
  },
]

export default function MethodsQ2_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (2 marks)</p>
        <p>
          Let <Katex tex="g(x)" /> be a function defined for <Katex tex="x>-\tfrac32" /> so
          that <Katex tex="g'(x)=\dfrac{1}{2x+3}" /> and <Katex tex="g(1)=0" />.
          <br />
          Find <Katex tex="g(x)" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            An antiderivative is only fixed up to a constant <Katex tex="c" />; the extra
            condition <Katex tex="g(1)=0" /> pins it down. The domain{' '}
            <Katex tex="x>-\tfrac32" /> contains <Katex tex="x=1" />, so that condition can be
            used.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={2} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
