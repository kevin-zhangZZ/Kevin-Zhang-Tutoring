// 2019 Methods Exam 2 Q3e — choosing a, b, c (d = 0) so that ∫₂⁰ g dt + ∫₂⁶ g dt equals part d.'s
// area 15/π, where g is f under (t, y) ↦ (at + c, by + d). Toggles set a = ±1 and b = ±1, a slider
// sets c. Shading shows each piece's contribution to the expression: on [0, 2] the reversed terminals
// mean a region BELOW the axis counts positively (green), one above counts negatively (red); on
// [2, 6] it is the usual way round. The target is a dip on [0, 2] and a hump on [2, 6]: f's own
// pieces in reverse order. g is drawn only on its domain, the image of f's domain t ≥ 0, which is
// why c = 6 + 12n needs n ≥ 0 (and c = −6 + 12n needs n ≤ 0) in the report's answer families.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle, integrate } from './kit'

const f = (t: number) => Math.sin((Math.PI * t) / 3) + Math.sin((Math.PI * t) / 6)
const TARGET = 15 / Math.PI
const X0 = -3
const X1 = 9.5

function ruleTex(a: number, b: number, c: number) {
  let inner: string
  if (a === 1) inner = c === 0 ? 't' : c > 0 ? `t - ${c}` : `t + ${-c}`
  else inner = c === 0 ? '-t' : c > 0 ? `${c} - t` : `-t - ${-c}`
  return `g(t) = ${b === -1 ? '-' : ''}f(${inner})`
}

