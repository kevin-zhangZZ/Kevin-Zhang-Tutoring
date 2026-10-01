// 2021 Methods Exam 2 Q2f — why there are three values of a. Top: y = √x and y = ax² over the
// strip [0, a]. For a ≤ 1 the curves meet at c = a^(-2/3) ≥ a, so there is one region; for a > 1
// they cross inside the strip and the region splits in two. Bottom: the total area A(a) against a,
// which crosses 1/3 three times (0.77, 1.00, 1.13): it peaks near a = 0.89, dips just under 1/3
// near a = 1.07, then climbs for good. A toggle shows the report's common error, the single
// integral ∫₀ᵃ (ax² − √x) dx, which subtracts the left-hand region and reaches 1/3 at a = 1.46.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Region, Slider, Toggle,
  usePlayer,
} from './kit'

const LO = 0.5
const HI = 1.5
const THIRD = 1 / 3

const root = (x: number) => Math.sqrt(x)
/** Where ax² = √x (other than x = 0). */
const crossing = (a: number) => Math.pow(a, -2 / 3)
/** Signed ∫₀ᵃ (√x − ax²) dx. */
const signedInt = (a: number) => (2 / 3) * Math.pow(a, 1.5) - Math.pow(a, 4) / 3
/** Left region, √x on top. For a > 1 it runs from 0 to c, and ∫₀ᶜ (√x − ax²) dx = 1/(3a). */
const leftArea = (a: number) => (a <= 1 ? signedInt(a) : 1 / (3 * a))
/** Right region, ax² on top, from c to a (none when a ≤ 1). */
const rightArea = (a: number) => (a <= 1 ? 0 : leftArea(a) - signedInt(a))
const area = (a: number) => leftArea(a) + rightArea(a)
/** The wrong idea: one integral ∫₀ᵃ (ax² − √x) dx, which is right − left. */
const oneIntegral = (a: number) => -signedInt(a)

function bisect(fn: (v: number) => number, lo: number, hi: number) {
  const sLo = fn(lo) > 0
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    if ((fn(mid) > 0) === sLo) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}
const gap = (v: number) => area(v) - THIRD
const ROOTS = [bisect(gap, 0.6, 0.9), bisect(gap, 0.95, 1.05), bisect(gap, 1.07, 1.3)] // 0.7702, 1, 1.1320
const ROOT_ATTACH = ['se', 'ne', 'se'] as const
const WRONG = bisect(v => oneIntegral(v) - THIRD, 1.3, 1.5) // 1.4582

