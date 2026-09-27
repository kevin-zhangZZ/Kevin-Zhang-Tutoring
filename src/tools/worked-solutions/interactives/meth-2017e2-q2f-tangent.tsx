// 2017 Methods Exam 2 Q2f — drag P along the top half of the wheel, y = √(3025 − x²) + 65, and
// compare two lines through it: the tangent at P (gradient dy/dx = −u/√(3025 − u²), from part e)
// and the line of sight from P to the boat at B(500, 0) (gradient = rise over run). While P is
// still to the right of P₂ the sight line clears the wheel; once P passes P₂ it cuts through the
// wheel (drawn red). At P₂ the two lines are the same line, which is why the two gradient
// expressions can be set equal: u ≈ 13.00, v ≈ 118.44. A toggle shows the report's slip of
// leaving off the + 65: that is the tangent from B to a wheel sunk 65 m, centred on the ground,
// and it lands at u = 6.05 exactly.
//
// Drawn to scale (equal axes); B is 500 m away, off the right-hand edge.

import { useEffect, useRef, useState } from 'react'
import {
  Buttons, C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Text, Toggle, clamp,
  num,
} from './kit'

const R = 55
const YC = 65
const BX = 500
// Exact root of −u/√(3025 − u²) = (√(3025 − u²) + 65)/(u − 500), checked with sympy.
const U_STAR = (60500 + 5720 * Math.sqrt(157)) / 10169
const path = (x: number) => Math.sqrt(Math.max(0, R * R - x * x)) + YC
const mTan = (u: number) => -u / Math.sqrt(R * R - u * u)
const mSight = (u: number) => path(u) / (u - BX)
// The slip: v = √(3025 − u²) with no + 65 gives −u(u − 500) = 3025 − u², so u = 3025/500.
const U_WRONG = 3025 / BX
const V_WRONG = Math.sqrt(R * R - U_WRONG * U_WRONG)
const PHI_MIN = 0.12
const XL = -60
const XR = 110
const YB = -9
const YT = 135

// Tick numbers drawn here rather than by the plane, so the y numbers can sit LEFT of the axis:
// on the right they collided with C, with the (6.05, 54.67) label and with the lines near the top.
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

// Drag target → a point on the top half of the wheel, snapping onto P₂ when close.
function toU([mx, my]: [number, number]): number {
  let phi = Math.atan2(my - YC, mx)
  if (phi < -Math.PI / 2) phi = Math.PI - PHI_MIN
  else if (phi < PHI_MIN) phi = PHI_MIN
  else if (phi > Math.PI - PHI_MIN) phi = Math.PI - PHI_MIN
  const u = R * Math.cos(phi)
  return Math.abs(u - U_STAR) < 2 ? U_STAR : u
}

