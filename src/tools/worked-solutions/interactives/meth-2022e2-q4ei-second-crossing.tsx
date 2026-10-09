// 2022 Methods Exam 2 Q4e(i) — h(x) = (1/k)f(x) and its inverse always meet at O; area is only
// enclosed when they meet a second time. Slide k: for k ≤ 4, h'(0) = 4/k ≥ 1 and h stays above
// y = x on (0, ½), so O is the only meeting point and A(k) = 0. For k > 4, h leaves O flatter than
// y = x but still shoots up to +∞ at x = ½, so it must cross the line again at ±x₀ — two regions.
// Large k only squeezes x₀ towards ½; it never removes the crossing (no upper limit on k). The
// slider runs to 40 and a k = 33 preset tests the report's "4 < k < 33": there ½ − x₀ ≈ 7×10⁻⁸.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, clamp } from './kit'

const f = (x: number) => Math.log(x + 0.5) - Math.log(0.5 - x)
// Antiderivative of f: (x + ½)ln(x + ½) + (½ − x)ln(½ − x).
const F = (x: number) => (x + 0.5) * Math.log(x + 0.5) + (0.5 - x) * Math.log(0.5 - x)
const EPS = 1e-12

/** The positive solution of h(x) = x, i.e. f(x) = kx, for k > 4 (bisection on (0, ½)). */
function crossing(k: number): number {
  let lo = 1e-6
  let hi = 0.5 - 1e-12
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2
    if (f(mid) / k - mid < 0) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

/** TeX for a small positive number in scientific notation, e.g. 7.2 × 10⁻³. */
function sci(v: number): string {
  const e = Math.floor(Math.log10(v))
  return `${(v / 10 ** e).toFixed(1)} \\times 10^{${e}}`
}

const PRESETS = [3, 4, 5, 33]

export default function SecondCrossing() {
  const [k, setK] = useState(6)

  const h = (x: number) => clamp(f(x) / k, -3, 3)
  const hInv = (x: number) => (Math.exp(k * x) - 1) / (2 * (Math.exp(k * x) + 1))
  const slope = 4 / k
  const atFour = Math.abs(k - 4) < 1e-9
  const encloses = k > 4 + 1e-9
  const x0 = encloses ? crossing(k) : 0
  // Area between h and h⁻¹ = 2 × (area between h and y = x), and there are two equal regions:
  // A(k) = 4∫₀^{x₀} (x − h(x)) dx.
  const area = encloses ? 4 * (x0 * x0 / 2 - (F(x0) - F(0)) / k) : 0
  const big = k >= 10

  let notice
  if (!encloses && !atFour) {
    notice = (
      <Notice tone="warn">
        <b>No enclosed area.</b> Here <M>{`h'(0) = \\tfrac4k \\approx ${slope.toFixed(2)} > 1`}</M>, so <M>h</M> leaves{' '}
        <M>O</M> steeper than <M>y = x</M>, and to the right of <M>O</M> its gradient{' '}
        <M>{"h'(x) = \\tfrac{4}{k(1-4x^2)}"}</M> only gets bigger. So <M>h</M> stays above the line on{' '}
        <M>{'\\left(0, \\tfrac12\\right)'}</M>: the curves meet only at <M>O</M> and <M>A(k) = 0</M>, even though{' '}
        <M>{'k > 0'}</M>. Slide <M>k</M> up to <M>4</M>.
      </Notice>
    )
  } else if (atFour) {
    notice = (
      <Notice tone="warn">
        <b>At <M>k = 4</M>, still no area.</b> Now <M>h'(0) = 1</M>, so <M>y = x</M> is the tangent to <M>h</M>{' '}
        at <M>O</M>. But for every <M>{'x \\ne 0'}</M> its gradient <M>{"h'(x) = \\tfrac{1}{1-4x^2}"}</M> is bigger
        than <M>1</M>, so <M>h</M> crosses the line at <M>O</M> and pulls away from it on both sides, never coming
        back. <M>O</M> is the only meeting point, which is why <M>k = 4</M> is excluded. Nudge <M>k</M> just past <M>4</M>.
      </Notice>
    )
  } else if (!big) {
    notice = (
      <Notice tone="good">
        <b>Now <M>{`h'(0) = \\tfrac4k \\approx ${slope.toFixed(2)} < 1`}</M>,</b> so <M>h</M> starts{' '}
        <em>below</em> <M>y = x</M> just to the right of <M>O</M>. But <M>h</M> still shoots up to <M>{'+\\infty'}</M> at <M>{'x = \\tfrac12'}</M>,
        so it has to cross the line again, at <M>{`x_0 \\approx ${x0.toFixed(4)}`}</M>, and by symmetry at{' '}
        <M>{'-x_0'}</M>. Two regions are trapped, so <M>{'A(k) > 0'}</M>. Slide <M>k</M> back towards <M>4</M> and
        watch them shrink to nothing.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>No upper limit.</b> For large <M>k</M> the second crossing is squeezed right up against the asymptote{' '}
        <M>{'x = \\tfrac12'}</M>: here <M>{`\\tfrac12 - x_0 \\approx ${sci(0.5 - x0)}`}</M>, so on a graph it can look as
        if it has gone. It hasn&apos;t: <M>h</M> must still reach <M>{'+\\infty'}</M>, so it always cuts <M>y = x</M>{' '}
        again, and the area keeps growing. An upper bound, as in <M>{'4 < k < 33'}</M>, is wrong.
        {k < 33 ? <> Tap <M>k = 33</M> to check.</> : k < 40 ? <> Push <M>k</M> on to <M>40</M>: the crossing is still there.</> : null}
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.75, 0.75]} y={[-0.75, 0.75]} xStep={0.25} yStep={0.25} height={380} equalScale>
        {encloses && (
          <>
            <Region top={hInv} bottom={h} from={0} to={x0} color={C.violet} opacity={0.3} samples={400} />
            <Region top={h} bottom={hInv} from={-x0} to={0} color={C.violet} opacity={0.3} samples={400} />
          </>
        )}
        <Line.Segment point1={[-0.5, -2]} point2={[-0.5, 2]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[0.5, -2]} point2={[0.5, 2]} color={C.guide} style="dashed" weight={1.5} />
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={2} />
        <Plot.OfX y={hInv} domain={[-2, 2]} color={C.g} weight={3} />
        <Plot.OfX y={h} domain={[-0.5 + EPS, 0.5 - EPS]} color={C.f} weight={3} />
        <Point x={0} y={0} color={encloses ? C.good : C.ink} />
        {encloses && (
          <>
            <Point x={x0} y={x0} color={C.good} />
            <Point x={-x0} y={-x0} color={C.good} />
          </>
        )}
        <Label at={[(Math.exp(k * 0.65) - 1) / (2 * (Math.exp(k * 0.65) + 1)), 0.65]} color={C.f} attach="w">
          h
        </Label>
        <Label at={[0.7, hInv(0.7)]} color={C.g} attach="s">
          h⁻¹
        </Label>
        <Label at={[0.62, 0.62]} color={C.guide} attach="se">
          y = x
        </Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={1} max={40} step={0.1} format={v => v.toFixed(1)} />
        <Buttons>
          {PRESETS.map(p => (
            <ActionButton key={p} label={<M>{`k = ${p}`}</M>} onClick={() => setK(p)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout
            color={encloses ? C.good : C.bad}
            tex={
              atFour
                ? "h'(0) = \\tfrac{4}{k} = 1"
                : `h'(0) = \\tfrac{4}{k} \\approx ${slope.toFixed(2)} ${encloses ? '< 1' : '> 1'}`
            }
          />
          {encloses ? (
            <>
              <Readout color={C.good} tex="\text{meet at } O \text{ and } \pm x_0" />
              <Readout
                color={C.good}
                tex={big ? `\\tfrac12 - x_0 \\approx ${sci(0.5 - x0)}` : `x_0 \\approx ${x0.toFixed(4)}`}
              />
              <Readout color={C.violet} tex={`A(k) \\approx ${area.toFixed(4)}`} />
            </>
          ) : (
            <>
              <Readout tex="\text{meet only at } O" />
              <Readout tex="A(k) = 0" />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
