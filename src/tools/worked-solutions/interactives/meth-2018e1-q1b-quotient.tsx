// 2018 Methods Exam 1 Q1b — why f′(π) comes out as cleanly as −e^π for f(x) = eˣ / cos(x). Slide a
// point along f between its asymptotes: the readouts split the quotient rule's numerator into the
// top's change, u′v = eˣcos(x), and the bottom's change, −uv′ = eˣsin(x). At x = π the bottom,
// cos(x), is at its lowest point and momentarily flat, so its piece is 0 and only the top counts:
// f′(π) = −e^π. A toggle overlays y = −eˣ (f with cos(x) frozen at −1), which touches f at x = π
// with the same tangent. At x = 3π/4 the two pieces cancel (the top of the hump).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const PI = Math.PI
const f = (x: number) => Math.exp(x) / Math.cos(x)
const fp = (x: number) => (Math.exp(x) * (Math.cos(x) + Math.sin(x))) / Math.cos(x) ** 2
const SNAPS = [PI, (3 * PI) / 4]
/** TeX number to 2 dp, with no "-0.00". */
const fmt = (v: number) => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2)
const PI_TICKS: Record<number, string> = { 2: 'π/2', 3: '3π/4', 4: 'π', 5: '5π/4', 6: '3π/2' }

function xText(x: number): string {
  if (Math.abs(x - PI) < 1e-9) return '\\pi'
  if (Math.abs(x - (3 * PI) / 4) < 1e-9) return '\\tfrac{3\\pi}{4}'
  return x.toFixed(2)
}

export default function QuotientAtPi() {
  const [x0, setX0] = useState(2.6)
  const [frozen, setFrozen] = useState(false)

  const top = Math.exp(x0) * Math.cos(x0) // u'v
  const bottom = Math.exp(x0) * Math.sin(x0) // −uv' = −eˣ(−sin x)
  const v2 = Math.cos(x0) ** 2
  const m = fp(x0)
  const atPi = Math.abs(x0 - PI) < 1e-9
  const atMax = Math.abs(x0 - (3 * PI) / 4) < 1e-9

  const d = Math.min(0.6, 25 / Math.max(Math.abs(m), 1e-9))
  const y0 = f(x0)

  let notice
  if (atPi) {
    notice = (
      <Notice tone="good">
        At <M>x = \pi</M> the bottom, <M>\cos(x)</M>, is at its lowest value and momentarily not changing, so the
        bottom&apos;s piece is <M>{'e^{\\pi}\\sin(\\pi) = 0'}</M>. Only the top&apos;s change counts:{' '}
        <M>{"f'(\\pi) = \\frac{e^{\\pi}\\cos(\\pi)}{\\cos^2(\\pi)} = -e^{\\pi}"}</M>.{' '}
        {frozen ? (
          <>
            The dashed curve <M>{'y = -e^x'}</M> touches <M>f</M> here with exactly the same tangent.
          </>
        ) : (
          <>
            Turn on the <M>{'-e^x'}</M> curve: near <M>\pi</M>, <M>{'\\cos(x) \\approx -1'}</M>, so <M>f</M> behaves
            like <M>{'-e^x'}</M>.
          </>
        )}
      </Notice>
    )
  } else if (atMax) {
    notice = (
      <Notice>
        At <M>{'x = \\tfrac{3\\pi}{4}'}</M> the two pieces cancel: <M>{'\\cos(x) + \\sin(x) = 0'}</M>, so{' '}
        <M>{"f'(x) = 0"}</M>. This is the top of the hump. Slide on to <M>x = \pi</M>, where the bottom&apos;s piece
        drops out entirely.
      </Notice>
    )
  } else if (frozen) {
    notice = (
      <Notice>
        The dashed curve <M>{'y = -e^x'}</M> is what <M>f</M> would be if <M>\cos(x)</M> were stuck at <M>-1</M>.
        Away from <M>x = \pi</M> the two curves differ, because <M>\cos(x)</M> isn&apos;t <M>-1</M> there. Slide to{' '}
        <M>x = \pi</M> to see where they touch.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The quotient rule&apos;s numerator has two pieces: <M>{"u'v = e^x\\cos(x)"}</M> is the effect of the top
        changing, and <M>{"-uv' = e^x\\sin(x)"}</M> is the effect of the bottom changing. At{' '}
        <M>{`x = ${xText(x0)}`}</M> both are non-zero, so both count. Slide to <M>x = \pi</M> and watch the
        bottom&apos;s piece vanish.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[1.1, 4.8]}
        y={[-95, 5]}
        xStep={PI / 4}
        yStep={20}
        xLabels={v => PI_TICKS[Math.round(v / (PI / 4))] ?? ''}
        yLabels={false}
      >
        {[-20, -40, -60, -80].map(v => (
          <Label key={v} at={[0.86, v]} attach="e" color={C.guide} size={11}>
            {String(v).replace('-', '−')}
          </Label>
        ))}
        <Line.Segment point1={[PI / 2, -110]} point2={[PI / 2, 10]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[(3 * PI) / 2, -110]} point2={[(3 * PI) / 2, 10]} color={C.guide} style="dashed" weight={1.5} />
        {frozen && <Plot.OfX y={x => -Math.exp(x)} domain={[2, 4.56]} color={C.violet} style="dashed" weight={2.5} />}
        {frozen && (
          <Label at={[3.9, -Math.exp(3.9)]} attach="ne" color={C.violet}>
            y = −eˣ
          </Label>
        )}
        <Plot.OfX y={f} domain={[1.625, 4.06]} color={C.f} weight={3} />
        <Label at={[1.68, f(1.68)]} attach="e" color={C.f}>
          y = f(x)
        </Label>
        <Line.Segment point1={[x0 - d, y0 - m * d]} point2={[x0 + d, y0 + m * d]} color={C.good} weight={3} />
        <Point x={x0} y={y0} color={C.f} />
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            const snap = SNAPS.find(s => Math.abs(v - s) < 0.04)
            setX0(snap ?? v)
          }}
          min={1.8}
          max={4}
          step={0.01}
          format={v => (Math.abs(v - PI) < 1e-9 ? 'π' : Math.abs(v - (3 * PI) / 4) < 1e-9 ? '3π/4' : v.toFixed(2))}
        />
        <Toggle label="Compare with y = −eˣ" checked={frozen} onChange={setFrozen} />
        <Readouts>
          <Readout tex={`\\text{top: } u'v = e^x\\cos(x) = ${fmt(top)}`} color={C.f} />
          <Readout tex={`\\text{bottom: } {-uv'} = e^x\\sin(x) = ${fmt(bottom)}`} color={C.g} />
          <Readout tex={`v^2 = \\cos^2(x) = ${fmt(v2)}`} />
          <Readout tex={`f'(${xText(x0)}) = \\frac{u'v - uv'}{v^2} = ${fmt(m)}`} color={C.good} />
          {atPi && <Readout tex={`-e^{\\pi} \\approx ${fmt(-Math.exp(PI))}\\ \\checkmark`} color={C.good} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