export default function TangentWidget() {
  const [u, setU] = useState(38)
  const [wrong, setWrong] = useState(false)
  const [boxRef, plotHeight] = useFitHeight((XR - XL + 0.4) / (YT - YB + 0.4))

  const v = path(u)
  const mt = mTan(u)
  const ms = mSight(u)
  const atP2 = Math.abs(u - U_STAR) < 1e-9
  // Where the sight line P → B meets the wheel again: P + s(B − P) with s = −2(P − C)·d / |d|².
  const dx = BX - u
  const dy = -v
  const s2 = (-2 * (u * dx + (v - YC) * dy)) / (dx * dx + dy * dy)
  const blocked = !atP2 && s2 > 1e-6
  const q: [number, number] = [u + s2 * dx, v + s2 * dy]
  const sightColor = atP2 ? C.good : C.g
  const tanColor = atP2 ? C.good : C.f
  // Right-hand end of each line, at the edge of the view.
  const sightEnd: [number, number] = [XR, v + ms * (XR - u)]

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <b>Leaving off the <M>+65</M></b> uses <M>{'y = \\sqrt{3025 - x^2}'}</M>, a wheel of the same size moved down{' '}
        <M>65</M> m so that its centre sits on the ground at <M>O</M> (red, dashed). The equation then finds the tangent
        from <M>B</M> to <i>that</i> wheel: <M>{'-u(u - 500) = 3025 - u^2'}</M>, so <M>u = 6.05</M>. The rule for the
        path has to include the <M>+65</M>, because <M>v</M> is the height of <M>{'P_2'}</M> above the ground.
      </Notice>
    )
  } else if (atP2) {
    notice = (
      <Notice tone="good">
        <b>This is <M>{'P_2'}</M>: the two lines are the same line.</b> The sight line just touches the wheel here, so it
        is the tangent. Its gradient is <i>both</i> the derivative at <M>x = u</M> and rise over run to{' '}
        <M>B</M>. Setting the two expressions equal is the one equation that pins down{' '}
        <M>{'u \\approx 13.00'}</M>, and then <M>{'v = \\sqrt{3025 - u^2} + 65 \\approx 118.44'}</M>.
      </Notice>
    )
  } else if (blocked) {
    notice = (
      <Notice>
        P has gone past <M>{'P_2'}</M>. Now the orange sight line to <M>B</M> passes back through the wheel (the red
        piece), so the boat is hidden. The two gradients still disagree: tangent{' '}
        <M>{`\\approx ${num(mt, 3)}`}</M>, sight line <M>{`\\approx ${num(ms, 3)}`}</M>. Drag P back to the right until
        they match.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Here the orange sight line to <M>B</M> clears the wheel, so the boat is still visible. But it is <i>not</i> the
        tangent: the blue tangent (<M>{`\\approx ${num(mt, 3)}`}</M>) is steeper than the sight line (
        <M>{`\\approx ${num(ms, 3)}`}</M>). As the wheel turns, P moves up and to the left. Drag it that way and watch
        the two gradients get closer.
      </Notice>
    )
  }

  return (
    <div>
      <div ref={boxRef}>
      <Plane x={[XL, XR]} y={[YB, YT]} xStep={20} yStep={20} equalScale height={plotHeight} labels={false} xLabel="" yLabel="">
        <Ticks />
        {wrong && (
          <>
            <Circle center={[0, 0]} radius={R} color={C.bad} fillOpacity={0} weight={1.5} strokeStyle="dashed" />
            <Line.Segment
              point1={[U_WRONG, V_WRONG]}
              point2={[XR, V_WRONG + (-V_WRONG / (BX - U_WRONG)) * (XR - U_WRONG)]}
              color={C.bad}
              style="dashed"
              weight={2}
            />
            <Point x={U_WRONG} y={V_WRONG} color={C.bad} />
            {/* mafs puts attach "s" text above the point and "n" below it. */}
            <Label at={[U_WRONG, V_WRONG]} color={C.bad} attach="ne">(6.05, 54.67)</Label>
            <Point x={0} y={0} color={C.bad} />
          </>
        )}
        <Circle center={[0, YC]} radius={R} color={C.guide} fillOpacity={0} weight={1.5} />
        <Plot.OfX y={path} domain={[-R, R]} color={C.f} weight={3} />
        <Point x={0} y={YC} color={C.ink} />
        <Label at={[0, YC]} attach="nw">C</Label>
        {/* The tangent at P, in both directions. */}
        <Line.PointSlope point={[u, v]} slope={mt} color={tanColor} weight={atP2 ? 3 : 2} style={atP2 ? 'solid' : 'dashed'} />
        {/* The line of sight from P towards B. */}
        <Line.Segment point1={[u, v]} point2={sightEnd} color={sightColor} weight={3} />
        {blocked && s2 < 1 && <Line.Segment point1={[u, v]} point2={q} color={C.bad} weight={4} />}
        {blocked && s2 < 1 && <Point x={q[0]} y={q[1]} color={C.bad} />}
        <MovablePoint point={[u, v]} onMove={p => setU(toU(p))} color={atP2 ? C.good : C.f} />
        {/* P's label after the point, so the drag ring doesn't cover it, and it ignores the pointer
            so it never blocks a drag. Above-right ("se" in mafs) except on the upper left, where it
            goes above-left; on the far left above-right again, so it isn't cut off at the edge. */}
        <Text
          x={u}
          y={v}
          attach={u > -10 || u <= -35 ? 'se' : 'sw'}
          attachDistance={14}
          color={atP2 ? C.good : C.f}
          size={13}
          svgTextProps={{ className: 'ws-label', pointerEvents: 'none' }}
        >
          {atP2 ? 'P₂' : 'P'}
        </Text>
      </Plane>
      </div>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
        To scale. B(500, 0) is far off the right-hand edge; the sight line from P always runs to it.
      </p>
      <Controls>
        <Readouts>
          <Readout color={tanColor} tex={`\\text{tangent: } \\tfrac{-u}{\\sqrt{3025-u^2}} \\approx ${num(mt, 4)}`} />
          <Readout color={sightColor} tex={`\\text{to } B\\text{: } \\tfrac{v-0}{u-500} \\approx ${num(ms, 4)}`} />
          <Readout tex={`(u,\\ v) \\approx (${num(u, 2)},\\ ${num(v, 2)})`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the blue point P around the top of the wheel.</p>
        <Buttons>
          <Toggle label="Jump to P₂" checked={atP2} onChange={() => setU(U_STAR)} />
          <Toggle label="What if I leave off the +65?" checked={wrong} onChange={setWrong} />
        </Buttons>
        {notice}
      </Controls>
    </div>
  )
}
