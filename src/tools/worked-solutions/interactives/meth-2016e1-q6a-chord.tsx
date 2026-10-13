// 2016 Methods Exam 1 Q6a — the average rate of change is the gradient of the chord, and it
// depends only on the two endpoint heights. Step 1 plots the endpoints of f(x) = 2sin(2x) − 1 at
// x = −π/3 and x = π/6 (the left one is far below the midline, because sin(−2π/3) is negative —
// the evaluation the report says went wrong most). Step 2 draws the chord with its rise 2√3 and
// run π/2, gradient 4√3/π ≈ 2.21. Step 3 shows the report's "average of derivatives" slip: the
// tangents at the endpoints have gradients −2 and 2, which average to 0, not 2.21.
// Values checked with sympy.

import {
  C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, StepNav, useSteps,
} from './kit'

const PI = Math.PI
const f = (x: number) => 2 * Math.sin(2 * x) - 1
const df = (x: number) => 4 * Math.cos(2 * x)
const A = -PI / 3
const B = PI / 6
const FA = f(A) // −√3 − 1 ≈ −2.732
const FB = f(B) // √3 − 1 ≈ 0.732
const NAMES: Record<number, string> = { [-3]: '−π/2', [-2]: '−π/3', [-1]: '−π/6', 1: 'π/6', 2: 'π/3' }
const xl = (v: number) => {
  const k = Math.round(v / (PI / 6))
  return Math.abs(v - (k * PI) / 6) < 1e-6 ? NAMES[k] ?? '' : ''
}
const yl = (v: number) => (Number.isInteger(v) ? String(v).replace('-', '−') : '')

// A short tangent segment through (x0, f(x0)).
function tangent(x0: number, half = 0.32): [[number, number], [number, number]] {
  const m = df(x0)
  return [
    [x0 - half, f(x0) - m * half],
    [x0 + half, f(x0) + m * half],
  ]
}

export default function Chord() {
  const s = useSteps(3)
  const [ta1, ta2] = tangent(A)
  const [tb1, tb2] = tangent(B)

  return (
    <div>
      <Plane x={[-PI / 2, PI / 3]} y={[-3.2, 1.4]} xStep={PI / 6} yStep={1} height={320} xLabels={xl} yLabels={yl}>
        <Line.Segment point1={[-PI / 2, -1]} point2={[PI / 3, -1]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={f} domain={[-PI / 2, PI / 3]} color={C.f} weight={3} />
        {s.step >= 1 && (
          <>
            <Line.Segment point1={[A, FA]} point2={[B, FB]} color={C.good} weight={3} />
            <Line.Segment point1={[A, FA]} point2={[B, FA]} color={C.guide} style="dashed" weight={1.5} />
            <Line.Segment point1={[B, FA]} point2={[B, FB]} color={C.guide} style="dashed" weight={1.5} />
            <Label at={[(A + B) / 2, FA]} attach="s" color={C.ink}>run π/2</Label>
            <Label at={[B, (FA + FB) / 2]} attach="e" color={C.ink}>rise 2√3</Label>
          </>
        )}
        {s.step === 2 && (
          <>
            <Line.Segment point1={ta1} point2={ta2} color={C.bad} weight={2.5} />
            <Line.Segment point1={tb1} point2={tb2} color={C.bad} weight={2.5} />
            <Label at={ta2} attach="e" color={C.bad}>gradient −2</Label>
            <Label at={tb1} attach="w" color={C.bad}>gradient 2</Label>
          </>
        )}
        <Point x={A} y={FA} color={C.g} />
        <Point x={B} y={FB} color={C.g} />
        <Label at={[A, FA]} attach="ne" color={C.g}>(−π/3, −√3−1)</Label>
        <Label at={[B, FB]} attach="se" color={C.g}>(π/6, √3−1)</Label>
        <Label at={[-PI / 2, -1]} attach="ne" color={C.guide}>y = −1</Label>
      </Plane>
      <Controls>
        <StepNav step={s.step} count={3} onBack={s.back} onNext={s.next} />
        <Readouts>
          <Readout color={C.g} tex={`f\\!\\left(-\\tfrac{\\pi}{3}\\right) = -\\sqrt3-1 \\approx ${FA.toFixed(2).replace('-', '−')}`} />
          <Readout color={C.g} tex={`f\\!\\left(\\tfrac{\\pi}{6}\\right) = \\sqrt3-1 \\approx ${FB.toFixed(2)}`} />
          {s.step >= 1 && <Readout color={C.good} tex={`\\text{chord gradient} = \\tfrac{4\\sqrt3}{\\pi} \\approx ${((FB - FA) / (B - A)).toFixed(2)}`} />}
          {s.step === 2 && <Readout color={C.bad} tex={`\\tfrac12\\left(${df(A).toFixed(0).replace('-', '−')} + ${df(B).toFixed(0)}\\right) = 0`} />}
        </Readouts>
        {s.step === 0 && (
          <Notice>
            <b>Only these two heights matter.</b> The left point sits far <i>below</i> the midline{' '}
            <M>y = -1</M> because <M>{'\\sin\\left(-\\tfrac{2\\pi}{3}\\right) = -\\tfrac{\\sqrt3}{2}'}</M> is negative. If your
            value of <M>{'f\\left(-\\tfrac{\\pi}{3}\\right)'}</M> put this point above the midline, recheck the sign. Press
            Next to join the points.
          </Notice>
        )}
        {s.step === 1 && (
          <Notice tone="good">
            <b>The average rate of change is the gradient of this chord:</b> rise <M>2\sqrt3</M> over run{' '}
            <M>{'\\tfrac{\\pi}{2}'}</M>, which is <M>{'\\tfrac{4\\sqrt3}{\\pi}'}</M>. The curve wiggles in between, but that
            doesn&apos;t change the chord. Press Next for a tempting shortcut that fails.
          </Notice>
        )}
        {s.step === 2 && (
          <Notice tone="warn">
            <b>Averaging the endpoint gradients gives 0, not 2.21.</b> The tangents at the ends have gradients{' '}
            <M>-2</M> and <M>2</M>, yet the chord clearly climbs steeply. The rate of change between two points comes
            from their heights, <M>{'\\frac{f(b)-f(a)}{b-a}'}</M>, never from the derivative at the ends.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
