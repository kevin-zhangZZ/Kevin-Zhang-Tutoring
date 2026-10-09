// 2018 Mathematical Methods — Exam 1, Question 5 (3 marks). The rule and domain of the
// inverse of f(x) = 1/(x−2)² restricted to (2, ∞). Question text transcribed from the
// original paper (no diagram given). Answer checked independently with sympy and against the
// VCAA examination report and itute's solutions (all agree: f⁻¹(x) = 2 + 1/√x, domain (0, ∞)).
// Solution is original.
//
// Interactives: meth-2018e1-q5-plusroot (a horizontal line meets the full truncus at x = 2 ± 1/√k;
// the restriction x > 2 keeps only the + root, and removing it breaks one-to-one) and
// meth-2018e1-q5-mirror (drag P on f, its reflection P′ traces f⁻¹; the heights of f become the
// x-values of f⁻¹, so dom f⁻¹ = ran f; toggle for the wrong idea dom f⁻¹ = dom f).
// Wrong-method boxes (no statistic in the report singles these out, so no source is given): the
// − root, which is the inverse of the other branch; and copying f's domain.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const PlusRootWidget = lazyWidget(() => import('../interactives/meth-2018e1-q5-plusroot'))
const MirrorWidget = lazyWidget(() => import('../interactives/meth-2018e1-q5-mirror'))

