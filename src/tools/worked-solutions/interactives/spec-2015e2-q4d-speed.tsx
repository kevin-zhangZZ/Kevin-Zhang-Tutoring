// 2015 Specialist Exam 2 Q4d — speed² is the sum of the three squared velocity components. The
// i- and j-pieces, (5π/6)²sin²(πt/30) and (5π/6)²cos²(πt/30), rise and fall against each other but
// always add to (5π/6)² ≈ 6.854 (sin² + cos² = 1), and the k-piece (2/5)² = 0.16 sits on top for
// every t, so the speed is the constant √7.014 ≈ 2.648 → 2.65. A stacked bar at the chosen t shows
// the three pieces. A toggle drops the k-piece, the report's common error: 5π/6 ≈ 2.618 → 2.62.
// Values checked with sympy: (5π/6)² = 6.85389, + 0.16 = 7.01389, √ = 2.64838.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Slider, Toggle, num } from './kit'

const A2 = (5 * Math.PI / 6) ** 2
const K2 = 0.16
const xs = (t: number) => A2 * Math.sin((Math.PI * t) / 30) ** 2
const ys = (t: number) => A2 * Math.cos((Math.PI * t) / 30) ** 2

export default function Speed() {
  const [t, setT] = useState(20)
  const [noK, setNoK] = useState(false)

  const a = xs(t)
  const b = ys(t)
  const total = a + b + (noK ? 0 : K2)
  const speed = Math.sqrt(total)

  return (
    <div>
      <Plane x={[0, 60]} y={[0, 8]} xStep={10} yStep={1} height={300} xLabel="t" yLabel="">
        <Plot.OfX y={xs} domain={[0, 60]} color={C.f} weight={2.5} />
        <Plot.OfX y={ys} domain={[0, 60]} color={C.g} weight={2.5} />
        <Line.Segment point1={[0, A2]} point2={[60, A2]} color={C.good} style="dashed" weight={2} />
        {!noK && <Line.Segment point1={[0, A2 + K2]} point2={[60, A2 + K2]} color={C.violet} weight={2} />}
        <Line.Segment point1={[t, 0]} point2={[t, a]} color={C.f} weight={9} />
        <Line.Segment point1={[t, a]} point2={[t, a + b]} color={C.g} weight={9} />
        {!noK && <Line.Segment point1={[t, a + b]} point2={[t, a + b + K2]} color={C.violet} weight={9} />}
        <Label at={[40, A2 + (noK ? 0 : K2)]} color={noK ? C.good : C.violet} attach="n" size={12}>
          {noK ? 'i + j pieces: 6.854' : 'all three: 7.014'}
        </Label>
        <Label at={[5, xs(5)]} color={C.f} attach="se" size={12}>i piece</Label>
        <Label at={[5, ys(5)]} color={C.g} attach="ne" size={12}>j piece</Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={60} step={0.5} format={v => `${v} s`} />
        <Toggle label="Leave out the k component" checked={noK} onChange={setNoK} />
        <Readouts>
          <Readout color={C.f} tex={`\\left(\\tfrac{5\\pi}{6}\\right)^2\\sin^2\\!\\left(\\tfrac{\\pi t}{30}\\right) = ${num(a, 3)}`} />
          <Readout color={C.g} tex={`\\left(\\tfrac{5\\pi}{6}\\right)^2\\cos^2\\!\\left(\\tfrac{\\pi t}{30}\\right) = ${num(b, 3)}`} />
          {!noK && <Readout color={C.violet} tex={`\\left(\\tfrac25\\right)^2 = 0.160`} />}
          <Readout color={noK ? C.bad : C.good} tex={`\\text{speed} = \\sqrt{${num(total, 3)}} = ${num(speed, 4)}`} />
        </Readouts>
        {noK ? (
          <Notice tone="warn">
            <b>Without the climb, the speed is <M>{'\\tfrac{5\\pi}{6} \\approx 2.62'}</M>, not 2.65.</b> The vertical
            component adds only <M>0.16</M> under the square root, but the question asks for two decimal places, so
            leaving it out (the report&apos;s common error) changes the answer.
          </Notice>
        ) : (
          <Notice>
            <b>The bar never changes height.</b> Slide <M>t</M>: the blue and orange pieces trade height, but they always
            add to <M>{'\\left(\\tfrac{5\\pi}{6}\\right)^2 \\approx 6.854'}</M>, because{' '}
            <M>{'\\sin^2\\theta + \\cos^2\\theta = 1'}</M>. The violet <M>0.16</M> from the <M>{'\\underset{\\sim}{k}'}</M>{' '}
            component sits on top at every <M>t</M>, so the speed is constant. Then try the toggle.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
