// 2018 Methods Exam 2 MCQ 6 — g(x + 2) = 3x + 1 is NOT the rule for g. Slide x: the given fact
// says g's input is x + 2 and its output is 3x + 1, so the point (x + 2, 3x + 1) is on y = g(x) —
// two units to the RIGHT of (x, 3x + 1) on the line y = 3x + 1. Every such point lies on
// y = 3x − 5, so g(x) = 3x − 5 (the line y = 3x + 1 is g shifted 2 left). A toggle shows the
// "g(x) = 3x + 1" misreading: at the same input its output is 6 too high, which f doubles to the
// 12-unit gap between option E (6x + 2) and the answer D (6x − 10).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Vector, num } from './kit'

const given = (x: number) => 3 * x + 1
const g = (x: number) => 3 * x - 5

export default function ShiftedInput() {
  const [x, setX] = useState(1)
  const [wrong, setWrong] = useState(false)

  const u = x + 2
  const out = given(x)
  const wrongOut = given(u)

  return (
    <div>
      <Plane x={[-4, 7]} y={[-10, 17]} xStep={1} yStep={3} height={330}>
        <Plot.OfX y={given} domain={[-4, 7]} color={C.f} weight={3} />
        <Plot.OfX y={g} domain={[-4, 7]} color={C.g} weight={3} />
        <Label at={[-0.4, 14.5]} color={C.f} attach="w" size={12}>y = g(x + 2)</Label>
        <Label at={[-0.4, 12]} color={C.f} attach="w" size={12}>= 3x + 1</Label>
        <Label at={[5.6, g(5.6)]} color={C.g} attach="se">y = g(x)</Label>

        <Point x={x} y={out} color={C.f} />
        <Vector tail={[x, out]} tip={[u, out]} color={C.guide} />
        <Label at={[x + 1, out]} color={C.guide} attach="n" size={12}>+2</Label>
        <Point x={u} y={out} color={C.g} />
        <Label at={[u, out]} color={C.g} attach="se">{`(${num(u, 1)}, ${num(out, 1)})`}</Label>

        {wrong && (
          <>
            <Line.Segment point1={[u, out]} point2={[u, wrongOut]} color={C.bad} style="dashed" weight={2} />
            <Point x={u} y={wrongOut} color={C.bad} />
            <Label at={[u, wrongOut]} color={C.bad} attach={u > 4 ? "w" : "e"}>{`(${num(u, 1)}, ${num(wrongOut, 1)})?`}</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={setX} min={-2} max={2.5} step={0.5} format={v => num(v, 1)} />
        <Toggle label="Take g(x) = 3x + 1 as the rule" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout color={C.g} tex={`g(${num(x, 1)} + 2) = g(${num(u, 1)}) = 3(${num(x, 1)}) + 1 = ${num(out, 1)}`} />
          {wrong ? (
            <Readout color={C.bad} tex={`3x + 1 \\text{ at } x = ${num(u, 1)}: \\ ${num(wrongOut, 1)} \\ne ${num(out, 1)}`} />
          ) : (
            <Readout color={C.g} tex={`3(${num(u, 1)}) - 5 = ${num(g(u), 1)}\\ \\checkmark`} />
          )}
        </Readouts>
        {wrong ? (
          <Notice tone="warn">
            If <M>{'g(x) = 3x + 1'}</M>, then <M>g({num(u, 1)}) = {num(wrongOut, 1)}</M>, but the question says{' '}
            <M>g({num(u, 1)}) = {num(out, 1)}</M>. The red point is always <b>6 too high</b>, because{' '}
            <M>{'3(x+2)+1 = 3x+7'}</M>, not <M>3x + 1</M>. Doubling by <M>f</M> makes that 12 too high:{' '}
            <M>{'6x + 2'}</M> (option E) instead of <M>{'6x - 10'}</M>.
          </Notice>
        ) : (
          <Notice>
            The fact <M>{'g(x+2) = 3x+1'}</M> says: feed <M>g</M> the input <M>x + 2</M> and out comes <M>3x + 1</M>. So the
            point on the graph of <M>g</M> is <M>(x + 2,\ 3x + 1)</M>, two units to the <b>right</b> of the blue line. Slide{' '}
            <M>x</M>: every orange point lands on <M>{'y = 3x - 5'}</M>, the blue line shifted right 2, so{' '}
            <M>{'g(x) = 3(x-2)+1 = 3x-5'}</M>. Turn on the toggle to see the shortcut fail.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
