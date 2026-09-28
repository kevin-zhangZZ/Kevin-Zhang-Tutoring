// 2018 Methods Exam 2 MCQ 4 — why g(x) = ½f(x − 1) moves every point of f RIGHT 1 and halves its
// height. Slide x along g: the point of g at x copies f's height from x − 1 (one unit to the left)
// and halves it, drawn as a "right 1, then × ½" path from the source point on f. At x = 4 the
// source is A(3, 2) itself and the image is P(4, 1). f is an example curve through A,
// f(x) = (x − 1)²/4 + 1 (the question never gives f; only f(3) = 2 matters). A toggle shows the
// "x − 1 means left" reading: the curve ½f(x + 1) and the point (2, 1), which is not on g.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const f = (x: number) => (x - 1) ** 2 / 4 + 1
const g = (x: number) => f(x - 1) / 2
const wrongG = (x: number) => f(x + 1) / 2

export default function FollowPoint() {
  const [t, setT] = useState(2)
  const [left, setLeft] = useState(false)

  const s = t - 1
  const fs = f(s)
  const gt = g(t)
  const atP = Math.abs(t - 4) < 0.01

  let notice
  if (left) {
    notice = (
      <Notice tone="warn">
        Reading <M>x - 1</M> as &ldquo;move left&rdquo; sends <M>A</M> to <M>(2, 1)</M> and the graph to the red curve{' '}
        <M>{'y = \\tfrac12 f(x+1)'}</M>, which is <b>not</b> <M>g</M>. Check with the rule itself (for this example <M>f</M>):{' '}
        <M>{'g(2) = \\tfrac12 f(1) = \\tfrac12 \\times 1 = 0.5'}</M>, not <M>1</M>. The rule says <M>g</M> at <M>x</M>{' '}
        looks <em>back</em> to <M>f</M> at <M>x - 1</M>, so whatever <M>f</M> does, <M>g</M> does one unit later. In the real question <M>f(1)</M> is unknown, so <M>(2, 1)</M> can't be justified at all.
      </Notice>
    )
  } else if (atP) {
    notice = (
      <Notice tone="good">
        <b>The source point is <M>A</M> itself.</b> <M>{'g(4) = \\tfrac12 f(3) = \\tfrac12 \\times 2 = 1'}</M>, so the
        image of <M>A</M> is <M>P(4, 1)</M>: right <M>1</M>, height halved, <M>{'(x, y) \\to (x+1, \\tfrac12 y)'}</M>. The
        curve <M>f</M> here is only an example; any <M>f</M> through <M>A</M> gives the same <M>P</M>, because the only
        fact used is <M>f(3) = 2</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The point of <M>g</M> at <M>x = {num(t, 1)}</M> takes its height from <M>f</M> at <M>x - 1 = {num(s, 1)}</M>,{' '}
        <b>one unit to the left</b>, then halves it. So every point of <M>f</M> turns up one unit to the <b>right</b>,
        half as high. Slide <M>x</M> until the source point on <M>f</M> is <M>A(3, 2)</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2, 7]} y={[-0.5, 4]} xStep={1} yStep={1} height={320}>
        {left && <Plot.OfX y={wrongG} domain={[-2, 7]} color={C.bad} style="dashed" weight={2.5} />}
        <Plot.OfX y={f} domain={[-2, 7]} color={C.f} weight={3} />
        <Plot.OfX y={g} domain={[-2, 7]} color={C.g} weight={3} />
        <Label at={[-1.2, f(-1.2)]} color={C.f} attach="e">f</Label>
        <Label at={[6.4, g(6.4)]} color={C.g} attach="nw">g</Label>

        {left ? (
          <>
            <Point x={3} y={2} color={C.f} />
            <Label at={[3, 2]} color={C.f} attach="se">A(3, 2)</Label>
            <Line.Segment point1={[3, 2]} point2={[2, 2]} color={C.bad} style="dashed" weight={2} />
            <Line.Segment point1={[2, 2]} point2={[2, 1]} color={C.bad} style="dashed" weight={2} />
            <Point x={2} y={1} color={C.bad} />
            <Label at={[2, 1]} color={C.bad} attach="se">(2, 1)?</Label>
            <Point x={2} y={g(2)} color={C.g} />
            <Label at={[2, g(2)]} color={C.g} attach="se">g(2) = 0.5</Label>
          </>
        ) : (
          <>
            <Line.Segment point1={[s, fs]} point2={[t, fs]} color={C.guide} style="dashed" weight={2} />
            <Line.Segment point1={[t, fs]} point2={[t, gt]} color={C.guide} style="dashed" weight={2} />
            {fs < 3.8 && <Label at={[(s + t) / 2, fs]} color={C.guide} attach="s" size={12}>right 1</Label>}
            {fs < 3.8 && <Label at={[t, (fs + gt) / 2]} color={C.guide} attach="e" size={12}>× ½</Label>}
            <Point x={3} y={2} color={C.f} />
            <Label at={[3, 2]} color={C.f} attach="nw">A</Label>
            <Point x={s} y={fs} color={C.f} />
            <Point x={t} y={gt} color={atP ? C.good : C.g} />
            {atP && <Label at={[4, 1]} color={C.good} attach="se">P(4, 1)</Label>}
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="x" value={t} onChange={setT} min={-1} max={7} step={0.1} format={v => num(v, 1)} />
        <Toggle label="Read x − 1 as “move left”" checked={left} onChange={setLeft} />
        {!left && (
          <Readouts>
            <Readout color={atP ? C.good : C.g} tex={`g(${num(t, 1)}) = \\tfrac12 f(${num(s, 1)}) = \\tfrac12 \\times ${num(fs)} = ${num(gt)}`} />
            <Readout tex={`(${num(s, 1)},\\ ${num(fs)}) \\text{ on } f \\ \\to\\ (${num(t, 1)},\\ ${num(gt)}) \\text{ on } g`} />
          </Readouts>
        )}
        {left && (
          <Readouts>
            <Readout color={C.bad} tex={`g(2) = \\tfrac12 f(1) = \\tfrac12 \\times 1 = 0.5 \\ne 1`} />
          </Readouts>
        )}
        {notice}
      </Controls>
    </div>
  )
}
