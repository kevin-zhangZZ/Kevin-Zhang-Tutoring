// 2023 Specialist Exam 1 Q2 — cubing triples the argument. Slide b: the point b − i runs along
// the line Im = −1 (blue, angle θ = arg(b − i), always between −π/2 and 0 because b > 0), and the
// orange arrow shows the direction of z = (b − i)³, at angle 3θ (direction only: |z| = (b² + 1)^{3/2}
// is too long to draw). 3θ sweeps from −3π/2 up to 0, so it meets −π/2 exactly once, at θ = −π/6,
// i.e. b = √3 (the slider snaps there). Below b = 1/√3, 3θ passes −π and z's principal argument
// jumps to 3θ + 2π, which is why arg((b − i)³) = 3 arg(b − i) only holds up to a whole turn. The toggle draws
// all three directions whose cube points straight down (−π/6, π/2, −5π/6): only −π/6 meets
// Im = −1 with b > 0 (−5π/6 meets it at b = −√3; π/2 never does).

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Vector,
} from './kit'
import type { Attach } from './kit'

const SQ3 = Math.sqrt(3)
const INV_SQ3 = 1 / SQ3
const B_MIN = 0.2
const B_MAX = 3
const ARROW = 1.35 // drawn length of z's direction arrow

/** Just beyond the tip of an arrow pointing at angle a. */
function attachFor(a: number): Attach {
  const c = Math.cos(a)
  const s = Math.sin(a)
  const ns = s < -0.38 ? 's' : s > 0.38 ? 'n' : ''
  const ew = c < -0.38 ? 'w' : c > 0.38 ? 'e' : ''
  return ((ns + ew) || 'e') as Attach
}

const pt = (r: number, a: number): [number, number] => [r * Math.cos(a), r * Math.sin(a)]

function Arc({ r, a, color }: { r: number; a: number; color: string }) {
  if (Math.abs(a) < 1e-3) return null
  return <Plot.Parametric xy={t => pt(r, t)} domain={[Math.min(0, a), Math.max(0, a)]} color={color} weight={2.5} />
}

