// 2017 Specialist Exam 2 Q4d/e — |z| = |z − (2 − 2√3i)| read as distances. Drag z and compare its
// distance to O with its distance to w = 2 − 2√3i: they only match on the perpendicular bisector of
// O and w, which is the line x − √3y − 4 = 0 (through the midpoint 1 − √3i, at right angles to Ow).
// A toggle keeps z on the line; parking z on the root −2 − 2√3i shows why that root lies on it (part e).

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Polygon, Readout, Readouts, Toggle, tick } from './kit'

const S3 = Math.sqrt(3)
const W: [number, number] = [2, -2 * S3]
const MID: [number, number] = [1, -S3]
const lineY = (x: number) => (x - 4) / S3
// unit vector along the line, and along O→w
const D: [number, number] = [S3 / 2, 1 / 2]
const U: [number, number] = [1 / 2, -S3 / 2]

function project([x, y]: [number, number]): [number, number] {
  const t = (x - 4) * D[0] + y * D[1]
  return [4 + t * D[0], t * D[1]]
}

const dist = (p: [number, number], q: [number, number]) => Math.hypot(p[0] - q[0], p[1] - q[1])

export default function Bisector() {
  const [z, setZ] = useState<[number, number]>([-1.5, 1])
  const [stick, setStick] = useState(false)

  const d0 = dist(z, [0, 0])
  const dw = dist(z, W)
  const equal = Math.abs(d0 - dw) < 0.06
  const atRoot = dist(z, [-2, -2 * S3]) < 0.15
  const s = 0.28
  const corner: [number, number][] = [
    MID,
    [MID[0] + s * D[0], MID[1] + s * D[1]],
    [MID[0] + s * D[0] + s * U[0], MID[1] + s * D[1] + s * U[1]],
    [MID[0] + s * U[0], MID[1] + s * U[1]],
  ]

  let notice
  if (atRoot) {
    notice = (
      <Notice tone="good">
        This is the root <M>{'-2 - 2\\sqrt3\\,i'}</M>. It is <M>4</M> from <M>O</M> (it&apos;s on <M>|z| = 4</M>) and{' '}
        <M>4</M> from <M>w</M> (the difference is <M>-4</M>, a real number). Equal distances, so the root sits exactly on the
        line. That&apos;s the point part e wants plotted carefully.
      </Notice>
    )
  } else if (equal) {
    notice = (
      <Notice tone="good">
        Both distances are <M>{d0.toFixed(2)}</M>, and z is on the green line. Slide along it: the distances change, but they
        stay equal. That line is the <b>perpendicular bisector</b> of <M>O</M> and <M>w</M>. It crosses the segment at its
        midpoint <M>{'1 - \\sqrt3\\,i'}</M> at right angles, which is why the <M>x^2</M> and <M>y^2</M> terms cancel in part d.
        Now try parking z on the lower root.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Here <M>{`|z| = ${d0.toFixed(2)}`}</M> and <M>{`|z - w| = ${dw.toFixed(2)}`}</M>, so z is closer to{' '}
        {d0 < dw ? <M>O</M> : <M>w</M>}. Drag z until the two lengths match. You can only do it on one line. Or turn on
        &ldquo;Keep z equidistant&rdquo;.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-5, 5]} y={[-5.2, 3]} equalScale xLabel="Re(z)" yLabel="Im(z)" height={360} xLabels={v => (v >= 5 ? "" : tick(v))} yLabels={v => (v >= 3 ? "" : tick(v))}>
        <Line.Segment point1={[0, 0]} point2={W} color={C.guide} style="dashed" weight={1.5} />
        <Line.ThroughPoints point1={[4, 0]} point2={[4 + D[0], D[1]]} color={equal || stick ? C.good : C.guide} weight={equal || stick ? 3 : 1.5} style={equal || stick ? 'solid' : 'dashed'} />
        <Polygon points={corner} color={C.guide} fillOpacity={0} weight={1.5} />
        <Point x={MID[0]} y={MID[1]} color={C.guide} />
        <Line.Segment point1={z} point2={[0, 0]} color={C.f} weight={3} />
        <Line.Segment point1={z} point2={W} color={C.g} weight={3} />
        <Point x={0} y={0} color={C.f} />
        <Label at={[0, 0]} color={C.f} attach="ne">O</Label>
        <Point x={W[0]} y={W[1]} color={C.g} />
        <Label at={W} color={C.g} attach="e" gap={10}>w = 2 − 2√3i</Label>
        <Point x={-2} y={-2 * S3} color={C.ink} />
        <Label at={[-2, -2 * S3]} color={C.ink} attach="sw" gap={8}>root</Label>
        <Label at={[-3.5, lineY(-3.5)]} color={equal || stick ? C.good : C.guide} attach="se" gap={8}>x − √3y − 4 = 0</Label>
        <MovablePoint point={z} onMove={p => setZ(stick ? project(p) : p)} color={C.violet} />
        <Label at={z} color={C.violet} attach="n" gap={12}>z</Label>
      </Plane>
      <Controls>
        <Toggle
          label="Keep z equidistant"
          checked={stick}
          onChange={v => {
            setStick(v)
            if (v) setZ(project(z))
          }}
        />
        <Readouts>
          <Readout color={C.f} tex={`|z| = ${d0.toFixed(2)}`} />
          <Readout color={C.g} tex={`|z - w| = ${dw.toFixed(2)}`} />
          <Readout
            color={equal ? C.good : C.bad}
            tex={equal ? '\\text{equal: } z \\text{ is on the line}' : `\\text{difference } ${Math.abs(d0 - dw).toFixed(2)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
