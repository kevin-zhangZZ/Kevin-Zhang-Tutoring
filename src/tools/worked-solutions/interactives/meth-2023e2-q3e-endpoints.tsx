// 2023 Methods Exam 2 Q3e — the largest interval on which h(x) = 2^x − x² is strictly decreasing
// is [0.485, 3.212], endpoints included, even though h'(x) = 0 at both ends. Slide the two ends of
// an interval along the x-axis: between the turning points h is strictly decreasing (violet: true
// but not the largest); exactly at them it is still strictly decreasing, because h(0.485) ≈ 1.164
// is the highest value of h on the interval and h(3.212) ≈ −1.051 the lowest (green); past either
// turning point h rises again and the test h(x₁) > h(x₂) fails (red). The "round brackets" toggle
// (on at the start) is the report's most common wrong answer: true, but not the largest interval.

import { useState, type ReactNode } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const h = (x: number) => 2 ** x - x * x
// The two solutions of h'(x) = log_e(2)·2^x − 2x = 0 (sympy nsolve): the local maximum and minimum.
// Each slider snaps to its turning point from within 0.006, so the ends can sit exactly on them.
const T1 = 0.485089636728563
const T2 = 3.21243252449849

const fmtX = (v: number) => (v === T1 || v === T2 ? v.toFixed(3) : v.toFixed(2))

/** Two values of h to enough decimal places that they visibly differ (near a turning point
 *  h barely changes, and 3 dp would print the same number twice). */
function pair(a: number, b: number): [string, string] {
  for (const dp of [3, 4, 5, 6]) {
    if (a.toFixed(dp) !== b.toFixed(dp)) return [a.toFixed(dp), b.toFixed(dp)]
  }
  return [a.toFixed(6), b.toFixed(6)]
}

function OpenPoint({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 4.5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2 } }} />
}

