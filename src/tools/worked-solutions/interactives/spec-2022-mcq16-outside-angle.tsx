// 2022 Specialist Exam 2 MCQ 16 — θ sits outside the force triangle. The 5 N force runs from O
// to P; the 7 N force is drawn head-to-tail from P at angle θ to the 5 N force's direction (the
// dashed extension), which is how the angle between two forces is measured. The side that closes
// the triangle is |F₁ + F₂| = √(74 + 70 cos θ), and equilibrium needs it to be 10. That happens at
// θ = arccos(13/35) ≈ 68.2° (option A), where the triangle's own corner angle at P is
// 180° − θ ≈ 111.8°. The widget starts at θ ≈ 111.8°, the value option B's equation gives
// (63% chose B): there the closing side is only √48 ≈ 6.93, so the forces can't balance.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Slider, Vector,
} from './kit'

type V2 = [number, number]
const DEG = Math.PI / 180
const TH_A = Math.round((10 * Math.acos(13 / 35)) / DEG) / 10 // 68.2°, solves option A
const TH_B = Math.round(10 * (180 - Math.acos(13 / 35) / DEG)) / 10 // 111.8°, solves option B
// the slider snaps onto those two values when it comes within this many degrees
const SNAP = 0.6
const snap = (v: number) => (Math.abs(v - TH_A) < SNAP ? TH_A : Math.abs(v - TH_B) < SNAP ? TH_B : v)
// The triangle sits away from the origin so the axes don't run along the 5 N force.
const O: V2 = [10, 10]
const P: V2 = [O[0] + 5, O[1]]
const R_TH = 1.5 // radius of the θ arc
const R_IN = 1.0 // radius of the 180° − θ arc

function arc(c: V2, r: number, from: number, to: number, color: string) {
  return (
    <Plot.Parametric
      xy={s => [c[0] + r * Math.cos(s), c[1] + r * Math.sin(s)]}
      domain={[from, to]}
      color={color}
      weight={2.5}
    />
  )
}

export default function OutsideAngle() {
  const [deg, setDeg] = useState(TH_B)

  const th = deg * DEG
  const Q: V2 = [P[0] + 7 * Math.cos(th), P[1] + 7 * Math.sin(th)]
  const side = Math.hypot(Q[0] - O[0], Q[1] - O[1])
  const atA = deg === TH_A
  const atB = deg === TH_B
  const closeCol = atA ? C.good : C.guide

  let notice
  if (atA) {
    notice = (
      <Notice tone="good">
        <b>The closing side is 10, so a 10 N force balances the other two.</b> Here <M>{'\\theta\\approx68.2^\\circ'}</M>,
        measured from the dashed line (the 5 N force&apos;s direction) to the 7 N force. The triangle&apos;s own angle at P
        is <M>{'180^\\circ-\\theta'}</M>, so the cosine rule gives{' '}
        <M>{'10^2=5^2+7^2-2(5)(7)\\cos(180^\\circ-\\theta)'}</M>, which is option A because{' '}
        <M>{'\\cos(180^\\circ-\\theta)=-\\cos(\\theta)'}</M>.
      </Notice>
    )
  } else if (atB) {
    notice = (
      <Notice tone="warn">
        <b>This <M>{'\\theta\\approx111.8^\\circ'}</M> is what option B&apos;s equation gives.</b> But with the forces at
        this angle the closing side is only <M>{'\\sqrt{48}\\approx6.93'}</M>, not 10, so the 10 N force can&apos;t
        balance them. Option B put <M>\theta</M> inside the triangle. Drag <M>\theta</M> until the closing side is 10
        and watch which angle is 111.8° then.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The 7 N force starts at the head of the 5 N force, so the forces close into a triangle. Equilibrium needs the
        third side to be exactly 10. <M>\theta</M> is the angle between the forces, measured from the dashed line, so it
        sits <b>outside</b> the triangle. The triangle&apos;s angle at P is <M>{'180^\\circ-\\theta'}</M>. Find the{' '}
        <M>\theta</M> that makes the closing side 10.
      </Notice>
    )
  }

  // label spots on the bisectors of the two angles at P
  const midTh = th / 2
  const midIn = (th + Math.PI) / 2

  return (
    <div>
      <Plane x={[7.5, 22.5]} y={[8.6, 17.8]} xStep={1} yStep={1} equalScale height={340} labels={false} xLabel="" yLabel="">
        {/* the 5 N force's direction, continued past P */}
        <Line.Segment point1={P} point2={[O[0] + 8.5, O[1]]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[O[0] + 7.4, O[1]]} attach="s" color={C.guide} size={11}>
          5 N direction
        </Label>
        {/* the side that closes the triangle: the third force must run along it */}
        <Vector tail={Q} tip={O} color={closeCol} weight={atA ? 3 : 2} />
        <Vector tail={O} tip={P} color={C.f} weight={3} />
        <Vector tail={P} tip={Q} color={C.g} weight={3} />
        {arc(P, R_TH, 0, th, C.ink)}
        {arc(P, R_IN, th, Math.PI, C.violet)}
        <Label at={[P[0] + R_TH * Math.cos(midTh), P[1] + R_TH * Math.sin(midTh)]} attach={deg < 60 ? 'e' : 'ne'} color={C.ink}>
          θ
        </Label>
        <Label
          at={[P[0] + R_IN * Math.cos(midIn), P[1] + R_IN * Math.sin(midIn)]}
          attach={deg > 150 ? 'n' : 'nw'}
          color={C.violet}
          size={12}
        >
          180° − θ
        </Label>
        <Label at={[O[0] + 2.5, O[1]]} attach="s" color={C.f}>
          5 N
        </Label>
        <Label at={[(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2]} attach={deg < 90 ? 'e' : 'ne'} color={C.g}>
          7 N
        </Label>
        <Label at={[(O[0] + Q[0]) / 2, (O[1] + Q[1]) / 2]} attach="w" color={atA ? C.good : C.ink} size={12}>
          {side.toFixed(2)}
        </Label>
        <Label at={O} attach="sw" color={C.ink} size={12}>
          O
        </Label>
        <Label at={P} attach="s" color={C.ink} size={12} gap={14}>
          P
        </Label>
      </Plane>
      <Controls>
        <Slider label="\theta" value={deg} onChange={v => setDeg(snap(v))} min={5} max={175} step={0.1} format={n => `${n.toFixed(1)}°`} />
        <Buttons>
          <ActionButton label="θ from option B" onClick={() => setDeg(TH_B)} />
          <ActionButton label="θ from option A" onClick={() => setDeg(TH_A)} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\theta=${deg.toFixed(1)}^\\circ`} />
          <Readout color={C.violet} tex={`180^\\circ-\\theta=${(180 - deg).toFixed(1)}^\\circ`} />
          <Readout color={closeCol} tex={`\\left|\\underset{\\sim}{F_1}+\\underset{\\sim}{F_2}\\right|=${side.toFixed(2)}${atA ? '\\ \\checkmark' : '\\ne10'}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
