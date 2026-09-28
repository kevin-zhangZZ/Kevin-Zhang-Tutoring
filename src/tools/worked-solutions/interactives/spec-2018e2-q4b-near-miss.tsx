// 2018 Specialist Exam 2 Q4b — crossing paths is not the same as colliding. A time slider sails both
// yachts along r_A(t) = (t+1)i + (t²+2t)j and r_B(t) = t²i + (t²+3)j. Buttons jump to the only time the
// j-components agree (t = 3/2, yachts 0.25 km apart), the time the i-components agree (t = (1+√5)/2, the
// report's method), and the moments each yacht passes the crossing point X: A at t ≈ 1.562 h, B at
// t ≈ 1.600 h, about 2.3 minutes later. A zoom toggle shows the near miss up close.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle,
  usePlayer,
} from './kit'

type V = [number, number]
const rA = (t: number): V => [t + 1, t * t + 2 * t]
const rB = (t: number): V => [t * t, t * t + 3]
const XC = (1 + Math.sqrt(17)) / 2 // x-coordinate of the crossing, ≈ 2.5616
const CROSS: V = [XC, XC + 3]
const T_J = 1.5 // j-components equal
const T_I = (1 + Math.sqrt(5)) / 2 // i-components equal, ≈ 1.618
const T_A = XC - 1 // A at X, ≈ 1.5616
const T_B = Math.sqrt(XC) // B at X, ≈ 1.6005
const TMAX = 2
const ZLO = 1.4 // time range of the zoomed view
const ZHI = 1.75
const SLO = 1.4 // slow-motion sail window
const SHI = 1.72

const f3 = (v: number) => v.toFixed(3)

export default function NearMiss() {
  const [t, setT] = useState(T_J)
  const [zoom, setZoom] = useState(true)
  const player = usePlayer(setT, { min: SLO, max: SHI, seconds: 9 })

  const A = rA(t)
  const B = rB(t)
  const gap = Math.hypot(B[0] - A[0], B[1] - A[1])
  const eqI = Math.abs(A[0] - B[0]) < 0.0015
  const eqJ = Math.abs(A[1] - B[1]) < 0.0015
  const near = (k: number) => Math.abs(t - k) < 0.0025
  const jump = (k: number) => {
    player.stop()
    setT(k)
  }

  let notice
  if (near(T_J)) {
    notice = (
      <Notice>
        At <M>t = \tfrac32</M> the <M>j</M>-components agree: both yachts are <M>5.25</M> km north of the buoy. But A
        is at <M>x = 2.5</M> and B at <M>x = 2.25</M>, so they are <M>0.25</M> km apart. This is the <b>only</b> time the{' '}
        <M>j</M>-components ever agree, so the yachts are never level in both directions at once. Now press
        &ldquo;i-parts equal&rdquo;.
      </Notice>
    )
  } else if (near(T_I)) {
    notice = (
      <Notice>
        At <M>{'t = \\tfrac{1+\\sqrt5}{2} \\approx 1.618'}</M> the <M>i</M>-components agree (<M>x \approx 2.618</M>), but
        A is <M>0.236</M> km north of B. The <M>i</M>-parts agree at <M>1.618</M> and the <M>j</M>-parts at{' '}
        <M>1.5</M>: two different times, so no single <M>t</M> makes the yachts meet. That is the report&apos;s argument.
      </Notice>
    )
  } else if (near(T_A)) {
    notice = (
      <Notice tone="good">
        A reaches the crossing point X at <M>t \approx 1.562</M> h. B is not there yet: it is <M>0.174</M> km short of X and
        arrives at <M>t \approx 1.600</M> h, about <M>2.3</M> minutes later. <b>Same place, different times</b>: the paths
        cross, the yachts don&apos;t collide.
      </Notice>
    )
  } else if (near(T_B)) {
    notice = (
      <Notice tone="good">
        B reaches X at <M>t \approx 1.600</M> h, but A went through X <M>2.3</M> minutes earlier and is already{' '}
        <M>0.205</M> km past it. Press &ldquo;Sail past X&rdquo; to watch the near miss in slow motion (with the zoom
        on).
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        A collision needs <b>one</b> value of <M>t</M> at which the <M>i</M>-components <b>and</b> the{' '}
        <M>j</M>-components agree. Watch the dashed gap as the yachts approach X: it gets small but never reaches{' '}
        <M>0</M>. The buttons jump to the key moments.
      </Notice>
    )
  }

  const xr: V = zoom ? [1.9, 3.1] : [-0.3, 4.3]
  const yr: V = zoom ? [4.7, 6.6] : [-0.5, 8.5]
  const step = zoom ? 0.5 : 1
  const lab = (v: number) => String(+v.toFixed(2))

  return (
    <div>
      <Plane x={xr} y={yr} xStep={step} yStep={step} height={340} labels={lab}>
        <Plot.Parametric xy={rA} domain={[0, 2.1]} color={C.f} weight={2} opacity={0.45} />
        <Plot.Parametric xy={rB} domain={[0, 2.2]} color={C.g} weight={2} opacity={0.45} />
        {t > 0.005 && <Plot.Parametric xy={rA} domain={[0, t]} color={C.f} weight={4} />}
        {t > 0.005 && <Plot.Parametric xy={rB} domain={[0, t]} color={C.g} weight={4} />}
        <Line.Segment point1={A} point2={B} color={C.guide} style="dashed" weight={2} />
        <Point x={CROSS[0]} y={CROSS[1]} color={C.good} />
        <Label at={CROSS} color={C.good} attach="sw" gap={10}>X</Label>
        <Point x={A[0]} y={A[1]} color={C.f} />
        <Point x={B[0]} y={B[1]} color={C.g} />
        <Label at={A} color={C.f} attach="e" gap={9}>A</Label>
        <Label at={B} color={C.g} attach="w" gap={9}>B</Label>
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={zoom ? ZLO : 0}
          max={zoom ? ZHI : TMAX}
          step={0.001}
          format={v => `${v.toFixed(3)} h`}
        />
        <Buttons>
          <ActionButton label="j-parts equal" onClick={() => jump(T_J)} />
          <ActionButton label="i-parts equal" onClick={() => jump(T_I)} />
          <ActionButton label="A reaches X" onClick={() => jump(T_A)} />
          <ActionButton label="B reaches X" onClick={() => jump(T_B)} />
        </Buttons>
        <Buttons>
          <PlayButton
            playing={player.playing}
            onClick={() => {
              if (!player.playing && (t < SLO || t >= SHI)) setT(SLO)
              player.toggle(SLO)
            }}
            label="Sail past X (slow motion)"
          />
          <Toggle
            label="Zoom in near X"
            checked={zoom}
            onChange={z => {
              player.stop()
              if (z) setT(v => Math.min(ZHI, Math.max(ZLO, v)))
              setZoom(z)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\underset{\\sim}{r}_A = ${f3(A[0])}\\,\\underset{\\sim}{i} + ${f3(A[1])}\\,\\underset{\\sim}{j}`} />
          <Readout color={C.g} tex={`\\underset{\\sim}{r}_B = ${f3(B[0])}\\,\\underset{\\sim}{i} + ${f3(B[1])}\\,\\underset{\\sim}{j}`} />
          <Readout
            tex={`i\\text{-parts} ${eqI ? '=' : '\\ne'},\\ \\ j\\text{-parts} ${eqJ ? '=' : '\\ne'}`}
          />
          <Readout color={C.guide} tex={`\\text{gap} = ${f3(gap)}\\text{ km}`} />
          <Readout color={C.good} tex={`X = (${f3(CROSS[0])},\\ ${f3(CROSS[1])})`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
