// 2018 Methods Exam 1 Q9c — slide y = x sin(x) sideways by a and watch it land on the target
// y = (3π − x) sin(x) only at a = 3π. The graph's axis of symmetry (through the double zero at the origin)
// travels to (a, 0), and the target's centre is at (3π, 0). At a = −3π, the examiner's report's
// common wrong answer, the image is −(x + 3π) sin(x), centred at −3π, nowhere near the target.

import { useState } from 'react'
import { C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Vector } from './kit'

const PI = Math.PI
const X0 = -4 * PI
const X1 = 5 * PI
const target = (x: number) => (3 * PI - x) * Math.sin(x)
const piTick = (v: number) => {
  const k = Math.round(v / PI)
  if (Math.abs(v - k * PI) > 1e-6) return ''
  return k === 1 ? 'π' : k === -1 ? '−π' : `${k}π`
}
/** Quarter-multiples of π as short text for the slider. */
const quarterPi = (v: number) => {
  const q = Math.round((4 * v) / PI)
  if (q === 0) return '0'
  const sign = q < 0 ? '−' : ''
  const a = Math.abs(q)
  if (a % 4 === 0) return `${sign}${a === 4 ? '' : a / 4}π`
  if (a % 2 === 0) return `${sign}${a / 2 === 1 ? '' : a / 2}π/2`
  return `${sign}${a === 1 ? '' : a}π/4`
}

export default function Translate() {
  const [a, setA] = useState(PI)
  const image = (x: number) => (x - a) * Math.sin(x - a)
  const match = Math.abs(a - 3 * PI) < 1e-6
  const common = Math.abs(a + 3 * PI) < 1e-6

  let notice
  if (match) {
    notice = (
      <Notice tone="good">
        <b>A perfect fit.</b> The centre of the graph has moved from <M>O</M> to <M>{'(3\\pi, 0)'}</M>, where the
        target has its double zero. Algebraically, <M>{'(x-3\\pi)\\sin(x-3\\pi) = (x-3\\pi)(-\\sin x) = (3\\pi-x)\\sin x'}</M>.
        Adding a positive <M>a</M> moves the graph to the <b>right</b>.
      </Notice>
    )
  } else if (common) {
    notice = (
      <Notice tone="warn">
        <M>{'a = -3\\pi'}</M> was the report&apos;s common wrong answer. It moves the graph <b>left</b>: the image is{' '}
        <M>{'(x+3\\pi)\\sin(x+3\\pi) = -(x+3\\pi)\\sin x'}</M>, centred at <M>{'(-3\\pi, 0)'}</M>. The target&apos;s
        centre is at <M>{'+3\\pi'}</M>, so the shift has to be <M>{'+3\\pi'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>T</M> adds <M>a</M> to every <M>x</M>-coordinate, so the image is{' '}
        <M>{'y = (x-a)\\sin(x-a)'}</M> and the graph&apos;s double zero at <M>O</M> (the middle of its symmetric shape) moves to{' '}
        <M>{'(a, 0)'}</M>. The thick orange target has its double zero at <M>{'(3\\pi, 0)'}</M>. Slide <M>a</M> until the curves
        coincide, then try <M>{'a = -3\\pi'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[-10, 10]} xStep={PI} yStep={5} height={320} xLabels={piTick}>
        <Plot.OfX y={target} domain={[X0, X1]} color={C.g} weight={6} opacity={0.45} />
        <Plot.OfX y={image} domain={[X0, X1]} color={match ? C.good : C.f} weight={2.5} />
        {Math.abs(a) > 1e-6 && <Vector tail={[0, 0]} tip={[a, 0]} color={C.violet} weight={3} />}
        <Point x={0} y={0} color={C.guide} />
        <Point x={3 * PI} y={0} color={C.g} />
        <Point x={a} y={0} color={match ? C.good : C.f} />
        <Label at={[0.5 * PI, target(0.5 * PI)]} color={C.g} attach="n">
          target
        </Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={-4 * PI} max={4 * PI} step={PI / 4} format={quarterPi} />
        <Readouts>
          <Readout color={C.f} tex={`y = (x-a)\\sin(x-a)`} />
          <Readout color={C.g} tex={`\\text{target: } y = (3\\pi-x)\\sin(x)`} />
          <Readout color={match ? C.good : C.bad} tex={match ? '\\text{curves coincide}\\ \\checkmark' : '\\text{curves differ}'} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
