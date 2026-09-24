// 2019 Mathematical Methods — Exam 1, Question 1 (4 marks).
// f(x) = 1/(3x-1) on (1/3,∞) — differentiate and antidifferentiate (part a); g(x) =
// sin(πx)/(x+1) — evaluate g'(1) via the quotient rule (part b). Question text transcribed
// from the original paper (no diagram given — purely algebraic). Cross-checked against the
// VCAA examination report and itute's independent solutions — both agree with the
// derivation below. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_AI: SAExaminerStats = {
  marks: [33, 67],
  average: 0.7,
  comment: <>The majority of students correctly applied the chain rule. Errors were generally arithmetic in nature or with the negative exponent.</>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: (
    <>
      There were various ways of expressing the anti-derivative, with the above being the
      most common. The most common error was placing a constant of 3 or 1 (rather than{' '}
      <Katex tex="\left(\tfrac13\right)" />) in front of the log expression. Students should
      note that they could easily verify their answer by using the chain rule to differentiate
      their answer, and checking whether or not this derivative was in fact the rule for{' '}
      <Katex tex="f" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [12, 39, 50],
  average: 1.4,
  comment: (
    <>
      Though generally well handled, poor placement of, or lack of, brackets when using
      quotient rule (or the combination of product and chain rules) led to errors in
      evaluation. Other errors included the misconception that <Katex tex="\cos(\pi)=1" /> or
      misquoting the relevant differentiation rule (which is listed on the formula sheet).
      <br />
      Some students did not answer the question in its entirety (i.e. completely forgetting to
      evaluate <Katex tex="g'(1)" />).
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = (3x-1)^{-1}" />,
    reason: <>Rewrite the fraction as a power so the chain rule applies directly.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = -3(3x-1)^{-2} = \dfrac{-3}{(3x-1)^2}}" />,
    reason: <>Chain rule: derivative of the "outside" power times the derivative of the "inside" linear expression <Katex tex="(3\cdot)" />.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\int \frac{1}{3x-1}\,dx = \tfrac13\log_e(3x-1) + c" />,
    reason: <>Reverse the chain rule — dividing by the inside function's own coefficient, <Katex tex="3" />. Since the domain is <Katex tex="x>\tfrac13" />, <Katex tex="3x-1>0" /> always, so no absolute value is needed.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{an antiderivative of } f \text{ is } \tfrac13\log_e(3x-1)}" />,
    reason: <>Any antiderivative will do, so take <Katex tex="c=0" />. Check by differentiating, as the report suggests: <Katex tex="\tfrac13\times\tfrac{3}{3x-1}=\tfrac{1}{3x-1}" /> ✓. The report's most common error was a <Katex tex="3" /> or <Katex tex="1" /> in front instead of <Katex tex="\tfrac13" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = \dfrac{\sin(\pi x)}{x+1}" />,
    reason: <>A quotient, so use the quotient rule (on the formula sheet).</>,
  },
  {
    working: <Katex display tex="g'(x) = \dfrac{\pi\cos(\pi x)\,(x+1) - \sin(\pi x)\cdot 1}{(x+1)^2}" />,
    reason: <>Quotient rule, with <Katex tex="\dfrac{d}{dx}\sin(\pi x)=\pi\cos(\pi x)" /> by the chain rule.</>,
  },
  {
    working: <Katex display tex="g'(1) = \dfrac{\pi\cos(\pi)\,(2) - \sin(\pi)\cdot1}{2^2} = \dfrac{\pi(-1)(2) - 0}{4}" />,
    reason: <><Katex tex="\cos(\pi)=-1" /> and <Katex tex="\sin(\pi)=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{g'(1) = -\dfrac{\pi}{2}}" />,
    reason: <>The question says <em>evaluate</em>, so finish with the number — the report notes some students stopped at <Katex tex="g'(x)" />, and others took <Katex tex="\cos(\pi)=1" />.</>,
  },
]

export default function MethodsQ1_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (4 marks)</p>
        <p>
          Let <Katex tex="f:\left(\tfrac13,\infty\right)\to R,\ f(x)=\dfrac{1}{3x-1}" />.
        </p>
      </div>

      <PartCard letter="a.i" topic="Chain Rule" marks={1} statement={<>Find <Katex tex="f'(x)" />.</>} examinerReport={EXAM_AI}>
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard letter="a.ii" topic="Antiderivative" marks={1} statement={<>Find an antiderivative of <Katex tex="f(x)" />.</>} examinerReport={EXAM_AII}>
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Quotient Rule"
        marks={2}
        statement={
          <>
            Let <Katex tex="g:R\setminus\{-1\}\to R,\ g(x)=\dfrac{\sin(\pi x)}{x+1}" />.
            <br />
            Evaluate <Katex tex="g'(1)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
