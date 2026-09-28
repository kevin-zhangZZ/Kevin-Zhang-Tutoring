// 2020 Methods Exam 2 Q2e — the 'no swimming' zone is the part of the river below the line y = 30,
// so each vertical strip of it runs from the south bank f₂ up to whichever is LOWER: the line or the
// north bank f₁. Sweep a strip from x = 50 (P) to x = 150 and watch the roof change: the line until
// x = 200/3, the north bank until x = 400/3, then the line again. Three pieces:
// ∫(30 − f₂) ≈ 85.29, ∫(f₁ − f₂) = 10 × 200/3 = 666.67, ∫(30 − f₂) ≈ 85.29, total ≈ 837.25 (exact
// 2000/3 + 2000(2 − √3)/π, checked with sympy). A toggle shows the wrong idea of taking the whole
// river f₁ − f₂ all the way from 50 to 150, which also counts the swimmable water above the line
// (red) and gives 10 × 100 = 1000. The "area so far" readouts are exact antiderivatives, not
// numerical sums.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Region, Slider,
  Toggle, num, tick, usePlayer,
} from './kit'

const K = Math.PI / 100
const f1 = (x: number) => 20 * Math.cos(K * x) + 40
const f2 = (x: number) => f1(x) - 10
const LINE = 30
const X1 = 200 / 3
const X2 = 400 / 3
const roof = (x: number) => Math.min(LINE, f1(x))
const W = 2.6

// Exact area of the zone from x = 50 to x = b: ∫(30 − f₂)dx = −(2000/π)sin(πx/100) on the two end
// pieces, and ∫(f₁ − f₂)dx = 10x in the middle.
const S = 2000 / Math.PI
const A1 = S * (1 - Math.sqrt(3) / 2) // ≈ 85.29, each end piece
const MID = 10 * (X2 - X1) // = 2000/3
function zoneSoFar(b: number): number {
  if (b <= X1) return S * (1 - Math.sin(K * b))
  if (b <= X2) return A1 + 10 * (b - X1)
  return A1 + MID + S * (Math.sin(K * X2) - Math.sin(K * b))
}

