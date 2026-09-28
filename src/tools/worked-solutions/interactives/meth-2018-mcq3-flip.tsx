// 2018 Methods Exam 2 MCQ 3 — why the range of f(x) = 1/x on [a, b) is (1/b, 1/a]. The domain is
// drawn on the x-axis (closed at a, open at b) and the range on the y-axis. Slide x across the
// domain: because 1/x is decreasing, the output slides DOWN, so the left end a gives the top of the
// range and the right end b gives the bottom. Each end keeps its own bracket: 1/a is reached
// (closed), 1/b is only approached (open). A toggle shows option A (34%), [1/a, 1/b): the right
// bracket on each value, but written in the domain's order, which runs downhill and is empty.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Vector } from './kit'

const inv = (x: number) => 1 / x

function OpenPoint({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2.5 } }} />
}

export default function FlipWidget() {
  const [a, setA] = useState(0.5)
  const [b, setB] = useState(2)
  const [xRaw, setX] = useState(1)
  const [wrongA, setWrongA] = useState(false)

  const x0 = Math.min(Math.max(xRaw, a), b - 0.001)
  const ya = inv(a)
  const yb = inv(b)
  const yx = inv(x0)
  const atA = x0 - a < 0.02
  const nearB = b - x0 < 0.06

  let notice
  if (wrongA) {
    notice = (
      <Notice tone="warn">
        <b>Option A, <M>{'\\left[\\tfrac1a, \\tfrac1b\\right)'}</M>, copies the domain&apos;s left-to-right order.</b> Its
        brackets are actually on the right values (<M>[</M> with <M>{'\\tfrac1a'}</M>, <M>)</M> with{' '}
        <M>{'\\tfrac1b'}</M>), but an interval runs from smallest to largest, and here{' '}
        <M>{`\\tfrac1a = ${ya.toFixed(2)} > \\tfrac1b = ${yb.toFixed(2)}`}</M>. The red arrow runs downhill:{' '}
        <M>{`[${ya.toFixed(2)}, ${yb.toFixed(2)})`}</M> would need <M>{`${ya.toFixed(2)} \\le y < ${yb.toFixed(2)}`}</M>, and no
        number does that. Write it smallest first and you get <M>{'\\left(\\tfrac1b, \\tfrac1a\\right]'}</M>, option D.
      </Notice>
    )
  } else if (atA) {
    notice = (
      <Notice>
        <M>x = a</M> is in the domain (closed dot), so <M>{'\\tfrac1a'}</M> is a genuine output, and it is the{' '}
        <b>highest</b> one: the range is closed at the top, <M>{'\\tfrac1a\\,]'}</M>. Now slide <M>x</M> to the right
        and watch which way the violet dot on the <M>y</M>-axis moves.
      </Notice>
    )
  } else if (nearB) {
    notice = (
      <Notice tone="good">
        However close <M>x</M> gets to <M>b</M>, <M>{'\\tfrac1x'}</M> stays just <b>above</b>{' '}
        <M>{'\\tfrac1b'}</M> (compare the readouts). <M>x = b</M> itself is not in the domain, so{' '}
        <M>{'\\tfrac1b'}</M> is never an output: the range is open at the bottom. Range{' '}
        <M>{'= \\left(\\tfrac1b, \\tfrac1a\\right]'}</M>. Now turn on option A to see why 34% went wrong.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        As <M>x</M> moves <b>right</b> across the domain, <M>{'\\tfrac1x'}</M> moves <b>down</b> the <M>y</M>-axis:
        the function is decreasing. So the left end of the domain, <M>a</M>, gives the <b>top</b> of the range, and
        the right end, <M>b</M>, gives the bottom. Slide <M>x</M> as close to <M>b</M> as it will go.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.55, 3.3]} y={[-0.3, 3.1]} xStep={0.5} yStep={0.5} height={320} labels={false}>
        <Plot.OfX y={inv} domain={[0.3, 3.3]} color={C.guide} weight={1.5} style="dashed" />
        {/* guides from each end of the domain to its output */}
        <Line.Segment point1={[a, 0]} point2={[a, ya]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[a, ya]} point2={[0, ya]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[b, 0]} point2={[b, yb]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[b, yb]} point2={[0, yb]} color={C.guide} style="dashed" weight={1.5} />
        {/* the moving input and its output */}
        <Line.Segment point1={[x0, 0]} point2={[x0, yx]} color={C.violet} style="dashed" weight={1.5} />
        <Line.Segment point1={[x0, yx]} point2={[0, yx]} color={C.violet} style="dashed" weight={1.5} />
        {/* the function on [a, b) */}
        <Plot.OfX y={inv} domain={[a, b]} color={C.f} weight={3.5} />
        <Point x={a} y={ya} color={C.f} />
        <OpenPoint x={b} y={yb} color={C.f} />
        {/* domain on the x-axis */}
        <Line.Segment point1={[a, 0]} point2={[b, 0]} color={C.g} weight={6} />
        <Point x={a} y={0} color={C.g} />
        <OpenPoint x={b} y={0} color={C.g} />
        <Label at={[a, 0]} color={C.g} attach="s" gap={9}>a</Label>
        <Label at={[b, 0]} color={C.g} attach="s" gap={9}>b</Label>
        {/* range on the y-axis */}
        <Line.Segment point1={[0, yb]} point2={[0, ya]} color={C.good} weight={6} />
        <Point x={0} y={ya} color={C.good} />
        <OpenPoint x={0} y={yb} color={C.good} />
        <Label at={[0, ya]} color={C.good} attach="w" gap={9}>1/a</Label>
        <Label at={[0, yb]} color={C.good} attach="w" gap={9}>1/b</Label>
        <Point x={x0} y={yx} color={C.violet} />
        <Point x={x0} y={0} color={C.violet} svgCircleProps={{ r: 4 }} />
        <Point x={0} y={yx} color={C.violet} svgCircleProps={{ r: 4 }} />
        {/* option A read left to right: from 1/a to 1/b, which points down the axis */}
        {wrongA && <Vector tail={[0.22, ya]} tip={[0.22, yb]} color={C.bad} weight={3} />}
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={setX}
          min={a}
          max={b - 0.001}
          step={0.001}
          format={v => v.toFixed(3)}
        />
        <Slider
          label="a"
          value={a}
          onChange={v => {
            setA(v)
            if (b < v + 0.3) setB(Math.min(3.1, v + 0.3))
          }}
          min={0.35}
          max={1.4}
          step={0.05}
        />
        <Slider label="b" value={b} onChange={v => setB(Math.max(v, a + 0.3))} min={0.8} max={3.1} step={0.05} />
        <Toggle label="Copy the domain's order (option A)" checked={wrongA} onChange={setWrongA} />
        <Readouts>
          <Readout color={C.violet} tex={`x = ${x0.toFixed(3)} \\Rightarrow \\tfrac1x = ${yx.toFixed(4)}`} />
          <Readout color={C.g} tex={`\\text{domain } [a, b) = [${a.toFixed(2)}, ${b.toFixed(2)})`} />
          <Readout color={C.good} tex={`\\text{range } \\left(\\tfrac1b, \\tfrac1a\\right] = (${yb.toFixed(4)}, ${ya.toFixed(4)}]`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
