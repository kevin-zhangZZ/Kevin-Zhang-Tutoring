// 2017 Specialist Exam 2 MCQ 1 — the implied domain of f(x) = 2cos⁻¹(1/x). cos⁻¹ only accepts
// inputs in [−1, 1], shown as a green band of y-values. Drag x along the axis and watch where
// y = 1/x sits: inside the band only when |x| ≥ 1, so the domain is (−∞, −1] ∪ [1, ∞). A toggle
// shades the wrong idea (option E, 12%) — keeping x itself in [−1, 1] — which is exactly where 1/x
// leaves the band.

import { useState } from 'react'
import {
  Buttons, C, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Region, Toggle, Controls,
  clamp, num,
} from './kit'

const X = 4
const YCLIP = 3.4

export default function Band() {
  const [x0, setX0] = useState(2)
  const [wrong, setWrong] = useState(false)

  const y0 = 1 / x0
  const edge = Math.abs(Math.abs(x0) - 1) < 1e-9
  const inside = Math.abs(y0) <= 1 + 1e-9
  const fx = inside ? 2 * Math.acos(clamp(y0, -1, 1)) : NaN
  const yShown = clamp(y0, -YCLIP, YCLIP)
  const ptColor = inside ? C.good : C.bad

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <b>Option E keeps <M>x</M> in <M>[-1,1]</M></b>, but the red strip is exactly where <M>{'\\tfrac1x'}</M> shoots
        out of the band: <M>x = 0.5</M> gives <M>{'\\cos^{-1}(2)'}</M>, which does not exist. The <M>[-1,1]</M> rule
        belongs to the <em>input of</em> <M>{'\\cos^{-1}'}</M>, which here is <M>{'\\tfrac1x'}</M>, not <M>x</M>. Drag
        the point into the red strip to check.
      </Notice>
    )
  } else if (edge) {
    notice = (
      <Notice tone="good">
        <b>The edge case:</b> <M>{`\\tfrac1x = ${x0 > 0 ? '1' : '-1'}`}</M> sits exactly on the edge of the band, and{' '}
        <M>{'\\cos^{-1}'}</M> is defined there (<M>{x0 > 0 ? '\\cos^{-1}(1) = 0' : '\\cos^{-1}(-1) = \\pi'}</M>). That is
        why the domain uses square brackets at <M>\pm1</M>.
      </Notice>
    )
  } else if (inside) {
    notice = (
      <Notice tone="good">
        Here <M>{`\\tfrac1x = ${num(y0, 3)}`}</M> is inside the green band, so <M>{'\\cos^{-1}\\left(\\tfrac1x\\right)'}</M>{' '}
        exists. Now drag the point towards <M>0</M>: the curve climbs (or falls) out of the band the moment <M>x</M>{' '}
        passes <M>1</M> (or <M>-1</M>). Big <M>x</M> means small <M>{'\\tfrac1x'}</M>, and that is what lands in the band.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        For <M>{`x = ${num(x0, 2)}`}</M>, <M>{`\\tfrac1x = ${num(y0, 2)}`}</M> lies outside the band, so{' '}
        <M>{'\\cos^{-1}\\left(\\tfrac1x\\right)'}</M> has no value. Every <M>x</M> strictly between <M>-1</M> and{' '}
        <M>1</M> does this, because dividing <M>1</M> by a number smaller than <M>1</M> in size gives something bigger
        than <M>1</M> in size.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-X, X]} y={[-3, 3]} height={300}>
        <Region top={() => 1} bottom={() => -1} from={-X} to={X} color={C.good} opacity={0.12} />
        {wrong && <Region top={() => 3.3} bottom={() => -3.3} from={-1} to={1} color={C.bad} opacity={0.14} />}
        <Line.Segment point1={[-X, 1]} point2={[X, 1]} color={C.good} style="dashed" weight={1.5} />
        <Line.Segment point1={[-X, -1]} point2={[X, -1]} color={C.good} style="dashed" weight={1.5} />
        <Label at={[2.7, 1]} attach="n" color={C.good}>y = 1</Label>
        <Label at={[-2.7, -1]} attach="s" color={C.good}>y = −1</Label>
        <Label at={[-3.9, 0.62]} attach="e" color={C.good} size={12}>inputs cos⁻¹ accepts</Label>

        <Plot.OfX y={x => 1 / x} domain={[-X, -1 / YCLIP]} color={C.f} weight={3} />
        <Plot.OfX y={x => 1 / x} domain={[1 / YCLIP, X]} color={C.f} weight={3} />
        <Label at={[0.42, 2.4]} attach="e" color={C.f}>y = 1/x</Label>

        {/* The domain, drawn on the x-axis */}
        <Line.Segment point1={[-X, 0]} point2={[-1, 0]} color={C.good} weight={5} />
        <Line.Segment point1={[1, 0]} point2={[X, 0]} color={C.good} weight={5} />
        {wrong && <Line.Segment point1={[-1, 0]} point2={[1, 0]} color={C.bad} weight={5} />}
        <Point x={-1} y={0} color={C.good} />
        <Point x={1} y={0} color={C.good} />

        <Line.Segment point1={[x0, 0]} point2={[x0, yShown]} color={ptColor} style="dashed" weight={2} />
        <Line.Segment point1={[0, yShown]} point2={[x0, yShown]} color={ptColor} style="dashed" weight={1.5} />
        {Math.abs(y0) <= YCLIP && <Point x={x0} y={y0} color={ptColor} />}
        <MovablePoint
          point={[x0, 0]}
          color={C.violet}
          constrain={([px]) => {
            let v = clamp(px, -X, X)
            if (Math.abs(Math.abs(v) - 1) < 0.06) v = Math.sign(v)
            if (Math.abs(v) < 0.15) v = v < 0 ? -0.15 : 0.15
            return [v, 0]
          }}
          onMove={([px]) => setX0(px)}
        />
      </Plane>
      <Controls>
        <Buttons>
          <Toggle label="Wrong idea: keep x itself in [−1, 1]" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`x = ${num(x0, 2)}`} />
          <Readout color={ptColor} tex={`\\tfrac1x = ${num(y0, 3)}`} />
          <Readout
            color={ptColor}
            tex={inside ? `f(x) = 2\\cos^{-1}\\!\\left(\\tfrac1x\\right) = ${num(fx, 3)}` : `\\cos^{-1}\\!\\left(${num(y0, 2)}\\right)\\ \\text{undefined}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
