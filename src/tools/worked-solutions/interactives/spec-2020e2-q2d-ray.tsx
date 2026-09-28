// 2020 Specialist Exam 2 Q2d — why the ray Arg(z − u) = π/4 needs the domain x > −2. Slide z
// along the line y = x + 1 through u = −2 − i. Then z − u = (x + 2)(1 + i): for x > −2 it is a
// positive multiple of 1 + i (Arg = π/4, on the ray); at x = −2 it is 0 (no argument, so u is an
// open circle); for x < −2 it is a negative multiple, pointing the opposite way (Arg = −3π/4).
// The play button always sweeps the whole line from x = −6 to 4, so the jump at x = −2 is seen.
// The toggle shows the rule y = x + 1 on its own, which wrongly includes that lower half.

import { useState } from 'react'
import {
  Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle,
  Vector, num, tick, usePlayer,
} from './kit'

type P = [number, number]
const U: P = [-2, -1]
const R = 0.85

export default function Ray() {
  const [x, setX] = useState(1)
  const [ruleOnly, setRuleOnly] = useState(false)
  const player = usePlayer(setX, { min: -6, max: 4, seconds: 7 })

  const z: P = [x, x + 1]
  const k = x + 2
  const atU = Math.abs(k) < 0.03
  const onRay = k >= 0.03
  const theta = onRay ? Math.PI / 4 : (-3 * Math.PI) / 4
  const col = atU ? C.guide : onRay ? C.good : C.bad
  const argTex = atU ? '\\text{undefined}' : onRay ? '\\tfrac{\\pi}{4}' : '-\\tfrac{3\\pi}{4}'
  const sgn = (v: number) => (v < 0 ? '-' : '+')

  let notice
  if (atU) {
    notice = (
      <Notice tone="warn">
        <b>
          Here <M>z=u</M>
        </b>
        , so <M>z-u=0</M>, and <M>0</M> has no argument. The point <M>u</M> itself is not on the ray: draw it as an open
        circle and write the strict inequality <M>{'x>-2'}</M>, not <M>{'x\\ge -2'}</M>.
      </Notice>
    )
  } else if (onRay) {
    notice = (
      <Notice tone="good">
        <M>{`z-u=(x+2)(1+i)`}</M> with <M>{`x+2 = ${num(k)} > 0`}</M>: a positive multiple of <M>1+i</M>, so the arrow from{' '}
        <M>u</M> to <M>z</M> points at <M>45^\circ</M> and <M>{'\\operatorname{Arg}(z-u)=\\tfrac{\\pi}{4}'}</M>. Now slide{' '}
        <M>x</M> below <M>-2</M>: <M>z</M> stays on <M>y=x+1</M>, so watch what happens to the argument.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <M>z</M> is still on <M>y=x+1</M>, but now <M>{`x+2 = ${num(k)} < 0`}</M>, so <M>z-u</M> is a <b>negative</b>{' '}
        multiple of <M>1+i</M>. The arrow points the opposite way and{' '}
        <M>{'\\operatorname{Arg}(z-u)=-\\tfrac{3\\pi}{4}'}</M>, not <M>{'\\tfrac{\\pi}{4}'}</M>. The rule <M>y=x+1</M> alone
        includes this half; the domain <M>{'x>-2'}</M> is what cuts it off.
      </Notice>
    )
  }

  const t0 = Math.min(0, theta)
  const t1 = Math.max(0, theta)
  const mid = theta / 2

  return (
    <div>
      <Plane x={[-6, 4]} y={[-5, 5]} equalScale height={420} xLabel="" yLabel="" xLabels={v => (Math.abs(v + 1) < 1e-9 ? '' : tick(v))}>
        <Label at={[4, 0]} attach="nw" italic>
          Re(z)
        </Label>
        <Label at={[0, 5]} attach="sw" italic>
          Im(z)
        </Label>
        {/* The half of y = x + 1 that is NOT the ray */}
        <Line.Segment
          point1={[-6.3, -5.3]}
          point2={U}
          color={ruleOnly ? C.bad : C.guide}
          style="dashed"
          weight={ruleOnly ? 3 : 1.5}
        />
        {ruleOnly && (
          <Label at={[-5, -4]} attach="e" color={C.bad} gap={10}>
            Arg(z − u) = −3π/4 here
          </Label>
        )}
        {/* The ray */}
        <Line.Segment point1={U} point2={[4.3, 5.3]} color={C.f} weight={3} />
        <Label at={[-0.4, 0.6]} attach="nw" color={C.f} gap={10}>
          Arg(z − u) = π/4
        </Label>
        {/* Positive real direction at u, and the angle it makes with z − u */}
        <Line.Segment point1={U} point2={[U[0] + 1.6, U[1]]} color={C.ink} style="dashed" weight={1.5} />
        {!atU && (
          <>
            <Plot.Parametric
              xy={t => [U[0] + R * Math.cos(t), U[1] + R * Math.sin(t)]}
              domain={[t0, t1]}
              color={col}
              weight={2.5}
            />
            <Label at={[U[0] + 1.15 * R * Math.cos(mid), U[1] + 1.15 * R * Math.sin(mid)]} attach={onRay ? 'e' : 's'} color={col}>
              {onRay ? 'π/4' : '−3π/4'}
            </Label>
            <Vector tail={U} tip={z} color={col} weight={3} />
          </>
        )}
        {/* u: an open circle, since Arg(0) is undefined */}
        <Circle center={U} radius={0.14} color="var(--mafs-bg)" fillOpacity={1} weight={0} />
        <Circle center={U} radius={0.14} color={C.f} fillOpacity={0} weight={2.5} />
        <Label at={U} attach="w" color={C.f} gap={10}>
          u
        </Label>
        {!atU && <Point x={z[0]} y={z[1]} color={col} />}
        {!atU && (
          <Label at={z} attach="nw" color={col} gap={10}>
            z
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider
          label="x = \operatorname{Re}(z)"
          value={x}
          onChange={v => {
            player.stop()
            setX(v)
          }}
          min={-6}
          max={4}
          step={0.05}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(player.playing ? x : 4)} label="Slide z from x = −6 to 4" />
          <Toggle label="Answer with the rule only: y = x + 1" checked={ruleOnly} onChange={setRuleOnly} />
        </Buttons>
        <Readouts>
          <Readout tex={`z = ${num(x)} ${sgn(x + 1)} ${num(Math.abs(x + 1))}i`} />
          <Readout color={col} tex={`z-u = ${num(k)} ${sgn(k)} ${num(Math.abs(k))}i`} />
          <Readout color={col} tex={`\\operatorname{Arg}(z-u) = ${argTex}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
