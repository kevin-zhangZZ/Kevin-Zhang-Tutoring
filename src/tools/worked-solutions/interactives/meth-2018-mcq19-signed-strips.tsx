// 2018 Methods Exam 2 MCQ 19 — an integral of (f − g) adds up strips of height f(x) − g(x),
// and that height is NEGATIVE wherever g is on top. Sweep a strip from x = 0 to x = 3 across
// f(x) = cos(πx/2) and g(x) = sin(πx): the top curve swaps at x = 1/3, 1, 5/3, so the regions
// alternate f-on-top / g-on-top. The toggle counts every strip as f − g (no sign fixes), which is
// what a lone ∫(f − g) does: the g-on-top regions are subtracted instead of added. Running values
// use the exact antiderivative h(x) = (2/π)sin(πx/2) + (1/π)cos(πx), as in the working.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Polygon, Readout, Readouts, Region, Slider, Toggle,
  usePlayer,
} from './kit'

const f = (x: number) => Math.cos((Math.PI * x) / 2)
const g = (x: number) => Math.sin(Math.PI * x)
const top = (x: number) => Math.max(f(x), g(x))
const bottom = (x: number) => Math.min(f(x), g(x))
const h = (x: number) => (2 / Math.PI) * Math.sin((Math.PI * x) / 2) + (1 / Math.PI) * Math.cos(Math.PI * x)
const CROSS = [0, 1 / 3, 1, 5 / 3, 3]
/** Region k (0..3) has f on top when k is even. */
const fOnTop = (k: number) => k % 2 === 0
const regionOf = (x: number) => (x < 1 / 3 ? 0 : x < 1 ? 1 : x < 5 / 3 ? 2 : 3)
const W = 0.045

/** Area swept from 0 to x (every strip counted positive). */
function areaTo(x: number) {
  let s = 0
  for (let k = 0; k < 4; k++) {
    const a = CROSS[k]
    const b = Math.min(x, CROSS[k + 1])
    if (b > a) s += Math.abs(h(b) - h(a))
  }
  return s
}

