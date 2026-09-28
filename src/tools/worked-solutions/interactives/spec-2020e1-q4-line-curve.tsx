// 2020 Specialist Exam 1 Q4 — the inequality 3 − x > 1/|x − 4| read as a picture, the way the
// examiner's report recommends ("a quick sketch was helpful"): for which x is the line y = 3 − x
// higher than the curve y = 1/|x − 4|? Slide x along the axis: a bar joins the two graphs, green
// where the line is higher and red where it isn't. The line wins only left of the crossing at
// x = (7 − √5)/2 ≈ 2.38 (where both sides equal (√5 − 1)/2 ≈ 0.618). From x = 3 on the line is on
// or below the axis while the curve never is, which is the working's first deduction (x < 3).
//
// The toggle shows the wrong idea failing: squaring both sides compares |3 − x| with 1/|x − 4|,
// i.e. the line with its negative part flipped above the axis (dashed violet). The flipped line
// overtakes the curve at x = (7 + √5)/2 ≈ 4.62 (height (1 + √5)/2 ≈ 1.618), which is exactly the
// phantom branch x > (7 + √5)/2 that also appears when x² − 7x + 11 > 0 is solved without the
// restriction x < 3. Every value is computed from the question's own two sides.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Region, Slider, Toggle,
  num, tick, usePlayer,
} from './kit'

const lhs = (x: number) => 3 - x
const rhs = (x: number) => 1 / Math.abs(x - 4)
const XC = (7 - Math.sqrt(5)) / 2 // ≈ 2.382: the real crossing
const YC = (Math.sqrt(5) - 1) / 2 // ≈ 0.618
const XP = (7 + Math.sqrt(5)) / 2 // ≈ 4.618: the phantom crossing (flipped line meets the curve)
const YP = (1 + Math.sqrt(5)) / 2 // ≈ 1.618

// The plane shows x ∈ [−1, 7], y ∈ [−3, 4.5]; with the kit's padding the view reaches y ≈ 5.1,
// so the curve is drawn up to y = 5.3 (|x − 4| ≥ 0.19) and clipped there by the plane.
const LEFT = -1.6
const RIGHT = 7.6
const TOP = 5.3
const GAP = 1 / TOP
const NEAR = 0.05
const UNDEF = 0.03

/** A hollow dot: an endpoint the answer does not include. */
function OpenDot({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2.5 } }} />
}

