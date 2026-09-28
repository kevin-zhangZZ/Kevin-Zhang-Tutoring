// 2018 Specialist Exam 1 Q5 — why each branch of f(x) = (x + 1)/(x² − 4) runs where it does.
// Slide x along VCAA's own grid (−4 to 4, lines every 0.5): the readouts show the numerator and the
// denominator as actual numbers, and the sign chart under the graph lights up the region you are
// in. Near x = ±2 the denominator is tiny, so f is huge, and the sign chart says whether the branch
// shoots up or down. The shading marks the side of the x-axis the graph must be on in each region.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, tick } from './kit'

const f = (x: number) => (x + 1) / (x * x - 4)
const X = 4
const Y = 4
const EPS = 0.012

const REGIONS = [
  { from: -X, to: -2, sign: -1, tex: 'x{<}{-2}' },
  { from: -2, to: -1, sign: 1, tex: '{-2}{<}x{<}{-1}' },
  { from: -1, to: 2, sign: -1, tex: '{-1}{<}x{<}2' },
  { from: 2, to: X, sign: 1, tex: 'x{>}2' },
]

const CHART: { tex: string; signs: number[] }[] = [
  { tex: 'x+1', signs: [-1, -1, 1, 1] },
  { tex: 'x+2', signs: [-1, 1, 1, 1] },
  { tex: 'x-2', signs: [-1, -1, -1, 1] },
  { tex: 'f(x)', signs: [-1, 1, -1, 1] },
]

/** A number for TeX: fixed decimals, ASCII minus. */
const t = (v: number, dp = 2) => (Math.abs(v) < 0.5 * 10 ** -dp ? (0).toFixed(dp) : v.toFixed(dp))

/** VCAA's grid has lines every 0.5 but numbers only at the even integers. */
const evenOnly = (v: number) => (Math.abs(v / 2 - Math.round(v / 2)) < 1e-9 ? tick(v) : '')

function regionOf(x: number) {
  if (x < -2) return 0
  if (x < -1) return 1
  if (x < 2) return 2
  return 3
}