const EXAM: SAExaminerStats = {
  marks: [9, 14, 31, 46],
  average: 2.2,
  comment: (
    <>
      Students appeared to manage this question confidently. However, some students did not
      handle the algebraic manipulation correctly and others used incorrect notation, stating
      their final answer or in stating the domain.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = \frac{1}{(x-2)^2}" />,
    reason: (
      <>
        An inverse undoes <Katex tex="f" />: given an output <Katex tex="y" />, which input{' '}
        <Katex tex="x" /> produced it? So write <Katex tex="y=f(x)" /> and make <Katex tex="x" /> the
        subject; swapping the letters at the end gives the inverse. (Swapping first and solving for{' '}
        <Katex tex="y" /> works just as well.)
      </>
    ),
  },
  {
    working: <Katex display tex="(x-2)^2 = \frac1y" />,
    reason: (
      <>
        Take the reciprocal of both sides. This is allowed because <Katex tex="y\ne0" />: a fraction
        with numerator <Katex tex="1" /> is never zero.
      </>
    ),
  },
  {
    working: <Katex display tex="x-2 = \pm\frac{1}{\sqrt{y}}" />,
    reason: (
      <>
        A number and its negative have the same square, so undoing the square gives two
        candidates. On the graph, the horizontal line at height <Katex tex="y" /> meets the{' '}
        <em>full</em> truncus twice, once each side of <Katex tex="x=2" />.
      </>
    ),
    more: <>The first interactive below shows the two points.</>,
  },
  {
    working: <Katex display tex="x>2 \implies x-2 = +\frac{1}{\sqrt{y}}" />,
    reason: (
      <>
        The domain <Katex tex="(2,\infty)" /> makes <Katex tex="x-2" /> positive, so the negative
        root is discarded. It belongs to the left branch, which <Katex tex="f" /> leaves out. That
        restriction is also why <Katex tex="f" /> has an inverse at all: the whole truncus fails the
        horizontal line test. (If you swapped first, you get <Katex tex="y-2=\pm\tfrac{1}{\sqrt x}" />{' '}
        and keep <Katex tex="+" /> because the outputs of <Katex tex="f^{-1}" /> are the inputs of{' '}
        <Katex tex="f" />, so <Katex tex="y>2" />.)
      </>
    ),
  },
  {
    working: <Katex display tex="x = 2 + \frac{1}{\sqrt{y}}" />,
    reason: (
      <>
        Now <Katex tex="x" /> is written in terms of <Katex tex="y" />. Writing{' '}
        <Katex tex="\sqrt{\tfrac1y}" /> instead of <Katex tex="\tfrac{1}{\sqrt y}" /> is the same
        number for <Katex tex="y>0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = 2+\frac{1}{\sqrt{x}}}" />,
    reason: (
      <>
        Relabel <Katex tex="y\to x" />, and write it as <Katex tex="f^{-1}(x)=\dots" /> rather than{' '}
        <Katex tex="y=\dots" />: the report notes incorrect notation in stating the final answer.
        Quick check with a point: <Katex tex="f(3)=1" />, and <Katex tex="f^{-1}(1)=2+1=3" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\operatorname{ran}(f) = (0,\infty)" />,
    reason: (
      <>
        The domain of an inverse is the range of the original, because the inverse swaps inputs and
        outputs. As <Katex tex="x" /> runs over <Katex tex="(2,\infty)" />,{' '}
        <Katex tex="(x-2)^2" /> takes every positive value, so <Katex tex="\tfrac{1}{(x-2)^2}" /> does
        too. It is unbounded as <Katex tex="x\to2^+" /> and approaches <Katex tex="0" /> as{' '}
        <Katex tex="x\to\infty" />, but never reaches it.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\operatorname{dom}\left(f^{-1}\right) = (0,\infty)}" />,
    reason: (
      <>
        The domain is part of the answer, not an optional extra. Round bracket at <Katex tex="0" />{' '}
        because <Katex tex="0" /> is never an output of <Katex tex="f" />; writing{' '}
        <Katex tex="R^+" /> is also fine. Here the rule <Katex tex="2+\tfrac{1}{\sqrt x}" /> happens
        to make sense for exactly these <Katex tex="x" />, but don&apos;t rely on that: the domain of an
        inverse always comes from the range of <Katex tex="f" />.
      </>
    ),
  },
]

export default function MethodsQ5_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (3 marks)</p>
        <p>
          Let <Katex tex="f:(2,\infty)\to R" />, where{' '}
          <Katex tex="f(x)=\dfrac{1}{(x-2)^2}" />. State the rule and domain of{' '}
          <Katex tex="f^{-1}" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Two facts do all the work. First, an inverse swaps the roles of the axes, so{' '}
            <Katex tex="\operatorname{dom}\left(f^{-1}\right)=\operatorname{ran}(f)" />:
            finding the range of <Katex tex="f" /> <em>is</em> finding the domain of the
            inverse. Second, the given restriction <Katex tex="x>2" /> is what makes{' '}
            <Katex tex="f" /> one-to-one; it is also what tells you which square root to keep.
            (And <Katex tex="f^{-1}" /> means the inverse function, not the reciprocal{' '}
            <Katex tex="\tfrac1f" />, which would be <Katex tex="(x-2)^2" />.)
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
        <Explore title="Why the inverse takes the + square root">
          <PlusRootWidget />
        </Explore>
        <WrongMethod
          title="Keep the − sign: f⁻¹(x) = 2 − 1/√x"
          working={<Katex display tex="x-2=-\frac{1}{\sqrt y}\implies f^{-1}(x)=2-\frac{1}{\sqrt x}" />}
        >
          This is the inverse of the <em>other</em> half of the truncus, the branch with{' '}
          <Katex tex="x<2" />. It even passes the check <Katex tex="f\big(f^{-1}(x)\big)=x" />, because
          squaring wipes out the sign: <Katex tex="\tfrac{1}{\left(-1/\sqrt x\right)^2}=x" />. Check the
          other way round instead: <Katex tex="f(3)=1" />, so <Katex tex="f^{-1}(1)" /> must be{' '}
          <Katex tex="3" />, but <Katex tex="2-\tfrac{1}{\sqrt1}=1" />. Every output of this rule is
          less than <Katex tex="2" />, while the outputs of <Katex tex="f^{-1}" /> must be inputs of{' '}
          <Katex tex="f" />, all greater than <Katex tex="2" />.
        </WrongMethod>
        <Explore title="The domain of f⁻¹ is the range of f: reflect and watch">
          <MirrorWidget />
        </Explore>
        <WrongMethod
          title="The domain of f⁻¹ is the same as f's: (2, ∞)"
          working={<Katex display tex="\operatorname{dom}\left(f^{-1}\right)=(2,\infty)" />}
        >
          An inverse swaps inputs and outputs, so its domain is the <em>range</em> of{' '}
          <Katex tex="f" />, not the domain. Test it: <Katex tex="(3,1)" /> is on <Katex tex="f" />, so{' '}
          <Katex tex="f^{-1}(1)=3" />, yet <Katex tex="1" /> is not in <Katex tex="(2,\infty)" />.
          Before stating the domain of an inverse, find the range of <Katex tex="f" />.
        </WrongMethod>
        <SAExaminerReport stats={EXAM} maxMarks={3} />
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
