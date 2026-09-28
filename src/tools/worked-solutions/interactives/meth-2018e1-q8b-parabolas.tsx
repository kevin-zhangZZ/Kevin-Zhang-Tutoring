// 2018 Methods Exam 1 Q8b — f(x) = x²e^{kx} meets f′(x) = xe^{kx}(kx + 2) exactly where x² = x(kx + 2),
// because e^{kx} > 0 divides out without changing any crossing. So the question becomes: where do the
// parabolas y = x² and y = kx² + 2x meet? Always at the origin, and again at x = 2/(1 − k). Slide k: as
// k → 1 the second crossing runs off to infinity (to the right for k < 1, back in from the left for
// k > 1). At k = 1 the parabolas are translates of each other, so they meet once only. A toggle tries
// the "Δ = 0" idea and shows Δ = 4 for every k.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle,
  num, usePlayer,
} from './kit'

const X: [number, number] = [-6, 6]
const Y: [number, number] = [-4, 20]

export default function Parabolas() {
  const [k, setK] = useState(0.5)
  const [disc, setDisc] = useState(false)
  const player = usePlayer(setK, { min: 0.1, max: 3, seconds: 9 })

  const one = Math.abs(k - 1) < 0.005
  const x2 = one ? NaN : 2 / (1 - k)
  const y2 = x2 * x2
  const onScreen = !one && x2 >= X[0] && x2 <= X[1] && y2 <= Y[1]
  const p = (x: number) => x * x
  const q = (x: number) => k * x * x + 2 * x
  // Label the second parabola on its right-hand branch where it reaches y = 6.
  const qx = (-2 + Math.sqrt(4 + 24 * k)) / (2 * k)

  let notice
  if (disc) {
    notice = (
      <Notice tone="warn">
        The equation is <M>{'(1-k)x^2 - 2x = 0'}</M>, so <M>{'\\Delta = (-2)^2 - 4(1-k)(0) = 4'}</M> for <b>every</b>{' '}
        <M>k</M>. Setting <M>\Delta = 0</M> finds nothing. <M>\Delta = 0</M> detects two roots merging, but here one
        root is stuck at <M>0</M> and the other, <M>{'\\tfrac{2}{1-k}'}</M>, can never equal <M>0</M>. The single root
        comes from <M>1 - k = 0</M>, where the equation is no longer a quadratic at all.
      </Notice>
    )
  } else if (one) {
    notice = (
      <Notice tone="good">
        <b>At <M>k = 1</M> the curves are <M>{'y = x^2'}</M> and <M>{'y = x^2 + 2x = (x+1)^2 - 1'}</M>:</b> the same
        parabola, just shifted. The gap between them is <M>{'(x^2 + 2x) - x^2 = 2x'}</M>, a straight line that is zero
        only at <M>x = 0</M>, so the origin is the only intersection. That is why <M>k = 1</M>.
      </Notice>
    )
  } else if (k < 1) {
    notice = (
      <Notice>
        Dividing <M>{"f(x) = f'(x)"}</M> by <M>{'e^{kx} > 0'}</M> leaves <M>{'x^2 = x(kx+2)'}</M>: the same crossing{' '}
        <M>x</M>-values, now on two parabolas. They always meet at the origin (green). For <M>{'k < 1'}</M> the orange
        one is wider, so <M>{'x^2'}</M> catches it again at <M>{'x = \\tfrac{2}{1-k}'}</M>. Slide <M>k</M> towards{' '}
        <M>1</M> and watch that crossing run away.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        For <M>{'k > 1'}</M> the orange parabola is narrower, so the second crossing is back, on the left, at{' '}
        <M>{'x = \\tfrac{2}{1-k} < 0'}</M>. The domain of <M>f</M> is <M>R</M>, so a negative <M>x</M> is still a
        genuine intersection: <M>{'k = 2'}</M> gives two. Only <M>k = 1</M> loses the second one.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={X} y={Y} xStep={2} yStep={4} height={320}>
        <Plot.OfX y={p} domain={X} color={C.f} weight={3} />
        <Plot.OfX y={q} domain={X} color={C.g} weight={3} />
        <Label at={[-3.3, p(-3.3)]} color={C.f} attach="w">x²</Label>
        <Label at={[qx, 6]} color={C.g} attach="w">x(kx + 2)</Label>
        <Point x={0} y={0} color={C.good} />
        {onScreen && (
          <>
            <Point x={x2} y={y2} color={C.violet} />
            <Label at={[x2, y2]} color={C.violet} attach={x2 > 0 ? 'se' : 'sw'}>
              {`x = ${num(x2, 2)}`}
            </Label>
          </>
        )}
        {!one && !onScreen && (
          <Label at={x2 > 0 ? [X[1], 0.8] : [X[0], 0.8]} color={C.violet} attach={x2 > 0 ? 'nw' : 'ne'}>
            {x2 > 0 ? `2nd at x ≈ ${num(x2, 1)} →` : `← 2nd at x ≈ ${num(x2, 1)}`}
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider
          label="k"
          value={k}
          onChange={v => {
            player.stop()
            setK(v)
          }}
          min={0.1}
          max={3}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(k)} label="Sweep k from 0.1 to 3" />
          <Toggle label="Try “one solution means Δ = 0”" checked={disc} onChange={setDisc} />
        </Buttons>
        <Readouts>
          <Readout tex={one ? '(1-k)x^2 - 2x = -2x = 0' : `x\\big(${num(1 - k)}x - 2\\big) = 0`} />
          {one ? (
            <Readout color={C.good} tex={'x = 0 \\text{ only}'} />
          ) : (
            <Readout color={C.violet} tex={`x = 0 \\text{ or } x = \\tfrac{2}{1-k} = ${num(x2)}`} />
          )}
          {disc && <Readout color={C.bad} tex={'\\Delta = 4 \\ne 0'} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
