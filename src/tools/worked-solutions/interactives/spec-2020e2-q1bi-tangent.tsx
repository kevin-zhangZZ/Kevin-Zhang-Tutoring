// 2020 Specialist Exam 2 Q1b.i — why dy/dx = (dy/dt)/(dx/dt) for x = 2sin(2t), y = 3cos(t). The
// velocity arrow always lies along the path; split it into its run dx/dt and its rise dy/dt and
// the tangent's gradient is rise ÷ run. At t = π the rise is 0, so the tangent is the horizontal
// line y = −3 through (0, −3). A toggle shows the report's sign slip (y = 3): a horizontal tangent
// too, but at the top of the path where the particle was at t = 0, not where it is at t = π.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Vector, num } from './kit'

const X = (t: number) => 2 * Math.sin(2 * t)
const Y = (t: number) => 3 * Math.cos(t)
const DX = (t: number) => 4 * Math.cos(2 * t)
const DY = (t: number) => -3 * Math.sin(t)
const STEP = Math.PI / 48
const K = 0.6 // arrow scale: 1 m/s is drawn 0.6 units long
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

export default function ParametricTangent() {
  const [t, setT] = useState((5 * Math.PI) / 6)
  const [slip, setSlip] = useState(false)
  const x = X(t)
  const y = Y(t)
  const vx = DX(t)
  const vy = DY(t)
  const atPi = Math.abs(t - Math.PI) < 1e-6
  const vertical = Math.abs(vx) < 1e-6
  const slope = vy / vx
  const corner: [number, number] = [x + K * vx, y]
  const tip: [number, number] = [x + K * vx, y + K * vy]

  let notice
  if (slip && atPi) {
    notice = (
      <Notice tone="warn">
        Taking <M>{'\\cos\\pi = 1'}</M> gives <M>y=3</M>. The red line is horizontal, but it touches the path at the{' '}
        <b>top</b>, <M>(0,3)</M>, where the particle was at <M>t=0</M>. At <M>{'t=\\pi'}</M> the particle is at the
        bottom, <M>(0,-3)</M>, because <M>{'\\cos\\pi=-1'}</M>, and its tangent is the green line <M>y=-3</M>. Right
        gradient, wrong point — the tangent must pass through the point of contact.
      </Notice>
    )
  } else if (atPi) {
    notice = (
      <Notice tone="good">
        At <M>{'t=\\pi'}</M> the rise is <M>{'\\tfrac{dy}{dt}=-3\\sin\\pi=0'}</M> and the run is{' '}
        <M>{'\\tfrac{dx}{dt}=4\\cos2\\pi=4'}</M>: the particle is moving purely sideways at the bottom of its path. So{' '}
        <M>{'\\tfrac{dy}{dx}=\\tfrac04=0'}</M>, and the tangent is the horizontal line through <M>(0,-3)</M>:{' '}
        <M>y=-3</M>. Turn on the toggle to see the sign slip the report mentions.
      </Notice>
    )
  } else if (vertical) {
    notice = (
      <Notice>
        Here <M>{'\\tfrac{dx}{dt}=0'}</M>: the particle moves straight {vy > 0 ? 'up' : 'down'} for an instant, so the
        tangent is vertical and <M>{'\\tfrac{dy}{dx}'}</M> is undefined — the formula would divide by zero.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The velocity arrow (orange) always points along the path. Its run is <M>{'\\tfrac{dx}{dt}'}</M> and its rise is{' '}
        <M>{'\\tfrac{dy}{dt}'}</M>, so the tangent&apos;s gradient is rise ÷ run:{' '}
        <M>{'\\tfrac{dy}{dx}=\\tfrac{dy/dt}{dx/dt}'}</M>. Slide to <M>{'t=\\pi'}</M> (3.14).
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3.5, 3.5]} y={[-4, 4]} equalScale height={420}>
        <Plot.Parametric xy={s => [X(s), Y(s)]} domain={[0, 2 * Math.PI]} color={C.f} weight={2.5} />
        {vertical ? (
          <Line.Segment point1={[x, -4.3]} point2={[x, 4.3]} color={C.guide} style="dashed" weight={2} />
        ) : (
          <Line.PointSlope point={[x, y]} slope={slope} color={atPi ? C.good : C.guide} style={atPi ? 'solid' : 'dashed'} weight={2} />
        )}
        {slip && (
          <>
            <Line.ThroughPoints point1={[-1, 3]} point2={[1, 3]} color={C.bad} weight={2.5} />
            <Point x={0} y={3} color={C.bad} />
            <Label at={[-2.4, 3]} attach="n" color={C.bad}>y = 3</Label>
            <Label at={[0, 3]} attach="ne" color={C.bad}>t = 0</Label>
          </>
        )}
        {atPi && <Label at={[-2.4, -3]} attach="n" color={C.good}>y = −3</Label>}
        {/* run and rise of the velocity arrow */}
        {Math.abs(vx) > 1e-6 && <Line.Segment point1={[x, y]} point2={corner} color={C.violet} style="dashed" weight={2} />}
        {Math.abs(vy) > 1e-6 && <Line.Segment point1={corner} point2={tip} color={C.violet} style="dashed" weight={2} />}
        <Vector tail={[x, y]} tip={tip} color={C.g} weight={3} />
        <Point x={x} y={y} color={C.f} />
        {Math.abs(vx) > 0.4 && (
          <Label at={[x + (K * vx) / 2, y]} attach={vy < -0.01 ? 'n' : 's'} color={C.violet} size={12}>
            dx/dt
          </Label>
        )}
        {Math.abs(vy) > 0.4 && (
          <Label at={[corner[0], y + (K * vy) / 2]} attach={vx >= 0 ? 'e' : 'w'} color={C.violet} size={12}>
            dy/dt
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={2 * Math.PI} step={STEP} format={tText} />
        <Toggle
          label="Sign slip: y = 3cos(π) = 3"
          checked={slip}
          onChange={v => {
            setSlip(v)
            if (v) setT(Math.PI)
          }}
        />
        <Readouts>
          <Readout color={C.violet} tex={`\\tfrac{dx}{dt}=4\\cos(2t)=${tex(vx)}`} />
          <Readout color={C.violet} tex={`\\tfrac{dy}{dt}=-3\\sin(t)=${tex(vy)}`} />
          <Readout
            color={atPi ? C.good : C.guide}
            tex={vertical ? '\\tfrac{dy}{dx}\\ \\text{undefined}' : `\\tfrac{dy}{dx}=\\tfrac{${tex(vy)}}{${tex(vx)}}=${tex(slope)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
