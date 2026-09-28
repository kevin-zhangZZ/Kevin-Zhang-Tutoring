// 2019 Methods Exam 2 MCQ 19 — why you double the interval before solving. At the start the
// plane shows y = tan u with u = 2x on 0 < u < 5π/2 (the interval for 2x), where y = d meets it
// at u = α, π + α and 2π + α. The slider (or Play) squashes the whole picture towards the y-axis
// by a factor of 1/2, turning it into y = tan(2x) on 0 < x < 5π/4: the crossings and the end of
// the interval move together, so each solution halves and none is gained or lost. d = 1.5 fixed.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, usePlayer, num } from './kit'

const H = Math.PI / 2
const END_U = 5 * H
const YMAX = 4
const D = 1.5
const A = Math.atan(D)
const US = [A, A + Math.PI, A + 2 * Math.PI]
// Each branch of tan u is drawn only where |tan u| ≤ 5, so it stops just short of its asymptote.
const GAP = H - Math.atan(5)
const BRANCHES: [number, number][] = [
  [0, H - GAP],
  [H + GAP, 3 * H - GAP],
  [3 * H + GAP, END_U - GAP],
]

/** Multiples of π/2 as fractions of π. */
function piTick(v: number): string {
  const n = Math.round(v / H)
  if (Math.abs(v - n * H) > 1e-6) return ''
  const names: Record<number, string> = { 1: 'π/2', 2: 'π', 3: '3π/2', 4: '2π', 5: '5π/2' }
  return names[n] ?? ''
}

const U_TEX = ['\\alpha', '\\pi + \\alpha', '2\\pi + \\alpha']
const X_TEX = ['\\tfrac{\\alpha}{2}', '\\tfrac{\\pi + \\alpha}{2}', '\\tfrac{2\\pi + \\alpha}{2}']
const SUB = '₁₂₃'

export default function Squash() {
  const [t, setT] = useState(0)
  const player = usePlayer(setT, { min: 0, max: 1, seconds: 3 })
  const k = 1 - t / 2
  const atU = t < 0.01
  const atX = t > 0.99
  const end = k * END_U

  let notice
  if (atU) {
    notice = (
      <Notice>
        This is <M>y = \tan u</M> where <M>u = 2x</M>. As <M>x</M> runs over <M>{'0 < x < \\tfrac{5\\pi}{4}'}</M>,{' '}
        <M>u</M> runs over <M>{'0 < u < \\tfrac{5\\pi}{2}'}</M>: one full revolution plus a quarter-turn more. Tan is
        positive in quadrants 1 and 3, giving <M>\alpha</M> and <M>\pi + \alpha</M>, and the extra quarter-turn brings the
        first quadrant round again, giving <M>2\pi + \alpha</M>. Press Play to turn <M>u</M> back into <M>x</M>.
      </Notice>
    )
  } else if (atX) {
    notice = (
      <Notice tone="good">
        Now it is <M>y = \tan(2x)</M> on <M>{'0 < x < \\tfrac{5\\pi}{4}'}</M>, and each crossing sits at half its{' '}
        <M>u</M>-value: <M>{'x = \\tfrac{\\alpha}{2}, \\tfrac{\\pi+\\alpha}{2}, \\tfrac{2\\pi+\\alpha}{2}'}</M>. That is the
        whole method: double the interval, solve for <M>2x</M>, then halve. There are still three solutions because the
        squash moves the crossings and the end of the interval together.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Replacing <M>u</M> by <M>2x</M> squashes the graph towards the <M>y</M>-axis by a factor of{' '}
        <M>{'\\tfrac{1}{2}'}</M>. Watch the red end of the interval: it moves in step with the green crossings, so the
        third crossing stays inside. Keep going to <M>{'\\times\\tfrac{1}{2}'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, END_U + 0.4]}
        y={[-YMAX, YMAX]}
        xStep={H}
        yStep={1}
        height={300}
        xLabel={atU ? 'u' : atX ? 'x' : ''}
        xLabels={piTick}
        yLabels={v => (v % 2 === 0 ? String(v) : '')}
      >
        {[H, 3 * H].map(u => (
          <Line.Segment key={u} point1={[k * u, -YMAX]} point2={[k * u, YMAX]} color={C.guide} style="dashed" weight={1.5} />
        ))}
        <Line.Segment point1={[end, -YMAX]} point2={[end, YMAX]} color={C.bad} style="dashed" weight={2} />
        <Label at={[end, -YMAX]} color={C.bad} attach={t < 0.5 ? 'nw' : 'ne'}>{atX ? 'x = 5π/4' : atU ? 'u = 5π/2' : 'end'}</Label>
        {BRANCHES.map(([lo, hi]) => (
          <Plot.Parametric key={lo} xy={s => [k * s, Math.tan(s)]} domain={[lo, hi]} color={C.f} weight={3} />
        ))}
        <Line.Segment point1={[0, D]} point2={[end, D]} color={C.g} weight={2.5} />
        {t < 0.5 && (
          <Label at={[k * H, D]} color={C.g} attach="ne">
            y = d
          </Label>
        )}
        {US.map((u, i) => (
          <g key={i}>
            <Line.Segment point1={[k * u, 0]} point2={[k * u, D]} color={C.good} style="dashed" weight={1.5} />
            <Point x={k * u} y={D} color={C.good} />
            {(atU || atX) && (
              <Label at={[k * u, D]} color={C.good} attach="se" size={12}>
                {`${atU ? 'u' : 'x'}${SUB[i]}`}
              </Label>
            )}
          </g>
        ))}
      </Plane>
      <Controls>
        <Slider
          label="\text{horizontal scale}"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={1}
          step={0.01}
          format={v => `×${(1 - v / 2).toFixed(2)}`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Squash u into x" />
        </Buttons>
        <Readouts>
          <Readout tex={`d = ${D},\\ \\alpha = \\tan^{-1}(${D}) \\approx ${num(A, 3)}`} />
          {US.map((u, i) => (
            <Readout
              key={i}
              color={C.good}
              tex={
                atU
                  ? `u_${i + 1} = ${U_TEX[i]} \\approx ${num(u, 3)}`
                  : atX
                    ? `x_${i + 1} = ${X_TEX[i]} \\approx ${num(k * u, 3)}`
                    : `${num(k, 2)}\\,u_${i + 1} \\approx ${num(k * u, 3)}`
              }
            />
          ))}
          <Readout color={C.bad} tex={`\\text{end} \\approx ${num(end, 3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
