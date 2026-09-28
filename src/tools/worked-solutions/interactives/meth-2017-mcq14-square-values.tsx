// 2017 Methods Exam 2 MCQ 14 — why E(X²) = 1 − 2p. The distribution of X is drawn as bars at
// −1, 0, 1 with heights p, 2p, 1 − 3p and its balance point E(X) = 1 − 4p (option B, the mean, not
// the variance). "Square the values" moves the bar at −1 onto +1, since (−1)² = 1: X² is 0 with
// probability 2p and 1 with probability 1 − 2p, so E(X²) = 1 − 2p and Var(X) = 6p − 16p² (option D)
// for every p. The slip toggle leaves −1 where it is: E(X²) comes out as 1 − 4p and the "variance"
// 4p − 16p², which goes negative once p > 1/4, so it cannot be a variance.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, Toggle, num, tick,
} from './kit'

const W = 0.34
const bar = (xc: number, y0: number, y1: number): [number, number][] => [
  [xc - W / 2, y0],
  [xc + W / 2, y0],
  [xc + W / 2, y1],
  [xc - W / 2, y1],
]

export default function SquareValues() {
  const [p, setP] = useState(0.2)
  const [sq, setSq] = useState(false)
  const [slip, setSlip] = useState(false)

  const mean = 1 - 4 * p
  const ex2 = slip ? 1 - 4 * p : 1 - 2 * p
  const varX = ex2 - mean * mean
  const moved = sq && !slip
  const marker = sq ? ex2 : mean
  const markerColor = sq && slip ? C.bad : C.good
  const markerName = sq ? 'E(X²)' : 'E(X)'
  const top = 1.12

  // The arc the bar at −1 travels along to land on top of the bar at +1.
  const arc = (t: number): [number, number] => [-1 + 2 * t, p + (1 - 2 * p - p) * t + 0.28 * Math.sin(Math.PI * t) + 0.02]

  let notice
  if (!sq) {
    notice = (
      <Notice>
        The green line is the balance point of the bars, <M>{'\\mathrm{E}(X) = 1 - 4p'}</M>. That expression is option
        B, but it is the <b>mean</b>, not the variance. The variance needs <M>{'\\mathrm{E}(X^2)'}</M>: turn on
        &ldquo;Square the values&rdquo; to see what happens to each bar.
      </Notice>
    )
  } else if (!slip) {
    notice = (
      <Notice tone="good">
        Squaring sends <M>-1</M> to <M>+1</M>, so the orange bar moves across and stacks on the bar at <M>1</M>.{' '}
        <M>X^2</M> takes only two values: <M>0</M> with probability <M>2p</M>, and <M>1</M> with probability{' '}
        <M>p + (1 - 3p) = 1 - 2p</M>. So <M>{'\\mathrm{E}(X^2) = 1 - 2p'}</M>. Slide <M>p</M>: the variance always
        matches <M>6p - 16p^2</M>. Then try the slip toggle.
      </Notice>
    )
  } else if (p <= 0.25) {
    notice = (
      <Notice tone="warn">
        Leaving the orange bar at <M>-1</M> treats <M>(-1)^2</M> as <M>-1</M>. Then &ldquo;
        <M>{'\\mathrm{E}(X^2)'}</M>&rdquo; comes out as <M>1 - 4p</M>, the same as <M>{'\\mathrm{E}(X)'}</M>, and the
        &ldquo;variance&rdquo; as <M>{'4p - 16p^2,'}</M> which is not an option. Now slide <M>p</M> above{' '}
        <M>{'\\tfrac14'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        The &ldquo;variance&rdquo; is now <b>negative</b>, which is impossible: a variance is an average of squared
        distances. The slip is the <M>x^2</M> value of <M>-1</M>. A squared value is never negative, so every entry in
        the <M>x^2</M> row must be <M>0</M> or positive.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.7, 1.7]} y={[0, top]} xStep={1} yStep={0.25} height={280} xLabel={sq ? 'x²' : 'x'} yLabel="Pr" yLabels={false} xLabels={v => (Math.abs(v) > 1.5 ? '' : tick(v))}>
        {/* bar at 0: probability 2p */}
        <Polygon points={bar(0, 0, 2 * p)} color={C.violet} fillOpacity={0.5} weight={1.5} />
        <Label at={[0, 2 * p]} attach="n" color={C.violet}>2p</Label>

        {/* bar at 1: probability 1 − 3p, plus p stacked on top once −1 has been squared */}
        <Polygon points={bar(1, 0, 1 - 3 * p)} color={C.f} fillOpacity={0.5} weight={1.5} />
        {!moved && <Label at={[1, 1 - 3 * p]} attach="n" color={C.f}>1 − 3p</Label>}

        {moved ? (
          <>
            <Polygon points={bar(1, 1 - 3 * p, 1 - 2 * p)} color={C.g} fillOpacity={0.6} weight={1.5} />
            <Polygon points={bar(-1, 0, p)} color={C.g} fillOpacity={0} weight={1.5} strokeStyle="dashed" />
            <Plot.Parametric xy={arc} domain={[0, 1]} color={C.g} style="dashed" weight={2} />
            <Point x={arc(1)[0]} y={arc(1)[1]} color={C.g} />
            <Label at={arc(0.15)} attach="w" color={C.g}>(−1)² = 1</Label>
            <Label at={[1 + W / 2, 1 - 2 * p]} attach="e" color={C.ink} size={12}>1 − 2p</Label>
          </>
        ) : (
          <>
            <Polygon points={bar(-1, 0, p)} color={C.g} fillOpacity={0.6} weight={1.5} />
            <Label at={[-1, p]} attach="n" color={sq ? C.bad : C.g}>{sq ? '(−1)² = −1 ✗' : 'p'}</Label>
          </>
        )}

        {/* the balance point: E(X), or E(X²) once the values are squared */}
        <Line.Segment point1={[marker, 0]} point2={[marker, 1.0]} color={markerColor} style="dashed" weight={2} />
        <Label at={[marker, 1.0]} attach={marker > 0.2 ? 'w' : 'e'} color={markerColor} size={12}>
          {markerName}
        </Label>
      </Plane>
      <Controls>
        <Slider label="p" value={p} onChange={setP} min={0.01} max={0.33} step={0.005} format={v => v.toFixed(3)} />
        <div className="flex flex-wrap items-center gap-2">
          <Toggle
            label="Square the values"
            checked={sq}
            onChange={v => {
              setSq(v)
              if (!v) setSlip(false)
            }}
          />
          <Toggle
            label="Forget that (−1)² = 1"
            checked={slip}
            onChange={v => {
              setSlip(v)
              if (v) setSq(true)
            }}
          />
        </div>
        <Readouts>
          <Readout color={C.good} tex={`\\mathrm{E}(X) = 1 - 4p = ${num(mean, 3)}`} />
          {sq && (
            <Readout
              color={slip ? C.bad : C.good}
              tex={`\\mathrm{E}(X^2) = ${slip ? '1 - 4p' : '1 - 2p'} = ${num(ex2, 3)}`}
            />
          )}
          {sq && (
            <Readout
              color={slip ? C.bad : C.good}
              tex={`\\mathrm{Var}(X) = ${slip ? '4p - 16p^2' : '6p - 16p^2'} = ${num(varX, 3)}${
                slip ? (varX < 0 ? '\\ < 0\\ \\times' : '') : '\\ \\checkmark'
              }`}
            />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
