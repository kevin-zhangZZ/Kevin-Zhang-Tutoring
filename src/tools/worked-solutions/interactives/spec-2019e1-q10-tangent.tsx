// 2019 Specialist Exam 1 Q10 — the relation sin(x²) + cos(y²) = (3√2/π)xy is a curve, and dy/dx
// at a point is the slope of its tangent there. Slide P along the curve: the two sides of the
// relation stay equal at every point (so they must change at the same rate as x changes — the
// reason we may differentiate both sides), and the green tangent's slope comes from the implicit
// derivative (2x cos x² − (3√2/π)y)/(2y sin y² + (3√2/π)x). At the exam's point (√π/√6, √π/√3) it is
// (π − 2√3)/(√2(π + √3)) ≈ −0.047: nearly flat, slightly downhill, which is the sign check for the
// surd answer. A toggle drops the dy/dx from the cos(y²) term (treating y as a constant): that line,
// slope ≈ −1.95 at the exam's point, slices through the curve instead of touching it.
// All values checked with sympy/scipy.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider,
  Toggle, clamp, num,
} from './kit'

const K = (3 * Math.SQRT2) / Math.PI
const F = (x: number, y: number) => Math.sin(x * x) + Math.cos(y * y) - K * x * y

// The branch through the exam's point. For x > 0, F(x, ·) is strictly decreasing on [0, √π]
// (∂F/∂y = −2y sin y² − Kx < 0) with F(x, 0) = 1 + sin x² ≥ 0 and F(x, √π) < 0, so the curve
// has exactly one point above each x in that band — found by bisection.
function curveY(x: number): number {
  let lo = 0
  let hi = Math.sqrt(Math.PI)
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2
    if (F(x, mid) > 0) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

// 2x cos x² − 2y sin y² · y' = K(y + x y')  ⇒  y' = (2x cos x² − Ky)/(2y sin y² + Kx)
const slope = (x: number, y: number) => (2 * x * Math.cos(x * x) - K * y) / (2 * y * Math.sin(y * y) + K * x)
// Wrong: d/dx cos(y²) written as −2y sin y² (no y'):  2x cos x² − 2y sin y² = K(y + x y')
const wrongSlope = (x: number, y: number) => (2 * x * Math.cos(x * x) - 2 * y * Math.sin(y * y) - K * y) / (K * x)

const X0 = Math.sqrt(Math.PI / 6)
const Y0 = Math.sqrt(Math.PI / 3)
const XMIN = 0.05
const XMAX = 2.35

export default function ImplicitTangent() {
  const [x, setXRaw] = useState(X0)
  const [wrong, setWrong] = useState(false)
  const setX = (v: number) => setXRaw(Math.abs(v - X0) < 0.012 ? X0 : clamp(v, XMIN, XMAX))

  const y = curveY(x)
  const m = slope(x, y)
  const mw = wrongSlope(x, y)
  const lhs = Math.sin(x * x) + Math.cos(y * y)
  const rhs = K * x * y
  const atExam = x === X0

  // Where the wrong line crosses height 0.15, for its label.
  const wx = x + (0.15 - y) / mw
  const showWrongLabel = wrong && wx > 0.1 && wx < 2.0

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        Without the <M>{'\\tfrac{dy}{dx}'}</M> on the <M>{'\\cos(y^2)'}</M> term, the red line has slope{' '}
        <M>{`\\approx ${num(mw, 2)}`}</M> here, and it cuts across the curve instead of touching it. As P moves along the
        curve, <M>y</M> changes as <M>x</M> changes, so <M>{'\\cos(y^2)'}</M> changes at the rate{' '}
        <M>{'-2y\\sin(y^2)\\tfrac{dy}{dx}'}</M>. Slide P and compare the red line with the green tangent.
      </Notice>
    )
  } else if (atExam) {
    notice = (
      <Notice tone="good">
        <b>The exam&apos;s point.</b> Both sides equal <M>1</M> here: <M>{'\\tfrac12+\\tfrac12'}</M> on the left. The
        tangent is almost flat and tilts slightly downhill, so <M>{'\\tfrac{dy}{dx}\\approx -0.047'}</M>. That is the
        sign check for the surd answer: <M>{'\\pi-2\\sqrt3<0'}</M> because <M>{'\\pi\\approx3.14'}</M> is less than{' '}
        <M>{'2\\sqrt3\\approx3.46'}</M>. Now drag P along the curve.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Wherever P is on the curve, the two sides are equal (both <M>{`\\approx ${num(lhs, 3)}`}</M>). So as P slides,
        they change at the same rate, which is why we may differentiate both sides with respect to <M>x</M>. The
        slope depends on both coordinates of P. Try the toggle to see what goes wrong without the{' '}
        <M>{'\\tfrac{dy}{dx}'}</M> on <M>{'\\cos(y^2)'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, 2.4]}
        y={[0, 1.4]}
        xStep={0.5}
        yStep={0.5}
        height={300}
        xLabels={v => (v > 2.3 ? '' : String(v))}
        yLabels={v => (v > 1.3 ? '' : String(v))}
      >
        <Plot.OfX y={curveY} domain={[0.001, 2.4]} color={C.f} weight={3} />
        {!atExam && (
          <>
            <Point x={X0} y={Y0} color={C.guide} />
            <Label at={[X0, Y0]} attach="s" color={C.guide} size={12} bold={false}>
              exam&apos;s point
            </Label>
          </>
        )}
        {wrong && <Line.PointSlope point={[x, y]} slope={mw} color={C.bad} style="dashed" weight={2.5} />}
        {showWrongLabel && (
          <Label at={[wx, 0.15]} attach="e" color={C.bad} size={12}>
            no dy/dx
          </Label>
        )}
        <Line.PointSlope point={[x, y]} slope={m} color={C.good} weight={2.5} />
        <MovablePoint point={[x, y]} onMove={p => setX(p[0])} color={atExam ? C.good : C.f} />
        <Label at={[x, y]} attach={m < 0 ? 'ne' : 'nw'} gap={12}>
          P
        </Label>
        <Label at={[2.38, 1.36]} attach="sw" color={C.f} size={12}>
          sin(x²) + cos(y²) = (3√2/π)xy
        </Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={setX} min={XMIN} max={XMAX} step={0.005} format={v => v.toFixed(3)} />
        <Buttons>
          <ActionButton label="Back to the exam's point" onClick={() => setXRaw(X0)} />
          <Toggle label="Forget the dy/dx on cos(y²)" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout tex={atExam ? 'P = \\left(\\tfrac{\\sqrt\\pi}{\\sqrt6},\\ \\tfrac{\\sqrt\\pi}{\\sqrt3}\\right)' : `P \\approx (${num(x, 3)},\\ ${num(y, 3)})`} />
          <Readout tex={`\\sin(x^2)+\\cos(y^2) \\approx ${num(lhs, 3)}`} />
          <Readout tex={`\\tfrac{3\\sqrt2}{\\pi}xy \\approx ${num(rhs, 3)}`} />
          <Readout
            color={C.good}
            tex={atExam ? '\\tfrac{dy}{dx} = \\tfrac{\\pi-2\\sqrt3}{\\sqrt2(\\pi+\\sqrt3)} \\approx -0.047' : `\\tfrac{dy}{dx} \\approx ${num(m, 3)}`}
          />
          {wrong && <Readout color={C.bad} tex={`\\text{no }\\tfrac{dy}{dx}\\text{ on }\\cos(y^2)\\text{: slope} \\approx ${num(mw, 2)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
