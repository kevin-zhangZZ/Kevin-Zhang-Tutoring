// 2019 Specialist Exam 2 MCQ 12 — why the system in option A has no solution. Drawn in the plane
// that contains a = i + j − k and the given "resolute" t = 2i − 3j + k (to scale: |a| = √3,
// |t| = √14, angle between them arccos(−2/√42) ≈ 108°). Spin the direction b: the vector resolute
// of a on b is the foot of the perpendicular from a's tip, so its tip always lies on the circle
// with diameter OA (Thales), and its length √3|cos θ| is never more than √3. The target t, of
// length √14 ≈ 3.74, is far outside. Pointing b along t gives the resolute −(1/7)t, the only
// resolute parallel to t.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, PlayButton, Point, Readout, Readouts,
  Slider, Vector, num, usePlayer,
} from './kit'

const T_LEN = Math.sqrt(14)
const A_LEN = Math.sqrt(3)
// a·t = −2, so in this plane (t along the x-axis) a = (−2/√14, √(3 − 4/14)).
const AX = -2 / T_LEN
const AY = Math.sqrt(3 - 4 / 14)
const A_ANGLE = (Math.atan2(AY, AX) * 180) / Math.PI // ≈ 107.98°
// Short b arrow, so a longer resolute along the same direction still shows beyond it.
const BL = 0.6

export default function ResoluteCircle() {
  const [phi, setPhi] = useState(150) // direction of b, degrees from t
  const player = usePlayer(setPhi, { min: 0, max: 180, seconds: 7 })

  const rad = (phi * Math.PI) / 180
  const u: [number, number] = [Math.cos(rad), Math.sin(rad)]
  const dot = AX * u[0] + AY * u[1] // a·b̂
  const P: [number, number] = [dot * u[0], dot * u[1]] // vector resolute of a on b
  const theta = Math.abs(A_ANGLE - phi) // angle between a and b
  // b's label sits beside the arrow, on the side away from a (clear of the circle and the perpendicular).
  const n0: [number, number] = [-u[1], u[0]]
  const nb: [number, number] = n0[0] * AX + n0[1] * AY > 0 ? [-n0[0], -n0[1]] : n0
  const alongT = phi < 0.5

  const notice = alongT ? (
    <Notice tone="warn">
      A resolute is always parallel to <M>{'\\underset{\\sim}{b}'}</M>, so for it to equal{' '}
      <M>{'2\\underset{\\sim}{i} - 3\\underset{\\sim}{j} + \\underset{\\sim}{k}'}</M>, <M>{'\\underset{\\sim}{b}'}</M> would
      have to point along it. Here it does, and the resolute is only{' '}
      <M>{'-\\tfrac17\\left(2\\underset{\\sim}{i} - 3\\underset{\\sim}{j} + \\underset{\\sim}{k}\\right)'}</M>: length{' '}
      <M>{'\\tfrac{2}{\\sqrt{14}} \\approx 0.53'}</M>, pointing the other way. No <M>m, n, p</M> can work, which is why the
      report says solving option A gives the null set.
    </Notice>
  ) : (
    <Notice>
      This is the plane containing <M>{'\\underset{\\sim}{a} = \\underset{\\sim}{i} + \\underset{\\sim}{j} - \\underset{\\sim}{k}'}</M>{' '}
      and the given vector, drawn to scale. The resolute (violet) is the &ldquo;shadow&rdquo; of{' '}
      <M>{'\\underset{\\sim}{a}'}</M> on the line of <M>{'\\underset{\\sim}{b}'}</M>. Press Spin: its tip runs round the
      dashed circle with diameter <M>OA</M>, so it is never longer than <M>{'|\\underset{\\sim}{a}| = \\sqrt3'}</M>. The red
      target has length <M>{'\\sqrt{14} \\approx 3.74'}</M>. Then point <M>{'\\underset{\\sim}{b}'}</M> along the target.
    </Notice>
  )

  return (
    <div>
      <Plane x={[-1.5, 4.2]} y={[-0.7, 2]} xStep={1} yStep={1} equalScale labels={false} xLabel="" yLabel="">
        {/* Every possible resolute tip: the circle with diameter OA. */}
        <Circle center={[AX / 2, AY / 2]} radius={A_LEN / 2} color={C.violet} fillOpacity={0.06} weight={1.5} strokeStyle="dashed" />
        {/* The line of b. */}
        <Line.ThroughPoints point1={[0, 0]} point2={u} color={C.g} weight={1.5} style="dashed" />
        {/* Perpendicular from a's tip to the line of b. */}
        <Line.Segment point1={[AX, AY]} point2={P} color={C.guide} weight={1.5} style="dashed" />

        <Vector tail={[0, 0]} tip={[T_LEN, 0]} color={C.bad} weight={3} />
        <Vector tail={[0, 0]} tip={[AX, AY]} color={C.f} weight={3} />
        {Math.hypot(P[0], P[1]) > 0.03 && <Vector tail={[0, 0]} tip={P} color={C.violet} weight={4} />}
        <Vector tail={[0, 0]} tip={[u[0] * BL, u[1] * BL]} color={C.g} weight={2.5} />
        <Point x={P[0]} y={P[1]} color={C.violet} />

        <Label at={[T_LEN * 0.6, 0]} color={C.bad} attach="n" size={12}>2i − 3j + k</Label>
        <Label at={[AX, AY]} color={C.f} attach="n" size={12}>A: i + j − k</Label>
        <Label at={[u[0] * BL + 0.16 * nb[0], u[1] * BL + 0.16 * nb[1]]} color={C.g} attach="c" size={13} italic>b</Label>
        <Label at={[0, 0]} attach="sw" size={12}>O</Label>
      </Plane>
      <Controls>
        <Slider
          label="\text{direction of } b"
          value={phi}
          onChange={v => {
            player.stop()
            setPhi(v)
          }}
          min={0}
          max={180}
          step={0.5}
          format={v => `${v.toFixed(0)}°`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(phi)} label="Spin b" />
          <ActionButton
            label="Point b along 2i − 3j + k"
            onClick={() => {
              player.stop()
              setPhi(0)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout
            color={C.violet}
            tex={`|\\text{resolute}| = \\sqrt3\\,|\\cos ${num(theta, 0)}^\\circ| = ${num(Math.abs(dot), 2)} \\le \\sqrt3 \\approx 1.73`}
          />
          <Readout color={C.bad} tex={`\\left|2\\underset{\\sim}{i} - 3\\underset{\\sim}{j} + \\underset{\\sim}{k}\\right| = \\sqrt{14} \\approx ${num(T_LEN, 2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
