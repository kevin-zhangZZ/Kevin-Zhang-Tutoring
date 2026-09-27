// 2020 Methods Exam 1 Q6c — an area between curves is a sum of thin strips of height
// (top − bottom). Sweep a strip from x = 0 to x = 1 across f(x) = √x/√2 and f⁻¹(x) = 2x²: the
// top curve changes at x = 1/2, which is why the area needs two integrals. A toggle shows what a
// single ∫₀¹ (f − f⁻¹) dx does instead — the right-hand strips count as negative and cancel.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Polygon, Readout, Readouts, Region, Slider, Toggle,
  integrate, usePlayer,
} from './kit'

const f = (x: number) => Math.sqrt(x / 2)
const fInv = (x: number) => 2 * x * x
const top = (x: number) => Math.max(f(x), fInv(x))
const bottom = (x: number) => Math.min(f(x), fInv(x))
const EXACT = (5 - 2 * Math.SQRT2) / 6
const W = 0.025

export default function Strips() {
  const [x0, setX0] = useState(0.2)
  const [signed, setSigned] = useState(false)
  const player = usePlayer(setX0, { min: 0, max: 1, seconds: 6 })

  const left = x0 < 0.5
  const near = Math.abs(x0 - 0.5) < 0.02
  const swept = integrate(x => top(x) - bottom(x), 0, x0)
  const signedSwept = integrate(x => f(x) - fInv(x), 0, x0)
  const h = f(x0) - fInv(x0)
  const stripColor = near ? C.good : left ? C.f : signed ? C.bad : C.g
  const s0 = Math.max(0, x0 - W / 2)
  const s1 = Math.min(1, x0 + W / 2)

  let notice
  if (near) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = \tfrac12</M> the strip has zero height</b>, because the curves cross here. The top curve is about to
        change, so this is exactly where the area must be split into two integrals.
      </Notice>
    )
  } else if (left) {
    notice = (
      <Notice>
        Left of <M>x = \tfrac12</M>, <b><M>f</M> is on top</b>. Each strip&apos;s height is{' '}
        <M>{'f(x) - f^{-1}(x)'}</M>, which is positive. Adding up all these strips from <M>0</M> to <M>\tfrac12</M> is
        exactly what <M>{'A_1 = \\int_0^{1/2}\\left(f(x) - f^{-1}(x)\\right)dx'}</M> means.
      </Notice>
    )
  } else if (!signed) {
    notice = (
      <Notice>
        Right of <M>x = \tfrac12</M>, <b><M>{'f^{-1}'}</M> is on top</b>, so the height is now{' '}
        <M>{'f^{-1}(x) - f(x)'}</M>. The red line <M>x = 1</M> closes off the second region, so{' '}
        <M>{'A_2 = \\int_{1/2}^{1}\\left(f^{-1}(x) - f(x)\\right)dx'}</M>. Turn on &ldquo;What if I don&apos;t
        split?&rdquo; to see why one integral from 0 to 1 fails.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        In a single <M>{'\\int_0^1 \\left(f(x) - f^{-1}(x)\\right)dx'}</M>, every strip to the right of{' '}
        <M>x = \tfrac12</M> has height <M>{'f - f^{-1} < 0'}</M>, so it is <b>subtracted</b>. Those strips don&apos;t
        add area; they eat away the left-hand region. Sweep to <M>x = 1</M>: the single integral ends near{' '}
        <M>-0.195</M>, a negative &ldquo;area&rdquo;, while the true total is about <M>0.362</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 1.15]} y={[0, 2.1]} xStep={0.25} yStep={0.5} height={320}>
        <Region top={top} bottom={bottom} from={0} to={Math.min(x0, 0.5)} color={C.f} opacity={0.22} />
        <Region top={top} bottom={bottom} from={0.5} to={Math.max(0.5, x0)} color={signed ? C.bad : C.g} opacity={0.22} />
        <Plot.OfX y={f} domain={[0, 1.15]} color={C.f} weight={3} />
        <Plot.OfX y={fInv} domain={[0, 1]} color={C.g} weight={3} />
        <Line.Segment point1={[1, 0]} point2={[1, 2.1]} color={C.bad} style="dashed" weight={2} />
        <Label at={[1, 1.4]} color={C.bad} attach="e">x = 1</Label>
        <Polygon
          points={[[s0, bottom(x0)], [s1, bottom(x0)], [s1, top(x0)], [s0, top(x0)]]}
          color={stripColor}
          fillOpacity={0.85}
          weight={1}
        />
        <Label at={[1.1, f(1.1)]} color={C.f} attach="n">f</Label>
        <Label at={[0.9, fInv(0.9)]} color={C.g} attach="w">f⁻¹</Label>
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={0}
          max={1}
          step={0.005}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep from 0 to 1" />
          <Toggle label="What if I don't split?" checked={signed} onChange={setSigned} />
        </Buttons>
        <Readouts>
          <Readout
            color={stripColor}
            tex={left ? `\\text{height} = f - f^{-1} = ${h.toFixed(3)}` : `\\text{height} = f^{-1} - f = ${(-h).toFixed(3)}`}
          />
          {signed ? (
            <Readout color={C.bad} tex={`\\int_0^{${x0.toFixed(2)}}\\left(f - f^{-1}\\right)dx \\approx ${signedSwept.toFixed(3)}`} />
          ) : (
            <Readout tex={`\\text{area so far} \\approx ${swept.toFixed(3)}`} />
          )}
          {x0 > 0.995 && !signed && <Readout color={C.good} tex={`\\tfrac{5-2\\sqrt2}{6} \\approx ${EXACT.toFixed(3)}\\ \\checkmark`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
