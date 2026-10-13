// 2015 Specialist Exam 1 Q9c — the acute angle between two tangents to x² − xy + 3y²/2 = 9.
// Only 16% scored full marks; the report says most students had little idea of how to proceed, and
// some found the tangents' intersection point and could not progress. The widget slides both tangents to the
// origin (a shift never turns a line), shows each one's angle with the positive x-axis (tan A = 2,
// tan B = 1/3) and the gap A − B between them, with direction vectors i + m j (1 across, m up —
// not m i + c j, the report's other trap). Move P round the curve: for P at 0°–45° B > A, so A − B and
// tan(A − B) are negative and the acute angle is B − A; for P at 46°–63° B − A is obtuse (tan(A − B) is
// positive again) and the acute angle is π − (B − A). In every case the acute angle has tangent |tan(A − B)|.

import { useState } from 'react'
import { C, Controls, Buttons, Label, Line, Notice, M, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Vector } from './kit'

const R = (phi: number) => {
  const c = Math.cos(phi)
  const s = Math.sin(phi)
  return 3 / Math.sqrt(c * c - c * s + 1.5 * s * s)
}
const onCurve = (phi: number): [number, number] => [R(phi) * Math.cos(phi), R(phi) * Math.sin(phi)]

// Inclination in [0, π) of the tangent at (x, y): direction (3y − x, y − 2x) from dy/dx = (y − 2x)/(3y − x).
function inclination(x: number, y: number) {
  let a = Math.atan2(y - 2 * x, 3 * y - x)
  if (a < 0) a += Math.PI
  if (a >= Math.PI - 1e-9) a -= Math.PI
  return a
}

const A = Math.atan(2)
const deg = (r: number) => ((r * 180) / Math.PI).toFixed(1)
const fmt = (v: number) => (Math.abs(v) < 0.005 ? '0' : v.toFixed(2))

function Arc({ r, from, to, color }: { r: number; from: number; to: number; color: string }) {
  if (Math.abs(to - from) < 0.01) return null
  return <Plot.Parametric xy={t => [r * Math.cos(t), r * Math.sin(t)]} domain={[from, to]} color={color} weight={3} />
}

