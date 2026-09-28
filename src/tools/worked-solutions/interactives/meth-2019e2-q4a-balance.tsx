// 2019 Methods Exam 2 Q4a — the mean of a continuous random variable is the balance point of its
// density. The density f(x) = 4/625 (5x³ − x⁴) on [0, 5] sits on a plank with a fulcrum at x = c.
// Each sliver of area f(x) dx turns the plank with strength (x − c) f(x) dx, so the net turning
// effect is ∫(x − c) f(x) dx = E(X) − c, which is zero only at c = E(X) = 10/3. A toggle marks the
// median (≈ 3.431, the report's "median instead of the mean" slip): there the AREAS balance
// (0.5 | 0.5) but the plank still tips left, because the long left tail has longer lever arms.
// Values checked in sympy: E(X) = 10/3, median ≈ 3.4309, F(10/3) ≈ 0.4609.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, Slider, Toggle, num } from './kit'

const f = (x: number) => (x < 0 || x > 5 ? 0 : (4 / 625) * (5 * x ** 3 - x ** 4))
const F = (x: number) => x ** 4 / 125 - (4 * x ** 5) / 3125
const MEAN = 10 / 3
const MEDIAN = 3.430949147721
// Turning effect about c: ∫₀⁵ (x − c) f(x) dx = E(X) − c, since the total area is 1.
const net = (c: number) => MEAN - c

export default function Balance() {
  const [c, setC] = useState(2.5)
  const [median, setMedian] = useState(false)

  const n = net(c)
  const balanced = Math.abs(n) < 0.015
  const atMedian = Math.abs(c - MEDIAN) < 0.015
  const leftArea = F(c)
  const tip = balanced ? 'balanced' : n > 0 ? 'tips right' : 'tips left'
  const fulcrumColour = balanced ? C.good : C.bad

  let notice
  if (balanced) {
    notice = (
      <Notice tone="good">
        <b>Balanced at <M>{'c = \\tfrac{10}{3} \\approx 3.33'}</M></b>, which is <M>{'E(X) = \\int_0^5 x\\,f(x)\\,dx'}</M>. The
        areas either side are <em>not</em> equal (about <M>0.46</M> left, <M>0.54</M> right): the left tail is thin but
        stretches all the way to <M>0</M>, so its area sits on longer lever arms. Turn on the median to compare.
      </Notice>
    )
  } else if (atMedian) {
    notice = (
      <Notice tone="warn">
        <b>This is the median, <M>{'m \\approx 3.431'}</M></b>: exactly half the area on each side. But the plank still{' '}
        <b>tips left</b>, because the left half is spread further from the fulcrum. Splitting the area in half is not the
        same as balancing it, which is why the median is the wrong answer for the mean. Slide a little left to balance.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        With the fulcrum at <M>{`c = ${num(c, 2)}`}</M> the plank <b>{tip}</b>: the{' '}
        {n > 0 ? 'right' : 'left'} side has the bigger turning effect. Each sliver of area pulls with strength{' '}
        <span className="whitespace-nowrap">(distance from <M>c</M>)</span> × (area), and adding them all up gives{' '}
        <span className="whitespace-nowrap"><M>{'\\int_0^5 (x-c)f(x)\\,dx = E(X) - c'}</M></span>. Move the
        fulcrum {n > 0 ? 'right' : 'left'} until it balances.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 5.4]} y={[-0.12, 0.46]} xStep={1} yStep={0.1} xLabels={false} yLabels={v => (v > 0.05 && v < 0.45 ? v.toFixed(1) : '')} height={300}>
        {[0, 1, 2, 3, 4, 5].map(k => (
          <Label key={k} at={[k, -0.068]} attach="s" size={11} gap={3} bold={false}>{String(k)}</Label>
        ))}
        <Region top={f} bottom={() => 0} from={0} to={c} color={C.g} opacity={0.28} />
        <Region top={f} bottom={() => 0} from={c} to={5} color={C.f} opacity={0.28} />
        <Plot.OfX y={f} domain={[0, 5]} color={C.f} weight={3} />
        <Label at={[1.9, f(1.9)]} color={C.f} attach="nw">y = f(x)</Label>
        {median && (
          <>
            <Line.Segment point1={[MEDIAN, 0]} point2={[MEDIAN, 0.3]} color={C.violet} style="dashed" weight={2} />
            <Label at={[MEDIAN + 0.06, 0.2]} attach="e" color={C.violet} size={12}>median</Label>
            <Label at={[MEDIAN - 0.08, 0.05]} attach="w" color={C.violet} size={11} bold={false}>0.5</Label>
            <Label at={[MEDIAN + 0.08, 0.05]} attach="e" color={C.violet} size={11} bold={false}>0.5</Label>
          </>
        )}
        <Line.Segment point1={[c, 0]} point2={[c, 0.43]} color={fulcrumColour} style="dashed" weight={1.5} />
        <Label at={[c, 0.43]} attach="n" color={fulcrumColour} size={12} gap={4}>{balanced ? 'balanced' : tip}</Label>
        <Polygon points={[[c, 0], [c - 0.13, -0.062], [c + 0.13, -0.062]]} color={fulcrumColour} fillOpacity={0.55} weight={1.5} />
      </Plane>
      <Controls>
        <Slider label="c" value={c} onChange={setC} min={0.5} max={4.8} step={0.01} />
        <Buttons>
          <Toggle label="Show the median" checked={median} onChange={setMedian} />
          <ActionButton label="Put the fulcrum at the median" onClick={() => { setC(MEDIAN); setMedian(true) }} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\text{area left of } c = ${num(leftArea, 3)}`} />
          <Readout color={C.f} tex={`\\text{area right} = ${num(1 - leftArea, 3)}`} />
          <Readout
            color={fulcrumColour}
            tex={balanced ? `\\int_0^5 (x-c)f(x)\\,dx = 0 \\;\\Rightarrow\\; c = \\tfrac{10}{3}\\ \\checkmark` : `\\int_0^5 (x-c)f(x)\\,dx \\approx ${n.toFixed(3)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
