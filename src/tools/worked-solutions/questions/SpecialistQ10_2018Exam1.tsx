// 2018 Specialist Mathematics — Exam 1, Question 10 (5 marks). Arc length of a curve given
// by a position vector, reduced to a prescribed quadratic integrand. Question text
// transcribed from the original paper (no diagram given). Answer checked independently with
// sympy and against the VCAA examination report.
//
// Arc length in PARAMETRIC form is current content; only the cartesian-form version was
// removed from the study design, so this question stays in (guide §13.7, and the skip
// guide's own note on the 2019 parametric case). Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [35, 22, 24, 17, 0, 2],
  average: 1.3,
  comment: (
    <>
      Only a few students obtained full marks for this question. Most students recognised
      that the arc length formula needed to be applied, but some had difficulty
      differentiating <Katex tex="\arcsin(t)+t\sqrt{1-t^2}" />. A number of students applied
      the product and chain rule correctly to the <Katex tex="t\sqrt{1-t^2}" /> term and
      ignored the <Katex tex="\arcsin(t)" /> term.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="d = \int_{t_1}^{t_2}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />,
    reason: <>Arc length of a parametric curve. The given target <Katex tex="\int_0^{3/4}\left(at^2+bt+c\right)dt" /> tells you the square root must simplify away — so the sum of squares has to be a perfect square.</>,
  },
  {
    working: <Katex display tex="x = \frac{t^3}{3} \implies \frac{dx}{dt} = t^2" />,
    reason: <>Straightforward.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dt}\bigl(\arcsin(t)\bigr) = \frac{1}{\sqrt{1-t^2}}" />,
    reason: <>Standard derivative from the formula sheet. The report notes this term being ignored altogether by a number of students.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dt}\left(t\sqrt{1-t^2}\right) = \sqrt{1-t^2} + t\cdot\frac{-t}{\sqrt{1-t^2}}" />,
    reason: <>Product rule, with the chain rule on <Katex tex="\sqrt{1-t^2}" /> giving <Katex tex="\tfrac{-2t}{2\sqrt{1-t^2}}=\tfrac{-t}{\sqrt{1-t^2}}" />.</>,
  },
  {
    working: <Katex display tex="= \frac{\left(1-t^2\right)-t^2}{\sqrt{1-t^2}} = \frac{1-2t^2}{\sqrt{1-t^2}}" />,
    reason: <>Over a common denominator.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dt} = \frac{1}{\sqrt{1-t^2}} + \frac{1-2t^2}{\sqrt{1-t^2}} = \frac{2-2t^2}{\sqrt{1-t^2}}" />,
    reason: <>Adding the two pieces. Both terms share the same denominator, so they combine immediately.</>,
  },
  {
    working: <Katex display tex="= \frac{2\left(1-t^2\right)}{\sqrt{1-t^2}} = 2\sqrt{1-t^2}" />,
    reason: <>The key simplification: <Katex tex="\tfrac{1-t^2}{\sqrt{1-t^2}}=\sqrt{1-t^2}" />. Without it the next step is unmanageable.</>,
  },
  {
    working: <Katex display tex="\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2 = t^4 + 4\left(1-t^2\right) = t^4-4t^2+4" />,
    reason: <>Squaring and adding.</>,
  },
  {
    working: <Katex display tex="t^4-4t^2+4 = \left(t^2-2\right)^2" />,
    reason: <>A perfect square, exactly as the prescribed answer form promised.</>,
  },
  {
    working: <Katex display tex="\sqrt{\left(t^2-2\right)^2} = \left|t^2-2\right| = 2-t^2 \quad \text{for } 0\le t\le1" />,
    reason: <>The absolute value matters: on the given domain <Katex tex="t^2\le1<2" />, so <Katex tex="t^2-2" /> is negative and the square root is its <em>negative</em>. Writing <Katex tex="t^2-2" /> instead would give a negative distance.</>,
  },
  {
    working: <Katex display tex="d = \int_0^{3/4}\left(-t^2+0\cdot t+2\right)dt" />,
    reason: <>Matching the required form <Katex tex="\int_0^{3/4}\left(at^2+bt+c\right)dt" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -1, \quad b = 0, \quad c = 2}" />,
    reason: <>All integers, as required. Do not omit <Katex tex="b=0" /> — the question asks for all three. (For interest the distance itself is <Katex tex="\tfrac{87}{64}\approx1.36" /> m, though the question stops at the coefficients.) Only <Katex tex="2\%" /> of the state scored full marks.</>,
  },
]

export default function SpecialistQ10_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 10 (5 marks)</p>
        <p className="mb-2">
          The position vector of a particle moving along a curve at time <Katex tex="t" />{' '}
          seconds is given by{' '}
          <Katex tex="\underset{\sim}{r}(t)=\dfrac{t^3}{3}\,\underset{\sim}{i}+\left(\arcsin(t)+t\sqrt{1-t^2}\right)\underset{\sim}{j},\ 0\le t\le1" />,
          where distances are measured in metres.
        </p>
        <p>
          The distance <Katex tex="d" /> metres that the particle travels along the curve in
          three-quarters of a second is given by{' '}
          <Katex tex="d=\displaystyle\int_0^{3/4}\left(at^2+bt+c\right)dt" />. Find{' '}
          <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" />, where{' '}
          <Katex tex="a,b,c\in\mathbb{Z}" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The question has already told you the answer's shape: a polynomial with no square
            root in sight. That is a strong hint that{' '}
            <Katex tex="\left(\tfrac{dx}{dt}\right)^2+\left(\tfrac{dy}{dt}\right)^2" /> is a
            perfect square, so if your expression does not simplify that way, the
            differentiation has gone wrong somewhere.
          </p>
          <p>
            The <Katex tex="y" /> component is designed to look worse than it is. Both terms
            differentiate to something over <Katex tex="\sqrt{1-t^2}" />, they add cleanly,
            and the result collapses to <Katex tex="2\sqrt{1-t^2}" />.
          </p>
          <p>
            One trap at the end: <Katex tex="\sqrt{u^2}=|u|" />, not <Katex tex="u" />. Here{' '}
            <Katex tex="t^2-2" /> is negative on the whole domain, so the square root is{' '}
            <Katex tex="2-t^2" /> — which is why <Katex tex="a=-1" /> rather than{' '}
            <Katex tex="+1" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={5} />
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
