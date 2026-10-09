// 2023 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 29% correct. Number of
// local minima of sin(ax) on [−aπ, aπ], as a general pattern in a. Question text transcribed
// from the original paper. Solution is original.
// Checked in Python: the minima x = (−π/2 + 2nπ)/a strictly inside (−aπ, aπ) number exactly a² for
// a = 1 to 6 (E). Distractors computed: C (a) is 2aπ ÷ 2π, the period of sin x used in place of 2π/a;
// at a = 2 the count 4 equals options B, D and E, and at a = 1 the count 1 equals C and E, so only
// a = 3 (or two cases together) singles out E.
// Interactive: meth-2023-mcq18-dips (slider for a = 1 to 4 on a fixed window; the domain widens by a
// while the period shrinks by a, one dip per shaded period; option chips struck out as each a is tried).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const DipsWidget = lazyWidget(() => import('../interactives/meth-2023-mcq18-dips'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 9, C: 22, D: 26, E: 29 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="f:[-a\pi,a\pi]\to R,\ f(x)=\sin(ax)" />
      <table className="my-1.5 border-collapse text-[12.5px]">
        <thead>
          <tr>
            <th className="border border-gray-300 dark:border-gray-700 px-3 py-1" />
            <th className="border border-gray-300 dark:border-gray-700 px-3 py-1 font-semibold">Number of local minima</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-gray-300 dark:border-gray-700 px-3 py-1">1</td><td className="border border-gray-300 dark:border-gray-700 px-3 py-1">1</td></tr>
          <tr><td className="border border-gray-300 dark:border-gray-700 px-3 py-1">2</td><td className="border border-gray-300 dark:border-gray-700 px-3 py-1">4</td></tr>
          <tr><td className="border border-gray-300 dark:border-gray-700 px-3 py-1">3</td><td className="border border-gray-300 dark:border-gray-700 px-3 py-1">9</td></tr>
        </tbody>
      </table>
      The number of local minima is <Katex tex="a^2" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=\sin(ax) \text{ has period } \frac{2\pi}{a}" />,
    reason: (
      <>
        The plan: count how many periods (complete waves) fit in the domain, then count the dips in each. For{' '}
        <Katex tex="\sin(ax)" /> the period is <Katex tex="\tfrac{2\pi}{a}" />.
      </>
    ),
    more: (
      <>
        Why <Katex tex="\tfrac{2\pi}{a}" />: one full cycle of sine needs its input <Katex tex="ax" /> to run through{' '}
        <Katex tex="2\pi" />, and that takes <Katex tex="x" /> a distance of only <Katex tex="\tfrac{2\pi}{a}" />. So the
        bigger <Katex tex="a" /> is, the shorter each wave.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{Domain width} = a\pi-(-a\pi) = 2a\pi" />,
    reason: <>The width of the interval <Katex tex="[-a\pi,a\pi]" /> is right end minus left end.</>,
  },
  {
    working: <Katex display tex="\text{Number of periods} = \frac{2a\pi}{2\pi/a} = a^2" />,
    reason: (
      <>
        Divide the domain width by the period. The <Katex tex="a" /> works twice: the domain is <Katex tex="a" /> times
        wider and each wave is <Katex tex="a" /> times shorter, so the count is <Katex tex="a\times a" />.
      </>
    ),
  },
  {
    working: <>Each period contains exactly <b>one</b> local minimum.</>,
    reason: (
      <>
        A local minimum is the bottom of a dip, where <Katex tex="\sin(ax)=-1" />, and that happens once per period. The
        endpoints <Katex tex="x=\pm a\pi" /> don't count: a local minimum needs the graph on both sides of it, and at
        an endpoint the domain stops.
      </>
    ),
    more: (
      <>
        <p>
          Why no dip is split or cut off: <Katex tex="f(-a\pi)=\sin(-a^2\pi)=0" /> because <Katex tex="a^2" /> is a whole
          number, so the <Katex tex="a^2" /> periods can be laid end to end starting at <Katex tex="x=-a\pi" />. Each
          starts and ends at a zero of <Katex tex="f" /> with its one dip strictly inside.
        </p>
        <p>
          The endpoints are not turning points either:{' '}
          <Katex tex="f'(\pm a\pi)=a\cos(a^2\pi)=(-1)^a a\neq0" />, so the graph is still sloping there rather than
          levelling off. One endpoint is lower than the points beside it (for <Katex tex="a=1" />, <Katex tex="\sin x" />{' '}
          falls to <Katex tex="0" /> at <Katex tex="x=\pi" />), but with graph on one side only it is not a local
          minimum. Counting it would give <Katex tex="a^2+1" />, which is not among the options.
        </p>
      </>
    ),
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span><Katex tex="a=1" />: domain <Katex tex="[-\pi,\pi]" />, 1 period, 1 local minimum ✓</span>
        <span><Katex tex="a=2" />: domain <Katex tex="[-2\pi,2\pi]" />, 4 periods, 4 local minima ✓</span>
        <span><Katex tex="a=3" />: domain <Katex tex="[-3\pi,3\pi]" />, 9 periods, 9 local minima ✓</span>
      </div>
    ),
    reason: (
      <>
        Check the pattern on small cases by sketching or graphing. One case can't settle "always": at{' '}
        <Katex tex="a=2" /> the count <Katex tex="4" /> is also the value of options <b>B</b> and <b>D</b>. At{' '}
        <Katex tex="a=3" /> the count is <Katex tex="9" />, and only <Katex tex="a^2" /> gives 9.
      </>
    ),
    more: (
      <>
        At <Katex tex="a=1" /> the count <Katex tex="1" /> fits both <b>C</b> and <b>E</b>, so <Katex tex="a=1" /> on
        its own doesn't decide either. At <Katex tex="a=3" /> the five options give 2, 4, 3, 6 and 9, so{' '}
        <Katex tex="a=3" /> is the first single case that leaves only one option standing.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{a^2}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: (
      <>
        Where the other options come from. <b>A</b> (2) and <b>B</b> (4) are fixed numbers, but the count grows with{' '}
        <Katex tex="a" /> (1, 4, 9, …), so neither can always be right. <b>C</b> (<Katex tex="a" />) divides the domain
        width by <Katex tex="2\pi" />, the period of <Katex tex="\sin x" />, instead of <Katex tex="\tfrac{2\pi}{a}" />:{' '}
        <Katex tex="\tfrac{2a\pi}{2\pi}=a" /> counts the wider domain but misses the shorter waves. <b>D</b> (
        <Katex tex="2a" />) equals <Katex tex="a^2" /> only when <Katex tex="a=2" />, so it fits a sketch of the{' '}
        <Katex tex="a=2" /> case but fails at <Katex tex="a=1" /> and <Katex tex="a=3" />.
      </>
    ),
  },
]

export default function MethodsQ18_2023() {
  return (
    <MCQShell
      question={
        <p>
          Consider the function <Katex tex="f:[-a\pi,a\pi]\to R" />, <Katex tex="f(x)=\sin(ax)" />, where{' '}
          <Katex tex="a" /> is a positive integer.
          <br />
          The number of local minima in the graph of <Katex tex="y=f(x)" /> is always equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="4" /> },
        { letter: 'C', content: <Katex tex="a" /> },
        { letter: 'D', content: <Katex tex="2a" /> },
        { letter: 'E', content: <Katex tex="a^2" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <Explore title="Bigger a: a wider domain and shorter waves, so a × a dips">
          <DipsWidget />
        </Explore>
      }
    />
  )
}
