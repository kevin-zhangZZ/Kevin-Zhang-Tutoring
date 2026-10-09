// 2023 Specialist Exam 1 Q10d — the position vector r(t) runs from the ORIGIN, which is not the
// centre C(2, 1) of the particle's circle (x − 2)² + (y − 1)² = 9. The particle P moves round at
// r(t) = (2 + 3cos 2t)i + (1 + 3sin 2t)j with velocity −6sin(2t)i + 6cos(2t)j (drawn at a quarter
// size). r·ṙ = 6(cos 2t − 2sin 2t): positive (acute angle) while P moves away from O, negative
// while it moves towards O, and zero only at F (farthest from O, |r| = 3 + √5) and N (nearest,
// |r| = 3 − √5), the ends of the diameter through O. That happens twice per lap of π seconds, so at
// t = ½arctan(½) + kπ/2, k = 0, 1, 2, … — the slider covers two laps (four such times). A toggle
// measures from the centre instead, where the radius is perpendicular to the velocity at every
// instant: the "always" answer that only holds for a circle centred at the origin.

import { useState } from 'react'
import { ActionButton, Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, Point, Polygon, Readout, Readouts, Slider, Toggle, Vector, num } from './kit'

const CX = 2
const CY = 1
const R = 3
const T0 = Math.atan(0.5) / 2
const TIMES = [0, 1, 2, 3].map(k => T0 + (k * Math.PI) / 2)
const MAX = 2 * Math.PI
const D = Math.sqrt(5)
const F: [number, number] = [CX + (R * 2) / D, CY + (R * 1) / D]
const N: [number, number] = [CX - (R * 2) / D, CY - (R * 1) / D]

const pos = (t: number): [number, number] => [CX + R * Math.cos(2 * t), CY + R * Math.sin(2 * t)]
const vel = (t: number): [number, number] => [-6 * Math.sin(2 * t), 6 * Math.cos(2 * t)]
const unit = (v: [number, number]): [number, number] => {
  const l = Math.hypot(v[0], v[1])
  return [v[0] / l, v[1] / l]
}

