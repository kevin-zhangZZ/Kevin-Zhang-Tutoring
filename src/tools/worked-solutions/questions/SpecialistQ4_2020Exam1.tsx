// 2020 Specialist Mathematics — Exam 1 Question 4 (4 marks). An inequality with an absolute
// value in the denominator, answered in interval notation. Question text transcribed from
// the original paper; the sketch in the examiner's comment is cropped from the VCAA report.
// Answer checked with sympy and against the VCAA examination report and itute (itute takes
// reciprocals, |x − 4| > 1/(3 − x), and reads the crossing off a graph of y = |x − 4| against
// y = 1/(3 − x): the same quadratic and the same answer). Solution is original.
// Interactive diagram (§15): slide x along the axis to compare the line y = 3 − x with the curve
// y = 1/|x − 4| — where the line is higher, why nothing at x ≥ 3 can work, and, with a toggle,
// how squaring both sides manufactures the phantom interval x > (7 + √5)/2
// (interactives/spec-2020e1-q4-line-curve.tsx). The two common mistakes were computed with
// sympy: keeping both branches of x² − 7x + 11 > 0 (or squaring both sides) gives
// (−∞, (7 − √5)/2) ∪ ((7 + √5)/2, ∞); doing the case x > 4 and not reversing the inequality
// when multiplying by −1 gives (−∞, (7 − √5)/2) ∪ (4, ∞).
// A single-part question has no PartCard to hold the diagram and mistakes back in "Hide
// answers" mode, so `AfterWorking` below keeps them behind a button there.

import { useState, type ReactNode } from 'react'
import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { useStudyMode } from '../studyMode'
import reportGraphSrc from './spec-2020e1-q4-report-graph.png'

const LineCurveWidget = lazyWidget(() => import('../interactives/spec-2020e1-q4-line-curve'))

