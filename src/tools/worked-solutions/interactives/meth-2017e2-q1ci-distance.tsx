// 2017 Methods Exam 2 Q1c(i) — the distance CD is the hypotenuse of a right triangle whose legs are
// the run 2 and the rise g(1) − g(−1) = 2 − 2k, for g(x) = x³ − kx. Slide k: the run never changes,
// only the rise does, so CD = √(4 + (2 − 2k)²) = 2√(k² − 2k + 2). It starts at k = 5, which is part
// (b)'s AB = √68. A toggle tries the report's wrong step √(2² + (2 − 2k)²) = 2 + 2 − 2k: walking the
// two legs instead of the hypotenuse, which at k = 5 even gives a negative "length" of −6.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

export default function Distance() {
  const [k, setK] = useState(5)
  const [legs, setLegs] = useState(false)
  const g = (x: number) => x ** 3 - k * x
  const Cp: [number, number] = [-1, k - 1]
  const Dp: [number, number] = [1, 1 - k]
  const P: [number, number] = [1, k - 1]
  const rise = 2 - 2 * k
  const cd = Math.sqrt(4 + rise * rise)
  const wrongVal = 2 + rise
  const atFive = Math.abs(k - 5) < 0.01
  const atOne = Math.abs(k - 1) < 0.03
  const legColor = legs ? C.bad : C.guide

  let notice
  if (legs) {
    notice = (
      <Notice tone="warn">
        <M>{'\\sqrt{2^2 + (2-2k)^2} = 2 + (2-2k)'}</M> adds the two red legs instead of measuring the green
        hypotenuse. Here that gives <M>{`4 - 2k = ${num(wrongVal)}`}</M>
        {wrongVal < 0 ? <>, a negative &ldquo;distance&rdquo;</> : <> against the true <M>{`CD \\approx ${num(cd)}`}</M></>}.
        A square root does not split across a plus sign: square roots undo squares, not sums. The only time the legs add
        up to the hypotenuse is when one of them is <M>0</M> &mdash; try <M>k = 1</M>.
      </Notice>
    )
  } else if (atOne) {
    notice = (
      <Notice tone="good">
        At <M>k = 1</M>, <M>{'g(\\pm1) = 0'}</M>: <M>C</M> and <M>D</M> both sit on the <M>x</M>-axis, the rise is{' '}
        <M>0</M> and <M>CD</M> is just the run, <M>2</M>. This is the shortest <M>CD</M> can be.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone={atFive ? 'good' : 'neutral'}>
        {atFive && <><b>At <M>k = 5</M> this is part (b):</b> <M>{'AB = \\sqrt{2^2 + 8^2} = \\sqrt{68}'}</M>. </>}
        The run from <M>x=-1</M> to <M>x=1</M> is always <M>2</M> units, and only the rise{' '}
        <M>{'g(1) - g(-1) = 2 - 2k'}</M> changes with <M>k</M>. Pythagoras on the triangle gives{' '}
        <M>{'CD = \\sqrt{4 + (2-2k)^2}'}</M>. Slide <M>k</M> and watch only the vertical leg change.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.6, 2.6]} y={[-6.5, 6.5]} xStep={1} yStep={2} height={330}>
        <Plot.OfX y={g} domain={[-2.6, 2.6]} color={C.f} weight={3} />
        <Line.Segment point1={Cp} point2={P} color={legColor} style="dashed" weight={legs ? 3 : 2} />
        <Line.Segment point1={P} point2={Dp} color={legColor} style="dashed" weight={legs ? 3 : 2} />
        <Line.Segment point1={Cp} point2={Dp} color={C.good} weight={3} />
        <Point x={Cp[0]} y={Cp[1]} color={C.g} />
        <Point x={Dp[0]} y={Dp[1]} color={C.g} />
        <Label at={Cp} attach={k >= 1 ? 'nw' : 'sw'} color={C.g}>C</Label>
        <Label at={Dp} attach={k >= 1 ? 'se' : 'ne'} color={C.g}>D</Label>
        {!atOne && (
          <>
            <Label at={[-0.4, k - 1]} attach={k >= 1 ? "n" : "s"} color={legs ? C.bad : C.ink}>run 2</Label>
            <Label at={[1, 0.5 * (k - 1)]} attach="e" color={legs ? C.bad : C.ink}>
              {`rise ${num(rise, 1)}`}
            </Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={0.1} max={6} step={0.05} />
        <Buttons>
          <Toggle label="Add the legs instead" checked={legs} onChange={setLegs} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`C = (-1,\\ ${num(k - 1)}),\\ D = (1,\\ ${num(1 - k)})`} />
          <Readout color={C.good} tex={`CD = 2\\sqrt{k^2-2k+2} \\approx ${num(cd)}`} />
          {legs && <Readout color={C.bad} tex={`2 + (2-2k) = ${num(wrongVal)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
