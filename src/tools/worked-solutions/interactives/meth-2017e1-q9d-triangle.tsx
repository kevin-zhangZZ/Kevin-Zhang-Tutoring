// 2017 Methods Exam 1 Q9d — the whole family of triangles ABC. Slide θ: AC is the tangent to
// f(x) = √x(1 − x) with gradient tan θ, BC the tangent with gradient −1/tan θ (perpendicular), and
// C is where the two tangent lines cross. At θ = 45° BC touches the curve at its endpoint (1, 0),
// so B is the contact point (part c), AC touches at (1/9, 8/27), and C = (11/27, 16/27), directly
// above the midpoint of AB (right isosceles check). Below 45° no tangent is steep enough for BC,
// which is why the question restricts 45° ≤ θ < 90°.
// Contact point for gradient m: with a = √x, f'(x) = m ⟺ 3a² + 2ma − 1 = 0, a = (−m + √(m² + 3))/3.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, num, tick,
} from './kit'

const f = (x: number) => Math.sqrt(Math.max(0, x)) * (1 - x)
// Tick numbers only at multiples of 1/2, so the phone-width axis is not crowded.
const halves = (v: number) => (Math.abs(v * 2 - Math.round(v * 2)) < 1e-9 ? tick(v) : "")
const contact = (m: number) => {
  const a = (-m + Math.sqrt(m * m + 3)) / 3
  return a * a
}

