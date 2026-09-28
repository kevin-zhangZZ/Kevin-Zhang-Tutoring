// 2019 Specialist Exam 2 MCQ 13 — where F₂ comes from, and where the angle is measured. The net
// force is ma = 3(√3 i + j) = 3√3 i + 3j. Tip-to-tail, F₂ is the side that closes the triangle
// F₁ + F₂ = ma, so F₂ = ma − F₁ = 3√3 i + j. Sliding F₂ back to the origin puts it tail-to-tail
// with F₁, which is where the angle θ = arccos(1/(2√7)) ≈ 79.1° (option D) is measured. A toggle
// shows the reversed subtraction F₁ − ma: it doesn't close the triangle, and tail-to-tail it
// makes the obtuse angle π − arccos(1/(2√7)) ≈ 100.9° with F₁ (option E).

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Readout, Readouts, Slider, Toggle, Vector,
  usePlayer,
} from './kit'

type V2 = [number, number]
const S3 = Math.sqrt(3)
const F1: V2 = [0, 2]
const MA: V2 = [3 * S3, 3]
const F2: V2 = [3 * S3, 1] // ma − F₁
const F2W: V2 = [-3 * S3, -1] // F₁ − ma (the wrong way round)
const DEG = 180 / Math.PI
const ARC_R = 0.75

