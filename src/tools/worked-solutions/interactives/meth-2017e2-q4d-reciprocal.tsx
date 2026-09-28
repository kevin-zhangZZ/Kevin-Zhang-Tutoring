// 2017 Methods Exam 2 Q4d — why the gradient of f⁻¹ is the reciprocal of the gradient of f.
// P = (a, f(a)) on f(x) = 2^(x+1) − 2 with its tangent and a run/rise triangle; the mirror point
// P′ = (f(a), a) on f⁻¹ with the mirrored tangent and triangle. Reflection in y = x swaps run and
// rise, so the gradient m becomes 1/m. Slide a to 0: P and P′ merge at the origin, giving
// f′(0) = 2 logₑ2 and (f⁻¹)′(0) = 1/(2 logₑ2). A toggle draws the negative reciprocal (a normal,
// not a tangent) to show it is the wrong idea.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, Toggle, num } from './kit'

const f = (x: number) => 2 ** (x + 1) - 2
const df = (x: number) => 2 ** (x + 1) * Math.LN2
const fInv = (x: number) => Math.log2(x + 2) - 1
const RUN = 0.6

export default function Reciprocal() {
  const [a, setA] = useState(-1.2)
  const [neg, setNeg] = useState(false)
  const m = df(a)
  const fa = f(a)
  const atO = Math.abs(a) < 0.005
  const P: [number, number] = [a, fa]
  const Q: [number, number] = [fa, a]
  const t = (s: string) => s.replace('−', '-')

  let notice
  if (neg) {
    notice = (
      <Notice tone="warn">
        The red line has gradient <M>{'-\\tfrac1m'}</M>. It is perpendicular to the tangent at <M>P'</M>, so it cuts
        straight across <M>{'f^{-1}'}</M> instead of touching it. The negative reciprocal belongs to normals; a
        reflection in <M>y=x</M> gives the plain reciprocal.
      </Notice>
    )
  } else if (atO) {
    notice = (
      <Notice tone="good">
        At <M>a=0</M> the point is its own mirror image, so both tangents start at the origin:{' '}
        <M>{"f'(0)=2\\log_e 2\\approx1.386"}</M> and <M>{"(f^{-1})'(0)=\\tfrac{1}{2\\log_e 2}\\approx0.721"}</M>.
        Their product is <M>1</M>. The steeper line is above <M>y=x</M>, the flatter one the same angle below it.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        On <M>f</M>, the triangle goes <b>across</b> {num(RUN, 1)} and <b>up</b> {num(RUN, 1)}·m. Its mirror image on{' '}
        <M>{'f^{-1}'}</M> goes across {num(RUN, 1)}·m and up {num(RUN, 1)}: run and rise have swapped, so the
        gradient is <M>{'\\tfrac1m'}</M>. Now slide <M>a</M> to <M>0</M>, the point the question asks about.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 2]} y={[-3, 2]} equalScale height={420}>
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={f} domain={[-3, 0.6]} color={C.f} weight={3} />
        <Plot.OfX y={fInv} domain={[-1.9995, 2]} color={C.g} weight={3} />
        <Line.PointSlope point={P} slope={m} color={C.f} weight={1.5} />
        <Line.PointSlope point={Q} slope={1 / m} color={C.g} weight={1.5} />
        {neg && <Line.PointSlope point={Q} slope={-1 / m} color={C.bad} weight={2} style="dashed" />}
        <Polygon points={[P, [a + RUN, fa], [a + RUN, fa + RUN * m]]} color={C.f} fillOpacity={0.25} weight={1} />
        <Polygon points={[Q, [fa, a + RUN], [fa + RUN * m, a + RUN]]} color={C.g} fillOpacity={0.25} weight={1} />
        <Point x={P[0]} y={P[1]} color={C.f} />
        <Point x={Q[0]} y={Q[1]} color={C.g} />
        {!atO && <Label at={P} color={C.f} attach="nw">P</Label>}
        {!atO && <Label at={Q} color={C.g} attach="se">P′</Label>}
        <Label at={[-2.6, f(-2.6)]} color={C.f} attach="n">f</Label>
        <Label at={[1.6, fInv(1.6)]} color={C.g} attach="s">f⁻¹</Label>
        <Label at={[-2.6, -2.6]} color={C.guide} attach="se" size={12}>y = x</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={-2.5} max={0.8} step={0.01} />
        <Toggle label="Use the negative reciprocal" checked={neg} onChange={setNeg} />
        <Readouts>
          <Readout color={C.f} tex={`f'(${t(num(a))}) = ${num(m, 3)}`} />
          <Readout color={C.g} tex={`(f^{-1})'(${t(num(fa, 2))}) = ${num(1 / m, 3)}`} />
          <Readout tex={`\\text{product} = 1`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
