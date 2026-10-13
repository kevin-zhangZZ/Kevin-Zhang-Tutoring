// 2014 Methods Exam 1 Q5c — the area between f(x) = 3x² − x³ and y = 4 needs only ONE integral.
// Sweep a strip from x = −1 to x = 2: its height 4 − f(x) never changes sign, even at the
// minimum (0, 0) where the curve touches the x-axis, so there is nothing to split (the report's
// "three or four integrations"). A toggle shows the same area as a 3 × 4 rectangle minus the
// area under the curve, 12 − 21/4 = 27/4, as a check on the arithmetic. Values checked in sympy.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Polygon, Readout, Readouts, Region, Slider, Toggle, Buttons,
  usePlayer,
} from './kit'

const f = (x: number) => 3 * x * x - x ** 3
const four = () => 4
const zero = () => 0
// ∫_{-1}^{t} (4 − f) dx = t⁴/4 − t³ + 4t + 11/4
const swept = (t: number) => t ** 4 / 4 - t ** 3 + 4 * t + 11 / 4
const W = 0.06

export default function OneIntegral() {
  const [x0, setX0] = useState(0)
  const [rect, setRect] = useState(false)
  const player = usePlayer(setX0, { min: -1, max: 2, seconds: 6 })

  const h = 4 - f(x0)
  const nearMin = Math.abs(x0) < 0.06
  const end = x0 > 1.97
  const s0 = Math.max(-1, x0 - W / 2)
  const s1 = Math.min(2, x0 + W / 2)

  let notice
  if (rect) {
    notice = (
      <Notice tone="good">
        <b>Same answer, different route.</b> The orange rectangle is <M>3 \times 4 = 12</M>. Take away the blue area under the
        curve, <M>{'\\int_{-1}^{2}(3x^2 - x^3)\\,dx = \\tfrac{21}{4}'}</M>, and <M>{'12 - \\tfrac{21}4 = \\tfrac{27}4'}</M>. Use it to check
        your arithmetic, not as a second set of integrals.
      </Notice>
    )
  } else if (end) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = 2</M> the strip has zero height</b>: the line touches the local maximum, so the region closes. The total is{' '}
        <M>{'\\tfrac{27}{4}'}</M>. Turn on the rectangle view for a quick check.
      </Notice>
    )
  } else if (nearMin) {
    notice = (
      <Notice>
        <b>The minimum at <M>(0,0)</M> is not a place to split.</b> The curve touches the <M>x</M>-axis here, but the strip runs from
        the curve up to <M>y = 4</M>, and its height <M>4 - f(0) = 4</M> is still positive. Press play and watch the height: it never
        goes negative between <M>-1</M> and <M>2</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Every strip runs from the curve <b>up</b> to the line, height <M>4 - f(x) \ge 0</M>. Because the line stays on top the whole
        way, adding all the strips is the single integral <M>{'\\int_{-1}^{2}\\bigl(4 - f(x)\\bigr)dx'}</M>. Drag to <M>x = 0</M>: is
        anything different at the minimum?
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.9, 3.3]} y={[-0.4, 5]} xStep={1} yStep={1} height={320}>
        {rect ? (
          <>
            <Region top={four} bottom={zero} from={-1} to={2} color={C.g} opacity={0.18} />
            <Region top={f} bottom={zero} from={-1} to={2} color={C.f} opacity={0.35} />
          </>
        ) : (
          <>
            <Region top={four} bottom={f} from={-1} to={Math.max(-1, x0)} color={C.violet} opacity={0.25} />
            {h > 0.01 && (
              <Polygon
                points={[[s0, f(x0)], [s1, f(x0)], [s1, 4], [s0, 4]]}
                color={end ? C.good : C.violet}
                fillOpacity={0.8}
                weight={1}
              />
            )}
          </>
        )}
        <Line.Segment point1={[-1.9, 4]} point2={[3.3, 4]} color={C.g} weight={2.5} />
        <Plot.OfX y={f} domain={[-1, 3]} color={C.f} weight={3} />
        <Label at={[3, 4]} color={C.g} attach="n">y = 4</Label>
        <Label at={[2.85, f(2.85)]} color={C.f} attach="e">f</Label>
        <Label at={[-1, 4]} attach="sw">(−1, 4)</Label>
        <Label at={[2, 4]} attach="n">(2, 4)</Label>
        <Label at={[0, 0]} attach="se">(0, 0)</Label>
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={-1}
          max={2}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep from −1 to 2" />
          <Toggle label="Rectangle minus area under the curve" checked={rect} onChange={setRect} />
        </Buttons>
        <Readouts>
          {rect ? (
            <>
              <Readout color={C.g} tex={'\\text{rectangle} = 3 \\times 4 = 12'} />
              <Readout color={C.f} tex={'\\text{under curve} = \\tfrac{21}{4} = 5.25'} />
              <Readout color={C.good} tex={'12 - \\tfrac{21}{4} = \\tfrac{27}{4} = 6.75\\ \\checkmark'} />
            </>
          ) : (
            <>
              <Readout color={C.violet} tex={`\\text{height} = 4 - f(${x0.toFixed(2)}) = ${h.toFixed(2)}`} />
              <Readout tex={`\\text{area so far} \\approx ${swept(x0).toFixed(2)}`} />
              {end && <Readout color={C.good} tex={'\\tfrac{27}{4} = 6.75\\ \\checkmark'} />}
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
