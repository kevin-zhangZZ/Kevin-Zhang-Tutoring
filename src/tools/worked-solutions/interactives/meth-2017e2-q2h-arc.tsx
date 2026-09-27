// 2017 Methods Exam 2 Q2g–h — the angle the wheel turns while the boat is in view, built up in
// the order a teacher would draw it. (1) P₁ is on the line CB, so the radius CP₁ points at the
// boat, θ ≈ 7.41° below the horizontal through C (alternate angles with θ at B). (2) P₂B is a
// tangent, so the radius CP₂ is perpendicular to it; the sight line falls at α ≈ 13.67° (the same
// α as at B, shown at P₂), so CP₂ rises at 90° − α ≈ 76.33°. (3) The turn from P₁ to P₂ is
// θ + (90° − α) ≈ 83.74°. (4) At 12° a minute, that is 6.98 ≈ 7 minutes — ride the wheel and
// check it against h(t): P reaches P₁ at t ≈ 6.88 and P₂ at t ≈ 13.86. After P₂ the Notice says
// the sight line cuts back through the wheel only while it really does (until t ≈ 29.9); the ride
// ends with its own summary, since at the bottom the line to B clears the wheel again.
//
// Drawn to scale (equal axes) around the wheel; B is 500 m away, off the right-hand edge.

import { useEffect, useRef, useState } from 'react'
import {
  C, Circle, Controls, Label, Line, M, Notice, Plane, PlayButton, Point, Polygon, Polyline, Readout, Readouts, Slider,
  StepNav, Text, clamp, num, usePlayer, useSteps, type vec,
} from './kit'

const R = 55
const YC = 65
const BX = 500
const N = Math.PI / 15 // radians turned per minute
const U_STAR = (60500 + 5720 * Math.sqrt(157)) / 10169
const V_STAR = Math.sqrt(R * R - U_STAR * U_STAR) + YC
const THETA = Math.atan(YC / BX) // ≈ 7.4069°
const ALPHA = Math.atan(U_STAR / Math.sqrt(R * R - U_STAR * U_STAR)) // ≈ 13.6693°
const DEG = 180 / Math.PI
const PHI1 = -THETA // direction of CP₁ from C
const PHI2 = Math.PI / 2 - ALPHA // direction of CP₂ from C
const P1: vec.Vector2 = [R * Math.cos(PHI1), YC + R * Math.sin(PHI1)]
const P2: vec.Vector2 = [U_STAR, V_STAR]
const T1 = (PHI1 + Math.PI / 2) / N // ≈ 6.88 min
const T2 = (PHI2 + Math.PI / 2) / N // ≈ 13.86 min
const XL = -60
const XR = 110
const YB = -9
const YT = 135
const TURN = (PHI2 - PHI1) * DEG // ≈ 83.74°

// Tick numbers drawn here rather than by the plane, so the y numbers can sit LEFT of the axis: the
// radius CP₂ and the angle 90° − α run just to the right of it and crossed the 80 and 100 there.
// Left out: −60 (cut in half at the edge), y = 60 (beside C) and y = 120 (on top of the wheel).
// mafs Text puts attach "n" text below its point; with a hanging baseline 5 px down, the x numbers
// sit exactly where the plane's own would.
function Ticks() {
  return (
    <>
      {[-40, -20, 20, 40, 60, 80, 100].map(v => (
        <Text key={`x${v}`} x={v} y={0} attach="n" attachDistance={5} color={C.ink} size={12} svgTextProps={{ dominantBaseline: 'hanging' }}>
          {String(v).replace('-', '−')}
        </Text>
      ))}
      {[20, 40, 80, 100].map(v => (
        <Text key={`y${v}`} x={0} y={v} attach="w" attachDistance={5} color={C.ink} size={12}>
          {String(v)}
        </Text>
      ))}
    </>
  )
}

// Height that fits the to-scale view exactly to the widget's width, so an equal-scale plane
// neither letterboxes nor stretches the y-range (the Explore box is ~290 px wide on a laptop and
// ~360 px on a phone).
function useFitHeight(aspect: number, min = 220, max = 340) {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(260)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect.width ?? 0
      if (w > 0) setHeight(clamp(Math.round(w / aspect), min, max))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [aspect, min, max])
  return [ref, height] as const
}

