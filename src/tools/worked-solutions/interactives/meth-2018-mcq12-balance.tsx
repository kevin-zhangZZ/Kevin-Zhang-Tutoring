// 2018 Methods Exam 2 MCQ 12 — the mean is the BALANCE POINT of the probability bars, not the point
// with half the probability on each side. Bars for x = 0, 1, 2, 3, 6 (heights 1/4, 9/20, 1/10, 1/20,
// 3/20) stand on a beam resting on a pivot at x = c. The beam tips towards the bigger pull
// (Σ distance × probability on each side); the pulls cancel only at c = μ = 1.7. The orange bars
// (x < c) add up to Pr(X < c), which is 7/10 at the balance point: the lone bar at 6 is far out,
// so its small probability has a lot of leverage. Buttons put the pivot at 1 (the tallest bar,
// Pr(X < 1) = 1/4, option B) and at 2.4 (the plain average of the five x-values, Pr(X < 2.4) = 4/5,
// option D); neither balances.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Polygon, Readout, Readouts, Slider } from './kit'

const XS = [0, 1, 2, 3, 6]
const W20 = [5, 9, 2, 1, 3] // Pr(X = x) in twentieths
const P = W20.map(w => w / 20)
const P_TEXT = ['1/4', '9/20', '1/10', '1/20', '3/20']
const H = 0.1 // beam height above the ground when level
const HALF = 0.22 // half-width of a bar
const B0 = -0.6
const B1 = 6.6

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
const over20 = (n: number) => {
  if (n === 0) return '0'
  const g = gcd(n, 20)
  return 20 / g === 1 ? String(n / g) : `\\tfrac{${n / g}}{${20 / g}}`
}

export default function Balance() {
  const [t, setT] = useState(24) // pivot c = t/10
  const c = t / 10

  const torque = XS.reduce((s, x, i) => s + (x - c) * P[i], 0) // > 0 tips right
  const leftPull = XS.reduce((s, x, i) => s + (x < c ? (c - x) * P[i] : 0), 0)
  const rightPull = XS.reduce((s, x, i) => s + (x > c ? (x - c) * P[i] : 0), 0)
  const below = XS.reduce((s, x, i) => s + (x < c ? W20[i] : 0), 0) // Pr(X < c) in twentieths
  const balanced = t === 17

  // A qualitative tilt that never lets either end of the beam touch the ground.
  const maxSlope = (H - 0.015) / Math.max(c - B0, B1 - c)
  const slope = balanced ? 0 : -maxSlope * Math.tanh(3 * torque)
  const beam = (x: number) => H + slope * (x - c)

  let notice
  if (balanced) {
    notice = (
      <Notice tone="good">
        <b>Balanced at <M>c = 1.7 = \mu</M>.</b> The values strictly below <M>\mu</M> are the orange bars, so{' '}
        <M>{'\\Pr(X<\\mu) = \\tfrac14 + \\tfrac{9}{20} = \\tfrac{7}{10}'}</M>, far more than half. The lone bar at{' '}
        <M>6</M> sits <M>4.3</M> from the pivot, so its small <M>{'\\tfrac{3}{20}'}</M> pulls{' '}
        <M>{'4.3 \\times 0.15 \\approx 0.65'}</M>, almost the whole right side. That leverage is why the mean sits above
        most of the probability.
      </Notice>
    )
  } else if (t === 24) {
    notice = (
      <Notice tone="warn">
        <M>2.4</M> is the plain average <M>{'\\tfrac{0+1+2+3+6}{5}'}</M>, which treats all five values as equally
        likely. The beam <b>tips left</b>: the heavy bars at <M>0</M> and <M>1</M> win, so the pivot is too far right.
        This pivot gives <M>{'\\Pr(X<2.4) = \\tfrac45'}</M>, option D. Slide it left until the beam is level.
      </Notice>
    )
  } else if (t === 10) {
    notice = (
      <Notice tone="warn">
        <M>1</M> is the tallest bar, the <em>most likely</em> value, not the mean. The beam <b>tips right</b>: the bar
        at <M>6</M> is far out and pulls hard. This pivot gives <M>{'\\Pr(X<1) = \\tfrac14'}</M>, option B.
      </Notice>
    )
  } else {
    const between = c > 1 && c < 2
    notice = (
      <Notice>
        The <b>{torque > 0 ? 'right' : 'left'} pull is bigger</b>, so the beam tips {torque > 0 ? 'right' : 'left'}:
        slide the pivot {torque > 0 ? 'right' : 'left'} until the pulls are equal.
        {between ? (
          <>
            {' '}Notice <M>{'\\Pr(X<c)'}</M> stays <M>{'\\tfrac{7}{10}'}</M> anywhere between <M>1</M> and <M>2</M>: you
            only need to know which two values the mean falls between.
          </>
        ) : null}
      </Notice>
    )
  }

  const barColor = (x: number) => (Math.abs(x - c) < 1e-9 ? C.guide : x < c ? C.g : C.f)

  return (
    <div>
      <Plane x={[-0.6, 6.6]} y={[0, 0.66]} xStep={1} yStep={0.1} yLabels={false} yLabel="" height={290}>
        <Label at={[0, 0]} attach="sw" gap={5}>0</Label>
        {balanced && (
          <>
            <Line.Segment point1={[1.7, 0]} point2={[1.7, 0.64]} color={C.good} style="dashed" weight={2} />
            <Label at={[1.7, 0.62]} attach="e" color={C.good}>μ = 1.7</Label>
          </>
        )}
        <Polygon points={[[c, H], [c - 0.12, 0], [c + 0.12, 0]]} color={C.guide} fillOpacity={0.7} weight={1} />
        <Line.Segment point1={[B0, beam(B0)]} point2={[B1, beam(B1)]} color={C.ink} weight={4} />
        {XS.map((x, i) => (
          <Polygon
            key={x}
            points={[
              [x - HALF, beam(x - HALF)],
              [x + HALF, beam(x + HALF)],
              [x + HALF, beam(x + HALF) + P[i]],
              [x - HALF, beam(x - HALF) + P[i]],
            ]}
            color={barColor(x)}
            fillOpacity={0.5}
            weight={1.5}
          />
        ))}
        {XS.map((x, i) => (
          <Label key={x} at={[x, beam(x) + P[i]]} attach="n" color={barColor(x)} size={12}>
            {P_TEXT[i]}
          </Label>
        ))}
      </Plane>
      <Controls>
        <Slider label="c" value={t} onChange={setT} min={0} max={60} step={1} format={v => (v / 10).toFixed(1)} />
        <Buttons>
          <ActionButton label="c = 1 (tallest bar)" onClick={() => setT(10)} />
          <ActionButton label="c = 2.4 (plain average)" onClick={() => setT(24)} />
          <ActionButton label="c = 1.7" onClick={() => setT(17)} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\text{left pull} = ${leftPull.toFixed(3)}`} />
          <Readout color={C.f} tex={`\\text{right pull} = ${rightPull.toFixed(3)}`} />
          <Readout color={C.g} tex={`\\Pr(X<c) = ${over20(below)}`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          Pull on each side <M>{'= \\sum |x - c| \\times \\Pr(X = x)'}</M> over the bars on that side.
        </p>
        {notice}
      </Controls>
    </div>
  )
}
