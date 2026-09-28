// 2017 Methods Exam 1 Q6a — tan(θ) is the slope of the radius OP, where P = (cos θ, sin θ) on the
// unit circle (rise sin θ over run cos θ). So each factor of
// (tan θ − 1)(sin θ − √3 cos θ)(sin θ + √3 cos θ) = 0 is zero exactly when P sits on one line
// through O: y = x, y = √3x or y = −√3x — slopes 1, √3, −√3, the three values of tan θ. Drag P
// and watch each factor's value. A toggle tries the report's wrong third value 1/√3: at θ = π/6
// the third factor is 2, not 0 (its terms have the same sign, so they can't cancel).

import { useState } from 'react'
import {
  Buttons, C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Readout, Readouts, Slider, Toggle,
  clamp, num,
} from './kit'

const STEP = Math.PI / 60 // slider and drag snap to multiples of π/60 (3°), so π/6, π/4, π/3 … are hit exactly
const TAU = 2 * Math.PI
const R3 = Math.sqrt(3)
const snap = (t: number) => clamp(Math.round(t / STEP) * STEP, 0, TAU)
const zero = (v: number) => Math.abs(v) < 1e-9

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}
/** θ as a reduced multiple of π, e.g. "2π/3". */
function piText(t: number): string {
  const n = Math.round(t / STEP)
  if (n === 0) return '0'
  const g = gcd(n, 60)
  const a = n / g
  const b = 60 / g
  return `${a === 1 ? '' : a}π${b === 1 ? '' : `/${b}`}`
}
/** tan θ, exact at the angles a student is likely to stop on. */
function tanTex(t: number): string {
  const c = Math.cos(t)
  if (Math.abs(c) < 1e-9) return '\\text{undefined}'
  const v = Math.sin(t) / c
  for (const [x, tex] of [[0, '0'], [1, '1'], [-1, '-1'], [R3, '\\sqrt3'], [-R3, '-\\sqrt3'], [1 / R3, '\\tfrac{1}{\\sqrt3}'], [-1 / R3, '-\\tfrac{1}{\\sqrt3}']] as const) {
    if (Math.abs(v - x) < 1e-9) return `= ${tex}`
  }
  return `\\approx ${num(v, 2)}`
}
/** A factor's value: "= 0 ✓" when zero, an exact integer when it is one, else 2 dp. */
function valTex(v: number): string {
  if (zero(v)) return '= 0\\ \\checkmark'
  if (Math.abs(v - Math.round(v)) < 1e-9) return `= ${Math.round(v)}`
  return `\\approx ${num(v, 2)}`
}

