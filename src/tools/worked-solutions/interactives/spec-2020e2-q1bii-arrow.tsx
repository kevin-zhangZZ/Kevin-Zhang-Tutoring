// 2020 Specialist Exam 2 Q1b.ii — velocity is a vector: the arrow v = 4cos(2t) i − 3sin(t) j
// drawn at the particle on x = 2sin(2t), y = 3cos(t). At t = π it is 4i: four to the right, none
// up. A toggle answers with the speed alone ("4"), which the report says many students did, and
// draws every arrow of length 4 — the number doesn't say which way the particle is going.

import { useState } from 'react'
import { C, Circle, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Vector, num } from './kit'

const X = (t: number) => 2 * Math.sin(2 * t)
const Y = (t: number) => 3 * Math.cos(t)
const DX = (t: number) => 4 * Math.cos(2 * t)
const DY = (t: number) => -3 * Math.sin(t)
const STEP = Math.PI / 48
const K = 0.55 // arrow scale: 1 m/s is drawn 0.55 units long
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

/** a i + b j as TeX, dropping zero components. */
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

export default function VelocityArrow() {
  const [t, setT] = useState(Math.PI)
  const [speedOnly, setSpeedOnly] = useState(false)
  const x = X(t)
  const y = Y(t)
  const vx = DX(t)
  const vy = DY(t)
  const speed = Math.hypot(vx, vy)
  const atPi = Math.abs(t - Math.PI) < 1e-6
  const atHalf = Math.abs(t - Math.PI / 2) < 1e-6
  const ring = Array.from({ length: 12 }, (_, k) => (k * Math.PI) / 6)

  let notice
  if (speedOnly) {
    notice = (
      <Notice tone="warn">
        &ldquo;{tex(speed)}&rdquo; is only the <b>length</b> of the arrow — the speed. Every red arrow has that length, so
        the number alone can&apos;t say which way the particle is heading. The question asks for{' '}
        <M>{'\\underset{\\sim}{v}'}</M>, a vector, so the answer must carry the direction:{' '}
        <M>{vecTex(vx, vy)}</M>.
      </Notice>
    )
  } else if (atPi) {
    notice = (
      <Notice tone="good">
        At <M>{'t=\\pi'}</M>: <M>{'4\\cos(2\\pi)=4'}</M> across and <M>{'-3\\sin(\\pi)=0'}</M> up, so{' '}
        <M>{'\\underset{\\sim}{v}=4\\underset{\\sim}{i}'}</M>. The arrow says both how fast (4 m/s) and which way (to the
        right, along the bottom of the path). Turn on the toggle to see what answering &ldquo;4&rdquo; loses.
      </Notice>
    )
  } else if (atHalf) {
    notice = (
      <Notice>
        At <M>{'t=\\tfrac\\pi2'}</M> the particle is at the origin with{' '}
        <M>{'\\underset{\\sim}{v}=-4\\underset{\\sim}{i}-3\\underset{\\sim}{j}'}</M>: left and down. Its speed is{' '}
        <M>{'\\sqrt{16+9}=5'}</M>, but <M>5</M> on its own would not tell you it is heading down-left.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The velocity is the arrow <M>{'\\tfrac{dx}{dt}\\underset{\\sim}{i}+\\tfrac{dy}{dt}\\underset{\\sim}{j}'}</M>{' '}
        — it always points along the path, the way the particle is going. Try <M>{'t=\\tfrac\\pi2'}</M> (1.57) and{' '}
        <M>{'t=\\pi'}</M> (3.14).
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3.5, 3.5]} y={[-4, 4]} equalScale height={420}>
        <Plot.Parametric xy={s => [X(s), Y(s)]} domain={[0, 2 * Math.PI]} color={C.f} weight={2.5} />
        {speedOnly && (
          <>
            <Circle center={[x, y]} radius={K * speed} color={C.bad} fillOpacity={0.04} strokeStyle="dashed" />
            {ring.map(a => (
              <Vector
                key={a}
                tail={[x, y]}
                tip={[x + K * speed * Math.cos(a), y + K * speed * Math.sin(a)]}
                color={C.bad}
                weight={1.5}
                opacity={0.55}
              />
            ))}
          </>
        )}
        <Vector tail={[x, y]} tip={[x + K * vx, y + K * vy]} color={C.g} weight={3.5} />
        <Point x={x} y={y} color={C.f} />
        <Label at={[x + K * vx, y + K * vy]} attach={vx >= 0 ? (vy >= 0 ? 'ne' : 'se') : vy >= 0 ? 'nw' : 'sw'} color={C.g}>
          v
        </Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={2 * Math.PI} step={STEP} format={tText} />
        <Toggle label={`Answer with the speed only ("${tex(speed)}")`} checked={speedOnly} onChange={setSpeedOnly} />
        <Readouts>
          <Readout color={C.g} tex={`\\underset{\\sim}{v}=${vecTex(vx, vy)}`} />
          <Readout color={speedOnly ? C.bad : C.guide} tex={`\\text{speed }|\\underset{\\sim}{v}|=${tex(speed)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
