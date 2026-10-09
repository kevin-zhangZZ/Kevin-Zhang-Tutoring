// 2023 Methods Exam 2 Q1d — h(x) = f(x) + k = (x − a)(x − b)² with f(x) = x(x − 2)(x + 1).
// Adding k slides the cubic up or down without changing its turning points' x-values
// (1 ± √7)/3. The graph has a repeated root exactly when a turning point lands on the x-axis,
// which happens twice: lift the minimum (k = −f(b) ≈ 2.113, b = (1 + √7)/3, a = (1 − 2√7)/3) or
// drop the maximum (k = −f(b) ≈ −0.631, b = (1 − √7)/3, a = (1 + 2√7)/3). A toggle shows the
// report's sign slip k = f(b), which moves the turning point the wrong way.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Vector, num, tick,
} from './kit'

const f = (x: number) => x * (x - 2) * (x + 1)
const S7 = Math.sqrt(7)
const X_MAX = (1 - S7) / 3 // ≈ −0.549, the local maximum of f
const X_MIN = (1 + S7) / 3 // ≈ 1.215, the local minimum of f
const F_MAX = f(X_MAX) // ≈ 0.631
const F_MIN = f(X_MIN) // ≈ −2.113
const K_MIN = -F_MIN // ≈ 2.113: lifts the minimum onto the axis
const K_MAX = -F_MAX // ≈ −0.631: drops the maximum onto the axis
const SPECIAL = [0, K_MIN, K_MAX, F_MIN, F_MAX]
const SNAP = 0.03
const near = (k: number, v: number) => Math.abs(k - v) < 1e-6

// One real root of p on [lo, hi] by bisection (p(lo), p(hi) of opposite sign).
function bisect(p: (x: number) => number, lo: number, hi: number) {
  let a = lo
  let b = hi
  for (let i = 0; i < 60; i++) {
    const m = (a + b) / 2
    if (p(a) * p(m) <= 0) b = m
    else a = m
  }
  return (a + b) / 2
}

function roots(k: number): number[] {
  const p = (x: number) => f(x) + k
  const ends = [-4, X_MAX, X_MIN, 4]
  const out: number[] = []
  for (let i = 0; i < 3; i++) {
    const lo = ends[i]
    const hi = ends[i + 1]
    if (p(lo) * p(hi) < 0) out.push(bisect(p, lo, hi))
  }
  return out
}

