// 2015 Specialist Exam 1 Q7b — graph y = cosec(2x) and y = cosec(x) on (0, π) and slide x along
// the domain. On (0, π/3) both are positive and cosec(2x) is lower; at π/3 they are equal (2/√3);
// on (π/3, π/2) cosec(2x) is higher; on (π/2, π) cosec(2x) is negative, so it is always lower. The
// green bars on the x-axis are the true solution set (0, π/3) ∪ (π/2, π). The toggle shows the
// report's typical error, multiplying by sin(x)sin(2x) without reversing: that gives cos(x) > 1/2
// everywhere, i.e. only x < π/3, the common incorrect response. Starts at x = 2π/3, inside the
// interval that error throws away. Values checked with sympy.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const PI = Math.PI
const STEP = PI / 96
const YMAX = 4

function piTick(v: number): string {
  const n = Math.round(v / (PI / 6))
  if (Math.abs(v - (n * PI) / 6) > 1e-6) return ''
  const names: Record<number, string> = { 2: 'π/3', 3: 'π/2', 4: '2π/3', 6: 'π' }
  return names[n] ?? ''
}

const csc = (t: number) => 1 / Math.sin(t)

export default function CosecSigns() {
  const [x, setX] = useState((2 * PI) / 3)
  const [naive, setNaive] = useState(false)

  const atHalf = Math.abs(x - PI / 2) < STEP / 2
  const atThird = Math.abs(x - PI / 3) < STEP / 2
  const c2 = csc(2 * x)
  const c1 = csc(x)
  const holds = !atHalf && !atThird && c2 < c1
  const right = x > PI / 2 && !atHalf
  const product = Math.sin(x) * Math.sin(2 * x)

  let notice
  if (atHalf) {
    notice = (
      <Notice>
        At <M>{'x = \\tfrac\\pi2'}</M>, <M>\sin(2x) = \sin(\pi) = 0</M>, so <M>{'\\operatorname{cosec}(2x)'}</M> is
        undefined. That is why the domain leaves this point out, and the sign of <M>\sin(2x)</M> flips here.
      </Notice>
    )
  } else if (right && naive) {
    notice = (
      <Notice tone="warn">
        <b>Wrongly thrown away.</b> Here <M>\sin(x)\sin(2x) \lt 0</M>, so multiplying by it must reverse the inequality.
        Not reversing gives <M>{'\\cos(x) > \\tfrac12'}</M>, which is false for every <M>x</M> here, so the whole
        interval is lost and only <M>{'x \\lt \\tfrac\\pi3'}</M> remains, the common incorrect response.
      </Notice>
    )
  } else if (right) {
    notice = (
      <Notice tone="good">
        <b>Holds:</b> <M>{'\\operatorname{cosec}(2x)'}</M> is negative and <M>{'\\operatorname{cosec}(x)'}</M> is
        positive, so the blue curve is below the orange one for every <M>x</M> in{' '}
        <M>{'\\left(\\tfrac\\pi2,\\pi\\right)'}</M>. Turn on the toggle to see how cross-multiplying loses this half.
      </Notice>
    )
  } else if (atThird) {
    notice = (
      <Notice>
        At <M>{'x = \\tfrac\\pi3'}</M> the two are <b>equal</b> (both <M>{'\\tfrac{2}{\\sqrt3}'}</M>, the part a. solution), so
        the strict inequality fails: <M>{'\\tfrac\\pi3'}</M> is not included.
      </Notice>
    )
  } else if (holds) {
    notice = (
      <Notice tone="good">
        <b>Holds:</b> both are positive and the blue curve is lower. That is true all the way from <M>0</M> up to{' '}
        <M>{'\\tfrac\\pi3'}</M>, where the curves meet. Slide right past <M>{'\\tfrac\\pi3'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>Fails:</b> between <M>{'\\tfrac\\pi3'}</M> and <M>{'\\tfrac\\pi2'}</M> the blue curve is higher, heading up to
        its asymptote. So the left-hand piece ends at <M>{'\\tfrac\\pi3'}</M>, not at <M>{'\\tfrac\\pi2'}</M>.
      </Notice>
    )
  }

  const show = (v: number) => Math.abs(v) <= YMAX

  return (
    <div>
      <Plane x={[0, PI]} y={[-YMAX, YMAX]} xStep={PI / 6} yStep={1} height={320} xLabels={piTick}>
        <Line.Segment point1={[PI / 2, -YMAX]} point2={[PI / 2, YMAX]} color={C.guide} style="dashed" />
        <Plot.OfX y={t => csc(2 * t)} domain={[0.01, PI / 2 - 0.01]} color={C.f} weight={3} />
        <Plot.OfX y={t => csc(2 * t)} domain={[PI / 2 + 0.01, PI - 0.01]} color={C.f} weight={3} />
        <Plot.OfX y={csc} domain={[0.01, PI - 0.01]} color={C.g} weight={3} />
        <Label at={[0.9, csc(1.8)]} color={C.f} attach="s">cosec(2x)</Label>
        <Label at={[2.6, csc(2.6)]} color={C.g} attach="n">cosec(x)</Label>
        <Line.Segment point1={[0, 0]} point2={[PI / 3, 0]} color={C.good} weight={7} />
        <Line.Segment point1={[PI / 2, 0]} point2={[PI, 0]} color={naive ? C.bad : C.good} weight={7} />
        {naive && <Label at={[(3 * PI) / 4, 0]} color={C.bad} attach="s">lost</Label>}
        {!atHalf && show(c2) && <Point x={x} y={c2} color={C.f} />}
        {!atHalf && show(c1) && <Point x={x} y={c1} color={C.g} />}
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={v => setX(Math.round(v / STEP) * STEP)} min={STEP} max={PI - STEP} step={STEP} />
        <Toggle label="Cross-multiply without checking signs" checked={naive} onChange={setNaive} />
        <Readouts>
          <Readout color={C.f} tex={atHalf ? '\\operatorname{cosec}(2x)\\ \\text{undefined}' : `\\operatorname{cosec}(2x) = ${c2.toFixed(3)}`} />
          <Readout color={C.g} tex={`\\operatorname{cosec}(x) = ${c1.toFixed(3)}`} />
          {!atHalf && (
            <Readout tex={`\\sin(x)\\sin(2x) ${product > 0 ? '>' : '<'} 0`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
