// 2021 Methods Exam 2 Q4h — g(x) = a f(x/b) has two unknowns, so it needs two equations (the
// report's): ∫₀^{50b} a f(x/b) dx = 1 (the area stays 1, i.e. ab = 1) and ∫₀³⁰ a f(x/b) dx = ½
// (half the area left of 30). Drag a and b: g's corners move to (20b, 0.04a) and (50b, 0), so the
// upper terminal is 50b, not 50 (the report's "terminals were often incorrect"). The readouts are
// exact: total area = ab, area left of 30 = ab·F(30/b) with F the cdf of f. It opens at a = 1,
// b = 1.2 (area 1.2, not a pdf). "Keep a = 1/b" reduces it to one unknown; the answer is
// b = 30/(50 − 5√30) = 1.3266… ≈ 1.33, a = 1/b = 0.7538… ≈ 0.75 (sympy).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Point, Readout, Readouts, Region, Slider, Toggle, num } from './kit'

const f = (x: number) => (x < 0 ? 0 : x < 20 ? x / 500 : x <= 50 ? (50 - x) / 750 : 0)
const F = (u: number) => (u <= 0 ? 0 : u < 20 ? (u * u) / 1000 : u <= 50 ? 1 - (50 - u) ** 2 / 1500 : 1)
const MED = 50 - 5 * Math.sqrt(30)
const B_STAR = 30 / MED
const A_STAR = 1 / B_STAR
const X_MAX = 76
const Y_TOP = 0.06

export default function Stretch() {
  const [a, setA] = useState(1)
  const [b, setB] = useState(1.2)
  const [lock, setLock] = useState(false)
  const aa = lock ? 1 / b : a
  const g = (x: number) => aa * f(x / b)
  const total = aa * b
  const left = total * F(30 / b)
  const areaOK = Math.abs(total - 1) < 0.005
  const bOK = Math.abs(b - B_STAR) < 0.005
  const aOK = lock || Math.abs(a - A_STAR) < 0.005
  const done = areaOK && bOK && aOK
  const peak: [number, number] = [20 * b, 0.04 * aa]
  const end = 50 * b

  let notice
  if (!areaOK) {
    notice = (
      <Notice tone="warn">
        The total area under <M>g</M> is <M>{`ab = ${num(total, 3)}`}</M>, not 1, so <M>g</M> is not a probability density
        yet, and it has no median. A horizontal stretch by <M>b</M> multiplies area by <M>b</M>; a vertical stretch by{' '}
        <M>a</M> multiplies it by <M>a</M>. That is the first equation,{' '}
        <M>{'\\int_0^{50b} a\\,f\\!\\left(\\tfrac{x}{b}\\right)dx = 1'}</M>. Its terminal is <M>50b</M>, where <M>g</M> now
        ends ({num(end, 1)} here), not 50. Bring the area to 1, or turn on &ldquo;Keep <M>a = 1/b</M>&rdquo;.
      </Notice>
    )
  } else if (!done) {
    notice = (
      <Notice>
        The area is 1, so <M>g</M> is a density. Its median is <M>b</M> times the old one:{' '}
        <M>{`22.614\\times ${num(b, 2)} = ${num(b * MED, 2)}`}</M>. The second equation,{' '}
        <M>{'\\int_0^{30} a\\,f\\!\\left(\\tfrac{x}{b}\\right)dx = \\tfrac12'}</M>, asks for half the area left of{' '}
        <M>x = 30</M>; the blue area is <M>{num(left, 3)}</M> now. Adjust <M>b</M>
        {lock ? (
          '.'
        ) : (
          <>
            , then re-balance <M>a</M> so that <M>ab</M> stays 1 (or turn on the lock).
          </>
        )}
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>Both equations hold.</b> <M>{'b = \\tfrac{30}{50 - 5\\sqrt{30}} = 1.3266\\ldots \\approx 1.33'}</M> and{' '}
        <M>{'a = \\tfrac1b \\approx 0.75'}</M>. The peak has moved right to <M>{'20b \\approx 26.5'}</M> and dropped to{' '}
        <M>{'0.04a \\approx 0.030'}</M>, and the spins now run up to <M>{'50b \\approx 66.3'}</M>.
        {!lock && (
          <>
            {' '}Here <M>{'ab = 0.9975'}</M>, not exactly 1, only because <M>a</M> and <M>b</M> are rounded.
          </>
        )}
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, X_MAX]} y={[0, Y_TOP]} xStep={10} yStep={0.01} height={300} xLabel="x" yLabel="y">
        <Region top={g} bottom={() => 0} from={0} to={Math.min(30, end)} color={C.f} opacity={0.3} />
        {end > 30 && <Region top={g} bottom={() => 0} from={30} to={end} color={C.g} opacity={0.25} />}
        <Line.Segment point1={[0, 0]} point2={[20, 0.04]} color={C.guide} style="dashed" weight={2} />
        <Line.Segment point1={[20, 0.04]} point2={[50, 0]} color={C.guide} style="dashed" weight={2} />
        <Label at={[44, f(44)]} color={C.guide} attach="sw">f</Label>
        <Line.Segment point1={[0, 0]} point2={peak} color={C.f} weight={3} />
        <Line.Segment point1={peak} point2={[end, 0]} color={C.f} weight={3} />
        <Line.Segment point1={[end, 0]} point2={[X_MAX, 0]} color={C.f} weight={3} />
        <Line.Segment point1={[30, 0]} point2={[30, Y_TOP]} color={done ? C.good : C.ink} style="dashed" weight={1.5} />
        <Label at={[30, Y_TOP * 0.95]} color={done ? C.good : C.ink} attach="w">x = 30</Label>
        <Point x={peak[0]} y={peak[1]} color={C.f} />
        <Point x={end} y={0} color={C.f} />
        <Label at={[end, 0]} color={C.f} attach="ne" gap={9}>{`50b = ${num(end, 1)}`}</Label>
      </Plane>
      <Controls>
        <Slider label="b" value={b} onChange={setB} min={0.8} max={1.5} step={0.01} />
        {lock ? (
          <Readouts>
            <Readout tex={`a = \\tfrac1b = ${num(aa, 4)}`} />
          </Readouts>
        ) : (
          <Slider label="a" value={a} onChange={setA} min={0.5} max={1.2} step={0.01} />
        )}
        <Toggle
          label={<>Keep <M>a = 1/b</M> (area stays 1)</>}
          checked={lock}
          onChange={v => {
            setLock(v)
            if (!v) setA(Math.round(100 / b) / 100)
          }}
        />
        <Readouts>
          <Readout color={areaOK ? C.good : C.bad} tex={`\\int_0^{50b} g(x)\\,dx = ab = ${num(total, 3)}`} />
          <Readout color={done ? C.good : C.f} tex={`\\int_0^{30} g(x)\\,dx = ${num(left, 3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
