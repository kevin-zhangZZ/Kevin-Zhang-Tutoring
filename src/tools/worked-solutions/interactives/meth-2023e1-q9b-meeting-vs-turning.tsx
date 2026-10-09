// 2023 Methods Exam 1 Q9b — the tracks meet twice, but only P is a turning point. Track 1
// f(x) = 12 − x(x − 2)² (solid) and track 2 g(x) = 12x − 3x² (dashed), as in VCAA's figure. Slide x and
// each track shows its tangent there, with f'(x) = −(3x − 2)(x − 2) and g'(x) = 12 − 6x read out.
// f(x) − g(x) = −(x − 2)²(x − 3), so the tracks meet at P(2, 12) and again at (3, 9). It starts at
// (3, 9) — the point solving f(x) = g(x) also finds — where both tangents slope down (f'(3) = −7,
// g'(3) = −6), so neither track turns there. At P both gradients are 0 and go from + to −: a local
// maximum on both tracks. Track 1's other stationary point is its dip at x = 2/3 (f = 292/27 ≈ 10.81),
// where track 2 is still climbing (g'(2/3) = 8).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, PlayButton, Plot, Point,
  Readout, Readouts, Slider, clamp, num, tick, usePlayer,
} from './kit'

const f = (x: number) => 12 - x * (x - 2) ** 2
const g = (x: number) => 12 * x - 3 * x * x
const df = (x: number) => -3 * x * x + 8 * x - 4
const dg = (x: number) => 12 - 6 * x
const LO = 0
const HI = 3.7
const xl = (v: number) => (v < 0 || v > 4 ? '' : tick(v))
// y tick numbers are drawn left of the axis, clear of the curves near x = 0
const yTicks = (vals: number[]) =>
  vals.map(v => (
    <Label key={v} at={[0, v]} attach="w" color={C.ink} size={12}>
      {String(v)}
    </Label>
  ))

// a tangent of roughly constant on-screen length, however steep
function Tangent({ x, y, s, color }: { x: number; y: number; s: number; color: string }) {
  const dx = 0.6 / Math.sqrt(1 + (s * 0.12) ** 2)
  return <Line.Segment point1={[x - dx, y - dx * s]} point2={[x + dx, y + dx * s]} color={color} weight={3} />
}

export default function MeetingVsTurning() {
  const [x, setX] = useState(3)
  const player = usePlayer(setX, { min: LO, max: HI, seconds: 9 })
  const fx = f(x)
  const gx = g(x)
  const sf = df(x)
  const sg = dg(x)
  const atP = Math.abs(x - 2) < 0.03
  const atMeet = Math.abs(x - 3) < 0.03
  const atDip = Math.abs(x - 2 / 3) < 0.03

  const move = (v: number) => {
    player.stop()
    setX(clamp(v, LO, HI))
  }

  let notice
  if (atP) {
    notice = (
      <Notice tone="good">
        <b>Both tangents are flat:</b> <M>{"f'(2) = 0"}</M> and <M>{"g'(2) = 0"}</M>, at the same height{' '}
        <M>{'f(2) = g(2) = 12'}</M>. Nudge <M>x</M> either side: both gradients go from positive to negative, so each
        track has a local maximum at <M>P</M>. That is what verifying needs: a zero gradient on <em>both</em> tracks,
        not just a shared point.
      </Notice>
    )
  } else if (atMeet) {
    notice = (
      <Notice tone="warn">
        <b>The tracks meet here too:</b> <M>{'f(3) = g(3) = 9'}</M>, so solving <M>{'f(x) = g(x)'}</M> finds this
        point as well as <M>P</M>. But both tangents slope down (<M>{"f'(3) = -7"}</M>, <M>{"g'(3) = -6"}</M>), so
        neither track is turning here. A meeting point says nothing about turning. Press <b>Go to P</b>.
      </Notice>
    )
  } else if (atDip) {
    notice = (
      <Notice>
        Track 1 is flat here too, <M>{"f'\\left(\\tfrac23\\right) = 0"}</M>: the bottom of its dip, a local minimum.
        But track 2 is still climbing steeply (<M>{"g'\\left(\\tfrac23\\right) = 8"}</M>) and the tracks are at
        different heights, so this is not <M>P</M>. Keep dragging right.
      </Notice>
    )
  } else if (x < 2 / 3) {
    notice = (
      <Notice>
        Track 1 is going down into its dip (<M>{"f'(x) < 0"}</M>) while track 2 climbs (<M>{"g'(x) > 0"}</M>). Drag
        right towards <M>P</M>.
      </Notice>
    )
  } else if (x < 2) {
    notice = (
      <Notice>
        Both tracks are climbing: <M>{"f'(x) > 0"}</M> and <M>{"g'(x) > 0"}</M>. Keep dragging right and watch both
        tangents level out at <M>x = 2</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Both tracks are going down: <M>{"f'(x) < 0"}</M> and <M>{"g'(x) < 0"}</M>. Each gradient changed sign at{' '}
        <M>x = 2</M>, from positive to negative. The tracks cross again at <M>x = 3</M>: drag there to see that crossing
        is not turning.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.4, 4.3]} y={[0, 14]} xStep={1} yStep={4} height={270} xLabels={xl} yLabels={false}>
        {yTicks([4, 8, 12])}
        <Line.Segment point1={[x, 0]} point2={[x, Math.max(fx, gx)]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={g} domain={[0, 4]} color={C.g} weight={2.5} style="dashed" />
        <Plot.OfX y={f} domain={[0, 3.78]} color={C.f} weight={2.5} />
        <Label at={[0.8, f(0.8)]} attach="n" color={C.f} size={12}>track 1</Label>
        <Label at={[0.5, g(0.5)]} attach="e" color={C.g} size={12}>track 2</Label>
        <Point x={2} y={12} color={C.ink} />
        <Label at={[2, 12]} attach="n" color={C.ink}>P</Label>
        <Point x={3} y={9} color={C.ink} />
        <Label at={[3, 9]} attach="ne" color={C.ink}>(3, 9)</Label>
        <Tangent x={x} y={gx} s={sg} color={C.g} />
        <Tangent x={x} y={fx} s={sf} color={C.f} />
        <Point x={x} y={gx} color={C.g} />
        <MovablePoint point={[x, fx]} onMove={([v]) => move(v)} constrain={([v]) => [clamp(v, LO, HI), f(clamp(v, LO, HI))]} color={C.f} />
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={move} min={LO} max={HI} step={0.005} />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x)} label="Sweep x from 0 to 3.7" />
          <ActionButton label="Go to P" onClick={() => move(2)} />
          <ActionButton label="Go to (3, 9)" onClick={() => move(3)} />
        </Buttons>
        <Readouts>
          <Readout tex={`f(x) = ${num(fx, 2)}`} color={C.f} />
          <Readout tex={`g(x) = ${num(gx, 2)}`} color={C.g} />
          <Readout tex={`f'(x) = -3x^2+8x-4 = ${num(sf, 2)}`} color={C.f} />
          <Readout tex={`g'(x) = 12-6x = ${num(sg, 2)}`} color={C.g} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