export default function PerpendicularWidget() {
  const [t, setT] = useState(0.9)
  const [fromCentre, setFromCentre] = useState(false)

  const move = (v: number) => {
    const hit = TIMES.find(T => Math.abs(v - T) < 0.015)
    setT(hit ?? v)
  }
  const next = () => setT(TIMES.find(T => T > t + 1e-6) ?? TIMES[0])

  const P = pos(t)
  const V = vel(t)
  const tip: [number, number] = [P[0] + V[0] / 4, P[1] + V[1] / 4]
  const dot = 6 * (Math.cos(2 * t) - 2 * Math.sin(2 * t))
  const k = TIMES.findIndex(T => Math.abs(t - T) < 1e-9)
  const perp = k >= 0
  const atF = perp && k % 2 === 0
  const atN = perp && k % 2 === 1
  const rLen = Math.hypot(P[0], P[1])
  const angleDeg = (Math.acos(Math.max(-1, Math.min(1, dot / (rLen * 6)))) * 180) / Math.PI

  // Right-angle marker in the corner between the arrow arriving at P and the velocity.
  const base: [number, number] = fromCentre ? [CX, CY] : [0, 0]
  const showSquare = perp || fromCentre
  const u1 = unit([base[0] - P[0], base[1] - P[1]])
  const u2 = unit(V)
  const s = 0.3
  const sq: [number, number][] = [
    P,
    [P[0] + s * u1[0], P[1] + s * u1[1]],
    [P[0] + s * (u1[0] + u2[0]), P[1] + s * (u1[1] + u2[1])],
    [P[0] + s * u2[0], P[1] + s * u2[1]],
  ]
  const armColor = fromCentre ? C.violet : perp ? C.good : C.f
  // P's label sits on the side away from the centre.
  const out = unit([P[0] - CX, P[1] - CY])
  const pAttach = (Math.abs(out[1]) > 0.7 ? (out[1] > 0 ? 'n' : 's') : out[0] > 0 ? 'e' : 'w') as 'n' | 's' | 'e' | 'w'

  let notice
  if (fromCentre) {
    notice = (
      <Notice tone="warn">
        <b>Measured from the centre, the right angle is there at every instant</b>: a radius always meets the
        tangent at right angles. That is why "always" is tempting. But <M>{'\\underset{\\sim}{r}(t)'}</M> starts at the
        origin <M>{'O'}</M>, not at <M>{'C'}</M>. Switch this off: from <M>{'O'}</M> the right angle appears only at{' '}
        <M>{'F'}</M> and <M>{'N'}</M>.
      </Notice>
    )
  } else if (perp) {
    const far = k % 2 === 0
    notice = (
      <Notice tone="good">
        <b>
          <M>{`t = \\tfrac12\\arctan\\left(\\tfrac12\\right)+\\tfrac{k\\pi}{2},\\ k = ${k}`}</M>: <M>{'P'}</M> is at{' '}
          <M>{far ? 'F' : 'N'}</M>, the {far ? 'farthest' : 'nearest'} point from <M>{'O'}</M>
        </b>{' '}
        (<M>{far ? '|\\underset{\\sim}{r}| = 3+\\sqrt5\\approx 5.24' : '|\\underset{\\sim}{r}| = 3-\\sqrt5\\approx 0.76'}</M>).
        For an instant it moves neither away from <M>{'O'}</M> nor towards it, so <M>{'\\underset{\\sim}{r}\\cdot\\underset{\\sim}{\\dot r}=0'}</M>.
        This happens at <M>{'F'}</M> and at <M>{'N'}</M> on every lap, and a lap takes <M>{'\\pi'}</M> seconds, so the times
        are <M>{'\\tfrac{\\pi}{2}'}</M> apart and never stop. Press Next.
      </Notice>
    )
  } else if (dot > 0) {
    notice = (
      <Notice>
        <M>{'\\underset{\\sim}{r}\\cdot\\underset{\\sim}{\\dot r} > 0'}</M>: the angle between position and velocity is
        acute, so <M>{'P'}</M> is moving <b>away from</b> <M>{'O'}</M>. It keeps doing so until it reaches <M>{'F'}</M>,
        the farthest point, where the dot product is <M>{'0'}</M>. Slide <M>{'t'}</M> there, or press Next.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{'\\underset{\\sim}{r}\\cdot\\underset{\\sim}{\\dot r} < 0'}</M>: the angle between position and velocity is
        obtuse, so <M>{'P'}</M> is moving <b>towards</b> <M>{'O'}</M>. It keeps doing so until it reaches <M>{'N'}</M>,
        the nearest point, where the dot product is <M>{'0'}</M>. Slide <M>{'t'}</M> there, or press Next.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.9, 5.9]} y={[-2.6, 4.7]} equalScale height={340} xStep={1} yStep={1} labels={false}>
        <Circle center={[CX, CY]} radius={R} color={C.guide} fillOpacity={0} weight={1.5} />
        <Line.Segment point1={N} point2={F} color={C.guide} weight={1.5} style="dashed" />
        {showSquare && <Polygon points={sq} color={fromCentre ? C.violet : C.good} fillOpacity={0.15} weight={1.5} />}
        <Vector tail={base} tip={P} color={armColor} weight={3} />
        <Vector tail={P} tip={tip} color={C.g} weight={3} />
        <Point x={F[0]} y={F[1]} color={C.good} />
        <Point x={N[0]} y={N[1]} color={C.good} />
        {!atF && <Label at={F} attach="ne" color={C.good}>
          F
        </Label>}
        {!atN && <Label at={N} attach="w" color={C.good}>
          N
        </Label>}
        <Point x={0} y={0} color={C.ink} />
        <Label at={[0, 0]} attach="se">
          O
        </Label>
        <Point x={CX} y={CY} color={C.ink} />
        <Label at={[CX, CY]} attach="se">
          C
        </Label>
        <Point x={P[0]} y={P[1]} color={armColor} />
        <Label at={P} attach={pAttach} color={armColor}>
          {atF ? "P = F" : atN ? "P = N" : "P"}
        </Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={move} min={0} max={MAX} step={0.001} format={v => num(v, 3)} />
        <Buttons>
          <ActionButton label={<>Next <M>{'\\underset{\\sim}{r}\\perp\\underset{\\sim}{\\dot r}'}</M></>} onClick={next} />
          <Toggle label="Measure from the centre instead" checked={fromCentre} onChange={setFromCentre} />
        </Buttons>
        <Readouts>
          <Readout
            tex={fromCentre ? '\\overrightarrow{CP}\\ \\text{(from the centre)}' : '\\underset{\\sim}{r}\\ \\text{(position, from } O)'}
            color={armColor}
          />
          <Readout tex={'\\underset{\\sim}{\\dot r}\\ \\text{(velocity, drawn } \\tfrac14 \\text{ size)}'} color={C.g} />
        </Readouts>
        <Readouts>
          {fromCentre ? (
            <Readout tex={`\\overrightarrow{CP}\\cdot\\underset{\\sim}{\\dot r} = 0 \\text{ always}`} />
          ) : (
            <>
              <Readout
                tex={`\\underset{\\sim}{r}\\cdot\\underset{\\sim}{\\dot r} = 6\\bigl(\\cos(2t)-2\\sin(2t)\\bigr) \\approx ${num(dot, 2)}`}
              />
              <Readout tex={`\\text{angle} \\approx ${angleDeg.toFixed(0)}^\\circ`} />
              <Readout tex={`|\\underset{\\sim}{r}| \\approx ${num(rLen, 2)}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
