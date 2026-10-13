// 2015 Specialist Exam 1 Q7a — y = sin(2x) and y = sin(x) meet five times on [0, 2π]: at 0, π, 2π
// (on the x-axis, where sin(x) = 0) and at π/3, 5π/3 (where cos(x) = 1/2). Slide x along the domain
// to see which factor of sin(x)(2cos(x) − 1) is zero at each meeting. The toggle shows the report's
// most common error, dividing by sin(x): only the two cos(x) = 1/2 meetings survive. The slider
// steps in π/48, so it lands exactly on every solution. Values checked with sympy.

import { useState } from 'react'
import { C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const PI = Math.PI
const STEP = PI / 48

const AXIS = [0, PI, 2 * PI] // sin(x) = 0
const COS = [PI / 3, (5 * PI) / 3] // cos(x) = 1/2

function piTick(v: number): string {
  const n = Math.round(v / (PI / 3))
  if (Math.abs(v - (n * PI) / 3) > 1e-6) return ''
  // π and 2π are drawn as Labels below their solution dots (the tick labels sat under the dots)
  const names: Record<number, string> = { 1: 'π/3', 2: '2π/3', 4: '4π/3', 5: '5π/3' }
  return names[n] ?? ''
}

const near = (a: number, b: number) => Math.abs(a - b) < STEP / 2
const fix = (v: number) => (Math.abs(v) < 1e-9 ? 0 : v).toFixed(3)

export default function LostRoots() {
  const [x, setX] = useState(PI)
  const [divided, setDivided] = useState(false)

  const s2 = Math.sin(2 * x)
  const s1 = Math.sin(x)
  const f2 = 2 * Math.cos(x) - 1
  const onAxis = AXIS.some(a => near(x, a))
  const onCos = COS.some(a => near(x, a))

  let notice
  if (onAxis && divided) {
    notice = (
      <Notice tone="warn">
        <b>This meeting is lost.</b> Here <M>\sin(x) = 0</M>, so dividing by <M>\sin(x)</M> divides by zero. The curves
        really do meet (both are <M>0</M>), but <M>{'\\cos(x) = \\tfrac12'}</M> cannot find it. The same happens at all
        three red points.
      </Notice>
    )
  } else if (onAxis) {
    notice = (
      <Notice tone="good">
        <b>A meeting on the <M>x</M>-axis:</b> both curves are <M>0</M> because <M>\sin(x) = 0</M>, the first factor. There
        are three of these, and two sit at the very ends of the domain, which is closed. Now turn on &ldquo;Divide by
        sin(x)&rdquo;.
      </Notice>
    )
  } else if (onCos) {
    notice = (
      <Notice tone="good">
        <b>A meeting off the axis:</b> here <M>\sin(x) \ne 0</M> but <M>2\cos(x) - 1 = 0</M>. These two solutions survive
        either method; they are the only ones dividing by <M>\sin(x)</M> finds.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The curves do not meet here: neither factor of <M>{'\\sin(x)\\bigl(2\\cos(x) - 1\\bigr)'}</M> is zero. Slide{' '}
        <M>x</M> to a dot to see which factor is zero there.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 2 * PI]} y={[-1.4, 1.4]} xStep={PI / 3} yStep={1} height={300} xLabels={piTick}>
        <Plot.OfX y={t => Math.sin(2 * t)} domain={[0, 2 * PI]} color={C.f} weight={3} />
        <Plot.OfX y={t => Math.sin(t)} domain={[0, 2 * PI]} color={C.g} weight={3} />
        <Label at={[(7 * PI) / 4, -1]} color={C.f} attach="s">y = sin(2x)</Label>
        <Label at={[PI / 2, 1]} color={C.g} attach="n">y = sin(x)</Label>
        {COS.map(a => (
          <Point key={a} x={a} y={Math.sin(a)} color={C.good} />
        ))}
        {AXIS.map(a => (
          <Point key={a} x={a} y={0} color={divided ? C.bad : C.good} />
        ))}
        <Label at={[PI, 0]} color={divided ? C.bad : C.ink} attach="s" gap={12}>{divided ? "π lost" : "π"}</Label>
        <Label at={[2 * PI, 0]} color={divided ? C.bad : C.ink} attach="sw" gap={10}>2π</Label>
        <Point x={x} y={s1} color={C.ink} />
        <Point x={x} y={s2} color={C.ink} />
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={v => setX(Math.round(v / STEP) * STEP)} min={0} max={2 * PI} step={STEP} />
        <Toggle label="Divide by sin(x)" checked={divided} onChange={setDivided} />
        <Readouts>
          <Readout color={C.f} tex={`\\sin(2x) = ${fix(s2)}`} />
          <Readout color={C.g} tex={`\\sin(x) = ${fix(s1)}`} />
          <Readout tex={`2\\cos(x) - 1 = ${fix(f2)}`} />
          <Readout
            color={divided ? C.bad : C.good}
            tex={divided ? '\\text{solutions found: } 2 \\text{ of } 5' : '\\text{solutions found: } 5 \\text{ of } 5'}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
