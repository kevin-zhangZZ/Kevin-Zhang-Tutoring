// 2015 Methods Exam 2 Q4d.ii — what cos(nπ) = ±1 means on the graph. On (0, π), q(x) = (1/n)sin(nx)
// is n half-wave "lobes", alternately above and below the axis, each of area 2/n². For even n they
// pair off and cancel (∫_0^π q dx = 0); for odd n one half-wave above is left over (∫_0^π q dx = 2/n²),
// and that lobe eats into the region under k, on each half, so the area is 4m − 4/n².
// Starts at n = 3 (part b.'s h). Numbers checked with sympy: ∫_{jπ/n}^{(j+1)π/n} (1/n)sin(nx) dx =
// ±2/n², ∫_0^π (1/n)sin(nx) dx = (1 − cos nπ)/n².

import { useState } from 'react'
import { C, Controls, Label, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider } from './kit'

const PI = Math.PI
const zero = () => 0

function piTicks(v: number): string {
  const k = Math.round(v / (PI / 4))
  if (Math.abs(v - (k * PI) / 4) > 1e-6) return ''
  return ['', 'π/4', 'π/2', '3π/4', 'π'][k] ?? ''
}

export default function Lobes() {
  const [n, setN] = useState(3)
  const q = (x: number) => Math.sin(n * x) / n
  const up = Math.ceil(n / 2)
  const down = Math.floor(n / 2)
  const odd = n % 2 === 1
  const lobes = Array.from({ length: n }, (_, j) => j)

  return (
    <div>
      <Plane
        x={[0, PI]}
        y={[-1.1, 1.1]}
        xStep={PI / 4}
        yStep={0.5}
        xLabels={piTicks}
        height={260}
        label="Graph of q(x) = (1/n) sin(nx) on [0, π] with each half-wave shaded"
      >
        {lobes.map(j => (
          <Region
            key={j}
            top={q}
            bottom={zero}
            from={(j * PI) / n}
            to={((j + 1) * PI) / n}
            color={j % 2 === 0 ? C.good : C.bad}
            opacity={0.35}
          />
        ))}
        <Plot.OfX y={q} domain={[0, PI]} color={C.g} weight={2.5} />
        {n <= 5 &&
          lobes.map(j => (
            <Label key={j} at={[((j + 0.5) * PI) / n, j % 2 === 0 ? 1 / n : -1 / n]} color={j % 2 === 0 ? C.good : C.bad} attach={j % 2 === 0 ? 'n' : 's'}>
              {j % 2 === 0 ? '+' : '−'}
            </Label>
          ))}
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={setN} min={2} max={9} step={1} format={v => v.toFixed(0)} />
        <Readouts>
          <Readout tex={`\\text{each half-wave} = \\tfrac{2}{n^2} = \\tfrac{2}{${n * n}}`} />
          <Readout color={C.good} tex={`${up}\\text{ above}`} />
          <Readout color={C.bad} tex={`${down}\\text{ below}`} />
          <Readout tex={`\\int_0^{\\pi} q\\,dx = ${odd ? `\\tfrac{2}{${n * n}}` : '0'}`} />
        </Readouts>
        {odd ? (
          <Notice tone="good">
            <M>n = {n}</M> is odd: {n} half-waves, {up} above and {down} below, so <b>one half-wave above is left over</b> and{' '}
            <M>{`\\int_0^\\pi q\\,dx = \\tfrac{2}{${n * n}}`}</M>. That is <M>\cos(n\pi)=-1</M> in the formula{' '}
            <M>{'\\tfrac{1-\\cos(n\\pi)}{n^2}'}</M>. Each half of the enclosed area equals <M>{'\\int_0^\\pi k\\,dx-\\int_0^\\pi q\\,dx'}</M>,
            so that left-over half-wave is taken off twice: area <M>{'4m-\\tfrac{4}{n^2}'}</M>. Now try an even <M>n</M>.
          </Notice>
        ) : (
          <Notice>
            <M>n = {n}</M> is even: the half-waves pair off, {up} above and {down} below, and cancel, so{' '}
            <M>\int_0^\pi q\,dx = 0</M>. That is <M>\cos(n\pi)=1</M> in the formula. Nothing is subtracted from{' '}
            <M>\int_0^\pi k\,dx = 2m</M>, so the area is <M>4m</M>. Now try an odd <M>n</M>.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
