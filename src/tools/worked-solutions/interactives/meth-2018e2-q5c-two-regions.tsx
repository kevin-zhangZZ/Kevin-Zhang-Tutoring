// 2018 Methods Exam 2 Q5c — the area between f(x) = 81x²(a − x)/(4a⁴) and h(x) = 9x/(2a²) is two
// regions, and the curves swap places at the middle intersection x = a/3. Sweep a strip across
// [0, 2a/3]: its height is h − f on the left and f − h on the right. A toggle shows the report's
// "h − f on both intervals" mistake: the second region counts as negative and the total collapses
// to 0. A slider for a stretches the picture sideways by a and squashes it by 1/a, so each region
// stays 1/16 whatever a is.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Region, Slider, Toggle,
  integrate, usePlayer,
} from './kit'

const fOf = (a: number) => (x: number) => (81 * x * x * (a - x)) / (4 * a ** 4)
const hOf = (a: number) => (x: number) => (9 * x) / (2 * a * a)
/** toFixed without a "-0.000" when the value rounds to zero. */
const fx = (v: number, dp: number) => (Math.abs(v) < 0.5 * 10 ** -dp ? 0 : v).toFixed(dp)
const W = 0.025

export default function TwoRegions() {
  const [a, setA] = useState(1.5)
  const [t, setT] = useState(0.4) // strip position as a fraction of the way from 0 to 2a/3
  const [sameOrder, setSameOrder] = useState(false)
  const player = usePlayer(setT, { min: 0, max: 1, seconds: 6 })

  const f = fOf(a)
  const h = hOf(a)
  const top = (x: number) => Math.max(f(x), h(x))
  const bottom = (x: number) => Math.min(f(x), h(x))
  const mid = a / 3
  const end = (2 * a) / 3
  const x0 = t * end
  const near = Math.abs(t - 0.5) < 0.015
  const left = x0 < mid
  const done = t > 0.995

  const A1 = integrate(x => h(x) - f(x), 0, mid)
  const A2 = integrate(x => f(x) - h(x), mid, end)
  const swept = integrate(x => top(x) - bottom(x), 0, x0)
  const signedSwept = integrate(x => h(x) - f(x), 0, x0)
  const d = h(x0) - f(x0)
  const stripColor = near ? C.good : left ? C.g : sameOrder ? C.bad : C.f
  const s0 = Math.max(0, x0 - W / 2)
  const s1 = Math.min(end, x0 + W / 2)

  const xf = Math.min(0.85 * a, 2.05)
  const xh = Math.min((2.8 * 2 * a * a) / 9, 2.05)

  let notice
  if (near) {
    notice = (
      <Notice tone="good">
        <b>At <M>{'x = \\tfrac{a}{3}'}</M> the strip has zero height</b>: the curves cross here. Left of this point the
        line <M>h</M> is on top; right of it the cubic <M>f</M> is. So the area is two integrals, and the order of the
        subtraction swaps between them.
      </Notice>
    )
  } else if (left) {
    notice = (
      <Notice>
        Left of <M>{'x = \\tfrac{a}{3}'}</M>, the <b>line <M>h</M> is above the cubic <M>f</M></b>, so every strip has
        height <M>h(x) - f(x)</M>, which is positive. Adding these strips from <M>0</M> to{' '}
        <M>{'\\tfrac{a}{3}'}</M> is what <M>{'A_1 = \\int_0^{a/3}\\left(h(x) - f(x)\\right)dx'}</M> means. Press the
        sweep button, or drag <M>x</M> past <M>{'\\tfrac{a}{3}'}</M>.
      </Notice>
    )
  } else if (!sameOrder) {
    notice = (
      <Notice>
        Right of <M>{'\\tfrac{a}{3}'}</M> the <b>cubic has climbed above the line</b>, so the height is now{' '}
        <M>f(x) - h(x)</M>. The region closes at <M>{'x = \\tfrac{2a}{3}'}</M>, the crest of <M>f</M> from part a.
        Now drag <M>a</M>: the picture stretches sideways by <M>a</M> and squashes by <M>{'\\tfrac1a'}</M>, so both
        areas stay <M>{'\\tfrac1{16}'}</M>. Then try &ldquo;<M>h - f</M> on both intervals&rdquo;.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        With <M>h - f</M> on the right as well, every strip past <M>{'\\tfrac{a}{3}'}</M> has negative height, so it is{' '}
        <b>subtracted</b>. Sweep to <M>{'\\tfrac{2a}{3}'}</M>: the second region cancels the first exactly and the
        &ldquo;area&rdquo; ends at <M>0</M>. A total of <M>0</M> for a picture with shading in it is the sign the order
        is wrong somewhere.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.1, 2.2]} y={[-0.3, 3.4]} xStep={0.5} yStep={1} height={320}>
        <Region top={top} bottom={bottom} from={0} to={Math.min(x0, mid)} color={C.g} opacity={0.25} />
        {x0 > mid && <Region top={top} bottom={bottom} from={mid} to={x0} color={sameOrder ? C.bad : C.f} opacity={0.25} />}
        <Plot.OfX y={h} domain={[-0.1, 2.2]} color={C.g} weight={3} />
        <Plot.OfX y={f} domain={[-0.1, 2.2]} color={C.f} weight={3} />
        <Polygon
          points={[[s0, bottom(x0)], [s1, bottom(x0)], [s1, top(x0)], [s0, top(x0)]]}
          color={stripColor}
          fillOpacity={0.85}
          weight={1}
        />
        <Point x={0} y={0} color={C.ink} />
        <Point x={mid} y={h(mid)} color={C.good} />
        <Point x={end} y={3 / a} color={C.ink} />
        <Label at={[mid, h(mid)]} attach="se" color={C.good}>x = a/3</Label>
        <Label at={[end, 3 / a]} attach="nw">(2a/3, 3/a)</Label>
        <Label at={[xf, f(xf)]} attach="ne" color={C.f}>f</Label>
        <Label at={[xh, h(xh)]} attach="se" color={C.g}>h</Label>
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setT(end > 0 ? v / end : 0)
          }}
          min={0}
          max={end}
          step={0.005}
        />
        <Slider label="a" value={a} onChange={setA} min={1} max={3} step={0.05} />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Sweep from 0 to 2a/3" />
          <Toggle label="h − f on both intervals" checked={sameOrder} onChange={setSameOrder} />
        </Buttons>
        <Readouts>
          <Readout
            color={stripColor}
            tex={
              left || sameOrder
                ? `\\text{height} = h(x) - f(x) = ${fx(d, 3)}`
                : `\\text{height} = f(x) - h(x) = ${fx(-d, 3)}`
            }
          />
          {sameOrder ? (
            <Readout color={C.bad} tex={`\\int_0^{${x0.toFixed(2)}}\\left(h - f\\right)dx \\approx ${fx(signedSwept, 4)}`} />
          ) : (
            <Readout tex={`\\text{area so far} \\approx ${swept.toFixed(4)}`} />
          )}
          <Readout color={C.g} tex={`A_1 \\approx ${A1.toFixed(4)}`} />
          <Readout color={C.f} tex={`A_2 \\approx ${A2.toFixed(4)}`} />
          {done && !sameOrder && <Readout color={C.good} tex="A_1 + A_2 = \tfrac1{16} + \tfrac1{16} = \tfrac18\ \checkmark" />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
