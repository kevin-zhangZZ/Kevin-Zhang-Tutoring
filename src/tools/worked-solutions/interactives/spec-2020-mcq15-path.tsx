// 2020 Specialist Exam 2 MCQ 15 — why the particle moves in a straight line, and why that line must
// pass through (1, 1). The net force 6i + 3j on 3 kg gives the constant acceleration a = 2i + j. From
// rest at i + j, v = t(2i + j) and r = (1 + t²)i + (1 + t²/2)j: the velocity is built from a alone, so it
// always points along a and the particle never turns. It runs out along the ray from (1, 1) with
// gradient 1/2, the line y = x/2 + 1/2 (option E); the readout (y − 1)/(x − 1) stays at 1/2. Arrows
// (v blue, a orange) are drawn at half scale from the particle; slide or play t from 0 to 3.
//   Toggle 1, "Give it a push at the start": an initial velocity u (drag its tip, default −2.5i) makes
// r = (1, 1) + ut + (2, 1)t²/2, a parabola like a projectile's, unless u is along 2i + j. That is the
// only way a constant acceleration gives a parabola, so the parabolas C and D (41% of students) can't
// describe a particle that starts from rest.
//   Toggle 2, "Forget the starting position": dropping r(0) = i + j starts the particle at the origin,
// r = t²i + (t²/2)j, the parallel line y = x/2 (option A, 10%), shifted by i + j from the real path.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider,
  Toggle, Vector, clamp, num, usePlayer,
} from './kit'

type V2 = [number, number]
const START: V2 = [1, 1]
const ACC: V2 = [2, 1] // (6i + 3j) / 3
const T_MAX = 3
const HALF = 0.5 // arrows drawn at half scale
const DEFAULT_PUSH: V2 = [-2.5, 0]

const pos = (t: number, u: V2): V2 => [START[0] + u[0] * t + (ACC[0] * t * t) / 2, START[1] + u[1] * t + (ACC[1] * t * t) / 2]
const vel = (t: number, u: V2): V2 => [u[0] + ACC[0] * t, u[1] + ACC[1] * t]
/** x i + y j as TeX, with the sign of y folded into the plus. */
const ij = (x: number, y: number, dp: number) =>
  `${num(x, dp)}\\underset{\\sim}{i} ${y < 0 ? '-' : '+'} ${num(Math.abs(y), dp)}\\underset{\\sim}{j}`

