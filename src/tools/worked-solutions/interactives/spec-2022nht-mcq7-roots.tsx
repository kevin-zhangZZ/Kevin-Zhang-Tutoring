// 2022 Specialist NHT Exam 2 MCQ 7 — where the five solutions of z⁵ = 6 + 30i sit. Every solution
// has modulus 936^(1/10) ≈ 1.98 (the dashed circle), and the first has argument tan⁻¹(5)/5 ≈ 15.7°,
// a fifth of Arg(6 + 30i) ≈ 78.7° (the grey ray). The slider adds the others one at a time, each a
// further 2π/5 = 72° round the circle, so they land at ≈ 15.7°, 87.7°, 159.7°, 231.7° and 303.7°
// (sympy's roots agree): option A's picture. The toggle adds option E's five points, the mirror
// images in the real axis (measured from the 300 dpi crop at ≈ 57°, 128°, 199°, 272°, 345°): those
// are the solutions of z⁵ = 6 − 30i, the conjugate equation.

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, Notice, Plane, Point, Slider, Toggle } from './kit'

const R = 936 ** 0.1
const ARGW = Math.atan(5)
const DEG = 180 / Math.PI
const angle = (k: number) => ARGW / 5 + (2 * Math.PI * k) / 5
const at = (t: number): [number, number] => [R * Math.cos(t), R * Math.sin(t)]

export default function RootsWidget() {
  const [count, setCount] = useState(1)
  const [showE, setShowE] = useState(false)
  const ks = Array.from({ length: count }, (_, k) => k)

  let notice
  if (showE) {
    notice = (
      <>
        The red points are option E&apos;s: the five solutions reflected in the real axis. Reflecting conjugates every point, and{' '}
        <M>{'\\overline{z}^{\\,5}=\\overline{z^5}'}</M>, so they solve <M>{'z^5=6-30i'}</M>, not <M>{'z^5=6+30i'}</M>. The give-away
        is the point just <i>below</i> the positive real axis, at <M>{'-15.7^\\circ'}</M> instead of <M>{'+15.7^\\circ'}</M>.
      </>
    )
  } else if (count === 1) {
    notice = (
      <>
        The first solution has modulus <M>{'936^{1/10}\\approx1.98'}</M> and argument <M>{'\\tfrac15\\tan^{-1}5\\approx15.7^\\circ'}</M>,
        a fifth of the grey ray&apos;s angle <M>{'\\operatorname{Arg}(6+30i)\\approx78.7^\\circ'}</M>. Now slide to add the others.
      </>
    )
  } else if (count < 5) {
    notice = (
      <>
        Each new solution is the last one turned a further <M>{'\\tfrac{2\\pi}{5}=72^\\circ'}</M> round the same circle: adding{' '}
        <M>{'2\\pi'}</M> to the argument of <M>{'6+30i'}</M> changes nothing, but a fifth of it does.
      </>
    )
  } else {
    notice = (
      <>
        All five: equally spaced on the circle of radius <M>\approx 1.98</M>, one at <M>{'15.7^\\circ'}</M> just above the positive real
        axis and one at <M>{'87.7^\\circ'}</M> just right of the positive imaginary axis. That is option A&apos;s picture. Turn on
        option E to see the near miss.
      </>
    )
  }

  return (
    <div>
      <Plane x={[-3, 3]} y={[-3, 3]} xStep={1} yStep={1} equalScale height={330} xLabel="Re" yLabel="Im" label="Solutions of z⁵ = 6 + 30i on the Argand plane">
        <Circle center={[0, 0]} radius={R} color={C.guide} fillOpacity={0} strokeStyle="dashed" weight={1.5} />
        <Line.Segment point1={[0, 0]} point2={[2.7 * Math.cos(ARGW), 2.7 * Math.sin(ARGW)]} color={C.guide} weight={2} style="dashed" />
        <Label at={[2.7 * Math.cos(ARGW), 2.7 * Math.sin(ARGW)]} color={C.guide} attach="e" gap={6} size={12}>
          Arg(6 + 30i)
        </Label>
        {ks.map(k => (
          <Line.Segment key={`s${k}`} point1={[0, 0]} point2={at(angle(k))} color={C.f} weight={1.5} opacity={0.5} />
        ))}
        {ks.map(k => (
          <Point key={k} x={at(angle(k))[0]} y={at(angle(k))[1]} color={C.f} />
        ))}
        {ks.map(k => (
          <Label key={`l${k}`} at={at(angle(k))} color={C.f} attach={angle(k) * DEG > 180 ? 's' : 'n'} gap={9} size={12}>
            {`${(angle(k) * DEG).toFixed(1)}°`}
          </Label>
        ))}
        {showE &&
          [0, 1, 2, 3, 4].map(k => {
            const [x, y] = at(angle(k))
            return <Point key={`e${k}`} x={x} y={-y} color={C.bad} />
          })}
      </Plane>
      <Controls>
        <Slider label="\text{solutions}" value={count} onChange={setCount} min={1} max={5} step={1} format={v => String(v)} />
        <div className="flex flex-wrap items-center gap-2">
          <Toggle label="Show option E's points" checked={showE} onChange={setShowE} />
        </div>
        <Notice tone={showE ? 'warn' : count === 5 ? 'good' : 'neutral'}>{notice}</Notice>
      </Controls>
    </div>
  )
}
