// 2022 Methods Exam 2 Q5d — the average value of g′ on [π/8, π/6] is the height of the rectangle
// with the same signed area as g′. f is unknown, so nobody knows the real g′: the slider runs
// through possible g′ curves that fit everything the question gives (g′(π/8) = 0, g′(π/6) = 1/9,
// and area g(π/6) − g(π/8) = 3 − 5 = −2). The curve changes but the rectangle of height −48/π
// never moves — which is why the fundamental theorem (g at the ends), not g′'s end values, gives
// the answer. A toggle shows the wrong idea the report describes: using g′ instead of g at the
// ends, (24/π)(1/9 − 0) = 8/(3π) ≈ 0.85.
// The plane's horizontal coordinate is u = x − π/8, so the y-axis sits at x = π/8. The slider's
// readout says where the dip sits (left / middle / right of the interval) rather than a radian
// decimal, which the π/8 and π/6 axis labels give no way to place.

import { useMemo, useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, Slider, Toggle,
  integrate, num,
} from './kit'

const W = Math.PI / 24 // π/6 − π/8
const AVG = -48 / Math.PI // the answer: (3 − 5) ÷ (π/24)
const WRONG = 8 / (3 * Math.PI) // (24/π)(g′(π/6) − g′(π/8)) = (24/π)(1/9 − 0)

// One possible g′, as a function of u = x − π/8 ∈ [0, W]: a straight rise from 0 to 1/9 plus a dip
// t^p(1 − t)^q (zero at both ends, deepest near t = m), scaled so the mean is exactly −48/π.
function makeGp(m: number) {
  const p = 4 * m
  const q = 4 * (1 - m)
  const beta = integrate(t => t ** p * (1 - t) ** q, 0, 1, 600)
  const c = (AVG - 1 / 18) / beta
  return (u: number) => {
    const t = clamp01(u / W)
    return t / 9 + c * t ** p * (1 - t) ** q
  }
}
const clamp01 = (t: number) => Math.min(1, Math.max(0, t))

export default function SameArea() {
  const [m, setM] = useState(0.4)
  const [wrong, setWrong] = useState(false)

  const { gp, area, uMin, yMin } = useMemo(() => {
    const gp = makeGp(m)
    let uMin = 0
    let yMin = 0
    for (let i = 0; i <= 300; i++) {
      const u = (W * i) / 300
      const y = gp(u)
      if (y < yMin) {
        yMin = y
        uMin = u
      }
    }
    return { gp, area: integrate(gp, 0, W, 600), uMin, yMin }
  }, [m])

  const notice = wrong ? (
    <Notice tone="warn">
      Using <M>g'</M> instead of <M>g</M> at the ends gives{' '}
      <M>{'\\tfrac{24}{\\pi}\\left(\\tfrac19-0\\right)=\\tfrac{8}{3\\pi}\\approx0.85'}</M>: the red line, just above the
      axis. Its rectangle has area only <M>{'\\tfrac19'}</M>, not <M>-2</M>. The end values <M>0</M> and{' '}
      <M>{'\\tfrac19'}</M> say nothing about the deep dip in between, where this <M>g'</M> falls to about{' '}
      <M>{num(yMin, 0)}</M>.
    </Notice>
  ) : (
    <Notice>
      This is <b>one possible</b> <M>g'</M>: <M>f</M> is unknown, so nobody knows the real one. Every possibility starts at{' '}
      <M>{"g'(\\tfrac\\pi8)=0"}</M> (because <M>{"f'(\\tfrac{\\sqrt2}2)=0"}</M>), ends at{' '}
      <M>{"g'(\\tfrac\\pi6)=\\tfrac19"}</M>, and has signed area <M>{'g(\\tfrac\\pi6)-g(\\tfrac\\pi8)=3-5=-2'}</M>. Drag the slider: the curve changes, but the green
      rectangle with the same signed area never moves. Its height, <M>{'-\\tfrac{48}{\\pi}'}</M>, is the average value. Then turn on the
      wrong idea.
    </Notice>
  )

  return (
    <div>
      <Plane x={[-0.03, W + 0.04]} y={[-36, 4]} xStep={W / 4} yStep={10} height={320} xLabel="" yLabel="" labels={false}>
        {/* y numbers to the LEFT of the axis, clear of the curve as it drops from x = π/8 */}
        {[-10, -20, -30].map(v => (
          <Label key={v} at={[0, v]} attach="w" size={12} bold={false}>{`−${-v}`}</Label>
        ))}
        <Region top={u => Math.max(0, gp(u))} bottom={u => Math.min(0, gp(u))} from={0} to={W} color={C.f} opacity={0.25} />
        <Polygon points={[[0, 0], [W, 0], [W, AVG], [0, AVG]]} color={C.good} fillOpacity={0.12} weight={2} />
        {wrong && (
          <>
            <Polygon points={[[0, 0], [W, 0], [W, WRONG], [0, WRONG]]} color={C.bad} fillOpacity={0.35} weight={0} />
            <Line.Segment point1={[0, WRONG]} point2={[W, WRONG]} color={C.bad} weight={2.5} />
            <Label at={[W, WRONG]} color={C.bad} attach="ne">≈ 0.85</Label>
          </>
        )}
        <Plot.OfX y={gp} domain={[0, W]} color={C.f} weight={3} />
        <Label at={[0, 0]} attach="nw">π/8</Label>
        <Label at={[W, 0]} attach={wrong ? 'nw' : 'n'}>π/6</Label>
        <Label at={[W, AVG]} color={C.good} attach="e">−48/π</Label>
        <Label at={[uMin, yMin]} color={C.f} attach="s">g′(x)</Label>
      </Plane>
      <Controls>
        <Slider
          label="\text{where } g' \text{ dips}"
          value={m}
          onChange={setM}
          min={0.25}
          max={0.75}
          step={0.01}
          format={() => (uMin < 0.38 * W ? 'left' : uMin > 0.62 * W ? 'right' : 'middle')}
        />
        <Buttons>
          <Toggle label="Wrong idea: use g′ at the ends" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\text{signed area} \\approx ${num(area, 3)}`} />
          <Readout color={C.good} tex={`\\text{average} = \\dfrac{-2}{\\pi/24} \\approx ${num(AVG, 2)}`} />
          <Readout tex={`\\text{lowest } g' \\approx ${num(yMin, 1)}`} />
          {wrong && <Readout color={C.bad} tex={`\\tfrac{24}{\\pi}\\left(\\tfrac19-0\\right) \\approx ${num(WRONG, 2)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
