// 2017 Methods Exam 1 Q3b — why the graph of f(x) = (x+2)²(x−1) on [−3, 0] levels off at (0, −4).
// Slide a tangent along f: its gradient f'(x) = 3x(x+2) is positive on (−3, −2), zero at the touch
// point (−2, 0), steepest at the inflection x = −1 and back to zero at x = 0, so the curve arrives
// FLAT at the y-intercept. Two toggles show the examiner's-report errors failing: an inverted
// parabola −(x+2)² through the same points (still falling at gradient −4 when it reaches the
// y-axis) and the rest of the cubic over R (bottoming out at x = 0 and climbing through (1, 0)).

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle,
  usePlayer,
} from './kit'

const f = (x: number) => (x + 2) ** 2 * (x - 1)
const df = (x: number) => 3 * x * (x + 2)
const p = (x: number) => -((x + 2) ** 2)
const dp = (x: number) => -2 * (x + 2)

/** Fixed-dp number for TeX (ASCII minus, no "-0.00"). */
const t = (v: number, d = 2) => (Math.abs(v) < 0.5 * 10 ** -d ? (0).toFixed(d) : v.toFixed(d))

/** Endpoints of a tangent segment of roughly constant on-screen length (x-units are ~3× wider). */
function tangent(x0: number, y0: number, m: number, len = 0.7): [[number, number], [number, number]] {
  const dx = len / Math.sqrt(1 + (m / 3) ** 2)
  return [
    [x0 - dx, y0 - m * dx],
    [x0 + dx, y0 + m * dx],
  ]
}