export default function Roof() {
  const [x0, setX0] = useState(60)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setX0, { min: 50, max: 150, seconds: 8 })

  const piece = x0 < X1 ? 1 : x0 <= X2 ? 2 : 3
  const lineRoof = piece !== 2
  const stripTop = wrong ? f1(x0) : roof(x0)
  const stripColor = wrong ? C.bad : lineRoof ? C.violet : C.f
  const s0 = Math.max(50, x0 - W / 2)
  const s1 = Math.min(150, x0 + W / 2)
  const area = zoneSoFar(x0)
  const wrongArea = 10 * (x0 - 50)
  const end = x0 > 149.5
  const nearX1 = Math.abs(x0 - X1) < 1
  const nearX2 = Math.abs(x0 - X2) < 1

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        Using <M>{'f_1 - f_2'}</M> all the way means every strip runs up to the <b>north bank</b>, even where the north
        bank is above the line. The red parts are river <i>above</i> <M>y = 30</M>: swimming water, not the zone. The
        total becomes <M>{'\\int_{50}^{150}\\bigl(f_1 - f_2\\bigr)dx = 10 \\times 100 = 1000'}</M>, which is the whole
        river between <M>x = 50</M> and <M>x = 150</M>. The roof has to switch to the line wherever the bank rises
        above it.
      </Notice>
    )
  } else if (end) {
    notice = (
      <Notice tone="good">
        <b>Done: about 837 m².</b> Two corner pieces with the line as roof, <M>{'\\approx 85.29'}</M> each (mirror
        images of each other about <M>x = 100</M>), and the middle piece where the whole 10 m width of the river is
        below the line, <M>{'10 \\times \\tfrac{200}{3} = \\tfrac{2000}{3} \\approx 666.67'}</M>. Total{' '}
        <M>{'\\approx 837.25'}</M>.
      </Notice>
    )
  } else if (nearX1) {
    notice = (
      <Notice tone="good">
        <b>At <M>{'x = \\tfrac{200}{3}'}</M> the north bank drops below the line</b> (this is where part b&apos;s swimmer
        landed). From here on the line is above the whole river, so the roof of the zone is the north bank itself.
        That is why the integral has to be split here.
      </Notice>
    )
  } else if (nearX2) {
    notice = (
      <Notice tone="good">
        <b>At <M>{'x = \\tfrac{400}{3}'}</M> the north bank climbs back above the line</b>, so the roof switches back
        to <M>y = 30</M>. Split again here. The piece still to come is the mirror image of the first one.
      </Notice>
    )
  } else if (piece === 1) {
    notice = (
      <Notice>
        From P to <M>{'x = \\tfrac{200}{3}'}</M> the north bank is still <i>above</i> the line, so the zone stops at the
        line: its roof is <M>y = 30</M> (violet strip) and each strip is <M>{'30 - f_2(x)'}</M> tall. This corner is
        curved, not a triangle: the south bank sags below the straight edge a triangle would use. Sweep on to see the
        roof change.
      </Notice>
    )
  } else if (piece === 2) {
    notice = (
      <Notice>
        Here the whole river is below the line, so the zone is the <b>full width of the river</b>: roof{' '}
        <M>{'f_1(x)'}</M>, height <M>{'f_1(x) - f_2(x) = 10'}</M> every time (blue strip). This middle piece is a bent
        strip 10 m wide and <M>{'\\tfrac{400}{3} - \\tfrac{200}{3} = \\tfrac{200}{3}'}</M> long, so its area is{' '}
        <M>{'\\tfrac{2000}{3}'}</M> with no integration needed (part d&apos;s idea).
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Past <M>{'x = \\tfrac{400}{3}'}</M> the roof is the line again, until the south bank itself reaches{' '}
        <M>y = 30</M> at <M>x = 150</M> and the zone closes. By symmetry about <M>x = 100</M>, this piece has the same
        area as the first.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, 200]}
        y={[0, 62]}
        xStep={25}
        yStep={10}
        height={290}
        xLabels={v => (Math.abs(v % 50) < 1e-9 ? tick(v) : '')}
        yLabels={v => (Math.abs(v % 20) < 1e-9 && v < 50 ? tick(v) : '')}
      >
        {/* The river, and the whole zone faintly so the target shape is visible before the sweep. */}
        <Region top={f1} bottom={f2} from={0} to={200} color={C.guide} opacity={0.16} />
        <Region top={roof} bottom={f2} from={50} to={150} color={C.violet} opacity={0.08} />
        {/* What has been swept so far. */}
        {wrong ? (
          <>
            <Region top={roof} bottom={f2} from={50} to={x0} color={C.violet} opacity={0.3} />
            <Region top={x => Math.max(f1(x), LINE)} bottom={() => LINE} from={50} to={x0} color={C.bad} opacity={0.4} />
          </>
        ) : (
          <>
            <Region top={() => LINE} bottom={f2} from={50} to={Math.min(x0, X1)} color={C.violet} opacity={0.35} />
            <Region top={f1} bottom={f2} from={X1} to={Math.min(x0, X2)} color={C.f} opacity={0.35} />
            <Region top={() => LINE} bottom={f2} from={X2} to={Math.min(x0, 150)} color={C.violet} opacity={0.35} />
          </>
        )}
        <Line.Segment point1={[X1, 0]} point2={[X1, LINE]} color={C.guide} style="dashed" weight={1.2} />
        <Line.Segment point1={[X2, 0]} point2={[X2, LINE]} color={C.guide} style="dashed" weight={1.2} />
        <Label at={[X1, 0]} attach="n" size={11} gap={5} color={C.guide}>200/3</Label>
        <Label at={[X2, 0]} attach="n" size={11} gap={5} color={C.guide}>400/3</Label>
        <Plot.OfX y={f1} domain={[0, 200]} color={C.f} weight={2.5} />
        <Plot.OfX y={f2} domain={[0, 200]} color={C.g} weight={2.5} />
        <Line.Segment point1={[0, LINE]} point2={[200, LINE]} color={C.bad} style="dashed" weight={2} />
        <Label at={[190, LINE]} attach="n" color={C.bad} size={12}>y = 30</Label>
        <Label at={[176, f1(176)]} attach="nw" color={C.f} size={12}>f₁</Label>
        <Label at={[176, f2(176)]} attach="se" color={C.g} size={12}>f₂</Label>
        <Polygon
          points={[[s0, f2(x0)], [s1, f2(x0)], [s1, stripTop], [s0, stripTop]]}
          color={stripColor}
          fillOpacity={0.85}
          weight={1}
        />
        <Point x={50} y={LINE} color={C.ink} />
        <Label at={[50, LINE]} attach="w" gap={8}>P</Label>
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={50}
          max={150}
          step={0.5}
          format={v => num(v, 1)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep from 50 to 150" />
          <Toggle label="What if I use f₁ − f₂ all the way?" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          {wrong ? (
            <>
              <Readout color={C.bad} tex={`\\text{height} = f_1 - f_2 = 10`} />
              <Readout color={C.bad} tex={`\\int_{50}^{${num(x0, 1)}}\\bigl(f_1 - f_2\\bigr)dx = ${num(wrongArea, 1)}`} />
              <Readout tex={`\\text{zone so far} \\approx ${num(area, 1)}`} />
            </>
          ) : (
            <>
              <Readout
                color={stripColor}
                tex={
                  lineRoof
                    ? `\\text{roof } y = 30:\\ 30 - f_2(x) \\approx ${num(LINE - f2(x0), 2)}`
                    : `\\text{roof } f_1:\\ f_1(x) - f_2(x) = 10`
                }
              />
              <Readout tex={`\\text{area so far} \\approx ${num(area, 1)}${end ? '\\ \\checkmark' : ''}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
