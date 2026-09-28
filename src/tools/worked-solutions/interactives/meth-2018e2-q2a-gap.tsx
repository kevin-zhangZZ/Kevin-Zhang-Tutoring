// 2018 Methods Exam 2 Q2a — b(t) = (4500/7)(e^(−t/5) − e^(−9t/10)) is the vertical GAP between two
// decaying exponentials: a slow one (violet) and a fast one (orange). Slide t with the tangents on
// both: while the fast term falls faster the gap widens (b rising); once the slow term falls faster
// the gap closes (b falling). The gap is largest exactly when the two terms fall equally fast, which
// is what b'(t) = 0 says: (1/5)e^(−t/5) = (9/10)e^(−9t/10), so t = (10/7)log_e(9/2) ≈ 2.15.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, num, tick, usePlayer,
} from './kit'

const A = 4500 / 7
const slow = (t: number) => A * Math.exp(-t / 5)
const fast = (t: number) => A * Math.exp(-0.9 * t)
const b = (t: number) => slow(t) - fast(t)
const dSlow = (t: number) => (-A / 5) * Math.exp(-t / 5)
const dFast = (t: number) => -0.9 * A * Math.exp(-0.9 * t)
const T_PEAK = (10 / 7) * Math.log(4.5)
const H = 0.7 // half-width, in hours, of each tangent segment

export default function Gap() {
  const [t, setT] = useState(0.8)
  const player = usePlayer(setT, { min: 0, max: 6, seconds: 7 })

  const near = Math.abs(t - T_PEAK) < 0.03
  const before = t < T_PEAK
  const gapColor = near ? C.good : C.f
  const tangent = (f: (x: number) => number, df: (x: number) => number, color: string) => {
    const t0 = Math.max(0, t - H)
    const t1 = t + H
    return (
      <Line.Segment
        point1={[t0, f(t) + (t0 - t) * df(t)]}
        point2={[t1, f(t) + (t1 - t) * df(t)]}
        color={color}
        weight={2.5}
        style="dashed"
      />
    )
  }

  let notice
  if (near) {
    notice = (
      <Notice tone="good">
        <b>Here the two tangents are parallel</b>: both exponentials are falling at about{' '}
        <M>{`${num(-dSlow(t), 1)}`}</M> mg/h, so the gap between them has stopped growing. That gap is{' '}
        <M>b(t)</M>, so this is its maximum, <M>{`b\\approx${num(b(T_PEAK), 2)}`}</M> mg. Setting{' '}
        <M>{"b'(t)=0"}</M> is exactly the equation &ldquo;slope of slow term = slope of fast term&rdquo;.
      </Notice>
    )
  } else if (before) {
    notice = (
      <Notice>
        The orange <b>fast</b> term is falling more steeply than the violet <b>slow</b> term, so the gap between them
        (the blue bar, whose length is <M>b(t)</M>) is <b>widening</b>: the drug level rises. Drag <M>t</M> right and
        watch for the moment the two tangents become parallel.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The fast term has almost died away and now falls <b>less</b> steeply than the slow term, so the gap is{' '}
        <b>closing</b>: the drug level falls. The peak was back where the steepness matched, at{' '}
        <M>{'t=\\tfrac{10}{7}\\log_e\\!\\left(\\tfrac92\\right)\\approx2.15'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 6.2]} y={[0, 680]} xStep={1} yStep={100} height={320} xLabel="t" yLabel="y" yLabels={v => (v > 650 ? "" : tick(v))}>
        <Plot.OfX y={b} domain={[0, 6.2]} color={C.f} weight={2} style="dashed" />
        <Plot.OfX y={slow} domain={[0, 6.2]} color={C.violet} weight={3} />
        <Plot.OfX y={fast} domain={[0, 6.2]} color={C.g} weight={3} />
        <Line.Segment point1={[t, fast(t)]} point2={[t, slow(t)]} color={gapColor} weight={6} />
        {tangent(slow, dSlow, C.violet)}
        {tangent(fast, dFast, C.g)}
        <Point x={t} y={slow(t)} color={C.violet} />
        <Point x={t} y={fast(t)} color={C.g} />
        <Point x={t} y={b(t)} color={gapColor} />
        <Label at={[3, slow(3)]} color={C.violet} attach="ne">slow term</Label>
        <Label at={[1.6, fast(1.6)]} color={C.g} attach="ne">fast term</Label>
        <Label at={[4.7, b(4.7)]} color={C.f} attach="s">b(t) = gap</Label>
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={6}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Sweep t from 0 to 6" />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`\\text{slow term slope} = ${num(dSlow(t), 1)}`} />
          <Readout color={C.g} tex={`\\text{fast term slope} = ${num(dFast(t), 1)}`} />
          <Readout color={gapColor} tex={`b(t) = \\text{gap} = ${num(b(t), 2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
