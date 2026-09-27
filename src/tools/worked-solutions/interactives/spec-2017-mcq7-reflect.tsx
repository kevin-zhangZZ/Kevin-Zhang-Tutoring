// 2017 Specialist Exam 2 MCQ 7 — what the substitution u = 2 − x does to the area. Top: the
// region under y = x²√(2 − x) for 1 ≤ x ≤ 2. Bottom: the region under y = (2 − u)²√u
// = 4u^½ − 4u^{3/2} + u^{5/2} for 0 ≤ u ≤ 1. Sweep a strip across: the partner strip at
// u = 2 − x has the same height but moves the OTHER way, which is where dx = −du and the
// reversed terminals (x: 1 → 2 becomes u: 1 → 0) come from. Both areas finish at
// 142/105 ≈ 1.352. A toggle shows option C (20%): its integrand hangs below the axis, because it
// uses the one minus sign twice, and its value is −142/105.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Polygon, Readout, Readouts, Region, Slider, Toggle, Vector,
  integrate, num, usePlayer,
} from './kit'

const fx = (x: number) => x * x * Math.sqrt(Math.max(0, 2 - x))
const P = (u: number) => (2 - u) ** 2 * Math.sqrt(Math.max(0, u))
const EXACT = 142 / 105
const W = 0.03
const XR: [number, number] = [-0.15, 2.15]

function Strip({ at, height, color }: { at: number; height: number; color: string }) {
  const a = at - W / 2
  const b = at + W / 2
  return <Polygon points={[[a, 0], [b, 0], [b, height], [a, height]]} color={color} fillOpacity={0.85} weight={1} />
}

/** Tick numbers on the horizontal axis only: the steep curve near u = 0 would run over the
 *  y-axis numbers, and the heights are read from the strip-height readout instead. mafs's Text
 *  puts attach 'n' below its anchor. */
const TICKS: [number, string][] = [
  [0.5, '1/2'],
  [1, '1'],
  [1.5, '3/2'],
  [2, '2'],
]
function Ticks({ above = false }: { above?: boolean }) {
  return (
    <>
      {TICKS.map(([v, t]) => (
        <Label key={t} at={[v, 0]} attach={above ? 'n' : 's'} size={12}>
          {t}
        </Label>
      ))}
    </>
  )
}

