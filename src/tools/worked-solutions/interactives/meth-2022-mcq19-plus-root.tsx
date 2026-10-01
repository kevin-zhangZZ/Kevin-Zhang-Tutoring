// 2022 Methods Exam 2 MCQ 19 — V′(x) = 0 has two solutions, and options B (the + root) and D (the
// − root) are those two. Change the sheet's width a and length b: V(x) = x(b − 2x)(a − 2x) is zero at
// x = 0, a/2 and b/2, the box exists only for 0 < x < (shorter side)/2 (shaded), and the − root is
// always the top of the hump inside that domain. The + root always lies between a/2 and b/2, where a
// base side is negative and V < 0 — the cubic's local minimum, not a box. For a square sheet it sits
// exactly at x = a/2, where V = 0. 34% of students chose B.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, num } from './kit'

/** A tidy grid step giving about five gridlines across `range`. */
function niceStep(range: number): number {
  const raw = range / 5
  const p = 10 ** Math.floor(Math.log10(raw))
  const m = raw / p
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p
}

const label = (v: number) => String(Number(v.toFixed(2)))
/** Fixed decimals for TeX, with no '-0.00'. */
const fx = (v: number, dp: number) => (Math.abs(v) < 0.5 * 10 ** -dp ? 0 : v).toFixed(dp)

export default function PlusRoot() {
  const [a, setA] = useState(4)
  const [b, setB] = useState(6)

  const V = (x: number) => x * (b - 2 * x) * (a - 2 * x)
  const root = Math.sqrt(a * a - a * b + b * b)
  const xD = (a + b - root) / 6
  const xB = (a + b + root) / 6
  const vD = V(xD)
  const vB = V(xB)
  const edge = Math.min(a, b) / 2
  const far = Math.max(a, b) / 2
  const square = Math.abs(a - b) < 1e-9
  const short = a < b ? 'a' : 'b'

  const xMax = far * 1.12
  const yTop = vD * 1.35
  const yBot = Math.min(vB, -0.2 * vD) * 1.35

  let notice
  if (square) {
    notice = (
      <Notice tone="warn">
        With a square sheet, B&apos;s <M>{`x = \\tfrac a2 = ${edge.toFixed(2)}`}</M> sits right at the edge of the domain:
        the base shrinks to a point and <M>V = 0</M>, the <b>smallest</b> possible box. D&apos;s{' '}
        <M>{`x = \\tfrac a6 = ${xD.toFixed(2)}`}</M> is the maximum. Now make <M>a</M> and <M>b</M> different to
        watch B leave the domain altogether.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Option B&apos;s <M>{`x \\approx ${xB.toFixed(2)}`}</M> is past <M>{`x = \\tfrac ${short}2 = ${edge.toFixed(2)}`}</M>,
        the edge of the shaded domain. There the side <M>{`${short} - 2x \\approx ${fx(Math.min(a, b) - 2 * xB, 2)}`}</M>{' '}
        is negative, so <M>{`V \\approx ${fx(vB, 2)}`}</M> is not a volume at all: B is the cubic&apos;s local
        minimum. Option D&apos;s <M>{`x \\approx ${xD.toFixed(2)}`}</M> is the top of the hump, the only stationary
        point inside the domain. Change <M>a</M> and <M>b</M>: this never changes. Try <M>a = b</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, xMax]}
        y={[yBot, yTop]}
        xStep={niceStep(xMax)}
        yStep={niceStep(yTop - yBot)}
        height={300}
        yLabel="V"
        xLabels={v => (v > xMax ? '' : label(v))}
        yLabels={v => (v > yTop ? '' : label(v))}
      >
        <Region top={V} bottom={() => 0} from={0} to={edge} color={C.good} opacity={0.18} />
        <Line.Segment point1={[edge, yBot]} point2={[edge, yTop]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[edge, yTop * 0.92]} attach="e" color={C.guide} size={13}>
          {square ? 'x = a/2 = b/2' : `x = ${short}/2`}
        </Label>
        <Plot.OfX y={V} domain={[edge, xMax]} color={C.guide} style="dashed" weight={2} />
        <Plot.OfX y={V} domain={[0, edge]} color={C.f} weight={3} />
        <Point x={xD} y={vD} color={C.good} />
        <Label at={[xD, vD]} attach="n" color={C.good} bold>
          D
        </Label>
        <Point x={xB} y={vB} color={C.bad} />
        <Label at={[xB, vB]} attach={square ? 'ne' : 's'} color={C.bad} bold>
          B
        </Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={1} max={8} step={0.5} format={v => num(v, 1)} />
        <Slider label="b" value={b} onChange={setB} min={1} max={8} step={0.5} format={v => num(v, 1)} />
        <Readouts>
          <Readout color={C.good} tex={`\\text{D: } x \\approx ${xD.toFixed(3)},\\ V \\approx ${vD.toFixed(2)}`} />
          <Readout color={C.bad} tex={`\\text{B: } x \\approx ${xB.toFixed(3)},\\ V \\approx ${fx(vB, 2)}`} />
          <Readout tex={`\\text{domain: } 0 < x < ${edge.toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