function arc(c: vec.Vector2, r: number, a0: number, a1: number, n = 40): vec.Vector2[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / n
    return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)] as vec.Vector2
  })
}
const polar = (c: vec.Vector2, r: number, a: number): vec.Vector2 => [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]

export default function ArcWidget() {
  const steps = useSteps(4)
  const [boxRef, plotHeight] = useFitHeight((XR - XL + 0.4) / (YT - YB + 0.4))
  const [t, setT] = useState(T1 - 1.5)
  const player = usePlayer(setT, { min: 0, max: 30, seconds: 12 })
  const s = steps.step

  // The two sight lines, each run from its point on the wheel to the right-hand edge of the view.
  const lineCB: [vec.Vector2, vec.Vector2] = [[0, YC], [XR, YC - Math.tan(THETA) * XR]]
  const lineP2B: [vec.Vector2, vec.Vector2] = [P2, [XR, V_STAR - Math.tan(ALPHA) * (XR - U_STAR)]]

  // Step 4: the capsule's position at time t (anticlockwise from the bottom).
  const phi = -Math.PI / 2 + N * t
  const P: vec.Vector2 = [R * Math.cos(phi), YC + R * Math.sin(phi)]
  const visible = t >= T1 - 1e-9 && t <= T2 + 1e-9
  const inView = Math.max(0, Math.min(t, T2) - T1)
  const turned = Math.max(0, Math.min(phi, PHI2) - PHI1) * DEG
  // Does the line from P to B pass back through the wheel? It does when it leaves P heading into
  // the circle: (P − C)·(B − P) < 0. True from P₂ round to the lower tangent point, near the
  // bottom at t ≈ 29.9, so the last moments of the ride need their own message.
  const cutsWheel = P[0] * (BX - P[0]) + (P[1] - YC) * (0 - P[1]) < 0
  // Right-angle mark at P₂: one side back along the radius, one along the tangent towards B.
  const k = 6
  const inward: vec.Vector2 = [-Math.cos(PHI2) * k, -Math.sin(PHI2) * k]
  const along: vec.Vector2 = [Math.cos(-ALPHA) * k, Math.sin(-ALPHA) * k]
  const sq: vec.Vector2[] = [
    [P2[0] + inward[0], P2[1] + inward[1]],
    [P2[0] + inward[0] + along[0], P2[1] + inward[1] + along[1]],
    [P2[0] + along[0], P2[1] + along[1]],
  ]

  let notice
  if (s === 0) {
    notice = (
      <Notice>
        <b>Where is <M>{'P_1'}</M>?</b> The question puts it on the line from <M>C</M> to <M>B</M>, so the radius{' '}
        <M>{'CP_1'}</M> points straight at the boat. The dashed horizontal through <M>C</M> is parallel to the ground,
        so the line <M>CB</M> dips below it by the same angle <M>\theta</M> it makes with the ground at <M>B</M>{' '}
        (alternate angles). From part d, <M>{'\\theta \\approx 7.41^\\circ'}</M>: <M>{'CP_1'}</M> is{' '}
        <M>{'7.41^\\circ'}</M> <i>below</i> the horizontal.
      </Notice>
    )
  } else if (s === 1) {
    notice = (
      <Notice>
        <b>Where is <M>{'P_2'}</M>?</b> The sight line <M>{'P_2B'}</M> falls at <M>\alpha</M> to every horizontal,
        including the short one drawn at <M>{'P_2'}</M>, which is why <M>{'\\tan\\alpha'}</M> is the size of its gradient
        (part g). It is a tangent, so it meets the radius <M>{'CP_2'}</M> at a right angle. Turn the sight line through{' '}
        <M>{'90^\\circ'}</M> and you get the radius: <M>{'CP_2'}</M> rises{' '}
        <M>{'90^\\circ - \\alpha \\approx 76.33^\\circ'}</M> <i>above</i> the horizontal.
      </Notice>
    )
  } else if (s === 2) {
    notice = (
      <Notice tone="good">
        <b>The turn from <M>{'P_1'}</M> to <M>{'P_2'}</M>.</b> One radius is below the horizontal and the other above
        it, so the angle between them is the sum:{' '}
        <M>{'\\theta + (90^\\circ - \\alpha) \\approx 7.41^\\circ + 76.33^\\circ = 83.74^\\circ'}</M>. This angle at
        the centre is what the wheel actually turns through. The angle at <M>B</M> between the two sight lines,{' '}
        <M>{'\\alpha - \\theta \\approx 6.26^\\circ'}</M>, is not.
      </Notice>
    )
  } else if (!visible && t < T1) {
    notice = (
      <Notice>
        The wheel turns <M>{'360^\\circ'}</M> in <M>30</M> minutes, which is <M>{'12^\\circ'}</M> every minute, so the
        time is proportional to the angle. Press play and watch the capsule ride round. The boat is not in view yet (the
        question says it first appears at <M>{'P_1'}</M>). The capsule reaches <M>{'P_1'}</M> at{' '}
        <M>{'t \\approx 6.88'}</M>, the moment <M>{'h(t)'}</M> equals <M>{'P_1'}</M>&apos;s height of about{' '}
        <M>57.91</M> m.
      </Notice>
    )
  } else if (visible) {
    notice = (
      <Notice tone="good">
        The boat is in view (green sight line). The clock has run <M>{`${num(inView, 2)}`}</M> minutes since{' '}
        <M>{'P_1'}</M> while the wheel turned <M>{`${num(turned, 2)}^\\circ`}</M>, which is{' '}
        <M>{`${num(turned, 2)} \\div 12`}</M> minutes. It loses sight of the boat at <M>{'P_2'}</M>, at{' '}
        <M>{'t \\approx 13.86'}</M>.
      </Notice>
    )
  } else if (cutsWheel) {
    notice = (
      <Notice tone="good">
        Past <M>{'P_2'}</M> the line to the boat cuts back through the wheel, so the boat is hidden. In view from{' '}
        <M>{'t \\approx 6.88'}</M> to <M>{'t \\approx 13.86'}</M>:{' '}
        <M>{'\\tfrac{83.74}{360} \\times 30 \\approx 6.98'}</M>, so about <b>7 minutes</b>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Sammy is back at the bottom after one full turn. The boat was in view from <M>{'t \\approx 6.88'}</M> to{' '}
        <M>{'t \\approx 13.86'}</M>: <M>{'\\tfrac{83.74}{360} \\times 30 \\approx 6.98'}</M>, so about{' '}
        <b>7 minutes</b>.
      </Notice>
    )
  }

  return (
    <div>
      <div ref={boxRef}>
      <Plane x={[XL, XR]} y={[YB, YT]} xStep={20} yStep={20} equalScale height={plotHeight} labels={false} xLabel="" yLabel="">
        <Ticks />
        {/* Label directions: mafs puts attach "s" text above the point and "n" below it. */}
        <Circle center={[0, YC]} radius={R} color={C.f} fillOpacity={0} weight={2} />
        <Line.Segment point1={[XL, YC]} point2={[XR, YC]} color={C.guide} style="dashed" weight={1.5} />
        {/* Step 1: the line from C through P₁ towards B, and θ at C. */}
        <Line.Segment point1={lineCB[0]} point2={lineCB[1]} color={s === 3 ? C.guide : C.g} weight={2} />
        <Line.Segment point1={[0, YC]} point2={P1} color={C.ink} weight={2} />
        {s < 3 && <Polygon points={[[0, YC], ...arc([0, YC], 44, PHI1, 0)]} color={C.g} fillOpacity={0.25} weight={0} strokeOpacity={0} />}
        {s < 3 && <Polyline points={arc([0, YC], 26, PHI1, 0)} color={C.g} weight={2} />}
        {s < 3 && <Label at={polar([0, YC], 27, PHI1 / 2)} color={C.g} attach="e" size={12}>θ</Label>}
        <Point x={P1[0]} y={P1[1]} color={C.g} />
        <Label at={P1} color={C.g} attach="se">P₁</Label>
        {/* Step 2: the tangent P₂B, the radius CP₂ and the right angle; α copied at P₂; 90° − α at C. */}
        {s >= 1 && (
          <>
            <Line.Segment point1={lineP2B[0]} point2={lineP2B[1]} color={s === 3 ? C.guide : C.violet} weight={2} />
            <Line.Segment point1={[0, YC]} point2={P2} color={C.ink} weight={2} />
            <Polyline points={sq} color={C.ink} weight={1.5} />
            {s < 3 && (
              <>
                <Line.Segment point1={P2} point2={[P2[0] + 42, P2[1]]} color={C.guide} style="dashed" weight={1.5} />
                <Polygon points={[P2, ...arc(P2, 40, -ALPHA, 0)]} color={C.violet} fillOpacity={0.2} weight={0} strokeOpacity={0} />
                <Polyline points={arc(P2, 34, -ALPHA, 0)} color={C.violet} weight={2} />
                <Label at={polar(P2, 36, -ALPHA / 2)} color={C.violet} attach="e" size={12}>α</Label>
                <Polyline points={arc([0, YC], 16, 0, PHI2)} color={C.violet} weight={2} />
                <Label at={polar([0, YC], 17, PHI2 / 2)} color={C.violet} attach="ne" size={12}>90° − α</Label>
              </>
            )}
            <Point x={P2[0]} y={P2[1]} color={C.violet} />
            {/* Anchored a little above P₂ so the label clears the dashed horizontal drawn there. */}
            <Label at={[P2[0], P2[1] + 3]} color={C.violet} attach="ne">P₂</Label>
          </>
        )}
        {/* Step 3: the arc P₁ → P₂ that the capsule travels while the boat is in view. */}
        {s === 2 && (
          <>
            <Polygon points={[[0, YC], ...arc([0, YC], R, PHI1, PHI2)]} color={C.good} fillOpacity={0.15} weight={0} strokeOpacity={0} />
            <Polyline points={arc([0, YC], R, PHI1, PHI2)} color={C.good} weight={5} />
            {/* Beside the lower half of the arc: at the arc's midpoint the label ran into P₂B. */}
            <Label at={polar([0, YC], 57, 0.38)} color={C.good} attach="e" size={13}>83.74°</Label>
          </>
        )}
        {/* Step 4: ride the wheel. */}
        {s === 3 && (
          <>
            <Polyline points={arc([0, YC], R, PHI1, PHI2)} color={C.good} weight={5} />
            {phi > PHI1 && <Polyline points={arc([0, YC], R, PHI1, Math.min(phi, PHI2))} color={C.good} weight={9} />}
            <Line.Segment
              point1={P}
              point2={[XR, P[1] + ((0 - P[1]) / (BX - P[0])) * (XR - P[0])]}
              color={visible ? C.good : C.bad}
              style={visible ? 'solid' : 'dashed'}
              weight={2.5}
            />
            <Line.Segment point1={[0, YC]} point2={P} color={C.f} weight={1.5} />
            <Point x={P[0]} y={P[1]} color={C.f} />
            {/* Left of P, away from the sight line; on the far left, inside the wheel above or below
                the sight line so it isn't cut off at the edge. */}
            <Label at={P} color={C.f} attach={P[0] > -35 ? 'w' : P[1] >= YC ? 'ne' : 'se'}>P</Label>
          </>
        )}
        <Point x={0} y={YC} color={C.ink} />
        <Label at={[0, YC]} attach="w">C</Label>
      </Plane>
      </div>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
        To scale. B(500, 0) is far off the right-hand edge; both sight lines run to it.
      </p>
      <Controls>
        <StepNav step={s} count={4} onBack={steps.back} onNext={steps.next} />
        {s === 3 && (
          <>
            <Slider
              label="t"
              value={t}
              onChange={v => {
                player.stop()
                setT(v)
              }}
              min={0}
              max={30}
              step={0.02}
              format={v => `${v.toFixed(2)} min`}
            />
            <div className="flex flex-wrap items-center gap-2">
              <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Ride the wheel" />
            </div>
            <Readouts>
              <Readout tex={`h(t) \\approx ${num(YC - R * Math.cos(N * t), 2)}\\text{ m}`} />
              <Readout color={C.good} tex={`\\text{in view for} \\approx ${num(inView, 2)}\\text{ min}`} />
            </Readouts>
          </>
        )}
        {s === 2 && (
          <Readouts>
            <Readout color={C.good} tex={`\\angle P_1CP_2 \\approx ${num(TURN, 2)}^\\circ`} />
          </Readouts>
        )}
        {notice}
      </Controls>
    </div>
  )
}
