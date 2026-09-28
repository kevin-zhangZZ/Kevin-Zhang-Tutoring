// 2018 Methods Exam 2 MCQ 1 — why the period of f(x) = 4cos(2πx/3) + 1 is 3. The cosine only
// repeats when its angle θ = 2πx/3 has gone once round the unit circle (θ from 0 to 2π). Slide x:
// the point on the circle turns through θ while the graph is traced out beside it, and the first
// full turn is completed exactly at x = 3. The 4 and the +1 stretch and lift the graph but never
// change when a turn is completed.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, tick, usePlayer } from './kit'

const TAU = 2 * Math.PI
const theta = (x: number) => (TAU * x) / 3
const f = (x: number) => 4 * Math.cos(theta(x)) + 1

/** The unit circle with the angle θ swept out from the positive x-axis (plain SVG). */
function UnitCircle({ th }: { th: number }) {
  const R = 52
  const turns = Math.floor(th / TAU + 1e-9)
  const rest = th - turns * TAU
  const px = R * Math.cos(th)
  const py = -R * Math.sin(th)
  const fullTurn = rest < 1e-6 && th > 0.01
  const r2 = R * 0.42
  const arc =
    rest > 1e-6
      ? `M ${r2} 0 A ${r2} ${r2} 0 ${rest > Math.PI ? 1 : 0} 0 ${r2 * Math.cos(th)} ${-r2 * Math.sin(th)}`
      : ''
  return (
    <svg viewBox="-78 -74 156 150" className="w-[150px] h-[144px] flex-none self-center text-gray-400 dark:text-gray-500">
      <line x1={-68} y1={0} x2={68} y2={0} stroke="currentColor" strokeWidth={1} />
      <line x1={0} y1={-64} x2={0} y2={64} stroke="currentColor" strokeWidth={1} />
      <circle cx={0} cy={0} r={R} fill="none" stroke="currentColor" strokeWidth={1.5} />
      {fullTurn && <circle cx={0} cy={0} r={r2} fill="none" stroke={C.violet} strokeWidth={2.5} />}
      {arc && <path d={arc} fill="none" stroke={C.violet} strokeWidth={2.5} />}
      {/* the point's x-coordinate is cos θ, which is what the graph plots (times 4, plus 1) */}
      <line x1={px} y1={py} x2={px} y2={0} stroke={C.f} strokeWidth={1.5} strokeDasharray="3 3" />
      <line x1={0} y1={0} x2={px} y2={py} stroke={C.f} strokeWidth={2} />
      <circle cx={px} cy={py} r={5} fill={C.f} />
      <text x={0} y={72} textAnchor="middle" fontSize={11} className="fill-gray-600 dark:fill-gray-300">
        {turns >= 1 ? `θ: ${turns} full turn${turns > 1 ? 's' : ''}${rest > 0.02 ? ' +' : ''}` : 'θ = 2πx/3'}
      </text>
    </svg>
  )
}

export default function CycleWidget() {
  const [x0, setX0] = useState(1.5)
  const player = usePlayer(setX0, { min: 0, max: 6, seconds: 8 })

  const th = theta(x0)
  const at3 = Math.abs(x0 - 3) < 0.04
  const at6 = x0 > 5.96
  const done = x0 >= 3 - 0.04

  let notice
  if (at3) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = 3</M> the angle is <M>{'\\tfrac{2\\pi \\times 3}{3} = 2\\pi'}</M>: one full turn.</b> The point is back
        where it started, so the graph is back at <M>f = 5</M> and from here on it repeats. That is the period:{' '}
        <M>{'\\tfrac{2\\pi x}{3} = 2\\pi \\Rightarrow x = 3'}</M>. Keep sliding to watch the second cycle copy the first.
      </Notice>
    )
  } else if (at6) {
    notice = (
      <Notice tone="good">
        Two full turns at <M>x = 6</M>, so two identical cycles, each <M>3</M> wide. Adding <M>3</M> to <M>x</M> adds{' '}
        <M>2\pi</M> to the angle, which is why <M>f(x + 3) = f(x)</M> for every <M>x</M>.
      </Notice>
    )
  } else if (done) {
    notice = (
      <Notice>
        The second turn: the point goes round the circle again, so the graph traces the same shape again. Notice it
        repeats every <M>3</M> units, not every <M>2\pi</M> units. The <M>{'\\tfrac{2\\pi}{3}'}</M> in front of{' '}
        <M>x</M> has changed how fast the angle turns.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The cosine is fed the angle <M>{'\\theta = \\tfrac{2\\pi x}{3}'}</M>, not <M>x</M> itself. Each time{' '}
        <M>x</M> goes up by <M>1</M>, <M>\theta</M> goes up by only <M>{'\\tfrac{2\\pi}{3}'}</M>, a third of a
        turn. Slide <M>x</M> until the point has gone once all the way round. The <M>4</M> and the <M>+1</M> only
        stretch and lift the graph; they never change when the turn is complete.
      </Notice>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="flex-1 min-w-0">
          <Plane x={[0, 6.3]} y={[-4, 7]} xStep={1} yStep={2} height={270} yLabels={v => (v > 5 ? '' : tick(v))}>
            <Plot.OfX y={f} domain={[0, 6.3]} color={C.guide} weight={1.5} style="dashed" />
            {x0 > 0.005 && <Plot.OfX y={f} domain={[0, x0]} color={C.f} weight={3} />}
            <Line.Segment point1={[3, -4]} point2={[3, 6.3]} color={C.good} style="dashed" weight={1.5} />
            {done && (
              <>
                <Line.Segment point1={[0, 6.1]} point2={[3, 6.1]} color={C.good} weight={2.5} />
                <Line.Segment point1={[0, 5.8]} point2={[0, 6.4]} color={C.good} weight={2.5} />
                <Line.Segment point1={[3, 5.8]} point2={[3, 6.4]} color={C.good} weight={2.5} />
                <Label at={[1.5, 6.1]} color={C.good} attach="n" gap={3}>
                  one cycle: 3 units
                </Label>
              </>
            )}
            <Point x={x0} y={f(x0)} color={C.f} />
          </Plane>
        </div>
        <UnitCircle th={th} />
      </div>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={0}
          max={6}
          step={0.01}
        />
        <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Trace two cycles" />
        <Readouts>
          <Readout color={C.violet} tex={`\\theta = \\tfrac{2\\pi x}{3} = ${((2 * x0) / 3).toFixed(2)}\\pi`} />
          <Readout color={C.f} tex={`f(x) = 4\\cos\\theta + 1 = ${f(x0).toFixed(2)}`} />
          <Readout tex={`\\text{turns} = \\tfrac{x}{3} = ${(x0 / 3).toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
