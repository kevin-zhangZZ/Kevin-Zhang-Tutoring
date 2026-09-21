// 2016 Mathematical Methods — Exam 1, Question 8 (6 marks).
// X is a continuous random variable with pdf f(x) = -4x·ln(x) on 0<x≤1 (0 elsewhere,
// turning point at x=1/e). Part (a) is a general antiderivative "show that"; part (b) uses
// it to find Pr(X>1/e), then compare that to the median. Question text transcribed from the
// original paper; the graph is cropped directly from the original VCAA exam PDF, not a
// redrawing (it isn't used for any calculation below — the report explicitly warns it "was
// not drawn to scale" — it's shown only as the context VCAA gave). Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import densitySrc from './meth-2016exam1-q8-density-graph.png'

const EXAM_A: SAExaminerStats = {
  marks: [62, 21, 17],
  average: 0.6,
  comment: (
    <>
      This question was attempted well. Most students applied the product rule but struggled
      with the algebraic manipulation, often confusing <Katex tex="k" /> (a constant) with the
      variable <Katex tex="x" />, which gave them an incorrect result. Students who expanded the
      expression before differentiating, or who made fewer manipulations, tended to score more
      highly.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [81, 7, 12],
  average: 0.3,
  comment: (
    <>
      Students made the connection to part (a) and determined <Katex tex="k=2" />. However, few
      managed to find the correct antiderivative, and evaluation after substituting the
      terminals was problematic.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [87, 6, 7],
  average: 0.2,
  comment: (
    <>
      This question was not answered well, despite being well attempted. Often the instruction
      "hence" was ignored — students were required to link to their answer from part (b)(i) by
      substituting <Katex tex="e > \tfrac52" />. Many students based their conclusion on an
      observation of the graph given in part (a), which was explicitly <em>not</em> drawn to
      scale.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\frac{d}{dx}\!\left[\frac{x^k(k\ln x-1)}{k^2}\right] = \frac{kx^{k-1}(k\ln x-1)}{k^2} + \frac{x^k\cdot\frac{k}{x}}{k^2}"
      />
    ),
    reason: <>Product rule, treating <Katex tex="k" /> as a constant.</>,
  },
  {
    working: <Katex display tex="= \frac{x^{k-1}(k\ln x - 1)}{k} + \frac{x^{k-1}}{k}" />,
    reason: <>Simplify each term (the second term's <Katex tex="k" />s cancel).</>,
  },
  {
    working: <Katex display tex="= \frac{x^{k-1}\bigl[(k\ln x-1)+1\bigr]}{k} = \frac{x^{k-1}\cdot k\ln x}{k}" />,
  },
  {
    working: <Katex display tex="\boxed{= x^{k-1}\ln x}" />,
    reason: <>Which is exactly the function required — so <Katex tex="\dfrac{x^k(k\ln x-1)}{k^2}" /> is an antiderivative of <Katex tex="x^{k-1}\ln x" />.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X>\tfrac1e) = \int_{1/e}^{1} -4x\ln x \;dx = -4\!\int_{1/e}^{1} x\ln x \;dx" />,
    reason: <>Integrate the density over <Katex tex="(\tfrac1e,1]" />.</>,
  },
  {
    working: <Katex display tex="\int x^{k-1}\ln x\;dx = \frac{x^k(k\ln x-1)}{k^2}, \quad k=2 \;\implies\; \int x\ln x\;dx = \frac{x^2(2\ln x-1)}{4}" />,
    reason: <>Reuse part (a)'s general antiderivative with <Katex tex="k=2" />, since the integrand here is <Katex tex="x\ln x = x^{2-1}\ln x" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="-4\left[\frac{x^2(2\ln x-1)}{4}\right]_{1/e}^{1} = -\Bigl[x^2(2\ln x-1)\Bigr]_{1/e}^{1}"
      />
    ),
  },
  {
    working: <Katex display tex="= -\Bigl[(1)(0-1)\Bigr] + \left[\frac{1}{e^2}(-2-1)\right] = 1 - \frac{3}{e^2}" />,
    reason: <>At <Katex tex="x=1" />: <Katex tex="\ln 1 = 0" />. At <Katex tex="x=\tfrac1e" />: <Katex tex="\ln\tfrac1e = -1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X>\tfrac1e) = 1-\frac{3}{e^2}}" />,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="e > \tfrac52 \;\implies\; e^2 > \tfrac{25}{4} \;\implies\; \frac{3}{e^2} < \frac{3}{25/4} = \frac{12}{25}" />,
    reason: <>Square the given bound, then use it on the <Katex tex="\tfrac{3}{e^2}" /> term from part (b)(i) — a bigger denominator makes a smaller fraction.</>,
  },
  {
    working: <Katex display tex="\Pr(X>\tfrac1e) = 1-\frac{3}{e^2} > 1-\frac{12}{25} = \frac{13}{25} = 0.52" />,
    reason: <>Substitute that bound into part (b)(i)'s result.</>,
  },
  {
    working: <Katex display tex="\Pr(X>\tfrac1e) > 0.5" />,
  },
  {
    working: <Katex display tex="	herefore\ 	ext{median } m > 	frac1e" />,
    reason: <>The median <Katex tex="m" /> is defined by <Katex tex="\Pr(X>m)=0.5" /> exactly, and <Katex tex="\Pr(X>x)" /> is strictly decreasing in <Katex tex="x" /> (it's a survival function). Since <Katex tex="\Pr(X>\tfrac1e) > 0.5" />, the threshold has to move further right than <Katex tex="\tfrac1e" /> before that probability drops to exactly <Katex tex="0.5" /> — i.e. <Katex tex="m > \tfrac1e" />.</>,
  },
]

export default function MethodsQ8_2016Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (6 marks)</p>
        <p className="mb-2">Let X be a continuous random variable with probability density function</p>
        <Katex
          display
          tex="f(x) = \begin{cases} -4x\ln_e(x) & 0<x\le 1 \\ 0 & \text{elsewhere} \end{cases}"
        />
        <p className="mb-2">
          Part of the graph of <Katex tex="f" /> is shown below. The graph has a turning point at{' '}
          <Katex tex="x=\tfrac1e" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={densitySrc}
            alt="Graph of f(x) = -4x ln(x) on (0,1]: rises from the origin to a turning point at x=1/e, then falls back to zero at x=1, from the original 2016 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            Show by differentiation that <Katex tex="\dfrac{x^k}{k^2}\bigl(k\ln_e(x)-1\bigr)" /> is
            an antiderivative of <Katex tex="x^{k-1}\ln_e(x)" />, where <Katex tex="k" /> is a
            positive real number.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b.i" marks={2} statement={<>Calculate <Katex tex="\Pr\bigl(X>\tfrac1e\bigr)" />.</>} examinerReport={EXAM_BI}>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        marks={2}
        statement={<>Hence, explain whether the median of X is greater than or less than <Katex tex="\tfrac1e" />, given that <Katex tex="e>\tfrac52" />.</>}
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>
    </div>
  )
}