export default function ThreeValues() {
  const [a, setA] = useState(1.13)
  const [one, setOne] = useState(false)
  const player = usePlayer(setA, { min: LO, max: HI, seconds: 9 })

  const c = crossing(a)
  const split = a > 1 + 1e-9
  const A = area(a)
  const near = ROOTS.findIndex(r => Math.abs(a - r) < 0.006)
  const nearWrong = Math.abs(a - WRONG) < 0.006
  const g = (x: number) => a * x * x
  const top = (x: number) => Math.max(root(x), g(x))
  const bottom = (x: number) => Math.min(root(x), g(x))
  const gy = Math.min(3, a * 1.45 * 1.45)
  const gx = Math.sqrt(gy / a)

  let notice
  if (one) {
    if (!split) {
      notice = (
        <Notice tone="warn">
          With one integral <M>{'\\int_0^a\\left(ax^2-\\sqrt x\\right)dx'}</M>, every strip where <M>\sqrt x</M> is on
          top (red) counts as <b>negative</b>. For <M>{'a \\le 1'}</M> that is the whole region, so the integral is
          just <M>-A</M>. Slide <M>a</M> past <M>1</M>.
        </Notice>
      )
    } else if (nearWrong) {
      notice = (
        <Notice tone="warn">
          <b>At <M>a \approx 1.46</M></b> the single integral equals <M>{'\\tfrac13'}</M>, the wrong answer the report
          says was often seen. But the true area here is about <M>{A.toFixed(3)}</M>: the red region (
          <M>{leftArea(a).toFixed(3)}</M>) was subtracted from the orange one instead of added to it. Splitting at{' '}
          <M>c</M> is what fixes it.
        </Notice>
      )
    } else {
      notice = (
        <Notice tone="warn">
          Now the single integral gives <b>orange minus red</b>: the region where <M>\sqrt x</M> is on top is
          subtracted, not added, so the result falls well short of the true area (compare the red and violet readouts). Slide to <M>a \approx 1.46</M>, where it reaches <M>{'\\tfrac13'}</M>.
        </Notice>
      )
    }
  } else if (near === 0) {
    notice = (
      <Notice tone="good">
        <b><M>a \approx 0.77</M>:</b> the curves meet at <M>{`c = a^{-2/3} \\approx ${c.toFixed(2)}`}</M>, past the
        line <M>x = a</M>, so <M>\sqrt x</M> is on top all the way: one region of area <M>{'\\tfrac13'}</M>. Don&rsquo;t
        stop here: keep sliding, because the area comes back to <M>{'\\tfrac13'}</M> twice more.
      </Notice>
    )
  } else if (near === 1) {
    notice = (
      <Notice tone="good">
        <b><M>a = 1</M>:</b> the strip ends exactly where the curves cross (<M>c = 1</M>). This is part e. again, so
        the area is exactly <M>{'\\tfrac13'}</M>. Push <M>a</M> past <M>1</M> and a second region appears on the right.
      </Notice>
    )
  } else if (near === 2) {
    notice = (
      <Notice tone="good">
        <b><M>a \approx 1.13</M>:</b> the curves now cross inside the strip, at{' '}
        <M>{`c \\approx ${c.toFixed(2)}`}</M>, so the region comes in two pieces: sky (<M>\sqrt x</M> on top) plus
        orange (<M>ax^2</M> on top). Together they make <M>{'\\tfrac13'}</M>. Finding this value needs the area split
        at <M>c</M>, with both pieces added. Turn on the toggle to see what goes wrong without the split.
      </Notice>
    )
  } else if (a < ROOTS[0]) {
    notice = (
      <Notice>
        While <M>{'a \\le 1'}</M>, the curves meet at <M>{'c = a^{-2/3} \\ge a'}</M>, outside the strip, so there is
        one region with <M>\sqrt x</M> on top. Its area is still under <M>{'\\tfrac13'}</M>. Slide <M>a</M> right and
        watch the point on the area graph.
      </Notice>
    )
  } else if (a < ROOTS[1]) {
    notice = (
      <Notice>
        Still one region, but the area has gone past <M>{'\\tfrac13'}</M>. It peaks at about <M>0.351</M> near{' '}
        <M>a = 0.89</M>, then <M>ax^2</M> rises to meet <M>\sqrt x</M> at the right-hand edge and the area shrinks,
        back to exactly <M>{'\\tfrac13'}</M> at <M>a = 1</M>.
      </Notice>
    )
  } else if (a < ROOTS[2]) {
    notice = (
      <Notice>
        Past <M>a = 1</M>, <M>{'c = a^{-2/3}'}</M> is less than <M>a</M>: the parabola overtakes <M>\sqrt x</M> inside
        the strip, so the area comes in two pieces. At first the sky piece shrinks faster than the orange one grows, so
        the total dips just under <M>{'\\tfrac13'}</M> (to about <M>0.322</M> near <M>a = 1.07</M>). Then the orange piece takes over and the total climbs
        again: keep going.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Two regions, and the orange one now grows fast, so the area only increases from here: it never returns to{' '}
        <M>{'\\tfrac13'}</M> before <M>a = 2</M>. That makes three values in all. Turn on the toggle to see where the
        common wrong answer <M>a = 1.46</M> comes from.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, 1.55]}
        y={[0, 3.4]}
        xStep={0.25}
        yStep={0.5}
        height={270}
        yLabels={v => (Number.isInteger(v) ? String(v) : '')}
      >
        <Region top={top} bottom={bottom} from={0} to={Math.min(a, c)} color={one ? C.bad : C.f} opacity={0.25} />
        {split && <Region top={top} bottom={bottom} from={c} to={a} color={C.g} opacity={0.32} />}
        <Plot.OfX y={root} domain={[0, 1.55]} color={C.f} weight={3} />
        <Plot.OfX y={g} domain={[0, 1.55]} color={C.g} weight={3} />
        <Line.Segment point1={[a, 0]} point2={[a, 3.4]} color={C.ink} style="dashed" weight={1.5} />
        <Label at={[a, 3.25]} attach="e" size={12}>x = a</Label>
        {split && <Point x={c} y={root(c)} color={C.good} />}
        {split && <Label at={[c, root(c)]} attach="nw" color={C.good}>c</Label>}
        <Label at={[0.3, root(0.3)]} attach="nw" color={C.f}>y = √x</Label>
        <Label at={[gx, gy]} attach={gy >= 2 ? 'w' : 'se'} color={C.g}>y = ax²</Label>
      </Plane>

      <div className="mt-4">
        <p className="text-[12.5px] text-gray-600 dark:text-gray-300 mb-1">
          <span className="inline-block w-2.5 h-2.5 rounded-full mr-1.5 align-middle" style={{ background: C.violet }} />
          The total area <M>A</M> for each <M>a</M> (vertical scale zoomed in around <M>{'\\tfrac13'}</M>)
        </p>
        <Plane x={[LO, HI]} y={[0.25, 0.45]} xStep={0.1} yStep={0.05} height={220} labels={false} xLabel="" yLabel="">
          <Line.Segment point1={[LO, THIRD]} point2={[HI, THIRD]} color={C.guide} style="dashed" weight={2} />
          <Label at={[LO, THIRD]} attach="ne" size={12} color={C.guide}>A = 1/3</Label>
          <Label at={[LO, 0.3]} attach="e" size={11} color={C.guide} bold={false}>0.30</Label>
          <Label at={[LO, 0.4]} attach="e" size={11} color={C.guide} bold={false}>0.40</Label>
          {[0.8, 1, 1.2, 1.4].map(v => (
            <Label key={v} at={[v, 0.25]} attach="n" size={11} color={C.guide} bold={false}>
              {v.toFixed(1)}
            </Label>
          ))}
          <Label at={[HI, 0.25]} attach="nw" size={13} italic>a</Label>
          <Line.Segment point1={[a, 0.25]} point2={[a, 0.45]} color={C.guide} weight={1} />
          <Plot.OfX y={area} domain={[LO, HI]} color={C.violet} weight={3} />
          {one && <Plot.OfX y={oneIntegral} domain={[LO, HI]} color={C.bad} weight={2.5} style="dashed" />}
          {ROOTS.map(r => (
            <Point key={r} x={r} y={THIRD} color={C.good} />
          ))}
          {ROOTS.map((r, i) => (
            <Label key={r} at={[r, THIRD]} attach={ROOT_ATTACH[i]} color={C.good} size={12}>
              {r.toFixed(2)}
            </Label>
          ))}
          {one && <Point x={WRONG} y={THIRD} color={C.bad} />}
          {one && <Label at={[WRONG, THIRD]} attach="nw" color={C.bad} size={12}>{WRONG.toFixed(2)}</Label>}
          {one && <Point x={a} y={oneIntegral(a)} color={C.bad} />}
          <Point x={a} y={A} color={C.violet} />
        </Plane>
      </div>

      <Controls>
        <Slider
          label="a"
          value={a}
          onChange={v => {
            player.stop()
            setA(v)
          }}
          min={LO}
          max={HI}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(a)} label="Sweep a from 0.5 to 1.5" />
          <Toggle label="What if I don't split at c?" checked={one} onChange={setOne} />
        </Buttons>
        <Readouts>
          <Readout color={C.good} tex={`c = a^{-2/3} = ${c.toFixed(2)} ${split ? '\\lt a' : '\\ge a'}`} />
          {one ? (
            <>
              <Readout color={C.bad} tex={`\\int_0^{a}\\left(ax^2-\\sqrt x\\right)dx = ${oneIntegral(a).toFixed(3)}`} />
              <Readout color={C.violet} tex={`\\text{true area } A = ${A.toFixed(3)}`} />
            </>
          ) : split ? (
            <>
              <Readout color={C.f} tex={`\\int_0^{c}\\left(\\sqrt x-ax^2\\right)dx = ${leftArea(a).toFixed(3)}`} />
              <Readout color={C.g} tex={`\\int_c^{a}\\left(ax^2-\\sqrt x\\right)dx = ${rightArea(a).toFixed(3)}`} />
              <Readout color={C.violet} tex={`A = ${A.toFixed(3)}`} />
            </>
          ) : (
            <Readout color={C.violet} tex={`A = \\int_0^{a}\\left(\\sqrt x-ax^2\\right)dx = ${A.toFixed(3)}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
