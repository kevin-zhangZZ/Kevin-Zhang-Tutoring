// 2017 Specialist Exam 1 Q7 — the arc-length integrand is the particle's speed. On the left the
// particle moves along r(t) = cos³t i + sin³t j with its velocity vector (drawn at 1/5 size) and
// the vector's legs dx/dt and dy/dt, so the speed √((dx/dt)² + (dy/dt)²) is the arrow's length.
// On the right the speed 3 sin t cos t is graphed and the area under it up to t (the distance
// travelled, (3/2)sin²t) is shaded: at t = π/4 it is 3/4. A toggle shows the velocity found
// without the chain rule, (3cos²t, 3sin²t): it does not point along the path (at t = π/4 it is
// perpendicular to it), so it cannot be the velocity.

import { useState } from 'react'
import {
  C, Buttons, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Region, Slider,
  Toggle, Vector, usePlayer,
} from './kit'

const T_END = Math.PI / 4
const S = 1 / 5 // arrows are drawn at 1/5 of their true length
const r = (t: number): [number, number] => [Math.cos(t) ** 3, Math.sin(t) ** 3]
const vel = (t: number): [number, number] => [
  -3 * Math.cos(t) ** 2 * Math.sin(t),
  3 * Math.sin(t) ** 2 * Math.cos(t),
]
const noChain = (t: number): [number, number] => [3 * Math.cos(t) ** 2, 3 * Math.sin(t) ** 2]
const speed = (t: number) => 3 * Math.sin(t) * Math.cos(t)
const travelled = (t: number) => 1.5 * Math.sin(t) ** 2

const piLabel = (v: number) => {
  const k = Math.round(v / (Math.PI / 8))
  return ({ 1: 'π/8', 2: 'π/4' } as Record<number, string>)[k] ?? ''
}

