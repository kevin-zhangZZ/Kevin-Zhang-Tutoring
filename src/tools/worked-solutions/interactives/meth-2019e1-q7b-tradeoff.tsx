// 2019 Methods Exam 1 Q7b — why the largest triangle ABP sits at x = 1/2. Drag P round the
// semicircle y = √(1 − x²): the base AB = x + 1 grows steadily while the height PB = √(1 − x²)
// shrinks, slowly near the top and then steeply near x = 1. The graph below plots
// A(x) = ½(x + 1)√(1 − x²) with its tangent, and the readouts split A'(x) into the two product-rule
// terms (gain from the longer base, loss from the lower height) that cancel exactly at x = 1/2.
// A toggle draws the "tangent" you get if the chain-rule minus is lost — it never goes flat.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts,
  Slider, Toggle, clamp, usePlayer,
} from './kit'

const X_MIN = -0.95
const X_MAX = 0.95
const semi = (x: number) => Math.sqrt(Math.max(0, 1 - x * x))
const area = (x: number) => 0.5 * (x + 1) * semi(x)
const baseTerm = (x: number) => 0.5 * semi(x) // ½ · PB · (rate of AB = 1)
const heightTerm = (x: number) => 0.5 * (x + 1) * (-x / semi(x)) // ½ · AB · (rate of PB)
const dArea = (x: number) => baseTerm(x) + heightTerm(x) // = (1 − x − 2x²) / (2√(1 − x²))
const wrongD = (x: number) => (0.5 * (1 + x)) / semi(x) // chain-rule minus lost
const A_MAX = (3 * Math.sqrt(3)) / 8

function tangent(x: number, m: number) {
  const dx = 0.26 / Math.sqrt(1 + 2.25 * m * m)
  const y = area(x)
  return { p1: [x - dx, y - m * dx] as [number, number], p2: [x + dx, y + m * dx] as [number, number] }
}

