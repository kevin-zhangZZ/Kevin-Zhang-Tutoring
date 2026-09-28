// 2017 Methods Exam 2 MCQ 5 — the confidence interval (0.039, 0.121) drawn as a bar, with a
// draggable p-hat splitting it into a left arm (p-hat − 0.039) and a right arm (0.121 − p-hat).
// An interval is built as p-hat ± E with a single margin of error E, so the arms must be equal:
// they balance only at the midpoint 0.080 (option A), where each arm is E = 0.041. The option
// buttons show every distractor leaving the arms unequal, and that 0.041 (option B) is the arm
// length, not the centre.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Readout, Readouts, Slider, clamp } from './kit'

const L = 0.039
const U = 0.121
const Y = 0.45
const OPTIONS: [string, number][] = [
  ['A', 0.08],
  ['B', 0.041],
  ['C', 0.1],
  ['D', 0.062],
  ['E', 0.059],
]

export default function Midpoint() {
  const [p, setP] = useState(0.041)
  const left = p - L
  const right = U - p
  const balanced = Math.abs(left - right) < 0.0015
  const opt = OPTIONS.find(([, v]) => Math.abs(v - p) < 0.0004)?.[0]

  let notice
  if (balanced) {
    notice = (
      <Notice tone="good">
        Both arms are <M>0.041</M>. The interval was made as <M>{'\\hat p \\pm E'}</M>: one margin of error{' '}
        <M>{'E = 1.96\\sqrt{\\hat p(1-\\hat p)/n}'}</M>, taken away for the lower end and added for the upper end. So{' '}
        <M>{'\\hat p'}</M> is the point with equal arms, the midpoint <M>{'\\tfrac{0.039+0.121}{2} = 0.080'}</M>. Now
        press B: its <M>0.041</M> is the arm length you can see here.
      </Notice>
    )
  } else if (opt === 'B') {
    notice = (
      <Notice tone="warn">
        <M>0.041</M> is half the width, <M>{'\\tfrac{0.121-0.039}{2}'}</M>: the <em>length</em> of each arm, i.e. the
        margin of error <M>E</M>. Used as a position it sits just <M>0.002</M> above the lower end, with a right arm
        forty times longer than the left. That can&apos;t be the centre of <M>{'\\hat p \\pm E'}</M>. Drag{' '}
        <M>{'\\hat p'}</M> until the arms match.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        {opt ? <>Option {opt}: </> : null}the left arm is <M>{left.toFixed(3)}</M> but the right arm is{' '}
        <M>{right.toFixed(3)}</M>. An interval built as <M>{'\\hat p \\pm E'}</M> has the same <M>E</M> on both
        sides, so this <M>{'\\hat p'}</M> could not have produced <M>{'(0.039,\\ 0.121)'}</M>. Keep dragging until the
        two arms are equal.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0.012, 0.148]}
        y={[-0.3, 1.1]}
        xStep={0.02}
        yStep={10}
        height={190}
        xLabel=""
        yLabel=""
        xLabels={v => (v > 0.019 && v < 0.141 ? v.toFixed(2) : '')}
        yLabels={false}
      >
        <Line.Segment point1={[L, Y]} point2={[p, Y]} color={C.g} weight={7} />
        <Line.Segment point1={[p, Y]} point2={[U, Y]} color={C.violet} weight={7} />
        <Line.Segment point1={[L, Y - 0.13]} point2={[L, Y + 0.13]} color={C.ink} weight={2.5} />
        <Line.Segment point1={[U, Y - 0.13]} point2={[U, Y + 0.13]} color={C.ink} weight={2.5} />
        <Label at={[L, Y]} attach="w" gap={9}>0.039</Label>
        <Label at={[U, Y]} attach="e" gap={9}>0.121</Label>
        {left > 0.0005 && (
          <Label at={[(L + p) / 2, Y + 0.08]} attach="n" color={C.g}>
            {left.toFixed(3)}
          </Label>
        )}
        {right > 0.0005 && (
          <Label at={[(p + U) / 2, Y + 0.08]} attach="n" color={C.violet}>
            {right.toFixed(3)}
          </Label>
        )}
        {balanced && (
          <Line.Segment point1={[0.08, 0]} point2={[0.08, Y - 0.3]} color={C.good} style="dashed" weight={1.5} />
        )}
        <Label at={[p, Y - 0.08]} attach="s" color={balanced ? C.good : C.f}>
          p̂
        </Label>
        <MovablePoint
          point={[p, Y]}
          onMove={([x]) => setP(Math.round(clamp(x, L, U) * 1000) / 1000)}
          constrain={([x]) => [clamp(x, L, U), Y]}
          color={balanced ? C.good : C.f}
        />
      </Plane>
      <Controls>
        <Slider label="\hat p" value={p} onChange={setP} min={L} max={U} step={0.001} format={v => v.toFixed(3)} />
        <Buttons>
          {OPTIONS.map(([k, v]) => (
            <ActionButton key={k} label={`${k}: ${v.toFixed(3)}`} onClick={() => setP(v)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\text{left arm } \\hat p-0.039=${left.toFixed(3)}`} />
          <Readout color={C.violet} tex={`\\text{right arm } 0.121-\\hat p=${right.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