export default function Speed() {
  const [t, setT] = useState(0.45)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setT, { min: 0, max: T_END, seconds: 5 })

  const P = r(t)
  const [vx, vy] = vel(t)
  const [wx, wy] = noChain(t)
  // Legs drawn up from the particle, then across to the tip, so their labels sit in empty space.
  const corner: [number, number] = [P[0], P[1] + S * vy]
  const tip: [number, number] = [P[0] + S * vx, P[1] + S * vy]
  const wTip: [number, number] = [P[0] + S * wx, P[1] + S * wy]
  const sp = speed(t)
  const atEnd = t > T_END - 0.005
  const atStart = t < 0.04

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <b>Without the chain rule</b> you get <M>{'\\tfrac{dx}{dt}=3\\cos^2 t'}</M> and{' '}
        <M>{'\\tfrac{dy}{dt}=3\\sin^2 t'}</M>. The red arrow points up and to the <b>right</b>, off the path; at{' '}
        <M>{'t=\\tfrac{\\pi}{4}'}</M> it is perpendicular to it. But <M>{'x=\\cos^3 t'}</M> is decreasing here, so{' '}
        <M>{'\\tfrac{dx}{dt}'}</M> must be negative. The missing factor is the derivative of the inside,{' '}
        <M>{'\\cos t \\to -\\sin t'}</M>.
      </Notice>
    )
  } else if (atStart) {
    notice = (
      <Notice>
        At <M>t=0</M> the particle is at rest at <M>(1,0)</M>: both <M>{'\\tfrac{dx}{dt}'}</M> and{' '}
        <M>{'\\tfrac{dy}{dt}'}</M> are <M>0</M>, so the speed graph starts at <M>0</M>. Press play and watch the arrow
        grow as the particle speeds up.
      </Notice>
    )
  } else if (atEnd) {
    notice = (
      <Notice tone="good">
        <b>The shaded area is now</b> <M>{'\\int_0^{\\pi/4}3\\sin t\\cos t\\,dt=\\tfrac34'}</M>, the length of the path.
        Here <M>{'3\sin t\cos t\ge 0'}</M>, which is why the root needed no absolute value. Now turn on
        &ldquo;Forget the chain rule&rdquo;.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The purple arrow is the velocity. Its legs are <M>{'\\tfrac{dx}{dt}'}</M> (negative: moving left) and{' '}
        <M>{'\\tfrac{dy}{dt}'}</M> (up), so by Pythagoras its length, the <b>speed</b>, is{' '}
        <M>{'\\sqrt{\\left(\\tfrac{dx}{dt}\\right)^2+\\left(\\tfrac{dy}{dt}\\right)^2}'}</M>. In a tiny time{' '}
        <M>dt</M> the particle covers speed <M>{'\\times\\ dt'}</M>, so the distance so far is the shaded area. Slide{' '}
        <M>t</M> to <M>{'\\tfrac{\\pi}{4}'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">The path, with the velocity drawn at 1/5 size</p>
          <Plane x={[0.1, 1.65]} y={[-0.06, 0.72]} xStep={0.5} yStep={0.25} height={360} equalScale>
            <Plot.Parametric xy={r} domain={[0, T_END]} color={C.f} weight={1.5} style="dashed" />
            {t > 0.002 && <Plot.Parametric xy={r} domain={[0, t]} color={C.f} weight={4} />}
            {!wrong && sp > 0.05 && (
              <>
                <Line.Segment point1={P} point2={corner} color={C.guide} style="dashed" weight={1.5} />
                <Line.Segment point1={corner} point2={tip} color={C.guide} style="dashed" weight={1.5} />
              </>
            )}
            {!wrong && sp > 0.5 && (
              <>
                <Label at={[(corner[0] + tip[0]) / 2, tip[1]]} attach="n" color={C.guide} size={12}>dx/dt</Label>
                <Label at={[P[0], (P[1] + corner[1]) / 2]} attach="e" color={C.guide} size={12}>dy/dt</Label>
              </>
            )}
            {sp > 0.01 && <Vector tail={P} tip={tip} color={C.violet} weight={3} />}
            {wrong && <Vector tail={P} tip={wTip} color={C.bad} weight={3} />}
            <Point x={P[0]} y={P[1]} color={C.f} />
          </Plane>
        </div>
        <div>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">Speed against time</p>
          <Plane
            x={[0, 0.9]}
            y={[0, 1.7]}
            xStep={Math.PI / 8}
            yStep={0.5}
            height={220}
            xLabel="t"
            yLabel="speed"
            xLabels={piLabel}
          >
            {t > 0.002 && <Region top={speed} bottom={() => 0} from={0} to={t} color={C.f} opacity={0.25} />}
            <Plot.OfX y={speed} domain={[0, T_END]} color={C.violet} weight={3} />
            <Line.Segment point1={[t, 0]} point2={[t, sp]} color={C.violet} style="dashed" weight={1.5} />
            <Point x={t} y={sp} color={C.violet} />
            <Label at={[0.3, 0.12]} attach="c" color={C.f} size={12}>{`area ≈ ${travelled(t).toFixed(3)}`}</Label>
          </Plane>
        </div>
      </div>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={T_END}
          step={0.005}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Run from t = 0 to π/4" />
          <Toggle label="Forget the chain rule" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          {wrong ? (
            <Readout color={C.bad} tex={`\\text{no chain rule: } \\left(3\\cos^2 t,\\ 3\\sin^2 t\\right) = (${wx.toFixed(2)},\\ ${wy.toFixed(2)})`} />
          ) : (
            <Readout color={C.violet} tex={`\\left(\\tfrac{dx}{dt},\\ \\tfrac{dy}{dt}\\right) = (${vx.toFixed(2)},\\ ${vy.toFixed(2)})`} />
          )}
          <Readout color={C.violet} tex={`\\text{speed} = 3\\sin t\\cos t = ${sp.toFixed(3)}`} />
          <Readout color={C.f} tex={`\\text{distance} = \\tfrac32\\sin^2 t = ${travelled(t).toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
