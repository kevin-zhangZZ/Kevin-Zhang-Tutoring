// 2018 Methods Exam 1 Q8c — the region between f(x) = x²e^{kx} (above the axis) and
// g(x) = −2xe^{kx}/k (below it), from x = 0 to x = 2, drawn with k = 1. A sliding strip shows its
// height is f − g = f + |g|: subtracting a negative g adds the lower part. A toggle shows the
// report's slip, ∫f + ∫g, which counts the part below the axis as negative — at k = 1 it totals −4.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Polygon, Readout, Readouts, Region, Slider,
  Toggle, integrate, num, usePlayer,
} from './kit'

const K = 1
const f = (x: number) => x * x * Math.exp(K * x)
const g = (x: number) => (-2 * x * Math.exp(K * x)) / K
const zero = () => 0
const W = 0.035
const END = 2.15

export default function Strips() {
  const [x0, setX0] = useState(1.4)
  const [sum, setSum] = useState(false)
  const player = usePlayer(setX0, { min: 0, max: 2, seconds: 6 })

  const fv = f(x0)
  const gv = g(x0)
  const atEnd = x0 > 1.995
  const area = integrate(x => f(x) - g(x), 0, x0)
  const above = integrate(f, 0, x0)
  const below = integrate(g, 0, x0)
  const s0 = Math.max(0, x0 - W / 2)
  const s1 = Math.min(2, x0 + W / 2)
  const box = (lo: number, hi: number): [number, number][] => [[s0, lo], [s1, lo], [s1, hi], [s0, hi]]

  let notice
  if (!sum) {
    notice = (
      <Notice>
        Each thin strip runs from the bottom curve <M>g</M> up to the top curve <M>f</M>, so its height is{' '}
        <M>f(x) - g(x)</M>. Below the axis <M>g(x)</M> is negative, so <b>subtracting it adds</b> the orange piece:
        here <M>{`${num(fv, 1)} - (${num(gv, 1)}) = ${num(fv - gv, 1)}`}</M>. Adding the strips from <M>0</M> to{' '}
        <M>2</M> is <M>{'\\int_0^2 \\bigl(f(x) - g(x)\\bigr)\\,dx'}</M>. Now switch on the toggle.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <M>{'\\int g(x)\\,dx'}</M> counts the region under the axis as <b>negative</b>, because <M>{'g < 0'}</M>{' '}
        there. So <M>{'\\int f + \\int g'}</M> is (area above) <b>minus</b> (area below), not their sum. Sweep to{' '}
        <M>x = 2</M>: with <M>k = 1</M> it ends at exactly <M>-4</M>, a negative &ldquo;area&rdquo;, while the region
        is about <M>29.6</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, END]} y={[-40, 40]} xStep={0.5} yStep={10} height={320}>
        {sum ? (
          <>
            <Region top={f} bottom={zero} from={0} to={x0} color={C.f} opacity={0.3} />
            <Region top={zero} bottom={g} from={0} to={x0} color={C.bad} opacity={0.3} />
          </>
        ) : (
          <Region top={f} bottom={g} from={0} to={x0} color={C.f} opacity={0.25} />
        )}
        <Region top={f} bottom={g} from={x0} to={2} color={C.guide} opacity={0.08} />
        <Plot.OfX y={f} domain={[0, END]} color={C.f} weight={3} />
        <Plot.OfX y={g} domain={[0, END]} color={C.g} weight={3} />
        <Line.Segment point1={[2, g(2)]} point2={[2, f(2)]} color={C.guide} weight={2} />
        <Label at={[2, 34]} color={C.guide} attach="w">x = 2</Label>
        <Label at={[1.55, f(1.55)]} color={C.f} attach="nw">f</Label>
        <Label at={[1.55, g(1.55)]} color={C.g} attach="sw">g</Label>
        {sum ? (
          <Polygon points={box(0, fv + gv)} color={C.bad} fillOpacity={0.85} weight={1} />
        ) : (
          <>
            <Polygon points={box(0, fv)} color={C.f} fillOpacity={0.9} weight={1} />
            <Polygon points={box(gv, 0)} color={C.g} fillOpacity={0.9} weight={1} />
          </>
        )}
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={0}
          max={2}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep from 0 to 2" />
          <Toggle label="Add ∫f and ∫g instead" checked={sum} onChange={setSum} />
        </Buttons>
        <Readouts>
          <Readout tex={'k = 1 \\text{ (for the picture)}'} />
          {sum ? (
            <>
              <Readout color={C.bad} tex={`\\text{strip: } f + g = ${num(fv + gv, 2)}`} />
              <Readout color={C.f} tex={`\\textstyle\\int f \\approx ${num(above, 2)}`} />
              <Readout color={C.bad} tex={`\\textstyle\\int g \\approx ${num(below, 2)}`} />
              <Readout color={C.bad} tex={`\\text{total} \\approx ${num(above + below, 2)}`} />
            </>
          ) : (
            <>
              <Readout color={C.f} tex={`\\text{strip: } f - g = ${num(fv - gv, 2)}`} />
              <Readout tex={`\\text{area so far} \\approx ${num(area, 2)}`} />
            </>
          )}
          {atEnd && sum && <Readout color={C.bad} tex={'\\int_0^2 \\bigl(f + g\\bigr)\\,dx = -4 \\ \\times'} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
