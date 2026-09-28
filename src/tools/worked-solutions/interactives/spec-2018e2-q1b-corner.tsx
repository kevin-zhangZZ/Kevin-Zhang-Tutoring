// 2018 Specialist Exam 2 Q1b — why the graph of f(x) = 2arcsin(x² − 1) has a sharp corner at its
// y-intercept and vertical ends, not the smooth U many students drew (examiner's report). Zoom in on
// (0, −π) or on the endpoint (√2, π). A smooth curve magnified far enough looks like its tangent
// line: the dashed U y = −π + πx² (through the same five points (0, −π), (±1, 0), (±√2, π))
// flattens to a horizontal line at its turning point, but f stays a V with one-sided slopes ∓2√2
// (the limits of parts d and c as x → 0). At x = ±√2 f arrives vertically (f′ = 4/√(2 − x²) → ∞)
// while the U arrives at the finite slope 2√2π ≈ 8.89. f is drawn parametrically in y,
// x = ±√(1 + sin(y/2)), so the vertical ends are sampled properly at any zoom.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle,
} from './kit'

const R2 = Math.SQRT2
const PI = Math.PI
const xOfY = (y: number) => Math.sqrt(Math.max(0, 1 + Math.sin(y / 2))) // right-branch x at height y
const smoothU = (x: number) => -PI + PI * x * x // the wrong shape: a parabola through the same points

const HW = 2 // half-width of the view at 1×
const HH = 4 // half-height of the view at 1×

function niceStep(span: number) {
  const raw = span / 7
  const p = Math.pow(10, Math.floor(Math.log10(raw)))
  const m = raw / p
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p
}
const fmt = (v: number) => String(parseFloat(v.toPrecision(4)))

type Focus = 'corner' | 'end'

export default function CornerZoom() {
  const [s, setS] = useState(1) // zoom = 2^s
  const [focus, setFocus] = useState<Focus>('corner')
  const [showU, setShowU] = useState(true)
  const z = Math.pow(2, s)
  const F = focus === 'corner' ? [0, -PI] : [R2, PI]
  const cx = F[0] * (1 - 1 / z)
  const cy = F[1] * (1 - 1 / z)
  const x0 = cx - HW / z
  const x1 = cx + HW / z
  const y0 = cy - HH / z
  const y1 = cy + HH / z
  const pad = 0.2 / z
  const tLo = Math.max(-PI, y0 - pad)
  const tHi = Math.min(PI, y1 + pad)
  const uLo = Math.max(-R2, x0 - pad)
  const uHi = Math.min(R2, x1 + pad)
  const close = z >= 6

  let notice
  if (focus === 'corner' && !close) {
    notice = (
      <Notice>
        From this far out the blue curve {showU && <>and the dashed U </>}look much alike{showU && <> — they even share
        five points: <M>{'(0,-\\pi)'}</M>, <M>{'(\\pm1,0)'}</M> and <M>{'(\\pm\\sqrt2,\\pi)'}</M></>}. The difference is
        at the bottom. Drag the zoom slider up and watch what each curve does at the <M>y</M>-intercept.
      </Notice>
    )
  } else if (focus === 'corner') {
    notice = (
      <Notice tone="good">
        Magnified {z.toFixed(0)}&times;, {showU ? <>the U has flattened into a horizontal line — close up, a smooth curve
        looks like its tangent, and at a turning point that tangent has slope <M>0</M>. </> : null}The blue curve stays
        a sharp V: it comes in down a slope of <M>{'-2\\sqrt2'}</M> and leaves up a slope of <M>{'2\\sqrt2'}</M> (the
        limits of parts d. and c. as <M>{'x\\to0'}</M>). So draw a point at <M>{'(0,-\\pi)'}</M>, not a rounded
        bottom. Now press &ldquo;Zoom on the endpoint&rdquo;.
      </Notice>
    )
  } else if (!close) {
    notice = (
      <Notice>
        Now the view closes in on the endpoint <M>{'(\\sqrt2,\\pi)'}</M>. Drag the zoom up and compare how steeply each
        curve arrives there.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Close up, the blue curve arrives <b>straight up</b>: <M>{"f'(x)=\\tfrac{4}{\\sqrt{2-x^2}}"}</M> grows without
        bound as <M>{'x\\to\\sqrt2'}</M>, so the tangent at the endpoint is vertical.{' '}
        {showU && <>The U arrives at a finite slope of <M>{'2\\sqrt2\\,\\pi\\approx8.89'}</M>. </>}Make the ends of your
        sketch vertical, with closed dots at <M>{'(\\pm\\sqrt2,\\pi)'}</M> — <M>f</M> is defined there.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[x0, x1]}
        y={[y0, y1]}
        xStep={niceStep(x1 - x0)}
        yStep={niceStep(y1 - y0)}
        height={320}
        labels={fmt}
        xLabels={v => (v >= x0 && v <= x1 && Math.round(v / niceStep(x1 - x0)) % 2 === 0 ? fmt(v) : '')}
      >
        {showU && <Plot.OfX y={smoothU} domain={[uLo, uHi]} color={C.bad} style="dashed" weight={2} />}
        {tHi > tLo && (
          <>
            <Plot.Parametric xy={t => [xOfY(t), t]} domain={[tLo, tHi]} color={C.f} weight={3} />
            <Plot.Parametric xy={t => [-xOfY(t), t]} domain={[tLo, tHi]} color={C.f} weight={3} />
          </>
        )}
        <Point x={0} y={-PI} color={C.f} />
        <Point x={R2} y={PI} color={C.f} />
        <Point x={-R2} y={PI} color={C.f} />
        <Label at={[0, -PI]} attach="sw" color={C.f}>(0, −π)</Label>
        <Label at={[R2, PI]} attach="e" color={C.f}>(√2, π)</Label>
        <Label at={[-R2, PI]} attach="w" color={C.f}>(−√2, π)</Label>
      </Plane>
      <Controls>
        <Slider label="\text{zoom}" value={s} onChange={setS} min={0} max={5} step={0.05} format={v => `${Math.pow(2, v).toFixed(Math.pow(2, v) < 10 ? 1 : 0)}×`} />
        <Buttons>
          <ActionButton label={<>Zoom on the corner <M>{'(0,-\\pi)'}</M></>} onClick={() => { setFocus('corner'); setS(4) }} />
          <ActionButton label={<>Zoom on the endpoint <M>{'(\\sqrt2,\\pi)'}</M></>} onClick={() => { setFocus('end'); setS(4) }} />
          <ActionButton label="Zoom out" onClick={() => setS(0)} />
        </Buttons>
        <Toggle label="Compare the smooth U through the same points (the wrong shape)" checked={showU} onChange={setShowU} />
        <Readouts>
          {focus === 'corner' ? (
            <>
              <Readout color={C.f} tex={"f:\\ \\text{slopes } {-2\\sqrt2} \\text{ and } {2\\sqrt2} \\text{ — a corner}"} />
              {showU && <Readout color={C.bad} tex={"\\text{U: slope } 0 \\text{ — a turning point}"} />}
            </>
          ) : (
            <>
              <Readout color={C.f} tex={"f:\\ \\text{slope} \\to \\infty \\text{ — vertical}"} />
              {showU && <Readout color={C.bad} tex={"\\text{U: slope } 2\\sqrt2\\,\\pi \\approx 8.89"} />}
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
