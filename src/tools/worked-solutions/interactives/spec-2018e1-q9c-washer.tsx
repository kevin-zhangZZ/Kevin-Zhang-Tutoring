// 2018 Specialist Exam 1 Q9c — why each slice of the solid is a washer of area π(R² − r²), not
// π(R − r)². Left: the region between the hyperbola x² − 2y² = 1 (upper half, y = √((x² − 1)/2)) and
// the line y = x − 1 for 1 ≤ x ≤ 3, with its mirror image (the other half of the solid) and the slice
// at x drawn as a ring seen slightly from the side. Right: the same slice face-on — a disc of radius
// R = √((x² − 1)/2) (swept by the hyperbola) with a hole of radius r = x − 1 (swept by the line).
// The hyperbola is outer on (1, 3) (at x = 2, R² = 3/2 > r² = 1); R = r at x = 1 and x = 3 (part b),
// where the washer vanishes. The slice area π(−x² + 4x − 3)/2 peaks at π/2 at x = 2; sweeping from 1
// to 3 accumulates π/2·(−x³/3 + 2x² − 3x + 4/3), reaching 2π/3 ≈ 2.094. A toggle overlays the tempting
// disc of radius R − r (π(R − r)² ≈ 0.159 at x = 2, against the ring's 1.571); integrated from 1 to 3
// it gives π(4/3 − √2 log_e(1 + √2)) ≈ 0.273.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Polyline, Readout, Readouts,
  Region, Slider, Toggle, integrate, num, usePlayer, vec,
} from './kit'

const R = (x: number) => Math.sqrt(Math.max(0, (x * x - 1) / 2))
const r = (x: number) => x - 1
const K = 0.08

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

const sofar = (x: number) => (Math.PI / 2) * (-(x ** 3) / 3 + 2 * x * x - 3 * x + 4 / 3)
const EXACT = (2 * Math.PI) / 3

