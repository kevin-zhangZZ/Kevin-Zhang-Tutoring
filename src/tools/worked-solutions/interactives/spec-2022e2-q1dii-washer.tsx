// 2022 Specialist Exam 2 Q1d.ii — why each slice of the solid is a washer of area π(h² − g²), and
// why the π must survive to the final number. Left: the region between h(x) = x + 3 (above) and
// g(x) = |x²/(x − 1)| = x²/(1 − x) (below) for (−1 − √7)/2 ≤ x ≤ (−1 + √7)/2, with its mirror image
// (the other half of the solid) and the slice at x drawn as a ring seen slightly from the side.
// Right: the same slice face-on — a disc of radius R = h(x) with a hole of radius r = g(x). At x = 0,
// g touches the x-axis, so r = 0 and the slice is a full disc of area 9π; at the two terminals R = r
// and the washer vanishes. Sweeping from the left terminal accumulates π∫(h² − g²)dx, reaching
// π(2√7 + 4 log_e(8 + 3√7)) ≈ 51.42 (16.37 without the π, the slip in the examiners' report). A
// toggle overlays the tempting disc of radius R − r (the report's "square of the difference"):
// it is smaller everywhere inside the region except at x = 0 (where r = 0); integrated it gives ≈ 39.70.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Polyline, Readout, Readouts,
  Region, Slider, Toggle, integrate, num, usePlayer, vec,
} from './kit'

const A = (-1 - Math.sqrt(7)) / 2
const B = (-1 + Math.sqrt(7)) / 2
const h = (x: number) => x + 3
const g = (x: number) => (x * x) / (1 - x)
const K = 0.06
const EXACT = Math.PI * (2 * Math.sqrt(7) + 4 * Math.log(8 + 3 * Math.sqrt(7)))
const WRONG_TOTAL = integrate(x => Math.PI * (h(x) - g(x)) ** 2, A, B, 400)

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