export default function SignedStrips() {
  const [x0, setX0] = useState(0.55)
  const [signed, setSigned] = useState(false)
  const player = usePlayer(setX0, { min: 0, max: 3, seconds: 9 })

  const k = regionOf(x0)
  const fTop = fOnTop(k)
  const ht = f(x0) - g(x0)
  const near = CROSS.slice(1).find(c => Math.abs(x0 - c) < 0.025)
  const end = x0 > 2.985
  const running = h(x0) - h(0)
  const area = areaTo(x0)
  const gTopColor = signed ? C.bad : C.g
  const stripColor = near !== undefined ? C.good : fTop ? C.f : gTopColor
  const s0 = Math.max(0, x0 - W / 2)
  const s1 = Math.min(3, x0 + W / 2)

  let notice
  if (end) {
    notice = signed ? (
      <Notice tone="warn">
        Counting every strip as <M>f - g</M>, the whole sweep gives <M>{'\\int_0^3 (f-g)\\,dx = -\\tfrac4\\pi \\approx -1.27'}</M>: the two
        orange regions were subtracted, and the big last one outweighs everything else. The true total area is{' '}
        <M>{'\\tfrac6\\pi \\approx 1.91'}</M>. Turn the toggle off to compare.
      </Notice>
    ) : (
      <Notice tone="good">
        Every strip counted as a positive height gives the total area <M>{'\\tfrac6\\pi \\approx 1.91'}</M>. In the answer this is done by
        writing each region as <M>{'\\int (f-g)\\,dx'}</M> and putting a <b>minus sign</b> in front of the ones where <M>g</M> is on top.
        Turn on the toggle to see what happens without those minus signs.
      </Notice>
    )
  } else if (near !== undefined) {
    notice = (
      <Notice tone="good">
        <b>The strip has zero height here</b>: the curves cross, and the top curve is about to swap. Every place like this is a
        limit of integration in the answer: <M>{'\\tfrac13,\\ 1,\\ \\tfrac53'}</M> (and <M>3</M>, where the shading ends).
      </Notice>
    )
  } else if (fTop) {
    notice = (
      <Notice>
        Here <b><M>f</M> is on top</b>, so the strip&apos;s height <M>f(x) - g(x)</M> is <b>positive</b> and{' '}
        <M>{'\\int (f-g)\\,dx'}</M> over this region is the area itself, no sign change needed.
        {k === 2 && (
          <>
            {' '}It doesn&apos;t matter that this region is below the <M>x</M>-axis. It is the half-turn of the one on{' '}
            <M>{'\\left(\\tfrac13,1\\right)'}</M> about <M>(1,0)</M>, so it has the same area <M>{'\\tfrac{1}{2\\pi}'}</M>. Keep
            sweeping into the last region.
          </>
        )}
        {k === 0 && <> Sweep right into the first orange region.</>}
      </Notice>
    )
  } else if (!signed) {
    notice = (
      <Notice>
        Here <b><M>g</M> is on top</b>, so the height <M>f(x) - g(x)</M> is <b>negative</b> and{' '}
        <M>{k === 1 ? '\\int_{1/3}^{1}(f-g)\\,dx = -\\tfrac{1}{2\\pi}' : '\\int_{5/3}^{3}(f-g)\\,dx = -\\tfrac{9}{2\\pi}'}</M>. The area is
        minus that integral. That is all the minus signs in option C mean. It doesn&apos;t matter that the region
        {k === 1 ? ' sits above' : ' straddles'} the <M>x</M>-axis: only which curve is on top counts.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        With every strip counted as <M>f - g</M>, the strips in this region have <b>negative</b> height, so they are{' '}
        <b>subtracted</b>: the running total goes <em>down</em> while the shaded area goes up. That is what a{' '}
        <M>+\int (f-g)\,dx</M> term does to a region where <M>g</M> is on top.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.1, 3.25]} y={[-1.2, 1.25]} xStep={1} yStep={0.5} height={320}>
        {[0, 1, 2, 3].map(r => (
          <Region
            key={r}
            top={top}
            bottom={bottom}
            from={CROSS[r]}
            to={Math.min(x0, CROSS[r + 1])}
            color={fOnTop(r) ? C.f : gTopColor}
            opacity={0.22}
          />
        ))}
        <Line.Segment point1={[1 / 3, 0]} point2={[1 / 3, f(1 / 3)]} color={C.guide} style="dashed" />
        <Line.Segment point1={[5 / 3, 0]} point2={[5 / 3, f(5 / 3)]} color={C.guide} style="dashed" />
        <Label at={[1 / 3, 0]} attach="s" color={C.guide} size={12}>1/3</Label>
        <Label at={[5 / 3, 0]} attach="n" color={C.guide} size={12}>5/3</Label>
        <Plot.OfX y={f} domain={[-0.1, 3.25]} color={C.f} weight={3} />
        <Plot.OfX y={g} domain={[-0.1, 3.25]} color={C.g} weight={3} />
        <Polygon
          points={[[s0, bottom(x0)], [s1, bottom(x0)], [s1, top(x0)], [s0, top(x0)]]}
          color={stripColor}
          fillOpacity={0.85}
          weight={1}
        />
        <Label at={[2, f(2)]} color={C.f} attach="s">f</Label>
        <Label at={[2.5, 1]} color={C.g} attach="n">g</Label>
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={0}
          max={3}
          step={0.005}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep from 0 to 3" />
          <Toggle label="Count every strip as f − g" checked={signed} onChange={setSigned} />
        </Buttons>
        <Readouts>
          <Readout color={stripColor} tex={`f(x) - g(x) = ${ht.toFixed(3)}${near !== undefined ? '' : fTop ? '\\ (+)' : '\\ (-)'}`} />
          {signed ? (
            <Readout color={C.bad} tex={`\\int_0^{${x0.toFixed(2)}}(f - g)\\,dx \\approx ${running.toFixed(3)}`} />
          ) : (
            <Readout tex={`\\text{area so far} \\approx ${area.toFixed(3)}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
