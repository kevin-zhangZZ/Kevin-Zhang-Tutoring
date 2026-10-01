// 2021 Methods Exam 1 Q9b.ii — which q put BOTH intersections of h(x) = (q/√3)(2 − x) with the
// unit circle in the first quadrant. The intersections are x = (2q² ± 3√(1 − q²))/(3 + q²),
// y = q(2 − x)/√3 (sympy), so for q > 0 every y is positive and only the far point's x can fail.
// Drag q: the y-intercept h(0) = 2q/√3 (the working's test) rises; while it is below 1 it is inside
// the circle and the far point has x < 0; at q = √3/2, h(0) = 1 and the far point is (0, 1) (x = 0,
// not positive); and at q = 1 the two points merge into P. The number line under the
// plane builds the answer (√3/2, 1), open at both ends — the report says students found the
// endpoints but then wrote the wrong interval.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Circle, tick, Controls, Katex, Label, Line, M, Notice, Plane, Point, Polygon, Readout, Readouts,
  Slider, num,
} from './kit'

const R3 = Math.sqrt(3)
const LOW = R3 / 2
const A: [number, number] = [2, 0]
const Q_MIN = 0.5
const Q_MAX = 1.1

/** [near point, far point], or [] when the line misses. */
function hits(q: number): [number, number][] {
  if (q > 1) return []
  const s = 3 * Math.sqrt(Math.max(0, 1 - q * q))
  return [(2 * q * q + s) / (3 + q * q), (2 * q * q - s) / (3 + q * q)].map(x => [x, (q * (2 - x)) / R3])
}

const positive = ([x, y]: [number, number]) => x > 1e-9 && y > 1e-9

function QLine({ q }: { q: number }) {
  const pos = (v: number) => `${((v - Q_MIN) / (Q_MAX - Q_MIN)) * 100}%`
  const ticks: [number, string][] = [[0.5, '0.5'], [LOW, '\\tfrac{\\sqrt3}{2}'], [1, '1']]
  return (
    <div className="relative mx-4 mt-2 mb-7 h-6" aria-label="number line for q">
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-400 dark:bg-gray-500" />
      <div
        className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded bg-emerald-500/80"
        style={{ left: pos(LOW), width: `${((1 - LOW) / (Q_MAX - Q_MIN)) * 100}%` }}
      />
      {[LOW, 1].map(v => (
        <div
          key={v}
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-600 bg-white dark:border-emerald-400 dark:bg-gray-900"
          style={{ left: pos(v) }}
        />
      ))}
      {ticks.map(([v, t]) => (
        <div key={t} className="absolute top-full -translate-x-1/2 pt-0.5 text-[12px] text-gray-600 dark:text-gray-300" style={{ left: pos(v) }}>
          <Katex tex={t} />
        </div>
      ))}
      <div className="absolute -top-1 -bottom-1 w-0.5 -translate-x-1/2 bg-orange-500" style={{ left: pos(q) }} />
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-[12px] italic text-gray-500 dark:text-gray-400">q</div>
    </div>
  )
}

