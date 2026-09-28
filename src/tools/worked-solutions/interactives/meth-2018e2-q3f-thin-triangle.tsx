// 2018 Methods Exam 2 Q3f — the rod PQ, the vertical from P up to the bridge (PV) and the bridge
// itself form a thin right-angled triangle: right angle at Q, and the angle at P between the
// vertical and the rod equals the bridge's angle of elevation θ (the rod ⟂ bridge and the
// vertical ⟂ horizontal). So PQ = PV cos θ. At the real θ = π/90 the triangle is a 2° sliver, so a
// slider exaggerates θ (P is recomputed each time as the point of Arch 5 where h₂′(x) = tan θ, and
// the camera zooms to keep the triangle in view). A toggle shows the report's wrong idea — P on
// y = 5, giving x_P sin θ ≈ 1.90 instead of 1.91.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, Toggle,
} from './kit'

const TH0 = Math.PI / 90
const TH_MAX = Math.PI / 9
const h2 = (x: number) => 5 * Math.sin(((x - 40) * Math.PI) / 30)

function geometry(th: number) {
  const m = Math.tan(th)
  const u = Math.acos((6 * m) / Math.PI) // h2'(x) = (π/6)cos(u) = m, rising side of the arch
  const xP = 40 + (30 * u) / Math.PI
  const yP = h2(xP)
  const yV = 5 + m * xP // bridge height straight above P
  const gap = yV - yP
  const pq = gap * Math.cos(th)
  const n: [number, number] = [-Math.sin(th), Math.cos(th)] // unit direction from P up to the bridge, ⟂ bridge
  const Q: [number, number] = [xP + pq * n[0], yP + pq * n[1]]
  // Wrong idea: P on y = 5
  const pqW = xP * Math.sin(th)
  const QW: [number, number] = [xP + pqW * n[0], 5 + pqW * n[1]]
  return { m, xP, yP, yV, gap, pq, n, Q, pqW, QW }
}

function niceStep(span: number) {
  if (span < 7) return 1
  if (span < 14) return 2
  if (span < 35) return 5
  return 10
}

/** Grid numbers along the bottom and left edges (the axes themselves are usually out of view). */
function EdgeTicks({ x, y, step }: { x: [number, number]; y: [number, number]; step: number }) {
  const out = []
  for (let k = Math.ceil(x[0] / step) * step; k <= x[1] - step * 0.5; k += step) {
    if (k - x[0] < step * 0.5) continue
    out.push(<Label key={`x${k}`} at={[k, y[0]]} attach="n" gap={3} size={10} bold={false} color={C.guide}>{String(k)}</Label>)
  }
  for (let k = Math.ceil(y[0] / step) * step; k <= y[1] - step * 0.5; k += step) {
    if (k - y[0] < step * 0.5) continue
    out.push(<Label key={`y${k}`} at={[x[0], k]} attach="e" gap={3} size={10} bold={false} color={C.guide}>{String(k)}</Label>)
  }
  return <>{out}</>
}

