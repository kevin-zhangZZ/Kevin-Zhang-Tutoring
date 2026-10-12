// 2017 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 47% correct.
// The region between y = cos(x) and y = √3 sin(x), compared with the triangle under the
// chord. Question text transcribed from the original paper; the figure is a crop of
// VCAA's own artwork. Answers verified with sympy (shaded = sqrt3 - 1, triangle = sqrt3 pi/8,
// ratio ~1.076); agrees with itute. Solution is original.
// Widget: interactives/meth-2017-mcq20-lower.tsx — sweep a strip from O to A; its top edge is the
// lower curve, which swaps at B, with a toggle showing the wrong area under cos(x) alone (option E).
// WrongMethod boxes for D (18%, triangle without the 1/2) and E (9%, integral of cos from 0 to
// pi/2), both checked to give exactly those options. Options A and C match no slip we could verify.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { WrongMethod } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import diagramSrc from './meth-2017-mcq20-shaded.png'

const LowerCurveWidget = lazyWidget(() => import('../interactives/meth-2017-mcq20-lower'))

const EXAMINER_COMMENT = (
  <>
    <Katex tex="\cos(x)=\sqrt3\sin(x)" />
    <br />
    <Katex tex="\tan(x)=\dfrac{1}{\sqrt3},\ x=\dfrac{\pi}{6}" />
    <br />
    <Katex tex="B\left(\dfrac{\pi}{6},\dfrac{\sqrt3}{2}\right)" />
    <br />
    <Katex tex="A_{\text{triangle}}=\dfrac{\pi}{4}\times\dfrac{\sqrt3}{2}=\dfrac{\sqrt3\pi}{8}" />
    <br />
    <Katex tex="A_{\text{shaded}}=\int_0^{\frac{\pi}{6}}\sqrt3\sin(x)\,dx+\int_{\frac{\pi}{6}}^{\frac{\pi}{2}}\cos(x)\,dx=\sqrt3-1" />
    <br />
    <Katex tex="A_{\text{shaded}}:A_{\text{triangle}}" />
    <br />
    <Katex tex="\sqrt3-1:\dfrac{\sqrt3\pi}{8}" />
  </>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 47, C: 18, D: 18, E: 9 },
  answer: 'B',
  noAnswer: 1,
  comment: EXAMINER_COMMENT,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(x)=\sqrt3\sin(x) \implies \tan(x)=\frac{1}{\sqrt3}" />,
    reason: <><Katex tex="B" /> is the triangle's top vertex and where the shaded boundary changes curve. Set the rules equal and divide by <Katex tex="\sqrt3\cos(x)" /> to get a <Katex tex="\tan" /> equation.</>,
    more: <>Dividing is safe because <Katex tex="\cos(x)\ne0" /> for <Katex tex="0\le x<\tfrac{\pi}{2}" />, and at <Katex tex="x=\tfrac{\pi}{2}" /> the curves don't meet (<Katex tex="0\ne\sqrt3" />).</>,
  },
  {
    working: <Katex display tex="x=\frac{\pi}{6}, \qquad y=\cos\!\left(\frac{\pi}{6}\right)=\frac{\sqrt3}{2}" />,
    reason: <><Katex tex="\tan\!\left(\tfrac{\pi}{6}\right)=\tfrac{1}{\sqrt3}" />, the only solution in <Katex tex="\left[0,\tfrac{\pi}{2}\right]" />. So <Katex tex="B=\left(\tfrac{\pi}{6},\tfrac{\sqrt3}{2}\right)" />.</>,
  },
  {
    working: <Katex display tex="A_{\triangle} = \frac12\times\frac{\pi}{2}\times\frac{\sqrt3}{2}" />,
    reason: <>Base <Katex tex="OA=\tfrac{\pi}{2}" /> along the <Katex tex="x" />-axis; height is <Katex tex="B" />'s <Katex tex="y" />-coordinate. Don't drop the <Katex tex="\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="A_{\triangle} = \frac{\sqrt3\pi}{8}" />,
    reason: <>About <Katex tex="0.68" />.</>,
  },
  {
    working: <Katex display tex="A_{\text{shaded}} = \int_0^{\pi/6}\!\sqrt3\sin(x)\,dx + \int_{\pi/6}^{\pi/2}\!\cos(x)\,dx" />,
    reason: <>The shading is under <em>both</em> curves, so each strip's top is the <em>lower</em> curve: <Katex tex="\sqrt3\sin(x)" /> left of <Katex tex="B" />, <Katex tex="\cos(x)" /> right of it, so split at <Katex tex="x=\tfrac{\pi}{6}" />.</>,
    more: <>One integral can only follow one rule for the top edge, which is why the rule change at <Katex tex="B" /> forces two integrals. Sweep the strip in the interactive below to watch the top edge switch.</>,
  },
  {
    working: <Katex display tex="= \Bigl[-\sqrt3\cos(x)\Bigr]_0^{\pi/6} + \Bigl[\sin(x)\Bigr]_{\pi/6}^{\pi/2}" />,
    reason: <>Antidifferentiating each piece.</>,
  },
  {
    working: <Katex display tex="= \left(-\frac32+\sqrt3\right) + \left(1-\frac12\right)" />,
    reason: <>Upper minus lower terminal: <Katex tex="\left(-\sqrt3\cos\tfrac{\pi}{6}\right)-\left(-\sqrt3\cos0\right)=-\tfrac32+\sqrt3" />; then <Katex tex="\sin\!\left(\tfrac{\pi}{2}\right)-\sin\!\left(\tfrac{\pi}{6}\right)=1-\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="A_{\text{shaded}} = \sqrt3-1" />,
    reason: <>About <Katex tex="0.73" />, a bit more than the triangle's <Katex tex="0.68" />, as the picture suggests.</>,
    more: <>The shaded region is the triangle plus two thin slivers between its sloping sides and the curves, so it must be slightly bigger. That is a quick check on both areas.</>,
  },
  {
    working: <Katex display tex="\boxed{\sqrt3-1 \;:\; \frac{\sqrt3\pi}{8}}" />,
    reason: <>Matches option <b>B</b>, with shaded first and triangle second, as asked.</>,
    more: <>Compare with the options before simplifying: B is already in this form. As decimals the ratio is about <Katex tex="1.076" />; option A, <Katex tex="9:8" />, is <Katex tex="1.125" /> and option C is about <Katex tex="1.152" />, so neither matches. Options D and E, the common slips, are in the Common Mistake boxes below.</>,
  },
]

