// 2019 Methods Exam 1 Q4a — why the domain must be halved before solving cos(x/2) = ½.
// Left, the unit circle: P sits at angle θ = x/2, and its horizontal position is cos θ, so
// cos θ = ½ asks for P to be on the violet line (horizontal position ½), which meets the circle at
// θ = ±π/3 only (plus whole turns). As x slides over the domain [−2π, π], θ = x/2 sweeps only the
// blue arc from −π to π/2 — three-quarters of a turn — which holds θ = −π/3 and θ = π/3, so
// x = ±2π/3. Right, the graph of y = cos(x/2) (period 4π) against x, with y = ½: the same two
// crossings inside the domain (shaded), the next one (x = 10π/3) outside it. The toggle shows the
// habit of solving θ on [0, 2π] instead (red): it finds π/3 and 5π/3, i.e. x = 2π/3 and 10π/3;
// 10π/3 > π is rejected and x = −2π/3 is never found, although the circle point for 5π/3 is the
// same point as θ = −π/3. All values checked with sympy's solveset.

import { useState } from 'react'
import {
  Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Slider,
  Toggle, num, usePlayer,
} from './kit'

const PI = Math.PI
const R3 = Math.sqrt(3) / 2
const XMIN = -2 * PI
const XMAX = PI
const NEAR = 0.03 // tolerance in θ for "P is on the line"
const RED_R = 1.14 // radius the red "0 to 2π" arc is drawn at, just outside the circle

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

/** v as a multiple of π, when it is a multiple of π/48: [numerator, denominator] in lowest terms. */
function piFrac(v: number): [number, number] | null {
  const k = Math.round((v / PI) * 48)
  if (Math.abs(v - (k * PI) / 48) > 1e-6) return null
  if (k === 0) return [0, 1]
  const g = gcd(Math.abs(k), 48)
  return [k / g, 48 / g]
}

function piTex(v: number): string {
  const f = piFrac(v)
  if (!f) return `${num(v / PI, 2)}\\pi`
  const [n, d] = f
  if (n === 0) return '0'
  const s = n < 0 ? '-' : ''
  const top = Math.abs(n) === 1 ? '\\pi' : `${Math.abs(n)}\\pi`
  return d === 1 ? s + top : `${s}\\tfrac{${top}}{${d}}`
}

function piText(v: number): string {
  const f = piFrac(v)
  if (!f) return `${num(v / PI, 2)}π`
  const [n, d] = f
  if (n === 0) return '0'
  const s = n < 0 ? '−' : ''
  const top = Math.abs(n) === 1 ? 'π' : `${Math.abs(n)}π`
  return d === 1 ? s + top : `${s}${top}/${d}`
}

/** Tick numbers on the graph, placed by hand: the curve crosses the x-axis at −π, π and 3π, so
 *  each of those numbers sits on the side of the crossing the curve leaves empty. */
const TICKS: { v: number; text: string; attach: 's' | 'se' | 'sw' }[] = [
  { v: -2 * PI, text: '−2π', attach: 's' },
  { v: -PI, text: '−π', attach: 'se' },
  { v: PI, text: 'π', attach: 'sw' },
  { v: 2 * PI, text: '2π', attach: 's' },
  { v: 3 * PI, text: '3π', attach: 'se' },
  { v: 4 * PI, text: '4π', attach: 's' },
]

const circ = (t: number, r = 1): [number, number] => [r * Math.cos(t), r * Math.sin(t)]

