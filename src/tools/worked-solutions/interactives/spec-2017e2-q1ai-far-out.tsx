// 2017 Specialist Exam 2 Q1a.i — the horizontal asymptote only shows up when you zoom out. Drag
// the window from the exam's x = −3…3 out to ±40: both tails of f(x) = x/(1 + x³) flatten onto
// y = 0. A toggle overlays y = 1/x², which is what f looks like once the 1 in 1 + x³ stops
// mattering — the reason f → 0 as x → ±∞ (and from above at both ends).

import { useState } from 'react'
import { C, Controls, Buttons, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle, tick, usePlayer } from './kit'

const f = (x: number) => x / (1 + x ** 3)
const Y = 1.5 // y-range is −Y…Y
const EDGE = 1.95 // plot each branch until it leaves the view

// f is increasing on each branch, so bisection finds where it reaches a height.
function solve(target: number, lo: number, hi: number) {
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    if (f(mid) < target) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}
const LEFT_END = solve(EDGE, -60, -1 - 1e-9) // left branch climbs to +∞ at x = −1
const RIGHT_START = solve(-EDGE, -1 + 1e-9, 0) // right branch comes up from −∞

const sig = (v: number) => {
  if (v === 0) return '0'
  const s = Math.abs(v) >= 0.01 ? v.toFixed(4) : v.toPrecision(3)
  return s.includes('e') ? Number(s).toString() : s
}

export default function FarOut() {
  const [L, setL] = useState(3)
  const [compare, setCompare] = useState(false)
  const player = usePlayer(setL, { min: 3, max: 40, seconds: 5 })

  const xStep = L <= 4.5 ? 1 : L <= 12 ? 2 : L <= 24 ? 5 : 10

  let notice
  if (L < 6) {
    notice = (
      <Notice>
        This is the exam&apos;s window, <M>{'-3 \\le x \\le 3'}</M>. The vertical asymptote <M>x = -1</M> is
        obvious from the formula, but where are the two tails heading? A second asymptote only shows up when you
        ask what happens as <M>{'x \\to \\pm\\infty'}</M>. Drag <M>L</M> to zoom out.
      </Notice>
    )
  } else if (!compare) {
    notice = (
      <Notice>
        Zoomed out to <M>{`\\pm${L.toFixed(0)}`}</M>, both tails are pressed flat against the <M>x</M>-axis: that is
        the horizontal asymptote <M>y = 0</M>. Why? For large <M>|x|</M> the <M>1</M> in <M>1 + x^3</M> hardly
        matters, so <M>{'f(x) \\approx \\frac{x}{x^3} = \\frac{1}{x^2}'}</M>. Turn on the comparison to see it.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        The dashed orange curve is <M>{'y = \\frac{1}{x^2}'}</M>. Far out the two are almost the same curve, and{' '}
        <M>{'\\frac{1}{x^2} \\to 0'}</M>, so <M>{'f(x) \\to 0'}</M> too. Both tails come in from <b>above</b>: for{' '}
        <M>{'x < -1'}</M> the top and bottom are both negative. The bottom&apos;s degree (3) beats the top&apos;s (1), so
        there is no polynomial part and no partial fractions are needed.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-L, L]} y={[-Y, Y]} xStep={xStep} yStep={0.5} height={300} yLabels={v => (Number.isInteger(v) ? tick(v) : '')}>
        <Line.Segment point1={[-1, -Y - 0.3]} point2={[-1, Y + 0.3]} color={C.guide} style="dashed" weight={2} />
        {L >= 6 && <Line.Segment point1={[-L, 0]} point2={[L, 0]} color={C.good} style="dashed" weight={3} />}
        {compare && (
          <>
            <Plot.OfX y={x => 1 / (x * x)} domain={[-L, -0.7]} color={C.g} style="dashed" weight={2.5} />
            <Plot.OfX y={x => 1 / (x * x)} domain={[0.7, L]} color={C.g} style="dashed" weight={2.5} />
          </>
        )}
        <Plot.OfX y={f} domain={[-L, LEFT_END]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[RIGHT_START, L]} color={C.f} weight={3} />
        <Point x={-L} y={f(-L)} color={C.f} />
        <Point x={L} y={f(L)} color={C.f} />
        <Label at={[-1, -1.25]} attach="w" color={C.guide}>x = −1</Label>
        {L >= 6 && (
          <Label at={[0.55 * L, -0.55]} attach="c" color={C.good}>y = 0</Label>
        )}
      </Plane>
      <Controls>
        <Slider
          label="L"
          value={L}
          onChange={v => {
            player.stop()
            setL(v)
          }}
          min={3}
          max={40}
          step={0.5}
          format={v => `±${v.toFixed(1)}`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(L)} label="Zoom out" />
          <Toggle label={<>Compare with <M>{'y = 1/x^2'}</M></>} checked={compare} onChange={setCompare} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`f(${L.toFixed(1)}) \\approx ${sig(f(L))}`} />
          <Readout color={C.f} tex={`f(-${L.toFixed(1)}) \\approx ${sig(f(-L))}`} />
          {compare && <Readout color={C.g} tex={`\\tfrac{1}{(${L.toFixed(1)})^2} \\approx ${sig(1 / (L * L))}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
