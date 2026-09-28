// 2018 Methods Exam 1 Q7a, the calculus route (the report's Method 2). For P = (x, 2x − 4),
// OP² = x² + (2x − 4)² = 5x² − 16x + 16 and OP = √(5x² − 16x + 16). Slide x: the two graphs bottom
// out at the same x = 8/5, because squaring keeps the order of positive numbers. The tangents'
// gradients are read out live: d/dx(OP) = (10x − 16)/(2·OP) has the same numerator as
// d/dx(OP²) = 10x − 16 and a positive denominator, so the two always share a sign and hit 0
// together. That is why minimising OP² (no square root, no chain rule) is the safer route.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num } from './kit'

const sq = (x: number) => 5 * x * x - 16 * x + 16
const op = (x: number) => Math.sqrt(sq(x))
const XMIN = 8 / 5
const T = 0.6

export default function Squared() {
  const [x, setX] = useState(0.6)
  const atMin = Math.abs(x - XMIN) < 0.005
  const u = sq(x)
  const d = op(x)
  const g1 = 10 * x - 16
  const g2 = g1 / (2 * d)

  let notice
  if (atMin) {
    notice = (
      <Notice tone="good">
        <b>Both tangents are flat at the same <M>{'x = \\tfrac85'}</M>.</b> <M>{'OP^2'}</M> bottoms out at{' '}
        <M>{'\\tfrac{16}{5}'}</M> and <M>OP</M> at <M>{'\\sqrt{\\tfrac{16}{5}} = \\tfrac{4\\sqrt5}{5}'}</M>. Squaring
        keeps the order of positive lengths (a shorter <M>OP</M> always has a smaller <M>{'OP^2'}</M>), so the
        smallest of one is at the same <M>x</M> as the smallest of the other.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Both gradients are {g1 < 0 ? 'negative: moving right still brings ' : 'positive: moving right now takes '}
        <M>P</M> {g1 < 0 ? 'closer to ' : 'further from '}
        <M>O</M>. They always share a sign, because <M>{'\\tfrac{d}{dx}(OP)'}</M> is just <M>{'10x - 16'}</M> divided by{' '}
        <M>{'2\\,OP > 0'}</M>. So set the easy one, <M>{'10x - 16'}</M>, to zero. Slide <M>x</M> until the tangents are
        flat.
      </Notice>
    )
  }

  const c1 = atMin ? C.good : C.f
  const c2 = atMin ? C.good : C.g

  return (
    <div>
      <Plane x={[0, 3.2]} y={[0, 16]} xStep={1} yStep={4} height={300} yLabel="">
        <Plot.OfX y={sq} domain={[0, 3.2]} color={C.f} weight={3} />
        <Plot.OfX y={op} domain={[0, 3.2]} color={C.g} weight={3} />
        <Label at={[2.95, sq(2.95)]} attach="w" color={C.f}>
          OP² = 5x² − 16x + 16
        </Label>
        <Label at={[3.1, op(3.1)]} attach="n" color={C.g}>
          OP
        </Label>
        <Line.Segment point1={[x, 0]} point2={[x, Math.max(u, d)]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[x - T, u - T * g1]} point2={[x + T, u + T * g1]} color={c1} weight={2} style="dashed" />
        <Line.Segment point1={[x - T, d - T * g2]} point2={[x + T, d + T * g2]} color={c2} weight={2} style="dashed" />
        <Point x={x} y={u} color={c1} />
        <Point x={x} y={d} color={c2} />
        {atMin && (
          <Label at={[x, 0]} attach="ne" color={C.good} size={12}>
            x = 8/5
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x}
          onChange={v => setX(Math.abs(v - XMIN) < 0.03 ? XMIN : v)}
          min={0}
          max={3.2}
          step={0.01}
        />
        <Readouts>
          <Readout color={c1} tex={`\\tfrac{d}{dx}\\left(OP^2\\right) = 10x - 16 = ${num(g1)}`} />
          <Readout color={c2} tex={`\\tfrac{d}{dx}(OP) = \\tfrac{10x - 16}{2\\,OP} = ${num(g2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
