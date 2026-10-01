// 2021 Methods Exam 1 Q4b — reading 1 − 2/(x − 2) ≥ 3 off the graph. Slide a test value of x and
// look up at the curve: it is on or above the line y = 3 only from x = 1 up to the vertical
// asymptote x = 2, so the answer is [1, 2). Past x = 2 the right branch never rises above y = 1.
// A toggle overlays the algebra-only answer x ≥ 1 (solve the equation, keep the lower bound) and
// marks in red the whole right-hand stretch it wrongly includes.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle, clamp, num,
} from './kit'

const f = (x: number) => 1 - 2 / (x - 2)
// The visible window (Plane pads the ranges by 7–8 %), used to keep the guide line on the plane.
const YVIS: [number, number] = [-4.8, 6.8]

function Hollow({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 4.5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2 } }} />
}

export default function UpperBound() {
  const [t, setT] = useState(1.5)
  const [algebra, setAlgebra] = useState(false)

  const atAsym = Math.abs(t - 2) < 0.026
  const atOne = Math.abs(t - 1) < 0.026
  const ft = f(t)
  const ok = !atAsym && ft >= 3 - 1e-9
  const col = ok ? C.good : C.bad
  const tip = atAsym ? 0 : clamp(ft, YVIS[0], YVIS[1])
  const onPlane = !atAsym && ft >= YVIS[0] && ft <= YVIS[1]
  const fTex = num(ft, 2)
  // f is exactly a 2 d.p. value at x = 1, 0, 3, 4, ... — show "=" there rather than "≈".
  const approx = Math.abs(ft * 100 - Math.round(ft * 100)) < 1e-6 ? '=' : '\\approx'

  let notice
  if (atAsym) {
    notice = (
      <Notice tone="warn">
        <b>At <M>x = 2</M> the function is undefined</b>: the denominator <M>x - 2</M> is zero. So <M>2</M> can never
        be in the answer, which is why the interval closes with a round bracket. Keep dragging right, onto the other
        branch.
      </Notice>
    )
  } else if (algebra && t <= 2) {
    notice = (
      <Notice tone="warn">
        The algebra-only answer <M>x \ge 1</M> agrees with the graph on <M>[1, 2)</M>, but it also claims the{' '}
        <b>red stretch</b> of the <M>x</M>-axis past <M>2</M>. Drag <M>x</M> into the red stretch and read off{' '}
        <M>f(x)</M>.
      </Notice>
    )
  } else if (algebra) {
    notice = (
      <Notice tone="warn">
        <M>x \ge 1</M> says <M>x = {num(t, 2)}</M> works, but here <M>{`f(x) ${approx} ${fTex}`}</M>, nowhere near{' '}
        <M>3</M>. Solving the <em>equation</em> <M>{'1 - \\frac{2}{x-2} = 3'}</M> finds the crossing at <M>x = 1</M>,
        but it can&apos;t see the asymptote at <M>x = 2</M>. The graph shows the curve escaping to{' '}
        <M>{'+\\infty'}</M> there and reappearing below <M>y = 1</M>.
      </Notice>
    )
  } else if (atOne) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = 1</M> the curve meets the line exactly</b>: <M>f(1) = 3</M>. The inequality is <M>\ge</M>, so{' '}
        <M>1</M> is included (square bracket). This is the bound that solving the equation gives you. Now drag right
        to find the other one.
      </Notice>
    )
  } else if (t < 1) {
    notice = (
      <Notice>
        Here the curve is at <M>{`f(x) ${approx} ${fTex}`}</M>, <b>below</b> the orange line <M>y = 3</M>, so this{' '}
        <M>x</M> fails. The left branch climbs as <M>x</M> increases and first reaches <M>3</M> at <M>x = 1</M>.
      </Notice>
    )
  } else if (t < 2) {
    notice = (
      <Notice tone="good">
        Between <M>1</M> and <M>2</M> the curve is <b>above</b> <M>y = 3</M> and keeps climbing to <M>{'+\\infty'}</M>{' '}
        as <M>{'x \\to 2^-'}</M>, so every <M>x</M> here works. But the green interval stops dead at the asymptote{' '}
        <M>x = 2</M>. Drag past it to see why.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Past <M>x = 2</M> you&apos;re on the right branch, which <b>never rises above its asymptote <M>y = 1</M></b>.
        Here <M>{`f(x) ${approx} ${fTex}`}</M>, nowhere near <M>3</M>, so nothing right of <M>2</M> works: the
        asymptote is the upper bound. Turn on the toggle to see what the answer <M>x \ge 1</M> gets wrong.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 7]} y={[-4, 6]} xStep={1} yStep={1} height={320}>
        <Region top={x => Math.min(f(x), 7.5)} bottom={() => 3} from={1} to={1.995} color={C.good} opacity={0.18} />
        <Line.ThroughPoints point1={[2, 0]} point2={[2, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Line.ThroughPoints point1={[0, 1]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Line.ThroughPoints point1={[0, 3]} point2={[1, 3]} color={C.g} weight={2} />
        <Plot.OfX y={f} domain={[-3.7, 1.72]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[2.28, 7.7]} color={C.f} weight={3} />
        <Label at={[2, 5.6]} color={C.guide} attach="e">x = 2</Label>
        <Label at={[6.9, 1]} color={C.guide} attach="nw">y = 1</Label>
        <Label at={[6.9, 3]} color={C.g} attach="nw">y = 3</Label>

        {algebra && <Line.Segment point1={[2, 0]} point2={[7, 0]} color={C.bad} weight={5} />}
        {algebra && <Label at={[5, -1.2]} color={C.bad} attach="c">x ≥ 1 ?</Label>}
        <Line.Segment point1={[1, 0]} point2={[2, 0]} color={C.good} weight={5} />
        <Point x={1} y={0} color={C.good} />
        <Hollow x={2} y={0} color={C.good} />
        <Label at={[1.5, -1.2]} color={C.good} attach="c">[1, 2)</Label>

        {!atAsym && <Line.Segment point1={[t, 0]} point2={[t, tip]} color={col} style="dashed" weight={2} />}
        {onPlane && <Point x={t} y={ft} color={col} />}
        {atAsym ? <Hollow x={t} y={0} color={C.bad} /> : <Point x={t} y={0} color={col} />}
      </Plane>
      <Controls>
        <Slider label="x" value={t} onChange={setT} min={-3} max={7} step={0.05} />
        <Buttons>
          <Toggle label={<>Show the algebra-only answer <M>x \ge 1</M></>} checked={algebra} onChange={setAlgebra} />
        </Buttons>
        <Readouts>
          {atAsym ? (
            <Readout color={C.bad} tex="f(2)\ \text{is undefined}" />
          ) : (
            <Readout color={col} tex={`f(${num(t, 2)}) = 1 - \\frac{2}{${num(t, 2)} - 2} ${approx} ${fTex}`} />
          )}
          {!atAsym && <Readout color={col} tex={ok ? 'f(x) \\ge 3\\ \\checkmark' : 'f(x) < 3\\ \\times'} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
