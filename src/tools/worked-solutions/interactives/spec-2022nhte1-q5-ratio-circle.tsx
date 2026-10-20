// 2022 Specialist NHT Exam 1 Q5 — 3|z + i| = |z| read as distances: P's distance from 0 (blue) is
// three times its distance from −i (violet). Drag P; it clicks onto the orange circle
// x² + (y + 9/8)² = (3/8)², centre −9/8 i, radius 3/8, exactly when the ratio is 3. The circle
// crosses the imaginary axis at −3/4 i (distances 3/4 and 1/4) and −3/2 i (3/2 and 1/2), the two
// points that divide the segment from 0 to −i internally and externally in the ratio 3 : 1; their
// midpoint is the centre. Inside the circle P is too close to −i (ratio above 3), outside it the
// ratio is below 3. Shows why the locus is a circle that surrounds −i without being centred on it.

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Readout, Readouts, clamp, num } from './kit'

const O: [number, number] = [0, 0]
const Q: [number, number] = [0, -1] // the point −i
const CEN: [number, number] = [0, -9 / 8]
const RAD = 3 / 8
const X: [number, number] = [-1, 1]
const Y: [number, number] = [-1.75, 0.25]

// The two points where the circle crosses the imaginary axis: −3/4 i and −3/2 i.
const KEY: [number, number][] = [[0, -0.75], [0, -1.5]]

const dist = (p: [number, number], q: [number, number]) => Math.hypot(p[0] - q[0], p[1] - q[1])

// Snap onto the circle when the drag passes within 0.05 of it, so the locus can be reached with a finger.
function snap([x, y]: [number, number]): [number, number] {
  const p: [number, number] = [clamp(x, X[0], X[1]), clamp(y, Y[0], Y[1])]
  for (const k of KEY) if (dist(p, k) < 0.05) return k
  const d = dist(p, CEN)
  if (Math.abs(d - RAD) < 0.05 && d > 1e-6) {
    return [CEN[0] + ((p[0] - CEN[0]) * RAD) / d, CEN[1] + ((p[1] - CEN[1]) * RAD) / d]
  }
  return p
}

function complexLabel([x, y]: [number, number]): string {
  const re = num(x)
  const im = num(Math.abs(y))
  return y < 0 ? `${re} - ${im}i` : `${re} + ${im}i`
}

export default function RatioCircle() {
  const [p, setP] = useState<[number, number]>([0.6, -1.4])
  const d0 = dist(p, O)
  const d1 = dist(p, Q)
  const onCircle = Math.abs(dist(p, CEN) - RAD) < 1e-6
  const atTop = dist(p, KEY[0]) < 1e-9
  const atBottom = dist(p, KEY[1]) < 1e-9

  let notice
  if (onCircle && (atTop || atBottom)) {
    notice = (
      <Notice tone="good">
        <b>
          P is at <M>{atTop ? '-\\tfrac34 i' : '-\\tfrac32 i'}</M>
        </b>
        : its distance from 0 is <M>{atTop ? '\\tfrac34' : '\\tfrac32'}</M> and from <M>-i</M> is{' '}
        <M>{atTop ? '\\tfrac14' : '\\tfrac12'}</M>, exactly three times as far. These two points on the imaginary axis are
        the ends of a diameter, so the centre is halfway between them, at <M>{'-\\tfrac98 i'}</M>, and the radius is{' '}
        <M>{'\\tfrac38'}</M>. Now slide P round the circle: the ratio stays 3.
      </Notice>
    )
  } else if (onCircle) {
    notice = (
      <Notice tone="good">
        <b>On the locus:</b> the blue length is exactly three violet lengths, <M>{`|z| = 3|z+i| \\approx ${num(d0)}`}</M>. Every point with
        this property lies on the orange circle. Notice that its centre <M>{'-\\tfrac98 i'}</M> is <b>not</b> at <M>-i</M>:
        the circle reaches <M>{'\\tfrac14'}</M> above <M>-i</M> but <M>{'\\tfrac12'}</M> below it, because below{' '}
        <M>-i</M> P is also further from 0, so it can be further from <M>-i</M> too. Drag P to the top or bottom of the
        circle.
      </Notice>
    )
  } else if (d0 > 3 * d1) {
    notice = (
      <Notice>
        P is <b>too close to <M>-i</M></b>: <M>|z|</M> is more than three times <M>{'|z+i|'}</M>, so P is inside the circle.
        Drag P away from <M>-i</M> until the blue length is exactly three violet lengths; it will click onto the circle.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Here <M>|z|</M> is less than three times <M>{'|z+i|'}</M>, so P is outside the circle. Points satisfying{' '}
        <M>{'3|z+i| = |z|'}</M> must be three times as far from 0 as from <M>-i</M>, so they cluster around <M>-i</M>.
        Drag P towards <M>-i</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={X} y={Y} xStep={0.25} yStep={0.25} equalScale height={330} labels={false} xLabel="Re" yLabel="Im">
        <Circle center={CEN} radius={RAD} color={C.g} fillOpacity={0.08} weight={3} />
        <Line.Segment point1={p} point2={O} color={C.f} weight={3} />
        <Line.Segment point1={p} point2={Q} color={C.violet} weight={3} />
        <Point x={O[0]} y={O[1]} color={C.f} />
        <Point x={Q[0]} y={Q[1]} color={C.violet} />
        <Point x={CEN[0]} y={CEN[1]} color={C.guide} />
        {KEY.map(k => (
          <Point key={k[1]} x={k[0]} y={k[1]} color={C.g} />
        ))}
        <Label at={O} color={C.f} attach="ne">0</Label>
        <Label at={Q} color={C.violet} attach="w">−i</Label>
        <Label at={p} color={onCircle ? C.good : C.ink} attach="se">P</Label>
        <MovablePoint point={p} onMove={q => setP(snap(q))} color={onCircle ? C.good : C.ink} />
      </Plane>
      <Controls>
        <Readouts>
          <Readout tex={`z = ${complexLabel(p)}`} />
          <Readout color={C.f} tex={`|z| \\approx ${num(d0)}`} />
          <Readout color={C.violet} tex={`|z+i| \\approx ${num(d1)}`} />
          <Readout tex={`\\frac{|z|}{|z+i|} \\approx ${d1 < 1e-6 ? '\\infty' : num(d0 / d1)}`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the point P anywhere on the plane.</p>
        {notice}
      </Controls>
    </div>
  )
}
