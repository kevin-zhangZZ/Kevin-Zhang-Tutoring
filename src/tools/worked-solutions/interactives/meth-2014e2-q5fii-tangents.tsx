// 2014 Methods Exam 2 Q5f.ii — the tangents through an external point. Slide the point of
// tangency p along y = x⁴ − 8x: its tangent y = (4p³ − 8)x − 3p⁴ (part f.i.) swings round, and the
// readout shows where it crosses x = 3/2. Only p = 0 (y = −8x) and p = 2 (y = 24x − 48) make it pass
// through (3/2, −12). A toggle shows the report's trap: the tangent AT x = 3/2 touches the curve at
// (3/2, −111/16) and misses the point. The slider snaps onto p = 0 and p = 2.

import { useState } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const g = (x: number) => x ** 4 - 8 * x
const tangentAt = (p: number) => (x: number) => (4 * p ** 3 - 8) * x - 3 * p ** 4
const P: [number, number] = [1.5, -12]

export default function Tangents() {
  const [p, setP] = useState(1)
  const [trap, setTrap] = useState(false)
  const onChange = (v: number) => setP(Math.abs(v) < 0.08 ? 0 : Math.abs(v - 2) < 0.08 ? 2 : v)

  const t = tangentAt(p)
  const atP = t(1.5)
  const hits = Math.abs(atP + 12) < 1e-9
  const col = hits ? C.good : C.f
  const slope = 4 * p ** 3 - 8
  const fmt = (v: number) => (Math.abs(v) < 5e-3 ? '0' : v.toFixed(2))
  const c = 3 * p ** 4
  const eq = c < 5e-3 ? `y = ${fmt(slope)}x` : `y = ${fmt(slope)}x - ${fmt(c)}`

  return (
    <div>
      <Plane x={[-1.5, 3]} y={[-24, 16]} xStep={0.5} yStep={8} height={320}>
        <Plot.OfX y={g} domain={[-1.5, 3]} color={C.guide} weight={2} />
        {trap && <Plot.OfX y={tangentAt(1.5)} domain={[-1.5, 3]} color={C.bad} weight={2} style="dashed" />}
        {trap && <Point x={1.5} y={g(1.5)} color={C.bad} />}
        <Plot.OfX y={t} domain={[-1.5, 3]} color={col} weight={3} />
        <Point x={p} y={g(p)} color={col} />
        <Point x={P[0]} y={P[1]} color={C.violet} />
        <Label at={P} color={C.violet} attach="sw">(1.5, −12)</Label>
        <Label at={[p, g(p)]} color={col} attach="nw">p</Label>
      </Plane>
      <Controls>
        <Slider label="p" value={p} onChange={onChange} min={-1.2} max={2.6} step={0.02} />
        <Buttons>
          <Toggle label="Show the tangent at x = 3/2 (the trap)" checked={trap} onChange={setTrap} />
        </Buttons>
        <Readouts>
          <Readout color={col} tex={`\\text{tangent: } ${eq}`} />
          <Readout color={col} tex={`\\text{at } x = \\tfrac32:\\ y = ${fmt(atP)}`} />
        </Readouts>
        {trap ? (
          <Notice tone="warn">
            The dashed red line is the tangent <em>at</em> <M>x = \tfrac32</M>. It touches the curve at{' '}
            <M>{'\\left(\\tfrac32, -\\tfrac{111}{16}\\right)'}</M>, about <M>5</M> units above the purple point, and misses
            it. The point <M>{'\\left(\\tfrac32, -12\\right)'}</M> is not on the curve, so it cannot be where a tangent touches.
          </Notice>
        ) : hits ? (
          <Notice tone="good">
            <b>This tangent passes through <M>{'\\left(\\tfrac32, -12\\right)'}</M>.</b>{' '}
            {p === 0 ? (
              <>At <M>p = 0</M> it is <M>y = -8x</M>. Now slide to the other value, <M>p = 2</M>.</>
            ) : (
              <>At <M>p = 2</M> it is <M>y = 24x - 48</M>. Together with <M>p = 0</M> these are the only two: they come from{' '}
                <M>{'3p^3(p-2) = 0'}</M>.</>
            )}
          </Notice>
        ) : (
          <Notice>
            The tangent touches the curve at <M>x = p</M> and crosses <M>{'x = \\tfrac32'}</M> at the height shown. Slide{' '}
            <M>p</M> until that height is exactly <M>-12</M>. How many values of <M>p</M> work?
          </Notice>
        )}
      </Controls>
    </div>
  )
}
