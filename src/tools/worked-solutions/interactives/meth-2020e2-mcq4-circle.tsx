// 2020 Methods Exam 2 MCQ 4 — where the two families of solutions come from. Put θ = 2x − π/3.
// Left, the unit circle: P sits at angle θ, and its horizontal position is cos θ. The equation
// cos θ = −½ asks for P to be on the red vertical line x = −½, which cuts the circle at exactly two
// points, θ = −2π/3 (violet) and θ = 2π/3 (orange), plus any number of full turns. Right, the graph of
// y = cos(2x − π/3) against x, with the red line y = −½: each time P reaches the red line, the graph
// meets it. As x runs from −π to π, θ runs from −7π/3 to 5π/3, two full laps, so there are four
// solutions in view: x = −π/6 and 5π/6 (violet, x = −π/6 + kπ = π(6k − 1)/6) and x = −π/2 and π/2
// (orange, x = π/2 + kπ = π(6k + 3)/6). Same-coloured solutions are π apart because x moving by π moves
// θ = 2x − π/3 by 2π, one lap — which is why the 2kπ of the θ-solution becomes kπ in x. Every value is
// computed from the question's own equation (checked with sympy's solveset).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts,
  Slider, num, usePlayer,
} from './kit'

const PI = Math.PI
const theta = (x: number) => 2 * x - PI / 3
/** The solutions of cos(2x − π/3) = −½ in [−π, π], each with the circle point it comes from. */
const SOLS: { x: number; tex: string; label: string; fam: 'v' | 'o' }[] = [
  { x: -PI / 2, tex: '-\\tfrac{\\pi}{2}', label: '−π/2', fam: 'o' },
  { x: -PI / 6, tex: '-\\tfrac{\\pi}{6}', label: '−π/6', fam: 'v' },
  { x: PI / 2, tex: '\\tfrac{\\pi}{2}', label: 'π/2', fam: 'o' },
  { x: (5 * PI) / 6, tex: '\\tfrac{5\\pi}{6}', label: '5π/6', fam: 'v' },
]
const famColor = (fam: 'v' | 'o') => (fam === 'v' ? C.violet : C.g)
const NEAR = 0.02

/** θ written as the circle point's angle plus whole turns, for the Notice: "-\tfrac{2\pi}{3} + 2\pi". */
function turnsTex(base: string, turns: number): string {
  if (turns === 0) return base
  const t = Math.abs(turns) === 1 ? '2\\pi' : `${2 * Math.abs(turns)}\\pi`
  return `${base} ${turns > 0 ? '+' : '-'} ${t}`
}

/** Tick numbers at multiples of π/2, drawn by hand: ±π/2 go ABOVE the axis, where the curve (at
 *  height −½ there) leaves room; below it they sat on the curve's nearby crossings. */
function PiTicks() {
  return (
    <>
      <Label at={[-PI, 0]} attach="s" size={12} bold={false}>−π</Label>
      <Label at={[-PI / 2, 0]} attach="n" size={12} bold={false}>−π/2</Label>
      <Label at={[PI / 2, 0]} attach="n" size={12} bold={false}>π/2</Label>
      <Label at={[PI, 0]} attach="s" size={12} bold={false}>π</Label>
    </>
  )
}