const EXAM: SAExaminerStats = {
  marks: [22, 20, 22, 24, 12],
  average: 1.8,
  comment: (
    <>
      The intersection of the graphs of <Katex tex="y=3-x" /> and{' '}
      <Katex tex="y=\dfrac{1}{|x-4|}" /> occurs when <Katex tex="x<3" />. A quick sketch was
      helpful:
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's sketch of y = 3 − x and y = 1/|x − 4|, with the asymptote x = 4" className="w-full max-w-[240px] my-2" />
      As <Katex tex="x<3" />, the inequality to be solved was{' '}
      <Katex tex="3-x>\dfrac{1}{4-x}" />. This led to the inequality{' '}
      <Katex tex="x^2-7x+11>0" />, which could be solved using the quadratic formula. A number of
      students who found that <Katex tex="-\infty<x<\dfrac{7-\sqrt5}{2}" /> did not receive full
      marks as they did not write the final answer in interval notation.
      <br />
      Students who approached this problem algebraically were often unsure how to deal with the
      inequality signs.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1}{|x-4|} > 0 \ \text{ for all } x \ne 4" />,
    reason: (
      <>
        Start with the side you know most about. <Katex tex="|x-4|" /> is the distance between{' '}
        <Katex tex="x" /> and <Katex tex="4" />, so it is never negative, and it is zero only at{' '}
        <Katex tex="x=4" />, where the fraction isn&apos;t defined anyway. One over a positive number
        is positive, so the right-hand side is always strictly positive.
      </>
    ),
    more: (
      <>
        In the diagram below it is the orange curve, which never dips below the <Katex tex="x" />-axis.
      </>
    ),
  },
  {
    working: <Katex display tex="\implies 3-x > 0 \implies x < 3" />,
    reason: (
      <>
        The left-hand side has to be bigger than something positive, so it must be positive
        itself. That rules out every <Katex tex="x\ge3" /> at a stroke, including the awkward
        point <Katex tex="x=4" />. How would you know to look for this? Whenever one side of an
        inequality can only be positive (a modulus, a square, an exponential), ask what that
        forces the other side to be.
      </>
    ),
  },
  {
    working: <Katex display tex="x < 3 \implies x-4 < 0 \implies |x-4| = 4-x" />,
    reason: (
      <>
        The modulus of a negative number is its opposite: <Katex tex="|x-4| = -(x-4) = 4-x" />.
        Because <Katex tex="x<3" /> is already known, <Katex tex="x-4" /> is certainly negative,
        so there is only one case to handle, not two. (The other case, <Katex tex="x>4" />, has
        no solutions: there <Katex tex="3-x" /> is negative.)
      </>
    ),
  },
  {
    working: <Katex display tex="3-x > \frac{1}{4-x}" />,
    reason: <>The inequality with the modulus removed, valid for <Katex tex="x<3" />.</>,
  },
  {
    working: <Katex display tex="(3-x)(4-x) > 1" />,
    reason: (
      <>
        Multiply both sides by <Katex tex="4-x" /> to clear the fraction. On <Katex tex="x<3" />{' '}
        it is positive (bigger than 1, in fact), so the inequality sign stays as it is. Knowing
        the sign of what you multiply by is the whole issue here: the report notes students who
        approached this algebraically were often unsure how to deal with the inequality signs.
      </>
    ),
  },
  {
    working: <Katex display tex="12-7x+x^2 > 1 \implies x^2-7x+11 > 0" />,
    reason: <>Expanding and collecting everything on one side turns it into a question about where a parabola is positive.</>,
  },
  {
    working: <Katex display tex="x = \frac{7\pm\sqrt{49-44}}{2} = \frac{7\pm\sqrt5}{2}" />,
    reason: (
      <>
        The discriminant <Katex tex="49-44=5" /> is not a perfect square, so the quadratic
        doesn&apos;t factorise nicely: use the quadratic formula.{' '}
        <Katex tex="\tfrac{7-\sqrt5}{2}\approx2.38" /> and <Katex tex="\tfrac{7+\sqrt5}{2}\approx4.62" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="x^2-7x+11 > 0" />
        <Katex display tex="\iff x < \tfrac{7-\sqrt5}{2} \ \text{ or } \ x > \tfrac{7+\sqrt5}{2}" />
      </>
    ),
    reason: (
      <>
        <Katex tex="y=x^2-7x+11" /> is an upright parabola, so it is above the axis outside its
        two roots and below it between them. A quick sketch settles which side you want.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\text{combine with } x<3:" />
        <Katex display tex="\tfrac{7+\sqrt5}{2}\approx4.62 \text{ is excluded}" />
      </>
    ),
    reason: (
      <>
        Everything since the second line assumed <Katex tex="x<3" />, so the answer must respect
        it. The branch <Katex tex="x>\tfrac{7+\sqrt5}{2}" /> fails: at <Katex tex="x=5" />, say,{' '}
        <Katex tex="3-x=-2" /> is certainly not bigger than <Katex tex="\tfrac{1}{|5-4|}=1" />. The
        left branch, <Katex tex="x<\tfrac{7-\sqrt5}{2}\approx2.38" />, already lies inside{' '}
        <Katex tex="x<3" /> and survives whole.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{x \in \left(-\infty,\ \tfrac{7-\sqrt5}{2}\right)}" />,
    reason: (
      <>
        Interval notation, as the question demands — the report notes students who wrote the
        same set as <Katex tex="-\infty<x<\tfrac{7-\sqrt5}{2}" /> did not receive full marks. Round
        brackets at both ends: <Katex tex="-\infty" /> is never included, and{' '}
        <Katex tex="\tfrac{7-\sqrt5}{2}" /> is left out because the inequality is strict (there
        the two sides are equal, both <Katex tex="\tfrac{\sqrt5-1}{2}\approx0.618" />). Check:{' '}
        <Katex tex="x=0" /> gives <Katex tex="3>\tfrac14" />, true, while <Katex tex="x=2.5" />,
        just past the boundary, gives <Katex tex="0.5>\tfrac23" />, false.
      </>
    ),
  },
]

// In "Hide answers" mode a PartCard holds its diagram and common mistakes back until the working
// has been revealed. This question has no parts, so there is no PartCard to do that: keep them
// behind a button instead, so a student having a go first doesn't scroll straight onto the answer.
function AfterWorking({ children }: { children: ReactNode }) {
  const { hideAnswers, detailed } = useStudyMode()
  const [open, setOpen] = useState(false)
  if (!detailed) return null
  if (!hideAnswers || open) return <>{children}</>
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-[12.5px] font-semibold px-3 py-1.5 rounded-full border bg-white border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500"
      >
        Show the interactive diagram and common mistakes (gives the answer away)
      </button>
    </div>
  )
}

