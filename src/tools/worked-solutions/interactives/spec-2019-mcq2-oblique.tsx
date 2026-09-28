// 2019 Specialist Exam 2 MCQ 2 — why the oblique asymptote of f(x) = (x² + 1)/(2x − 8) is
// y = x/2 + 2 and not y = x/2 (option B, 9%). Division gives f(x) = x/2 + 2 + 17/(2x − 8). Slide
// a probe x along the curve: the green gap from the curve to y = x/2 + 2 is the remainder
// 17/(2x − 8), which shrinks to 0 at both ends; the red gap to y = x/2 is 2 + 17/(2x − 8), which
// only shrinks to 2 — a parallel line that stays 2 units away is not an asymptote.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const f = (x: number) => (x * x + 1) / (2 * x - 8)
const asym = (x: number) => x / 2 + 2
const lead = (x: number) => x / 2
const rem = (x: number) => 17 / (2 * x - 8)

const X: [number, number] = [-20, 40]
const Y: [number, number] = [-12, 24]
// Where each branch leaves the padded view: x² + 1 = k(2x − 8) gives x = k ± √(k² − 8k − 1),
// for k = −16 (left branch) and k = 28 (right branch).
const LEFT_END = -16 + Math.sqrt(383) // f = −16, just left of x = 4
const RIGHT_START = 28 - Math.sqrt(559) // f = 28, just right of x = 4

// Number only every second grid line (and nothing past the ends), so a phone isn't crowded.
// Horizontal offset of each gap bar from P (x-units): about 5 px either side on a laptop.
const DX = 0.45

const tens = (v: number) => (v % 10 === 0 && v >= X[0] && v <= X[1] ? String(v) : '')

export default function ObliqueGap() {
  const [x, setX] = useState(10)
  const [showB, setShowB] = useState(true)
  const nearVA = x > 1 && x < 8
  const gGood = rem(x)
  const gBad = f(x) - lead(x)

  let notice
  if (nearVA) {
    notice = (
      <Notice tone="warn">
        Near <M>x = 4</M> the remainder <M>{'\\frac{17}{2x-8}'}</M> is huge, because its denominator is close to{' '}
        <M>0</M>. That is the vertical asymptote: <M>{'2x-8=0'}</M> at <M>x = 4</M>, where the numerator is{' '}
        <M>{'17\\ne0'}</M>. Drag <M>x</M> far to the right or left to see the other asymptote take over.
      </Notice>
    )
  } else if (x >= 8) {
    notice = (
      <Notice tone="good">
        <b>The green gap is the remainder</b> <M>{'\\frac{17}{2x-8}'}</M>: here it is <M>{num(gGood)}</M>, and it keeps
        shrinking towards <M>0</M> as <M>x</M> grows. That is what makes <M>{'y=\\frac{x}{2}+2'}</M> an asymptote.{' '}
        {showB ? (
          <>
            The red gap to <M>{'y=\\frac{x}{2}'}</M> is <M>{'2+\\frac{17}{2x-8}'}</M>, which only shrinks towards{' '}
            <M>2</M>: right slope, wrong height, so option B&apos;s line is never approached.
          </>
        ) : (
          <>Turn on option B&apos;s line to compare.</>
        )}
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        On the left <M>{'2x-8<0'}</M>, so the remainder is negative and the curve sits just <i>below</i>{' '}
        <M>{'y=\\frac{x}{2}+2'}</M>. The green gap still shrinks towards <M>0</M>: the same line is the asymptote at both
        ends. {showB ? <>The red gap heads for <M>2</M> again.</> : null}
      </Notice>
    )
  }

  const px = x
  const py = f(x)
  const inView = py > Y[0] - 3 && py < Y[1] + 3
  // With option B's line hidden, the green bar sits right on P; bars never straddle x = 4.
  const gx = showB ? px - DX : px
  const bars = Math.abs(px - 4) > DX + 0.15

  return (
    <div className="space-y-3">
      <Plane x={X} y={Y} xStep={5} yStep={4} height={330} xLabels={tens}>
        <Line.ThroughPoints point1={[4, 0]} point2={[4, 1]} color={C.guide} style="dashed" />
        <Label at={[4, -10]} attach="e" color={C.guide} size={12}>
          x = 4
        </Label>
        <Plot.OfX y={asym} color={C.good} style="dashed" weight={2} />
        <Label at={[34, 19.6]} attach="nw" color={C.good} size={12}>
          y = x/2 + 2
        </Label>
        {showB && (
          <>
            <Plot.OfX y={lead} color={C.bad} style="dashed" weight={2} />
            <Label at={[30, 15]} attach="se" color={C.bad} size={12}>
              y = x/2
            </Label>
          </>
        )}
        <Plot.OfX y={f} domain={[X[0], LEFT_END]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[RIGHT_START, X[1]]} color={C.f} weight={3} />
        {inView && (
          <>
            {/* The two gaps overlap (green sits inside red), so each is drawn a hair to one side of P —
                exact at its own x — and P goes underneath so it can't hide the short green bar. */}
            <Point x={px} y={py} color={C.f} />
            {bars && showB && (
              <Line.Segment point1={[px + DX, lead(px + DX)]} point2={[px + DX, f(px + DX)]} color={C.bad} weight={4} />
            )}
            {bars && <Line.Segment point1={[gx, asym(gx)]} point2={[gx, f(gx)]} color={C.good} weight={4} />}
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={setX} min={-20} max={40} step={0.1} format={v => v.toFixed(1)} />
        <Toggle label={<>Show option B&apos;s line <M>{'y=\\frac{x}{2}'}</M></>} checked={showB} onChange={setShowB} />
      </Controls>
      <Readouts>
        <Readout tex={`f(x)-\\left(\\tfrac{x}{2}+2\\right)=${num(gGood)}`} color={C.good} />
        {showB && <Readout tex={`f(x)-\\tfrac{x}{2}=${num(gBad)}`} color={C.bad} />}
      </Readouts>
      {notice}
    </div>
  )
}