export default function TransformWidget() {
  const [a, setA] = useState(1)
  const [b, setB] = useState(1)
  const [c, setC] = useState(0)

  const g = (t: number) => b * f((t - c) / a)
  // The image of f's domain [0, ∞): t ≥ c when a = 1, t ≤ c when a = −1.
  const lo = a === 1 ? c : -Infinity
  const hi = a === 1 ? Infinity : c
  const covers = lo <= 0 && hi >= 6
  const dom: [number, number] = [Math.max(X0, lo), Math.min(X1, hi)]
  const visible = dom[0] < dom[1]

  const first = covers ? -integrate(g, 0, 2, 300) : NaN
  const second = covers ? integrate(g, 2, 6, 300) : NaN
  const total = first + second
  const hit = covers && Math.abs(total - TARGET) < 0.005
  const isIdentity = a === 1 && b === 1 && c === 0

  const pos = (t: number) => Math.max(g(t), 0)
  const neg = (t: number) => Math.min(g(t), 0)
  const zero = () => 0

  let notice
  if (!covers) {
    notice = (
      <Notice tone="warn">
        <b><M>g</M> isn&apos;t defined on all of <M>[0, 6]</M>.</b> <M>f</M> only exists for <M>t \ge 0</M>, and{' '}
        <M>T</M> moves that domain to{' '}
        {a === 1 ? <M>{`t \\ge ${c}`}</M> : <M>{`t \\le ${c}`}</M>}, so the integrals over <M>[0, 6]</M> don&apos;t
        exist. Shifting by a whole period can repeat the right shape elsewhere, but it must land on{' '}
        <M>[0, 6]</M>. That&apos;s why the report&apos;s families only run one way:{' '}
        <M>c = 6 + 12n</M> with <M>n \ge 0</M> when <M>a = -1</M>, and <M>c = -6 + 12n</M> with <M>n \le 0</M> when{' '}
        <M>a = 1</M>.
      </Notice>
    )
  } else if (hit) {
    notice = (
      <Notice tone="good">
        <b>Both pieces are green.</b> The dip sits on <M>[0, 2]</M>, where the backwards terminals make it count
        positively, and the hump sits on <M>[2, 6]</M>: <M>{'\\tfrac{3}{2\\pi}+\\tfrac{27}{2\\pi}=\\tfrac{15}{\\pi}'}</M>.
        {a === -1 ? (
          <>
            {' '}Reflecting in the <M>y</M>-axis reversed the order of the pieces, and <M>c = 6</M> slid them back
            onto <M>[0, 6]</M>.
          </>
        ) : (
          <>
            {' '}Here <M>c = -6</M> slides <M>f</M>&apos;s next half-period (a small bump, then a deep trough) onto{' '}
            <M>[0, 6]</M>, and reflecting in the <M>t</M>-axis turns it into a dip, then a hump.
          </>
        )}
      </Notice>
    )
  } else if (isIdentity) {
    notice = (
      <Notice>
        This is <M>g = f</M>. On <M>[0, 2]</M> the curve is <em>above</em> the axis, and because the first integral
        runs from <M>2</M> down to <M>0</M> it counts <b>negatively</b> (red). We need the pieces the other way round:
        a dip on <M>[0, 2]</M>, a hump on <M>[2, 6]</M>. Try <M>a = -1</M>.
      </Notice>
    )
  } else if (a === -1 && b === 1) {
    notice = (
      <Notice>
        <M>a = -1</M> reflects the graph in the <M>y</M>-axis, which reverses the order of the hump and the dip. Now
        slide <M>c</M> until they land on <M>[0, 6]</M> the right way round.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Green counts towards the total, red against it. The expression equals <M>{'\\tfrac{15}{\\pi}'}</M> when all of{' '}
        <M>[0, 2]</M> is a green dip and all of <M>[2, 6]</M> is a green hump.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[-2.2, 2.2]} xStep={1} yStep={1} height={300} xLabel="t" xLabels={v => (v % 2 === 0 && v >= X0 && v <= X1 ? String(v) : '')}>
        <Plot.OfX y={f} domain={[0, X1]} color={C.guide} weight={1.5} style="dashed" />
        {covers && (
          <>
            <Region top={zero} bottom={neg} from={0} to={2} color={C.good} opacity={0.35} />
            <Region top={pos} bottom={zero} from={0} to={2} color={C.bad} opacity={0.35} />
            <Region top={pos} bottom={zero} from={2} to={6} color={C.good} opacity={0.35} />
            <Region top={zero} bottom={neg} from={2} to={6} color={C.bad} opacity={0.35} />
          </>
        )}
        {[0, 2, 6].map(v => (
          <Line.Segment key={v} point1={[v, -2.2]} point2={[v, 2.2]} color={C.guide} weight={1} style="dashed" />
        ))}
        {visible && <Plot.OfX y={g} domain={dom} color={C.f} weight={3} />}
        <Label at={[X1, -1.95]} color={C.guide} attach="w">f (dashed)</Label>
        <Label at={[1.1, 2.15]} color={C.ink} attach="s">∫₂⁰ g dt</Label>
        <Label at={[4, 2.15]} color={C.ink} attach="s">∫₂⁶ g dt</Label>
      </Plane>
      <Controls>
        <Buttons>
          <Toggle label="a = −1 (reflect in y-axis)" checked={a === -1} onChange={v => setA(v ? -1 : 1)} />
          <Toggle label="b = −1 (reflect in t-axis)" checked={b === -1} onChange={v => setB(v ? -1 : 1)} />
        </Buttons>
        <Slider label="c" value={c} onChange={setC} min={-12} max={12} step={1} format={v => v.toFixed(0)} />
        <Buttons>
          <ActionButton label="g = f" onClick={() => { setA(1); setB(1); setC(0) }} />
          <ActionButton label="a = −1, c = 6" onClick={() => { setA(-1); setB(1); setC(6) }} />
          <ActionButton label="b = −1, c = −6" onClick={() => { setA(1); setB(-1); setC(-6) }} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`${ruleTex(a, b, c)},\\ d = 0`} />
          {covers ? (
            <>
              <Readout color={first >= 0 ? C.good : C.bad} tex={`\\int_2^0 g\\,dt \\approx ${first.toFixed(3)}`} />
              <Readout color={second >= 0 ? C.good : C.bad} tex={`\\int_2^6 g\\,dt \\approx ${second.toFixed(3)}`} />
              <Readout
                color={hit ? C.good : C.bad}
                tex={`\\text{sum} \\approx ${total.toFixed(3)}${hit ? '=\\tfrac{15}{\\pi}\\ \\checkmark' : '\\ne\\tfrac{15}{\\pi}\\approx4.775'}`}
              />
            </>
          ) : (
            <Readout color={C.bad} tex={`\\text{domain of } g\\text{: } ${a === 1 ? `t \\ge ${c}` : `t \\le ${c}`}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