export default function Signs() {
  const [x0, setX0] = useState(-1.9)

  const atAsym = Math.abs(Math.abs(x0) - 2) < 0.005
  const r = regionOf(x0)
  const n = x0 + 1
  const d = x0 * x0 - 4
  const fx = atAsym ? NaN : f(x0)
  const onScreen = !atAsym && Math.abs(fx) <= Y

  let notice
  if (atAsym) {
    const numAt = x0 < 0 ? '-1' : '3'
    notice = (
      <Notice tone="warn">
        <M>{`x = ${x0 < 0 ? '-2' : '2'}`}</M> is <b>not in the domain</b>: the denominator is <M>0</M> while the
        numerator is <M>{numAt}</M>, not <M>0</M>. So there is no point here, only a vertical asymptote. Step a
        little either side (the buttons below) to see which way the graph runs off.
      </Notice>
    )
  } else if (x0 < -2.5) {
    notice = (
      <Notice>
        Far to the left, <b><M>f</M> is small and negative</b>. The denominator <M>x^2 - 4</M> grows much faster
        than the numerator <M>x + 1</M>, so the fraction shrinks towards <M>0</M>: that is the horizontal
        asymptote <M>y = 0</M>, approached from below because <M>f &lt; 0</M> in this region. Now slide right
        towards <M>x = -2</M>.
      </Notice>
    )
  } else if (x0 < -2) {
    notice = (
      <Notice>
        <b>Just left of <M>x = -2</M></b>: the numerator is about <M>-1</M> (negative), and <M>x^2</M> is a bit
        more than <M>4</M>, so <M>x^2 - 4</M> is a <b>tiny positive</b> number. Negative ÷ tiny positive is a
        large negative, so the left branch <b>plunges to <M>-\infty</M></b>. The closer you get, the tinier the
        denominator and the bigger <M>|f(x)|</M>.
      </Notice>
    )
  } else if (x0 < -1.5) {
    notice = (
      <Notice>
        <b>Just right of <M>x = -2</M></b>: <M>x^2</M> is a bit less than <M>4</M>, so <M>x^2 - 4</M> is a{' '}
        <b>tiny negative</b> number, while the numerator is still about <M>-1</M>. Negative ÷ tiny negative is a
        large positive, so the middle branch <b>comes down from <M>+\infty</M></b>. Same numerator, opposite sign
        of denominator: that is why the graph jumps from <M>-\infty</M> to <M>+\infty</M> across the asymptote.
      </Notice>
    )
  } else if (Math.abs(x0 + 1) < 0.03) {
    notice = (
      <Notice tone="good">
        At <M>x = -1</M> the numerator is <M>0</M>, so <M>f(-1) = 0</M>: the x-intercept <M>(-1, 0)</M>. It is the
        only place the sign of <M>f</M> changes without an asymptote. The curve crosses the asymptote{' '}
        <M>y = 0</M> here, and that is allowed: a horizontal asymptote only describes the ends.
      </Notice>
    )
  } else if (Math.abs(x0) < 0.03) {
    notice = (
      <Notice tone="good">
        At <M>x = 0</M>, <M>{'f(0) = \\frac{1}{-4} = -\\frac14'}</M>. VCAA&apos;s grid lines are <M>0.5</M> apart,
        so <M>{'\\left(0, -\\tfrac14\\right)'}</M> sits only <b>half a grid square</b> below the origin. Plotting it
        at <M>-1</M> or lower would bend the whole middle branch out of shape.
      </Notice>
    )
  } else if (x0 <= 1.5) {
    notice = (
      <Notice>
        Between the asymptotes the middle branch has to get from <M>+\infty</M> (at <M>x = -2</M>) down to{' '}
        <M>-\infty</M> (at <M>x = 2</M>), so it must cross the x-axis. It crosses where the numerator is zero,{' '}
        <M>x = -1</M>, then passes <M>{'\\left(0, -\\tfrac14\\right)'}</M>. Slide to <M>x = -1</M> and to{' '}
        <M>x = 0</M> to check both intercepts.
      </Notice>
    )
  } else if (x0 < 2) {
    notice = (
      <Notice>
        <b>Just left of <M>x = 2</M></b>: the numerator is about <M>3</M> (positive) and <M>x^2 - 4</M> is a{' '}
        <b>tiny negative</b> number, so <M>f</M> is a large negative: the middle branch{' '}
        <b>dives to <M>-\infty</M></b>. Now cross to the other side of <M>x = 2</M>.
      </Notice>
    )
  } else if (x0 <= 2.5) {
    notice = (
      <Notice>
        <b>Just right of <M>x = 2</M></b>: the numerator is still about <M>3</M>, but now <M>x^2 - 4</M> is a{' '}
        <b>tiny positive</b> number, so <M>f \to +\infty</M>: the right branch starts at the top. Every{' '}
        <M>x &gt; 2</M> is in the domain, so this outer branch has to be drawn.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Far to the right, <M>f</M> is <b>positive but shrinking</b>: <M>x^2 - 4</M> outgrows <M>x + 1</M>, so
        the right branch settles onto <M>y = 0</M> from above. Compare with the far left, where it settles onto{' '}
        <M>y = 0</M> from below. The sign chart tells you which side each end is on.
      </Notice>
    )
  }

  const cell = (i: number) =>
    `px-1 py-1 text-center ${i === r && !atAsym ? 'bg-sky-100 dark:bg-sky-900/50 font-semibold' : ''}`

  return (
    <div>
      <Plane x={[-X, X]} y={[-Y, Y]} xStep={0.5} yStep={0.5} height={340} labels={evenOnly}>
        {REGIONS.map((reg, i) => (
          <Polygon
            key={i}
            points={[
              [reg.from, 0],
              [reg.to, 0],
              [reg.to, reg.sign * Y],
              [reg.from, reg.sign * Y],
            ]}
            color={C.f}
            fillOpacity={i === r && !atAsym ? 0.16 : 0.05}
            weight={0}
          />
        ))}
        <Line.Segment point1={[-2, -Y - 0.3]} point2={[-2, Y + 0.3]} color={C.guide} style="dashed" weight={2} />
        <Line.Segment point1={[2, -Y - 0.3]} point2={[2, Y + 0.3]} color={C.guide} style="dashed" weight={2} />
        <Label at={[-2, 3.4]} attach="w" color={C.guide}>x = −2</Label>
        <Label at={[2, -3.4]} attach="e" color={C.guide}>x = 2</Label>
        <Label at={[-3.3, 0]} attach="n" color={C.guide}>y = 0</Label>
        <Plot.OfX y={f} domain={[-X, -2 - EPS]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[-2 + EPS, 2 - EPS]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[2 + EPS, X]} color={C.f} weight={3} />
        <Point x={-1} y={0} color={C.good} />
        <Point x={0} y={-0.25} color={C.good} />
        <Label at={[-1, 0]} attach="ne" color={C.good}>(−1, 0)</Label>
        <Label at={[0, -0.25]} attach="sw" color={C.good}>(0, −¼)</Label>
        {!atAsym && (
          <Line.Segment
            point1={[x0, 0]}
            point2={[x0, Math.max(-Y - 0.3, Math.min(Y + 0.3, fx))]}
            color={C.g}
            style="dashed"
            weight={2}
          />
        )}
        {onScreen && <Point x={x0} y={fx} color={C.g} />}
        {!atAsym && !onScreen && (
          // Off-screen readout goes across the asymptote, into the quadrant the branches leave empty.
          <Label at={[x0, fx > 0 ? Y : -Y]} attach={fx > 0 ? 'sw' : 'ne'} color={C.g}>
            {`${fx > 0 ? '↑' : '↓'} f = ${t(fx, 1).replace('-', '−')}`}
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={-X} max={X} step={0.01} />
        <Buttons>
          <ActionButton label={<M>{'x \\to -2^-'}</M>} onClick={() => setX0(-2.05)} />
          <ActionButton label={<M>{'x \\to -2^+'}</M>} onClick={() => setX0(-1.95)} />
          <ActionButton label={<M>{'x \\to 2^-'}</M>} onClick={() => setX0(1.95)} />
          <ActionButton label={<M>{'x \\to 2^+'}</M>} onClick={() => setX0(2.05)} />
        </Buttons>
        <Readouts>
          <Readout tex={`x + 1 = ${t(n)}`} />
          <Readout tex={`x^2 - 4 = ${t(d, 4)}`} />
          <Readout
            color={C.g}
            tex={atAsym ? `f(${t(x0, 0)})\\ \\text{is undefined}` : `f(x) = \\frac{${t(n)}}{${t(d, 4)}} = ${t(fx)}`}
          />
        </Readouts>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px] border-collapse text-gray-700 dark:text-gray-300">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-1 py-1 text-left font-normal text-gray-500 dark:text-gray-400">Sign of</th>
                {REGIONS.map((reg, i) => (
                  <th key={i} className={cell(i) + ' font-normal whitespace-nowrap'}>
                    <M>{reg.tex}</M>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CHART.map(row => (
                <tr key={row.tex} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="px-1 py-1">
                    <M>{row.tex}</M>
                  </td>
                  {row.signs.map((s, i) => (
                    <td key={i} className={cell(i)}>
                      {s > 0 ? '+' : '−'}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="px-1 py-1 text-gray-500 dark:text-gray-400">Graph</td>
                {REGIONS.map((reg, i) => (
                  <td key={i} className={cell(i)}>
                    {reg.sign > 0 ? 'above' : 'below'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        {notice}
      </Controls>
    </div>
  )
}
