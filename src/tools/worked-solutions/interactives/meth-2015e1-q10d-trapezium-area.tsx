// 2015 Methods Exam 1 Q10d — the report: many students "had difficulty in deriving the area
// function". Top: the trapezium CEDB under the tangent, with its two vertical parallel sides
// b = 2/sin θ and d = (2 − 2cos θ)/sin θ and width CE = 2, so A = (b + d)/2 × 2 = b + d.
// Bottom: A(θ) = (4 − 2cos θ)/sin θ, with the current θ marked. As θ → 0 the tangent becomes
// steep and b blows up; at θ = π/2 the tangent is the horizontal line y = 2, A = 4. In between the
// area dips to its minimum 2√3 ≈ 3.46 at θ = π/3 (b = 4/√3 ≈ 2.31, d = 2/√3 ≈ 1.15).

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider } from './kit'

const area = (t: number) => (4 - 2 * Math.cos(t)) / Math.sin(t)
const MIN_T = Math.PI / 3
const MIN_A = 2 * Math.sqrt(3)
const T0 = 0.45
const piLabel = (v: number) => {
  const k = Math.round(v / (Math.PI / 6))
  if (Math.abs(v - (k * Math.PI) / 6) > 1e-6) return ''
  return k === 1 ? 'π/6' : k === 2 ? 'π/3' : k === 3 ? 'π/2' : ''
}

export default function TrapeziumArea() {
  const [th, setTh] = useState(0.7)
  const c = Math.cos(th)
  const s = Math.sin(th)
  const b = 2 / s
  const d = (2 - 2 * c) / s
  const A = b + d
  const T: [number, number] = [2 + 2 * c, 2 * s]
  const atMin = Math.abs(th - MIN_T) < 0.015
  const atTop = Math.PI / 2 - th < 0.005

  return (
    <div>
      <Plane x={[-0.3, 5.3]} y={[-0.4, 4.8]} equalScale height={300} minHeight={170} xLabels={false}>
        <Polygon points={[[2, 0], [4, 0], [4, d], [2, b]]} color={atMin ? C.good : C.violet} fillOpacity={0.25} weight={1.5} />
        <Circle center={[2, 0]} radius={2} color={C.guide} fillOpacity={0} weight={1.5} />
        <Line.ThroughPoints point1={T} point2={[T[0] + s, T[1] - c]} color={C.g} weight={2.5} />
        <Line.Segment point1={[2, 0]} point2={[2, b]} color={C.f} weight={4} />
        <Line.Segment point1={[4, 0]} point2={[4, d]} color={C.f} weight={4} />
        <Point x={2} y={b} color={C.ink} />
        <Point x={4} y={d} color={C.ink} />
        <Point x={T[0]} y={T[1]} color={C.g} />
        <Label at={[2, 0]} attach="sw">C</Label>
        <Label at={[4, 0]} attach="se">E</Label>
        <Label at={[2, b]} attach="nw">B</Label>
        <Label at={[4, d]} attach="ne">D</Label>
        <Label at={[2, b / 2]} attach="w" color={C.f}>b</Label>
        <Label at={[4, d / 2]} attach="e" color={C.f}>d</Label>
        <Label at={[3, 0]} attach="n" color={C.violet}>CE = 2</Label>
      </Plane>
      <Plane
        x={[0, Math.PI / 2 + 0.05]}
        y={[0, 6]}
        xStep={Math.PI / 6}
        yStep={1}
        height={200}
        xLabel="θ"
        yLabel="A"
        xLabels={piLabel}
        label="Graph of the trapezium's area A against theta"
      >
        <Plot.OfX y={area} domain={[T0 - 0.05, Math.PI / 2]} color={C.violet} weight={3} />
        <Line.Segment point1={[MIN_T, 0]} point2={[MIN_T, MIN_A]} color={C.good} style="dashed" weight={1.5} />
        <Point x={MIN_T} y={MIN_A} color={C.good} />
        <Point x={th} y={A} color={C.ink} />
        <Label at={[MIN_T, MIN_A]} attach="s" color={C.good} gap={10}>2√3</Label>
      </Plane>
      <Controls>
        <Slider label="\theta" value={th} onChange={setTh} min={T0} max={Math.PI / 2} step={0.005} />
        <Readouts>
          <Readout color={C.f} tex={`b = \\frac{2}{\\sin\\theta} = ${b.toFixed(2)},\\quad d = \\frac{2-2\\cos\\theta}{\\sin\\theta} = ${d.toFixed(2)}`} />
          <Readout color={atMin ? C.good : C.violet} tex={`A = \\frac{b+d}{2}\\times 2 = b + d = ${A.toFixed(2)}`} />
        </Readouts>
        {atMin ? (
          <Notice tone="good">
            <b>Minimum:</b> at <M>{'\\theta = \\tfrac{\\pi}{3}'}</M>, <M>{'b = \\tfrac{4}{\\sqrt3} \\approx 2.31'}</M> and{' '}
            <M>{'d = \\tfrac{2}{\\sqrt3} \\approx 1.15'}</M>, so <M>{'A = \\tfrac{6}{\\sqrt3} = 2\\sqrt3 \\approx 3.46'}</M>. Move either
            way and the area grows.
          </Notice>
        ) : atTop ? (
          <Notice>
            At <M>{'\\theta = \\tfrac{\\pi}{2}'}</M> the tangent is the horizontal line <M>y = 2</M>, so <M>b = d = 2</M> and the
            trapezium is a square of area <M>4</M>. That is larger than <M>2\sqrt3</M>, so the endpoint is not the minimum.
          </Notice>
        ) : (
          <Notice>
            The trapezium&apos;s parallel sides are the vertical blue sides <M>b</M> and <M>d</M>; its width is <M>CE = 2</M>, so
            the <M>\tfrac12</M> cancels and <M>A = b + d</M>. Drag <M>\theta</M> down: the tangent steepens and <M>b</M> shoots up.
            Find the angle where the area (bottom graph) bottoms out.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
