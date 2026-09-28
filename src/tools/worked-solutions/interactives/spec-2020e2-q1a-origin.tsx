// 2020 Specialist Exam 2 Q1a — where the particle x = 2sin(2t), y = 3cos(t) is at time t, and its
// distance from the ORIGIN as the hypotenuse of a right triangle with legs x and y. A toggle draws
// the distance from the starting point (0, 3) instead — the mistake the examiner's report names —
// which gives about 1.78 m at t = π/6 instead of √39/2 ≈ 3.12 m.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const X = (t: number) => 2 * Math.sin(2 * t)
const Y = (t: number) => 3 * Math.cos(t)
const STEP = Math.PI / 48
const tex = (v: number, dp = 3) => num(v, dp).replace('−', '-').replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '')

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

export default function OriginDistance() {
  const [t, setT] = useState(Math.PI / 6)
  const [fromStart, setFromStart] = useState(false)
  const x = X(t)
  const y = Y(t)
  const d = Math.hypot(x, y)
  const dStart = Math.hypot(x, y - 3)
  const atQ = Math.abs(t - Math.PI / 6) < 1e-6

  let notice
  if (fromStart) {
    notice = (
      <Notice tone="warn">
        The red segment is the distance from <b>where the particle started</b>, <M>(0,3)</M> at <M>t=0</M>
        {atQ ? <>: about <M>1.78</M> m.</> : '.'} The examiner&apos;s report says some students found this. The
        question asks for the distance from the <b>origin</b>, <M>(0,0)</M> — the green segment — whatever the particle
        did before. Turn the toggle off to compare.
      </Notice>
    )
  } else if (atQ) {
    notice = (
      <Notice tone="good">
        At <M>{'t=\\tfrac\\pi6'}</M> the argument of the sine is <M>{'2t=\\tfrac\\pi3'}</M>, so{' '}
        <M>{'x=2\\sin\\tfrac\\pi3=\\sqrt3'}</M>, and <M>{'y=3\\cos\\tfrac\\pi6=\\tfrac{3\\sqrt3}{2}'}</M>. The distance
        from the origin is the hypotenuse of the triangle with those legs:{' '}
        <M>{'\\sqrt{3+\\tfrac{27}{4}}=\\tfrac{\\sqrt{39}}{2}\\approx3.12'}</M> m. Now switch on the toggle to see the
        distance some students found instead.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Wherever the particle is, its distance from the origin is <M>{'\\sqrt{x^2+y^2}'}</M>: the legs of the triangle are
        just its coordinates. Slide back to <M>{'t=\\tfrac\\pi6'}</M> (0.52) for part a.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 3]} y={[-3.5, 3.5]} equalScale height={400}>
        <Plot.Parametric xy={s => [X(s), Y(s)]} domain={[0, 2 * Math.PI]} color={C.f} weight={2} opacity={0.45} />
        <Plot.Parametric xy={s => [X(s), Y(s)]} domain={[0, Math.max(t, 1e-3)]} color={C.f} weight={3} />
        {/* the right triangle: legs x and y, hypotenuse to the origin */}
        <Line.Segment point1={[0, 0]} point2={[x, 0]} color={C.g} style="dashed" weight={2} />
        <Line.Segment point1={[x, 0]} point2={[x, y]} color={C.violet} style="dashed" weight={2} />
        <Line.Segment point1={[0, 0]} point2={[x, y]} color={C.good} weight={3} />
        {fromStart && <Line.Segment point1={[0, 3]} point2={[x, y]} color={C.bad} weight={3} />}
        <Point x={0} y={3} color={C.guide} />
        <Label at={[0, 3]} attach="w" color={C.guide}>t = 0</Label>
        <Point x={0} y={0} color={C.ink} />
        <Point x={x} y={y} color={C.f} />
        {Math.abs(x) > 0.3 && (
          <Label at={[x / 2, 0]} attach={y >= 0 ? 's' : 'n'} color={C.g}>
            x = {num(x)}
          </Label>
        )}
        {Math.abs(y) > 0.3 && (
          <Label at={[x, y / 2]} attach={x >= 0 ? 'e' : 'w'} color={C.violet}>
            y = {num(y)}
          </Label>
        )}
        <Label at={[x, y]} attach={y >= 0 ? 'n' : 's'} color={C.f}>
          t = {tText(t)}
        </Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={2 * Math.PI} step={STEP} format={tText} />
        <Toggle label="Measure from where it started (t = 0)" checked={fromStart} onChange={setFromStart} />
        <Readouts>
          <Readout color={C.g} tex={`x=2\\sin(2t)=${tex(x)}`} />
          <Readout color={C.violet} tex={`y=3\\cos(t)=${tex(y)}`} />
          <Readout
            color={C.good}
            tex={atQ ? `\\sqrt{x^2+y^2}=\\tfrac{\\sqrt{39}}{2}\\approx${tex(d)}` : `\\sqrt{x^2+y^2}=${tex(d)}`}
          />
          {fromStart && <Readout color={C.bad} tex={`\\text{from }(0,3):\\ ${tex(dStart)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