export default function SpecialistQ4_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (4 marks)</p>
        <p>
          Solve the inequality <Katex tex="3-x>\dfrac{1}{|x-4|}" /> for <Katex tex="x" />,
          expressing your answer in interval notation.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            An inequality between two expressions is a question about two graphs:{' '}
            <Katex tex="3-x>\dfrac{1}{|x-4|}" /> asks for which <Katex tex="x" /> the line{' '}
            <Katex tex="y=3-x" /> is <em>higher</em> than the curve <Katex tex="y=\dfrac{1}{|x-4|}" />.
            The examiner&apos;s report says a quick sketch of the two was helpful, and it is worth
            doing before any algebra.
          </p>
          <p>
            The instinct with a modulus is to split into two cases. Resist it here: because
            the right-hand side is always positive, the left-hand side must be too, and that
            single deduction fixes the sign of <Katex tex="x-4" /> before you ever open the
            absolute value.
          </p>
          <p>
            It also means you never multiply an inequality by something of unknown sign — the
            usual way marks are lost on this type of question.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <DetailOnly>
          <AfterWorking>
            <Explore title="Where is the line above the curve — and why can nothing right of x = 3 work?">
              <LineCurveWidget />
            </Explore>
            <WrongMethod
              title="Solve x² − 7x + 11 > 0 and keep both branches"
              working={
                <>
                  <Katex display tex="(3-x)(4-x) > 1" />
                  <Katex display tex="\implies x^2-7x+11>0" />
                  <Katex display tex="x < \tfrac{7-\sqrt5}{2} \ \text{ or } \ x > \tfrac{7+\sqrt5}{2}" />
                  <Katex display tex="x \in \left(-\infty,\tfrac{7-\sqrt5}{2}\right)\cup\left(\tfrac{7+\sqrt5}{2},\infty\right)" />
                </>
              }
            >
              <p>
                The quadratic was only derived for <Katex tex="x<3" />: that is what made{' '}
                <Katex tex="|x-4|=4-x" /> and what made multiplying by <Katex tex="4-x" /> safe. So its
                solutions have to be filtered through <Katex tex="x<3" />, and the right-hand branch
                fails the filter. One test value exposes it: at <Katex tex="x=5" />,{' '}
                <Katex tex="3-x=-2" /> is not bigger than <Katex tex="\tfrac{1}{|5-4|}=1" />.
              </p>
              <p>
                Squaring both sides to get rid of the modulus lands on exactly the same wrong answer,
                because squaring throws away the fact that <Katex tex="3-x" /> is negative out there.
                Turn on &ldquo;What if I square both sides?&rdquo; in the diagram above to see where the
                phantom interval comes from.
              </p>
            </WrongMethod>
            <WrongMethod
              title="Do the case x > 4 as well, and change every sign to tidy it up"
              working={
                <>
                  <Katex display tex="x>4: \quad 3-x > \frac{1}{x-4}" />
                  <Katex display tex="(3-x)(x-4) > 1" />
                  <Katex display tex="\implies -x^2+7x-13 > 0" />
                  <Katex display tex="x^2-7x+13 > 0, \ \text{true for every } x" />
                  <Katex display tex="x \in \left(-\infty,\tfrac{7-\sqrt5}{2}\right)\cup(4,\infty)" />
                </>
              }
            >
              <p>
                Multiplying an inequality by <Katex tex="-1" /> reverses it:{' '}
                <Katex tex="-x^2+7x-13>0" /> becomes <Katex tex="x^2-7x+13<0" />, which is never true
                (the discriminant <Katex tex="49-52" /> is negative and the parabola is upright). So
                this case has no solutions at all; forgetting the flip turns &ldquo;never&rdquo; into
                &ldquo;always&rdquo; and adds the whole of <Katex tex="(4,\infty)" />. A test value
                catches it: <Katex tex="x=5" /> gives <Katex tex="3-5=-2" />, which is not bigger
                than <Katex tex="1" />.
              </p>
              <p>
                Better still, skip this case. For <Katex tex="x>4" /> the left-hand side is negative
                and the right-hand side positive (the line is below the axis in the diagram), so it
                can&apos;t have solutions. This is one way the report&apos;s &ldquo;unsure how to deal
                with the inequality signs&rdquo; plays out.
              </p>
            </WrongMethod>
          </AfterWorking>
        </DetailOnly>
        <SAExaminerReport stats={EXAM} maxMarks={4} />
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
