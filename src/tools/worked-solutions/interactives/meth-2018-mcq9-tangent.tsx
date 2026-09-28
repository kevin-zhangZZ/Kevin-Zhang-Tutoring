// 2018 Methods Exam 2 MCQ 9 — slide the point of contact P along y = logₑ(2x). The tangent's
// gradient is 1/x₀, so it is exactly 2 at x₀ = 1/2, where P = (1/2, 0); that tangent, y = 2x − 1,
// crosses the y-axis at Q = (0, −1). P and Q are different points (option A, 0, is P's height).
// A toggle overlays y = logₑ(x): the same curve lowered by logₑ 2, so its tangent at the same x
// is parallel — why the 2 cancels and dy/dx = 1/x, not 2/x.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider,
  Toggle, clamp, num, tick,
} from './kit'

const y = (x: number) => Math.log(2 * x)
const X_MIN = 0.15
const X_MAX = 3
const YLO = -2.6
const YHI = 2.3

export default function Tangent() {
  const [x0, setX0] = useState(1.5)
  const [ghost, setGhost] = useState(false)

  const hit = Math.abs(x0 - 0.5) < 0.006
  const m = 1 / x0
  const y0 = y(x0)
  const c = y0 - m * x0 // = logₑ(2x₀) − 1
  const cStr = c < 0 ? `- ${num(-c)}` : `+ ${num(c)}`

  let notice
  if (hit) {
    notice = (
      <Notice tone="good">
        Gradient <M>2</M> happens at <M>{'x = \\tfrac12'}</M>, where the curve crosses the <M>x</M>-axis:{' '}
        <M>{'P = \\left(\\tfrac12, 0\\right)'}</M>. The tangent <M>y = 2x - 1</M> meets the <M>y</M>-axis at{' '}
        <M>Q = (0, -1)</M>, option C. Option A (<M>0</M>) is the height of <M>P</M>, but the question asks where the line
        crosses the <M>y</M>-axis, which is <M>Q</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The gradient here is <M>{`\\tfrac{1}{x_0} = ${num(m)}`}</M>, {m > 2 ? 'more' : 'less'} than <M>2</M>. The curve gets
        steeper as <M>P</M> moves left, so slide <M>P</M> {m > 2 ? 'right' : 'left'} until the gradient is exactly{' '}
        <M>2</M>. Keep an eye on <M>Q</M>, where the tangent meets the <M>y</M>-axis: it is never the same point as{' '}
        <M>P</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-0.8, 3.2]}
        y={[YLO, YHI]}
        xStep={0.5}
        yStep={1}
        height={330}
        xLabels={v => (v < 0 || v > 3 ? "" : tick(v))}
        yLabels={v => (v < 0 || v > 2.1 ? "" : tick(v))}
      >
        {ghost && (
          <>
            <Plot.OfX y={Math.log} domain={[Math.exp(YLO - 0.3), 3.2]} color={C.guide} style="dashed" weight={2} />
            <Label at={[2.6, Math.log(2.6)]} color={C.guide} attach="s">y = logₑ(x)</Label>
            <Line.PointSlope point={[x0, Math.log(x0)]} slope={m} color={C.guide} style="dashed" weight={1.5} />
            <Point x={x0} y={Math.log(x0)} color={C.guide} />
          </>
        )}
        <Plot.OfX y={y} domain={[Math.exp(YLO - 0.3) / 2, 3.2]} color={C.f} weight={3} />
        <Label at={[1.9, y(1.9)]} color={C.f} attach="se">y = logₑ(2x)</Label>
        <Line.PointSlope point={[x0, y0]} slope={m} color={C.g} weight={2.5} />
        {c > YLO && c < YHI && (
          <>
            <Point x={0} y={c} color={C.good} />
            <Label at={[0, c]} color={C.good} attach="nw">{hit ? '(0, −1)' : 'Q'}</Label>
          </>
        )}
        <MovablePoint
          point={[x0, y0]}
          onMove={([px]) => setX0(clamp(px, X_MIN, X_MAX))}
          constrain={([px]) => {
            const cx = clamp(px, X_MIN, X_MAX)
            return [cx, y(cx)]
          }}
          color={C.f}
        />
        <Label at={[x0, y0]} color={C.f} attach={hit ? 'nw' : 'se'} gap={12}>{hit ? 'P (½, 0)' : 'P'}</Label>
      </Plane>
      <Controls>
        <Slider label="x_0" value={x0} onChange={setX0} min={X_MIN} max={X_MAX} step={0.01} />
        <Buttons>
          <ActionButton label="Snap to gradient 2" onClick={() => setX0(0.5)} />
          <Toggle label="Compare y = logₑ(x)" checked={ghost} onChange={setGhost} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={hit ? '\\dfrac{dy}{dx} = \\dfrac{1}{x_0} = 2' : `\\dfrac{dy}{dx} = \\dfrac{1}{x_0} = ${num(m)}`} />
          <Readout color={C.g} tex={hit ? '\\text{tangent: } y = 2x - 1' : `\\text{tangent: } y = ${num(m)}x ${cStr}`} />
          <Readout color={C.good} tex={hit ? 'Q = (0, -1)' : `Q = (0, ${num(c)})`} />
        </Readouts>
        {notice}
        {ghost && (
          <Notice>
            The dashed curve <M>{'y = \\log_e(x)'}</M> is the same shape, lowered by <M>{'\\log_e(2) \\approx 0.69'}</M>,
            because <M>{'\\log_e(2x) = \\log_e(2) + \\log_e(x)'}</M>. So the two tangents at the same <M>x</M> are
            parallel: both gradients are <M>{'\\tfrac1x'}</M>. A derivative of <M>{'\\tfrac2x'}</M> would double the
            gradient, and the picture shows it doesn&apos;t.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
