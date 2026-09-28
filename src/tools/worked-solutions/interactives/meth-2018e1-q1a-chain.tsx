// 2018 Methods Exam 1 Q1a — why the chain rule MULTIPLIES by the inner derivative. Slide a point
// along y = u³ with u = −3x³ + x² − 64 (plotted as y ÷ 1000): the readouts split the slope into the
// inner rate du/dx and the outer rate dy/du = 3u², and their product is the slope of the green
// tangent. Two flat spots show a product is zero when either factor is: x = 0 (inner flat) and
// x = −8/3 (u = 0, outer flat). A toggle draws the examiner's bracketless version,
// 3u² − 9x² + 2x, as a red line that cuts across the curve instead of touching it.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const u = (x: number) => -3 * x ** 3 + x ** 2 - 64
const du = (x: number) => -9 * x ** 2 + 2 * x
const y = (x: number) => u(x) ** 3
const dy = (x: number) => 3 * u(x) ** 2 * du(x)
const wrong = (x: number) => 3 * u(x) ** 2 - 9 * x ** 2 + 2 * x
const K = 1000 // plot y ÷ 1000 so the numbers fit
const ROOT = -8 / 3 // u = 0 here: −3x³ + x² − 64 = −(3x + 8)(x² − 3x + 8)
const SNAPS = [ROOT, -1, 0, 1]

/** TeX number: integers grouped in thousands, small values to 2 dp. */
function big(v: number): string {
  if (Math.abs(v) < 0.005) return '0'
  if (Math.abs(v) >= 100) {
    const s = Math.round(Math.abs(v)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\\,')
    return (v < 0 ? '-' : '') + s
  }
  return Number(v.toFixed(2)).toString()
}

function xText(x: number): string {
  if (Math.abs(x - ROOT) < 1e-9) return '-\\tfrac{8}{3}'
  return Number(x.toFixed(2)).toString()
}

export default function ChainRule() {
  const [x0, setX0] = useState(-1)
  const [noBrackets, setNoBrackets] = useState(false)

  const u0 = u(x0)
  const du0 = du(x0)
  const outer = 3 * u0 * u0
  const m = dy(x0)
  const mWrong = wrong(x0)
  const atRoot = Math.abs(x0 - ROOT) < 1e-9
  const atZero = Math.abs(x0) < 1e-9

  const tangent = (slope: number) => {
    const s = slope / K
    const d = Math.min(0.6, 70 / Math.max(Math.abs(s), 1e-9))
    return {
      point1: [x0 - d, y(x0) / K - s * d] as [number, number],
      point2: [x0 + d, y(x0) / K + s * d] as [number, number],
    }
  }

  let notice
  if (noBrackets) {
    notice = (
      <Notice tone="warn">
        Without brackets, <M>{'3u^2 - 9x^2 + 2x'}</M> <b>adds</b> the inner derivative on instead of multiplying by it.
        Here that gives <M>{big(mWrong)}</M>, but the curve&apos;s slope is <M>{big(m)}</M>, so the red line is not a
        tangent. Because <M>{'3u^2'}</M> is large and positive, the bracketless formula says <M>y</M> is increasing
        almost everywhere, yet the graph falls from left to right.
      </Notice>
    )
  } else if (atRoot) {
    notice = (
      <Notice tone="good">
        At <M>{'x = -\\tfrac{8}{3}'}</M> the bracket itself is <M>0</M>, so the outer rate <M>{'3u^2 = 0'}</M>: cubing
        is flat at <M>0</M>, just as <M>{'y = u^3'}</M> is flat at the origin. The inner is still changing{' '}
        (<M>{'\\tfrac{du}{dx} = -69\\tfrac13'}</M>), but <M>{'0 \\times'}</M> anything is <M>0</M>: a stationary point
        of inflection that comes from the outer factor alone.
      </Notice>
    )
  } else if (atZero) {
    notice = (
      <Notice tone="good">
        At <M>x = 0</M> the inner bracket stops changing: <M>{'\\tfrac{du}{dx} = 0'}</M>. So <M>y</M> can&apos;t change
        either, however big <M>{'3u^2 = 12\\,288'}</M> is: <M>{'\\tfrac{dy}{dx} = 12\\,288 \\times 0 = 0'}</M> and the
        tangent is flat. Now turn on &ldquo;Forget the brackets&rdquo;: that version gives <M>{'12\\,288'}</M> here.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At <M>{`x = ${xText(x0)}`}</M> the inner bracket changes at <M>{`\\tfrac{du}{dx} = ${big(du0)}`}</M> per unit
        of <M>x</M>, and <M>y</M> changes at <M>{`3u^2 = ${big(outer)}`}</M> per unit of <M>u</M>. Rates in a chain
        multiply, so the green line&apos;s slope is their product. Slide to <M>x = 0</M> and to{' '}
        <M>{'x = -\\tfrac{8}{3}'}</M> to find a flat spot caused by each factor.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-3, 1.2]}
        y={[-330, 40]}
        xStep={0.5}
        yStep={50}
        yLabel="y ÷ 1000"
        xLabels={v => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)).replace('-', '−') : '')}
        yLabels={v => (Math.abs(v % 100) < 1e-9 ? String(v).replace('-', '−') : '')}
      >
        <Plot.OfX y={x => y(x) / K} domain={[-3, 1.2]} color={C.f} weight={3} />
        <Label at={[-1.9, y(-1.9) / K]} attach="sw" color={C.f}>
          y = u³
        </Label>
        {noBrackets && <Line.Segment {...tangent(mWrong)} color={C.bad} weight={3} />}
        <Line.Segment {...tangent(m)} color={C.good} weight={3} />
        <Point x={x0} y={y(x0) / K} color={C.f} />
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            const snap = SNAPS.find(s => Math.abs(v - s) < 0.04)
            setX0(snap ?? v)
          }}
          min={-3}
          max={1.2}
          step={0.01}
          format={v => (Math.abs(v - ROOT) < 1e-9 ? '−8/3' : v.toFixed(2).replace('-', '−'))}
        />
        <Toggle label="Forget the brackets" checked={noBrackets} onChange={setNoBrackets} />
        <Readouts>
          <Readout tex={`u = -3x^3+x^2-64 = ${big(u0)}`} color={C.f} />
          <Readout tex={`\\frac{du}{dx} = -9x^2+2x = ${big(du0)}`} />
          <Readout tex={`\\frac{dy}{du} = 3u^2 = ${big(outer)}`} />
          <Readout tex={`\\frac{dy}{dx} = 3u^2 \\times \\frac{du}{dx} = ${big(m)}`} color={C.good} />
          {noBrackets && <Readout tex={`3u^2 - 9x^2 + 2x = ${big(mWrong)}`} color={C.bad} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
