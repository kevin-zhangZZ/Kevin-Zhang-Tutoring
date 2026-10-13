// 2014 Methods Exam 1 Q7 — the +c is what lets the given value do its job. Every curve
// y = 2sin(x) + ½cos(2x) + c has the same derivative 2cos(x) − sin(2x); changing c only slides the
// curve up or down. Starting at c = 0 (the answer students gave when they left out +c), the curve
// misses the required point (π/2, ½); sliding c shows exactly one curve, c = −1, passes through it.
// Numbers checked with sympy: f(π/2) = 3/2 + c; range of 2sin(x) + ½cos(2x) is [−5/2, 3/2].

import { useState } from 'react'
import { C, Controls, Label, Notice, Plane, Plot, Point, Readout, Readouts, Slider, M } from './kit'

const PI = Math.PI
const base = (x: number) => 2 * Math.sin(x) + 0.5 * Math.cos(2 * x)

function piTick(v: number): string {
  const n = Math.round(v / (PI / 2))
  if (Math.abs(v - (n * PI) / 2) > 1e-6) return ''
  if (n === 1) return 'π/2'
  if (n === 2) return 'π'
  if (n % 2 === 0) return `${n / 2}π`
  return `${n}π/2`
}

export default function ConstantFamily() {
  const [c, setC] = useState(0)
  const hit = Math.abs(c + 1) < 0.026
  const at = 1.5 + c
  const ghosts = [-2, -1, 0, 1].filter(k => Math.abs(k - c) > 0.05)

  return (
    <div>
      <Plane x={[-0.45, 2 * PI]} y={[-4.5, 2.6]} xStep={PI / 2} yStep={1} height={320} xLabels={piTick}>
        {ghosts.map(k => (
          <Plot.OfX key={k} y={x => base(x) + k} color={C.guide} weight={1.5} opacity={0.5} />
        ))}
        <Plot.OfX y={x => base(x) + c} color={hit ? C.good : C.f} weight={3} />
        <Point x={PI / 2} y={0.5} color={C.bad} />
        <Label at={[PI / 2, 0.5]} color={C.bad} attach="se">(π/2, 1/2)</Label>
        {!hit && <Point x={PI / 2} y={at} color={C.f} />}
      </Plane>
      <Controls>
        <Slider label="c" value={c} onChange={setC} min={-2.5} max={1} step={0.05} />
        <Readouts>
          <Readout color={hit ? C.good : C.f} tex={`f\\!\\left(\\tfrac\\pi2\\right) = \\tfrac32 + c = ${at.toFixed(2)}`} />
          <Readout tex={`f'(x) = 2\\cos(x) - \\sin(2x)\\ \\text{for every } c`} />
        </Readouts>
        {hit ? (
          <Notice tone="good">
            <b>Only <M>c = -1</M> passes through <M>{'\\left(\\tfrac\\pi2, \\tfrac12\\right)'}</M>.</b> Every grey curve has
            the same derivative, so the derivative alone cannot choose between them; the given value does.
          </Notice>
        ) : Math.abs(c) < 0.026 ? (
          <Notice tone="warn">
            <b>This is the answer with no <M>+c</M>.</b> Its derivative is correct, but at{' '}
            <M>{'x = \\tfrac\\pi2'}</M> it gives <M>\tfrac32</M>, not <M>\tfrac12</M>, and there is nothing left to adjust.
            Drag <M>c</M> to slide the curve down until it meets the red point.
          </Notice>
        ) : (
          <Notice>
            Changing <M>c</M> slides the whole curve up or down without changing its shape or its slopes. The curve is{' '}
            {at > 0.5 ? 'above' : 'below'} the red point by <M>{Math.abs(at - 0.5).toFixed(2)}</M>, so keep sliding.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
