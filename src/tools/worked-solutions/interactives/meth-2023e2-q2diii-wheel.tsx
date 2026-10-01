// 2023 Methods Exam 2 Q2d.iii — why the graph of w is S-shaped, not made of straight lines.
// Turn the wheel (slider or play) and watch the pod's height trace out w(t) on the graph beside
// it, drawn to the same vertical scale. Near the bottom and the top the pod moves mostly
// sideways, so its height changes slowly and the graph is flat; level with the centre it moves
// straight up or down, so the graph is steepest. The stationary 5 minutes is a horizontal
// segment, and the double-speed piece is the same shape squeezed into 7.5 minutes. A toggle
// overlays the straight-line sketch the examiners' report says some students drew.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle,
  usePlayer,
} from './kit'

const h = (x: number) => -60 * Math.cos((Math.PI * x) / 15) + 75
const END = 27.5

/** The angle the pod has turned through (from the bottom, anticlockwise) at time t. */
const angle = (t: number) => (t < 15 ? (Math.PI * t) / 15 : t < 20 ? Math.PI : (Math.PI * (2 * t + 5)) / 15)
const w = (t: number) => (t < 15 ? h(t) : t < 20 ? 135 : h(2 * t + 5))
/** How fast the height is changing, in m/min (the derivative of each piece). */
const rate = (t: number) =>
  t < 15 ? 4 * Math.PI * Math.sin((Math.PI * t) / 15) : t < 20 ? 0 : 8 * Math.PI * Math.sin((Math.PI * (2 * t + 5)) / 15)
/** The straight-line sketch: (0, 15) to (15, 135), flat, then (20, 135) to (27.5, 15). */
const straight = (t: number) => (t < 15 ? 15 + 8 * t : t < 20 ? 135 : 135 - 16 * (t - 20))

// The wheel is drawn to the plane's vertical scale (y from −12 to 162 over 300 px), so on a wide
// screen the pod sits level with its point on the graph.
const SVG_H = 300
const Y = (height: number) => (SVG_H * (162 - height)) / 174
const R = (60 * SVG_H) / 174
const CX = 115
const SVG_W = 240

function Wheel({ t }: { t: number }) {
  const th = angle(t)
  const px = CX + R * Math.sin(th)
  const py = Y(75 - 60 * Math.cos(th))
  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      className="h-[210px] sm:h-[300px] w-auto flex-none mx-auto sm:mx-0"
      role="img"
      aria-label="The observation wheel with the pod's current position"
    >
      <line x1={CX} y1={Y(75)} x2={CX - 55} y2={Y(0)} className="stroke-gray-300 dark:stroke-gray-600" strokeWidth={3} />
      <line x1={CX} y1={Y(75)} x2={CX + 55} y2={Y(0)} className="stroke-gray-300 dark:stroke-gray-600" strokeWidth={3} />
      <line x1={4} y1={Y(0)} x2={SVG_W - 4} y2={Y(0)} className="stroke-gray-500 dark:stroke-gray-400" strokeWidth={2} />
      <circle cx={CX} cy={Y(75)} r={R} fill="none" className="stroke-gray-500 dark:stroke-gray-400" strokeWidth={2} />
      <circle cx={CX} cy={Y(75)} r={3} className="fill-gray-600 dark:fill-gray-300" />
      <text x={CX + 6} y={Y(75) - 6} fontSize={16} fontStyle="italic" className="fill-gray-700 dark:fill-gray-200">P</text>
      <circle cx={CX} cy={Y(15)} r={2.5} className="fill-gray-600 dark:fill-gray-300" />
      <text x={CX + 5} y={Y(15) + 14} fontSize={16} fontStyle="italic" className="fill-gray-700 dark:fill-gray-200">A</text>
      <circle cx={CX + R} cy={Y(75)} r={2.5} className="fill-gray-600 dark:fill-gray-300" />
      <text x={CX + R + 5} y={Y(75) + 14} fontSize={16} fontStyle="italic" className="fill-gray-700 dark:fill-gray-200">B</text>
      <line x1={CX - 24} y1={Y(0)} x2={CX - 24} y2={Y(15)} className="stroke-gray-400 dark:stroke-gray-500" strokeWidth={1} />
      <text x={CX - 28} y={Y(7.5) + 4} fontSize={13} textAnchor="end" className="fill-gray-600 dark:fill-gray-300">15 m</text>
      <line x1={CX} y1={Y(75)} x2={px} y2={py} stroke={C.f} strokeWidth={1.5} opacity={0.6} />
      <line x1={px} y1={py} x2={SVG_W} y2={py} stroke={C.f} strokeWidth={1.5} strokeDasharray="4 4" />
      <circle cx={px} cy={py} r={7} fill={C.f} className="stroke-white dark:stroke-gray-900" strokeWidth={2} />
    </svg>
  )
}

