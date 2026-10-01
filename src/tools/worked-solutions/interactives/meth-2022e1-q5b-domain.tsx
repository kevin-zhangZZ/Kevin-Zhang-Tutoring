// 2022 Methods Exam 1 Q5b — f(x) = log_e(x² − 2x − 3) exists only where the quadratic inside the
// log is strictly positive. Drag x along the axis: the readout multiplies the two factors
// (x − 3)(x + 1), and the dot on the parabola is above the axis (both factors the same sign, so
// f(x) has a value) only for x < −1 or x > 3. At the roots the quadratic is 0 and the graph of f
// dives down an asymptote, so −1 and 3 are left out. The domain is two separate pieces, marked
// green on the x-axis. A toggle draws the two pieces as rays at different heights: the dashed line
// at x never meets both at once, which is why (−∞, −1) ∩ (3, ∞), the common error in the report,
// is the empty set and the answer needs ∪.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle, clamp, num, tick,
} from './kit'

const q = (x: number) => x * x - 2 * x - 3
const f = (x: number) => Math.log(q(x))
const X0 = -3
const X1 = 5
const Y0 = -5
const Y1 = 8
const LO = -2.4
const HI = 4.4
const RAY_A = -1.5
const RAY_B = -3

function OpenPoint({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 4.5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2 } }} />
}

