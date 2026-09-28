// 2020 Methods Exam 2 Q1e.ii–iii — why the total shaded area is 2∫_{√2}^{√6} (h − f) dx. Sweep a
// strip across the right-hand shaded region: its height is h(x) − f(x) (h is on top between √2 and
// √6), and the running total climbs to 1.3605… A mirror strip at −x fills the left-hand region at
// exactly the same rate — f and h are both even, so the picture is symmetric in the y-axis — so the
// total is twice one region: 2.7210… ≈ 2.72. Stopping at 1.36 is the report's "forgot to multiply
// by 2". The toggle uses f − h instead (another error the report lists): every strip counts as
// negative and the "area" comes out as −2.72.

import { useState } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, PlayButton, Plot, Polygon, Readout, Readouts, Region, Slider, Toggle, integrate, num, tick, usePlayer } from './kit'

const f = (x: number) => 0.25 * (x * x - 4) ** 2
const h = (x: number) => 2 - f(x)
const XMAX = 2.87
const R2 = Math.SQRT2
const R6 = Math.sqrt(6)
const ONE = (56 * Math.SQRT2) / 15 - (8 * Math.sqrt(6)) / 5 // exact value of one region, 1.3605…
const W = 0.05

export default function Lobes() {
  const [s, setS] = useState(1.9)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setS, { min: R2, max: R6, seconds: 5 })
  const end = s > R6 - 0.003
  const sofar = end ? ONE : integrate(x => h(x) - f(x), R2, s)
  const sign = wrong ? -1 : 1
  const strip = wrong ? C.bad : C.good
  const lo = Math.max(R2, s - W / 2)
  const hi = Math.min(R6, s + W / 2)

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        With <M>f(x) - h(x)</M> as the integrand, every strip has <i>negative</i> height: in these regions <M>f</M> is the{' '}
        <b>lower</b> curve. The integral then comes out as <M>{`${num(-sofar, 2)}`}</M> so far, and{' '}
        <M>{`2 \\times (${num(-ONE, 4)}\\ldots) \\approx ${num(-2 * ONE)}`}</M> in total. An area can&apos;t be negative, which
        is the giveaway. In each shaded region <M>h</M> is on top, so it goes first: <M>h(x) - f(x)</M>.
      </Notice>
    )
  } else if (end) {
    notice = (
      <Notice tone="good">
        <b>One region is <M>{'\\int_{\\sqrt2}^{\\sqrt6}\\bigl(h(x)-f(x)\\bigr)dx \\approx 1.3605'}</M></b>, and the
        left-hand region, its mirror image, is another <M>1.3605</M>. Total: <M>{'2 \\times 1.3605\\ldots = 2.7210\\ldots \\approx 2.72'}</M>.
        That factor of 2 is the one the report says some students forgot, giving <M>1.36</M>. Writing the 2 in front of
        the integral (part e.ii) is what stops you forgetting it.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Between <M>\sqrt2</M> and <M>\sqrt6</M> the orange curve <M>h</M> is on top, so each strip has height{' '}
        <M>h(x) - f(x)</M>, and the area is the total of all these strips. The left-hand strip at <M>-x</M> is the
        mirror image of the right-hand one: <M>f</M> and <M>h</M> are both even (only <M>x^2</M> appears), so the graph
        is symmetric in the <M>y</M>-axis and the two regions fill at exactly the same rate. Press play to sweep to{' '}
        <M>\sqrt6</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 3]} y={[-2.5, 4.5]} xStep={1} yStep={1} height={300} yLabels={v => (v > 4.5 || v < -2.5 ? "" : tick(v))}>
        <Region top={h} bottom={f} from={R2} to={s} color={wrong ? C.bad : C.good} opacity={0.25} />
        <Region top={h} bottom={f} from={-s} to={-R2} color={wrong ? C.bad : C.good} opacity={0.25} />
        <Plot.OfX y={f} domain={[-XMAX, XMAX]} color={C.f} weight={3} />
        <Plot.OfX y={h} domain={[-XMAX, XMAX]} color={C.g} weight={3} />
        <Label at={[2.75, f(2.75)]} color={C.f} attach="w">f</Label>
        <Label at={[2.75, h(2.75)]} color={C.g} attach="w">h</Label>
        <Polygon points={[[lo, f(s)], [hi, f(s)], [hi, h(s)], [lo, h(s)]]} color={strip} fillOpacity={0.85} weight={1} />
        <Polygon points={[[-hi, f(s)], [-lo, f(s)], [-lo, h(s)], [-hi, h(s)]]} color={strip} fillOpacity={0.5} weight={1} />
        <Label at={[R2, 1]} attach="nw" size={11} color={C.guide}>√2</Label>
        <Label at={[R6, 1]} attach="e" gap={10} size={11} color={C.guide}>√6</Label>
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={s}
          onChange={v => {
            player.stop()
            setS(v)
          }}
          min={R2}
          max={R6}
          step={0.005}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(s)} label="Sweep from √2 to √6" />
          <Toggle label="What if I use f − h?" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={strip} tex={`\\text{strip height} = ${wrong ? 'f - h' : 'h - f'} = ${num(sign * (h(s) - f(s)))}`} />
          <Readout color={strip} tex={`\\text{right region so far} \\approx ${num(sign * sofar, 4)}`} />
          <Readout
            color={strip}
            tex={`\\text{both regions} \\approx 2 \\times ${wrong ? `(${num(-sofar, 4)})` : num(sofar, 4)} = ${num(2 * sign * sofar, 4)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