export default function Slopes() {
  const [t, setT] = useState(Math.PI / 3)
  const [wrong, setWrong] = useState(false)
  const move = (v: number) => setT(snap(v))

  const c = Math.cos(t)
  const s = Math.sin(t)
  const vertical = Math.abs(c) < 1e-9
  const f1 = vertical ? NaN : s / c - 1
  const f2 = s - R3 * c
  const f3 = s + R3 * c
  const on1 = !vertical && zero(f1)
  const on2 = zero(f2)
  const on3 = zero(f3)
  const pColor = on1 ? C.f : on2 ? C.g : on3 ? C.violet : C.ink

  let notice
  if (wrong && !on3) {
    notice = (
      <Notice tone="warn">
        The red line <M>{'y = \\tfrac{1}{\\sqrt3}x'}</M> is where <M>{'\\tan\\theta = \\tfrac{1}{\\sqrt3}'}</M>, e.g. at{' '}
        <M>{'\\theta = \\tfrac{\\pi}{6}'}</M>. There the third factor is{' '}
        <M>{'\\tfrac12 + \\tfrac32 = 2'}</M>, not <M>0</M>. For{' '}
        <M>{'\\sin\\theta + \\sqrt3\\cos\\theta'}</M> to cancel, <M>{'\\sin\\theta'}</M> and <M>{'\\cos\\theta'}</M> need
        opposite signs, so <M>P</M> is in quadrant 2 or 4 and the slope is negative. Drag <M>P</M> onto the violet line.
      </Notice>
    )
  } else if (on1) {
    notice = (
      <Notice tone="good">
        <M>{'\\tan\\theta - 1 = 0'}</M>: <M>P</M> is on <M>y = x</M>, so the radius has slope <M>1</M>. The opposite point
        on the same line (<M>{'\\tfrac{\\pi}{4}'}</M> and <M>{'\\tfrac{5\\pi}{4}'}</M>) has the same slope: two angles,
        but only one value of <M>{'\\tan\\theta'}</M>. Part (a) wants values of <M>{'\\tan\\theta'}</M>, so this factor
        gives just <M>1</M>.
      </Notice>
    )
  } else if (on2) {
    notice = (
      <Notice tone="good">
        <M>{'\\sin\\theta - \\sqrt3\\cos\\theta = 0'}</M> says <M>{'\\sin\\theta = \\sqrt3\\cos\\theta'}</M>: the rise of{' '}
        <M>P</M> is <M>{'\\sqrt3'}</M> times its run, so <M>P</M> is on <M>{'y = \\sqrt3x'}</M>. The slope of{' '}
        <M>OP</M> is rise ÷ run <M>{'= \\tfrac{\\sin\\theta}{\\cos\\theta} = \\tan\\theta'}</M>, so{' '}
        <M>{'\\tan\\theta = \\sqrt3'}</M>. Now drag <M>P</M> to the other two lines.
      </Notice>
    )
  } else if (on3) {
    notice = (
      <Notice tone="good">
        <M>{'\\sin\\theta + \\sqrt3\\cos\\theta = 0'}</M> says <M>{'\\sin\\theta = -\\sqrt3\\cos\\theta'}</M>: <M>P</M> is
        on <M>{'y = -\\sqrt3x'}</M>. Rise and run have opposite signs, so the slope{' '}
        <M>{'\\tan\\theta = -\\sqrt3'}</M> is negative. The report says some students gave{' '}
        <M>{'\\tfrac{1}{\\sqrt3}'}</M> here instead: positive, and the wrong size.{' '}
        {wrong ? 'The red line slopes up; this one slopes down.' : 'Turn on the toggle to see why that value fails.'}
      </Notice>
    )
  } else if (vertical) {
    notice = (
      <Notice>
        Here <M>{'\\cos\\theta = 0'}</M>: the run is zero, so the radius is vertical and <M>{'\\tan\\theta'}</M> is
        undefined. Neither sin–cos factor is zero here (<M>{'\\sin\\theta = \\pm1'}</M>), so dividing those factors by{' '}
        <M>{'\\cos\\theta'}</M> loses no solutions.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The radius <M>OP</M> rises <M>{'\\sin\\theta'}</M> over a run of <M>{'\\cos\\theta'}</M>, so its slope is{' '}
        <M>{'\\tfrac{\\sin\\theta}{\\cos\\theta} = \\tan\\theta'}</M>. Each factor is zero exactly when <M>P</M> sits on
        one of the three dashed lines through <M>O</M>. Drag <M>P</M> onto each line and read off{' '}
        <M>{'\\tan\\theta'}</M>.
      </Notice>
    )
  }

  const up = s >= 0
  const right = c >= 0

  return (
    <div>
      <Plane x={[-1.5, 1.5]} y={[-1.5, 1.5]} height={360} equalScale labels={false}>
        <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} weight={2} />
        {/* where each factor is zero: a line through O with slope 1, √3, −√3 */}
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.f} style="dashed" weight={2} />
        <Line.ThroughPoints point1={[0, 0]} point2={[1, R3]} color={C.g} style="dashed" weight={2} />
        <Line.ThroughPoints point1={[0, 0]} point2={[-1, R3]} color={C.violet} style="dashed" weight={2} />
        <Label at={[1.56, 1.56]} color={C.f} attach="w" gap={10}>y = x</Label>
        <Label at={[0.9, 1.56]} color={C.g} attach="w" gap={8}>y = √3x</Label>
        <Label at={[-0.9, 1.56]} color={C.violet} attach="e" gap={8}>y = −√3x</Label>
        {wrong && (
          <>
            <Line.ThroughPoints point1={[0, 0]} point2={[R3, 1]} color={C.bad} style="dashed" weight={2} />
            <Label at={[-1.3, -1.3 / R3]} color={C.bad} attach="n" gap={8}>y = x/√3</Label>
          </>
        )}
        {/* rise over run: the slope of OP */}
        {!vertical && <Line.Segment point1={[0, 0]} point2={[c, 0]} color={C.ink} weight={3} />}
        {Math.abs(s) > 1e-9 && <Line.Segment point1={[c, 0]} point2={[c, s]} color={C.ink} weight={3} />}
        {Math.abs(c) > 0.2 && (
          <Label at={[c / 2, 0]} attach={up ? 's' : 'n'} gap={8}>cos θ</Label>
        )}
        {Math.abs(s) > 0.2 && (
          <Label at={[c, s / 2]} attach={right ? 'e' : 'w'} gap={8}>sin θ</Label>
        )}
        <Line.Segment point1={[0, 0]} point2={[c, s]} color={pColor} weight={3} />
        <MovablePoint
          point={[c, s]}
          onMove={([px, py]) => {
            let a = Math.atan2(py, px)
            if (a < 0) a += TAU
            // don't let a drag just below the positive x-axis jump from 2π back to 0
            if (t > Math.PI && a < 0.05) a = TAU
            move(a)
          }}
          color={pColor}
        />
        <Label at={[c, s]} color={pColor} attach={right ? (up ? 'ne' : 'se') : up ? 'nw' : 'sw'} gap={12}>P</Label>
      </Plane>
      <Controls>
        <Slider label="\theta" value={t} onChange={move} min={0} max={TAU} step={STEP} format={piText} />
        <Buttons>
          <Toggle
            label={<>Try the third value as <M>{'\\tfrac{1}{\\sqrt3}'}</M></>}
            checked={wrong}
            onChange={v => {
              setWrong(v)
              if (v) setT(Math.PI / 6)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout tex={`\\tan\\theta ${tanTex(t)}`} />
          <Readout color={C.f} tex={vertical ? '\\tan\\theta - 1\\ \\text{undefined}' : `\\tan\\theta - 1 ${valTex(f1)}`} />
          <Readout color={C.g} tex={`\\sin\\theta - \\sqrt3\\cos\\theta ${valTex(f2)}`} />
          <Readout color={wrong && !on3 ? C.bad : C.violet} tex={`\\sin\\theta + \\sqrt3\\cos\\theta ${valTex(f3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
