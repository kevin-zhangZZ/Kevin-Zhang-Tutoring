// 2018 Specialist Exam 1 Q10 — why √((t² − 2)²) is 2 − t² and not t² − 2. Left: the velocity
// vector at time t, with legs dx/dt = t² and dy/dt = 2√(1 − t²); its length (the speed) is a
// length, so it can't be negative, and it equals 2 − t². Right: the speed–time graph, whose area
// from 0 to t is the distance travelled; at t = ¾ it is 87/64. A toggle shows the wrong choice
// t² − 2: that graph sits below the t-axis for the whole domain 0 ≤ t ≤ 1 (it only reaches 0 at
// t = √2), so it gives the "distance" −87/64.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Region, Slider,
  Toggle, Vector, tick, usePlayer,
} from './kit'

const dxdt = (t: number) => t * t
const dydt = (t: number) => 2 * Math.sqrt(Math.max(0, 1 - t * t))
const speed = (t: number) => Math.hypot(dxdt(t), dydt(t))
const dist = (t: number) => 2 * t - (t * t * t) / 3 // ∫₀ᵗ (2 − u²) du
const R2 = Math.SQRT2

export default function SpeedNeverNegative() {
  const [t, setT] = useState(0.75)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setT, { min: 0, max: 1, seconds: 6 })

  const a = dxdt(t)
  const b = dydt(t)
  const s = speed(t)
  const atThreeQuarters = Math.abs(t - 0.75) < 0.013

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        Writing <M>{'\\sqrt{(t^2-2)^2} = t^2-2'}</M> gives the <b>red</b> graph, and it is below the axis for the whole
        domain: <M>{'t^2-2'}</M> is only zero at <M>{'t=\\sqrt2\\approx1.41'}</M>, past <M>t=1</M>. So every slice counts
        as negative and at <M>{'t=\\tfrac34'}</M> you get <M>{'d=-\\tfrac{87}{64}'}</M>, a negative distance. Compare it
        with the green velocity arrow: its length is <M>{'+' + s.toFixed(2)}</M>, never <M>{'-' + s.toFixed(2)}</M>.
      </Notice>
    )
  } else if (atThreeQuarters) {
    notice = (
      <Notice tone="good">
        At <M>{'t=\\tfrac34'}</M> the shaded area is <M>{'\\int_0^{3/4}(2-t^2)\\,dt=\\tfrac{87}{64}\\approx1.36'}</M> m,
        the distance <M>d</M>. The speed graph is <M>{'-t^2+0t+2'}</M>, so <M>{'a=-1'}</M>, <M>{'b=0'}</M>,{' '}
        <M>{'c=2'}</M>. Now turn on the toggle to see what <M>{'t^2-2'}</M> would do instead.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The green arrow is the velocity. Its length is the speed{' '}
        <M>{'\\sqrt{(t^2)^2+\\left(2\\sqrt{1-t^2}\\right)^2}=2-t^2'}</M>, and a length can&apos;t be negative. On{' '}
        <M>{'0\\le t\\le1'}</M>, <M>{'t^2\\le1<2'}</M>, so <M>{'2-t^2'}</M> stays between 1 and 2. The shaded area under the
        speed graph is the distance travelled so far; slide to <M>{'t=\\tfrac34'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[2fr_3fr]">
        <div>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">Velocity at time t (equal scales)</p>
          <Plane x={[0, 1.6]} y={[0, 2.2]} xStep={0.5} yStep={0.5} height={280} equalScale xLabel="" yLabel="dy/dt" xLabels={v => (v < 0 ? "" : tick(v))}>
            <Label at={[1.4, 0]} attach="n" size={13} italic>
              dx/dt
            </Label>
            <Plot.Parametric
              xy={u => [dxdt(u), dydt(u)]}
              domain={[0, 1]}
              color={C.guide}
              style="dashed"
              weight={1.5}
            />
            {a > 0.002 && <Line.Segment point1={[0, 0]} point2={[a, 0]} color={C.f} weight={4} />}
            {b > 0.002 && <Line.Segment point1={[a, 0]} point2={[a, b]} color={C.g} weight={4} />}
            <Vector tail={[0, 0]} tip={[a, b]} color={C.good} weight={3} />
            {a > 0.12 && (
              <Label at={[a / 2, 0]} attach="n" color={C.f} size={12}>
                t²
              </Label>
            )}
            {b > 0.15 && (
              <Label at={[a, b / 2]} attach="e" color={C.g} size={12}>
                2√(1−t²)
              </Label>
            )}
            <Label at={[a, b]} attach="w" color={C.good} size={12}>
              speed
            </Label>
          </Plane>
        </div>
        <div>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">Speed–time graph: area = distance</p>
          <Plane x={[0, 1.6]} y={[-2.2, 2.3]} xStep={0.5} yStep={1} height={280} xLabel="" yLabel="speed">
            <Label at={[1.55, 0]} attach="n" size={14} italic>
              t
            </Label>
            <Region top={u => 2 - u * u} bottom={() => 0} from={0} to={t} color={C.good} opacity={wrong ? 0.08 : 0.25} />
            <Line.Segment point1={[0.75, -2.2]} point2={[0.75, 2.3]} color={C.guide} style="dashed" weight={1.5} />
            <Label at={[0.75, 2.3]} attach="se" color={C.guide} size={12}>
              t = ¾
            </Label>
            <Line.Segment point1={[1, -2.2]} point2={[1, 2.3]} color={C.guide} weight={1.5} />
            <Label at={[1, -2.2]} attach="ne" color={C.guide} size={12}>
              domain ends
            </Label>
            <Plot.OfX y={u => 2 - u * u} domain={[0, 1]} color={C.good} weight={wrong ? 2 : 3} />
            <Label at={[0.3, 2 - 0.09]} attach="s" color={C.good} size={12}>
              2 − t²
            </Label>
            {wrong && (
              <>
                <Region top={() => 0} bottom={u => u * u - 2} from={0} to={t} color={C.bad} opacity={0.25} />
                <Plot.OfX y={u => u * u - 2} domain={[0, 1.6]} color={C.bad} weight={3} />
                <Point x={R2} y={0} color={C.bad} />
                <Label at={[R2, 0]} attach="n" color={C.bad} size={12}>
                  √2
                </Label>
                <Label at={[0.3, 0.09 - 2]} attach="n" color={C.bad} size={12}>
                  t² − 2
                </Label>
                <Point x={t} y={t * t - 2} color={C.bad} />
              </>
            )}
            <Point x={t} y={s} color={C.good} />
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
          max={1}
          step={0.005}
          format={v => v.toFixed(3)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Run t from 0 to 1" />
          <Toggle label="Take √((t² − 2)²) = t² − 2" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\tfrac{dx}{dt}=t^2=${a.toFixed(3)}`} />
          <Readout color={C.g} tex={`\\tfrac{dy}{dt}=2\\sqrt{1-t^2}=${b.toFixed(3)}`} />
          <Readout color={C.good} tex={`\\text{speed}=${s.toFixed(3)}=2-t^2`} />
          {wrong && <Readout color={C.bad} tex={`t^2-2=${(t * t - 2).toFixed(3)}\\ne\\text{speed}`} />}
          {wrong ? (
            <Readout color={C.bad} tex={`\\int_0^{${t.toFixed(2)}}(t^2-2)\\,dt\\approx${(-dist(t)).toFixed(3)}`} />
          ) : (
            <Readout color={C.good} tex={`\\int_0^{${t.toFixed(2)}}(2-t^2)\\,dt\\approx${dist(t).toFixed(3)}`} />
          )}
          {atThreeQuarters && !wrong && <Readout color={C.good} tex={'d=\\tfrac{87}{64}\\ \\checkmark'} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
