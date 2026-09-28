// 2019 Methods Exam 1 Q1a.i — where the chain rule's ×3 comes from. Slide a tangent along
// f(x) = 1/(3x − 1): its gradient is −3/(3x − 1)², which agrees with a rise/run measured straight
// from f. A toggle draws the "forgot the inside derivative" line, gradient −1/(3x − 1)², which is
// always exactly a third as steep and visibly cuts across the curve instead of touching it.

import { useState } from 'react'
import { C, Label, Line, M, Notice, Plane, Plot, Point, Controls, Buttons, Readout, Readouts, Slider, Toggle, tick } from './kit'

const f = (x: number) => 1 / (3 * x - 1)
const df = (x: number) => -3 / (3 * x - 1) ** 2
const dfWrong = (x: number) => -1 / (3 * x - 1) ** 2
const H = 0.001
// Tick numbers only inside the plotted range (the plane pads its view a little past it).
const within = (lo: number, hi: number) => (v: number) => (v < lo - 1e-9 || v > hi + 1e-9 ? '' : tick(v))

function frac(x: number): string {
  if (Math.abs(x - 2 / 3) < 0.004) return '\\tfrac23'
  if (Math.abs(x - 1) < 0.004) return '1'
  return x.toFixed(2)
}

export default function ChainRuleTangent() {
  const [x0, setX0] = useState(2 / 3)
  const [wrong, setWrong] = useState(false)

  const y0 = f(x0)
  const m = df(x0)
  const mWrong = dfWrong(x0)
  const measured = (f(x0 + H) - f(x0 - H)) / (2 * H)

  return (
    <div>
      <Plane x={[0, 2.4]} y={[-0.6, 4]} xStep={0.5} yStep={1} height={320} xLabels={within(0, 2.4)} yLabels={within(-0.6, 4)}>
        <Line.Segment point1={[1 / 3, -0.6]} point2={[1 / 3, 4]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[1 / 3, -0.35]} color={C.guide} attach="w">x = ⅓</Label>
        <Plot.OfX y={f} domain={[0.4, 2.4]} color={C.f} weight={3} />
        <Label at={[2.2, f(2.2)]} color={C.f} attach="n">f</Label>
        {wrong && <Line.PointSlope point={[x0, y0]} slope={mWrong} color={C.bad} style="dashed" weight={2.5} />}
        <Line.PointSlope point={[x0, y0]} slope={m} color={C.violet} weight={2.5} />
        <Point x={x0} y={y0} color={C.violet} />
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={0.45} max={2.2} step={0.005} format={v => v.toFixed(2)} />
        <Buttons>
          <Toggle label="Forget the ×3 from the inside" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`f'(${frac(x0)}) = \\dfrac{-3}{(3x-1)^2} = ${m.toFixed(3)}`} />
          <Readout tex={`\\text{rise/run from } f\\text{ itself} \\approx ${measured.toFixed(3)}`} />
          {wrong && <Readout color={C.bad} tex={`\\dfrac{-1}{(3x-1)^2} = ${mWrong.toFixed(3)}`} />}
        </Readouts>
        {wrong ? (
          <Notice tone="warn">
            The red line has gradient <M>{'-1/(3x-1)^2'}</M>, only a third of the true value, so it{' '}
            <b>cuts across</b> the curve instead of touching it. That is what you get if you differentiate{' '}
            <M>{'u^{-1}'}</M> but never multiply by <M>{'\\tfrac{du}{dx} = 3'}</M>. Slide <M>x</M>: the red line is
            always exactly 3 times too shallow.
          </Notice>
        ) : (
          <Notice>
            The violet line is the tangent at <M>{`x = ${frac(x0)}`}</M>. Its gradient{' '}
            <M>{'-3/(3x-1)^2'}</M> matches the rise/run measured from <M>f</M> itself. The <M>3</M> is there because
            the inside <M>3x-1</M> changes <b>3 times as fast</b> as <M>x</M>: nudge <M>x</M> by <M>0.01</M> and{' '}
            <M>3x-1</M> moves by <M>0.03</M>. Turn on the toggle to see the gradient without that factor.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
