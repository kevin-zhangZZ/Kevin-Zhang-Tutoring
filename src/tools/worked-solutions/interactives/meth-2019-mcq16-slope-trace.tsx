// 2019 Methods Exam 2 MCQ 16 — the graph of f′ is a record of the SLOPE of f, not its height.
// Slide a tangent along a curve with the exam graph's features (flat at O, minimum at x = 5,
// x-intercept at x = 6) and watch f′ being traced underneath: f′ touches the axis at the
// stationary inflection, crosses at the minimum x = 5, and is already large and positive at the
// x-intercept x = 6. A toggle overlays option E's curve, which wrongly crosses at x = 6.
// Model rule: f(x) = x⁵(x − 6)/600, so f′(x) = x⁴(x − 5)/100 (both drawn to their own scale).

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle,
  usePlayer,
} from './kit'

const f = (x: number) => (x ** 5 * (x - 6)) / 600
const fp = (x: number) => (x ** 4 * (x - 5)) / 100
const optionE = (x: number) => (x ** 4 * (x - 6)) / 100

const X0 = -3
const X1 = 6.05
const xTicks = (v: number) => (v === 5 || v === 6 ? String(v) : '')

// Approximate pixels per unit of the top plane (for a tangent of roughly constant drawn length).
const PX_X = 62
const PX_Y = 25

export default function SlopeTrace() {
  const [x0, setX0] = useState(5.5)
  const [showE, setShowE] = useState(false)
  const player = usePlayer(setX0, { min: X0, max: X1, seconds: 9 })

  const m = fp(x0)
  const h = 60 / Math.sqrt(PX_X * PX_X + (m * PX_Y) ** 2)
  const sign = Math.abs(m) < 0.02 ? 0 : m > 0 ? 1 : -1
  const dot = sign === 0 ? C.good : sign > 0 ? C.good : C.g

  let notice
  if (showE && x0 >= 4.85 && x0 < 5.85) {
    notice = (
      <Notice tone="warn">
        At <M>x = 5</M> the tangent is horizontal, so <M>f'(5) = 0</M>, and just after it <M>f</M> is rising, so{' '}
        <M>{"f'(x) > 0"}</M>. Option E&apos;s dashed curve is still below the axis all the way to <M>x = 6</M>. E has put
        the crossing where <M>f</M> cuts the axis, which says nothing about its slope: slide to <M>x = 6</M> and look at
        how steep the tangent is there.
      </Notice>
    )
  } else if (x0 < -0.35) {
    notice = (
      <Notice>
        Left of the origin <M>f</M> is falling steeply, so the tangent slopes down and <M>f'(x)</M> is well below the axis.
        Press play (or drag the slider right) to watch <M>{"f'"}</M> being drawn from the slope, one point at a time.
      </Notice>
    )
  } else if (x0 <= 0.35) {
    notice = (
      <Notice tone="good">
        At the origin the tangent is horizontal, so <M>f'(0) = 0</M>. But <M>f</M> is falling on <b>both</b> sides: it
        flattens without turning around (a stationary point of inflection). So <M>{"f'"}</M> only touches the axis here and
        goes straight back down. It does not cross.
      </Notice>
    )
  } else if (x0 < 4.85) {
    notice = (
      <Notice>
        <M>f</M> is still falling, so <M>{"f'(x) < 0"}</M>. Where <M>f</M> falls most steeply, <M>{"f'"}</M> is at its
        lowest; as <M>f</M> levels out towards its minimum, <M>{"f'"}</M> climbs back towards <M>0</M>.
      </Notice>
    )
  } else if (x0 <= 5.15) {
    notice = (
      <Notice tone="good">
        The minimum turning point: the tangent is horizontal, so <M>f'(5) = 0</M>, and the slope changes from negative to
        positive. This is the <b>only</b> place where <M>{"f'"}</M> crosses the axis.
      </Notice>
    )
  } else if (x0 < 5.85) {
    notice = (
      <Notice>
        <M>f</M> is still <b>below</b> the axis here, but it is rising, so <M>{"f'(x) > 0"}</M> already. The height of{' '}
        <M>f</M> doesn&apos;t matter, only its slope. Keep going to <M>x = 6</M>, where <M>f</M> crosses the axis.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <M>f</M> crosses the <M>x</M>-axis at <M>x = 6</M>, but its tangent is steep here, so <M>f'(6)</M> is large and
        positive, nowhere near <M>0</M>. An <M>x</M>-intercept of <M>f</M> is not a feature of <M>{"f'"}</M>. Turn on
        &ldquo;Overlay option E&rdquo; to see the graph that makes this mistake.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, 6.6]} y={[-6, 4.2]} yStep={2} height={250} xLabels={xTicks} yLabels={false}>
        <Plot.OfX y={f} domain={[X0, 6.25]} color={C.f} weight={3} />
        <Line.Segment point1={[x0, -6]} point2={[x0, 4.2]} color={C.guide} style="dashed" weight={1} />
        <Line.Segment point1={[x0 - h, f(x0) - m * h]} point2={[x0 + h, f(x0) + m * h]} color={C.violet} weight={3} />
        <Point x={x0} y={f(x0)} color={C.violet} />
        <Label at={[-2.85, f(-2.85)]} color={C.f} attach="e">y = f(x)</Label>
      </Plane>
      <div className="h-2" />
      <Plane x={[X0, 6.6]} y={[-8, 14]} yStep={2} height={250} xLabels={xTicks} yLabels={false}>
        <Line.Segment point1={[x0, -8]} point2={[x0, 14]} color={C.guide} style="dashed" weight={1} />
        {showE && <Plot.OfX y={optionE} domain={[X0, 6.6]} color={C.bad} style="dashed" weight={2} />}
        {x0 > X0 + 0.01 && <Plot.OfX y={fp} domain={[X0, x0]} color={C.violet} weight={3} />}
        <Point x={x0} y={Math.min(fp(x0), 14)} color={dot} />
        <Label at={[-2.9, -6.6]} color={C.violet} attach="e">y = f′(x)</Label>
        {showE && <Label at={[4.6, optionE(4.6)]} color={C.bad} attach="s">option E</Label>}
      </Plane>
      <p className="mt-1 text-[12px] text-gray-500 dark:text-gray-400">
        Drawn with <M>{'f(x) = \\tfrac{1}{600}x^5(x-6)'}</M>, a rule with the exam graph&apos;s features; each graph has its
        own vertical scale.
      </p>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={X0}
          max={X1}
          step={0.01}
        />
        <Buttons>
          <PlayButton
            playing={player.playing}
            onClick={() => {
              if (!player.playing) setX0(X0)
              player.toggle(X0)
            }}
            label="Trace f′ from the left"
          />
          <Toggle label="Overlay option E" checked={showE} onChange={setShowE} />
        </Buttons>
        <Readouts>
          <Readout tex={`x = ${x0.toFixed(2)}`} />
          <Readout color={dot} tex={`\\text{slope of } f = f'(x) \\approx ${m.toFixed(2)}`} />
          <Readout
            color={dot}
            tex={sign === 0 ? `f' = 0:\\ \\text{on the axis}` : sign > 0 ? `f \\text{ rising} \\Rightarrow f' > 0` : `f \\text{ falling} \\Rightarrow f' < 0`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
