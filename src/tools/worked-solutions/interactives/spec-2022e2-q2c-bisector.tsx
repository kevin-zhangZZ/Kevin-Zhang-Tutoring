// 2022 Specialist Exam 2 Q2c — the ray through the midpoint of uv sits at the AVERAGE of Arg(u)
// and Arg(v), and only because |u| = |v|. Drag v round the circle |z| = 2 (it snaps to VCAA's
// grid rays, every π/24): the green ray from O through the midpoint M always splits ∠uOv into
// two equal angles. One toggle adds the arguments instead (for the exam's v that gives −π/12,
// the report's common wrong answer); the other moves v onto |z| = 1, where the triangle is no
// longer isosceles and averaging the arguments misses M.

import { useState } from 'react'
import {
  Buttons, C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Polyline, Readout, Readouts, Toggle,
  Vector, clamp, tick,
} from './kit'

const STEP = Math.PI / 24 // VCAA's polar grid has a ray every π/24
const K_U = 4 // Arg(u) = 4π/24 = π/6
const K0 = -6 // the exam's v: Arg(v) = −6π/24 = −π/4
const KMIN = -18 // v can go round to −3π/4 …
const KMAX = 0 // … and up to the positive real axis
const U: [number, number] = [Math.sqrt(3), 1]
const HOLE = 0.09 // open circle at O: Arg(0) is undefined
const RAY = 2.25
const ARC = 0.75 // radius of the angle marks at O

const dir = (a: number, r: number): [number, number] => [r * Math.cos(a), r * Math.sin(a)]

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b)
}

/** (n/d)π as TeX, in lowest terms. */
function piTex(n: number, d: number): string {
  if (n === 0) return '0'
  const g = gcd(Math.abs(n), d)
  const top = Math.abs(n) / g
  const bottom = d / g
  const sign = n < 0 ? '-' : ''
  const numer = top === 1 ? '\\pi' : `${top}\\pi`
  return bottom === 1 ? `${sign}${numer}` : `${sign}\\tfrac{${numer}}{${bottom}}`
}

function arc(a: number, b: number, r: number): [number, number][] {
  const pts: [number, number][] = []
  for (let i = 0; i <= 40; i++) pts.push(dir(a + ((b - a) * i) / 40, r))
  return pts
}

