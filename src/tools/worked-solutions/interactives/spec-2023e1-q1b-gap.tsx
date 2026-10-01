// 2023 Specialist Exam 1 Q1b — why each branch of f(x) = x + 2 − 4/(x − 1) hugs both asymptotes
// (only 39% got full marks; the report says some graphs retreated from the asymptotes and some
// left out y = x + 2). Slide a probe x along the curve: the green gap from the curve to the line
// y = x + 2 is exactly −4/(x − 1) — positive left of x = 1 (curve above the line), negative right
// of it (below), huge next to x = 1 and shrinking towards 0 far away, so the curve can only close
// in on the line. A toggle draws a "retreating" sketch through the same intercepts, which drifts
// away from y = x + 2 — something the gap −4/(x − 1) rules out.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const f = (x: number) => x + 2 - 4 / (x - 1)
const line = (x: number) => x + 2
const gap = (x: number) => -4 / (x - 1)

// A typical "retreating" hand sketch: same intercepts (−3, 0), (0, 6), (2, 0), but each branch
// bends away from y = x + 2 instead of closing in on it.
const K = 0.05
const wrongLeft = (x: number) => f(x) + K * x * (x + 3)
const wrongRight = (x: number) => f(x) - K * (x - 2) ** 2

const X: [number, number] = [-10, 12]
const Y: [number, number] = [-8, 14]
// Where each branch leaves the padded view: f = 17 just left of x = 1 (x = 8 − √53),
// f = −11 just right of it (x = √53 − 6).
const LEFT_END = 8 - Math.sqrt(53)
const RIGHT_START = Math.sqrt(53) - 6

// Number only every second grid line, and nothing outside the ranges (a phone pads the view).
const fours = (v: number) => (v % 4 === 0 && v !== 0 && v >= X[0] && v <= X[1] ? String(v) : '')

export default function GapToAsymptote() {
  const [x, setX] = useState(-2)
  const [showWrong, setShowWrong] = useState(false)

  const atVA = Math.abs(x - 1) < 0.05
  const g = gap(x)
  const py = f(x)
  const inView = !atVA && py > Y[0] && py < Y[1]
  const near = !atVA && Math.abs(x - 1) < 1

  let notice
  if (atVA) {
    notice = (
      <Notice tone="warn">
        <M>x = 1</M> is not in the domain: the denominator <M>x - 1</M> is <M>0</M> there, while the numerator is{' '}
        <M>-4</M>, not <M>0</M>. That is why <M>x = 1</M> is a vertical asymptote. Move <M>x</M> a little either side
        and watch the gap explode.
      </Notice>
    )
  } else if (showWrong) {
    notice = (
      <Notice tone="warn">
        The red sketch goes through the right intercepts but drifts <b>away</b> from <M>y = x + 2</M> at both ends.
        That can&apos;t happen: the gap from <M>f</M> to the line is exactly <M>{'-\\frac{4}{x-1}'}</M>, and the
        further <M>x</M> is from <M>1</M>, the closer that gets to <M>0</M> (here it is <M>{num(g)}</M>). Drag <M>x</M> out
        to <M>-10</M> or <M>12</M>: the green gap only ever gets shorter, so the real curve keeps closing in on the line.
      </Notice>
    )
  } else if (near && x < 1) {
    notice = (
      <Notice>
        Just left of <M>x = 1</M>, <M>x - 1</M> is a small negative number, so the gap{' '}
        <M>{'-\\frac{4}{x-1}'}</M> is large and positive (here <M>{num(g)}</M>). The curve shoots up beside{' '}
        <M>x = 1</M> towards <M>{'+\\infty'}</M> without touching it. Now try <M>x</M> just right of <M>1</M>.
      </Notice>
    )
  } else if (near) {
    notice = (
      <Notice>
        Just right of <M>x = 1</M>, <M>x - 1</M> is small and positive, so the gap <M>{'-\\frac{4}{x-1}'}</M> is
        large and negative (here <M>{num(g)}</M>). The curve plunges down beside <M>x = 1</M> towards{' '}
        <M>{'-\\infty'}</M>. Drag <M>x</M> to the right to see this branch turn to follow <M>y = x + 2</M>.
      </Notice>
    )
  } else if (x < 1) {
    notice = (
      <Notice>
        For <M>{'x<1'}</M>, <M>x - 1</M> is negative, so the gap <M>{'-\\frac{4}{x-1}'}</M> is <b>positive</b>: the
        curve sits above <M>y = x + 2</M>. Here the gap is <M>{num(g)}</M>; drag <M>x</M> left and it shrinks towards{' '}
        <M>0</M> but never reaches it, so the curve closes in on the line without touching it. Then try the other
        branch, <M>{'x>1'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        For <M>{'x>1'}</M> the gap <M>{'-\\frac{4}{x-1}'}</M> is <b>negative</b>: the curve sits below{' '}
        <M>y = x + 2</M>. Here it is <M>{num(g)}</M>, shrinking towards <M>0</M> as <M>x</M> grows. Turn on
        &ldquo;Show a sketch that retreats&rdquo; to see the mistake the examiners reported.
      </Notice>
    )
  }

  return (
    <div className="space-y-3">
      <Plane x={X} y={Y} xStep={2} yStep={2} height={340} labels={fours}>
        <Line.ThroughPoints point1={[1, 0]} point2={[1, 1]} color={C.guide} style="dashed" />
        <Label at={[1, 10.6]} attach="e" color={C.guide} size={12}>
          x = 1
        </Label>
        <Plot.OfX y={line} color={C.good} style="dashed" weight={2} />
        {/* Below the line's lower-left end: the only side of it no curve ever reaches. */}
        <Label at={[-7, -5]} attach="se" color={C.good} size={12}>
          y = x + 2
        </Label>
        {showWrong && (
          <>
            <Plot.OfX y={wrongLeft} domain={[X[0], LEFT_END]} color={C.bad} weight={2.5} />
            <Plot.OfX y={wrongRight} domain={[RIGHT_START, X[1]]} color={C.bad} weight={2.5} />
          </>
        )}
        <Plot.OfX y={f} domain={[X[0], LEFT_END]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[RIGHT_START, X[1]]} color={C.f} weight={3} />
        {/* The intercepts the curve must pass through, drawn small so they don't hide tick labels. */}
        <Point x={-3} y={0} color={C.ink} svgCircleProps={{ r: 4 }} />
        <Point x={0} y={6} color={C.ink} svgCircleProps={{ r: 4 }} />
        <Point x={2} y={0} color={C.ink} svgCircleProps={{ r: 4 }} />
        {inView && (
          <>
            {/* P goes underneath the gap bar so it can't hide a short bar. */}
            <Point x={x} y={py} color={C.f} />
            {Math.abs(g) > 0.05 && (
              <Line.Segment point1={[x, line(x)]} point2={[x, py]} color={C.good} weight={4} />
            )}
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={setX} min={-10} max={12} step={0.1} format={v => v.toFixed(1)} />
        <Toggle label="Show a sketch that retreats" checked={showWrong} onChange={setShowWrong} />
      </Controls>
      <Readouts>
        {atVA ? (
          <Readout tex={'x = 1:\\ f(x)\\ \\text{undefined}'} color={C.bad} />
        ) : (
          <>
            <Readout tex={`f(x) = ${num(py)}`} color={C.f} />
            <Readout tex={`\\text{gap} = f(x)-(x+2) = -\\tfrac{4}{x-1} = ${num(g)}`} color={C.good} />
          </>
        )}
      </Readouts>
      {notice}
    </div>
  )
}