export default function CircleWidget() {
  const [x, setX] = useState(0.3)
  const player = usePlayer(setX, { min: -PI, max: PI, seconds: 14 })
  const th = theta(x)
  const cx = Math.cos(th)
  const sy = Math.sin(th)
  const hit = SOLS.find(s => Math.abs(s.x - x) < NEAR)
  const plusHalf = !hit && Math.abs(cx - 0.5) < 0.02

  const nextSolution = () => {
    player.stop()
    const next = SOLS.find(s => s.x > x + NEAR) ?? SOLS[0]
    setX(next.x)
  }

  let notice
  if (hit) {
    const base = hit.fam === 'v' ? -2 * PI / 3 : (2 * PI) / 3
    const turns = Math.round((theta(hit.x) - base) / (2 * PI))
    const baseTex = hit.fam === 'v' ? '-\\tfrac{2\\pi}{3}' : '\\tfrac{2\\pi}{3}'
    notice = (
      <Notice tone="good">
        <b>
          P is on the red line, so <M>{'\\cos\\theta = -\\tfrac12'}</M> and <M>{`x = ${hit.tex}`}</M> is a solution.
        </b>{' '}
        Here <M>{`\\theta = ${turnsTex(baseTex, turns)}`}</M>: the {hit.fam === 'v' ? 'violet' : 'orange'} point
        {turns === 0 ? '' : ` plus ${Math.abs(turns)} full turn${Math.abs(turns) > 1 ? 's' : ''} ${turns > 0 ? 'forwards' : 'backwards'}`}.{' '}
        {hit.fam === 'v' ? (
          <>
            Undo <M>{'\\theta = 2x - \\tfrac\\pi3'}</M>: <M>{'2x = -\\tfrac\\pi3 + 2k\\pi'}</M>, so{' '}
            <M>{'x = -\\tfrac\\pi6 + k\\pi = \\tfrac{\\pi(6k-1)}{6}'}</M>.
          </>
        ) : (
          <>
            Undo <M>{'\\theta = 2x - \\tfrac\\pi3'}</M>: <M>{'2x = \\pi + 2k\\pi'}</M>, so{' '}
            <M>{'x = \\tfrac\\pi2 + k\\pi = \\tfrac{\\pi(6k+3)}{6}'}</M>.
          </>
        )}{' '}
        The next {hit.fam === 'v' ? 'violet' : 'orange'} solution is <M>\pi</M> further along: moving <M>x</M> by{' '}
        <M>\pi</M> moves <M>\theta</M> by <M>2\pi</M>, one full lap back to the same point.
      </Notice>
    )
  } else if (plusHalf) {
    notice = (
      <Notice tone="warn">
        Here <M>{'\\cos\\theta = +\\tfrac12'}</M>, not <M>{'-\\tfrac12'}</M>: P is at the basic angle's point (
        <M>{'\\theta = \\pm\\tfrac\\pi3'}</M> or a full turn from it). The equation wants the <b>negative</b> value, so P must be
        on the other side of the vertical axis: the mirror images, at <M>{'\\pi - \\tfrac\\pi3 = \\tfrac{2\\pi}3'}</M> and{' '}
        <M>{'-\\tfrac{2\\pi}3'}</M>. Press &ldquo;Next solution&rdquo; or slide <M>x</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        P is at angle <M>{'\\theta = 2x - \\tfrac\\pi3'}</M> on the circle, and its horizontal position (the thick blue
        segment) is <M>{'\\cos\\theta'}</M>, which is also the height of the graph of <M>{'y = \\cos\\left(2x - \\tfrac\\pi3\\right)'}</M>. The equation needs{' '}
        <M>{'\\cos\\theta = -\\tfrac12'}</M>: P on the red line. That line meets the circle at only <b>two</b> points, so every
        solution comes from one of them. Press Play and count: <M>x</M> from <M>-\pi</M> to <M>\pi</M> takes <M>\theta</M>{' '}
        round twice, so four solutions.
      </Notice>
    )
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] items-center">
        <Plane x={[-1.3, 1.3]} y={[-1.3, 1.3]} xStep={0.5} yStep={0.5} equalScale height={250} labels={false} xLabel="" yLabel="">
          <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} weight={2} />
          <Line.Segment point1={[-0.5, -1.3]} point2={[-0.5, 1.3]} color={C.bad} style="dashed" weight={2} />
          <Label at={[-0.5, -1.22]} color={C.bad} attach="w" size={12}>cos θ = −½</Label>
          <Point x={-0.5} y={Math.sqrt(3) / 2} color={C.g} />
          <Point x={-0.5} y={-Math.sqrt(3) / 2} color={C.violet} />
          <Label at={[-0.5, Math.sqrt(3) / 2]} color={C.g} attach="nw" size={12}>2π/3</Label>
          <Label at={[-0.5, -Math.sqrt(3) / 2]} color={C.violet} attach="sw" size={12}>−2π/3</Label>
          <Line.Segment point1={[0, 0]} point2={[cx, sy]} color={C.ink} weight={1.5} />
          <Line.Segment point1={[cx, sy]} point2={[cx, 0]} color={C.f} style="dashed" weight={1.5} />
          <Line.Segment point1={[0, 0]} point2={[cx, 0]} color={C.f} weight={5} />
          <Point x={cx} y={sy} color={hit ? famColor(hit.fam) : C.f} />
          {/* On a solution point, the point's own angle label is already there; P's would sit on it. */}
          {!hit && <Label at={[cx, sy]} color={C.f} attach={sy >= 0 ? (cx >= 0 ? 'ne' : 'nw') : cx >= 0 ? 'se' : 'sw'}>P</Label>}
        </Plane>
        <Plane x={[-PI, PI]} y={[-1.2, 1.2]} xStep={PI / 6} yStep={0.5} height={230} xLabels={false} yLabels={v => (Math.abs(Math.abs(v) - 1) < 1e-9 ? String(v).replace('-', '−') : '')}>
          <PiTicks />
          <Line.Segment point1={[-PI, -0.5]} point2={[PI, -0.5]} color={C.bad} style="dashed" weight={2} />
          <Plot.OfX y={x0 => Math.cos(theta(x0))} domain={[-PI, PI]} color={C.f} weight={3} />
          {SOLS.map(s => (
            <Point key={s.x} x={s.x} y={-0.5} color={famColor(s.fam)} />
          ))}
          {hit && <Label at={[hit.x, -0.5]} color={famColor(hit.fam)} attach={hit.x > 2.5 ? 'sw' : 's'} gap={10}>{hit.label}</Label>}
          <Line.Segment point1={[x, 0]} point2={[x, cx]} color={C.guide} style="dashed" weight={1.5} />
          <Point x={x} y={cx} color={hit ? famColor(hit.fam) : C.f} />
        </Plane>
      </div>
      <Controls>
        <Slider
          label="x"
          value={x}
          min={-PI}
          max={PI}
          step={0.01}
          onChange={v => {
            player.stop()
            setX(v)
          }}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x)} label="Play x from −π to π" />
          <ActionButton label="Next solution ›" onClick={nextSolution} />
        </Buttons>
        {/* Not clickable: KaTeX's fraction struts reach up over the buttons above and would
            otherwise swallow taps on them. */}
        <div className="pointer-events-none">
          <Readouts>
            <Readout tex={`\\theta = 2x - \\tfrac{\\pi}{3} \\approx ${num(th)}`} />
            <Readout color={C.f} tex={`\\cos\\theta \\approx ${num(cx)}`} />
          </Readouts>
        </div>
        {notice}
      </Controls>
    </div>
  )
}
