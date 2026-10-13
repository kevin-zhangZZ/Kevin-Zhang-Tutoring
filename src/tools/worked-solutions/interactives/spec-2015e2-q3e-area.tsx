// 2015 Specialist Exam 2 Q3e — the "hence" antiderivative IS the area function. Sweep a
// terminal b from 0 to √3/2 across the bow-tie logo: the shaded part of the logo (all four
// mirror-image quarters, |x| ≤ b) always equals arcsin(b) − b√(1 − b²), the antiderivative
// read off part d. At b = √3/2 it gives the whole logo, π/3 − √3/4 ≈ 0.614. Readouts compare a
// numerical 4∫₀ᵇ y dx with the antiderivative so students see why no CAS integral is needed.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Readout, Readouts, Region, Slider,
  integrate, usePlayer,
} from './kit'

const END = Math.sqrt(3) / 2
const y = (x: number) => (x * x) / (2 * Math.sqrt(1 - x * x))
const F = (b: number) => Math.asin(b) - b * Math.sqrt(1 - b * b)
const zero = () => 0
const neg = (x: number) => -y(x)
const EXACT = Math.PI / 3 - Math.sqrt(3) / 4

export default function BowTieArea() {
  const [b, setB] = useState(0.6)
  const player = usePlayer(setB, { min: 0, max: END, seconds: 6 })

  const quarter = integrate(y, 0, b)
  const atEnd = b > END - 0.005

  return (
    <div>
      <Plane x={[-1.05, 1.05]} y={[-0.9, 0.9]} xStep={0.5} yStep={0.25} height={300} label="The bow-tie logo with the part between x = −b and x = b shaded">
        <Region top={y} bottom={zero} from={0} to={b} color={C.f} opacity={0.65} />
        <Region top={y} bottom={zero} from={-b} to={0} color={C.f} opacity={0.15} />
        <Region top={zero} bottom={neg} from={-b} to={b} color={C.f} opacity={0.15} />
        <Plot.OfX y={y} domain={[-END, END]} color={C.ink} weight={2.5} />
        <Plot.OfX y={neg} domain={[-END, END]} color={C.ink} weight={2.5} />
        <Line.Segment point1={[END, -0.75]} point2={[END, 0.75]} color={C.ink} weight={2.5} />
        <Line.Segment point1={[-END, -0.75]} point2={[-END, 0.75]} color={C.ink} weight={2.5} />
        <Line.Segment point1={[b, 0]} point2={[b, y(b)]} color={C.g} weight={3} />
        <Label at={[b, y(b)]} color={C.g} attach="n">x = b</Label>
      </Plane>
      <Controls>
        <Slider
          label="b"
          value={b}
          onChange={v => {
            player.stop()
            setB(v > END - 0.005 ? END : v)
          }}
          min={0}
          max={END}
          step={0.005}
        />
        <PlayButton playing={player.playing} onClick={() => player.toggle(b)} label="Sweep b out to √3/2" />
        <Readouts>
          <Readout color={C.f} tex={`4\\int_0^{${b.toFixed(3)}} y\\,dx \\approx ${(4 * quarter).toFixed(4)}`} />
          <Readout color={C.g} tex={`\\arcsin(b) - b\\sqrt{1-b^2} = ${F(b).toFixed(4)}`} />
          {atEnd && <Readout color={C.good} tex={`\\tfrac\\pi3 - \\tfrac{\\sqrt3}4 \\approx ${EXACT.toFixed(4)}\\ \\checkmark`} />}
        </Readouts>
        {atEnd ? (
          <Notice tone="good">
            <b>At <M>{'b = \\tfrac{\\sqrt3}{2}'}</M> the shading fills the whole logo</b>, and the antiderivative
            gives <M>{'\\tfrac\\pi3 - \\tfrac{\\sqrt3}{4}'}</M>. Writing <M>{'\\left[\\arcsin(x) - x\\sqrt{1-x^2}\\right]_0^{\\sqrt3/2}'}</M>{' '}
            is the working the marks were for.
          </Notice>
        ) : (
          <Notice>
            The two readouts agree for <b>every</b> <M>b</M>: the antiderivative from part d. measures the shaded
            area (the darker quarter and its three mirror images) all by itself, so no CAS integral is needed. That works because its
            derivative, <M>{'\\tfrac{2x^2}{\\sqrt{1-x^2}}'}</M>, is <M>4y</M>. Sweep <M>b</M> out to the edge.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
