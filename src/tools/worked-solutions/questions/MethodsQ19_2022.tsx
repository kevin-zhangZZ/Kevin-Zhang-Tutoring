// 2022 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 34% correct. Where the
// maximum-volume open box occurs when squares of side x are cut from a rectangular sheet.
// Question text transcribed from the original paper. Solution is original.
// Checked in sympy: V'(x) = 12x² − 4(a+b)x + ab = 0 at x = (a + b ∓ √(a² − ab + b²))/6. For a ≤ b the
// − root lies in 0 < x < a/2 and the + root in a/2 ≤ x < b/2 (equal to a/2 only when a = b), where
// V ≤ 0. 34% chose B, the + root. V''(x) = 24x − 4(a+b) = ∓4√(a² − ab + b²) at the two roots.
// Final review (Oct 2026): coefficient roles named, zeros traced to the factors, B de-duplicated
// across rows 8 and 10; Explore title says "solution" to match the working.
// Oct 2026 Concise/Detailed pass: CAS-arrangement note, V'' check, square-sheet case and the
// option-by-option check moved into rows' `more`; Concise final row is just "Matches option D".
// Interactive: meth-2022-mcq19-plus-root (sliders for a and b; the B point always sits past the edge
// of the box's domain, on the cubic's local minimum).

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2022-mcq19-report-graph.png'

