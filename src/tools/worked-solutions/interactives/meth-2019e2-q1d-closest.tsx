// 2019 Methods Exam 2 Q1d — the shortest link from (0, e) to the curve f(x) = x²e^(−x²),
// m ∈ [0, 1]. Drag M along the curve (or use the slider): the top plane draws the link PM, the
// tangent at M and the angle between them; the lower plane graphs D(m) = √(m² + (f(m) − e)²),
// the function the working minimises. While the angle is acute, sliding M right brings it closer
// (D falls); once it is obtuse, D rises. The minimum, m ≈ 0.783, D ≈ 2.511, is where the link
// meets the curve at 90°. At m = 0 the link is perpendicular too, but that is the other solution
// of D′(m) = 0, a local maximum (D(0) = e), which the D(m) graph shows.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, PlayButton, Plot, Point, Polygon,
  Readout, Readouts, Slider, Toggle, clamp, usePlayer,
} from './kit'

const E = Math.E
const f = (x: number) => x * x * Math.exp(-x * x)
const fp = (x: number) => 2 * x * (1 - x * x) * Math.exp(-x * x)
const D = (m: number) => Math.hypot(m, f(m) - E)

// The minimising m, by golden-section search on [0.5, 1] (≈ 0.78303).
const M_STAR = (() => {
  let a = 0.5
  let b = 1
  const r = (Math.sqrt(5) - 1) / 2
  for (let i = 0; i < 80; i++) {
    const c = b - r * (b - a)
    const d = a + r * (b - a)
    if (D(c) < D(d)) b = d
    else a = c
  }
  return (a + b) / 2
})()
const D_STAR = D(M_STAR)

// The angle (degrees) between the link M→P and the tangent direction (1, f′(m)).
function angleAt(m: number): number {
  const vx = -m
  const vy = E - f(m)
  const tx = 1
  const ty = fp(m)
  const c = (vx * tx + vy * ty) / (Math.hypot(vx, vy) * Math.hypot(tx, ty))
  return (Math.acos(clamp(c, -1, 1)) * 180) / Math.PI
}

// Snap a dragged point to the nearest point of the curve with m in [0, 1].
function nearestM([px, py]: [number, number]): number {
  let best = 0
  let bestD = Infinity
  for (let i = 0; i <= 500; i++) {
    const m = i / 500
    const d2 = (m - px) ** 2 + (f(m) - py) ** 2
    if (d2 < bestD) {
      bestD = d2
      best = m
    }
  }
  return best
}