export default function Reflect() {
  const [x, setX] = useState(1.4)
  const [showC, setShowC] = useState(false)
  const player = usePlayer(setX, { min: 1, max: 2, seconds: 6 })
  const u = 2 - x
  const hgt = fx(x)
  const areaX = integrate(fx, 1, x)
  const areaU = integrate(P, u, 1)
  const atStart = x < 1.015
  const atEnd = x > 1.9975
  const bottomY: [number, number] = showC ? [-1.9, 1.9] : [-0.2, 1.9]

  let notice
  if (showC) {
    notice = (
      <Notice tone="warn">
        <b>Option C</b> is <M>{'\\int_0^1\\left(-4u^{\\frac12}+4u^{\\frac32}-u^{\\frac52}\\right)du'}</M>. It has turned the
        terminals round to <M>0</M> to <M>1</M> <i>and</i> kept the minus sign from <M>dx = -du</M> inside the bracket.
        That uses the one minus sign twice, so the integrand hangs <b>below</b> the axis and C works out to{' '}
        <M>{'-\\tfrac{142}{105} \\approx -1.352'}</M>. The original integral is an area above the axis, so it must be
        positive: C can&apos;t be right.
      </Notice>
    )
  } else if (atStart) {
    notice = (
      <Notice>
        Both strips start at the same place: <M>x = 1</M> gives <M>u = 2 - 1 = 1</M>. The orange region is the blue one
        reflected in the dashed line at <M>1</M>, because <M>u = 2 - x</M> sends <M>1 + d</M> to <M>1 - d</M>. Press{' '}
        <b>Sweep</b> (or drag the slider) and watch which way each strip moves.
      </Notice>
    )
  } else if (atEnd) {
    notice = (
      <Notice tone="good">
        <M>x</M> ran from <M>1</M> to <M>2</M>, so <M>u</M> ran from <M>1</M> to <M>0</M>: <b>backwards</b>. The substitution
        records that honestly as <M>{'\\int_1^0(\\ldots)(-du) = -\\int_1^0(\\ldots)\\,du'}</M>, which is option D. The
        reversed terminals and the <M>-du</M> are two minus signs that cancel, so D is the same as{' '}
        <M>{'\\int_0^1(\\ldots)\\,du'}</M>, the orange area <M>\approx 1.352</M>. Turning the terminals round to go from{' '}
        <M>0</M> to <M>1</M> is allowed, but it costs the minus from <M>-du</M>. Option C turns them round <i>and</i> keeps
        the minus as well: one minus sign spent twice.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>x</M> has moved <b>right</b> to <M>{num(x)}</M>, so <M>u = 2 - x</M> has moved <b>left</b> to <M>{num(u)}</M>.
        Every step <M>dx</M> to the right is a step of the same size to the left in <M>u</M>: that is <M>dx = -du</M>. The
        two strips always have the same height, because <M>(2 - u)^2\sqrt u</M> is just <M>x^2\sqrt{'{2-x}'}</M> written in
        terms of <M>u</M>. So the two shaded areas, mirror images in the dashed line at <M>1</M>, grow together.
      </Notice>
    )
  }

  return (
    <div>
      <p className="text-[12px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
        <span style={{ color: C.f }}>
          In <i>x</i>: y = x²√(2 − x), 1 ≤ x ≤ 2
        </span>
      </p>
      <Plane x={XR} y={[-0.2, 1.9]} xStep={0.5} yStep={0.5} height={190} labels={false}>
        <Ticks />
        <Region top={fx} bottom={() => 0} from={1} to={x} color={C.f} opacity={0.3} />
        <Plot.OfX y={fx} domain={[1, 2]} color={C.f} weight={3} />
        <Line.Segment point1={[1, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Strip at={x} height={hgt} color={C.f} />
        {!atEnd && <Vector tail={[x + 0.04, 1.72]} tip={[x + 0.3, 1.72]} color={C.f} weight={2} />}
        {!atEnd && <Label at={[x + 0.3, 1.72]} color={C.f} attach="e" size={12}>x</Label>}
      </Plane>
      <p className="text-[12px] font-semibold text-gray-600 dark:text-gray-300 mt-3 mb-1">
        <span style={{ color: showC ? C.bad : C.g }}>
          In <i>u</i>: y = {showC ? '−' : ''}(2 − u)²√u, 0 ≤ u ≤ 1
        </span>
      </p>
      <Plane x={XR} y={bottomY} xStep={0.5} yStep={0.5} height={showC ? 250 : 190} xLabel="u" labels={false}>
        <Ticks above={showC} />
        {showC ? (
          <>
            <Region top={() => 0} bottom={t => -P(t)} from={0} to={1} color={C.bad} opacity={0.25} />
            <Plot.OfX y={t => -P(t)} domain={[0, 1]} color={C.bad} weight={3} />
          </>
        ) : (
          <>
            <Region top={P} bottom={() => 0} from={u} to={1} color={C.g} opacity={0.3} />
            <Plot.OfX y={P} domain={[0, 1]} color={C.g} weight={3} />
            <Strip at={u} height={P(u)} color={C.g} />
            {!atEnd && <Vector tail={[u - 0.04, 1.72]} tip={[u - 0.3, 1.72]} color={C.g} weight={2} />}
            {!atEnd && <Label at={[u - 0.3, 1.72]} color={C.g} attach="w" size={12}>u</Label>}
          </>
        )}
        <Line.Segment point1={[1, 0]} point2={[1, showC ? -1 : 1]} color={C.guide} style="dashed" weight={1.5} />
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x}
          onChange={v => {
            player.stop()
            setX(v)
          }}
          min={1}
          max={2}
          step={0.005}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x)} label="Sweep x from 1 to 2" />
          <Toggle label="Show option C" checked={showC} onChange={setShowC} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`x = ${num(x)}`} />
          <Readout color={C.g} tex={`u = 2 - x = ${num(u)}`} />
          <Readout tex={`\\text{strip height} = ${num(hgt, 3)}`} />
        </Readouts>
        <Readouts>
          <Readout color={C.f} tex={`\\int_1^{${num(x)}} x^2\\sqrt{2-x}\\,dx \\approx ${num(areaX, 3)}`} />
          {showC ? (
            <Readout color={C.bad} tex={`\\text{C} = \\int_0^1 -(2-u)^2\\sqrt u\\,du \\approx ${num(-EXACT, 3)}`} />
          ) : (
            <Readout color={C.g} tex={`\\int_{${num(u)}}^{1} (2-u)^2\\sqrt u\\,du \\approx ${num(areaU, 3)}`} />
          )}
          {atEnd && !showC && <Readout color={C.good} tex={`\\tfrac{142}{105} \\approx ${num(EXACT, 3)}\\ \\checkmark`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
