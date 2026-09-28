// 2018 Specialist Exam 2 Q2d — why |z − 1| = |z − 3| is the vertical line Re(z) = 2. Drag z and
// compare its distances from 1 and 3: they are equal only on the perpendicular bisector of the
// segment from 1 to 3 (the line is "magnetic"). The algebra readout shows
// |z − 1|² − |z − 3|² = 4(x − 2), with no y at all, which is why the locus is a vertical line.
// A toggle adds the circle from part c and the two intersection points (2, 2 ± √3).

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Readout, Readouts, Toggle, clamp, num } from './kit'

type V = [number, number]
const P1: V = [1, 0]
const P3: V = [3, 0]
const S3 = Math.sqrt(3)
const dist = (p: V, q: V) => Math.hypot(p[0] - q[0], p[1] - q[1])

function snap(p: V): V {
  const x = clamp(p[0], -0.9, 4.4)
  const y = clamp(p[1], -0.9, 4.9)
  if (Math.abs(x - 2) < 0.1) {
    // On the line: also click onto the two intersection points with the circle.
    for (const yy of [2 + S3, 2 - S3]) if (Math.abs(y - yy) < 0.12) return [2, yy]
    return [2, y]
  }
  return [x, y]
}

export default function Bisector() {
  const [z, setZ] = useState<V>([2, 3])
  const [circle, setCircle] = useState(false)

  const a = dist(z, P1)
  const b = dist(z, P3)
  const on = Math.abs(z[0] - 2) < 1e-9
  const atMeet = on && circle && Math.abs(Math.abs(z[1] - 2) - S3) < 1e-9
  const tone = on ? C.good : C.bad

  let notice
  if (atMeet) {
    notice = (
      <Notice tone="good">
        <b>This point is on both loci.</b> It is equidistant from <M>1</M> and <M>3</M>, and it is on the circle, so
        it is one of the two points part d asks you to label: <M>{'x=2'}</M> in the circle gives{' '}
        <M>{'(y-2)^2=3'}</M>, so <M>{'y = 2\\pm\\sqrt3'}</M>. Label both in exact form.
      </Notice>
    )
  } else if (on) {
    notice = (
      <Notice tone="good">
        <b>Equal distances.</b> Every point on the line <M>{'\\operatorname{Re}(z)=2'}</M> is the same distance from{' '}
        <M>1</M> as from <M>3</M>: the two triangles either side are mirror images. Slide <M>z</M> up and down the
        line, then {circle ? 'slide it onto one of the two green points on the circle.' : 'turn on the circle from part c.'}
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>Not equal:</b> <M>z</M> is closer to <M>{z[0] < 2 ? '1' : '3'}</M> because it is on that side of{' '}
        <M>{'x=2'}</M>. Notice in the algebra readout that moving <M>z</M> up or down changes nothing: <M>y</M>{' '}
        cancels, so only <M>x</M> decides. Drag <M>z</M> sideways until it clicks onto the line.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1, 4.5]} y={[-1, 5]} equalScale height={380} xLabel="" yLabel="Im">
        <Label at={[4.5, 0]} attach="n" size={14} italic>Re</Label>
        {circle && <Circle center={[1, 2]} radius={2} color={C.violet} fillOpacity={0.04} weight={2} />}
        <Line.Segment point1={[2, -1]} point2={[2, 5]} color={C.good} weight={on ? 3 : 1.5} style={on ? undefined : 'dashed'} />
        <Line.Segment point1={P1} point2={P3} color={C.guide} weight={4} />
        <Line.Segment point1={P1} point2={z} color={C.g} weight={3} />
        <Line.Segment point1={P3} point2={z} color={C.f} weight={3} />
        <Point x={P1[0]} y={P1[1]} color={C.g} />
        <Point x={P3[0]} y={P3[1]} color={C.f} />
        <Point x={2} y={0} color={C.guide} />
        {circle && <Point x={2} y={2 + S3} color={C.good} />}
        {circle && <Point x={2} y={2 - S3} color={C.good} />}
        {circle && <Label at={[2, 2 + S3]} color={C.good} attach="ne">(2, 2 + √3)</Label>}
        {circle && <Label at={[2, 2 - S3]} color={C.good} attach="e" gap={10}>(2, 2 − √3)</Label>}
        <Label at={[2, 4.7]} color={C.good} attach="w">Re(z) = 2</Label>
        <MovablePoint point={z} onMove={p => setZ(snap(p as V))} color={tone} />
        <Label at={z} color={tone} attach={z[0] >= 2 ? 'e' : 'w'} gap={12}>z</Label>
      </Plane>
      <Controls>
        <Readouts>
          <Readout color={C.g} tex={`|z-1| = ${num(a, 3)}`} />
          <Readout color={C.f} tex={`|z-3| = ${num(b, 3)}`} />
          <Readout color={tone} tex={`|z-1|^2-|z-3|^2 = 4(x-2) = ${num(4 * (z[0] - 2), 2)}`} />
        </Readouts>
        <Toggle label="Show the circle from part c" checked={circle} onChange={setCircle} />
        {notice}
      </Controls>
    </div>
  )
}
