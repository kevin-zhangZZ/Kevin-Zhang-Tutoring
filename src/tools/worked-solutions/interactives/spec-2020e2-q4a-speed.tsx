// 2020 Specialist Exam 2 Q4a — why the aeroplane is fastest at the left and right ends of its
// ellipse. The plane follows r_A(t) = (450 − 150 sin(πt/6)) i + (400 − 200 cos(πt/6)) j, so its
// velocity is −25π cos(πt/6) i + (100π/3) sin(πt/6) j. Slide t: the green arrow is the velocity
// (its length proportional to the speed), the dashed legs are its two components, and the
// speed-vs-t graph beside it peaks at 100π/3 whenever the plane moves straight up or down
// (t = 3, 9). A toggle shows the wrong idea of combining the two largest components (≈ 130.9 m/s),
// a speed the plane never reaches because those components peak at different times.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle, Vector,
  usePlayer,
} from './kit'

const W = Math.PI / 6
const xA = (t: number) => 450 - 150 * Math.sin(W * t)
const yA = (t: number) => 400 - 200 * Math.cos(W * t)
const vx = (t: number) => -25 * Math.PI * Math.cos(W * t)
const vy = (t: number) => ((100 * Math.PI) / 3) * Math.sin(W * t)
const speed = (t: number) => Math.hypot(vx(t), vy(t))
const VMAX = (100 * Math.PI) / 3
const VMIN = 25 * Math.PI
const WRONG = Math.hypot(VMIN, VMAX)
// The velocity arrow is drawn 1.6 times as long as the distance covered in 1 s, so it reads clearly.
const K = 1.6

export default function Speed() {
  const [t, setT] = useState(1.5)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setT, { min: 0, max: 12, seconds: 10 })

  const px = xA(t)
  const py = yA(t)
  const ux = vx(t)
  const uy = vy(t)
  const s = speed(t)
  const phase = ((t % 6) + 6) % 6
  const atSide = Math.abs(phase - 3) < 0.2
  const atEnd = phase < 0.2 || phase > 5.8
  const side = Math.abs(((t % 12) + 12) % 12 - 3) < 0.2 ? 'left' : 'right'
  const end = Math.abs(((t % 12) + 12) % 12 - 6) < 0.2 ? 'top' : 'bottom'

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        Combining the biggest horizontal component <M>25\pi</M> with the biggest vertical one{' '}
        <M>{'\\tfrac{100\\pi}{3}'}</M> gives <M>{'\\sqrt{(25\\pi)^2+\\left(\\tfrac{100\\pi}{3}\\right)^2}\\approx 130.9'}</M>, the
        red line. But the horizontal part is biggest when <M>{'\\cos=\\pm1'}</M>, which is exactly when{' '}
        <M>{'\\sin=0'}</M> and the vertical part vanishes. Play it: the green curve never gets near the red line.
      </Notice>
    )
  } else if (atSide) {
    notice = (
      <Notice tone="good">
        <b>Fastest.</b> At the {side} end of the ellipse <M>{'\\cos\\left(\\tfrac{\\pi t}{6}\\right)=0'}</M>, so the
        horizontal component is zero and the plane moves straight {side === 'left' ? 'up' : 'down'} at{' '}
        <M>{'\\tfrac{100\\pi}{3}\\approx104.72'}</M>. That is the long semi-axis times the rate:{' '}
        <M>{'200\\times\\tfrac{\\pi}{6}'}</M>. Each velocity component is its semi-axis times{' '}
        <M>{'\\tfrac{\\pi}{6}'}</M> times a sine or cosine, so the vertical one (semi-axis 200) can beat anything the
        horizontal one (semi-axis 150) manages.
      </Notice>
    )
  } else if (atEnd) {
    notice = (
      <Notice>
        <b>Slowest.</b> At the {end} of the ellipse <M>{'\\sin\\left(\\tfrac{\\pi t}{6}\\right)=0'}</M>, so the plane moves
        horizontally at <M>{'25\\pi\\approx78.54'}</M>, the short semi-axis times the rate:{' '}
        <M>{'150\\times\\tfrac{\\pi}{6}'}</M>. Slide to <M>t=3</M> to see the other extreme.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Both components are non-zero here, and as one grows the other shrinks, because{' '}
        <M>{'\\cos^2+\\sin^2=1'}</M> ties them together. The speed is the length of the green arrow. Slide{' '}
        <M>t</M> to <M>3</M> and watch the horizontal leg vanish while the vertical one is at its longest.
      </Notice>
    )
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Plane x={[180, 720]} y={[160, 640]} xStep={50} yStep={50} equalScale height={340} labels={false} xLabel="" yLabel="">
          <Plot.Parametric xy={u => [xA(u), yA(u)]} domain={[0, 12]} color={C.f} weight={2.5} />
          <Point x={300} y={400} color={C.guide} />
          <Point x={600} y={400} color={C.guide} />
          <Label at={[300, 400]} attach="w" color={C.guide} size={11}>(300, 400)</Label>
          <Label at={[600, 400]} attach="e" color={C.guide} size={11}>(600, 400)</Label>
          <Line.Segment point1={[px, py]} point2={[px + K * ux, py]} color={C.g} style="dashed" weight={2} />
          <Line.Segment point1={[px + K * ux, py]} point2={[px + K * ux, py + K * uy]} color={C.violet} style="dashed" weight={2} />
          <Vector tail={[px, py]} tip={[px + K * ux, py + K * uy]} color={C.good} weight={3} />
          <Point x={px} y={py} color={C.f} />
        </Plane>
        <Plane x={[0, 12]} y={[0, 140]} xStep={3} yStep={20} height={300} xLabel="t" yLabel="speed" yLabels={v => (Math.abs(v - 80) < 1e-6 || Math.abs(v - 140) < 1e-6 ? "" : String(v))}>
          <Line.Segment point1={[0, VMAX]} point2={[12, VMAX]} color={C.guide} style="dashed" weight={1.5} />
          <Label at={[12, VMAX]} attach="nw" color={C.guide} size={11}>100π/3 ≈ 104.7</Label>
          {wrong && <Line.Segment point1={[0, WRONG]} point2={[12, WRONG]} color={C.bad} style="dashed" weight={2} />}
          {wrong && <Label at={[6, WRONG]} attach="s" color={C.bad} size={11}>130.9: never reached</Label>}
          <Plot.OfX y={speed} domain={[0, 12]} color={C.good} weight={3} />
          <Line.Segment point1={[t, 0]} point2={[t, s]} color={C.guide} style="dashed" weight={1} />
          <Point x={t} y={s} color={C.good} />
        </Plane>
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
          max={12}
          step={0.05}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Fly one lap" />
          <Toggle label="Combine the two biggest components?" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\dot x = -25\\pi\\cos\\left(\\tfrac{\\pi t}{6}\\right) = ${ux.toFixed(1)}`} />
          <Readout color={C.violet} tex={`\\dot y = \\tfrac{100\\pi}{3}\\sin\\left(\\tfrac{\\pi t}{6}\\right) = ${uy.toFixed(1)}`} />
          <Readout color={C.good} tex={`\\text{speed} = \\sqrt{\\dot x^2+\\dot y^2} = ${s.toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
