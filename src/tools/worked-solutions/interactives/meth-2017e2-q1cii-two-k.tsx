// 2017 Methods Exam 2 Q1c(ii) — why CD = k + 1 has two solutions. Plot both sides against k:
// CD(k) = 2√(k² − 2k + 2) is U-shaped with its lowest point (1, 2), where C and D sit on the x-axis,
// and the rising line k + 1 passes through that lowest point and then cuts the U again at
// k = 7/3 (both lengths 10/3). Slide k to see which side is longer on each interval.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num } from './kit'

const cd = (k: number) => 2 * Math.sqrt(k * k - 2 * k + 2)
const line = (k: number) => k + 1
const K2 = 7 / 3

export default function TwoK() {
  const [k, setK] = useState(1.7)
  const near1 = Math.abs(k - 1) < 0.03
  const near2 = Math.abs(k - K2) < 0.03
  const d = cd(k)
  const l = line(k)

  let notice
  if (near1) {
    notice = (
      <Notice tone="good">
        <b>First match, <M>k = 1</M>:</b> <M>{'CD = 2\\sqrt{1} = 2'}</M> and <M>k + 1 = 2</M>. Here <M>{'g(\\pm1) = 0'}</M>, so
        the chord is horizontal and as short as it can be. Keep sliding &mdash; the line is still climbing, and the U will
        catch it again.
      </Notice>
    )
  } else if (near2) {
    notice = (
      <Notice tone="good">
        <b>Second match, <M>{'k = \\tfrac73'}</M>:</b> <M>{'CD = k + 1 = \\tfrac{10}{3}'}</M>. Both roots of{' '}
        <M>{'3k^2 - 10k + 7 = 0'}</M> are positive, so both are allowed by <M>{'k \\in R^+'}</M>. An answer with only one
        value loses the mark.
      </Notice>
    )
  } else if (k < 1) {
    notice = (
      <Notice>
        For small <M>k</M>, <M>CD</M> (blue) is longer than <M>k + 1</M> (orange). The line starts below the U and the U
        is falling, so they must meet. Slide right to find where.
      </Notice>
    )
  } else if (k < K2) {
    notice = (
      <Notice>
        Between the two matches the line is <b>above</b> the U: <M>{'CD < k + 1'}</M>. The line meets the U at its
        lowest point <M>(1, 2)</M>, but the U&apos;s right arm keeps steepening until it rises faster than the line and
        catches it again. A U-shape and a line can meet twice &mdash; that is why there are <b>two</b> values of{' '}
        <M>k</M>. Slide to either green point.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Past <M>{'k = \\tfrac73'}</M>, <M>CD</M> grows like <M>2k</M> but <M>k + 1</M> only like <M>k</M>, so{' '}
        <M>CD</M> stays longer for good. There are no more solutions.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 4]} y={[0, 6.5]} xStep={1} yStep={1} height={300} xLabel="k" yLabel="">
        <Plot.OfX y={cd} domain={[0, 4]} color={C.f} weight={3} />
        <Plot.OfX y={line} domain={[0, 4]} color={C.g} weight={3} />
        <Line.Segment point1={[k, 0]} point2={[k, Math.max(d, l)]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={1} y={2} color={C.good} />
        <Point x={K2} y={10 / 3} color={C.good} />
        <Label at={[1, 2]} attach="s" color={C.good}>k = 1</Label>
        <Label at={[K2, 10 / 3]} attach="se" color={C.good}>k = 7/3</Label>
        <Point x={k} y={d} color={C.f} />
        <Point x={k} y={l} color={C.g} />
        <Label at={[0.15, cd(0.15)]} attach="ne" color={C.f}>CD</Label>
        <Label at={[3.5, line(3.5)]} attach="se" color={C.g}>k + 1</Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={0.05} max={4} step={0.01} />
        <Readouts>
          <Readout color={C.f} tex={`CD = 2\\sqrt{k^2-2k+2} \\approx ${num(d)}`} />
          <Readout color={C.g} tex={`k + 1 = ${num(l)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