export default function CubeAngle() {
  const [b, setB] = useState(1)
  const [roots, setRoots] = useState(false)

  const at = Math.abs(b - SQ3) < 1e-9
  const theta = -Math.atan(1 / b) // arg(b − i), in (−π/2, 0)
  const three = 3 * theta // an argument of z, in (−3π/2, 0)
  const re = b ** 3 - 3 * b
  const im = 1 - 3 * b * b
  const mod = (b * b + 1) ** 1.5
  const zCol = at ? C.good : C.g
  const tip = pt(ARROW, three)
  // Put the "3θ" label on the orange arc where it is furthest from the three lines that cross it:
  // b − i (angle θ), the downward target (−π/2) and z itself (3θ).
  let labelA = 0.5 * three
  let best = -1
  for (let f = 0.4; f <= 0.9001; f += 0.05) {
    const a = f * three
    const gap = Math.min(Math.abs(a - theta), Math.abs(a + Math.PI / 2), Math.abs(a - three))
    if (gap > best) {
      best = gap
      labelA = a
    }
  }

  let notice
  if (roots) {
    notice = (
      <Notice>
        <M>{'3\\theta = -\\tfrac{\\pi}{2} + 2k\\pi'}</M> gives three directions whose cube points straight down:{' '}
        <M>{'\\theta = -\\tfrac{\\pi}{6},\\ \\tfrac{\\pi}{2},\\ -\\tfrac{5\\pi}{6}'}</M>. The <M>{'\\tfrac{\\pi}{2}'}</M> ray
        points up and never meets <M>{'\\mathrm{Im} = -1'}</M>; the <M>{'-\\tfrac{5\\pi}{6}'}</M> ray meets it at{' '}
        <M>{'b = -\\sqrt3'}</M>, ruled out by <M>{'b > 0'}</M>. Only <M>{'\\theta = -\\tfrac{\\pi}{6}'}</M> is left, so{' '}
        <M>{'b = \\sqrt3'}</M>.
      </Notice>
    )
  } else if (at) {
    notice = (
      <Notice tone="good">
        <b>At <M>{'b = \\sqrt3'}</M>, <M>{'\\theta = -\\tfrac{\\pi}{6}'}</M>, so the cube turns three times as far:{' '}
        <M>{'3 \\times \\left(-\\tfrac{\\pi}{6}\\right) = -\\tfrac{\\pi}{2}'}</M>.</b> The arrow for <M>z</M> (now green) points straight down,
        and <M>{'\\mathrm{Re}(z) = 0'}</M>, <M>{'\\mathrm{Im}(z) = -8'}</M> agree with the expanding method. Move{' '}
        <M>b</M> either way: the arrow swings off the downward line, so this is the only answer. Then turn on the
        toggle.
      </Notice>
    )
  } else if (b > SQ3) {
    notice = (
      <Notice>
        Past <M>{'b = \\sqrt3'}</M>, the point <M>b - i</M> is closer to the real axis, so <M>\theta</M> is between{' '}
        <M>{'-\\tfrac{\\pi}{6}'}</M> and <M>0</M> and <M>3\theta</M> is between <M>{'-\\tfrac{\\pi}{2}'}</M> and{' '}
        <M>0</M>: <M>z</M> is in the fourth quadrant. Drag <M>b</M> down towards about <M>1.73</M>.
      </Notice>
    )
  } else if (b > INV_SQ3) {
    notice = (
      <Notice>
        Here <M>\theta</M> is between <M>{'-\\tfrac{\\pi}{3}'}</M> and <M>{'-\\tfrac{\\pi}{6}'}</M>, so <M>3\theta</M> is
        between <M>-\pi</M> and <M>{'-\\tfrac{\\pi}{2}'}</M>: <M>z</M> has turned past straight down into the third
        quadrant. Drag <M>b</M> up towards about <M>1.73</M> to bring the orange arrow back to{' '}
        <M>{'-\\tfrac{\\pi}{2}'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Now <M>\theta</M> is below <M>{'-\\tfrac{\\pi}{3}'}</M>, so <M>3\theta</M> is below <M>-\pi</M>: the arrow has
        turned more than half a turn and <M>z</M> is in the second quadrant. Its principal argument is{' '}
        <M>{'3\\theta + 2\\pi'}</M>, a positive angle, so <M>{'\\arg(z) = 3\\arg(b - i)'}</M> only holds up to a whole
        turn. Even as <M>{'b \\to 0'}</M>, <M>3\theta</M> only approaches <M>{'-\\tfrac{3\\pi}{2}'}</M>, so it can never get down
        to <M>{'-\\tfrac{\\pi}{2} - 2\\pi'}</M>: <M>{'-\\tfrac{\\pi}{2}'}</M> is the only target it can hit.
      </Notice>
    )
  }

  const rayRoot = (a: number, len: number, color: string, text: string, attach: Attach) => (
    <>
      <Line.Segment point1={[0, 0]} point2={pt(len, a)} color={color} style="dashed" weight={2.5} />
      <Label at={pt(len, a)} attach={attach} color={color} size={12}>
        {text}
      </Label>
    </>
  )

  return (
    <div>
      <Plane x={[-2, B_MAX]} y={[-2, 2]} xStep={1} yStep={1} height={340} equalScale xLabel="" yLabel="Im" yLabels={v => (Math.abs(v - 1) < 1e-9 ? "1" : "")}>
        <Label at={[B_MAX, 0]} attach="n" size={14} italic>
          Re
        </Label>
        {/* Where b − i can be: the horizontal line Im = −1, right of the imaginary axis since b > 0. */}
        <Line.Segment point1={[0, -1]} point2={[B_MAX, -1]} color={C.guide} weight={2} />
        {roots && <Line.Segment point1={[-2, -1]} point2={[0, -1]} color={C.guide} style="dashed" weight={1.5} />}
        {!roots && (
          <Label at={[B_MAX, -1]} attach="nw" color={C.guide} size={12}>
            Im = −1
          </Label>
        )}

        {roots ? (
          <>
            {rayRoot(-Math.PI / 6, 2.6, C.good, '−π/6', 'e')}
            {rayRoot((-5 * Math.PI) / 6, 2.3, C.bad, '−5π/6', 'se')}
            {rayRoot(Math.PI / 2, 1.5, C.bad, 'π/2', 'w')}
            <Point x={SQ3} y={-1} color={C.good} />
            <Point x={-SQ3} y={-1} color={C.bad} />
          </>
        ) : (
          <>
            {/* The target: straight down the negative imaginary axis. */}
            <Line.Segment point1={[0, 0]} point2={[0, -1.75]} color={C.good} style="dashed" weight={3} />
            <Label at={[0, -1.75]} attach="w" color={C.good} size={12}>
              −π/2
            </Label>
            <Arc r={0.7} a={three} color={zCol} />
            <Label at={pt(0.7, labelA)} attach={attachFor(labelA)} color={zCol} size={12}>
              3θ
            </Label>
            <Vector tail={[0, 0]} tip={tip} color={zCol} weight={3} />
            <Label at={tip} attach={Math.abs(three + Math.PI / 2) < 0.4 ? 'e' : attachFor(three)} color={zCol} size={12}>
              z
            </Label>
          </>
        )}

        <Arc r={0.4} a={theta} color={C.f} />
        {!roots && (
          <Label at={pt(0.4, theta / 2)} attach="e" color={C.f} size={12}>
            θ
          </Label>
        )}
        <Vector tail={[0, 0]} tip={[b, -1]} color={C.f} weight={3} />
        <Label at={[b, -1]} attach={b < 0.8 ? "se" : "s"} color={C.f} size={12}>
          b − i
        </Label>
      </Plane>
      <Controls>
        <Slider
          label="b"
          value={b}
          onChange={v => setB(Math.abs(v - SQ3) < 0.013 ? SQ3 : v)}
          min={B_MIN}
          max={B_MAX}
          step={0.01}
          format={v => (Math.abs(v - SQ3) < 1e-9 ? '√3' : v.toFixed(2))}
        />
        <Toggle label="All three directions whose cube points down" checked={roots} onChange={setRoots} />
        {roots ? (
          <Readouts>
            <Readout color={C.good} tex={'\\theta = -\\tfrac{\\pi}{6}:\\ b = \\sqrt3\\ \\checkmark'} />
            <Readout color={C.bad} tex={'\\theta = -\\tfrac{5\\pi}{6}:\\ b = -\\sqrt3\\ \\times'} />
            <Readout color={C.bad} tex={'\\theta = \\tfrac{\\pi}{2}:\\ \\text{misses } \\mathrm{Im} = -1'} />
          </Readouts>
        ) : (
          <Readouts>
            <Readout color={C.f} tex={`\\theta = \\arg(b - i) = -\\tan^{-1}\\!\\left(\\tfrac{1}{b}\\right) \\approx ${theta.toFixed(3)}`} />
            <Readout color={zCol} tex={`3\\theta \\approx ${three.toFixed(3)}\\quad \\left(-\\tfrac{\\pi}{2} \\approx -1.571\\right)`} />
            <Readout tex={`z = ${at ? '0' : re.toFixed(2)} ${im < 0 ? '-' : '+'} ${Math.abs(im).toFixed(2)}i`} />
            <Readout tex={`|z| = \\left(b^2 + 1\\right)^{3/2} \\approx ${mod.toFixed(2)}\\ \\text{(not to scale)}`} />
          </Readouts>
        )}
        {notice}
      </Controls>
    </div>
  )
}
