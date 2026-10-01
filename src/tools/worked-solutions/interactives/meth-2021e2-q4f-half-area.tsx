// 2021 Methods Exam 2 Q4f — the median is where the area under f reaches one half. Slide m: the
// area up to m is m²/1000 while m < 20, and 0.4 + ∫₂₀ᵐ (50 − x)/750 dx = 1 − (50 − m)²/1500 after
// that. It opens at m = 20, where the first rule has used up only 0.4 of the area, which is why
// the median needs the second rule (the remaining 0.1) and lands at m = 50 − 5√30 ≈ 22.6. A toggle
// shows the report's wrong set-up ∫₀ᵐ x/500 dx + ∫₂₀ᵐ (50 − x)/750 dx = ½: it keeps integrating
// x/500 past 20 (the dashed red extension), so it adds ∫₂₀ᵐ x/500 dx of area that isn't under f
// and reaches ½ too early, at m ≈ 21.24 (sympy).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Point, Readout, Readouts, Region, Slider, Toggle, num } from './kit'

const f1 = (x: number) => x / 500
const f2 = (x: number) => (50 - x) / 750
const f = (x: number) => (x < 0 ? 0 : x < 20 ? f1(x) : x <= 50 ? f2(x) : 0)
// Pr(X ≤ m), exact.
const F = (m: number) => (m <= 0 ? 0 : m < 20 ? (m * m) / 1000 : m <= 50 ? 1 - (50 - m) ** 2 / 1500 : 1)
// The wrong set-up: ∫₀ᵐ x/500 dx + ∫₂₀ᵐ (50 − x)/750 dx (the second integral runs backwards if m < 20).
const wrong = (m: number) => (m * m) / 1000 + (50 * (m - 20) - (m * m - 400) / 2) / 750
const MED = 50 - 5 * Math.sqrt(30)
const W_ROOT = 21.2435565298214
const Y_TOP = 0.05

