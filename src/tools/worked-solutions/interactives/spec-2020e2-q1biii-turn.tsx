// 2020 Specialist Exam 2 Q1b.iii — acceleration is the rate of change of the velocity ARROW, found
// by differentiating each velocity component again: a = −8sin(2t) i − 3cos(t) j. The toggle draws
// the velocity just before and just after t, from the same point: the arrow's tip moves in the
// direction of a (0.5 s either side). At t = π the velocity 4i swings from pointing slightly down to slightly up, and
// its length (the speed) is at a maximum, so a = 3j is perpendicular to v — the particle is turning, not speeding up.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Vector, num } from './kit'

const X = (t: number) => 2 * Math.sin(2 * t)
const Y = (t: number) => 3 * Math.cos(t)
const DX = (t: number) => 4 * Math.cos(2 * t)
const DY = (t: number) => -3 * Math.sin(t)
const AX = (t: number) => -8 * Math.sin(2 * t)
const AY = (t: number) => -3 * Math.cos(t)
const STEP = Math.PI / 48
const KV = 0.55 // velocity arrows: 1 m/s drawn 0.55 units long
const KA = 0.4 // acceleration arrow: 1 m/s² drawn 0.4 units long
const H = 0.5 // "a moment" before and after, in seconds
const tex = (v: number, dp = 2) => num(v, dp).replace('−', '-').replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '')

/** t as a multiple of π when it is one (π/6, 3π/4, …), otherwise 2 dp. */
function tText(t: number): string {
  for (const d of [1, 2, 3, 4, 6, 12]) {
    const k = Math.round((t * d) / Math.PI)
    if (Math.abs(t - (k * Math.PI) / d) < 1e-6) {
      if (k === 0) return '0'
      const top = k === 1 ? 'π' : `${k}π`
      return d === 1 ? top : `${top}/${d}`
    }
  }
  return t.toFixed(2)
}

function vecTex(a: number, b: number): string {
  const i = '\\underset{\\sim}{i}'
  const j = '\\underset{\\sim}{j}'
  const A = Math.abs(a) < 0.005
  const B = Math.abs(b) < 0.005
  if (A && B) return '\\underset{\\sim}{0}'
  if (B) return `${tex(a)}${i}`
  if (A) return `${tex(b)}${j}`
  return `${tex(a)}${i}${b < 0 ? '-' : '+'}${tex(Math.abs(b))}${j}`
}

export default function AccelerationTurns() {
  const [t, setT] = useState(Math.PI)
  const [ghosts, setGhosts] = useState(true)
  const x = X(t)
  const y = Y(t)
  const vx = DX(t)
  const vy = DY(t)
  const ax = AX(t)
  const ay = AY(t)
  const aMag = Math.hypot(ax, ay)
  const speed = Math.hypot(vx, vy)
  const along = (ax * vx + ay * vy) / speed // rate of change of speed
  const atPi = Math.abs(t - Math.PI) < 1e-6
  const before: [number, number] = [x + KV * DX(t - H), y + KV * DY(t - H)]
  const after: [number, number] = [x + KV * DX(t + H), y + KV * DY(t + H)]
  const effect =
    aMag < 0.05
      ? 'neither turning nor changing speed: the acceleration is zero at this instant'
      : Math.abs(along) < 0.05
        ? 'only turning' : along > 0 ? 'speeding up and turning' : 'slowing down and turning'

  let notice
  if (atPi) {
    notice = (
      <Notice tone="good">
        At <M>{'t=\\pi'}</M>: <M>{'-8\\sin(2\\pi)=0'}</M> and <M>{'-3\\cos(\\pi)=3'}</M>, so{' '}
        <M>{'\\underset{\\sim}{a}=3\\underset{\\sim}{j}'}</M> and <M>{'|\\underset{\\sim}{a}|=3'}</M>. It points straight up,
        into the bend, at right angles to <M>{'\\underset{\\sim}{v}=4\\underset{\\sim}{i}'}</M>: the velocity arrow is
        swinging from slightly down to slightly up. Its length, the speed 4, is at its largest here (the faint arrows
        either side are both shorter), so at this instant it isn&apos;t changing: all of{' '}
        <M>{'\\underset{\\sim}{a}'}</M> goes into turning. Slide away from <M>\pi</M> to see <M>{'\\underset{\\sim}{a}'}</M>{' '}
        also change the speed.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The faint arrows are the velocity {H} s before and after. The acceleration (orange) points the way the velocity
        arrow&apos;s tip is moving: it is the rate of change of the whole vector, so each component of{' '}
        <M>{'\\underset{\\sim}{v}'}</M> is differentiated with respect to <M>t</M>. Here the particle is {effect}.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3.5, 3.5]} y={[-4, 4]} equalScale height={420}>
        <Plot.Parametric xy={s => [X(s), Y(s)]} domain={[0, 2 * Math.PI]} color={C.f} weight={2.5} opacity={0.7} />
        {ghosts && (
          <>
            <Vector tail={[x, y]} tip={before} color={C.violet} weight={1.5} opacity={0.6} />
            <Vector tail={[x, y]} tip={after} color={C.violet} weight={1.5} opacity={0.6} />
            <Line.Segment point1={before} point2={after} color={C.g} style="dashed" weight={1.5} />
          </>
        )}
        <Vector tail={[x, y]} tip={[x + KV * vx, y + KV * vy]} color={C.f} weight={3.5} />
        <Vector tail={[x, y]} tip={[x + KA * ax, y + KA * ay]} color={C.g} weight={3.5} />
        <Point x={x} y={y} color={C.ink} />
        <Label at={[x + KV * vx, y + KV * vy]} attach={vx >= 0 ? 'e' : 'w'} color={C.f}>
          v
        </Label>
        {aMag > 0.3 && (
          <Label at={[x + KA * ax, y + KA * ay]} attach={ay >= 0 ? 'n' : 's'} color={C.g}>
            a
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={2 * Math.PI} step={STEP} format={tText} />
        <Toggle label={`Show the velocity ${H} s before and after`} checked={ghosts} onChange={setGhosts} />
        <Readouts>
          <Readout color={C.f} tex={`\\underset{\\sim}{v}=${vecTex(vx, vy)}`} />
          <Readout color={C.g} tex={`\\underset{\\sim}{a}=${vecTex(ax, ay)}`} />
          <Readout color={C.g} tex={`|\\underset{\\sim}{a}|=${tex(aMag)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