export default function Tradeoff() {
  const [x, setX] = useState(0)
  const [lost, setLost] = useState(false)
  const player = usePlayer(setX, { min: X_MIN, max: X_MAX, seconds: 7 })

  const h = semi(x)
  const a = area(x)
  const d = dArea(x)
  const atMax = Math.abs(x - 0.5) < 0.025
  const atTop = Math.abs(x) < 0.025
  const tanColor = atMax ? C.good : C.ink
  const t = tangent(x, d)
  const tw = tangent(x, wrongD(x))
  const f3 = (v: number) => (Math.abs(v) < 5e-4 ? '' : v > 0 ? '+' : '-') + Math.abs(v).toFixed(3)

  let notice
  if (lost) {
    notice = (
      <Notice tone="warn">
        With the minus lost, <M>{"A'(x) = \\dfrac{1+x}{2\\sqrt{1-x^2}}"}</M>, which is <b>positive for every</b>{' '}
        <M>{'-1 < x < 1'}</M>. The red dashed line uses that slope. At the peak, <M>{'x = \\tfrac12'}</M>, the true
        tangent is flat but the red line climbs steeply, and it is never flat anywhere. Yet the area falls back to{' '}
        <M>0</M> at <M>x = 1</M>, so a correct derivative must be zero somewhere inside. Slide <M>x</M> and watch the
        red line fail to follow the curve.
      </Notice>
    )
  } else if (atMax) {
    notice = (
      <Notice tone="good">
        <b>At <M>{'x = \\tfrac12'}</M> the tangent is flat.</b> The gain from the longer base,{' '}
        <M>{'\\tfrac12\\sqrt{1-x^2} = \\tfrac{\\sqrt3}{4}'}</M>, exactly cancels the loss from the lower height, so{' '}
        <M>{"A'(\\tfrac12) = 0"}</M> and the area peaks at <M>{'\\tfrac{3\\sqrt3}{8} \\approx 0.650'}</M>. Nudge{' '}
        <M>x</M> either way: the area only drops.
      </Notice>
    )
  } else if (atTop) {
    notice = (
      <Notice>
        At <M>x = 0</M>, P is at the top of the semicircle, where the curve is flat, so moving B barely changes the
        height: the height term is <M>0</M> and all of <M>{"A'(0) = \\tfrac12"}</M> comes from the longer base. The area
        is still rising here, so the maximum must be to the <b>right</b> of <M>0</M>. Drag P right.
      </Notice>
    )
  } else if (x < 0) {
    notice = (
      <Notice>
        Left of <M>x = 0</M>, P is still climbing the semicircle, so moving B right makes the base <b>and</b> the height
        bigger. Both product-rule terms are positive and the area rises quickly. Drag P past the top of the curve to
        see the height term turn negative.
      </Notice>
    )
  } else if (x < 0.5) {
    notice = (
      <Notice>
        Moving B right adds <M>1</M> unit of base per unit of <M>x</M>, but the height shrinks only slowly here. The
        orange gain beats the violet loss, so <M>{"A'(x) > 0"}</M> and the area is still increasing. Keep dragging P
        right and watch the two terms get closer.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Past <M>{'x = \\tfrac12'}</M> the semicircle is steep, so the height falls faster than the base grows. The violet
        loss now beats the orange gain, <M>{"A'(x) < 0"}</M>, and the area shrinks towards <M>0</M> at <M>x = 1</M>. Turn
        on the toggle to see what losing the chain-rule minus does to <M>{"A'(x)"}</M>.
      </Notice>
    )
  }

  const move = (v: number) => {
    player.stop()
    setX(clamp(v, X_MIN, X_MAX))
  }

  return (
    <div>
      <Plane x={[-1.2, 1.2]} y={[-0.25, 1.1]} xStep={0.5} yStep={0.5} height={300} equalScale labels={false} yLabel="">
        <Plot.OfX y={semi} domain={[-1, 1]} color={C.f} weight={3} />
        <Polygon points={[[-1, 0], [x, 0], [x, h]]} color={C.f} fillOpacity={0.18} weight={1.5} />
        <Line.Segment point1={[-1, 0]} point2={[x, 0]} color={C.g} weight={4} />
        <Line.Segment point1={[x, 0]} point2={[x, h]} color={C.violet} weight={4} />
        {x + 1 > 0.55 && (
          <Label at={[(x - 1) / 2, 0]} attach="s" color={C.g}>
            x + 1
          </Label>
        )}
        {h > 0.3 && (
          <Label at={[x, h / 2]} attach={x > 0.45 ? 'w' : 'e'} color={C.violet}>
            √(1 − x²)
          </Label>
        )}
        <Point x={-1} y={0} color={C.ink} />
        <Label at={[-1, 0]} attach="nw">
          A
        </Label>
        <Point x={x} y={0} color={C.ink} />
        <Label at={[x, 0]} attach="se">
          B
        </Label>
        <MovablePoint
          point={[x, h]}
          color={C.f}
          constrain={([px, py]) => {
            const th = clamp(Math.atan2(Math.max(py, 0), px), Math.acos(X_MAX), Math.acos(X_MIN))
            return [Math.cos(th), Math.sin(th)]
          }}
          onMove={([px]) => move(px)}
        />
        <Label at={[x, h]} attach={x > 0.6 ? 'ne' : 'n'} gap={12}>
          P
        </Label>
      </Plane>

      <Plane x={[-1.1, 1.1]} y={[0, 0.8]} xStep={0.5} yStep={0.2} height={230} yLabel="">
        <Plot.OfX y={area} domain={[-1, 1]} color={C.f} weight={3} />
        <Label at={[-0.45, area(-0.45)]} attach="nw" color={C.f}>
          A(x)
        </Label>
        <Line.Segment point1={[x, 0]} point2={[x, a]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={t.p1} point2={t.p2} color={tanColor} weight={2.5} />
        {lost && <Line.Segment point1={tw.p1} point2={tw.p2} color={C.bad} weight={2.5} style="dashed" />}
        <Point x={x} y={a} color={atMax ? C.good : C.f} />
        {atMax && (
          <Label at={[0.5, A_MAX]} attach="n" color={C.good} gap={10}>
            max 3√3/8
          </Label>
        )}
      </Plane>

      <Controls>
        <Slider label="x" value={x} onChange={move} min={X_MIN} max={X_MAX} step={0.005} />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x)} label="Sweep B across" />
          <Toggle
            label="Lose the chain-rule minus"
            checked={lost}
            onChange={v => {
              setLost(v)
              if (v) move(0.5) // jump to the peak, where the two slopes differ most visibly
            }}
          />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`AB = x+1 = ${(x + 1).toFixed(3)}`} />
          <Readout color={C.violet} tex={`PB = \\sqrt{1-x^2} = ${h.toFixed(3)}`} />
          <Readout color={C.f} tex={`A = \\tfrac12(x+1)\\sqrt{1-x^2} = ${a.toFixed(3)}`} />
        </Readouts>
        <Readouts>
          <Readout color={C.g} tex={`\\text{base term } \\tfrac12\\sqrt{1-x^2} = ${f3(baseTerm(x))}`} />
          <Readout color={C.violet} tex={`\\text{height term } \\tfrac12(x+1)\\cdot\\tfrac{-x}{\\sqrt{1-x^2}} = ${f3(heightTerm(x))}`} />
          <Readout color={atMax ? C.good : C.ink} tex={`A'(x) = ${f3(d)}`} />
          {lost && <Readout color={C.bad} tex={`\\text{lost minus: } \\tfrac{1+x}{2\\sqrt{1-x^2}} = ${f3(wrongD(x))}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
