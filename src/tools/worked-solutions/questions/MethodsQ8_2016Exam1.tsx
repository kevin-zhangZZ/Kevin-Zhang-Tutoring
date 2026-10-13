// 2016 Mathematical Methods — Exam 1, Question 8 (6 marks).
// X is a continuous random variable with pdf f(x) = −4x·logₑ(x) on 0 < x ≤ 1 (0 elsewhere,
// turning point at x = 1/e). Part (a) is a general antiderivative "show by differentiation";
// part (b) uses it to find Pr(X > 1/e), then compares that with the median. Question text
// transcribed from the original paper; the graph is cropped directly from the original VCAA
// exam PDF, not a redrawing (it isn't used for any calculation below — the report warns it
// "was not drawn to scale" — it's shown only as the context VCAA gave). Answers checked
// against the VCAA examination report. Solution is original.
// Interactive: b.ii (meth-2016e1-q8bii-median — slide a cut point and watch Pr(X > c) pass ½).
// Skipped: a. — the marks were lost to algebra (k treated as a variable, brackets), which a
// picture doesn't teach; b.i. — lost to the antiderivative and evaluating at 1/e, also algebra;
// the region from 1/e to 1 is shaded in the b.ii widget's starting state.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import densitySrc from './meth-2016e1-q8-density-graph.png'
import { Explore, lazyWidget } from '../Explore'

const MedianWidget = lazyWidget(() => import('../interactives/meth-2016e1-q8bii-median'))

