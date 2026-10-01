// 2022 Methods Exam 2 Q3c.iii — with p̂ = 0.4 fixed, the approximate 95% interval's width is
// 2 × 1.96 × √(0.24/n), which shrinks like 1/√n. The blue curve is that width against the number
// of flips n; the green line is half the part c.ii width (n = 25, width 0.384). Doubling to n = 50
// (a common incorrect answer in the report) only cuts the width to 1/√2 ≈ 71%; the curve meets
// the line at n = 100, four times the flips. Bars under the graph draw both intervals to scale on
// a p-axis centred at 0.4.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const Z = 1.96
const width = (n: number) => 2 * Z * Math.sqrt(0.24 / n)
const W25 = width(25)

function Bar({ label, lo, hi, className }: { label: string; lo: number; hi: number; className: string }) {
  // p-axis from 0.15 to 0.65
  const pos = (p: number) => ((p - 0.15) / 0.5) * 100
  return (
    <div className="flex items-center gap-2">
      <span className="w-14 flex-none text-right text-[12px] text-gray-600 dark:text-gray-300">{label}</span>
      <div className="relative h-3 flex-1">
        <div className="absolute inset-y-0 w-px bg-gray-400 dark:bg-gray-500" style={{ left: `${pos(0.4)}%` }} />
        <div className={`absolute inset-y-0.5 rounded-full ${className}`} style={{ left: `${pos(lo)}%`, width: `${pos(hi) - pos(lo)}%` }} />
      </div>
      <span className="w-[92px] flex-none text-[12px] tabular-nums text-gray-600 dark:text-gray-300">
        ({lo.toFixed(3)}, {hi.toFixed(3)})
      </span>
    </div>
  )
}

export default function QuadrupleTheFlips() {
  const [n, setN] = useState(50)
  const w = width(n)
  const ratio = w / W25
  const hit = n === 100

  let notice
  if (hit) {
    notice = (
      <Notice tone="good">
        At <M>n=100</M>, <M>{'\\sqrt{100}=10'}</M> is double <M>{'\\sqrt{25}=5'}</M>, so the width is exactly half:{' '}
        <M>{'0.384\\div2=0.192'}</M>. Halving the width doubles <M>{'\\sqrt n'}</M>, which multiplies <M>n</M> by{' '}
        <M>{'2^2=4'}</M>.
      </Notice>
    )
  } else if (n === 50) {
    notice = (
      <Notice tone="warn">
        Doubling the flips to <M>n=50</M> only multiplies the width by <M>{'\\tfrac{1}{\\sqrt2}\\approx0.71'}</M>: the new
        interval is still about 71% as wide, not 50%. The <M>n</M> sits under a square root. Slide on until the blue
        curve meets the green line.
      </Notice>
    )
  } else if (n === 25) {
    notice = (
      <Notice>
        This is part c.ii.: 25 flips give the interval <M>{'(0.208,\\ 0.592)'}</M>, width <M>0.384</M>. The green line is
        half of that. How many flips bring the blue curve down to it? Try doubling first.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Multiplying the flips by <M>m</M> multiplies the width by <M>{'\\tfrac{1}{\\sqrt m}'}</M>; here{' '}
        <M>{`m=${(n / 25).toFixed(2)}`}</M>, so the width is {Math.round(100 * ratio)}% of the c.ii width.{' '}
        {n < 100 ? 'Not half yet: keep going.' : 'Past half: you have gone too far.'} Where does the curve meet the
        green line?
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, 210]}
        y={[0, 0.45]}
        xStep={25}
        yStep={0.1}
        height={270}
        xLabel="n"
        yLabel=""
        xLabels={v => ([25, 50, 100, 150, 200].includes(Math.round(v)) ? String(Math.round(v)) : '')}
        yLabels={() => ''}
      >
        <Line.Segment point1={[0, W25]} point2={[210, W25]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[210, W25]} attach="sw" color={C.guide} size={12}>c.ii width 0.384</Label>
        <Line.Segment point1={[0, W25 / 2]} point2={[210, W25 / 2]} color={C.good} style="dashed" weight={2} />
        <Label at={[210, W25 / 2]} attach="nw" color={C.good} size={12}>half: 0.192</Label>
        <Plot.OfX y={width} domain={[22, 210]} color={C.f} weight={3} />
        <Label at={[30, width(30)]} attach="ne" color={C.f} size={12}>width</Label>
        <Line.Segment point1={[n, 0]} point2={[n, w]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={n} y={w} color={hit ? C.good : C.f} />
      </Plane>
      <div className="mt-3 flex flex-col gap-1.5">
        <Bar label="n = 25" lo={0.4 - W25 / 2} hi={0.4 + W25 / 2} className="bg-gray-400 dark:bg-gray-500" />
        <Bar label={`n = ${n}`} lo={0.4 - w / 2} hi={0.4 + w / 2} className={hit ? 'bg-emerald-500' : 'bg-sky-500'} />
      </div>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={25} max={200} step={1} format={v => `${Math.round(v)} flips`} />
        <Buttons>
          <ActionButton label="n = 25 (part c.ii.)" onClick={() => setN(25)} />
          <ActionButton label="Double: n = 50" onClick={() => setN(50)} />
          <ActionButton label="Quadruple: n = 100" onClick={() => setN(100)} />
        </Buttons>
        <Readouts>
          <Readout color={hit ? C.good : C.f} tex={`\\text{width}=2\\times1.96\\sqrt{\\tfrac{0.4\\times0.6}{${n}}}=${w.toFixed(3)}`} />
          <Readout tex={`\\tfrac{\\text{width}}{0.384}=\\sqrt{\\tfrac{25}{${n}}}=${ratio.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
