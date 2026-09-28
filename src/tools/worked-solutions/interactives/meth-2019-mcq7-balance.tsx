// 2019 Methods Exam 2 MCQ 7 — the mean of a discrete random variable is the balance point of its
// probability bars. The bars for x = 0, 1, 2, 3 have weights a, 3a, 5a, 7a with a = 1/16 and sit on
// a beam resting on a pivot at x = m. The beam tips towards the side with the bigger pull
// (the sum of distance × probability on that side). The pulls cancel only at m = 17/8, and the
// balance condition Σ(x − m)Pr(X = x) = 0 rearranges to m = Σ x Pr(X = x) = E(X). The option
// buttons put the pivot at each answer choice: only D balances.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Polygon, Readout, Readouts, Slider } from './kit'

const XS = [0, 1, 2, 3]
const P = [1, 3, 5, 7].map(n => n / 16)
const P_TEXT = ['1/16', '3/16', '5/16', '7/16']
const MEAN = 17 / 8
const H = 0.14 // height of the beam above the ground (the x-axis) when level
const HALF = 0.2 // half-width of a bar

const OPTIONS: { letter: string; value: number; label: string }[] = [
  { letter: 'A', value: 1 / 16, label: 'A: 1/16' },
  { letter: 'B', value: 1, label: 'B: 1' },
  { letter: 'C', value: 35 / 16, label: 'C: 35/16' },
  { letter: 'D', value: 17 / 8, label: 'D: 17/8' },
  { letter: 'E', value: 2, label: 'E: 2' },
]

const same = (u: number, v: number) => Math.abs(u - v) < 1e-9
const show = (v: number) => String(Number(v.toFixed(4)))

export default function Balance() {
  const [m, setM] = useState(1.5)

  // Turning effect about the pivot: positive tips the beam to the right.
  const torque = XS.reduce((s, x, i) => s + (x - m) * P[i], 0)
  const rightPull = XS.reduce((s, x, i) => s + (x > m ? (x - m) * P[i] : 0), 0)
  const leftPull = XS.reduce((s, x, i) => s + (x < m ? (m - x) * P[i] : 0), 0)
  const balanced = same(torque, 0)
  // A qualitative tilt: always visible, never so steep that the beam hits the ground.
  const slope = -0.035 * Math.tanh(6 * torque)
  const beam = (x: number) => H + slope * (x - m)
  const option = OPTIONS.find(o => same(o.value, m))

  let notice
  if (balanced) {
    notice = (
      <Notice tone="good">
        <b>Balanced at <M>{'m = \\tfrac{17}{8}'}</M></b>, option D. Balance means the pulls cancel:{' '}
        <M>{'\\sum (x-m)\\Pr(X=x) = 0'}</M>. Split the sum into <M>{'\\sum x\\Pr(X=x)'}</M> minus{' '}
        <M>{'m\\sum \\Pr(X=x)'}</M>; the probabilities total <M>1</M>, so <M>{'m = \\sum x\\Pr(X=x)'}</M>. That is why
        the mean weights each value by its probability.
      </Notice>
    )
  } else if (option?.letter === 'E') {
    notice = (
      <Notice tone="warn">
        Option E puts the pivot at <M>2</M>, and the beam <b>still tips right</b>, only just. The bar at{' '}
        <M>3</M> is the heaviest and the furthest out, so the pivot has to sit a little past <M>2</M>. (<M>2</M> is the
        median of <M>X</M>, not its mean.) Try D.
      </Notice>
    )
  } else if (option?.letter === 'C') {
    notice = (
      <Notice tone="warn">
        Option C, <M>{'\\tfrac{35}{16}'}</M>, is just past the balance point, so now the <b>left pull wins</b> by{' '}
        <M>{'\\tfrac{1}{16}'}</M>. Move the pivot back one notch.
      </Notice>
    )
  } else if (option?.letter === 'A') {
    notice = (
      <Notice tone="warn">
        Option A is <M>{'a = \\tfrac{1}{16}'}</M>, the value you find on the way. It is a probability, not a value
        of <M>X</M>, and as a pivot it sits almost at <M>0</M>, so the whole distribution tips to the right.
      </Notice>
    )
  } else if (torque > 0) {
    notice = (
      <Notice>
        The <b>right pull is bigger</b>, so the beam tips right.{' '}
        {same(m, 1.5) ? (
          <>
            <M>1.5</M> is halfway from <M>0</M> to <M>3</M>, which would balance four equal bars, but these bars get
            heavier to the right.{' '}
          </>
        ) : null}
        Slide the pivot right until the two pulls are equal.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now the <b>left pull is bigger</b>, so the beam tips left: the pivot is past the balance point. Slide it back
        towards <M>2</M>.
      </Notice>
    )
  }

  const barColor = (x: number) => (same(x, m) ? C.guide : x < m ? C.g : C.f)

  return (
    <div>
      <Plane x={[-0.5, 3.5]} y={[0, 0.66]} xStep={1} yStep={0.1} yLabels={false} yLabel="" height={300}>
        <Label at={[0, 0]} attach="sw" gap={5}>0</Label>
        {balanced && (
          <>
            <Line.Segment point1={[MEAN, 0]} point2={[MEAN, 0.64]} color={C.good} style="dashed" weight={2} />
            <Label at={[MEAN, 0.64]} attach="w" color={C.good}>E(X)</Label>
          </>
        )}
        <Polygon points={[[m, H], [m - 0.1, 0], [m + 0.1, 0]]} color={C.guide} fillOpacity={0.7} weight={1} />
        <Line.Segment point1={[-0.4, beam(-0.4)]} point2={[3.4, beam(3.4)]} color={C.ink} weight={4} />
        {XS.map((x, i) => (
          <Polygon
            key={x}
            points={[
              [x - HALF, beam(x - HALF)],
              [x + HALF, beam(x + HALF)],
              [x + HALF, beam(x + HALF) + P[i]],
              [x - HALF, beam(x - HALF) + P[i]],
            ]}
            color={barColor(x)}
            fillOpacity={0.5}
            weight={1.5}
          />
        ))}
        {XS.map((x, i) => (
          <Label key={x} at={[x, beam(x) + P[i]]} attach="n" color={barColor(x)}>
            {P_TEXT[i]}
          </Label>
        ))}
      </Plane>
      <Controls>
        <Slider label="m" value={m} onChange={setM} min={0} max={3} step={1 / 16} format={show} />
        <Buttons>
          {OPTIONS.map(o => (
            <ActionButton key={o.letter} label={o.label} onClick={() => setM(o.value)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout tex={'\\text{pull} = \\sum |x-m| \\times \\Pr(X=x)'} />
          <Readout color={C.g} tex={`\\text{left pull} = ${leftPull.toFixed(4)}`} />
          <Readout color={C.f} tex={`\\text{right pull} = ${rightPull.toFixed(4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
