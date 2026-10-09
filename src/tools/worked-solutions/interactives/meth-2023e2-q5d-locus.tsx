// 2023 Methods Exam 2 Q5d — as k changes, the turning point (k, 2/k) of h(x) = (1/k)f(k − x)
// slides along y = 2/x = 2x⁻¹, so n = −1. At k = 1 the turning point is (1, 2), which lies on
// y = 2xⁿ for EVERY n, so testing k = 1 alone cannot decide n; a toggle shows the report's common
// wrong answer n = 1 (the line y = 2x) missing the turning point for every other k.

import { useState } from 'react'
import { C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Buttons } from './kit'

const h = (x: number, k: number) => (Math.exp(k - x) + Math.exp(x - k)) / k

export default function Locus() {
  const [k, setK] = useState(2)
  const [wrong, setWrong] = useState(false)
  const ty = 2 / k
  const atOne = Math.abs(k - 1) < 0.03

  let notice
  if (atOne) {
    notice = (
      <Notice tone="warn">
        <b>At <M>k=1</M> the turning point is <M>(1,2)</M></b>, and <M>{'2\\times1^n=2'}</M> for <em>every</em> power{' '}
        <M>n</M>. Both <M>y=2x</M> and <M>y=\tfrac2x</M> pass through it, so this <M>k</M> cannot tell you{' '}
        <M>n</M>. Move <M>k</M> away from 1.
      </Notice>
    )
  } else if (wrong) {
    notice = (
      <Notice tone="warn">
        The red line is <M>y=2x</M> (<M>n=1</M>, the report&rsquo;s common wrong answer). At{' '}
        <M>{`k=${k.toFixed(2)}`}</M> it passes through <M>{`(${k.toFixed(2)},\\ ${(2 * k).toFixed(2)})`}</M>, but the
        turning point is at height <M>{`\\tfrac2k=${ty.toFixed(2)}`}</M>. It only works at <M>k=1</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The turning point is <M>{'\\left(k,\\tfrac2k\\right)'}</M>: its <M>x</M>-coordinate is <M>k</M> and its height
        is <M>\tfrac2k</M>. Since <M>x=k</M> there, height <M>{'= \\tfrac{2}{x}=2x^{-1}'}</M> every time, which is the dashed green curve. Drag{' '}
        <M>k</M> and watch the point stay on it, then try <M>k=1</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 5]} y={[0, 6]} xStep={1} yStep={1} height={320}>
        <Plot.OfX y={x => 2 / x} domain={[0.3, 5]} color={C.good} style="dashed" weight={2} />
        {wrong && <Plot.OfX y={x => 2 * x} domain={[0, 3]} color={C.bad} weight={2} />}
        <Plot.OfX y={x => h(x, k)} color={C.f} weight={3} />
        <Point x={k} y={ty} color={atOne ? C.g : C.good} />
        <Label at={[k, ty]} attach="s" color={C.ink}>{`(${k.toFixed(2)}, ${ty.toFixed(2)})`}</Label>
        <Label at={[4.4, 2 / 4.4]} color={C.good} attach="n">y = 2/x</Label>
        {wrong && <Label at={[2.6, 5.2]} color={C.bad} attach="e">y = 2x</Label>}
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={0.4} max={4} step={0.01} />
        <Buttons>
          <Toggle label="Compare n = 1 (y = 2x)" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`h(x)=\\tfrac{1}{${k.toFixed(2)}}\\left(e^{${k.toFixed(2)}-x}+e^{x-${k.toFixed(2)}}\\right)`} />
          <Readout color={C.good} tex={`\\text{turning point }\\left(${k.toFixed(2)},\\ ${ty.toFixed(2)}\\right)`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
