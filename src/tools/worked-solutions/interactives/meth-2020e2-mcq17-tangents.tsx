// 2020 Methods Exam 2 MCQ 17 — slide the tangent along f(x) = −log_e(x + 2) and watch where it
// crosses the y-axis. The curve is concave up (f″(x) = 1/(x + 2)² > 0), so every tangent lies
// underneath it: at x = 0 a tangent is below the curve's own y-intercept f(0) = −log_e 2 (the red gap)
// unless it touches the curve right there, when c = f(0). That is the maximum, option C. A toggle
// draws several tangents at once, as both video tutors do on paper; another marks the five options
// on the y-axis, showing B (−1 + log_e 2 ≈ −0.31) and E (log_e 2 ≈ 0.69) sitting ABOVE f(0), where
// no tangent can reach. Intercepts from c(a) = −log_e(a + 2) + a/(a + 2) (checked with sympy:
// c(−1) = −1, the tangent at the x-intercept, option A; c(0) = −log_e 2; dc/da = −a/(a + 2)²).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, clamp, num,
} from './kit'

const LN2 = Math.log(2)
const f = (x: number) => -Math.log(x + 2)
const fp = (x: number) => -1 / (x + 2)
/** y-intercept of the tangent at x = a. */
const cOf = (a: number) => f(a) - a * fp(a)
const F0 = -LN2

const X: [number, number] = [-2.4, 4.4]
const Y: [number, number] = [-3.4, 2.6]
const A_MIN = -1.6
const A_MAX = 4
// Where the curve leaves the top of the view, so the plotted curve stops at the edge.
const TOP = Y[1] + 0.45
const X_START = Math.exp(-TOP) - 2
const SMALL = { r: 4.5 }

const GHOSTS = [-1.5, -1, 1, 4]
const OPTIONS: { letter: string; value: number; tex: string }[] = [
  { letter: 'E', value: LN2, tex: '\\log_e(2)' },
  { letter: 'B', value: -1 + LN2, tex: '-1+\\log_e(2)' },
  { letter: 'C', value: -LN2, tex: '-\\log_e(2)' },
  { letter: 'A', value: -1, tex: '-1' },
  { letter: 'D', value: -1 - LN2, tex: '-1-\\log_e(2)' },
]

/** Snap to a = 0 (the answer) or a = −1 (the x-intercept) when close. */
const snap = (a: number) => (Math.abs(a) < 0.04 ? 0 : Math.abs(a + 1) < 0.03 ? -1 : a)

const SAMPLES = Array.from({ length: 801 }, (_, i) => A_MIN + ((A_MAX - A_MIN) * i) / 800)
function nearestOnF([mx, my]: [number, number]): number {
  let best = 0
  let bestD = Infinity
  for (const x of SAMPLES) {
    const d = ((x - mx) / (X[1] - X[0])) ** 2 + ((f(x) - my) / (Y[1] - Y[0])) ** 2
    if (d < bestD) {
      bestD = d
      best = x
    }
  }
  return best
}

