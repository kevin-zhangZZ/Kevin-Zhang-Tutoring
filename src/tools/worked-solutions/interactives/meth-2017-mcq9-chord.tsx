// 2017 Methods Exam 2 MCQ 9 — the average rate of change of f(x) = x² − 2x over [1, a] is the
// gradient of the chord from (1, −1) to (a, f(a)). Slide a and watch rise and run: the rise is
// always (a − 1)² and the run a − 1, so the gradient is a − 1 and it reaches 8 at a = 9. A toggle
// shows option D's slip — solving f(a) = 8 finds where the curve's HEIGHT is 8 (a = 4), where the
// chord's gradient is only 3.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const f = (x: number) => x * x - 2 * x

export default function Chord() {
  const [a, setA] = useState(6)
  const [showD, setShowD] = useState(false)

  const fa = f(a)
  const rise = fa - f(1)
  const run = a - 1
  const grad = rise / run
  const at9 = Math.abs(a - 9) < 0.03
  const at4 = Math.abs(a - 4) < 0.03
  const chordColor = at9 ? C.good : C.g

  let notice
  if (at9) {
    notice = (
      <Notice tone="good">
        <b>At <M>a = 9</M> the gradient is 8.</b> The chord from <M>(1, -1)</M> to <M>(9, 63)</M> rises <M>64</M> over a
        run of <M>8</M>. The rise is always the run squared, <M>(a-1)^2</M>, which is why the average rate simplifies to{' '}
        <M>a - 1</M>.
      </Notice>
    )
  } else if (showD) {
    notice = (
      <Notice tone="warn">
        <b>Option D solves <M>f(a) = 8</M></b>: that finds where the curve&apos;s <b>height</b> is 8, at <M>a = 4</M>.
        {at4 ? (
          <> But look at the chord: from <M>(1, -1)</M> to <M>(4, 8)</M> it rises <M>9</M> over a run of <M>3</M>, a gradient of only <M>3</M>. </>
        ) : (
          <> Slide <M>a</M> to <M>4</M> and read the chord&apos;s gradient there. </>
        )}
        The question asks about the chord&apos;s gradient, not the height at the end.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The average rate of change over <M>[1, a]</M> is the <b>gradient of this chord</b>: rise over run, where the
        rise starts from <M>f(1) = -1</M>, not from <M>0</M>. Right now it is <M>{`${grad.toFixed(2)}`}</M>. Drag{' '}
        <M>a</M> until it reads <M>8</M>, and compare rise and run as you go.
      </Notice>
    )
  }

  const mid = -1 + 0.75 * rise
  return (
    <div>
      <Plane x={[-0.8, 10]} y={[-8, 75]} xStep={1} yStep={10} height={320}>
        <Plot.OfX y={f} domain={[-0.8, 10]} color={C.f} weight={3} />
        {showD && (
          <>
            <Line.Segment point1={[-0.8, 8]} point2={[10, 8]} color={C.bad} style="dashed" weight={1.5} />
            <Label at={[10, 8]} color={C.bad} attach="nw">f(a) = 8</Label>
            <Point x={4} y={8} color={C.bad} />
          </>
        )}
        <Line.Segment point1={[1, -1]} point2={[1, fa]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[1, fa]} point2={[a, fa]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[1, -1]} point2={[a, fa]} color={chordColor} weight={3} />
        {a >= 3 && (
          <>
            <Label at={[1, mid]} color={C.ink} attach="e" size={12}>{`rise = ${num(rise, 1)}`}</Label>
            <Label at={[(1 + a) / 2, fa]} color={C.ink} attach="n" size={12}>{`run = ${num(run, 1)}`}</Label>
          </>
        )}
        <Point x={1} y={-1} color={chordColor} />
        <Point x={a} y={fa} color={chordColor} />
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={1.1} max={9.5} step={0.05} />
        <Buttons>
          <Toggle label="Set f(a) = 8 instead (option D)" checked={showD} onChange={setShowD} />
        </Buttons>
        <Readouts>
          <Readout color={chordColor} tex={`\\frac{f(a)-f(1)}{a-1} = \\frac{${rise.toFixed(2)}}{${run.toFixed(2)}} = ${grad.toFixed(2)}`} />
          <Readout tex={`f(a) = ${fa.toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
