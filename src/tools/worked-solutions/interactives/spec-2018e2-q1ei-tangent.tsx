// 2018 Specialist Exam 2 Q1e.i — where f′ exists. Slide a point along y = f(x) = 2arcsin(x² − 1) and
// see its tangent, slope f′(x) = 4x/(|x|√(2 − x²)) (parts c. and d.). Strictly inside
// (−√2, 0) ∪ (0, √2) there is exactly one tangent with a finite slope. At x = 0 the curve comes in
// along slope −2√2 and leaves along +2√2: two different one-sided tangents, so f′(0) does not exist
// (the report's most common error was to include x = 0). At x = ±√2 the tangent is vertical
// (4/√(2 − x²) → ∞), so f′ is undefined there even though f(±√2) = π (the report's other common
// error). The strip under the graph is dom f′; the toggle swaps in the wrong answer dom f′ = dom f.
// The slider moves in steps of √2/100, so it lands exactly on −√2, 0 and √2.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle,
  num, tick,
} from './kit'

const R2 = Math.SQRT2
const PI = Math.PI
const f = (x: number) => 2 * Math.asin(Math.max(-1, Math.min(1, x * x - 1)))
const xOfY = (y: number) => Math.sqrt(Math.max(0, 1 + Math.sin(y / 2))) // right-branch x at height y
const STRIP = -4.4 // height of the dom f′ strip

function Hollow({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 4.5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2 } }} />
}

const showX = (k: number) => (k === 0 ? '0' : Math.abs(k) === 100 ? (k < 0 ? '−√2' : '√2') : ((k * R2) / 100).toFixed(2))

