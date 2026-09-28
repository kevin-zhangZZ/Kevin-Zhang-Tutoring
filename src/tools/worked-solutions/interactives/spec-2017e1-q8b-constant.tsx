// 2017 Specialist Exam 1 Q8b — what the constant of integration does. Separating
// dy/dx = −x/(1 + y²) gives y + y³/3 = −x²/2 + c, and every c is a different curve that follows the
// slope field's ticks: the equation alone describes the whole family, and y(−1) = 1 picks one.
// A slider moves c in sixths; buttons jump to the answer c = 11/6 and to the two slips the examiners'
// report names: c = 5/6 (the right side taken as +1/2 at x = −1) and "+11 on the left side"
// (2y³ + 6y + 3x² + 11 = 0, which is c = −11/6). Each is checked by substituting (−1, 1).

import { memo, useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider,
} from './kit'

const slope = (x: number, y: number) => -x / (1 + y * y)
/** The one real root of y + y³/3 = −x²/2 + c, i.e. y³ + 3y + q = 0 with q = 3x²/2 − 3c. */
function solY(x: number, c: number) {
  const q = 1.5 * x * x - 3 * c
  const r = Math.sqrt((q * q) / 4 + 1)
  return Math.cbrt(-q / 2 + r) + Math.cbrt(-q / 2 - r)
}

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
/** n/6 in lowest terms, as TeX (\tfrac) or as plain text for the slider. */
function sixths(n: number, tex: boolean) {
  if (n === 0) return '0'
  const g = gcd(n, 6)
  const p = Math.abs(n) / g
  const q = 6 / g
  const sign = n < 0 ? (tex ? '-' : '−') : ''
  if (q === 1) return `${sign}${p}`
  return tex ? `${sign}\\tfrac{${p}}{${q}}` : `${sign}${p}/${q}`
}

const Field = memo(function Field() {
  const marks = []
  for (let i = -16; i <= 16; i++) {
    for (let j = -12; j <= 12; j++) {
      const x = i / 5
      const y = j / 5
      const m = slope(x, y)
      const u = 0.075 / Math.hypot(1, m)
      marks.push(
        <Line.Segment key={`${i},${j}`} point1={[x - u, y - u * m]} point2={[x + u, y + u * m]} color={C.guide} weight={1.4} opacity={0.6} />,
      )
    }
  }
  return <>{marks}</>
})

export default function Constant() {
  const [n, setN] = useState(3) // c = n/6
  const c = n / 6
  const right = n === 11
  const slip56 = n === 5
  const slip11 = n === -11
  const col = right ? C.good : C.f
  const yAt = solY(-1, c)
  // Integer form 2y³ + 6y + 3x² − 6c = 0, and its value at (−1, 1).
  const d = -n
  const atPoint = 2 + 6 + 3 + d
  const dTex = d === 0 ? '' : d > 0 ? `+ ${d}` : `- ${-d}`
  const xInt = c > 0 ? Math.sqrt(2 * c) : null

  let notice
  if (right) {
    notice = (
      <Notice tone="good">
        At <M>(-1, 1)</M>: <M>{'1 + \\tfrac13 = -\\tfrac{(-1)^2}{2} + c'}</M>, so <M>{'\\tfrac43 = -\\tfrac12 + c'}</M>{' '}
        and <M>{'c = \\tfrac{11}{6}'}</M>. This curve, and only this one, passes through the point. It is the arch you
        traced in part a., crossing the <M>x</M>-axis at <M>{'\\sqrt{11/3} \\approx 1.9'}</M>.
      </Notice>
    )
  } else if (slip56) {
    notice = (
      <Notice tone="warn">
        <M>{'c = \\tfrac56'}</M> comes from taking the right side at <M>x = -1</M> as <M>{'+\\tfrac12'}</M>:{' '}
        <M>{'\\tfrac43 = \\tfrac12 + c'}</M>. But <M>{'-\\tfrac{(-1)^2}{2} = -\\tfrac12'}</M>: square first, then the
        minus in front still applies. This curve follows the ticks, so it solves the equation, but it passes through{' '}
        <M>(-1,\ 0.32)</M>, not <M>(-1, 1)</M>.
      </Notice>
    )
  } else if (slip11) {
    notice = (
      <Notice tone="warn">
        This is <M>2y^3 + 6y + 3x^2 + 11 = 0</M>, the report&apos;s &ldquo;+11 on the left side&rdquo;. Taking{' '}
        <M>{'\\tfrac{11}{6}'}</M> across makes it <M>{'-\\tfrac{11}{6}'}</M>, so times 6 it is <M>-11</M>. Substitute{' '}
        <M>(-1, 1)</M>: <M>2 + 6 + 3 + 11 = 22 \ne 0</M>. The curve lies wholly below the <M>x</M>-axis.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Every value of <M>c</M> gives a curve that follows the ticks, because each one solves{' '}
        <M>{'\\frac{dy}{dx} = \\frac{-x}{1+y^2}'}</M>. That is why integrating leaves a <M>+c</M>: the equation alone
        describes the whole family. Slide <M>c</M> until the curve passes through the orange point <M>(-1, 1)</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3.2, 3.2]} y={[-2.5, 2.5]} height={460} equalScale>
        <Field />
        <Plot.OfX y={x => solY(x, c)} domain={[-3.2, 3.2]} color={col} weight={3.5} />
        {!right && <Line.Segment point1={[-1, yAt]} point2={[-1, 1]} color={C.g} style="dashed" weight={2} />}
        {!right && <Point x={-1} y={yAt} color={col} />}
        {xInt !== null && xInt < 3.1 && <Point x={xInt} y={0} color={col} />}
        {xInt !== null && xInt < 3.1 && (
          <Label at={[xInt, 0]} attach="ne" color={col} gap={9}>{`x ≈ ${xInt.toFixed(2)}`}</Label>
        )}
        <Point x={-1} y={1} color={right ? C.good : C.g} />
        <Label at={[-1, 1]} attach="nw" color={right ? C.good : C.g} gap={9}>(−1, 1)</Label>
      </Plane>
      <Controls>
        <Slider label="c" value={n} onChange={v => setN(Math.round(v))} min={-12} max={18} step={1} format={v => sixths(Math.round(v), false)} />
        <Buttons>
          <ActionButton label="c = 11/6" onClick={() => setN(11)} />
          <ActionButton label="c = 5/6 (common slip)" onClick={() => setN(5)} />
          <ActionButton label="+11 on the left" onClick={() => setN(-11)} />
        </Buttons>
        <Readouts>
          <Readout
            color={col}
            tex={`y + \\tfrac{y^3}{3} = -\\tfrac{x^2}{2}${n === 0 ? '' : n > 0 ? ` + ${sixths(n, true)}` : ` - ${sixths(-n, true)}`}`}
          />
          <Readout color={col} tex={`2y^3 + 6y + 3x^2 ${dTex} = 0`} />
          <Readout
            color={atPoint === 0 ? C.good : C.g}
            tex={`\\text{at } (-1, 1):\\ 2 + 6 + 3 ${dTex} = ${atPoint}${atPoint === 0 ? '\\ \\checkmark' : ' \\ne 0'}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
