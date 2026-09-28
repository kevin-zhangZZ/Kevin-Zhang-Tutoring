// 2019 Specialist Exam 2 MCQ 15 — why a push in a FIXED direction bends the path into a parabola,
// not a circle. Drawn with u = 2 and α = −1: r(t) = ut i + ½αt² j, so the velocity is u i + αt j.
// The acceleration arrow always points straight down, so the horizontal velocity never changes
// (the strobe dots are equally spaced across) while the downward velocity grows, and after t = 0
// the push is no longer at 90° to the velocity — the particle speeds up. A toggle shows what a
// circle (option D) would need instead: a push of the same size that turns to stay at 90° to the
// velocity, giving a circle of radius u²/|α| = 4 at constant speed.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle, Vector,
  usePlayer,
} from './kit'

type V2 = [number, number]
const U = 2
const AL = -1
const T_MAX = 3
const R = (U * U) / Math.abs(AL) // radius of the circle a turning push would give
const W = U / R // its angular speed
const VS = 0.7 // velocity arrow scale
const AS = 1.4 // acceleration arrow scale
const DEG = 180 / Math.PI

// The question's motion: constant acceleration α j.
const pos = (t: number): V2 => [U * t, (AL * t * t) / 2]
const vel = (t: number): V2 => [U, AL * t]
const acc = (): V2 => [0, AL]
// For comparison: the same-sized push, turning to stay perpendicular to the velocity.
const cpos = (t: number): V2 => [R * Math.sin(W * t), -R + R * Math.cos(W * t)]
const cvel = (t: number): V2 => [U * Math.cos(W * t), -U * Math.sin(W * t)]
const cacc = (t: number): V2 => [-Math.abs(AL) * Math.sin(W * t), -Math.abs(AL) * Math.cos(W * t)]

const add = (p: V2, q: V2, k = 1): V2 => [p[0] + k * q[0], p[1] + k * q[1]]

export default function FixedPush() {
  const [t, setT] = useState(1.5)
  const [turning, setTurning] = useState(false)
  const player = usePlayer(setT, { min: 0, max: T_MAX, seconds: 5 })

  const P = turning ? cpos(t) : pos(t)
  const v = turning ? cvel(t) : vel(t)
  const a = turning ? cacc(t) : acc()
  const speed = Math.hypot(v[0], v[1])
  const ang = Math.acos((v[0] * a[0] + v[1] * a[1]) / (speed * Math.hypot(a[0], a[1]))) * DEG
  const vTip = add(P, v, VS)
  const aTip = add(P, a, AS)
  const pathCol = turning ? C.violet : C.f
  const dots: V2[] = []
  for (let k = 0; k * 0.5 <= t + 1e-9; k++) dots.push(turning ? cpos(k * 0.5) : pos(k * 0.5))

  let notice
  if (turning) {
    notice = (
      <Notice tone="warn">
        For a circle (option D) the push has to <b>turn with the particle</b>, staying at <M>{'90^\\circ'}</M> to the
        velocity at every instant. Then it never speeds the particle up or slows it down, it only bends the path, by
        the same amount each second. The push in this question is <M>{'\\alpha\\underset{\\sim}{j}'}</M> at all times,
        so its path is the dashed parabola, not this.
      </Notice>
    )
  } else if (t < 0.05) {
    notice = (
      <Notice>
        At <M>t=0</M> the push <M>{'\\alpha\\underset{\\sim}{j}'}</M> (orange) is at right angles to the velocity{' '}
        <M>{'u\\underset{\\sim}{i}'}</M> (blue). Press play and watch the angle between the two arrows.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The orange arrow never turns. Nothing pushes sideways, so the horizontal velocity stays <M>u</M> and the dots
        (every <M>0.5</M> s) are equally spaced across. The downward velocity grows like <M>{'\\alpha t'}</M>, so the
        drops between dots keep growing. After <M>t=0</M> the push is at about{' '}
        <M>{`${ang.toFixed(0)}^\\circ`}</M> to the velocity, not <M>{'90^\\circ'}</M>, so the particle speeds up.{' '}
        <M>{'x=ut,\\ y=\\tfrac12\\alpha t^2'}</M> is a parabola. Turn on the toggle to see what a circle would need.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.4, 6.4]} y={[-6.2, 1]} xStep={1} yStep={1} equalScale height={340}>
        {turning && (
          <Plot.Parametric xy={pos} domain={[0, T_MAX]} color={C.guide} style="dashed" weight={2} />
        )}
        <Plot.Parametric xy={turning ? cpos : pos} domain={[0, Math.max(t, 0.001)]} color={pathCol} weight={3} />
        {dots.map((d, i) => (
          <Point key={i} x={d[0]} y={d[1]} color={pathCol} opacity={0.45} />
        ))}
        {!turning && t > 0.05 && (
          <>
            <Line.Segment point1={P} point2={add(P, [v[0], 0], VS)} color={C.guide} style="dashed" weight={1.5} />
            <Line.Segment point1={add(P, [v[0], 0], VS)} point2={vTip} color={C.guide} style="dashed" weight={1.5} />
          </>
        )}
        <Vector tail={P} tip={vTip} color={C.f} weight={3} />
        <Vector tail={P} tip={aTip} color={C.g} weight={3} />
        <Label at={vTip} attach="ne" color={C.f}>
          v
        </Label>
        <Label at={aTip} attach={turning ? 'w' : 'sw'} color={C.g}>
          a
        </Label>
        <Point x={P[0]} y={P[1]} color={C.ink} />
      </Plane>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Drawn with u = 2 and α = −1; any u ≠ 0 and α &lt; 0 give the same shape.
      </p>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={x => {
            player.stop()
            setT(x)
          }}
          min={0}
          max={T_MAX}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Play the motion" />
          <Toggle label="What if the push turned to stay at 90°?" checked={turning} onChange={setTurning} />
        </Buttons>
        <Readouts>
          <Readout
            color={C.f}
            tex={`\\underset{\\sim}{v}\\approx ${v[0].toFixed(2)}\\underset{\\sim}{i}${v[1] <= 0 ? '-' : '+'}${Math.abs(v[1]).toFixed(2)}\\underset{\\sim}{j}`}
          />
          <Readout tex={`\\text{speed}\\approx ${speed.toFixed(2)}`} />
          <Readout color={C.g} tex={`\\text{angle between }\\underset{\\sim}{v}\\text{ and }\\underset{\\sim}{a}\\approx ${ang.toFixed(0)}^\\circ`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
