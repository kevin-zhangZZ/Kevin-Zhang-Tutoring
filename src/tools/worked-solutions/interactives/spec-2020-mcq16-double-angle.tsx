// 2020 Specialist Exam 2 MCQ 16 — where the 2 in sin(2θ) = 2 sin θ cos θ comes from. Triangle OQP
// in the unit circle has two sides of length 1 and angle 2θ at O, so its area is ½·sin 2θ, and
// sin 2θ is the height of P. The bisector of the angle cuts it into two right triangles, each
// with legs sin θ and cos θ, so the area is also 2 × ½ sin θ cos θ. A button jumps to the
// question's θ (cos θ = 1/9, θ ≈ 83.6°), where the triangle is nearly flat and sin 2θ = 8√5/81
// is small; a toggle keeps only one right triangle, which is option C (sin θ cos θ = 4√5/81).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Polyline, Readout, Readouts,
  Slider, Toggle,
} from './kit'

const DEG = Math.PI / 180
const Q_DEG = Math.acos(1 / 9) / DEG // 83.62°

type Att = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw'
/** The compass side of a point that faces direction `rad`. */
function side(rad: number): Att {
  const names: Att[] = ['e', 'ne', 'n', 'nw', 'w', 'sw', 's', 'se']
  const k = Math.round((((rad / (Math.PI / 4)) % 8) + 8) % 8) % 8
  return names[k]
}

