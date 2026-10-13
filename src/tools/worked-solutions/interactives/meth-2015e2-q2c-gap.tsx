// 2015 Methods Exam 2 Q2c — M is the BOTTOM of the longest vertical column, so it is on the road.
// Slide a vertical column between the road h(x) = x³/25600 − 3x/16 + 35 and the frame
// g(x) = 60 − 3x²/80 (between the crossings E, x ≈ −23.71, and F, x ≈ 28.00); the violet curve is
// the gap d(x) = g(x) − h(x) itself. Its peak is at u = 40√65 − 320 ≈ 2.49 (d′(u) = 0), where the
// column's two ends are M(2.49, 34.53) on the road and N(2.49, 59.77) on the frame, and the gap
// d(u) ≈ 25.23 is the length MN (part d). The report's errors: substituting u into g (59.77) and
// v = 24.53 (impossible: the road stays between heights 30 and 40).

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, tick } from './kit'

const g = (x: number) => 60 - (3 / 80) * x * x
const h = (x: number) => (x * x * x) / 25600 - (3 / 16) * x + 35
const d = (x: number) => g(x) - h(x)
const U = 40 * Math.sqrt(65) - 320 // 2.4903…
const XE = -23.7068
const XF = 27.9963

export default function Gap() {
  const [x, setX] = useState(-15)

  const atM = Math.abs(x - U) < 0.3
  const col = atM ? C.good : C.violet

  let notice
  if (atM) {
    notice = (
      <Notice tone="good">
        <b>This is the column <M>MN</M>:</b> the violet gap curve peaks here, where <M>{"d'(x)=0"}</M>, at{' '}
        <M>u\approx2.49</M>. <M>M</M> is the <b>bottom</b> end, on the road, so <M>{'v=h(u)\\approx34.53'}</M>. The top end{' '}
        <M>N</M> is at <M>{'g(u)\\approx59.77'}</M>: substituting into <M>g</M> was an error the report names. The gap{' '}
        <M>25.23</M> is the length of <M>MN</M>, needed in part d.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The violet curve plots the gap <M>{'d(x)=g(x)-h(x)'}</M>: the length of a vertical column at each <M>x</M>. It is{' '}
        <M>0</M> at <M>E</M> and <M>F</M>, where the road meets the frame. Slide <M>x</M> to the top of the violet curve, or
        jump straight to <M>{"d'(x)=0"}</M>, and look at which end of the column is <M>M</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-42, 42]} y={[0, 65]} xStep={10} yStep={10} height={330} xLabels={v => (Math.abs(v) > 40 ? '' : tick(v))} yLabels={v => (v > 60 ? '' : tick(v))}>
        <Plot.OfX y={g} domain={[-40, 40]} color={C.g} weight={2.5} />
        <Plot.OfX y={h} domain={[-40, 40]} color={C.f} weight={2.5} />
        <Plot.OfX y={d} domain={[XE, XF]} color={C.violet} weight={2} style="dashed" />
        <Line.Segment point1={[x, h(x)]} point2={[x, g(x)]} color={col} weight={4} />
        <Point x={x} y={h(x)} color={C.f} />
        <Point x={x} y={g(x)} color={C.g} />
        <Point x={x} y={d(x)} color={C.violet} />
        {atM && <Label at={[x, h(x)]} attach="se" color={C.f}>M</Label>}
        {atM && <Label at={[x, g(x)]} attach="ne" color={C.g}>N</Label>}
        <Label at={[XE, g(XE)]} attach="s">E</Label>
        <Label at={[XF, g(XF)]} attach="s">F</Label>
        <Label at={[-36, h(-36)]} attach="n" color={C.f}>road h</Label>
        <Label at={[-28, g(-28)]} attach="w" color={C.g}>frame g</Label>
        <Label at={[16, d(16)]} attach="se" color={C.violet}>gap d</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={setX} min={-23.5} max={27.75} step={0.05} />
        <Buttons>
          <ActionButton label="Jump to d′(x) = 0" onClick={() => setX(U)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\text{road: } h(x)=${h(x).toFixed(2)}`} />
          <Readout color={C.g} tex={`\\text{frame: } g(x)=${g(x).toFixed(2)}`} />
          <Readout color={col} tex={`\\text{gap: } d(x)=${d(x).toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
