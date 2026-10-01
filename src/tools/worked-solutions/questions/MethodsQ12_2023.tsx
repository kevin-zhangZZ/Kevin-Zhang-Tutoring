// 2023 Mathematical Methods — Exam 2, MCQ 12. VCAA examination report: 29% correct. Maximum
// possible mean of a discrete random variable, given a probability mass function in terms of
// an unknown k. Question text transcribed from the original paper. Solution is original.
// Widget: interactives/meth-2023-mcq12-allowed-k.tsx (drag k: the turning point of E(X) needs
// negative probabilities; on the allowed interval 0 ≤ k ≤ √5 − 2 the largest mean is at k = 0).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const AllowedKWidget = lazyWidget(() => import('../interactives/meth-2023-mcq12-allowed-k'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 14, C: 26, D: 18, E: 29 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      From observation, <Katex tex="k\geq0" /> and the maximum will occur when{' '}
      <Katex tex="k=0" />, <Katex tex="E(X)=2" />.
      <br />
      <Katex tex="E(X)=-k^2+k-2k^2-8k+2" />
      <br />
      <Katex tex="=-3k^2-7k+2" />
      <br />
      When <Katex tex="k=0" />, <Katex tex="E(X)=2" />.
    </>
  ),
}

const TABLE = (
  <div className="overflow-x-auto">
    <table className="text-[13px] border-collapse text-center">
      <tbody>
        <tr>
          <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5"><Katex tex="X" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5"><Katex tex="-1" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5"><Katex tex="0" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5"><Katex tex="1" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5"><Katex tex="2" /></td>
        </tr>
        <tr>
          <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5"><Katex tex="\Pr(X=x)" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5"><Katex tex="k^2" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5"><Katex tex="3k" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5"><Katex tex="k" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5"><Katex tex="-k^2-4k+1" /></td>
        </tr>
      </tbody>
    </table>
  </div>
)

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="k^2+3k+k+(-k^2-4k+1) = 1" />,
    reason: (
      <>
        Usually you solve &ldquo;the probabilities add to 1&rdquo; for <Katex tex="k" />. Here every <Katex tex="k" />{' '}
        term cancels, so the sum is 1 for <i>every</i> <Katex tex="k" /> and this can&apos;t find <Katex tex="k" />.
        So <Katex tex="k" /> can vary, and the question asks for the largest mean over all the values it is allowed to
        take.
      </>
    ),
  },
  {
    working: <Katex display tex="3k\geq0 \ \text{ and } \ k\geq0 \implies k\geq0" />,
    reason: (
      <>
        What restricts <Katex tex="k" /> is that every probability must be <Katex tex="\geq0" />. Start with{' '}
        <Katex tex="\Pr(X=0)=3k" /> and <Katex tex="\Pr(X=1)=k" />. (<Katex tex="\Pr(X=-1)=k^2" /> is never negative, so
        it gives no condition.)
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="-k^2-4k+1\geq0 \iff k^2+4k-1\leq0" />
        <Katex display tex="k^2+4k-1=0" />
        <Katex display tex="k=\frac{-4\pm\sqrt{20}}{2}=-2\pm\sqrt5" />
        <Katex display tex="-2-\sqrt5\leq k\leq -2+\sqrt5" />
      </>
    ),
    reason: (
      <>
        <Katex tex="\Pr(X=2)=-k^2-4k+1" /> must be <Katex tex="\geq0" /> too. Multiply by <Katex tex="-1" /> (which
        flips the inequality) and find the roots with the quadratic formula. <Katex tex="y=k^2+4k-1" /> is an upright
        parabola, so it is <Katex tex="\leq0" /> between its roots.
      </>
    ),
  },
  {
    working: <Katex display tex="0 \leq k \leq \sqrt5-2\ \ (\approx0.236)" />,
    reason: (
      <>
        <Katex tex="k" /> must satisfy both conditions at once, and <Katex tex="k\geq0" /> cuts off the negative part of
        the interval. No probability can then exceed 1, since they are all <Katex tex="\geq0" /> and add to 1.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="E(X) = -k^2+0+k+2(-k^2-4k+1)" />
        <Katex display tex="= -k^2+k-2k^2-8k+2" />
        <Katex display tex="= -3k^2-7k+2" />
      </>
    ),
    reason: (
      <>
        <Katex tex="E(X)=\sum x\Pr(X=x)" />: multiply each value of <Katex tex="X" /> by its probability and add, so{' '}
        <Katex tex="(-1)k^2" />, <Katex tex="0(3k)" />, <Katex tex="1(k)" /> and <Katex tex="2(-k^2-4k+1)" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\frac{d}{dk}E(X) = -6k-7" />
        <Katex display tex="-6k-7<0 \text{ for } 0\leq k\leq\sqrt5-2" />
      </>
    ),
    reason: (
      <>
        The tempting move is the turning point of the quadratic: <Katex tex="-6k-7=0" /> gives{' '}
        <Katex tex="k=-\tfrac{7}{6}" /> and <Katex tex="E(X)=\tfrac{73}{12}\approx6.08" />, which is not even an option.
        That <Katex tex="k" /> isn&apos;t allowed, since it makes <Katex tex="\Pr(X=0)=3k=-3.5" />. On the allowed
        interval the derivative is negative, so <Katex tex="E(X)" /> decreases as <Katex tex="k" /> increases, and its
        largest value is at the left end, <Katex tex="k=0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{E(X)\big|_{k=0} = -0-0+2 = 2}" />,
    reason: (
      <>
        Matches option <b>E</b>. Check: at <Katex tex="k=0" /> the probabilities are 0, 0, 0, 1, so <Katex tex="X=2" />{' '}
        for certain and its mean is 2. No mean can be larger, since <Katex tex="X" /> is never more than 2. Options{' '}
        <b>B</b>, <b>C</b> and <b>D</b> are the means for other allowed values of <Katex tex="k" /> (about 0.218,
        0.177 and 0.135), so they are possible but smaller; a mean of 0 (option <b>A</b>) would need{' '}
        <Katex tex="k\approx0.257" />, outside the allowed interval.
      </>
    ),
  },
]

export default function MethodsQ12_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The probability mass function for the discrete random variable <Katex tex="X" /> is shown below.
          </p>
          <div className="mb-3">{TABLE}</div>
          <p>The maximum possible value for the mean of <Katex tex="X" /> is:</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="\tfrac13" /> },
        { letter: 'C', content: <Katex tex="\tfrac23" /> },
        { letter: 'D', content: <Katex tex="1" /> },
        { letter: 'E', content: <Katex tex="2" />, isAnswer: true },
      ]}
      rows={ROWS}
      extras={
        <Explore title="The turning point of E(X) needs negative probabilities, so the largest allowed mean is at k = 0">
          <AllowedKWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
