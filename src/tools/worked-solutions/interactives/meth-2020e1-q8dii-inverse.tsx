// 2020 Methods Exam 1 Q8d.ii — lift g(x) = x·log_e(x) + k (domain (1/e, ∞)) with a slider and watch
// it against its mirror image g⁻¹ and the line y = x. Because g is increasing, g and g⁻¹ can only
// meet on y = x (green points), so the question becomes "when does g clear y = x?". The gap
// g(x) − x is smallest at x = 1, where g is parallel to y = x (dashed tangent, gradient 1) and the
// gap is g(1) − 1 = k − 1: they touch at k = 1 and separate for k > 1. The button "What if I just
// lift Q above y = x?" sets k = 0.9: the lifted minimum Q(1/e, k − 1/e) is clear of the line
// (the tempting condition k > 2/e ≈ 0.74), yet g still crosses y = x at x ≈ 0.59 and x ≈ 1.48, so
// g and g⁻¹ still meet twice. Crossings solve k = x − x·log_e(x) by bisection (checked with scipy:
// k = 0.5 → 2.156; k = 0.9 → 0.588, 1.479).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider,
} from './kit'

const A = 1 / Math.E
const TWO_E = 2 / Math.E
const TOL = 0.005
const XR = 3.5
const YT = 3
// Height at which the curves are labelled, near the top of the view.
const YL = 2.7

const h = (x: number) => x - x * Math.log(x) // g(x) = x  ⇔  k = h(x)

/** Root of fn on [lo, hi], where fn changes sign. */
function bisect(fn: (x: number) => number, lo: number, hi: number): number {
  let a = lo
  let b = hi
  const fa = fn(a)
  for (let i = 0; i < 70; i++) {
    const m = (a + b) / 2
    if (Math.sign(fn(m)) === Math.sign(fa)) a = m
    else b = m
  }
  return (a + b) / 2
}

/** Where g meets y = x: h rises from 2/e to 1 on (1/e, 1) and falls from 1 to −∞ on (1, ∞). */
function crossings(k: number): number[] {
  if (Math.abs(k - 1) < TOL) return [1]
  if (k > 1) return []
  const out: number[] = []
  if (k > TWO_E) out.push(bisect(x => h(x) - k, A, 1))
  out.push(bisect(x => h(x) - k, 1, 60))
  return out
}

/** An open circle: the end of a domain that is not included. */
function OpenPoint({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 4.5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2 } }} />
}

const fmt = (v: number) => v.toFixed(2).replace('-', '−')