export default function Washer() {
  const [x0, setX0] = useState(-1.2)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setX0, { min: A, max: B, seconds: 6 })

  const Ro = h(x0)
  const ri = g(x0)
  const area = Math.PI * (Ro * Ro - ri * ri)
  const W = Math.PI * (Ro - ri) ** 2
  const V = integrate(x => Math.PI * (h(x) ** 2 - g(x) ** 2), A, x0)
  const Vw = integrate(x => Math.PI * (h(x) - g(x)) ** 2, A, x0)
  const atStart = x0 < A + 0.02
  const atEnd = x0 > B - 0.02
  const atZero = Math.abs(x0) < 0.03

  let notice
  if (wrong && atZero) {
    notice = (
      <Notice tone="warn">
        At <M>x = 0</M> the hole has radius <M>r = 0</M>, so <M>{'{\\pi(R - r)^2}'}</M> and <M>{'{\\pi(R^2 - r^2)}'}</M> happen
        to agree: both are <M>9\pi</M>. This is the only slice inside the region where they do. Move the slider either way and
        the red disc's area drops below the ring's.
      </Notice>
    )
  } else if (wrong) {
    notice = (
      <Notice tone="warn">
        <M>{'{\\pi(R - r)^2}'}</M> is the red disc, whose radius is only the <b>gap</b> between the line and the curve. It is
        smaller than the ring: <M>{num(W)}</M> against <M>{num(area)}</M> here. The ring is a strip <M>R - r</M> wide wrapped
        all the way round, which is why <M>{'{\\pi(R^2 - r^2) = \\pi(R - r)(R + r)}'}</M>. Added across the region, the red
        discs total about <M>{num(WRONG_TOTAL)}</M>, not <M>51.42</M>.
      </Notice>
    )
  } else if (atStart || atEnd) {
    notice = (
      <Notice tone="good">
        At <M>{atStart ? 'x = \\tfrac{-1-\\sqrt7}{2}' : 'x = \\tfrac{-1+\\sqrt7}{2}'}</M> the line meets the curve, so{' '}
        <M>R = r</M> and the washer has no area. That is why these are the terminals.{' '}
        {atEnd ? (
          <>
            Adding every washer gives <M>{'V = \\pi\\int\\left(h^2 - g^2\\right)dx \\approx 51.42'}</M>. Leave out the{' '}
            <M>\pi</M> and the calculator returns <M>16.37</M>: that is the volume divided by <M>\pi</M>, the slip the report
            describes.
          </>
        ) : (
          <>
            Press <b>Sweep across the region</b> to add up the washers from here to the right-hand terminal.
          </>
        )}
      </Notice>
    )
  } else if (atZero) {
    notice = (
      <Notice tone="good">
        At <M>x = 0</M> the curve <M>g</M> touches the <M>x</M>-axis, so <M>r = 0</M> and this slice is a full disc of radius{' '}
        <M>3</M> with no hole: area <M>{'\\pi(3^2 - 0^2) = 9\\pi'}</M>. Either side of <M>x = 0</M> the hole opens up again,
        and the same formula covers both cases.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The vertical slice of the region at this <M>x</M> runs from the curve (height <M>r = g(x)</M>) up to the line (height{' '}
        <M>R = h(x)</M>); the dashed copy below the axis is where the region lands after half a turn. Spun about the{' '}
        <M>x</M>-axis the slice makes a <b>washer</b>: a disc of radius <M>R</M> with a hole of radius <M>r</M>, so its area
        is <M>{'{\\pi R^2 - \\pi r^2}'}</M>. Press <b>Sweep across the region</b> to add up the washers, or turn on the toggle
        to test the square of the difference, <M>{'{\\pi(R - r)^2}'}</M>, which the part d.i. report says a significant
        number of responses used.
      </Notice>
    )
  }

  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-[3fr_2fr] sm:items-center">
        <Plane x={[-2.5, 1.5]} y={[-4.2, 4.2]} xStep={0.5} yStep={1} height={300} labels={v => (Number.isInteger(v) ? String(v) : '')}>
          <Region top={h} bottom={g} from={A} to={x0} color={C.f} opacity={0.35} />
          <Region top={h} bottom={g} from={x0} to={B} color={C.f} opacity={0.14} />
          <Region top={x => -g(x)} bottom={x => -h(x)} from={A} to={B} color={C.f} opacity={0.08} />
          <Line.Segment point1={[1, -4.2]} point2={[1, 4.2]} color={C.guide} style="dashed" weight={1.5} />
          <Label at={[1, -3.6]} attach="e" color={C.guide} size={12}>x = 1</Label>
          <Polyline points={ring(B, h(B), 0, 2 * Math.PI)} color={C.f} weight={1.5} />
          <Plot.OfX y={x => -h(x)} domain={[A, B]} color={C.f} weight={1.5} style="dashed" />
          <Plot.OfX y={x => -g(x)} domain={[A, B]} color={C.g} weight={1.5} style="dashed" />
          <Plot.OfX y={g} domain={[-2.5, 0.845]} color={C.g} weight={3} />
          <Plot.OfX y={h} domain={[-2.5, 1.2]} color={C.f} weight={3} />
          <Polygon points={annulus(x0, Ro, ri)} color={C.good} fillOpacity={0.55} weight={0} strokeOpacity={0} />
          <Polyline points={ring(x0, Ro, 0, 2 * Math.PI)} color={C.f} weight={1.5} />
          {ri > 0.02 && <Polyline points={ring(x0, ri, 0, 2 * Math.PI)} color={C.g} weight={1.5} />}
          <Line.Segment point1={[x0, 0]} point2={[x0, ri]} color={C.g} weight={3} />
          <Line.Segment point1={[x0, 0]} point2={[x0, -Ro]} color={C.f} weight={3} />
          {ri > 0.35 && (
            <Label at={[x0, ri / 2]} attach="w" color={C.g} size={12} gap={13}>r</Label>
          )}
          {Ro - ri > 0.45 && (
            <Label at={[x0, -(Ro + ri) / 2]} attach="w" color={C.f} size={12} gap={13}>R</Label>
          )}
          <Point x={A} y={h(A)} color={C.ink} />
          <Point x={B} y={h(B)} color={C.ink} />
          <Point x={0} y={0} color={C.ink} />
          <Label at={[-2.3, h(-2.3)]} attach="se" color={C.f} size={13}>h</Label>
          <Label at={[-2.2, g(-2.2)]} attach="n" color={C.g} size={13}>g</Label>
        </Plane>
        <Plane x={[-4.2, 4.2]} y={[-4.2, 4.2]} xStep={1} yStep={1} height={260} equalScale labels={false} xLabel="y" yLabel="z">
          <Polygon points={annulus(0, Ro, ri, 1)} color={C.good} fillOpacity={0.4} weight={0} strokeOpacity={0} />
          {wrong && Ro - ri > 0.005 && (
            <Polygon points={ring(0, Ro - ri, 0, 2 * Math.PI, 1, 64)} color={C.bad} fillOpacity={0.7} weight={1.5} />
          )}
          <Polyline points={ring(0, Ro, 0, 2 * Math.PI, 1, 96)} color={C.f} weight={2} />
          {ri > 0.02 && <Polyline points={ring(0, ri, 0, 2 * Math.PI, 1, 96)} color={C.g} weight={2} />}
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
          {Ro > 0.4 && (
            <Label at={[(Ro / 2) * Math.cos((5 * Math.PI) / 6), (Ro / 2) * Math.sin((5 * Math.PI) / 6)]} attach="n" color={C.f} size={12}>
              R
            </Label>
          )}
          {ri > 0.4 && (
            <Label at={[(ri / 2) * Math.cos(Math.PI / 3), (ri / 2) * Math.sin(Math.PI / 3)]} attach="e" color={C.g} size={12}>
              r
            </Label>
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
          min={A}
          max={B}
          step={0.005}
          format={v => num(v)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep across the region" />
          <Toggle label="What about π(R − r)²?" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`R = x + 3 = ${num(Ro, 3)}`} />
          <Readout color={C.g} tex={`r = \\tfrac{x^2}{1-x} = ${num(ri, 3)}`} />
          <Readout color={C.good} tex={`\\pi(R^2 - r^2) = ${num(area, 3)}`} />
          {wrong && <Readout color={C.bad} tex={`\\pi(R - r)^2 = ${num(W, 3)}`} />}
          <Readout
            color={wrong ? C.bad : undefined}
            tex={
              wrong
                ? `\\text{red discs so far} \\approx ${num(Vw)}`
                : atEnd
                  ? `V \\approx ${num(EXACT)}\\ \\checkmark`
                  : `\\text{volume so far} \\approx ${num(V)}`
            }
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