export default function LargestDecreasingInterval() {
  const [lo, setLo] = useState(T1)
  const [hi, setHi] = useState(T2)
  const [round, setRound] = useState(true)

  const leftOut = lo < T1
  const rightOut = hi > T2
  const decreasing = !leftOut && !rightOut
  const largest = decreasing && lo === T1 && hi === T2 && !round
  const color = !decreasing ? C.bad : largest ? C.good : C.violet
  const End = round ? OpenPoint : Point
  const open = round ? '(' : '['
  const close = round ? ')' : ']'

  let notice
  if (leftOut || rightOut) {
    const parts: ReactNode[] = []
    if (leftOut) {
      const [a, b] = pair(h(lo), h(T1))
      parts.push(
        <span key="l">
          On the left, <M>h</M> <b>rises</b> from <M>{`h(${fmtX(lo)}) \\approx ${a}`}</M> up to{' '}
          <M>{`h(0.485) \\approx ${b}`}</M>, so <M>{`x_1 = ${fmtX(lo)}`}</M>, <M>x_2 = 0.485</M> gives{' '}
          <M>{'h(x_1) < h(x_2)'}</M>.{' '}
        </span>,
      )
    }
    if (rightOut) {
      const [a, b] = pair(h(T2), h(hi))
      parts.push(
        <span key="r">
          On the right, <M>h</M> <b>rises</b> from <M>{`h(3.212) \\approx ${a}`}</M> to{' '}
          <M>{`h(${fmtX(hi)}) \\approx ${b}`}</M>, so <M>x_1 = 3.212</M>, <M>{`x_2 = ${fmtX(hi)}`}</M> gives{' '}
          <M>{'h(x_1) < h(x_2)'}</M>.{' '}
        </span>,
      )
    }
    notice = (
      <Notice tone="warn">
        Past a turning point. {parts}So <M>h</M> is <b>not</b> strictly decreasing on this interval: neither end can
        go past its turning point.
      </Notice>
    )
  } else if (largest) {
    notice = (
      <Notice tone="good">
        <b>The largest interval, endpoints included.</b> <M>{'h(0.485) \\approx 1.164'}</M> is the highest value of{' '}
        <M>h</M> on <M>[0.485,\ 3.212]</M> and <M>{'h(3.212) \\approx -1.051'}</M> the lowest, so whenever{' '}
        <M>{'x_1 < x_2'}</M> here, <M>{'h(x_1) > h(x_2)'}</M>. The gradient is 0 at the two ends, but that doesn&apos;t
        stop <M>h</M> decreasing. Push either end any further and the test fails. Answer: <M>[0.49,\ 3.21]</M>.
      </Notice>
    )
  } else if (round && lo === T1 && hi === T2) {
    notice = (
      <Notice>
        This is the round-bracket answer many students gave, <M>(0.49,\ 3.21)</M>. <M>h</M> is strictly decreasing
        on it, but it is <b>not the largest</b> such interval: switch off round brackets to put the two endpoints
        back and <M>h</M> is still strictly decreasing, because <M>h(0.485)</M> is above, and <M>h(3.212)</M> below,
        every value in between.
      </Notice>
    )
  } else {
    // Strictly decreasing, and at least one end short of its turning point.
    const gaps: ReactNode[] = []
    if (lo > T1) gaps.push(<span key="l">left from <M>{fmtX(lo)}</M> to <M>0.485</M></span>)
    if (hi < T2) gaps.push(<span key="r">right from <M>{fmtX(hi)}</M> to <M>3.212</M></span>)
    notice = (
      <Notice>
        <M>h</M> is strictly decreasing on this interval, but it is <b>not the largest</b>: <M>h</M> is still decreasing
        just outside it, so the interval can stretch {gaps.length === 2 ? <>{gaps[0]} and {gaps[1]}</> : gaps[0]}. Slide
        the ends out to the turning points.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1, 4.5]} y={[-1.6, 2]} xStep={1} yStep={1} height={300}>
        <Plot.OfX y={h} domain={[-1, 4.6]} color={C.f} weight={3} />
        <Label at={[-0.45, h(-0.45)]} color={C.f} attach="nw">h</Label>
        <Plot.OfX y={h} domain={[lo, hi]} color={color} weight={5} />
        <Line.Segment point1={[lo, 0]} point2={[lo, h(lo)]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[hi, 0]} point2={[hi, h(hi)]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[lo, 0]} point2={[hi, 0]} color={color} weight={5} />
        <Point x={T1} y={h(T1)} color={C.ink} />
        <Label at={[T1, h(T1)]} attach="n" gap={10}>(0.49, 1.16)</Label>
        <Point x={T2} y={h(T2)} color={C.ink} />
        <Label at={[T2, h(T2)]} attach="s" gap={10}>(3.21, −1.05)</Label>
        <End x={lo} y={0} color={color} />
        <End x={hi} y={0} color={color} />
        <End x={lo} y={h(lo)} color={color} />
        <End x={hi} y={h(hi)} color={color} />
      </Plane>
      <Controls>
        <Slider label="\text{left end}" value={lo} onChange={v => setLo(Math.abs(v - T1) < 0.006 ? T1 : v)} min={-0.5} max={1.5} step={0.01} format={fmtX} />
        <Slider label="\text{right end}" value={hi} onChange={v => setHi(Math.abs(v - T2) < 0.006 ? T2 : v)} min={2.2} max={4.2} step={0.01} format={fmtX} />
        <Buttons>
          <Toggle label="Round brackets (leave the endpoints out)" checked={round} onChange={setRound} />
        </Buttons>
        <Readouts>
          <Readout color={color} tex={`\\text{interval } ${open}${fmtX(lo)},\\ ${fmtX(hi)}${close}`} />
          <Readout tex={`h(${fmtX(lo)}) \\approx ${h(lo).toFixed(3)}`} />
          <Readout tex={`h(${fmtX(hi)}) \\approx ${h(hi).toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
