// 2021 Specialist Exam 2 MCQ 7 — the parameter t is not the angle: on x = 5cos(2t) + 1,
// y = 5sin(2t) − 1 the point turns through 2t about the centre (1, −1). Slide t from 0: P leaves
// A(6, −1) and reaches B(1, 4) at t = π/4, having turned π/2, so the arc is 5 × π/2 = 5π/2
// (option E); the other way round is 15π/2. A toggle shows option D's 5 × t (23%): an arc of
// that length from A only reaches angle t, halfway to B at t = π/4. Arc lengths checked with
// sympy (speed = 10, ∫₀^{π/4} 10 dt = 5π/2).

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, tick } from './kit'

const PI = Math.PI
const R = 5
const CX = 1
const CY = -1
const STEP = PI / 48 // P is at B when t = π/4, i.e. k = 12 below
const P = (t: number): [number, number] => [R * Math.cos(2 * t) + CX, R * Math.sin(2 * t) + CY]
const onCircle = (a: number, r = R): [number, number] => [CX + r * Math.cos(a), CY + r * Math.sin(a)]

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

/** (n/d)π as TeX, reduced; n, d integers. */
function piFrac(n: number, d: number): string {
  if (n === 0) return '0'
  const g = gcd(Math.abs(n), d)
  const p = n / g
  const q = d / g
  if (q === 1) return `${p === 1 ? '' : p}\\pi`
  return `\\tfrac{${p === 1 ? '' : p}\\pi}{${q}}`
}

export default function Angle2t() {
  const [t, setT] = useState(PI / 8)
  const [wrong, setWrong] = useState(false)

  const k = Math.round(t / STEP) // t = kπ/48
  const p = P(t)
  const atB = k === 12
  const before = k < 12
  const ang = 2 * t
  const tTex = piFrac(k, 48)
  const angTex = piFrac(2 * k, 48)
  const arcTex = piFrac(10 * k, 48)
  const wrongTex = piFrac(5 * k, 48)
  const red = onCircle(t)

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <b>Option D (23%) works out <M>{'5\\times\\Delta t'}</M></b>, treating <M>t</M> as the angle. An arc of length{' '}
        <M>5t</M> from <M>A</M> only reaches the red point, at angle <M>t</M>
        {atB ? (
          <>
            : at <M>{'t = \\tfrac{\\pi}{4}'}</M> that is <M>{'\\tfrac{5\\pi}{4}'}</M>, only halfway to <M>B</M>.
          </>
        ) : (
          <>, while <M>P</M> is already at angle <M>2t</M>.</>
        )}{' '}
        The <M>2t</M> inside <M>\cos</M> and <M>\sin</M> makes the point turn twice as fast as <M>t</M> grows, so the arc is{' '}
        <M>{'5\\times 2t'}</M>.
      </Notice>
    )
  } else if (atB) {
    notice = (
      <Notice tone="good">
        <b>
          <M>P</M> reaches <M>B</M> at <M>{'t = \\tfrac{\\pi}{4}'}</M>, but the angle at the centre is{' '}
          <M>{'2t = \\tfrac{\\pi}{2}'}</M>
        </b>
        : a quarter turn. Arc <M>{'AB = 5\\times\\tfrac{\\pi}{2} = \\tfrac{5\\pi}{2}'}</M>, option E. The other way round is
        three-quarters of the circle, <M>{'\\tfrac{15\\pi}{2}'}</M>, so <M>{'\\tfrac{5\\pi}{2}'}</M> is the shortest. Turn on
        &ldquo;Use 5 × t&rdquo; to see where option D goes wrong.
      </Notice>
    )
  } else if (before) {
    notice = (
      <Notice>
        At <M>{`t = ${tTex}`}</M>, <M>P</M> has turned through <M>{`2t = ${angTex}`}</M> about the centre{' '}
        <M>(1, -1)</M>: the angle is <b>twice</b> <M>t</M>, because of the <M>2t</M> inside <M>\cos</M> and{' '}
        <M>\sin</M>. So the arc from <M>A</M> is radius × angle <M>{`= 5\\times 2t = ${arcTex}`}</M>. Slide <M>t</M> to{' '}
        <M>{'\\tfrac{\\pi}{4}'}</M>, where <M>P</M> reaches <M>B</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>P</M> has gone past <M>B</M>: at <M>{`t = ${tTex}`}</M> it has turned <M>{`2t = ${angTex}`}</M>. A full turn
        (<M>2t = 2\pi</M>) needs only <M>t = \pi</M>. Slide back to <M>{'t = \\tfrac{\\pi}{4}'}</M>, the moment <M>P</M> is
        at <M>B</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-4.6, 6.6]}
        y={[-6.4, 4.6]}
        equalScale
        height={380}
        xLabels={v => (Math.round(v) % 2 === 0 && Math.round(v) !== 2 ? tick(v) : '')} // no "2": the 2t label sits there
        yLabels={v => (Math.round(v) % 2 === 0 ? tick(v) : '')}
      >
        <Circle center={[CX, CY]} radius={R} color={C.guide} fillOpacity={0} weight={1.5} strokeStyle="dashed" />
        {k > 0 && <Plot.Parametric xy={P} domain={[0, t]} color={C.f} weight={5} />}
        {wrong && k > 0 && (
          <Plot.Parametric xy={a => onCircle(a)} domain={[0, t]} color={C.bad} weight={2.5} style="dashed" />
        )}
        <Line.Segment point1={[CX, CY]} point2={[6, -1]} color={C.guide} weight={1.5} />
        <Line.Segment point1={[CX, CY]} point2={p} color={C.f} weight={1.5} style="dashed" />
        {k > 0 && <Plot.Parametric xy={a => onCircle(a, 1.1)} domain={[0, ang]} color={C.violet} weight={2.5} />}
        {k >= 4 && (
          <Label at={onCircle(t, 1.75)} attach="c" color={C.violet} size={13}>
            2t
          </Label>
        )}
        <Point x={CX} y={CY} color={C.ink} />
        <Point x={6} y={-1} color={C.ink} />
        <Point x={1} y={4} color={atB ? C.good : C.ink} />
        <Label at={[6, -1]} attach="sw" size={13}>A(6, −1)</Label>
        <Label at={[1, 4]} attach="ne" color={atB ? C.good : C.ink} size={13}>B(1, 4)</Label>
        {wrong && k > 0 && <Point x={red[0]} y={red[1]} color={C.bad} />}
        <Point x={p[0]} y={p[1]} color={C.f} />
        {!atB && k >= 2 && (
          <Label at={onCircle(ang, R + 0.7)} attach="c" color={C.f} size={14}>
            P
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={v => setT(Math.round(v / STEP) * STEP)}
          min={0}
          max={PI}
          step={STEP}
          format={v => {
            const n = Math.round(v / STEP)
            const g = gcd(n, 48)
            return n === 0 ? '0' : `${n / g === 1 ? '' : n / g}π${48 / g === 1 ? '' : '/' + 48 / g}`
          }}
        />
        <Toggle label="Use 5 × t (option D)" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout color={C.violet} tex={`\\text{angle turned} = 2t = ${angTex}`} />
          <Readout color={C.f} tex={`\\text{arc travelled from } A = 5\\times 2t = ${arcTex} \\approx ${(10 * t).toFixed(2)}`} />
          {wrong && <Readout color={C.bad} tex={`5\\times t = ${wrongTex} \\approx ${(5 * t).toFixed(2)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
