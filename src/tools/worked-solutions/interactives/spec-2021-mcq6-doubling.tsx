// 2021 Specialist Exam 2 MCQ 6 — squaring z doubles its argument, so z² is real exactly when
// 2·arg(z) is a multiple of π, i.e. when z lies on EITHER axis. Drag z round the unit circle (it
// snaps to multiples of π/12) or play one full turn: z² goes round twice and lands on the real
// axis four times, at arg(z) = 0, π/2, π and −π/2 (each found direction is marked). Options C, D
// and E (62% of students between them) keep only the imaginary-axis directions; B only the real.
// The modulus is fixed at 1: r cis θ squares to r² cis 2θ, and r plays no part in being real.

import { useEffect, useRef, useState } from 'react'
import {
  Buttons, C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts,
  Vector, usePlayer,
} from './kit'

const PI = Math.PI
const STEP = PI / 12
const TWO_PI = 2 * PI

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

/** An angle as an exact multiple of π when it is a multiple of π/12, else 2 dp. */
function fmtAngle(v: number): string {
  const k = v / STEP
  const n = Math.round(k)
  if (Math.abs(k - n) > 1e-6) return v.toFixed(2)
  if (n === 0) return '0'
  const g = gcd(Math.abs(n), 12)
  const p = n / g
  const q = 12 / g
  const sign = p < 0 ? '-' : ''
  const a = Math.abs(p)
  if (q === 1) return `${sign}${a === 1 ? '' : a}\\pi`
  return `${sign}\\tfrac{${a === 1 ? '' : a}\\pi}{${q}}`
}

/** a + bi to 2 dp, with exact ±1 / ±i where they occur. */
function fmtComplex(re: number, im: number): string {
  const r = Math.abs(re) < 1e-9 ? 0 : re
  const i = Math.abs(im) < 1e-9 ? 0 : im
  const reS = Math.abs(Math.abs(r) - 1) < 1e-9 ? (r < 0 ? '-1' : '1') : r.toFixed(2)
  const imAbs = Math.abs(Math.abs(i) - 1) < 1e-9 ? '' : Math.abs(i).toFixed(2)
  if (i === 0) return reS
  if (r === 0) return `${i < 0 ? '-' : ''}${imAbs}i`
  return `${reS} ${i < 0 ? '-' : '+'} ${imAbs}i`
}

const DIRS = [0, PI / 2, PI, -PI / 2]

function arc(r: number, from: number, to: number, color: string) {
  if (Math.abs(to - from) < 1e-6) return null
  return (
    <Plot.Parametric
      xy={s => [r * Math.cos(s), r * Math.sin(s)]}
      domain={[Math.min(from, to), Math.max(from, to)]}
      color={color}
      weight={2.5}
    />
  )
}

