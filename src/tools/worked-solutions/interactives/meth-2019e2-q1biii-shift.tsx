// 2019 Methods Exam 2 Q1b.iii — f(x) + d is the graph of f(x) = x²e^(−x²) slid vertically by d.
// Slide d down and watch the red strips (where f(x) + d ≥ 0) shrink: the origin drops below the
// axis as soon as d < 0, but the last points to go under are the two peaks at x = ±1, height
// 1/e + d. A button sets d = −1/e exactly, where the peaks touch the axis and "always negative"
// still fails — hence the strict inequality d < −1/e.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle } from './kit'

const f = (x: number) => x * x * Math.exp(-x * x)
const INV_E = 1 / Math.E
const fmt = (v: number) => (Math.abs(v) < 5e-4 ? '0' : v.toFixed(3))

export default function ShiftDown() {
  const [d, setD] = useState(-0.2)
  const [showF, setShowF] = useState(true)

  const peak = INV_E + d
  const critical = Math.abs(peak) < 1e-9
  const ok = peak < -1e-9
  const peakColor = critical ? C.g : ok ? C.good : C.bad

  let notice
  if (d >= 0) {
    notice = (
      <Notice>
        With <M>d \ge 0</M> nothing is below the axis: even the lowest point, the origin, sits at height{' '}
        <M>d \ge 0</M>. Slide <M>d</M> to negative values.
      </Notice>
    )
  } else if (!ok && !critical) {
    notice = (
      <Notice tone="warn">
        The origin (height <M>d</M>) is below the axis now, but the two peaks are still above it at height{' '}
        <M>{`\\tfrac1e + d \\approx ${fmt(peak)}`}</M>. The red strips show where <M>f(x) + d \ge 0</M>. So{' '}
        <M>{'d < 0'}</M> isn&apos;t enough, because the <b>highest</b> points decide it. Keep sliding down.
      </Notice>
    )
  } else if (critical) {
    notice = (
      <Notice tone="warn">
        At exactly <M>{'d = -\\tfrac1e'}</M> the peaks touch the axis: <M>{'f(\\pm1) + d = \\tfrac1e - \\tfrac1e = 0'}</M>.
        Zero is not negative, so this value of <M>d</M> fails &ldquo;always negative&rdquo;. That&apos;s why the answer
        has a strict inequality.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Every point is below the axis, peaks included: the highest value is{' '}
        <M>{`\\tfrac1e + d \\approx ${fmt(peak)} < 0`}</M>. This works for every <M>d</M> below{' '}
        <M>{'-\\tfrac1e \\approx -0.368'}</M> and fails at <M>{'-\\tfrac1e'}</M> itself, so the answer is{' '}
        <M>{'d < -\\tfrac1e'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 3]} y={[-0.85, 0.6]} xStep={1} yStep={0.2} height={300} yLabels={v => (Math.abs(v - d) < 0.07 || Math.abs(v - 0.2) < 1e-6 ? "" : v.toFixed(1))}>
        <Region top={x => Math.max(f(x) + d, 0)} bottom={() => 0} from={-3.3} to={3.3} color={C.bad} opacity={0.4} />
        {showF && <Plot.OfX y={f} domain={[-3.3, 3.3]} color={C.guide} style="dashed" weight={2} />}
        <Plot.OfX y={x => f(x) + d} domain={[-3.3, 3.3]} color={C.f} weight={3} />
        <Point x={-1} y={peak} color={peakColor} />
        <Point x={1} y={peak} color={peakColor} />
        <Label at={[1, peak]} color={peakColor} attach="e" gap={14}>
          1/e + d
        </Label>
        {showF && (
          <Label at={[-1, INV_E]} color={C.guide} attach="nw">
            f(x)
          </Label>
        )}
        <Label at={[-2.95, f(-2.95) + d]} color={C.f} attach="se">
          f(x) + d
        </Label>
      </Plane>
      <Controls>
        <Slider
          label="d"
          value={d}
          onChange={setD}
          min={-0.8}
          max={0.3}
          step={0.005}
          format={v => (Math.abs(v + INV_E) < 1e-9 ? '−1/e' : v.toFixed(3))}
        />
        <Buttons>
          <ActionButton label="Set d = −1/e exactly" onClick={() => setD(-INV_E)} />
          <Toggle label="Show f (d = 0)" checked={showF} onChange={setShowF} />
        </Buttons>
        <Readouts>
          <Readout color={peakColor} tex={`\\text{highest value: } \\tfrac1e + d \\approx ${fmt(peak)}`} />
          <Readout
            color={ok ? C.good : C.bad}
            tex={`f(x)+d<0\\ \\text{for every } x?\\ \\ \\text{${ok ? 'yes' : 'no'}}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
