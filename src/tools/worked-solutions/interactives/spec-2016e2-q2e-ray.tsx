// 2016 Specialist Exam 2 Q2e — why Arg(z) = −3π/4 is a ray from an open circle at O, not a line.
// Drag a point P and read its principal argument (the violet angle). Anywhere on the blue
// half-line it is −3π/4, however far out; slide P through O onto the other half of y = x and the
// argument jumps to π/4; at O itself there is no angle at all. The report says many students drew
// a line, or a ray that included or extended past the origin.

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Polyline, Readout, Readouts, clamp, num } from './kit'

const L = 4
// The window runs to 4.5 at the positive ends so the axis names sit between tick numbers.
const W = 4.5
const RAY = (-3 * Math.PI) / 4
const OTHER = Math.PI / 4
const HOLE = 0.14 // radius of the open circle at O

const dir = (a: number, r: number): [number, number] => [r * Math.cos(a), r * Math.sin(a)]
// Principal argument in (−π, π]; atan2 can return −π for a negative zero imaginary part.
function arg([x, y]: [number, number]): number {
  const a = Math.atan2(y, x)
  return a <= -Math.PI + 1e-12 ? Math.PI : a
}

// Snap to O when close, and onto the line y = x when the drag is within a few degrees of it.
function snap([x0, y0]: [number, number]): [number, number] {
  const x = clamp(x0, -L, L)
  const y = clamp(y0, -L, L)
  const r = Math.hypot(x, y)
  if (r < 0.25) return [0, 0]
  const a = Math.atan2(y, x)
  const near = (b: number) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b))) < 0.08
  if (near(RAY) || near(OTHER)) {
    const m = (x + y) / 2
    return [m, m]
  }
  return [x, y]
}

function argTex(p: [number, number]): string {
  if (Math.abs(p[0] - p[1]) < 1e-9 && p[0] < 0) return '-\\tfrac{3\\pi}{4}'
  if (Math.abs(p[0] - p[1]) < 1e-9 && p[0] > 0) return '\\tfrac{\\pi}{4}'
  const a = arg(p)
  return `${num(a / Math.PI)}\\pi\\ \\left(${num((a * 180) / Math.PI, 0)}^\\circ\\right)`
}

export default function Ray() {
  const [p, setP] = useState<[number, number]>([-2.5, -2.5])
  const atO = p[0] === 0 && p[1] === 0
  const onLine = Math.abs(p[0] - p[1]) < 1e-9
  const onRay = !atO && onLine && p[0] < 0
  const onOther = !atO && onLine && p[0] > 0
  const a = atO ? 0 : arg(p)
  const arcPts: [number, number][] = Array.from({ length: 41 }, (_, i) => dir((a * i) / 40, 0.75))

  let notice
  if (atO) {
    notice = (
      <Notice tone="warn">
        <b>At O there is no argument at all.</b> The argument is the direction from O to the point, and there is no
        direction from O to itself, so <M>{'\\mathrm{Arg}(0)'}</M> is undefined. The ray starts at O but doesn&apos;t
        include it: draw an <b>open circle</b> there.
      </Notice>
    )
  } else if (onRay) {
    notice = (
      <Notice tone="good">
        <M>{'\\mathrm{Arg}(z) = -\\tfrac{3\\pi}{4}'}</M>: P is <M>135^\circ</M> clockwise from the positive real axis, in the
        third quadrant. Slide P further out or closer in along the blue half-line: the angle never changes, so every point
        on it is on the locus. That half-line is the ray. Now drag P through O to the other side.
      </Notice>
    )
  } else if (onOther) {
    notice = (
      <Notice tone="warn">
        P is still on the line <M>y = x</M>, but on the <b>other side of O</b>, and its argument is{' '}
        <M>{'\\tfrac{\\pi}{4}'}</M>, not <M>{'-\\tfrac{3\\pi}{4}'}</M>. So this half is not part of the locus, and the sketch
        must stop at O. Converting to <M>{'\\tan\\theta = 1'}</M>, i.e. <M>y = x</M>, loses exactly this information.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The argument of P is the angle from the positive real axis round to the line OP: anticlockwise is positive,
        clockwise is negative, and the principal value is always between <M>-\pi</M> and <M>\pi</M>. Drag P until its
        argument is <M>{'-\\tfrac{3\\pi}{4}'}</M> (it clicks onto the line).
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-L, W]} y={[-L, W]} equalScale height={320} xLabel="Re" yLabel="Im">
        <Line.Segment point1={dir(OTHER, HOLE)} point2={dir(OTHER, 10)} color={C.bad} style="dashed" weight={2} opacity={0.75} />
        <Line.Segment point1={dir(RAY, HOLE)} point2={dir(RAY, 10)} color={C.f} weight={4} />
        <Circle center={[0, 0]} radius={HOLE} color={C.f} fillOpacity={0} weight={2.5} />
        {/* mafs draws a Label's vertical attach flipped ("n" sits below the point, "s" above). */}
        <Label at={[-3.3, -3.3]} color={C.f} attach="se" size={12}>Arg(z) = −3π/4</Label>
        <Label at={[1.3, 0.9]} color={C.bad} attach="e" size={12}>Arg(z) = π/4</Label>
        {!atO && (
          <>
            <Line.Segment point1={[0, 0]} point2={p} color={C.violet} weight={2} />
            <Polyline points={arcPts} color={C.violet} weight={2.5} />
          </>
        )}
        <Label at={p} color={atO ? C.bad : onRay ? C.good : C.ink} attach={p[0] < 0 ? 'nw' : 'se'}>P</Label>
        <MovablePoint point={p} onMove={q => setP(snap(q))} color={atO || onOther ? C.bad : onRay ? C.good : C.ink} />
      </Plane>
      <Controls>
        <Readouts>
          <Readout color={C.violet} tex={atO ? '\\mathrm{Arg}(0)\\ \\text{is undefined}' : `\\mathrm{Arg}(z) = ${argTex(p)}`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the point P, including through O.</p>
        {notice}
      </Controls>
    </div>
  )
}