export default function Doubling() {
  // θ is kept in [0, 2π]; the readouts use the principal argument in (−π, π].
  const [theta, setTheta] = useState(PI / 6)
  const [found, setFound] = useState([false, false, false, false])
  const player = usePlayer(setTheta, { min: 0, max: TWO_PI, seconds: 9 })

  const prev = useRef(theta)
  useEffect(() => {
    const a = prev.current
    const b = theta
    prev.current = b
    const hits: number[] = []
    for (let k = 0; k < 4; k++) {
      const t = (k * PI) / 2
      const exact = Math.cos(b - t) > 1 - 1e-9
      // While playing, θ moves in small steps: count an axis it passes over between two frames.
      const crossed = b > a && b - a < 0.1 && a <= t && t <= b
      if (exact || crossed) hits.push(k)
    }
    if (hits.length) setFound(f => (hits.some(k => !f[k]) ? f.map((v, i) => v || hits.includes(i)) : f))
  }, [theta])

  const th = theta > PI + 1e-9 ? theta - TWO_PI : theta // principal arg(z)
  const z: [number, number] = [Math.cos(th), Math.sin(th)]
  const w: [number, number] = [Math.cos(2 * th), Math.sin(2 * th)]
  const real = Math.abs(w[1]) < 1e-6
  const onReal = real && Math.abs(z[1]) < 1e-6
  const onImag = real && !onReal
  const count = found.filter(Boolean).length

  // z and z² labels just outside the circle; push z² further out when the two points are close.
  const sep = Math.abs(Math.atan2(Math.sin(th - 2 * th), Math.cos(th - 2 * th)))
  const wr = sep < 0.4 ? 1.48 : 1.22

  const tail =
    count === 4 ? (
      <>
        {' '}All four found: <M>{'\\arg(z) = 0,\\ \\tfrac{\\pi}{2},\\ \\pi,\\ -\\tfrac{\\pi}{2}'}</M>, every multiple of{' '}
        <M>{'\\tfrac{\\pi}{2}'}</M>. That is <M>{'\\tfrac{k\\pi}{2},\\ k\\in Z'}</M>: option A.
      </>
    ) : (
      <> Found so far: <b>{count} of 4</b>.</>
    )

  let notice
  if (onReal) {
    notice = (
      <Notice tone="good">
        <b>
          <M>{`z = ${z[0] > 0 ? '1' : '-1'}`}</M> is real, so <M>z^2 = 1</M> is real too.
        </b>{' '}
        Here <M>{`\\arg(z) = ${fmtAngle(th)}`}</M> and <M>{`2\\theta = ${fmtAngle(2 * th)}`}</M>, a multiple of <M>\pi</M>.
        Options C, D and E (chosen by 62% of students between them) leave out <M>{'\\arg(z) = 0'}</M> and{' '}
        <M>\pi</M>.{tail}
      </Notice>
    )
  } else if (onImag) {
    notice = (
      <Notice tone="good">
        <b>
          <M>{`z = ${z[1] > 0 ? 'i' : '-i'}`}</M> is purely imaginary, and <M>z^2 = -1</M> is real.
        </b>{' '}
        <M>{`\\arg(z) = ${fmtAngle(th)}`}</M> doubles to <M>{`${fmtAngle(2 * th)}`}</M>, which points along the negative real
        axis. Option B, <M>k\pi</M>, misses these two directions.{tail}
      </Notice>
    )
  } else {
    notice = (
      <Notice tone={count === 4 ? 'good' : 'neutral'}>
        <b>Squaring doubles the argument.</b> <M>z</M> is at angle <M>{fmtAngle(th)}</M>, so <M>z^2</M> is at{' '}
        <M>{`2\\theta = ${fmtAngle(2 * th)}`}</M>. <M>z^2</M> is real only when it lands on the real axis, i.e. when{' '}
        <M>2\theta</M> is a multiple of <M>\pi</M>. Drag <M>z</M> round the circle, or press &ldquo;Turn z once round&rdquo;,
        and find every position of <M>z</M> that works.{tail}
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-1.6, 1.6]}
        y={[-1.6, 1.6]}
        equalScale
        height={340}
        xLabel=""
        yLabel="Im"
        xLabels={v => (Math.abs(v - 1) < 1e-9 ? '1' : Math.abs(v + 1) < 1e-9 ? '−1' : '')}
        yLabels={v => (Math.abs(v - 1) < 1e-9 ? 'i' : Math.abs(v + 1) < 1e-9 ? '−i' : '')}
      >
        {real && <Line.Segment point1={[-1.6, 0]} point2={[1.6, 0]} color={C.good} weight={5} opacity={0.55} />}
        {/* "Re" inside the right edge: the kit's default spot past x = 1.6 is clipped on phones. */}
        <Label at={[1.6, -0.12]} attach="sw" size={14} italic>
          Re
        </Label>
        <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} weight={1.5} strokeStyle="dashed" />
        {DIRS.map((d, k) =>
          found[k] ? (
            <Circle key={k} center={[Math.cos(d), Math.sin(d)]} radius={0.075} color={C.good} fillOpacity={0.2} weight={2} />
          ) : null,
        )}
        {arc(0.26, 0, th, C.f)}
        {arc(0.42, 0, 2 * th, C.g)}
        <Vector tail={[0, 0]} tip={w} color={real ? C.good : C.g} weight={2.5} />
        <Vector tail={[0, 0]} tip={z} color={C.f} weight={2.5} />
        <Point x={w[0]} y={w[1]} color={real ? C.good : C.g} />
        <Label at={[1.22 * z[0], 1.22 * z[1]]} attach="c" color={C.f} size={15}>
          z
        </Label>
        <Label at={[wr * w[0], wr * w[1]]} attach="c" color={real ? C.good : C.g} size={15}>
          z²
        </Label>
        <MovablePoint
          point={z}
          color={C.f}
          constrain={([x, y]) => {
            const a = Math.round(Math.atan2(y, x) / STEP) * STEP
            return [Math.cos(a), Math.sin(a)]
          }}
          onMove={([x, y]) => {
            player.stop()
            const n = (((Math.round(Math.atan2(y, x) / STEP) % 24) + 24) % 24)
            setTheta(n * STEP)
          }}
        />
      </Plane>
      <Controls>
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(theta)} label="Turn z once round" />
          <span className="text-[12px] text-gray-500 dark:text-gray-400">or drag z round the circle.</span>
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\theta = \\arg(z) = ${fmtAngle(th)}`} />
          <Readout color={C.g} tex={`2\\theta = ${fmtAngle(2 * th)}`} />
          <Readout
            color={real ? C.good : C.g}
            tex={`z^2 = ${fmtComplex(w[0], w[1])}\\ ${real ? '\\in R\\ \\checkmark' : '\\notin R'}`}
          />
        </Readouts>
        {notice}
        <p className="text-[11.5px] text-gray-500 dark:text-gray-400">
          The modulus doesn&apos;t matter: <M>{'r\\,\\mathrm{cis}(\\theta)'}</M> squares to{' '}
          <M>{'r^2\\,\\mathrm{cis}(2\\theta)'}</M>, and only the argument decides whether that is real, so here <M>r = 1</M>.
        </p>
      </Controls>
    </div>
  )
}
