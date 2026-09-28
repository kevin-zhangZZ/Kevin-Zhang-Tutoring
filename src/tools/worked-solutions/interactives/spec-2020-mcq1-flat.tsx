// 2020 Specialist Exam 2 MCQ 1 — "the y-intercept is also a stationary point" is two conditions
// at once: x = 0 (y-intercept) and f′(x) = 0 (stationary), so f′(0) = 0. Slide a and watch the
// tangent at the y-intercept of f(x) = (x − a)(x + 3)/(x − 2): its gradient is f′(0) = (5a − 6)/4,
// flat only at a = 6/5 (option D). The violet points are the graph's turning points,
// x = 2 ± √(10 − 5a) (from f(x) = x + 5 − a + (10 − 5a)/(x − 2), checked with sympy); the left one
// lands on the y-axis exactly when a = 6/5, where (0, 9/5) is a local maximum and the other
// turning point is the minimum (4, 49/5). Buttons jump to each option: a = 0 (C) puts the
// y-intercept at the origin but the tangent still slopes (f′(0) = −3/2); a = 2 (E) cancels the
// factor x − 2 and leaves the line y = x + 3, which has no stationary point at all.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num } from './kit'

const X0 = -6
const X1 = 7
const Y0 = -8
const Y1 = 16

const fOf = (a: number) => (x: number) => ((x - a) * (x + 3)) / (x - 2)
const slopeAt0 = (a: number) => (5 * a - 6) / 4

const OPTIONS: { letter: string; a: number; tex: string }[] = [
  { letter: 'A', a: -2, tex: '-2' },
  { letter: 'B', a: -1.2, tex: '-\\tfrac65' },
  { letter: 'C', a: 0, tex: '0' },
  { letter: 'D', a: 1.2, tex: '\\tfrac65' },
  { letter: 'E', a: 2, tex: '2' },
]

const near = (u: number, v: number) => Math.abs(u - v) < 1e-6

export default function FlatTangent() {
  const [a, setA] = useState(-1)
  const f = fOf(a)
  const m = slopeAt0(a)
  const y0 = (3 * a) / 2
  const flat = near(a, 1.2)
  const line = near(a, 2)
  const option = OPTIONS.find(o => near(o.a, a))

  // Tangent at (0, f(0)): at most 1.8 units either side, and never more than 3 units up or down,
  // so a steep one stays a short, readable segment.
  const w = Math.min(1.8, 3 / Math.max(Math.abs(m), 1e-9))
  const tangentColor = flat ? C.good : C.g

  // Turning points where (x − 2)² = 10 − 5a (only when a < 2).
  const d = 10 - 5 * a
  const turning = d > 1e-9 && !line ? [2 - Math.sqrt(d), 2 + Math.sqrt(d)] : []
  const inView = (x: number, y: number) => x >= X0 && x <= X1 && y >= Y0 && y <= Y1

  let notice
  if (flat) {
    notice = (
      <Notice tone="good">
        <b>Flat.</b> At <M>{'a = \\tfrac65'}</M> the tangent at the <M>y</M>-intercept is horizontal:{' '}
        <M>{"f'(0) = \\tfrac{5a - 6}{4} = 0"}</M>. The left turning point has slid exactly onto the <M>y</M>-axis, so the{' '}
        <M>y</M>-intercept <M>{'\\left(0, \\tfrac95\\right)'}</M> <i>is</i> a stationary point (a local maximum). That is
        option <b>D</b>. The other turning point, the minimum <M>{'\\left(4, \\tfrac{49}{5}\\right)'}</M>, is on the other
        branch.
      </Notice>
    )
  } else if (line) {
    notice = (
      <Notice tone="warn">
        <b>Option E, <M>a = 2</M>:</b> the factor <M>x - 2</M> cancels, and what is left is the straight line{' '}
        <M>y = x + 3</M> with a hole at <M>(2, 5)</M>. Its gradient is 1 everywhere, so it has no stationary point
        anywhere, let alone at the <M>y</M>-intercept <M>(0, 3)</M>.
      </Notice>
    )
  } else if (near(a, 0)) {
    notice = (
      <Notice tone="warn">
        <b>Option C, <M>a = 0</M>:</b> the graph passes through the origin, so here the <M>y</M>-intercept is on the{' '}
        <M>x</M>-axis. That is what <M>f(0) = 0</M> gives. But the tangent there still slopes down, with gradient{' '}
        <M>{"f'(0) = -\\tfrac32"}</M>. Being on the <M>x</M>-axis is not the same as being stationary: stationary means{' '}
        <M>{"f' = 0"}</M>. Slide <M>a</M> right until the orange tangent goes flat.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        {option && <><b>Option {option.letter}, <M>{`a = ${option.tex}`}</M>:</b>{' '}</>}
        The <M>y</M>-intercept is where <M>x = 0</M>, here <M>{`(0,\\ ${num(y0).replace('−', '-')})`}</M>. The orange
        tangent there has gradient <M>{"f'(0) = \\tfrac{5a - 6}{4}"}</M>, now <M>{num(m).replace('−', '-')}</M>. A stationary
        point needs that gradient to be 0.{' '}
        {m < 0 ? <>Slide <M>a</M> to the right.</> : <>Slide <M>a</M> to the left.</>}{' '}
        {turning.length > 0 && <>Watch the violet turning point: you want it to land exactly on the <M>y</M>-axis.</>}
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[X0, X1]}
        y={[Y0, Y1]}
        xStep={1}
        yStep={2}
        height={320}
        xLabels={v => (v % 2 === 0 ? String(v).replace('-', '−') : '')}
        yLabels={v => (v % 4 === 0 ? String(v).replace('-', '−') : '')}
      >
        {!line && (
          <>
            <Line.Segment point1={[2, Y0]} point2={[2, Y1]} color={C.f} style="dashed" weight={1.5} />
            <Label at={[2, Y0]} color={C.f} attach="ne" size={12}>x = 2</Label>
          </>
        )}
        <Plot.OfX y={f} domain={[X0, 1.999]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[2.001, X1]} color={C.f} weight={3} />
        {line && <Point x={2} y={5} color={C.f} svgCircleProps={{ r: 5, style: { fill: 'var(--mafs-bg)', stroke: C.f, strokeWidth: 2.5 } }} />}
        {turning.map(x => {
          const y = f(x)
          return inView(x, y) && Math.abs(x) > 0.05 ? <Point key={x} x={x} y={y} color={C.violet} /> : null
        })}
        <Line.Segment point1={[-w, y0 - m * w]} point2={[w, y0 + m * w]} color={tangentColor} weight={3} />
        <Point x={0} y={y0} color={tangentColor} />
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={-3} max={3} step={0.05} format={v => num(v)} />
        <Buttons>
          <span className="text-[12px] text-gray-500 dark:text-gray-400">Try the options:</span>
          {OPTIONS.map(o => (
            <ActionButton key={o.letter} label={<>{o.letter}: <M>{`a = ${o.tex}`}</M></>} onClick={() => setA(o.a)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout color={tangentColor} tex={`y\\text{-intercept } (0,\\ \\tfrac{3a}{2}) = (0,\\ ${flat ? '\\tfrac95' : num(y0).replace('−', '-')})`} />
          <Readout color={tangentColor} tex={`f'(0) = \\tfrac{5a-6}{4} = ${flat ? '0' : num(m).replace('−', '-')}`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          Blue: <M>{'y = \\dfrac{(x-a)(x+3)}{x-2}'}</M>. Orange: the tangent at the <M>y</M>-intercept (green once it is flat). Violet: where the graph turns.
        </p>
        {notice}
      </Controls>
    </div>
  )
}