export default function ThinTriangle() {
  const [th, setTh] = useState(TH0)
  const [wrong, setWrong] = useState(false)
  const g = geometry(th)
  const atTrue = Math.abs(th - TH0) < 0.0015

  // Camera: keep P, Q and V in view with a fixed aspect ratio, so the plane never changes height.
  const s = Math.max(g.gap, 1.6)
  const xr: [number, number] = [g.xP - 1.5 * s, g.xP + 1.5 * s]
  const yr: [number, number] = [g.yP - 0.55 * s, g.yV + 0.25 * s]
  const step = niceStep(xr[1] - xr[0])

  const P: [number, number] = [g.xP, g.yP]
  const V: [number, number] = [g.xP, g.yV]
  const along: [number, number] = [Math.cos(th), Math.sin(th)] // along the bridge
  const r = 0.09 * s
  const corner: [number, number][] = [
    g.Q,
    [g.Q[0] + r * along[0], g.Q[1] + r * along[1]],
    [g.Q[0] + r * along[0] - r * g.n[0], g.Q[1] + r * along[1] - r * g.n[1]],
    [g.Q[0] - r * g.n[0], g.Q[1] - r * g.n[1]],
  ]
  const arcR = 0.32 * s
  const mid = Math.PI / 2 + th / 2
  const archX = Math.min(67, g.xP + 1.2 * s)

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        The red rod starts from <M>{`(${g.xP.toFixed(2)},\\ 5)`}</M> on the dashed line <M>y = 5</M>. From there the
        triangle with <M>(0,\ 5)</M> gives <M>{`PQ = x_P\\sin\\theta \\approx ${g.pqW.toFixed(4)}`}</M>, but the real{' '}
        <M>P</M> is on the arch, <M>{`${(5 - g.yP).toFixed(3)}`}</M> below that line.{' '}
        {atTrue ? (
          <>
            At <M>2^\circ</M> the two points look identical, yet the answer changes in the second decimal place
            (<M>1.90</M> instead of <M>1.91</M>). Raise <M>\theta</M> and watch the real <M>P</M> drop away from{' '}
            <M>y = 5</M>.
          </>
        ) : (
          <>
            With the angle exaggerated the gap is easy to see: the red rod is <M>{`${(g.pq - g.pqW).toFixed(3)}`}</M> too
            short. Press &ldquo;Back to π/90&rdquo; to see that at the real angle it still costs the second decimal place.
          </>
        )}
      </Notice>
    )
  } else if (atTrue) {
    notice = (
      <Notice>
        The rod is perpendicular to the bridge and the dashed vertical is perpendicular to the ground, so the angle
        between them at <M>P</M> equals the bridge&apos;s angle <M>\theta</M>. That makes <M>PQV</M> a right-angled
        triangle with the vertical gap <M>PV</M> as hypotenuse, so <M>{'PQ = PV\\cos\\theta'}</M>. At the real angle{' '}
        <M>{'\\tfrac{\\pi}{90}'}</M> the rod is only <M>2^\circ</M> off vertical and the triangle is a sliver. Drag{' '}
        <M>\theta</M> up to open it out.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Now you can see the triangle: right angle at <M>Q</M>, angle <M>\theta</M> at <M>P</M>, hypotenuse{' '}
        <M>PV</M>. The rod <M>PQ</M> is shorter than the vertical gap by the factor <M>{'\\cos\\theta'}</M>, and its
        gradient is <M>{'-\\tfrac{1}{\\tan\\theta}'}</M>. <M>P</M> also slides down the arch, because a steeper bridge
        needs a steeper tangent. Slide back to <M>2^\circ</M>: <M>{'\\cos\\tfrac{\\pi}{90} = 0.9994'}</M>, so{' '}
        <M>PV</M> and <M>PQ</M> agree to two decimal places, but only <M>PQ</M> is the rod.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={xr} y={yr} xStep={step} yStep={step} equalScale height={340} labels={false} xLabel="" yLabel="">
        <EdgeTicks x={xr} y={yr} step={step} />
        <Line.Segment point1={[xr[0] - s, 5]} point2={[xr[1] + s, 5]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={h2} domain={[40, 70]} color={C.f} weight={3} />
        <Plot.OfX y={x => 5 + g.m * x} domain={[0, 110]} color={C.g} weight={3} />
        <Polygon points={[P, g.Q, V]} color={C.violet} fillOpacity={0.18} weight={0} strokeOpacity={0} />
        <Line.Segment point1={P} point2={V} color={C.violet} style="dashed" weight={2} />
        <Polygon points={corner} color={C.ink} fillOpacity={0} weight={1.5} />
        {!atTrue && (
          <Plot.Parametric
            xy={t => [g.xP + arcR * Math.cos(t), g.yP + arcR * Math.sin(t)]}
            domain={[Math.PI / 2, Math.PI / 2 + th]}
            color={C.violet}
            weight={2}
          />
        )}
        <Label at={[g.xP + (arcR + 0.1 * s) * Math.cos(mid), g.yP + (arcR + 0.1 * s) * Math.sin(mid)]} attach={th > 0.12 ? 'c' : 'w'} color={C.violet} italic>
          θ
        </Label>
        {wrong && (
          <>
            <Line.Segment point1={[g.xP, 5]} point2={g.QW} color={C.bad} weight={3} style="dashed" />
            <Point x={g.xP} y={5} color={C.bad} />
          </>
        )}
        <Line.Segment point1={P} point2={g.Q} color={C.good} weight={4} />
        <Point x={P[0]} y={P[1]} color={C.good} />
        <Point x={g.Q[0]} y={g.Q[1]} color={C.good} />
        <Point x={V[0]} y={V[1]} color={C.violet} />
        <Label at={P} attach="se" color={C.good}>P</Label>
        <Label at={g.Q} attach="nw" color={C.good}>Q</Label>
        <Label at={V} attach="ne" color={C.violet}>V</Label>
        <Label at={[xr[1], 5 + g.m * xr[1]]} attach="nw" color={C.g}>bridge</Label>
        <Label at={[xr[1], 5]} attach="nw" color={C.guide} bold={false}>y = 5</Label>
        <Label at={[archX, h2(archX)]} attach="sw" color={C.f}>Arch 5</Label>
      </Plane>
      <Controls>
        <Slider label="\theta" value={th} onChange={setTh} min={TH0} max={TH_MAX} step={0.001} format={v => `${((v * 180) / Math.PI).toFixed(1)}°`} />
        <Buttons>
          <ActionButton label="Back to π/90" onClick={() => setTh(TH0)} />
          <ActionButton label="Exaggerate: 15°" onClick={() => setTh(Math.PI / 12)} />
          <Toggle label="Wrong idea: P is on y = 5" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.good} tex={`P = (${g.xP.toFixed(2)},\\ ${g.yP.toFixed(2)})`} />
          <Readout color={C.violet} tex={`PV = 5 + x_P\\tan\\theta - y_P = ${g.gap.toFixed(4)}`} />
          <Readout color={C.good} tex={`PQ = PV\\cos\\theta = ${g.pq.toFixed(4)}`} />
          {wrong && <Readout color={C.bad} tex={`x_P\\sin\\theta = ${g.pqW.toFixed(4)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