export default function Bisector() {
  const [k, setK] = useState(K0)
  const [sum, setSum] = useState(false)
  const [small, setSmall] = useState(false)

  const rv = small ? 1 : 2
  const argV = k * STEP
  const v = dir(argV, rv)
  const mid: [number, number] = [(U[0] + v[0]) / 2, (U[1] + v[1]) / 2]
  const theta = Math.atan2(mid[1], mid[0])
  const avg = ((K_U + k) * STEP) / 2
  const sumAng = (K_U + k) * STEP
  const agree = Math.abs(theta - avg) < 1e-9
  const exam = k === K0 && !small

  const toK = (p: [number, number]) => clamp(Math.round(Math.atan2(p[1], p[0]) / STEP), KMIN, KMAX)

  let notice
  if (sum) {
    notice =
      k === -K_U ? (
        <Notice tone="warn">
          Here <M>{'\\mathrm{Arg}(u) + \\mathrm{Arg}(v) = 0'}</M> happens to equal the average, because the average itself
          is <M>0</M>. Move <M>v</M> anywhere else and the red ray leaves <M>M</M>.
        </Notice>
      ) : (
        <Notice tone="warn">
          The red ray is <M>{`\\mathrm{Arg}(u) + \\mathrm{Arg}(v) = ${piTex(K_U + k, 24)}`}</M>
          {k === K0 ? <>, the report&apos;s common wrong answer</> : null}. It misses the midpoint <M>M</M>: adding the
          arguments goes twice as far round as the bisector. The angle half-way between two directions is their{' '}
          <b>average</b>, half the sum.
        </Notice>
      )
  } else if (small) {
    notice = (
      <Notice tone="warn">
        Now <M>|v| = 1</M> but <M>|u| = 2</M>, so triangle <M>Ouv</M> is no longer isosceles. The ray through <M>M</M>{' '}
        (green) is at <M>{`\\theta \\approx ${theta.toFixed(4)}`}</M>, but the average of the arguments (violet, dashed) is{' '}
        <M>{`${avg.toFixed(4)}`}</M>. Averaging the arguments only works when <M>|u| = |v|</M>, which is why part c.
        starts by checking the moduli.
      </Notice>
    )
  } else if (exam) {
    notice = (
      <Notice>
        This is the exam&apos;s <M>u</M> and <M>v</M>. The green ray from <M>O</M> through the midpoint <M>M</M> is at{' '}
        <M>{'\\theta = -\\tfrac{\\pi}{24}'}</M>, exactly half-way between <M>{'\\tfrac{\\pi}{6}'}</M> and{' '}
        <M>{'-\\tfrac{\\pi}{4}'}</M>: the two marked angles are equal because <M>|u| = |v| = 2</M>. Drag <M>v</M> round the
        circle, then try the toggles.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Still half-way: the ray through <M>M</M> is at <M>{`\\theta = ${piTex(K_U + k, 48)}`}</M>, the average of{' '}
        <M>{'\\tfrac{\\pi}{6}'}</M> and <M>{`${piTex(k, 24)}`}</M>. Whenever <M>u</M> and <M>v</M> are on the same circle
        about <M>O</M>, the ray through their midpoint <M>M</M> bisects <M>{'\\angle uOv'}</M>. It is a ray, starting
        at an open circle at <M>O</M>, and it must be drawn on the diagram.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.4, 2.5]} y={[-2.4, 2.4]} equalScale height={340} xLabel="" yLabel="Im" xLabels={v => (Math.abs(v - 2) < 1e-9 ? '' : tick(v))}>
        {/* "Re" sits above the end of the axis: past the end there is no room on a phone */}
        <Label at={[2.5, 0]} attach="n" size={14} italic>Re</Label>
        <Circle center={[0, 0]} radius={2} color={C.guide} fillOpacity={0} weight={1.5} />
        {small && <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} weight={1.5} strokeStyle="dashed" />}
        <Line.Segment point1={U} point2={v} color={C.ink} weight={1.5} style="dashed" />
        {/* the two halves of ∠uOv, each with a tick mark (equal angles get equal marks) */}
        <Polyline points={arc(argV, K_U * STEP, ARC)} color={C.violet} weight={2.5} />
        {agree && (
          <>
            <Line.Segment point1={dir((argV + theta) / 2, ARC - 0.1)} point2={dir((argV + theta) / 2, ARC + 0.1)} color={C.violet} weight={2.5} />
            <Line.Segment point1={dir((theta + K_U * STEP) / 2, ARC - 0.1)} point2={dir((theta + K_U * STEP) / 2, ARC + 0.1)} color={C.violet} weight={2.5} />
          </>
        )}
        {small && !agree && (
          <Line.Segment point1={dir(avg, HOLE)} point2={dir(avg, RAY)} color={C.violet} weight={2} style="dashed" />
        )}
        {sum && <Vector tail={dir(sumAng, HOLE)} tip={dir(sumAng, RAY)} color={C.bad} weight={2.5} />}
        <Vector tail={dir(theta, HOLE)} tip={dir(theta, RAY)} color={C.good} weight={3.5} />
        <Circle center={[0, 0]} radius={HOLE} color={C.good} fillOpacity={0} weight={2.5} />
        <Point x={U[0]} y={U[1]} color={C.f} />
        <Point x={mid[0]} y={mid[1]} color={C.good} />
        <MovablePoint
          point={v}
          color={C.f}
          constrain={p => dir(toK(p) * STEP, rv)}
          onMove={p => setK(toK(p))}
        />
        <Label at={U} color={C.f} attach="ne">u</Label>
        <Label at={v} color={C.f} attach="se" gap={10}>v</Label>
        <Label at={mid} color={C.good} attach={sum || small ? 'nw' : 'sw'} gap={10}>M</Label>
        {sum && k !== -K_U && (
          <Label at={dir(sumAng, RAY)} color={C.bad} attach={sumAng < theta ? 's' : 'n'}>sum</Label>
        )}
      </Plane>
      <Controls>
        <Buttons>
          <Toggle
            label="Add the arguments instead"
            checked={sum}
            onChange={c => {
              setSum(c)
              if (c) setSmall(false)
            }}
          />
          <Toggle
            label="Put v on |z| = 1"
            checked={small}
            onChange={c => {
              setSmall(c)
              if (c) setSum(false)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\mathrm{Arg}(u) = \\tfrac{\\pi}{6}, \\ \\mathrm{Arg}(v) = ${piTex(k, 24)}`} />
          <Readout
            color={C.violet}
            tex={`\\tfrac12\\bigl(\\mathrm{Arg}(u) + \\mathrm{Arg}(v)\\bigr) = ${piTex(K_U + k, 48)}${k === -K_U ? '' : ` \\approx ${avg.toFixed(4)}`}`}
          />
          <Readout color={C.good} tex={`\\mathrm{Arg}(M) \\approx ${(Math.abs(theta) < 5e-5 ? 0 : theta).toFixed(4)}${agree ? '\\ \\checkmark' : ''}`} />
          {sum && <Readout color={C.bad} tex={`\\mathrm{Arg}(u) + \\mathrm{Arg}(v) = ${piTex(K_U + k, 24)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
