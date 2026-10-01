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
        The plan: the graph of a sine function repeats every period, and each repeat has one dip, so count how many
        periods fit in the domain. The period of <Katex tex="\sin(ax)" /> is <Katex tex="\tfrac{2\pi}{a}" />.
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
        Divide the domain width by the period. Changing <Katex tex="a" /> does two things at once: the domain gets{' '}
        <Katex tex="a" /> times wider and each wave gets <Katex tex="a" /> times shorter, so the count is{' '}
        <Katex tex="a\times a" />. Using <Katex tex="2\pi" /> (the period of <Katex tex="\sin x" />) instead
        gives <Katex tex="\tfrac{2a\pi}{2\pi}=a" />, option <b>C</b>.
      </>
    ),
  },
  {
    working: <>Each period contains exactly <b>one</b> local minimum.</>,
    reason: (
      <>
        A local minimum is a turning point at the bottom of a dip, here where <Katex tex="\sin(ax)=-1" />, which happens
        once per period. At <Katex tex="x=-a\pi" />, <Katex tex="f(x)=\sin(-a^2\pi)=0" />, so each period starts and ends
        at a zero of <Katex tex="f" /> with its one dip strictly inside. The endpoints <Katex tex="x=\pm a\pi" /> are
        not turning points, because the graph crosses the axis there rather than levelling off:{' '}
        <Katex tex="f'(\pm a\pi)=a\cos(a^2\pi)=\pm a
eq0" />. So they add nothing.
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
        Check the pattern on small cases. One case is not enough for "always": at <Katex tex="a=2" /> the count{' '}
        <Katex tex="4" /> equals options <b>B</b>, <b>D</b> and <b>E</b>, and at <Katex tex="a=1" /> the count{' '}
        <Katex tex="1" /> equals <b>C</b> and <b>E</b>. At <Katex tex="a=3" /> the options give 2, 4, 3, 6 and 9, and
        only <Katex tex="a^2=9" /> fits.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{a^2}" />,
    reason: <>Matches option <b>E</b>.</>,
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
