// 2022 Specialist NHT Exam 1 Q3 — why each slice of the solid is a washer of area π(R² − r²), not
// π(R − r)². Left: the region between the line y = 1 − x (outer, orange) and the parabola
// y = (x − 1)² (inner, sky blue) for 0 ≤ x ≤ 1, with its mirror image (the other half of the solid)
// and the slice at x drawn as a ring seen slightly from the side. Right: the same slice face-on — a
// disc of radius R = 1 − x with a hole of radius r = (1 − x)². The curves meet at x = 0 (R = r = 1)
// and x = 1 (R = r = 0), where the washer vanishes. The slice area π((1 − x)² − (1 − x)⁴) peaks at
// π/4 at x = 1 − 1/√2; sweeping from 0 to 1 accumulates π[2/15 − ((1 − x)³/3 − (1 − x)⁵/5)],
// reaching 2π/15 ≈ 0.419. A toggle overlays the tempting disc of radius R − r: π(R − r)² integrated
// from 0 to 1 is π/30 ≈ 0.105, a quarter of the true volume.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Polyline, Readout, Readouts,
  Region, Slider, Toggle, integrate, num, usePlayer, vec,
} from './kit'

const R = (x: number) => 1 - x
const r = (x: number) => (1 - x) ** 2
const K = 0.07
/** Tick numbers at whole numbers only; the half-unit gridlines stay unlabelled. */
const whole = (v: number) => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : '')

/** Circle of radius rad in the plane at x, seen slightly from the side (an ellipse), angles a0 → a1. */
function ring(x: number, rad: number, a0: number, a1: number, k = K, n = 48): vec.Vector2[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / n
    return [x + k * rad * Math.cos(a), rad * Math.sin(a)] as vec.Vector2
  })
}

/** Outer circle one way round, inner circle the other: the fill leaves the hole empty. */
const annulus = (x: number, out: number, inn: number, k = K) => [
  ...ring(x, out, 0, 2 * Math.PI, k),
  ...ring(x, inn, 2 * Math.PI, 0, k),
]

const sofar = (x: number) => Math.PI * (2 / 15 - ((1 - x) ** 3 / 3 - (1 - x) ** 5 / 5))
const EXACT = (2 * Math.PI) / 15