export default function MethodsQ20_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The graphs of <Katex tex="f:\left[0,\tfrac{\pi}{2}\right]\to R" />,{' '}
            <Katex tex="f(x)=\cos(x)" /> and{' '}
            <Katex tex="g:\left[0,\tfrac{\pi}{2}\right]\to R" />,{' '}
            <Katex tex="g(x)=\sqrt3\sin(x)" /> are shown below. The graphs intersect at{' '}
            <Katex tex="B" />.
          </p>
          <p>
            The ratio of the area of the shaded region to the area of triangle{' '}
            <Katex tex="OAB" /> is
          </p>
        </>
      }
      diagram={
        <img loading="lazy" decoding="async"
          src={diagramSrc}
          alt="y = cos(x) falling from 1 and y = √3 sin(x) rising from 0, crossing at B; the region under both curves (√3 sin(x) from O to B, cos(x) from B to A) down to the x-axis is shaded, with triangle OAB drawn inside it and A at (π/2, 0) — from the original 2017 VCAA exam paper"
          className="w-full max-w-[400px]"
        />
      }
      options={[
        { letter: 'A', content: <Katex tex="9:8" /> },
        { letter: 'B', content: <Katex tex="\sqrt3-1:\dfrac{\sqrt3\pi}{8}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="8\sqrt3-3:3\pi" /> },
        { letter: 'D', content: <Katex tex="\sqrt3-1:\dfrac{\sqrt3\pi}{4}" /> },
        { letter: 'E', content: <Katex tex="1:\dfrac{\sqrt3\pi}{8}" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Why the shaded area needs two integrals">
            <LowerCurveWidget />
          </Explore>
          <WrongMethod
            title="Triangle area = base × height"
            source="18% chose D"
            working={<Katex display tex="A_{\triangle}=\frac{\pi}{2}\times\frac{\sqrt3}{2}=\frac{\sqrt3\pi}{4}" />}
          >
            That is the area of the rectangle around the triangle, twice too big, and it gives{' '}
            <Katex tex="\sqrt3-1:\tfrac{\sqrt3\pi}{4}" />, option D. A quick check catches it: the triangle sits inside the
            shaded region, so its area must be a little <em>less</em> than <Katex tex="\sqrt3-1\approx0.73" />, not about{' '}
            <Katex tex="1.36" />.
          </WrongMethod>
          <WrongMethod
            title="The shaded region is the area under cos(x) from 0 to π/2"
            source="9% chose E"
            working={<Katex display tex="\int_0^{\pi/2}\cos(x)\,dx = 1" />}
          >
            Left of <Katex tex="B" /> the shading stops at the lower curve, <Katex tex="\sqrt3\sin(x)" />, so this integral
            also counts the unshaded wedge between the two curves, of area <Katex tex="2-\sqrt3" />. It gives{' '}
            <Katex tex="1:\tfrac{\sqrt3\pi}{8}" />, option E. Before integrating, trace the region&apos;s top edge from left to
            right and note every point where it changes curve.
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
