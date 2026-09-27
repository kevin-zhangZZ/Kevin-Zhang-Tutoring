// 2020 Methods Exam 1 Q6b — drag a point P along f(x) = √x/√2 and watch its mirror image P′ in
// y = x trace out f⁻¹(x) = 2x². Shows why the inverse is the reflection (it swaps each point's
// coordinates, just as it swaps inputs and outputs), where the endpoint (1, 2) comes from, and
// why these two curves can only meet on the line y = x.

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, clamp } from './kit'

const f = (x: number) => Math.sqrt(x / 2)
const fInv = (x: number) => 2 * x * x

// Snap the dragged point to the nearest point of f on [0, 2] — near the origin f is steep, so
// snapping by x alone would ignore a mostly vertical drag.
const SAMPLES = Array.from({ length: 801 }, (_, i) => (2 * i) / 800)
function nearestOnF([mx, my]: [number, number]): number {
  let best = 0
  let bestD = Infinity
  for (const x of SAMPLES) {
    const d = (x - mx) ** 2 + (f(x) - my) ** 2
    if (d < bestD) {
      bestD = d
      best = x
    }
  }
  return best
}

export default function Mirror() {
  const [a, setA] = useState(1.4)
  const fa = f(a)
  const onLine = Math.abs(fa - a) < 0.025
  const atEnd = a > 1.985

  let notice
  if (onLine) {
    notice = (
      <Notice tone="good">
        <b>P and P′ are the same point.</b> Here <M>f(a) = a</M>, so P sits on the line <M>y = x</M> and is its own
        reflection: it is on <M>f</M> and on <M>f^{'{-1}'}</M> at once. For an increasing function that is the only way the
        two curves can meet. So to find where they cross, solve <M>f(x) = x</M> (a quadratic once you square) rather than{' '}
        <M>f(x) = f^{'{-1}'}(x)</M> (a quartic).
      </Notice>
    )
  } else if (atEnd) {
    notice = (
      <Notice>
        P is at the end of <M>f</M>, the point <M>(2, 1)</M>. Its reflection <M>(1, 2)</M> is the end of{' '}
        <M>f^{'{-1}'}</M>. The domain <M>[0, 2]</M> of <M>f</M> has become the <i>range</i> of <M>f^{'{-1}'}</M>, and the
        range <M>[0, 1]</M> of <M>f</M> has become its <i>domain</i>. The inverse stops at <M>(1, 2)</M>; it doesn&apos;t carry on.
      </Notice>
    )
  } else if (fa > a) {
    notice = (
      <Notice>
        P is <b>above</b> <M>y = x</M>: its <M>y</M>-value {fa.toFixed(2)} is bigger than its <M>x</M>-value {a.toFixed(2)}.
        So its mirror image P′ is <b>below</b> the line. Swapping the coordinates is exactly what an inverse does (it
        swaps inputs and outputs), so P′ always lands on <M>f^{'{-1}'}</M>. Now drag P towards the origin.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        P is <b>below</b> <M>y = x</M>, so P′ is above it. The orange curve is every P′ you have made so far: keep
        dragging P along <M>f</M> and watch <M>f^{'{-1}'}</M> being drawn. The dashed segment PP′ always crosses{' '}
        <M>y = x</M> at right angles, at its midpoint. That is what &ldquo;reflection in <M>y = x</M>&rdquo; means.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.25, 2.25]} y={[-0.25, 2.25]} xStep={0.5} yStep={0.5} equalScale height={340}>
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[2.05, 2.05]} color={C.guide} attach="w">y = x</Label>
        <Plot.OfX y={f} domain={[0, 2]} color={C.f} weight={3} />
        <Plot.OfX y={fInv} domain={[0, Math.min(1, fa)]} color={C.g} weight={3} />
        <Line.Segment point1={[a, fa]} point2={[fa, a]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={(a + fa) / 2} y={(a + fa) / 2} color={C.guide} />
        <Point x={fa} y={a} color={C.g} />
        {!onLine && <Label at={[fa, a]} color={C.g} attach={fa > a ? 'se' : 'nw'}>P′</Label>}
        <Label at={[a, fa]} color={C.f} attach={fa > a ? 'nw' : 'se'}>P</Label>
        <Label at={[1.75, f(1.75)]} color={C.f} attach="se">f</Label>
        {fa > 0.85 && <Label at={[0.85, fInv(0.85)]} color={C.g} attach="w">f⁻¹</Label>}
        <MovablePoint point={[a, fa]} onMove={p => setA(clamp(nearestOnF(p), 0, 2))} color={C.f} />
      </Plane>
      <Controls>
        <Readouts>
          <Readout color={C.f} tex={`P = (${a.toFixed(2)},\\ ${fa.toFixed(2)})`} />
          <Readout color={C.g} tex={`P' = (${fa.toFixed(2)},\\ ${a.toFixed(2)})`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the blue point P along the curve.</p>
        {notice}
      </Controls>
    </div>
  )
}
