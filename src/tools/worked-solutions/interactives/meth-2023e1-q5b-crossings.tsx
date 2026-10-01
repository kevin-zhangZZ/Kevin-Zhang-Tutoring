// 2023 Methods Exam 1 Q5b — sin(k) = 1/2 has two solutions per revolution, so the domain
// −3π < k < 2π (shaded) holds four of them, not two. A slider steps n through the general
// solutions k = π/6 + 2nπ and k = 5π/6 + 2nπ: n = 0 and n = −1 land inside, while n = −2
// (−19π/6 is just past −3π = −18π/6) and n = 1 (13π/6 is just past 2π = 12π/6) land outside,
// and the extra half revolution −3π < k < −2π adds nothing because sin(k) is negative there.
// A toggle shows part a.'s common slip (cos as the antiderivative of sin, giving −1/2) turning
// the equation into sin(k) = 3/2, a line that never meets the curve.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle } from './kit'

const PI = Math.PI
const LO = -3 * PI
const HI = 2 * PI
const NS = [-2, -1, 0, 1]
// The view: one revolution beyond each end of the domain, so n = −2 and n = 1 show up outside it.
const XL = -4 * PI - 0.3
const XR = 3 * PI + 0.6

/** Numerator of k/(π/6) for the two families: π/6 + 2nπ and 5π/6 + 2nπ. */
const nums = (n: number): [number, number] => [1 + 12 * n, 5 + 12 * n]
const inside = (num: number) => num > -18 && num < 12
const kTex = (num: number) => {
  const sign = num < 0 ? '-' : ''
  const a = Math.abs(num)
  return `${sign}\\tfrac{${a === 1 ? '' : a}\\pi}{6}`
}
const piTick = (v: number) => {
  const m = Math.round(v / PI)
  if (m === 0) return ''
  if (m === 1) return 'π'
  if (m === -1) return '−π'
  return `${m < 0 ? '−' : ''}${Math.abs(m)}π`
}
const yTick = (v: number) => (Math.abs(Math.abs(v) - 1) < 1e-9 ? (v < 0 ? '−1' : '1') : '')

