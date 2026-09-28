// 2017 Specialist Exam 2 MCQ 15 — constant velocity means equal displacements in equal times.
// The body moves in a straight line from r₁ = 3i + j (t = 0) to r₂ = −i + 5j (t = 2); the
// two-second displacement −4i + 4j splits into two equal one-second steps, each the velocity
// v = −2i + 2j. Slide or play t: at t = 1 the body is at the midpoint i + 3j (option E, a
// position, not a velocity). A toggle uses −4i + 4j (option C) as the velocity instead: the body
// reaches r₂ after one second and has overshot to −5i + 9j by t = 2.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, M, Notice, Plane, PlayButton, Point, Readout, Readouts, Slider, Toggle, Vector,
  usePlayer,
} from './kit'

type V2 = [number, number]
const R1: V2 = [3, 1]
const R2: V2 = [-1, 5]
const V_RIGHT: V2 = [-2, 2]
const V_WRONG: V2 = [-4, 4]

const I = '\\underset{\\sim}{i}'
const J = '\\underset{\\sim}{j}'
const r1 = '\\underset{\\sim}{r}_1'
const r2 = '\\underset{\\sim}{r}_2'
const vv = '\\underset{\\sim}{v}'

/** a i + b j, with tidy signs and 2 dp only where needed. */
function vecTex(a: number, b: number): string {
  const f = (x: number) => (Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : x.toFixed(2))
  const first = Math.abs(a) < 1e-9 ? '' : `${a < 0 ? '-' : ''}${f(Math.abs(a))}${I}`
  if (Math.abs(b) < 1e-9) return first || '0'
  const sign = b < 0 ? '-' : first ? '+' : ''
  return `${first}${sign}${f(Math.abs(b))}${J}`
}

export default function ConstantVelocitySteps() {
  const [t, setT] = useState(0.6)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setT, { min: 0, max: 2, seconds: 4 })

  const v = wrong ? V_WRONG : V_RIGHT
  const col = wrong ? C.bad : C.f
  const at = (s: number): V2 => [R1[0] + s * v[0], R1[1] + s * v[1]]
  const pos = at(t)
  const one = at(1)
  const two = at(2)

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <M>{`-4${I}+4${J}`}</M> is the displacement over the <b>whole two seconds</b>. Used as a velocity, the body covers
        all of it in the first second, reaching <M>{r2}</M> at <M>t=1</M>, and by <M>t=2</M> it is at{' '}
        <M>{`-5${I}+9${J}`}</M>, far past <M>{r2}</M>. Velocity is displacement <b>per second</b>, so divide by the
        2&nbsp;seconds.
      </Notice>
    )
  } else if (Math.abs(t - 1) < 0.04) {
    notice = (
      <Notice tone="good">
        At <M>t=1</M> the body is exactly halfway: <M>{`${I}+3${J}`}</M>, the midpoint{' '}
        <M>{`\\tfrac12(${r1}+${r2})`}</M>. That is option E, which is a <b>position</b>, not a velocity. The velocity is the
        arrow from <M>{r1}</M> to here, <M>{`${vv}=-2${I}+2${J}`}</M>.
      </Notice>
    )
  } else if (t > 1.96) {
    notice = (
      <Notice tone="good">
        Two equal steps of <M>{`${vv}=-2${I}+2${J}`}</M> land exactly on <M>{r2}</M>:{' '}
        <M>{`${r1}+2${vv}=-${I}+5${J}`}</M> ✓. That&apos;s the check to do on the exam: start position plus time × velocity
        should give the end position.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        With constant velocity the body moves in a straight line and covers the <b>same displacement every second</b>. So
        the displacement <M>{`${r2}-${r1}=-4${I}+4${J}`}</M> is made of two equal one-second steps (the blue arrows), and
        each step is the velocity. Press play, then try the toggle to see what happens if you forget to divide by 2.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-6, 5]} y={[0, 10]} xStep={1} yStep={1} height={360} equalScale>
        {/* Position vectors from the origin. */}
        <Vector tail={[0, 0]} tip={R1} color={C.guide} weight={2} />
        <Vector tail={[0, 0]} tip={R2} color={C.guide} weight={2} />
        {/* The two one-second steps. */}
        <Vector tail={R1} tip={one} color={col} weight={3} />
        <Vector tail={one} tip={two} color={col} weight={3} />
        <Label at={[R1[0] + 0.3 * v[0], R1[1] + 0.3 * v[1]]} attach="ne" color={col}>1st second</Label>
        <Label at={[one[0] + 0.3 * v[0], one[1] + 0.3 * v[1]]} attach="ne" color={col}>2nd second</Label>
        <Point x={R1[0]} y={R1[1]} color={C.ink} />
        <Point x={R2[0]} y={R2[1]} color={C.good} />
        <Label at={R1} attach="se" color={C.ink}>r₁ (t = 0)</Label>
        <Label at={R2} attach="w" color={C.good}>r₂</Label>
        {wrong && <Label at={two} attach="e" color={C.bad}>t = 2 ✗</Label>}
        <Point x={pos[0]} y={pos[1]} color={C.g} />
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={x => {
            player.stop()
            setT(x)
          }}
          min={0}
          max={2}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Play t = 0 to 2" />
          <Toggle label="Use −4i + 4j as the velocity (option C)" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\underset{\\sim}{r}(${t.toFixed(2)})=${vecTex(pos[0], pos[1])}`} />
          <Readout color={col} tex={`\\text{velocity used}=${vecTex(v[0], v[1])}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
