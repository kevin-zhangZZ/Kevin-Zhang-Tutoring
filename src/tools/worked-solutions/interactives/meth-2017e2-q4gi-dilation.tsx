// 2017 Methods Exam 2 Q4g(i) — g₁(x) = 2eˣ − 2 onto gₖ(x) = 2e^(kx) − 2 is a dilation by factor
// 1/k from the y-axis. Three marked points of g₁ slide horizontally (purple arrows) to their
// images on gₖ: every x-coordinate is multiplied by 1/k, every y-coordinate is unchanged, and the
// origin (on the y-axis) stays put. A toggle draws the tempting "factor k" graph g₁(x/k), which
// moves the wrong way. `DilationView` is shared with the part (ii) widget, which shows the
// reflected picture (g₁⁻¹ onto gₖ⁻¹, a vertical dilation by 1/k from the x-axis).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Vector, num, tick } from './kit'

const g = (k: number) => (x: number) => 2 * Math.exp(k * x) - 2
const gInv = (k: number) => (x: number) => Math.log((x + 2) / 2) / k
const XS = [-2, -0.8, 0.7]
const t = (s: string) => s.replace('−', '-')

export function DilationView({ inverse }: { inverse: boolean }) {
  const [k, setK] = useState(2)
  const [wrong, setWrong] = useState(false)
  const [mirror, setMirror] = useState(false)
  const g1 = g(1)
  const gk = g(k)
  const one = Math.abs(k - 1) < 1e-9
  // Marked points on g₁ and their images on gₖ; for the inverse view, their mirror images.
  const pts = XS.map(x => ({ from: [x, g1(x)] as [number, number], to: [x / k, g1(x)] as [number, number] }))
  const swap = ([x, y]: [number, number]) => [y, x] as [number, number]
  const shown = inverse ? pts.map(p => ({ from: swap(p.from), to: swap(p.to) })) : pts
  const sample = shown[2]

  let notice
  if (!inverse && wrong) {
    notice = (
      <Notice tone="warn">
        The red dashed curve is <M>{'g_1\\!\\left(\\tfrac{x}{k}\\right)'}</M>, a dilation by factor <M>k</M> from the{' '}
        <M>y</M>-axis. For <M>{'k>1'}</M> it is <em>stretched</em> outwards while <M>{'g_k'}</M> is squashed in: the
        opposite way. Replacing <M>x</M> by <M>kx</M> divides every <M>x</M>-coordinate by <M>k</M>.
      </Notice>
    )
  } else if (one) {
    notice = (
      <Notice>
        At <M>k=1</M> nothing moves: <M>{'g_k'}</M> is <M>{'g_1'}</M>. That is all <M>{'g_1'}</M> means: the member of
        the family with <M>k=1</M>. Move <M>k</M> either way from here.
      </Notice>
    )
  } else if (!inverse) {
    notice = (
      <Notice>
        Each purple arrow is <b>horizontal</b>: the heights of the points never change, only their distance from
        the <M>y</M>-axis, which is multiplied by <M>{'\\tfrac1k'}</M>. The origin is on the <M>y</M>-axis, so it
        stays put. That is a dilation by factor <M>{'\\tfrac1k'}</M> from the <M>y</M>-axis, one transformation, in
        terms of <M>k</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now the arrows are <b>vertical</b>: each point keeps its <M>x</M>-coordinate and its height is multiplied
        by <M>{'\\tfrac1k'}</M>, a dilation by factor <M>{'\\tfrac1k'}</M> from the <M>x</M>-axis. Turn on the part (i)
        picture: each vertical arrow is the mirror image in <M>y=x</M> of a horizontal one, because reflecting
        swaps the roles of <M>x</M> and <M>y</M>.
      </Notice>
    )
  }

  const main = inverse ? C.g : C.f
  const lx = Math.min(Math.log(2.25) / k, 2.8)
  return (
    <div>
      <Plane x={[-3.5, 3]} y={[-3.5, 3]} equalScale height={420} xLabels={v => (v < -3.5 ? "" : tick(v))} yLabels={v => (v < -3.5 ? "" : tick(v))}>
        {inverse && <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />}
        {inverse && mirror && <Plot.OfX y={g1} domain={[-3.5, 1.3]} color={C.guide} weight={1.5} opacity={0.6} />}
        {inverse && mirror && <Plot.OfX y={gk} domain={[-3.5, 3]} color={C.f} weight={1.5} opacity={0.6} />}
        {inverse && mirror &&
          pts.map((p, i) => <Vector key={`m${i}`} tail={p.from} tip={p.to} color={C.guide} weight={1.5} />)}
        {inverse ? (
          <>
            <Plot.OfX y={gInv(1)} domain={[-1.999, 3]} color={C.guide} weight={2.5} />
            <Plot.OfX y={gInv(k)} domain={[-1.999, 3]} color={C.g} weight={3} />
          </>
        ) : (
          <>
            {wrong && <Plot.OfX y={x => g1(x / k)} domain={[-3.5, 3]} color={C.bad} weight={2.5} style="dashed" />}
            <Plot.OfX y={g1} domain={[-3.5, 1.3]} color={C.guide} weight={2.5} />
            <Plot.OfX y={gk} domain={[-3.5, 3]} color={C.f} weight={3} />
          </>
        )}
        {shown.map((p, i) => (
          <Vector key={i} tail={p.from} tip={p.to} color={C.violet} weight={2} />
        ))}
        {shown.map((p, i) => (
          <Point key={`a${i}`} x={p.from[0]} y={p.from[1]} color={C.guide} />
        ))}
        {shown.map((p, i) => (
          <Point key={`b${i}`} x={p.to[0]} y={p.to[1]} color={main} />
        ))}
        <Point x={0} y={0} color={C.ink} />
        {inverse ? (
          <>
            <Label at={[2.7, gInv(1)(2.7)]} color={C.guide} attach={k > 1 ? 'n' : 's'} size={12}>g₁⁻¹</Label>
            <Label at={[2.7, gInv(k)(2.7)]} color={C.g} attach={k > 1 ? 's' : 'n'}>gₖ⁻¹</Label>
          </>
        ) : (
          <>
            <Label at={[0.8, g1(0.8)]} color={C.guide} attach="e" size={12}>g₁</Label>
            <Label at={[lx, gk(lx)]} color={C.f} attach={k >= 1 ? 'w' : 'se'}>gₖ</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={0.25} max={3} step={0.05} />
        {inverse ? (
          <Toggle label="Show the part (i) picture" checked={mirror} onChange={setMirror} />
        ) : (
          <Toggle label="Dilate by factor k instead" checked={wrong} onChange={setWrong} />
        )}
        <Readouts>
          <Readout
            color={main}
            tex={`(${t(num(sample.from[0]))},\\ ${t(num(sample.from[1]))}) \\mapsto (${t(num(sample.to[0]))},\\ ${t(num(sample.to[1]))})`}
          />
          <Readout tex={inverse ? `(x,\\,y)\\mapsto\\left(x,\\,\\tfrac{y}{k}\\right)` : `(x,\\,y)\\mapsto\\left(\\tfrac{x}{k},\\,y\\right)`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}

export default function DilationFromYAxis() {
  return <DilationView inverse={false} />
}
