// 2017 Methods Exam 1 Q2b — why part (a) answers part (b). Top: the integrand
// g(x) = logₑ(3x) + 1 with the area from 1 to t shaded. Bottom: F(x) = x logₑ(3x), whose slope
// is g(x) by part (a). Sweep t from 1 to 2: F's rise F(t) − F(1) always equals the shaded area,
// ending at logₑ(12). A toggle swaps in the tempting wrong "antiderivative" 1/x + x (the
// derivative of logₑ(3x) written down instead of an antiderivative): its slope is not g and its
// rise does not match the area.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Region, Slider, Toggle,
  integrate, usePlayer,
} from './kit'

const g = (x: number) => Math.log(3 * x) + 1
const F = (x: number) => x * Math.log(3 * x)
const Fw = (x: number) => 1 / x + x // derivative of logₑ(3x) plus x — NOT an antiderivative
const dFw = (x: number) => 1 - 1 / (x * x)
const LOG12 = Math.log(12)

export default function AreaIsRise() {
  const [t, setT] = useState(1.6)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setT, { min: 1, max: 2, seconds: 5 })

  const area = integrate(g, 1, t)
  const atEnd = t > 1.995
  const H = wrong ? Fw : F
  const slope = wrong ? dFw(t) : g(t)
  const rise = H(t) - H(1)
  const riseColor = wrong ? C.bad : C.good
  const hColor = wrong ? C.bad : C.violet

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <M>{'\\tfrac1x + x'}</M> uses <M>{'\\tfrac1x'}</M>, the <b>derivative</b> of <M>{'\\log_e(3x)'}</M>, where an
        antiderivative is needed. Its slope at <M>t</M> is <M>{'1 - \\tfrac{1}{t^2}'}</M>, nowhere near the height of
        the top graph, so its rise does not track the area: at <M>t = 2</M> it rises <M>0.5</M>, not{' '}
        <M>{'\\approx 2.485'}</M>. Only a function whose slope <em>is</em> the integrand keeps score.
      </Notice>
    )
  } else if (atEnd) {
    notice = (
      <Notice tone="good">
        At <M>t = 2</M> the rise is <M>{'F(2) - F(1) = 2\\log_e(6) - \\log_e(3) = \\log_e(12)'}</M>, and the shaded
        area is the same <M>{'\\approx 2.485'}</M>. That is the whole of part (b): no integration technique, just
        part (a) read backwards. Try the toggle to see a wrong antiderivative fail.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Part (a) says the slope of <M>{'F(x) = x\\log_e(3x)'}</M> at every <M>x</M> equals the height of the top
        graph. So as <M>t</M> moves right, <M>F</M> climbs at exactly the rate the shaded area grows, and the green
        rise <M>{'F(t) - F(1)'}</M> always matches the area. Press play to sweep <M>t</M> to <M>2</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 2.5]} y={[0, 3.3]} xStep={0.5} yStep={1} height={220}>
        <Region top={g} bottom={() => 0} from={1} to={t} color={C.f} opacity={0.25} />
        <Plot.OfX y={g} domain={[1 / (3 * Math.E), 2.5]} color={C.f} weight={3} />
        <Line.Segment point1={[t, 0]} point2={[t, g(t)]} color={C.f} weight={2.5} />
        <Line.Segment point1={[2, 0]} point2={[2, g(2)]} color={C.guide} weight={1.5} style="dashed" />
        <Point x={t} y={g(t)} color={C.f} />
        {t - 1 > 0.35 && (
          <Label at={[(1 + t) / 2, 1]} color={C.f} attach="c">{`area ≈ ${area.toFixed(3)}`}</Label>
        )}
        <Label at={[0.22, 2.75]} color={C.f} attach="e">y = logₑ(3x) + 1</Label>
      </Plane>
      <div className="h-2" />
      <Plane x={[0, 2.5]} y={[-0.5, 4]} xStep={0.5} yStep={1} height={240}>
        {wrong && <Plot.OfX y={F} domain={[0.02, 2.5]} color={C.guide} weight={1.5} style="dashed" />}
        <Plot.OfX y={H} domain={wrong ? [0.28, 2.5] : [0.02, 2.5]} color={hColor} weight={3} />
        <Line.Segment point1={[1, H(1)]} point2={[t, H(1)]} color={C.guide} weight={1.5} style="dashed" />
        <Line.Segment point1={[t, H(1)]} point2={[t, H(t)]} color={riseColor} weight={3.5} />
        <Line.PointSlope point={[t, H(t)]} slope={slope} color={hColor} weight={1.2} style="dashed" />
        <Point x={1} y={H(1)} color={hColor} />
        <Point x={t} y={H(t)} color={hColor} />
        {t - 1 > 0.12 && (
          <Label at={wrong ? [t, H(1)] : [t, (H(1) + H(t)) / 2]} color={riseColor} attach={wrong ? 'se' : 'e'}>
            {`rise ≈ ${rise.toFixed(3)}`}
          </Label>
        )}
        <Label at={[2.45, 0.35]} color={wrong ? C.guide : C.violet} attach="w">F(x) = x logₑ(3x)</Label>
        {wrong && <Label at={[0.6, Fw(0.6)]} color={C.bad} attach="ne">y = 1/x + x</Label>}
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={1}
          max={2}
          step={0.005}
        />
        <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Sweep t from 1 to 2" />
        <Toggle label="Try 1/x + x instead" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout color={C.f} tex={`\\text{area from 1 to } t \\approx ${area.toFixed(3)}`} />
          <Readout
            color={riseColor}
            tex={wrong ? `\\text{rise of } \\tfrac1x + x \\approx ${rise.toFixed(3)}` : `F(t) - F(1) \\approx ${rise.toFixed(3)}`}
          />
          <Readout color={hColor} tex={`\\text{slope of } ${wrong ? '\\tfrac1x + x' : 'F'} \\text{ at } t \\approx ${slope.toFixed(3)}`} />
          <Readout color={C.f} tex={`\\text{height of top graph at } t \\approx ${g(t).toFixed(3)}`} />
          {atEnd && !wrong && <Readout color={C.good} tex={`\\log_e(12) \\approx ${LOG12.toFixed(3)}\\ \\checkmark`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
