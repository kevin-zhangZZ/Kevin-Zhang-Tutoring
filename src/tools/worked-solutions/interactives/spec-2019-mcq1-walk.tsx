// 2019 Specialist Exam 2 MCQ 1 — walk a point P along y = eˣ/(x − 1). The tangent at P and the
// sign table show f′ changing from − to + at x = 2 (a local minimum at (2, e²)), and f″ changing
// sign only across the vertical asymptote x = 1, where there is no point on the curve — so the
// concavity changes but there is no point of inflection (the answer, E). The "standard window"
// toggle shows what the TI-Nspire's default Graphs window (−10 ≤ x ≤ 10, −6.67 ≤ y ≤ 6.67)
// displays: the whole right branch lies on or above y = e² ≈ 7.39, so it and its minimum are
// off-screen — one easy way to land on option C (19%). All values from the question's rule:
// f′(x) = eˣ(x − 2)/(x − 1)², f″(x) = eˣ((x − 2)² + 1)/(x − 1)³ (checked with sympy).

import { useState } from 'react'
import { C, Controls, Katex, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num, tick } from './kit'

const f = (x: number) => Math.exp(x) / (x - 1)
const fp = (x: number) => (Math.exp(x) * (x - 2)) / (x - 1) ** 2
const fpp = (x: number) => (Math.exp(x) * ((x - 2) ** 2 + 1)) / (x - 1) ** 3
const E2 = Math.exp(2)

/** The x in (lo, hi) where f(x) = target, by bisection (f is monotonic on each piece used). */
function solveF(target: number, lo: number, hi: number): number {
  const g = (x: number) => f(x) - target
  let a = lo
  let b = hi
  for (let i = 0; i < 60; i++) {
    const m = (a + b) / 2
    if (Math.sign(g(m)) === Math.sign(g(a))) a = m
    else b = m
  }
  return (a + b) / 2
}

// The full picture and the calculator's standard window.
const MAIN = { x: [-4, 4] as [number, number], y: [-8, 20] as [number, number], xStep: 1, yStep: 4 }
const CAS = { x: [-10, 10] as [number, number], y: [-6.67, 6.67] as [number, number], xStep: 2, yStep: 2 }

type Col = 0 | 1 | 2 | 3 | 4
const GAP = 0.08 // |x − 1| below this: no point to show
function column(x: number): Col {
  if (Math.abs(x - 1) < GAP) return 1
  if (Math.abs(x - 2) < 0.03) return 3
  if (x < 1) return 0
  if (x < 2) return 2
  return 4
}

const MINUS = '−'
const HEADS = ['x<1', 'x=1', '1<x<2', 'x=2', 'x>2']
const ROWS: { tex: string; vals: string[] }[] = [
  { tex: "f'(x)", vals: [MINUS, 'undef.', MINUS, '0', '+'] },
  { tex: "f''(x)", vals: [MINUS, 'undef.', '+', '+', '+'] },
]
const SHAPE = ['↘ ∩', 'no point', '↘ ∪', 'min', '↗ ∪']

