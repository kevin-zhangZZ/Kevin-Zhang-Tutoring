// 2017 Methods Exam 2 MCQ 19 — the density cos(x) + 1 lives on a window [k, k + 1] of width 1.
// The area under it splits into the grey unit square under y = 1 (area exactly 1, wherever the
// window sits) plus the signed area of cos(x): green where the curve is above y = 1, red where it
// is below. The total is 1 only when green and red cancel, which happens when the window's centre
// k + ½ sits on x = π/2, where cos(x) changes sign — so k = (π − 1)/2. Option buttons test each
// answer: B also balances (centred on 3π/2) but breaks 0 < k < 2; E puts the LEFT END at π/2.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Readout, Readouts, Region, Slider,
  clamp, integrate,
} from './kit'

const PI = Math.PI
const f = (x: number) => Math.cos(x) + 1
const KD = (PI - 1) / 2
const KB = (3 * PI - 1) / 2
const K_MAX = 5
const X_MAX = 6.5
const OPTIONS: [string, number][] = [
  ['A', 1],
  ['B', KB],
  ['C', PI - 1],
  ['D', KD],
  ['E', PI / 2],
]

const piTick = (v: number) => {
  const n = Math.round(v / (PI / 2))
  if (Math.abs(v - (n * PI) / 2) > 1e-6) return ''
  return ['', 'π/2', 'π', '3π/2', '2π'][n] ?? ''
}