export default function WheelGraph() {
  const [t, setT] = useState(2.5)
  const [line, setLine] = useState(false)
  const player = usePlayer(setT, { min: 0, max: END, seconds: 11 })

  const y = w(t)
  const piece = t < 15 ? 1 : t < 20 ? 2 : 3
  const r = rate(t)
  const sl = straight(t)
  const gap = Math.abs(sl - y)

  let notice
  if (line && piece !== 2) {
    notice =
      gap < 0.5 ? (
        <Notice tone="warn">
          Here the straight line and the true curve agree: they only meet at the ends and half-way (<M>t = 7.5</M> and{' '}
          <M>t = 23.75</M>). Move <M>t</M> a little either side and they separate. A straight-line sketch loses the
          curvature marks.
        </Notice>
      ) : (
        <Notice tone="warn">
          The red dashed lines are the straight-line sketch. At <M>{`t = ${t.toFixed(1)}`}</M> it gives{' '}
          <M>{`${sl.toFixed(1)}`}</M> m, but the pod is really at <M>{`${y.toFixed(1)}`}</M> m. A turning wheel does not
          lift the pod at a steady rate, so its height graph cannot be straight.
        </Notice>
      )
  } else if (piece === 2) {
    notice = (
      <Notice>
        The wheel is stopped, so the height stays at <M>k = 135</M> m: a <b>horizontal segment</b> from{' '}
        <M>(15, 135)</M> to <M>(20, 135)</M>. The curve before it arrives flat, so the join is smooth.
      </Notice>
    )
  } else if (piece === 3) {
    notice = (
      <Notice>
        At double speed the pod goes down the other side in 7.5 minutes instead of 15, so this piece is the same
        S-shape <b>squeezed horizontally</b>. It is steepest at <M>t = 23.75</M> (height 75 m), falling at{' '}
        <M>{'8\\pi \\approx 25.1'}</M> m/min, twice the first piece&apos;s top speed, and ends at <M>(27.5, 15)</M>.
      </Notice>
    )
  } else if (t < 3.75 || t > 11.25) {
    notice = (
      <Notice>
        Near the {t < 7.5 ? 'bottom' : 'top'} of the wheel the pod is moving mostly <b>sideways</b>, so its height
        changes slowly (about <M>{`${Math.abs(r).toFixed(1)}`}</M> m/min here) and the graph is <b>flat</b>.{' '}
        {t < 7.5 ? (
          <>Slide on towards <M>t = 7.5</M>, when the pod reaches <M>B</M>.</>
        ) : (
          <>Slide on to <M>t = 15</M>, where the wheel stops.</>
        )}
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Around <M>B</M>, level with the centre <M>P</M>, the pod moves almost <b>straight up</b>, so its height changes
        fastest: <M>{'4\\pi \\approx 12.6'}</M> m/min at <M>t = 7.5</M>. That is the steep middle of the S-shape. Turn on
        &ldquo;Straight-line sketch&rdquo; to compare with a straight line.
      </Notice>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start gap-2">
        <Wheel t={t} />
        <div className="flex-1 min-w-0">
          <Plane x={[0, 30]} y={[0, 150]} xStep={5} yStep={30} height={SVG_H} xLabel="t" yLabel="w">
            <Plot.OfX y={w} domain={[0, END]} color={C.guide} weight={1.5} style="dashed" />
            {line && (
              <>
                <Line.Segment point1={[0, 15]} point2={[15, 135]} color={C.bad} style="dashed" weight={2} />
                <Line.Segment point1={[20, 135]} point2={[END, 15]} color={C.bad} style="dashed" weight={2} />
              </>
            )}
            {t > 0.01 && <Plot.OfX y={h} domain={[0, Math.min(t, 15)]} color={C.f} weight={3} />}
            {t > 15 && <Line.Segment point1={[15, 135]} point2={[Math.min(t, 20), 135]} color={C.f} weight={3} />}
            {t > 20 && <Plot.OfX y={x => h(2 * x + 5)} domain={[20, t]} color={C.f} weight={3} />}
            <Line.Segment point1={[0, y]} point2={[t, y]} color={C.f} style="dashed" weight={1.5} />
            {line && piece !== 2 && gap >= 0.5 && <Point x={t} y={sl} color={C.bad} />}
            <Point x={t} y={y} color={C.f} />
            <Label at={[0, 15]} attach="se" size={12}>(0, 15)</Label>
            <Label at={[15, 135]} attach="nw" size={12}>(15, 135)</Label>
            <Label at={[20, 135]} attach="ne" size={12}>(20, 135)</Label>
            <Label at={[END, 15]} attach="sw" size={12}>(27.5, 15)</Label>
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
          max={END}
          step={0.05}
          format={v => v.toFixed(1)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Turn the wheel" />
          <Toggle label="Straight-line sketch" checked={line} onChange={setLine} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`w(${t.toFixed(1)}) \\approx ${y.toFixed(1)}\\ \\text{m}`} />
          <Readout tex={`\\text{height changing at} \\approx ${Math.abs(r) < 0.05 ? '0.0' : r.toFixed(1)}\\ \\text{m/min}`} />
          {line && piece !== 2 && <Readout color={C.bad} tex={`\\text{straight line: } ${sl.toFixed(1)}\\ \\text{m}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
