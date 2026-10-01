// 2023 Specialist Exam 1 Q4 — why the product rule gives two terms that cancel. Read
// x·arcsin(y²) = π as a rectangle of width x and height arcsin(y²) whose area is always π (on
// the relation x ≥ 2 and the height is π/x). Moving from P(6, 1/√2) to a point Q further along,
// the width grows by Δx, so the height must drop: the violet strip gained on the side
// (Δx × new height) exactly equals the orange strip lost off the top (6 × drop in height).
// Per unit of x these become arcsin(y²)·1 and −x·d/dx[arcsin(y²)], the two product-rule terms,
// both → π/6 as Δx → 0; so the height falls at π/36 per unit of x, and the chain rule
// (d/dy arcsin(y²) = 2y/√(1 − y⁴) = 2√6/3 at P) gives dy/dx = −π√6/144 ≈ −0.0534, which the
// Δy/Δx readout closes in on. A toggle leaves out the arcsin(y²) term: that method says
// dy/dx = 0, the height never drops, and the rectangle's area grows to π + Δx·π/6.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, M, MovablePoint, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, Toggle,
  clamp, num, tick,
} from './kit'

const X0 = 6
const PI = Math.PI
const height = (x: number) => PI / x // arcsin(y²) on the relation
const yOf = (x: number) => Math.sqrt(Math.sin(PI / x)) // y > 0 branch through P
const H0 = height(X0) // π/6
const Y0 = 1 / Math.SQRT2
const ANS = (-PI * Math.sqrt(6)) / 144 // ≈ −0.0534
const DX_MAX = 3

const rect = (x1: number, x2: number, y1: number, y2: number): [number, number][] => [
  [x1, y1],
  [x2, y1],
  [x2, y2],
  [x1, y2],
]

