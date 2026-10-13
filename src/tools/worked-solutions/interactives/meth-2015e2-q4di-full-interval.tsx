// 2015 Methods Exam 2 Q4d.i — why ∫_0^{2π} (k − q) dx is NOT the area (the report's first comment).
// On (0, π) k is above q, on (π, 2π) q is above k, and the two regions are congruent (half-turn
// about (π, 0)), so the signed integral over [0, 2π] is exactly 0 for every m and n. The toggle
// colours the two halves + and − to show the cancellation; with it off, the area is 2∫_0^π (k − q).
// Starts at m = 2, n = 2 (part a.'s logo, area 8). Numbers checked with sympy:
// ∫_0^π (k − q) dx = 2m − (1 − cos nπ)/n², ∫_0^{2π} (k − q) dx = 0.

import { useState } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle } from './kit'

const PI = Math.PI

function piTicks(v: number): string {
  const k = Math.round(v / (PI / 2))
  if (Math.abs(v - (k * PI) / 2) > 1e-6) return ''
  return ['', 'π/2', 'π', '3π/2', '2π'][k] ?? ''
}

export default function FullInterval() {
  const [m, setM] = useState(2)
  const [n, setN] = useState(2)
  const [signed, setSigned] = useState(false)

  const k = (x: number) => m * Math.sin(x)
  const q = (x: number) => Math.sin(n * x) / n
  const even = n % 2 === 0
  const half = 2 * m - (even ? 0 : 2 / (n * n)) // ∫_0^π (k − q) dx
  const halfTex = even ? `${2 * m}` : `${2 * m}-\\tfrac{2}{${n * n}}`
  const areaTex = even ? `4(${m}) = ${4 * m}` : `4(${m})-\\tfrac{4}{${n * n}}\\approx ${(2 * half).toFixed(2)}`

  return (
    <div>
      <Plane
        x={[0, 2 * PI]}
        y={[-4.4, 4.4]}
        xStep={PI / 2}
        yStep={1}
        xLabels={piTicks}
        height={300}
        label="Graphs of k and q with the regions between them shaded"
      >
        {signed ? (
          <>
            <Region top={k} bottom={q} from={0} to={PI} color={C.good} opacity={0.35} />
            <Region top={k} bottom={q} from={PI} to={2 * PI} color={C.bad} opacity={0.35} />
            <Label at={[PI / 2, m / 2]} color={C.good} attach="c">+</Label>
            <Label at={[(3 * PI) / 2, -m / 2]} color={C.bad} attach="c">−</Label>
          </>
        ) : (
          <Region top={k} bottom={q} from={0} to={2 * PI} color={C.violet} opacity={0.3} />
        )}
        <Plot.OfX y={k} domain={[0, 2 * PI]} color={C.f} weight={2.5} />
        <Plot.OfX y={q} domain={[0, 2 * PI]} color={C.g} weight={2.5} />
        <Label at={[PI / 2, m]} color={C.f} attach="n">k</Label>
        <Label at={[5.6, 0.25]} color={C.g} attach="n">q</Label>
      </Plane>
      <Controls>
        <Slider label="m" value={m} onChange={setM} min={2} max={4} step={1} format={v => v.toFixed(0)} />
        <Slider label="n" value={n} onChange={setN} min={1} max={8} step={1} format={v => v.toFixed(0)} />
        <Buttons>
          <Toggle label={<>Integrate <M>k-q</M> over <M>[0,2\pi]</M> (the common error)</>} checked={signed} onChange={setSigned} />
        </Buttons>
        <Readouts>
          {signed ? (
            <>
              <Readout color={C.good} tex={`\\int_0^{\\pi}(k-q)\\,dx = ${halfTex}`} />
              <Readout color={C.bad} tex={`\\int_{\\pi}^{2\\pi}(k-q)\\,dx = -(${halfTex})`} />
              <Readout tex={`\\int_0^{2\\pi}(k-q)\\,dx = 0`} />
            </>
          ) : (
            <>
              <Readout tex={`\\int_0^{\\pi}(k-q)\\,dx = ${halfTex}`} />
              <Readout color={C.violet} tex={`\\text{Area} = 2\\int_0^{\\pi}(k-q)\\,dx = ${areaTex}`} />
            </>
          )}
        </Readouts>
        {signed ? (
          <Notice tone="warn">
            On <M>(\pi,2\pi)</M> the curves swap: <M>q</M> is above <M>k</M>, so <M>k-q</M> is negative there and that
            half counts as <b>minus</b> its area. The two halves are the same size, so the integral over{' '}
            <M>[0,2\pi]</M> is <M>0</M> for every <M>m</M> and <M>n</M>. Try a few values: an answer of 0 for an area is
            the red flag.
          </Notice>
        ) : (
          <Notice>
            {m === 2 && n === 2 ? (
              <>
                With <M>m=n=2</M> this is part a.'s logo: area <M>8</M>.{' '}
              </>
            ) : null}
            The enclosed area is the two congruent halves added: <M>2\int_0^\pi(k-q)\,dx</M>. Turn on the toggle to see
            what integrating straight across <M>[0,2\pi]</M> does instead.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
