// 2020 Methods Exam 2 Q3e.ii — the first whole number of deliveries that clears 0.95. Dots show
// Pr(one or more late) = 1 − 0.85ⁿ for n = 1, 2, 3, …; it climbs towards 1 but never reaches it,
// crossing the 0.95 line between n = 18 (0.9464, just short) and n = 19 (0.9544). The smooth
// curve 1 − 0.85^x crosses at x ≈ 18.43, which is not a number of deliveries: rounding it to the
// nearest whole number gives 18, which falls short, so round up. A zoom shows how close 18 comes.
// A toggle plots the report's carried-forward error 1 − 0.15ⁿ, which clears 0.95 at n = 2.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const late = (n: number) => 1 - 0.85 ** n
const wrongP = (n: number) => 1 - 0.15 ** n
const CROSS = Math.log(0.05) / Math.log(0.85) // 18.43…

// The zoomed view shows n from 14 to 24 and probabilities 0.90 to 0.98. mafs draws the axes (and
// their numbers) through the origin, so the zoomed window is plotted shifted: X = n − 14,
// Y = 100(P − 0.9), with the tick numbers relabelled.
const ZX = 14
const ZY = 0.9

export default function Threshold() {
  const [n, setN] = useState(10)
  const [zoom, setZoom] = useState(false)
  const [wrong, setWrong] = useState(false)

  const p = late(n)
  const clears = p >= 0.95
  const X = (v: number) => (zoom ? v - ZX : v)
  const Y = (v: number) => (zoom ? 100 * (v - ZY) : v)
  const ns = zoom ? Array.from({ length: 11 }, (_, i) => ZX + i) : Array.from({ length: 30 }, (_, i) => i + 1)
  const visible = (v: number) => !zoom || (v >= ZY - 1e-9 && v <= 0.985)

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        The red dots are <M>{'1 - 0.15^n'}</M>, carried forward from the wrong answer to part e.i. They shoot past 0.95 at{' '}
        <M>n = 2</M> (<M>{'1 - 0.15^2 = 0.9775'}</M>), the report&apos;s common incorrect answer. A sanity check catches it: if
        85% of deliveries are on time, two deliveries can&apos;t make a late one 97% certain. With two deliveries, &ldquo;both on
        time&rdquo; still happens <M>{'0.85^2 \\approx 72\\%'}</M> of the time.
      </Notice>
    )
  } else if (n === 18) {
    notice = (
      <Notice tone="warn">
        <b>n = 18 falls just short:</b> <M>{'1 - 0.85^{18} \\approx 0.9464'}</M>, under 0.95.{zoom ? ' ' : ' Turn on the zoom to see the gap. '}
        The smooth curve crosses the line at <M>x \approx 18.43</M>, and rounding that to the nearest whole number gives 18,
        which doesn&apos;t work. The report notes some students left their answer as 18.43 or rounded down to 18.
      </Notice>
    )
  } else if (n === 19) {
    notice = (
      <Notice tone="good">
        <b>n = 19 is the first to clear 0.95:</b> <M>{'1 - 0.85^{19} \\approx 0.9544'}</M>. The inequality{' '}
        <M>n \ge 18.43\ldots</M> says the answer is the first whole number <i>after</i> 18.43, so round <b>up</b>, whatever the
        decimal part is.
      </Notice>
    )
  } else if (clears) {
    notice = (
      <Notice>
        <M>n = {n}</M> clears 0.95 too (<M>\approx {p.toFixed(4)}</M>), and so does every bigger <M>n</M>: each extra delivery
        is another chance of a late one, so the dots only go up. But the question wants the <b>minimum</b>. Slide back down to
        find the first one over the line.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        With <M>n = {n}</M> deliveries, <M>{`1 - 0.85^{${n}} \\approx ${p.toFixed(4)}`}</M>: not yet 0.95. Each extra delivery
        multiplies the &ldquo;all on time&rdquo; chance by another 0.85, so the gap to 1 shrinks by 15% each step. The dots
        creep up towards 1 but never reach it. Slide <M>n</M> up to find the first dot on or above the red line.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={zoom ? [0, 10] : [0, 30]}
        y={zoom ? [0, 8] : [0, 1]}
        xStep={zoom ? 1 : 5}
        yStep={zoom ? 1 : 0.25}
        xLabels={zoom ? v => String(v + ZX) : v => String(v)}
        yLabels={zoom ? v => (v % 2 === 0 ? (ZY + v / 100).toFixed(2) : '') : v => (v === 0.5 || v === 1 ? String(v) : '')}
        xLabel="n"
        yLabel=""
        height={280}
      >
        <Line.Segment point1={[X(zoom ? ZX : 0), Y(0.95)]} point2={[X(zoom ? ZX + 10 : 30), Y(0.95)]} color={C.bad} style="dashed" weight={2} />
        <Label at={[X(zoom ? ZX + 10 : 30), Y(0.95)]} color={C.bad} attach="sw" size={12}>0.95</Label>
        {!wrong && (
          <>
            <Plot.OfX
              y={x => Y(late(zoom ? x + ZX : x))}
              domain={zoom ? [0, 10] : [0, 30]}
              color={C.guide}
              style="dashed"
              weight={1.5}
            />
            {zoom && (
              <>
                <Line.Segment point1={[X(CROSS), 0]} point2={[X(CROSS), Y(0.95)]} color={C.guide} style="dashed" weight={1.5} />
                <Label at={[X(CROSS), 1.2]} color={C.guide} attach="e" size={11}>x ≈ 18.43</Label>
              </>
            )}
          </>
        )}
        {ns.filter(m => visible(late(m))).map(m => (
          <Point
            key={`p${m}`}
            x={X(m)}
            y={Y(late(m))}
            color={late(m) >= 0.95 ? C.good : C.g}
            opacity={m === n ? 1 : 0.6}
            svgCircleProps={{ r: m === n ? 6.5 : zoom ? 5 : 3.8 }}
          />
        ))}
        {wrong && ns.filter(m => visible(wrongP(m))).map(m => (
          <Point key={`w${m}`} x={X(m)} y={Y(wrongP(m))} color={C.bad} svgCircleProps={{ r: m === n ? 6.5 : zoom ? 5 : 3.8 }} />
        ))}
        {visible(p) && (n >= (zoom ? ZX : 0)) && (n <= (zoom ? ZX + 10 : 30)) && (
          <Label at={[X(n), Y(p)]} color={clears ? C.good : C.g} attach={clears ? 'nw' : 'se'} size={12}>{`n = ${n}`}</Label>
        )}
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={1} max={30} step={1} format={v => v.toFixed(0)} />
        <Buttons>
          <Toggle label="Zoom in near 0.95" checked={zoom} onChange={setZoom} />
          <Toggle label="What if I carry forward 1 − 0.15ⁿ?" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={clears ? C.good : C.g} tex={`1 - 0.85^{${n}} \\approx ${p.toFixed(4)}\\ ${clears ? '\\ge' : '<'}\\ 0.95`} />
          {wrong && <Readout color={C.bad} tex={`1 - 0.15^{${n}} \\approx ${num(wrongP(n), 4)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