export default function HalvedDomain() {
  const [x, setX] = useState(-PI)
  const [habit, setHabit] = useState(false)
  const player = usePlayer(setX, { min: XMIN, max: XMAX, seconds: 7 })

  const th = x / 2
  const P = circ(th)
  const foundNeg = th >= -PI / 3 - NEAR
  const foundPos = th >= PI / 3 - NEAR
  const atNeg = Math.abs(th + PI / 3) < NEAR
  const atPos = Math.abs(th - PI / 3) < NEAR
  const sol = (found: boolean) => (found ? C.good : C.guide)

  let notice
  if (habit) {
    notice = (
      <Notice tone="warn">
        Solving on the usual <M>{'0 \\le \\theta \\le 2\\pi'}</M> (red) finds <M>{'\\theta = \\tfrac{\\pi}{3}'}</M> and{' '}
        <M>{'\\theta = \\tfrac{5\\pi}{3}'}</M>, so <M>{'x = \\tfrac{2\\pi}{3}'}</M> and <M>{'x = \\tfrac{10\\pi}{3}'}</M>. But{' '}
        <M>{'\\tfrac{10\\pi}{3} \\approx 10.5'}</M> is bigger than <M>\pi</M>, so it is thrown out and only one answer is left.
        The circle point at <M>{'\\tfrac{5\\pi}{3}'}</M> is the <b>same point</b> as <M>{'-\\tfrac{\\pi}{3}'}</M> on the blue arc:
        named by an angle inside <M>{'[-\\pi, \\tfrac{\\pi}{2}]'}</M>, it doubles to <M>{'x = -\\tfrac{2\\pi}{3}'}</M>, which is
        in the domain.
      </Notice>
    )
  } else if (atNeg) {
    notice = (
      <Notice tone="good">
        <b>P is on the line <M>{'\\cos\\theta = \\tfrac12'}</M></b> at <M>{'\\theta = -\\tfrac{\\pi}{3}'}</M>, so{' '}
        <M>{'x = 2\\theta = -\\tfrac{2\\pi}{3}'}</M>. This is the solution students miss: it only appears because the domain
        runs into negative angles. Keep sliding right.
      </Notice>
    )
  } else if (atPos) {
    notice = (
      <Notice tone="good">
        <b>The second crossing</b>: <M>{'\\theta = \\tfrac{\\pi}{3}'}</M>, so <M>{'x = \\tfrac{2\\pi}{3}'}</M>. Now slide on to{' '}
        <M>x = \pi</M> and watch whether P reaches the line again before the blue arc runs out.
      </Notice>
    )
  } else if (th < -PI / 3) {
    notice = (
      <Notice>
        As <M>x</M> runs from <M>{'-2\\pi'}</M> to <M>\pi</M>, the angle <M>{'\\theta = \\tfrac{x}{2}'}</M> only runs from{' '}
        <M>-\pi</M> to <M>{'\\tfrac{\\pi}{2}'}</M>: three-quarters of a turn, anticlockwise from the far left of the circle. So the
        only circle points we may use are the <b>blue arc</b>. Slide <M>x</M> up (or press play) until P reaches the violet line{' '}
        <M>{'\\cos\\theta = \\tfrac12'}</M>.
      </Notice>
    )
  } else if (th < PI / 3) {
    notice = (
      <Notice>
        One crossing found, at <M>{'\\theta = -\\tfrac{\\pi}{3}'}</M>. P is now to the right of the violet line, where{' '}
        <M>{'\\cos\\theta > \\tfrac12'}</M>. The line cuts the circle in exactly two places, so keep going to reach the other one.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Both crossings are behind you. From <M>{'\\theta = \\tfrac{\\pi}{3}'}</M> on, P is left of the line (
        <M>{'\\cos\\theta < \\tfrac12'}</M>), and the arc stops at the top of the circle (<M>{'\\theta = \\tfrac{\\pi}{2}'}</M>,{' '}
        <M>x = \pi</M>). So there are exactly two solutions, <M>{'x = \\pm\\tfrac{2\\pi}{3}'}</M>. Now try the toggle.
      </Notice>
    )
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] items-center">
        <Plane x={[-1.35, 1.35]} y={[-1.35, 1.35]} xStep={0.5} yStep={0.5} equalScale height={260} labels={false} xLabel="" yLabel="">
          <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} weight={1.5} />
          {habit && <Plot.Parametric xy={t => circ(t, RED_R)} domain={[0.04, 2 * PI - 0.04]} color={C.bad} weight={3} />}
          {habit && <Point x={RED_R} y={0} color={C.bad} />}
          {/* the allowed arc θ ∈ [−π, π/2]: swept part solid, the rest faint */}
          {th < PI / 2 - 1e-4 && <Plot.Parametric xy={t => circ(t)} domain={[th, PI / 2]} color={C.f} weight={3} opacity={0.35} />}
          {th > -PI + 1e-4 && <Plot.Parametric xy={t => circ(t)} domain={[-PI, th]} color={C.f} weight={5} />}
          <Line.Segment point1={[0.5, -1.3]} point2={[0.5, 1.3]} color={C.violet} style="dashed" weight={2} />
          <Line.Segment point1={[0, 0]} point2={P} color={C.f} weight={2} />
          <Line.Segment point1={P} point2={[P[0], 0]} color={C.guide} style="dashed" weight={1.5} />
          <Point x={0.5} y={R3} color={habit ? C.good : sol(foundPos)} />
          <Point x={0.5} y={-R3} color={habit ? C.good : sol(foundNeg)} />
          {habit && <Point x={0.5 * RED_R} y={-R3 * RED_R} color={C.bad} />}
          <Point x={P[0]} y={P[1]} color={C.f} />
          <Label at={[0.5, R3]} attach="ne" color={habit || foundPos ? C.good : C.guide} size={12}>
            π/3
          </Label>
          <Label at={[0.5, -R3]} attach={habit ? 'w' : 'se'} color={habit || foundNeg ? C.good : C.guide} size={12}>
            −π/3
          </Label>
          {habit && (
            <Label at={[0.5 * RED_R, -R3 * RED_R]} attach="se" color={C.bad} size={12}>
              5π/3
            </Label>
          )}
          <Label at={[-1, 0]} attach="nw" color={C.f} size={12}>
            −π
          </Label>
          <Label at={[0, 1]} attach="nw" color={C.f} size={12}>
            π/2
          </Label>
        </Plane>
        <Plane
          x={[-2 * PI, 4 * PI]}
          y={[-1.25, 1.25]}
          xStep={PI}
          yStep={0.5}
          height={210}
          labels={false}
        >
          <Polygon points={[[XMIN, -1.25], [XMAX, -1.25], [XMAX, 1.25], [XMIN, 1.25]]} color={C.f} fillOpacity={0.09} strokeOpacity={0} />
          {habit && <Polygon points={[[0, -1.2], [4 * PI, -1.2], [4 * PI, -0.95], [0, -0.95]]} color={C.bad} fillOpacity={0.25} strokeOpacity={0} />}
          <Plot.OfX y={v => Math.cos(v / 2)} domain={[XMAX, 4 * PI]} color={C.guide} weight={2} style="dashed" />
          <Plot.OfX y={v => Math.cos(v / 2)} domain={[XMIN, XMAX]} color={C.f} weight={3} />
          <Line.Segment point1={[XMIN, 0.5]} point2={[4 * PI, 0.5]} color={C.violet} style="dashed" weight={2} />
          <Point x={(-2 * PI) / 3} y={0.5} color={habit ? C.bad : sol(foundNeg)} />
          <Point x={(2 * PI) / 3} y={0.5} color={habit ? C.good : sol(foundPos)} />
          <Point x={(10 * PI) / 3} y={0.5} color={habit ? C.bad : C.guide} />
          <Point x={x} y={Math.cos(x / 2)} color={C.f} />
          {(habit || foundNeg) && (
            <Label at={[(-2 * PI) / 3, 0.5]} attach="nw" color={habit ? C.bad : C.good} size={12}>
              {habit ? 'missed' : '−2π/3'}
            </Label>
          )}
          {(habit || foundPos) && (
            <Label at={[(2 * PI) / 3, 0.5]} attach="ne" color={C.good} size={12}>
              2π/3
            </Label>
          )}
          <Label at={[(10 * PI) / 3, 0.5]} attach="ne" color={habit ? C.bad : C.guide} size={12}>
            {habit ? '10π/3 ✗' : '10π/3'}
          </Label>
          {TICKS.map(t => (
            <Label key={t.v} at={[t.v, 0]} attach={t.attach} color={C.ink} size={11} bold={false}>
              {t.text}
            </Label>
          ))}
          <Label at={[XMIN, 0.5]} attach="se" color={C.violet} size={11}>
            y = ½
          </Label>
          <Label at={[-1.25 * PI, -1.08]} attach="c" color={C.f} size={11}>
            domain
          </Label>
          {habit && (
            <Label at={[2 * PI, -1.075]} attach="c" color={C.bad} size={11}>
              0 ≤ x/2 ≤ 2π
            </Label>
          )}
        </Plane>
      </div>
      <Controls>
        <Slider
          label="x"
          value={x}
          onChange={v => {
            player.stop()
            setX(v)
          }}
          min={XMIN}
          max={XMAX}
          step={PI / 24}
          format={piText}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x)} label="Sweep x from −2π to π" />
          <Toggle
            label={<>What if I solve on <M>{'0 \\le \\theta \\le 2\\pi'}</M>?</>}
            checked={habit}
            onChange={setHabit}
          />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`x = ${piTex(x)}`} />
          <Readout tex={`\\theta = \\tfrac{x}{2} = ${piTex(th)}`} />
          <Readout color={atNeg || atPos ? C.good : undefined} tex={`\\cos\\theta \\approx ${num(Math.cos(th), 2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
