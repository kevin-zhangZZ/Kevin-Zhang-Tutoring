// 2020 Methods Exam 2 MCQ 18 — the range of h(x) = a/x + b on [−a, 0) ∪ (0, a], read off the graph.
// The two branches end at the closed points (−a, b − 1) and (a, b + 1); the bar on the right is the
// range, the set of heights the graph reaches, with the gap (b − 1, b + 1) it never enters. Sliding a
// stretches the curve but the ends stay at heights b ± 1, because h(±a) = ±a/a + b whatever a is.
// One toggle draws the tails of the full hyperbola that the domain cuts off: they are exactly the
// heights in the gap. Another tries option C (29%): open circles at the ends, which the square
// brackets of the domain rule out. Default a = 2, b = −3 is the report's own example, y = 2/x − 3.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle } from './kit'

const X: [number, number] = [-4, 4.8]
const Y: [number, number] = [-7, 7]
const BAR = 4.45

/** A decimal with a real minus sign, for readouts. */
const d = (v: number) => {
  const r = Math.round(v * 10) / 10
  return (Object.is(r, -0) ? 0 : r).toString().replace('-', '−')
}
/** The same number for TeX. */
const t = (v: number) => d(v).replace('−', '-')

function Open({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2.5 } }} />
}

export default function Range() {
  const [a, setA] = useState(2)
  const [b, setB] = useState(-3)
  const [tails, setTails] = useState(false)
  const [tryC, setTryC] = useState(false)

  const h = (x: number) => a / x + b
  const lo = b - 1
  const hi = b + 1
  // Where each branch leaves the view, so the plotted curve stops at the edge.
  const rightStart = a / (Y[1] + 0.5 - b)
  const leftEnd = a / (Y[0] - 0.5 - b)
  const endColor = tryC ? C.bad : C.f
  const barColor = tryC ? C.bad : C.good

  const EndPoint = tryC ? Open : Point
  // Label placement: with the ends far apart the coordinate labels sit inside the band, otherwise
  // outside it. When b is within 2 of the x-axis a label can land on the x tick numbers, so the
  // numbers under each label's span (sized for a phone) are dropped; the widget is about heights.
  const wide = a >= 2.2
  const nearAxis = Math.abs(b) <= 2
  const underLabel = (v: number) =>
    (wide ? Math.abs(v + a) <= 1.2 : v >= -a - 2.3 && v <= -a + 0.1) ||
    (wide ? Math.abs(v - a) <= 1.2 : v >= a - 0.1 && v <= a + 2.3) ||
    (b === -1 && v <= -3) // the "y = b" label hangs just below the axis

  let notice
  if (tryC) {
    notice = (
      <Notice tone="warn">
        <b>Option C uses open brackets, leaving out <M>b - 1</M> and <M>b + 1</M>.</b> But look at the domain,{' '}
        <M>{'[-a, 0) \\cup (0, a]'}</M>: the square brackets say <M>x = -a</M> and <M>x = a</M> are included, so the graph
        really has the points <M>{`(-a,\\ b - 1) = (${t(-a)},\\ ${t(lo)})`}</M> and{' '}
        <M>{`(a,\\ b + 1) = (${t(a)},\\ ${t(hi)})`}</M>. Those heights are reached: they belong in the range, with square
        brackets. The only <M>x</M> left out is 0, and there the graph has no end at all; it runs off to <M>{'\\pm\\infty'}</M>.
      </Notice>
    )
  } else if (tails) {
    notice = (
      <Notice>
        Without the restriction, <M>{'y = \\frac{a}{x} + b'}</M> would carry on along the grey dashed tails, creeping towards
        its asymptote <M>y = b</M> and reaching every height except <M>b</M> itself. The domain stops at <M>{'x = \\pm a'}</M>{' '}
        and cuts those tails off, and the tails are exactly where the heights between <M>b - 1</M> and <M>b + 1</M> were.
        That is why the range has a gap of width 2 around <M>b</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The range is every height the graph reaches: slide your eye sideways onto the green bar. The right branch starts
        at its end <M>{'(a,\\ b + 1)'}</M> and climbs forever as <M>x \to 0^+</M>; the left branch starts at{' '}
        <M>{'(-a,\\ b - 1)'}</M> and falls forever as <M>x \to 0^-</M>. Now change <M>a</M>: the curve stretches, but the ends
        stay at heights <M>b \pm 1</M>, because <M>{'h(a) = \\frac{a}{a} + b = 1 + b'}</M> whatever <M>a</M> is. Change{' '}
        <M>b</M> and everything moves up or down together.
      </Notice>
    )
  }

  return (
    <div>
      {/* The y-axis is the vertical asymptote, so the right branch climbs up over the y
          tick numbers (which sit right of the axis): show a y number only where the branch is well
          clear of it. The bar carries the two heights that matter (their y numbers are dropped: the
          dashed projection lines run through them). No x number past the bar. */}
      <Plane
        x={X}
        y={Y}
        xStep={1}
        yStep={1}
        height={330}
        xLabels={v => (v > 4.5 || (nearAxis && underLabel(v)) ? '' : String(v).replace('-', '−'))}
        yLabels={v => (v % 2 === 0 && v !== lo && v !== hi && Math.abs(v) < 7.5 && (v < hi || a / (v - b) > 0.8) ? String(v).replace('-', '−') : '')}
      >
        {/* The heights h never reaches. */}
        <Region top={() => hi} bottom={() => lo} from={X[0] - 0.7} to={X[1] + 0.7} color={C.bad} opacity={0.08} />
        {/* Asymptotes, in the curve's colour. */}
        <Line.Segment point1={[0, Y[0]]} point2={[0, Y[1]]} color={C.f} style="dashed" weight={1.5} />
        <Line.Segment point1={[X[0], b]} point2={[BAR - 0.25, b]} color={C.f} style="dashed" weight={1.5} />
        <Label at={[X[0], b]} color={C.f} attach="ne" size={12}>y = b</Label>
        {tails && (
          <>
            <Plot.OfX y={h} domain={[a, BAR - 0.25]} color={C.guide} style="dashed" weight={2} />
            <Plot.OfX y={h} domain={[X[0], -a]} color={C.guide} style="dashed" weight={2} />
          </>
        )}
        {/* Each end projects across to the range bar. */}
        <Line.Segment point1={[-a, lo]} point2={[BAR, lo]} color={C.guide} style="dashed" weight={1} />
        <Line.Segment point1={[a, hi]} point2={[BAR, hi]} color={C.guide} style="dashed" weight={1} />
        <Plot.OfX y={h} domain={[rightStart, a]} color={C.f} weight={3} />
        <Plot.OfX y={h} domain={[-a, leftEnd]} color={C.f} weight={3} />
        <EndPoint x={-a} y={lo} color={endColor} />
        <EndPoint x={a} y={hi} color={endColor} />
        {/* Outside the band (below-left, above-right, clear of the branches) unless the ends are
            far apart, when inside the band keeps them clear of the plane's edges and the bar. */}
        <Label at={[-a, lo]} color={endColor} attach={wide ? 'n' : 'sw'} size={12} gap={wide ? 7 : 9}>(−a, b − 1)</Label>
        <Label at={[a, hi]} color={endColor} attach={wide ? 's' : 'ne'} size={12} gap={wide ? 7 : 9}>(a, b + 1)</Label>
        {/* The range, as a bar of heights. */}
        {/* It runs off both edges of the view: the range goes on for ever both ways. */}
        <Line.Segment point1={[BAR, Y[0] - 2]} point2={[BAR, lo]} color={barColor} weight={5} />
        <Line.Segment point1={[BAR, hi]} point2={[BAR, Y[1] + 2]} color={barColor} weight={5} />
        <EndPoint x={BAR} y={lo} color={barColor} />
        <EndPoint x={BAR} y={hi} color={barColor} />
        <Label at={[BAR, hi]} color={barColor} attach="e" size={12} gap={8}>{d(hi)}</Label>
        <Label at={[BAR, lo]} color={barColor} attach="e" size={12} gap={8}>{d(lo)}</Label>
        <Label at={[BAR, Y[1] - 0.6]} color={barColor} attach="w" size={12} gap={8}>range</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={0.5} max={3} step={0.1} format={d} />
        <Slider label="b" value={b} onChange={setB} min={-3} max={3} step={1} format={d} />
        <Buttons>
          <Toggle label="Show what the domain cuts off" checked={tails} onChange={setTails} />
          <Toggle label="Try option C (open brackets)" checked={tryC} onChange={setTryC} />
        </Buttons>
        <Readouts>
          <Readout color={endColor} tex={`h(-a) = b - 1 = ${t(lo)}`} />
          <Readout color={endColor} tex={`h(a) = b + 1 = ${t(hi)}`} />
          <Readout
            color={barColor}
            tex={
              tryC
                ? `\\text{option C: } (-\\infty,\\ ${t(lo)}) \\cup (${t(hi)},\\ \\infty)`
                : `\\text{range} = (-\\infty,\\ ${t(lo)}] \\cup [${t(hi)},\\ \\infty)`
            }
          />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          {a === 2 && b === -3 ? 'This is the report’s example, y = 2/x − 3. ' : ''}Slide <M>a</M> and <M>b</M>.
        </p>
        {notice}
      </Controls>
    </div>
  )
}
