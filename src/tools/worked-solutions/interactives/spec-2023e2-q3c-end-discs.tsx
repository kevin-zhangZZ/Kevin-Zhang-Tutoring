// 2023 Specialist Exam 2 Q3c — why the total surface area needs two flat discs. Rotating
// y² = x − 1, 2 ≤ x ≤ 5, about the x-axis gives a solid drawn here in side view, its circular
// cross-sections seen slightly from the side (as ellipses). The curve is at height y = 1 at x = 2
// and y = 2 at x = 5 (it only meets the axis at x = 1), so the curved surface is open at both
// ends. Toggle each disc: curved surface S = (π/6)(17^{3/2} − 5^{3/2}) ≈ 30.846 alone gives
// S/V ≈ 1.31 (V = 15π/2 ≈ 23.562); adding only the left disc (π) gives ≈ 1.44, only the right
// disc (4π) ≈ 1.84, and both (5π) the answer ≈ 1.98, matching the working.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Toggle, num,
  type vec,
} from './kit'

const y = (x: number) => Math.sqrt(x - 1)
const A = 2
const B = 5
const RA = y(A) // 1
const RB = y(B) // 2
const S = (Math.PI / 6) * (17 ** 1.5 - 5 ** 1.5) // ≈ 30.8465
const V = (15 * Math.PI) / 2 // ≈ 23.5619
// A circle of radius r at x, seen slightly from the side, is an ellipse this many x-units wide
// per unit of radius (either side of its centre).
const K = 0.15

/** Points on the side view of the circle of radius r at x, for angles a0 → a1 (0 = towards the
 *  viewer's right, π/2 = the top). */
function ring(x: number, r: number, a0: number, a1: number, n = 36): vec.Vector2[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / n
    return [x + K * r * Math.cos(a), r * Math.sin(a)] as vec.Vector2
  })
}

// The solid's outline: back half of the left rim, the curve's mirror image, the front half of the
// right rim, then the curve itself back to the start.
const XS = Array.from({ length: 61 }, (_, i) => A + ((B - A) * i) / 60)
const SILHOUETTE: vec.Vector2[] = [
  ...ring(A, RA, Math.PI / 2, (3 * Math.PI) / 2),
  ...XS.map(x => [x, -y(x)] as vec.Vector2),
  ...ring(B, RB, -Math.PI / 2, Math.PI / 2),
  ...[...XS].reverse().map(x => [x, y(x)] as vec.Vector2),
]

function Disc({ x, r, on }: { x: number; r: number; on: boolean }) {
  const pts = ring(x, r, 0, 2 * Math.PI)
  return on ? (
    <Polygon points={pts} color={C.g} fillOpacity={0.5} weight={2} />
  ) : (
    <Polygon points={pts} color={C.bad} fillOpacity={0} weight={2} strokeStyle="dashed" />
  )
}

export default function EndDiscs() {
  const [left, setLeft] = useState(true)
  const [right, setRight] = useState(true)

  const ends = (left ? Math.PI * RA * RA : 0) + (right ? Math.PI * RB * RB : 0)
  const ratio = (S + ends) / V
  const endsTex =
    left && right ? '\\pi(1)^2+\\pi(2)^2 = 5\\pi' : left ? '\\pi(1)^2 = \\pi' : right ? '\\pi(2)^2 = 4\\pi' : '0'

  let notice
  if (left && right) {
    notice = (
      <Notice tone="good">
        <b>Curved surface plus both discs.</b> Each disc&apos;s radius is the curve&apos;s height at that end:{' '}
        <M>{'y=\\sqrt{2-1}=1'}</M> and <M>{'y=\\sqrt{5-1}=2'}</M>, so the ends add <M>\pi + 4\pi = 5\pi</M>. Then{' '}
        <M>{'(30.846+5\\pi)\\div\\tfrac{15\\pi}{2}\\approx1.98'}</M>, the answer. Switch a disc off to see the ratio you
        get when it is left out.
      </Notice>
    )
  } else if (!left && !right) {
    notice = (
      <Notice tone="warn">
        <b>Curved surface only</b>, which the report says many students stopped at. The curve is still 1 unit above the axis at{' '}
        <M>x=2</M> and 2 units above it at <M>x=5</M>, so the curved surface is a tube with a hole at each end (the
        dashed rims). Dividing just <M>30.846</M> by the volume gives <M>\approx 1.31</M>. Switch both discs on.
      </Notice>
    )
  } else if (!left) {
    notice = (
      <Notice tone="warn">
        <b>The small end is missing.</b> The solid would only come to a point where <M>y=0</M>, at <M>x=1</M>, which
        is outside <M>{'2\\le x\\le5'}</M>. At <M>x=2</M> the radius is still 1, so the left disc adds{' '}
        <M>{'\\pi(1)^2=\\pi'}</M>. Without it the ratio is <M>\approx 1.84</M>. Switch it back on.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>The big end is missing.</b> At <M>x=5</M> the curve&apos;s height is <M>{'y=\\sqrt4=2'}</M>, so this disc
        has area <M>{'\\pi(2)^2=4\\pi'}</M>, the larger of the two. Without it the ratio is only{' '}
        <M>\approx 1.44</M>. Switch it back on.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0.4, 6.4]} y={[-3, 2.9]} xStep={1} yStep={1} height={320} labels={false} yLabel="">
        <Polygon points={SILHOUETTE} color={C.f} fillOpacity={0.14} weight={0} strokeOpacity={0} />
        <Disc x={A} r={RA} on={left} />
        <Plot.OfX y={x => -y(x)} domain={[A, B]} color={C.f} weight={1.5} />
        <Plot.OfX y={y} domain={[A, B]} color={C.f} weight={3} />
        <Disc x={B} r={RB} on={right} />
        <Line.Segment point1={[A, 0]} point2={[A, RA]} color={C.ink} weight={2} />
        <Line.Segment point1={[B, 0]} point2={[B, RB]} color={C.ink} weight={2} />
        <Label at={[A - K * RA, RA / 2]} attach="w" size={12}>r = 1</Label>
        <Label at={[B + K * RB, RB / 2]} attach="e" size={12}>r = 2</Label>
        <Label at={[A, RA]} attach="n" size={12} color={left ? C.g : C.bad}>{left ? 'area π' : 'open'}</Label>
        <Label at={[B, RB]} attach="n" size={12} color={right ? C.g : C.bad}>{right ? 'area 4π' : 'open'}</Label>
        <Label at={[3.5, y(3.5)]} attach="nw" size={12} color={C.f}>y = √(x − 1)</Label>
        <Label at={[A, -RA]} attach="s" size={12}>x = 2</Label>
        <Label at={[B, -RB]} attach="s" size={12}>x = 5</Label>
      </Plane>
      <Controls>
        <Buttons>
          <Toggle label="Left disc (x = 2)" checked={left} onChange={setLeft} />
          <Toggle label="Right disc (x = 5)" checked={right} onChange={setRight} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\text{curved } S \\approx ${num(S, 3)}`} />
          <Readout color={C.g} tex={`\\text{ends} = ${endsTex}`} />
          <Readout tex={`V = \\tfrac{15\\pi}{2} \\approx ${num(V, 3)}`} />
          <Readout
            color={left && right ? C.good : C.bad}
            tex={`\\tfrac{\\text{total SA}}{V} \\approx ${num(ratio, 2)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
