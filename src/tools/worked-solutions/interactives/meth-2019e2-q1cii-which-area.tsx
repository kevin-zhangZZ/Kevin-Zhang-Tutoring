// 2019 Methods Exam 2 Q1c.ii — what each integral actually measures. The tangent at x = −1 is
// the horizontal line y = 1/e, which touches f(x) = x²e^(−x²) at both peaks x = ±1. Pick a
// set-up and the region it adds up is shaded with its value: the correct ∫₋₁¹(1/e − f) dx
// ≈ 0.3568, the report's alternative (rectangle 2/e minus the area under f), and the three
// incorrect set-ups the examination report lists — ∫₀¹ (half the region, 0.1784), ∫₋₁¹ f alone
// (the area under the curve, 0.3789) and ∫₋₁¹ (f − 1/e) (the right region, but −0.3568).

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Region, Toggle, integrate } from './kit'

const f = (x: number) => x * x * Math.exp(-x * x)
const T = 1 / Math.E
const line = () => T

const UNDER = integrate(f, -1, 1, 800) // ≈ 0.3789
const AREA = 2 * T - UNDER // ≈ 0.3568
const HALF = AREA / 2 // ≈ 0.1784

type Mode = 'right' | 'rect' | 'half' | 'under' | 'reversed'
const MODES: { key: Mode; label: string }[] = [
  { key: 'right', label: 'Line − curve, −1 to 1' },
  { key: 'rect', label: 'Rectangle − area under f' },
  { key: 'half', label: 'Line − curve, 0 to 1' },
  { key: 'under', label: 'Curve alone' },
  { key: 'reversed', label: 'Curve − line' },
]

export default function WhichArea() {
  const [mode, setMode] = useState<Mode>('right')
  const wrong = mode === 'half' || mode === 'under' || mode === 'reversed'

  let readout: string
  let notice
  if (mode === 'right') {
    readout = `\\int_{-1}^{1}\\left(\\tfrac1e - x^2e^{-x^2}\\right)dx \\approx ${AREA.toFixed(4)}`
    notice = (
      <Notice tone="good">
        Between the two points of contact the tangent is on top, so each thin vertical strip has height{' '}
        <M>{'\\tfrac1e - f(x)'}</M>. Adding the strips from <M>-1</M> to <M>1</M> gives the enclosed area,{' '}
        <M>{`\\approx ${AREA.toFixed(4)}`}</M>. Now try the other set-ups and see what each one really adds up.
      </Notice>
    )
  } else if (mode === 'rect') {
    readout = `\\tfrac2e - \\int_{-1}^{1}x^2e^{-x^2}dx \\approx ${AREA.toFixed(4)}`
    notice = (
      <Notice tone="good">
        The same region found another way, the report&apos;s other method. The violet rectangle under the tangent
        from <M>-1</M> to <M>1</M> has area <M>{'2\\times\\tfrac1e \\approx 0.7358'}</M>. Take away the blue area
        under the curve, <M>{`\\approx ${UNDER.toFixed(4)}`}</M>, and what&apos;s left is the gap:{' '}
        <M>{`\\approx ${AREA.toFixed(4)}`}</M>.
      </Notice>
    )
  } else if (mode === 'half') {
    readout = `\\int_{0}^{1}\\left(\\tfrac1e - x^2e^{-x^2}\\right)dx \\approx ${HALF.toFixed(4)}`
    notice = (
      <Notice tone="warn">
        Starting at <M>0</M> only collects the right half of the region; the grey half is missed. The graph is
        symmetric about the <M>y</M>-axis, so this is exactly half the answer. The region runs between the two points
        where the tangent touches, <M>x = -1</M> and <M>x = 1</M>, not from the minimum at the origin.
      </Notice>
    )
  } else if (mode === 'under') {
    readout = `\\int_{-1}^{1}x^2e^{-x^2}dx \\approx ${UNDER.toFixed(4)}`
    notice = (
      <Notice tone="warn">
        This adds up the strips between the curve and the <M>x</M>-axis. The tangent never enters the calculation,
        so it can&apos;t be the area enclosed by the curve <em>and the tangent</em>. That area is the gap between those
        two graphs (outlined in grey).
      </Notice>
    )
  } else {
    readout = `\\int_{-1}^{1}\\left(x^2e^{-x^2} - \\tfrac1e\\right)dx \\approx ${(-AREA).toFixed(4)}`
    notice = (
      <Notice tone="warn">
        Right region, but upside down: on <M>(-1, 1)</M> the curve is <em>below</em> the line, so every strip height{' '}
        <M>{'f(x) - \\tfrac1e'}</M> is negative and the integral comes out negative. An area can&apos;t be negative,
        which is the signal to use upper minus lower.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.4, 2.4]} y={[-0.08, 0.5]} xStep={1} yStep={0.1} height={290} yLabels={v => (Math.round(v * 10) % 2 === 0 ? v.toFixed(1) : "")}>
        {/* the correct region, as a faint outline for the wrong set-ups */}
        {(mode === 'under' || mode === 'half') && (
          <Region top={line} bottom={f} from={-1} to={mode === 'half' ? 0 : 1} color={C.guide} opacity={0.3} />
        )}
        {mode === 'right' && <Region top={line} bottom={f} from={-1} to={1} color={C.good} opacity={0.35} />}
        {mode === 'rect' && (
          <>
            <Polygon points={[[-1, 0], [1, 0], [1, T], [-1, T]]} color={C.violet} fillOpacity={0.2} weight={2} />
            <Region top={f} bottom={() => 0} from={-1} to={1} color={C.f} opacity={0.45} />
          </>
        )}
        {mode === 'half' && <Region top={line} bottom={f} from={0} to={1} color={C.bad} opacity={0.35} />}
        {mode === 'under' && <Region top={f} bottom={() => 0} from={-1} to={1} color={C.bad} opacity={0.35} />}
        {mode === 'reversed' && <Region top={line} bottom={f} from={-1} to={1} color={C.bad} opacity={0.35} />}
        {mode === 'half' && <Line.Segment point1={[0, 0]} point2={[0, T]} color={C.bad} style="dashed" weight={2} />}

        <Line.Segment point1={[-2.6, T]} point2={[2.6, T]} color={C.g} weight={2.5} />
        <Plot.OfX y={f} domain={[-2.6, 2.6]} color={C.f} weight={3} />
        <Point x={-1} y={T} color={C.g} />
        <Point x={1} y={T} color={C.g} />
        <Label at={[-2.3, T]} color={C.g} attach="ne">
          y = 1/e
        </Label>
        <Label at={[1.9, f(1.9)]} color={C.f} attach="ne">
          f
        </Label>
      </Plane>
      <Controls>
        <Buttons>
          {MODES.map(m => (
            <Toggle key={m.key} label={m.label} checked={mode === m.key} onChange={() => setMode(m.key)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout color={wrong ? C.bad : C.good} tex={readout} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
