// 2021 Methods Exam 2 Q4e — the "maximum possible spin" is a value of X, so it is read along the
// horizontal axis: the right-hand end of the support of f, 50. Slide the spin x along the axis.
// The violet guide carries the height f(x) across to the vertical axis, and the orange area is
// Pr(X > x) = (50 − x)²/1500 (for 20 ≤ x ≤ 50). The widget opens at x = 20, the peak, where
// f(20) = 0.04 — the common wrong answer (79% scored 0) is this height, not a spin — while 60% of
// spins are still faster. At x = 50, f(x) = 0 and Pr(X > 50) = 0: no spin can be larger.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Point, Readout, Readouts, Region, Slider, num } from './kit'

const f = (x: number) => (x < 0 ? 0 : x < 20 ? x / 500 : x <= 50 ? (50 - x) / 750 : 0)
// Pr(X > x), exact from the antiderivatives of the two rules.
const tail = (x: number) => (x <= 0 ? 1 : x < 20 ? 1 - (x * x) / 1000 : x <= 50 ? (50 - x) ** 2 / 1500 : 0)
const X_MAX = 60

export default function MaxSpin() {
  const [x, setX] = useState(20)
  const h = f(x)
  const p = tail(x)
  const atPeak = Math.abs(x - 20) < 0.3
  const atEnd = x >= 50

  let notice
  if (atEnd) {
    notice = (
      <Notice tone="good">
        {x === 50 ? <>At <M>x = 50</M></> : <>Past <M>x = 50</M></>} the density is <M>0</M> and{' '}
        <M>{'\\Pr(X > x) = 0'}</M>: no area is left to the right, so <b>no spin can be faster</b>. Beyond 50, <M>f</M> is
        the &ldquo;elsewhere&rdquo; rule, <M>{'f(x) = 0'}</M>. The maximum possible spin is the right-hand end of the
        domain, <b>50 revolutions per second</b>, a value on the horizontal axis.
      </Notice>
    )
  } else if (atPeak) {
    notice = (
      <Notice tone="warn">
        This is the peak: <M>{'f(20) = 0.04'}</M>. That <M>0.04</M> is a <b>height</b>, read on the vertical axis (follow
        the violet guide). It is not a spin. It says spins near 20 rev/s are the most common, yet the orange area shows{' '}
        <M>{'\\Pr(X > 20) = 0.6'}</M>: most spins are faster than 20. Drag <M>x</M> right until the orange area runs out.
      </Notice>
    )
  } else if (x < 20) {
    notice = (
      <Notice>
        At a spin of <M>{`x = ${num(x, 1)}`}</M> the density is still positive, and <M>{`\\Pr(X > x) = ${num(p, 3)}`}</M>, so
        faster spins happen. Spin values live on the <b>horizontal</b> axis. Drag <M>x</M> right.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The density is falling, but <M>{`f(${num(x, 1)}) = ${num(h, 4)}`}</M> is still above zero and{' '}
        <M>{`\\Pr(X > x) = ${num(p, 3)}`}</M>: a few spins are faster than {num(x, 1)} rev/s. Keep dragging to where the
        graph meets the axis.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, X_MAX]} y={[0, 0.05]} xStep={10} yStep={0.01} height={300} xLabel="x" yLabel="y">
        {!atEnd && <Region top={f} bottom={() => 0} from={x} to={50} color={C.g} opacity={0.3} />}
        <Line.Segment point1={[0, 0]} point2={[20, 0.04]} color={C.f} weight={3} />
        <Line.Segment point1={[20, 0.04]} point2={[50, 0]} color={C.f} weight={3} />
        <Line.Segment point1={[50, 0]} point2={[X_MAX, 0]} color={C.f} weight={3} />
        <Label at={[40, f(40)]} color={C.f} attach="ne">y = f(x)</Label>
        {h > 0 && (
          <>
            <Line.Segment point1={[0, h]} point2={[x, h]} color={C.violet} style="dashed" weight={2} />
            <Line.Segment point1={[x, 0]} point2={[x, h]} color={C.ink} style="dashed" weight={1.5} />
            {atPeak && (
              <Label at={[x, h]} color={C.violet} attach="n">height 0.04</Label>
            )}
          </>
        )}
        <Point x={x} y={h} color={C.violet} />
        <Point x={x} y={0} color={C.ink} />
        <Label at={[x, 0]} attach={x > 45 ? 'nw' : 'ne'} gap={9}>{`spin ${num(x, 1)}`}</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={setX} min={0} max={X_MAX} step={0.5} format={v => v.toFixed(1)} />
        <Readouts>
          <Readout tex={`\\text{spin } x = ${num(x, 1)}`} />
          <Readout color={C.violet} tex={`f(x) = ${num(h, 4)}`} />
          <Readout color={atEnd ? C.good : C.g} tex={`\\Pr(X > x) = ${num(p, 3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
