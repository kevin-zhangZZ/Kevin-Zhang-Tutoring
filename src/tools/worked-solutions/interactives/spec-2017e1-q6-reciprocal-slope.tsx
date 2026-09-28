// 2017 Specialist Exam 1 Q6 — why the derivative of f(x) = 1/arcsin(x) is negative everywhere,
// and why "flip the derivative of arcsin" (giving √(1 − x²), one of the report's most common wrong
// derivatives) can't be right. Slide x: arcsin(x) (orange) rises, so its reciprocal f (sky) falls
// on both branches, and the green tangent has gradient f′(x) = −(arcsin x)′ / (arcsin x)². A toggle
// draws the red line of gradient √(1 − x²) through the same point: it rises while f falls.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const g = (x: number) => Math.asin(x)
const gp = (x: number) => 1 / Math.sqrt(1 - x * x)
const f = (x: number) => 1 / Math.asin(x)
const fp = (x: number) => -gp(x) / g(x) ** 2
const wrongSlope = (x: number) => Math.sqrt(1 - x * x)

// Plain-hyphen number formatting for TeX readouts.
const fmt = (v: number, dp = 2) => {
  const s = v.toFixed(dp)
  return Number(s) === 0 ? (0).toFixed(dp) : s
}

// The plane shows roughly 2.9 x-units across ~650 px and 9.3 y-units down 320 px, so a tangent of
// gradient m drawn as a segment of about the same on-screen length at every point needs this dx.
const SX = 650 / 2.9
const SY = 320 / 9.3
function tangent(x0: number, m: number, halfPx = 62): [[number, number], [number, number]] {
  const y0 = f(x0)
  const dx = halfPx / Math.sqrt(SX * SX + m * m * SY * SY)
  return [
    [x0 - dx, y0 - m * dx],
    [x0 + dx, y0 + m * dx],
  ]
}

// Branches of f, stopped where they leave the plane (|f| = 4.6 at arcsin(x) = ±1/4.6).
const X_IN = Math.sin(1 / 4.6)

