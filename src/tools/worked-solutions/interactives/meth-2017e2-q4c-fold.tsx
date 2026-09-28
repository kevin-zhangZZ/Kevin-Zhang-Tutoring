// 2017 Methods Exam 2 Q4c — why the area between f and f⁻¹ is 2∫(x − f(x))dx. Zoomed in on the
// thin lens between f(x) = 2^(x+1) − 2 and f⁻¹(x) = log₂(x + 2) − 1 for −1 ≤ x ≤ 0. The line y = x
// cuts it into two halves; the Fold slider reflects the sky half across y = x (like folding the
// page) until it lies exactly on the orange half. Both crossing points (−1, −1) and (0, 0) sit on
// the fold line and never move. Readouts: each half ≈ 0.0573, total 3 − 2/logₑ2 ≈ 0.1146.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Region, Slider,
  integrate, usePlayer,
} from './kit'

const f = (x: number) => 2 ** (x + 1) - 2
const fInv = (x: number) => Math.log2(x + 2) - 1
const HALF = integrate(x => x - f(x), -1, 0, 400)
const EXACT = 3 - 2 / Math.LN2

// Boundary of the sky half: along f from x = −1 to 0, then back along y = x.
const N = 48
const HALF_OUTLINE: [number, number][] = [
  ...Array.from({ length: N + 1 }, (_, i) => {
    const x = -1 + i / N
    return [x, f(x)] as [number, number]
  }),
  ...Array.from({ length: N - 1 }, (_, i) => {
    const x = -(i + 1) / N
    return [x, x] as [number, number]
  }),
]

export default function Fold() {
  const [t, setT] = useState(0)
  const player = usePlayer(setT, { min: 0, max: 1, seconds: 3 })
  const done = t > 0.995
  // Folding across y = x: each point moves straight towards its mirror image (y, x).
  const moved = HALF_OUTLINE.map(([x, y]) => [(1 - t) * x + t * y, (1 - t) * y + t * x] as [number, number])

  let notice
  if (done) {
    notice = (
      <Notice tone="good">
        <b>A perfect fit.</b> Reflection in <M>y=x</M> sends <M>f</M> onto <M>{'f^{-1}'}</M> and leaves the line
        itself where it is, so the two halves are congruent. The whole area is therefore{' '}
        <M>{'2\\int_{-1}^{0}\\left(x-f(x)\\right)dx'}</M>: one integral, and the inverse never appears inside it.
      </Notice>
    )
  } else if (t > 0.02) {
    notice = (
      <Notice>
        Watch the two crossing points: they sit on the fold line, so they stay put while everything else swings
        over. That is also why you find them from <M>f(x)=x</M>: points where <M>f</M> meets its own mirror image
        lie on the mirror.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The region between <M>f</M> and <M>{'f^{-1}'}</M> is a thin lens from <M>x=-1</M> to <M>x=0</M>, cut in half
        by <M>y=x</M>. The sky half is between <M>y=x</M> and <M>f</M>. Press <b>Fold</b> to reflect it across{' '}
        <M>y=x</M> and see where it lands.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.5, 0.5]} y={[-1.5, 0.5]} xStep={0.5} yStep={0.5} equalScale height={420}>
        <Region top={x => x} bottom={f} from={-1} to={0} color={C.f} opacity={0.18} />
        <Region top={fInv} bottom={x => x} from={-1} to={0} color={C.g} opacity={0.3} />
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={f} domain={[-1.5, 0.5]} color={C.f} weight={3} />
        <Plot.OfX y={fInv} domain={[-1.5, 0.5]} color={C.g} weight={3} />
        {t > 0.005 && <Polygon points={moved} color={done ? C.good : C.violet} fillOpacity={0.45} weight={1.5} />}
        <Point x={-1} y={-1} color={C.ink} />
        <Point x={0} y={0} color={C.ink} />
        <Label at={[-1, -1]} attach="se" size={12}>(−1, −1)</Label>
        <Label at={[0, 0]} attach="se" size={12}>(0, 0)</Label>
        <Label at={[-1.35, f(-1.35)]} color={C.f} attach="n">f</Label>
        <Label at={[0.3, fInv(0.3)]} color={C.g} attach="se">f⁻¹</Label>
      </Plane>
      <Controls>
        <Slider
          label="\text{fold}"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={1}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Fold" />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\int_{-1}^{0}\\left(x-f(x)\\right)dx \\approx ${HALF.toFixed(4)}`} />
          <Readout color={C.g} tex={`\\int_{-1}^{0}\\left(f^{-1}(x)-x\\right)dx \\approx ${HALF.toFixed(4)}`} />
          <Readout color={done ? C.good : undefined} tex={`A = 3-\\tfrac{2}{\\log_e 2} \\approx ${EXACT.toFixed(4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
