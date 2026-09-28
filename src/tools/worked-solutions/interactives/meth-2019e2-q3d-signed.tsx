// 2019 Methods Exam 2 Q3d — why ∫₀⁶ f(t) dt = 12/π is not the area 15/π. Sweep the upper terminal
// b from 0 to 6: the hump on [0, 4] (green) builds both the integral and the area, but past t = 4 the
// curve dips below the axis (red), and the integral starts going DOWN while the area keeps going up.
// A toggle flips the dip above the axis, which is what "subtract the negative integral" does.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Readout, Readouts, Region, Slider, Toggle, integrate, usePlayer } from './kit'

const f = (t: number) => Math.sin((Math.PI * t) / 3) + Math.sin((Math.PI * t) / 6)
const zero = () => 0

export default function SignedAreaWidget() {
  const [b, setB] = useState(6)
  const [flip, setFlip] = useState(false)
  const player = usePlayer(setB, { min: 0, max: 6, seconds: 6 })

  const signed = integrate(f, 0, b, 400)
  const area = integrate(t => Math.abs(f(t)), 0, b, 400)
  const pastDip = b > 4.001
  const done = b > 5.995

  let notice
  if (!pastDip) {
    notice = (
      <Notice>
        Up to <M>t = 4</M> the curve is above the axis, so the integral and the area grow together. Keep sweeping{' '}
        <M>b</M> past <M>4</M> and watch the two readouts part company.
      </Notice>
    )
  } else if (flip) {
    notice = (
      <Notice tone="good">
        Flipped above the axis, the dip adds its size <M>{'\\tfrac{3}{2\\pi}'}</M> to the hump&apos;s{' '}
        <M>{'\\tfrac{27}{2\\pi}'}</M>, giving <M>{'\\tfrac{30}{2\\pi}=\\tfrac{15}{\\pi}\\approx4.77'}</M>. That is exactly
        what <M>{'\\int_0^4 f\\,dt-\\int_4^6 f\\,dt'}</M> does: the second integral is negative, so subtracting it adds.
      </Notice>
    )
  } else if (done) {
    notice = (
      <Notice tone="warn">
        <M>{'\\int_0^6 f(t)\\,dt=\\tfrac{12}{\\pi}\\approx3.82'}</M>, the report&apos;s most common wrong answer. The red
        dip was <em>subtracted</em> from the hump instead of added, so the result is short by twice the dip:{' '}
        <M>{'\\tfrac{15}{\\pi}-\\tfrac{12}{\\pi}=2\\times\\tfrac{3}{2\\pi}'}</M>. Turn on &ldquo;Flip the dip up&rdquo;.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Past <M>t = 4</M>, <M>f(t)</M> is negative, so each new strip makes the integral <b>smaller</b> while the area
        still gets bigger. Sweep on to <M>b = 6</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 6.3]} y={[-0.8, 2]} xStep={1} yStep={0.5} height={280} xLabel="t" yLabels={v => (Number.isInteger(v) || v === 0.5 ? String(v) : '')}>
        <Region top={f} bottom={zero} from={0} to={Math.min(b, 4)} color={C.good} opacity={0.3} />
        {pastDip && !flip && <Region top={zero} bottom={f} from={4} to={b} color={C.bad} opacity={0.35} />}
        {pastDip && flip && <Region top={t => -f(t)} bottom={zero} from={4} to={b} color={C.good} opacity={0.3} />}
        {pastDip && flip && <Plot.OfX y={t => -f(t)} domain={[4, b]} color={C.good} weight={2} style="dashed" />}
        <Plot.OfX y={f} domain={[0, 6.3]} color={C.f} weight={3} />
        <Line.Segment point1={[b, -0.8]} point2={[b, 2]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[b, 1.95]} color={C.guide} attach={b > 5 ? 'sw' : 'se'}>{`b = ${b.toFixed(2)}`}</Label>
        <Label at={[2, 0.55]} color={C.good} attach="c">hump</Label>
        {pastDip && <Label at={[5, flip ? 0.55 : -0.55]} color={flip ? C.good : C.bad} attach="c">dip</Label>}
        <Label at={[1.1, f(1.1)]} color={C.f} attach="w">f</Label>
      </Plane>
      <Controls>
        <Slider
          label="b"
          value={b}
          onChange={v => {
            player.stop()
            setB(v)
          }}
          min={0}
          max={6}
          step={0.05}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(b)} label="Sweep from 0 to 6" />
          <Toggle label="Flip the dip up" checked={flip} onChange={setFlip} />
        </Buttons>
        <Readouts>
          <Readout color={pastDip && !flip ? C.bad : C.f} tex={`\\int_0^{${b.toFixed(2)}} f(t)\\,dt \\approx ${signed.toFixed(3)}`} />
          <Readout color={C.good} tex={`\\text{area} \\approx ${area.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