export default function Washer() {
  const [x0, setX0] = useState(0.4)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setX0, { min: 0, max: 1, seconds: 6 })

  const Ro = R(x0)
  const ri = r(x0)
  const A = Math.PI * (Ro * Ro - ri * ri)
  const W = Math.PI * (Ro - ri) ** 2
  const V = sofar(x0)
  const Vw = integrate(x => Math.PI * (R(x) - r(x)) ** 2, 0, x0)
  const atStart = x0 < 0.01
  const atEnd = x0 > 0.99

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <M>{'\\pi(R - r)^2'}</M> is the red disc, whose radius is the <b>gap</b> between the line and the parabola. It is
        far smaller than the ring: <M>{num(W, 3)}</M> against <M>{num(A, 3)}</M> here. Unroll the ring and it is a strip{' '}
        <M>R - r</M> wide but about a whole circumference long, which is why{' '}
        <M>{'\\pi(R^2 - r^2) = \\pi(R - r)(R + r)'}</M>. Integrated from 0 to 1, the red discs total{' '}
        <M>{'\\tfrac{\\pi}{30} \\approx 0.105'}</M>, not <M>{'\\tfrac{2\\pi}{15}'}</M>.
      </Notice>
    )
  } else if (atStart || atEnd) {
    notice = (
      <Notice tone="good">
        At <M>{atStart ? 'x = 0' : 'x = 1'}</M> the line and the parabola meet, so <M>R = r</M> and the washer has no area:{' '}
        {atStart ? 'it is a circle of radius 1 with no thickness' : 'both radii are 0'}. The two intercepts are exactly
        where the curves cross, which is why the integral runs from <M>0</M> to <M>1</M>.{' '}
        {atEnd ? (
          <>
            Adding every washer gives <M>{'\\pi\\int_0^1 (R^2 - r^2)\\,dx = \\tfrac{2\\pi}{15}'}</M>.
          </>
        ) : (
          <>Press play to add up the washers from here to <M>x = 1</M>.</>
        )}
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The vertical slice of the region at this <M>x</M> runs from the parabola (height <M>r</M>) up to the line (height{' '}
        <M>R</M>). Spun about the <M>x</M>-axis it makes a <b>washer</b>: a disc of radius <M>R</M> with a hole of radius{' '}
        <M>r</M>, so its area is <M>{'\\pi R^2 - \\pi r^2'}</M>. Turn on the toggle to test the tempting{' '}
        <M>{'\\pi(R - r)^2'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-[3fr_2fr] sm:items-center">
        <Plane x={[-0.3, 1.4]} y={[-1.2, 1.2]} xStep={0.5} yStep={0.5} height={300} labels={whole}>
          <Region top={R} bottom={r} from={0} to={x0} color={C.g} opacity={0.35} />
          <Region top={R} bottom={r} from={x0} to={1} color={C.g} opacity={0.14} />
          <Region top={x => -r(x)} bottom={x => -R(x)} from={0} to={1} color={C.g} opacity={0.08} />
          <Polyline points={ring(0, 1, 0, 2 * Math.PI)} color={C.g} weight={1.5} />
          <Plot.OfX y={x => -R(x)} domain={[0, 1]} color={C.g} weight={1.5} style="dashed" />
          <Plot.OfX y={x => -r(x)} domain={[0, 1]} color={C.f} weight={1.5} style="dashed" />
          <Plot.OfX y={r} domain={[-0.15, 1.4]} color={C.f} weight={3} />
          <Plot.OfX y={R} domain={[-0.3, 1.4]} color={C.g} weight={3} />
          <Polygon points={annulus(x0, Ro, ri)} color={C.good} fillOpacity={0.55} weight={0} strokeOpacity={0} />
          <Polyline points={ring(x0, Ro, 0, 2 * Math.PI)} color={C.g} weight={1.5} />
          <Polyline points={ring(x0, ri, 0, 2 * Math.PI)} color={C.f} weight={1.5} />
          <Line.Segment point1={[x0, 0]} point2={[x0, ri]} color={C.f} weight={3} />
          <Line.Segment point1={[x0, 0]} point2={[x0, -Ro]} color={C.g} weight={3} />
          {!atEnd && ri > 0.15 && (
            <Label at={[x0, ri / 2]} attach="e" color={C.f} size={12} gap={10}>r</Label>
          )}
          {!atEnd && Ro > 0.15 && (
            <Label at={[x0, -Ro / 2]} attach="e" color={C.g} size={12} gap={10}>R</Label>
          )}
          <Point x={0} y={1} color={C.ink} />
          <Point x={1} y={0} color={C.ink} />
          <Label at={[0.95, 0.65]} attach="e" color={C.f} size={12}>y = (x − 1)²</Label>
          <Label at={[0.3, 0.7]} attach="ne" color={C.g} size={12}>y = 1 − x</Label>
        </Plane>
        <Plane x={[-1.1, 1.1]} y={[-1.1, 1.1]} xStep={0.5} yStep={0.5} height={260} equalScale labels={false} xLabel="y" yLabel="z">
          <Polygon points={annulus(0, Ro, ri, 1)} color={C.good} fillOpacity={0.4} weight={0} strokeOpacity={0} />
          <Polyline points={ring(0, Ro, 0, 2 * Math.PI, 1, 96)} color={C.g} weight={2} />
          <Polyline points={ring(0, ri, 0, 2 * Math.PI, 1, 96)} color={C.f} weight={2} />
          <Line.Segment
            point1={[0, 0]}
            point2={[Ro * Math.cos((5 * Math.PI) / 6), Ro * Math.sin((5 * Math.PI) / 6)]}
            color={C.g}
            weight={2.5}
          />
          <Line.Segment
            point1={[0, 0]}
            point2={[ri * Math.cos(Math.PI / 3), ri * Math.sin(Math.PI / 3)]}
            color={C.f}
            weight={2.5}
          />
          {Ro > 0.15 && (
            <Label at={[(Ro / 2) * Math.cos((5 * Math.PI) / 6), (Ro / 2) * Math.sin((5 * Math.PI) / 6)]} attach="n" color={C.g} size={12}>
              R
            </Label>
          )}
          {ri > 0.15 && (
            <Label at={[(ri / 2) * Math.cos(Math.PI / 3), (ri / 2) * Math.sin(Math.PI / 3)]} attach="e" color={C.f} size={12}>
              r
            </Label>
          )}
          {wrong && Ro - ri > 0.003 && (
            <Polygon points={ring(0, Ro - ri, 0, 2 * Math.PI, 1, 64)} color={C.bad} fillOpacity={0.7} weight={1.5} />
          )}
        </Plane>
      </div>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={0}
          max={1}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep from x = 0 to 1" />
          <Toggle label="What about π(R − r)²?" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`R = 1 - x = ${Ro.toFixed(3)}`} />
          <Readout color={C.f} tex={`r = (x-1)^2 = ${ri.toFixed(3)}`} />
          <Readout color={C.good} tex={`\\pi(R^2 - r^2) = ${A.toFixed(3)}`} />
          {wrong && <Readout color={C.bad} tex={`\\pi(R - r)^2 = ${W.toFixed(3)}`} />}
          <Readout
            color={wrong ? C.bad : undefined}
            tex={
              wrong
                ? `\\text{red discs so far} \\approx ${Vw.toFixed(3)}`
                : atEnd
                  ? `\\text{volume} = \\tfrac{2\\pi}{15} \\approx ${EXACT.toFixed(3)}\\ \\checkmark`
                  : `\\text{volume so far} \\approx ${V.toFixed(3)}`
            }
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