export default function Touch() {
  const [k, setK] = useState(0)
  const [target, setTarget] = useState<'min' | 'max'>('min')

  const h = (x: number) => f(x) + k
  const minTouch = near(k, K_MIN)
  const maxTouch = near(k, K_MAX)
  const minSlip = near(k, F_MIN)
  const maxSlip = near(k, F_MAX)
  const slip = minSlip || maxSlip
  const touching = minTouch || maxTouch
  const b = minTouch ? X_MIN : X_MAX
  const a = 1 - 2 * b
  const xs = touching ? [] : roots(k)
  const yMax = F_MAX + k
  const yMin = F_MIN + k

  const onSlide = (v: number) => {
    const s = SPECIAL.find(t => Math.abs(v - t) < SNAP)
    setK(s ?? v)
  }
  const goMin = () => {
    setTarget('min')
    setK(K_MIN)
  }
  const goMax = () => {
    setTarget('max')
    setK(K_MAX)
  }
  const onSlip = (on: boolean) => {
    const t = minSlip || minTouch ? 'min' : maxSlip || maxTouch ? 'max' : target
    setTarget(t)
    const fb = t === 'min' ? F_MIN : F_MAX
    setK(on ? fb : -fb)
  }

  let notice
  if (minTouch) {
    notice = (
      <Notice tone="good">
        <b>The minimum now sits on the x-axis</b>, so the curve touches there: <M>{'b = \\tfrac{1+\\sqrt7}{3} \\approx 1.215'}</M> is
        the repeated root, and the curve crosses once more at <M>{'a = 1 - 2b \\approx -1.431'}</M>. The minimum started at
        height <M>{'f(b) \\approx -2.113'}</M>, so it had to rise by <M>{'k = -f(b) \\approx 2.113'}</M>. There is a second
        answer: press &ldquo;Drop the maximum onto the axis&rdquo;.
      </Notice>
    )
  } else if (maxTouch) {
    notice = (
      <Notice tone="good">
        <b>The maximum now sits on the x-axis</b>, so <M>{'b = \\tfrac{1-\\sqrt7}{3} \\approx -0.549'}</M> is the repeated
        root and <M>{'a = 1 - 2b \\approx 2.097'}</M>. The maximum started at height <M>{'f(b) \\approx 0.631'}</M>, so it had
        to drop by <M>{'0.631'}</M>: <M>{'k = -f(b) \\approx -0.631'}</M>. These are the two values of <M>b</M> from the working, so both sets
        of <M>a</M> and <M>b</M> belong in the answer. Now switch on the sign slip to see what <M>{'k = f(b)'}</M> does
        instead.
      </Notice>
    )
  } else if (minSlip) {
    notice = (
      <Notice tone="warn">
        This is the sign slip <M>{'k = f(b) \\approx -2.113'}</M>. Adding a negative number moves the curve <b>down</b>, so
        the minimum fell to <M>{'y \\approx -4.225'}</M> instead of rising to <M>0</M>: one x-intercept, no repeated root.
        The turning point is on the axis when <M>{'h(b) = f(b) + k = 0'}</M>, so <M>{'k = -f(b)'}</M>. Turn the toggle off.
      </Notice>
    )
  } else if (maxSlip) {
    notice = (
      <Notice tone="warn">
        This is the sign slip <M>{'k = f(b) \\approx 0.631'}</M>. It moved the maximum <b>up</b> to{' '}
        <M>{'y \\approx 1.262'}</M> instead of down to <M>0</M>, so there are still three separate x-intercepts and no
        repeated root. The condition is <M>{'h(b) = f(b) + k = 0'}</M>, so <M>{'k = -f(b) \\approx -0.631'}</M>. Turn the
        toggle off.
      </Notice>
    )
  } else if (k === 0) {
    notice = (
      <Notice>
        This is <M>f</M> itself (<M>k = 0</M>): three separate x-intercepts, so no repeated root yet. For one, a turning
        point has to sit exactly on the x-axis. The minimum is at height <M>{'\\approx -2.113'}</M>: slide <M>k</M> up, or
        press &ldquo;Lift the minimum onto the axis&rdquo;.
      </Notice>
    )
  } else if (yMax > 0 && yMin < 0) {
    notice = (
      <Notice>
        Adding <M>k</M> slides the whole curve {k > 0 ? 'up' : 'down'} by <M>{num(Math.abs(k), 3)}</M> without changing its
        shape, so the turning points stay at <M>{'x = \\tfrac{1\\pm\\sqrt7}{3}'}</M>. The maximum is still above the axis
        and the minimum below it, so there are three separate x-intercepts. Keep sliding until one turning point sits
        exactly on the axis.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        {k > 0 ? (
          <>
            The minimum is now <b>above</b> the axis, so the curve crosses only once: you have gone too far. The touch
            happened at exactly one value on the way up, <M>{'k \\approx 2.113'}</M>.
          </>
        ) : (
          <>
            The maximum is now <b>below</b> the axis, so the curve crosses only once: you have gone too far. The touch
            happened at exactly one value on the way down, <M>{'k \\approx -0.631'}</M>.
          </>
        )}{' '}
        Press one of the buttons to land on it exactly.
      </Notice>
    )
  }

  const showArrows = Math.abs(k) > 0.2
  // Skip an x tick number that an intercept dot would cover, and the 3 past the axis's end
  // (it crowds the axis name).
  const dots = touching ? [a, b] : xs
  const xTick = (v: number) => (v > 2.8 || dots.some(r => Math.abs(r - v) < 0.15) ? '' : tick(v))
  return (
    <div>
      <Plane x={[-2.2, 2.8]} y={[-5, 3.6]} xStep={1} yStep={1} height={330} xLabels={xTick} yLabels={v => (v > 3.6 ? '' : tick(v))}>
        <Plot.OfX y={f} domain={[-2.2, 2.8]} color={C.guide} weight={2} style="dashed" />
        <Plot.OfX y={h} domain={[-2.2, 2.8]} color={C.f} weight={3} />
        {showArrows && <Vector tail={[X_MAX, F_MAX]} tip={[X_MAX, yMax]} color={slip ? C.bad : C.violet} weight={2} />}
        {showArrows && <Vector tail={[X_MIN, F_MIN]} tip={[X_MIN, yMin]} color={slip ? C.bad : C.violet} weight={2} />}
        {!maxTouch && <Point x={X_MAX} y={yMax} color={C.violet} />}
        {!maxTouch && (
          <Label at={[X_MAX, yMax]} color={C.violet} attach={showArrows && k < 0 ? 's' : 'n'}>
            max
          </Label>
        )}
        {!minTouch && <Point x={X_MIN} y={yMin} color={C.violet} />}
        {!minTouch && (
          <Label at={[X_MIN, yMin]} color={C.violet} attach={showArrows && k > 0 ? 'n' : 's'}>
            min
          </Label>
        )}
        {xs.map(r => (
          <Point key={r} x={r} y={0} color={C.ink} />
        ))}
        {touching && <Point x={a} y={0} color={C.f} />}
        {touching && (
          <Label at={[a, 0]} color={C.f} attach="nw">
            a
          </Label>
        )}
        {touching && <Point x={b} y={0} color={C.good} />}
        {touching && (
          <Label at={[b, 0]} color={C.good} attach={minTouch ? 'n' : 's'} gap={9}>
            b
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={onSlide} min={-2.3} max={2.5} step={0.01} format={v => num(v, 3)} />
        <Buttons>
          <ActionButton label="Lift the minimum onto the axis" onClick={goMin} />
          <ActionButton label="Drop the maximum onto the axis" onClick={goMax} />
          <Toggle label="Sign slip: k = f(b)" checked={slip} onChange={onSlip} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\text{max height} \\approx ${num(yMax, 3)}`} color={C.violet} />
          <Readout tex={`\\text{min height} \\approx ${num(yMin, 3)}`} color={C.violet} />
          {touching ? (
            <Readout tex={`a \\approx ${num(a, 3)},\\ \\ b \\approx ${num(b, 3)}\\ \\text{(repeated)}`} color={C.good} />
          ) : (
            <Readout tex={`\\text{x-intercepts: } ${xs.length}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