export default function FirstQuadrant() {
  const [raw, setRaw] = useState(0.8)

  const atLow = Math.abs(raw - LOW) < 0.003
  const atOne = Math.abs(raw - 1) < 0.003
  const q = atLow ? LOW : atOne ? 1 : raw
  let pts = hits(q)
  if (atLow) pts = [[0.8, 0.6], [0, 1]]
  if (atOne) pts = [[0.5, R3 / 2]]
  const far = pts.length === 2 ? pts[1] : null
  const near = pts.length ? pts[0] : null
  const farColor = far && positive(far) ? C.good : C.bad
  const yInt = (2 * q) / R3
  const yIntColor = !atLow && yInt > 1 ? C.good : C.bad
  const coord =([x, y]: [number, number]) => `(${num(x, 3)},\\ ${num(y, 3)})`

  let notice
  if (q > 1) {
    notice = (
      <Notice tone="warn">
        <b>No intersections at all:</b> the line is now steeper than the tangent at <M>P</M> (part b.i). Drag <M>q</M>{' '}
        back below <M>1</M>.
      </Notice>
    )
  } else if (atOne) {
    notice = (
      <Notice tone="warn">
        <b>At <M>q = 1</M> the two points merge into <M>{'P\\left(\\tfrac12, \\tfrac{\\sqrt3}{2}\\right)'}</M></b>: one
        intersection, not two. The question says the graph meets the circle twice, so <M>1</M> is excluded and the right
        bracket is open.
      </Notice>
    )
  } else if (atLow) {
    notice = (
      <Notice tone="warn">
        <b>At <M>{'q = \\tfrac{\\sqrt3}{2}'}</M>, <M>h(0) = 1</M>: the far point lands exactly on <M>(0, 1)</M>.</b> Its <M>x</M>-coordinate
        is <M>0</M>, which is not positive, so <M>{'\\tfrac{\\sqrt3}{2}'}</M> is excluded too. Both ends open:{' '}
        <M>{'q\\in\\left(\\tfrac{\\sqrt3}{2}, 1\\right)'}</M>.
      </Notice>
    )
  } else if (far && positive(far)) {
    notice = (
      <Notice tone="good">
        <b>Both points are in the first quadrant</b>: the line crosses the <M>y</M>-axis above the circle{' '}
        <span className="whitespace-nowrap">(<M>{'h(0) > 1'}</M>),</span> so it can only meet the circle to the right of the <M>y</M>-axis. This happens while{' '}
        <M>q</M> is strictly between <M>{'\\tfrac{\\sqrt3}{2}'}</M> and <M>1</M>, the green stretch of the number line. Press
        the two buttons to see what goes wrong exactly at each end.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        The line crosses the <M>y</M>-axis at <span className="whitespace-nowrap"><M>{`h(0) \\approx ${num(yInt, 3)} < 1`}</M>,</span> <b>inside the circle</b>, so
        heading left it leaves the circle with <M>{'x < 0'}</M>: not every coordinate is positive. Drag <M>q</M> up: the
        line steepens about <M>A</M> and <M>h(0)</M> rises toward <M>1</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.2, 2.2]} y={[-0.3, 1.3]} xStep={0.5} yStep={0.5} equalScale height={320} xLabels={v => (v < -1.25 || v > 2.2 ? '' : tick(v))} yLabels={v => (v > 1.1 ? '' : tick(v))}>
        <Polygon points={[[0, 0], [2.2, 0], [2.2, 1.3], [0, 1.3]]} color={C.good} fillOpacity={0.07} weight={0} strokeOpacity={0} />
        <Circle center={[0, 0]} radius={1} color={C.f} fillOpacity={0.05} weight={2.5} />
        <Line.ThroughPoints point1={A} point2={[0, (2 * q) / R3]} color={C.g} weight={3} />
        {near && <Point x={near[0]} y={near[1]} color={C.good} svgCircleProps={{ r: 6 }} />}
        {far && <Point x={far[0]} y={far[1]} color={farColor} svgCircleProps={{ r: 6 }} />}
        <Point x={0} y={yInt} color={yIntColor} svgCircleProps={{ r: 4 }} />
        <Label at={[0, yInt]} color={yIntColor} attach="sw" size={12}>h(0)</Label>
        <Point x={A[0]} y={A[1]} color={C.ink} />
        <Label at={A} attach="ne">A</Label>
        <Label at={[1.9, 1.2]} color={C.good} attach="w" bold={false} size={12}>first quadrant</Label>
      </Plane>
      <Controls>
        <Slider label="q" value={raw} onChange={setRaw} min={Q_MIN} max={Q_MAX} step={0.002} format={v => v.toFixed(3)} />
        <QLine q={q} />
        <Buttons>
          <ActionButton label={<>Go to <M>{'q = \\tfrac{\\sqrt3}{2}'}</M></>} onClick={() => setRaw(LOW)} />
          <ActionButton label={<>Go to <M>q = 1</M></>} onClick={() => setRaw(1)} />
        </Buttons>
        <Readouts>
          <Readout color={yIntColor} tex={atLow ? 'h(0) = \\tfrac{2q}{\\sqrt3} = 1' : `h(0) = \\tfrac{2q}{\\sqrt3} \\approx ${num(yInt, 3)}`} />
          {near && <Readout color={C.good} tex={`\\text{near point } ${coord(near)}`} />}
          {far && <Readout color={farColor} tex={`\\text{far point } ${coord(far)}`} />}
          {!near && <Readout color={C.bad} tex="\text{no intersection}" />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
