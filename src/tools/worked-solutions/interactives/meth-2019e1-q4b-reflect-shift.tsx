// 2019 Methods Exam 1 Q4b — building g(x) = 1 − f(x) = −f(x) + 1 from f(x) = cos(x/2) on [−2π, π]
// in the two moves the rule describes, then seeing why g crosses f exactly where part a. said.
// Step 1: f with its key points (−2π, −1), (0, 1), (π, 0). Step 2: reflect in the x-axis, y = −f(x):
// (−2π, 1), (0, −1), (π, 0). Step 3: translate up 1, y = g(x): (−2π, 2), (0, 0), (π, 1) — the same
// shape, not stretched, starting flat at (−2π, 2) (g′(−2π) = 0), inflecting at (−π, 1). Step 4: since
// f + g = 1, every point of g is the reflection of f's point in the line y = ½, so the graphs can only
// meet on y = ½, where cos(x/2) = ½: (±2π/3, ½), part a.'s answers. A slider carries one point through
// every move. The toggle shows the report's "forgot the translation" sketch, y = −f(x), which
// crosses f at (−π, 0) and (π, 0) instead (cos(x/2) = 0) — a mismatch with part a. that gives it
// away. All values checked with sympy.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, StepNav, Toggle, Vector, num,
  useSteps,
} from './kit'

const PI = Math.PI
const XMIN = -2 * PI
const XMAX = PI
const f = (x: number) => Math.cos(x / 2)
const nf = (x: number) => -f(x)
const g = (x: number) => 1 - f(x)
const KEY = [XMIN, 0, XMAX]
const X1 = (-2 * PI) / 3
const X2 = (2 * PI) / 3

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

/** x as a multiple of π for the slider (a multiple of π/24), e.g. "−4π/3". */
function piText(v: number): string {
  const k = Math.round((v / PI) * 24)
  if (k === 0) return '0'
  const d0 = gcd(Math.abs(k), 24)
  const n = k / d0
  const d = 24 / d0
  const s = n < 0 ? '−' : ''
  const top = Math.abs(n) === 1 ? 'π' : `${Math.abs(n)}π`
  return d === 1 ? s + top : `${s}${top}/${d}`
}

function piTex(v: number): string {
  const k = Math.round((v / PI) * 24)
  if (k === 0) return '0'
  const d0 = gcd(Math.abs(k), 24)
  const n = k / d0
  const d = 24 / d0
  const s = n < 0 ? '-' : ''
  const top = Math.abs(n) === 1 ? '\\pi' : `${Math.abs(n)}\\pi`
  return d === 1 ? s + top : `${s}\\tfrac{${top}}{${d}}`
}

/** y tick numbers: 1 is left off, because the key points (0, 1), (−2π, 1) and (π, 1) sit on it and
 *  carry their own labels. */
const yTicks = (v: number) => (Math.abs(v - 1) < 1e-9 ? '' : String(v).replace('-', '−'))

const TITLES = ['Start with f', 'Reflect in the x-axis', 'Translate up 1', 'Check against part a']

