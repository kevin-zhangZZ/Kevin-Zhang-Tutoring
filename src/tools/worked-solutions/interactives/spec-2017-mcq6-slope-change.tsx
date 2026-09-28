// 2017 Specialist Exam 2 MCQ 6 — d²y/dx² is how fast the gradient changes as you move ALONG the
// solution curve of dy/dx = e^x arctan(y) through (0, 1). Top: the curve (solved numerically, RK4),
// with tangents at (0, 1) and at x = h. Bottom: the gradient m(x) = e^x arctan(y(x)) along the curve;
// the chord from x = 0 to x = h has gradient (m(h) − m(0))/h → 3π/8 as h → 0 (option B). The toggle
// shows option D's idea — hold y at 1 and let only e^x change — whose chord gradient → π/4: the
// missing piece is the growth of arctan(y), the chain-rule term e^x/(1 + y²)·dy/dx = π/8.

import { useMemo, useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const PI = Math.PI
const X0 = -1
const X1 = 1
const DX = 0.0025
const slope = (x: number, y: number) => Math.exp(x) * Math.atan(y)

// RK4 from (0, 1) outwards in both directions, stored on a grid from X0 to X1
function solve(): number[] {
  const n = Math.round((X1 - X0) / DX)
  const i0 = Math.round(-X0 / DX)
  const ys = new Array<number>(n + 1)
  ys[i0] = 1
  const step = (x: number, y: number, h: number) => {
    const k1 = slope(x, y)
    const k2 = slope(x + h / 2, y + (h / 2) * k1)
    const k3 = slope(x + h / 2, y + (h / 2) * k2)
    const k4 = slope(x + h, y + h * k3)
    return y + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4)
  }
  for (let i = i0; i < n; i++) ys[i + 1] = step(X0 + i * DX, ys[i], DX)
  for (let i = i0; i > 0; i--) ys[i - 1] = step(X0 + i * DX, ys[i], -DX)
  return ys
}

