// 2017 Methods Exam 2 Q4b — the inverse is the reflection of f(x) = 2^(x+1) − 2 in y = x.
// Slide P = (a, f(a)) along f: its mirror image P′ = (f(a), a) traces f⁻¹(x) = log₂(x + 2) − 1.
// As P runs left, f(a) creeps down towards −2 without reaching it, so P′ creeps towards the
// vertical line x = −2: the range (−2, ∞) of f becomes the domain of f⁻¹. A toggle draws the
// unbracketed answer log₂x + 2 − 1 (= log₂x + 1) from the examiner's report, which misses P′.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const f = (x: number) => 2 ** (x + 1) - 2
const fInv = (x: number) => Math.log2(x + 2) - 1
const noBrackets = (x: number) => Math.log2(x) + 1

export default function Reflect() {
  const [a, setA] = useState(-1.8)
  const [wrong, setWrong] = useState(false)
  const fa = f(a)
  const far = a < -3.5

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        Without brackets, <M>{'\\log_2 x+2-1'}</M> means <M>{'(\\log_2 x)+1'}</M>: the red curve. It starts at{' '}
        <M>x=0</M> instead of <M>x=-2</M> and never passes through <M>P'</M>. Quick check: <M>f(1)=2</M>, so the
        inverse must give <M>{'f^{-1}(2)=1'}</M>, but <M>{'\\log_2 2+1=2'}</M>.
      </Notice>
    )
  } else if (far) {
    notice = (
      <Notice tone="good">
        Far left, <M>f(a)</M> is only just above <M>-2</M>, so <M>P'</M> is only just right of <M>x=-2</M>. It can
        get as close as you like but never touch: that is why <M>{'\\text{dom}(f^{-1})=(-2,\\infty)'}</M>, which is
        exactly <M>{'\\text{ran}(f)'}</M>. The horizontal asymptote has reflected into a vertical one.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Reflecting in <M>y=x</M> swaps the coordinates, so <M>P=(a,f(a))</M> lands on <M>P'=(f(a),a)</M>. That swap is
        why we find the inverse by swapping <M>x</M> and <M>y</M>. Drag <M>a</M> all the way left and watch how close{' '}
        <M>P'</M> gets to <M>x=-2</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-5, 2]} y={[-5, 2]} equalScale height={420}>
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[-5, -2]} point2={[2, -2]} color={C.f} style="dashed" weight={1.5} />
        <Line.Segment point1={[-2, -5]} point2={[-2, 2]} color={C.g} style="dashed" weight={1.5} />
        <Plot.OfX y={f} domain={[-5, 0.6]} color={C.f} weight={3} />
        <Plot.OfX y={fInv} domain={[-1.9995, 2]} color={C.g} weight={3} />
        {wrong && <Plot.OfX y={noBrackets} domain={[0.06, 2]} color={C.bad} weight={3} />}
        <Line.Segment point1={[a, fa]} point2={[fa, a]} color={C.violet} style="dashed" weight={1.5} />
        <Point x={a} y={fa} color={C.f} />
        <Point x={fa} y={a} color={C.g} />
        <Label at={[a, fa]} color={C.f} attach="n">P</Label>
        <Label at={[fa, a]} color={C.g} attach="e">P′</Label>
        <Label at={[0.45, f(0.45)]} color={C.f} attach="w">f</Label>
        <Label at={[1.6, fInv(1.6)]} color={C.g} attach="s">f⁻¹</Label>
        <Label at={[1.5, 1.5]} color={C.guide} attach="nw" size={12}>y = x</Label>
        <Label at={[-2, 1.6]} color={C.g} attach="e" size={12}>x = −2</Label>
        {wrong && <Label at={[1.3, noBrackets(1.3)]} color={C.bad} attach="nw" size={12}>log₂x + 2 − 1</Label>}
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={-5} max={0.6} step={0.01} />
        <Toggle label="Leave out the brackets" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout color={C.f} tex={`P = (${num(a).replace('−', '-')},\\ ${num(fa, 3).replace('−', '-')})`} />
          <Readout color={C.g} tex={`P' = (${num(fa, 3).replace('−', '-')},\\ ${num(a).replace('−', '-')})`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