export default function ReflectShift() {
  const steps = useSteps(4)
  const s = steps.step
  const [x, setX] = useState((-4 * PI) / 3)
  const [noShift, setNoShift] = useState(false)
  const wrong = s === 3 && noShift
  const atCross = s === 3 && !wrong && (Math.abs(x - X1) < 0.02 || Math.abs(x - X2) < 0.02)

  let notice
  if (s === 0) {
    notice = (
      <Notice>
        <b>{TITLES[0]}.</b> This is <M>{'f(x) = \\cos\\left(\\tfrac{x}{2}\\right)'}</M>, as printed on the exam axes. Read{' '}
        <M>{'g(x) = 1 - f(x)'}</M> as <M>{'-f(x) + 1'}</M>: two moves in order, a reflection in the <M>x</M>-axis (the minus
        sign) then a translation up <M>1</M> (the <M>+1</M>). The slider carries one point of <M>f</M> through both moves. Press
        Next.
      </Notice>
    )
  } else if (s === 1) {
    notice = (
      <Notice>
        <b>{TITLES[1]}.</b> Every <M>y</M>-value changes sign and <M>x</M> stays put: <M>{'(-2\\pi, -1) \\to (-2\\pi, 1)'}</M>,{' '}
        <M>{'(0, 1) \\to (0, -1)'}</M>, and <M>{'(\\pi, 0)'}</M> does not move because it is on the axis. Same shape, no
        stretch: <M>f</M>&apos;s flat start at the bottom becomes a flat start at the top.
      </Notice>
    )
  } else if (s === 2) {
    notice = (
      <Notice>
        <b>{TITLES[2]}.</b> Lift every point up <M>1</M>. The endpoints of <M>g</M> are <M>{'(-2\\pi, 2)'}</M> and{' '}
        <M>{'(\\pi, 1)'}</M>, and the turning point lands on the origin. Watch the curvature: <M>g</M> starts{' '}
        <b>flat</b> at <M>{'(-2\\pi, 2)'}</M>, bends over at <M>{'(-\\pi, 1)'}</M>, and is U-shaped around <M>{'(0, 0)'}</M>.
      </Notice>
    )
  } else if (wrong) {
    notice = (
      <Notice tone="warn">
        Without the <M>+1</M> you have <M>{'y = -\\cos\\left(\\tfrac{x}{2}\\right)'}</M> (red). It meets <M>f</M> where{' '}
        <M>{'-\\cos\\left(\\tfrac{x}{2}\\right) = \\cos\\left(\\tfrac{x}{2}\\right)'}</M>, i.e. <M>{'\\cos\\left(\\tfrac{x}{2}\\right) = 0'}</M>:
        at <M>{'(-\\pi, 0)'}</M> and <M>{'(\\pi, 0)'}</M>. But part a. says the graphs meet at <M>{'x = \\pm\\tfrac{2\\pi}{3}'}</M>, so a
        sketch crossing <M>f</M> anywhere else must be wrong.
      </Notice>
    )
  } else if (atCross) {
    notice = (
      <Notice tone="good">
        <b>Here the two points coincide</b>: <M>{'f(x) = g(x) = \\tfrac12'}</M>. A point can only be its own mirror image if it
        is on the mirror, which is why every crossing sits on <M>{'y = \\tfrac12'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <b>{TITLES[3]}.</b> Since <M>{'f(x) + g(x) = 1'}</M>, the point halfway between them is always at height{' '}
        <M>{'\\tfrac12'}</M>: <M>g</M> is <M>f</M> reflected in the line <M>{'y = \\tfrac12'}</M>. So they can only cross where{' '}
        <M>{'\\cos\\left(\\tfrac{x}{2}\\right) = \\tfrac12'}</M>, which is part a.: <M>{'\\left(\\pm\\tfrac{2\\pi}{3}, \\tfrac12\\right)'}</M>.
        Drag <M>x</M> onto a crossing.
      </Notice>
    )
  }

  // The tracked point before and after the current move.
  const from = s === 2 ? nf(x) : f(x)
  const to = s === 0 ? f(x) : s === 1 ? nf(x) : wrong ? nf(x) : g(x)

  let readouts
  if (s === 0) readouts = [<Readout key="a" color={C.f} tex={`f(x) \\approx ${num(f(x))}`} />]
  else if (s === 1)
    readouts = [
      <Readout key="a" color={C.f} tex={`f(x) \\approx ${num(f(x))}`} />,
      <Readout key="b" color={C.violet} tex={`-f(x) \\approx ${num(nf(x))}`} />,
    ]
  else if (s === 2)
    readouts = [
      <Readout key="a" color={C.violet} tex={`-f(x) \\approx ${num(nf(x))}`} />,
      <Readout key="b" color={C.g} tex={`g(x) = -f(x) + 1 \\approx ${num(g(x))}`} />,
    ]
  else if (wrong)
    readouts = [
      <Readout key="a" color={C.f} tex={`f(x) \\approx ${num(f(x))}`} />,
      <Readout key="b" color={C.bad} tex={`-f(x) \\approx ${num(nf(x))}`} />,
    ]
  else
    readouts = [
      <Readout key="a" color={C.f} tex={`f(x) \\approx ${num(f(x))}`} />,
      <Readout key="b" color={C.g} tex={`g(x) \\approx ${num(g(x))}`} />,
      <Readout key="c" color={C.guide} tex={`\\tfrac{f(x) + g(x)}{2} = \\tfrac12`} />,
    ]

  return (
    <div>
      <Plane x={[XMIN, XMAX]} y={[-1.5, 2.5]} xStep={PI / 3} yStep={1} height={320} xLabels={false} yLabels={s === 1 || wrong ? v => (Math.abs(v - 2) < 1e-9 ? '2' : '') : yTicks}>
        {/* the curves */}
        {s === 1 && <Plot.OfX y={f} domain={[XMIN, XMAX]} color={C.f} weight={2} opacity={0.35} />}
        {s === 2 && <Plot.OfX y={nf} domain={[XMIN, XMAX]} color={C.violet} weight={2} style="dashed" opacity={0.6} />}
        {s === 3 && <Line.Segment point1={[XMIN, 0.5]} point2={[XMAX, 0.5]} color={C.guide} style="dashed" weight={1.5} />}
        {(s === 0 || s === 3) && <Plot.OfX y={f} domain={[XMIN, XMAX]} color={C.f} weight={3} />}
        {s === 1 && <Plot.OfX y={nf} domain={[XMIN, XMAX]} color={C.violet} weight={3} />}
        {(s === 2 || (s === 3 && !wrong)) && <Plot.OfX y={g} domain={[XMIN, XMAX]} color={C.g} weight={3} />}
        {wrong && <Plot.OfX y={nf} domain={[XMIN, XMAX]} color={C.bad} weight={3} />}

        {/* key points moving with each step */}
        {s === 1 && KEY.filter(k => Math.abs(f(k)) > 1e-9).map(k => <Vector key={k} tail={[k, f(k)]} tip={[k, nf(k)]} color={C.guide} weight={1.5} />)}
        {s === 2 && KEY.map(k => <Vector key={k} tail={[k, nf(k)]} tip={[k, g(k)]} color={C.guide} weight={1.5} />)}
        {s === 0 && KEY.map(k => <Point key={k} x={k} y={f(k)} color={C.f} />)}
        {s === 1 && KEY.map(k => <Point key={k} x={k} y={nf(k)} color={C.violet} />)}
        {s === 2 && KEY.map(k => <Point key={k} x={k} y={g(k)} color={C.g} />)}
        {s === 3 && !wrong && [XMIN, XMAX].map(k => <Point key={k} x={k} y={g(k)} color={C.g} />)}

        {/* the tracked point */}
        {s > 0 && <Line.Segment point1={[x, from]} point2={[x, to]} color={C.ink} style="dashed" weight={1.5} />}
        {s === 3 && !wrong && <Point x={x} y={0.5} color={C.guide} />}
        <Point x={x} y={from} color={s === 2 ? C.violet : C.f} />
        {s > 0 && <Point x={x} y={to} color={s === 1 ? C.violet : wrong ? C.bad : C.g} />}

        {/* crossings */}
        {s === 3 && !wrong && (
          <>
            <Point x={X1} y={0.5} color={C.good} />
            <Point x={X2} y={0.5} color={C.good} />
          </>
        )}
        {wrong && (
          <>
            <Point x={-PI} y={0} color={C.bad} />
            <Point x={PI} y={0} color={C.bad} />
          </>
        )}

        {/* x tick numbers by hand: f and −f cross the x-axis at −π, so "−π" goes on the side the
            curve leaves empty (below-right of an increasing curve, below-left of a decreasing one) */}
        <Label at={[XMIN, 0]} attach="s" size={11} bold={false}>−2π</Label>
        {!wrong && (
          <Label at={[-PI, 0]} attach={s === 1 ? 'sw' : 'se'} size={11} bold={false}>
            −π
          </Label>
        )}

        {/* labels */}
        {s === 0 && (
          <>
            <Label at={[XMIN, -1]} attach="se" color={C.f}>(−2π, −1)</Label>
            <Label at={[0, 1]} attach="ne" color={C.f}>(0, 1)</Label>
            <Label at={[XMAX, 0]} attach="sw" color={C.f}>(π, 0)</Label>
            <Label at={[-1.3, f(-1.3)]} attach="nw" color={C.f}>f</Label>
          </>
        )}
        {s === 1 && (
          <>
            <Label at={[XMIN, 1]} attach="ne" color={C.violet}>(−2π, 1)</Label>
            <Label at={[0, -1]} attach="se" color={C.violet}>(0, −1)</Label>
            <Label at={[XMAX, 0]} attach="nw" color={C.violet}>(π, 0)</Label>
            <Label at={[-1.3, nf(-1.3)]} attach="sw" color={C.violet}>y = −f(x)</Label>
          </>
        )}
        {s === 2 && (
          <>
            <Label at={[XMIN, 2]} attach="ne" color={C.g}>(−2π, 2)</Label>
            <Label at={[0, 0]} attach="se" color={C.g}>(0, 0)</Label>
            <Label at={[XMAX, 1]} attach="nw" color={C.g}>(π, 1)</Label>
            <Label at={[-1.3, g(-1.3)]} attach="ne" color={C.g}>y = g(x)</Label>
          </>
        )}
        {s === 3 && !wrong && (
          <>
            <Label at={[X1, 0.5]} attach="n" gap={24} size={12} color={C.good}>(−2π/3, ½)</Label>
            <Label at={[X2, 0.5]} attach="n" gap={24} size={12} color={C.good}>(2π/3, ½)</Label>
            <Label at={[XMIN, 2]} attach="ne" color={C.g}>(−2π, 2)</Label>
            <Label at={[XMAX, 1]} attach="nw" color={C.g}>(π, 1)</Label>
            <Label at={[XMIN, 0.5]} attach="ne" color={C.guide}>y = ½</Label>
          </>
        )}
        {wrong && (
          <>
            <Label at={[-PI, 0]} attach="s" gap={16} color={C.bad}>(−π, 0)</Label>
            <Label at={[PI, 0]} attach="nw" color={C.bad}>(π, 0)</Label>
          </>
        )}
      </Plane>
      <Controls>
        <StepNav step={s} count={4} onBack={steps.back} onNext={steps.next} />
        <Slider label="x" value={x} onChange={setX} min={XMIN} max={XMAX} step={PI / 24} format={piText} />
        {s === 3 && (
          <Buttons>
            <Toggle label="What if I forget the +1?" checked={noShift} onChange={setNoShift} />
          </Buttons>
        )}
        <Readouts>
          <Readout tex={`x = ${piTex(x)}`} />
          {readouts}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