export default function SlopeChange() {
  const ys = useMemo(solve, [])
  const yOf = (x: number) => {
    const t = (Math.min(Math.max(x, X0), X1) - X0) / DX
    const i = Math.min(Math.floor(t), ys.length - 2)
    return ys[i] + (t - i) * (ys[i + 1] - ys[i])
  }
  const mOf = (x: number) => slope(x, yOf(x))
  const frozenM = (x: number) => Math.exp(x) * (PI / 4)

  const [h, setH] = useState(0.5)
  const [frozen, setFrozen] = useState(false)

  const m0 = PI / 4
  const yh = yOf(h)
  const mh = mOf(h)
  const fh = frozenM(h)
  const chord = (mh - m0) / h
  const chordFrozen = (fh - m0) / h
  const yEffect = (mh - fh) / h
  const close = h <= 0.03

  // a short tangent segment through (x, y) with gradient m
  const tangent = (x: number, y: number, m: number, half = 0.3): [[number, number], [number, number]] => [
    [x - half, y - half * m],
    [x + half, y + half * m],
  ]
  const tP = tangent(0, 1, m0)
  const tQ = tangent(h, yh, mh)
  const tF = tangent(h, 1, fh)

  let notice
  if (frozen) {
    notice = (
      <Notice tone="warn">
        Holding <M>y = 1</M> means only <M>e^x</M> changes, so the red gradient graph is{' '}
        <M>{'\\tfrac{\\pi}{4}e^x'}</M> and its chord gradient heads to <M>{'\\tfrac{\\pi}{4}'}</M>: option D. But the red
        point has left the curve. Moving along the real solution, <M>y</M> rises too, so <M>\arctan(y)</M> grows as well:
        that is the orange gap between the blue and red graphs at <M>x = h</M>. Divided by <M>h</M>, it heads to{' '}
        <M>{'\\tfrac{e^0}{1+1^2}\\cdot\\tfrac{\\pi}{4} = \\tfrac{\\pi}{8}'}</M>. Slide <M>h</M> towards <M>0</M> to watch
        both parts settle.
      </Notice>
    )
  } else if (close) {
    notice = (
      <Notice tone="good">
        The chord gradient is closing in on <M>{'\\tfrac{3\\pi}{8} \\approx 1.178'}</M> (the dashed green tangent). Both
        factors of <M>e^x\arctan(y)</M> grow as you move along the curve: <M>e^x</M> because <M>x</M> increases, and{' '}
        <M>\arctan(y)</M> because <M>y</M> increases, at the rate <M>{'\\tfrac{dy}{dx} = \\tfrac{\\pi}{4}'}</M>. Now turn on{' '}
        <b>Hold y at 1</b> to see where option D comes from.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Top: the solution curve through <M>(0, 1)</M>. Bottom: its gradient <M>{'m = \\tfrac{dy}{dx}'}</M> at each{' '}
        <M>x</M>. The second derivative at <M>(0, 1)</M> is how fast that gradient is changing there, which is the
        gradient of the bottom graph at <M>x = 0</M>. Slide <M>h</M> towards <M>0</M> and watch the chord&apos;s gradient.
      </Notice>
    )
  }

  return (
    <div>
      <p className="mb-1 text-[13px] font-semibold text-gray-600 dark:text-gray-300">The solution curve through (0, 1)</p>
      <Plane x={[X0, X1]} y={[0, 3]} xStep={0.5} yStep={1} height={230}>
        <Plot.OfX y={yOf} domain={[X0, X1]} color={C.f} weight={3} />
        {frozen && (
          <>
            <Line.Segment point1={[0, 1]} point2={[h, 1]} color={C.bad} style="dashed" weight={2} />
            <Line.Segment point1={tF[0]} point2={tF[1]} color={C.bad} weight={2} />
            <Point x={h} y={1} color={C.bad} />
          </>
        )}
        <Line.Segment point1={tP[0]} point2={tP[1]} color={C.g} weight={2} />
        <Line.Segment point1={tQ[0]} point2={tQ[1]} color={C.violet} weight={2} />
        <Point x={0} y={1} color={C.g} />
        <Point x={h} y={yh} color={C.violet} />
        <Label at={[0, 1]} color={C.g} attach="nw">
          (0, 1)
        </Label>
        {frozen && (
          <Label at={[h, 1]} color={C.bad} attach="se">
            y held at 1
          </Label>
        )}
      </Plane>
      <p className="mb-1 mt-4 text-[13px] font-semibold text-gray-600 dark:text-gray-300">
        Its gradient at each x: m = dy/dx = e^x arctan(y)
      </p>
      <Plane x={[X0, X1]} y={[0, 3.5]} xStep={0.5} yStep={1} height={230} yLabel="m">
        <Plot.OfX y={mOf} domain={[X0, X1]} color={C.f} weight={3} />
        <Line.PointSlope point={[0, m0]} slope={(3 * PI) / 8} color={C.good} style="dashed" weight={1.5} />
        {frozen && (
          <>
            <Plot.OfX y={frozenM} domain={[X0, X1]} color={C.bad} weight={2} style="dashed" />
            <Line.Segment point1={[0, m0]} point2={[h, fh]} color={C.bad} weight={2} />
            <Line.Segment point1={[h, fh]} point2={[h, mh]} color={C.g} weight={3} />
            <Point x={h} y={fh} color={C.bad} />
          </>
        )}
        <Line.Segment point1={[0, m0]} point2={[h, mh]} color={C.violet} weight={2.5} />
        <Point x={0} y={m0} color={C.g} />
        <Point x={h} y={mh} color={C.violet} />
        <Label at={[0, m0]} color={C.g} attach="nw">
          π/4
        </Label>
      </Plane>
      <Controls>
        <Slider label="h" value={h} onChange={setH} min={0.005} max={0.8} step={0.005} format={v => num(v, 3)} />
        <Buttons>
          <Toggle label="Hold y at 1 (option D's idea)" checked={frozen} onChange={setFrozen} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`\\text{along the curve: } \\frac{m(h) - m(0)}{h} = ${num(chord, 3)}`} />
          {frozen && <Readout color={C.bad} tex={`y \\text{ held at } 1: \\frac{\\tfrac{\\pi}{4}e^h - \\tfrac{\\pi}{4}}{h} = ${num(chordFrozen, 3)}`} />}
          {frozen && <Readout color={C.g} tex={`\\frac{\\text{orange gap}}{h} = ${num(yEffect, 3)}`} />}
          <Readout
            color={C.good}
            tex={`h \\to 0:\\ ${frozen ? '\\tfrac{\\pi}{4} + \\tfrac{\\pi}{8}' : '\\tfrac{3\\pi}{8}'} \\approx 1.178`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
