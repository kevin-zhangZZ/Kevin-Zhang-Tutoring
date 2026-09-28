// 2018 Specialist Exam 1 Q4 — the two conditions as two graphs in the (a, b) plane. Mean 10 is the
// line a + b = 5; variance 44 is the ellipse 2a^2 + 4b^2 = 44. Slide (a, b) along the line (so the
// mean stays 10) and watch the variance 6b^2 - 20b + 50 dip to 33 1/3 and come back up: it equals
// 44 twice, at (2, 3) and (14/3, 1/3), the two roots of 3b^2 - 10b + 3 = 0. Grey dots mark the
// integer points on the line; only (2, 3) is also on the ellipse. A toggle adds the report's
// "squared" equation 4a^2 + 4b^2 = 100 (a^2 + b^2 = 25): that circle lies wholly outside the
// ellipse, so paired with the variance equation it has no solution (b^2 = -3).

import { useState } from 'react'
import { Buttons, C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, clamp, tick } from './kit'

const B_MIN = -1
const B_MAX = 6
const snap = (b: number) => clamp(Math.round(b * 6) / 6, B_MIN, B_MAX)

function gcd(x: number, y: number): number {
  return y === 0 ? x : gcd(y, x % y)
}
/** A multiple of 1/6 as [numerator, denominator] in lowest terms. */
function sixths(v: number): [number, number] {
  const k = Math.round(v * 6)
  const g = gcd(Math.abs(k), 6) || 1
  return [k / g, 6 / g]
}
const texFrac = (v: number) => {
  const [n, d] = sixths(v)
  if (d === 1) return String(n)
  return `${n < 0 ? '-' : ''}\\tfrac{${Math.abs(n)}}{${d}}`
}
const txtFrac = (v: number) => {
  const [n, d] = sixths(v)
  return (d === 1 ? String(n) : `${n}/${d}`).replace('-', '−')
}

/** 2a^2 + 4b^2 on the line, in sixths: exact, since b is a multiple of 1/6. */
const variance = (a: number, b: number) => 2 * a * a + 4 * b * b