export default function DoubleAngle() {
  const [deg, setDeg] = useState(40)
  const [one, setOne] = useState(false)

  const th = deg * DEG
  const s = Math.sin(th)
  const c = Math.cos(th)
  const s2 = Math.sin(2 * th)
  const O: [number, number] = [0, 0]
  const Q: [number, number] = [1, 0]
  const P: [number, number] = [Math.cos(2 * th), s2]
  const Mid: [number, number] = [c * c, c * s] // foot of the bisector on PQ
  const atQ = Math.abs(deg - Q_DEG) < 0.15

  // Right-angle mark at M: along the chord towards Q, and along the bisector towards O.
  const k = Math.min(0.055, c / 2)
  const u1: [number, number] = [s, -c] // M → Q direction
  const u2: [number, number] = [-c, -s] // M → O direction
  const mark: [number, number][] = [
    [Mid[0] + k * u1[0], Mid[1] + k * u1[1]],
    [Mid[0] + k * u1[0] + k * u2[0], Mid[1] + k * u1[1] + k * u2[1]],
    [Mid[0] + k * u2[0], Mid[1] + k * u2[1]],
  ]

  const mid = (A: [number, number], B: [number, number]): [number, number] => [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2]

  let notice
  if (one) {
    notice = (
      <Notice tone="warn">
        One right triangle has area <M>{'\\tfrac12\\sin\\theta\\cos\\theta'}</M>, but the whole triangle is <b>two</b> of
        them. So <M>{`\\sin\\theta\\cos\\theta = ${(s * c).toFixed(3)}`}</M> is only half the height of <M>P</M>,{' '}
        <M>{`\\sin 2\\theta = ${s2.toFixed(3)}`}</M>. At the question&apos;s <M>\theta</M> the half is{' '}
        <M>{'\\tfrac{4\\sqrt5}{81}'}</M>, which is option C.
      </Notice>
    )
  } else if (atQ) {
    notice = (
      <Notice tone="good">
        With <M>{'\\cos\\theta = \\tfrac19'}</M> the bisector is only <M>{'\\tfrac19'}</M> long, so the triangle is almost
        flat: <M>{'2\\theta \\approx 167^\\circ'}</M> and <M>P</M> is nearly at <M>(-1, 0)</M>. Its height,{' '}
        <M>{'\\sin 2\\theta = \\tfrac{8\\sqrt5}{81} \\approx 0.221'}</M>, is small even though{' '}
        <M>{'\\sin\\theta \\approx 0.994'}</M> is nearly 1, so option B is far too big. Turn on &ldquo;One triangle
        only&rdquo; to see what option C measures.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>OQ</M> and <M>OP</M> both have length 1 with angle <M>2\theta</M> between them, so the triangle&apos;s area is{' '}
        <M>{'\\tfrac12(1)(1)\\sin 2\\theta'}</M>: the green height of <M>P</M> is <M>\sin 2\theta</M>. The dashed bisector
        splits it into two right triangles with hypotenuse 1, legs <M>\sin\theta</M> and <M>\cos\theta</M>, each of area{' '}
        <M>{'\\tfrac12\\sin\\theta\\cos\\theta'}</M>. Two of them give <M>{'\\sin 2\\theta = 2\\sin\\theta\\cos\\theta'}</M>
        {' '}for any <M>\theta</M>; now press &ldquo;The question&apos;s θ&rdquo;.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.4, 1.2]} y={[-0.15, 1.15]} xStep={0.5} yStep={0.5} equalScale height={420} labels={false} xLabel="" yLabel="">
        <Plot.Parametric xy={t => [Math.cos(t), Math.sin(t)]} domain={[0, Math.PI]} color={C.guide} weight={1.5} />
        <Polygon points={[O, Mid, Q]} color={C.f} fillOpacity={0.3} weight={2} />
        {!one && <Polygon points={[O, Mid, P]} color={C.g} fillOpacity={0.3} weight={2} />}
        {one && <Polygon points={[O, Mid, P]} color={C.guide} fillOpacity={0} weight={1.5} />}
        <Line.Segment point1={O} point2={Mid} color={C.ink} style="dashed" weight={1.5} />
        <Polyline points={mark} color={C.ink} weight={1.2} fillOpacity={0} />
        <Line.Segment point1={P} point2={[P[0], 0]} color={C.good} style="dashed" weight={2.5} />
        <Point x={P[0]} y={0} color={C.good} />
        <Point x={O[0]} y={O[1]} color={C.ink} />
        <Point x={Q[0]} y={Q[1]} color={C.ink} />
        <Point x={P[0]} y={P[1]} color={C.good} />

        <Label at={O} attach="s">O</Label>
        <Label at={Q} attach="se">Q</Label>
        <Label at={P} attach={deg >= 33.75 ? 'n' : 'ne'}>P</Label>
        <Label at={[P[0], (2 * s2) / 3]} attach="w" color={C.good}>sin 2θ</Label>
        <Label at={mid(O, Q)} attach="s">1</Label>
        <Label at={[P[0] / 3, P[1] / 3]} attach={side(2 * th + Math.PI / 2)}>1</Label>
        <Label at={mid(Mid, Q)} attach={side(th)} color={C.f}>sin θ</Label>
        <Label at={mid(Mid, P)} attach={side(th)} color={one ? C.guide : C.g}>sin θ</Label>
        {c > 0.3 && <Label at={mid(O, Mid)} attach={side(th - Math.PI / 2)}>cos θ</Label>}
      </Plane>
      <Controls>
        <Slider label="\theta" value={deg} onChange={setDeg} min={15} max={89} step={0.1} format={v => `${v.toFixed(1)}°`} />
        <Buttons>
          <ActionButton label="The question's θ (cos θ = 1/9)" onClick={() => setDeg(Math.round(Q_DEG * 1000) / 1000)} />
          <Toggle label="One triangle only" checked={one} onChange={setOne} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\cos\\theta = ${c.toFixed(3)},\\ \\sin\\theta = ${s.toFixed(3)}`} />
          {one ? (
            <Readout color={C.bad} tex={`\\sin\\theta\\cos\\theta = ${(s * c).toFixed(3)}`} />
          ) : (
            <Readout color={C.g} tex={`2\\sin\\theta\\cos\\theta = ${(2 * s * c).toFixed(3)}`} />
          )}
          <Readout color={C.good} tex={`\\sin 2\\theta = ${s2.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
