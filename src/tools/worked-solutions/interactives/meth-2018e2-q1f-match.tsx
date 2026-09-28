// 2018 Methods Exam 2 Q1f — "f(x) = p(x) for all x" versus "f(x) = p(x) at some x". Slide a and
// compare f(x) = 3x⁴ + 4x³ − 12x² with p(x) = 3x⁴ + 4x³ + 6(a − 2)x² − 12ax + a². For a ≠ 0 the
// graphs meet only where 6x² − 12x + a = 0, i.e. at x = 1 ± √(1 − a/6); that is all the CAS
// answer a = −6x(x − 2) describes. Only a = 0 makes the difference 6ax² − 12ax + a² the zero
// polynomial, so the two graphs coincide everywhere.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const f = (x: number) => 3 * x ** 4 + 4 * x ** 3 - 12 * x ** 2
const p = (x: number, a: number) => 3 * x ** 4 + 4 * x ** 3 + 6 * (a - 2) * x ** 2 - 12 * a * x + a * a

/** A coefficient with trailing zeros dropped: 9, −18, 2.25. */
const t = (v: number) => String(parseFloat(v.toFixed(2)))
const sgn = (v: number) => (v < 0 ? `- ${t(Math.abs(v))}` : `+ ${t(v)}`)

export default function Match() {
  const [a, setA] = useState(1.5)
  const [diff, setDiff] = useState(false)
  const zero = Math.abs(a) < 0.05
  // p − f = a(6x² − 12x + a): the graphs meet where 6x² − 12x + a = 0.
  const meet = zero ? [] : [1 - Math.sqrt(1 - a / 6), 1 + Math.sqrt(1 - a / 6)]
  const diffTex = zero
    ? 'p(x) - f(x) = 0'
    : `p(x) - f(x) = ${t(6 * a)}x^2 ${sgn(-12 * a)}x ${sgn(a * a)}`

  return (
    <div>
      <Plane x={[-2.8, 2.6]} y={[-40, 60]} xStep={1} yStep={20} height={320}>
        <Plot.OfX y={f} domain={[-3, 2.8]} color={C.f} weight={zero ? 6 : 3} />
        <Plot.OfX y={x => p(x, a)} domain={[-3, 2.8]} color={C.g} weight={2.5} style={zero ? 'dashed' : 'solid'} />
        {diff && <Plot.OfX y={x => p(x, a) - f(x)} domain={[-3, 2.8]} color={C.violet} weight={2.5} />}
        {meet.map(x => (
          <Point key={x.toFixed(4)} x={x} y={f(x)} color={C.ink} />
        ))}
        {meet.map((x, i) => (
          <Label key={`l${i}`} at={[x, f(x)]} attach={i === 0 ? 'nw' : 'se'} size={12}>
            {`x ≈ ${x.toFixed(2).replace('-', '−')}`}
          </Label>
        ))}
        <Label at={[-2.45, f(-2.45)]} attach="w" color={C.f}>f</Label>
        {!zero && <Label at={[-2.3, Math.min(56, p(-2.3, a))]} attach="e" color={C.g}>p</Label>}
        {diff && !zero && <Label at={[-1.3, Math.min(56, p(-1.3, a) - f(-1.3))]} attach="e" color={C.violet}>p − f</Label>}
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={-2} max={3} step={0.1} format={v => v.toFixed(1)} />
        <Buttons>
          <ActionButton label="a = 0" onClick={() => setA(0)} />
          <Toggle label="Show p(x) − f(x)" checked={diff} onChange={setDiff} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={diffTex} />
        </Readouts>
        {zero ? (
          <Notice tone="good">
            <b>At <M>a = 0</M> the two graphs are the same curve</b>: <M>p</M> (dashed) lies exactly on <M>f</M>.
            The difference <M>{'6ax^2 - 12ax + a^2'}</M> is <M>0</M> for every <M>x</M>, because each coefficient,{' '}
            <M>6a</M>, <M>-12a</M> and <M>a^2</M>, is zero. That is what &ldquo;for all <M>x</M>&rdquo; demands.
          </Notice>
        ) : (
          <Notice>
            With <M>{`a = ${a.toFixed(1)}`}</M> the graphs meet at only <b>two points</b>, where{' '}
            <M>{'6x^2 - 12x + a = 0'}</M>. Rearranged, that is <M>{'a = -6x(x-2)'}</M>, the CAS output: for a chosen{' '}
            <M>x</M>, the <M>a</M> that makes the graphs meet <em>there</em>. &ldquo;For all <M>x</M>&rdquo; needs one{' '}
            <M>a</M> that works everywhere at once. Turn on <M>{'p(x) - f(x)'}</M>: it must lie flat along the axis.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
