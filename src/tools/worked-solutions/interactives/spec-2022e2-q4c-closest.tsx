// 2022 Specialist Exam 2 Q4c — a zoomed, equal-scale view of the path near the hole (0, 7). Slide t
// and watch the ball-to-hole distance d(t) = |r(t) − 7j|. It starts at t = 3.5, where the ball is
// level with the hole (2t = 7) and d ≈ 0.1913 — tempting, but the path is slanting back towards the
// y-axis, so the ball is still getting closer. The minimum is at t ≈ 3.5169, d ≈ 0.1883 (0.188 m),
// where the hole-to-ball segment meets the path at a right angle: (r(t) − 7j)·ṙ(t) = 0.
// The velocity is drawn at the ball with its angle to the ball-to-hole direction (79.7° at t = 3.5:
// under 90°, so the ball is still approaching; 90° at the minimum; over 90° after it). The x tick
// numbers are drawn along the bottom edge, since the x-axis itself is out of view.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polyline, Readout, Readouts, Slider, Vector } from './kit'

const PI = Math.PI
const pos = (t: number): [number, number] => [0.5 * Math.sin((PI * t) / 4), 2 * t]
const vel = (t: number): [number, number] => [(PI / 8) * Math.cos((PI * t) / 4), 2]
const H: [number, number] = [0, 7]
const dist = (t: number) => Math.hypot(pos(t)[0], pos(t)[1] - 7)
const TMIN = 3.51689 // fMin of d(t) on [0, 5] (checked with scipy)
const unit = (v: [number, number]): [number, number] => {
  const m = Math.hypot(v[0], v[1])
  return [v[0] / m, v[1] / m]
}

