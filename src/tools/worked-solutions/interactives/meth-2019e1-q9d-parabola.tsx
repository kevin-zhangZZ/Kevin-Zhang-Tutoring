// 2019 Methods Exam 1 Q9d (and e) — f(g(x)) = 3 + 2eˣ − e²ˣ is just the parabola f(u) = 3 + 2u − u²
// read off at u = eˣ. Top panel: the parabola in the u-plane, with u ≤ 0 greyed out because eˣ
// is always positive. Bottom panel: y = f(g(x)). Sliding x moves a point to u = eˣ on the parabola
// and to the same height on f(g(x)). The root u = 3 is reached (x = logₑ3), the root u = −1 never
// is (no x = logₑ(−1)), the vertex u = 1 is part e's stationary point (0, 4), and u → 0⁺ as
// x → −∞ gives the asymptote y = 3.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Slider, num, usePlayer } from './kit'

const f = (u: number) => 3 + 2 * u - u * u
const F = (x: number) => f(Math.exp(x))
const LN3 = Math.log(3)
const Y: [number, number] = [-6.5, 6.5]
const XMIN = -3
const XMAX = 1.35

export default function ParabolaAlongExp() {
  const [x0, setX0] = useState(0.6)
  const player = usePlayer(setX0, { min: XMIN, max: XMAX, seconds: 7 })
  const u0 = Math.exp(x0)
  const y0 = F(x0)

  const atRoot = Math.abs(x0 - LN3) < 0.025
  const atVertex = Math.abs(x0) < 0.025
  const farLeft = x0 < -1.6
  const ptCol = atRoot || atVertex ? C.good : C.violet

  let notice
  if (atRoot) {
    notice = (
      <Notice tone="good">
        <b>Here <M>{'u = e^x = 3'}</M>, a root of the parabola</b>, so <M>{'f(g(x)) = 0'}</M> at{' '}
        <M>{'x = \\log_e(3)'}</M>. The parabola&apos;s other root, <M>{'u = -1'}</M>, sits in the grey zone:{' '}
        <M>{'e^x'}</M> is never negative, so no <M>x</M> ever gets there. That is why <M>{'\\log_e(-1)'}</M> is not a
        solution: it doesn&apos;t exist.
      </Notice>
    )
  } else if (atVertex) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = 0</M>, <M>{'u = e^0 = 1'}</M>: the vertex of the parabola.</b> Its height <M>4</M> carries straight
        across, so <M>{'f(g(x))'}</M> turns at <M>(0, 4)</M>. This is part e.&apos;s stationary point: the derivative{' '}
        <M>{'2e^x(1-e^x)'}</M> is zero exactly when <M>{'u = e^x = 1'}</M>.
      </Notice>
    )
  } else if (farLeft) {
    notice = (
      <Notice>
        As <M>{'x \\to -\\infty'}</M>, <M>{'u = e^x \\to 0^+'}</M>, so the point slides towards <M>{'f(0) = 3'}</M> on the
        parabola but never reaches it. That is the horizontal asymptote <M>y = 3</M> on the left of{' '}
        <M>{'f(g(x))'}</M>. Now slide right to find where the height is <M>0</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Each <M>x</M> sends the top point to <M>{'u = e^x'}</M>, always right of the grey zone because{' '}
        <M>{'e^x > 0'}</M>. Whatever height the parabola has at <M>u</M>, <M>{'f(g(x))'}</M> has at <M>x</M> (the
        dashed line). Slide to where the height is <M>0</M>, then to <M>x = 0</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2, 4.3]} y={Y} xStep={1} yStep={2} height={230} xLabel="u" yLabel="">
        <Polygon points={[[-2, Y[0]], [0, Y[0]], [0, Y[1]], [-2, Y[1]]]} color={C.guide} fillOpacity={0.14} weight={0} />
        <Label at={[-1, 4.9]} color={C.guide} attach="c" size={12}>
          eˣ never here
        </Label>
        <Line.Segment point1={[-2, y0]} point2={[4.3, y0]} color={C.violet} style="dashed" weight={1.2} opacity={0.6} />
        <Plot.OfX y={f} domain={[-2, 0]} color={C.guide} style="dashed" weight={2.5} />
        <Plot.OfX y={f} domain={[0, 4.3]} color={C.f} weight={3} />
        <Label at={[3.7, f(3.7)]} color={C.f} attach="e">
          f(u)
        </Label>
        <Point x={-1} y={0} color={C.bad} />
        <Label at={[-1, 0]} color={C.bad} attach="nw">
          u = −1
        </Label>
        <Point x={3} y={0} color={C.good} />
        <Label at={[3, 0]} color={C.good} attach="ne">
          u = 3
        </Label>
        <Point x={1} y={4} color={C.f} />
        <Label at={[1, 4]} color={C.f} attach="n">
          (1, 4)
        </Label>
        <Line.Segment point1={[u0, 0]} point2={[u0, y0]} color={ptCol} style="dashed" weight={1.5} />
        <Point x={u0} y={y0} color={ptCol} />
      </Plane>
      <div className="h-2" />
      <Plane x={[-3.2, 1.6]} y={Y} xStep={1} yStep={2} height={230} yLabel="">
        <Line.Segment point1={[-3.2, 3]} point2={[1.6, 3]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[-2.4, 3]} color={C.guide} attach="s">
          y = 3
        </Label>
        <Line.Segment point1={[-3.2, y0]} point2={[1.6, y0]} color={C.violet} style="dashed" weight={1.2} opacity={0.6} />
        <Plot.OfX y={F} domain={[-3.2, 1.5]} color={C.g} weight={3} />
        <Label at={[-1.4, F(-1.4)]} color={C.g} attach="n">
          f(g(x))
        </Label>
        <Point x={LN3} y={0} color={C.good} />
        <Label at={[LN3, 0]} color={C.good} attach="ne">
          logₑ3
        </Label>
        <Point x={0} y={4} color={C.g} />
        <Label at={[0, 4]} color={C.g} attach="n" gap={10}>
          (0, 4)
        </Label>
        <Line.Segment point1={[x0, 0]} point2={[x0, y0]} color={ptCol} style="dashed" weight={1.5} />
        <Point x={x0} y={y0} color={ptCol} />
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={XMIN}
          max={XMAX}
          step={0.005}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep x" />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`u = e^{x} = ${num(u0, 3)}`} />
          <Readout color={ptCol} tex={`f(g(x)) = f(u) = ${num(y0, 3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
