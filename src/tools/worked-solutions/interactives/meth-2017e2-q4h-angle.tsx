// 2017 Methods Exam 2 Q4h — why there are two values of k. L₁: y = 2kx and L₂: y = x/(2k) are the
// tangents at the origin to gₖ and gₖ⁻¹; they are mirror images in y = x, so each makes the same
// angle with y = x and the angle between them is |β − γ| where tan β = 2k, tan γ = 1/(2k).
// Top: the two tangents with the angle marked. Bottom: the angle between them against k, which
// falls from 90° to 0° at k = 1/2 (the lines coincide with y = x) and rises again, so the 30° line
// is crossed twice: k = √3/6 (L₁ is the flatter line) and k = √3/2 (L₁ is the steeper line).

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const DEG = 180 / Math.PI
const K1 = Math.sqrt(3) / 6
const K2 = Math.sqrt(3) / 2
const angleBetween = (k: number) => Math.abs(Math.atan(2 * k) - Math.atan(1 / (2 * k))) * DEG
const g = (k: number) => (x: number) => 2 * Math.exp(k * x) - 2
const gInv = (k: number) => (x: number) => Math.log((x + 2) / 2) / k

export default function TangentAngle() {
  const [k, setK] = useState(1)
  const beta = Math.atan(2 * k)
  const gamma = Math.atan(1 / (2 * k))
  const theta = Math.abs(beta - gamma) * DEG
  const lo = Math.min(beta, gamma)
  const hi = Math.max(beta, gamma)
  const R = 1
  const mid = (lo + hi) / 2
  const at = (k0: number) => Math.abs(k - k0) < 0.003
  const L1: [number, number] = [2.1 * Math.cos(beta), 2.1 * Math.sin(beta)]
  const L2: [number, number] = [2.1 * Math.cos(gamma), 2.1 * Math.sin(gamma)]

  let notice
  if (at(K2)) {
    notice = (
      <Notice tone="good">
        <M>{'k=\\tfrac{\\sqrt3}{2}'}</M>: <M>{'\\tan\\beta=\\sqrt3'}</M>, so <M>{'L_1'}</M> is at <M>60^\circ</M> and{' '}
        <M>{'L_2'}</M> at <M>30^\circ</M>. Each is <M>15^\circ</M> from <M>y=x</M>, and the gap is <M>30^\circ</M>. Now
        press the other button.
      </Notice>
    )
  } else if (at(K1)) {
    notice = (
      <Notice tone="good">
        <M>{'k=\\tfrac{\\sqrt3}{6}'}</M>: now <M>{'\\tan\\beta=\\tfrac{1}{\\sqrt3}'}</M>, so <M>{'L_1'}</M> is the{' '}
        <em>flatter</em> line at <M>30^\circ</M> and <M>{'L_2'}</M> the steeper one at <M>60^\circ</M>. Same{' '}
        <M>30^\circ</M> gap, lines swapped: this is the second answer, and the easy one to miss if you assume <M>{'L_1'}</M> is always the
        steeper line.
      </Notice>
    )
  } else if (Math.abs(k - 0.5) < 0.01) {
    notice = (
      <Notice>
        At <M>{'k=\\tfrac12'}</M> both gradients are <M>1</M>: the two tangents are the same line, <M>y=x</M>, and the
        angle is <M>0^\circ</M>. On either side of this, the lines open up again, one on each side of{' '}
        <M>y=x</M>. That is why the lower graph is a V.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{'L_1'}</M> and <M>{'L_2'}</M> are mirror images in <M>y=x</M> (gradients <M>2k</M> and{' '}
        <M>{'\\tfrac{1}{2k}'}</M>), so each sits the same angle from <M>y=x</M>. Slide <M>k</M> down through{' '}
        <M>{'\\tfrac12'}</M> and watch the purple dot on the lower graph: it meets the <M>30^\circ</M> line{' '}
        <em>twice</em>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.2, 2.2]} y={[-2.2, 2.2]} equalScale height={360}>
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={g(k)} domain={[-2.2, 2.2]} color={C.f} weight={1.5} opacity={0.45} />
        <Plot.OfX y={gInv(k)} domain={[-1.999, 2.2]} color={C.g} weight={1.5} opacity={0.45} />
        <Line.PointSlope point={[0, 0]} slope={2 * k} color={C.f} weight={3} />
        <Line.PointSlope point={[0, 0]} slope={1 / (2 * k)} color={C.g} weight={3} />
        {hi - lo > 0.01 && (
          <Plot.Parametric xy={s => [R * Math.cos(s), R * Math.sin(s)]} domain={[lo, hi]} color={C.violet} weight={3} />
        )}
        <Point x={0} y={0} color={C.ink} />
        <Label at={[1.25 * Math.cos(mid), 1.25 * Math.sin(mid)]} color={C.violet} attach="c" size={13}>
          {`${theta.toFixed(1)}°`}
        </Label>
        <Label at={L1} color={C.f} attach={beta > gamma ? 'w' : 's'}>L₁</Label>
        <Label at={L2} color={C.g} attach={beta > gamma ? 's' : 'w'}>L₂</Label>
        <Label at={[-2, -2]} color={C.guide} attach="se" size={12}>y = x</Label>
      </Plane>
      <Plane x={[0, 2]} y={[-18, 108]} xStep={0.5} yStep={30} height={200} xLabel="k" yLabel="θ" yLabels={v => (v < 0 || v > 90 ? "" : String(v))}>
        <Line.Segment point1={[0, 30]} point2={[2, 30]} color={C.bad} style="dashed" weight={1.5} />
        <Plot.OfX y={angleBetween} domain={[0.02, 2]} color={C.violet} weight={2.5} />
        <Point x={K1} y={30} color={C.good} />
        <Point x={K2} y={30} color={C.good} />
        <Point x={k} y={theta} color={C.violet} />
        <Label at={[2, 30]} color={C.bad} attach="nw" size={12}>30°</Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={0.1} max={2} step={0.005} format={v => v.toFixed(3)} />
        <Buttons>
          <ActionButton label="k = √3/6" onClick={() => setK(K1)} />
          <ActionButton label="k = √3/2" onClick={() => setK(K2)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\beta=\\tan^{-1}(2k)=${(beta * DEG).toFixed(1)}^\\circ`} />
          <Readout color={C.g} tex={`\\gamma=\\tan^{-1}\\!\\left(\\tfrac{1}{2k}\\right)=${(gamma * DEG).toFixed(1)}^\\circ`} />
          <Readout color={C.violet} tex={`|\\beta-\\gamma|=${theta.toFixed(1)}^\\circ`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
