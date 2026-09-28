// 2018 Specialist Exam 2 Q2b — why |z + 1| = √2|z − i| and |z − (1 + 2i)| = 2 are the same
// circle. Drag z anywhere: the readouts show its distance from 1 + 2i, its distances from −1 and
// i, and the ratio of those two. The part b algebra is really the identity
// |z + 1|² − 2|z − i|² = 4 − |z − (1 + 2i)|², true for every z, so the ratio is exactly √2 on the
// circle, above √2 inside it and below √2 outside it. The circle is "magnetic" so z can be parked
// on it exactly.

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Readout, Readouts, Toggle, num } from './kit'

type V = [number, number]
const O: V = [1, 2] // 1 + 2i
const R = 2
const A: V = [-1, 0] // −1
const B: V = [0, 1] // i
const dist = (p: V, q: V) => Math.hypot(p[0] - q[0], p[1] - q[1])

function snap(p: V): V {
  const d = dist(p, O)
  if (Math.abs(d - R) < 0.12 && d > 1e-6) return [O[0] + (R * (p[0] - O[0])) / d, O[1] + (R * (p[1] - O[1])) / d]
  // Keep z off i itself, where the ratio is undefined.
  if (dist(p, B) < 0.08) return [B[0] + 0.08, B[1]]
  return p
}

export default function TwoRules() {
  const [z, setZ] = useState<V>([3, 2])
  const [showAlg, setShowAlg] = useState(false)

  const dO = dist(z, O)
  const d1 = dist(z, A)
  const d2 = dist(z, B)
  const ratio = d1 / d2
  const on = Math.abs(dO - R) < 0.005
  const inside = !on && dO < R
  const lhs = d1 * d1 - 2 * d2 * d2
  const rhs = 4 - dO * dO
  const tone = on ? C.good : C.bad

  let notice
  if (on) {
    notice = (
      <Notice tone="good">
        <b>On the circle, both rules hold at once.</b> The distance from <M>1+2i</M> is exactly <M>2</M>, and{' '}
        <M>|z+1|</M> is exactly <M>\sqrt2</M> times <M>|z-i|</M>. Drag <M>z</M> right round the circle: the two
        orange and blue lengths change, but their ratio never moves off <M>\sqrt2</M>.
      </Notice>
    )
  } else if (inside) {
    notice = (
      <Notice tone="warn">
        <b>Inside the circle, both rules fail together.</b> The distance from <M>1+2i</M> is less than <M>2</M>, and
        the ratio is <em>more</em> than <M>\sqrt2</M>, because <M>z</M> is now relatively close to <M>i</M> (which is
        inside the circle). Drag <M>z</M> outward until it clicks onto the circle.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>Outside the circle, both rules fail together.</b> The distance from <M>1+2i</M> is more than <M>2</M>, and
        the ratio has dropped <em>below</em> <M>\sqrt2</M>. Turn on &ldquo;Show the algebra&rdquo; to see why the two
        rules always switch on and off at exactly the same places.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2, 4]} y={[-1, 5]} equalScale height={380} xLabel="" yLabel="Im">
        <Label at={[4, 0]} attach="n" size={14} italic>Re</Label>
        <Circle center={O} radius={R} color={C.violet} fillOpacity={0.05} weight={2.5} />
        <Line.Segment point1={O} point2={z} color={C.violet} weight={2} style="dashed" />
        <Line.Segment point1={A} point2={z} color={C.g} weight={3} />
        <Line.Segment point1={B} point2={z} color={C.f} weight={3} />
        <Point x={O[0]} y={O[1]} color={C.violet} />
        <Point x={A[0]} y={A[1]} color={C.g} />
        <Point x={B[0]} y={B[1]} color={C.f} />
        <Label at={O} color={C.violet} attach="s">1 + 2i</Label>
        <Label at={A} color={C.g} attach="nw">−1</Label>
        <Label at={B} color={C.f} attach="nw">i</Label>
        <MovablePoint point={z} onMove={p => setZ(snap(p as V))} color={tone} />
        <Label at={z} color={tone} attach={z[0] >= O[0] ? 'ne' : 'nw'} gap={10}>z</Label>
      </Plane>
      <Controls>
        <Readouts>
          <Readout color={C.violet} tex={`|z-(1+2i)| = ${num(dO, 3)}`} />
          <Readout color={C.g} tex={`|z+1| = ${num(d1, 3)}`} />
          <Readout color={C.f} tex={`|z-i| = ${num(d2, 3)}`} />
          <Readout color={tone} tex={`\\dfrac{|z+1|}{|z-i|} = ${num(ratio, 3)}${on ? '= \\sqrt2\\ \\checkmark' : ''}`} />
        </Readouts>
        <Toggle label="Show the algebra" checked={showAlg} onChange={setShowAlg} />
        {showAlg && (
          <Readouts>
            <Readout tex={`|z+1|^2-2|z-i|^2 = ${num(lhs, 3)}`} />
            <Readout tex={`4-|z-(1+2i)|^2 = ${num(rhs, 3)}`} />
          </Readouts>
        )}
        {showAlg && (
          <Notice>
            These two numbers are equal wherever you put <M>z</M>: expanding and collecting in part b is exactly the
            proof that <M>{'|z+1|^2-2|z-i|^2 = 4-|z-(1+2i)|^2'}</M> for every <M>z</M>. So one side is zero exactly
            when the other is, which means the ratio is <M>\sqrt2</M> exactly when the distance from <M>1+2i</M> is{' '}
            <M>2</M>.
          </Notice>
        )}
        {notice}
      </Controls>
    </div>
  )
}
