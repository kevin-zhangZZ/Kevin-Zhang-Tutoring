// 2016 Specialist Exam 2 Q3d — why "verify the initial condition" is its own step. Every curve
// y = (t² + 20t + 100 + K)/(6(10 + t)) = (10 + t)/6 + K/(6(10 + t)) satisfies
// dy/dt + y/(10 + t) = 1/3: dy/dt = 1/6 − K/(6(10+t)²) and y/(10+t) = 1/6 + K/(6(10+t)²), which add
// to 1/3 at every t. Parametrised by the starting amount y₀ = y(0) = (100 + K)/60, so
// K = 60y₀ − 100; y₀ = 15 gives K = 800, the given solution
// (numerator t² + 20t + 900). The tangent at the chosen t shows the slope dy/dt; the readouts add
// the two terms of the left side. Checked with sympy.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num } from './kit'

const make = (y0: number) => {
  const K = 60 * y0 - 100
  return {
    y: (t: number) => (10 + t) / 6 + K / (6 * (10 + t)),
    dy: (t: number) => 1 / 6 - K / (6 * (10 + t) ** 2),
  }
}
const GIVEN = make(15)

export default function Family() {
  const [y0, setY0] = useState(15)
  const [t, setT] = useState(8)
  const f = make(y0)
  const y = f.y(t)
  const m = f.dy(t)
  const second = y / (10 + t)
  const isGiven = Math.abs(y0 - 15) < 1e-9
  const col = isGiven ? C.good : C.g
  const dt = 4

  return (
    <div>
      <Plane x={[0, 40]} y={[0, 26]} xStep={5} yStep={5} height={320} xLabel="t" yLabel="y">
        {!isGiven && <Plot.OfX y={GIVEN.y} domain={[0, 40]} color={C.guide} weight={2} style="dashed" />}
        <Plot.OfX y={f.y} domain={[0, 40]} color={col} weight={3} />
        <Line.Segment point1={[t - dt, y - m * dt]} point2={[t + dt, y + m * dt]} color={C.f} weight={2} />
        <Point x={t} y={y} color={C.f} />
        <Point x={0} y={y0} color={col} />
        <Label at={[2.5, Math.min(y0 + 1.2, 24.6)]} attach="e" color={col}>{`y(0) = ${num(y0, 1)}`}</Label>
        {!isGiven && <Label at={[40, GIVEN.y(40)]} attach="nw" color={C.guide}>given y</Label>}
      </Plane>
      <Controls>
        <Slider label="y(0)" value={y0} onChange={setY0} min={0} max={25} step={0.5} format={v => `${v.toFixed(1)} kg`} />
        <Slider label="t" value={t} onChange={setT} min={0} max={40} step={0.5} format={v => v.toFixed(1)} />
        <Buttons>
          <ActionButton label={<>Back to <M>y(0) = 15</M></>} onClick={() => setY0(15)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\dfrac{dy}{dt} = ${num(m, 3)}`} />
          <Readout tex={`\\dfrac{y}{10+t} = ${num(second, 3)}`} />
          <Readout color={C.good} tex={`\\text{LHS} = ${num(m + second, 3)} = \\tfrac13`} />
        </Readouts>
        {isGiven ? (
          <Notice tone="good">
            <b>The given solution.</b> Slide <M>t</M>: the slope <M>{'\\tfrac{dy}{dt}'}</M> (blue tangent) and{' '}
            <M>{'\\tfrac{y}{10+t}'}</M> change, but they always add to <M>{'\\tfrac13'}</M>. That is what the
            differentiation and substitution prove. Now drag <M>y(0)</M> away from 15.
          </Notice>
        ) : (
          <Notice tone="warn">
            <b>This curve satisfies the differential equation too</b>: the left side is still <M>{'\\tfrac13'}</M> at
            every <M>t</M>. But it starts with <M>{`${num(y0, 1)}`}</M> kg, not the 15 kg in tank 2. The DE alone has a
            whole family of solutions; only the initial condition <M>y(0) = 15</M> picks out the tank&apos;s one, which is
            why checking it is a separate step (and a separate mark).
          </Notice>
        )}
      </Controls>
    </div>
  )
}
