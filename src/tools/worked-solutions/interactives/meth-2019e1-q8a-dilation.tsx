// 2019 Methods Exam 1 Q8a — the family y = a·x²(x² − 1). Every member has the same x-intercepts
// (crossing at ±1, touching at 0), so the intercepts alone can't give the rule: the slider for a
// dilates the curve from the x-axis without moving any intercept, and the turning points stay at
// x = ±1/√2 whatever a is. Only a = −4 lifts them to the marked height 1. Starts at a = 1, the
// answer you get by overlooking the dilation factor (the examiner's report's comment).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num } from './kit'

const R = 1 / Math.SQRT2

export default function DilationWidget() {
  const [a, setA] = useState(1)
  const f = (x: number) => a * x * x * (x * x - 1)
  const peak = -a / 4
  const hit = Math.abs(a + 4) < 1e-9
  const curveColor = hit ? C.good : C.f

  let notice
  if (hit) {
    notice = (
      <Notice tone="good">
        <b><M>a = -4</M> puts both turning points exactly on the marked points</b> <M>{'\\left(\\pm\\tfrac{1}{\\sqrt2},1\\right)'}</M>.
        The intercepts gave the factors <M>{'x^2(x+1)(x-1)'}</M>; the marked point gave <M>a</M>. So{' '}
        <M>{'f(x) = -4x^2(x^2-1)'}</M>.
      </Notice>
    )
  } else if (a > 0) {
    notice = (
      <Notice tone="warn">
        {a === 1 ? (
          <>
            This is <M>{'y = x^2(x^2-1)'}</M>, the rule you get by <b>leaving out the dilation factor</b>.{' '}
          </>
        ) : null}
        With <M>a</M> positive the curve opens the wrong way: both ends go <b>up</b>, and at{' '}
        <M>{'x=\\pm\\tfrac{1}{\\sqrt2}'}</M> it has dips of depth <M>{`${num(a / 4)}`}</M> rather than peaks of height 1. Yet it
        still passes through all three intercepts. Drag <M>a</M> below zero.
      </Notice>
    )
  } else if (a === 0) {
    notice = (
      <Notice tone="warn">
        <M>a = 0</M> squashes the whole graph flat onto the <M>x</M>-axis, and it <b>still</b> passes through{' '}
        <M>(-1,0)</M>, <M>(0,0)</M> and <M>(1,0)</M>. That is why substituting an intercept only ever gives{' '}
        <M>0 = 0</M>: the intercepts say nothing about <M>a</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Right shape, wrong height: the peaks are at height <M>{`-\\tfrac{a}{4} = ${num(peak)}`}</M>, not <M>1</M>. Notice the
        peaks stay at <M>{'x=\\pm\\tfrac{1}{\\sqrt2}'}</M> for every <M>a</M>, because a dilation from the <M>x</M>-axis only
        stretches vertically. Keep dragging until the red gap closes.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.6, 1.6]} y={[-2, 2]} xStep={0.5} yStep={1} height={320}>
        <Plot.OfX y={f} domain={[-1.6, 1.6]} color={curveColor} weight={3} />
        {!hit && (
          <>
            <Line.Segment point1={[-R, peak]} point2={[-R, 1]} color={C.bad} style="dashed" weight={2} />
            <Line.Segment point1={[R, peak]} point2={[R, 1]} color={C.bad} style="dashed" weight={2} />
            <Point x={-R} y={peak} color={C.f} />
            <Point x={R} y={peak} color={C.f} />
          </>
        )}
        {[-1, 0, 1].map(x => (
          <Point key={x} x={x} y={0} color={C.violet} />
        ))}
        <Point x={-R} y={1} color={hit ? C.good : C.ink} />
        <Point x={R} y={1} color={hit ? C.good : C.ink} />
        <Label at={[-R, 1]} attach="n" color={hit ? C.good : C.ink}>(−1/√2, 1)</Label>
        <Label at={[R, 1]} attach="n" color={hit ? C.good : C.ink}>(1/√2, 1)</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={-6} max={2} step={0.25} format={v => num(v)} />
        <Readouts>
          <Readout color={curveColor} tex={a === 0 ? 'y = 0' : `y = ${a === 1 ? '' : a === -1 ? '-' : num(a).replace('.00', '')}x^2(x^2-1)`} />
          <Readout
            color={hit ? C.good : C.bad}
            tex={`y\\left(\\tfrac{1}{\\sqrt2}\\right) = -\\tfrac{a}{4} = ${num(peak)}${hit ? '\\ \\checkmark' : '\\ne 1'}`}
          />
          <Readout color={C.violet} tex="y(1) = a\cdot 1\cdot 0 = 0 \text{ for every } a" />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
