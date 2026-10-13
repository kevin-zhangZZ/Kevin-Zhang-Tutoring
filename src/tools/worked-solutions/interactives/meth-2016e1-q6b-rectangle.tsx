// 2016 Methods Exam 1 Q6b — the average value is the height of the rectangle, on the same base
// [−π/3, π/6], whose (signed) area equals the integral of f. Drag the height h: the rectangle's area
// h·π/2 matches ∫f = −1 − π/2 ≈ −2.571 only at h = −2/π − 1 ≈ −1.64, below the midline y = −1,
// because f is below −1 for two-thirds of the interval (−π/3 to 0). A toggle shows the report's
// slip of dropping the −1 from the integrand: the integral becomes −1 and the "average" −2/π ≈ −0.64.
// Values checked with sympy.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, Slider, Toggle,
} from './kit'

const PI = Math.PI
const A = -PI / 3
const B = PI / 6
const W = B - A // π/2
const NAMES: Record<number, string> = { [-3]: '−π/2', [-2]: '−π/3', [-1]: '−π/6', 1: 'π/6', 2: 'π/3' }
const xl = (v: number) => {
  const k = Math.round(v / (PI / 6))
  return Math.abs(v - (k * PI) / 6) < 1e-6 ? NAMES[k] ?? '' : ''
}
const yl = (v: number) => (Number.isInteger(v) ? String(v).replace('-', '−') : '')
const fmt = (v: number, dp = 3) => v.toFixed(dp).replace('-', '−')

export default function Rectangle() {
  const [h, setH] = useState(-1)
  const [drop, setDrop] = useState(false)

  const shift = drop ? 0 : -1
  const f = (x: number) => 2 * Math.sin(2 * x) + shift
  const area = drop ? -1 : -1 - PI / 2 // exact integrals over [−π/3, π/6]
  const target = area / W // −2/π − 1, or −2/π without the −1
  const rect = h * W
  const match = Math.abs(h - target) < 0.02

  let notice
  if (drop) {
    notice = match ? (
      <Notice tone="warn">
        <b>This matches the wrong integral.</b> Without the <M>-1</M> the curve is <M>2\sin(2x)</M>, its integral is{' '}
        <M>-1</M> and its average is <M>{'-\\tfrac{2}{\\pi}\\approx -0.64'}</M>, exactly <M>1</M> too high. Dropping a
        constant term moves the whole graph, so it moves the average too. Turn the toggle off.
      </Notice>
    ) : (
      <Notice tone="warn">
        <b>Dropping the <M>-1</M> lifts the whole curve by 1.</b> Find the height that now matches its area, then
        compare with the correct answer.
      </Notice>
    )
  } else if (match) {
    notice = (
      <Notice tone="good">
        <b>Areas agree at <M>{'h = -\\tfrac{2}{\\pi} - 1 \\approx -1.64'}</M>,</b> the average value. It is below the
        midline <M>y = -1</M> because <M>f</M> is under that line for two-thirds of the interval (from{' '}
        <M>{'-\\tfrac{\\pi}{3}'}</M> to <M>0</M>). Now try &ldquo;Forget the <M>-1</M>&rdquo;.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <b>The average value is the height <M>h</M> that makes the rectangle&apos;s area equal the area under <M>f</M>.</b>{' '}
        Most of the area under <M>f</M> is below the <M>x</M>-axis, so the integral (a signed area) is negative, and so is the rectangle's. Drag <M>h</M> until the two readouts agree.
        {h > target ? ' The rectangle is still too small: go lower.' : ' The rectangle is now too big: come up.'}
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-PI / 2, PI / 3]} y={[-3.2, 1.4]} xStep={PI / 6} yStep={1} height={320} xLabels={xl} yLabels={yl}>
        <Region top={x => Math.max(0, f(x))} bottom={x => Math.min(0, f(x))} from={A} to={B} color={C.f} opacity={0.2} />
        <Polygon points={[[A, 0], [B, 0], [B, h], [A, h]]} color={match ? C.good : C.g} fillOpacity={0.18} weight={2} />
        <Line.Segment point1={[-PI / 2, -1]} point2={[PI / 3, -1]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={f} domain={[-PI / 2, PI / 3]} color={drop ? C.bad : C.f} weight={3} />
        <Label at={[-PI / 2, -1]} attach="ne" color={C.guide}>y = −1</Label>
        <Label at={[B, h]} attach="e" color={match ? C.good : C.g}>{`h = ${fmt(h, 2)}`}</Label>
      </Plane>
      <Controls>
        <Slider label="h" value={h} onChange={setH} min={-3} max={0.5} step={0.005} format={v => fmt(v, 2)} />
        <Toggle label={<>Forget the <M>-1</M> in the integrand</>} checked={drop} onChange={setDrop} />
        <Readouts>
          <Readout color={drop ? C.bad : C.f} tex={`\\int_{-\\pi/3}^{\\pi/6} ${drop ? '2\\sin(2x)' : 'f(x)'}\\,dx = ${drop ? '-1' : '-1-\\tfrac{\\pi}{2}'} \\approx ${fmt(area)}`} />
          <Readout color={match ? C.good : C.g} tex={`\\text{rectangle} = h\\times\\tfrac{\\pi}{2} \\approx ${fmt(rect)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
