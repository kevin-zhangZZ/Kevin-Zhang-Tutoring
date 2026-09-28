// 2019 Specialist Exam 1 Q3b — why a multiplier comes out of a variance SQUARED. Seven sample
// pieces of chocolate (lengths with mean exactly 3 cm and sd exactly 0.1 cm) sit on the blue line;
// each one's volume V = kL sits on the orange line below, joined by a dashed line. Both lines use
// the same scale and are centred on their own means (the vertical axis). Multiplying by k moves
// every piece k times as far from the mean, so the sd is multiplied by k and the variance — the
// area of the square built on the sd — by k². The question's k is π/4 (V = π(½)²L), giving
// Var(V) = (π/4)² × 0.01 = π²/1600 ≈ 0.00617. A toggle draws the wrong idea Var(V) = k·Var(L) as a
// dashed red square (side 0.1√k), which only fits the spread when k = 1.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Point, Polygon, Readout, Readouts, Slider, Toggle } from './kit'

const K0 = Math.PI / 4
const SD = 0.1
const YL = 0.34 // height of the lengths line; the volumes line is the x-axis
const XR = 0.45 // half-width of the view, in cm (or cm³) either side of the mean

// Seven pieces, rescaled so the sample has mean exactly 3 and sd exactly 0.1.
const RAW = [-1.9, -1.2, -0.6, -0.1, 0.5, 1.1, 1.6]
const MEAN = RAW.reduce((s, z) => s + z, 0) / RAW.length
const RMS = Math.sqrt(RAW.reduce((s, z) => s + (z - MEAN) ** 2, 0) / RAW.length)
const DEV = RAW.map(z => (SD * (z - MEAN)) / RMS) // each piece's length minus 3

/** Tick marks every 0.1 along a line centred on `centre`, numbered at the even tenths. */
function Ticks({ centre, y, color }: { centre: number; y: number; color: string }) {
  const lo = Math.ceil((centre - XR) * 10 - 1e-9)
  const hi = Math.floor((centre + XR) * 10 + 1e-9)
  const out = []
  for (let n = lo; n <= hi; n++) {
    const x = n / 10 - centre
    out.push(<Line.Segment key={`t${n}`} point1={[x, y - 0.012]} point2={[x, y + 0.012]} color={color} weight={1.5} />)
    if (n % 2 === 0)
      out.push(
        <Label key={`l${n}`} at={[x, y - 0.012]} attach="s" size={11} gap={4} color={color} bold={false}>
          {(n / 10).toFixed(1)}
        </Label>,
      )
  }
  return <>{out}</>
}