export default function HalfArea() {
  const [m, setM] = useState(20)
  const [bad, setBad] = useState(false)
  const area = F(m)
  const past20 = m > 20.05
  const atMed = Math.abs(m - MED) < 0.06
  const at20 = Math.abs(m - 20) <= 0.05
  const wv = wrong(m)
  const wrongHit = bad && Math.abs(m - W_ROOT) < 0.06
  const lineColor = bad ? (wrongHit ? C.bad : C.ink) : atMed ? C.good : C.ink

  let notice
  if (bad) {
    notice = !past20 ? (
      <Notice tone="warn">
        This set-up only pretends to make sense once <M>m</M> is past 20 (for smaller <M>m</M>,{' '}
        <M>{'\\int_{20}^{m}'}</M> runs backwards and is negative). Drag <M>m</M> to about 22.
      </Notice>
    ) : (
      <Notice tone="warn">
        Past 20 this set-up keeps integrating <M>{'\\tfrac{x}{500}'}</M> (the dashed red line), but <M>f</M> is no longer{' '}
        <M>{'\\tfrac{x}{500}'}</M> there. The red area, <M>{`\\int_{20}^{m}\\tfrac{x}{500}\\,dx = ${num(wv - area, 3)}`}</M>, is
        not under <M>f</M> at all, yet it is added on. So the total reaches <M>{'\\tfrac12'}</M> too early, at{' '}
        <M>{'m \\approx 21.2'}</M>. Writing <M>{'\\int_0^m f(x)\\,dx = \\tfrac12'}</M> with <M>f</M> defined piecewise on CAS
        avoids this.
      </Notice>
    )
  } else if (atMed) {
    notice = (
      <Notice tone="good">
        <b>Half the area on each side.</b> <M>{'0.4 + 0.1 = 0.5'}</M>, so the median is{' '}
        <M>{'m = 50 - 5\\sqrt{30} \\approx 22.6'}</M>. The mean, <M>{'\\tfrac{70}{3} \\approx 23.3'}</M>, is a different
        point: the long right tail pulls the balance point further right than the half-way point.
      </Notice>
    )
  } else if (at20) {
    notice = (
      <Notice>
        At <M>m = 20</M> the first rule is used up, and it holds only <M>{'\\int_0^{20}\\tfrac{x}{500}\\,dx = 0.4'}</M>,
        less than half. So the median is <b>past 20</b>, and the remaining <M>0.1</M> must come from the second rule:{' '}
        <M>{'\\int_{20}^{m}\\tfrac{50-x}{750}\\,dx = 0.1'}</M>. Drag <M>m</M> right until the total is 0.5.
      </Notice>
    )
  } else if (m < 20) {
    notice = (
      <Notice>
        Left of 20 only <M>{'\\tfrac{x}{500}'}</M> applies: the area so far is <M>{`\\tfrac{m^2}{1000} = ${num(area, 3)}`}</M>.
        Drag <M>m</M> to 20 and see how much of the area the first rule holds.
      </Notice>
    )
  } else if (m < MED) {
    notice = (
      <Notice>
        The orange strip comes from the second rule. The total is <M>{`${num(area, 3)}`}</M>, still under{' '}
        <M>{'\\tfrac12'}</M>. Keep going.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The total is <M>{`${num(area, 3)}`}</M>, past <M>{'\\tfrac12'}</M>: you have gone beyond the median. Drag back. Then
        turn on the wrong set-up to see what it does.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 52]} y={[0, Y_TOP]} xStep={10} yStep={0.01} height={300} xLabel="x" yLabel="y">
        {bad && past20 && <Region top={f1} bottom={() => 0} from={20} to={m} color={C.bad} opacity={0.22} />}
        <Region top={f} bottom={() => 0} from={0} to={Math.min(m, 20)} color={C.f} opacity={0.3} />
        {past20 && <Region top={f} bottom={() => 0} from={20} to={m} color={C.g} opacity={0.4} />}
        <Line.Segment point1={[0, 0]} point2={[20, 0.04]} color={C.f} weight={3} />
        <Line.Segment point1={[20, 0.04]} point2={[50, 0]} color={C.f} weight={3} />
        {bad && past20 && (
          <Line.Segment point1={[20, 0.04]} point2={[m, f1(m)]} color={C.bad} style="dashed" weight={2} />
        )}
        <Label at={[35, f2(35)]} color={C.f} attach="ne">y = f(x)</Label>
        <Line.Segment point1={[m, 0]} point2={[m, Y_TOP]} color={lineColor} style="dashed" weight={2} />
        <Point x={m} y={0} color={lineColor} />
        <Label at={[m, Y_TOP * 0.93]} color={lineColor} attach={m > 40 ? 'w' : 'e'}>{`m = ${num(m, 1)}`}</Label>
        {!bad && m > 8 && m < 20 && <Label at={[(m * 2) / 3, f1(m) / 3]} color={C.f} attach="c" size={12}>{num(area, 3)}</Label>}
      </Plane>
      <Controls>
        <Slider label="m" value={m} onChange={setM} min={0} max={50} step={0.1} format={v => v.toFixed(1)} />
        <Toggle label="Show the wrong set-up from the report" checked={bad} onChange={setBad} />
        <Readouts>
          {past20 ? (
            <>
              <Readout color={C.f} tex={`\\int_0^{20}\\tfrac{x}{500}\\,dx = 0.4`} />
              <Readout color={C.g} tex={`\\int_{20}^{${num(m, 1)}}\\tfrac{50-x}{750}\\,dx = ${num(area - 0.4, 3)}`} />
            </>
          ) : (
            <Readout color={C.f} tex={`\\int_0^{${num(m, 1)}}\\tfrac{x}{500}\\,dx = ${num(area, 3)}`} />
          )}
          <Readout color={atMed && !bad ? C.good : undefined} tex={`\\Pr(X \\le ${num(m, 1)}) = ${num(area, 3)}`} />
          {bad && (
            <Readout
              color={C.bad}
              tex={`\\int_0^{m}\\tfrac{x}{500}\\,dx + \\int_{20}^{m}\\tfrac{50-x}{750}\\,dx = ${num(wv, 3)}`}
            />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