export default function DensityWindow() {
  const [k, setK] = useState(0.3)
  const a = k
  const b = k + 1
  const green = integrate(x => Math.max(Math.cos(x), 0), a, b)
  const red = integrate(x => Math.max(-Math.cos(x), 0), a, b)
  const area = 1 + Math.sin(b) - Math.sin(a)
  const balanced = Math.abs(area - 1) < 0.004
  const allowed = k > 0 && k < 2
  const near = (v: number) => Math.abs(k - v) < 0.006

  let notice
  if (near(KD)) {
    notice = (
      <Notice tone="good">
        <b>Balanced.</b> The window&apos;s centre <M>{'k + \\tfrac12'}</M> sits exactly on <M>{'x = \\tfrac{\\pi}{2}'}</M>,
        where <M>\cos(x)</M> changes sign. The green piece above <M>y = 1</M> and the red piece below it are the same shape
        turned half a turn, so they cancel and the area is just the grey square&apos;s <M>1</M>. So{' '}
        <M>{'k + \\tfrac12 = \\tfrac{\\pi}{2}'}</M>, giving <M>{'k = \\tfrac{\\pi - 1}{2}'}</M>: option <b>D</b>.
      </Notice>
    )
  } else if (near(KB)) {
    notice = (
      <Notice tone="warn">
        <b>Also balanced</b>: the centre is on <M>{'\\tfrac{3\\pi}{2}'}</M>, the next place <M>\cos(x)</M> changes sign,
        so the area is exactly <M>1</M>. But <M>{'k \\approx 4.21'}</M> breaks the condition <M>{'0 < k < 2'}</M> (the
        green stretch of the <M>x</M>-axis). This is option <b>B</b>: it solves the equation, not the question.
      </Notice>
    )
  } else if (near(PI / 2)) {
    notice = (
      <Notice tone="warn">
        <M>{'k = \\tfrac{\\pi}{2}'}</M> puts the <b>left end</b> of the window at <M>{'\\tfrac{\\pi}{2}'}</M>, so the
        whole window sits where <M>{'\\cos(x) < 0'}</M>: all red, area <M>{'\\approx 0.54'}</M>. The centre belongs at{' '}
        <M>{'\\tfrac{\\pi}{2}'}</M>, not the left end. Option <b>E</b> is out.
      </Notice>
    )
  } else if (near(1)) {
    notice = (
      <Notice tone="warn">
        <M>k = 1</M> is close (area <M>{'\\approx 1.068'}</M>), but the centre <M>1.5</M> is just left of{' '}
        <M>{'\\tfrac{\\pi}{2} \\approx 1.571'}</M>, so the green piece is a little bigger than the red. Close isn&apos;t
        equal: option <b>A</b> is out. Try <b>D</b>.
      </Notice>
    )
  } else if (near(PI - 1)) {
    notice = (
      <Notice tone="warn">
        <M>{'k = \\pi - 1 \\approx 2.14'}</M> is outside <M>{'0 < k < 2'}</M>, and the whole window is red (it starts past <M>{'\\tfrac{\\pi}{2}'}</M>): area{' '}
        <M>{'\\approx 0.16'}</M>. Option <b>C</b> fails on both counts.
      </Notice>
    )
  } else if (!allowed) {
    notice = (
      <Notice tone="warn">
        The question says <M>{'0 < k < 2'}</M>, so the purple dot must stay on the green stretch of the{' '}
        <M>x</M>-axis. Out here the area is <M>{`${area.toFixed(3)}`}</M>
        {balanced ? <>, which happens to be <M>1</M>, but this <M>k</M> is not allowed.</> : '.'} Slide back left.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The grey square under <M>y = 1</M> has area <M>{'1 \\times 1 = 1'}</M> wherever the window is. So the total can
        only be <M>1</M> if the green area (where <M>\cos(x)</M> adds) and the red area (where it subtracts) cancel. Right
        now green <M>-</M> red <M>{`\\approx ${(green - red).toFixed(3)}`}</M>, so slide <M>k</M>{' '}
        {k < KD ? 'right' : 'left'} (keeping the purple dot on the green stretch, <M>{'0 < k < 2'}</M>), or test an
        option with the buttons.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, X_MAX]} y={[0, 2.2]} xStep={PI / 2} yStep={1} height={300} xLabels={piTick}>
        <Line.Segment point1={[0, 0]} point2={[2, 0]} color={C.good} weight={6} />
        <Region top={() => 1} bottom={() => 0} from={a} to={b} color={C.guide} opacity={0.35} />
        <Region top={x => Math.max(f(x), 1)} bottom={() => 1} from={a} to={b} color={C.good} opacity={0.5} />
        <Region top={() => 1} bottom={x => Math.min(f(x), 1)} from={a} to={b} color={C.bad} opacity={0.5} />
        <Line.Segment point1={[0, 1]} point2={[X_MAX, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[PI / 2, 0]} point2={[PI / 2, 2.2]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[(3 * PI) / 2, 0]} point2={[(3 * PI) / 2, 2.2]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={f} domain={[0, X_MAX]} color={C.f} weight={3} />
        <Line.Segment point1={[a, 0]} point2={[a, f(a)]} color={C.violet} weight={2} />
        <Line.Segment point1={[b, 0]} point2={[b, f(b)]} color={C.violet} weight={2} />
        <Line.Segment point1={[k + 0.5, 0]} point2={[k + 0.5, 2.05]} color={C.violet} style="dashed" weight={2} />
        <Label at={[k + 0.5, 2.05]} attach="n" color={C.violet} size={12}>
          centre
        </Label>
        <Label at={[X_MAX - 0.1, 0.35]} attach="w" color={C.f}>
          y = cos x + 1
        </Label>
        <MovablePoint point={[k, 0]} onMove={p => setK(clamp(p[0], 0, K_MAX))} constrain={p => [clamp(p[0], 0, K_MAX), 0]} color={C.violet} />
        <Label at={[k, 0.1]} attach="nw" color={C.violet}>
          k
        </Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={0} max={K_MAX} step={0.005} format={v => v.toFixed(3)} />
        <Buttons>
          <span className="text-sm text-gray-600 dark:text-gray-300">Test an option:</span>
          {OPTIONS.map(([letter, v]) => (
            <ActionButton key={letter} label={letter} onClick={() => setK(v)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout tex="\text{grey} = 1" />
          <Readout color={C.good} tex={`\\text{green} \\approx ${green.toFixed(3)}`} />
          <Readout color={C.bad} tex={`\\text{red} \\approx ${red.toFixed(3)}`} />
          <Readout
            color={balanced && allowed ? C.good : undefined}
            tex={`\\text{area} = 1 + \\text{green} - \\text{red} \\approx ${area.toFixed(3)}${balanced && allowed ? '\\ \\checkmark' : ''}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
