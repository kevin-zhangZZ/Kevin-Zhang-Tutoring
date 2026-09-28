// 2017 Specialist Exam 2 Q2c — why setting a = 0 finds the terminal velocity. The v–t graph of
// the skydiver (free fall to 19.6 m/s at t = 2, then dv/dt = 9.8 − 0.01v²) with a point you slide
// along it: the tangent's slope is a, and the bars underneath show gravity (9.8, fixed) against
// resistance (0.01v², growing). As v rises the two balance, a → 0 and the curve flattens onto
// v = 14√5 ≈ 31.3 — the only speed at which the speed stops changing.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, num, usePlayer } from './kit'

const G = 9.8
const K = 0.01
const VT = Math.sqrt(G / K) // 14√5
const ALPHA = K * VT
const C0 = Math.atanh(19.6 / VT)

/** The skydiver's speed at time t (free fall, then the resistance model from t = 2). */
const speed = (t: number) => (t <= 2 ? G * t : VT * Math.tanh(ALPHA * (t - 2) + C0))
const accel = (t: number) => (t < 2 ? G : G - K * speed(t) ** 2)

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2 text-[12.5px] text-gray-700 dark:text-gray-300">
      <span className="w-[122px] shrink-0">{label}</span>
      <div className="relative h-3 flex-1 rounded bg-gray-100 dark:bg-gray-800">
        <div className="absolute inset-y-0 left-0 rounded" style={{ width: `${(100 * value) / G}%`, background: color }} />
      </div>
      <span className="w-[40px] shrink-0 text-right tabular-nums">{num(value, 2)}</span>
    </div>
  )
}

export default function Terminal() {
  const [t0, setT0] = useState(3)
  const player = usePlayer(setT0, { min: 0.5, max: 12, seconds: 7 })

  const v0 = speed(t0)
  const a0 = accel(t0)
  const resist = t0 < 2 ? 0 : K * v0 * v0
  const d = 0.9
  const freeFall = t0 < 2

  let notice
  if (freeFall) {
    notice = (
      <Notice>
        For the first two seconds there is <b>no air resistance</b>, so <M>a = g = 9.8</M> and the graph is a straight
        line. Slide past <M>t = 2</M>: from there the model <M>{'a = g - 0.01v^2'}</M> takes over.
      </Notice>
    )
  } else if (a0 > 1.5) {
    notice = (
      <Notice>
        At <M>{`v \\approx ${num(v0, 2)}`}</M> the resistance is <M>{`0.01v^2 = ${num(resist, 2)}`}</M>, so{' '}
        <M>{`a = 9.8 - ${num(resist, 2)} = ${num(a0, 2)}`}</M>. Still speeding up, but the tangent is already less
        steep than free fall. Keep sliding: faster means more resistance, which means less acceleration.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Now the resistance (<M>{num(resist, 2)}</M>) almost cancels gravity, so <M>{`a \\approx ${num(a0, 2)}`}</M> and
        the curve is nearly flat. The speed stops changing only when <M>a = 0</M>:{' '}
        <M>{'9.8 - 0.01v^2 = 0 \\Rightarrow v = \\sqrt{980} = 14\\sqrt5'}</M>. The curve creeps up to that line but
        never crosses it — that is what &ldquo;limiting velocity&rdquo; means.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 12]} y={[0, 36]} xStep={2} yStep={10} height={300} xLabel="t" yLabel="v">
        <Line.Segment point1={[0, VT]} point2={[12, VT]} color={C.good} style="dashed" weight={2} />
        <Label at={[12, VT]} attach="sw" color={C.good}>v = 14√5</Label>
        <Line.Segment point1={[2, 0]} point2={[2, 19.6]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={speed} domain={[0, 2]} color={C.g} weight={3} />
        <Plot.OfX y={speed} domain={[2, 12]} color={C.f} weight={3} />
        <Label at={[1.3, 7]} attach="e" color={C.g}>free fall</Label>
        <Line.Segment point1={[t0 - d, v0 - a0 * d]} point2={[t0 + d, v0 + a0 * d]} color={C.violet} weight={2.5} />
        <Point x={t0} y={v0} color={C.violet} />
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t0}
          onChange={v => {
            player.stop()
            setT0(v)
          }}
          min={0.5}
          max={12}
          step={0.05}
          format={v => v.toFixed(2)}
        />
        <PlayButton playing={player.playing} onClick={() => player.toggle(t0)} label="Let the skydiver fall" />
        <div className="flex flex-col gap-1.5">
          <Bar label="gravity  g" value={G} color={C.g} />
          <Bar label="resistance 0.01v²" value={resist} color={C.bad} />
          <Bar label="a = difference" value={a0} color={C.violet} />
        </div>
        <Readouts>
          <Readout color={C.f} tex={`v \\approx ${num(v0, 2)}`} />
          <Readout color={C.violet} tex={`a = \\text{slope} \\approx ${num(a0, 2)}`} />
          <Readout color={C.good} tex={`14\\sqrt5 \\approx ${num(VT, 2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
