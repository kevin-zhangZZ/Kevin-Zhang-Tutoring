// 2020 Methods Exam 2 MCQ 6 — the height of the f′ graph is the gradient of f. Two stacked graphs
// share one x: f on top (sky blue) with its tangent at P, f′ below (orange) with the matching point
// Q. Slide x and the tangent's gradient is always Q's height. Where f′ is above the axis (green
// shading) f rises; below it (red) f falls; where f′ crosses zero f has a turning point — at the two
// crossings, both at negative x, which is what rules out option A (its minimum is right of the
// y-axis). The later dip of f′ stays above the axis, so f keeps rising and only climbs less steeply
// for a while: the bend in option B, not a third turning point.
//
// The paper gives no scale, so the curves are one function with the same features as the printed
// f′: a polynomial (fitted with sympy) with zeros at x = −3 and x = −0.9, a local minimum of −3 at
// x = −2, a local maximum of 4.3 at x = 0.6 and a local minimum of 2.8 at x = 2, rising steeply on
// both sides; f is its antiderivative through the origin, as in option B (f(−3) ≈ 2.41, f(−0.9) ≈
// −1.72). The argument uses only these features, so any f′ drawn like VCAA's gives the same answer.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Region,
  Slider, clamp, num,
} from './kit'

// f′(x) and f(x) = ∫₀ˣ f′, coefficients in ascending powers of x.
const FP = [
  3.5266030389071714, 2.601564912379745, -2.0891943913796159, -0.39402130150285567, 0.37631047717549236,
  0.025128518699268091, -0.023093980135766408, 0.00067005265841733136, 0.00073133445504869006, -7.9763186309847516e-5,
]
const F = [0, ...FP.map((c, i) => c / (i + 1))]
const horner = (co: number[]) => (x: number) => co.reduceRight((acc, c) => acc * x + c, 0)
const fp = horner(FP)
const f = horner(F)

const X0 = -3.8
const X1 = 3.1
const Z1 = -3 // first zero of f′: local max of f
const Z2 = -0.9 // second zero of f′: local min of f
const DIP_TOP = 0.6 // local max of f′
const DIP_BOTTOM = 2 // local min of f′ (still positive)
const NEAR = 0.05

const SAMPLES = Array.from({ length: 1401 }, (_, i) => X0 + ((X1 - X0) * i) / 1400)
function nearestOnF([mx, my]: [number, number]): number {
  // The two planes have different scales; weight y so a drag in pixels feels even on the f plane.
  let best = SAMPLES[0]
  let bestD = Infinity
  for (const x of SAMPLES) {
    const d = (x - mx) ** 2 + ((f(x) - my) / 2.2) ** 2
    if (d < bestD) {
      bestD = d
      best = x
    }
  }
  return best
}

