// 2017 Methods Exam 2 Q4i(ii) — A(k) is trapped inside a 2 × 2 square. For k > 1/2 the region
// between gₖ(x) = 2e^(kx) − 2 and gₖ⁻¹ lies between x = r and x = 0, where r is the third-quadrant
// solution of gₖ(x) = x. As k grows (log-scale slider, Play sweeps k from 0.52 to 50), gₖ hugs
// x = 0 and y = −2 while gₖ⁻¹ hugs y = 0 and x = −2, so the region fills the square with corners
// (−2, −2) and (0, 0). Using e^(kr) = (r + 2)/2, A(k) = 2∫ᵣ⁰(x − gₖ(x))dx = 2r/k − r² − 4r exactly,
// which approaches 4 (roughly 4 − 4/k for large k) but never reaches it: b = 4.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Region, Slider, num, usePlayer } from './kit'

const MIN = Math.log10(0.52)
const MAX = Math.log10(50)

function root(k: number): number {
  // Third-quadrant solution of 2e^(kx) − 2 = x, for k > 1/2: h(−2) > 0 > h(minimum).
  const h = (x: number) => 2 * Math.exp(k * x) - 2 - x
  let a = -2
  let b = Math.log(1 / (2 * k)) / k
  for (let i = 0; i < 80; i++) {
    const m = (a + b) / 2
    if (h(m) > 0) a = m
    else b = m
  }
  return (a + b) / 2
}

export default function AreaLimit() {
  const [s, setS] = useState(Math.log10(2))
  const player = usePlayer(setS, { min: MIN, max: MAX, seconds: 7 })
  const k = 10 ** s
  const r = root(k)
  const A = (2 * r) / k - r * r - 4 * r
  const gk = (x: number) => 2 * Math.exp(k * x) - 2
  const gi = (x: number) => Math.log((x + 2) / 2) / k

  let notice
  if (k > 15) {
    notice = (
      <Notice tone="good">
        Now the curves are almost the edges of the square, and <M>A(k)</M> is within <M>{num(4 - A, 2)}</M> of{' '}
        <M>4</M>. It keeps creeping up as <M>k</M> grows (for large <M>k</M>, roughly <M>{'4-\\tfrac4k'}</M>) but the
        region can never leave the square, so <M>{'A(k)<4'}</M> for every <M>k</M>. Any <M>{'b<4'}</M> is eventually
        beaten; <M>b=4</M> never is.
      </Notice>
    )
  } else if (k < 0.8) {
    notice = (
      <Notice>
        Just above <M>{'k=\\tfrac12'}</M> the region is a sliver: the second crossing has only just left the origin.
        (At <M>{'k=\\log_e 2'}</M> it is the lens from part (c), area <M>{'\\approx0.115'}</M>.) Press <b>Play</b> and
        watch what the region does as <M>k</M> grows.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The asymptotes <M>y=-2</M> and <M>x=-2</M> do not move when <M>k</M> changes; only the steepness does. A
        bigger <M>k</M> pushes <M>{'g_k'}</M> into the corner along <M>x=0</M> and <M>y=-2</M>, and its mirror image
        along <M>y=0</M> and <M>x=-2</M>. The region swells, but only inside the shaded <M>2\times2</M> square.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.6, 0.6]} y={[-2.6, 0.6]} xStep={0.5} yStep={0.5} equalScale height={400}>
        <Polygon points={[[-2, -2], [0, -2], [0, 0], [-2, 0]]} color={C.violet} fillOpacity={0.06} weight={0} />
        <Line.Segment point1={[-2.6, -2]} point2={[0.6, -2]} color={C.f} style="dashed" weight={1.5} />
        <Line.Segment point1={[-2, -2.6]} point2={[-2, 0.6]} color={C.g} style="dashed" weight={1.5} />
        <Region top={gi} bottom={gk} from={r} to={0} color={C.violet} opacity={0.35} samples={240} />
        <Plot.OfX y={gk} domain={[-2.6, 0.6]} color={C.f} weight={3} />
        <Plot.OfX y={gi} domain={[-1.99999, 0.6]} color={C.g} weight={3} />
        <Point x={r} y={r} color={C.ink} />
        <Point x={0} y={0} color={C.ink} />
        <Label at={[-2.6, -2]} color={C.f} attach="se" size={12}>y = −2</Label>
        <Label at={[-2, 0.6]} color={C.g} attach="se" size={12}>x = −2</Label>
        <Label at={[Math.log(1.125) / k, 0.25]} color={C.f} attach="e">gₖ</Label>
        <Label at={[-1.1, gi(-1.1)]} color={C.g} attach="nw">gₖ⁻¹</Label>
      </Plane>
      <Controls>
        <Slider
          label="k"
          value={s}
          onChange={v => {
            player.stop()
            setS(v)
          }}
          min={MIN}
          max={MAX}
          step={0.005}
          format={v => (10 ** v < 10 ? (10 ** v).toFixed(2) : (10 ** v).toFixed(1))}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(s)} label="Play: k from 0.52 to 50" />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`A(k) \\approx ${A.toFixed(3)}`} />
          <Readout tex={`4 - A(k) \\approx ${(4 - A).toFixed(3)}`} />
          <Readout tex={`\\text{second crossing } x \\approx ${r.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
