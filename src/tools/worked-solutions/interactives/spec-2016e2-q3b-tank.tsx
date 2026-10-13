// 2016 Specialist Exam 2 Q3b — the amount of salt y (kg) is not the concentration (kg/L), and
// neither is dy/dt (kg/min). The tank fills at 10 L/min from 100 L, so V = 100 + 10t, and with
// y = (t² + 20t + 900)/(6(10 + t)) from part d the shading shows the concentration y/V. At t = 10
// and t = 30 the tank holds the same 10 kg of salt, but in 200 L and 400 L: concentrations 0.05 and
// 0.025 kg/L. The amount y falls then rises (minimum ≈ 9.43 kg at t = 10√8 − 10 ≈ 18.28) while the
// concentration falls the whole time towards 1/60. All values checked with sympy.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, M, Notice, Plane, Polygon, Readout, Readouts, Slider, num } from './kit'

const vol = (t: number) => 100 + 10 * t
const salt = (t: number) => (t * t + 20 * t + 900) / (6 * (10 + t))
const rate = (t: number) => (t * t + 20 * t - 700) / (6 * (10 + t) ** 2)
const T_MIN = Math.sqrt(800) - 10

export default function Tank() {
  const [t, setT] = useState(10)
  const V = vol(t)
  const y = salt(t)
  const c = y / V
  const h = V / 100
  const near = (a: number) => Math.abs(t - a) < 0.25

  let notice
  if (near(10) || near(30)) {
    notice = (
      <Notice tone="good">
        <b>The tank holds 10 kg of salt at both <M>t = 10</M> and <M>t = 30</M></b>, but in 200 L and then 400 L of
        solution, so the concentration halves from 0.05 to 0.025 kg/L. Same <M>y</M>, different concentration: the
        concentration needs the volume, <M>{'\\dfrac{y}{100+10t}'}</M>.{' '}
        {near(10) ? <>Now press <b><M>t = 30</M></b>.</> : <>Slide <M>t</M> back to 0 and watch the two numbers move differently.</>}
      </Notice>
    )
  } else if (t > T_MIN) {
    notice = (
      <Notice>
        After <M>{'t \\approx 18.28'}</M> the amount of salt <M>y</M> is <b>increasing</b> (<M>{'\\tfrac{dy}{dt} > 0'}</M>), yet the
        shading keeps getting lighter: the concentration is still falling, because the volume grows faster than the
        salt. That is why <M>y</M>, <M>{'\\tfrac{dy}{dt}'}</M> and the concentration are three different answers.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The shading is the concentration: kilograms of salt <b>per litre</b>. It is <M>y</M> divided by the volume,
        which grows by 10 L each minute (20 L/min in, 10 L/min out). <M>{'\\tfrac{dy}{dt}'}</M> is something else again:
        how fast the kilograms change, in kg/min. Press <b><M>t = 10</M></b> and then <b><M>t = 30</M></b>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 8]} y={[0, 7.4]} height={320} labels={false} xLabel="" yLabel="" xStep={8} yStep={8} label="Tank 2: its volume and the concentration of salt">
        <Polygon points={[[2, 0], [6, 0], [6, h], [2, h]]} color={C.f} fillOpacity={0.08 + 0.85 * (c / 0.15)} weight={0} />
        <Polygon points={[[2, 7], [2, 0], [6, 0], [6, 7]]} color={C.guide} fillOpacity={0} weight={2} />
        <Label at={[4, h]} attach="n">{`V = ${num(V, 0)} L`}</Label>
        <Label at={[6, h / 2]} attach="e">{`${num(y, 2)} kg`}</Label>
        <Label at={[1, 7]} attach="c" bold={false} size={12}>700 L</Label>
        <Label at={[1, 1]} attach="c" bold={false} size={12}>100 L</Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={60} step={0.5} format={v => `${v.toFixed(1)} min`} />
        <Buttons>
          <ActionButton label={<M>t = 10</M>} onClick={() => setT(10)} />
          <ActionButton label={<M>t = 30</M>} onClick={() => setT(30)} />
          <ActionButton label={<M>t = 0</M>} onClick={() => setT(0)} />
        </Buttons>
        <Readouts>
          <Readout tex={`y = ${num(y, 2)}\\ \\text{kg}`} />
          <Readout tex={`100+10t = ${num(V, 0)}\\ \\text{L}`} />
          <Readout color={C.f} tex={`\\text{concentration} = \\dfrac{y}{100+10t} = ${num(c, 3)}\\ \\text{kg/L}`} />
          <Readout tex={`\\dfrac{dy}{dt} = ${num(rate(t), 3)}\\ \\text{kg/min}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
