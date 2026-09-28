// 2018 Specialist Exam 2 MCQ 13 — speed is the LENGTH of the velocity arrow. The particle
// r(t) = 3cos(t) i + 4sin(t) j runs round the ellipse with its velocity v = −3sin(t) i + 4cos(t) j
// drawn at true scale; beside it, |v| = √(9 + 7cos²t) is graphed against t with a dot tracking the
// same moment. The arrow is shortest (|v| = 3) at the ends of the long axis, first at t = π/2.
// A toggle shows the option-C slip: "set v = 0" as if −3sin t + 4cos t were a number gives
// t = tan⁻¹(4/3), where the speed is 12√2/5 ≈ 3.39 — not a minimum at all.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle, Vector,
  usePlayer,
} from './kit'

const TAU = 2 * Math.PI
const pos = (t: number): [number, number] => [3 * Math.cos(t), 4 * Math.sin(t)]
const vel = (t: number): [number, number] => [-3 * Math.sin(t), 4 * Math.cos(t)]
const speed = (t: number) => Math.sqrt(9 + 7 * Math.cos(t) ** 2)
const T0 = Math.atan(4 / 3) // where −3sin t + 4cos t = 0 (the option-C slip)

const piLabel = (v: number) => {
  const k = Math.round(v / (Math.PI / 2))
  if (Math.abs(v - (k * Math.PI) / 2) > 1e-6) return ''
  return ['', 'π/2', 'π', '3π/2', '2π'][k] ?? ''
}

export default function SpeedArrow() {
  const [t, setT] = useState(0.5)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setT, { min: 0, max: TAU, seconds: 9 })

  const p = pos(t)
  const v = vel(t)
  const s = speed(t)
  const near = (a: number) => Math.abs(t - a) < 0.06
  const tip: [number, number] = [p[0] + v[0], p[1] + v[1]]
  const p0 = pos(T0)
  const v0 = vel(T0)

  let notice
  if (wrong && near(T0)) {
    notice = (
      <Notice tone="warn">
        <b>&ldquo;Speed is least when <M>{'v = 0'}</M>&rdquo;</b> led to <M>{'-3\\sin t + 4\\cos t = 0'}</M>, so{' '}
        <M>{'t = \\tan^{-1}\\!\\left(\\tfrac43\\right) \\approx 0.93'}</M> (option C). There the components are{' '}
        <M>{'-2.4'}</M> and <M>{'2.4'}</M>: they add to zero as numbers, but the red arrow points left <em>and</em> up,
        with length <M>{'\\sqrt{2.4^2 + 2.4^2} \\approx 3.39'}</M>. On the graph that moment is on a slope, not in a
        dip. Slide on to <M>{'t = \\tfrac{\\pi}{2}'}</M>.
      </Notice>
    )
  } else if (near(Math.PI / 2)) {
    notice = (
      <Notice tone="good">
        <b>The first minimum.</b> Here <M>{'\\cos t = 0'}</M>, so <M>{'|v|^2 = 9 + 7(0) = 9'}</M> and the arrow has its
        shortest length, <M>3</M>. The particle is at <M>(0, 4)</M>, the end of the long axis, moving straight
        across. That is <M>{'t = \\tfrac{\\pi}{2}'}</M>, option B.
      </Notice>
    )
  } else if (near((3 * Math.PI) / 2)) {
    notice = (
      <Notice>
        The speed is <M>3</M> again, at <M>(0, -4)</M>: another minimum, but the <b>second</b> one. This is option D.
        The question asks for the first, and the graph shows a dip already happened at{' '}
        <M>{'t = \\tfrac{\\pi}{2}'}</M>.
      </Notice>
    )
  } else if (near(0) || near(Math.PI) || near(TAU)) {
    notice = (
      <Notice>
        At the ends of the short axis the arrow is <b>longest</b>: <M>{'\\cos^2 t = 1'}</M>, so{' '}
        <M>{'|v| = \\sqrt{9 + 7} = 4'}</M>. The graph is at a peak. Keep sliding to find where it is shortest.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The orange arrow is the velocity; its <b>length</b> is the speed{' '}
        <M>{'|v| = \\sqrt{9 + 7\\cos^2 t}'}</M>. Slide <M>t</M> or press <b>Go once round</b> and watch the dot on the graph dip each
        time the particle passes the top or bottom of the ellipse. Which dip comes first? Then try the toggle.
      </Notice>
    )
  }

  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-2 sm:items-center">
        <Plane x={[-5, 5]} y={[-6, 6]} xStep={1} yStep={1} height={330} equalScale>
          <Plot.Parametric xy={pos} domain={[0, TAU]} color={C.f} weight={2.5} />
          <Point x={0} y={4} color={C.guide} />
          <Point x={0} y={-4} color={C.guide} />
          <Vector tail={p} tip={tip} color={C.g} weight={3} />
          <Point x={p[0]} y={p[1]} color={C.f} />
          {wrong && (
            <>
              <Vector tail={p0} tip={[p0[0] + v0[0], p0[1] + v0[1]]} color={C.bad} weight={3} />
              <Point x={p0[0]} y={p0[1]} color={C.bad} />
            </>
          )}
          <Label at={tip} color={wrong && near(T0) ? C.bad : C.g} attach={v[0] < 0 ? 'w' : 'e'}>v</Label>
          <Label at={[3, 0]} color={C.guide} attach="ne">t = 0</Label>
        </Plane>
        <Plane
          x={[0, TAU]}
          y={[0, 4.5]}
          xStep={Math.PI / 2}
          yStep={1}
          height={200}
          xLabel="t"
          yLabel="|v|"
          xLabels={piLabel}
        >
          <Line.Segment point1={[0, 3]} point2={[TAU, 3]} color={C.guide} style="dashed" weight={1.5} />
          <Plot.OfX y={speed} domain={[0, TAU]} color={C.g} weight={2.5} />
          <Point x={Math.PI / 2} y={3} color={C.good} />
          <Label at={[Math.PI / 2, 3]} color={C.good} attach="s">first min</Label>
          <Point x={(3 * Math.PI) / 2} y={3} color={C.guide} />
          <Point x={t} y={s} color={C.g} />
          {wrong && (
            <>
              <Line.Segment point1={[T0, 0]} point2={[T0, speed(T0)]} color={C.bad} style="dashed" weight={1.5} />
              <Point x={T0} y={speed(T0)} color={C.bad} />
            </>
          )}
        </Plane>
      </div>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={x => {
            player.stop()
            setT(x)
          }}
          min={0}
          max={TAU}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Go once round" />
          <Toggle
            label="Set v = 0 instead? (option C)"
            checked={wrong}
            onChange={on => {
              setWrong(on)
              if (on) {
                player.stop()
                setT(T0)
              }
            }}
          />
        </Buttons>
        <Readouts>
          <Readout tex={`\\underset{\\sim}{v} = ${v[0].toFixed(2)}\\,\\underset{\\sim}{i} + ${v[1].toFixed(2)}\\,\\underset{\\sim}{j}`.replace('+ -', '- ')} color={C.g} />
          <Readout tex={`|\\underset{\\sim}{v}| = \\sqrt{9 + 7\\cos^2 t} = ${s.toFixed(2)}`} color={C.g} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