const EXAM_A: SAExaminerStats = {
  marks: [62, 21, 17],
  average: 0.6,
  comment: (
    <>
      This question was attempted well. Most students applied the product rule but struggled
      with the algebraic manipulation, often confusing <Katex tex="k" /> (a constant) with the
      variable <Katex tex="x" />, which gave them an incorrect result. Students who expanded the
      expression before differentiating or those who made fewer manipulations tended to scored
      more highly. Some students differentiated the wrong expression.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [81, 7, 12],
  average: 0.3,
  comment: (
    <>
      Students made the connection to part a. and determined <Katex tex="k=2" />. However, few
      managed to find the correct antiderivative. Evaluation after substituting terminals was
      problematic. Some used incorrect terminals.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [87, 6, 7],
  average: 0.2,
  comment: (
    <>
      This question was not answered well, despite being well attempted. Often the instruction
      'hence' was ignored. Students were required to link to their answer from Question 8bi. by
      substituting <Katex tex="e>\tfrac52" />. Many students based their conclusion on an
      observation of the graph given in part a., which was not drawn to scale, as per the
      instructions given at the start of the examination. Some tried, with little success, to
      evaluate the median, but this was not required. A common misconception was to assume that
      since <Katex tex="\tfrac1e<\tfrac25<\tfrac12" /> then{' '}
      <Katex tex="\Pr\!\left(X>\tfrac1e\right)>\tfrac12" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&\frac{d}{dx}\!\left[\frac{x^k}{k^2}\bigl(k\log_e(x)-1\bigr)\right] \\ &= \frac{kx^{k-1}}{k^2}\bigl(k\log_e(x)-1\bigr) \\ &\quad +\frac{x^k}{k^2}\times\frac{k}{x}\end{aligned}"
      />
    ),
    reason: <>Product rule, treating <Katex tex="k" /> as a constant: the derivative of <Katex tex="x^k" /> is <Katex tex="kx^{k-1}" />, and the derivative of <Katex tex="k\log_e(x)-1" /> is <Katex tex="\tfrac{k}{x}" />.</>,
    more: (
      <>
        The report says most students used the product rule but then confused the constant <Katex tex="k" /> with the
        variable <Katex tex="x" />. Only <Katex tex="x" /> changes here: <Katex tex="\tfrac{1}{k^2}" /> is just a number
        out the front, and <Katex tex="k\log_e(x)" /> differentiates like <Katex tex="3\log_e(x)" /> would, to{' '}
        <Katex tex="\tfrac{k}{x}" />. Its general comments also blame poor use of brackets in this part: keep{' '}
        <Katex tex="\bigl(k\log_e(x)-1\bigr)" /> in brackets so the <Katex tex="-1" /> is multiplied too.
        <br />
        The report also notes some students differentiated the wrong expression. Differentiate the proposed
        antiderivative <Katex tex="\tfrac{x^k}{k^2}\bigl(k\log_e(x)-1\bigr)" />, not <Katex tex="x^{k-1}\log_e(x)" />: if its
        derivative comes back as <Katex tex="x^{k-1}\log_e(x)" />, it is an antiderivative.
        <br />
        The report adds that students who expanded first did better. That route:{' '}
        <Katex tex="\tfrac{x^k}{k^2}\bigl(k\log_e(x)-1\bigr) = \tfrac{1}{k}x^k\log_e(x) - \tfrac{1}{k^2}x^k" />, whose
        derivative is <Katex tex="x^{k-1}\log_e(x) + \tfrac1k x^{k-1} - \tfrac1k x^{k-1} = x^{k-1}\log_e(x)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= \frac{x^{k-1}}{k}\bigl(k\log_e(x)-1\bigr) + \frac{x^{k-1}}{k}" />,
    reason: <>Cancel a <Katex tex="k" /> in the first term; in the second, <Katex tex="\tfrac{x^k}{x}=x^{k-1}" /> and <Katex tex="\tfrac{k}{k^2}=\tfrac1k" />.</>,
  },
  {
    working: <Katex display tex="= x^{k-1}\log_e(x) - \frac{x^{k-1}}{k} + \frac{x^{k-1}}{k}" />,
    reason: <>Expanding the first term.</>,
  },
  {
    working: <Katex display tex="\boxed{= x^{k-1}\log_e(x)}" />,
    reason: <>The two <Katex tex="\tfrac{x^{k-1}}{k}" /> terms cancel. So the derivative of <Katex tex="\tfrac{x^k}{k^2}\bigl(k\log_e(x)-1\bigr)" /> is <Katex tex="x^{k-1}\log_e(x)" />, so it is an antiderivative of <Katex tex="x^{k-1}\log_e(x)" />. As required.</>,
    more: <>The report's general comments list "show by" here among the instructions that needed an explicit response: finish with the sentence linking the derivative back to the antiderivative, not just the last line of algebra.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\Pr\!\left(X>\tfrac1e\right) \\ &= \int_{1/e}^{1} -4x\log_e(x)\,dx \\ &=-4\int_{1/e}^{1} x\log_e(x)\,dx\end{aligned}" />,
    reason: <>Probability is the area under the density. <Katex tex="X>\tfrac1e" /> runs from <Katex tex="\tfrac1e" /> up to <Katex tex="1" />, beyond which <Katex tex="f(x)=0" />.</>,
    more: <>The report notes some students used incorrect terminals. <Katex tex="\int_0^{1/e}" /> would give <Katex tex="\Pr\!\left(X<\tfrac1e\right)" />, the other side. Going past <Katex tex="1" /> is also wrong: the density there is <Katex tex="0" />, not <Katex tex="-4x\log_e(x)" /> (which is negative for <Katex tex="x>1" />).</>,
  },
  {
    working: <Katex display tex="k=2:\quad \int x\log_e(x)\,dx = \frac{x^2}{4}\bigl(2\log_e(x)-1\bigr)" />,
    reason: <>Exam 1 has no CAS, so use part a. with <Katex tex="k=2" />, since <Katex tex="x\log_e(x) = x^{2-1}\log_e(x)" />.</>,
    more: <>The report says students found <Katex tex="k=2" /> but few then wrote the correct antiderivative. Replace every <Katex tex="k" />: <Katex tex="x^k\to x^2" />, <Katex tex="k^2\to 4" /> and <Katex tex="k\log_e(x)\to 2\log_e(x)" />. No <Katex tex="+c" /> is needed for a definite integral.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&-4\left[\frac{x^2}{4}\bigl(2\log_e(x)-1\bigr)\right]_{1/e}^{1} \\ &= -\Bigl[x^2\bigl(2\log_e(x)-1\bigr)\Bigr]_{1/e}^{1}\end{aligned}"
      />
    ),
    reason: <>The <Katex tex="-4" /> and the <Katex tex="\tfrac14" /> combine to <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="= -\left[1\times(0-1) - \frac{1}{e^2}(-2-1)\right] = -\left[-1+\frac{3}{e^2}\right]" />,
    reason: <>Upper terminal minus lower. At <Katex tex="x=1" />: <Katex tex="\log_e(1) = 0" />. At <Katex tex="x=\tfrac1e" />: <Katex tex="x^2=\tfrac1{e^2}" /> and <Katex tex="\log_e\!\left(\tfrac1e\right) = -1" />.</>,
    more: <>The report found this evaluation problematic. The signs are where it goes wrong: at <Katex tex="\tfrac1e" /> the bracket is <Katex tex="2(-1)-1=-3" />, and subtracting <Katex tex="\tfrac{1}{e^2}\times(-3)" /> gives <Katex tex="+\tfrac{3}{e^2}" />. Then the outer minus flips both terms.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr\!\left(X>\tfrac1e\right) = 1-\frac{3}{e^2}}" />,
    reason: <>Check: <Katex tex="e^2>3" />, so <Katex tex="0<\tfrac{3}{e^2}<1" /> and the answer lies between <Katex tex="0" /> and <Katex tex="1" />, as a probability must.</>,
    more: <>A calculator gives <Katex tex="1-\tfrac{3}{e^2}\approx 0.594" />, but Exam 1 only needs the exact value.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="e > \tfrac52 \implies e^2 > \tfrac{25}{4} \implies \frac{3}{e^2} < \frac{3}{25/4} = \frac{12}{25}" />,
    reason: <>"Hence" means use part b.i. Square the given bound (both sides positive), then apply it to the <Katex tex="\tfrac{3}{e^2}" /> term — a bigger denominator makes a smaller fraction.</>,
    more: <>Without a calculator you can't evaluate <Katex tex="1-\tfrac{3}{e^2}" />, so the given <Katex tex="e>\tfrac52" /> is there to bound it. The report says the "hence" was often ignored and many students judged from the graph instead, which was not drawn to scale.</>,
  },
  {
    working: <Katex display tex="\frac{3}{e^2} < \frac{12}{25} < \frac12" />,
    reason: <>Since <Katex tex="\tfrac{12}{25}<\tfrac{12.5}{25}" />.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(X>\tfrac1e\right) = 1-\frac{3}{e^2} > 1-\frac12 = \frac12" />,
    reason: <>Subtracting something less than <Katex tex="\tfrac12" /> from <Katex tex="1" /> leaves more than <Katex tex="\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{the median of } X \text{ is greater than } \tfrac1e}" />,
    reason: <>The median <Katex tex="m" /> has exactly half the probability to its right. More than half lies right of <Katex tex="\tfrac1e" />, so <Katex tex="m" /> is further right.</>,
    more: (
      <>
        Why "further right": <Katex tex="\Pr(X>x)" /> only gets smaller as <Katex tex="x" /> increases. At{' '}
        <Katex tex="x=\tfrac1e" /> it is still above <Katex tex="\tfrac12" />, so it reaches <Katex tex="\tfrac12" /> only at
        some larger <Katex tex="x" />. You don't need <Katex tex="m" /> itself (the report says attempts to find it had little
        success); a CAS gives <Katex tex="m\approx 0.432" />, against <Katex tex="\tfrac1e\approx 0.368" />.
        <br />
        The report's common misconception was arguing from <Katex tex="\tfrac1e<\tfrac25<\tfrac12" />, the given <Katex tex="e>\tfrac52" /> flipped to{' '}
        <Katex tex="\tfrac1e<\tfrac25" />. That misuses the bound; its job is to bound <Katex tex="\tfrac{3}{e^2}" />, as in
        the first row. Being left of{' '}
        <Katex tex="\tfrac12" />, the middle of the interval, says nothing about area: in fact{' '}
        <Katex tex="\Pr\!\left(X>\tfrac12\right)=\tfrac34-\tfrac12\log_e(2)\approx 0.403" />, so the median lies between{' '}
        <Katex tex="\tfrac1e" /> and <Katex tex="\tfrac12" />. The diagram below lets you slide the cut point and see this.
      </>
    ),
  },
]

