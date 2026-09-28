// 2018 Specialist Exam 1 Q2b — which argument actually points at √3 − i? The examiner's report
// says π/6, 5π/6 and π/3 were given frequently. Pick each candidate θ and the widget draws
// 2 cis(θ) on the Argand plane next to the real point √3 − i: only −π/6 (and 11π/6, which is an
// argument but not the principal one) lands on it. The 1–√3–2 reference triangle gives the size
// of the angle; the quadrant gives its sign. A toggle draws every direction with tan θ = −1/√3,
// showing why tan⁻¹ of the ratio can't tell √3 − i from its opposite −√3 + i.

import { useState } from 'react'
import { Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Toggle, Vector } from './kit'

const R3 = Math.sqrt(3)

type Cand = {
  theta: number
  /** TeX for θ. */
  tex: string
  /** Plain text for the arc label on the plane. */
  label: string
  /** 2 cis(θ) in cartesian form: plain text for the plane, TeX for the readout. */
  cart: string
  cartTex: string
  tanTex: string
  hits: boolean
}

const CANDS: Cand[] = [
  { theta: Math.PI / 6, tex: '\\tfrac{\\pi}{6}', label: 'π/6', cart: '√3 + i', cartTex: '\\sqrt3 + i', tanTex: '\\tfrac{1}{\\sqrt3}', hits: false },
  { theta: Math.PI / 3, tex: '\\tfrac{\\pi}{3}', label: 'π/3', cart: '1 + √3 i', cartTex: '1 + \\sqrt3\\,i', tanTex: '\\sqrt3', hits: false },
  { theta: (5 * Math.PI) / 6, tex: '\\tfrac{5\\pi}{6}', label: '5π/6', cart: '−√3 + i', cartTex: '-\\sqrt3 + i', tanTex: '-\\tfrac{1}{\\sqrt3}', hits: false },
  { theta: (11 * Math.PI) / 6, tex: '\\tfrac{11\\pi}{6}', label: '11π/6', cart: '√3 − i', cartTex: '\\sqrt3 - i', tanTex: '-\\tfrac{1}{\\sqrt3}', hits: true },
  { theta: -Math.PI / 6, tex: '-\\tfrac{\\pi}{6}', label: '−π/6', cart: '√3 − i', cartTex: '\\sqrt3 - i', tanTex: '-\\tfrac{1}{\\sqrt3}', hits: true },
]