export default function Washer() {
  const [x0, setX0] = useState(2)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setX0, { min: 1, max: 3, seconds: 6 })

  const Ro = R(x0)
  const ri = r(x0)
  const A = Math.PI * (Ro * Ro - ri * ri)
  const W = Math.PI * (Ro - ri) ** 2
  const V = sofar(x0)
  const Vw = integrate(x => Math.PI * (R(x) - r(x)) ** 2, 1, x0)
  const atStart = x0 < 1.02
  const atEnd = x0 > 2.98

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <M>{'\\pi(R - r)^2'}</M> is the red disc, whose radius is the <b>gap</b> between the curves. It is far smaller than
        the ring: <M>{num(W, 3)}</M> against <M>{num(A, 3)}</M> here. Unroll the ring and it is a strip <M>R - r</M> wide but
        about a whole circumference long, which is why <M>{'\\pi(R^2 - r^2) = \\pi(R - r)(R + r)'}</M>. Integrated from 1 to
        3, the red discs total about <M>0.273</M>, not <M>{'\\tfrac{2\\pi}{3}'}</M>.
      </Notice>
    )
  } else if (atStart || atEnd) {
    notice = (
      <Notice tone="good">
        At <M>{atStart ? 'x = 1' : 'x = 3'}</M> the hyperbola and the line meet (part b), so <M>R = r</M> and the washer has
        no area: {atStart ? 'both radii are 0' : 'it is a circle of radius 2 with no thickness'}. That is why the integral
        runs from <M>1</M> to <M>3</M>.{' '}
        {atEnd ? (
          <>
            Adding every washer gives <M>{'\\pi\\int_1^3 (R^2 - r^2)\\,dx = \\tfrac{2\\pi}{3}'}</M>.
          </>
        ) : (
          <>Press play to add up the washers from here to <M>x = 3</M>.</>
        )}
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The vertical slice of the region at this <M>x</M> runs from the line (height <M>r</M>) up to the hyperbola (height{' '}
        <M>R</M>). Spun about the <M>x</M>-axis it makes a <b>washer</b>: a disc of radius <M>R</M> with a hole of radius{' '}
        <M>r</M>, so its area is <M>{'\\pi R^2 - \\pi r^2'}</M>. Part a gives <M>{'R^2 = \\tfrac{x^2-1}{2}'}</M> directly, so
        no square root is needed. Turn on the toggle to test the tempting <M>{'\\pi(R - r)^2'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-[3fr_2fr] sm:items-center">
        <Plane x={[0, 3.6]} y={[-2.3, 2.4]} xStep={1} yStep={1} height={300}>
          <Region top={R} bottom={r} from={1} to={x0} color={C.f} opacity={0.35} />
          <Region top={R} bottom={r} from={x0} to={3} color={C.f} opacity={0.14} />
          <Region top={x => -r(x)} bottom={x => -R(x)} from={1} to={3} color={C.f} opacity={0.08} />
          <Polyline points={ring(3, 2, 0, 2 * Math.PI)} color={C.f} weight={1.5} />
          <Plot.OfX y={x => -R(x)} domain={[1, 3.5]} color={C.f} weight={1.5} style="dashed" />
          <Plot.OfX y={x => -r(x)} domain={[1, 3]} color={C.g} weight={1.5} style="dashed" />
          <Plot.OfX y={r} domain={[0.6, 3.5]} color={C.g} weight={3} />
          <Plot.OfX y={R} domain={[1, 3.5]} color={C.f} weight={3} />
          <Polygon points={annulus(x0, Ro, ri)} color={C.good} fillOpacity={0.55} weight={0} strokeOpacity={0} />
          <Polyline points={ring(x0, Ro, 0, 2 * Math.PI)} color={C.f} weight={1.5} />
          <Polyline points={ring(x0, ri, 0, 2 * Math.PI)} color={C.g} weight={1.5} />
          <Line.Segment point1={[x0, 0]} point2={[x0, ri]} color={C.g} weight={3} />
          <Line.Segment point1={[x0, 0]} point2={[x0, -Ro]} color={C.f} weight={3} />
          {!atStart && ri > 0.25 && (
            <Label at={[x0, ri / 2]} attach="w" color={C.g} size={12} gap={10}>r</Label>
          )}
          {!atStart && Ro > 0.25 && (
            <Label at={[x0, -Ro / 2]} attach="w" color={C.f} size={12} gap={10}>R</Label>
          )}
          <Point x={1} y={0} color={C.ink} />
          <Point x={3} y={2} color={C.ink} />
          <Label at={[3, 2]} attach="se" size={12} gap={12}>(3, 2)</Label>
          <Label at={[1.45, R(1.45)]} attach="nw" color={C.f} size={12}>x² − 2y² = 1</Label>
          <Label at={[0.25, 2.3]} attach="e" color={C.g} size={12}>y = x − 1</Label>
        </Plane>
        <Plane x={[-2.2, 2.2]} y={[-2.2, 2.2]} xStep={1} yStep={1} height={260} equalScale labels={false} xLabel="y" yLabel="z">
          <Polygon points={annulus(0, Ro, ri, 1)} color={C.good} fillOpacity={0.4} weight={0} strokeOpacity={0} />
          <Polyline points={ring(0, Ro, 0, 2 * Math.PI, 1, 96)} color={C.f} weight={2} />
          <Polyline points={ring(0, ri, 0, 2 * Math.PI, 1, 96)} color={C.g} weight={2} />
          <Line.Segment
            point1={[0, 0]}
            point2={[Ro * Math.cos((5 * Math.PI) / 6), Ro * Math.sin((5 * Math.PI) / 6)]}
            color={C.f}
            weight={2.5}
          />
          <Line.Segment
            point1={[0, 0]}
            point2={[ri * Math.cos(Math.PI / 3), ri * Math.sin(Math.PI / 3)]}
            color={C.g}
            weight={2.5}
          />
          {Ro > 0.25 && (
            <Label at={[(Ro / 2) * Math.cos((5 * Math.PI) / 6), (Ro / 2) * Math.sin((5 * Math.PI) / 6)]} attach="n" color={C.f} size={12}>
              R
            </Label>
          )}
          {ri > 0.25 && (
            <Label at={[(ri / 2) * Math.cos(Math.PI / 3), (ri / 2) * Math.sin(Math.PI / 3)]} attach="e" color={C.g} size={12}>
              r
            </Label>
          )}
          {wrong && Ro - ri > 0.005 && (
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
          min={1}
          max={3}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep from x = 1 to 3" />
          <Toggle label="What about π(R − r)²?" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`R = \\sqrt{\\tfrac{x^2-1}{2}} = ${Ro.toFixed(3)}`} />
          <Readout color={C.g} tex={`r = x - 1 = ${ri.toFixed(3)}`} />
          <Readout color={C.good} tex={`\\pi(R^2 - r^2) = ${A.toFixed(3)}`} />
          {wrong && <Readout color={C.bad} tex={`\\pi(R - r)^2 = ${W.toFixed(3)}`} />}
          <Readout
            color={wrong ? C.bad : undefined}
            tex={
              wrong
                ? `\\text{red discs so far} \\approx ${Vw.toFixed(3)}`
                : atEnd
                  ? `\\text{volume} = \\tfrac{2\\pi}{3} \\approx ${EXACT.toFixed(3)}\\ \\checkmark`
                  : `\\text{volume so far} \\approx ${V.toFixed(3)}`
            }
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
