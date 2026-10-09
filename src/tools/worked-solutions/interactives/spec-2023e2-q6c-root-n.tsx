// 2023 Specialist Exam 2 Q6c — the width of a 95% confidence interval is 2 × 1.96 × 1/√n, so it
// falls like 1/√n, not 1/n. With σ = 1 the original width (n = 20) is 0.877 kg and the target
// (40% of it) is 0.351 kg. Slide n: the natural guess n = 20/0.4 = 50 only gets the width down to
// √(20/50) ≈ 63% of the original; n = 56 gives 60% (a decrease BY 40%, the misreading); the
// target is first reached at n = 20/0.4² = 125. A toggle draws the curve the n = 50 guess assumes
// (width falling like 1/n), which does hit the target at 50. Values checked in Python.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const Z = 1.96
const width = (n: number) => (2 * Z) / Math.sqrt(n)
const W20 = width(20) // 0.877
const TARGET = 0.4 * W20 // 0.351
const N_MIN = (2 * Z / 1.05) ** 2 // where the curve leaves the top of the plane

export default function RootN() {
  const [n, setN] = useState(50)
  const [linear, setLinear] = useState(false)

  const w = width(n)
  const pct = Math.sqrt(20 / n) * 100

  let notice
  if (n === 20) {
    notice = (
      <Notice>
        This is the original sample: <M>n = 20</M>, width <M>{'2\\times1.96\\times\\tfrac{1}{\\sqrt{20}} \\approx 0.877'}</M> kg.
        The green line is 40% of that width. Slide <M>n</M> up until the blue point reaches the green line.
      </Notice>
    )
  } else if (n === 50) {
    notice = (
      <Notice tone="warn">
        The guess <M>n = 50</M> leaves the width at 63% of the original, well above the green line.{' '}
        {linear
          ? 'The dashed red curve is the width that guess assumes, falling like 1/n: it reaches the green line at 50, but the real blue curve flattens out. Slide n right until the blue point reaches the green line.'
          : 'Turn on the toggle to see the curve that guess assumes, or slide n right until the blue point reaches the green line.'}
      </Notice>
    )
  } else if (n >= 55 && n <= 57) {
    notice = (
      <Notice tone="warn">
        Here the width is about 60% of the original, so it has decreased <b>by 40%</b>. &ldquo;Decrease by 60%&rdquo;
        leaves only 40% of the width, so the point must go all the way down to the green line.
      </Notice>
    )
  } else if (n === 125) {
    notice = (
      <Notice tone="good">
        At <M>n = 125</M> the width is <M>{'\\sqrt{20/125} = \\sqrt{0.16} = 0.4'}</M> of the original: exactly 40%.
        To multiply the width by <M>0.4</M> you multiply <M>n</M> by <M>{'1/0.4^2 = 6.25'}</M>, and{' '}
        <M>{'20 \\times 6.25 = 125'}</M>.
      </Notice>
    )
  } else if (n > 125) {
    notice = (
      <Notice>
        The point is below the green line, so the interval is narrower than needed. The smallest sample that reaches
        the target is <M>n = 125</M>; slide back to it.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The width is still {pct.toFixed(0)}% of the original, above the green line. Each extra koala shrinks the
        width less than the one before, because the curve <M>{'\\tfrac{1}{\\sqrt n}'}</M> flattens out. Keep
        sliding until the point reaches the green line.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 160]} y={[0, 1]} xStep={20} yStep={0.2} xLabel="" yLabel="width" yLabels={v => (v < 0.99 ? v.toFixed(1) : '')} height={320}>
        <Label at={[160, 0]} attach="nw" size={14} italic>n</Label>
        <Line.Segment point1={[0, W20]} point2={[160, W20]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[30, W20]} attach="ne" color={C.guide} size={12}>original width 0.877</Label>
        <Line.Segment point1={[0, TARGET]} point2={[160, TARGET]} color={C.good} style="dashed" weight={2} />
        <Label at={[30, TARGET]} attach="ne" color={C.good} size={12}>40% of it: 0.351</Label>
        {linear && (
          <Plot.OfX y={x => (W20 * 20) / x} domain={[17, 160]} color={C.bad} style="dashed" weight={2} />
        )}
        <Plot.OfX y={width} domain={[N_MIN, 160]} color={C.f} weight={3} />
        <Line.Segment point1={[n, 0]} point2={[n, w]} color={C.f} style="dashed" weight={1.5} />
        <Point x={20} y={W20} color={C.guide} />
        <Point x={n} y={w} color={n === 125 ? C.good : C.f} />
        <Label at={[n, w]} attach={n > 130 ? 'nw' : 'ne'} color={n === 125 ? C.good : C.f} size={12}>{`n = ${n}`}</Label>
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={setN} min={20} max={160} step={1} format={v => v.toFixed(0)} />
        <Toggle label="What if the width fell like 1/n?" checked={linear} onChange={setLinear} />
        <Readouts>
          <Readout color={C.f} tex={`\\text{width} = 2\\times1.96\\times\\tfrac{1}{\\sqrt{${n}}} \\approx ${w.toFixed(3)}`} />
          <Readout color={n === 125 ? C.good : undefined} tex={`\\tfrac{\\text{new width}}{\\text{old width}} = \\sqrt{\\tfrac{20}{${n}}} \\approx ${pct.toFixed(1)}\\%`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
