// 2018 Methods Exam 1 Q9a.i — the humps of y = x sin(x) between consecutive multiples of π have
// areas π, 3π, 5π, … = (2n+1)π, so a single substituted n only ever gives one hump. A toggle lays
// the plain sine hump (n + ½)π·sin(x) over the chosen hump: it has area 2 × (n + ½)π exactly, and
// the gap on the left of the midpoint balances the extra on the right — which is WHY the answer
// is (2n+1)π.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle, integrate } from './kit'

const PI = Math.PI
const y = (x: number) => x * Math.sin(x)
const piTick = (v: number) => {
  const k = Math.round(v / PI)
  if (Math.abs(v - k * PI) > 1e-6) return ''
  return k === 1 ? 'π' : k === -1 ? '−π' : `${k}π`
}
const piTex = (k: number) => (k === 0 ? '0' : k === 1 ? '\\pi' : k === -1 ? '-\\pi' : `${k}\\pi`)

export default function Hump() {
  const [n, setN] = useState(2)
  const [compare, setCompare] = useState(false)

  const a = n * PI
  const b = (n + 1) * PI
  const mid = (n + 0.5) * PI
  const s = n % 2 === 0 ? 1 : -1 // sign of the hump
  const sineHump = (x: number) => mid * Math.sin(x)
  const signed = integrate(y, a, b)
  const leftGap = Math.abs(integrate(x => sineHump(x) - y(x), a, mid))
  const rightExtra = Math.abs(integrate(x => y(x) - sineHump(x), mid, b))
  const humpColor = s > 0 ? C.f : C.g
  const labelY = s * (mid * 0.45)
  // Comparing zooms in on the chosen hump, so the small gaps between the curves are visible.
  let maxAbs = 0
  for (let i = 0; i <= 60; i++) maxAbs = Math.max(maxAbs, Math.abs(y(a + ((b - a) * i) / 60)))
  const xr: [number, number] = compare ? [a, b] : [0, 5 * PI]
  const yr: [number, number] = !compare ? [-15, 15] : s > 0 ? [-0.08 * maxAbs, 1.1 * maxAbs] : [-1.1 * maxAbs, 0.08 * maxAbs]
  const yStep = !compare ? 5 : maxAbs < 3 ? 0.5 : maxAbs < 9 ? 2 : 5
  const zoomTick = (v: number) => (Math.abs(v - mid) < 1e-6 ? `${n === 0 ? '' : 2 * n + 1}π/2` : piTick(v))

  let notice
  if (compare) {
    notice = (
      <Notice tone="good">
        The view has zoomed in on the hump. The dashed curve is a plain sine hump stretched to height <M>{`(n+\\tfrac12)\\pi`}</M>, the value of{' '}
        <M>x</M> at the middle of the interval. A sine hump has area <M>2</M>, so this one has area{' '}
        <M>{`2(n+\\tfrac12)\\pi = (2n+1)\\pi`}</M>. The real curve falls short on the left (red) and overshoots on the
        right (green) by exactly the same amount, so the two areas are equal. Move <M>n</M>: the balance holds every time.
      </Notice>
    )
  } else if (s > 0) {
    notice = (
      <Notice>
        With <M>n = {n}</M> the hump over <M>{`[${piTex(n)}, ${piTex(n + 1)}]`}</M> has area{' '}
        <M>{piTex(2 * n + 1)}</M>, above the axis. Step through <M>n = 0, 2, 4</M>: the areas go{' '}
        <M>{'\\pi, 5\\pi, 9\\pi'}</M>. Substituting one value of <M>n</M> only ever gives one of these numbers; the
        question wants the rule <M>{'(2n+1)\\pi'}</M> that produces all of them. Turn on the comparison to see why the
        rule is <M>{'(2n+1)\\pi'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Odd <M>n</M> is part a.ii. The hump over <M>{`[${piTex(n)}, ${piTex(n + 1)}]`}</M> is the same size,{' '}
        <M>{`${2 * n + 1}\\pi`}</M>, but it hangs <b>below</b> the axis, because <M>{'\\sin(x) < 0'}</M> there. The
        definite integral counts it as negative: <M>{`-${2 * n + 1}\\pi`}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={xr} y={yr} xStep={compare ? PI / 4 : PI} yStep={yStep} height={320} xLabels={compare ? zoomTick : piTick}>
        <Region
          top={x => Math.max(y(x), 0)}
          bottom={x => Math.min(y(x), 0)}
          from={a}
          to={b}
          color={humpColor}
          opacity={compare ? 0.12 : 0.3}
        />
        {compare && (
          <>
            <Region
              top={x => Math.max(sineHump(x), y(x))}
              bottom={x => Math.min(sineHump(x), y(x))}
              from={a}
              to={mid}
              color={C.bad}
              opacity={0.45}
            />
            <Region
              top={x => Math.max(sineHump(x), y(x))}
              bottom={x => Math.min(sineHump(x), y(x))}
              from={mid}
              to={b}
              color={C.good}
              opacity={0.45}
            />
            <Plot.OfX y={sineHump} domain={[a, b]} color={C.violet} weight={2.5} style="dashed" />
            <Line.Segment point1={[mid, 0]} point2={[mid, s * mid]} color={C.guide} style="dashed" weight={1.5} />
          </>
        )}
        <Plot.OfX y={y} domain={[0, 5 * PI]} color={C.f} weight={3} />
        {!compare && (
          <Label at={[mid, labelY]} color={humpColor} attach="c" size={14}>
            {`${s < 0 ? '−' : ''}${n === 0 ? '' : 2 * n + 1}π`}
          </Label>
        )}
        {!compare && (
          <Label at={[4.3 * PI, y(4.3 * PI)]} color={C.f} attach="w">
            y = x sin x
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={setN} min={0} max={4} step={1} format={v => String(v)} />
        <Toggle label="Compare with a sine hump of height (n + ½)π" checked={compare} onChange={setCompare} />
        <Readouts>
          <Readout
            color={humpColor}
            tex={`\\int_{${piTex(n)}}^{${piTex(n + 1)}} x\\sin(x)\\,dx = ${piTex(s * (2 * n + 1))} \\approx ${signed.toFixed(2)}`}
          />
          {compare && <Readout color={C.violet} tex={`\\text{sine hump area} = 2\\left(${n}+\\tfrac12\\right)\\pi = ${piTex(2 * n + 1)}`} />}
          {compare && (
            <Readout tex={`\\color{${C.bad}}{\\text{short} \\approx ${leftGap.toFixed(2)}} \\quad \\color{${C.good}}{\\text{over} \\approx ${rightExtra.toFixed(2)}}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
