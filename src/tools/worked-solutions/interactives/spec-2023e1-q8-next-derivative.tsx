// 2023 Specialist Exam 1 Q8 — the inductive step needs f^(k+1)(x), and f^(k+1) is simply the
// gradient function of f^(k): differentiate once more. Pick k = 1, 2, 3 and slide x: the tangent
// to y = f^(k)(x) (gradient measured numerically) always has the gradient the formula gives for
// n = k + 1. The examiner's report says many students instead treated (k) like an index and wrote
// f^(k+1) = f^(k) × f′; the toggle draws a line with that "gradient", which cuts across the curve
// (at x = −1/2 it is flat, because f′(−1/2) = 0, while the curve is clearly rising). For each k the
// guess equals the true gradient at one x (sympy: ≈ −0.97, −1.48, −1.99), so that case has its own Notice.
// Readability: the curve stops at the y-axis (as the x slider does), so it never runs over the
// y-axis numbers; the x-axis numbers are drawn by hand, above the axis when k = 1 (that curve runs
// just under the axis for x < −1/2, right where mafs puts them) and below it otherwise.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num,
} from './kit'

/** f^(n)(x) = (2^n x + n·2^(n−1)) e^(2x) — the statement being proved (checked against sympy for n = 1…7). */
const deriv = (n: number) => (x: number) => (2 ** n * x + n * 2 ** (n - 1)) * Math.exp(2 * x)
const fPrime = deriv(1)

const Y: Record<number, { y: [number, number]; step: number }> = {
  1: { y: [-0.5, 2], step: 0.5 },
  2: { y: [-2, 6], step: 2 },
  3: { y: [-4, 16], step: 4 },
}
const NAME: Record<number, string> = { 1: 'y = f⁽¹⁾(x)', 2: 'y = f⁽²⁾(x)', 3: 'y = f⁽³⁾(x)' }
const fmtX = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1)).replace('-', '−')
const X_TICKS = [-2.5, -2, -1.5, -1, -0.5, 0.5]

export default function NextDerivative() {
  const [k, setK] = useState(1)
  const [x0, setX0] = useState(-0.25)
  const [guess, setGuess] = useState(false)

  const fk = deriv(k)
  const y0 = fk(x0)
  // The tangent's gradient, measured straight off the curve (central difference), not from the formula.
  const h = 1e-5
  const measured = (fk(x0 + h) - fk(x0 - h)) / (2 * h)
  const formula = deriv(k + 1)(x0)
  const guessSlope = y0 * fPrime(x0)
  const atHalf = Math.abs(x0 + 0.5) < 0.015
  // The guess and the true gradient cross at one x for each k (≈ −0.97, −1.48, −1.99 for k = 1, 2, 3).
  const coincide = Math.abs(guessSlope - formula) < 0.04 * Math.max(1, Math.abs(formula))
  const a = 2 ** (k + 1)
  const b = (k + 1) * 2 ** k
  const { y, step } = Y[k]
  const xs = num(x0, 2)

  let notice
  if (!guess) {
    notice = (
      <Notice>
        The green line is the tangent to <M>{`y = f^{(${k})}(x)`}</M> at <M>{`x = ${xs}`}</M>. Its gradient is exactly
        what the formula gives for <M>{`n = ${k + 1}`}</M>, <M>{`f^{(${k + 1})}(x) = (${a}x+${b})e^{2x}`}</M>: the next derivative <b>is</b> the gradient function of this
        one, so the inductive step must <b>differentiate</b> <M>{'f^{(k)}(x)'}</M>. Change <M>k</M> and <M>x</M> — they
        always agree. Then turn on &ldquo;Index-law guess&rdquo;.
      </Notice>
    )
  } else if (atHalf) {
    notice = (
      <Notice tone="warn">
        At <M>{'x = -\\tfrac12'}</M>, <M>{"f'(x) = 0"}</M>, so the guess <M>{"f^{(k)}\\times f'"}</M> predicts a gradient
        of <M>0</M>: the red line is flat. But the curve is clearly rising here, with gradient{' '}
        <M>{`f^{(${k + 1})}(-\\tfrac12) \\approx ${num(formula, 2)}`}</M>. Change <M>k</M>: the red line stays flat
        every time, while the true gradient grows. Multiplying by <M>{"f'"}</M> is not differentiating.
      </Notice>
    )
  } else if (coincide) {
    notice = (
      <Notice tone="warn">
        Here the red line lies almost on the green tangent: at this one <M>x</M> the guess{' '}
        <M>{`f^{(${k})}(${xs})\\times f'(${xs}) \\approx ${num(guessSlope, 2)}`}</M> happens to equal the true gradient.
        That is a coincidence, not a rule: move <M>x</M> a little either way and the two lines separate. Then try{' '}
        <M>{'x = -\\tfrac12'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        The red dashed line has the gradient the index-law guess predicts,{' '}
        <M>{`f^{(${k})}(${xs})\\times f'(${xs}) \\approx ${num(guessSlope, 2)}`}</M>. It cuts across the curve instead of
        touching it (except by coincidence at one <M>x</M>), so it is not the next derivative: the <M>(k)</M> counts differentiations, it is not a power. Try{' '}
        <M>{'x = -\\tfrac12'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.5, 0.5]} y={y} xStep={0.5} yStep={step} height={320} xLabels={false} yLabels={fmtX}>
        <Plot.OfX y={fk} domain={[-2.5, 0]} color={C.f} weight={3} />
        <Label at={[-2.45, y[1] - 0.12 * (y[1] - y[0])]} color={C.f} attach="e" gap={4}>
          {NAME[k]}
        </Label>
        {guess && <Line.PointSlope point={[x0, y0]} slope={guessSlope} color={C.bad} style="dashed" weight={2} />}
        <Line.PointSlope point={[x0, y0]} slope={measured} color={C.good} weight={2.5} />
        {/* Tick numbers after the curve and lines, so their halo keeps them readable where a line crosses. */}
        {X_TICKS.map(v => (
          <Label key={v} at={[v, 0]} attach={k === 1 ? 'n' : 's'} gap={5} size={12} bold={false}>
            {fmtX(v)}
          </Label>
        ))}
        <Point x={x0} y={y0} color={C.f} />
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={v => setK(Math.round(v))} min={1} max={3} step={1} format={v => String(v)} />
        <Slider label="x" value={x0} onChange={setX0} min={-2.5} max={0} step={0.01} format={v => num(v, 2)} />
        <Buttons>
          <Toggle label="Index-law guess" checked={guess} onChange={setGuess} />
          <ActionButton label={<>Go to <M>{'x = -\\tfrac12'}</M></>} onClick={() => setX0(-0.5)} />
        </Buttons>
        <Readouts>
          <Readout color={C.good} tex={`\\text{tangent gradient} \\approx ${num(measured, 2)}`} />
          <Readout tex={`\\text{formula: } f^{(${k + 1})}(${xs}) \\approx ${num(formula, 2)}`} />
          {guess && <Readout color={C.bad} tex={`f^{(${k})}\\times f' \\approx ${num(guessSlope, 2)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
