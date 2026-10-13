// 2014 Methods Exam 2 Q4e — q = 1 − 0.8ⁿ climbs towards 1 as n grows, so "q > 0.95" holds for
// every n past some point, and the minimum is the first whole n there: 1 − 0.8¹³ ≈ 0.945 (not
// enough), 1 − 0.8¹⁴ ≈ 0.956 (✓). A toggle shows the other side of the same inequality, 0.8ⁿ
// falling below 0.05 — why the inequality sign flips, the error the report names. A second toggle
// zooms the q-axis to [0.9, 1] (plotted as 10(q − 0.9) so the n-axis stays on screen), because on
// a 0-to-1 axis the 0.005 gaps either side of 0.95 at n = 13 and 14 are about a pixel.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Point, Readout, Readouts, Slider, Toggle } from './kit'

const NS = Array.from({ length: 20 }, (_, i) => i + 1)
const q = (n: number) => 1 - 0.8 ** n

export default function AtLeastOne() {
  const [n, setN] = useState(10)
  const [flip, setFlip] = useState(false)
  const [zoom, setZoom] = useState(false)
  // Zoomed: q in [0.9, 1] is drawn as 10(q − 0.9) in [0, 1], so the n-axis (q = 0.9) stays visible.
  const Y = (v: number) => (zoom ? (v - 0.9) * 10 : v)
  const shown = (k: number) => !zoom || q(k) >= 0.9
  const zoomHint = zoom ? '' : ' Turn on “Zoom in near 0.95” to see the gap.'
  const ok = q(n) > 0.95
  const qn = q(n)
  const r = 0.8 ** n

  let notice
  if (flip) {
    notice = (
      <Notice>
        The orange dots are <M>{'\\Pr(Y=0)=0.8^n'}</M>, the chance that <b>none</b> is tall. They fall as{' '}
        <M>q</M> rises, so <M>{'q>0.95'}</M> is the same as <M>{'0.8^n<0.05'}</M>: the sign flips. Writing{' '}
        <M>{'0.8^n>0.05'}</M> would pick out the small <M>n</M> on the left instead.
      </Notice>
    )
  } else if (n === 14) {
    notice = (
      <Notice tone="good">
        <b><M>n = 14</M> is the first dot above the line</b>: <M>{'q = 0.956'}</M>. Every larger <M>n</M> is above it
        too, so 14 is the minimum.{zoomHint} Turn on “Show Pr(none tall)” to see the inequality from the other side.
      </Notice>
    )
  } else if (n === 13) {
    notice = (
      <Notice tone="warn">
        <M>n = 13</M> gives <M>{'q = 0.945'}</M>, just <b>below</b> 0.95. Rounding <M>13.43</M> to the nearest whole
        number lands here, which is why you must round <b>up</b>.{zoomHint}
      </Notice>
    )
  } else if (ok) {
    notice = (
      <Notice>
        This <M>n</M> works, but it is not the minimum: <M>q</M> only grows with <M>n</M>. Move back until you find the
        first dot above the line.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Each extra plant is another chance of a tall one, so <M>q</M> climbs towards 1. Increase <M>n</M> until the dot
        first clears the green line <M>q = 0.95</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, 21]}
        y={[0, 1.05]}
        xStep={2}
        yStep={zoom ? 0.5 : 0.25}
        height={300}
        xLabel="n"
        yLabel=""
        xLabels={v => (v > 0 && v < 21 ? String(v) : '')}
        yLabels={v => (Math.abs(v - 1) < 1e-9 ? '1' : '')}
      >
        <Line.Segment point1={[0, Y(0.95)]} point2={[21, Y(0.95)]} color={C.good} style="dashed" weight={2} />
        <Label at={[0.3, Y(0.95)]} color={C.good} attach="se">0.95</Label>
        {zoom && <Label at={[0.3, 0]} color={C.f} attach="ne">0.9</Label>}
        {zoom && shown(n) && (
          <Line.Segment point1={[n, Y(qn)]} point2={[n, Y(0.95)]} color={ok ? C.good : C.bad} weight={3} />
        )}
        {flip && <Line.Segment point1={[0, 0.05]} point2={[21, 0.05]} color={C.g} style="dashed" weight={2} />}
        {flip && <Label at={[21, 0.05]} color={C.g} attach="nw">0.05</Label>}
        {NS.filter(shown).map(k => (
          <Point key={k} x={k} y={Y(q(k))} color={k === n ? (q(k) > 0.95 ? C.good : C.bad) : C.f} />
        ))}
        {flip && NS.map(k => <Point key={`r${k}`} x={k} y={0.8 ** k} color={C.g} />)}
        {shown(n) ? (
          <Label at={[n, Y(qn)]} color={ok ? C.good : C.bad} attach="se" gap={10}>{`n = ${n}`}</Label>
        ) : (
          <Label at={[n, 0]} color={C.bad} attach="ne">{`n = ${n}: q below 0.9`}</Label>
        )}
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={1} max={20} step={1} format={v => v.toFixed(0)} />
        <Buttons>
          <Toggle label="Zoom in near 0.95" checked={zoom} onChange={v => { setZoom(v); if (v) setFlip(false) }} />
          <Toggle label="Show Pr(none tall) = 0.8ⁿ" checked={flip} onChange={v => { setFlip(v); if (v) setZoom(false) }} />
        </Buttons>
        <Readouts>
          <Readout color={ok ? C.good : C.bad} tex={`q = 1-0.8^{${n}} = ${qn.toFixed(3)}`} />
          {flip && <Readout color={C.g} tex={`0.8^{${n}} = ${r.toFixed(3)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
