// 2014 Mathematical Methods (CAS) — Exam 1, Question 6 (2 marks). A logarithm equation
// solved with the log laws. Question text transcribed from the original paper (no diagram
// given). Answer checked with sympy and against the VCAA examination report. Solution is
// original. This question has no lettered parts, so it uses the plain card layout rather
// than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [23, 33, 44],
  average: 1.2,
  comment: (
    <>
      Poor performance on this question was mainly attributed to the incorrect application of
      logarithm or index laws. Students should have good facility with logarithm and exponent
      laws.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\log_e(x)-3 = \log_e\!\left(\sqrt x\right)" />,
    reason: <>Two logs of <Katex tex="x" /> and a constant: gather the logs on one side so a log law can combine them into one log.</>,
    more: (
      <>
        A quicker route avoids the quotient used below: use the power law first,{' '}
        <Katex tex="\log_e\!\left(\sqrt x\right)=\log_e\!\left(x^{1/2}\right)=\tfrac12\log_e(x)" />, so
        the equation becomes <Katex tex="\log_e(x)-3=\tfrac12\log_e(x)" />, giving{' '}
        <Katex tex="\tfrac12\log_e(x)=3" />, <Katex tex="\log_e(x)=6" /> and the same answer.
      </>
    ),
  },
  {
    working: <Katex display tex="\log_e(x)-\log_e\!\left(\sqrt x\right) = 3" />,
    reason: <>Subtract <Katex tex="\log_e\!\left(\sqrt x\right)" /> from, and add 3 to, both sides.</>,
  },
  {
    working: <Katex display tex="\log_e\!\left(\frac{x}{\sqrt x}\right) = 3" />,
    reason: <>The subtraction law <Katex tex="\log_e a-\log_e b=\log_e\tfrac ab" />.</>,
    more: (
      <>
        A common slip is to write <Katex tex="\dfrac{\log_e x}{\log_e \sqrt x}" /> instead: the
        law turns a difference of logs into the log of a quotient, not a quotient of logs. Likewise{' '}
        <Katex tex="\log_e(x)-3" /> is not <Katex tex="\log_e(x-3)" /> or{' '}
        <Katex tex="\log_e\tfrac x3" />; the 3 is not a log until you write it as{' '}
        <Katex tex="\log_e\!\left(e^3\right)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{x}{\sqrt x} = \frac{x}{x^{1/2}} = x^{1/2} = \sqrt x" />,
    reason: <>Write <Katex tex="\sqrt x" /> as <Katex tex="x^{1/2}" />; dividing subtracts the indices, <Katex tex="1-\tfrac12=\tfrac12" />.</>,
    more: (
      <>
        Common index-law slips here: the answer is{' '}
        <Katex tex="\dfrac{x}{x^{1/2}}=x^{1/2}" />, not <Katex tex="x^{-1/2}" /> (that
        subtracts the wrong way round, <Katex tex="\tfrac12-1" />) and not <Katex tex="x^2" />{' '}
        (dividing the indices).
      </>
    ),
  },
  {
    working: <Katex display tex="\log_e\!\left(\sqrt x\right) = 3 \implies \sqrt x = e^3" />,
    reason: <>Undo the log: <Katex tex="\log_e y = 3" /> means <Katex tex="y = e^3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = e^6}" />,
    reason: <>Square both sides: <Katex tex="\left(e^3\right)^2=e^6" />, which satisfies <Katex tex="x>0" />.</>,
    more: (
      <>
        Check in the original equation: <Katex tex="\log_e\!\left(e^6\right)-3 = 6-3 = 3" /> and{' '}
        <Katex tex="\log_e\!\left(\sqrt{e^6}\right)=\log_e\!\left(e^3\right)=3" /> ✓. Leave
        the answer exact; Exam 1 expects <Katex tex="e^6" />, not a decimal.
      </>
    ),
  },
]

export default function MethodsQ6_2014Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 6 (2 marks)" always>
        <p>
          Solve <Katex tex="\log_e(x)-3=\log_e\!\left(\sqrt x\right)" /> for <Katex tex="x" />,
          where <Katex tex="x>0" />.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={2} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
      </div>
    </div>
  )
}
