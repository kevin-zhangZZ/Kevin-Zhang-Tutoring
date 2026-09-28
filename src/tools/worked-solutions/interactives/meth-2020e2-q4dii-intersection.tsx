// 2020 Methods Exam 2 Q4d.ii — the two perpendicular tangents built up in the order of the working:
// (1) the tangent at x = 1, y = −2x + 4; (2) the tangent at x = p = 0.65525…, y = ½(x − p) + f(p)
// ≈ 0.5x + 1.99119; (3) where they cross, R ≈ (0.80352, 2.39295); (4) the report's error — putting
// x = 0.80 into f — which lands on the curve at (0.80, 2.29), about 0.10 below R and on neither
// tangent. The curve is concave down here, so both tangents lie above it and so does their
// crossing. A zoom toggle magnifies the neighbourhood of R so the gap is unmistakable. All values
// checked with scipy.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, StepNav, Toggle, useSteps } from './kit'

const f = (x: number) => 2 * x * Math.exp(1 - x * x)
const P = 0.6552517893797571
const FP = f(P) // 2.31881…
const C2 = FP - 0.5 * P // 1.99118…
const RX = (4 - C2) / 2.5 // 0.80352…
const RY = -2 * RX + 4 // 2.39295…
const FRX = f(RX) // 2.29044…

export default function IntersectionWidget() {
  const steps = useSteps(4)
  const s = steps.step
  const [zoom, setZoom] = useState(false)

  let notice
  if (s === 0) {
    notice = (
      <Notice>
        <b>First tangent: at <M>x = 1</M>.</b> The point is <M>(1, f(1)) = (1, 2)</M> and the gradient is part a&apos;s{' '}
        <M>-2</M>, so <M>y - 2 = -2(x - 1)</M>, which is <M>y = -2x + 4</M>. Everything here is exact.
      </Notice>
    )
  } else if (s === 1) {
    notice = (
      <Notice>
        <b>Second tangent: at <M>x = p \approx 0.655</M>.</b> Its gradient is <M>{'\\tfrac12'}</M> (that is how{' '}
        <M>p</M> was chosen in part d.i), and it touches the curve at <M>{'(p, f(p)) \\approx (0.655, 2.319)'}</M>. So{' '}
        <M>{'y = \\tfrac12(x - p) + f(p) \\approx 0.5x + 1.9912'}</M>. The intercept is a decimal, so keep every digit
        the calculator gives.
      </Notice>
    )
  } else if (s === 2) {
    notice = (
      <Notice tone="good">
        <b>They cross at <M>R</M>, where both rules give the same <M>y</M>:</b>{' '}
        <M>{'-2x + 4 = 0.5x + 1.9912'}</M>, so <M>{'x \\approx 0.8035'}</M>. Then take <M>y</M> from either
        tangent: <M>{'-2(0.8035\\ldots) + 4 \\approx 2.3930'}</M>. Notice that <M>R</M> sits <i>above</i> the curve. The
        curve bends downward here, so each tangent lies on top of it, and so does their crossing.
        {!zoom && ' Turn on "Zoom in" to see the gap clearly.'}
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>The trap: putting <M>x = 0.80</M> into <M>f</M>.</b> That gives <M>{'f(0.80) \\approx 2.29'}</M>, the height of
        the <i>curve</i> (red point), about <M>0.10</M> below <M>R</M>. It isn&apos;t on either tangent:{' '}
        <M>{'-2(0.80\\ldots) + 4 \\approx 2.39'}</M>. The report says many students did exactly this. A second trap:
        rounding <M>x</M> first, since <M>{'-2(0.80) + 4 = 2.40'}</M>. Use the unrounded <M>{'x = 0.80352\\ldots'}</M>.
      </Notice>
    )
  }

  const x: [number, number] = zoom ? [0.5, 1.1] : [-0.1, 2.2]
  const y: [number, number] = zoom ? [2.0, 2.6] : [0, 3]
  const step = zoom ? 0.1 : 1

  return (
    <div>
      <Plane
        x={x}
        y={y}
        xStep={step}
        yStep={step}
        equalScale
        height={340}
        labels={zoom ? v => v.toFixed(1) : v => (v < 0 ? '' : String(v))}
        xLabel={zoom ? '' : 'x'}
        yLabel={zoom ? '' : 'y'}
      >
        <Plot.OfX y={f} domain={[0, 3]} color={C.f} weight={3} />
        {/* Inside the hump, on the rising side: clear of both tangents. */}
        {!zoom && <Label at={[0.35, f(0.35)]} color={C.f} attach="e">f</Label>}
        {zoom && <Label at={[0.55, f(0.55)]} color={C.f} attach="sw">f</Label>}
        <Line.PointSlope point={[1, 2]} slope={-2} color={C.violet} weight={2.5} />
        <Point x={1} y={2} color={C.violet} />
        <Label at={[1, 2]} color={C.violet} attach="e" size={12}>x = 1</Label>
        {s >= 1 && (
          <>
            <Line.PointSlope point={[P, FP]} slope={0.5} color={C.g} weight={2.5} />
            <Point x={P} y={FP} color={C.g} />
            <Label at={[P, FP]} color={C.g} attach={zoom ? 'se' : 'w'} gap={zoom ? 7 : 9} size={12}>x = p</Label>
          </>
        )}
        {s >= 2 && (
          <>
            <Point x={RX} y={RY} color={C.good} />
            <Label at={[RX, RY]} color={C.good} attach="n" gap={9}>{zoom ? 'R(0.80, 2.39)' : 'R'}</Label>
          </>
        )}
        {s === 3 && (
          <>
            <Line.Segment point1={[RX, RY]} point2={[RX, FRX]} color={C.bad} style="dashed" weight={2} />
            <Point x={RX} y={FRX} color={C.bad} />
            <Label at={[RX, FRX]} color={C.bad} attach={zoom ? 'se' : 'e'} size={12}>{zoom ? '(0.80, 2.29)' : 'f(0.80)'}</Label>
          </>
        )}
      </Plane>
      <Controls>
        <StepNav step={s} count={4} onBack={steps.back} onNext={steps.next} />
        <div className="flex flex-wrap items-center gap-2">
          <Toggle label="Zoom in" checked={zoom} onChange={setZoom} />
        </div>
        <Readouts>
          <Readout color={C.violet} tex="y = -2x + 4" />
          {s >= 1 && <Readout color={C.g} tex="y \approx 0.5x + 1.99119" />}
          {s >= 2 && <Readout color={C.good} tex={`R \\approx (${RX.toFixed(5)},\\ ${RY.toFixed(5)})`} />}
          {s === 3 && <Readout color={C.bad} tex={`f(${RX.toFixed(5)}) \\approx ${FRX.toFixed(5)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
