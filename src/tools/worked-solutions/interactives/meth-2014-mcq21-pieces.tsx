// 2014 Methods Exam 2 MCQ 21 — why the answer is π/3, not π/4. Slide the acute angle x and the
// trapezium (p = 1) splits into its middle rectangle, area sin x, and two end triangles, total area
// sin x cos x. The triangles alone peak at x = π/4 (option C, 27% — the most popular wrong answer),
// but the rectangle keeps growing past there, so the whole area A = sin x (1 + cos x) is still
// rising: A'(π/4) = √2/2 > 0. A' = cos x + cos 2x = 0 at x = π/3 (option D), where A = 3√3/4 ≈ 1.30
// and the shape is half a regular hexagon. Buttons jump to each option's angle.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider,
  clamp, num,
} from './kit'

const PI = Math.PI
const rect = (x: number) => Math.sin(x)
const tri = (x: number) => Math.sin(x) * Math.cos(x)
const area = (x: number) => rect(x) + tri(x)
const dA = (x: number) => Math.cos(x) + Math.cos(2 * x)
const OPTIONS: [string, number][] = [
  ['A', PI / 12],
  ['B', PI / 6],
  ['C', PI / 4],
  ['D', PI / 3],
  ['E', (5 * PI) / 12],
]
const NAMES = ['', 'π/12', 'π/6', 'π/4', 'π/3', '5π/12', 'π/2']
const xl = (v: number) => {
  const k = Math.round(v / (PI / 12))
  return Math.abs(v - (k * PI) / 12) < 1e-6 && k >= 0 && k <= 6 ? NAMES[k] : ''
}
const yl = (v: number) => (v === 0.5 ? '0.5' : v === 1 ? '1' : '')
const LO = 0.05
const HI = PI / 2
const CX = 1.6 // centre of AB in the drawing

export default function TrapeziumPieces() {
  const [x, setX] = useState(PI / 4)
  const move = (v: number) => setX(clamp(v, LO, HI))
  const s = Math.sin(x)
  const c = Math.cos(x)
  const A: [number, number] = [CX - 0.5, 0]
  const B: [number, number] = [CX + 0.5, 0]
  const Cc: [number, number] = [CX + 0.5 + c, s]
  const D: [number, number] = [CX - 0.5 - c, s]
  const atC = Math.abs(x - PI / 4) < 0.02
  const atD = Math.abs(x - PI / 3) < 0.02
  const slope = dA(x)

  let notice
  if (atD) {
    notice = (
      <Notice tone="good">
        <b>Option D: the biggest trapezium.</b> <M>{"A'(x) = \\cos x + \\cos 2x = \\tfrac12 - \\tfrac12 = 0"}</M>, and{' '}
        <M>{'A = \\tfrac{3\\sqrt3}{4}p^2 \\approx 1.30p^2'}</M>. The top <M>DC = p + 2p\cos x = 2p</M>: the shape is half a
        regular hexagon. Notice the triangles are already shrinking here, but the rectangle is still growing.
      </Notice>
    )
  } else if (atC) {
    notice = (
      <Notice tone="warn">
        <b>Option C is the trap.</b> The two triangles together (orange) are at their biggest here,{' '}
        <M>{'\\sin x\\cos x = \\tfrac12'}</M>. But the rectangle (blue) is still getting taller, and it gains more than the
        triangles lose: <M>{"A'(\\tfrac{\\pi}{4}) = \\tfrac{\\sqrt2}{2} > 0"}</M>, so the total is still rising. Slide{' '}
        <M>x</M> a little further.
      </Notice>
    )
  } else if (x < PI / 3) {
    notice = (
      <Notice>
        The trapezium is flat and wide: short height <M>p\sin x</M>, so a small area. Here{' '}
        <M>{"A'(x) > 0"}</M>: tilting the legs up adds more height than it loses in width. Keep increasing <M>x</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Past <M>{'\\tfrac{\\pi}{3}'}</M> the legs are steep: the height barely grows, but the top <M>DC</M> shrinks fast, so{' '}
        <M>{"A'(x) < 0"}</M>. At <M>{'x = \\tfrac{\\pi}{2}'}</M> it is just a <M>p \times p</M> square, area <M>{'p^2'}</M>. Bring{' '}
        <M>x</M> back.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 3.2]} y={[-0.2, 1.15]} xStep={10} yStep={10} equalScale height={210} minHeight={140} labels={false} xLabel="" yLabel="">
        <Polygon points={[A, B, [B[0], s], [A[0], s]]} color={C.f} fillOpacity={0.3} weight={1.5} />
        <Polygon points={[D, A, [A[0], s]]} color={C.g} fillOpacity={0.3} weight={1.5} />
        <Polygon points={[B, Cc, [B[0], s]]} color={C.g} fillOpacity={0.3} weight={1.5} />
        <Polygon points={[A, B, Cc, D]} color={atD ? C.good : C.ink} fillOpacity={0} weight={2.5} />
        <Label at={D} attach="nw" size={13}>D</Label>
        <Label at={Cc} attach="ne" size={13}>C</Label>
        <Label at={A} attach="sw" size={13}>A</Label>
        <Label at={B} attach="se" size={13}>B</Label>
        <Label at={[CX, 0]} attach="s" size={12} italic>p</Label>
        <Label at={[B[0] + c / 2, s / 2]} attach="e" size={12} italic>p</Label>
        <Label at={[Cc[0] - 0.12, s]} attach="sw" size={12} italic>x</Label>
      </Plane>
      <div className="mt-3" />
      <Plane x={[0, HI]} y={[0, 1.4]} xStep={PI / 12} yStep={0.5} height={210} xLabel="x" yLabel="" xLabels={xl} yLabels={yl}>
        <Plot.OfX y={rect} domain={[0, HI]} color={C.f} weight={2} />
        <Plot.OfX y={tri} domain={[0, HI]} color={C.g} weight={2} />
        <Plot.OfX y={area} domain={[0, HI]} color={C.violet} weight={3} />
        <Line.Segment point1={[x, 0]} point2={[x, area(x)]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={x} y={rect(x)} color={C.f} />
        <Point x={x} y={tri(x)} color={C.g} />
        <Point x={x} y={area(x)} color={atD ? C.good : C.violet} />
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={move} min={LO} max={HI} step={PI / 240} format={v => `${num(v / PI, 3)}π`} />
        <Buttons>
          {OPTIONS.map(([letter, v]) => (
            <ActionButton key={letter} label={`Option ${letter}`} onClick={() => setX(v)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout tex={`\\text{rectangle } p^2\\sin x = ${num(rect(x), 2)}p^2`} color={C.f} />
          <Readout tex={`\\text{triangles } p^2\\sin x\\cos x = ${num(tri(x), 2)}p^2`} color={C.g} />
          <Readout tex={`A = ${num(area(x), 2)}p^2`} color={C.violet} />
          <Readout tex={`A'(x) = p^2(\\cos x + \\cos 2x) = ${num(slope, 2)}p^2`} color={C.ink} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