export default function InverseWidget() {
  const [k, setK] = useState(0.5)
  const g = (x: number) => x * Math.log(x) + k
  const pts = crossings(k)
  const touching = Math.abs(k - 1) < TOL
  const clear = k > 1 + TOL / 2 && !touching
  const qAbove = k > TWO_E && !touching && !clear
  const gap = k - 1
  // Label the curves where g reaches y = YL (g is increasing, so this is one point).
  const xL = bisect(x => g(x) - YL, A, 10)

  let notice
  if (touching) {
    notice = (
      <Notice tone="good">
        <b><M>k = 1</M>: the curve just touches <M>y = x</M> at <M>(1, 1)</M>.</b> Its tangent there has gradient{' '}
        <M>\log_e(1) + 1 = 1</M>, the same as the line&apos;s, so the tangent <i>is</i> the line <M>y = x</M>. The point{' '}
        <M>(1, 1)</M> is its own mirror image, so <M>g</M> and <M>{'g^{-1}'}</M> touch there: one intersection. That
        is why <M>k = 1</M> itself is not allowed. Nudge <M>k</M> above 1.
      </Notice>
    )
  } else if (clear) {
    notice = (
      <Notice tone="good">
        <b>No intersection.</b> The gap between the curve and the line is smallest at <M>x = 1</M>, and even there it
        is <M>g(1) - 1 = k - 1 \approx {fmt(gap)}</M>, which is positive. So <M>g</M> lies entirely above{' '}
        <M>y = x</M>, its mirror image <M>{'g^{-1}'}</M> lies entirely below, and the two never meet. That holds for
        every <M>k &gt; 1</M>.
      </Notice>
    )
  } else if (qAbove) {
    notice = (
      <Notice tone="warn">
        <b>The lowest point Q is now above <M>y = x</M>, but <M>g</M> still crosses the line twice</b>, at{' '}
        <M>x \approx {fmt(pts[0])}</M> and <M>x \approx {fmt(pts[1])}</M>. So <M>g</M> and <M>{'g^{-1}'}</M> still
        meet twice: lifting Q clear (<M>{'k > \\tfrac2e \\approx 0.74'}</M>) is not enough. The curve leans the same
        way as the line, so the last place to clear it is where the curve runs <i>parallel</i> to <M>y = x</M>: where{' '}
        <M>g&apos;(x) = \log_e(x) + 1 = 1</M>, at <M>x = 1</M>. Look at the dashed tangent there, and keep lifting.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>g</M> crosses <M>y = x</M> once, at <M>x \approx {fmt(pts[pts.length - 1])}</M>. A point on{' '}
        <M>y = x</M> is its own mirror image, so <M>{'g^{-1}'}</M> passes through it too: that green point is where{' '}
        <M>g</M> and <M>{'g^{-1}'}</M> meet. Because <M>g</M> is increasing they can meet nowhere else, so the question
        is really: how far must <M>g</M> be lifted to clear <M>y = x</M> completely? Drag <M>k</M> up.
      </Notice>
    )
  }

  const gapColor = touching ? C.good : gap > 0 ? C.good : C.bad

  return (
    <div>
      <Plane x={[-0.5, XR]} y={[-0.5, YT]} xStep={1} yStep={1} equalScale height={340}>
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        {/* Labelled bottom left, in the third quadrant, the one stretch of the line no curve comes
            near (at the top right g, g⁻¹ and the line bunch together, and the edge clips on a phone). */}
        <Label at={[-0.55, -0.55]} color={C.guide} attach="se" size={12}>y = x</Label>
        {/* The tangent at x = 1, gradient 1 for every k: parallel to y = x. */}
        <Line.Segment point1={[0.4, k - 0.6]} point2={[1.6, k + 0.6]} color={touching ? C.good : C.f} style="dashed" weight={1.5} />
        <Plot.OfX y={g} domain={[A + 1e-6, XR]} color={C.f} weight={3} />
        <Plot.Parametric xy={t => [g(t), t]} domain={[A + 1e-6, XR]} color={C.g} weight={3} />
        <OpenPoint x={A} y={k - A} color={C.f} />
        <OpenPoint x={k - A} y={A} color={C.g} />
        {qAbove && <Label at={[A, k - A]} color={C.f} attach="w" size={12}>Q</Label>}
        {/* The gap at x = 1, from the line up (or down) to the curve. */}
        {!touching && <Line.Segment point1={[1, 1]} point2={[1, k]} color={gapColor} weight={3} />}
        <Point x={1} y={k} color={touching ? C.good : C.f} />
        {pts.map(x => (
          <Point key={x} x={x} y={x} color={C.good} />
        ))}
        <Label at={[xL, YL]} color={C.f} attach="w">g</Label>
        <Label at={[YL, xL]} color={C.g} attach="s">g⁻¹</Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={0} max={2} step={0.01} />
        <Buttons>
          <ActionButton label="What if I just lift Q above y = x?" onClick={() => setK(0.9)} />
          <ActionButton label="Set k = 1" onClick={() => setK(1)} />
        </Buttons>
        <Readouts>
          <Readout color={gapColor} tex={`\\text{gap at } x = 1\\text{: } g(1) - 1 = k - 1 = ${fmt(gap)}`} />
          <Readout color={C.good} tex={`\\text{points where } g \\text{ meets } g^{-1}\\text{: } ${pts.length}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
