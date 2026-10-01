// 2021 Methods Exam 2 MCQ 18 — how many times can the translated cubic cross g's curve? The blue
// curve is y = f(x − k), f(x) = (2x − 1)(2x + 1)(3x − 1), which the k slider translates sideways;
// the orange curve is y = g(x) = x·logₑ(−x), drawn only for x < 0 (the shaded strip x ≥ 0 is
// outside g's domain). Violet points are the solutions of f(x − k) = g(x), found by sign changes of
// f(x − k) − g(x) on a grid that is dense near x = 0, then bisection. Opens on k = 0 (the graphs
// as given: one solution, option B's value); sliding left reaches three solutions for
// −1.517 < k < −0.5 (k = −1 gives the report's x ≈ −1.561, −0.758, −0.397) and in a tiny window
// −1/3 < k < −0.312; two for −0.5 ≤ k ≤ −1/3; never four.

import { useState } from 'react'
import { C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider } from './kit'

const X0 = -2.5
const X1 = 0.8
const Y0 = -2.2
const Y1 = 1.8

const f = (u: number) => (2 * u - 1) * (2 * u + 1) * (3 * u - 1)
const g = (x: number) => x * Math.log(-x)

// Grid on x < 0, ascending: even spacing on [−4, −0.05], then log spacing down to −5×10⁻⁷ so the
// crossings that hug x = 0 (k just below −1/2, or −1/3 < k < −0.312) are not missed.
const XS: number[] = (() => {
  const pts: number[] = []
  for (let i = 0; i <= 1600; i++) pts.push(-4 + (3.95 * i) / 1600)
  for (let i = 1; i <= 600; i++) pts.push(-0.05 * Math.pow(10, (-5 * i) / 600))
  return pts
})()

/** The solutions of f(x − k) = g(x), ascending. */
function solutions(k: number): number[] {
  const h = (x: number) => f(x - k) - g(x)
  const out: number[] = []
  for (let i = 0; i < XS.length - 1; i++) {
    let a = XS[i]
    let b = XS[i + 1]
    let ha = h(a)
    if (ha > 0 === h(b) > 0) continue
    for (let j = 0; j < 50; j++) {
      const m = (a + b) / 2
      const hm = h(m)
      if (hm > 0 === ha > 0) {
        a = m
        ha = hm
      } else b = m
    }
    out.push((a + b) / 2)
  }
  return out
}

const fmt = (v: number) => (Math.abs(v) < 0.0005 ? '0' : v.toFixed(3))
const intLabel = (v: number) => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : '')

export default function Crossings() {
  const [k, setK] = useState(0)
  const sols = solutions(k)
  const n = sols.length
  const shift = `${Math.abs(k)} unit${Math.abs(k) === 1 ? '' : 's'}`

  let notice
  if (n === 3 && k <= -0.5) {
    notice = (
      <Notice tone="good">
        <b>Three solutions.</b> Moved {shift} left, the cubic&apos;s hump rises above g&apos;s curve and, around its
        dip, the cubic falls below it, so the two curves cross three times
        {k === -1 ? <>: these are the report&apos;s three points for <M>k = -1</M></> : null}. Keep sliding: three is the most
        you will ever see. The working shows why four is impossible.
      </Notice>
    )
  } else if (n === 3) {
    notice = (
      <Notice tone="good">
        <b>Three solutions, in a tiny window.</b> Two crossings are squeezed just left of <M>x = 0</M>, where g&apos;s curve
        drops steeply to <M>0</M>. This only happens for <M>k</M> between about <M>-0.33</M> and <M>-0.31</M>; the wide
        window is around <M>k = -1</M>. Still never four.
      </Notice>
    )
  } else if (n === 2) {
    notice = (
      <Notice>
        <b>Two solutions.</b> After its hump the cubic falls below g&apos;s curve, but it only climbs back above it at{' '}
        <M>{'x \\ge 0'}</M> (the shaded strip), where g doesn&apos;t exist: the cubic&apos;s height at <M>x = 0</M> is{' '}
        <M>f(-k)</M>, which is negative here. So the third crossing is lost. Slide <M>k</M> a little further left.
      </Notice>
    )
  } else if (n === 1 && k < -1) {
    notice = (
      <Notice>
        <b>One solution.</b> Moved this far left, the cubic&apos;s dip sits where g&apos;s curve is lower (<M>g</M> is
        negative for <M>{'x < -1'}</M>), so the cubic stays above g around its dip and only its rising left arm crosses.
        Slide <M>k</M> back to the right.
      </Notice>
    )
  } else if (n === 1) {
    notice = (
      <Notice tone={k === 0 ? 'warn' : 'neutral'}>
        <b>{k === 0 ? 'One solution: the graphs as given (k = 0).' : 'One solution.'}</b> The cubic&apos;s dip is in the
        shaded strip <M>{'x \\ge 0'}</M>, where g doesn&apos;t exist, so only its left arm crosses g&apos;s curve. But{' '}
        <M>k</M> can be any real number, and the question wants the most solutions over every <M>k</M>. Slide <M>k</M> to
        the left (negative <M>k</M> moves the cubic left).
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <b>No solutions.</b> Moved this far right, the cubic&apos;s hump and dip are both in the shaded strip, and for{' '}
        <M>{'x < 0'}</M> the cubic stays below g&apos;s curve. Slide <M>k</M> to the left.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[Y0, Y1]} xStep={0.5} yStep={0.5} height={320} xLabels={intLabel} yLabels={intLabel}>
        <Region top={() => Y1 + 1} bottom={() => Y0 - 1} from={0} to={X1 + 1} color={C.guide} opacity={0.18} />
        <Label at={[0.5, -1.5]} attach="c" color={C.guide} size={10}>
          g undefined
        </Label>
        <Plot.OfX y={g} domain={[X0, -1e-6]} color={C.g} weight={3} />
        <Plot.OfX y={x => f(x - k)} domain={[X0, X1]} color={C.f} weight={3} minSamplingDepth={8} />
        {sols.map(x => (
          <Point key={x} x={x} y={g(x)} color={C.violet} />
        ))}
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={v => setK(Math.round(v * 100) / 100)} min={-1.7} max={0.7} step={0.01} />
        <Readouts>
          <Readout color={C.f} tex="y = f(x-k)" />
          <Readout color={C.g} tex="y = g(x) = x\log_e(-x)" />
          <Readout
            color={C.violet}
            tex={n === 0 ? '\\text{no solutions}' : `${n}\\text{ solution${n === 1 ? '' : 's'}: } x \\approx ${sols.map(fmt).join(',\\ ')}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
