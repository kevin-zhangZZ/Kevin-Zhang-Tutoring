// 2020 Methods Exam 2 MCQ 11 — standardising only relabels the axis. One bell curve is drawn with
// two number lines under it: the Z scale (standard deviations from the mean) and the X scale in
// millimetres, where z = k sits at X = 250 + kσ (the vertical gridlines join the two). The blue
// area is 1 − Pr(Z > 1.5) = Pr(Z < 1.5) ≈ 0.9332, fixed; the orange line is X = 259, which sits at
// z = (259 − 250)/σ = 9/σ. A σ slider (and one button per option) moves the X labels: the two
// probabilities agree only when 259 lines up with z = 1.5, i.e. 9 = 1.5σ, σ = 6 (option C). The
// red sliver is the difference when they don't. Option D (σ = 9, the most-chosen distractor) puts
// 259 at z = 1; option A (σ = 1.5, the z-value itself) puts it at z = 6, off the right edge.
// Probabilities from the standard normal cdf (checked with scipy: Φ(1.5) = 0.93319).

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, num } from './kit'

const MU = 250
const X_OBS = 259
const Z_TARGET = 1.5
const ZL = -3.6
const ZR = 3.6
const Y_X = -0.13 // height of the X scale below the z-axis
const phi = (z: number) => Math.exp((-z * z) / 2) / Math.sqrt(2 * Math.PI)

// Standard normal cdf (Abramowitz–Stegun 7.1.26 erf, |error| < 1.5e-7) — readouts only.
function Phi(z: number): number {
  const x = Math.abs(z) / Math.SQRT2
  const t = 1 / (1 + 0.3275911 * x)
  const erf = 1 - (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t) * Math.exp(-x * x)
  return z >= 0 ? 0.5 * (1 + erf) : 0.5 * (1 - erf)
}

/** Is z close enough to one of the z-axis labels (−3 … 3 and 1.5) for a vertical line to strike through it? */
const nearZLabel = (z: number) => [-3, -2, -1, 0, 1, 1.5, 2, 3].some(k => Math.abs(z - k) < 0.3)

/** "256", "254.5", "−3" — for the X-scale labels. */
const mm = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1)).replace('-', '−')

const OPTIONS: { letter: string; sigma: number }[] = [
  { letter: 'A', sigma: 1.5 },
  { letter: 'B', sigma: 3 },
  { letter: 'C', sigma: 6 },
  { letter: 'D', sigma: 9 },
  { letter: 'E', sigma: 12 },
]