export default function Tangents() {
  const [a, setA] = useState(-1)
  const [ghosts, setGhosts] = useState(false)
  const [options, setOptions] = useState(false)
  const set = (v: number) => setA(snap(clamp(Math.round(v * 100) / 100, A_MIN, A_MAX)))

  const fa = f(a)
  const slope = fp(a)
  const c = cOf(a)
  const atZero = a === 0
  const gap = F0 - c
  const tanColor = atZero ? C.good : C.g

  let notice
  if (options) {
    notice = (
      <Notice>
        The dots on the <M>y</M>-axis are the five options. <b>B</b> <M>{'(\\approx -0.31)'}</M> and <b>E</b>{' '}
        <M>{'(\\approx 0.69)'}</M> are <i>above</i> the curve&apos;s own <M>y</M>-intercept <M>{'f(0) \\approx -0.69'}</M>. A
        tangent to this curve always runs underneath it, so it can never cross the <M>y</M>-axis up there: B and E are
        impossible. <b>A</b> and <b>D</b> are below, so some tangent does reach each of them (A is the tangent at{' '}
        <M>{'x = -1'}</M>), but they aren&apos;t the highest. Only <b>C</b>, the curve&apos;s own intercept, is the
        maximum.
      </Notice>
    )
  } else if (atZero) {
    notice = (
      <Notice tone="good">
        <b>The tangent now touches the curve on the <M>y</M>-axis itself</b>, so where it crosses the axis is the point of
        contact: <M>{'c = f(0) = -\\log_e(2) \\approx -0.69'}</M>. Every other tangent passes <i>under</i> this point, so
        no tangent can cross the <M>y</M>-axis any higher. The maximum value of <M>c</M> is <M>{'-\\log_e(2)'}</M>, option C.
      </Notice>
    )
  } else if (ghosts) {
    notice = (
      <Notice>
        Four tangents at once (grey), and each one crosses the <M>y</M>-axis <i>below</i> the point{' '}
        <M>{'(0, f(0))'}</M>. Wherever the tangent touches, the curve bends up and away from it on both sides, so the
        tangent is under the curve everywhere else, including at <M>x = 0</M>. Now slide the orange tangent to{' '}
        <M>x = 0</M>.
      </Notice>
    )
  } else if (a === -1) {
    notice = (
      <Notice>
        This is the tangent at the <M>x</M>-intercept <M>(-1, 0)</M>: gradient <M>{"f'(-1) = -1"}</M>, so it is{' '}
        <M>{'y = -x - 1'}</M> and crosses the <M>y</M>-axis at <M>c = -1</M> (option A). The curve itself crosses the{' '}
        <M>y</M>-axis higher, at <M>{'f(0) \\approx -0.69'}</M>: the red gap. Slide the tangent point towards the{' '}
        <M>y</M>-axis and watch the gap shrink.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The tangent touches the curve at <M>{`x = ${num(a)}`}</M> and then stays <i>underneath</i> it on both sides: the
        curve is concave up (it bends upwards everywhere, <M>{"f''(x) = \\frac{1}{(x+2)^2} > 0"}</M>). So at{' '}
        <M>x = 0</M> the tangent is below the curve&apos;s own <M>y</M>-intercept, by the red gap{' '}
        <M>{`\\approx ${num(gap, 3)}`}</M>, and <M>{`c \\approx ${num(c, 3)}`}</M>. Slide{' '}
        {a < 0 ? 'right' : 'left'}, towards <M>x = 0</M>.
      </Notice>
    )
  }

  return (
    <div>
      {/* Tick numbers left out: x = −3 (cut off at the edge), y = −1 (on the curve beside the
          options) and y = 3 (under the axis name). */}
      <Plane
        x={X}
        y={Y}
        xStep={1}
        yStep={1}
        height={320}
        xLabels={v => (v < -2.5 ? '' : String(v).replace('-', '−'))}
        yLabels={v => (v === -1 || v > 2.5 ? '' : String(v).replace('-', '−'))}
      >
        <Line.Segment point1={[-2, Y[0]]} point2={[-2, TOP]} color={C.f} style="dashed" weight={1.5} />
        <Label at={[-2, Y[0]]} color={C.f} attach="ne" size={12}>x = −2</Label>
        {ghosts &&
          GHOSTS.map(g => (
            <Line.PointSlope key={g} point={[g, f(g)]} slope={fp(g)} color={C.guide} weight={1.5} opacity={0.7} />
          ))}
        <Plot.OfX y={f} domain={[X_START, X[1]]} color={C.f} weight={3} />
        <Label at={[3.2, f(3.2)]} color={C.f} attach="n" gap={9} size={12}>y = f(x)</Label>
        <Line.PointSlope point={[a, fa]} slope={slope} color={tanColor} weight={2.5} />
        {ghosts &&
          GHOSTS.map(g => (
            <Point key={g} x={0} y={cOf(g)} color={C.guide} svgCircleProps={SMALL} />
          ))}
        {!atZero && gap > 0.02 && <Line.Segment point1={[0, c]} point2={[0, F0]} color={C.bad} weight={5} />}
        <Point x={0} y={F0} color={atZero ? C.good : C.f} svgCircleProps={SMALL} />
        {/* At a = 0, P sits on this point with its label above-right, so this one goes below-left
            (clear of the tangent, which rises to the left). */}
        {!options && (
          <Label at={[0, F0]} color={atZero ? C.good : C.f} attach={atZero ? 'sw' : 'ne'} size={12} gap={atZero ? 10 : 7}>
            {atZero ? 'c = f(0)' : 'f(0)'}
          </Label>
        )}
        {!atZero && c > Y[0] && (
          <>
            <Point x={0} y={c} color={C.g} svgCircleProps={SMALL} />
            {!options && <Label at={[0, c]} color={C.g} attach="sw" size={13} italic>c</Label>}
          </>
        )}
        {options &&
          OPTIONS.map(o => {
            const color = o.letter === 'C' ? C.good : o.value > F0 ? C.bad : C.guide
            return (
              <g key={o.letter}>
                <Point x={0} y={o.value} color={color} svgCircleProps={SMALL} />
                <Label at={[0, o.value]} color={color} attach={o.letter === 'C' ? 'ne' : 'w'} size={12} gap={8}>
                  {o.letter}
                </Label>
              </g>
            )
          })}
        <Label at={[a, fa]} color={tanColor} attach={a < -1.2 ? 'e' : 'ne'} gap={12}>P</Label>
        <MovablePoint point={[a, fa]} onMove={p => set(nearestOnF(p))} color={tanColor} />
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={set} min={A_MIN} max={A_MAX} step={0.05} format={v => num(v)} />
        <Buttons>
          <ActionButton label="Touch at x = 0" onClick={() => set(0)} />
          <Toggle label="Draw several tangents" checked={ghosts} onChange={setGhosts} />
          <Toggle label="Mark the options on the y-axis" checked={options} onChange={setOptions} />
        </Buttons>
        <Readouts>
          <Readout color={tanColor} tex={`\\text{tangent at } x = ${num(a)}\\text{: } c ${atZero ? '= -\\log_e(2)' : `\\approx ${num(c, 3)}`}`} />
          <Readout color={atZero ? C.good : C.f} tex="f(0) = -\log_e(2) \approx -0.693" />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag P along the curve, or slide <M>a</M>, the x-coordinate where the tangent touches.</p>
        {notice}
      </Controls>
    </div>
  )
}
