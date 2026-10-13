// 2016 Specialist Exam 1 Q8c — the acceleration a(t) = −12 sin(2t) i + 8 cos(2t) j. Drawn from
// the origin, its tip runs round the ellipse x²/144 + y²/64 = 1, so its length
// |a| = √(64 + 80 sin²(2t)) swings between 8 and 12. Slide t to watch the arrow: it is longest
// (12, so |F| = 3 × 12 = 36 N) when sin(2t) = ±1, where the j-component is 0. A toggle shows the
// report's trap of putting sin(2t) = 1 and cos(2t) = 1 together: the point (−12, 8) is not on
// the path at all, so √208 is never reached.

import { useState } from 'react'
import {
  C, Controls, Buttons, Label, Notice, Plane, Plot, PlayButton, Point, Readout, Readouts, Slider, Toggle, Vector, M, num,
  usePlayer,
} from './kit'

const ax = (t: number) => -12 * Math.sin(2 * t)
const ay = (t: number) => 8 * Math.cos(2 * t)

export default function AccelEllipse() {
  const [t, setT] = useState(0.3)
  const [both, setBoth] = useState(false)
  const player = usePlayer(setT, { min: 0, max: Math.PI, seconds: 8 })

  const s = Math.sin(2 * t)
  const c = Math.cos(2 * t)
  const mag2 = 64 + 80 * s * s
  const mag = Math.sqrt(mag2)
  const atMax = Math.abs(s) > 0.995
  const atMin = Math.abs(c) > 0.995
  const colour = atMax ? C.good : C.f

  let notice
  if (both) {
    notice = (
      <Notice tone="warn">
        Putting <M>{'\\sin(2t)=1'}</M> and <M>{'\\cos(2t)=1'}</M> together gives the red point{' '}
        <M>(-12,\,8)</M>, length <M>{'\\sqrt{208}\\approx14.4'}</M>. It lies <b>outside</b> the ellipse: no time{' '}
        <M>t</M> gives it, because <M>{'\\sin^2+\\cos^2'}</M> would be <M>2</M>. The real maximum is the
        ellipse&apos;s farthest point, <M>12</M>.
      </Notice>
    )
  } else if (atMax) {
    notice = (
      <Notice tone="good">
        <b>Longest arrow: <M>{'\\left|\\underset{\\sim}{a}\\right|=12'}</M></b>, at an end of the long axis, where{' '}
        <M>{'\\sin^2(2t)=1'}</M> and the <M>{'\\underset{\\sim}{j}'}</M>-component is <M>0</M>. So the maximum net
        force is <M>{'3\\times12=36'}</M> N. Now turn on the toggle to test the report&apos;s trap.
      </Notice>
    )
  } else if (atMin) {
    notice = (
      <Notice>
        Shortest arrow: <M>{'\\left|\\underset{\\sim}{a}\\right|=8'}</M>, where <M>{'\\sin(2t)=0'}</M>. A component
        is zero here too, so &ldquo;set a component to zero&rdquo; finds the minimum as well as the maximum
        — you still need <M>{'64+80\\sin^2(2t)'}</M> to tell them apart.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The arrow&apos;s length is <M>{'\\sqrt{64+80\\sin^2(2t)}'}</M>, so it grows as{' '}
        <M>{'\\sin^2(2t)'}</M> grows. Slide <M>t</M> towards <M>{'\\tfrac{\\pi}{4}\\approx0.79'}</M>, where{' '}
        <M>{'\\sin(2t)=1'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-14, 14]} y={[-10, 10]} xStep={4} yStep={4} equalScale height={340}>
        <Plot.Parametric xy={u => [ax(u), ay(u)]} domain={[0, Math.PI]} color={C.guide} weight={2} />
        <Vector tail={[0, 0]} tip={[ax(t), ay(t)]} color={colour} weight={3} />
        <Point x={12} y={0} color={C.good} />
        <Point x={-12} y={0} color={C.good} />
        <Label at={[12, 1.2]} color={C.good} attach="n">12</Label>
        <Label at={[-12, 1.2]} color={C.good} attach="n">12</Label>
        <Label at={[ax(t) / 2, ay(t) / 2]} color={colour} attach="e">a</Label>
        {both && (
          <>
            <Vector tail={[0, 0]} tip={[-12, 8]} color={C.bad} weight={2} style="dashed" />
            <Point x={-12} y={8} color={C.bad} />
            <Label at={[-12, 8]} color={C.bad} attach="se">(−12, 8)?</Label>
          </>
        )}
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
          max={Math.PI}
          step={0.005}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Play t from 0 to π" />
          <Toggle label="Try sin(2t) = cos(2t) = 1" checked={both} onChange={setBoth} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\underset{\\sim}{a} = ${num(ax(t))}\\,\\underset{\\sim}{i} ${ay(t) < -0.005 ? '-' : '+'} ${num(Math.abs(ay(t)))}\\,\\underset{\\sim}{j}`} />
          <Readout color={colour} tex={`\\left|\\underset{\\sim}{a}\\right| = \\sqrt{64+80\\sin^2(2t)} \\approx ${num(mag)}`} />
          <Readout color={colour} tex={`\\left|\\underset{\\sim}{F}\\right| = 3\\left|\\underset{\\sim}{a}\\right| \\approx ${num(mag * 3, 1)}\\text{ N}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