export default function MethodsQ8_2016Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (6 marks)</p>
        <p className="mb-2">
          Let <Katex tex="X" /> be a continuous random variable with probability density
          function
        </p>
        <Katex
          display
          tex="f(x) = \begin{cases} -4x\log_e(x) & 0<x\le 1 \\ 0 & \text{elsewhere} \end{cases}"
        />
        <p className="mb-2">
          Part of the graph of <Katex tex="f" /> is shown below. The graph has a turning point at{' '}
          <Katex tex="x=\tfrac1e" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={densitySrc}
            alt="Graph of f(x) = −4x logₑ(x) on (0, 1]: rises from the origin to a turning point at x = 1/e, then falls back to zero at x = 1 — from the original 2016 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Antiderivative"
        marks={2}
        statement={
          <>
            Show by differentiation that{' '}
            <Katex tex="\dfrac{x^k}{k^2}\bigl(k\log_e(x)-1\bigr)" /> is an antiderivative of{' '}
            <Katex tex="x^{k-1}\log_e(x)" />, where <Katex tex="k" /> is a positive real number.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b.i" topic="Continuous PDF" marks={2} statement={<>Calculate <Katex tex="\Pr\!\left(X>\tfrac1e\right)" />.</>} examinerReport={EXAM_BI}>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Median"
        marks={2}
        statement={
          <>
            Hence, explain whether the median of <Katex tex="X" /> is greater than or less than{' '}
            <Katex tex="\tfrac1e" />, given that <Katex tex="e>\tfrac52" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
        <Explore title="More than half the area is right of 1/e, so the median is too">
          <MedianWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