const PlusRootWidget = lazyWidget(() => import('../interactives/meth-2022-mcq19-plus-root'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 34, C: 13, D: 34, E: 9 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="V(x)=x(b-2x)(a-2x)" />
      <br />
      Solve <Katex tex="V'(x)=0" /> for <Katex tex="x" />.
      <br />
      <Katex tex="x=\dfrac{a+b\pm\sqrt{a^2-ab+b^2}}{6}" />
      <br />
      <Katex tex="x=\dfrac{a+b-\sqrt{a^2-ab+b^2}}{6}" />
      <br />
      The maximum occurs at the smaller <Katex tex="x" /> value.
      <br />
      An example is shown below for a general cubic function using <Katex tex="b=2" /> and{' '}
      <Katex tex="a=1" />.
      <img src={reportGraphSrc} alt="The report's example: y = x(2 − 2x)(1 − 2x), a cubic with a local maximum at the smaller stationary point" className="w-full max-w-[340px] mt-1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="V(x) = x(b-2x)(a-2x)" />,
    reason: <>Each folded-up square side becomes the height, <Katex tex="x" />. A square is cut from both ends of each edge, so the base is <Katex tex="a-2x" /> by <Katex tex="b-2x" />. Volume = height × width × length.</>,
  },
  {
    working: <Katex display tex="0 < x < \tfrac{a}{2} \ \text{ and } \ x < \tfrac{b}{2}" />,
    reason: <>Every length of the box must be positive: <Katex tex="x>0" />, <Katex tex="a-2x>0" /> and <Katex tex="b-2x>0" />. So <Katex tex="x" /> is less than half the shorter side. This domain is used later to check which stationary point is a real box.</>,
  },
  {
    working: <Katex display tex="V(x) = 4x^3 - 2(a+b)x^2 + abx" />,
    reason: <>Expand, so the volume can be differentiated term by term.</>,
  },
  {
    working: <Katex display tex="V'(x) = 12x^2 - 4(a+b)x + ab" />,
    reason: <>The maximum is at a stationary point, so solve <Katex tex="V'(x)=0" />. It's a quadratic in <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="x = \frac{4(a+b)\pm\sqrt{16(a+b)^2-48ab}}{24}" />,
    reason: <>Quadratic formula, with <Katex tex="12" /> as the <Katex tex="x^2" /> coefficient, <Katex tex="-4(a+b)" /> as the <Katex tex="x" /> coefficient and <Katex tex="ab" /> as the constant term. On CAS, <Cas fn="solve">solve(d/dx(V(x)) = 0, x)</Cas> gives the two solutions directly.</>,
    more: <>CAS may print the two solutions arranged differently from the options (terms in another order, or the fraction split up), so rearrange before matching. Either way there are two of them, and the rest of the question is deciding which one is the maximum.</>,
  },
  {
    working: <Katex display tex="16(a+b)^2 - 48ab = 16(a^2-ab+b^2)" />,
    reason: <>Simplify inside the square root: <Katex tex="16(a^2+2ab+b^2) - 48ab = 16(a^2+2ab+b^2-3ab)" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x = \frac{4(a+b)\pm4\sqrt{a^2-ab+b^2}}{24}" />
        <Katex display tex="x = \frac{a+b\pm\sqrt{a^2-ab+b^2}}{6}" />
      </>
    ),
    reason: <>Take the <Katex tex="\sqrt{16}=4" /> out of the root, then divide top and bottom by <Katex tex="4" />. Options B and D are these two solutions, so you must decide which one is the maximum.</>,
  },
  {
    working: <>The smaller solution (with <Katex tex="-\sqrt{\phantom{a}}" />) is the local maximum; the larger (with <Katex tex="+\sqrt{\phantom{a}}" />) is the local minimum.</>,
    reason: <>The leading term of <Katex tex="V" /> is <Katex tex="4x^3" />, a positive cubic, so its graph rises to a local maximum, falls to a local minimum, then rises again. The first stationary point (smaller <Katex tex="x" />) is the maximum. The square root is positive, so the <Katex tex="-" /> version is the smaller one.</>,
    more: (
      <>
        This is the step behind option B, which 34% of students chose: it is the larger stationary point, but
        the larger <Katex tex="x" /> gives the local minimum, not the larger volume. The second derivative
        confirms which is which: <Katex tex="V''(x)=24x-4(a+b)" />, and substituting the two solutions gives{' '}
        <Katex tex="V''=\mp4\sqrt{a^2-ab+b^2}" />. At the <Katex tex="-" /> solution{' '}
        <Katex tex="V''<0" /> (concave down, a maximum); at the <Katex tex="+" /> solution{' '}
        <Katex tex="V''>0" /> (a minimum).
      </>
    ),
  },
  {
    working: <Katex display tex="V(x) = 0 \text{ at } x = 0,\ \tfrac{a}{2},\ \tfrac{b}{2}" />,
    reason: <>Check against the domain. The zeros come straight from the factors of <Katex tex="V(x)=x(b-2x)(a-2x)" />. <Katex tex="V>0" /> from <Katex tex="x=0" /> to the first of <Katex tex="\tfrac a2" /> and <Katex tex="\tfrac b2" />: that hump is the whole domain, with the local maximum on top. The local minimum lies past it, in the dip between the other two zeros, where a base side is negative, so it is not a box at all.</>,
    more: (
      <>
        Say <Katex tex="a\le b" />. In that dip, between <Katex tex="\tfrac a2" /> and{' '}
        <Katex tex="\tfrac b2" />, the width <Katex tex="a-2x" /> is negative, so <Katex tex="V<0" />. For a
        square sheet (<Katex tex="a=b" />) the two zeros merge and the <Katex tex="+" /> solution sits exactly
        at <Katex tex="x=\tfrac a2" />: the base shrinks to a point and <Katex tex="V=0" />, the smallest
        possible box rather than the largest. The interactive below lets you change <Katex tex="a" /> and{' '}
        <Katex tex="b" /> and watch where the two solutions land.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{x = \frac{a+b-\sqrt{a^2-ab+b^2}}{6}}" />,
    reason: <>Matches option <b>D</b>: the smaller solution, the only stationary point inside the domain.</>,
    more: (
      <>
        Option <b>B</b> is the local minimum found above. Options A, C and E don&apos;t solve <Katex tex="V'(x)=0" /> in general (A and C start with{' '}
        <Katex tex="a-b" />; E has <Katex tex="a^2-2ab+b^2" /> under the root). Check with the report&apos;s{' '}
        <Katex tex="a=1" />, <Katex tex="b=2" />: D gives <Katex tex="x\approx0.21" />, inside{' '}
        <Katex tex="0<x<0.5" />, while B gives <Katex tex="x\approx0.79" />, past <Katex tex="x=0.5" />.
      </>
    ),
  },
]

export default function MethodsQ19_2022() {
  return (
    <MCQShell
      question={
        <p>
          A box is formed from a rectangular sheet of cardboard, which has a width of <Katex tex="a" /> units and a
          length of <Katex tex="b" /> units, by first cutting out squares of side length <Katex tex="x" /> units from
          each corner and then folding upwards to form a container with an open top.
          <br />
          The maximum volume of the box occurs when <Katex tex="x" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{a-b+\sqrt{a^2-ab+b^2}}{6}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{a+b+\sqrt{a^2-ab+b^2}}{6}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{a-b-\sqrt{a^2-ab+b^2}}{6}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{a+b-\sqrt{a^2-ab+b^2}}{6}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{a+b-\sqrt{a^2-2ab+b^2}}{6}" /> },
      ]}
      rows={ROWS}
      extras={
        <Explore title="The + solution lands where the box no longer exists">
          <PlusRootWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