export default function ForceTriangle() {
  const [s, setS] = useState(0)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setS, { min: 0, max: 1, seconds: 2.5 })

  const v = wrong ? F2W : F2
  const tail: V2 = [0, F1[1] * (1 - s)] // from the tip of F₁ down to the origin
  const tip: V2 = [tail[0] + v[0], tail[1] + v[1]]
  const mid: V2 = [(tail[0] + tip[0]) / 2, (tail[1] + tip[1]) / 2]
  const atStart = s < 0.02
  const atOrigin = s > 0.98

  const len = Math.hypot(v[0], v[1])
  const cos = (F1[0] * v[0] + F1[1] * v[1]) / (2 * len)
  const theta = Math.acos(cos) * DEG

  // Arc from F₂'s direction to F₁'s direction (π/2), the way that stays inside the angle.
  let phi = Math.atan2(v[1], v[0])
  if (phi < 0) phi += 2 * Math.PI
  const a0 = Math.min(phi, Math.PI / 2)
  const a1 = Math.max(phi, Math.PI / 2)
  const bis = (a0 + a1) / 2
  const col = wrong ? C.bad : C.g

  let notice
  if (!wrong && atStart) {
    notice = (
      <Notice>
        Newton&apos;s law adds the forces: <M>{'\\underset{\\sim}{F}_1+\\underset{\\sim}{F}_2=m\\underset{\\sim}{a}'}</M>.
        Drawn tip-to-tail, <M>{'\\underset{\\sim}{F}_2'}</M> is the orange arrow from the tip of{' '}
        <M>{'\\underset{\\sim}{F}_1'}</M> to the tip of <M>{'m\\underset{\\sim}{a}'}</M>, the side that closes the
        triangle. That is why <M>{'\\underset{\\sim}{F}_2=m\\underset{\\sim}{a}-\\underset{\\sim}{F}_1'}</M>. Now slide it
        to the origin, because an angle between two vectors is measured tail-to-tail.
      </Notice>
    )
  } else if (!wrong && !atOrigin) {
    notice = (
      <Notice>
        It&apos;s the same arrow, with the same length and direction; only its position changes. Keep going until its
        tail sits on the tail of <M>{'\\underset{\\sim}{F}_1'}</M>.
      </Notice>
    )
  } else if (!wrong) {
    notice = (
      <Notice tone="good">
        Tail-to-tail, the angle between the forces is <M>{`\\theta\\approx ${theta.toFixed(1)}^\\circ`}</M>. The dot
        product <M>{'\\underset{\\sim}{F}_1\\cdot\\underset{\\sim}{F}_2=2'}</M> is positive, so <M>\theta</M> is already
        acute: <M>{'\\theta=\\arccos\\left(\\tfrac{1}{2\\sqrt7}\\right)'}</M>, option D. Turn on the toggle to see where
        option E comes from.
      </Notice>
    )
  } else if (!atOrigin) {
    notice = (
      <Notice tone="warn">
        With <M>{'\\underset{\\sim}{F}_2=\\underset{\\sim}{F}_1-m\\underset{\\sim}{a}'}</M> the red arrow, placed after{' '}
        <M>{'\\underset{\\sim}{F}_1'}</M>, lands at <M>{'\\left(-3\\sqrt3,\\,1\\right)'}</M>, nowhere near the tip of{' '}
        <M>{'m\\underset{\\sim}{a}'}</M>. That&apos;s the check to make: add your <M>{'\\underset{\\sim}{F}_2'}</M> back
        onto <M>{'\\underset{\\sim}{F}_1'}</M> and you must get <M>{'m\\underset{\\sim}{a}'}</M>. Slide it to the origin.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        The reversed vector points the opposite way, so the angle it makes with{' '}
        <M>{'\\underset{\\sim}{F}_1'}</M> is the obtuse{' '}
        <M>{`${theta.toFixed(1)}^\\circ=\\pi-\\arccos\\left(\\tfrac{1}{2\\sqrt7}\\right)`}</M>, which is option E. Two
        slips lead here: the subtraction is backwards, and the question asked for the <b>acute</b> angle, which is
        still <M>{'180^\\circ-100.9^\\circ\\approx79.1^\\circ'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={wrong ? [-6, 6] : [-1, 6]} y={[-1.5, 3.5]} xStep={1} yStep={1} equalScale height={320}>
        {/* the net force ma, from the origin */}
        <Vector tail={[0, 0]} tip={MA} color={C.violet} weight={3} />
        <Label at={[MA[0] * 0.6, MA[1] * 0.6]} attach="se" color={C.violet}>
          ma
        </Label>
        {/* F₁ = 2j */}
        <Vector tail={[0, 0]} tip={F1} color={C.f} weight={3} />
        <Label at={[0, 1.3]} attach="w" color={C.f}>
          F₁
        </Label>
        {/* where F₂ started, once it has moved */}
        {!atStart && (
          <Line.Segment point1={F1} point2={[F1[0] + v[0], F1[1] + v[1]]} color={col} style="dashed" weight={1.5} />
        )}
        <Vector tail={tail} tip={tip} color={col} weight={3} />
        <Label at={mid} attach={wrong ? 's' : 'n'} color={col}>
          {wrong ? 'F₁ − ma' : 'F₂'}
        </Label>
        {atOrigin && (
          <>
            <Plot.Parametric
              xy={t => [ARC_R * Math.cos(t), ARC_R * Math.sin(t)]}
              domain={[a0, a1]}
              color={C.good}
              weight={2.5}
            />
            <Label at={[ARC_R * Math.cos(bis), ARC_R * Math.sin(bis)]} attach={wrong ? 'nw' : 'ne'} color={C.good}>
              θ
            </Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider
          label="\text{slide }F_2"
          value={s}
          onChange={x => {
            player.stop()
            setS(x)
          }}
          min={0}
          max={1}
          step={0.01}
          format={x => (x < 0.02 ? 'start' : x > 0.98 ? 'origin' : `${Math.round(x * 100)}%`)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(s)} label="Slide F₂ to the origin" />
          <Toggle label="Subtract the wrong way (F₁ − ma)" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout
            color={col}
            tex={
              wrong
                ? '\\underset{\\sim}{F}_1-m\\underset{\\sim}{a}=-3\\sqrt3\\,\\underset{\\sim}{i}-\\underset{\\sim}{j}'
                : '\\underset{\\sim}{F}_2=m\\underset{\\sim}{a}-\\underset{\\sim}{F}_1=3\\sqrt3\\,\\underset{\\sim}{i}+\\underset{\\sim}{j}'
            }
          />
          {atOrigin && <Readout color={C.good} tex={`\\cos\\theta\\approx ${cos.toFixed(3)},\\quad \\theta\\approx ${theta.toFixed(1)}^\\circ`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
