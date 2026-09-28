// 2020 Methods Exam 2 Q1e.i — h is f mirrored in the line y = 1. Since h(x) = 2 − f(x), the
// points (x, f(x)) and (x, h(x)) always average to height 1: they are mirror images in y = 1 (the
// two steps of part d — reflect in the x-axis, then up 2 — compose to exactly this reflection).
// Drag P along f and its image P′ runs along h. P and P′ coincide only when P is ON the mirror,
// f(x) = 1, which turns f = h into (x² − 4)² = 4, so x² = 2 or 6: the four intersections
// x = ±√2, ±√6 (green). Snaps to those four x-values when the drag comes close.

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, num, tick } from './kit'

const f = (x: number) => 0.25 * (x * x - 4) ** 2
const h = (x: number) => 2 - f(x)
const XMAX = 2.87 // f(2.87) ≈ 4.49, the top of the view
const ROOTS = [-Math.sqrt(6), -Math.sqrt(2), Math.sqrt(2), Math.sqrt(6)]
const ROOT_TEX = ['-\\sqrt6', '-\\sqrt2', '\\sqrt2', '\\sqrt6']

const SAMPLES = Array.from({ length: 1201 }, (_, i) => -XMAX + (2 * XMAX * i) / 1200)
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
  const r = ROOTS.find(r => Math.abs(r - best) < 0.04)
  return r ?? best
}

export default function Mirror() {
  const [x, setX] = useState(0.9)
  const y = f(x)
  const yh = h(x)
  const k = ROOTS.findIndex(r => Math.abs(r - x) < 1e-9)
  const meet = k >= 0

  let notice
  if (meet) {
    notice = (
      <Notice tone="good">
        <b>P and P′ are the same point</b>, because P is on the mirror line: <M>f(x) = 1</M>, and so{' '}
        <M>h(x) = 2 - 1 = 1</M> too. This is an intersection, at <M>{`x = ${ROOT_TEX[k]}`}</M>. So solving{' '}
        <M>f(x) = h(x)</M> is really solving <M>f(x) = 1</M>: <M>{'\\tfrac14\\left(x^2-4\\right)^2 = 1'}</M>, so{' '}
        <M>{'x^2 - 4 = \\pm2'}</M> and <M>x^2 = 2</M> or <M>6</M>. The line <M>y = 1</M> cuts the W shape four times, so
        there are four answers.
      </Notice>
    )
  } else if (y > 1) {
    notice = (
      <Notice>
        P is <b>above</b> the line <M>y = 1</M>, by <M>{num(y - 1)}</M>. Its partner P′ on <M>h</M> is the same distance{' '}
        <b>below</b> it, because <M>h(x) = 2 - f(x)</M> makes the two heights average to exactly <M>1</M>. That is what{' '}
        &ldquo;reflection in <M>y = 1</M>&rdquo; means, and it is part d&apos;s two steps rolled into one. The curves can
        only meet where P and P′ coincide. Drag P down to the dashed line.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        P is <b>below</b> <M>y = 1</M>, so P′ is above it: here <M>h</M> is the upper curve. These stretches, between the
        crossings, are the shaded regions of part e. Every crossing is a point where P sits exactly on the mirror line;
        drag P up to it.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 3]} y={[-2.5, 4.5]} xStep={1} yStep={1} height={320} yLabels={v => (v > 4.5 || v < -2.5 ? "" : tick(v))}>
        <Line.ThroughPoints point1={[0, 1]} point2={[1, 1]} color={C.violet} style="dashed" weight={2} />
        <Label at={[-0.7, 1]} color={C.violet} attach="n" size={12}>y = 1</Label>
        <Plot.OfX y={f} domain={[-XMAX, XMAX]} color={C.f} weight={3} />
        <Plot.OfX y={h} domain={[-XMAX, XMAX]} color={C.g} weight={3} />
        <Label at={[2.75, f(2.75)]} color={C.f} attach="w">f</Label>
        <Label at={[2.75, h(2.75)]} color={C.g} attach="w">h</Label>
        {ROOTS.map((r, i) => (
          <Point key={r} x={r} y={1} color={i === k ? C.good : C.guide} opacity={i === k ? 1 : 0.7} />
        ))}
        {!meet && (
          <>
            <Line.Segment point1={[x, y]} point2={[x, yh]} color={C.guide} style="dashed" weight={1.5} />
            <Point x={x} y={1} color={C.violet} />
            <Point x={x} y={yh} color={C.g} />
            <Label at={[x, yh]} color={C.g} attach={x < 0 ? 'w' : 'e'}>P′</Label>
          </>
        )}
        <Label at={[x, y]} color={meet ? C.good : C.f} attach={x < 0 ? 'nw' : 'ne'}>P</Label>
        <MovablePoint point={[x, y]} onMove={p => setX(nearestOnF(p))} color={meet ? C.good : C.f} />
      </Plane>
      <Controls>
        <Readouts>
          <Readout color={C.f} tex={`P = (${num(x)},\\ ${num(y)})`} />
          <Readout color={C.g} tex={`P' = (${num(x)},\\ ${num(yh)})`} />
          <Readout color={C.violet} tex={`\\tfrac{f(x) + h(x)}{2} = 1`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the blue point P along f.</p>
        {notice}
      </Controls>
    </div>
  )
}
