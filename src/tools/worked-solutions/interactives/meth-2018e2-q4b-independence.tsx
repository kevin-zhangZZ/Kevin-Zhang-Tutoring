// 2018 Methods Exam 2 Q4b — independence as an area model. The town is a unit square split into
// two columns: S (sportspeople, 29%) and S′ (71%). The sky shading in each column is the share
// with a slow heart rate, so its height in the S column is Pr(H | S). Pr(H) = 0.1587 and Pr(S) are
// fixed; the slider moves Pr(H ∩ S). Independence means both columns are shaded to the same
// height (the dashed whole-town line), which happens only at Pr(H ∩ S) = 0.1587 × 0.29 ≈ 0.046.
// The real 0.09 makes the S column about twice as high; 0 (mutually exclusive) empties it.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Polygon, Readout, Readouts, Slider,
} from './kit'

const PH = 0.1587
const PS = 0.29
const ACTUAL = 0.09
const INDEP = PH * PS // 0.046023

const rect = (x0: number, x1: number, y0: number, y1: number): [number, number][] => [
  [x0, y0], [x1, y0], [x1, y1], [x0, y1],
]

export default function Independence() {
  const [q, setQ] = useState(ACTUAL)

  const hS = q / PS // Pr(H | S)
  const hS2 = (PH - q) / (1 - PS) // Pr(H | S′)
  const indep = Math.abs(q - INDEP) < 0.0012
  const exclusive = q < 0.0012

  let notice
  if (indep) {
    notice = (
      <Notice tone="good">
        <b>This is what independent looks like.</b> Both columns are shaded up to the dashed line, so a
        sportsperson is no more likely to have a slow heart rate than anyone else:{' '}
        <M>{'\\Pr(H\\mid S) = \\Pr(H) = 0.1587'}</M>. It needs <M>{'\\Pr(H\\cap S) = 0.1587\\times0.29 \\approx 0.046'}</M>,
        but the question says <M>0.09</M>.
      </Notice>
    )
  } else if (exclusive) {
    notice = (
      <Notice tone="warn">
        <b>Mutually exclusive is not independent.</b> With <M>{'\\Pr(H\\cap S)=0'}</M> no sportsperson has a slow
        heart rate, so knowing <M>S</M> tells you a lot: <M>{'\\Pr(H\\mid S)=0\\neq0.1587'}</M>. Events that can&apos;t
        happen together are about as dependent as events get.
      </Notice>
    )
  } else if (Math.abs(q - ACTUAL) < 0.0012) {
    notice = (
      <Notice>
        Zoom in on the <b>S column</b> only: of those <M>0.29</M>, the part <M>0.09</M> has a slow heart rate, so{' '}
        <M>{'\\Pr(H\\mid S) = \\tfrac{0.09}{0.29} \\approx 0.310'}</M>. That is about twice the whole-town rate on
        the dashed line, so playing sport changes the chance of <M>H</M>: not independent. Press
        &ldquo;Make them independent&rdquo; to see the picture that would be needed.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The two columns are shaded to different heights, so <M>{'\\Pr(H\\mid S)\\neq\\Pr(H)'}</M>: not independent.
        Whatever you choose, the total sky area stays <M>0.1587</M>; only how it is shared between the columns
        changes.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 1]} y={[0, 1]} xStep={0.1} yStep={0.1} height={300} xLabel="" yLabel="" xLabels={v => (v < 0 || Math.round(v * 10) % 2 ? '' : v.toFixed(1))} yLabels={false}>
        <Polygon points={rect(0, PS, 0, 1)} color={C.g} fillOpacity={0.08} weight={2} />
        <Polygon points={rect(PS, 1, 0, 1)} color={C.guide} fillOpacity={0.05} weight={1.5} />
        {q > 0.0005 && <Polygon points={rect(0, PS, 0, hS)} color={C.f} fillOpacity={0.55} weight={1.5} />}
        {hS2 > 0.0005 && <Polygon points={rect(PS, 1, 0, hS2)} color={C.f} fillOpacity={0.3} weight={1.5} />}
        <Line.Segment point1={[0, PH]} point2={[1, PH]} color={C.good} style="dashed" weight={2} />
        <Label at={[1, PH]} attach="nw" color={C.good} size={12}>Pr(H) = 0.1587</Label>
        <Label at={[PS / 2, 0.98]} attach="s" color={C.g}>S (sport)</Label>
        <Label at={[(1 + PS) / 2, 0.98]} attach="s" color={C.ink}>S′ (no sport)</Label>
        <Label at={[PS / 2, hS]} attach="n" color={C.f} size={12}>{hS.toFixed(3)}</Label>
        <Label at={[(1 + PS) / 2, hS2]} attach={hS2 > 0.05 ? 's' : 'n'} color={C.f} size={12}>
          {hS2.toFixed(3)}
        </Label>
      </Plane>
      <Controls>
        <Slider
          label="\Pr(H\cap S)"
          value={q}
          onChange={setQ}
          min={0}
          max={PH}
          step={0.0005}
          format={v => v.toFixed(4)}
        />
        <Buttons>
          <ActionButton label="The real data (0.09)" onClick={() => setQ(ACTUAL)} />
          <ActionButton label="Make them independent" onClick={() => setQ(INDEP)} />
          <ActionButton label="Mutually exclusive" onClick={() => setQ(0)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\Pr(H\\mid S) = \\tfrac{${q.toFixed(4)}}{0.29} = ${hS.toFixed(3)}`} />
          <Readout color={C.good} tex="\Pr(H) = 0.1587" />
          <Readout tex={`\\Pr(H)\\Pr(S) = 0.046 \\ ${indep ? '=' : '\\neq'}\\ \\Pr(H\\cap S)`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