export default function StraightPath() {
  const [t, setT] = useState(1.5)
  const [push, setPush] = useState(false)
  const [u, setU] = useState<V2>(DEFAULT_PUSH)
  const [forget, setForget] = useState(false)
  const player = usePlayer(setT, { min: 0, max: T_MAX, seconds: 5 })

  const uNow: V2 = push ? u : [0, 0]
  const P = pos(t, uNow)
  // Offset 0.3 units perpendicular to a (down and right) when v is parallel to a.
  const aTail: V2 = push ? P : [P[0] + (0.3 * 1) / Math.sqrt(5), P[1] - (0.3 * 2) / Math.sqrt(5)]
  const V = vel(t, uNow)
  const ghost: V2 = [(ACC[0] * t * t) / 2, (ACC[1] * t * t) / 2] // the path without r(0)
  const parallelU = Math.abs(u[0] * ACC[1] - u[1] * ACC[0]) < 0.08
  const ratio = Math.abs(P[0] - 1) > 0.02 ? (P[1] - 1) / (P[0] - 1) : null

  let notice
  if (forget) {
    notice = (
      <Notice tone="warn">
        <b>Without the constant <M>{'\\underset{\\sim}{r}(0) = \\underset{\\sim}{i} + \\underset{\\sim}{j}'}</M></b>, the red particle starts at
        the origin: <M>{'\\underset{\\sim}{r} = t^2\\underset{\\sim}{i} + \\tfrac{t^2}{2}\\underset{\\sim}{j}'}</M>, which is <M>{'y = \\tfrac{x}{2}'}</M>,
        option A. Same direction, same gradient, but every point is shifted by <M>{'\\underset{\\sim}{i} + \\underset{\\sim}{j}'}</M>. Check
        any answer at <M>t = 0</M>: the path must pass through <M>(1, 1)</M>, and <M>{'y = \\tfrac{x}{2}'}</M> gives <M>{'\\tfrac12'}</M> there
        (option B gives <M>0</M>).
      </Notice>
    )
  } else if (push) {
    notice = parallelU ? (
      <Notice tone="good">
        With the push along <M>{'2\\underset{\\sim}{i} + \\underset{\\sim}{j}'}</M>, <M>{'\\underset{\\sim}{v}'}</M> and{' '}
        <M>{'\\underset{\\sim}{a}'}</M> point the same way again, and the path is straight again. A constant acceleration bends the path only
        when the starting velocity points somewhere else.
      </Notice>
    ) : (
      <Notice>
        <b>With a starting velocity <M>{'\\underset{\\sim}{u}'}</M></b> (drag its tip), <M>{'\\underset{\\sim}{v} = \\underset{\\sim}{u} + t(2\\underset{\\sim}{i} + \\underset{\\sim}{j})'}</M>{' '}
        swings round towards <M>{'\\underset{\\sim}{a}'}</M> and the path bends into a parabola, like a projectile&apos;s. That is the only way a
        constant acceleration gives a parabola. This particle starts <b>from rest</b>, so <M>{'\\underset{\\sim}{u} = \\underset{\\sim}{0}'}</M>:
        nothing to bend, and options C and D can&apos;t be right. Drag <M>{'\\underset{\\sim}{u}'}</M> to point along the dashed line and watch
        the path straighten.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The particle starts <b>from rest</b> at <M>(1, 1)</M>, and the net force gives the constant{' '}
        <M>{'\\underset{\\sim}{a} = 2\\underset{\\sim}{i} + \\underset{\\sim}{j}'}</M> (orange). Its velocity{' '}
        <M>{'\\underset{\\sim}{v} = t(2\\underset{\\sim}{i} + \\underset{\\sim}{j})'}</M> (blue) is built from <M>{'\\underset{\\sim}{a}'}</M>{' '}
        alone, so it always points the same way: <b>the particle never turns</b>. It runs along the line through <M>(1, 1)</M> with
        gradient <M>{'\\tfrac12'}</M>, which is <M>{'y = \\tfrac{x}{2} + \\tfrac12'}</M>. Press play and watch{' '}
        <M>{'\\tfrac{y-1}{x-1}'}</M> stay at <M>{'\\tfrac12'}</M>; then try a push at the start.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1, 10.6]} y={[-1.2, 6.6]} equalScale height={420}>
        {/* Option E's line, the whole of it; the particle only ever uses the part from (1, 1). */}
        <Plot.OfX y={x => x / 2 + 0.5} domain={[-1, 10.6]} color={C.guide} style="dashed" weight={1.5} />
        {forget && (
          <>
            <Plot.OfX y={x => x / 2} domain={[-1, 10.6]} color={C.bad} style="dashed" weight={1.5} />
            <Line.Segment point1={ghost} point2={P} color={C.bad} style="dashed" weight={1} />
            <Point x={ghost[0]} y={ghost[1]} color={C.bad} />
            <Label at={[6, 3]} attach="se" color={C.bad}>
              y = x/2 (option A)
            </Label>
          </>
        )}
        {/* The whole path to t = 3 faintly, and the part travelled so far solidly. */}
        <Plot.Parametric xy={s => pos(s, uNow)} domain={[0, T_MAX]} color={C.f} weight={2} opacity={0.45} />
        {t > 0.01 && <Plot.Parametric xy={s => pos(s, uNow)} domain={[0, t]} color={C.f} weight={3.5} />}
        <Point x={START[0]} y={START[1]} color={C.ink} />
        <Label at={START} attach={forget ? 'n' : 'se'}>
          start (1, 1)
        </Label>
        {!push && (
          <Label at={[8.4, 4.7]} attach="nw" color={C.f}>
            y = x/2 + 1/2
          </Label>
        )}
        {/* v (blue) and a (orange) from the particle at half scale. From rest they are parallel and would
            lie on top of each other, so a is then drawn a little below the path, side by side with v. */}
        {Math.hypot(V[0], V[1]) > 0.05 && <Vector tail={P} tip={[P[0] + HALF * V[0], P[1] + HALF * V[1]]} color={C.f} weight={2.5} />}
        <Vector tail={aTail} tip={[aTail[0] + HALF * ACC[0], aTail[1] + HALF * ACC[1]]} color={C.g} weight={2.5} />
        <Label at={[aTail[0] + HALF * ACC[0], aTail[1] + HALF * ACC[1]]} attach="se" color={C.g}>
          a
        </Label>
        {Math.hypot(V[0], V[1]) > 0.3 && (
          <Label at={[P[0] + HALF * V[0], P[1] + HALF * V[1]]} attach="nw" color={C.f}>
            v
          </Label>
        )}
        <Point x={P[0]} y={P[1]} color={C.f} />
        {push && (
          <>
            <Vector tail={START} tip={[START[0] + HALF * u[0], START[1] + HALF * u[1]]} color={C.violet} weight={2.5} />
            <MovablePoint
              point={[START[0] + HALF * u[0], START[1] + HALF * u[1]]}
              onMove={([x, y]) => {
                player.stop()
                setU([clamp((x - START[0]) / HALF, -3, 3), clamp((y - START[1]) / HALF, -3, 3)])
              }}
              color={C.violet}
            />
            <Label at={[START[0] + HALF * u[0], START[1] + HALF * u[1]]} attach="s" color={C.violet} gap={12}>
              u
            </Label>
          </>
        )}
      </Plane>
      <Controls>
        <p className="text-[12px] text-gray-500 dark:text-gray-400 -mt-1">Arrows are drawn at half scale.</p>
        <Slider label="t" value={t} onChange={v => { player.stop(); setT(v) }} min={0} max={T_MAX} step={0.05} format={v => num(v, 2)} />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Play t from 0 to 3" />
          {/* One wrong idea at a time: the push and the dropped r(0) are separate stories. */}
          <Toggle label="Give it a push at the start" checked={push} onChange={v => { setPush(v); if (v) { setU(DEFAULT_PUSH); setForget(false) } }} />
          <Toggle label="Forget the starting position" checked={forget} onChange={v => { setForget(v); if (v) setPush(false) }} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\underset{\\sim}{r}(${num(t, 2)}) = ${ij(P[0], P[1], 2)}`} />
          <Readout
            color={push && !parallelU ? C.bad : C.good}
            tex={ratio === null ? '\\tfrac{y-1}{x-1}\\ \\text{undefined here}' : `\\tfrac{y-1}{x-1} = ${num(ratio, 2)}`}
          />
          {push && <Readout color={C.violet} tex={`\\underset{\\sim}{u} = ${ij(u[0], u[1], 1)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
