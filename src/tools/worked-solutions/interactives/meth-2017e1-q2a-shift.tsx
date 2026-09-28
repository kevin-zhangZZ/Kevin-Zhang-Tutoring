// 2017 Methods Exam 1 Q2a — why d/dx logₑ(3x) = 1/x, not 1/(3x) or 3/x. The graph of
// y = logₑ(kx) is the graph of y = logₑ(x) lifted by logₑ(k) (log law), so at any x the two
// tangents are parallel with slope 1/x. Sliders for x and k; a toggle draws the two wrong
// "tangents" from the examiner's report (slopes 1/(kx) and k/x), which cut through the curve
// unless k = 1.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle,
} from './kit'

const XMAX = 4.4
const YMIN = -2
const YMAX = 3.4

const kText = (k: number) => (Math.abs(k - Math.round(k)) < 1e-9 ? String(Math.round(k)) : k.toFixed(1))

export default function LogShift() {
  const [x0, setX0] = useState(1.5)
  const [k, setK] = useState(3)
  const [wrong, setWrong] = useState(false)

  const base = (x: number) => Math.log(x)
  const lifted = (x: number) => Math.log(k * x)
  const yb = base(x0)
  const yl = lifted(x0)
  const h = 1e-5
  const slopeLifted = (lifted(x0 + h) - lifted(x0 - h)) / (2 * h) // measured, not assumed
  const gap = Math.log(k)
  const kIs1 = Math.abs(k - 1) < 1e-9
  const ks = kText(k)

  // Where to put the labels on the two wrong lines.
  const steep = k / x0
  const shallow = 1 / (k * x0)
  const steepDx = Math.min(1.0 / steep, XMAX - x0 - 0.2)
  const steepAt: [number, number] = [x0 + steepDx, yl + steep * steepDx]
  const shallowLeft = x0 - 1.0 > 0.2
  const shallowAt: [number, number] = shallowLeft
    ? [x0 - 1.0, yl - shallow * 1.0]
    : [Math.min(x0 + 1.4, XMAX - 0.3), yl + shallow * Math.min(1.4, XMAX - 0.3 - x0)]

  let notice
  if (kIs1) {
    notice = (
      <Notice>
        At <M>k = 1</M> there is no <M>3</M> at all: the two curves are the same and every candidate slope is{' '}
        <M>{'\\tfrac1x'}</M>. That is why the mistakes can feel right. Move <M>k</M> back to <M>3</M> and watch the
        red lines stop being tangents.
      </Notice>
    )
  } else if (wrong) {
    notice = (
      <Notice tone="warn">
        Neither red line is a tangent. The shallow one (slope <M>{`\\tfrac{1}{${ks}x}`}</M>) and the steep one (slope{' '}
        <M>{`\\tfrac{${ks}}{x}`}</M>) both cut through the blue curve. Each keeps only one of the two{' '}
        <M>{ks}</M>s in the chain rule, <M>{`\\tfrac{1}{${ks}x}\\times ${ks}`}</M>. Slide <M>k</M> to <M>1</M>: only
        then do they agree with the true tangent.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The blue curve is the orange one <b>lifted by <M>{`\\log_e(${ks})`}</M></b>, because{' '}
        <M>{`\\log_e(${ks}x) = \\log_e(${ks}) + \\log_e(x)`}</M>. Lifting a curve does not change how steep it is, so
        the two tangents are parallel: both slopes are <M>{'\\tfrac1x'}</M>. Drag <M>x</M>, then change{' '}
        <M>k</M>: the gap changes, the slopes never do. Then turn on the wrong gradients.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, XMAX]} y={[YMIN, YMAX]} xStep={1} yStep={1} height={320}>
        <Plot.OfX y={base} domain={[Math.exp(YMIN - 0.3), XMAX]} color={C.g} weight={2.5} />
        <Plot.OfX y={lifted} domain={[Math.exp(YMIN - 0.3) / k, XMAX]} color={C.f} weight={3} />
        <Line.PointSlope point={[x0, yb]} slope={1 / x0} color={C.g} weight={1.5} style="dashed" />
        <Line.PointSlope point={[x0, yl]} slope={slopeLifted} color={C.f} weight={2} style="dashed" />
        {wrong && !kIs1 && (
          <>
            <Line.PointSlope point={[x0, yl]} slope={shallow} color={C.bad} weight={2} />
            <Line.PointSlope point={[x0, yl]} slope={steep} color={C.bad} weight={2} />
            <Label at={shallowAt} color={C.bad} attach={shallowLeft ? 'n' : 's'}>{`slope 1/(${ks}x)`}</Label>
            <Label at={steepAt} color={C.bad} attach="e">{`slope ${ks}/x`}</Label>
          </>
        )}
        {!kIs1 && (
          <>
            <Line.Segment point1={[x0, yb]} point2={[x0, yl]} color={C.violet} weight={3} />
            <Label at={[x0, (yb + yl) / 2]} color={C.violet} attach={x0 > 2.6 ? 'w' : 'e'}>
              {`+ logₑ(${ks})`}
            </Label>
          </>
        )}
        <Point x={x0} y={yb} color={C.g} />
        <Point x={x0} y={yl} color={C.f} />
        <Label at={[3.4, base(3.4)]} color={C.g} attach="se">y = logₑ(x)</Label>
        {!kIs1 && <Label at={[3.4, lifted(3.4)]} color={C.f} attach="nw">{`y = logₑ(${ks}x)`}</Label>}
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={0.4} max={4} step={0.01} />
        <Slider label="k" value={k} onChange={setK} min={1} max={5} step={0.1} format={v => v.toFixed(1)} />
        <Toggle label="Show the wrong gradients" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout color={C.g} tex={`\\text{slope of }\\log_e(x) = \\tfrac{1}{${x0.toFixed(2)}} = ${(1 / x0).toFixed(3)}`} />
          <Readout color={C.f} tex={`\\text{slope of }\\log_e(${ks}x) = ${slopeLifted.toFixed(3)}`} />
          <Readout color={C.violet} tex={`\\text{gap} = \\log_e(${ks}) \\approx ${gap.toFixed(3)}`} />
          {wrong && !kIs1 && <Readout color={C.bad} tex={`\\tfrac{1}{${ks}x} = ${shallow.toFixed(3)},\\ \\tfrac{${ks}}{x} = ${steep.toFixed(3)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
