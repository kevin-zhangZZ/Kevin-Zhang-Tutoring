// 2018 Methods Exam 2 Q5g — with a = 3√2/2, g(x) = x²(3√2/2 − x) on [0, √2] and g⁻¹ share both
// endpoints, but g also crosses y = x at x = √2/2, so the region between g and g⁻¹ is four thin
// lobes (two between g and y = x, and their mirror images). Sweep a strip of height |x − g(x)|
// across [0, √2]: each lobe is 1/16, so the enclosed area is 4 × 1/16 = 1/4. A toggle shows the
// single integral ∫₀^√2 (x − g(x)) dx cancelling to 0.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Region, Slider,
  Toggle, integrate, usePlayer,
} from './kit'

const S = Math.SQRT2
const A = (3 * S) / 2
const MID = S / 2
const g = (x: number) => x * x * (A - x)
const id = (x: number) => x
function gInv(y: number) {
  let lo = 0
  let up = S
  for (let i = 0; i < 40; i++) {
    const m = (lo + up) / 2
    if (g(m) < y) lo = m
    else up = m
  }
  return (lo + up) / 2
}
/** toFixed without a "-0.000" when the value rounds to zero. */
const fx = (v: number, dp: number) => (Math.abs(v) < 0.5 * 10 ** -dp ? 0 : v).toFixed(dp)
const W = 0.02

export default function Lobes() {
  const [x0, setX0] = useState(0.4)
  const [mirror, setMirror] = useState(true)
  const [oneGo, setOneGo] = useState(false)
  const player = usePlayer(setX0, { min: 0, max: S, seconds: 6 })

  const left = x0 < MID
  const near = Math.abs(x0 - MID) < 0.015
  const done = x0 > S - 0.005
  const d = x0 - g(x0)
  const signed = integrate(x => x - g(x), 0, x0)
  const unsigned = integrate(x => Math.abs(x - g(x)), 0, x0)
  const stripColor = near ? C.good : left ? C.f : oneGo ? C.bad : C.f
  const lo = Math.min(x0, g(x0))
  const hi = Math.max(x0, g(x0))
  const s0 = Math.max(0, x0 - W / 2)
  const s1 = Math.min(S, x0 + W / 2)

  let notice
  if (near) {
    notice = (
      <Notice tone="good">
        <b>At <M>{'x = \\tfrac{\\sqrt2}{2}'}</M> the strip has zero height</b>: <M>g</M> crosses <M>y = x</M> here, in
        the middle of the interval, so <M>g</M> and <M>{'g^{-1}'}</M> cross here too. That splits the enclosed region
        into two pieces, and <M>g</M> changes side of the line.
      </Notice>
    )
  } else if (left) {
    notice = (
      <Notice>
        Left of <M>{'\\tfrac{\\sqrt2}{2}'}</M>, <b><M>g</M> is below the line</b>, so each strip has height{' '}
        <M>x - g(x)</M>. These strips make the first sky lobe, and{' '}
        <M>{'\\int_0^{\\sqrt2/2}\\left(x - g(x)\\right)dx = \\tfrac1{16}'}</M>. Its mirror image in <M>y = x</M>{' '}
        {mirror ? '(the orange lobe) ' : ''}lies between <M>y = x</M> and <M>{'g^{-1}'}</M>, so it is{' '}
        <M>{'\\tfrac1{16}'}</M> too.
      </Notice>
    )
  } else if (!oneGo) {
    notice = (
      <Notice>
        Right of <M>{'\\tfrac{\\sqrt2}{2}'}</M>, <b><M>g</M> is above the line</b>, so the height is now{' '}
        <M>g(x) - x</M>, and this lobe is <M>{'\\tfrac1{16}'}</M> as well. With the mirror lobes, the region between{' '}
        <M>g</M> and <M>{'g^{-1}'}</M> is four pieces of <M>{'\\tfrac1{16}'}</M>: <M>{'\\tfrac14'}</M>. Now try the
        single integral.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        In one integral <M>{'\\int_0^{\\sqrt2}\\left(x - g(x)\\right)dx'}</M>, every strip right of{' '}
        <M>{'\\tfrac{\\sqrt2}{2}'}</M> is negative and eats into the first lobe. Sweep to <M>\sqrt2</M>: it ends at{' '}
        <M>0</M>. A zero &ldquo;area&rdquo; for a picture with visible gaps means the curves swapped sides; split at the
        crossing.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.1, 1.8]} y={[-0.1, 1.6]} xStep={0.5} yStep={0.5} height={400} equalScale>
        <Region top={id} bottom={g} from={0} to={Math.min(x0, MID)} color={C.f} opacity={0.3} />
        {x0 > MID && <Region top={g} bottom={id} from={MID} to={x0} color={oneGo ? C.bad : C.f} opacity={0.3} />}
        {mirror && (
          <>
            <Region top={gInv} bottom={id} from={0} to={MID} color={C.g} opacity={0.3} />
            <Region top={id} bottom={gInv} from={MID} to={S} color={C.g} opacity={0.3} />
          </>
        )}
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={2} />
        {mirror && <Plot.Parametric xy={s => [g(s), s]} domain={[0, S]} color={C.g} weight={3} />}
        <Plot.OfX y={g} domain={[0, S]} color={C.f} weight={3} />
        <Polygon points={[[s0, lo], [s1, lo], [s1, hi], [s0, hi]]} color={stripColor} fillOpacity={0.85} weight={1} />
        <Point x={0} y={0} color={C.ink} />
        <Point x={MID} y={MID} color={C.good} />
        <Point x={S} y={S} color={C.ink} />
        <Label at={[MID, MID]} attach="se" color={C.good}>(√2/2, √2/2)</Label>
        <Label at={[S, S]} attach="se">(√2, √2)</Label>
        <Label at={[1.0, g(1.0)]} attach="nw" color={C.f}>g</Label>
        {mirror && <Label at={[g(1.0), 1.0]} attach="se" color={C.g}>g⁻¹</Label>}
        <Label at={[1.55, 1.55]} attach="nw" color={C.guide}>y = x</Label>
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
          max={S}
          step={0.005}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep from 0 to √2" />
          <Toggle label="Show the mirror image g⁻¹" checked={mirror} onChange={setMirror} />
          <Toggle label="Integrate x − g(x) in one go" checked={oneGo} onChange={setOneGo} />
        </Buttons>
        <Readouts>
          <Readout
            color={stripColor}
            tex={left || oneGo ? `\\text{height} = x - g(x) = ${fx(d, 3)}` : `\\text{height} = g(x) - x = ${fx(-d, 3)}`}
          />
          {oneGo ? (
            <Readout color={C.bad} tex={`\\int_0^{${x0.toFixed(2)}}\\left(x - g(x)\\right)dx \\approx ${fx(signed, 4)}`} />
          ) : (
            <Readout tex={`\\text{sky area so far} \\approx ${unsigned.toFixed(4)}`} />
          )}
          {done && !oneGo && <Readout color={C.good} tex="\text{enclosed} = 2\left(\tfrac1{16} + \tfrac1{16}\right) = \tfrac14\ \checkmark" />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