export default function LineCurve() {
  const [x, setX] = useState(1)
  const [squared, setSquared] = useState(false)
  const player = usePlayer(setX, { min: -1, max: 7, seconds: 9 })

  const L = lhs(x)
  const undef = Math.abs(x - 4) < UNDEF
  const R = undef ? Infinity : rhs(x)
  const truth = !undef && L > R
  const sqTruth = !undef && Math.abs(L) > R
  const barTop = Math.min(R, TOP)
  const flipped = squared && x > 3
  // At the slider stop nearest a crossing (2.38 or 4.62) the two sides differ by less than 0.01,
  // so the verdict says "boundary" rather than a true/false that turns on the rounding.
  const atCross = Math.abs(x - XC) < 0.006
  const atPhantom = Math.abs(x - XP) < 0.006

  let notice
  if (undef) {
    notice = (
      <Notice>
        At <M>x = 4</M> the right-hand side isn&apos;t defined: <M>|x - 4| = 0</M>, and you can&apos;t divide by zero. That is the
        dashed asymptote. So <M>x = 4</M> can never be a solution, whatever else happens.
      </Notice>
    )
  } else if (!squared) {
    if (Math.abs(x - XC) < NEAR) {
      notice = (
        <Notice tone="good">
          <b>The line meets the curve here.</b> Left of <M>x = 4</M> the modulus is <M>|x - 4| = 4 - x</M>, so the crossing solves{' '}
          <M>{'3 - x = \\frac{1}{4-x}'}</M>, which is <M>x^2 - 7x + 11 = 0</M>, giving <M>{'x = \\frac{7-\\sqrt5}{2} \\approx 2.38'}</M>.
          The inequality is strict (<M>{'>'}</M>, not <M>\ge</M>), so this point itself is not a solution: hence the open circle,
          and a round bracket in the answer.
        </Notice>
      )
    } else if (x < XC) {
      notice = (
        <Notice>
          Here the line is at <M>{`3 - x = ${num(L)}`}</M> and the curve at <M>{`\\frac{1}{|x-4|} = ${num(R)}`}</M>. The line is
          higher, so the inequality is <b>true</b> (green bar). Everywhere left of the crossing the line is the higher one, so
          the whole green stretch of the axis, all the way to <M>-\infty</M>, is the answer. Drag <M>x</M> to the right and watch
          the gap close.
        </Notice>
      )
    } else if (x < 3) {
      notice = (
        <Notice>
          The line is still above the axis (<M>{`3 - x = ${num(L)}`}</M> is positive), but the curve is higher still, at{' '}
          <M>{`\\frac{1}{|x-4|} = ${num(R)}`}</M>: it climbs towards its asymptote while the line falls. <b>False</b> (red
          bar). Keep going to <M>x = 3</M>.
        </Notice>
      )
    } else if (x < 4) {
      notice = (
        <Notice tone="warn">
          <b>
            Now <M>3 - x \le 0</M>: the line is on or below the axis.
          </b>{' '}
          The curve never is. A modulus can&apos;t be negative, so <M>{'\\frac{1}{|x-4|} > 0'}</M> for every <M>x</M>. Zero or a
          negative number can never be bigger than a positive one, so nothing from <M>x = 3</M> onwards can work. That is the
          working&apos;s first step: <M>{'3 - x > 0 \\implies x < 3'}</M>.
        </Notice>
      )
    } else {
      notice = (
        <Notice>
          Right of the asymptote the curve comes back down but <b>stays above the axis</b>, while the line keeps falling below it: here{' '}
          <M>{`3 - x = ${num(L)}`}</M>. <b>False</b> everywhere out here, so the case <M>|x - 4| = x - 4</M> needs no algebra at
          all. Now turn on &ldquo;What if I square both sides?&rdquo;
        </Notice>
      )
    }
  } else if (x < 3) {
    notice = (
      <Notice>
        For <M>{'x < 3'}</M> the line is above the axis, so squaring both sides changes nothing on this side: the true stretch is
        still everything left of <M>2.38</M>. The trouble starts where <M>3 - x</M> is negative. Drag <M>x</M> past <M>4</M>.
      </Notice>
    )
  } else if (Math.abs(x - XP) < NEAR) {
    notice = (
      <Notice tone="warn">
        <b>The flipped line meets the curve here</b>, at <M>{'x = \\frac{7+\\sqrt5}{2} \\approx 4.62'}</M>: the other root of{' '}
        <M>x^2 - 7x + 11 = 0</M>. It is a crossing with the <i>flipped</i> line. The real line is down at{' '}
        <M>{`3 - x = ${num(L)}`}</M>, nowhere near the curve.
      </Notice>
    )
  } else if (x < XP) {
    notice = (
      <Notice>
        Squaring compares <M>(3 - x)^2</M> with <M>{'\\frac{1}{(x-4)^2}'}</M>, which is the same as comparing <M>|3 - x|</M> with{' '}
        <M>{'\\frac{1}{|x-4|}'}</M>. Squaring can&apos;t tell <M>-1</M> from <M>1</M>, so it sees the <b>dashed violet line</b>:
        the blue line&apos;s negative part flipped above the axis. Here the curve is still higher, so no harm yet. Keep dragging.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>A phantom solution.</b> The flipped line is above the curve, so the squared inequality says &ldquo;true&rdquo; (the red
        stretch of the axis). But the real line is at <M>{`3 - x = ${num(L)}`}</M>, below the axis, and{' '}
        <M>{`${num(L)} > ${num(R)}`}</M> is false: squaring threw the sign away. Solving <M>{'x^2 - 7x + 11 > 0'}</M> and
        forgetting it was only derived for <M>{'x < 3'}</M> gives the same phantom <M>{'x > \\frac{7+\\sqrt5}{2}'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1, 7]} y={[-3, 4.5]} xStep={1} yStep={1} height={330} yLabels={v => (v > 4.6 ? '' : tick(v))}>
        {/* Where 3 − x ≤ 0: the left-hand side can't beat anything positive here. */}
        <Region top={() => TOP} bottom={() => -3.7} from={3} to={RIGHT} color={C.bad} opacity={0.07} />
        <Label at={[5.9, 4.5]} color={C.bad} attach="c" size={12}>3 − x ≤ 0</Label>

        {/* The answer on the axis, open at the crossing; in squaring mode the phantom stretch too. */}
        <Line.Segment point1={[LEFT, 0]} point2={[XC, 0]} color={C.good} weight={6} />
        {/* Stops at x = 7 so the axis name past the end stays readable. */}
        {squared && <Line.Segment point1={[XP, 0]} point2={[7, 0]} color={C.bad} weight={6} />}

        {/* The asymptote of the curve, dashed in the curve's own colour. */}
        <Line.Segment point1={[4, -3.7]} point2={[4, TOP]} color={C.g} style="dashed" weight={1.5} />
        <Label at={[4, -2.6]} color={C.g} attach="e" size={12}>x = 4</Label>

        <Plot.OfX y={rhs} domain={[LEFT, 4 - GAP]} color={C.g} weight={3} />
        <Plot.OfX y={rhs} domain={[4 + GAP, RIGHT]} color={C.g} weight={3} />
        <Plot.OfX y={lhs} domain={[LEFT, RIGHT]} color={C.f} weight={3} />
        {squared && <Plot.OfX y={v => v - 3} domain={[3, RIGHT]} color={C.violet} style="dashed" weight={2.5} />}

        {/* The real crossing (and, when squaring, the phantom one). */}
        <Line.Segment point1={[XC, 0]} point2={[XC, YC]} color={C.good} style="dashed" weight={1.5} />
        {squared && <Line.Segment point1={[XP, 0]} point2={[XP, YP]} color={C.bad} style="dashed" weight={1.5} />}

        {/* The comparison at the slider's x: a bar from the line to the curve. */}
        {!undef && <Line.Segment point1={[x, L]} point2={[x, barTop]} color={truth ? C.good : C.bad} weight={4} opacity={0.85} />}
        {flipped && !undef && <Line.Segment point1={[x, L]} point2={[x, -L]} color={C.violet} style="dashed" weight={1.5} />}

        <Point x={XC} y={YC} color={C.good} />
        <OpenDot x={XC} y={0} color={C.good} />
        {squared && <Point x={XP} y={YP} color={C.bad} />}
        {squared && <OpenDot x={XP} y={0} color={C.bad} />}

        <Point x={x} y={L} color={C.f} />
        {/* Only while it's on screen (the view ends near y = 5.1). */}
        {!undef && R < 4.85 && <Point x={x} y={R} color={C.g} />}
        {flipped && <Point x={x} y={-L} color={C.violet} />}

        <Label at={[1.2, 1.8]} color={C.f} attach="ne">y = 3 − x</Label>
        <Label at={[3.78, 4.5]} color={C.g} attach="w">y = 1/|x − 4|</Label>
        {squared && <Label at={[5.2, 2.2]} color={C.violet} attach="se">y = |3 − x|</Label>}
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x}
          onChange={v => {
            player.stop()
            setX(v)
          }}
          min={-1}
          max={7}
          step={0.01}
          format={v => num(v)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x)} label="Sweep from −1 to 7" />
          <Toggle label="What if I square both sides?" checked={squared} onChange={setSquared} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`3 - x = ${num(L)}`} />
          {squared && <Readout color={C.violet} tex={`|3 - x| = ${num(Math.abs(L))}`} />}
          <Readout color={C.g} tex={undef ? '\\tfrac{1}{|x-4|}\\ \\text{undefined}' : `\\tfrac{1}{|x-4|} = ${num(R)}`} />
          {!undef &&
            (atCross ? (
              <Readout color={C.good} tex={'3 - x \\approx \\tfrac{1}{|x-4|}\\ \\text{(the boundary)}'} />
            ) : (
              <Readout color={truth ? C.good : C.bad} tex={`3 - x > \\tfrac{1}{|x-4|}\\ \\text{is ${truth ? 'true' : 'false'}}`} />
            ))}
          {squared &&
            !undef &&
            (atCross || atPhantom ? (
              <Readout color={C.violet} tex={'(3 - x)^2 \\approx \\tfrac{1}{(x-4)^2}\\ \\text{(the boundary)}'} />
            ) : (
              <Readout color={C.violet} tex={`(3 - x)^2 > \\tfrac{1}{(x-4)^2}\\ \\text{is ${sqTruth ? 'true' : 'false'}}`} />
            ))}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
