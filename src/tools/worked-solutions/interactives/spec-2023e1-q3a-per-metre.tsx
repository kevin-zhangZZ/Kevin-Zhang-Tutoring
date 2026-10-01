// 2023 Specialist Exam 1 Q3a — dv/dx is how fast the velocity changes per METRE; acceleration is
// how fast it changes per SECOND. On the graph of v = (3x + 2)/(2x − 1), the small (orange)
// triangle under the tangent has run 1 m and rise dv/dx. The particle covers v metres each second,
// so the big (violet) triangle with run v has rise v·dv/dx = a: the same shape scaled up by v. At
// x = 2 that is −7/9 per metre against −56/27 per second — the report's common slip was stopping at
// −7/9.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, num } from './kit'

const vel = (x: number) => (3 * x + 2) / (2 * x - 1)
const slope = (x: number) => -7 / (2 * x - 1) ** 2

export default function PerMetre() {
  const [x0, setX0] = useState(2)

  const v0 = vel(x0)
  const dv = slope(x0)
  const a = v0 * dv
  const atTwo = Math.abs(x0 - 2) < 0.015

  const small: [number, number][] = [[x0, v0], [x0, v0 + dv], [x0 + 1, v0 + dv]]
  const big: [number, number][] = [[x0, v0], [x0, v0 + a], [x0 + v0, v0 + a]]
  const showRiseLabels = Math.abs(a) > 0.9

  let notice
  if (atTwo) {
    notice = (
      <Notice tone="good">
        At <M>x = 2</M> the tangent&apos;s gradient is <M>{'\\tfrac{dv}{dx} = -\\tfrac79'}</M>: the velocity drops{' '}
        <M>{'\\tfrac79\\ \\text{m s}^{-1}'}</M> for every <b>metre</b> travelled (orange). That is not yet the
        acceleration. The particle is moving at <M>{'\\tfrac83\\ \\text{m s}^{-1}'}</M>, so each <b>second</b> it covers{' '}
        <M>{'\\tfrac83'}</M> m, and at this rate its velocity drops{' '}
        <M>{'\\tfrac83 \\times \\tfrac79 = \\tfrac{56}{27}\\ \\text{m s}^{-1}'}</M> per second (violet). Slide <M>x</M>{' '}
        to see that the violet triangle is always the orange one scaled up by <M>v</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At <M>{['x = ', x0.toFixed(2)]}</M> the velocity drops <M>{num(-dv)}</M> m s⁻¹ per metre, and the particle covers{' '}
        <M>{num(v0)}</M> m each second, so per second it drops{' '}
        <M>{[num(v0), ' \\times ', num(-dv), ' = ', num(-a)]}</M> m s⁻¹. That is why <M>{'a = v\\tfrac{dv}{dx}'}</M>, not{' '}
        <M>{'\\tfrac{dv}{dx}'}</M>.{' '}
        {x0 > 3.5
          ? 'Far out, the curve flattens towards v = 1.5 (part b), so both drops, per metre and per second, shrink towards 0.'
          : 'Move back to x = 2 for the exam’s case.'}
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0.4, 8]} y={[-1.6, 5.6]} xStep={1} yStep={1} height={360} xLabel="x" yLabel="v">
        <Plot.OfX y={vel} domain={[1, 8]} color={C.f} weight={3} />
        <Line.ThroughPoints point1={[x0, v0]} point2={[x0 + 1, v0 + dv]} color={C.guide} style="dashed" weight={1.5} />
        <Polygon points={big} color={C.violet} fillOpacity={0.14} weight={2} />
        <Polygon points={small} color={C.g} fillOpacity={0.35} weight={2.5} />
        <Point x={x0} y={v0} color={C.f} />
        <Label at={[x0 + 0.5, v0 + dv]} color={C.g} attach="s" size={12}>1 m</Label>
        <Label at={[x0 + v0 / 2, v0 + a]} color={C.violet} attach="s" size={12}>
          {`${num(v0)} m in 1 s`}
        </Label>
        {showRiseLabels && (
          <>
            <Label at={[x0, v0 + dv / 2]} color={C.g} attach="w" size={12}>{num(dv)}</Label>
            <Label at={[x0, v0 + a]} color={C.violet} attach="w" size={12}>{num(a)}</Label>
          </>
        )}
        <Label at={[1.15, vel(1.15)]} color={C.f} attach="e">v = (3x + 2)/(2x − 1)</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={1.7} max={6} step={0.01} />
        <Readouts>
          <Readout tex={`v = ${num(v0)}\\ \\text{m s}^{-1}`} />
          <Readout color={C.g} tex={`\\tfrac{dv}{dx} = ${num(dv)}\\ \\text{per metre}`} />
          <Readout color={C.violet} tex={`a = v\\tfrac{dv}{dx} = ${num(a)}\\ \\text{m s}^{-2}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
