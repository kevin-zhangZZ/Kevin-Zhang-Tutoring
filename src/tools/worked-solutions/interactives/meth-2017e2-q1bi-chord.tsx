// 2017 Methods Exam 2 Q1b(i) — why the chord through A(−1, f(−1)) and B(1, f(1)) on
// f(x) = x³ − 5x passes through the origin and falls from left to right. Slide the pair of points
// x = ±t: f is odd, so the grey triangle under O→B is the triangle under A→O turned half a
// revolution, the rise-over-run is the same on both sides of O, and every such chord goes through
// O with gradient t² − 5 (−4 at t = 1). A toggle swaps the signs of f(−1) and f(1), which is one way
// to reach the report's common wrong answer y = 4x — its two points are visibly off the curve.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, Toggle, num } from './kit'

const f = (x: number) => x ** 3 - 5 * x
const ROOT5 = Math.sqrt(5)

export default function Chord() {
  const [t, setT] = useState(1)
  const [wrong, setWrong] = useState(false)
  const A: [number, number] = [-t, f(-t)]
  const B: [number, number] = [t, f(t)]
  const m = t * t - 5
  const atOne = Math.abs(t - 1) < 0.01
  const flat = Math.abs(t - ROOT5) < 0.04
  const small = t < 0.45

  const nameA = atOne ? 'A(−1, 4)' : 'A'
  const nameB = atOne ? 'B(1, −4)' : 'B'

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        The red points <M>{`(${num(-t)},\\ ${num(f(t))})`}</M> and <M>{`(${num(t)},\\ ${num(f(-t))})`}</M> are what you get
        if the signs of <M>f(-t)</M> and <M>f(t)</M> are swapped &mdash; and neither is on the curve. At <M>t = 1</M> they give
        the rising line <M>y = 4x</M>. The picture settles it: left of the <M>y</M>-axis near <M>x=-1</M> the graph is
        <b> above</b> the axis, so <M>f(-1)</M> is positive and the chord must fall.
      </Notice>
    )
  } else if (flat) {
    notice = (
      <Notice tone="good">
        At <M>{'t = \\sqrt5'}</M> both points are <M>x</M>-intercepts, so the chord is the <M>x</M>-axis itself: gradient{' '}
        <M>{'t^2 - 5 = 0'}</M>. It still passes through <M>O</M>.
      </Notice>
    )
  } else if (small) {
    notice = (
      <Notice>
        As <M>t</M> shrinks, the chord closes in on the tangent at <M>O</M>, and its gradient <M>{'t^2-5'}</M> heads to{' '}
        <M>-5 = f&apos;(0)</M>. Put <M>t</M> back to <M>1</M> for part (b).
      </Notice>
    )
  } else {
    notice = (
      <Notice tone={atOne ? 'good' : 'neutral'}>
        {atOne && <><b>This is part (b):</b> <M>A(-1, 4)</M> and <M>B(1, -4)</M>. </>}
        The two grey triangles are the same shape turned half a revolution about <M>O</M> &mdash; that is what{' '}
        <M>f(-x) = -f(x)</M> means. So <M>A</M> to <M>O</M> has the same rise over run as <M>O</M> to <M>B</M>, and the
        chord must pass through the origin. Slide <M>t</M>: it always does, with gradient <M>{'t^2 - 5'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3.5, 3.5]} y={[-12, 12]} xStep={1} yStep={4} height={330}>
        <Polygon points={[[0, 0], [t, 0], B]} color={C.guide} fillOpacity={0.18} weight={1} />
        <Polygon points={[[0, 0], [-t, 0], A]} color={C.guide} fillOpacity={0.18} weight={1} />
        <Plot.OfX y={f} domain={[-3.5, 3.5]} color={C.f} weight={3} />
        {!wrong && <Line.ThroughPoints point1={A} point2={B} color={C.good} weight={2.5} />}
        {wrong && (
          <>
            <Line.ThroughPoints point1={[-t, f(t)]} point2={[t, f(-t)]} color={C.bad} weight={2.5} />
            <Point x={-t} y={f(t)} color={C.bad} />
            <Point x={t} y={f(-t)} color={C.bad} />
            {atOne && <Label at={[1.9, 7.6]} color={C.bad} attach="e">y = 4x</Label>}
          </>
        )}
        <Point x={0} y={0} color={C.ink} />
        <Label at={[0, 0]} attach="sw" color={C.ink}>O</Label>
        <Point x={A[0]} y={A[1]} color={C.g} />
        <Point x={B[0]} y={B[1]} color={C.g} />
        <Label at={A} attach={A[1] >= 0 ? 'ne' : 'nw'} color={C.g}>{nameA}</Label>
        <Label at={B} attach={B[1] <= 0 ? 'sw' : 'se'} color={C.g}>{nameB}</Label>
        <Label at={[2.6, f(2.6)]} attach="e" color={C.f}>f</Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0.2} max={2.8} step={0.01} />
        <Buttons>
          <Toggle label="Swap the signs of f(−1) and f(1)" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`A = (${num(-t)},\\ ${num(f(-t))}),\\ B = (${num(t)},\\ ${num(f(t))})`} />
          <Readout color={C.good} tex={`m = \\frac{f(t)-f(-t)}{2t} = t^2 - 5 = ${num(m)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
