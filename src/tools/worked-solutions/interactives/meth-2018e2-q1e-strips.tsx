// 2018 Methods Exam 2 Q1e — the area between the tangent l(x) = 80x/9 + 41/27 and the quartic
// f(x) = 3x⁴ + 4x³ − 12x² is a sum of strips of height l(x) − f(x). Sweep a strip from
// x = (−1 − √42)/3 to x = (−1 + √42)/3: the height is never negative (it is 0 only at the
// touching point x = −1/3), so one integral collects both regions, 784√42/135 ≈ 37.64. A toggle
// shows the report's slip of putting a minus sign on the region below the x-axis: the two lobes
// are exactly equal (392√42/135 each), so that "total" comes out as 0.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Region, Slider, Toggle,
  integrate, usePlayer,
} from './kit'

const f = (x: number) => 3 * x ** 4 + 4 * x ** 3 - 12 * x ** 2
const l = (x: number) => (80 * x) / 9 + 41 / 27
const R1 = (-1 - Math.sqrt(42)) / 3
const R2 = (-1 + Math.sqrt(42)) / 3
const X0 = -1 / 3
const TOTAL = (784 * Math.sqrt(42)) / 135
const HALF = TOTAL / 2
const W = 0.07
const h = (x: number) => l(x) - f(x)

export default function Strips() {
  const [xs, setXs] = useState(-1.4)
  const [minus, setMinus] = useState(false)
  const player = usePlayer(setXs, { min: R1, max: R2, seconds: 7 })

  const left = xs < X0
  const near = Math.abs(xs - X0) < 0.05
  const swept = integrate(h, R1, xs)
  const wrong = -integrate(h, R1, Math.min(xs, X0)) + integrate(h, X0, Math.max(xs, X0))
  const leftColor = minus ? C.bad : C.f
  const stripColor = near ? C.good : left ? leftColor : C.f
  const s0 = Math.max(R1, xs - W / 2)
  const s1 = Math.min(R2, xs + W / 2)
  const done = xs > R2 - 1e-6

  let notice
  if (near) {
    notice = (
      <Notice tone="good">
        <b>At <M>{'x = -\\tfrac13'}</M> the strip has zero height</b>: the line touches the curve here but does not
        cross it. On both sides <M>l</M> is still on top, so the height <M>{'l(x) - f(x)'}</M> never goes negative
        and there is nothing to split. Keep sweeping to the right.
      </Notice>
    )
  } else if (minus) {
    notice = (
      <Notice tone="warn">
        With a minus sign on the left region (because it is below the <M>x</M>-axis), the left strips are{' '}
        <b>subtracted</b>. But the two regions are exactly equal, <M>{'\\tfrac{392\\sqrt{42}}{135} \\approx 18.82'}</M>{' '}
        each, so by the end the &ldquo;total&rdquo; is <M>0</M>. A zero area for two visibly shaded regions is the
        giveaway. The strip heights are <M>{'l - f'}</M>, top minus bottom, wherever they sit.
      </Notice>
    )
  } else if (left) {
    notice = (
      <Notice>
        This whole strip is <b>below the <M>x</M>-axis</b>, yet its height is still{' '}
        <M>{`l(x) - f(x) = ${h(xs).toFixed(2)}`}</M>, positive, because <M>l</M> is the top curve. For an area
        between two curves the axis plays no part. Press <b>Sweep across</b>, or turn on the minus-sign toggle to see what
        treating it as &ldquo;below the axis&rdquo; does.
      </Notice>
    )
  } else if (done) {
    notice = (
      <Notice tone="good">
        Every strip from <M>{'\\tfrac{-1-\\sqrt{42}}{3}'}</M> to <M>{'\\tfrac{-1+\\sqrt{42}}{3}'}</M> had a
        non-negative height, so one integral of <M>{'l(x) - f(x)'}</M> between the part d. terminals gives the
        total: <M>{'\\tfrac{784\\sqrt{42}}{135} \\approx 37.64'}</M>. Notice the two regions came out equal.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Right of the touching point the strip straddles the axis, part above and part below, and it still makes no
        difference: height <M>{`= l(x) - f(x) = ${h(xs).toFixed(2)}`}</M>. Sweep on to the second intersection.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 2.4]} y={[-34, 22]} xStep={1} yStep={10} height={320}>
        <Region top={l} bottom={f} from={R1} to={Math.min(xs, X0)} color={leftColor} opacity={0.22} />
        {xs > X0 && <Region top={l} bottom={f} from={X0} to={xs} color={C.f} opacity={0.22} />}
        <Plot.OfX y={f} domain={[-3.1, 2.25]} color={C.f} weight={3} />
        <Plot.OfX y={l} domain={[-3.1, 2.5]} color={C.g} weight={2.5} />
        <Polygon
          points={[[s0, f(xs)], [s1, f(xs)], [s1, l(xs)], [s0, l(xs)]]}
          color={stripColor}
          fillOpacity={0.85}
          weight={1}
        />
        <Point x={R1} y={f(R1)} color={C.ink} />
        <Point x={R2} y={f(R2)} color={C.ink} />
        <Point x={X0} y={f(X0)} color={C.good} />
        <Label at={[X0, 2.5]} attach="nw" color={C.good} size={12}>touch at x = −1/3</Label>
        <Label at={[-2.2, -28]} attach="w" color={C.f}>f</Label>
        <Label at={[2.1, l(2.1)]} attach="n" color={C.g}>l</Label>
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={xs}
          onChange={v => {
            player.stop()
            setXs(v)
          }}
          min={R1}
          max={R2}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(xs)} label="Sweep across" />
          <Toggle label="Minus sign on the region below the x-axis" checked={minus} onChange={setMinus} />
        </Buttons>
        <Readouts>
          <Readout tex={'\\text{terminals:}\\ \\ x =\\tfrac{-1\\pm\\sqrt{42}}{3} \\approx -2.49,\\ 1.83'} />
          <Readout color={stripColor} tex={`\\text{height} = l(x) - f(x) = ${h(xs).toFixed(2)}`} />
          {minus ? (
            <Readout color={C.bad} tex={`-\\!\\int_{\\text{left}} + \\int_{\\text{right}} \\approx ${wrong.toFixed(2)}`} />
          ) : (
            <Readout tex={`\\text{area so far} \\approx ${swept.toFixed(2)}`} />
          )}
          {done && !minus && <Readout color={C.good} tex={`\\tfrac{784\\sqrt{42}}{135} \\approx ${TOTAL.toFixed(2)}\\ \\checkmark`} />}
          {done && minus && <Readout color={C.bad} tex={`\\text{each region} \\approx ${HALF.toFixed(2)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