export default function Crossings() {
  const [n, setN] = useState(-1)
  const [wrong, setWrong] = useState(false)

  // Part a. is 1/2, so 1 − sin(k) = 1/2 gives sin(k) = 1/2. With cos as the antiderivative,
  // part a. would be [cos x]_0^{π/3} = 1/2 − 1 = −1/2, so sin(k) = 1 − (−1/2) = 3/2.
  const c = wrong ? 1.5 : 0.5
  const [p, q] = nums(n)

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        With <M>\cos(x)</M> as the antiderivative, part a. becomes{' '}
        <M>{'\\bigl[\\cos(x)\\bigr]_0^{\\pi/3} = \\tfrac12 - 1 = -\\tfrac12'}</M>, so part b. turns into{' '}
        <M>{'1-\\sin(k) = -\\tfrac12'}</M>, i.e. <M>{'\\sin(k) = \\tfrac32'}</M>. The red line sits above the whole
        curve because <M>\sin(k)</M> is never more than 1, so there is no solution for any <M>n</M>. A value
        outside <M>[-1,1]</M> means part a. needs fixing. Turn the toggle off.
      </Notice>
    )
  } else if (n === 0) {
    notice = (
      <Notice>
        <M>n = 0</M> gives the first-revolution answers: the reference angle <M>{'\\tfrac{\\pi}{6}'}</M> (1st
        quadrant) and <M>{'\\pi - \\tfrac{\\pi}{6} = \\tfrac{5\\pi}{6}'}</M> (2nd quadrant). Both are inside the
        shaded domain, but the domain is much wider than one revolution. Slide <M>n</M> down to <M>-1</M>.
      </Notice>
    )
  } else if (n === -1) {
    notice = (
      <Notice tone="good">
        <M>n = -1</M> moves both first-revolution answers back one revolution (subtract <M>2\pi</M>):{' '}
        <M>{'-\\tfrac{11\\pi}{6}'}</M> and <M>{'-\\tfrac{7\\pi}{6}'}</M>. Both are inside the shaded domain, so they
        are answers too, and they are the easy ones to miss. Now try <M>n = -2</M>.
      </Notice>
    )
  } else if (n === -2) {
    notice = (
      <Notice>
        <M>n = -2</M> gives <M>{'-\\tfrac{23\\pi}{6}'}</M> and <M>{'-\\tfrac{19\\pi}{6}'}</M>. The left edge is{' '}
        <M>{'-3\\pi = -\\tfrac{18\\pi}{6}'}</M>, so even <M>{'-\\tfrac{19\\pi}{6}'}</M> is just outside. The half
        revolution from <M>-3\pi</M> to <M>-2\pi</M> holds no answer, because the curve is below the axis there.
        Now check the other end with <M>n = 1</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>n = 1</M> gives <M>{'\\tfrac{13\\pi}{6}'}</M> and <M>{'\\tfrac{17\\pi}{6}'}</M>. The right edge is{' '}
        <M>{'2\\pi = \\tfrac{12\\pi}{6}'}</M>, so both are outside. Only <M>n = 0</M> and <M>n = -1</M> work: the
        four green dots, <M>{'k = -\\tfrac{11\\pi}{6}, -\\tfrac{7\\pi}{6}, \\tfrac{\\pi}{6}, \\tfrac{5\\pi}{6}'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[XL, XR]} y={[-1.75, 2]} xStep={PI} yStep={0.5} height={300} xLabel="k" xLabels={false} yLabels={yTick}>
        <Region top={() => 2} bottom={() => -1.45} from={LO} to={HI} color={C.guide} opacity={0.14} />
        <Line.Segment point1={[LO, -1.45]} point2={[LO, 2]} color={C.guide} style="dashed" weight={2} />
        <Line.Segment point1={[HI, -1.45]} point2={[HI, 2]} color={C.guide} style="dashed" weight={2} />
        <Label at={[LO, -1.3]} attach="e" size={12} gap={5}>−3π &lt; k &lt; 2π</Label>
        <Plot.OfX y={Math.sin} domain={[XL, XR]} color={C.f} weight={3} />
        <Label at={[2.5 * PI, 1]} color={C.f} attach="n">sin(k)</Label>
        {[-4, -3, -2, -1, 0, 1, 2, 3].map(m => (
          <Label key={m} at={[m * PI, -1.62]} attach="c" size={12}>
            {m === 0 ? '0' : piTick(m * PI)}
          </Label>
        ))}
        <Line.Segment point1={[XL, c]} point2={[XR, c]} color={wrong ? C.bad : C.g} weight={2.5} />
        <Label at={[1.5 * PI, c]} color={wrong ? C.bad : C.g} attach="n" gap={5}>
          {wrong ? 'y = 3/2' : 'y = 1/2'}
        </Label>
        {!wrong &&
          NS.flatMap(m => nums(m)).map(num => (
            <Point key={num} x={(num * PI) / 6} y={0.5} color={inside(num) ? C.good : C.guide} />
          ))}
        {!wrong &&
          [p, q].map(num => (
            <Point
              key={`cur${num}`}
              x={(num * PI) / 6}
              y={0.5}
              color={inside(num) ? C.good : C.bad}
              svgCircleProps={{ r: 8, strokeWidth: 3 }}
            />
          ))}
      </Plane>
      <Controls>
        <Slider
          label="n"
          value={n}
          onChange={setN}
          min={-2}
          max={1}
          step={1}
          format={v => (v < 0 ? `−${-v}` : String(v))}
        />
        <Buttons>
          <Toggle
            label={
              <>
                What if part a. used <M>\cos(x)</M>?
              </>
            }
            checked={wrong}
            onChange={setWrong}
          />
        </Buttons>
        <Readouts>
          {wrong ? (
            <Readout color={C.bad} tex={'\\sin(k) = \\tfrac32 > 1\\text{, so no solution}'} />
          ) : (
            [p, q].map(num => (
              <Readout
                key={num}
                color={inside(num) ? C.good : C.bad}
                tex={`k = ${kTex(num)}\\ ${inside(num) ? '\\text{inside}\\ \\checkmark' : '\\text{outside}\\ \\times'}`}
              />
            ))
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