export default function Squared() {
  const [k, setK] = useState(K0)
  const [wrong, setWrong] = useState(false)

  const isPi = Math.abs(k - K0) < 0.004
  const sV = k * SD
  const sW = SD * Math.sqrt(k)
  const kTex = isPi ? '\\tfrac{\\pi}{4}' : k.toFixed(2)

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        The dashed red square has area <M>{`k\\operatorname{Var}(L) = ${(k * 0.01).toFixed(5)}`}</M>, which is what you
        get if <M>k</M> comes out of the variance unsquared. Its side is <M>{'0.1\\sqrt{k}'}</M>, but the volumes are
        spread by <M>{'0.1k'}</M>, so it is the wrong square. It is too big when <M>{'k<1'}</M> and too small when{' '}
        <M>{'k>1'}</M>, and only fits at <M>k=1</M>. In this question (<M>{'k=\\tfrac{\\pi}{4}'}</M>) it would give{' '}
        <M>{'\\tfrac{\\pi}{400}'}</M> instead of{' '}
        <M>{'\\tfrac{\\pi^2}{1600}'}</M>.
      </Notice>
    )
  } else if (isPi) {
    notice = (
      <Notice>
        This is the question: <M>{'V=\\pi\\left(\\tfrac12\\right)^2L=\\tfrac{\\pi}{4}L'}</M>, so{' '}
        <M>{'k=\\tfrac{\\pi}{4}\\approx0.785'}</M>. Follow the dashed lines: each orange volume is only{' '}
        <M>{'\\tfrac{\\pi}{4}'}</M> as far from its mean as the blue length was from 3 cm. So the sd shrinks to{' '}
        <M>{'\\tfrac{\\pi}{4}\\times0.1'}</M>, and the square on it shrinks by <M>{'\\left(\\tfrac{\\pi}{4}\\right)^2'}</M>. The{' '}
        <M>\pi</M> is part of <M>k</M>, so it gets squared too. Try <M>k=2</M> to make the effect obvious.
      </Notice>
    )
  } else if (Math.abs(k - 1) < 0.01) {
    notice = (
      <Notice>
        At <M>k=1</M> the volumes are just the lengths: every dashed line is vertical, and the orange square is the same
        size as the blue one. Move <M>k</M> either way and watch the square&apos;s <b>side</b> change by <M>k</M> but its{' '}
        <b>area</b> by <M>{'k^2'}</M>.
      </Notice>
    )
  } else {
    const grow = k > 1
    notice = (
      <Notice>
        With <M>{`k=${k.toFixed(2)}`}</M>, every piece is <M>{k.toFixed(2)}</M> times as far from the mean, so the
        dashed lines fan {grow ? 'out' : 'in'}. The square&apos;s sides are <M>{k.toFixed(2)}</M> times as long, so its
        area is <M>{`k^2=${(k * k).toFixed(2)}`}</M> times as {grow ? 'big' : 'small'}. That is{' '}
        <M>{'\\operatorname{Var}(kL)=k^2\\operatorname{Var}(L)'}</M>: variance is a <em>squared</em> distance. Turn on the
        wrong idea to compare.
      </Notice>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap gap-x-5 gap-y-1 mb-2 text-[12.5px] text-gray-600 dark:text-gray-300">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: C.f }} />
          Top line: lengths <M>L</M> (cm)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: C.g }} />
          Bottom line: volumes <M>V=kL</M> (cm³)
        </span>
      </div>
      <Plane x={[-XR, XR]} y={[-0.07, 0.5]} xStep={1} yStep={1} equalScale height={420} labels={false} xLabel="" yLabel="">
        {/* the two number lines, each centred on its own mean */}
        <Line.Segment point1={[-1.1 * XR, YL]} point2={[1.1 * XR, YL]} color={C.f} weight={1.5} />
        <Line.Segment point1={[-1.1 * XR, 0]} point2={[1.1 * XR, 0]} color={C.g} weight={2} />
        <Ticks centre={3} y={YL} color={C.f} />
        <Ticks centre={3 * k} y={0} color={C.g} />
        <Label at={[0, 0.47]} attach="w" size={11} color={C.guide} bold={false}>
          mean
        </Label>

        {/* the squares on the sd: area = variance */}
        <Polygon points={[[0, YL], [SD, YL], [SD, YL + SD], [0, YL + SD]]} color={C.f} fillOpacity={0.25} weight={2} />
        <Polygon points={[[0, 0], [sV, 0], [sV, sV], [0, sV]]} color={C.g} fillOpacity={0.3} weight={2} />
        {wrong && (
          <Polygon points={[[0, 0], [sW, 0], [sW, sW], [0, sW]]} color={C.bad} fillOpacity={0} weight={2} strokeStyle="dashed" />
        )}
        <Label at={[SD, YL + SD]} attach="ne" gap={3} color={C.f}>
          Var(L)
        </Label>
        <Label at={[sV, sV]} attach="ne" gap={3} color={C.g}>
          Var(V)
        </Label>

        {/* each piece: its length, its volume, and the line joining them */}
        {DEV.map((d, i) => (
          <Line.Segment key={`c${i}`} point1={[d, YL]} point2={[k * d, 0]} color={C.guide} style="dashed" weight={1} />
        ))}
        {DEV.map((d, i) => (
          <Point key={`l${i}`} x={d} y={YL} color={C.f} svgCircleProps={{ r: 5 }} />
        ))}
        {DEV.map((d, i) => (
          <Point key={`v${i}`} x={k * d} y={0} color={C.g} svgCircleProps={{ r: 5 }} />
        ))}
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={0.5} max={2} step={0.01} format={v => (Math.abs(v - K0) < 0.004 ? 'π/4' : v.toFixed(2))} />
        <Buttons>
          <ActionButton label="k = π/4 (this question)" onClick={() => setK(K0)} />
          <ActionButton label="k = 2" onClick={() => setK(2)} />
          <Toggle label="Wrong idea: Var(V) = k Var(L)" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={'\\operatorname{Var}(L)=0.1^2=0.01'} />
          <Readout color={C.g} tex={`\\text{sd}(V)=${kTex}\\times0.1${isPi ? '=\\tfrac{\\pi}{40}' : ''}\\approx${(k * SD).toFixed(4)}`} />
          <Readout
            color={C.g}
            tex={
              isPi
                ? '\\operatorname{Var}(V)=\\tfrac{\\pi^2}{16}\\times\\tfrac{1}{100}=\\tfrac{\\pi^2}{1600}\\approx0.00617'
                : `\\operatorname{Var}(V)=${kTex}^2\\times0.01\\approx${(k * k * 0.01).toFixed(5)}`
            }
          />
          {wrong && <Readout color={C.bad} tex={`k\\operatorname{Var}(L)\\approx${(k * 0.01).toFixed(5)}\\ (\\text{wrong})`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
