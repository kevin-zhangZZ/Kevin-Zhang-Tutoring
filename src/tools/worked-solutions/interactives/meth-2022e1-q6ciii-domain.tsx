// 2022 Methods Exam 1 Q6c.iii — choose the domain D of h, then apply the translation
// (π/2 right, 2 up) and see where the image lands. The rule always matches g (parts c.i and c.ii);
// only D decides whether the image covers exactly [0, 2π]. Starts at the report's common wrong
// answer D = [π/2, 5π/2], whose image overshoots to [π, 3π]; the fit is D = [−π/2, 3π/2].

import { useState } from 'react'
import { C, Controls, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Vector } from './kit'

const PI = Math.PI
const A = PI / 2
const B = 2
const h = (x: number) => 2 * Math.sin(2 * x) - 1
const g = (x: number) => 1 - 2 * Math.sin(2 * x)
const near = (u: number, v: number) => Math.abs(u - v) < 1e-6

/** Half-multiples of π as tick text. */
const halfPi = (v: number) => {
  const n = Math.round((2 * v) / PI)
  if (!near(v, (n * PI) / 2) || n === 0 || n < -2 || n > 6) return ''
  const s = n < 0 ? '−' : ''
  const m = Math.abs(n)
  if (m % 2 === 0) return `${s}${m === 2 ? '' : m / 2}π`
  return `${s}${m === 1 ? '' : m}π/2`
}

/** Quarter-multiples of π as TeX. */
const texPi = (v: number) => {
  const q = Math.round((4 * v) / PI)
  if (q === 0) return '0'
  const s = q < 0 ? '-' : ''
  const m = Math.abs(q)
  if (m % 4 === 0) return `${s}${m === 4 ? '' : m / 4}\\pi`
  if (m % 2 === 0) return `${s}\\tfrac{${m / 2 === 1 ? '' : m / 2}\\pi}{2}`
  return `${s}\\tfrac{${m === 1 ? '' : m}\\pi}{4}`
}

/** Quarter-multiples of π as plain text, for the slider. */
const textPi = (v: number) => {
  const q = Math.round((4 * v) / PI)
  if (q === 0) return '0'
  const s = q < 0 ? '−' : ''
  const m = Math.abs(q)
  if (m % 4 === 0) return `${s}${m === 4 ? '' : m / 4}π`
  if (m % 2 === 0) return `${s}${m / 2 === 1 ? '' : m / 2}π/2`
  return `${s}${m === 1 ? '' : m}π/4`
}

export default function DomainBack() {
  const [d, setD] = useState(PI / 2)
  const e = d + 2 * PI
  const i0 = d + A
  const i1 = e + A
  const fit = near(i0, 0)
  const common = near(d, PI / 2)
  const imgColor = fit ? C.good : C.violet

  // Pieces of the image inside g's domain [0, 2π], and any part hanging outside it.
  const in0 = Math.max(0, i0)
  const in1 = Math.min(2 * PI, i1)

  let notice
  if (fit) {
    notice = (
      <Notice tone="good">
        <b>A perfect fit.</b> The image starts at <M>{'-\\tfrac\\pi2+\\tfrac\\pi2=0'}</M> and ends at{' '}
        <M>{'\\tfrac{3\\pi}2+\\tfrac\\pi2=2\\pi'}</M>, so it covers <M>g</M> exactly. That is why{' '}
        <M>{'D=\\left[-\\tfrac\\pi2,\\tfrac{3\\pi}2\\right]'}</M>: it is <M>g</M>&apos;s domain moved <b>back</b>{' '}
        <M>{'\\tfrac\\pi2'}</M>. Move the slider one step either way: the image then misses one end of{' '}
        <M>g</M> and overshoots the other.
      </Notice>
    )
  } else if (common) {
    notice = (
      <Notice tone="warn">
        <M>{'D=\\left[\\tfrac\\pi2,\\tfrac{5\\pi}2\\right]'}</M> was the report&apos;s common wrong answer: it adds{' '}
        <M>{'\\tfrac\\pi2'}</M> to <M>{'[0,2\\pi]'}</M>. But <M>D</M> is where <M>h</M> sits <em>before</em> the shift.
        Moving it right <M>{'\\tfrac\\pi2'}</M> lands the image on <M>{'[\\pi,3\\pi]'}</M>: the red part overshoots and{' '}
        <M>{'[0,\\pi]'}</M> of <M>g</M> is left uncovered. Slide <M>D</M> to the left.
      </Notice>
    )
  } else if (i0 > 0) {
    notice = (
      <Notice>
        The image starts at <M>{texPi(i0)}</M>, to the right of where <M>g</M> starts (<M>0</M>), and the red part runs
        past <M>{'2\\pi'}</M>. The translation always pushes the graph right by <M>{'\\tfrac\\pi2'}</M>, so <M>D</M> has
        to start <M>{'\\tfrac\\pi2'}</M> to the left of <M>0</M>. Keep sliding left.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now the image starts at <M>{texPi(i0)}</M>, before <M>g</M> even begins: the red part hangs off the left and{' '}
        <M>g</M> is not covered all the way to <M>{'2\\pi'}</M>. Slide <M>D</M> back to the right until the image starts
        at exactly <M>0</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-PI, 3 * PI + 0.45]}y={[-3.3, 3.3]} xStep={PI / 2} yStep={1} height={300} xLabels={halfPi}>
        {/* Target: g on [0, 2π]. */}
        <Plot.OfX y={g} domain={[0, 2 * PI]} color={C.g} weight={7} opacity={0.4} />
        <Point x={0} y={g(0)} color={C.g} />
        <Point x={2 * PI} y={g(2 * PI)} color={C.g} />
        {/* h on D, before the translation. */}
        <Plot.OfX y={h} domain={[d, e]} color={C.f} weight={2} style="dashed" />
        <Point x={d} y={h(d)} color={C.f} />
        <Point x={e} y={h(e)} color={C.f} />
        {/* The image: π/2 right, 2 up. */}
        {in1 > in0 && <Plot.OfX y={g} domain={[in0, in1]} color={imgColor} weight={3} />}
        {i0 < 0 && <Plot.OfX y={g} domain={[i0, 0]} color={C.bad} weight={3} />}
        {i1 > 2 * PI && <Plot.OfX y={g} domain={[2 * PI, i1]} color={C.bad} weight={3} />}
        <Vector tail={[d, h(d)]} tip={[i0, h(d) + B]} color={C.ink} weight={2} />
        <Point x={i0} y={g(i0)} color={i0 < -1e-6 ? C.bad : imgColor} />
        <Point x={i1} y={g(i1)} color={i1 > 2 * PI + 1e-6 ? C.bad : imgColor} />
      </Plane>
      <Controls>
        <Slider label="D\text{ starts at}" value={d} onChange={setD} min={-PI} max={PI / 2} step={PI / 4} format={textPi} />
        <Readouts>
          <Readout color={C.f} tex={`D = \\left[${texPi(d)},\\ ${texPi(e)}\\right]`} />
          <Readout color={fit ? C.good : C.violet} tex={`\\text{image: }\\left[${texPi(i0)},\\ ${texPi(i1)}\\right]`} />
          <Readout color={C.g} tex={`\\text{dom}\\,g = [0,\\ 2\\pi]`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
