// 2018 Mathematical Methods — Exam 1, Question 5 (3 marks). The rule and domain of the
// inverse of f(x) = 1/(x−2)² restricted to (2, ∞). Question text transcribed from the
// original paper (no diagram given). Answer checked independently with sympy and against the
// VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [9, 14, 31, 46],
  average: 2.2,
  comment: (
    <>
      Students appeared to manage this question confidently. However, some students did not
      handle the algebraic manipulation correctly and others used incorrect notation, stating
      their final answer as <Katex tex="y" /> or omitting the domain.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = \frac{1}{(x-2)^2}" />,
    reason: <>Start from the rule and make <Katex tex="x" /> the subject; swapping the letters at the end produces the inverse.</>,
  },
  {
    working: <Katex display tex="(x-2)^2 = \frac1y" />,
    reason: <>Taking the reciprocal of both sides. Legitimate because <Katex tex="y\ne0" />: a fraction with numerator <Katex tex="1" /> is never zero.</>,
  },
  {
    working: <Katex display tex="x-2 = \pm\frac{1}{\sqrt{y}}" />,
    reason: <>Square-rooting produces two branches. Exactly one survives the domain restriction, and choosing between them is the step the report calls the algebraic manipulation.</>,
  },
  {
    working: <Katex display tex="x>2 \implies x-2>0 \implies x-2 = +\frac{1}{\sqrt{y}}" />,
    reason: <>The original domain <Katex tex="(2,\infty)" /> forces <Katex tex="x-2" /> positive, so the negative branch is discarded. Without the restriction <Katex tex="f" /> would not be one-to-one and would have no inverse at all.</>,
  },
  {
    working: <Katex display tex="x = 2 + \frac{1}{\sqrt{y}}" />,
    reason: <><Katex tex="x" /> is now written in terms of <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = 2+\frac{1}{\sqrt{x}}}" />,
    reason: <>Relabel <Katex tex="y\to x" />. Write it as <Katex tex="f^{-1}(x)=\dots" />, not <Katex tex="y=\dots" /> — the report names that notation slip.</>,
  },
  {
    working: <Katex display tex="\operatorname{ran}(f) = (0,\infty) \implies \boxed{\operatorname{dom}\left(f^{-1}\right) = (0,\infty)}" />,
    reason: <>The domain of an inverse is the range of the original. As <Katex tex="x" /> runs over <Katex tex="(2,\infty)" />, <Katex tex="(x-2)^2" /> takes every positive value, so <Katex tex="\tfrac{1}{(x-2)^2}" /> does too — never reaching <Katex tex="0" />, and unbounded above as <Katex tex="x\to2^+" />. The domain is part of the answer, not an optional extra.</>,
  },
]

export default function MethodsQ5_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (3 marks)</p>
        <p>
          Let <Katex tex="f:(2,\infty)\to\mathbb{R}" />, where{' '}
          <Katex tex="f(x)=\dfrac{1}{(x-2)^2}" />. State the rule and domain of{' '}
          <Katex tex="f^{-1}" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Two facts do all the work. First, an inverse swaps the roles of the axes, so{' '}
            <Katex tex="\operatorname{dom}\left(f^{-1}\right)=\operatorname{ran}(f)" /> —
            finding the range of <Katex tex="f" /> <em>is</em> finding the domain of the
            inverse. Second, the given restriction <Katex tex="x>2" /> is what makes{' '}
            <Katex tex="f" /> one-to-one; it is also what tells you which square root to keep.
          </p>
          <p>
            Note the shape: on <Katex tex="(2,\infty)" /> this is the right-hand branch of a
            truncus, falling from <Katex tex="+\infty" /> at the asymptote{' '}
            <Katex tex="x=2" /> towards <Katex tex="0" />. Its reflection in{' '}
            <Katex tex="y=x" /> therefore falls from <Katex tex="+\infty" /> near{' '}
            <Katex tex="x=0" /> towards the horizontal asymptote <Katex tex="y=2" />, which is
            exactly what <Katex tex="2+\tfrac{1}{\sqrt{x}}" /> does.
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