export default function Triangle() {
  const [deg, setDeg] = useState(55)
  const th = (deg * Math.PI) / 180
  const at45 = deg === 45
  const mA = at45 ? 1 : Math.tan(th)
  const mB = -1 / mA
  const okB = deg >= 45

  const P = at45 ? 1 / 9 : contact(mA)
  const fP = f(P)
  const A = P - fP / mA
  const Q = at45 ? 1 : Math.min(1, contact(mB))
  const fQ = f(Q)
  const B = Q - fQ / mB
  const xc = (fQ - fP + mA * P - mB * Q) / (mA - mB)
  const yc = fP + mA * (xc - P)

  // Right-angle marker at C and the θ arc at A.
  const s = 0.045
  const len = (dx: number, dy: number) => Math.hypot(dx, dy)
  const uA: [number, number] = [(A - xc) / len(A - xc, -yc), -yc / len(A - xc, -yc)]
  const uB: [number, number] = [(B - xc) / len(B - xc, -yc), -yc / len(B - xc, -yc)]
  const r = 0.09

  let notice
  if (!okB) {
    notice = (
      <Notice tone="warn">
        <M>BC</M> must be perpendicular to <M>AC</M>, so its gradient would be{' '}
        <M>{`-\\tfrac{1}{\\tan\\theta}\\approx ${num(mB, 2)}`}</M>, steeper than <M>-1</M>. But the steepest downhill
        tangent on the graph is at <M>x=1</M>, with gradient exactly <M>-1</M>. No tangent is steep enough, so there is no
        triangle: that is why the question insists <M>{'45^\\circ\\le\\theta'}</M>.
      </Notice>
    )
  } else if (at45) {
    notice = (
      <Notice tone="good">
        <b>At <M>{'\\theta=45^\\circ'}</M>, <M>BC</M> has gradient <M>-1</M></b>, the steepest the curve ever gets, at its
        very end, so <M>BC</M> touches at <M>(1,0)</M>: <M>B</M> itself (part c). <M>AC</M> touches at{' '}
        <M>{'\\left(\\tfrac19,\\tfrac8{27}\\right)'}</M>, so it is <M>{'y=x+\\tfrac5{27}'}</M>, and <M>C</M> is where the
        two lines cross. Check with the dashed line: both base angles are <M>{'45^\\circ'}</M>, so <M>C</M> sits above the
        midpoint of <M>AB</M>, at a height of half of <M>AB</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        A steeper <M>AC</M> (gradient <M>\tan\theta</M>) forces a flatter <M>BC</M> (gradient{' '}
        <M>{'-\\tfrac1{\\tan\\theta}'}</M>), whose contact point slides back up the curve and pushes <M>B</M> out past{' '}
        <M>x=1</M>. Drag <M>\theta</M> down to <M>{'45^\\circ'}</M>, the smallest angle allowed, and watch <M>BC</M>&apos;s
        contact point land exactly on <M>B</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.4, 1.55]} y={[-0.12, 0.8]} xStep={0.25} yStep={0.25} height={340} equalScale xLabels={v => (v < 0 ? "" : halves(v))} yLabels={v => (Math.abs(v - 0.5) < 1e-9 ? tick(v) : "")}>
        <Plot.OfX y={f} domain={[0, 1]} color={C.f} weight={3} />
        <Plot.Parametric xy={t => [A + r * Math.cos(t), r * Math.sin(t)]} domain={[0, th]} color={C.ink} weight={1.5} />
        <Label at={[A + (r + 0.02) * Math.cos(th / 2), (r + 0.02) * Math.sin(th / 2)]} attach="e" gap={2}>θ</Label>
        {okB ? (
          <>
            {at45 && (
              <Line.Segment point1={[xc, yc]} point2={[xc, 0]} color={C.guide} style="dashed" weight={1.5} />
            )}
            <Line.Segment point1={[A, 0]} point2={[xc, yc]} color={C.g} weight={2.5} />
            <Line.Segment point1={[B, 0]} point2={[xc, yc]} color={C.violet} weight={2.5} />
            <Polygon
              points={[
                [xc, yc],
                [xc + s * uA[0], yc + s * uA[1]],
                [xc + s * (uA[0] + uB[0]), yc + s * (uA[1] + uB[1])],
                [xc + s * uB[0], yc + s * uB[1]],
              ]}
              color={C.ink}
              fillOpacity={0}
              weight={1.5}
            />
            <Point x={A} y={0} color={C.ink} />
            <Point x={B} y={0} color={C.ink} />
            <Point x={P} y={fP} color={C.g} />
            <Point x={Q} y={fQ} color={C.violet} />
            <Point x={xc} y={yc} color={C.good} />
            <Label at={[A, 0]} attach="nw">A</Label>
            <Label at={[B, 0]} attach="ne">B</Label>
            <Label at={[xc, yc]} attach="n" color={C.good}>C</Label>
          </>
        ) : (
          <>
            <Line.Segment point1={[A, 0]} point2={[P + 0.35, fP + 0.35 * mA]} color={C.g} weight={2.5} />
            <Point x={P} y={fP} color={C.g} />
            <Point x={A} y={0} color={C.ink} />
            <Label at={[A, 0]} attach="nw">A</Label>
            <Line.PointSlope point={[1, 0]} slope={-1} color={C.guide} style="dashed" weight={1.5} />
            <Point x={1} y={0} color={C.guide} />
            <Label at={[0.62, 0.38]} attach="ne" color={C.guide}>steepest tangent: gradient −1</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider
          label="\theta"
          value={deg}
          onChange={v => setDeg(Math.round(v * 2) / 2)}
          min={35}
          max={70}
          step={0.5}
          format={v => `${v.toFixed(1)}°`}
        />
        <Readouts>
          <Readout color={C.g} tex={`m_{AC}=\\tan\\theta = ${at45 ? '1' : num(mA, 3)}`} />
          {okB && <Readout color={C.violet} tex={`m_{BC}=-\\tfrac{1}{\\tan\\theta} = ${at45 ? '-1' : num(mB, 3)}`} />}
          <Readout
            color={C.g}
            tex={at45 ? `AC\\text{ touches at }\\left(\\tfrac19,\\tfrac8{27}\\right)` : `AC\\text{ touches at }x\\approx ${num(P, 3)}`}
          />
          {okB && (
            <Readout
              color={C.violet}
              tex={at45 ? `BC\\text{ touches at }(1,0)=B` : `BC\\text{ touches at }x\\approx ${num(Q, 3)}`}
            />
          )}
          {okB && (
            <Readout
              color={C.good}
              tex={
                at45
                  ? `C=\\left(\\tfrac{11}{27},\\tfrac{16}{27}\\right)\\approx(0.407,\\,0.593)`
                  : `C\\approx(${num(xc, 3)},\\,${num(yc, 3)})`
              }
            />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
