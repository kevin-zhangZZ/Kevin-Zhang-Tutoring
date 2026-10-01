// 2023 Methods Exam 2 Q4j — g(w) = a f(w/b) stretches the graph of f sideways by b and upwards by
// a. Two conditions pin down a and b: the area ab must stay 1 (so g is a density), and the mean,
// which moves with the sideways stretch to b·E(V), must be 2π² + 8. A preset shows the common
// wrong answer a = 2/3, b = 1: it makes ∫ w g(w) dw = 2π² + 8, but the area is only 2/3 and the
// balance point hasn't moved. A toggle locks a = 1/b so the mean can be explored on its own.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle } from './kit'

const T = 3 * Math.PI ** 2 + 30 // top of f's interval, ≈ 59.61
const EV = 3 * Math.PI ** 2 + 12 // E(V) ≈ 41.61
const TARGET = 2 * Math.PI ** 2 + 8 // ≈ 27.74
const PEAK_V = 30 + 3 * (Math.PI / 2) ** 2 // where f is highest
const f = (v: number) => (v >= 30 && v <= T ? Math.sin(Math.sqrt((v - 30) / 3)) / (6 * Math.PI) : 0)
const same = (x: number, y: number) => Math.abs(x - y) < 1e-6

/** A value as a fraction with a small denominator when it is one, else 2 dp. */
function frac(v: number): string {
  for (let d = 1; d <= 20; d++) {
    const n = Math.round(v * d)
    if (Math.abs(v * d - n) < 1e-6) return d === 1 ? String(n) : `${n}/${d}`
  }
  return v.toFixed(2)
}

export default function Dilate() {
  const [aFree, setA] = useState(1)
  const [b, setB] = useState(1)
  const [lock, setLock] = useState(false)

  const a = lock ? 1 / b : aFree
  const g = (w: number) => a * f(w / b)
  const area = a * b
  const moment = a * b * b * EV // ∫ w g(w) dw
  const centre = b * EV // the balance point of g's graph

  const isF = same(a, 1) && same(b, 1)
  const isWrong = same(a, 2 / 3) && same(b, 1)
  const isRight = same(a, 3 / 2) && same(b, 2 / 3)
  const areaOne = same(area, 1)

  let notice
  if (isF) {
    notice = (
      <Notice>
        Right now <M>g = f</M>: area 1 and mean <M>{'3\\pi^2+12 \\approx 41.61'}</M>. Grade B serves are slower (mean{' '}
        <M>{'2\\pi^2+8 \\approx 27.74'}</M>), so the graph must move left. Drag <M>b</M> below 1 to squeeze it towards
        the vertical axis, and watch what happens to the area.
      </Notice>
    )
  } else if (isWrong) {
    notice = (
      <Notice tone="warn">
        <b>The common wrong answer.</b> It does make <M>{'\\int w\\,g(w)\\,dw = \\tfrac23(3\\pi^2+12) = 2\\pi^2+8'}</M>,
        but the area is only <M>{'\\tfrac23'}</M>, so <M>g</M> is not a density and that integral is not its mean. A
        vertical squash can&apos;t move the balance point: it is still at <M>41.61</M>.
      </Notice>
    )
  } else if (isRight) {
    notice = (
      <Notice tone="good">
        <b>Both conditions hold.</b> <M>{'ab = \\tfrac32\\times\\tfrac23 = 1'}</M>, so <M>g</M> is a density, and its
        mean is <M>{'b\\,\\mathrm{E}(V) = \\tfrac23\\times3(\\pi^2+4) = 2\\pi^2+8'}</M>. So{' '}
        <M>{'a = \\tfrac32'}</M> and <M>{'b = \\tfrac23'}</M>.
      </Notice>
    )
  } else if (areaOne) {
    notice = (
      <Notice>
        Area <M>ab = 1</M>, so <M>g</M> is a density. Its graph is <M>f</M> stretched sideways by <M>b</M>, so every
        speed, and the mean, is multiplied by <M>b</M>: mean <M>{`= b\\,\\mathrm{E}(V) \\approx ${centre.toFixed(2)}`}</M>.
        That is {centre > TARGET ? 'above' : 'below'} the target <M>27.74</M>: find the <M>b</M> that puts the balance
        point on the green line.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Area <M>{`= ab = ${frac(area)}`}</M>, not 1, so <M>g</M> is not a density. Stretching sideways by <M>b</M>{' '}
        multiplies the area by <M>b</M>, and stretching upwards by <M>a</M> multiplies it by <M>a</M>. Turn on
        &ldquo;Keep area 1&rdquo; (<M>{'a = \\tfrac1b'}</M>) and then look for the right <M>b</M>.
      </Notice>
    )
  }

  const gPeak: [number, number] = [b * PEAK_V, a * f(PEAK_V)]
  const fPeak: [number, number] = [PEAK_V, f(PEAK_V)]
  const near = Math.abs(gPeak[0] - fPeak[0]) < 6 && Math.abs(gPeak[1] - fPeak[1]) < 0.012

  return (
    <div>
      <Plane x={[0, 70]} y={[0, 0.11]} xStep={10} yStep={0.02} height={300} xLabel="w" yLabel="" yLabels={v => (v > 0.11 ? '' : v.toFixed(2))}>
        <Region top={g} bottom={() => 0} from={30 * b} to={T * b} color={C.f} opacity={0.18} />
        <Plot.OfX y={f} domain={[30, T]} color={C.guide} weight={2} style="dashed" />
        <Plot.OfX y={g} domain={[30 * b, T * b]} color={C.f} weight={3} />
        <Line.Segment point1={[TARGET, 0]} point2={[TARGET, 0.1]} color={C.good} style="dashed" weight={2} />
        <Label at={[TARGET, 0.1]} attach="w" color={C.good} size={12}>2π² + 8</Label>
        <Line.Segment point1={[centre, 0]} point2={[centre, g(centre)]} color={C.f} weight={2} />
        <Label at={[centre, g(centre) * 0.3]} attach={centre > 45 ? 'w' : 'e'} color={C.f} size={12}>b·E(V)</Label>
        {isF ? (
          <Label at={fPeak} attach="n" color={C.f}>g = f</Label>
        ) : (
          <>
            {!near && <Label at={fPeak} attach="n" color={C.guide}>f</Label>}
            <Label at={gPeak} attach="n" color={C.f}>g</Label>
          </>
        )}
      </Plane>
      <Controls>
        {lock ? (
          <Readouts>
            <Readout tex={`a = \\tfrac1b = ${frac(a)}`} />
          </Readouts>
        ) : (
          <Slider label="a" value={aFree} onChange={setA} min={0.5} max={2} step={1 / 12} format={frac} />
        )}
        <Slider label="b" value={b} onChange={setB} min={0.5} max={1.5} step={1 / 12} format={frac} />
        <Buttons>
          <Toggle label="Keep area 1 (a = 1/b)" checked={lock} onChange={setLock} />
          <ActionButton
            label="Common answer: a = 2/3, b = 1"
            onClick={() => {
              setLock(false)
              setA(2 / 3)
              setB(1)
            }}
          />
          <ActionButton
            label="a = 3/2, b = 2/3"
            onClick={() => {
              setLock(false)
              setA(3 / 2)
              setB(2 / 3)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout color={areaOne ? C.good : C.bad} tex={`\\text{area} = ab = ${frac(area)}`} />
          <Readout tex={`\\int w\\,g(w)\\,dw = ${moment.toFixed(2)}`} />
          <Readout color={C.f} tex={`\\text{balance point} = b\\,\\mathrm{E}(V) = ${centre.toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
