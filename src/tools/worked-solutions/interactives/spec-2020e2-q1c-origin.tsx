// 2020 Specialist Exam 2 Q1c — the particle is at the origin only when x = 2sin(2t) AND y = 3cos(t)
// are zero at the same instant. Top: the particle on its path. Bottom: x(t) and y(t) against t,
// with each graph's zeros marked. x is zero at every multiple of π/2, y only at the odd ones; the
// first common zero is t = π/2. A toggle marks the trap: x = 0 at t = 0, but the particle is at (0, 3).

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle, num, usePlayer,
} from './kit'

const X = (t: number) => 2 * Math.sin(2 * t)
const Y = (t: number) => 3 * Math.cos(t)
const STEP = Math.PI / 48
const PI = Math.PI
const tex = (v: number, dp = 2) => num(v, dp).replace('−', '-').replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '')
const X_ZEROS = [0, PI / 2, PI, (3 * PI) / 2, 2 * PI]
const Y_ZEROS = [PI / 2, (3 * PI) / 2]

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

export default function OriginTimes() {
  const [t, setT] = useState(0)
  const [trap, setTrap] = useState(false)
  const player = usePlayer(setT, { min: 0, max: 2 * PI, seconds: 10 })
  const x = X(t)
  const y = Y(t)
  const near = (a: number) => Math.abs(t - a) < 0.03
  const atOrigin = near(PI / 2) || near((3 * PI) / 2)

  let notice
  if (trap) {
    notice = (
      <Notice tone="warn">
        Solving only <M>{'2\\sin(2t)=0'}</M> gives <M>t=0</M> first. But at <M>t=0</M>,{' '}
        <M>{'y=3\\cos0=3'}</M>: the particle is at <M>(0,3)</M> on the <M>y</M>-axis, not at the origin. Both graphs
        have to cross zero at the <b>same</b> <M>t</M>.
      </Notice>
    )
  } else if (near(PI / 2)) {
    notice = (
      <Notice tone="good">
        At <M>{'t=\\tfrac\\pi2'}</M>: <M>{'x=2\\sin\\pi=0'}</M> and <M>{'y=3\\cos\\tfrac\\pi2=0'}</M> together — the first
        place where both graphs cross zero at the same <M>t</M>. So the particle first passes through the origin at{' '}
        <M>{'t=\\tfrac\\pi2'}</M> s.
      </Notice>
    )
  } else if (near(0)) {
    notice = (
      <Notice>
        At <M>t=0</M>, <M>x=0</M> — but <M>y=3</M>, so the particle is at the top of its path, not the origin. Press play
        and watch for the first <M>t</M> where the orange and violet graphs are both zero.
      </Notice>
    )
  } else if (near(PI)) {
    notice = (
      <Notice>
        <M>x=0</M> again at <M>{'t=\\pi'}</M>, but <M>y=-3</M>: the bottom of the path. <M>x</M> is zero at every multiple
        of <M>{'\\tfrac\\pi2'}</M> (its argument is <M>2t</M>); <M>y</M> only at the odd multiples.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The particle is at the origin only when <M>x=0</M> <b>and</b> <M>y=0</M> at the same instant. Look for a{' '}
        <M>t</M> where both graphs below cross the axis together{atOrigin ? ' — like this one.' : '.'}
      </Notice>
    )
  }

  const piLabel = (v: number) => {
    const k = Math.round((2 * v) / PI)
    if (Math.abs(v - (k * PI) / 2) > 1e-6) return ''
    return ['0', 'π/2', 'π', '3π/2', '2π'][k] ?? ''
  }

  return (
    <div>
      <Plane x={[-3, 3]} y={[-3.5, 3.5]} equalScale height={300}>
        <Plot.Parametric xy={s => [X(s), Y(s)]} domain={[0, 2 * PI]} color={C.f} weight={2} opacity={0.5} />
        <Plot.Parametric xy={s => [X(s), Y(s)]} domain={[0, Math.max(t, 1e-3)]} color={C.f} weight={3} />
        {trap && (
          <>
            <Point x={0} y={3} color={C.bad} />
            <Label at={[0, 3]} attach="e" color={C.bad}>t = 0: (0, 3)</Label>
          </>
        )}
        <Point x={0} y={0} color={atOrigin ? C.good : C.ink} />
        <Point x={x} y={y} color={atOrigin ? C.good : C.f} />
        <Label at={[x, y]} attach={x >= 0 ? 'e' : 'w'} color={atOrigin ? C.good : C.f} size={12}>
          ({tex(x).replace('-', '−')}, {tex(y).replace('-', '−')})
        </Label>
      </Plane>
      <Plane x={[0, 2 * PI]} y={[-3.2, 3.2]} xStep={PI / 2} yStep={1} height={190} xLabel="t" yLabel="" xLabels={false}>
        <Plot.OfX y={X} domain={[0, 2 * PI]} color={C.g} weight={2.5} />
        <Plot.OfX y={Y} domain={[0, 2 * PI]} color={C.violet} weight={2.5} />
        <Line.Segment point1={[t, -3.2]} point2={[t, 3.2]} color={C.guide} style="dashed" weight={1.5} />
        {X_ZEROS.map(z => (
          <Point key={`x${z}`} x={z} y={0} color={Y_ZEROS.some(w => Math.abs(w - z) < 1e-9) ? C.good : C.g} />
        ))}
        {trap && <Point x={0} y={0} color={C.bad} />}
        <Label at={[PI / 4, 2]} attach="n" color={C.g} size={12}>x</Label>
        <Label at={[(7 * PI) / 4, Y((7 * PI) / 4)]} attach="nw" color={C.violet} size={12}>y</Label>
        {X_ZEROS.map(z => (
          <Label key={`l${z}`} at={[z, 0]} attach="s" gap={11} size={11} color={C.ink} bold={false}>
            {piLabel(z)}
          </Label>
        ))}
        <Label at={[PI / 2, 0]} attach="ne" gap={9} color={C.good} size={12}>both 0</Label>
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={2 * PI}
          step={STEP}
          format={tText}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Play" />
          <Toggle label="Solve x = 0 only" checked={trap} onChange={setTrap} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`x=2\\sin(2t)=${tex(x)}`} />
          <Readout color={C.violet} tex={`y=3\\cos(t)=${tex(y)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
