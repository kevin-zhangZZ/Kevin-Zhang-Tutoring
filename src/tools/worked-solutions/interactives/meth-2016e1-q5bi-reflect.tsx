// 2016 Methods Exam 1 Q5b.i — choosing the root for k⁻¹, where k(x) = logₑ(x² + 1) on (−∞, 0].
// Pick a point P = (a, k(a)) on k; its reflection in y = x is Q = (k(a), a), which must lie on
// k⁻¹. Toggle between y = −√(eˣ − 1) and y = +√(eˣ − 1): only the negative root passes through Q,
// because Q's y-value is a ≤ 0. The positive root is the reflection of the other half (x ≥ 0),
// which k does not include. k(−3) = logₑ 10 ≈ 2.30, so a ∈ [−3, 0] keeps everything on screen.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const k = (x: number) => Math.log(x * x + 1)
const neg = (x: number) => -Math.sqrt(Math.max(0, Math.exp(x) - 1))
const pos = (x: number) => Math.sqrt(Math.max(0, Math.exp(x) - 1))

export default function Reflect() {
  const [a, setA] = useState(-1.5)
  const [plus, setPlus] = useState(false)
  const ka = k(a)
  const rootVal = plus ? pos(ka) : neg(ka)
  const branch = plus ? pos : neg
  const ok = !plus || Math.abs(a) < 0.03
  const col = plus ? C.bad : C.good

  return (
    <div>
      <Plane x={[-3.2, 3.2]} y={[-3.2, 3.2]} xStep={1} yStep={1} equalScale height={360} label="Graph of k and its reflection in y = x">
        <Plot.OfX y={x => x} domain={[-3.2, 3.2]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={k} domain={[-3.2, 0]} color={C.f} weight={3} />
        <Plot.OfX y={branch} domain={[0, 2.4]} color={col} weight={3} />
        <Line.Segment point1={[a, ka]} point2={[ka, a]} color={C.guide} style="dashed" />
        <Point x={a} y={ka} color={C.f} />
        <Point x={ka} y={a} color={C.good} />
        {plus && <Point x={ka} y={rootVal} color={C.bad} />}
        <Label at={[a, ka]} color={C.f} attach="n">P</Label>
        <Label at={[ka, a]} color={C.good} attach="e">Q</Label>
        <Label at={[-2.6, k(-2.6)]} color={C.f} attach="n">k</Label>
        <Label at={[2.6, 2.6]} color={C.guide} attach="nw">y = x</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={-3} max={0} step={0.05} />
        <Buttons>
          <Toggle label={<>Try the positive root <M>{'+\\sqrt{e^x - 1}'}</M></>} checked={plus} onChange={setPlus} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`P = (a,\\ k(a)) = (${a.toFixed(2)},\\ ${ka.toFixed(2)})`} />
          <Readout color={C.good} tex={`Q = (${ka.toFixed(2)},\\ ${a.toFixed(2)})`} />
          <Readout color={col} tex={`${plus ? '+' : '-'}\\sqrt{e^{${ka.toFixed(2)}} - 1} = ${rootVal.toFixed(2)}`} />
        </Readouts>
        {plus && !ok ? (
          <Notice tone="warn">
            The positive root gives <M>{rootVal.toFixed(2)}</M> at <M>{`x = ${ka.toFixed(2)}`}</M>, but <M>Q</M> needs{' '}
            <M>{a.toFixed(2)}</M>. The red curve is the reflection of the <b>right</b> half of <M>{'\\log_e(x^2+1)'}</M>, which{' '}
            <M>k</M> does not include. Its outputs are positive; the inverse of <M>k</M> must output values in{' '}
            <M>{'(-\\infty, 0]'}</M>.
          </Notice>
        ) : (
          <Notice tone="good">
            Reflecting <M>P</M> in <M>y = x</M> swaps its coordinates, giving <M>Q</M>, and the green curve,{' '}
            <M>{'-\\sqrt{e^x - 1}'}</M>, passes through it for every <M>a</M>. The <M>y</M>-values of <M>Q</M> are the{' '}
            <M>x</M>-values of <M>P</M>, all <M>{'\\le 0'}</M>, which is why the negative root is the inverse. Now turn on the
            positive root.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
