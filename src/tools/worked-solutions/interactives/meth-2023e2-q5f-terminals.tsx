// 2023 Methods Exam 2 Q5f — with k = 5, h and the inverse of h1 cross twice, but only the right
// crossing (x ≈ 8.78) is on y = x: there h1 meets its own inverse. The left crossing (x ≈ 1.45)
// is h's LEFT branch meeting the inverse, well off the line. A toggle shades the report's common
// wrong terminal, x ≈ 2.486 where h meets y = x, and shows the area it loses.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Toggle, integrate } from './kit'

const K = 5
const h = (x: number) => (Math.exp(K - x) + Math.exp(x - K)) / K
const hInv = (x: number) => Math.log((K / 2) * x + 0.5 * Math.sqrt(Math.max(0, K * K * x * x - 4))) + K

function root(fn: (x: number) => number, a: number, b: number) {
  let lo = a
  let hi = b
  for (let i = 0; i < 80; i++) {
    const m = (lo + hi) / 2
    if (Math.sign(fn(m)) === Math.sign(fn(lo))) lo = m
    else hi = m
  }
  return (lo + hi) / 2
}

const A = root(x => h(x) - hInv(x), 0.41, 3)
const B = root(x => h(x) - hInv(x), 3, 12)
const W = root(x => h(x) - x, 0.5, 5)
const AREA = integrate(x => hInv(x) - h(x), A, B, 400)
const WRONG = integrate(x => hInv(x) - h(x), W, B, 400)

export default function Terminals() {
  const [wrong, setWrong] = useState(false)

  return (
    <div>
      <Plane x={[0, 10]} y={[0, 10]} xStep={1} yStep={1} equalScale height={380}>
        {!wrong && <Region top={hInv} bottom={h} from={A} to={B} color={C.good} opacity={0.25} />}
        {wrong && (
          <>
            <Region top={hInv} bottom={h} from={A} to={W} color={C.bad} opacity={0.4} />
            <Region top={hInv} bottom={h} from={W} to={B} color={C.guide} opacity={0.25} />
            <Line.Segment point1={[W, 0]} point2={[W, hInv(W)]} color={C.bad} style="dashed" weight={2} />
          </>
        )}
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={h} color={C.f} weight={3} />
        <Plot.Parametric xy={t => [h(t), t]} domain={[K, 12]} color={C.g} weight={3} />
        <Point x={A} y={h(A)} color={C.good} />
        <Point x={B} y={B} color={C.good} />
        {wrong && <Point x={W} y={W} color={C.bad} />}
        <Label at={[A, h(A)]} attach="e" color={C.good}>{`x ≈ ${A.toFixed(2)}`}</Label>
        <Label at={[B, B]} attach="nw" color={C.good}>{`x ≈ ${B.toFixed(2)}`}</Label>
        {wrong && <Label at={[W, W]} attach="se" color={C.bad}>{`x ≈ ${W.toFixed(3)}`}</Label>}
        <Label at={[1.2, 1.2]} color={C.guide} attach="nw">y = x</Label>
        <Label at={[6.6, h(6.6)]} color={C.f} attach="e">h</Label>
        <Label at={[4.5, hInv(4.5)]} color={C.g} attach="n">inverse of h₁</Label>
      </Plane>
      <Controls>
        <Buttons>
          <Toggle label="Use x ≈ 2.486 (h meets y = x)" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.good} tex={`\\int_{${A.toFixed(5)}}^{${B.toFixed(5)}}\\left(h_1^{-1}(x)-h(x)\\right)dx\\approx${AREA.toFixed(2)}`} />
          {wrong && <Readout color={C.bad} tex={`\\int_{${W.toFixed(3)}}^{${B.toFixed(2)}}\\left(h_1^{-1}-h\\right)dx\\approx${WRONG.toFixed(2)}`} />}
        </Readouts>
        {wrong ? (
          <Notice tone="warn">
            Starting at <M>{`x\\approx${W.toFixed(3)}`}</M>, where <M>h</M> crosses <M>y=x</M>, cuts off the red piece:
            the area drops to <M>{`${WRONG.toFixed(2)}`}</M>. Nothing special happens to the region at that line,
            because the inverse of <M>h_1</M> is still far above. The region only closes where <M>h</M> actually meets
            the inverse, at <M>{`x\\approx${A.toFixed(2)}`}</M>.
          </Notice>
        ) : (
          <Notice>
            Two crossings, but only the right one, <M>{`x\\approx${B.toFixed(2)}`}</M>, is on <M>y=x</M>: there the
            right branch <M>h_1</M> meets its own inverse. The left one, at{' '}
            <M>{`\\left(${A.toFixed(2)},\\ ${h(A).toFixed(2)}\\right)`}</M>, is <M>h</M>&rsquo;s <em>left</em> branch
            meeting the inverse, well off the line. Turn on the toggle to see the common wrong terminal.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