export default function FlatEnd() {
  const [x0, setX0] = useState(-1)
  const [parab, setParab] = useState(false)
  const [wholeR, setWholeR] = useState(false)
  const player = usePlayer(setX0, { min: -3, max: 0, seconds: 7 })

  const y0 = f(x0)
  const m = df(x0)
  const [a, b] = tangent(x0, y0, m)
  const onRight = x0 >= -2
  const [pa, pb] = tangent(x0, p(x0), dp(x0))

  const near = (v: number) => Math.abs(x0 - v) <= 0.05

  let notice
  if (wholeR) {
    notice = (
      <Notice tone="warn">
        This grey curve is the rest of <M>{'y=(x+2)^2(x-1)'}</M> as if the domain were <M>R</M>. The cubic bottoms out at{' '}
        <M>(0,-4)</M> and climbs back up through <M>(1,0)</M>. But <M>f</M>&apos;s domain is <M>[-3,0]</M>, so none of the
        grey belongs on your sketch, and the <M>x</M>-intercept <M>x=1</M> is not an intercept of <M>f</M>. Notice the
        domain stops <b>exactly at the bottom of the dip</b>, and that is why <M>{"f'(0)=0"}</M>.
      </Notice>
    )
  } else if (parab && !onRight) {
    notice = (
      <Notice>
        The red inverted parabola <M>{'y=-(x+2)^2'}</M> is drawn on <M>[-2,0]</M>, the stretch where the two sketches
        differ. Slide <M>x</M> past <M>-2</M> and compare the two tangents.
      </Notice>
    )
  } else if (parab) {
    notice = (
      <Notice tone="warn">
        Both curves touch the axis at <M>(-2,0)</M> and pass through <M>(0,-4)</M>, so both &ldquo;look right&rdquo; at
        the labelled points. The difference is the gradient. The parabola arrives at the <M>y</M>-axis still falling
        (gradient <M>-4</M>), but <M>{"f'(0)=3(0)(2)=0"}</M>, so <M>f</M> must arrive <b>flat</b>. Slide to <M>x=0</M>{' '}
        to see the two tangents side by side. That flat arrival is the stationary point the report says students missed.
      </Notice>
    )
  } else if (near(-3)) {
    notice = (
      <Notice>
        <b>Left endpoint <M>(-3,-4)</M>.</b> Here <M>{"f'(-3)=3(-3)(-1)=9"}</M>, so the curve starts by climbing
        steeply. It is an endpoint, not a stationary point: draw a closed dot and label it. Press play to sweep across
        the domain.
      </Notice>
    )
  } else if (x0 < -2.05) {
    notice = (
      <Notice>
        On <M>(-3,-2)</M> both factors of <M>{"f'(x)=3x(x+2)"}</M> are negative, so <M>{"f'(x)>0"}</M>: the curve
        rises. Watch the tangent flatten as <M>x+2</M> shrinks towards <M>0</M>.
      </Notice>
    )
  } else if (near(-2)) {
    notice = (
      <Notice tone="good">
        <b>Turning point <M>(-2,0)</M>.</b> The tangent is horizontal because <M>{"f'(-2)=0"}</M>, and it lies along the{' '}
        <M>x</M>-axis. The squared factor <M>{'(x+2)^2'}</M> never changes sign, so the curve touches the axis here and
        turns back down instead of crossing.
      </Notice>
    )
  } else if (x0 < -1.05) {
    notice = (
      <Notice>
        Now <M>{"f'(x)<0"}</M> (<M>x</M> is negative, <M>x+2</M> is positive), so the curve falls, and it is falling{' '}
        <b>faster</b> each step. Keep sliding right: the steepening doesn&apos;t last.
      </Notice>
    )
  } else if (near(-1)) {
    notice = (
      <Notice>
        <b>Steepest point, <M>(-1,-2)</M>.</b> Here <M>{"f'(-1)=-3"}</M>, the most negative gradient on the domain. The
        curve changes from bending down to bending up: this is a point of inflection. A parabola never does this, and
        it is what makes the shape a cubic. Now slide towards <M>x=0</M>.
      </Notice>
    )
  } else if (x0 < -0.05) {
    notice = (
      <Notice>
        Still falling, but <b>flattening</b>: in <M>{"f'(x)=3x(x+2)"}</M> the factor <M>x</M> is heading to <M>0</M>, so
        the gradient shrinks towards <M>0</M> as well. The curve is easing into the <M>y</M>-axis, not diving through it.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>Stationary point at the <M>y</M>-intercept, <M>(0,-4)</M>.</b> Because <M>{"f'(0)=0"}</M>, the tangent is
        horizontal: the curve arrives flat. Turn on &ldquo;Inverted parabola&rdquo; to see the sketch the examiners
        warned about, which misses this.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3.5, 1.5]} y={[-5, 1]} xStep={1} yStep={1} height={320}>
        {wholeR && (
          <>
            <Plot.OfX y={f} domain={[-3.85, -3]} color={C.guide} weight={2.5} style="dashed" />
            <Plot.OfX y={f} domain={[0, 1.85]} color={C.guide} weight={2.5} style="dashed" />
            <Point x={1} y={0} color={C.guide} />
            <Label at={[1, 0]} color={C.guide} attach="nw">(1, 0)</Label>
          </>
        )}
        {parab && (
          <>
            <Plot.OfX y={p} domain={[-2, 0]} color={C.bad} weight={2.5} style="dashed" />
            <Label at={[-1.05, p(-1.05)]} color={C.bad} attach="ne">parabola</Label>
          </>
        )}
        <Plot.OfX y={f} domain={[-3, 0]} color={C.f} weight={3} />
        <Label at={[-2.7, f(-2.7)]} color={C.f} attach="w">f</Label>
        <Point x={-3} y={-4} color={C.f} />
        <Point x={-2} y={0} color={C.f} />
        <Point x={0} y={-4} color={C.f} />
        <Label at={[-3, -4]} attach="se">(−3, −4)</Label>
        <Label at={[-2, 0]} attach="n">(−2, 0)</Label>
        <Label at={[0, -4]} attach="sw">(0, −4)</Label>
        {parab && onRight && (
          <>
            <Line.Segment point1={pa} point2={pb} color={C.bad} weight={2} style="dashed" />
            <Point x={x0} y={p(x0)} color={C.bad} />
          </>
        )}
        <Line.Segment point1={a} point2={b} color={C.g} weight={3} />
        <Point x={x0} y={y0} color={C.g} />
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={-3}
          max={0}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep from −3 to 0" />
          <Toggle
            label="Inverted parabola"
            checked={parab}
            onChange={v => {
              setParab(v)
              if (v) setWholeR(false)
            }}
          />
          <Toggle
            label="What if the domain were R?"
            checked={wholeR}
            onChange={v => {
              setWholeR(v)
              if (v) setParab(false)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`f(${t(x0)}) = ${t(y0)}`} />
          <Readout color={C.g} tex={`f'(${t(x0)}) = 3(${t(x0)})(${t(x0 + 2)}) = ${t(m)}`} />
          {parab && onRight && <Readout color={C.bad} tex={`\\text{parabola gradient} = -2(${t(x0 + 2)}) = ${t(dp(x0))}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
