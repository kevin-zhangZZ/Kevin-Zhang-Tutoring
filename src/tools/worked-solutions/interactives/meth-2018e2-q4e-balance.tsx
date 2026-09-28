// 2018 Methods Exam 2 Q4e — the mean of a density is its balance point. The hike-time density
// M(t) = (3/50)(t/50)² e^{−(t/50)³} sits on a pivot at t = c. Each thin slice at time t has weight
// M(t) dt and turns the curve about the pivot with leverage (t − c), so the net turning effect is
// ∫₀^∞ (t − c) M(t) dt = E(T) − c. It balances only at c = ∫₀^∞ t M(t) dt ≈ 44.6 — which is where the
// "t ×" in the formula comes from. Buttons put the pivot at the mode (43.7, the peak) and the median
// (44.2, half the area each side): the report says some students gave these instead.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, Slider } from './kit'

const Mf = (t: number) => (t <= 0 ? 0 : (3 / 50) * (t / 50) ** 2 * Math.exp(-((t / 50) ** 3)))
const MEAN = 44.6489755784625
const MEDIAN = 50 * Math.cbrt(Math.log(2)) // 44.2499
const MODE = 50 * Math.cbrt(2 / 3) // 43.679
const cdf = (t: number) => 1 - Math.exp(-((t / 50) ** 3))

export default function Balance() {
  const [c, setC] = useState(30)

  const net = MEAN - c // ∫(t − c)M(t)dt, since ∫M = 1
  const balanced = Math.abs(net) < 0.15
  const tri = 0.0028
  const col = balanced ? C.good : C.bad

  let notice
  if (balanced) {
    notice = (
      <Notice tone="good">
        <b>Balanced at <M>c \approx 44.6</M>.</b> The pull from the left, <M>{'\\int_0^c (c-t)M(t)\\,dt'}</M>, equals the
        pull from the right, so <M>{'\\int_0^\\infty (t-c)M(t)\\,dt = 0'}</M>, which rearranges to{' '}
        <M>{'c = \\int_0^\\infty t\\,M(t)\\,dt'}</M>. That is why the mean multiplies by <M>t</M>: far-out times get
        more leverage. Compare the peak and the median buttons.
      </Notice>
    )
  } else if (Math.abs(c - MODE) < 0.05) {
    notice = (
      <Notice tone="warn">
        This is the <b>mode</b>, the peak of the curve at <M>43.7</M>. The long tail to the right still pulls harder
        (net <M>{net.toFixed(2)}</M> min), so the peak is not the mean.
      </Notice>
    )
  } else if (Math.abs(c - MEDIAN) < 0.05) {
    notice = (
      <Notice tone="warn">
        This is the <b>median</b>, <M>44.2</M>: exactly half the area on each side. Equal <em>area</em> is not equal{' '}
        <em>leverage</em>: the right-hand area sits further out, so it still tips right (net{' '}
        <M>{net.toFixed(2)}</M> min).
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Think of the curve cut out of cardboard, resting on a pivot at <M>{`t = ${c.toFixed(1)}`}</M>. Every slice pulls
        with weight <M>{'M(t)\\,dt'}</M> times its distance <M>t-c</M> from the pivot. Net pull{' '}
        <M>{`= E(T) - c = ${net.toFixed(2)}`}</M>, so it tips to the <b>{net > 0 ? 'right' : 'left'}</b>. Slide the pivot
        until it balances.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 110]} y={[-0.005, 0.028]} xStep={10} yStep={0.01} height={300} xLabel="t" yLabel="" xLabels={v => (v < 0 || v > 110 || Math.round(v) % 20 || Math.abs(v - c) < 4 ? '' : String(Math.round(v)))} yLabels={false}>
        <Region top={Mf} bottom={() => 0} from={0} to={c} color={C.f} opacity={0.3} />
        <Region top={Mf} bottom={() => 0} from={c} to={110} color={C.g} opacity={0.3} />
        <Plot.OfX y={Mf} domain={[0, 110]} color={C.f} weight={3} />
        <Polygon points={[[c, 0], [c - 2.2, -tri], [c + 2.2, -tri]]} color={col} fillOpacity={0.9} weight={1} />
        <Line.Segment point1={[c, 0]} point2={[c, Mf(c)]} color={col} weight={2} />
        <Label at={[Math.max(8, c - 20), 0.022]} attach="c" color={C.f} size={12}>{`left ${(cdf(c) * 100).toFixed(0)}%`}</Label>
        <Label at={[Math.min(100, c + 30), 0.018]} attach="c" color={C.g} size={12}>{`right ${((1 - cdf(c)) * 100).toFixed(0)}%`}</Label>
        {!balanced && (
          <Label at={[c, Mf(c)]} attach="n" color={col} size={12}>{net > 0 ? 'tips right ↻' : '↺ tips left'}</Label>
        )}
        {balanced && (
          <Label at={[c, Mf(c)]} attach="n" color={col} size={12}>balances</Label>
        )}
      </Plane>
      <Controls>
        <Slider label="\text{pivot } c" value={c} onChange={setC} min={10} max={90} step={0.1} format={v => v.toFixed(1)} />
        <Buttons>
          <ActionButton label="Peak (mode)" onClick={() => setC(MODE)} />
          <ActionButton label="Median" onClick={() => setC(MEDIAN)} />
          <ActionButton label="Mean" onClick={() => setC(MEAN)} />
        </Buttons>
        <Readouts>
          <Readout color={col} tex={`\\int_0^{\\infty}(t-c)M(t)\\,dt = ${net.toFixed(2)}`} />
          <Readout tex={`\\text{area left of } c = ${cdf(c).toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
