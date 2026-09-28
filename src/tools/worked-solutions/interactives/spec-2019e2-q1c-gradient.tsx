// 2019 Specialist Exam 2 Q1c — the gradient dy/dx = 1/sin(t) along x = sec(t) + 1, y = tan(t).
// Slide t: the tangent is vertical at t = 0 (sin 0 = 0, so dx/dt = 0 while dy/dt = 1), then tilts
// over as sin t climbs towards 1. The point runs off to infinity but the gradient does not: it
// settles at 1/sin(π/2) = 1, the gradient of the hyperbola's asymptote y = x − 1 (the gap
// sec t − tan t → 0). A "Zoom out" toggle shows the curve becoming indistinguishable from that line.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle,
  num, usePlayer,
} from './kit'

const X = (t: number) => 1 / Math.cos(t) + 1
const Y = (t: number) => Math.tan(t)
const T_NEAR = 1.38
const T_FAR = 1.535

export default function Gradient() {
  const [t, setT] = useState(0.35)
  const [zoom, setZoom] = useState(false)
  const tMax = zoom ? T_FAR : T_NEAR
  const player = usePlayer(setT, { min: 0, max: tMax, seconds: 6 })

  const tt = Math.min(t, tMax)
  const x = X(tt)
  const y = Y(tt)
  const s = Math.sin(tt)
  const m = s > 1e-9 ? 1 / s : Infinity
  const gap = x - 1 - y

  // tangent direction ∝ (dx/dt, dy/dt) = (sin t, 1)/cos² t, so it is vertical at t = 0
  const L = zoom ? 6 : 1.4
  const len = Math.hypot(s, 1)
  const dx = (L * s) / len
  const dy = L / len

  const xr: [number, number] = zoom ? [-2, 36] : [-0.5, 7.5]
  const yr: [number, number] = zoom ? [-2, 32] : [-0.5, 5.8]

  let notice
  if (tt < 0.03) {
    notice = (
      <Notice>
        At <M>t = 0</M>, <M>{'\\sin t = 0'}</M>, so <M>{'\\tfrac{dy}{dx} = \\tfrac{1}{\\sin t}'}</M> is undefined:{' '}
        <M>{'\\tfrac{dx}{dt} = 0'}</M> while <M>{'\\tfrac{dy}{dt} = 1'}</M>, so the point is moving straight up.
        That is the vertical tangent at <M>(2, 0)</M> in the sketch for part d. Now drag <M>t</M> up.
      </Notice>
    )
  } else if (tt < 1.2) {
    notice = (
      <Notice>
        Here <M>{`\\sin t = ${num(s, 3)}`}</M>, so the gradient is <M>{`\\tfrac{1}{\\sin t} = ${num(m, 2)}`}</M>, steeper
        than <M>1</M>. As <M>t</M> grows, <M>{'\\sin t'}</M> climbs towards <M>1</M> and the gradient falls towards{' '}
        <M>1</M>. Press play and watch the orange tangent tilt over until it is parallel to the dashed line.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        The point runs off to infinity, but the gradient doesn&apos;t: <M>{`\\tfrac{1}{\\sin t} = ${num(m, 3)}`}</M>{' '}
        is heading to <M>{'\\tfrac{1}{\\sin(\\pi/2)} = 1'}</M>, the gradient of the asymptote{' '}
        <M>{'y = x - 1'}</M>. The vertical gap <M>{'\\sec t - \\tan t'}</M> is shrinking to <M>0</M>.{' '}
        {zoom
          ? 'Zoomed out, the curve and the line are almost indistinguishable.'
          : 'Turn on "Zoom out" to see the curve merge with the line.'}
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={xr} y={yr} xStep={zoom ? 5 : 1} yStep={zoom ? 5 : 1} equalScale height={400}>
        <Line.ThroughPoints point1={[1, 0]} point2={[2, 1]} color={C.guide} style="dashed" weight={2} />
        <Label at={zoom ? [26, 25] : [5.6, 4.6]} attach="nw" color={C.guide} size={12}>y = x − 1</Label>
        <Plot.Parametric xy={u => [X(u), Y(u)]} domain={[0, 1.545]} color={C.f} weight={3} />
        <Line.Segment point1={[x - dx, y - dy]} point2={[x + dx, y + dy]} color={C.g} weight={3} />
        <Point x={2} y={0} color={C.ink} />
        <Point x={x} y={y} color={C.g} />
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={tt}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={tMax}
          step={0.005}
          format={v => v.toFixed(3)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(tt)} label="Run t towards π/2" />
          <Toggle label="Zoom out" checked={zoom} onChange={setZoom} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={Number.isFinite(m) ? `\\dfrac{dy}{dx} = \\dfrac{1}{\\sin t} = ${num(m, 3)}` : '\\dfrac{dy}{dx} = \\dfrac{1}{\\sin 0}\\ \\text{undefined}'} />
          <Readout tex={`(x, y) = (${num(x, 2)},\\ ${num(y, 2)})`} />
          <Readout color={C.guide} tex={`\\text{gap } \\sec t - \\tan t = ${num(gap, 3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
