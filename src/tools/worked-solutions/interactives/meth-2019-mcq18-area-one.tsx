// 2019 Methods Exam 2 MCQ 18 — the average value of p is a HEIGHT: a rectangle of height 3/4
// across [−a, b] has the same area as the region under p. Because p is a pdf that area is 1, so
// the width a + b is locked at 4/3 (b follows a here). Slide a: the region under p (triangle a²
// over [−a, 0] plus trapezium b(2a + b)/2 over [0, b]) equals 1 only at a = √2/3, and then
// Pr(X > 0) = trapezium = 1 − a² = 7/9. The Notice contrasts the height 3/4 with the area 7/9
// (option B's confusion).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Point, Polygon, Readout, Readouts, Slider, Toggle,
} from './kit'

const W = 4 / 3 // a + b, from the average value
const A_STAR = Math.SQRT2 / 3

export default function AreaOne() {
  const [a, setA] = useState(0.62)
  const [rect, setRect] = useState(true)

  const b = W - a
  const tri = a * a
  const trap = (b * (2 * a + b)) / 2
  const total = tri + trap
  const ok = Math.abs(total - 1) < 0.003

  let notice
  if (ok) {
    notice = (
      <Notice tone="good">
        Now the area under <M>p</M> is exactly <M>1</M>, at <M>{'a = \\tfrac{\\sqrt2}{3}'}</M>, so <M>p</M> is a genuine
        pdf. The triangle is <M>{'a^2 = \\tfrac29'}</M>, so <M>{'\\Pr(X>0)'}</M> is the trapezium,{' '}
        <M>{'1 - \\tfrac29 = \\tfrac79'}</M>. The <b>height</b> of the dashed line is <M>{'\\tfrac34'}</M>; the{' '}
        <b>probability</b> is an area. They are different things.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        The dashed rectangle has height <M>{'\\tfrac34'}</M> (the average value) and width <M>{'a+b'}</M>. Average value
        means this rectangle has the <b>same area</b> as the region under <M>p</M>, which must be <M>1</M>, so the width
        is locked at <M>{'a+b=\\tfrac43'}</M>. But right now the area under <M>p</M> is{' '}
        <M>{total.toFixed(3)}</M>, not <M>1</M>. {total < 1 ? 'Increase' : 'Decrease'} <M>a</M> until it is.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.95, 1.4]} y={[0, 1.7]} xStep={0.25} yStep={0.25} equalScale height={380} labels={false}>
        {rect && (
          <>
            <Polygon points={[[-a, 0], [b, 0], [b, 0.75], [-a, 0.75]]} color={C.violet} fillOpacity={0.1} weight={0} strokeOpacity={0} />
            <Line.Segment point1={[-a, 0.75]} point2={[b, 0.75]} color={C.violet} style="dashed" weight={2} />
            <Line.Segment point1={[-a, 0]} point2={[-a, 0.75]} color={C.violet} style="dashed" weight={1.5} />
            <Line.Segment point1={[b, 0]} point2={[b, 0.75]} color={C.violet} style="dashed" weight={1.5} />
            <Label at={[-a, 0.75]} color={C.violet} attach="w">3/4</Label>
          </>
        )}
        <Polygon points={[[-a, 0], [0, 0], [0, 2 * a]]} color={C.g} fillOpacity={0.3} weight={0} strokeOpacity={0} />
        <Polygon points={[[0, 0], [b, 0], [b, b], [0, 2 * a]]} color={C.f} fillOpacity={0.3} weight={0} strokeOpacity={0} />
        <Line.Segment point1={[-a, 0]} point2={[0, 2 * a]} color={C.f} weight={3} />
        <Line.Segment point1={[0, 2 * a]} point2={[b, b]} color={C.f} weight={3} />
        <Line.Segment point1={[b, 0]} point2={[b, b]} color={C.guide} style="dashed" weight={1} />
        <Point x={-a} y={0} color={C.f} />
        <Point x={0} y={2 * a} color={C.f} />
        <Point x={b} y={b} color={C.f} />
        <Label at={[-a, 0]} attach="s">−a</Label>
        <Label at={[b, 0]} attach="s">b</Label>
        <Label at={[0, 2 * a]} attach="nw">(0, 2a)</Label>
        <Label at={[b, b]} attach="ne">(b, b)</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={0.3} max={0.8} step={0.005} format={v => v.toFixed(3)} />
        <Buttons>
          <ActionButton label="Make the area exactly 1" onClick={() => setA(A_STAR)} />
          <Toggle label="Show the average-value rectangle" checked={rect} onChange={setRect} />
        </Buttons>
        <Readouts>
          <Readout tex={`b = \\tfrac43 - a = ${b.toFixed(3)}`} />
          <Readout color={C.g} tex={`\\text{triangle} = a^2 = ${tri.toFixed(3)}`} />
          <Readout color={C.f} tex={`\\text{trapezium} = \\tfrac{b(2a+b)}{2} = ${trap.toFixed(3)}`} />
          <Readout color={ok ? C.good : C.bad} tex={`\\text{total} = ${total.toFixed(3)}${ok ? '\\ \\checkmark' : ''}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