function SignTable({ col }: { col: Col }) {
  const cell = (i: number) =>
    `px-1 py-1 text-center ${i === col ? 'bg-emerald-100 dark:bg-emerald-900/50 font-semibold text-gray-900 dark:text-white' : ''}`
  return (
    <table className="w-full table-fixed border-collapse text-[12px] text-gray-700 dark:text-gray-300">
      <thead>
        <tr className="border-b border-gray-200 dark:border-gray-700">
          <th className="w-[3.6rem] px-1 py-1 text-left font-normal text-gray-500 dark:text-gray-400">sign of</th>
          {HEADS.map((h, i) => (
            <th key={h} className={`${cell(i)} font-normal`}>
              <Katex tex={h} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ROWS.map(r => (
          <tr key={r.tex}>
            <td className="px-1 py-1">
              <Katex tex={r.tex} />
            </td>
            {r.vals.map((v, i) => (
              <td key={i} className={cell(i)}>
                {v}
              </td>
            ))}
          </tr>
        ))}
        <tr className="border-t border-gray-200 dark:border-gray-700">
          <td className="px-1 py-1 text-gray-500 dark:text-gray-400">shape</td>
          {SHAPE.map((s, i) => (
            <td key={i} className={cell(i)}>
              {s}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export default function WalkAlongCurve() {
  const [x, setX] = useState(2)
  const [cas, setCas] = useState(false)
  const view = cas ? CAS : MAIN
  // Each branch drawn only until it has left the padded view (x = 1 is never sampled).
  const over = 0.1 * (view.y[1] - view.y[0]) + 0.5
  const leftEnd = solveF(view.y[0] - over, 0, 0.999)
  const rightStart = solveF(view.y[1] + over, 1.001, 2)
  const col = column(x)
  const onCurve = col !== 1
  const y = f(x)
  const m = fp(x)
  const tangentColor = col === 3 ? C.good : C.g

  let notice
  if (cas) {
    notice = (
      <Notice tone="warn">
        <b>This is the calculator&apos;s standard window</b> (<M>{'-10\\le x\\le10,\\ -6.67\\le y\\le6.67'}</M>). Only the
        left branch shows: the asymptotes and the <M>y</M>-intercept are all there, and nothing turns around. The right
        branch is missing because its lowest point is <M>{'(2,\\ e^2)\\approx(2,\\ 7.39)'}</M>, above the top edge. Before
        ruling a feature out, zoom out or solve <M>{"f'(x)=0"}</M>.
      </Notice>
    )
  } else if (col === 1) {
    notice = (
      <Notice tone="warn">
        <b>There is no point on the curve at <M>x = 1</M></b>: <M>{'f(1)=\\tfrac{e}{0}'}</M> is undefined, and the graph
        has a vertical asymptote. Across it, <M>{"f''"}</M> does change sign (− on the left, + on the right), so the
        bending changes from ∩ to ∪. But a point of inflection has to be a point <i>on</i> the curve, and there isn&apos;t
        one here. That is why the graph has no point of inflection: option E.
      </Notice>
    )
  } else if (col === 3) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = 2</M> the tangent is horizontal</b>: <M>{"f'(2)=0"}</M>, and the table shows <M>{"f'"}</M> changing
        from − to +. So there is a local minimum at <M>{'(2,\\ e^2)\\approx(2,\\ 7.39)'}</M> — option C&apos;s feature is
        there. Now drag <M>x</M> left, towards <M>1</M>, and watch the sign of <M>{"f''"}</M>.
      </Notice>
    )
  } else if (col === 0) {
    notice = (
      <Notice>
        On the left branch <M>{"f'(x)"}</M> and <M>{"f''(x)"}</M> are both negative: the curve is always falling and
        concave down (∩), with the tangent above it. In <M>{"f''(x)=\\frac{e^x\\left((x-2)^2+1\\right)}{(x-1)^3}"}</M> the
        top is always positive and the bottom is negative for <M>{'x<1'}</M>. Drag <M>x</M> across <M>1</M> to the other
        branch.
      </Notice>
    )
  } else if (col === 2) {
    notice = (
      <Notice>
        Here <M>{"f''(x)>0"}</M>: concave up (∪), with the tangent below the curve. The bending has changed from the left
        branch, but not at any point you can stand on — the change happened across the asymptote <M>x = 1</M>. The curve is
        still falling (<M>{"f'(x)<0"}</M>) down to the minimum at <M>x = 2</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Rising and concave up: <M>{"f'(x)>0"}</M> and <M>{"f''(x)>0"}</M>. The top of <M>{"f''"}</M> is{' '}
        <M>{'e^x\\left((x-2)^2+1\\right)'}</M>, which is never zero, so <M>{"f''"}</M> can only change sign where{' '}
        <M>{'(x-1)^3'}</M> does — at the asymptote. Now try the standard-window toggle to see how the minimum can hide.
      </Notice>
    )
  }

  return (
    <div className="space-y-3">
      <Plane
        x={view.x}
        y={view.y}
        xStep={view.xStep}
        yStep={view.yStep}
        height={340}
        xLabels={v => (Math.abs(v) > view.x[1] + 1e-9 ? '' : tick(v))}
      >
        <Line.ThroughPoints point1={[1, 0]} point2={[1, 1]} color={C.guide} style="dashed" />
        <Plot.OfX y={f} domain={[view.x[0], leftEnd]} color={C.f} weight={3} />
        {cas ? (
          <>
            {/* The right branch (y ≥ e² ≈ 7.39) is not drawn: it is above the calculator's top edge. */}
            <Line.Segment point1={[-10, 6.67]} point2={[10, 6.67]} color={C.bad} style="dashed" />
            <Label at={[5.8, 6.67]} attach="s" color={C.bad} size={11}>
              ↑ right branch up here
            </Label>
            <Label at={[5.8, 5.3]} attach="s" color={C.bad} size={11}>
              (lowest y = e² ≈ 7.39)
            </Label>
          </>
        ) : (
          <>
            <Plot.OfX y={f} domain={[rightStart, view.x[1]]} color={C.f} weight={3} />
            <Label at={[1, -6]} attach="e" color={C.guide} size={12}>
              x = 1
            </Label>
            <Point x={0} y={-1} color={C.ink} />
            {/* Placed below-left, clear of the x-axis tick numbers; the curve is above y = −1 for x < 0. */}
            <Label at={[-0.15, -2.4]} attach="w" size={12}>
              (0, −1)
            </Label>
            <Point x={2} y={E2} color={C.good} />
            <Label at={[2, E2]} attach="s" color={C.good} size={12}>
              (2, e²)
            </Label>
            {onCurve && (
              <>
                <Line.PointSlope point={[x, y]} slope={m} color={tangentColor} weight={2} />
                <Point x={x} y={y} color={tangentColor} />
              </>
            )}
          </>
        )}
      </Plane>
      <Controls>
        {!cas && <Slider label="x" value={x} onChange={setX} min={-3} max={3.8} step={0.01} />}
        <Toggle label="Show the calculator's standard window" checked={cas} onChange={setCas} />
      </Controls>
      {!cas && (
        <>
          <Readouts>
            {onCurve ? (
              <>
                <Readout tex={`f(x)=${num(y)}`} color={C.f} />
                <Readout tex={`f'(x)=${num(m)}`} color={tangentColor} />
                <Readout tex={`f''(x)=${num(fpp(x))}`} />
              </>
            ) : (
              <Readout tex="f(1)\ \text{is undefined}" color={C.bad} />
            )}
          </Readouts>
          <SignTable col={col} />
        </>
      )}
      {notice}
    </div>
  )
}
