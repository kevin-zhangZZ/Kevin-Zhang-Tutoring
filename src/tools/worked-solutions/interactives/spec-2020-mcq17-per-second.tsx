// 2020 Specialist Exam 2 MCQ 17 — why acceleration is v·dv/dx and not dv/dx. Top: v = 1/x against
// position; its slope dv/dx is the change in velocity per METRE. Bottom: the same motion against
// time (taking x = 1 at t = 0, so x = √(2t + 1) and v = 1/√(2t + 1)); its slope is the
// acceleration, the change per SECOND. In one second the particle covers only v metres, so the
// green slope triangle on the top graph uses a run of v and drops v·dv/dx, matching the drop over
// 1 s on the bottom graph (−1/8 at x = 2). A toggle swaps in the run of 1 metre, whose drop is
// dv/dx = −1/4 (option A, 21%). At x = 1, v = 1 and the two coincide.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, Toggle, tick } from './kit'

const vx = (x: number) => 1 / x
const dvdx = (x: number) => -1 / (x * x)
const vt = (t: number) => 1 / Math.sqrt(2 * t + 1)
const dvdt = (t: number) => -Math.pow(2 * t + 1, -1.5)

/** Tangent segment through (px, py) with negative slope m, from px − back to px + fwd, trimmed so
 *  it stays inside 0 ≤ x and 0 ≤ y ≤ yMax (the planes' ranges) instead of running over the ticks. */
function tangent(px: number, py: number, m: number, back: number, fwd: number, yMax = 1.1): [[number, number], [number, number]] {
  const xa = Math.max(px - back, 0, px + (yMax - py) / m)
  const xb = Math.min(px + fwd, px - py / m)
  return [[xa, py + (xa - px) * m], [xb, py + (xb - px) * m]]
}

export default function PerSecond() {
  const [x0, setX0] = useState(2)
  const [wrong, setWrong] = useState(false)

  const v0 = vx(x0)
  const m = dvdx(x0)
  const t0 = (x0 * x0 - 1) / 2
  const a = dvdt(t0)
  const run = wrong ? 1 : v0 // metres in the top triangle
  const rise = m * run
  const atOne = x0 < 1.03
  const triX: [number, number][] = [[x0, v0], [x0 + run, v0], [x0 + run, v0 + rise]]
  const triT: [number, number][] = [[t0, v0], [t0 + 1, v0], [t0 + 1, v0 + a]]
  const topCol = wrong ? C.bad : C.good
  const [tx1, tx2] = tangent(x0, v0, m, 0.9, Math.min(1.4, 4.6 - x0))
  const [tt1, tt2] = tangent(t0, v0, a, 1.5, 2)

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        The red triangle runs a whole metre, so its drop <M>{`\\tfrac{dv}{dx} = ${m.toFixed(3)}`}</M> is the change in
        velocity <b>per metre</b>. But in one second the particle only covers <M>{`v = ${v0.toFixed(2)}`}</M> m, and the
        bottom graph drops only <M>{a.toFixed(3)}</M> per second. At <M>x = 2</M> the red drop is{' '}
        <M>{'-\\tfrac14'}</M>, option A, twice the true acceleration.
      </Notice>
    )
  } else if (atOne) {
    notice = (
      <Notice tone="good">
        At <M>x = 1</M> the particle moves at exactly <M>{'1\\text{ m s}^{-1}'}</M>, so one second of travel is one metre and
        &ldquo;per metre&rdquo; is the same as &ldquo;per second&rdquo;: here <M>{'\\tfrac{dv}{dx} = a = -1'}</M>. Anywhere
        else they differ by the factor <M>v</M>. Slide back to <M>x = 2</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The top slope, <M>{`\\tfrac{dv}{dx} = ${m.toFixed(3)}`}</M>, is the change in velocity per metre; acceleration is
        the change per second, the slope of the bottom graph. In one second the particle covers <M>{`v = ${v0.toFixed(2)}`}</M>{' '}
        m, so the green triangle runs <M>v</M> and drops <M>{`v\\tfrac{dv}{dx} = ${(v0 * m).toFixed(3)}`}</M>, the same
        drop as the bottom triangle over 1 s. Turn on &ldquo;Take a = dv/dx&rdquo; to see option A.
      </Notice>
    )
  }

  return (
    <div>
      <p className="text-[12px] font-semibold text-gray-600 dark:text-gray-400 mb-1">Velocity against position</p>
      <Plane x={[0, 4.6]} y={[0, 1.1]} xStep={1} yStep={0.25} height={210} xLabel="x" yLabel="v">
        <Plot.OfX y={vx} domain={[1, 4.6]} color={C.f} weight={3} />
        <Line.Segment point1={tx1} point2={tx2} color={C.guide} weight={1.5} />
        <Polygon points={triX} color={topCol} fillOpacity={0.25} weight={2} />
        <Point x={x0} y={v0} color={C.f} />
        <Label at={[x0 + run / 2, v0]} attach="n" color={topCol}>{wrong ? '1 m' : `${v0.toFixed(2)} m`}</Label>
        <Label at={[x0 + run, v0 + rise / 2]} attach="e" color={topCol}>{rise.toFixed(3).replace('-', '−')}</Label>
        <Label at={[4.6, 0.8]} attach="w" color={C.f}>v = 1/x</Label>
      </Plane>
      <p className="text-[12px] font-semibold text-gray-600 dark:text-gray-400 mt-3 mb-1">Velocity against time</p>
      <Plane x={[0, 8]} y={[0, 1.1]} xStep={1} yStep={0.25} height={210} xLabel="t" yLabel="v" yLabels={v => (v < 0.6 ? tick(v) : '')}>
        <Plot.OfX y={vt} domain={[0, 8]} color={C.g} weight={3} />
        <Line.Segment point1={tt1} point2={tt2} color={C.guide} weight={1.5} />
        <Polygon points={triT} color={C.good} fillOpacity={0.25} weight={2} />
        <Point x={t0} y={v0} color={C.g} />
        <Label at={[t0 + 0.5, v0]} attach="n" color={C.good}>1 s</Label>
        <Label at={[t0 + 1, v0 + a / 2]} attach="e" color={C.good}>{a.toFixed(3).replace('-', '−')}</Label>
        <Label at={[8, 0.8]} attach="w" color={C.g}>v = 1/√(2t + 1)</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={1} max={3.5} step={0.01} />
        <Buttons>
          <ActionButton label="x = 2" onClick={() => setX0(2)} />
          <Toggle label="Take a = dv/dx" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`v = ${v0.toFixed(3)},\\ \\frac{dv}{dx} = ${m.toFixed(3)}`} />
          <Readout color={C.good} tex={`v\\frac{dv}{dx} = ${(v0 * m).toFixed(3)}`} />
          <Readout color={C.g} tex={`a = \\frac{dv}{dt} = ${a.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
      <p className="text-[11.5px] text-gray-500 dark:text-gray-400 mt-2">
        The time graph assumes the particle is at <M>x = 1</M> when <M>t = 0</M>. Any other start only slides it sideways;
        the slope at each position is unchanged.
      </p>
    </div>
  )
}
