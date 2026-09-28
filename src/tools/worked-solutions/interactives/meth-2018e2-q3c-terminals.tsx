// 2018 Methods Exam 2 Q3c — the rule h₁(x) = 5 sin((x − 5)π/30) only describes Arch 1 on [5, 35];
// outside that interval the same sine dips below the ground. Slide a 30 m integration window
// [s, s + 30] along the rule: the signed area is largest, 300/π ≈ 95.49, exactly when the window
// matches the arch (s = 5). The report's wrong terminals ∫₀³⁰ pick up a negative piece on [0, 5] and
// miss [30, 35], giving 150√3/π ≈ 82.70 and a stone area of 302 m² instead of 264 m².

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, integrate } from './kit'

const h1 = (x: number) => 5 * Math.sin(((x - 5) * Math.PI) / 30)
const ARCH = 300 / Math.PI
const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1))

export default function Terminals() {
  const [s, setS] = useState(0)
  const b = s + 30
  const area = integrate(h1, s, b, 400)
  const exact = Math.abs(s - 5) < 0.05
  const stone = 550 - 3 * area
  const pos = (x: number) => Math.max(0, h1(x))
  const neg = (x: number) => Math.min(0, h1(x))

  return (
    <div>
      <Plane x={[-5, 45]} y={[-3, 6.5]} xStep={5} yStep={1} height={250}>
        <Plot.OfX y={() => 5} domain={[-5, 45]} color={C.guide} weight={1.5} />
        <Region top={pos} bottom={() => 0} from={s} to={b} color={exact ? C.good : C.f} opacity={0.3} />
        <Region top={() => 0} bottom={neg} from={s} to={b} color={C.bad} opacity={0.35} />
        <Plot.OfX y={h1} domain={[-5, 45]} color={C.guide} weight={2} style="dashed" />
        <Plot.OfX y={h1} domain={[5, 35]} color={C.f} weight={3} />
        <Plot.OfX y={() => 0} domain={[s, b]} color={exact ? C.good : C.g} weight={5} />
        <Line.Segment point1={[s, -3]} point2={[s, 5]} color={exact ? C.good : C.g} style="dashed" weight={1.5} />
        <Line.Segment point1={[b, -3]} point2={[b, 5]} color={exact ? C.good : C.g} style="dashed" weight={1.5} />
        <Label at={[s, 5.8]} attach="w" color={exact ? C.good : C.g}>{`x = ${fmt(s)}`}</Label>
        <Label at={[b, 5.8]} attach="e" color={exact ? C.good : C.g}>{`x = ${fmt(b)}`}</Label>
        <Label at={[20, 2.2]} attach="c" color={C.f}>Arch 1</Label>
      </Plane>
      <Controls>
        <Slider label="s" value={s} onChange={setS} min={-5} max={15} step={0.5} format={v => v.toFixed(1)} />
        <Buttons>
          <ActionButton label="∫ from 0 to 30" onClick={() => setS(0)} />
          <ActionButton label="∫ from 5 to 35" onClick={() => setS(5)} />
        </Buttons>
        <Readouts>
          <Readout color={exact ? C.good : C.g} tex={`\\int_{${s}}^{${b}} h_1(x)\\,dx \\approx ${area.toFixed(2)}`} />
          <Readout color={exact ? C.good : C.g} tex={`550 - 3\\times${area.toFixed(2)} \\approx ${stone.toFixed(1)}\\ \\text{m}^2`} />
        </Readouts>
        {exact ? (
          <Notice tone="good">
            The window now matches the arch exactly, so the integral is the whole opening and nothing else:{' '}
            <M>{'\\int_5^{35} h_1(x)\\,dx = \\tfrac{300}{\\pi} \\approx 95.49'}</M>. Three openings removed from the{' '}
            <M>{'550\\ \\text{m}^2'}</M> rectangle leave <M>{'550 - \\tfrac{900}{\\pi} \\approx 264\\ \\text{m}^2'}</M>.
          </Notice>
        ) : (
          <Notice tone="warn">
            The rule <M>h_1</M> only describes the arch on <M>[5,\ 35]</M>; outside it the same sine carries on below the
            ground (dashed). With these terminals the window picks up red area, which the integral <b>subtracts</b>, and
            misses part of the arch, so it undercounts the opening (<M>{`${area.toFixed(2)} < ${ARCH.toFixed(2)}`}</M>). Slide{' '}
            <M>s</M> to <M>5</M>: the terminals of an area are where that region starts and ends.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
