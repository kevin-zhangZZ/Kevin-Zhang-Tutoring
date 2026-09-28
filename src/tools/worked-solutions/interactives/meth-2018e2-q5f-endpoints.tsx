// 2018 Methods Exam 2 Q5f — when do g and g⁻¹ have the same endpoints? g(x) = 81x²(a − x)/(4a⁴)
// on [0, 2a/3] ends at P(2a/3, 3/a); g⁻¹ ends at its mirror image P′(3/a, 2a/3). Both start at the
// origin, so the endpoints match exactly when P is its own reflection, i.e. when P is on y = x.
// As a varies, P slides along the hyperbola xy = 2 (part d: (2a/3)·g(2a/3) = 2), and it meets
// y = x at (√2, √2): 2a/3 = √2 gives a = 3√2/2.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle,
} from './kit'

const gOf = (a: number) => (x: number) => (81 * x * x * (a - x)) / (4 * a ** 4)
const KEY = (3 * Math.SQRT2) / 2

export default function Endpoints() {
  const [a, setA] = useState(1.5)
  const [path, setPath] = useState(true)
  const g = gOf(a)
  const W = (2 * a) / 3
  const H = 3 / a
  const hit = Math.abs(a - KEY) < 0.012
  const above = a < KEY

  return (
    <div>
      <Plane x={[-0.2, 3.3]} y={[-0.2, 3.3]} xStep={1} yStep={1} height={400} equalScale>
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={2} />
        {path && <Plot.OfX y={x => 2 / x} domain={[0.69, 2.9]} color={C.violet} style="dashed" weight={2} />}
        <Plot.OfX y={g} domain={[0, W]} color={C.f} weight={3} />
        <Plot.Parametric xy={s => [g(s), s]} domain={[0, W]} color={C.g} weight={3} />
        {hit ? (
          <>
            <Point x={Math.SQRT2} y={Math.SQRT2} color={C.good} />
            <Label at={[Math.SQRT2, Math.SQRT2]} attach="e" gap={14} color={C.good}>(√2, √2)</Label>
          </>
        ) : (
          <>
            <Point x={W} y={H} color={C.f} />
            <Point x={H} y={W} color={C.g} />
            <Label at={[W, H]} attach={above ? 'ne' : 'n'} color={C.f}>P</Label>
            <Label at={[H, W]} attach={above ? 'ne' : 'e'} color={C.g}>P′</Label>
          </>
        )}
        <Point x={0} y={0} color={C.ink} />
        {path && <Label at={[2.75, 2 / 2.75]} attach="n" color={C.violet}>xy = 2</Label>}
        <Label at={[2.3, 2.3]} attach="nw" color={C.guide}>y = x</Label>
        <Label at={[0.5 * W, g(0.5 * W)]} attach="se" color={C.f}>g</Label>
        <Label at={[g(0.5 * W), 0.5 * W]} attach="nw" color={C.g}>g⁻¹</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={1.2} max={3.75} step={0.01} />
        <Buttons>
          <ActionButton label="Set a = 3√2/2" onClick={() => setA(KEY)} />
          <Toggle label="Show the path of P (xy = 2)" checked={path} onChange={setPath} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`P = \\left(\\tfrac{2a}{3}, \\tfrac{3}{a}\\right) = (${W.toFixed(3)},\\ ${H.toFixed(3)})`} />
          <Readout color={C.g} tex={`P' = \\left(\\tfrac{3}{a}, \\tfrac{2a}{3}\\right) = (${H.toFixed(3)},\\ ${W.toFixed(3)})`} />
          <Readout color={C.violet} tex={`\\tfrac{2a}{3}\\times\\tfrac{3}{a} = ${(W * H).toFixed(2)}`} />
        </Readouts>
        {hit ? (
          <Notice tone="good">
            At <M>{'a = \\tfrac{3\\sqrt2}{2} \\approx 2.121'}</M> the two coordinates are equal,{' '}
            <M>{'\\tfrac{2a}{3} = \\tfrac3a = \\sqrt2'}</M>, so <M>P</M> is on the mirror line and is its own reflection.
            Now <M>g</M> and <M>{'g^{-1}'}</M> share both endpoints, <M>(0, 0)</M> and <M>{'(\\sqrt2, \\sqrt2)'}</M>.
          </Notice>
        ) : (
          <Notice>
            <M>g</M> ends at <M>P</M>, and <M>{'g^{-1}'}</M> ends at its mirror image <M>{"P'"}</M>. They can only be the
            same point if <M>P</M> is on <M>y = x</M>, i.e. <M>{'\\tfrac{2a}{3} = \\tfrac3a'}</M>; right now <M>P</M> is{' '}
            {above ? 'above' : 'below'} the line. As <M>a</M> changes, <M>P</M> slides along the violet curve{' '}
            <M>xy = 2</M> (that is part d.), so drag <M>a</M> until <M>P</M> reaches <M>y = x</M>.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
