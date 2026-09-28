// 2017 Methods Exam 2 Q1d(ii) — why one integral of (x − g(x)) from 0 to √(k+1) gives the whole
// shaded area, even though part of it is below the x-axis. Sweep a thin strip across the region:
// it always runs from the curve g(x) = x³ − kx up to the line y = x, its height x − g(x) =
// (k + 1)x − x³ is never negative, and the x-axis plays no part — so there is nothing to split.
// The running total ends at (k + 1)²/4. A toggle drops the brackets, as the report describes:
// x − x³ − kx measures down to the curve y = x³ + kx instead, which gives a negative "area".

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Region, Slider, Toggle,
  num, usePlayer,
} from './kit'

const W = 0.05

export default function Strips() {
  const [k, setK] = useState(2)
  const [frac, setFrac] = useState(0.6)
  const [noBrackets, setNoBrackets] = useState(false)
  const player = usePlayer(setFrac, { min: 0, max: 1, seconds: 6 })

  const g = (x: number) => x ** 3 - k * x
  const wrongCurve = (x: number) => x ** 3 + k * x
  const line = (x: number) => x
  const a = Math.sqrt(k + 1)
  const xs = frac * a
  const s0 = Math.max(0, xs - W / 2)
  const s1 = Math.min(a, xs + W / 2)

  // exact antiderivatives, evaluated from 0 to xs
  const area = ((k + 1) * xs * xs) / 2 - xs ** 4 / 4
  const total = (k + 1) ** 2 / 4
  const wrongArea = ((1 - k) * xs * xs) / 2 - xs ** 4 / 4
  const wrongTotal = (-(k + 1) * (3 * k - 1)) / 4
  const h = line(xs) - g(xs)
  const hWrong = line(xs) - wrongCurve(xs)
  const straddles = g(xs) < 0 && xs > 0.02
  const done = frac > 0.995

  const lo = noBrackets ? Math.min(line(xs), wrongCurve(xs)) : g(xs)
  const hi = noBrackets ? Math.max(line(xs), wrongCurve(xs)) : line(xs)
  const stripColor = noBrackets ? C.bad : straddles ? C.good : C.f

  let notice
  if (noBrackets) {
    notice = (
      <Notice tone="warn">
        Without brackets, <M>{'x - x^3 - kx'}</M> is <M>{'x - (x^3 + kx)'}</M>: the <M>kx</M> has the wrong sign, and the
        strip now runs from the line to the red curve <M>{'y = x^3 + kx'}</M>, which is not in the question. Where that
        curve is above the line the strip counts as negative, and the full integral comes out as{' '}
        <M>{`-\\tfrac{(k+1)(3k-1)}{4} \\approx ${num(wrongTotal)}`}</M>
        {wrongTotal < 0 ? <> &mdash; a negative &ldquo;area&rdquo;, which should set off alarm bells.</> : <>.</>}
      </Notice>
    )
  } else if (done) {
    notice = (
      <Notice tone="good">
        Swept to <M>{'x = a = \\sqrt{k+1}'}</M>: the total is <M>{`\\tfrac{(k+1)^2}{4} \\approx ${num(total)}`}</M>. One
        integral, no splitting, because the line was on top the whole way. Now try &ldquo;Drop the brackets&rdquo;.
      </Notice>
    )
  } else if (straddles) {
    notice = (
      <Notice tone="good">
        This strip <b>crosses the <M>x</M>-axis</b>, but it is still one strip: from the curve at{' '}
        <M>{`g(x) \\approx ${num(g(xs))}`}</M> up to the line at <M>{`y \\approx ${num(xs)}`}</M>, height{' '}
        <M>{`x - g(x) \\approx ${num(h)}`}</M>. Top minus bottom handles the negative part by itself; the <M>x</M>-axis
        doesn&apos;t matter. Press play to add up all the strips.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Each strip runs from the curve (bottom) to the line (top), so its height is <M>{'x - g(x) = (k+1)x - x^3'}</M>,
        positive all the way from <M>0</M> to <M>a</M>. Adding the strips is the integral. Move the strip to where the
        curve dips below the axis.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.2, 2.7]} y={[-5, 2.8]} xStep={0.5} yStep={1} height={330}>
        {!noBrackets && (
          <>
            <Region top={line} bottom={g} from={0} to={a} color={C.f} opacity={0.12} />
            <Region top={line} bottom={g} from={0} to={xs} color={C.f} opacity={0.28} />
          </>
        )}
        {noBrackets && (
          <>
            <Region top={x => Math.max(line(x), wrongCurve(x))} bottom={x => Math.min(line(x), wrongCurve(x))} from={0} to={xs} color={C.bad} opacity={0.2} />
            <Plot.OfX y={wrongCurve} domain={[0, 2.7]} color={C.bad} weight={2} style="dashed" />
            <Label at={[1.8 / (k + 1), wrongCurve(1.8 / (k + 1))]} attach="e" color={C.bad}>y = x³ + kx</Label>
          </>
        )}
        <Plot.OfX y={line} domain={[-0.2, 2.7]} color={C.g} weight={2.5} />
        <Plot.OfX y={g} domain={[-0.2, 2.7]} color={C.f} weight={3} />
        <Polygon points={[[s0, lo], [s1, lo], [s1, hi], [s0, hi]]} color={stripColor} fillOpacity={0.85} weight={1} />
        <Point x={a} y={a} color={C.good} />
        <Label at={[a, a]} attach="se" color={C.good}>(a, a)</Label>
        <Label at={[2.55, 2.55]} attach="nw" color={C.g}>y = x</Label>
        <Label at={[Math.sqrt(k / 3), g(Math.sqrt(k / 3))]} attach={k > 4 ? 'e' : 's'} color={C.f}>y = g(x)</Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={0.5} max={5} step={0.05} />
        <Slider
          label="x"
          value={xs}
          onChange={v => {
            player.stop()
            setFrac(a > 0 ? v / a : 0)
          }}
          min={0}
          max={a}
          step={0.005}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(frac)} label="Sweep from 0 to a" />
          <Toggle label="Drop the brackets" checked={noBrackets} onChange={setNoBrackets} />
        </Buttons>
        <Readouts>
          {noBrackets ? (
            <>
              <Readout color={C.bad} tex={`x - x^3 - kx \\approx ${num(hWrong)}`} />
              <Readout color={C.bad} tex={`\\text{total so far} \\approx ${num(wrongArea)}`} />
            </>
          ) : (
            <>
              <Readout color={stripColor} tex={`\\text{height} = x - g(x) \\approx ${num(h)}`} />
              <Readout tex={`\\text{area so far} \\approx ${num(area)}`} />
              {done && <Readout color={C.good} tex={`\\tfrac{(k+1)^2}{4} \\approx ${num(total)}\\ \\checkmark`} />}
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
