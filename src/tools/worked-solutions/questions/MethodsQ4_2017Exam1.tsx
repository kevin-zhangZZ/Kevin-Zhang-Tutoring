// 2017 Mathematical Methods — Exam 1, Question 4 (2 marks).
// Sample proportion P̂ for angel fish (population proportion 1/4) — find the smallest
// integer sample size n such that sd(P̂) ≤ 1/100. Question text transcribed from the
// original paper (no diagram given — purely algebraic). Solution is original. This
// question has no lettered parts, so it doesn't use the usual PartCard wrapper — just one
// worked solution and one examiner's-report table for the question as a whole.
// Answer n = 1875 agrees with the VCAA report and itute; checked in sympy (n = 1874 gives
// sd ≈ 0.010003 > 1/100, n = 1875 gives exactly 1/100).
// Interactive: meth-2017e1-q4-threshold — sd(P̂) = √(3/(16n)) against n with the line sd = 1/100,
// showing why the answer is n ≥ 1875 (not ≤) and why 1875 itself is included. Wrong-method boxes:
// not squaring the 1/100 (n = 19), the root stopping short of n (report; n = 44), and flipping
// the fractions without reversing the sign (n ≤ 1875).

import Katex from '../../../components/Katex'
import { Background, WorkingTable, WrongMethod, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ThresholdWidget = lazyWidget(() => import('../interactives/meth-2017e1-q4-threshold'))

const EXAM: SAExaminerStats = {
  marks: [28, 41, 31],
  average: 0.7,
  comment: (
    <>
      Most students identified the correct formula; however, many were unable to correctly
      transpose the inequality to solve for <Katex tex="n" /> or to correctly manipulate the
      arithmetic involving rational numbers. Some students had poor use of notation work, in that
      they did not extend the square root sign to include <Katex tex="n" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="p = \tfrac14, \quad 1-p = \tfrac34" />,
    reason: (
      <>
        The proportion of angel fish in the whole population is the <Katex tex="p" /> in the formula. The sample
        proportion <Katex tex="\hat P" /> changes from sample to sample, scattering around this <Katex tex="p" />.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\operatorname{sd}(\hat P) &= \sqrt{\dfrac{p(1-p)}{n}} \\ &= \sqrt{\dfrac{\tfrac14\times\tfrac34}{n}} = \sqrt{\dfrac{3}{16n}}\end{aligned}"
      />
    ),
    reason: (
      <>
        &ldquo;Standard deviation of <Katex tex="\hat P" />&rdquo; is the cue for this formula (it is on the formula
        sheet). Draw the root sign right over the whole fraction, <Katex tex="n" /> included: the examiners' report noted
        students whose root stopped short of <Katex tex="n" />, because that writes a different expression (see the
        second box below the graph).
      </>
    ),
  },
  {
    working: <Katex display tex="\sqrt{\dfrac{3}{16n}} \le \dfrac{1}{100}" />,
    reason: (
      <>
        &ldquo;Less than or equal to <Katex tex="\tfrac{1}{100}" />&rdquo; translates straight into{' '}
        <Katex tex="\le" />. Keep it as an inequality rather than an equation: its direction at the end tells you
        whether the sample sizes that work are the big ones or the small ones.
      </>
    ),
  },
  {
    working: <Katex display tex="\dfrac{3}{16n} \le \dfrac{1}{10\,000}" />,
    reason: (
      <>
        To undo the square root, square <b>both</b> sides, so the right side becomes{' '}
        <Katex tex="\left(\tfrac{1}{100}\right)^2 = \tfrac{1}{10\,000}" />. Squaring keeps the <Katex tex="\le" />{' '}
        only because both sides are non-negative (a square root is never negative).
      </>
    ),
  },
  {
    working: <Katex display tex="30\,000 \le 16n" />,
    reason: (
      <>
        Clear the fractions by multiplying both sides by <Katex tex="160\,000\,n" />. That is positive (
        <Katex tex="n" /> is a sample size), so the inequality sign stays as it is. No flipping of fractions, so no
        chance of losing track of the direction.
      </>
    ),
  },
  {
    working: <Katex display tex="n \ge \dfrac{30\,000}{16} = 1875" />,
    reason: (
      <>
        Without a calculator, halve top and bottom until the 16 is gone:{' '}
        <Katex tex="\tfrac{30\,000}{16} = \tfrac{15\,000}{8} = \tfrac{7500}{4} = \tfrac{3750}{2} = 1875" />. The answer
        is <Katex tex="n \ge" /> something, which makes sense: <Katex tex="n" /> is in the denominator, so bigger
        samples give a smaller sd.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{n = 1875}" />,
    reason: (
      <>
        The smallest integer with <Katex tex="n \ge 1875" /> is <Katex tex="1875" /> itself. Check it: at{' '}
        <Katex tex="n = 1875" />,{' '}
        <Katex tex="\operatorname{sd}(\hat P) = \sqrt{\tfrac{3}{30\,000}} = \sqrt{\tfrac{1}{10\,000}} = \tfrac{1}{100}" />{' '}
        exactly, which is allowed because the question says &ldquo;less than or equal to&rdquo;.
      </>
    ),
  },
]

export default function MethodsQ4_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (2 marks)</p>
        <p className="mb-2">
          In a large population of fish, the proportion of angel fish is <Katex tex="\tfrac14" />.
        </p>
        <p className="mb-2">
          Let <Katex tex="\hat P" /> be the random variable that represents the sample
          proportion of angel fish for samples of size <Katex tex="n" /> drawn from the
          population.
        </p>
        <p>
          Find the smallest integer value of <Katex tex="n" /> such that the standard deviation
          of <Katex tex="\hat P" /> is less than or equal to <Katex tex="\tfrac{1}{100}" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background title="The two facts this question runs on">
          <p>
            <b>Why <Katex tex="n" /> is in the denominator.</b> If <Katex tex="X" /> is the number of angel fish in a
            sample of <Katex tex="n" />, then <Katex tex="X \sim \operatorname{Bi}(n, p)" /> and{' '}
            <Katex tex="\hat P = \tfrac{X}{n}" />. So{' '}
            <Katex tex="\operatorname{Var}(\hat P) = \tfrac{1}{n^2}\operatorname{Var}(X) = \tfrac{np(1-p)}{n^2} = \tfrac{p(1-p)}{n}" />
            , and the sd is its square root. Bigger samples give sample proportions that bunch more tightly around{' '}
            <Katex tex="p" />, so a condition &ldquo;sd <Katex tex="\le" /> something&rdquo; always turns into
            &ldquo;<Katex tex="n \ge" /> something&rdquo;. The sd falls like <Katex tex="\tfrac{1}{\sqrt n}" />: to
            halve it you need four times the sample.
          </p>
          <p>
            <b>Squaring an inequality.</b> If <Katex tex="0 \le a \le b" /> then <Katex tex="a^2 \le b^2" />. It
            only works when both sides are non-negative: <Katex tex="-5 \le 1" /> but <Katex tex="25 > 1" />. A
            square root and <Katex tex="\tfrac{1}{100}" /> are both non-negative, so squaring here is safe.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Bigger samples, smaller sd: why the answer is n ≥ 1875">
          <ThresholdWidget />
        </Explore>
        <WrongMethod
          title="Square the left side but leave the 1/100 alone"
          working={
            <Katex
              display
              tex="\begin{aligned}\dfrac{3}{16n} &\le \dfrac{1}{100} \\ 16n &\ge 300 \\ n &\ge 18.75, \quad n = 19\end{aligned}"
            />
          }
        >
          Squaring has to happen to <b>both</b> sides, and{' '}
          <Katex tex="\left(\tfrac{1}{100}\right)^2 = \tfrac{1}{10\,000}" />. Catch it by substituting back:{' '}
          <Katex tex="n = 19" /> gives <Katex tex="\operatorname{sd}(\hat P) = \sqrt{\tfrac{3}{304}} \approx 0.099" />,
          almost ten times the target. A sample of 19 fish can&apos;t pin the proportion down to within a hundredth;
          expect a big <Katex tex="n" />.
        </WrongMethod>
        <WrongMethod
          title="Put the root over the 3/16 but not the n"
          source="Examiner's report"
          working={
            <Katex
              display
              tex="\begin{aligned}\dfrac{\sqrt{3/16}}{n} = \dfrac{\sqrt3}{4n} &\le \dfrac{1}{100} \\ n &\ge 25\sqrt3 \approx 43.3 \\ n &= 44\end{aligned}"
            />
          }
        >
          The report noted students whose square root sign did not extend over <Katex tex="n" />. Even if you meant the
          right thing, what is written is a different expression, one that shrinks like <Katex tex="\tfrac1n" /> instead
          of <Katex tex="\tfrac{1}{\sqrt n}" />. Followed through, it gives <Katex tex="n = 44" />, where the true sd is{' '}
          <Katex tex="\sqrt{\tfrac{3}{704}} \approx 0.065" />. The <Katex tex="n" /> is part of the fraction under the
          root, so draw the root sign over all of it.
        </WrongMethod>
        <WrongMethod
          title="Flip both fractions upside down and keep the ≤"
          working={<Katex display tex="\dfrac{16n}{3} \le 10\,000 \implies n \le 1875" />}
        >
          The report says many students could not correctly transpose the inequality, and this is the classic way it
          goes wrong. Taking reciprocals of positive numbers <b>reverses</b> an inequality (
          <Katex tex="2 \le 3" /> but <Katex tex="\tfrac12 \ge \tfrac13" />), so it should be{' '}
          <Katex tex="\tfrac{16n}{3} \ge 10\,000" />. Sense check: <Katex tex="n \le 1875" /> would make the smallest{' '}
          <Katex tex="n" /> equal to 1, and the smallest samples have the <em>biggest</em> sd. Multiplying both sides by
          the positive <Katex tex="160\,000\,n" /> avoids the trap altogether.
        </WrongMethod>
        <SAExaminerReport stats={EXAM} maxMarks={2} />
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
