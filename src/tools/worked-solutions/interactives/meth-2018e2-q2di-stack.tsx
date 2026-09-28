// 2018 Methods Exam 2 Q2d(i) — addition of ordinates. At each time t the total is Tablet 1's height
// b(t) (violet bar) with Tablet 2's height b(t − 6) (orange bar, zero before t = 6) stacked on top;
// sweeping t traces the total curve. Key moments: t = 6, where Tablet 2 adds b(0) = 0 so the two
// pieces JOIN (with a sharp corner), the crossing of the dashed curves (t ≈ 6.51), where the total is
// twice the crossing height, not the crossing itself, and the maximum (7.78, 455.82).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, num,
  usePlayer,
} from './kit'

const A = 4500 / 7
const b = (t: number) => (t < 0 ? 0 : A * (Math.exp(-t / 5) - Math.exp(-0.9 * t)))
const total = (t: number) => b(t) + b(t - 6)
const T_CROSS = 6.505508
const T_MAX = 7.779002
const MAX = total(T_MAX)

export default function Stack() {
  const [t, setT] = useState(7)
  const player = usePlayer(setT, { min: 0, max: 12, seconds: 10 })
  const go = (v: number) => {
    player.stop()
    setT(v)
  }

  const b1 = b(t)
  const b2 = b(t - 6)
  const atJoin = Math.abs(t - 6) < 0.05
  const atCross = Math.abs(t - T_CROSS) < 0.05
  const atMax = Math.abs(t - T_MAX) < 0.06

  let notice
  if (atJoin) {
    notice = (
      <Notice tone="good">
        <b>The join.</b> At <M>t=6</M> Tablet 2 adds <M>b(0)=0</M>, so the total is{' '}
        <M>{`b(6)+0\\approx${num(b(6), 2)}`}</M>: the second piece starts exactly where the first ends, one unbroken
        curve. It does turn a sharp corner, because Tablet 2 enters rising at <M>{"b'(0)=450"}</M> mg/h. Now step
        forward a little.
      </Notice>
    )
  } else if (atCross) {
    notice = (
      <Notice tone="warn">
        <b>The dashed curves cross here</b>, each tablet giving <M>{`${num(b1, 2)}`}</M> mg. The total is their sum,{' '}
        <M>{`${num(b1 + b2, 2)}`}</M> mg, <b>twice</b> the crossing height. So the total curve does not start at, or pass
        through, the crossing point (red): the report records students who began their sketch there.
      </Notice>
    )
  } else if (atMax) {
    notice = (
      <Notice tone="good">
        <b>The peak of the total</b>: <M>{`${num(MAX, 2)}`}</M> mg at <M>t\approx7.78</M>. It is higher than either
        tablet alone (<M>325.34</M>) but well short of double that, since Tablet 1 has decayed to{' '}
        <M>{`${num(b1, 0)}`}</M> mg by now. Keep sweeping to <M>t=12</M> to finish the sketch.
      </Notice>
    )
  } else if (t < 6) {
    notice = (
      <Notice>
        Before <M>t=6</M> only Tablet 1 is in the blood, so the total just traces Tablet 1&apos;s curve. Press the
        buttons to jump to the join at <M>t=6</M> or the crossing of the dashed curves.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Each point of the blue total is the violet bar (Tablet 1, <M>b(t)</M>) with the orange bar (Tablet 2,{' '}
        <M>b(t-6)</M>) stacked on top: <b>addition of ordinates</b>. Sweep from <M>t=0</M> to trace the whole curve,
        and check the three key moments with the buttons.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 12.5]} y={[0, 520]} xStep={2} yStep={100} height={320} xLabel="t" yLabel="y">
        <Plot.OfX y={b} domain={[0, 12]} color={C.violet} weight={2} style="dashed" />
        <Plot.OfX y={x => b(x - 6)} domain={[6, 12]} color={C.g} weight={2} style="dashed" />
        <Plot.OfX y={total} domain={[0, Math.max(t, 0.01)]} color={C.f} weight={3.5} />
        <Line.Segment point1={[t, 0]} point2={[t, b1]} color={C.violet} weight={6} />
        {t > 6 && <Line.Segment point1={[t, b1]} point2={[t, b1 + b2]} color={C.g} weight={6} />}
        {atCross && <Point x={T_CROSS} y={b(T_CROSS)} color={C.bad} />}
        {t >= T_MAX && (
          <>
            <Point x={T_MAX} y={MAX} color={C.good} />
            <Label at={[T_MAX, MAX]} color={C.good} attach="ne">(7.78, 455.82)</Label>
          </>
        )}
        <Point x={t} y={b1 + b2} color={C.f} />
        <Label at={[10.5, b(10.5)]} color={C.violet} attach="s">Tablet 1</Label>
        <Label at={[10.8, b(4.8)]} color={C.g} attach="ne">Tablet 2</Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={go} min={0} max={12} step={0.01} />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Sweep t from 0 to 12" />
          <ActionButton label="t = 6 (the join)" onClick={() => go(6)} />
          <ActionButton label="Where the dashed curves cross" onClick={() => go(T_CROSS)} />
          <ActionButton label="The maximum" onClick={() => go(T_MAX)} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`b(t) = ${num(b1, 2)}`} />
          <Readout color={C.g} tex={`b(t-6) = ${num(b2, 2)}`} />
          <Readout color={C.f} tex={`\\text{total} = ${num(b1 + b2, 2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
