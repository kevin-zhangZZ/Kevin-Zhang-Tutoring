// 2019 Methods Exam 1 Q1b — g′(1) is the gradient of g(x) = sin(πx)/(x + 1) where it crosses the
// x-axis at x = 1. Slide the tangent: at x = 1 it has gradient −π/2 (the graph is falling, so the
// answer must be negative). "Compare with sin(πx)" shows the numerator's tangent at the same x: at
// x = 1 the numerator is 0, so the quotient rule's "− sin(πx)·1" term vanishes and g′(1) is simply
// the numerator's gradient −π divided by x + 1 = 2. "cos π = 1 slip" draws the report's error: a
// line of gradient +π/2 through (1, 0), rising while the curve falls.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, tick } from './kit'

const PI = Math.PI
const g = (x: number) => Math.sin(PI * x) / (x + 1)
const dg = (x: number) => (PI * Math.cos(PI * x) * (x + 1) - Math.sin(PI * x)) / (x + 1) ** 2
const u = (x: number) => Math.sin(PI * x)
const du = (x: number) => PI * Math.cos(PI * x)
// Tick numbers only inside the plotted range (the plane pads its view a little past it).
const within = (lo: number, hi: number) => (v: number) => (v < lo - 1e-9 || v > hi + 1e-9 ? '' : tick(v))

export default function QuotientTangent() {
  const [x0, setX0] = useState(1)
  const [showU, setShowU] = useState(false)
  const [slip, setSlip] = useState(false)

  const at1 = Math.abs(x0 - 1) < 0.006
  const xs = at1 ? '1' : x0.toFixed(2)
  const y0 = g(x0)
  const m = dg(x0)

  let notice
  if (slip) {
    notice = (
      <Notice tone="warn">
        Taking <M>{'\\cos(\\pi) = 1'}</M> gives <M>{"g'(1) = \\tfrac{2\\pi}{4} = \\tfrac{\\pi}{2}"}</M>, the red line. It{' '}
        <b>rises</b> through <M>(1, 0)</M> while the curve <b>falls</b> through it, so it cannot be the tangent. On the
        unit circle, angle <M>\pi</M> is the point <M>(-1, 0)</M>, so <M>{'\\cos(\\pi) = -1'}</M>. A quick sketch of{' '}
        <M>{'\\sin(\\pi x)'}</M> crossing downwards at <M>x = 1</M> catches this sign.
      </Notice>
    )
  } else if (showU && at1) {
    notice = (
      <Notice tone="good">
        At <M>x = 1</M> the top <M>{'\\sin(\\pi x)'}</M> is <M>0</M>, so the quotient rule&apos;s second term{' '}
        <M>{'-\\sin(\\pi x)\\cdot 1'}</M> vanishes. What&apos;s left is the numerator&apos;s gradient{' '}
        <M>{'\\pi\\cos(\\pi) = -\\pi'}</M> (orange dashed) divided by <M>{"{x + 1 = 2}"}</M>: the violet tangent is exactly
        half as steep. Slide away from <M>1</M> and that simple halving stops, because the second term comes back.
      </Notice>
    )
  } else if (showU) {
    notice = (
      <Notice>
        Here <M>{`\\sin(\\pi x) = ${u(x0).toFixed(2)}`}</M> is not zero, so both terms of the quotient rule count and{' '}
        <M>g&apos;</M> is not just the orange gradient divided by <M>x + 1</M>. Slide back to <M>x = 1</M>, where the
        second term drops out.
      </Notice>
    )
  } else if (at1) {
    notice = (
      <Notice>
        The violet tangent at <M>x = 1</M> has gradient <M>{"g'(1) = -\\tfrac{\\pi}{2} \\approx -1.571"}</M>. The graph
        crosses the <M>x</M>-axis going <b>down</b> here, so the answer had to be negative. Turn on &ldquo;Compare with{' '}
        <M>{'\\sin(\\pi x)'}</M>&rdquo; to see where the <M>{'\\tfrac{\\pi}{2}'}</M> comes from.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The violet line is the tangent at <M>{`x = ${xs}`}</M>; its gradient comes from the quotient-rule formula for{' '}
        <M>g&apos;(x)</M>. The question only asks about <M>x = 1</M>: slide back there, where the curve crosses the{' '}
        <M>x</M>-axis.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.3, 3.2]} y={[-1.3, 1.2]} xStep={0.5} yStep={0.5} height={300} xLabels={within(-0.3, 3.2)} yLabels={within(-1.3, 1.2)}>
        {showU && <Plot.OfX y={u} domain={[-0.3, 3.2]} color={C.g} weight={2} />}
        {showU && <Line.PointSlope point={[x0, u(x0)]} slope={du(x0)} color={C.g} style="dashed" weight={2} />}
        {showU && <Label at={[2.5, 1]} color={C.g} attach="n">sin(πx)</Label>}
        <Plot.OfX y={g} domain={[-0.3, 3.2]} color={C.f} weight={3} />
        <Label at={[2.5, g(2.5)]} color={C.f} attach="n">g</Label>
        {slip && <Line.PointSlope point={[1, 0]} slope={PI / 2} color={C.bad} style="dashed" weight={2.5} />}
        <Line.PointSlope point={[x0, y0]} slope={m} color={C.violet} weight={2.5} />
        {showU && <Point x={x0} y={u(x0)} color={C.g} />}
        <Point x={x0} y={y0} color={C.violet} />
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={-0.2} max={3} step={0.01} />
        <Buttons>
          <Toggle label="Compare with sin(πx)" checked={showU} onChange={setShowU} />
          <Toggle label="cos π = 1 slip" checked={slip} onChange={setSlip} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`g'(${xs}) = ${at1 ? '-\\tfrac{\\pi}{2} \\approx ' : ''}${m.toFixed(3)}`} />
          {showU && <Readout color={C.g} tex={`\\text{gradient of }\\sin(\\pi x) = ${du(x0).toFixed(3)}`} />}
          {slip && <Readout color={C.bad} tex={`\\text{slip: } +\\tfrac{\\pi}{2} \\approx ${(PI / 2).toFixed(3)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