export default function Meet() {
  const [b, setB] = useState(1)
  const [circle, setCircle] = useState(false)
  const a = 5 - b
  const v = variance(a, b)
  const atAnswer = Math.abs(b - 3) < 1e-9
  const atFraction = Math.abs(b - 1 / 3) < 1e-9
  const onEllipse = atAnswer || atFraction
  const intPoint = Number.isInteger(Math.round(b * 6) / 6)
  const vTex = Number.isInteger(Math.round(v * 1e6) / 1e6) ? String(Math.round(v)) : v.toFixed(2)

  let notice
  if (circle) {
    notice = (
      <Notice tone="warn">
        The red circle is <M>{'4a^2 + 4b^2 = 100'}</M>, what the report says quite a few students got by
        &lsquo;squaring&rsquo; <M>{'2a + 2b = 10'}</M>. It lies completely outside the orange ellipse, so the two never
        meet: paired with the variance equation it gives <M>{'b^2 = -3'}</M>, no solution. Squaring properly gives{' '}
        <M>{'4a^2 + 8ab + 4b^2'}</M>, and the variance was never a consequence of the mean anyway: it is a separate fact.
      </Notice>
    )
  } else if (atAnswer) {
    notice = (
      <Notice tone="good">
        <b>
          <M>{'(a, b) = (2, 3)'}</M> is on both graphs
        </b>
        : mean <M>{'2(2) + 2(3) = 10'}</M> and variance <M>{'2(4) + 4(9) = 44'}</M>. It is also a grid point, so{' '}
        <M>a</M> and <M>b</M> are integers. This is the answer. Now slide to <M>{'b = \\tfrac13'}</M>.
      </Notice>
    )
  } else if (atFraction) {
    notice = (
      <Notice tone="warn">
        <M>{'(\\tfrac{14}{3}, \\tfrac13)'}</M> is <b>also on both graphs</b>:{' '}
        <M>{'2(\\tfrac{196}{9}) + 4(\\tfrac19) = 44'}</M>. It is a genuine solution of the two equations, which is why the
        quadratic had two roots. But it is not a grid point, so &ldquo;<M>a</M> and <M>b</M> are integers&rdquo; rejects
        it. Say so in writing: the report lists failing to reject it as a common problem.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Every point on the blue line has mean <M>{'2a + 2b = 10'}</M>. The variance changes as you slide: here it is{' '}
        <M>{vTex}</M>, {v < 44 ? 'less than 44 (inside the orange ellipse)' : 'more than 44 (outside the orange ellipse)'}.
        Along the line the variance dips to <M>{'33\\tfrac13'}</M> at <M>{'b = \\tfrac53'}</M> and climbs again, so it
        passes <M>44</M> twice. Find both places.
      </Notice>
    )
  }

  // Integer points on the line a + b = 5 within the slider's range.
  const lattice: [number, number][] = []
  for (let k = B_MIN; k <= B_MAX; k++) lattice.push([5 - k, k])

  return (
    <div>
      <Plane
        x={[-5.5, 6.5]}
        y={[-5, 6.5]}
        equalScale
        height={400}
        xLabel=""
        yLabel="b"
        xLabels={v => (v > 6.5 || v < -5.5 ? '' : tick(v))}
        yLabels={v => (v > 6.5 || v < -5.5 ? '' : tick(v))}
      >
        <Label at={[6.5, 0]} attach="n" size={14} italic>a</Label>
        <Plot.Parametric
          xy={t => [Math.sqrt(22) * Math.cos(t), Math.sqrt(11) * Math.sin(t)]}
          domain={[0, 2 * Math.PI]}
          color={C.g}
          weight={3}
        />
        <Line.ThroughPoints point1={[0, 5]} point2={[5, 0]} color={C.f} weight={3} />
        {circle && <Circle center={[0, 0]} radius={5} color={C.bad} fillOpacity={0} weight={2.5} strokeStyle="dashed" />}
        {lattice.map(([pa, pb]) => (
          <Point key={pb} x={pa} y={pb} color={C.guide} />
        ))}
        <Label at={[-1, 6]} attach="w" color={C.f} size={12}>a + b = 5</Label>
        <Label at={[Math.sqrt(22) / 2, -Math.sqrt(33) / 2]} attach="se" color={C.g} size={12}>2a² + 4b² = 44</Label>
        {circle && (
          <Label at={[2.5, 4.33]} attach="ne" color={C.bad} size={12}>a² + b² = 25</Label>
        )}
        <MovablePoint
          point={[a, b]}
          onMove={([, pb]) => setB(pb)}
          constrain={([pa, pb]) => {
            const nb = snap((pb - pa + 5) / 2)
            return [5 - nb, nb]
          }}
          color={atAnswer ? C.good : atFraction ? C.g : C.ink}
        />
      </Plane>
      <Controls>
        <Slider label="b" value={b} onChange={x => setB(snap(x))} min={B_MIN} max={B_MAX} step={1 / 6} format={txtFrac} />
        <Buttons>
          <Toggle label="Show the ‘squared’ mistake" checked={circle} onChange={setCircle} />
        </Buttons>
        <Readouts>
          <Readout tex={`(a, b) = \\left(${texFrac(a)},\\ ${texFrac(b)}\\right)`} />
          <Readout color={C.f} tex="E(aX + bY) = 2a + 2b = 10" />
          <Readout
            color={onEllipse ? C.good : C.g}
            tex={`\\operatorname{Var}(aX + bY) = 2a^2 + 4b^2 = ${vTex}${onEllipse ? '\\ \\checkmark' : ''}`}
          />
          {circle && <Readout color={C.bad} tex={`a^2 + b^2 = ${(a * a + b * b).toFixed(intPoint ? 0 : 2)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