export default function Quadrant() {
  const [idx, setIdx] = useState(0)
  const [tanLine, setTanLine] = useState(false)
  const c = CANDS[idx]
  const tip: [number, number] = [2 * Math.cos(c.theta), 2 * Math.sin(c.theta)]
  const col = c.hits ? C.good : C.g
  const arcR = 0.55
  const mid = c.theta / 2
  const lo = Math.min(0, c.theta)
  const hi = Math.max(0, c.theta)

  let notice
  if (idx === 0) {
    notice = (
      <Notice tone="warn">
        <M>{'2\\operatorname{cis}\\left(\\tfrac{\\pi}{6}\\right) = \\sqrt3 + i'}</M> is the point <b>above</b> the
        real axis. <M>{'\\tan^{-1}\\!\\left(\\tfrac{1}{\\sqrt3}\\right) = \\tfrac{\\pi}{6}'}</M> only gives the size of
        the angle in the triangle. <M>{'\\sqrt3 - i'}</M> has a negative imaginary part, so it sits below the axis and
        the angle is measured clockwise. Try the other candidates.
      </Notice>
    )
  } else if (idx === 1) {
    notice = (
      <Notice tone="warn">
        <M>{'2\\operatorname{cis}\\left(\\tfrac{\\pi}{3}\\right) = 1 + \\sqrt3\\,i'}</M>: the ratio is upside down. The
        tangent of the argument is imaginary part over real part, <M>{'\\tfrac{-1}{\\sqrt3}'}</M>, not{' '}
        <M>{'\\tfrac{\\sqrt3}{1}'}</M>. In the triangle the side <em>opposite</em> the angle is 1 and the side along
        the real axis is <M>{'\\sqrt3'}</M>, so the angle is the small one, <M>{'\\tfrac{\\pi}{6}'}</M>.
      </Notice>
    )
  } else if (idx === 2) {
    notice = (
      <Notice tone="warn">
        <M>{'2\\operatorname{cis}\\left(\\tfrac{5\\pi}{6}\\right) = -\\sqrt3 + i'}</M> is exactly <b>opposite</b>{' '}
        <M>{'\\sqrt3 - i'}</M>. Its tangent is also <M>{'-\\tfrac{1}{\\sqrt3}'}</M>: turn on the tan line and both
        directions sit on it. The equation <M>{'\\tan\\theta = -\\tfrac{1}{\\sqrt3}'}</M> can&apos;t tell opposite
        directions apart. Only the quadrant of the point can.
      </Notice>
    )
  } else if (idx === 3) {
    notice = (
      <Notice>
        <M>{'2\\operatorname{cis}\\left(\\tfrac{11\\pi}{6}\\right)'}</M> does land on <M>{'\\sqrt3 - i'}</M>, so{' '}
        <M>{'\\tfrac{11\\pi}{6}'}</M> is <em>an</em> argument. But the principal argument lies in{' '}
        <M>{'(-\\pi, \\pi]'}</M>, and <M>{'\\tfrac{11\\pi}{6} - 2\\pi = -\\tfrac{\\pi}{6}'}</M>. Both give the same
        answer in part b; <M>{'-\\tfrac{\\pi}{6}'}</M> keeps the numbers smaller.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>This one lands on <M>{'\\sqrt3 - i'}</M>.</b> Across <M>{'\\sqrt3'}</M>, down 1: that is the 1, <M>{'\\sqrt3'}</M>,
        2 triangle, whose angle at the origin is <M>{'\\tfrac{\\pi}{6}'}</M>. Down means clockwise, so{' '}
        <M>{'\\operatorname{Arg}(\\sqrt3 - i) = -\\tfrac{\\pi}{6}'}</M> and <M>{'\\sqrt3 - i = 2\\operatorname{cis}\\left(-\\tfrac{\\pi}{6}\\right)'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.6, 2.6]} y={[-2.3, 2.3]} xStep={1} yStep={1} height={400} equalScale xLabel="Re" yLabel="Im">
        <Circle center={[0, 0]} radius={2} color={C.guide} fillOpacity={0} strokeStyle="dashed" />
        <Label at={[-2 * Math.SQRT1_2, -2 * Math.SQRT1_2]} attach="sw" color={C.guide} size={12}>
          |z| = 2
        </Label>
        {tanLine && (
          <>
            <Line.ThroughPoints point1={[0, 0]} point2={[R3, -1]} color={C.violet} style="dashed" weight={2} />
            <Point x={-R3} y={1} color={C.violet} />
          </>
        )}
        {/* The reference triangle: across √3, down 1, hypotenuse 2. */}
        <Line.Segment point1={[0, 0]} point2={[R3, 0]} color={C.f} style="dashed" weight={2} />
        <Line.Segment point1={[R3, 0]} point2={[R3, -1]} color={C.f} style="dashed" weight={2} />
        <Line.Segment point1={[0, 0]} point2={[R3, -1]} color={C.f} weight={2} />
        <Label at={[1.45, 0]} attach="s" color={C.f} size={12}>
          √3
        </Label>
        <Label at={[R3, -0.5]} attach="w" color={C.f} size={12}>
          1
        </Label>
        <Label at={[R3 / 2, -0.5]} attach="sw" color={C.f} size={12}>
          2
        </Label>
        <Plot.Parametric xy={t => [arcR * Math.cos(t), arcR * Math.sin(t)]} domain={[lo, hi]} color={col} weight={2.5} />
        <Label at={[0.88 * Math.cos(mid), 0.88 * Math.sin(mid)]} attach="c" color={col} size={12}>
          {c.label}
        </Label>
        <Vector tail={[0, 0]} tip={tip} color={col} weight={3} />
        {!c.hits && (
          <Label at={tip} attach={tip[0] > 0 ? 'e' : 'w'} color={col} size={13}>
            {c.cart}
          </Label>
        )}
        <Point x={R3} y={-1} color={C.f} />
        <Label at={[R3, -1]} attach="se" color={C.f}>
          √3 − i
        </Label>
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12.5px] text-gray-600 dark:text-gray-400">Try <M>\theta =</M></span>
          {CANDS.map((k, i) => (
            <Toggle key={k.label} label={<M>{k.tex}</M>} checked={i === idx} onChange={() => setIdx(i)} />
          ))}
        </div>
        <Buttons>
          <Toggle label="Show every direction with tan θ = −1/√3" checked={tanLine} onChange={setTanLine} />
        </Buttons>
        <Readouts>
          <Readout color={col} tex={`2\\operatorname{cis}\\left(${c.tex}\\right) = ${c.cartTex}`} />
          <Readout tex={`\\tan\\left(${c.tex}\\right) = ${c.tanTex}`} />
          <Readout color={C.f} tex={`\\text{target: } \\sqrt3 - i`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
