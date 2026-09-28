// 2020 Methods Exam 2 MCQ 20 — what "f(x) = f(x + h) for all h ∈ Z" does to a. The blue curve is
// f(x) = cos(ax); the dashed orange curve is y = f(x + h), the same graph translated h units left.
// The property holds only when the copy lands exactly on the curve for every integer h. Starts at
// a = π (period 2, a whole number): the h = 2 copy fits but the h = 1 copy is upside down, so a = π
// fails — the trap behind options C and D. a = 2π fits (one cycle per unit, the report's value),
// and so do a = 4π, 6π, … (a = 2πn in general); the next diagram shows only a = 2π fits an option.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const PI = Math.PI
const X0 = -1
const X1 = 2

/** Whole number of cycles? (a·h / 2π an integer) */
const fits = (a: number, h: number) => {
  const c = (a * h) / (2 * PI)
  return Math.abs(c - Math.round(c)) < 1e-6
}
/** a as a multiple of π, if it is one exactly (after snapping). */
const piMultiple = (a: number) => {
  const k = Math.round(a / PI)
  return Math.abs(a - k * PI) < 1e-9 ? k : null
}
const aText = (a: number) => {
  const k = piMultiple(a)
  return k === null ? a.toFixed(2) : k === 1 ? 'π' : `${k}π`
}
const aTex = (a: number) => {
  const k = piMultiple(a)
  return k === null ? a.toFixed(2) : k === 1 ? '\\pi' : `${k}\\pi`
}

export default function Shift() {
  const [a, setA] = useState(PI)
  const [h, setH] = useState<1 | 2>(1)
  const k = piMultiple(a)
  const fit1 = fits(a, 1)
  const fit2 = fits(a, 2)
  const fitH = h === 1 ? fit1 : fit2
  const cycles = (a * h) / (2 * PI)

  // Crests of the blue curve (cos = 1) on screen, so the student can count whole cycles.
  const crests: number[] = []
  for (let j = Math.ceil((X0 * a) / (2 * PI)); (2 * PI * j) / a <= X1 + 1e-9; j++) crests.push((2 * PI * j) / a)

  let notice
  if (fit1 && k === 2) {
    notice = (
      <Notice tone="good">
        <b>One full cycle in every unit.</b> The period is <M>{'\\tfrac{2\\pi}{a} = 1'}</M>, so moving the graph 1 unit lands
        every crest on the next crest, and the dashed copy sits exactly on the curve. A shift of 2, 3 or <M>-1</M> is just
        several shifts of 1, so <i>every</i> integer <M>h</M> works. This is <M>a = 2\pi</M>, the value the report uses.
      </Notice>
    )
  } else if (fit1 && k !== null) {
    notice = (
      <Notice tone="good">
        <b>This works too.</b> <M>{`a = ${aTex(a)}`}</M> packs {k / 2} whole cycles into each unit, so a shift of 1 is still a
        whole number of periods. So the property really gives <M>a = 2\pi n</M> for a whole number <M>n</M>, not only{' '}
        <M>2\pi</M>. The working checks these faster waves: none of them fits any option (see the next diagram).
      </Notice>
    )
  } else if (fit2 && h === 1 && k === 1) {
    notice = (
      <Notice tone="warn">
        <b>
          <M>a = \pi</M> has period 2, a whole number, and it still fails.
        </b>{' '}
        A shift of 2 works (press <M>h = 2</M>), but the property says <i>every</i> integer <M>h</M>, and a shift of 1 is only
        half a period: the dashed copy is upside down, <M>f(x + 1) = -f(x)</M>. So <M>a = \pi</M> is ruled out. Now try{' '}
        <M>a = 2\pi</M>.
      </Notice>
    )
  } else if (fit2 && h === 1) {
    notice = (
      <Notice tone="warn">
        A shift of 1 is {k}/2 periods here, not a whole number, so the dashed copy is upside down:{' '}
        <M>f(x + 1) = -f(x)</M>. A shift of 2 would work, but the property needs <i>every</i> integer <M>h</M>, and{' '}
        <M>h = 1</M> is the hardest test to pass.
      </Notice>
    )
  } else if (fit2 && h === 2) {
    notice = (
      <Notice tone="warn">
        A shift of 2 works here: 2 units hold {k} whole cycles. But that isn&apos;t enough, because the property needs{' '}
        <i>every</i> integer <M>h</M>. Switch to <M>h = 1</M>: once a shift of 1 works, every whole-number shift does.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The dashed copy (the graph moved {h} unit{h === 1 ? '' : 's'} left) doesn&apos;t sit on the curve:{' '}
        {h === 1 ? 'one unit holds' : 'two units hold'} about {cycles.toFixed(2)} cycles, not a whole number. Slide{' '}
        <M>a</M> until the copy lands exactly on top of the curve.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[-1.25, 1.25]} xStep={0.5} yStep={0.5} height={270} xLabels={v => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : '')} yLabels={false}>
        <Line.Segment point1={[0, -1.25]} point2={[0, 1.25]} color={C.guide} style="dashed" weight={1} />
        <Line.Segment point1={[h, -1.25]} point2={[h, 1.25]} color={C.guide} style="dashed" weight={1} />
        <Plot.OfX y={x => Math.cos(a * x)} domain={[X0, X1]} color={C.f} weight={3} minSamplingDepth={9} />
        <Plot.OfX y={x => Math.cos(a * (x + h))} domain={[X0, X1]} color={C.g} weight={3} style="dashed" minSamplingDepth={9} />
        {crests.map(c => (
          <Point key={c} x={c} y={1} color={C.f} svgCircleProps={{ r: 4 }} />
        ))}
        <Label at={[h, -1.25]} color={C.guide} attach="ne" size={12}>{`x = ${h}`}</Label>
      </Plane>
      <Controls>
        <Slider
          label="a"
          value={a}
          onChange={v => {
            const kk = Math.round(v / PI)
            setA(Math.abs(v - kk * PI) < 0.07 && kk > 0 ? kk * PI : v)
          }}
          min={1}
          max={13}
          step={0.01}
          format={aText}
        />
        <Buttons>
          <ActionButton label={<M>a = \pi</M>} onClick={() => setA(PI)} />
          <ActionButton label={<M>a = 2\pi</M>} onClick={() => setA(2 * PI)} />
          <ActionButton label={<M>a = 4\pi</M>} onClick={() => setA(4 * PI)} />
          <Toggle label={<>Shift <M>h = 1</M></>} checked={h === 1} onChange={() => setH(1)} />
          <Toggle label={<>Shift <M>h = 2</M></>} checked={h === 2} onChange={() => setH(2)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`y = \\cos(${aTex(a)}\\,x)`} />
          <Readout color={C.g} tex={`y = \\cos\\big(${aTex(a)}(x+${h})\\big)`} />
          <Readout tex={`\\text{period} = \\tfrac{2\\pi}{a} \\approx ${((2 * PI) / a).toFixed(3)}`} />
          <Readout
            color={fitH ? C.good : C.bad}
            tex={fitH ? `f(x+${h}) = f(x)\\ \\checkmark` : `f(x+${h}) \\ne f(x)`}
          />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          Dashed orange: <M>y = f(x + h)</M>, the blue graph moved <M>h</M> units left. The blue dots are the crests, one per
          cycle. (A negative <M>a</M> gives the same graph, because <M>\cos(-\theta) = \cos\theta</M>.)
        </p>
        {notice}
      </Controls>
    </div>
  )
}