export default function DomainWidget() {
  const [x, setX] = useState(0)
  const [cap, setCap] = useState(false)

  const a = x - 3
  const b = x + 1
  const qx = q(x)
  const atRoot = Math.abs(b) < 1e-9 || Math.abs(a) < 1e-9
  const ok = !atRoot && qx > 0
  const left = x < -1
  const right = x > 3

  let notice
  if (cap) {
    notice = (
      <Notice tone="warn">
        <M>\cap</M> means &ldquo;in <b>both</b> sets at once&rdquo;. The purple rays are <M>{'x<-1'}</M> and{' '}
        <M>{'x>3'}</M>: drag <M>x</M> anywhere and the dashed line meets at most one of them. So{' '}
        <M>{'(-\\infty,-1)\\cap(3,\\infty)'}</M> is the empty set, which would say <M>f</M> has no domain at all. The
        domain is every <M>x</M> in <b>either</b> piece, and &ldquo;either&rdquo; is <M>\cup</M>.
      </Notice>
    )
  } else if (atRoot) {
    notice = (
      <Notice tone="warn">
        At <M>{`x = ${x < 1 ? '-1' : '3'}`}</M> one factor is <M>0</M>, so <M>{'x^2-2x-3 = 0'}</M>. But{' '}
        <M>{'\\log_e(0)'}</M> is undefined: the graph of <M>f</M> plunges down an asymptote here. So this endpoint is
        left out, which is why the interval has a round bracket.
      </Notice>
    )
  } else if (!ok) {
    notice = (
      <Notice tone="warn">
        Between the roots the factors have <b>opposite signs</b> (<M>{`x+1 = ${num(b)}`}</M> is positive,{' '}
        <M>{`x-3 = ${num(a)}`}</M> is negative), so their product is negative and the parabola is below the axis.{' '}
        <M>{'\\log_e'}</M> of a negative number doesn&apos;t exist, so <M>f</M> has no graph here. Drag <M>x</M> left
        past <M>-1</M> or right past <M>3</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Both factors are {left ? 'negative' : 'positive'} here, so their product is positive: the parabola is above the
        axis and <M>{`f(x) = \\log_e(${num(qx)})`}</M> exists. The green pieces of the <M>x</M>-axis are the only places
        this happens: <M>{'x<-1'}</M> <b>or</b> <M>{'x>3'}</M>. Turn on the toggle to see why <M>\cap</M> is wrong.
      </Notice>
    )
  }

  const onX = (v: number) => {
    const c = clamp(v, LO, HI)
    if (Math.abs(c + 1) < 0.03) setX(-1)
    else if (Math.abs(c - 3) < 0.03) setX(3)
    else setX(c)
  }

  const dotColor = ok ? C.good : C.bad

  return (
    <div>
      <Plane x={[X0, X1]} y={[Y0, Y1]} xStep={1} yStep={2} height={340} yLabels={v => (v < Y0 ? '' : tick(v))}>
        <Region top={t => Math.max(q(t), 0)} bottom={() => 0} from={X0} to={-1} color={C.g} opacity={0.12} />
        <Region top={t => Math.max(q(t), 0)} bottom={() => 0} from={3} to={X1} color={C.g} opacity={0.12} />
        <Region top={() => 0} bottom={q} from={-1} to={3} color={C.bad} opacity={0.1} />
        <Line.Segment point1={[-1, Y0]} point2={[-1, Y1]} color={C.guide} style="dashed" weight={1} />
        <Line.Segment point1={[3, Y0]} point2={[3, Y1]} color={C.guide} style="dashed" weight={1} />
        <Label at={[-1, -5.2]} attach="w" color={C.guide} size={12}>x = −1</Label>
        <Label at={[3, -5.2]} attach="e" color={C.guide} size={12}>x = 3</Label>
        <Plot.OfX y={q} domain={[X0, X1]} color={C.g} weight={3} />
        <Plot.OfX y={f} domain={[X0, -1 - 1e-4]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[3 + 1e-4, X1]} color={C.f} weight={3} />
        {cap ? (
          <>
            <Line.Segment point1={[X0, RAY_A]} point2={[-1, RAY_A]} color={C.violet} weight={5} />
            <OpenPoint x={-1} y={RAY_A} color={C.violet} />
            <Label at={[-2.2, RAY_A]} attach="s" color={C.violet}>x &lt; −1</Label>
            <Line.Segment point1={[3, RAY_B]} point2={[X1, RAY_B]} color={C.violet} weight={5} />
            <OpenPoint x={3} y={RAY_B} color={C.violet} />
            <Label at={[4.1, RAY_B]} attach="s" color={C.violet}>x &gt; 3</Label>
          </>
        ) : (
          <>
            <Line.Segment point1={[X0, 0]} point2={[-1, 0]} color={C.good} weight={6} />
            <Line.Segment point1={[3, 0]} point2={[X1, 0]} color={C.good} weight={6} />
            <OpenPoint x={-1} y={0} color={C.good} />
            <OpenPoint x={3} y={0} color={C.good} />
          </>
        )}
        <Line.Segment point1={[x, Y0]} point2={[x, Y1]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={x} y={qx} color={qx > 0 ? C.g : C.bad} />
        {ok && <Point x={x} y={f(x)} color={C.f} />}
        <Label at={[1, -4]} attach="s" gap={10} color={C.g}>y = x² − 2x − 3</Label>
        <Label at={[4.4, f(4.4)]} attach="s" color={C.f}>y = f(x)</Label>
        <MovablePoint point={[x, 0]} onMove={pt => onX(pt[0])} constrain={pt => [clamp(pt[0], LO, HI), 0]} color={dotColor} />
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={onX} min={LO} max={HI} step={0.05} />
        <Toggle label="Write the answer with ∩ instead?" checked={cap} onChange={setCap} />
        <Readouts>
          {cap ? (
            <>
              <Readout color={left ? C.violet : C.guide} tex={`x<-1:\\ \\text{${left ? 'yes' : 'no'}}`} />
              <Readout color={right ? C.violet : C.guide} tex={`x>3:\\ \\text{${right ? 'yes' : 'no'}}`} />
              <Readout color={C.bad} tex={'\\text{both at once: no}'} />
            </>
          ) : (
            <>
              <Readout
                color={qx > 0 ? C.g : C.bad}
                tex={`(x-3)(x+1) = (${num(a)})(${num(b)}) = ${num(qx)}${qx > 0 ? ' > 0' : ' \\le 0'}`}
              />
              <Readout color={ok ? C.f : C.bad} tex={ok ? `f(x) \\approx ${num(f(x))}` : 'f(x)\\ \\text{undefined}'} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
