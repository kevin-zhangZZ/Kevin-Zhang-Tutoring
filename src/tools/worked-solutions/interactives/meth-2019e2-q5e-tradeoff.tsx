// 2019 Methods Exam 2 Q5e — why A(a) has a minimum. Slide a: the top picture redraws f(x) = 1 − x³,
// its tangent at x = a and the two shaded pieces (the sky "lens" between tangent and curve from
// P to x = 1, and the orange triangle under the tangent from x = 1 to Q). The graph below plots
// both pieces and their sum A(a) = 20a⁴/3 + 2a/3 − 3/4 + 1/(6a²) against a. A small a flattens the
// tangent and sends Q far right (the triangle blows up); a large a sends P up and left (the lens
// grows). The balance point is A′(a) = 0 at a = 10^(−1/3) ≈ 0.464; a = 1/2, one of the report's
// common wrong answers, is shown to sit just to the right of it.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Region, Slider, usePlayer } from './kit'

const f = (x: number) => 1 - x ** 3
const tangent = (a: number) => (x: number) => 2 * a ** 3 + 1 - 3 * a * a * x
const xQ = (a: number) => (2 * a ** 3 + 1) / (3 * a * a)
const lens = (a: number) => 6 * a ** 4 + 2 * a ** 3 - 1.5 * a * a + 0.25 // ∫_{-2a}^{1} (tangent − f)
const tri = (a: number) => ((a - 1) ** 4 * (2 * a + 1) ** 2) / (6 * a * a) // ∫_1^{xQ} tangent
const area = (a: number) => lens(a) + tri(a)
const dArea = (a: number) => (80 * a ** 3) / 3 + 2 / 3 - 1 / (3 * a ** 3)
const AMIN = Math.cbrt(0.1)
const zero = () => 0

export default function Tradeoff() {
  const [a, setA] = useState(0.35)
  const player = usePlayer(setA, { min: 0.3, max: 0.8, seconds: 8 })
  const t = tangent(a)
  const q = xQ(a)
  const d = dArea(a)
  const atMin = Math.abs(a - AMIN) < 0.0025
  const atHalf = Math.abs(a - 0.5) < 0.004

  let notice
  if (atMin) {
    notice = (
      <Notice tone="good">
        <b>The balance point.</b> Here <M>{"A'(a) = 0"}</M>: nudging <M>a</M> either way grows one piece by exactly as much
        as it shrinks the other, to first order. This is <M>{'a^3 = \\tfrac{1}{10}'}</M>, i.e.{' '}
        <M>{'a = \\tfrac{1}{\\sqrt[3]{10}} \\approx 0.464'}</M>, with minimum area{' '}
        <M>{'A \\approx 0.642'}</M>.
      </Notice>
    )
  } else if (atHalf) {
    notice = (
      <Notice tone="warn">
        <M>{'a = \\tfrac12'}</M> was one of the report&apos;s common incorrect answers. It&apos;s close, because the graph of{' '}
        <M>A</M> is flat near its minimum, but <M>{"A'(\\tfrac12) = \\tfrac43 > 0"}</M>: the area is still rising here.{' '}
        <M>{'A(\\tfrac12) = \\tfrac23 \\approx 0.667'}</M>, more than the minimum <M>0.642</M>. Slide left to find the real
        minimum.
      </Notice>
    )
  } else if (a < AMIN) {
    notice = (
      <Notice>
        With <M>a</M> small the tangent is shallow (gradient <M>{`-3a^2 = ${(-3 * a * a).toFixed(2)}`}</M>), so it only
        reaches the axis far out at <M>{`x_Q \\approx ${q.toFixed(2)}`}</M> and the <b>orange triangle</b> is big. Increasing{' '}
        <M>a</M> steepens the tangent and pulls <M>Q</M> in, shrinking the triangle faster than the lens grows, so{' '}
        <M>{"A'(a) < 0"}</M>. Press play or slide right.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now <M>{`P = (-2a,\\ 1 + 8a^3)`}</M> has climbed to height <M>{(1 + 8 * a ** 3).toFixed(2)}</M>, and the{' '}
        <b>sky lens</b> between the tangent and the curve grows quickly (it&apos;s <M>{'6a^4 + 2a^3 - \\tfrac32a^2 + \\tfrac14'}</M>).
        The triangle has almost nothing left to lose, so <M>{"A'(a) > 0"}</M>: the area rises again.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.7, 4]} y={[-0.6, 5.2]} xStep={1} yStep={1} height={230}>
        <Region top={t} bottom={f} from={-2 * a} to={1} color={C.f} opacity={0.3} />
        <Region top={t} bottom={zero} from={1} to={Math.min(q, 4.2)} color={C.g} opacity={0.35} />
        <Plot.OfX y={f} domain={[-1.62, 1.2]} color={C.f} weight={3} />
        <Plot.OfX y={t} domain={[-1.7, 4.2]} color={C.violet} weight={2.5} />
        <Point x={-2 * a} y={f(-2 * a)} color={C.ink} />
        <Label at={[-2 * a, f(-2 * a)]} attach="e">P</Label>
        <Point x={a} y={f(a)} color={C.violet} />
        {q < 4 && <Point x={q} y={0} color={C.ink} />}
        {q < 4 && <Label at={[q, 0]} attach="ne">Q</Label>}
        {q >= 4 && <Label at={[3.9, 0.35]} attach="w">Q is off to the right →</Label>}
      </Plane>
      <div className="mt-2" />
      <Plane x={[0, 1]} y={[0, 2.9]} xStep={0.25} yStep={0.5} height={240} xLabel="a" yLabel="area">
        <Plot.OfX y={lens} domain={[0, 0.83]} color={C.f} weight={2} />
        <Plot.OfX y={tri} domain={[0.2, 1]} color={C.g} weight={2} />
        <Plot.OfX y={area} domain={[0.235, 0.83]} color={C.violet} weight={3.5} />
        <Line.Segment point1={[a, 0]} point2={[a, Math.min(2.9, area(a))]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={AMIN} y={area(AMIN)} color={C.good} />
        <Label at={[AMIN, area(AMIN)]} color={C.good} attach="n">min</Label>
        <Point x={a} y={lens(a)} color={C.f} />
        <Point x={a} y={tri(a)} color={C.g} />
        <Point x={a} y={area(a)} color={C.violet} />
        <Label at={[0.3, area(0.3)]} color={C.violet} attach="ne">A(a)</Label>
        <Label at={[0.72, tri(0.72)]} color={C.g} attach="n">triangle</Label>
        <Label at={[0.6, lens(0.6)]} color={C.f} attach="se">lens</Label>
      </Plane>
      <Controls>
        <Slider
          label="a"
          value={a}
          onChange={v => {
            player.stop()
            setA(v)
          }}
          min={0.3}
          max={0.8}
          step={0.001}
          format={v => v.toFixed(3)}
        />
        <PlayButton playing={player.playing} onClick={() => player.toggle(a)} label="Slide a from 0.3 to 0.8" />
        <Readouts>
          <Readout color={C.f} tex={`\\text{lens} \\approx ${lens(a).toFixed(3)}`} />
          <Readout color={C.g} tex={`\\text{triangle} \\approx ${tri(a).toFixed(3)}`} />
          <Readout color={C.violet} tex={`A(a) \\approx ${area(a).toFixed(3)}`} />
          <Readout
            color={atMin ? C.good : undefined}
            tex={atMin ? "A'(a) \\approx 0" : `A'(a) \\approx ${d.toFixed(2)} ${d < 0 ? '< 0' : '> 0'}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
