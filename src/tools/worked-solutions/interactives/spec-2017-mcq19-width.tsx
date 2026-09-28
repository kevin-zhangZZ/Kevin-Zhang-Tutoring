// 2017 Specialist Exam 2 MCQ 19 — a confidence interval's width is proportional to 1/√n, so
// multiplying the sample size by k multiplies the width by 1/√k. The blue curve is that width
// ratio against k; the green line is the target, 25% of the old width ("decrease by 75%"). The
// blue curve meets it at k = 16 (option D). Bars under the graph show the old and new intervals to
// scale. A toggle draws the forgot-the-square-root curve 1/k, which hits the target at k = 4
// (option B, chosen by 18%) — but k = 4 really only halves the width.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle,
} from './kit'

const OPTIONS: [string, number][] = [['A', 2], ['B', 4], ['C', 9], ['D', 16], ['E', 25]]
const SQUARES = [1, 4, 9, 16, 25]

function Bar({ label, frac, className }: { label: string; frac: number; className: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-16 flex-none text-right text-[12px] text-gray-600 dark:text-gray-300">{label}</span>
      <div className="relative flex-1 h-3">
        <div className="absolute inset-y-0 left-1/2 w-px bg-gray-400 dark:bg-gray-500" />
        <div
          className={`absolute inset-y-0.5 rounded-full ${className}`}
          style={{ left: `${50 - 50 * frac}%`, width: `${100 * frac}%` }}
        />
      </div>
    </div>
  )
}

export default function WidthVsSampleSize() {
  const [k, setK] = useState(4)
  const [wrong, setWrong] = useState(false)
  const ratio = 1 / Math.sqrt(k)
  const hit = Math.abs(k - 16) < 1e-9
  const pct = 100 * ratio
  const kTex = Number.isInteger(k) ? String(k) : k.toFixed(1)

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        The red curve is what you&apos;d get if the width were proportional to <M>{'1/n'}</M>: it reaches{' '}
        <M>{'\\tfrac14'}</M> at <M>k=4</M>, which is option B. But the width depends on <M>{'\\sqrt n'}</M>. At{' '}
        <M>k=4</M> the true width is <M>{'1/\\sqrt4=\\tfrac12'}</M> of the old one (look at the bars), only a 50%
        decrease. Slide on until the <b>blue</b> curve meets the green line.
      </Notice>
    )
  } else if (hit) {
    notice = (
      <Notice tone="good">
        At <M>k=16</M>: <M>{'1/\\sqrt{16}=\\tfrac14'}</M>. The new interval is a quarter as wide as the old one, a 75%
        decrease. Because of the square root, you have to square the factor you want: a width{' '}
        <M>{'\\tfrac14'}</M> as big needs <M>{'4^2=16'}</M> times the sample.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The width is proportional to <M>{'1/\\sqrt n'}</M>, so multiplying the sample size by <M>k</M> multiplies the
        width by <M>{'1/\\sqrt k'}</M> (the blue curve). The green line is the target: &ldquo;decrease <em>by</em>{' '}
        75%&rdquo; leaves 25% of the width. Try each option: which <M>k</M> lands on the line?
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, 26]}
        y={[0, 1.1]}
        xStep={1}
        yStep={0.25}
        height={280}
        xLabel="k"
        yLabel=""
        xLabels={v => (SQUARES.includes(Math.round(v)) ? String(Math.round(v)) : '')}
        yLabels={v => (Math.abs(v - 0.25) < 1e-9 ? '1/4' : Math.abs(v - 0.5) < 1e-9 ? '1/2' : '')}
      >
        <Line.Segment point1={[1, 0.25]} point2={[26, 0.25]} color={C.good} style="dashed" weight={2} />
        <Label at={[26, 0.25]} attach="nw" color={C.good}>25% of old width</Label>
        <Plot.OfX y={x => 1 / Math.sqrt(x)} domain={[1, 26]} color={C.f} weight={3} />
        <Label at={[0.2, 1.08]} attach="e" color={C.f}>new width ÷ old width</Label>
        {wrong && (
          <>
            <Plot.OfX y={x => 1 / x} domain={[1, 26]} color={C.bad} weight={2} style="dashed" />
            <Label at={[7, 1 / 7]} attach="sw" color={C.bad}>1/k ✗</Label>
            <Point x={k} y={1 / k} color={C.bad} />
          </>
        )}
        <Line.Segment point1={[k, 0]} point2={[k, ratio]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={k} y={ratio} color={hit ? C.good : C.f} />
      </Plane>
      <div className="mt-3 flex flex-col gap-1.5">
        <Bar label="sample n" frac={1} className="bg-gray-400 dark:bg-gray-500" />
        <Bar label={`sample ${kTex}n`} frac={ratio} className={hit ? 'bg-emerald-500' : 'bg-sky-500'} />
      </div>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={1} max={25} step={0.5} format={v => `×${Number.isInteger(v) ? v : v.toFixed(1)}`} />
        <Buttons>
          {OPTIONS.map(([letter, value]) => (
            <ActionButton key={letter} label={`${letter}: ×${value}`} onClick={() => setK(value)} />
          ))}
        </Buttons>
        <Buttons>
          <Toggle label="Forget the square root (18% chose B)" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout
            color={hit ? C.good : C.f}
            tex={`\\text{new width}=\\tfrac{1}{\\sqrt{${kTex}}}\\times\\text{old}=${pct.toFixed(1)}\\%\\text{ of old}`}
          />
          <Readout tex={`\\text{decrease}=${(100 - pct).toFixed(1)}\\%`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
