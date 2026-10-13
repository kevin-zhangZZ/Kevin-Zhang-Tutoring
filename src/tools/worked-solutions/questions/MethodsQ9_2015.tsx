// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 9. VCAA examination report: 37% correct.
// Find E(X) for a uniform distribution once the unknown upper endpoint is pinned down by the
// total-area-equals-1 condition. Question text transcribed from the original paper; the
// diagram is cropped directly from the original VCAA exam PDF, not a redrawing. Solution
// is original. Interactive (interactives/meth-2015-mcq9-area.tsx): slide the right edge a and
// watch the total area and the balance point; only a = 8 gives area 1, and the mean is then 5, not 8.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import diagramSrc from './meth-2015-mcq9-uniform-pdf.png'

const AreaWidget = lazyWidget(() => import('../interactives/meth-2015-mcq9-area'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 37, C: 21, D: 15, E: 9 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      Solve <Katex tex="\int_2^a\left(\tfrac16\right)dx=1" />, for <Katex tex="a" />,{' '}
      <Katex tex="a=8" />; <Katex tex="\mathrm{E}(X)=\int_2^8\left(\tfrac{x}{6}\right)dx=5" /> or Area of
      the rectangle <Katex tex="=\tfrac16(a-2)=1" />, <Katex tex="a=8" />. Since it is a uniform
      distribution, the expected value is halfway between 2 and 8, which is 5.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_2^a \frac16\,dx = 1" />,
    reason: <>The total area under a probability density function is 1. First find the unknown <Katex tex="a" /> from that.</>,
    more: <>The graph is a rectangle: height <Katex tex="\tfrac16" /> from <Katex tex="x=2" /> to <Katex tex="x=a" />, and zero everywhere else, so only that stretch contributes area.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\frac{a-2}{6} = 1" />
        <Katex display tex="\implies\; a=8" />
      </>
    ),
    reason: <>The integral of a constant is a rectangle&apos;s area: width <Katex tex="\times" /> height <Katex tex="=(a-2)\times\tfrac16" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} \mathrm{E}(X) &= \int_2^8 \frac{x}{6}\,dx \\ &= \left[\frac{x^2}{12}\right]_2^8 \\ &= \frac{64-4}{12} = 5 \end{aligned}"
      />
    ),
    reason: <>Use <Katex tex="\mathrm{E}(X)=\int x\,f(x)\,dx" /> over the interval where <Katex tex="f(x)" /> is non-zero. <Katex tex="a=8" /> is not the answer yet.</>,
    more: (
      <>
        Quicker, as the report says: the density is constant, so the probability is spread evenly over{' '}
        <Katex tex="[2,8]" /> and the graph balances at its midpoint, <Katex tex="\tfrac{2+8}{2}=5" />. That is also a
        check on the integral. The interactive below shows the area and the balance point as <Katex tex="a" /> moves.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(X) = 5}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: (
      <>
        A (16%) is <Katex tex="a=8" />, the right-hand end of the rectangle: finding <Katex tex="a" /> is only the first
        step. C (21%), 4, is likely halfway from 0 to 8, as if the distribution started at the origin; D (15%), 3, is
        likely half the width, <Katex tex="\tfrac{8-2}{2}" />, without adding on the starting point 2. E (9%) is the
        left-hand end.
      </>
    ),
  },
]

export default function MethodsQ9_2015() {
  return (
    <MCQShell
      question={
        <p>
          The graph of the probability density function of a continuous random variable,{' '}
          <Katex tex="X" />, is shown below. If <Katex tex="a>2" />, then <Katex tex="\mathrm{E}(X)" /> is
          equal to
        </p>
      }
      diagram={<img loading="lazy" decoding="async" src={diagramSrc} alt="Uniform probability density function, constant at 1/6 from x=2 to x=a, from the original 2015 VCAA exam paper" className="w-full max-w-[280px]" />}
      options={[
        { letter: 'A', content: <Katex tex="8" /> },
        { letter: 'B', content: <Katex tex="5" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="4" /> },
        { letter: 'D', content: <Katex tex="3" /> },
        { letter: 'E', content: <Katex tex="2" /> },
      ]}
      rows={ROWS}
      extras={
        <Explore title="The height is fixed, so only one right edge gives area 1, and the mean is the middle">
          <AreaWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
