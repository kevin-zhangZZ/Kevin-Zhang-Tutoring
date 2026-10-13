// 2016 Methods Exam 2 Q4f.i — A(k) is a function of k. Slide k: the curve y = g(x) changes, but it
// always meets y = x at x = −1 and x = 1, so the terminals of ∫(g − x)dx never move while the
// shaded area does. A toggle overlays f (the case k = 2) — its area stays 0.704 whatever k is,
// which is why ∫₋₁¹(f(x) − x)dx, an answer the report notes, cannot be A(k). Past x = 1 the curve
// drops below the line, so ∫₁^∞ is not this region either.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle, integrate } from './kit'

const f = (x: number) => (2 * x + 1) / (x + 2)
const A = (k: number) => 2 * k + (k * k - 1) * Math.log((k - 1) / (k + 1))
const AF = 4 - 3 * Math.log(3)

export default function AreaK() {
  const [k, setK] = useState(4)
  const [showF, setShowF] = useState(false)
  const g = (x: number) => (k * x + 1) / (x + k)
  const area = A(k)
  const check = integrate(x => g(x) - x, -1, 1, 400)
  const atTwo = Math.abs(k - 2) < 0.01

  return (
    <div>
      <Plane x={[-1.5, 2]} y={[-1.5, 2]} xStep={0.5} yStep={0.5} equalScale height={360}>
        {showF && <Region top={f} bottom={x => x} from={-1} to={1} color={C.g} opacity={0.18} />}
        <Region top={g} bottom={x => x} from={-1} to={1} color={C.f} opacity={0.28} />
        {showF && <Plot.OfX y={f} domain={[-1.5, 2]} color={C.g} weight={2} style="dashed" />}
        <Plot.OfX y={g} domain={[Math.max(-1.5, -k + 0.02), 2]} color={C.f} weight={3} />
        <Line.Segment point1={[-1.5, -1.5]} point2={[2, 2]} color={C.ink} weight={1.5} />
        <Point x={-1} y={-1} color={C.good} />
        <Point x={1} y={1} color={C.good} />
        <Label at={[-1, -1]} color={C.good} attach="se">x = −1</Label>
        <Label at={[1, 1]} color={C.good} attach="se">x = 1</Label>
        <Label at={[1.8, g(1.8)]} color={C.f} attach="s">g</Label>
        <Label at={[1.8, 1.8]} attach="nw">y = x</Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={1.02} max={8} step={0.01} />
        <Buttons>
          <Toggle label="Overlay f (the case k = 2)" checked={showF} onChange={setShowF} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`A(${k.toFixed(2)}) = 2k+(k^2-1)\\log_e\\tfrac{k-1}{k+1} \\approx ${area.toFixed(3)}`} />
          <Readout tex={`\\int_{-1}^{1}(g-x)\\,dx \\approx ${check.toFixed(3)}`} />
          {showF && <Readout color={C.g} tex={`\\int_{-1}^{1}(f-x)\\,dx \\approx ${AF.toFixed(3)}`} />}
        </Readouts>
        {showF ? (
          <Notice tone={atTwo ? 'good' : 'warn'}>
            {atTwo ? (
              <>
                At <M>k=2</M>, <M>g</M> <b>is</b> <M>f</M>, so the two areas agree: <M>{'A(2)=4-3\\log_e(3)'}</M>, part b.ii.&apos;s answer.
              </>
            ) : (
              <>
                The orange area belongs to <M>f</M> alone and stays <M>0.704</M> whatever <M>k</M> is. <M>{'A(k)'}</M> must change as{' '}
                <M>k</M> changes, so it has to be built from <M>g</M>. Slide <M>k</M> to <M>2</M> to see the two agree.
              </>
            )}
          </Notice>
        ) : (
          <Notice>
            Slide <M>k</M>: the shaded area changes, but the curve always crosses <M>y=x</M> at the two green points, so the
            terminals stay <M>-1</M> and <M>1</M>. To the right of <M>x=1</M> the curve is <b>below</b> the line, so{' '}
            <M>{'\\int_1^{\\infty}'}</M> is not this region. Then overlay <M>f</M>.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
