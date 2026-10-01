// 2021 Methods Exam 1 Q9c.ii — why the maximum area is at the endpoint θ = π/3, not at a turning
// point. g(θ) = sin θ is drawn solid on its domain (0, π/3] (part c.i) and dashed beyond it. Drag
// θ: inside the domain g′(θ) = cos θ > 0, so g only rises and is highest at the closed end,
// g(π/3) = √3/2 ≈ 0.866. Past π/3 no allowed q puts P′ there. The toggle shows the report's wrong
// method: solving g′(θ) = 0 gives θ = π/2 and the incorrect A = 1, outside the domain.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, Toggle, num, tick } from './kit'

const PI = Math.PI
const END = PI / 3
const R3 = Math.sqrt(3)

function piSixth(v: number): string {
  const n = Math.round(v / (PI / 6))
  if (Math.abs(v - (n * PI) / 6) > 1e-6) return ''
  return ['', 'π/6', 'π/3', 'π/2'][n] ?? ''
}

export default function EndpointMax() {
  const [raw, setRaw] = useState(0.7)
  const [wrong, setWrong] = useState(false)

  const atEnd = Math.abs(raw - END) < 0.006
  const th = atEnd ? END : raw
  const inside = th <= END + 1e-9
  const dotColor = inside ? C.f : C.bad

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <b><M>\cos\theta = 0</M> gives <M>{'\\theta=\\tfrac\\pi2'}</M>, outside the domain.</b> That stationary point
        would put <M>P&apos;</M> at <M>(0, 1)</M>, the top of the circle, but <M>P&apos;</M> never gets past <M>P</M>{' '}
        (<M>{'\\theta=\\tfrac\\pi3'}</M>, part c.i). On the domain <M>{"g'(\\theta)=\\cos\\theta"}</M> is positive all the
        way, so there is no turning point to find: <M>A = 1</M> is the report&apos;s common wrong answer.
      </Notice>
    )
  } else if (!inside) {
    notice = (
      <Notice tone="warn">
        <M>{`\\theta \\approx ${num(th, 3)}`}</M> is past <M>{'\\tfrac\\pi3'}</M>, <b>outside the domain</b>: no line{' '}
        <M>h</M> with <M>{'0<q\\le1'}</M> puts <M>P&apos;</M> here. The dashed curve keeps climbing to <M>1</M> at{' '}
        <M>{'\\tfrac\\pi2'}</M>, but the triangle can&apos;t follow it. Now turn on &ldquo;Solve{' '}
        <M>{"g'(\\theta)=0"}</M>&rdquo;.
      </Notice>
    )
  } else if (atEnd) {
    notice = (
      <Notice tone="good">
        <b>The right endpoint <M>{'\\theta=\\tfrac\\pi3'}</M> is in the domain (closed bracket), and <M>g</M> is highest
        here:</b> maximum area <M>{'=\\sin\\tfrac\\pi3=\\tfrac{\\sqrt3}{2}\\approx0.866'}</M>. A function that increases
        all the way along <M>{'\\left(0,\\tfrac\\pi3\\right]'}</M> peaks at the closed end, not at a turning point. Try
        dragging further right.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        On the domain <M>{'\\left(0,\\tfrac\\pi3\\right]'}</M>, <M>{"g'(\\theta)=\\cos\\theta"}</M> is positive, so{' '}
        <b><M>g</M> is increasing</b>: the area keeps growing as <M>\theta</M> grows. Drag <M>\theta</M> to the right.
        Where does the domain stop, and what is <M>g</M> there?
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 1.75]} y={[0, 1.15]} xStep={PI / 6} yStep={0.25} height={280} xLabel="θ" yLabel="A" xLabels={piSixth} yLabels={v => (v > 1.1 ? '' : tick(v))}>
        <Polygon points={[[0, 0], [END, 0], [END, 1.15], [0, 1.15]]} color={C.good} fillOpacity={0.07} weight={0} strokeOpacity={0} />
        <Label at={[END / 2, 1.12]} color={C.good} attach="s" bold={false} size={12}>domain</Label>
        <Line.Segment point1={[0, R3 / 2]} point2={[END, R3 / 2]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={Math.sin} domain={[END, 1.75]} color={C.guide} style="dashed" weight={2} />
        <Plot.OfX y={Math.sin} domain={[0, END]} color={C.f} weight={3} />
        <Point x={0} y={0} color={C.f} svgCircleProps={{ r: 4.5, style: { fill: 'var(--mafs-bg)', stroke: C.f, strokeWidth: 2 } }} />
        <Point x={END} y={R3 / 2} color={C.f} />
        {wrong && (
          <>
            <Line.Segment point1={[0, 1]} point2={[PI / 2, 1]} color={C.bad} style="dashed" weight={1.5} />
            <Point x={PI / 2} y={1} color={C.bad} svgCircleProps={{ r: 6 }} />
            <Label at={[PI / 2, 1]} color={C.bad} attach="sw" size={12}>g′ = 0: A = 1?</Label>
          </>
        )}
        <Line.Segment point1={[th, 0]} point2={[th, Math.sin(th)]} color={dotColor} style="dashed" weight={1.5} />
        <Point x={th} y={Math.sin(th)} color={dotColor} svgCircleProps={{ r: 6.5 }} />
      </Plane>
      <Controls>
        <Slider label="\theta" value={raw} onChange={setRaw} min={0.02} max={PI / 2} step={0.005} format={v => v.toFixed(3)} />
        <Toggle label={<>Solve <M>{"g'(\\theta)=0"}</M></>} checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout color={dotColor} tex={atEnd ? '\\theta = \\tfrac\\pi3' : `\\theta \\approx ${num(th, 3)}`} />
          <Readout color={dotColor} tex={`g(\\theta) = \\sin\\theta \\approx ${num(Math.sin(th), 3)}`} />
          <Readout tex={`g'(\\theta) = \\cos\\theta \\approx ${num(Math.cos(th), 3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
