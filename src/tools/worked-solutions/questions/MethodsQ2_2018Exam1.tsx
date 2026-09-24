// 2018 Mathematical Methods — Exam 1, Question 2 (3 marks). Antidifferentiate a given f′ and
// pin the constant with f(2) = 0. Question text transcribed from the original paper (no
// diagram given). Answer checked independently with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [19, 16, 35, 30],
  average: 1.8,
  comment: (
    <>
      This question was attempted well. A common misconception was that{' '}
      <Katex tex="\displaystyle\int\frac{1}{2x-2}\,dx = \log_e(2x-2)+c" />, which was
      incorrect. Some students found a value of <Katex tex="c" /> but did not substitute it
      back into the final answer to state <Katex tex="f(x)" />. Some poor notation was
      observed, for example, <Katex tex="\dfrac{1}{2x}" /> is not the same as{' '}
      <Katex tex="\dfrac{x}{2}" />, and notation for the natural logarithm is{' '}
      <Katex tex="\log_e" /> not <Katex tex="\mathrm{loge}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \frac12 - \frac{1}{2x-2}" />,
    reason: <>Given. Antidifferentiate term by term to recover <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="\int \frac{1}{2x-2}\,dx = \frac12\log_e(2x-2)+c" />,
    reason: <>The inside <Katex tex="2x-2" /> has derivative <Katex tex="2" />, so a <Katex tex="\tfrac12" /> must appear out the front to undo it. Dropping that <Katex tex="\tfrac12" /> is the common misconception the report names. No absolute value is needed: the domain is <Katex tex="(1,\infty)" />, so <Katex tex="2x-2>0" /> throughout.</>,
  },
  {
    working: <Katex display tex="f(x) = \frac{x}{2} - \frac12\log_e(2x-2) + c" />,
    reason: <>Antiderivative with one arbitrary constant, which the given value of <Katex tex="f(2)" /> will fix.</>,
  },
  {
    working: <Katex display tex="f(2) = 1 - \frac12\log_e(2) + c = 0 \implies c = \frac12\log_e(2) - 1" />,
    reason: <>Substituting <Katex tex="x=2" />: <Katex tex="\tfrac22=1" /> and <Katex tex="2(2)-2=2" />.</>,
  },
  {
    working: <Katex display tex="f(x) = \frac{x}{2} - \frac12\log_e(2x-2) + \frac12\log_e(2) - 1" />,
    reason: <>Putting the constant back in — the report flags students who found <Katex tex="c" /> and then never used it.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = \frac{x}{2} - \frac12\log_e(x-1) - 1}" />,
    reason: <>The two logarithms combine: <Katex tex="-\tfrac12\log_e(2x-2)+\tfrac12\log_e(2) = -\tfrac12\log_e\!\left(\tfrac{2x-2}{2}\right) = -\tfrac12\log_e(x-1)" />. Worth a check: <Katex tex="f(2)=1-\tfrac12\log_e(1)-1=0" /> ✓, and differentiating gives back <Katex tex="\tfrac12-\tfrac{1}{2(x-1)}=\tfrac12-\tfrac{1}{2x-2}" /> ✓.</>,
  },
]

export default function MethodsQ2_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (3 marks)</p>
        <p>
          The derivative with respect to <Katex tex="x" /> of the function{' '}
          <Katex tex="f:(1,\infty)\to R" /> has the rule{' '}
          <Katex tex="f'(x)=\dfrac12-\dfrac{1}{2x-2}" />. Given that <Katex tex="f(2)=0" />,
          find <Katex tex="f(x)" /> in terms of <Katex tex="x" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Antidifferentiating <Katex tex="\dfrac{1}{ax+b}" /> gives{' '}
            <Katex tex="\dfrac{1}{a}\log_e(ax+b)" />, not <Katex tex="\log_e(ax+b)" />. The{' '}
            <Katex tex="\tfrac1a" /> is there because differentiating the log brings the{' '}
            <Katex tex="a" /> back out by the chain rule, and it has to be cancelled.
          </p>
          <p>
            "Find <Katex tex="f(x)" />" means the whole rule, constant included. An answer
            that stops at <Katex tex="c=\tfrac12\log_e(2)-1" /> has not answered the question.
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
