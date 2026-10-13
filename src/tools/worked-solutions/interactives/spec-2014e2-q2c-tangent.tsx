// 2014 Specialist Exam 2 Q2c — the line through k − 2i and −(2 + k)i always has gradient 1, so
// changing k only slides it sideways (parallel to y = x). Drag k: A = (k, −2) and B = (0, −2 − k)
// stay equal distances −k from the centre C = (0, −2), the perpendicular distance from C to the
// line is −k/√2, and the line becomes a tangent exactly when that distance equals the radius 2,
// i.e. k = −2√2 ≈ −2.83. Before that it cuts the circle; past it, it misses.

import { useState } from 'react'
import { ActionButton, Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, Point, Polyline, Readout, Readouts, Slider } from './kit'

const K_TANGENT = -2 * Math.SQRT2
const CEN: [number, number] = [0, -2]

export default function Tangent() {
  const [k, setK] = useState(-1.5)

  const A: [number, number] = [k, -2]
  const B: [number, number] = [0, -2 - k]
  const d = -k / Math.SQRT2
  const F: [number, number] = [k / 2, -2 - k / 2] // foot of the perpendicular from C to the line
  const near = Math.abs(k - K_TANGENT) < 0.03
  const lineColor = near ? C.good : d < 2 ? C.g : C.bad
  // right-angle marker at the foot F: u runs along the line, v from F towards C
  const s = 0.22 / Math.SQRT2
  const P1: [number, number] = [F[0] + s, F[1] + s]
  const P3: [number, number] = [F[0] + s, F[1] - s]
  const P2: [number, number] = [F[0] + 2 * s, F[1]]
  const rise = (B[1] - A[1]).toFixed(2)
  const run = (B[0] - A[0]).toFixed(2)

  let notice
  if (near) {
    notice = (
      <Notice tone="good">
        <b>Tangent.</b> The distance from the centre to the line is <M>{'\\tfrac{-k}{\\sqrt2} = 2'}</M>, the radius, so the
        line just touches the circle at <M>{'\\left(-\\sqrt2,\\ \\sqrt2-2\\right)'}</M>. That needs{' '}
        <M>{'-k = 2\\sqrt2'}</M>, so <M>{'k = -2\\sqrt2 \\approx -2.83'}</M>.
      </Notice>
    )
  } else if (d < 2) {
    notice = (
      <Notice>
        The line <b>cuts</b> the circle twice: the centre is only <M>{`${d.toFixed(2)}`}</M> from it, less than the radius
        2. Rise and run in the gradient readout change together, so their ratio stays 1: the line only slides sideways. Drag{' '}
        <M>k</M> further left to push it out until it just touches.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        The line now <b>misses</b> the circle: the centre is <M>{`${d.toFixed(2)}`}</M> from it, more than the radius 2.
        Drag <M>k</M> back to the right until the dashed perpendicular is exactly a radius long.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-5, 3]} y={[-5.5, 2.5]} equalScale height={330} xLabel="Re" yLabel="Im" label="Circle centre −2i radius 2 and the line through k − 2i and −(2 + k)i">
        <Circle center={CEN} radius={2} color={C.f} fillOpacity={0.06} weight={2.5} />
        <Line.ThroughPoints point1={A} point2={B} color={lineColor} weight={3} />
        <Line.Segment point1={CEN} point2={A} color={C.ink} weight={1.5} style="dashed" />
        <Line.Segment point1={CEN} point2={B} color={C.ink} weight={1.5} style="dashed" />
        <Line.Segment point1={CEN} point2={F} color={C.violet} weight={2.5} style="dashed" />
        <Point x={CEN[0]} y={CEN[1]} color={C.ink} />
        <Point x={A[0]} y={A[1]} color={C.ink} />
        <Point x={B[0]} y={B[1]} color={C.ink} />
        <Point x={F[0]} y={F[1]} color={C.violet} />
        <Polyline points={[P1, P2, P3]} color={C.violet} weight={1.5} fillOpacity={0} />
        <Label at={CEN} attach="se">C</Label>
        <Label at={A} attach="sw">A</Label>
        <Label at={B} attach="ne">B</Label>
        <Label at={[(A[0] + CEN[0]) / 2, -2]} attach="s">−k</Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={-4} max={-0.5} step={0.01} />
        <Buttons>
          <ActionButton label={<>Jump to <M>{'k=-2\\sqrt2'}</M></>} onClick={() => setK(K_TANGENT)} />
        </Buttons>
        <Readouts>
          <Readout tex={`m_{AB} = \\tfrac{\\text{rise}}{\\text{run}} = \\tfrac{${rise}}{${run}} = 1`} />
          <Readout tex={`CA = CB = -k = ${(-k).toFixed(2)}`} />
          <Readout color={C.violet} tex={`\\text{distance } = \\tfrac{-k}{\\sqrt2} = ${d.toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