export default function SlopeWidget() {
  const [x, setX] = useState(-2)
  const y = f(x)
  const m = fp(x)
  const flat = Math.abs(x - Z1) < NEAR || Math.abs(x - Z2) < NEAR
  const tanColor = flat ? C.violet : m > 0 ? C.good : C.bad
  const h = 0.55 // half-width of the tangent segment

  let notice
  if (Math.abs(x - Z1) < NEAR) {
    notice = (
      <Notice tone="good">
        <b>Q is on the axis: <M>f&apos;(x) = 0</M>, so the tangent to f is flat.</b> Just before here f′ was positive (f
        rising); just after it is negative (f falling). Rise then fall is a <b>local maximum</b> of f, at a{' '}
        <b>negative</b> <M>x</M>. Now slide on to the second crossing.
      </Notice>
    )
  } else if (Math.abs(x - Z2) < NEAR) {
    notice = (
      <Notice tone="good">
        <b>The second zero of f′: a flat tangent again.</b> This time f′ goes from negative to positive, so f stops falling
        and starts rising: a <b>local minimum</b>, and it is also left of the <M>y</M>-axis. Both turning points of f are at
        negative <M>x</M>. Option A&apos;s minimum is to the <i>right</i> of the <M>y</M>-axis, so A can&apos;t be f, however similar
        its up-down-up shape looks.
      </Notice>
    )
  } else if (x < Z1) {
    notice = (
      <Notice>
        Q is <b>above</b> the axis: <M>f&apos;(x) &gt; 0</M>, so the tangent at P slopes <b>up</b> and f is rising. The height of Q is
        the gradient at P: the higher Q, the steeper the climb. Slide right towards the first place where Q meets the axis.
      </Notice>
    )
  } else if (x < Z2) {
    notice = (
      <Notice>
        Q is <b>below</b> the axis: <M>f&apos;(x) &lt; 0</M>, so the tangent slopes <b>down</b> and f is falling. It falls fastest
        where Q is lowest. Keep sliding to the second crossing.
      </Notice>
    )
  } else if (x < DIP_TOP - 0.1) {
    notice = (
      <Notice>
        f′ is positive again and growing, so f rises more and more steeply. {x > -0.2 && x < 0.2 ? (
          <>At <M>x = 0</M>, f′ is well above zero: f crosses the <M>y</M>-axis going <b>up</b>, as in B. (In A the curve is going down as it crosses the <M>y</M>-axis.)</>
        ) : (
          <>Notice f′ is positive at <M>x = 0</M>: f is rising as it crosses the <M>y</M>-axis.</>
        )}
      </Notice>
    )
  } else if (x <= DIP_BOTTOM + 0.35) {
    notice = (
      <Notice tone="warn">
        <b>The dip in f′.</b> Q is going down, but it stays <b>above</b> the axis: f′ gets smaller without reaching zero. So f
        is still rising, just <b>less steeply</b> for a while (watch the tangent flatten a little, then steepen again). No zero of
        f′ means no turning point here, only a bend in f. That is the flatter stretch in option B.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        After the dip, f′ climbs steeply, so f gets steeper and steeper. f′ never returns to zero, so f has no more turning
        points: just the two, a maximum then a minimum, both left of the <M>y</M>-axis. Only option B matches.
      </Notice>
    )
  }

  return (
    <div>
      <p className="text-[12px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
        <M>y = f(x)</M> with the tangent at P
      </p>
      <Plane x={[X0, X1]} y={[-3, 13]} xStep={1} yStep={2} height={210} xLabel="x" yLabel="" labels={false}>
        <Plot.OfX y={f} domain={[X0, X1]} color={C.f} weight={3} />
        <Line.Segment point1={[x, -3.5]} point2={[x, 13.5]} color={C.guide} style="dashed" weight={1} />
        <Line.Segment point1={[x - h, y - h * m]} point2={[x + h, y + h * m]} color={tanColor} weight={3} />
        <Point x={Z1} y={f(Z1)} color={C.ink} />
        <Point x={Z2} y={f(Z2)} color={C.ink} />
        <Label at={[Z1, f(Z1)]} attach="n" size={11}>max</Label>
        <Label at={[Z2, f(Z2)]} attach="s" size={11}>min</Label>
        {/* At a turning point the "max"/"min" label already marks the spot; P's would sit on it. */}
        {!flat && <Label at={[x, y]} color={C.f} attach={m > 0 ? 'se' : 'ne'}>P</Label>}
        <MovablePoint point={[x, y]} onMove={p => setX(clamp(nearestOnF(p), X0, X1))} color={C.f} />
      </Plane>
      <p className="text-[12px] font-semibold text-gray-600 dark:text-gray-300 mt-2 mb-1">
        <M>y = f&apos;(x)</M>: the height of Q is the gradient at P
      </p>
      <Plane x={[X0, X1]} y={[-4, 12]} xStep={1} yStep={2} height={210} xLabel="x" yLabel="" labels={false}>
        <Region top={t => Math.max(fp(t), 0)} bottom={() => 0} from={X0} to={X1} color={C.good} opacity={0.18} />
        <Region top={() => 0} bottom={t => Math.min(fp(t), 0)} from={X0} to={X1} color={C.bad} opacity={0.18} />
        <Plot.OfX y={fp} domain={[X0, X1]} color={C.g} weight={3} />
        <Line.Segment point1={[x, -4.5]} point2={[x, 12.5]} color={C.guide} style="dashed" weight={1} />
        <Line.Segment point1={[x, 0]} point2={[x, m]} color={tanColor} weight={4} />
        <Point x={x} y={m} color={C.g} />
        <Label at={[x, m]} color={C.g} attach={m >= 0 ? 'ne' : 'se'}>Q</Label>
        <Label at={[-1.45, 0]} color={C.bad} attach="n" size={11}>f′ &lt; 0</Label>
        <Label at={[1.3, 0]} color={C.good} attach="n" size={11}>f′ &gt; 0</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x} min={X0} max={X1} step={0.01} onChange={setX} format={() => ''} />
        <Buttons>
          <ActionButton label="First zero of f′" onClick={() => setX(Z1)} />
          <ActionButton label="Second zero of f′" onClick={() => setX(Z2)} />
          <ActionButton label="Bottom of the dip" onClick={() => setX(DIP_BOTTOM)} />
        </Buttons>
        {/* Not clickable: KaTeX's fraction struts reach up over the buttons above and would
            otherwise swallow taps on them. */}
        <div className="pointer-events-none">
          <Readouts>
            <Readout color={tanColor} tex={`\\text{gradient of } f \\text{ at } P = f'(x) \\approx ${num(m)}`} />
            <Readout tex={m > 0.05 ? 'f \\text{ rising}' : m < -0.05 ? 'f \\text{ falling}' : 'f \\text{ stationary}'} />
          </Readouts>
        </div>
        {notice}
        <p className="text-[11.5px] text-gray-500 dark:text-gray-400">
          The paper gives no scale, so these are one pair of curves with the same features as the printed graph: f′ crosses
          the axis twice (both left of the <M>y</M>-axis), dips without reaching zero, then rises steeply. Drag P or use the
          slider.
        </p>
      </Controls>
    </div>
  )
}
