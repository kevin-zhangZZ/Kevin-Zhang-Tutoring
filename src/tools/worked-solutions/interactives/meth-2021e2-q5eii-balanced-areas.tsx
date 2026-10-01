// 2021 Methods Exam 2 Q5e.ii — why the area above the x-axis equals the area below for
// g_a(x) = sin(x/a) + cos(ax) on [0, 2aπ]. On that interval sin(x/a) runs exactly one cycle and
// cos(ax) runs a² cycles, so ∫ g_a dx = sin(2a²π)/a, which is 0 whenever 2a² is a whole number —
// always, for a positive integer a. Step a from 1 to 5 and the two shaded areas match (2.828,
// 5.096, 7.639, 10.186, 12.732; checked with numpy). A toggle lets a be any positive number:
// then cos(ax) is cut off part-way through a cycle and the areas no longer balance (a = 1.3:
// above 2.539, below 3.254, ∫ ≈ −0.715).

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle, integrate, num } from './kit'

const Y = 2.2

/** Tick numbers as multiples of π. */
function piTick(v: number): string {
  const k = v / Math.PI
  const r = Math.round(k)
  if (Math.abs(k - r) < 1e-6) return r === 1 ? 'π' : `${r}π`
  const h = Math.round(2 * k)
  if (Math.abs(2 * k - h) < 1e-6) return h === 1 ? 'π/2' : `${h}π/2`
  return ''
}

export default function BalancedAreas() {
  const [a, setA] = useState(2)
  const [anyA, setAnyA] = useState(false)

  const g = (x: number) => Math.sin(x / a) + Math.cos(a * x)
  const L = 2 * a * Math.PI
  const n = Math.min(60000, 2000 * Math.ceil(a * a) + 2000)
  const above = integrate(x => Math.max(g(x), 0), 0, L, n)
  const below = integrate(x => Math.max(-g(x), 0), 0, L, n)
  const twoA2 = 2 * a * a
  const I = Math.sin(twoA2 * Math.PI) / a
  const whole = Math.abs(twoA2 - Math.round(twoA2)) < 1e-6
  const nearly = !whole && Math.abs(I) < 0.02
  const balanced = whole || nearly
  const isInt = Math.abs(a - Math.round(a)) < 1e-6
  const aTex = isInt ? String(Math.round(a)) : a.toFixed(2)
  const cycles = isInt ? String(Math.round(a * a)) : (a * a).toFixed(2)
  const xStep = a <= 1 ? Math.PI / 2 : a <= 2.5 ? Math.PI : 2 * Math.PI
  const samples = Math.min(4000, Math.ceil(120 * a * a) + 200)

  const intTex = whole
    ? `\\int_0^{2a\\pi} g_a(x)\\,dx = \\frac{\\sin(${Math.round(twoA2)}\\pi)}{${aTex}} = 0`
    : `\\int_0^{2a\\pi} g_a(x)\\,dx = \\frac{\\sin(${twoA2.toFixed(2)}\\pi)}{${aTex}} \\approx ${num(I, 3)}`

  let notice
  if (isInt) {
    notice = (
      <Notice tone="good">
        With <M>{`a = ${aTex}`}</M>, the interval <M>{`[0, 2a\\pi] = [0, ${piTick(L)}]`}</M> holds exactly one cycle of{' '}
        <M>{'\\sin\\left(\\tfrac xa\\right)'}</M> and <M>{`a^2 = ${cycles}`}</M> whole cycles of <M>{'\\cos(ax)'}</M>. A
        whole cycle integrates to zero, which is what <M>{`\\sin(2a^2\\pi) = \\sin(${Math.round(twoA2)}\\pi) = 0`}</M> is
        saying, so the blue area above the axis equals the orange area below.{' '}
        {anyA ? (
          <>Slide <M>a</M> off the whole number and watch the two areas split apart.</>
        ) : (
          <>Try every <M>a</M> from 1 to 5, then turn on &ldquo;Let a be any positive number&rdquo;.</>
        )}
      </Notice>
    )
  } else if (balanced) {
    notice = (
      <Notice tone="good">
        Here <M>{`2a^2 = ${twoA2.toFixed(2)}`}</M> is {whole ? '' : 'almost '}a whole number, so{' '}
        <M>{'\\sin(2a^2\\pi)'}</M> is {whole ? '' : 'almost '}zero and the areas balance {whole ? 'again' : 'nearly'}:{' '}
        <M>{'\\cos(ax)'}</M> stops at a whole or half cycle, where its own areas cancel. A positive integer <M>a</M> is
        what guarantees this every time, because it always makes <M>2a^2</M> a whole number.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Now <M>{`2a^2 = ${twoA2.toFixed(2)}`}</M> is not a whole number, so <M>{'\\sin(2a^2\\pi) \\neq 0'}</M>: the{' '}
        <M>{`${cycles}`}</M> cycles of <M>{'\\cos(ax)'}</M> end part-way through a cycle, and that unfinished piece is
        left over (above <M>{num(above, 3)}</M>, below <M>{num(below, 3)}</M>). This is the step the report says students
        could not interpret: <M>{'\\frac{\\sin(2a^2\\pi)}{a} = 0'}</M> only because <M>a</M> is a positive integer, which
        makes <M>2a^2</M> a whole number.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, L]} y={[-Y, Y]} xStep={xStep} yStep={1} height={300} xLabels={piTick}>
        <Region top={x => Math.max(g(x), 0)} bottom={() => 0} from={0} to={L} color={C.f} opacity={0.3} samples={samples} />
        <Region top={() => 0} bottom={x => Math.min(g(x), 0)} from={0} to={L} color={C.g} opacity={0.3} samples={samples} />
        <Plot.OfX y={g} domain={[0, L]} color={C.f} weight={2.5} />
        <Line.Segment point1={[L, -Y]} point2={[L, Y]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[L, Y]} attach="nw" color={C.guide}>x = 2aπ</Label>
      </Plane>
      <Controls>
        <Slider
          label="a"
          value={a}
          onChange={setA}
          min={anyA ? 0.5 : 1}
          max={5}
          step={anyA ? 0.01 : 1}
          format={v => (anyA ? v.toFixed(2) : String(v))}
        />
        <Buttons>
          <Toggle
            label="Let a be any positive number"
            checked={anyA}
            onChange={v => {
              setAnyA(v)
              setA(v ? 1.3 : Math.max(1, Math.round(a)))
            }}
          />
        </Buttons>
        <Readouts>
          <Readout tex={`\\sin\\left(\\tfrac xa\\right): 1 \\text{ cycle}, \\quad \\cos(ax): a^2 = ${cycles} \\text{ cycles}`} />
          <Readout color={C.f} tex={`\\text{area above} \\approx ${num(above, 3)}`} />
          <Readout color={C.g} tex={`\\text{area below} \\approx ${num(below, 3)}`} />
          <Readout color={balanced ? C.good : C.bad} tex={intTex} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