export default function TwinScales() {
  const [sigma, setSigma] = useState(9)
  const z259 = (X_OBS - MU) / sigma
  const onScreen = z259 <= ZR
  const aligned = Math.abs(z259 - Z_TARGET) < 1e-9
  const pX = Phi(z259)
  const pZ = Phi(Z_TARGET)
  const lo = Math.min(z259, Z_TARGET)
  const hi = Math.min(Math.max(z259, Z_TARGET), ZR)
  const sg = mm(sigma)
  // "= 3" when 9/σ terminates within 2 dp (σ = 3, 4.5, 12, …), "≈ 1.64" otherwise.
  const zExact = Math.abs(z259 * 100 - Math.round(z259 * 100)) < 1e-9
  const zTex = zExact ? `= ${Math.round(z259 * 100) / 100}` : `\\approx ${num(z259, 2)}`

  let notice
  if (aligned) {
    notice = (
      <Notice tone="good">
        <b>With <M>\sigma = 6</M>, 259 sits exactly under <M>z = 1.5</M>.</b> The orange line is on the edge of the blue area,
        so <M>{'\\Pr(X < 259) = \\Pr(Z < 1.5)'}</M>, as the question says. Read it off the two scales: the 9 mm from 250 to
        259 is 1.5 standard deviations, so one standard deviation is <M>9 \div 1.5 = 6</M> mm. That is{' '}
        <M>{'\\frac{259 - 250}{\\sigma} = 1.5'}</M> in a picture. Option C.
      </Notice>
    )
  } else if (Math.abs(sigma - 9) < 1e-9) {
    notice = (
      <Notice tone="warn">
        <b>Option D, <M>\sigma = 9</M>:</b> now one standard deviation is the whole 9 mm, so 259 sits under <M>z = 1</M>, not{' '}
        <M>z = 1.5</M>. The area left of the orange line, <M>{'\\Pr(X < 259) \\approx 0.841'}</M>, falls short of the blue
        area <M>{'\\Pr(Z < 1.5) \\approx 0.933'}</M> by the red sliver. The 9 mm is the gap from the mean, not the standard
        deviation. Drag <M>\sigma</M> down and watch the X labels squeeze together.
      </Notice>
    )
  } else if (!onScreen) {
    notice = (
      <Notice tone="warn">
        {Math.abs(sigma - 1.5) < 1e-9 ? <><b>Option A uses the z-value 1.5 as the standard deviation.</b> </> : null}
        With <M>\sigma = {sg}</M>, 259 is <M>9 \div {sg} {zTex}</M> standard deviations above 250: off the right-hand edge,
        far beyond <M>z = 1.5</M>. A small <M>\sigma</M> packs the X labels tight, so 259 ends up a long way out. Make{' '}
        <M>\sigma</M> bigger.
      </Notice>
    )
  } else if (z259 > Z_TARGET) {
    notice = (
      <Notice>
        With <M>\sigma = {sg}</M>, 259 is <M>9 \div {sg} {zTex}</M> standard deviations above 250: to the <b>right</b> of{' '}
        <M>z = 1.5</M>, so the area left of the orange line, <M>{'\\Pr(X < 259)'}</M>, is too big by the red sliver. A bigger{' '}
        <M>\sigma</M> spreads the X labels out and pulls 259 back towards the mean. Increase <M>\sigma</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        With <M>\sigma = {sg}</M>, 259 is only <M>9 \div {sg} {zTex}</M> standard deviations above 250: to the <b>left</b> of{' '}
        <M>z = 1.5</M>, so the area left of the orange line, <M>{'\\Pr(X < 259)'}</M>, is too small by the red sliver.
        Decrease <M>\sigma</M> to push 259 further out.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[ZL, ZR]} y={[-0.2, 0.45]} xStep={1} yStep={1} height={300} labels={false} xLabel="z" yLabel="">
        {/* 1 − Pr(Z > 1.5) = Pr(Z < 1.5): everything under the curve except the right tail. */}
        <Region top={phi} bottom={() => 0} from={ZL} to={Z_TARGET} color={C.f} opacity={0.22} />
        <Region top={phi} bottom={() => 0} from={Z_TARGET} to={ZR} color={C.guide} opacity={0.12} />
        {!aligned && <Region top={phi} bottom={() => 0} from={lo} to={hi} color={C.bad} opacity={0.35} />}
        <Plot.OfX y={phi} domain={[ZL, ZR]} color={C.ink} weight={2} />
        <Line.Segment point1={[Z_TARGET, 0]} point2={[Z_TARGET, phi(Z_TARGET)]} color={C.f} weight={2.5} />
        {/* X = 259, from the X scale up to the curve. */}
        {/* It is broken just under the z-axis when it would run through a z label ("1.5", "1", …). */}
        {onScreen && (
          <>
            <Line.Segment point1={[z259, 0]} point2={[z259, phi(z259)]} color={C.g} weight={3} />
            <Line.Segment point1={[z259, Y_X]} point2={[z259, nearZLabel(z259) ? -0.05 : 0]} color={C.g} weight={3} />
          </>
        )}
        {/* The X scale in mm: z = k sits at 250 + kσ (the vertical gridlines join the two scales). */}
        <Line.Segment point1={[ZL, Y_X]} point2={[ZR, Y_X]} color={C.ink} weight={1.4} />
        {[-3, -2, -1, 0, 1, 2, 3].map(k => (
          <Line.Segment key={`t${k}`} point1={[k, Y_X - 0.012]} point2={[k, Y_X + 0.012]} color={C.ink} weight={1.4} />
        ))}
        <Label at={[2.55, phi(2.55) + 0.012]} attach="n" size={11} color={C.guide}>
          Pr(Z &gt; 1.5)
        </Label>
        {/* The Z scale: the plane's own axis. */}
        {[-3, -2, -1, 0, 1, 2, 3].map(k => (
          <Label key={`z${k}`} at={[k, 0]} attach="s" gap={5} size={11} bold={false}>
            {String(k).replace('-', '−')}
          </Label>
        ))}
        <Label at={[Z_TARGET, 0]} attach="s" gap={5} size={12} color={C.f}>
          1.5
        </Label>
        {[-3, -2, -1, 0, 1, 2, 3].filter(k => Math.abs(MU + k * sigma - X_OBS) > 1e-9).map(k => (
          <Label key={`x${k}`} at={[k, Y_X]} attach="s" gap={6} size={11} bold={false}>
            {mm(MU + k * sigma)}
          </Label>
        ))}
        <Label at={[ZR, Y_X]} attach="e" size={13} italic>
          X
        </Label>
        {onScreen ? (
          <>
            <Point x={z259} y={Y_X} color={C.g} svgCircleProps={{ r: 5 }} />
            <Label at={[z259, Y_X]} attach="n" gap={7} size={12} color={C.g}>
              259
            </Label>
          </>
        ) : (
          <Label at={[ZR, Y_X]} attach="nw" gap={7} size={11} color={C.g}>
            {`259 is off this edge, at z = ${Math.round(z259 * 100) / 100}`}
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider label="\sigma" value={sigma} onChange={setSigma} min={1.5} max={12} step={0.5} format={v => `${mm(v)} mm`} />
        <Buttons>
          <span className="text-[12.5px] text-gray-500 dark:text-gray-400">Try an option:</span>
          {OPTIONS.map(o => (
            <ActionButton key={o.letter} label={`${o.letter}: σ = ${o.sigma}`} onClick={() => setSigma(o.sigma)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`259 \\text{ is at } z = \\tfrac{259-250}{\\sigma} = \\tfrac{9}{${sg}} ${zTex}`} />
          <Readout color={C.g} tex={`\\Pr(X<259) \\approx ${num(pX, 4)}`} />
          <Readout color={C.f} tex={`\\Pr(Z<1.5) \\approx ${num(pZ, 4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