export default function ProductRuleRectangle() {
  const [dx, setDx] = useState(1.5)
  const [wrong, setWrong] = useState(false)

  const atP = dx < 0.005
  const near = dx <= 0.3
  const xQ = X0 + dx
  const hQ = height(xQ)
  const gain = dx * hQ // side strip: width Δx, height arcsin(y_Q²)
  const loss = X0 * (H0 - hQ) // top strip: width 6, height = drop in arcsin(y²)
  const slope = atP ? ANS : (yOf(xQ) - Y0) / dx
  const extra = dx * H0 // wrong method: height stays π/6, so the side strip is pure extra area

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        Without the <M>{'\\arcsin(y^2)'}</M> term the equation is{' '}
        <M>{'x\\cdot\\tfrac{2y}{\\sqrt{1-y^4}}\\tfrac{dy}{dx} = 0'}</M>, so <M>{'\\tfrac{dy}{dx} = 0'}</M> and the height
        never drops. Then widening by <M>{'\\Delta x'}</M> adds the red strip with nothing taken off the top, and the area
        becomes <M>{`\\pi + ${num(extra, 3)}`}</M>, not <M>{'\\pi'}</M>: that corner is not on the relation. The term you
        left out is exactly the area the side strip adds per unit of <M>x</M>.
      </Notice>
    )
  } else if (atP) {
    notice = (
      <Notice tone="good">
        <b>In the limit, per unit of x,</b> the side strip adds <M>{'\\arcsin(y^2) = \\tfrac{\\pi}{6}'}</M> and the top strip
        takes off <M>{'-x\\tfrac{d}{dx}\\left[\\arcsin(y^2)\\right]'}</M>. Those are the two product-rule terms, and they
        cancel: <M>{'\\tfrac{\\pi}{6} + 6\\tfrac{d}{dx}\\left[\\arcsin(y^2)\\right] = 0'}</M>, so the height falls at{' '}
        <M>{'\\tfrac{\\pi}{36}'}</M> per unit of <M>x</M>. Since <M>{'\\arcsin(y^2)'}</M> changes{' '}
        <M>{'\\tfrac{2y}{\\sqrt{1-y^4}} = \\tfrac{2\\sqrt6}{3}'}</M> times as fast as <M>y</M> (the chain rule),{' '}
        <M>{'\\tfrac{dy}{dx} = -\\tfrac{\\pi}{36} \\div \\tfrac{2\\sqrt6}{3} = -\\tfrac{\\pi\\sqrt6}{144}'}</M>.
      </Notice>
    )
  } else if (near) {
    notice = (
      <Notice tone="good">
        Both strips are thin now. Per unit of <M>x</M> each is worth <M>{num(hQ, 3)}</M>, heading for{' '}
        <M>{'\\arcsin\\left(\\tfrac12\\right) = \\tfrac{\\pi}{6} \\approx 0.524'}</M>, and{' '}
        <M>{'\\tfrac{\\Delta y}{\\Delta x}'}</M> is <M>{num(slope, 4)}</M>, close to the answer <M>-0.0534</M>. Slide{' '}
        <M>{'\\Delta x'}</M> to <M>0</M> to finish the limit.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Moving from P to Q along the relation, the width <M>x</M> grows, so the height <M>{'\\arcsin(y^2)'}</M> must drop
        to keep the area <M>{'\\pi'}</M>. The <b style={{ color: C.violet }}>side strip gained</b> (
        <M>{num(gain, 3)}</M>) exactly equals the <b style={{ color: C.g }}>top strip lost</b> (<M>{num(loss, 3)}</M>). The
        product rule is this balance per unit of <M>x</M>: the first term, <M>{'\\arcsin(y^2)\\cdot 1'}</M>, is the side
        strip and the second, <M>{'x\\tfrac{d}{dx}\\left[\\arcsin(y^2)\\right]'}</M>, is minus the top strip (it is negative
        because the height drops). Drag Q towards P.
      </Notice>
    )
  }

  const hTop = wrong ? H0 : hQ // height of the strip on the side

  return (
    <div>
      <Plane
        x={[0, 9.5]}
        y={[0, 0.75]}
        xStep={1}
        yStep={0.2}
        height={320}
        xLabel=""
        yLabel=""
        xLabels={v => (v > 9.01 ? '' : tick(v))}
        yLabels={v => (v > 0.65 ? '' : tick(v))}
      >
        <Label at={[0, 0.75]} attach="e" size={14} italic>arcsin(y²)</Label>
        <Label at={[9.5, 0]} attach="n" size={14} italic>x</Label>
        {/* The kept part of P's rectangle */}
        <Polygon points={rect(0, X0, 0, wrong ? H0 : hQ)} color={C.f} fillOpacity={0.18} weight={0} strokeOpacity={0} />
        {/* The strip lost off the top */}
        {!wrong && !atP && (
          <Polygon points={rect(0, X0, hQ, H0)} color={C.g} fillOpacity={0.55} weight={1.5} />
        )}
        {/* The strip gained on the side (red when the height wrongly stays put) */}
        {!atP && (
          <Polygon points={rect(X0, xQ, 0, hTop)} color={wrong ? C.bad : C.violet} fillOpacity={0.45} weight={1.5} />
        )}
        {/* P's rectangle outline */}
        <Polygon points={rect(0, X0, 0, H0)} color={C.ink} fillOpacity={0} weight={1.5} strokeStyle="dashed" />

        <Plot.OfX y={height} domain={[3.95, 9.5]} color={C.guide} weight={2} style="dashed" />
        <Label at={[5, height(5)]} attach="ne" color={C.guide} size={12}>x·arcsin(y²) = π</Label>

        {!wrong && dx >= 0.9 && (
          <Label at={[X0 + dx / 2, hQ / 2]} attach="c" color={C.violet} size={12}>gained</Label>
        )}
        {wrong && dx >= 1.2 && (
          <Label at={[X0 + dx / 2, H0 / 2]} attach="c" color={C.bad} size={12}>extra</Label>
        )}
        {!wrong && H0 - hQ >= 0.06 && (
          <Label at={[X0 / 2, (H0 + hQ) / 2]} attach="c" color={C.ink} size={12}>lost</Label>
        )}

        <Point x={X0} y={H0} color={C.ink} />
        <Label at={[X0, H0]} attach="nw">P</Label>
        {wrong && !atP && <Point x={xQ} y={H0} color={C.bad} />}
        {dx >= 0.25 && <Label at={[xQ, hQ]} attach="ne" color={C.violet}>Q</Label>}
        <MovablePoint
          point={[xQ, hQ]}
          onMove={p => setDx(clamp(p[0] - X0, 0, DX_MAX))}
          constrain={p => {
            const x = clamp(p[0], X0, X0 + DX_MAX)
            return [x, height(x)]
          }}
          color={C.violet}
        />
      </Plane>
      <Controls>
        <Slider label="\Delta x" value={dx} onChange={setDx} min={0} max={DX_MAX} step={0.01} format={v => num(v, 2)} />
        <Buttons>
          <Toggle
            label={<>Leave out the <M>{'\\arcsin(y^2)'}</M> term</>}
            checked={wrong}
            onChange={setWrong}
          />
        </Buttons>
        <Readouts>
          {wrong ? (
            <>
              <Readout color={C.bad} tex={`\\text{that method's } \\tfrac{dy}{dx} = 0`} />
              <Readout color={C.bad} tex={`\\text{area} = \\pi + ${num(extra, 3)} = ${num(PI + extra, 3)}`} />
            </>
          ) : atP ? (
            <>
              <Readout color={C.violet} tex={`\\text{side strip per unit of } x \\to \\tfrac{\\pi}{6} \\approx ${num(H0, 3)}`} />
              <Readout color={C.g} tex={`\\text{top strip per unit of } x \\to \\tfrac{\\pi}{6} \\approx ${num(H0, 3)}`} />
            </>
          ) : (
            <>
              <Readout color={C.violet} tex={`\\text{gained} = \\Delta x \\times \\text{height} = ${num(gain, 3)}`} />
              <Readout color={C.g} tex={`\\text{lost} = 6 \\times \\text{drop} = ${num(loss, 3)}`} />
            </>
          )}
          {!wrong && (
            <Readout
              color={atP ? C.good : undefined}
              tex={atP ? `\\tfrac{dy}{dx} = -\\tfrac{\\pi\\sqrt6}{144} \\approx ${num(ANS, 4)}` : `\\tfrac{\\Delta y}{\\Delta x} = ${num(slope, 4)}`}
            />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