export default function TangentAngle() {
  const [phiDeg, setPhiDeg] = useState(90)
  const [shifted, setShifted] = useState(true)

  const phi = (phiDeg * Math.PI) / 180
  const [px, py] = onCurve(phi)
  const B = inclination(px, py)
  const vertical = Math.abs(3 * py - px) < 1e-6
  const m2 = vertical ? Infinity : (py - 2 * px) / (3 * py - px)
  const d = Math.abs(A - B)
  const acute = d <= Math.PI / 2 ? d : Math.PI - d
  const exam = Math.abs(phiDeg - 90) < 0.5
  const obtuse = d > Math.PI / 2 + 1e-6
  const bBigger = B > A + 1e-6

  // the tangents on the curve
  const q: [number, number] = [3, 0]
  const dirB: [number, number] = [Math.cos(B), Math.sin(B)]
  const faint = shifted ? C.guide : undefined

  // green arc for the acute angle between the lines through the origin
  const lo = Math.min(A, B)
  const hi = Math.max(A, B)
  const gFrom = obtuse ? hi : lo
  const gTo = obtuse ? lo + Math.PI : hi
  const gMid = (gFrom + gTo) / 2

  // direction-vector arrows: i + m j, shortened if steep so they stay on screen
  const arrow = (a: number, m: number): [number, number] => {
    if (!Number.isFinite(m) || Math.abs(m) > 2.5) return [2.2 * Math.cos(a), 2.2 * Math.sin(a)]
    return [1, m]
  }
  const vB = arrow(B, m2)
  const m2tex = !Number.isFinite(m2) ? '\\text{undefined}' : exam ? '\\tfrac13' : fmt(m2)
  const denom = 1 + 2 * m2
  const tanDiff = Number.isFinite(m2) && Math.abs(denom) > 1e-6 ? (2 - m2) / denom : NaN

  let notice
  if (!shifted) {
    notice = (
      <Notice>
        These are the two tangents on the curve. They cross{exam ? <> at about <M>(5.07,\ 4.14)</M></> : null}, but the report
        notes that students who found the intersection point were unable to progress from there: the crossing point is
        never needed. Turn on &ldquo;Slide both to the origin&rdquo;: sliding a line doesn&apos;t turn it.
      </Notice>
    )
  } else if (exam) {
    notice = (
      <Notice tone="good">
        <b>
          Neither <M>A \approx 63.4^\circ</M> nor <M>B \approx 18.4^\circ</M> is an exact value, but their gap is.
        </b>{' '}
        <M>{'\\tan(A-B)=\\frac{2-\\frac13}{1+\\frac23}=1'}</M>, so the green angle is <M>{'\\tfrac\\pi4'}</M>. The arrows are
        the direction vectors <M>{'\\underset{\\sim}{i}+2\\underset{\\sim}{j}'}</M> and{' '}
        <M>{'\\underset{\\sim}{i}+\\tfrac13\\underset{\\sim}{j}'}</M>: 1 across, <M>m</M> up. Now move <M>P</M> round the curve.
      </Notice>
    )
  } else if (obtuse) {
    notice = (
      <Notice tone="warn">
        Now <M>B-A</M> is bigger than <M>{'\\tfrac\\pi2'}</M>: the gap between the tangents is obtuse, even though{' '}
        <M>\tan(A-B)</M> is positive. Two crossing lines make two angles that add to <M>\pi</M>; the acute one, in green,
        is <M>\pi-(B-A)</M>. The safe rule: the acute angle has tangent <M>|\tan(A-B)|</M>.
      </Notice>
    )
  } else if (bBigger) {
    notice = (
      <Notice tone="warn">
        Now the tangent at <M>P</M> is the steeper one, so <M>B</M> is bigger than <M>A</M>: <M>A-B</M> and{' '}
        <M>\tan(A-B)</M> are negative, and the acute angle is <M>B-A</M>. The safe rule: the acute angle has tangent{' '}
        <M>|\tan(A-B)|</M>. Drag the slider to about <M>55^\circ</M> to see the gap become obtuse.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Wherever <M>P</M> is, the angle between the tangents is the gap between their angles with the <M>x</M>-axis, and{' '}
        <M>\tan(A-B)</M> gets it from the gradients alone. Drag the slider down to about <M>30^\circ</M> to make the tangent at{' '}
        <M>P</M> the steeper one, or back to <M>90^\circ</M> for the exam&apos;s point <M>{'\\left(0,\\sqrt6\\right)'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3.8, 5.8]} y={[-3.2, 4.8]} equalScale height={380} label="The curve, its tangents at (3, 0) and P, and both tangents slid through the origin">
        <Plot.Parametric xy={t => onCurve(t)} domain={[0, 2 * Math.PI]} color={shifted ? C.guide : C.ink} weight={shifted ? 1.5 : 2} />
        <Line.PointSlope point={q} slope={2} color={faint ?? C.f} weight={shifted ? 1 : 2.5} opacity={shifted ? 0.5 : 1} />
        <Line.ThroughPoints point1={[px, py]} point2={[px + dirB[0], py + dirB[1]]} color={faint ?? C.g} weight={shifted ? 1 : 2.5} opacity={shifted ? 0.5 : 1} />
        <Point x={3} y={0} color={C.f} />
        <Point x={px} y={py} color={C.g} />
        {!shifted && <Label at={[3, 0]} color={C.f} attach="se">(3, 0)</Label>}
        <Label at={[px, py]} color={C.g} attach={px < 0 ? 'nw' : 'ne'}>P</Label>
        {shifted && (
          <>
            <Line.ThroughPoints point1={[0, 0]} point2={[Math.cos(A), Math.sin(A)]} color={C.f} weight={2.5} />
            <Line.ThroughPoints point1={[0, 0]} point2={dirB} color={C.g} weight={2.5} />
            <Vector tip={[1, 2]} color={C.f} weight={3} />
            <Vector tip={vB} color={C.g} weight={3} />
            <Arc r={3.0} from={0} to={A} color={C.f} />
            <Arc r={2.0} from={0} to={B} color={C.g} />
            <Arc r={1.4} from={gFrom} to={gTo} color={C.good} />
            <Label at={[3.0 * Math.cos(A / 2), 3.0 * Math.sin(A / 2)]} color={C.f} attach="e">A</Label>
            {B > 0.15 && <Label at={[2.0 * Math.cos(B / 2), 2.0 * Math.sin(B / 2)]} color={C.g} attach="e">B</Label>}
            {acute > 0.08 && (
              <Label at={[1.4 * Math.cos(gMid), 1.4 * Math.sin(gMid)]} color={C.good} attach={Math.cos(gMid) < 0 ? 'nw' : 'ne'}>
                {obtuse ? 'π − (B − A)' : bBigger ? 'B − A' : 'A − B'}
              </Label>
            )}
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="P" value={phiDeg} onChange={setPhiDeg} min={0} max={359} step={1} format={v => `${v}°`} />
        <Buttons>
          <Toggle label="Slide both to the origin" checked={shifted} onChange={setShifted} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\tan(A)=2,\\ \\ A\\approx${deg(A)}^\\circ`} />
          <Readout color={C.g} tex={`P\\approx(${fmt(px)},\\ ${fmt(py)}),\\ \\ \\tan(B)=${m2tex},\\ \\ B\\approx${deg(B)}^\\circ`} />
          {Number.isFinite(tanDiff) && (
            <Readout tex={`\\tan(A-B)=\\frac{2-\\tan(B)}{1+2\\tan(B)}\\approx${fmt(tanDiff)}`} />
          )}
          <Readout color={C.good} tex={`\\text{acute angle}\\approx${deg(acute)}^\\circ${exam ? '=\\tfrac{\\pi}{4}' : ''}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