export default function Closest() {
  const [m, setM] = useState(0.35)
  const [showTan, setShowTan] = useState(true)
  const player = usePlayer(setM, { min: 0, max: 1, seconds: 8 })

  const n = f(m)
  const dist = D(m)
  const theta = angleAt(m)
  const atMin = Math.abs(m - M_STAR) < 0.006
  const atZero = m < 0.006
  const square = atMin || atZero
  const linkColor = atMin ? C.good : C.g

  // unit tangent (pointing right) and unit vector towards P, for the tangent and right-angle mark
  const tl = Math.hypot(1, fp(m))
  const tx = 1 / tl
  const ty = fp(m) / tl
  const ux = -m / dist
  const uy = (E - n) / dist
  const s = 0.16
  const TAN = 0.9

  let notice
  if (atMin) {
    notice = (
      <Notice tone="good">
        <b>The link meets the curve at a right angle.</b> A tiny slide of <M>M</M> either way now moves it across the
        link, not towards or away from <M>(0, e)</M>, so <M>D</M> stops changing: <M>{"D'(m)=0"}</M>. The graph below
        shows this is the bottom of the dip: <M>{`D \\approx ${D_STAR.toFixed(3)}`}</M> at{' '}
        <M>{`m \\approx ${M_STAR.toFixed(3)}`}</M>.
      </Notice>
    )
  } else if (atZero) {
    notice = (
      <Notice tone="warn">
        At <M>m = 0</M> the tangent is flat and <M>(0, e)</M> is straight above, so the link is perpendicular here
        too, and <M>{"D'(0)=0"}</M>. But the graph below shows <M>{'D(0) = e \\approx 2.718'}</M> is the{' '}
        <b>largest</b> value on <M>[0, 1]</M>, not the smallest. Solving <M>{"D'(m)=0"}</M> gives both <M>m = 0</M>{' '}
        and <M>{'m \\approx 0.783'}</M>; keep the one with the smaller <M>D</M>. Now slide <M>M</M> right.
      </Notice>
    )
  } else if (theta < 90) {
    notice = (
      <Notice>
        The link makes an <b>acute</b> angle (<M>{`${theta.toFixed(1)}^\\circ`}</M>) with the direction <M>M</M> moves
        as <M>m</M> increases. So sliding <M>M</M> to the right carries it partly towards <M>(0, e)</M>, and{' '}
        <M>D</M> is still falling. Keep sliding right until the angle is exactly <M>{'90^\\circ'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now the angle is <b>obtuse</b> (<M>{`${theta.toFixed(1)}^\\circ`}</M>): sliding right carries <M>M</M>{' '}
        partly <em>away</em> from <M>(0, e)</M>, so <M>D</M> is rising again. The minimum is back where the angle
        was exactly <M>{'90^\\circ'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.5, 2.5]} y={[-0.3, 3]} xStep={1} yStep={1} equalScale height={420} yLabels={false}>
        <Plot.OfX y={f} domain={[-2, 3]} color={C.f} weight={2} />
        <Plot.OfX y={f} domain={[0, 1]} color={C.f} weight={6} />
        {showTan && (
          <Line.Segment
            point1={[m - TAN * tx, n - TAN * ty]}
            point2={[m + TAN * tx, n + TAN * ty]}
            color={C.violet}
            style="dashed"
            weight={2}
          />
        )}
        {square && (
          <Polygon
            points={[
              [m, n],
              [m + s * tx, n + s * ty],
              [m + s * tx + s * ux, n + s * ty + s * uy],
              [m + s * ux, n + s * uy],
            ]}
            color={atMin ? C.good : C.g}
            fillOpacity={0.2}
            weight={2}
          />
        )}
        <Line.Segment point1={[0, E]} point2={[m, n]} color={linkColor} weight={3} />
        <Point x={0} y={E} color={C.violet} />
        <Label at={[0, E]} attach="e" color={C.violet}>
          (0, e)
        </Label>
        <Label at={[m / 2, (E + n) / 2]} attach="e" color={linkColor}>
          {`D ≈ ${dist.toFixed(3)}`}
        </Label>
        <Label at={[m, n]} attach="se" color={C.f}>
          M
        </Label>
        <Label at={[1.9, f(1.9)]} attach="n" color={C.f}>
          f
        </Label>
        <MovablePoint
          point={[m, n]}
          onMove={p => {
            player.stop()
            setM(nearestM(p as [number, number]))
          }}
          color={linkColor}
        />
      </Plane>

      <div className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
        The function the working minimises: the distance <M>D(m)</M> for <M>m</M> from 0 to 1
      </div>
      <Plane x={[0, 1]} y={[2.48, 2.74]} xStep={0.25} yStep={0.05} height={200} labels={false} yLabel="" xLabel="">
        <Plot.OfX y={D} domain={[0, 1]} color={C.g} weight={3} />
        <Point x={M_STAR} y={D_STAR} color={C.good} />
        <Label at={[M_STAR, D_STAR]} attach="s" color={C.good} size={12}>
          {`min ${D_STAR.toFixed(3)}`}
        </Label>
        <Label at={[0, E]} attach="ne" color={C.ink} size={12}>
          D(0) = e
        </Label>
        <Label at={[0, 2.48]} attach="ne" color={C.guide} size={12}>
          m = 0
        </Label>
        <Label at={[1, 2.74]} attach="sw" color={C.guide} size={12}>
          m = 1
        </Label>
        <Point x={m} y={dist} color={linkColor} />
      </Plane>

      <Controls>
        <Slider
          label="m"
          value={m}
          onChange={v => {
            player.stop()
            setM(v)
          }}
          min={0}
          max={1}
          step={0.001}
          format={v => v.toFixed(3)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(m)} label="Slide M from 0 to 1" />
          <ActionButton
            label="Go to the minimum"
            onClick={() => {
              player.stop()
              setM(M_STAR)
            }}
          />
          <Toggle label="Tangent at M" checked={showTan} onChange={setShowTan} />
        </Buttons>
        <Readouts>
          <Readout color={linkColor} tex={`D(${m.toFixed(3)}) \\approx ${dist.toFixed(3)}`} />
          <Readout color={C.violet} tex={`\\text{angle to tangent} \\approx ${theta.toFixed(1)}^\\circ`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