export default function Closest() {
  const [t, setT] = useState(3.5)

  const B = pos(t)
  const d = dist(t)
  const hb: [number, number] = [B[0] - H[0], B[1] - H[1]]
  const v = vel(t)
  // Angle between the velocity and the direction from the ball back to the hole: under 90° means the
  // velocity still has a part towards the hole, so d is decreasing.
  const angle = (Math.acos((-hb[0] * v[0] - hb[1] * v[1]) / (Math.hypot(...hb) * Math.hypot(...v))) * 180) / PI
  const atMin = Math.abs(t - TMIN) < 0.0015
  const level = Math.abs(t - 3.5) < 0.004
  const segColor = atMin ? C.good : C.g

  // Right-angle marker at the ball, with sides towards the hole and along the path.
  const a = unit([-hb[0], -hb[1]])
  const b = unit(v)
  const q = 0.03
  const square: [number, number][] = [
    [B[0] + q * a[0], B[1] + q * a[1]],
    [B[0] + q * (a[0] + b[0]), B[1] + q * (a[1] + b[1])],
    [B[0] + q * b[0], B[1] + q * b[1]],
  ]
  // Velocity arrow (direction only), and the angle arc from it anticlockwise to the hole direction
  // (for t in [3.3, 3.7] the hole is always anticlockwise of the velocity).
  const vTip: [number, number] = [B[0] + 0.13 * b[0], B[1] + 0.13 * b[1]]
  const phiV = Math.atan2(b[1], b[0])
  const arcR = 0.045
  const arcPts: [number, number][] = Array.from({ length: 25 }, (_, k) => {
    const ang = phiV + ((angle * PI) / 180) * (k / 24)
    return [B[0] + arcR * Math.cos(ang), B[1] + arcR * Math.sin(ang)] as [number, number]
  })
  // Angle label: 60% of the way round from the velocity, far enough out to clear the arrow.
  const labAng = phiV + (0.6 * angle * PI) / 180
  const labR = Math.min(0.15, Math.max(0.085, 0.035 / Math.sin(labAng - phiV)))
  const angleColour = atMin ? C.good : C.g

  let notice
  if (atMin) {
    notice = (
      <Notice tone="good">
        <b>Closest approach:</b> <M>{'t \\approx 3.517'}</M>, <M>{'d \\approx 0.188'}</M> m. The velocity, and so the path,
        now meets the hole-to-ball segment at a right angle (the green square): that is the perpendicularity condition{' '}
        <M>{'\\left(\\underset{\\sim}{r}(t) - 7\\underset{\\sim}{j}\\right)\\cdot\\underset{\\sim}{\\dot r}(t) = 0'}</M>, and it
        is the same <M>t</M> that fMin finds. Move <M>t</M> either way and <M>d</M> grows.
      </Notice>
    )
  } else if (level) {
    notice = (
      <Notice tone="warn">
        Here <M>2t = 7</M>, so the ball is level with the hole and{' '}
        <M>{'d = \\tfrac12\\sin\\!\\left(\\tfrac{7\\pi}{8}\\right) \\approx 0.1913'}</M>. Tempting, but it is not the
        minimum: the path is slanting back towards the <M>y</M>-axis, so the velocity still points partly towards the
        hole. The angle between the velocity and the segment back to the hole is about <M>{'80^\\circ'}</M>, less than{' '}
        <M>{'90^\\circ'}</M>, so the ball is still getting closer. Drag <M>t</M> a little higher.
      </Notice>
    )
  } else if (t < TMIN) {
    notice = (
      <Notice>
        The angle between the velocity and the segment back to the hole is less than <M>{'90^\\circ'}</M>, so the
        velocity still has a part pointing towards the hole: the ball is still getting closer and <M>d</M> is
        decreasing. Keep increasing <M>t</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The angle is now more than <M>{'90^\\circ'}</M>: the velocity has a part pointing away from the hole, so the
        ball is moving away and <M>d</M> is increasing. The closest point is behind it. Drag <M>t</M> back down, or press
        &ldquo;Jump to the minimum&rdquo;.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-0.3, 0.6]}
        y={[6.55, 7.45]}
        xStep={0.1}
        yStep={0.1}
        height={420}
        equalScale
        yLabels={v => (Math.abs(v * 5 - Math.round(v * 5)) < 1e-9 && Math.abs(v - 7) > 1e-9 ? v.toFixed(1) : '')}
      >
        <Line.Segment point1={[-0.3, 7]} point2={[0.6, 7]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[0.6, 7]} attach="nw" color={C.guide} size={11}>y = 7</Label>
        <Plot.Parametric xy={pos} domain={[3.27, 3.73]} color={C.f} weight={3} />
        <Line.Segment point1={H} point2={B} color={segColor} weight={3} />
        {atMin ? (
          <Polyline points={square} color={C.good} weight={2} />
        ) : (
          <>
            <Polyline points={arcPts} color={angleColour} weight={2} />
            <Label at={[B[0] + labR * Math.cos(labAng), B[1] + labR * Math.sin(labAng)]} attach="c" gap={0} color={angleColour} size={11}>
              {`${Math.round(angle)}°`}
            </Label>
          </>
        )}
        <Vector tail={B} tip={vTip} color={C.ink} weight={2.5} />
        <Label at={vTip} attach="ne" color={C.ink} size={11}>velocity</Label>
        {[-0.1, 0.1, 0.2, 0.3, 0.4, 0.5].map(x => (
          <Label key={x} at={[x, 6.55]} attach="s" color={C.guide} size={10} bold={false}>
            {x.toFixed(1)}
          </Label>
        ))}
        <Point x={H[0]} y={H[1]} color={C.violet} />
        <Label at={H} attach="w" color={C.violet} size={12}>hole</Label>
        <Point x={B[0]} y={B[1]} color={C.f} />
        <Label at={B} attach="e" color={C.f} size={12}>ball</Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={3.3} max={3.7} step={0.001} format={x => x.toFixed(3)} />
        <Buttons>
          <ActionButton label="Level with the hole (t = 3.5)" onClick={() => setT(3.5)} />
          <ActionButton label="Jump to the minimum" onClick={() => setT(TMIN)} />
        </Buttons>
        <Readouts>
          <Readout color={segColor} tex={`d(t) = \\left|\\underset{\\sim}{r}(t) - 7\\underset{\\sim}{j}\\right| \\approx ${d.toFixed(4)}`} />
          <Readout color={angleColour} tex={`\\angle(\\text{velocity},\\ \\text{ball}\\to\\text{hole}) \\approx ${angle.toFixed(1)}^\\circ`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