export default function ReciprocalSlope() {
  const [x0, setX0] = useState(0.5)
  const [wrong, setWrong] = useState(false)

  const atZero = Math.abs(x0) < 1e-9
  const onScreen = !atZero && Math.abs(f(x0)) <= 3.9
  const m = atZero ? NaN : fp(x0)
  const w = wrongSlope(x0)
  const [t1, t2] = onScreen ? tangent(x0, m) : [[0, 0], [0, 0]] as [[number, number], [number, number]]
  const [r1, r2] = onScreen ? tangent(x0, w) : [[0, 0], [0, 0]] as [[number, number], [number, number]]
  const xs = fmt(x0)

  let notice
  if (atZero) {
    notice = (
      <Notice tone="warn">
        <b>
          <M>f(0)</M> doesn&apos;t exist
        </b>
        : <M>{'\\arcsin(0) = 0'}</M>, and <M>{'\\tfrac{1}{0}'}</M> is undefined. With no point on the graph there is no
        tangent either. Move <M>x</M> a little either side of <M>0</M>.
      </Notice>
    )
  } else if (!onScreen) {
    notice = (
      <Notice>
        Near <M>x = 0</M>, <M>{'\\arcsin(x)'}</M> is tiny, so <M>f(x)</M> is huge (off the screen) and so is{' '}
        <M>{`f'(x) \\approx ${fmt(m, 1)}`}</M>. That&apos;s the <M>{'(\\arcsin x)^2'}</M> in the denominator of{' '}
        <M>{"f'(x)"}</M>: a small number squared on the bottom of a fraction makes the fraction enormous.
      </Notice>
    )
  } else if (wrong) {
    notice = (
      <Notice tone="warn">
        The red line has gradient <M>{`\\sqrt{1-x^2} \\approx ${fmt(w)}`}</M>, which is{' '}
        <M>{"1 \\div (\\arcsin x)'"}</M>. It <b>rises</b>, but <M>f</M> is <b>falling</b> here, so it can&apos;t be the
        tangent. Flipping a derivative is the rule for an <em>inverse</em> function (<M>{'\\tfrac{dy}{dx} = 1 \\div \\tfrac{dx}{dy}'}</M>),
        not a reciprocal. Slide <M>x</M>: the red line never lines up with the curve.
      </Notice>
    )
  } else if (x0 > 0) {
    notice = (
      <Notice>
        As <M>x</M> increases, <M>{'\\arcsin(x)'}</M> (orange) increases, and <M>1</M> divided by a bigger number is
        smaller, so <M>f</M> <b>falls</b>: the green tangent slopes down. The chain rule gives the exact gradient,{' '}
        <M>{`f'(${xs}) \\approx ${fmt(m)}`}</M>, where the minus sign is the fall. Now try a negative <M>x</M>, then turn
        on the toggle.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        On the left branch <M>f</M> is negative but <b>still falling</b>: <M>{'\\arcsin(x)'}</M> rises from{' '}
        <M>{'-\\tfrac{\\pi}{2}'}</M> towards <M>0</M>, so <M>{'\\tfrac{1}{\\arcsin(x)}'}</M> drops from{' '}
        <M>{'-\\tfrac{2}{\\pi}'}</M> towards <M>{'-\\infty'}</M>. So <M>{`f'(${xs}) \\approx ${fmt(m)}`}</M> is negative
        too: every factor in <M>{"f'(x)"}</M> is positive except the <M>-1</M> on top.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.25, 1.25]} y={[-4, 4]} xStep={0.5} yStep={1} height={320}>
        <Plot.OfX y={g} domain={[-1, 1]} color={C.g} weight={2.5} />
        <Plot.OfX y={f} domain={[X_IN, 1]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[-1, -X_IN]} color={C.f} weight={3} />
        <Point x={1} y={f(1)} color={C.f} />
        <Point x={-1} y={f(-1)} color={C.f} />
        <Line.Segment point1={[0, -4]} point2={[0, 4]} color={C.bad} style="dashed" weight={1.5} opacity={0.6} />
        <Label at={[-0.6, g(-0.6)]} color={C.g} attach="se">
          arcsin x
        </Label>
        <Label at={[-0.45, f(-0.45)]} color={C.f} attach="sw">
          y = f(x)
        </Label>
        {!atZero && (
          <>
            <Line.Segment
              point1={[x0, g(x0)]}
              point2={[x0, Math.max(-4, Math.min(4, f(x0)))]}
              color={C.guide}
              style="dashed"
              weight={1.5}
            />
            <Point x={x0} y={g(x0)} color={C.g} />
          </>
        )}
        {onScreen && (
          <>
            {wrong && <Line.Segment point1={r1} point2={r2} color={C.bad} weight={3} />}
            <Line.Segment point1={t1} point2={t2} color={C.good} weight={3} />
            <Point x={x0} y={f(x0)} color={C.f} />
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={-0.95} max={0.95} step={0.01} />
        <div>
          <Toggle label="Try 1 ÷ (arcsin x)′ as the gradient" checked={wrong} onChange={setWrong} />
        </div>
        <Readouts>
          {!atZero && <Readout color={C.g} tex={`\\arcsin(${xs}) \\approx ${fmt(g(x0), 3)}`} />}
          <Readout color={C.g} tex={`(\\arcsin x)' = \\tfrac{1}{\\sqrt{1-x^2}} \\approx ${fmt(gp(x0))}`} />
          {atZero ? (
            <Readout color={C.bad} tex={"f'(0)\\ \\text{undefined}"} />
          ) : (
            <Readout color={C.good} tex={`f'(${xs}) = -\\tfrac{(\\arcsin x)'}{(\\arcsin x)^2} \\approx ${fmt(m)}`} />
          )}
          {wrong && <Readout color={C.bad} tex={`\\sqrt{1-x^2} \\approx ${fmt(w)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
