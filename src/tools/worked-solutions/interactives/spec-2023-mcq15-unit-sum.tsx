// 2023 Specialist Exam 2 MCQ 15 — only a 120° angle makes the sum of two unit vectors a unit
// vector. a = i is fixed and b is a unit vector at angle θ to it; the rhombus above the axis has
// diagonal a + b (violet), the one below has diagonal a − b = a + (−b) (green), as in the report's
// second diagram. The dashed circle is every unit vector's tip, so |a + b| = 1 exactly when the
// violet tip lands on it: 2 + 2cos θ = 1, θ = 120°, and then |a − b| = √(2 − 2cos θ) = √3.
// It starts at 90°, where |a − b| = √2 (option C) but |a + b| = √2 as well, breaking the condition;
// at 0°, b = a gives |a − b| = 0 (option A) but |a + b| = 2.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Slider, Vector, num,
} from './kit'

const A: [number, number] = [1, 0]
const V = (s: string) => `\\underset{\\sim}{${s}}`

export default function UnitSum() {
  const [deg, setDeg] = useState(90)

  const t = (deg * Math.PI) / 180
  const c = Math.cos(t)
  const B: [number, number] = [c, Math.sin(t)]
  const negB: [number, number] = [-B[0], -B[1]]
  const S: [number, number] = [1 + B[0], B[1]] // a + b
  const D: [number, number] = [1 - B[0], -B[1]] // a − b
  const sumLen = Math.sqrt(2 + 2 * c)
  const diffLen = Math.sqrt(2 - 2 * c)
  const at120 = Math.abs(deg - 120) < 0.5
  const at90 = Math.abs(deg - 90) < 0.5
  const at0 = deg < 0.5

  let notice
  if (at120) {
    notice = (
      <Notice tone="good">
        <b>Now <M>{`|${V('a')}+${V('b')}| = 1`}</M></b>: the violet tip lands on the dashed unit circle. This is the only
        angle that works, since <M>{'2 + 2\\cos\\theta = 1'}</M> gives <M>{'\\cos\\theta = -\\tfrac12'}</M>, so{' '}
        <M>{'\\theta = 120^\\circ'}</M>: <M>{V('a')}</M>, <M>{V('b')}</M> and <M>{`${V('a')}+${V('b')}`}</M> make an
        equilateral triangle. Then <M>{`|${V('a')}-${V('b')}| = \\sqrt{2 - 2\\left(-\\tfrac12\\right)} = \\sqrt3 \\approx 1.73`}</M>,
        option D.
      </Notice>
    )
  } else if (at0) {
    notice = (
      <Notice tone="warn">
        At <M>{'0^\\circ'}</M>,{' '}<M>{`${V('b')} = ${V('a')}`}</M>, so the difference has length 0, option A. But then{' '}
        <M>{`${V('a')}+${V('b')} = 2${V('a')}`}</M> has length 2, far outside the dashed unit circle. Open the angle.
      </Notice>
    )
  } else if (at90) {
    notice = (
      <Notice tone="warn">
        At <M>{'90^\\circ'}</M> the difference has length <M>{'\\sqrt2'}</M>, option C. But the sum has length{' '}
        <M>{'\\sqrt2'}</M> too, so its violet tip is outside the dashed unit circle: perpendicular unit vectors
        don&apos;t meet the condition. Drag <M>\theta</M> until the violet tip lands on the circle.
      </Notice>
    )
  } else if (deg < 120) {
    notice = (
      <Notice>
        Here <M>{`|${V('a')}+${V('b')}| \\approx ${num(sumLen, 3)}`}</M>, more than 1: the violet tip is outside the
        dashed unit circle, so the sum is not a unit vector. Open the angle wider.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Here <M>{`|${V('a')}+${V('b')}| \\approx ${num(sumLen, 3)}`}</M>, less than 1: the violet tip is inside the
        dashed unit circle. Close the angle a little.
      </Notice>
    )
  }

  const nb: [number, number] = [-B[1], B[0]]
  return (
    <div>
      <Plane x={[-1.35, 2.2]} y={[-1.3, 1.3]} xStep={1} yStep={1} equalScale labels={false} xLabel="" yLabel="" height={340}>
        <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} weight={1.5} strokeStyle="dashed" />
        {/* The two parallelograms: a, b (above) and a, −b (below). */}
        <Line.Segment point1={A} point2={S} color={C.guide} weight={1.5} style="dashed" />
        <Line.Segment point1={B} point2={S} color={C.guide} weight={1.5} style="dashed" />
        <Line.Segment point1={A} point2={D} color={C.guide} weight={1.5} style="dashed" />
        <Line.Segment point1={negB} point2={D} color={C.guide} weight={1.5} style="dashed" />
        {t > 0.05 && <Plot.Parametric xy={u => [0.22 * Math.cos(u), 0.22 * Math.sin(u)]} t={[0, t]} color={C.ink} weight={1.5} />}
        <Vector tail={[0, 0]} tip={negB} color={C.g} weight={2} style="dashed" />
        <Vector tail={[0, 0]} tip={A} color={C.f} weight={3} />
        <Vector tail={[0, 0]} tip={B} color={C.g} weight={3} />
        {sumLen > 0.05 && <Vector tail={[0, 0]} tip={S} color={C.violet} weight={3.5} />}
        {diffLen > 0.05 && <Vector tail={[0, 0]} tip={D} color={C.good} weight={3.5} />}
        {/* a + b bisects the angle (rhombus), so θ sits nearer a to keep clear of it. */}
        {t > 0.05 && <Label at={[0.4 * Math.cos(Math.max(0.28 * t, 0.3)), 0.4 * Math.sin(Math.max(0.28 * t, 0.3))]} attach="c" size={12} italic>θ</Label>}
        <Label at={[0.6, 0]} color={C.f} attach="s" size={13} italic>a</Label>
        {/* b sits off its tip both sideways and outwards, clear of the dashed circle through the tip. */}
        <Label at={[B[0] + 0.13 * (nb[0] + B[0]), B[1] + 0.13 * (nb[1] + B[1])]} color={C.g} attach="c" size={13} italic>b</Label>
        <Label at={negB} color={C.g} attach={deg < 135 ? 'sw' : 's'} size={13} italic>−b</Label>
        {sumLen > 0.05 && <Label at={S} color={C.violet} attach={S[0] > 1.7 ? 'n' : 'ne'} size={13} italic>a + b</Label>}
        {diffLen > 0.05 && <Label at={D} color={C.good} attach={D[0] > 1.6 ? 's' : 'se'} size={13} italic>a − b</Label>}
      </Plane>
      <Controls>
        <Slider label="\theta" value={deg} onChange={setDeg} min={0} max={180} step={1} format={v => `${v.toFixed(0)}°`} />
        <Buttons>
          <ActionButton label="Make a + b a unit vector" onClick={() => setDeg(120)} />
        </Buttons>
        <Readouts>
          <Readout tex={`${V('a')}\\cdot${V('b')} = \\cos ${deg.toFixed(0)}^\\circ \\approx ${num(c, 3)}`} />
          <Readout
            color={C.violet}
            tex={`|${V('a')}+${V('b')}| = \\sqrt{2+2\\cos\\theta} \\approx ${num(sumLen, 3)}${at120 ? '\\ \\checkmark' : ''}`}
          />
          <Readout color={C.good} tex={`|${V('a')}-${V('b')}| = \\sqrt{2-2\\cos\\theta} \\approx ${num(diffLen, 3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
