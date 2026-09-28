// 2018 Specialist Exam 2 MCQ 11 — why two values of m give a 30° angle. a = mi + j and b = i + mj are
// mirror images in y = x, so the angle between them is twice the angle each makes with y = x. For 30°
// each must sit 15° off the mirror, on one side (m = √3) or the other (m = 1/√3); replacing m by 1/m
// just swaps the directions of a and b. The readouts give cos θ = 2m/(m² + 1). The option-B values
// m = 2 ± √3 give cos θ = ½, a 60° angle: what using sin 30° instead of cos 30° produces.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Slider, Vector } from './kit'

const S3 = Math.sqrt(3)
const R = 0.8 // radius of the angle arc

export default function Mirror() {
  const [m, setM] = useState(S3)

  const alpha = Math.atan2(1, m) // direction of a
  const beta = Math.atan2(m, 1) // direction of b
  const cos = (2 * m) / (m * m + 1)
  const theta = (Math.acos(Math.min(1, cos)) * 180) / Math.PI
  const off = Math.abs(45 - (alpha * 180) / Math.PI) // each vector's angle from y = x
  const lo = Math.min(alpha, beta)
  const hi = Math.max(alpha, beta)

  const is30 = Math.abs(theta - 30) < 0.4
  const is60 = Math.abs(theta - 60) < 0.4
  let notice
  if (is30 && m > 1) {
    notice = (
      <Notice tone="good">
        <M>{'m=\\sqrt3'}</M>: <M>{'\\underset{\\sim}{a}=(\\sqrt3,1)'}</M> is <M>{'30^\\circ'}</M> above the <M>x</M>-axis
        and <M>{'\\underset{\\sim}{b}=(1,\\sqrt3)'}</M> is <M>{'60^\\circ'}</M> above it, so they are{' '}
        <M>{'30^\\circ'}</M> apart, each <M>{'15^\\circ'}</M> off the mirror <M>y=x</M>. Now tap{' '}
        <M>{'m=\\tfrac{1}{\\sqrt3}'}</M>.
      </Notice>
    )
  } else if (is30) {
    notice = (
      <Notice tone="good">
        <M>{'m=\\tfrac{1}{\\sqrt3}'}</M>: the two vectors have swapped sides of <M>y=x</M> (now <M>{'\\underset{\\sim}{a}'}</M>{' '}
        is the steep one), but they are still <M>{'15^\\circ'}</M> either side of it, so the angle is still{' '}
        <M>{'30^\\circ'}</M>. Replacing <M>m</M> by <M>{'\\tfrac1m'}</M> only swaps the directions, which is why the two
        roots are reciprocals.
      </Notice>
    )
  } else if (is60) {
    notice = (
      <Notice tone="warn">
        <M>{'m=2\\pm\\sqrt3'}</M> (option B) gives <M>{'\\tfrac{2m}{m^2+1}=\\tfrac12'}</M>, so{' '}
        <M>{'\\theta=60^\\circ'}</M>, not <M>{'30^\\circ'}</M>. That is what setting the ratio equal to{' '}
        <M>{'\\sin(30^\\circ)=\\tfrac12'}</M> produces. The dot product formula needs the cosine.
      </Notice>
    )
  } else if (Math.abs(m - 1) < 0.02) {
    notice = (
      <Notice>
        At <M>m=1</M> both vectors are <M>(1,1)</M>, on the mirror itself, so the angle is <M>{'0^\\circ'}</M>. Move{' '}
        <M>m</M> either way and they open up symmetrically about <M>y=x</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The two vectors are mirror images in <M>y=x</M>, so the angle between them is twice the angle each makes with
        the mirror. For <M>{'30^\\circ'}</M> each must sit <M>{'15^\\circ'}</M> off <M>y=x</M>, on one side or the
        other. Slide <M>m</M> past <M>1</M> to see both.
      </Notice>
    )
  }

  return (
    <div>
      <div className="mx-auto max-w-[400px]">
      <Plane x={[-0.4, 4.2]} y={[-0.4, 4.2]} equalScale height={360}>
        <Line.Segment point1={[-0.4, -0.4]} point2={[4.2, 4.2]} color={C.violet} style="dashed" weight={1.5} />
        <Label at={[3.9, 3.9]} attach="se" color={C.violet}>
          y = x
        </Label>
        {hi - lo > 0.01 && (
          <Plot.Parametric xy={t => [R * Math.cos(t), R * Math.sin(t)]} domain={[lo, hi]} color={C.good} weight={2.5} />
        )}
        <Vector tail={[0, 0]} tip={[m, 1]} color={C.f} weight={3} />
        <Vector tail={[0, 0]} tip={[1, m]} color={C.g} weight={3} />
        <Label at={[m, 1]} attach={m > 1 ? 'e' : 'ne'} color={C.f}>
          a
        </Label>
        <Label at={[1, m]} attach={m > 1 ? 'n' : 'se'} color={C.g}>
          b
        </Label>
        {hi - lo > 0.15 && (
          <Label at={[1.05 * R * Math.SQRT1_2, 1.05 * R * Math.SQRT1_2]} attach="ne" color={C.good}>
            θ
          </Label>
        )}
      </Plane>
      </div>
      <Controls>
        <Slider label="m" value={m} onChange={setM} min={0} max={4} step={0.01} />
        <Buttons>
          <ActionButton label={<M>{'m=\\sqrt3'}</M>} onClick={() => setM(S3)} />
          <ActionButton label={<M>{'m=\\tfrac{1}{\\sqrt3}'}</M>} onClick={() => setM(1 / S3)} />
          <ActionButton label={<M>{'m=2+\\sqrt3\\ \\text{(B)}'}</M>} onClick={() => setM(2 + S3)} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\cos\\theta=\\frac{2m}{m^2+1}\\approx ${cos.toFixed(3)}`} />
          <Readout color={C.good} tex={`\\theta\\approx ${theta.toFixed(1)}^\\circ`} />
          <Readout color={C.violet} tex={`\\text{each vector } ${off.toFixed(1)}^\\circ \\text{ off } y=x`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