export default function TangentDomain() {
  const [k, setK] = useState(60)
  const [wrong, setWrong] = useState(false)
  const x0 = (k * R2) / 100
  const atZero = k === 0
  const atEnd = Math.abs(k) === 100
  const y0 = atEnd ? PI : f(x0)
  const m = atZero || atEnd ? NaN : (Math.sign(x0) * 4) / Math.sqrt(2 - x0 * x0)
  const xTex = atEnd ? (k < 0 ? '-\\sqrt2' : '\\sqrt2') : num(x0)

  let notice
  if (atZero) {
    notice = (
      <Notice tone="warn">
        At <M>x = 0</M> the curve comes in down a slope of <M>{'-2\\sqrt2'}</M> (orange) and leaves up a slope
        of <M>{'2\\sqrt2'}</M> (violet). There is no single tangent line, so <M>{"f'(0)"}</M> does not exist and{' '}
        <M>0</M> is cut out of the domain. The form <M>{"\\tfrac{g(x)}{\\sqrt{2-x^2}}"}</M> hides this (
        <M>{'\\sqrt{2-0}'}</M> is fine), and including <M>x = 0</M> was the report&rsquo;s most common error. Now
        go to <M>{'x=\\sqrt2'}</M>.
      </Notice>
    )
  } else if (atEnd) {
    notice = (
      <Notice tone="warn">
        At <M>{`x = ${xTex}`}</M> the curve arrives <b>vertically</b>: the slope <M>{'\\tfrac{4}{\\sqrt{2-x^2}}'}</M>{' '}
        grows without bound, and <M>{'\\tfrac{4}{\\sqrt0}'}</M> is undefined. The point <M>{'(\\pm\\sqrt2,\\pi)'}</M> is
        on the graph (part a. includes it), but <M>f'</M> does not exist there — so dom <M>f'</M> has{' '}
        <b>round</b> brackets at <M>{'\\pm\\sqrt2'}</M>.
        {wrong && <> The red strip claims these endpoints are in dom <M>f'</M>: no slope, so they can&rsquo;t be.</>}
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        One tangent with a finite slope, so <M>{`x = ${num(x0)}`}</M> is in the domain of <M>f'</M>. The slope&rsquo;s
        sign is the sign of <M>x</M> (<M>{'\\tfrac{4x}{|x|}=\\pm4'}</M>): falling on the left, rising on the right.
        {wrong
          ? <> The red strip is the wrong answer dom <M>f'</M> = dom <M>f</M>. Press the buttons to test its two
            suspicious points.</>
          : <> Press &ldquo;Tangent at the corner&rdquo; to see where that sign has to switch.</>}
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2, 2]} y={[-5, 4]} xStep={0.5} yStep={1} height={340} yLabels={v => (v < -2.5 ? '' : tick(v))}>
        <Plot.Parametric xy={t => [xOfY(t), t]} domain={[-PI, PI]} color={C.f} weight={3} />
        <Plot.Parametric xy={t => [-xOfY(t), t]} domain={[-PI, PI]} color={C.f} weight={3} />
        <Point x={-R2} y={PI} color={C.f} />
        <Point x={R2} y={PI} color={C.f} />

        {atZero ? (
          <>
            <Line.PointSlope point={[0, -PI]} slope={-2 * R2} color={C.g} weight={2} />
            <Line.PointSlope point={[0, -PI]} slope={2 * R2} color={C.violet} weight={2} />
            <Label at={[-0.5, -PI + 2 * R2 * 0.5]} attach="w" color={C.g}>slope −2√2</Label>
            <Label at={[0.5, -PI + 2 * R2 * 0.5]} attach="e" color={C.violet}>slope 2√2</Label>
          </>
        ) : atEnd ? (
          <>
            <Line.ThroughPoints point1={[x0, 0]} point2={[x0, 1]} color={C.bad} style="dashed" weight={2} />
            <Label at={[x0, -1.5]} attach={k < 0 ? 'e' : 'w'} color={C.bad}>vertical tangent</Label>
          </>
        ) : (
          <Line.PointSlope point={[x0, y0]} slope={m} color={C.g} weight={2} />
        )}
        <Point x={x0} y={y0} color={atZero || atEnd ? C.bad : C.g} />

        {wrong ? (
          <>
            <Line.Segment point1={[-R2, STRIP]} point2={[R2, STRIP]} color={C.bad} weight={4} />
            <Point x={-R2} y={STRIP} color={C.bad} />
            <Point x={R2} y={STRIP} color={C.bad} />
            <Label at={[0.7, STRIP]} attach="s" color={C.bad} size={12}>claimed dom f′</Label>
          </>
        ) : (
          <>
            <Line.Segment point1={[-R2, STRIP]} point2={[0, STRIP]} color={C.good} weight={4} />
            <Line.Segment point1={[0, STRIP]} point2={[R2, STRIP]} color={C.good} weight={4} />
            <Hollow x={-R2} y={STRIP} color={C.good} />
            <Hollow x={0} y={STRIP} color={C.good} />
            <Hollow x={R2} y={STRIP} color={C.good} />
            <Label at={[0.7, STRIP]} attach="s" color={C.good} size={12}>dom f′</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="x" value={k} onChange={setK} min={-100} max={100} step={1} format={showX} />
        <Buttons>
          <ActionButton label={<>Tangent at the corner, <M>x = 0</M></>} onClick={() => setK(0)} />
          <ActionButton label={<>Tangent at the end, <M>{'x = \\sqrt2'}</M></>} onClick={() => setK(100)} />
          <ActionButton label={<>Tangent at <M>x = -0.85</M></>} onClick={() => setK(-60)} />
        </Buttons>
        <Toggle label={<>Show the wrong answer dom <M>f'</M> = dom <M>f</M></>} checked={wrong} onChange={setWrong} />
        <Readouts>
          {atZero ? (
            <>
              <Readout color={C.g} tex={"\\text{from the left: } -2\\sqrt2 \\approx -2.83"} />
              <Readout color={C.violet} tex={"\\text{from the right: } 2\\sqrt2 \\approx 2.83"} />
              <Readout color={C.bad} tex={"f'(0)\\ \\text{does not exist}"} />
            </>
          ) : atEnd ? (
            <Readout color={C.bad} tex={`f'(${xTex}) = \\frac{${k < 0 ? '-' : ''}4}{\\sqrt{0}}\\ \\text{undefined}`} />
          ) : (
            <Readout color={C.g} tex={`f'(${num(x0)}) = \\frac{${x0 < 0 ? '-' : ''}4}{\\sqrt{2-x^2}} = ${num(m)}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
